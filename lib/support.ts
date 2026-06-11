import "server-only";
import { createSupabaseServerClient } from "./supabase-server";
import { sendSupportStaffNotification } from "./email";
import type { SupportTicket, TicketMessage } from "./types";

// Client-scoped support layer. Runs as the SIGNED-IN CLIENT via their cookie
// session, so RLS guarantees they can only ever see/post on their own tenant's
// tickets. Staff replies are handled separately in lib/admin.ts (service key).

async function db() {
  return createSupabaseServerClient();
}

export async function listMyTickets(): Promise<SupportTicket[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("support_tickets")
    .select("*")
    .order("last_message_at", { ascending: false });
  // Degrade gracefully if the 0005 migration hasn't been applied yet.
  if (error) return [];
  return (data ?? []) as SupportTicket[];
}

export async function getMyTicket(
  id: string,
): Promise<{ ticket: SupportTicket; messages: TicketMessage[] } | null> {
  const supabase = await db();
  const { data: ticket } = await supabase.from("support_tickets").select("*").eq("id", id).maybeSingle();
  if (!ticket) return null;
  const { data: messages } = await supabase
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", id)
    .order("created_at", { ascending: true });
  return { ticket: ticket as SupportTicket, messages: (messages ?? []) as TicketMessage[] };
}

export async function createMyTicket(subject: string, body: string): Promise<string> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  // One tenant per client for now; RLS scopes this to the caller's own tenant.
  const { data: tenant } = await supabase.from("tenants").select("id,business_name").limit(1).maybeSingle();
  if (!tenant) throw new Error("No site found for your account.");

  const { data: ticket, error } = await supabase
    .from("support_tickets")
    .insert({ tenant_id: tenant.id, subject, created_by: user.id })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  const ticketId = ticket.id as string;
  const { error: msgErr } = await supabase
    .from("ticket_messages")
    .insert({ ticket_id: ticketId, author_role: "client", author_id: user.id, body });
  if (msgErr) throw new Error(msgErr.message);

  // Best-effort: let staff know a ticket was opened.
  sendSupportStaffNotification({
    businessName: (tenant as { business_name?: string }).business_name ?? "A client",
    subject,
    body,
    ticketId,
  }).catch(() => {});

  return ticketId;
}

export async function postMyMessage(ticketId: string, body: string): Promise<void> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { error } = await supabase
    .from("ticket_messages")
    .insert({ ticket_id: ticketId, author_role: "client", author_id: user.id, body });
  if (error) throw new Error(error.message);

  // Client replied → reopen + bump. RLS lets the owner update their own ticket.
  await supabase
    .from("support_tickets")
    .update({ status: "open", last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", ticketId);

  const { data: ticket } = await supabase.from("support_tickets").select("subject,tenant_id").eq("id", ticketId).maybeSingle();
  const { data: tenant } = ticket
    ? await supabase.from("tenants").select("business_name").eq("id", ticket.tenant_id).maybeSingle()
    : { data: null };
  sendSupportStaffNotification({
    businessName: (tenant as { business_name?: string } | null)?.business_name ?? "A client",
    subject: (ticket as { subject?: string } | null)?.subject ?? "Support reply",
    body,
    ticketId,
  }).catch(() => {});
}
