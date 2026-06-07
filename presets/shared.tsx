import type { CSSProperties } from "react";
import type { CatalogItem, Theme } from "@/lib/types";

// Theme → CSS variables. Templates read var(--primary)/var(--accent) so one
// tenant's brand restyles the whole site from data.
export function themeStyle(theme: Theme): CSSProperties {
  return {
    // @ts-expect-error custom properties
    "--primary": theme.primary_color,
    "--accent": theme.accent_color,
  };
}

export function fontClass(theme: Theme): string {
  return theme.font === "serif" ? "font-serif" : "font-sans";
}

// Group catalog items by section, then category, preserving sort order.
export interface CatalogGroup {
  section: string;
  categories: { category: string | null; items: CatalogItem[] }[];
}

export function groupCatalog(items: CatalogItem[]): CatalogGroup[] {
  const available = items.filter((i) => i.is_available);
  const sections: CatalogGroup[] = [];
  for (const item of available) {
    const sectionName = item.section ?? "";
    let section = sections.find((s) => s.section === sectionName);
    if (!section) {
      section = { section: sectionName, categories: [] };
      sections.push(section);
    }
    let cat = section.categories.find((c) => c.category === item.category);
    if (!cat) {
      cat = { category: item.category, items: [] };
      section.categories.push(cat);
    }
    cat.items.push(item);
  }
  return sections;
}

export function Tag({ children }: { children: string }) {
  return (
    <span className="inline-block rounded-full border border-current/30 px-2 py-0.5 text-[10px] uppercase tracking-wide opacity-70">
      {children}
    </span>
  );
}
