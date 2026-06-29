import type { CSSProperties } from "react";
import type { CatalogGroup } from "./shared";
import type { CatalogItem } from "@/lib/types";

// Shared, theme-aware catalog layouts so designs can present their menu /
// services in different shapes (cards, carousel) instead of the same stacked
// row list everywhere. Each design passes a `tone` from its own palette; the
// item:/section: edit hooks are preserved so inline editing keeps working.
export interface CatalogTone {
  ink: string;
  muted: string;
  accent: string; // price colour
  border: string;
  cardBg: string;
  nameStyle?: CSSProperties; // e.g. a serif display font
  headingStyle?: CSSProperties;
  radius?: string;
}

function sectionRefId(g: CatalogGroup): string {
  return g.categories[0]?.items[0]?.id ?? "";
}

function SectionHeading({ group, tone }: { group: CatalogGroup; tone: CatalogTone }) {
  if (!group.section) return null;
  return (
    <h3
      data-edit={`section:${sectionRefId(group)}`}
      className="mb-6 text-lg uppercase tracking-[0.16em]"
      style={{ ...tone.headingStyle, color: tone.ink }}
    >
      {group.section}
    </h3>
  );
}

function ItemCard({ item, tone }: { item: CatalogItem; tone: CatalogTone }) {
  return (
    <div
      className="flex h-full flex-col border p-6"
      style={{ borderColor: tone.border, background: tone.cardBg, borderRadius: tone.radius ?? "1rem" }}
    >
      <div className="flex items-baseline justify-between gap-4">
        <p data-edit={`item:${item.id}:name`} className="text-lg leading-snug" style={{ ...tone.nameStyle, color: tone.ink }}>
          {item.name}
        </p>
        {item.price && (
          <span data-edit={`item:${item.id}:price`} className="shrink-0 font-semibold" style={{ color: tone.accent }}>
            {item.price}
          </span>
        )}
      </div>
      {item.description && (
        <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: tone.muted }}>
          {item.description}
        </p>
      )}
    </div>
  );
}

// Responsive card grid, grouped by section.
export function CatalogCards({ groups, tone, columns = 3 }: { groups: CatalogGroup[]; tone: CatalogTone; columns?: 2 | 3 }) {
  const cols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";
  return (
    <div className="space-y-14">
      {groups.map((g, gi) => (
        <div key={g.section || gi}>
          <SectionHeading group={g} tone={tone} />
          <div className={`grid grid-cols-1 gap-5 ${cols}`}>
            {g.categories.flatMap((c) => c.items).map((it) => (
              <ItemCard key={it.id} item={it} tone={tone} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Horizontal scroll-snap carousel of cards, per section. CSS-only (no JS).
export function CatalogCarousel({ groups, tone }: { groups: CatalogGroup[]; tone: CatalogTone }) {
  return (
    <div className="space-y-12">
      {groups.map((g, gi) => (
        <div key={g.section || gi}>
          <SectionHeading group={g} tone={tone} />
          <div className="-mx-1 flex snap-x snap-mandatory gap-5 overflow-x-auto px-1 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {g.categories.flatMap((c) => c.items).map((it) => (
              <div key={it.id} className="w-72 shrink-0 snap-start sm:w-80">
                <ItemCard item={it} tone={tone} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
