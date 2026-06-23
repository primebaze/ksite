import type { CSSProperties } from "react";
import type { CatalogGroup } from "./shared";

// Shared, theme-aware "service cards" layout for non-restaurant designs. Every
// service shows as a card with a photo, name, price and description, in one
// dense responsive grid. Categories aren't used as big section headers (which
// look sparse when a category has only a couple of services) — instead each
// card carries its category as a small tag, so structure is kept and the grid
// always reads full.
//
// Photos: there is no per-service image in the data model, so cards cycle
// through the site's own gallery photos (real and on-theme). When a site has no
// gallery, cards render cleanly with a tinted initial — never a broken image.
export interface ServiceCardsTone {
  ink: string;
  muted: string;
  price: string;
  border: string;
  cardBg: string;
  /** Tint shown behind the service initial when there is no photo. */
  placeholderBg: string;
}

export function ServiceCards({
  groups,
  photos,
  tone,
  nameStyle,
  radius = "1rem",
  columns = 3,
}: {
  groups: CatalogGroup[];
  photos: string[];
  tone: ServiceCardsTone;
  nameStyle?: CSSProperties;
  radius?: string;
  columns?: 2 | 3;
}) {
  // Flatten every service into one list, remembering each one's category label.
  const items = groups.flatMap((s) =>
    s.categories.flatMap((c) => c.items.map((it) => ({ it, label: c.category ?? s.section ?? null }))),
  );
  const hasPhotos = photos.length > 0;
  const gridCols = columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid grid-cols-1 gap-5 ${gridCols}`}>
      {items.map(({ it, label }, i) => {
        const photo = hasPhotos ? photos[i % photos.length] : null;
        return (
          <div
            key={it.id}
            className="flex flex-col overflow-hidden border"
            style={{ borderColor: tone.border, background: tone.cardBg, borderRadius: radius }}
          >
            {photo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="flex aspect-[4/3] w-full items-center justify-center text-3xl font-semibold" style={{ background: tone.placeholderBg, color: tone.muted }}>
                {it.name.trim().charAt(0).toUpperCase()}
              </div>
            )}
            <div className="flex flex-1 flex-col p-5">
              {label && (
                <span data-edit={it.category ? `category:${it.id}` : `section:${it.id}`} className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.2em]" style={{ color: tone.muted }}>
                  {label}
                </span>
              )}
              <div className="flex items-baseline justify-between gap-4">
                <p data-edit={`item:${it.id}:name`} style={{ ...nameStyle, color: tone.ink }} className="text-lg leading-snug">
                  {it.name}
                </p>
                {it.price && (
                  <span data-edit={`item:${it.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: tone.price }}>
                    {it.price}
                  </span>
                )}
              </div>
              {it.description && (
                <p data-edit={`item:${it.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: tone.muted }}>
                  {it.description}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
