"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";

export async function clientLogin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  // Throttle sign-in attempts per IP and per email to slow brute-forcing.
  const ip = await ipFromHeaders();
  const ok = (await rateLimit(`login:ip:${ip}`, 30, 900)) && (await rateLimit(`login:email:${email.toLowerCase()}`, 8, 900));
  if (!ok) redirect(`/login?error=${encodeURIComponent("Too many attempts. Please wait a few minutes and try again.")}`);
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirect(`/login?error=${encodeURIComponent(error.message)}`);
  redirect("/dashboard");
}
