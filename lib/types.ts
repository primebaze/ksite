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
 * Not every key is used by every preset: templates read what they need.
 */
export interface SiteContent {
  tagline?: string;
  /** Visual design variant (see SiteStyle in presets/shared). */
  style?: "editorial" | "bold" | "minimal" | "warm" | "luxe" | "classic";
  /** Bespoke full-page design (real-world-inspired layouts, e.g. "ember"). Overrides `style` when set. */
  design?: string;
  /** Layout variant for the list/body section (e.g. services shown as a list vs cards). */
  body_variant?: "list" | "cards";
  /** Layout variant for the footer / contact section. */
  footer_variant?: "detailed" | "minimal";
  /** Built-in lead forms (included by default; owner can switch off). Undefined = on. */
  booking_enabled?: boolean;
  contact_form_enabled?: boolean;
  hero_image_url?: string;
  /** Looping background video for the hero (Premium). Takes priority over the image. */
  hero_video_url?: string;
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
  // Optional: absent until the 0006 migration; reads default to active/none.
  account_status?: AccountStatus;
  kyc_status?: KycStatus;
  meta_title: string | null;
  meta_description: string | null;
  og_image_url: string | null;
  favicon_url: string | null;
  analytics_id: string | null;
}

export type AccountStatus = "active" | "suspended";
export type KycStatus = "none" | "requested" | "submitted" | "approved" | "rejected";

export interface KycSubmission {
  id: string;
  tenant_id: string;
  legal_name: string;
  business_type: string | null;
  registration_no: string | null;
  address: string | null;
  contact_name: string | null;
  contact_phone: string | null;
  notes: string | null;
  status: "submitted" | "approved" | "rejected";
  review_note: string | null;
  submitted_at: string;
  reviewed_at: string | null;
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

// --- Support tickets --------------------------------------------------------
export type TicketStatus = "open" | "pending" | "closed";

export interface SupportTicket {
  id: string;
  tenant_id: string;
  subject: string;
  status: TicketStatus;
  created_by: string | null;
  created_at: string;
  updated_at: string;
  last_message_at: string;
}

export interface TicketMessage {
  id: string;
  ticket_id: string;
  author_role: "client" | "staff";
  author_id: string | null;
  body: string;
  created_at: string;
}
