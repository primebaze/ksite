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
  /** Hero layout structure — drives a genuinely different arrangement. */
  hero: "bold" | "luxe" | "editorial" | "classic" | "warm" | "minimal";
  /** Whether the hero sits on dark imagery (white overlay nav) or light. */
  heroDark: boolean;
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
    hero: "classic",
    heroDark: false,
  };

  switch (style) {
    case "editorial":
      return { ...base, heading: "font-medium tracking-tight leading-[1.03]", label: "serif", heroAlign: "left", btn: "rounded-none", card: "rounded-none", tint: "bg-[#faf8f4]", hero: "editorial", heroDark: false };
    case "bold":
      return { ...base, heading: "font-bold tracking-[-0.03em] leading-[0.95]", label: "caps", heroAlign: "left", heroOverlay: "bg-gradient-to-r from-black/90 via-black/55 to-black/10", btn: "rounded-md", card: "rounded-xl", tint: "bg-neutral-100", hero: "bold", heroDark: true };
    case "minimal":
      return { ...base, heading: "font-semibold tracking-tight", label: "caps", heroAlign: "center", btn: "rounded-full", card: "rounded-2xl", tint: "bg-neutral-50", hero: "minimal", heroDark: false };
    case "warm":
      return { ...base, heading: "font-medium tracking-tight leading-[1.05]", label: "serif", heroAlign: "center", btn: "rounded-full", card: "rounded-[1.75rem]", tint: "bg-[#fbf7f2]", hero: "warm", heroDark: false };
    case "luxe":
      return { ...base, heading: "font-medium tracking-[0.01em] leading-[1.04]", label: "caps", heroAlign: "center", heroOverlay: "bg-gradient-to-t from-black/90 via-black/55 to-black/40", heroBase: "bg-gradient-to-b from-neutral-900 via-black to-black", btn: "rounded-none", card: "rounded-none", tint: "bg-[#f5f2ec]", hero: "luxe", heroDark: true };
    case "classic":
    default:
      return { ...base, hero: "classic", heroDark: false };
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
  const dark = tokens.heroDark;
  return (
    <header
      className={cx(
        "z-50",
        dark
          ? "absolute inset-x-0 top-0 bg-gradient-to-b from-black/35 to-transparent"
          : "relative border-b border-black/5 bg-white",
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <a href="#top" className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logo_url} alt={tenant.business_name} className="h-8 w-auto object-contain" />
          ) : null}
          <span className={cx("font-display text-lg font-semibold tracking-tight", dark ? "text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.55)]" : "text-neutral-900")}>{tenant.business_name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className={cx("text-sm font-medium transition", dark ? "text-white/80 hover:text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]" : "text-neutral-600 hover:text-neutral-900")}>
              {n.label}
            </a>
          ))}
        </nav>
        {cta && (
          <a
            href={cta.href}
            className={cx(
              "hidden shrink-0 px-5 py-2.5 text-sm font-semibold transition active:scale-[0.98] sm:inline-flex",
              dark ? "border border-white/40 text-white backdrop-blur-sm hover:bg-white/10" : "bg-[var(--primary)] text-white hover:opacity-90",
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

/** Primary/secondary hero buttons. `onLight` switches to dark-on-light styling. */
export function HeroButtons({
  tokens,
  primary,
  secondary,
  onLight,
  center,
}: {
  tokens: StyleTokens;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  onLight?: boolean;
  center?: boolean;
}) {
  return (
    <div className={cx("mt-9 flex flex-wrap gap-3", center && "justify-center")}>
      {primary && (
        <a
          href={primary.href}
          className={cx(
            "inline-flex px-7 py-3.5 text-sm font-semibold shadow-lg transition active:scale-[0.98]",
            onLight ? "bg-[var(--primary)] text-white hover:opacity-90" : "bg-white text-neutral-900 hover:bg-white/90",
            tokens.btn,
          )}
        >
          {primary.label}
        </a>
      )}
      {secondary && (
        <a
          href={secondary.href}
          className={cx(
            "inline-flex px-7 py-3.5 text-sm font-medium transition active:scale-[0.98]",
            onLight ? "border border-neutral-300 text-neutral-800 hover:bg-neutral-100" : "border border-white/40 text-white backdrop-blur hover:bg-white/10",
            tokens.btn,
          )}
        >
          {secondary.label}
        </a>
      )}
    </div>
  );
}

export interface HeroProps {
  tokens: StyleTokens;
  kicker?: string;
  title: string;
  subtitle?: string;
  image?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  badges?: string[];
  /** data-edit keys for on-screen inline editing. */
  titleEdit?: string;
  subtitleEdit?: string;
  kickerEdit?: string;
}

function Badges({ badges, onLight, center }: { badges?: string[]; onLight?: boolean; center?: boolean }) {
  if (!badges || !badges.length) return null;
  return (
    <div className={cx("mt-10 flex flex-wrap gap-2", center && "justify-center")}>
      {badges.map((b) => (
        <span key={b} className={cx("rounded-full border px-3 py-1 text-xs font-medium backdrop-blur", onLight ? "border-neutral-300 text-neutral-600" : "border-white/25 bg-white/10 text-white")}>✓ {b}</span>
      ))}
    </div>
  );
}

/**
 * Hero with genuinely different structural layouts per design style:
 *  - bold:      full-bleed image, content bottom-left, huge headline
 *  - luxe:      full-bleed dark, centered, framed, serif
 *  - editorial: split — text left, image right (light, magazine)
 *  - classic:   split — image left, text right (light)
 *  - warm:      centered text on cream, large rounded inset image
 *  - minimal:   text-first light hero, full-width image band below
 */
export function Hero(props: HeroProps) {
  const { tokens, kicker, title, subtitle, image, primary, secondary, badges, titleEdit, subtitleEdit, kickerEdit } = props;

  const Kicker = ({ light }: { light?: boolean }) =>
    kicker ? (
      tokens.label === "serif" ? (
        <p data-edit={kickerEdit} className={cx("font-display text-lg italic", light ? "text-white/85" : "text-[var(--primary)]")}>{kicker}</p>
      ) : (
        <p data-edit={kickerEdit} className={cx("text-xs font-semibold uppercase tracking-[0.35em]", light ? "text-white/80" : "text-[var(--primary)]")}>{kicker}</p>
      )
    ) : null;
  const H1 = ({ cls }: { cls: string }) => <h1 data-edit={titleEdit} className={cls}>{title}</h1>;
  const Sub = ({ cls }: { cls: string }) => (subtitle ? <p data-edit={subtitleEdit} className={cls}>{subtitle}</p> : null);

  // ---- BOLD: full-bleed, content bottom-left ----
  if (tokens.hero === "bold") {
    return (
      <section className={cx("relative isolate flex min-h-[92vh] items-end overflow-hidden", tokens.heroBase)}>
        {image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className={cx("absolute inset-0", tokens.heroOverlay)} />
          </>
        )}
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 pt-40 text-white">
          <Kicker light />
          <H1 cls={cx("font-display mt-4 max-w-4xl text-6xl text-white sm:text-8xl", tokens.heading)} />
          <Sub cls="mt-5 max-w-xl text-lg text-white/80" />
          <HeroButtons tokens={tokens} primary={primary} secondary={secondary} />
          <Badges badges={badges} />
        </div>
      </section>
    );
  }

  // ---- LUXE: full-bleed dark, centered, framed ----
  if (tokens.hero === "luxe") {
    return (
      <section className={cx("relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden", tokens.heroBase)}>
        {image && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
            <div className={cx("absolute inset-0", tokens.heroOverlay)} />
          </>
        )}
        <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
          <div className="mx-auto mb-7 h-px w-14 bg-[var(--accent)]" />
          <Kicker light />
          <H1 cls={cx("font-display mt-5 text-5xl text-white sm:text-7xl", tokens.heading)} />
          <Sub cls="mx-auto mt-5 max-w-xl text-white/75" />
          <HeroButtons tokens={tokens} primary={primary} secondary={secondary} center />
          <Badges badges={badges} center />
        </div>
      </section>
    );
  }

  // ---- EDITORIAL: split, text left / image right ----
  if (tokens.hero === "editorial") {
    return (
      <section className="grid min-h-[86vh] lg:grid-cols-2">
        <div className={cx("flex items-center px-6 py-24 lg:px-16", tokens.tint)}>
          <div className="max-w-md">
            <Kicker />
            <H1 cls={cx("font-display mt-4 text-5xl text-neutral-900 sm:text-6xl", tokens.heading)} />
            <Sub cls="mt-5 text-lg text-neutral-600" />
            <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight />
            <Badges badges={badges} onLight />
          </div>
        </div>
        <div className="relative min-h-[42vh] bg-neutral-200">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className={cx("absolute inset-0", tokens.heroBase)} />
          )}
        </div>
      </section>
    );
  }

  // ---- CLASSIC: split, image left / text right ----
  if (tokens.hero === "classic") {
    return (
      <section className="grid min-h-[86vh] lg:grid-cols-2">
        <div className="relative order-last min-h-[42vh] bg-neutral-200 lg:order-first">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className={cx("absolute inset-0", tokens.heroBase)} />
          )}
        </div>
        <div className="flex items-center bg-white px-6 py-24 lg:px-16">
          <div className="max-w-md">
            <div className="mb-5 h-1 w-12 bg-[var(--accent)]" />
            <Kicker />
            <H1 cls={cx("font-display mt-3 text-5xl text-neutral-900 sm:text-6xl", tokens.heading)} />
            <Sub cls="mt-5 text-lg text-neutral-600" />
            <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight />
            <Badges badges={badges} onLight />
          </div>
        </div>
      </section>
    );
  }

  // ---- WARM: centered text on cream, large rounded inset image ----
  if (tokens.hero === "warm") {
    return (
      <section className={cx("px-6 pt-28 pb-14", tokens.tint)}>
        <div className="mx-auto max-w-3xl text-center">
          <Kicker />
          <H1 cls={cx("font-display mt-4 text-5xl text-neutral-900 sm:text-6xl", tokens.heading)} />
          <Sub cls="mx-auto mt-5 max-w-xl text-lg text-neutral-600" />
          <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight center />
          <Badges badges={badges} onLight center />
        </div>
        {image && (
          <div className="mx-auto mt-14 max-w-5xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt="" className={cx("aspect-[16/8] w-full object-cover", tokens.card)} />
          </div>
        )}
      </section>
    );
  }

  // ---- MINIMAL: text-first light hero, full-width image band below ----
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-14 text-center">
        <Kicker />
        <H1 cls={cx("font-display mt-5 text-5xl text-neutral-900 sm:text-7xl", tokens.heading)} />
        <Sub cls="mx-auto mt-5 max-w-lg text-lg text-neutral-500" />
        <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight center />
        <Badges badges={badges} onLight center />
      </div>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={image} alt="" className="h-[52vh] w-full object-cover" />
      )}
    </section>
  );
}
