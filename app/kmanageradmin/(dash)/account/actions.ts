"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireStaff } from "@/lib/admin";
import { addStaff, removeStaff } from "@/lib/staff";
import { getAdminUser } from "@/lib/supabase-server";

export async function addStaffAction(formData: FormData) {
  await requireStaff();
  const email = String(formData.get("email") ?? "");
  const me = await getAdminUser();
  try {
    await addStaff(email, me?.email ?? null);
  } catch (e) {
    redirect(`/kmanageradmin/account?error=${encodeURIComponent(e instanceof Error ? e.message : "Couldn't add admin.")}`);
  }
  redirect(`/kmanageradmin/account?notice=${encodeURIComponent(`Added ${email.trim().toLowerCase()} as admin`)}`);
}

export async function removeStaffAction(formData: FormData) {
  await requireStaff();
  const email = String(formData.get("email") ?? "");
  try {
    await removeStaff(email);
  } catch (e) {
    redirect(`/kmanageradmin/account?error=${encodeURIComponent(e instanceof Error ? e.message : "Couldn't remove admin.")}`);
  }
  revalidatePath("/kmanageradmin/account");
}
