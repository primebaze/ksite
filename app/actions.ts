"use server";

import { getPublicClient } from "@/lib/supabase";

export type SignupState = { ok: boolean; error: string | null };

// Marketing-site lead capture. Uses the publishable (anon) client + the
// anon-insert policy on `signups` — no service key on the public path.
export async function submitSignup(
  _prev: SignupState,
  formData: FormData,
): Promise<SignupState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const business_name = String(formData.get("business_name") ?? "").trim();
  const business_type = String(formData.get("business_type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email) {
    return { ok: false, error: "Please add your name and email." };
  }

  const supabase = getPublicClient();
  if (!supabase) {
    return { ok: false, error: "Signups aren't configured yet." };
  }

  const { error } = await supabase
    .from("signups")
    .insert({ name, email, business_name, business_type, message });

  if (error) return { ok: false, error: error.message };
  return { ok: true, error: null };
}
