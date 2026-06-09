import "server-only";
import { createSupabaseServerClient } from "./supabase-server";
import { revalidateSiteHost, revalidateTenant } from "./tenant";
import { addProjectDomain, isDomainLive, isVercelConfigured } from "./vercel";
import { sendAdminDomainLiveNotification, sendDomainLiveEmail } from "./email";
import type {
  CatalogItem,
  GalleryImage,
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
  const { data } = await supabase.from("tenants").select("*").limit(1);
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
  const { data: tRows } = await supabase.from("tenants").select("*").limit(1);
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
  const { data } = await supabase.from("tenants").select("id,subdomain,custom_domain").limit(1);
  return data?.[0] as Pick<Tenant, "id" | "subdomain" | "custom_domain"> | undefined;
}

export async function updateMyContent(content: SiteContent) {
  const supabase = await db();
  const ref = await myRef();
  if (!ref) return;
  await supabase.from("site_content").update({ content }).eq("tenant_id", ref.id);
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
