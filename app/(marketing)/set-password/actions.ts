"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";

// Set a password for the signed-in user. Reached via a recovery link
// (welcome email or forgot-password), which establishes the session first, so
// no current password is required — only an active session, which is the same
// trust level as already being logged in.
export async function setPassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirm = String(formData.get("confirm") ?? "");

  if (password.length < 8) {
    redirect(`/set-password?error=${encodeURIComponent("Password must be at least 8 characters.")}`);
  }
  if (password !== confirm) {
    redirect(`/set-password?error=${encodeURIComponent("Those passwords don't match.")}`);
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect(`/login?error=${encodeURIComponent("Your link expired. Please sign in or reset your password again.")}`);
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    redirect(`/set-password?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/dashboard?welcome=1");
}
