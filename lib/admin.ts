import "server-only";
import { getServiceClient } from "./supabase";
import { revalidateTenant, revalidateSiteHost } from "./tenant";
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

// Admin data layer. Uses the SECRET (service_role) client, which bypasses RLS.
// Only call these from inside the authenticated /admin area (the dash layout
// verifies the staff user before any of this runs).

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
  published: boolean;
  plan_status: string;
}

export async function listTenants(): Promise<TenantListRow[]> {
  const { data, error } = await client()
    .from("tenants")
    .select("id,business_name,preset,subdomain,custom_domain,published,plan_status")
    .order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as TenantListRow[];
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
  // Seed the one-to-one rows so the editor has something to write into.
  await c.from("themes").insert({ tenant_id: id });
  await c.from("site_content").insert({ tenant_id: id, content: {} });
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
      "business_name" | "meta_title" | "meta_description" | "og_image_url" | "favicon_url" | "analytics_id" | "custom_domain" | "plan"
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
