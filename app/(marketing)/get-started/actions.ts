"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getServiceClient } from "@/lib/supabase";
import { isVertical } from "@/lib/verticals";
import { moderate } from "@/lib/moderation";

function err(msg: string): never {
  redirect(`/get-started?error=${encodeURIComponent(msg)}`);
}

// Verify the Cloudflare Turnstile token (skips if no secret configured).
async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  try {
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await r.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

// Step 1 of self-serve signup. We DON'T create the site yet — email
// confirmation is on, so we stash the business details in the user's signup
// metadata and create the site after they confirm (see app/auth/confirm).
export async function startOnboarding(formData: FormData) {
  const business_name = String(formData.get("business_name") ?? "").trim();
  const preset = String(formData.get("preset") ?? "");
  const subdomain = String(formData.get("subdomain") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!business_name || !subdomain) err("Please complete the business details.");
  if (!email || password.length < 8) err("Enter an email and a password of at least 8 characters.");
  if (!phone) err("Please add a phone number.");

  // Bot check (Cloudflare Turnstile).
  const passedBotCheck = await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? ""));
  if (!passedBotCheck) err("Verification failed — please try again.");

  // Moderation: block offensive/spam business names.
  const nameCheck = moderate(business_name);
  if (!nameCheck.ok) err(nameCheck.reason!);

  // Resolve the business type. "other" lets them type their own; we store it
  // and render it with the generic (services) template archetype.
  let effectivePreset = preset;
  let businessType: string | undefined;
  if (preset === "other") {
    const typed = String(formData.get("preset_other") ?? "").trim();
    if (!typed) err("Tell us what kind of business you run.");
    const typeCheck = moderate(typed);
    if (!typeCheck.ok) err(typeCheck.reason!);
    effectivePreset = "other";
    businessType = typed;
  } else if (!isVertical(preset)) {
    err("Please choose your business type.");
  }

  const metadata: Record<string, string> = { business_name, preset: effectivePreset, subdomain, phone };
  if (businessType) metadata.business_type = businessType;

  const supabase = await createSupabaseServerClient();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata, emailRedirectTo: `${base}/auth/confirm` },
  });
  if (error) err(error.message);

  // Supabase won't update metadata on a repeat signup of an existing email, so
  // force the latest details onto the user via the admin client.
  const svc = getServiceClient();
  if (svc) {
    const { data: list } = await svc.auth.admin.listUsers();
    const u = list?.users?.find((x) => x.email?.toLowerCase() === email.toLowerCase());
    if (u) await svc.auth.admin.updateUserById(u.id, { user_metadata: metadata });
  }

  redirect(`/get-started/check-email?email=${encodeURIComponent(email)}`);
}
