"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  // Throttle staff sign-in attempts per IP and per email.
  const ip = await ipFromHeaders();
  const ok = (await rateLimit(`adminlogin:ip:${ip}`, 20, 900)) && (await rateLimit(`adminlogin:email:${email.trim().toLowerCase()}`, 8, 900));
  if (!ok) redirect(`/kmanageradmin/login?error=${encodeURIComponent("Too many attempts. Please wait a few minutes and try again.")}`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/kmanageradmin/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect("/kmanageradmin");
}

export async function logout() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/kmanageradmin/login");
}
