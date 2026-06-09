import { buildFor, heroFor } from "./builds";
import { starterContent } from "./starter";
import type { TenantSite } from "./types";

// Which bespoke full-page design is the default for a given build key. Lets the
// samples (and sub-page navigation, which carries no ?design query) render the
// right design automatically. ?design= still overrides this for previews.
// EVERY Food & drink build key is mapped to one of the 6 designs (by closest
// aesthetic) so the whole sector uses the new designs, not the old template.
const BUILD_DESIGN: Record<string, string> = {
  // ember — dark, luxe, premium steakhouse
  steakhouse: "ember",
  // marble — charcoal & gold grill / lounge
  bbq: "marble",
  cocktail_bar: "marble",
  // drift — light, photo-led, fresh (Japanese / Nordic)
  sushi: "drift",
  japanese: "drift",
  poke: "drift",
  juice_bar: "drift",
  vegan: "drift",
  deli: "drift",
  // laurel — elegant modern-European fine dining
  fine_dining: "laurel",
  restaurant: "laurel",
  bistro: "laurel",
  brasserie: "laurel",
  italian: "laurel",
  tapas: "laurel",
  wine_bar: "laurel",
  patisserie: "laurel",
  // lantern — dark, moody, bold (Asian / bar / pub)
  bar: "lantern",
  pub: "lantern",
  gastropub: "lantern",
  chinese: "lantern",
  thai: "lantern",
  indian: "lantern",
  mexican: "lantern",
  // daybreak — bright, energetic, all-day / casual
  brunch_cafe: "daybreak",
  cafe: "daybreak",
  coffee_shop: "daybreak",
  tearoom: "daybreak",
  bakery: "daybreak",
  ice_cream: "daybreak",
  burger_joint: "daybreak",
  food_truck: "daybreak",
  pizzeria: "daybreak",
};

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
      ...(BUILD_DESIGN[key] ? { design: BUILD_DESIGN[key] } : {}),
      hero_image_url: heroFor(key),
      phone: "01234 567890",
      email: "hello@example.com",
      address: "12 High Street, Yourtown",
      map_url: "https://maps.google.com/?q=12+High+Street",
      // Sample sites are shown as if the owner already filled everything in.
      socials: [
        { label: "Instagram", url: "https://instagram.com" },
        { label: "Facebook", url: "https://facebook.com" },
        { label: "TikTok", url: "https://tiktok.com" },
      ],
      ...(build.archetype === "menu"
        ? {
            ordering_links: [
              { label: "Order on Deliveroo", url: "https://deliveroo.co.uk" },
              { label: "Order on Uber Eats", url: "https://ubereats.com" },
            ],
          }
        : {}),
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
