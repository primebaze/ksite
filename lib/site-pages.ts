// Multi-page sites: the set of pages a template can expose, and helpers to map
// URL paths <-> pages and build nav hrefs relative to a base path (so the same
// template works on a live tenant domain, in a sample preview, and in the
// owner preview).

import type { TenantSite } from "./types";

export type PageKey = "home" | "about" | "menu" | "services" | "gallery" | "contact" | "reservations";

// Templates accept an optional page + base path so the same component renders as
// a single-page site (default) or, when multiPage is set, one page of a
// multi-page site with nav linking to real routes under basePath.
export interface PresetProps {
  site: TenantSite;
  page?: PageKey;
  basePath?: string;
  multiPage?: boolean;
}

export const SUBPAGE_SLUGS = ["about", "menu", "services", "gallery", "contact", "reservations"] as const;

// Resolve an incoming path segment array to a page (or null = 404).
export function pageFromPath(path?: string[]): PageKey | null {
  if (!path || path.length === 0) return "home";
  if (path.length === 1 && (SUBPAGE_SLUGS as readonly string[]).includes(path[0])) {
    return path[0] as PageKey;
  }
  return null;
}

// Build an href for a page under a base path. basePath "" = tenant root.
export function pageHref(basePath: string, page: PageKey): string {
  if (page === "home") return basePath === "" ? "/" : basePath;
  return `${basePath}/${page}`;
}
