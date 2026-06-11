"use server";

import { revalidatePath } from "next/cache";
import { postStaffMessage, requireStaff, setTicketStatus } from "@/lib/admin";
import type { TicketStatus } from "@/lib/types";

export async function replyTicket(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  const body = String(formData.get("body") ?? "").trim();
  if (!id || !body) return;
  await postStaffMessage(id, body);
  revalidatePath(`/kmanageradmin/support/${id}`);
}

export async function updateStatus(formData: FormData) {
  await requireStaff();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "") as TicketStatus;
  if (!id || !["open", "pending", "closed"].includes(status)) return;
  await setTicketStatus(id, status);
  revalidatePath(`/kmanageradmin/support/${id}`);
  revalidatePath(`/kmanageradmin/support`);
}
