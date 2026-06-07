import type { CSSProperties, ReactNode } from "react";
import type { CatalogItem, SiteContent, TenantSite, Theme } from "@/lib/types";

// ---------------------------------------------------------------------------
// Design-variant system. One set of components renders every site; the chosen
// `style` rotates typography, rhythm, shapes and hero treatment so two sites
// of the same type never look identical.
// ---------------------------------------------------------------------------

export type SiteStyle = "editorial" | "bold" | "minimal" | "warm" | "luxe" | "classic";
const STYLES: SiteStyle[] = ["editorial", "bold", "minimal", "warm", "luxe", "classic"];

export function resolveStyle(content: SiteContent): SiteStyle {
  const s = content.style;
  return s && STYLES.includes(s) ? s : "classic";
}

export interface StyleTokens {
  style: SiteStyle;
  serif: boolean;
  /** Heading classes (weight/tracking/leading). Pair with `font-display`. */
  heading: string;
  /** Section label treatment. */
  label: "caps" | "serif";
  heroAlign: "left" | "center";
  /** Overlay over hero imagery. */
  heroOverlay: string;
  /** Hero base gradient when no image. */
  heroBase: string;
  /** Corner radius for buttons. */
  btn: string;
  /** Corner radius for cards/inputs. */
  card: string;
  /** A faint section background tint. */
  tint: string;
  /** Whether the hero kicker (tagline) sits above the headline. */
}

const defaultSerif: Record<SiteStyle, boolean> = {
  editorial: true,
  warm: true,
  luxe: true,
  classic: false,
  bold: false,
  minimal: false,
};

export function tokensFor(content: SiteContent, theme: Theme): StyleTokens {
  const style = resolveStyle(content);
  const serif = theme.font ? theme.font === "serif" : defaultSerif[style];

  const base: StyleTokens = {
    style,
    serif,
    heading: "font-semibold tracking-tight",
    label: "caps",
    heroAlign: "left",
    heroOverlay: "bg-gradient-to-t from-black/85 via-black/45 to-black/30",
    heroBase: "bg-gradient-to-br from-[var(--primary)] via-neutral-900 to-black",
    btn: "rounded-lg",
    card: "rounded-2xl",
    tint: "bg-neutral-50",
  };

  switch (style) {
    case "editorial":
      return { ...base, heading: "font-medium tracking-tight leading-[1.03]", label: "serif", heroAlign: "left", btn: "rounded-none", card: "rounded-none", tint: "bg-[#faf8f4]" };
    case "bold":
      return { ...base, heading: "font-bold tracking-[-0.03em] leading-[0.95]", label: "caps", heroAlign: "left", heroOverlay: "bg-gradient-to-r from-black/90 via-black/55 to-black/10", btn: "rounded-md", card: "rounded-xl", tint: "bg-neutral-100" };
    case "minimal":
      return { ...base, heading: "font-semibold tracking-tight", label: "caps", heroAlign: "center", heroOverlay: "bg-gradient-to-t from-black/70 via-black/30 to-black/20", btn: "rounded-full", card: "rounded-2xl", tint: "bg-neutral-50" };
    case "warm":
      return { ...base, heading: "font-medium tracking-tight leading-[1.05]", label: "serif", heroAlign: "center", heroOverlay: "bg-gradient-to-t from-black/80 via-black/35 to-black/25", btn: "rounded-full", card: "rounded-[1.75rem]", tint: "bg-[#fbf7f2]" };
    case "luxe":
      return { ...base, heading: "font-medium tracking-[0.01em] leading-[1.04]", label: "caps", heroAlign: "center", heroOverlay: "bg-gradient-to-t from-black/90 via-black/55 to-black/40", heroBase: "bg-gradient-to-b from-neutral-900 via-black to-black", btn: "rounded-none", card: "rounded-none", tint: "bg-[#f5f2ec]" };
    case "classic":
    default:
      return base;
  }
}

/** Root inline style: brand colours + the resolved font families. */
export function siteRootStyle(theme: Theme, tokens: StyleTokens): CSSProperties {
  const display = tokens.serif
    ? "var(--font-fraunces)"
    : tokens.style === "bold"
      ? "var(--font-space)"
      : "var(--font-inter)";
  return {
    // @ts-expect-error custom properties
    "--primary": theme.primary_color || "#111111",
    "--accent": theme.accent_color || "#111111",
    "--site-display": display,
    "--site-body": "var(--font-inter)",
  };
}

export function cx(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

// Theme → CSS variables (kept for backwards compatibility).
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

// ---------------------------------------------------------------------------
// Catalog grouping
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Shared premium building blocks
// ---------------------------------------------------------------------------

export interface NavItem {
  label: string;
  href: string;
}

/** Smooth-scroll behaviour + sticky-nav offset, scoped to the site. */
export function SiteSmoothScroll() {
  return (
    <style>{`html{scroll-behavior:smooth}section[id]{scroll-margin-top:5rem}`}</style>
  );
}

/** Small section label / kicker. */
export function Label({ tokens, children }: { tokens: StyleTokens; children: ReactNode }) {
  if (tokens.label === "serif") {
    return <p className="font-display text-base italic text-[var(--primary)]">{children}</p>;
  }
  return <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">{children}</p>;
}

/** Section heading with an accent rule. */
export function SectionHeading({ tokens, kicker, title, center }: { tokens: StyleTokens; kicker?: string; title: string; center?: boolean }) {
  return (
    <div className={center ? "text-center" : ""}>
      {kicker && (
        <div className={cx("flex items-center gap-3", center && "justify-center")}>
          <Label tokens={tokens}>{kicker}</Label>
        </div>
      )}
      <h2 className={cx("font-display mt-3 text-3xl sm:text-4xl", tokens.heading)}>{title}</h2>
      <div className={cx("mt-5 h-px w-16 bg-[var(--accent)]", center && "mx-auto")} />
    </div>
  );
}

/** Sticky translucent header with anchor nav + CTA. */
export function SiteHeader({
  site,
  tokens,
  nav,
  cta,
}: {
  site: TenantSite;
  tokens: StyleTokens;
  nav: NavItem[];
  cta?: { label: string; href: string };
}) {
  const { tenant, theme } = site;
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-3.5">
        <a href="#top" className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logo_url} alt={tenant.business_name} className="h-8 w-auto object-contain" />
          ) : null}
          <span className="font-display text-lg font-semibold tracking-tight text-neutral-900">{tenant.business_name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm font-medium text-neutral-600 transition hover:text-neutral-900">
              {n.label}
            </a>
          ))}
        </nav>
        {cta && (
          <a
            href={cta.href}
            className={cx(
              "hidden shrink-0 bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition active:scale-[0.98] hover:opacity-90 sm:inline-flex",
              tokens.btn,
            )}
          >
            {cta.label}
          </a>
        )}
      </div>
    </header>
  );
}

/** Centered "about" statement. */
export function AboutSection({ tokens, about, kicker = "About" }: { tokens: StyleTokens; about?: string; kicker?: string }) {
  if (!about) return null;
  return (
    <section id="about" className="mx-auto max-w-3xl px-6 py-24 text-center">
      <Label tokens={tokens}>{kicker}</Label>
      <p data-edit="content.about" className={cx("font-display mt-6 text-2xl leading-relaxed text-neutral-800 sm:text-[2rem] sm:leading-[1.45]", tokens.serif ? "font-normal" : "font-light")}>
        {about}
      </p>
    </section>
  );
}

/** Masonry-ish gallery grid. */
export function GallerySection({ gallery }: { gallery: TenantSite["gallery"] }) {
  if (!gallery.length) return null;
  return (
    <section id="gallery" className="bg-neutral-950">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3">
        {gallery.map((g) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover transition duration-500 hover:opacity-90" />
        ))}
      </div>
    </section>
  );
}

/** Contact + Hours + Map, then a brand footer bar. */
export function ContactFooter({
  site,
  tokens,
  cta,
}: {
  site: TenantSite;
  tokens: StyleTokens;
  cta?: { label: string; href: string };
}) {
  const { tenant, content } = site;
  const hasContact = content.phone || content.email || content.address || (content.hours && content.hours.length);
  return (
    <>
      {hasContact && (
        <section id="contact" className="border-t border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="Get in touch" title="Come say hello" />
            <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1.1fr]">
              <div className="grid gap-8 sm:grid-cols-2">
                {content.address && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Find us</p>
                    <p className="mt-2 text-neutral-700">{content.address}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Contact</p>
                  {content.phone && <a href={`tel:${content.phone}`} className="mt-2 block text-neutral-700 hover:text-[var(--primary)]">{content.phone}</a>}
                  {content.email && <a href={`mailto:${content.email}`} className="block text-neutral-700 hover:text-[var(--primary)]">{content.email}</a>}
                </div>
                {content.hours && content.hours.length > 0 && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Opening hours</p>
                    <ul className="mt-2 space-y-1">
                      {content.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-8 border-b border-dashed border-neutral-200 py-1.5 text-neutral-700">
                          <span>{h.day}</span>
                          <span className="text-neutral-500">{h.open}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {content.socials && content.socials.length > 0 && (
                  <div className="sm:col-span-2 flex flex-wrap gap-4">
                    {content.socials.map((s) => (
                      <a key={s.url} href={s.url} className="text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline">{s.label}</a>
                    ))}
                  </div>
                )}
                {cta && (
                  <div className="sm:col-span-2">
                    <a href={cta.href} className={cx("inline-flex bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>{cta.label}</a>
                  </div>
                )}
              </div>
              {content.map_url ? (
                <div className={cx("overflow-hidden border border-black/5", tokens.card)}>
                  <iframe src={content.map_url} title="Map" className="h-full min-h-[300px] w-full" loading="lazy" />
                </div>
              ) : content.address ? (
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(content.address)}`}
                  target="_blank"
                  rel="noreferrer"
                  className={cx("flex min-h-[260px] items-center justify-center border border-dashed border-neutral-300 bg-neutral-50 text-sm font-medium text-neutral-500 transition hover:text-[var(--primary)]", tokens.card)}
                >
                  View on the map ↗
                </a>
              ) : null}
            </div>
          </div>
        </section>
      )}

      <footer className="bg-[var(--primary)] text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-12 text-center sm:flex-row sm:justify-between sm:text-left">
          <span className="font-display text-xl font-semibold tracking-tight">{tenant.business_name}</span>
          <p className="text-sm text-white/60">© {tenant.business_name}. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}

/** Primary/secondary hero buttons, contrast-safe on the dark hero. */
export function HeroButtons({
  tokens,
  primary,
  secondary,
}: {
  tokens: StyleTokens;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <div className={cx("mt-9 flex flex-wrap gap-3", tokens.heroAlign === "center" && "justify-center")}>
      {primary && (
        <a href={primary.href} className={cx("inline-flex bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 shadow-lg transition active:scale-[0.98] hover:bg-white/90", tokens.btn)}>
          {primary.label}
        </a>
      )}
      {secondary && (
        <a href={secondary.href} className={cx("inline-flex border border-white/40 px-7 py-3.5 text-sm font-medium text-white backdrop-blur transition active:scale-[0.98] hover:bg-white/10", tokens.btn)}>
          {secondary.label}
        </a>
      )}
    </div>
  );
}
