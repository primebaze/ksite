"use server";

import { redirect } from "next/navigation";
import { rateLimit, ipFromHeaders } from "@/lib/rate-limit";
import { sendPasswordReset } from "@/lib/admin";

// Self-serve "forgot password". We always end on the same neutral notice so the
// page can't be used to discover which emails have an account.
export async function requestPasswordReset(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const valid = /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email);

  // Throttle per IP and per email to slow abuse / inbox bombing.
  const ip = await ipFromHeaders();
  const ok =
    (await rateLimit(`pwreset:ip:${ip}`, 10, 900)) &&
    (valid ? await rateLimit(`pwreset:email:${email}`, 4, 900) : true);

  if (ok && valid) {
    try {
      await sendPasswordReset(email);
    } catch {
      // Unknown email or transient send failure — never surface it; the notice
      // is the same either way so account state stays private.
    }
  }

  redirect("/forgot-password?sent=1");
}
