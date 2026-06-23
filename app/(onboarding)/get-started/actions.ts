"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getServiceClient } from "@/lib/supabase";
import { isVertical } from "@/lib/verticals";
import { buildFor } from "@/lib/builds";
import { moderate } from "@/lib/moderation";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";
import { cleanBusinessName } from "@/lib/business-name";

function err(msg: string): never {
  redirect(`/get-started?error=${encodeURIComponent(msg)}`);
}

function slugify(s: string): string {
  return (
    s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "site"
  );
}

// Auto-pick a free subdomain from the business name (client never sees this).
async function uniqueSubdomain(base: string): Promise<string> {
  const svc = getServiceClient();
  if (!svc) return base;
  let candidate = base;
  for (let i = 0; i < 6; i++) {
    const { data } = await svc.from("tenants").select("id").eq("subdomain", candidate).maybeSingle();
    if (!data) return candidate;
    candidate = `${base}-${Math.floor(1000 + Math.random() * 9000)}`;
  }
  return `${base}-${Date.now().toString().slice(-5)}`;
}

// Step 1 of self-serve signup. We DON'T create the site yet. Email
// confirmation is on, so we stash the business details in the user's signup
// metadata and create the site after they confirm (see app/auth/confirm).
export async function startOnboarding(formData: FormData) {
  let business_name: string;
  try {
    business_name = cleanBusinessName(String(formData.get("business_name") ?? ""));
  } catch (e) {
    err(e instanceof Error ? e.message : "Please add your business name.");
  }
  const preset = String(formData.get("preset") ?? "");
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const selectedDesign = String(formData.get("selected_design") ?? "").trim();
  const selectedStyle = String(formData.get("selected_style") ?? "").trim();
  const designKey = String(formData.get("design") ?? "").trim();

  if (!email || password.length < 8) err("Enter an email and a password of at least 8 characters.");
  if (!phone) err("Please add a phone number.");
  // Terms must be explicitly accepted (the checkbox sends "on" when ticked).
  if (formData.get("terms") !== "on") err("Please accept the Terms & Conditions to continue.");

  // Bot check (Cloudflare Turnstile).
  const passedBotCheck = await verifyTurnstile(String(formData.get("cf-turnstile-response") ?? ""));
  if (!passedBotCheck) err("Verification failed. Please try again.");

  // Throttle sign-ups per IP (Turnstile already gates bots; this caps abuse).
  const ip = await ipFromHeaders();
  if (!(await rateLimit(`signup:ip:${ip}`, 6, 3600))) err("Too many sign-ups from your network. Please try again later.");

  // Moderation: block offensive/spam business names.
  const nameCheck = moderate(business_name);
  if (!nameCheck.ok) err(nameCheck.reason!);

  // Resolve the business type. "other" lets them type their own; we store it
  // and render it with the generic (services) template archetype.
  let effectivePreset = preset;
  let businessType: string | undefined;
  if (selectedDesign && selectedDesign !== "scratch" && buildFor(selectedDesign)) {
    effectivePreset = selectedDesign;
  } else if (preset === "other") {
    const typed = String(formData.get("preset_other") ?? "").trim();
    if (!typed) err("Tell us what kind of business you run.");
    const typeCheck = moderate(typed);
    if (!typeCheck.ok) err(typeCheck.reason!);
    effectivePreset = "other";
    businessType = typed;
  } else if (!isVertical(preset)) {
    err("Please choose your business type.");
  }

  // Auto-generate a free subdomain from the business name.
  const subdomain = await uniqueSubdomain(slugify(business_name));

  const metadata: Record<string, string> = { business_name, preset: effectivePreset, subdomain, phone };
  if (selectedDesign && selectedDesign !== "scratch") metadata.selected_design = selectedDesign;
  if (["editorial", "warm", "bold", "minimal", "luxe", "classic"].includes(selectedStyle)) {
    metadata.selected_style = selectedStyle;
  }
  // The bespoke full-page design they picked (e.g. "meadow"); seeds content.design.
  if (/^[a-z][a-z0-9_-]{1,30}$/.test(designKey)) metadata.design = designKey;
  // The photo shown on the design card they picked; seeds the hero image so the
  // created site looks exactly like the card.
  const heroImg = String(formData.get("hero_img") ?? "").trim();
  if (/^[\w-]{8,40}$/.test(heroImg)) metadata.hero_img = heroImg;
  if (businessType) metadata.business_type = businessType;

  const supabase = await createSupabaseServerClient();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: metadata, emailRedirectTo: `${base}/auth/confirm` },
  });
  if (error) err(error.message);

  // When the email already belongs to a confirmed account, Supabase returns an
  // obfuscated user with an empty `identities` array (the supported,
  // enumeration-safe signal). We must NOT touch that account — send them to
  // sign in instead.
  //
  // Previously this path used the admin client to look a user up by email and
  // OVERWRITE their user_metadata, which let any unauthenticated visitor tamper
  // with another person's account just by submitting the form with their email.
  // That has been removed: a brand-new signup already gets its metadata from
  // `options.data` above, and existing accounts are never modified here.
  const alreadyRegistered = !data.user?.identities || data.user.identities.length === 0;
  if (alreadyRegistered) {
    redirect(
      `/login?notice=${encodeURIComponent(
        "An account with this email already exists. Please sign in.",
      )}&email=${encodeURIComponent(email)}`,
    );
  }

  redirect(`/get-started/check-email?email=${encodeURIComponent(email)}`);
}
