import "server-only";
import { createSupabaseServerClient } from "./supabase-server";
import { revalidateSiteHost, revalidateTenant } from "./tenant";
import { addProjectDomain, createApexDnsRecord, isDomainLive, isVercelConfigured } from "./vercel";
import { sendAdminDomainLiveNotification, sendAdminLifecycleAlert, sendCancellationScheduledEmail, sendDomainLiveEmail } from "./email";
import { getStripe } from "./stripe";
import { sanitizeContentUrls } from "./url";
import type {
  CatalogItem,
  GalleryImage,
  KycSubmission,
  Preset,
  SiteContent,
  TeamMember,
  Tenant,
  TenantSite,
  Theme,
} from "./types";

// Client-scoped data layer. Everything here runs as the SIGNED-IN CLIENT via
// their cookie session, so RLS guarantees they can only ever touch the tenant
// they own. No service key, no operator powers.

async function db() {
  return createSupabaseServerClient();
}

export async function getMyUser() {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

/** The tenant owned by the current user (one site per client for now). */
export async function getMyTenant(): Promise<Tenant | null> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data } = await supabase.from("tenants").select("*").eq("owner_id", user.id).limit(1);
  return (data?.[0] as Tenant) ?? null;
}

export async function createMyTenant(input: {
  business_name: string;
  preset: Preset;
  subdomain: string;
}): Promise<string> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");

  const { data, error } = await supabase
    .from("tenants")
    .insert({
      business_name: input.business_name,
      preset: input.preset,
      subdomain: input.subdomain,
      owner_id: user.id,
      published: false,
    })
    .select("id")
    .single();
  if (error) throw new Error(error.message);

  const id = data.id as string;
  await supabase.from("themes").insert({ tenant_id: id });
  await supabase.from("site_content").insert({ tenant_id: id, content: {} });
  return id;
}

export async function getMyTenantFull(): Promise<TenantSite | null> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  const { data: tRows } = await supabase.from("tenants").select("*").eq("owner_id", user.id).limit(1);
  const t = tRows?.[0];
  if (!t) return null;
  const id = t.id as string;

  const [th, sc, cat, gal, team] = await Promise.all([
    supabase.from("themes").select("*").eq("tenant_id", id).maybeSingle(),
    supabase.from("site_content").select("content").eq("tenant_id", id).maybeSingle(),
    supabase.from("catalog_items").select("*").eq("tenant_id", id).order("sort_order"),
    supabase.from("gallery").select("*").eq("tenant_id", id).order("sort_order"),
    supabase.from("team").select("*").eq("tenant_id", id).order("sort_order"),
  ]);

  const theme: Theme = th.data
    ? {
        logo_url: th.data.logo_url,
        primary_color: th.data.primary_color,
        accent_color: th.data.accent_color,
        font: th.data.font,
      }
    : { logo_url: null, primary_color: "#111111", accent_color: "#c8a24a", font: null };

  return {
    tenant: t as Tenant,
    theme,
    content: (sc.data?.content ?? {}) as SiteContent,
    catalog: (cat.data ?? []) as CatalogItem[],
    gallery: (gal.data ?? []) as GalleryImage[],
    team: (team.data ?? []) as TeamMember[],
  };
}

async function bust(t: Pick<Tenant, "id" | "subdomain" | "custom_domain">) {
  await revalidateTenant(t.id);
  await revalidateSiteHost("subdomain", t.subdomain);
  if (t.custom_domain) await revalidateSiteHost("custom", t.custom_domain);
}

async function myRef() {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return undefined;
  const { data } = await supabase.from("tenants").select("id,subdomain,custom_domain").eq("owner_id", user.id).limit(1);
  return data?.[0] as Pick<Tenant, "id" | "subdomain" | "custom_domain"> | undefined;
}

export async function updateMyContent(content: SiteContent) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("site_content").update({ content: sanitizeContentUrls(content) }).eq("tenant_id", ref.id);
  await bust(ref);
}

export interface DomainStatusResult {
  status: string;
  justWentLive: boolean;
}

// Re-check the client's custom domain against Vercel (attach if needed, test
// verification + SSL), persist the new status, and — the first time it goes
// live — email the client and staff (the second email in the launch sequence;
// the first fires at payment when the kovasite.com subdomain is already up).
// Safe to call repeatedly: the emails only send on the pending→active edge.
export async function refreshMyDomainStatus(): Promise<DomainStatusResult> {
  const supabase = await db();
  const { data } = await supabase
    .from("tenants")
    .select("id,business_name,subdomain,custom_domain,domain_status")
    .limit(1);
  const t = data?.[0];
  if (!t?.custom_domain) return { status: "none", justWentLive: false };
  if (!isVercelConfigured()) return { status: t.domain_status ?? "pending", justWentLive: false };

  await addProjectDomain(t.custom_domain).catch(() => {});
  // Re-assert the apex A record each check. At purchase time the registration
  // order is still async, so the first attempt (in claimDomain) usually fails
  // because the DNS zone doesn't exist yet. Retrying here lets a domain we
  // registered auto-configure once the order finalises — and it harmlessly
  // no-ops for domains hosted elsewhere (we don't control their zone).
  await createApexDnsRecord(t.custom_domain).catch(() => {});
  const live = await isDomainLive(t.custom_domain);
  const wasActive = t.domain_status === "active";
  const status = live ? "active" : "verifying";

  await supabase.from("tenants").update({ domain_status: status }).eq("id", t.id);
  await bust({ id: t.id, subdomain: t.subdomain, custom_domain: t.custom_domain });

  const justWentLive = live && !wasActive;
  if (justWentLive) {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    await Promise.all([
      user?.email
        ? sendDomainLiveEmail({ to: user.email, businessName: t.business_name, domain: t.custom_domain })
        : Promise.resolve(),
      sendAdminDomainLiveNotification({
        businessName: t.business_name,
        domain: t.custom_domain,
        customerEmail: user?.email ?? null,
      }),
    ]).catch((error) => console.error("Domain-live email failed", error));
  }

  return { status, justWentLive };
}

export async function updateMyCustomDomain(custom_domain: string | null, domain_status: string) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("tenants").update({ custom_domain, domain_status }).eq("id", ref.id);
  await bust(ref);
}

export async function updateMyTheme(theme: Partial<Theme>) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("themes").update(theme).eq("tenant_id", ref.id);
  await bust(ref);
}

export async function updateMyTenant(
  fields: Partial<Pick<Tenant, "business_name" | "meta_title" | "meta_description">>,
) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("tenants").update(fields).eq("id", ref.id);
  await bust(ref);
}

export async function upsertMyCatalogItem(item: Partial<CatalogItem> & { id?: string }) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  const row = {
    tenant_id: ref.id,
    section: item.section ?? null,
    category: item.category ?? null,
    name: item.name ?? "",
    description: item.description ?? null,
    price: item.price ?? null,
    is_available: item.is_available ?? true,
    sort_order: item.sort_order ?? 0,
  };
  if (item.id) await supabase.from("catalog_items").update(row).eq("id", item.id);
  else await supabase.from("catalog_items").insert(row);
  await bust(ref);
}

// Update ONLY the named fields of one catalog item. Used by inline editing,
// where a single-field edit (e.g. just the name) must never wipe the item's
// other columns — unlike upsertMyCatalogItem, which rebuilds the whole row.
export async function patchMyCatalogItem(
  id: string,
  fields: Partial<Pick<CatalogItem, "name" | "description" | "price">>,
) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref || !id) return;
  const patch: Record<string, string | null> = {};
  if (fields.name !== undefined) patch.name = fields.name;
  if (fields.description !== undefined) patch.description = fields.description;
  if (fields.price !== undefined) patch.price = fields.price;
  if (Object.keys(patch).length === 0) return;
  // RLS scopes to the owner; the extra tenant_id filter is belt-and-braces.
  await supabase.from("catalog_items").update(patch).eq("id", id).eq("tenant_id", ref.id);
  await bust(ref);
}

export async function deleteMyCatalogItem(itemId: string) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("catalog_items").delete().eq("id", itemId);
  await bust(ref);
}

export async function upsertMyGalleryImage(img: Partial<GalleryImage> & { id?: string }) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  const row = { tenant_id: ref.id, image_url: img.image_url ?? "", caption: img.caption ?? null, sort_order: img.sort_order ?? 0 };
  if (img.id) await supabase.from("gallery").update(row).eq("id", img.id);
  else await supabase.from("gallery").insert(row);
  await bust(ref);
}

export async function deleteMyGalleryImage(imgId: string) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("gallery").delete().eq("id", imgId);
  await bust(ref);
}

export async function upsertMyTeamMember(m: Partial<TeamMember> & { id?: string }) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  const row = { tenant_id: ref.id, name: m.name ?? "", role: m.role ?? null, credentials: m.credentials ?? null, photo_url: m.photo_url ?? null, sort_order: m.sort_order ?? 0 };
  if (m.id) await supabase.from("team").update(row).eq("id", m.id);
  else await supabase.from("team").insert(row);
  await bust(ref);
}

export async function deleteMyTeamMember(memberId: string) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("team").delete().eq("id", memberId);
  await bust(ref);
}

// Update ONLY the named fields of one team member (inline editing; mustn't wipe
// the member's other columns the way a partial upsert would).
export async function patchMyTeamMember(id: string, fields: Partial<Pick<TeamMember, "name" | "role">>) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref || !id) return;
  const patch: Record<string, string | null> = {};
  if (fields.name !== undefined) patch.name = fields.name;
  if (fields.role !== undefined) patch.role = fields.role;
  if (Object.keys(patch).length === 0) return;
  await supabase.from("team").update(patch).eq("id", id).eq("tenant_id", ref.id);
  await bust(ref);
}

// Rename a catalog SECTION inline. A section label is shared by every item in
// it, so we look up the reference item's current section and rename them all.
export async function renameMyCatalogSection(refItemId: string, newName: string) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref || !refItemId || !newName) return;
  const { data: item } = await supabase.from("catalog_items").select("section").eq("id", refItemId).eq("tenant_id", ref.id).maybeSingle();
  if (!item) return;
  const old = (item as { section: string | null }).section;
  const base = supabase.from("catalog_items").update({ section: newName }).eq("tenant_id", ref.id);
  await (old === null ? base.is("section", null) : base.eq("section", old));
  await bust(ref);
}

// Rename a catalog CATEGORY inline (scoped within its section, since the same
// category label can recur under different sections).
export async function renameMyCatalogCategory(refItemId: string, newName: string) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref || !refItemId || !newName) return;
  const { data: item } = await supabase.from("catalog_items").select("section,category").eq("id", refItemId).eq("tenant_id", ref.id).maybeSingle();
  if (!item) return;
  const { section, category } = item as { section: string | null; category: string | null };
  let q = supabase.from("catalog_items").update({ category: newName }).eq("tenant_id", ref.id);
  q = section === null ? q.is("section", null) : q.eq("section", section);
  q = category === null ? q.is("category", null) : q.eq("category", category);
  await q;
  await bust(ref);
}

// --- Form submissions (booking + contact enquiries) ------------------------
export interface FormSubmission {
  id: string;
  kind: "booking" | "contact";
  payload: { lines: { label: string; value: string }[] };
  reply_to: string | null;
  status: "new" | "read" | "archived";
  created_at: string;
}

/** The current owner's form submissions (RLS scopes to their tenant). */
export async function getMyFormSubmissions(): Promise<FormSubmission[]> {
  const supabase = await db();
  const { data, error } = await supabase
    .from("form_submissions")
    .select("id,kind,payload,reply_to,status,created_at")
    .order("created_at", { ascending: false })
    .limit(300);
  if (error) return [];
  return (data ?? []) as FormSubmission[];
}

export async function setMyFormSubmissionStatus(id: string, status: "new" | "read" | "archived") {
  const supabase = await db();
  await supabase.from("form_submissions").update({ status }).eq("id", id);
}

// --- billing (self-serve) ---------------------------------------------------
export interface MyBilling {
  subscriptionId: string | null;
  cancelAt: string | null;
}

export async function getMyBilling(): Promise<MyBilling> {
  const supabase = await db();
  const { data } = await supabase.from("tenant_billing").select("stripe_subscription_id,cancel_at").limit(1).maybeSingle();
  const row = data as { stripe_subscription_id?: string | null; cancel_at?: string | null } | null;
  return { subscriptionId: row?.stripe_subscription_id ?? null, cancelAt: row?.cancel_at ?? null };
}

// Cancel at period end — the site stays live until the paid-through date.
export async function cancelMySubscription(): Promise<void> {
  const { subscriptionId } = await getMyBilling();
  const stripe = getStripe();
  if (!stripe || !subscriptionId) throw new Error("No active subscription found.");
  const sub = await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: true });
  // tenant_billing.cancel_at is persisted by the webhook (subscription.updated);
  // here we just trigger Stripe and send the confirmation emails.
  const endDate = sub.cancel_at ? new Date(sub.cancel_at * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : null;
  const supabase = await db();
  const { data: { user } } = await supabase.auth.getUser();
  const tenant = await getMyTenant();
  const name = tenant?.business_name ?? "your business";
  if (user?.email) sendCancellationScheduledEmail({ to: user.email, businessName: name, endDate }).catch(() => {});
  sendAdminLifecycleAlert({ subject: "Client cancelled (self-serve)", businessName: name, detail: endDate ? `Ends ${endDate}.` : "Ends at period end.", tenantId: tenant?.id }).catch(() => {});
}

export async function resumeMySubscription(): Promise<void> {
  const { subscriptionId } = await getMyBilling();
  const stripe = getStripe();
  if (!stripe || !subscriptionId) throw new Error("No subscription found.");
  await stripe.subscriptions.update(subscriptionId, { cancel_at_period_end: false });
}

// --- KYC (self-serve) -------------------------------------------------------
export async function getMyKyc(): Promise<KycSubmission | null> {
  const supabase = await db();
  const { data } = await supabase
    .from("kyc_submissions")
    .select("*")
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return (data as KycSubmission) ?? null;
}

export async function submitMyKyc(fields: {
  legal_name: string;
  business_type?: string | null;
  registration_no?: string | null;
  address?: string | null;
  contact_name?: string | null;
  contact_phone?: string | null;
  notes?: string | null;
}): Promise<void> {
  const supabase = await db();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Not signed in.");
  const { data: tenant } = await supabase.from("tenants").select("id").eq("owner_id", user.id).limit(1).maybeSingle();
  if (!tenant) throw new Error("No site found.");
  const { error } = await supabase.from("kyc_submissions").insert({ tenant_id: tenant.id, ...fields });
  if (error) throw new Error(error.message);
  await supabase.from("tenants").update({ kyc_status: "submitted" }).eq("id", tenant.id);
}
