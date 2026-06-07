// Shared domain types for the Website-as-a-Service platform.
// The engine is preset-driven: one set of generic tables serves every vertical.
// Preset-specific meaning lives in `site_content` (JSON) and the templates.

// A tenant's vertical key (e.g. "salon", "restaurant", "plumber"). The full
// list + their template archetypes live in lib/verticals.ts.
export type Preset = string;

export type PlanStatus =
  | "trialing"
  | "active"
  | "past_due"
  | "suspended"
  | "canceled";

export type DomainStatus = "pending" | "registering" | "verifying" | "active" | "error";

export interface Theme {
  logo_url: string | null;
  primary_color: string;
  accent_color: string;
  font: string | null;
}

/**
 * Loose, preset-specific content. Stored as one JSONB blob per tenant.
 * Not every key is used by every preset — templates read what they need.
 */
export interface SiteContent {
  tagline?: string;
  hero_image_url?: string;
  about?: string;
  cuisine_type?: string; // restaurant
  hours?: { day: string; open: string }[];
  address?: string;
  map_url?: string;
  phone?: string;
  email?: string;
  reservation_url?: string; // restaurant / salon
  booking_url?: string; // salon
  ordering_links?: { label: string; url: string; commission_free?: boolean }[]; // restaurant
  service_areas?: string[]; // trades
  accreditations?: string[]; // trades (Gas Safe, NICEIC, etc.)
  emergency_phone?: string; // trades
  socials?: { label: string; url: string }[];
  cta_label?: string;
  cta_url?: string;
}

/**
 * Generic repeating item. Maps to:
 *  - restaurant → a menu dish (section = "Dinner", category = "Starters")
 *  - trades     → a service offered (section = "Plumbing")
 *  - salon      → a treatment (section = "Hair", category = "Colour")
 */
export interface CatalogItem {
  id: string;
  section: string | null;
  category: string | null;
  name: string;
  description: string | null;
  price: string | null; // text for flexibility: "£12", "from £45", "Free quote"
  tags: string[]; // dietary/allergen (food), or feature tags
  is_available: boolean;
  sort_order: number;
}

export interface GalleryImage {
  id: string;
  image_url: string;
  caption: string | null;
  sort_order: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string | null;
  credentials: string | null;
  photo_url: string | null;
  sort_order: number;
}

export interface Tenant {
  id: string;
  business_name: string;
  preset: Preset;
  subdomain: string;
  custom_domain: string | null;
  domain_status: DomainStatus;
  published: boolean;
  plan: "basic" | "standard" | "premium" | null;
  plan_status: PlanStatus;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  favicon_url: string | null;
  analytics_id: string | null;
}

/** Everything a template needs to render a full site. */
export interface TenantSite {
  tenant: Tenant;
  theme: Theme;
  content: SiteContent;
  catalog: CatalogItem[];
  gallery: GalleryImage[];
  team: TeamMember[];
}
