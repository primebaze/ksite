"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";

// Self-serve password change for the signed-in user (client OR staff — both use
// the same Supabase session). Re-verifies the current password before changing.
export async function changeOwnPassword(formData: FormData) {
  const current = String(formData.get("current") ?? "");
  const next = String(formData.get("next_password") ?? "");
  const redirectTo = String(formData.get("redirect_to") ?? "/dashboard/account");

  if (next.length < 8) redirect(`${redirectTo}?error=${encodeURIComponent("New password must be at least 8 characters.")}`);

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user?.email) redirect("/login");

  // Throttle attempts so this can't be used to brute-force the current password.
  const ip = await ipFromHeaders();
  if (!(await rateLimit(`pwchange:${user!.id}`, 5, 900)) || !(await rateLimit(`pwchange:ip:${ip}`, 15, 900))) {
    redirect(`${redirectTo}?error=${encodeURIComponent("Too many attempts. Please wait a few minutes.")}`);
  }

  // Re-verify the current password.
  const { error: reauthErr } = await supabase.auth.signInWithPassword({ email: user!.email, password: current });
  if (reauthErr) redirect(`${redirectTo}?error=${encodeURIComponent("Your current password is incorrect.")}`);

  const { error } = await supabase.auth.updateUser({ password: next });
  if (error) redirect(`${redirectTo}?error=${encodeURIComponent(error.message)}`);
  redirect(`${redirectTo}?changed=1`);
}
