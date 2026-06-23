import "server-only";
import { redirect } from "next/navigation";
import { getServiceClient } from "./supabase";
import { getAdminUser } from "./supabase-server";
import { isStaff } from "./staff";
import { revalidateTenant, revalidateSiteHost } from "./tenant";
import { starterContent } from "./starter";
import { getStripe } from "./stripe";
import { sanitizeContentUrls } from "./url";
import {
  sendAccountReactivatedEmail,
  sendAccountSuspendedEmail,
  sendAdminLifecycleAlert,
  sendCancellationScheduledEmail,
  sendKycDecisionEmail,
  sendKycRequestEmail,
  sendOperatorEmail,
  sendOwnerWelcomeEmail,
  sendSupportClientReply,
} from "./email";
import { SITE_URL } from "./seo";
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
// Only call these from inside the authenticated /kmanageradmin area.

// Authorization guard for the admin server actions. A page/layout guard does
// NOT protect server actions — they're independently-callable POST endpoints —
// so every admin mutation must verify the caller is staff itself before it
// touches the RLS-bypassing client. Without this, any signed-in user could
// edit/publish/delete ANY tenant by POSTing to these actions with its id.
export async function requireStaff() {
  const user = await getAdminUser();
  if (!user || !(await isStaff(user.email))) redirect("/kmanageradmin/login");
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

// Mark an enquiry read/archived (clears the "new" badge), or mark all read.
export async function setSubmissionStatus(id: string, status: "new" | "read" | "archived") {
  const { error } = await client().from("form_submissions").update({ status }).eq("id", id);
  if (error) throw new Error(error.message);
}
export async function markAllSubmissionsRead() {
  await client().from("form_submissions").update({ status: "read" }).eq("status", "new");
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
  return (await tenantContact(tenantId)).email;
}

// Business name + the owner's account email, for lifecycle notifications.
async function tenantContact(tenantId: string): Promise<{ name: string; email: string | null }> {
  const c = client();
  const { data: t } = await c.from("tenants").select("business_name,owner_id").eq("id", tenantId).maybeSingle();
  const row = t as { business_name?: string; owner_id?: string } | null;
  let email: string | null = null;
  if (row?.owner_id) {
    const { data } = await c.auth.admin.getUserById(row.owner_id);
    email = data?.user?.email ?? null;
  }
  return { name: row?.business_name ?? "your business", email };
}

// Suspend = take the site offline + block the dashboard. Unsuspend leaves the
// site as a draft (staff republish) so we never silently re-expose a site.
export async function setAccountStatus(tenantId: string, status: AccountStatus) {
  const update = status === "suspended" ? { account_status: status, published: false } : { account_status: status };
  const { error } = await client().from("tenants").update(update).eq("id", tenantId);
  if (error) throw new Error(error.message);
  await revalidate(await tenantRef(tenantId));

  const { name, email } = await tenantContact(tenantId);
  if (status === "suspended") {
    if (email) sendAccountSuspendedEmail({ to: email, businessName: name }).catch(() => {});
    sendAdminLifecycleAlert({ subject: "Account suspended", businessName: name, detail: "Site unpublished and dashboard access blocked.", tenantId }).catch(() => {});
  } else {
    if (email) sendAccountReactivatedEmail({ to: email, businessName: name }).catch(() => {});
    sendAdminLifecycleAlert({ subject: "Account reactivated", businessName: name, detail: "Dashboard access restored; site stays a draft until republished.", tenantId }).catch(() => {});
  }
}

// The client's auth account (id + email) for this tenant.
export async function getClientAuth(tenantId: string): Promise<{ id: string; email: string | null } | null> {
  const c = client();
  const { data: t } = await c.from("tenants").select("owner_id").eq("id", tenantId).maybeSingle();
  const ownerId = (t as { owner_id?: string } | null)?.owner_id;
  if (!ownerId) return null;
  const { data } = await c.auth.admin.getUserById(ownerId);
  return { id: ownerId, email: data?.user?.email ?? null };
}

// Staff override: reset a client's password and/or change their login email.
export async function adminUpdateClientAuth(tenantId: string, fields: { email?: string | null; password?: string | null }): Promise<void> {
  const auth = await getClientAuth(tenantId);
  if (!auth) throw new Error("No client account is linked to this site.");
  const patch: { email?: string; password?: string; email_confirm?: boolean } = {};
  if (fields.email && fields.email.trim() && fields.email.trim() !== auth.email) {
    patch.email = fields.email.trim();
    patch.email_confirm = true; // staff override → no confirmation email needed
  }
  if (fields.password && fields.password.trim()) {
    if (fields.password.trim().length < 8) throw new Error("Password must be at least 8 characters.");
    patch.password = fields.password.trim();
  }
  if (!patch.email && !patch.password) throw new Error("Nothing to change.");
  const { error } = await client().auth.admin.updateUserById(auth.id, patch);
  if (error) throw new Error(error.message);
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

  const { name, email } = await tenantContact(tenantId);
  if (email) sendKycDecisionEmail({ to: email, businessName: name, approved: approve, note }).catch(() => {});
}

// Cancel at period end (keeps the site live until the paid-through date).
export async function cancelSubscriptionForTenant(tenantId: string): Promise<void> {
  const billing = await getTenantBilling(tenantId);
  const stripe = getStripe();
  if (!stripe || !billing?.stripe_subscription_id) throw new Error("No active subscription found.");
  const sub = await stripe.subscriptions.update(billing.stripe_subscription_id, { cancel_at_period_end: true });
  const endIso = sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null;
  await client().from("tenant_billing").update({ cancel_at: endIso }).eq("tenant_id", tenantId);

  const endDate = endIso ? new Date(endIso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;
  const { name, email } = await tenantContact(tenantId);
  if (email) sendCancellationScheduledEmail({ to: email, businessName: name, endDate }).catch(() => {});
  sendAdminLifecycleAlert({ subject: "Cancellation scheduled", businessName: name, detail: endDate ? `Ends ${endDate}.` : "Ends at period end.", tenantId }).catch(() => {});
}

// Permanently delete a tenant account. Cancels any Stripe subscription, removes
// the tenant row (every child table cascades), and deletes the owner's login —
// unless that owner still has another site or is a staff member (we never lock
// staff out of the admin). Irreversible.
export async function deleteTenantAccount(tenantId: string): Promise<void> {
  const c = client();
  const { data: t } = await c.from("tenants").select("owner_id,business_name").eq("id", tenantId).maybeSingle();
  if (!t) return;
  const ownerId = (t as { owner_id?: string | null }).owner_id ?? null;

  // Best-effort: cancel any live subscription immediately so they aren't billed.
  try {
    const billing = await getTenantBilling(tenantId);
    const stripe = getStripe();
    if (stripe && billing?.stripe_subscription_id) {
      await stripe.subscriptions.cancel(billing.stripe_subscription_id).catch(() => {});
    }
  } catch {
    // ignore — deletion proceeds regardless of Stripe state
  }

  // Delete the tenant; FK cascades wipe themes, content, catalog, gallery, team,
  // leads, billing, support tickets, KYC and form submissions.
  const { error } = await c.from("tenants").delete().eq("id", tenantId);
  if (error) throw new Error(error.message);

  // Delete the owner's auth login (one email = one site, so there's nothing
  // else of theirs to keep) — but never a staff login.
  if (ownerId) {
    const { data: u } = await c.auth.admin.getUserById(ownerId);
    const email = u?.user?.email ?? null;
    const staff = email ? await isStaff(email) : false;
    if (!staff) await c.auth.admin.deleteUser(ownerId).catch(() => {});
  }
}

// Find a Supabase auth user id by email, or create the account (so a new client
// can be linked at site-creation). The owner won't know this password — staff
// set one from the tenant's "Client login" card afterwards.
async function findUserIdByEmail(email: string): Promise<string | null> {
  const c = client();
  const e = email.toLowerCase();
  for (let page = 1; page <= 20; page++) {
    const { data, error } = await c.auth.admin.listUsers({ page, perPage: 200 });
    if (error) break;
    const u = data.users.find((x) => (x.email ?? "").toLowerCase() === e);
    if (u) return u.id;
    if (data.users.length < 200) break;
  }
  return null;
}

export async function resolveOwnerId(email: string): Promise<{ id: string; created: boolean }> {
  const e = email.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) throw new Error("Enter a valid owner email.");
  const existing = await findUserIdByEmail(e);
  if (existing) {
    // One email = one site. If this account already owns a site, don't link a
    // second one.
    const { data: owned } = await client().from("tenants").select("id").eq("owner_id", existing).limit(1);
    if (owned && owned.length) throw new Error("That email already has a site — each account can have one.");
    return { id: existing, created: false };
  }
  const { data, error } = await client().auth.admin.createUser({
    email: e,
    email_confirm: true,
    password: `${crypto.randomUUID()}Aa1!`,
  });
  if (error) throw new Error(error.message);
  return { id: data.user.id, created: true };
}

// Email a freshly created owner a one-time set-password link. We never email a
// password: generateLink mints a short-lived recovery token, which we route
// through /auth/confirm (same path as every other auth email). Best-effort —
// the caller swallows failures so it never blocks client creation.
export async function sendOwnerWelcome(email: string, businessName: string): Promise<void> {
  const e = email.trim().toLowerCase();
  const { data, error } = await client().auth.admin.generateLink({ type: "recovery", email: e });
  const hashedToken = data?.properties?.hashed_token;
  if (error || !hashedToken) throw new Error(error?.message ?? "Could not generate a set-password link.");
  const link = `${SITE_URL}/auth/confirm?token_hash=${encodeURIComponent(hashedToken)}&type=recovery`;
  await sendOwnerWelcomeEmail({ to: e, businessName, link });
}

export async function createTenant(input: {
  business_name: string;
  preset: Preset;
  subdomain: string;
  ownerId?: string | null;
}): Promise<string> {
  const c = client();
  const { data, error } = await c
    .from("tenants")
    .insert({
      business_name: input.business_name,
      preset: input.preset,
      subdomain: input.subdomain,
      published: false,
      ...(input.ownerId ? { owner_id: input.ownerId } : {}),
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
  const { error } = await client().from("site_content").update({ content: sanitizeContentUrls(content) }).eq("tenant_id", id);
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
