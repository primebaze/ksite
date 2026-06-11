"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createMyTicket, postMyMessage } from "@/lib/support";

export async function openTicket(formData: FormData) {
  const subject = String(formData.get("subject") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  if (!subject || !body) redirect("/dashboard/support?error=Add+a+subject+and+a+message");
  let id: string;
  try {
    id = await createMyTicket(subject, body);
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not open ticket";
    redirect(`/dashboard/support?error=${encodeURIComponent(msg)}`);
  }
  redirect(`/dashboard/support/${id}`);
}

export async function replyTicket(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!id || !body) redirect(`/dashboard/support/${id}`);
  await postMyMessage(id, body);
  revalidatePath(`/dashboard/support/${id}`);
}
