"use server";

import { revalidatePath } from "next/cache";
import { markAllSubmissionsRead, requireStaff, setSubmissionStatus } from "@/lib/admin";

export async function markEnquiry(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "read");
  if (id) await setSubmissionStatus(id, status === "archived" ? "archived" : status === "new" ? "new" : "read");
  revalidatePath("/kmanageradmin/enquiries");
  revalidatePath("/kmanageradmin");
}

export async function markAllEnquiriesRead() {
  await requireStaff();
  await markAllSubmissionsRead();
  revalidatePath("/kmanageradmin/enquiries");
  revalidatePath("/kmanageradmin");
}
