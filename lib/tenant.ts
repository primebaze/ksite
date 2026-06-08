import "server-only";
import { unstable_cache, revalidateTag } from "next/cache";
import { getPublicClient } from "./supabase";
import { mockSiteByHost } from "./mock-data";
import { parseHost, type ParsedHost } from "./host";
import type {
  CatalogItem,
  GalleryImage,
  SiteContent,
  TeamMember,
  Tenant,
  TenantSite,
  Theme,
} from "./types";

const REVALIDATE_SECONDS = 3600;

/**
 * Resolve the full site for an incoming hostname.
 * - No Supabase env  → built-in demo data (zero-setup local dev).
 * - Supabase env set → DB, cached with per-tenant tags for cheap ISR.
 */
export async function getSiteByHost(rawHost: string): Promise<TenantSite | null> {
  const parsed = parseHost(rawHost);
  if (parsed.kind === "root") return null;

  const supabase = getPublicClient();
  if (!supabase) {
    // Demo mode only knows subdomains.
    if (parsed.kind === "subdomain" && parsed.subdomain) {
      return mockSiteByHost(parsed.subdomain);
    }
    return null;
  }

  const tenantId = await resolveTenantId(parsed);
  if (!tenantId) return null;
  return loadSiteById(tenantId);
}

// host → tenant id (cheap, cached, invalidated by site:* tag) ----------------
function resolveTenantId(parsed: ParsedHost): Promise<string | null> {
  const key = parsed.kind === "subdomain" ? parsed.subdomain! : parsed.host;
  return unstable_cache(
    async () => {
      const supabase = getPublicClient();
      if (!supabase) return null;
      const column = parsed.kind === "subdomain" ? "subdomain" : "custom_domain";
      const { data } = await supabase
        .from("tenants")
        .select("id")
        .eq(column, key)
        .maybeSingle();
      return (data?.id as string) ?? null;
    },
    ["tenant-id", parsed.kind, key],
    { tags: [`site:${parsed.kind}:${key}`], revalidate: REVALIDATE_SECONDS },
  )();
}

// tenant id → full site bundle (cached, invalidated by tenant:<id> tag) ------
function loadSiteById(id: string): Promise<TenantSite | null> {
  return unstable_cache(
    async () => {
      const supabase = getPublicClient();
      if (!supabase) return null;

      const [tenantRes, themeRes, contentRes, catalogRes, galleryRes, teamRes] =
        await Promise.all([
          supabase.from("tenants").select("*").eq("id", id).maybeSingle(),
          supabase.from("themes").select("*").eq("tenant_id", id).maybeSingle(),
          supabase.from("site_content").select("content").eq("tenant_id", id).maybeSingle(),
          supabase.from("catalog_items").select("*").eq("tenant_id", id).order("sort_order"),
          supabase.from("gallery").select("*").eq("tenant_id", id).order("sort_order"),
          supabase.from("team").select("*").eq("tenant_id", id).order("sort_order"),
        ]);

      const t = tenantRes.data;
      if (!t) return null;

      const tenant: Tenant = {
        id: t.id,
        business_name: t.business_name,
        preset: t.preset,
        subdomain: t.subdomain,
        custom_domain: t.custom_domain,
        domain_status: t.domain_status,
        published: t.published,
        plan: t.plan,
        plan_status: t.plan_status,
        meta_title: t.meta_title,
        meta_description: t.meta_description,
        og_image_url: t.og_image_url,
        favicon_url: t.favicon_url,
        analytics_id: t.analytics_id,
      };

      const theme: Theme = themeRes.data
        ? {
            logo_url: themeRes.data.logo_url,
            primary_color: themeRes.data.primary_color,
            accent_color: themeRes.data.accent_color,
            font: themeRes.data.font,
          }
        : { logo_url: null, primary_color: "#111111", accent_color: "#c8a24a", font: null };

      return {
        tenant,
        theme,
        content: (contentRes.data?.content ?? {}) as SiteContent,
        catalog: (catalogRes.data ?? []) as CatalogItem[],
        gallery: (galleryRes.data ?? []) as GalleryImage[],
        team: (teamRes.data ?? []) as TeamMember[],
      };
    },
    ["site", id],
    { tags: [`tenant:${id}`], revalidate: REVALIDATE_SECONDS },
  )();
}

// Invalidation helpers, called from the admin panel after an edit.
// Next 16's revalidateTag takes (tag, profile); { expire: 0 } purges the tag
// immediately so the next request refetches that tenant's data.
export async function revalidateTenant(tenantId: string) {
  revalidateTag(`tenant:${tenantId}`, { expire: 0 });
}

export async function revalidateSiteHost(
  kind: "subdomain" | "custom",
  key: string,
) {
  revalidateTag(`site:${kind}:${key}`, { expire: 0 });
}
