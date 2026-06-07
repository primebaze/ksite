import { Webhook } from "standardwebhooks";
import { sendAuthEmail, type SupabaseEmailData } from "@/lib/email";

// Supabase Auth "Send Email Hook" target. Supabase fires this for every auth
// email (signup confirmation, reset, etc.); we build it and send via Resend.
// The request is signed (Standard Webhooks) with the hook secret.
export const runtime = "nodejs";

export async function POST(req: Request) {
  const rawSecret = process.env.SEND_EMAIL_HOOK_SECRET;
  if (!rawSecret) return new Response("Email hook not configured", { status: 500 });

  const payload = await req.text();
  const headers = Object.fromEntries(req.headers);

  let event: { user: { email: string }; email_data: SupabaseEmailData };
  try {
    // Supabase shows the secret as "v1,whsec_..."; the library wants the rest.
    const wh = new Webhook(rawSecret.replace(/^v1,/, ""));
    event = wh.verify(payload, headers) as typeof event;
  } catch {
    return new Response("Invalid signature", { status: 401 });
  }

  try {
    await sendAuthEmail({ to: event.user.email, data: event.email_data });
  } catch (e) {
    const message = e instanceof Error ? e.message : "send failed";
    return new Response(JSON.stringify({ error: { message } }), {
      status: 500,
      headers: { "content-type": "application/json" },
    });
  }

  return new Response(JSON.stringify({}), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
