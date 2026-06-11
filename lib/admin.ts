import "server-only";
import { redirect } from "next/navigation";
import { getServiceClient } from "./supabase";
import { getAdminUser } from "./supabase-server";
import { isStaff } from "./staff";
import { revalidateTenant, revalidateSiteHost } from "./tenant";
import { starterContent } from "./starter";
import { getStripe } from "./stripe";
import { sendKycRequestEmail, sendOperatorEmail, sendSupportClientReply } from "./email";
import type {
  AccountStatus,
  CatalogItem,
  GalleryImage,
  KycStatus,
  KycSubmission,
  Preset,
  SiteContent,
  SupportTicket,
  TeamMember,
  Tenant,
  TenantSite,
  Theme,
  TicketMessage,
  TicketStatus,
} from "./types";

// Admin data layer. Uses the SECRET (service_role) client, which bypasses RLS.
// Only call these from inside the authenticated /admin area.

// Authorization guard for the admin server actions. A page/layout guard does
// NOT protect server actions — they're independently-callable POST endpoints —
// so every admin mutation must verify the caller is staff itself before it
// touches the RLS-bypassing client. Without this, any signed-in user could
// edit/publish/delete ANY tenant by POSTing to these actions with its id.
export async function requireStaff() {
  const user = await getAdminUser();
  if (!user || !isStaff(user.email)) redirect("/admin/login");
}

function client() {
  const c = getServiceClient();
  if (!c) throw new Error("SUPABASE_SECRET_KEY is not configured.");
  return c;
}

export interface TenantListRow {
  id: string;
  business_name: string;
  preset: Preset;
  subdomain: string;
  custom_domain: string | null;
  domain_status: string;
  published: boolean;
  plan: string | null;
  plan_status: string;
  created_at: string;
}

export async function listTenants(): Promise<TenantListRow[]> {
  const { data, error } = await client()
    .from("tenants")
    .select("id,business_name,preset,subdomain,custom_domain,domain_status,published,plan,plan_status,created_at")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as TenantListRow[];
}

export interface AdminStats {
  total: number;
  live: number;
  drafts: number;
  domainsLive: number;
  enquiries: number;
  newEnquiries: number;
}

// Headline counts for the admin overview. Uses count-only queries (no rows).
export async function getAdminStats(): Promise<AdminStats> {
  const c = client();
  const head = { count: "exact" as const, head: true };
  const [total, live, domainsLive, enquiries, newEnquiries] = await Promise.all([
    c.from("tenants").select("*", head),
    c.from("tenants").select("*", head).eq("published", true),
    c.from("tenants").select("*", head).eq("domain_status", "active"),
    c.from("form_submissions").select("*", head),
    c.from("form_submissions").select("*", head).eq("status", "new"),
  ]);
  const n = (r: { count: number | null }) => r.count ?? 0;
  return {
    total: n(total),
    live: n(live),
    drafts: n(total) - n(live),
    domainsLive: n(domainsLive),
    enquiries: n(enquiries),
    newEnquiries: n(newEnquiries),
  };
}

export interface AdminSubmission {
  id: string;
  tenant_id: string;
  business_name: string;
  kind: "booking" | "contact";
  reply_to: string | null;
  status: string;
  created_at: string;
  lines: { label: string; value: string }[];
}

// Recent form submissions across all tenants, newest first, with the business
// name joined in. Powers the admin Enquiries inbox.
export async function listRecentSubmissions(limit = 100): Promise<AdminSubmission[]> {
  const { data, error } = await client()
    .from("form_submissions")
    .select("id,tenant_id,kind,reply_to,status,created_at,payload,tenants(business_name)")
    .order("created_at", { ascending: false })
    .limit(limit);
  if (error) throw new Error(error.message);
  return (data ?? []).map((r) => {
    const row = r as Record<string, unknown>;
    const tenant = row.tenants as { business_name?: string } | null;
    const payload = (row.payload ?? {}) as { lines?: { label: string; value: string }[] };
    return {
      id: String(row.id),
      tenant_id: String(row.tenant_id),
      business_name: tenant?.business_name ?? "Unknown",
      kind: row.kind === "booking" ? "booking" : "contact",
      reply_to: (row.reply_to as string | null) ?? null,
      status: String(row.status ?? "new"),
      created_at: String(row.created_at),
      lines: Array.isArray(payload.lines) ? payload.lines : [],
    };
  });
}

// --- support tickets (staff side, service role) ----------------------------
export interface AdminTicket extends SupportTicket {
  business_name: string;
}

export async function listTickets(status?: TicketStatus): Promise<AdminTicket[]> {
  let q = client()
    .from("support_tickets")
    .select("*,tenants(business_name)")
    .order("last_message_at", { ascending: false });
  if (status) q = q.eq("status", status);
  const { data, error } = await q;
  // Before the 0005 migration is applied the table won't exist yet — degrade
  // gracefully instead of crashing the console.
  if (error) return [];
  return (data ?? []).map((r) => {
    const row = r as Record<string, unknown>;
    const tenant = row.tenants as { business_name?: string } | null;
    return { ...(row as unknown as SupportTicket), business_name: tenant?.business_name ?? "Unknown" };
  });
}

export async function getTicketFull(
  id: string,
): Promise<{ ticket: AdminTicket; messages: TicketMessage[]; clientEmail: string | null } | null> {
  const c = client();
  const { data: row } = await c.from("support_tickets").select("*,tenants(business_name,owner_id)").eq("id", id).maybeSingle();
  if (!row) return null;
  const r = row as Record<string, unknown>;
  const tenant = r.tenants as { business_name?: string; owner_id?: string } | null;
  const { data: messages } = await c
    .from("ticket_messages")
    .select("*")
    .eq("ticket_id", id)
    .order("created_at", { ascending: true });
  let clientEmail: string | null = null;
  const ownerId = tenant?.owner_id ?? (r.created_by as string | null);
  if (ownerId) {
    const { data } = await c.auth.admin.getUserById(ownerId);
    clientEmail = data?.user?.email ?? null;
  }
  return {
    ticket: { ...(r as unknown as SupportTicket), business_name: tenant?.business_name ?? "Unknown" },
    messages: (messages ?? []) as TicketMessage[],
    clientEmail,
  };
}

export async function postStaffMessage(ticketId: string, body: string): Promise<void> {
  const c = client();
  const user = await getAdminUser();
  const { error } = await c
    .from("ticket_messages")
    .insert({ ticket_id: ticketId, author_role: "staff", author_id: user?.id ?? null, body });
  if (error) throw new Error(error.message);
  // Staff replied → awaiting the client.
  await c
    .from("support_tickets")
    .update({ status: "pending", last_message_at: new Date().toISOString(), updated_at: new Date().toISOString() })
    .eq("id", ticketId);

  const full = await getTicketFull(ticketId);
  if (full?.clientEmail) {
    sendSupportClientReply({ to: full.clientEmail, subject: full.ticket.subject, body, ticketId }).catch(() => {});
  }
}

export async function setTicketStatus(ticketId: string, status: TicketStatus): Promise<void> {
  const { error } = await client()
    .from("support_tickets")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", ticketId);
  if (error) throw new Error(error.message);
}

// Light counts for the sidebar badges (new enquiries + open tickets).
export async function getNavBadges(): Promise<{ newEnquiries: number; openTickets: number }> {
  const c = client();
  const [enq, tick] = await Promise.all([
    c.from("form_submissions").select("*", { count: "exact", head: true }).eq("status", "new"),
    c.from("support_tickets").select("*", { count: "exact", head: true }).eq("status", "open"),
  ]);
  return { newEnquiries: enq.count ?? 0, openTickets: tick.count ?? 0 };
}

export async function getOpenTicketCount(): Promise<number> {
  const { count } = await client()
    .from("support_tickets")
    .select("*", { count: "exact", head: true })
    .eq("status", "open");
  return count ?? 0;
}

// --- account actions, billing & KYC (staff, service role) ------------------
export interface TenantBilling {
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  cancel_at: string | null;
}

export async function getTenantBilling(tenantId: string): Promise<TenantBilling | null> {
  const { data } = await client()
    .from("tenant_billing")
    .select("stripe_customer_id,stripe_subscription_id,cancel_at")
    .eq("tenant_id", tenantId)
    .maybeSingle();
  return (data as TenantBilling) ?? null;
}

async function ownerEmail(tenantId: string): Promise<string | null> {
  const c = client();
  const { data: t } = await c.from("tenants").select("owner_id").eq("id", tenantId).maybeSingle();
  const ownerId = (t as { owner_id?: string } | null)?.owner_id;
  if (!ownerId) return null;
  const { data } = await c.auth.admin.getUserById(ownerId);
  return data?.user?.email ?? null;
}

// Suspend = take the site offline + block the dashboard. Unsuspend leaves the
// site as a draft (staff republish) so we never silently re-expose a site.
export async function setAccountStatus(tenantId: string, status: AccountStatus) {
  const update = status === "suspended" ? { account_status: status, published: false } : { account_status: status };
  const { error } = await client().from("tenants").update(update).eq("id", tenantId);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}

export async function emailClient(tenantId: string, subject: string, body: string) {
  const to = await ownerEmail(tenantId);
  if (!to) throw new Error("No client email on file.");
  await sendOperatorEmail({ to, subject, body });
}

export async function requestKyc(tenantId: string) {
  const c = client();
  const { error } = await c.from("tenants").update({ kyc_status: "requested" }).eq("id", tenantId);
  if (error) throw new Error(error.message);
  const { data: t } = await c.from("tenants").select("business_name").eq("id", tenantId).maybeSingle();
  const to = await ownerEmail(tenantId);
  if (to) {
    sendKycRequestEmail({ to, businessName: (t as { business_name?: string } | null)?.business_name ?? "your business" }).catch(() => {});
  }
}

export async function getLatestKyc(tenantId: string): Promise<KycSubmission | null> {
  const { data } = await client()
    .from("kyc_submissions")
    .select("*")
    .eq("tenant_id", tenantId)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as KycSubmission) ?? null;
}

export async function reviewKyc(tenantId: string, submissionId: string, approve: boolean, note: string | null) {
  const c = client();
  const status: KycStatus = approve ? "approved" : "rejected";
  await c
    .from("kyc_submissions")
    .update({ status, review_note: note, reviewed_at: new Date().toISOString() })
    .eq("id", submissionId);
  const { error } = await c.from("tenants").update({ kyc_status: status }).eq("id", tenantId);
  if (error) throw new Error(error.message);
}

// Cancel at period end (keeps the site live until the paid-through date).
export async function cancelSubscriptionForTenant(tenantId: string): Promise<void> {
  const billing = await getTenantBilling(tenantId);
  const stripe = getStripe();
  if (!stripe || !billing?.stripe_subscription_id) throw new Error("No active subscription found.");
  const sub = await stripe.subscriptions.update(billing.stripe_subscription_id, { cancel_at_period_end: true });
  await client()
    .from("tenant_billing")
    .update({ cancel_at: sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null })
    .eq("tenant_id", tenantId);
}

export async function createTenant(input: {
  business_name: string;
  preset: Preset;
  subdomain: string;
}): Promise<string> {
  const c = client();
  const { data, error } = await c
    .from("tenants")
    .insert({
      business_name: input.business_name,
      preset: input.preset,
      subdomain: input.subdomain,
      published: false,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);
  const id = data.id as string;
  // Seed a complete, editable starter site so the editor (and the live page)
  // has real content from the first second.
  const starter = starterContent(input.preset);
  await c.from("themes").insert({
    tenant_id: id,
    primary_color: starter.theme.primary_color,
    accent_color: starter.theme.accent_color,
    font: starter.theme.font,
  });
  await c.from("site_content").insert({ tenant_id: id, content: starter.content });
  if (starter.items.length) {
    await c.from("catalog_items").insert(
      starter.items.map((it, i) => ({
        tenant_id: id,
        section: it.section ?? null,
        category: it.category ?? null,
        name: it.name,
        description: it.description ?? null,
        price: it.price ?? null,
        is_available: true,
        sort_order: i + 1,
      })),
    );
  }
  return id;
}

export async function getTenantFull(id: string): Promise<TenantSite | null> {
  const c = client();
  const [t, th, sc, cat, gal, team] = await Promise.all([
    c.from("tenants").select("*").eq("id", id).maybeSingle(),
    c.from("themes").select("*").eq("tenant_id", id).maybeSingle(),
    c.from("site_content").select("content").eq("tenant_id", id).maybeSingle(),
    c.from("catalog_items").select("*").eq("tenant_id", id).order("sort_order"),
    c.from("gallery").select("*").eq("tenant_id", id).order("sort_order"),
    c.from("team").select("*").eq("tenant_id", id).order("sort_order"),
  ]);
  if (!t.data) return null;
  const tenant = t.data as Tenant;
  const theme: Theme = th.data
    ? {
        logo_url: th.data.logo_url,
        primary_color: th.data.primary_color,
        accent_color: th.data.accent_color,
        font: th.data.font,
      }
    : { logo_url: null, primary_color: "#111111", accent_color: "#c8a24a", font: null };
  return {
    tenant,
    theme,
    content: (sc.data?.content ?? {}) as SiteContent,
    catalog: (cat.data ?? []) as CatalogItem[],
    gallery: (gal.data ?? []) as GalleryImage[],
    team: (team.data ?? []) as TeamMember[],
  };
}

// After any write, bust the public cache for that tenant (id + host tags).
async function revalidate(tenant: Pick<Tenant, "id" | "subdomain" | "custom_domain">) {
  await revalidateTenant(tenant.id);
  await revalidateSiteHost("subdomain", tenant.subdomain);
  if (tenant.custom_domain) await revalidateSiteHost("custom", tenant.custom_domain);
}

async function tenantRef(id: string) {
  const { data } = await client()
    .from("tenants")
    .select("id,subdomain,custom_domain")
    .eq("id", id)
    .single();
  return data as Pick<Tenant, "id" | "subdomain" | "custom_domain">;
}

export async function updateTenantFields(
  id: string,
  fields: Partial<
    Pick<
      Tenant,
      "business_name" | "preset" | "meta_title" | "meta_description" | "og_image_url" | "favicon_url" | "analytics_id" | "custom_domain" | "plan"
    >
  >,
) {
  const { error } = await client().from("tenants").update(fields).eq("id", id);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(id));
}

export async function setPublished(id: string, published: boolean) {
  const { error } = await client().from("tenants").update({ published }).eq("id", id);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(id));
}

export async function updateTheme(id: string, theme: Partial<Theme>) {
  const { error } = await client().from("themes").update(theme).eq("tenant_id", id);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(id));
}

export async function updateContent(id: string, content: SiteContent) {
  const { error } = await client().from("site_content").update({ content }).eq("tenant_id", id);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(id));
}

// --- catalog / gallery / team ---------------------------------------------
export async function upsertCatalogItem(
  tenantId: string,
  item: Partial<CatalogItem> & { id?: string },
) {
  const c = client();
  const row = {
    tenant_id: tenantId,
    section: item.section ?? null,
    category: item.category ?? null,
    name: item.name ?? "",
    description: item.description ?? null,
    price: item.price ?? null,
    is_available: item.is_available ?? true,
    sort_order: item.sort_order ?? 0,
  };
  const { error } = item.id
    ? await c.from("catalog_items").update(row).eq("id", item.id)
    : await c.from("catalog_items").insert(row);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}

export async function deleteCatalogItem(tenantId: string, itemId: string) {
  const { error } = await client().from("catalog_items").delete().eq("id", itemId);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}

export async function upsertGalleryImage(
  tenantId: string,
  img: Partial<GalleryImage> & { id?: string },
) {
  const c = client();
  const row = {
    tenant_id: tenantId,
    image_url: img.image_url ?? "",
    caption: img.caption ?? null,
    sort_order: img.sort_order ?? 0,
  };
  const { error } = img.id
    ? await c.from("gallery").update(row).eq("id", img.id)
    : await c.from("gallery").insert(row);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}

export async function deleteGalleryImage(tenantId: string, imgId: string) {
  const { error } = await client().from("gallery").delete().eq("id", imgId);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}

export async function upsertTeamMember(
  tenantId: string,
  m: Partial<TeamMember> & { id?: string },
) {
  const c = client();
  const row = {
    tenant_id: tenantId,
    name: m.name ?? "",
    role: m.role ?? null,
    credentials: m.credentials ?? null,
    photo_url: m.photo_url ?? null,
    sort_order: m.sort_order ?? 0,
  };
  const { error } = m.id
    ? await c.from("team").update(row).eq("id", m.id)
    : await c.from("team").insert(row);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}

export async function deleteTeamMember(tenantId: string, memberId: string) {
  const { error } = await client().from("team").delete().eq("id", memberId);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));
}
