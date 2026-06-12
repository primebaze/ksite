"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/admin";
import { createPromotion, setPromotionActive } from "@/lib/promos";

export async function createPromoAction(formData: FormData) {
  await requireStaff();
  const code = String(formData.get("code") ?? "").trim();
  const kind = String(formData.get("kind")) === "amount" ? "amount" : "percent";
  const value = Number(formData.get("value") ?? 0);
  const durationRaw = String(formData.get("duration") ?? "once");
  const duration = durationRaw === "forever" ? "forever" : durationRaw === "repeating" ? "repeating" : "once";
  const months = Number(formData.get("months") ?? 0) || undefined;
  const maxRedemptions = Number(formData.get("max") ?? 0) || undefined;

  try {
    await createPromotion({ code, kind, value, duration, months, maxRedemptions });
  } catch (e) {
    redirect(`/kmanageradmin/promos?error=${encodeURIComponent(e instanceof Error ? e.message : "Couldn't create the code.")}`);
  }
  redirect(`/kmanageradmin/promos?notice=${encodeURIComponent(`Created ${code.toUpperCase()}`)}`);
}

export async function togglePromoAction(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  const active = String(formData.get("active")) === "true";
  if (id) await setPromotionActive(id, active);
  revalidatePath("/kmanageradmin/promos");
}
