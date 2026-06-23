import { getServiceClient } from "@/lib/supabase";
import { sendFormSubmission } from "@/lib/email";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

export const runtime = "nodejs";

// Built-in booking/contact forms on tenant sites post here. The submission is
// emailed to the business owner. Lightweight, public endpoint: a honeypot stops
// the obvious bots, fields are length-capped, and sample/preview sites no-op.

const FIELDS: Record<"booking" | "contact", { key: string; label: string; contact?: boolean }[]> = {
  booking: [
    { key: "name", label: "Name" },
    { key: "contact", label: "Phone / email", contact: true },
    { key: "date", label: "Date" },
    { key: "time", label: "Time" },
    { key: "party", label: "People" },
    { key: "notes", label: "Notes" },
  ],
  contact: [
    { key: "name", label: "Name" },
    { key: "email", label: "Email", contact: true },
    { key: "message", label: "Message" },
  ],
};

const clean = (v: unknown) => String(v ?? "").replace(/\s+/g, " ").trim().slice(0, 600);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ ok: false, error: "Bad request." }, { status: 400 });
  }

  const kind = body.kind === "booking" ? "booking" : body.kind === "contact" ? "contact" : null;
  const tenantId = typeof body.tenantId === "string" ? body.tenantId : "";
  if (!kind || !tenantId) return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });

  // Rate limit public submissions per IP (they write the DB + send email).
  const ip = clientIp(req);
  if (!(await rateLimit(`forms:${ip}`, 10, 60)) || !(await rateLimit(`forms:${ip}:hr`, 40, 3600))) {
    return Response.json({ ok: false, error: "Too many requests. Please try again shortly." }, { status: 429 });
  }

  // Honeypot — real users never fill this; pretend success so bots don't retry.
  if (clean(body.company)) return Response.json({ ok: true });

  // Sample / preview sites have no real owner — show the success state without sending.
  if (tenantId.startsWith("sample-")) return Response.json({ ok: true, demo: true });

  // Bot check (Cloudflare Turnstile). This is what stops the lead-gen / SEO
  // form spam a honeypot can't: a targeted bot leaves the honeypot empty.
  // Skips automatically when no Turnstile secret is configured.
  const token = typeof body.token === "string" ? body.token : "";
  if (!(await verifyTurnstile(token))) {
    return Response.json({ ok: false, error: "Couldn't verify you're human. Please try again." }, { status: 400 });
  }

  const fields = (body.fields ?? {}) as Record<string, unknown>;
  const lines = FIELDS[kind]
    .map((f) => ({ label: f.label, value: clean(fields[f.key]), contact: f.contact }))
    .filter((l) => l.value);
  if (lines.length === 0) return Response.json({ ok: false, error: "Please fill in the form." }, { status: 400 });
  const replyTo = lines.find((l) => l.contact)?.value ?? null;

  const svc = getServiceClient();
  if (!svc) return Response.json({ ok: false, error: "Forms aren't switched on yet." }, { status: 500 });

  const { data: tenant } = await svc.from("tenants").select("business_name,owner_id").eq("id", tenantId).maybeSingle();
  if (!tenant) return Response.json({ ok: false, error: "Site not found." }, { status: 404 });

  let ownerEmail: string | null = null;
  if (tenant.owner_id) {
    const { data } = await svc.auth.admin.getUserById(tenant.owner_id);
    ownerEmail = data.user?.email ?? null;
  }

  const payloadLines = lines.map(({ label, value }) => ({ label, value }));

  // Store the submission so the owner can manage it in their dashboard inbox,
  // AND email it as a notification. We succeed if either path works so a
  // customer's booking is never lost to a transient failure.
  let stored = false;
  let emailed = false;

  try {
    const { error } = await svc.from("form_submissions").insert({
      tenant_id: tenantId,
      kind,
      payload: { lines: payloadLines },
      reply_to: replyTo,
    });
    if (error) console.error("site-forms store failed", error);
    else stored = true;
  } catch (error) {
    console.error("site-forms store failed", error);
  }

  if (ownerEmail) {
    try {
      await sendFormSubmission({
        to: ownerEmail,
        businessName: tenant.business_name ?? "Your site",
        kind,
        lines: payloadLines,
        replyTo,
      });
      emailed = true;
    } catch (error) {
      console.error("site-forms send failed", error);
    }
  }

  if (!stored && !emailed) {
    return Response.json({ ok: false, error: "Couldn't send right now. Please try again." }, { status: 500 });
  }

  return Response.json({ ok: true });
}
