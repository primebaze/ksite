"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { getServiceClient } from "@/lib/supabase";
import type { Preset } from "@/lib/types";

const PRESETS: Preset[] = ["restaurant", "trades", "salon"];

function err(msg: string): never {
  redirect(`/get-started?error=${encodeURIComponent(msg)}`);
}

// Step 1 of self-serve signup. We DON'T create the site yet — email
// confirmation is on, so we stash the business details in the user's signup
// metadata and create the site after they confirm (see app/auth/confirm).
export async function startOnboarding(formData: FormData) {
  const business_name = String(formData.get("business_name") ?? "").trim();
  const preset = String(formData.get("preset") ?? "") as Preset;
  const subdomain = String(formData.get("subdomain") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!business_name || !subdomain || !PRESETS.includes(preset)) err("Please complete the business details.");
  if (!email || password.length < 8) err("Enter an email and a password of at least 8 characters.");

  const supabase = await createSupabaseServerClient();
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { business_name, preset, subdomain },
      emailRedirectTo: `${base}/auth/confirm`,
    },
  });
  if (error) err(error.message);

  // Supabase won't update metadata on a repeat signup of an existing email, so
  // force the latest business details onto the user via the admin client. This
  // is read at confirm time to create the right site.
  const svc = getServiceClient();
  if (svc) {
    const { data: list } = await svc.auth.admin.listUsers();
    const u = list?.users?.find((x) => x.email?.toLowerCase() === email.toLowerCase());
    if (u) {
      await svc.auth.admin.updateUserById(u.id, {
        user_metadata: { business_name, preset, subdomain },
      });
    }
  }

  redirect(`/get-started/check-email?email=${encodeURIComponent(email)}`);
}
