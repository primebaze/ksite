"use server";

import { revalidatePath } from "next/cache";
import { setMyFormSubmissionStatus } from "@/lib/my-site";

export async function markSubmission(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (id && (status === "new" || status === "read" || status === "archived")) {
    await setMyFormSubmissionStatus(id, status);
  }
  revalidatePath("/dashboard/inbox");
}
