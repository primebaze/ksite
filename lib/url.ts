// URL safety for tenant-supplied links. Tenant content (cta_url, booking_url,
// socials, ordering links, etc.) is rendered straight into href on public
// pages, so a `javascript:`/`data:` scheme would be stored XSS. We sanitise at
// the write choke points (updateMyContent / updateContent) so nothing unsafe is
// ever persisted — this covers every preset without touching 150 templates.

import type { SiteContent } from "./types";

// Returns a safe href, or "" if the value isn't an allowed scheme. Permits
// http(s), mailto, tel, relative paths and anchors; rewrites bare domains to
// https. Blocks javascript:, data:, vbscript:, etc.
export function sanitizeUrl(value: string | null | undefined): string {
  if (!value) return "";
  const v = value.trim();
  if (!v) return "";
  if (/^(https?:|mailto:|tel:)/i.test(v)) return v;
  if (/^[/#?]/.test(v)) return v; // relative path / anchor / query
  // Reject anything with an explicit, non-allowed scheme (javascript:, data:…).
  if (/^[a-z][a-z0-9+.-]*:/i.test(v)) return "";
  // Bare domain like "example.com/x" → assume https.
  if (/^[\w.-]+\.[a-z]{2,}([/?#].*)?$/i.test(v)) return `https://${v}`;
  return "";
}

const URL_FIELDS = ["cta_url", "booking_url", "reservation_url", "map_url", "hero_video_url", "hero_image_url"] as const;

// Sanitise every tenant-controlled URL field on a content blob before persisting.
export function sanitizeContentUrls(content: SiteContent): SiteContent {
  const c: SiteContent = { ...content };
  for (const f of URL_FIELDS) {
    const val = c[f as keyof SiteContent];
    if (typeof val === "string") {
      const safe = sanitizeUrl(val);
      // Keep the field present but emptied if it was unsafe.
      (c as Record<string, unknown>)[f] = safe || undefined;
    }
  }
  if (Array.isArray(c.socials)) {
    c.socials = c.socials.map((s) => ({ ...s, url: sanitizeUrl(s.url) })).filter((s) => s.url);
  }
  if (Array.isArray(c.ordering_links)) {
    c.ordering_links = c.ordering_links.map((o) => ({ ...o, url: sanitizeUrl(o.url) })).filter((o) => o.url);
  }
  return c;
}
