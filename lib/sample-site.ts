import { buildFor } from "./builds";
import { starterContent } from "./starter";
import type { TenantSite } from "./types";

// Turn a build into a fully-populated TenantSite for the public samples gallery,
// so anyone can preview what a given business type's site looks like.
export function sampleSiteFor(key: string): TenantSite | null {
  const build = buildFor(key);
  if (!build) return null;
  const starter = starterContent(key);

  return {
    tenant: {
      id: `sample-${key}`,
      business_name: build.label,
      preset: key,
      subdomain: key,
      custom_domain: null,
      domain_status: "active",
      published: true,
      plan: "premium",
      plan_status: "active",
      meta_title: null,
      meta_description: null,
      og_image_url: null,
      favicon_url: null,
      analytics_id: null,
    },
    theme: {
      logo_url: null,
      primary_color: starter.theme.primary_color,
      accent_color: starter.theme.accent_color,
      font: starter.theme.font,
    },
    content: {
      ...starter.content,
      phone: "01234 567890",
      email: "hello@example.com",
      address: "12 High Street, Yourtown",
    },
    catalog: starter.items.map((it, i) => ({
      id: `${key}-item-${i}`,
      section: it.section ?? null,
      category: it.category ?? null,
      name: it.name,
      description: it.description ?? null,
      price: it.price ?? null,
      tags: [],
      is_available: true,
      sort_order: i + 1,
    })),
    gallery: [],
    team: [],
  };
}
