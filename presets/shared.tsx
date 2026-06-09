import type { CSSProperties, ReactNode } from "react";
import type { CatalogItem, SiteContent, TenantSite, Theme } from "@/lib/types";
import { archetypeFor } from "@/lib/verticals";
import { SiteContactForms } from "@/components/SiteContactForms";
import { pageHref, type PageKey } from "@/lib/site-pages";

const BOOKING_TITLES: Record<string, string> = {
  menu: "Request a booking",
  bookings: "Request an appointment",
  services: "Request a quote",
};

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
  /** Hero layout structure: drives a genuinely different arrangement. */
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
// Alternate "cards" body layout for any catalog (menu / services / treatments).
// A responsive grid of refined cards — reads more premium than a plain list and
// is the `body_variant === "cards"` option in the on-screen editor.
export function CatalogCards({ groups, tokens }: { groups: CatalogGroup[]; tokens: StyleTokens }) {
  const items = groups.flatMap((g) =>
    g.categories.flatMap((c) => c.items.map((item) => ({ item, label: c.category ?? g.section }))),
  );
  if (items.length === 0) return null;
  return (
    <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {items.map(({ item, label }) => (
        <div
          key={item.id}
          className={cx(
            "flex flex-col border border-black/[0.06] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_44px_-16px_rgba(0,0,0,0.22)]",
            tokens.card,
          )}
        >
          {label && <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">{label}</p>}
          <div className="mt-2 flex items-baseline justify-between gap-3">
            <h4 data-edit={`item:${item.id}:name`} className={cx("font-display text-lg text-neutral-900", tokens.heading)}>{item.name}</h4>
            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap font-medium text-[var(--primary)]">{item.price}</span>}
          </div>
          {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
        </div>
      ))}
    </div>
  );
}

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
  home = "#top",
}: {
  site: TenantSite;
  tokens: StyleTokens;
  nav: NavItem[];
  cta?: { label: string; href: string };
  home?: string;
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
        <a href={home} className="flex items-center gap-2.5">
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
  withForms = true,
}: {
  site: TenantSite;
  tokens: StyleTokens;
  cta?: { label: string; href: string };
  // Multi-page sites render the booking/contact forms on the dedicated contact
  // page instead, so the footer on every page stays a compact contact band.
  withForms?: boolean;
}) {
  const { tenant, content } = site;
  const hasContact = content.phone || content.email || content.address || (content.hours && content.hours.length);

  // Built-in lead forms (included by default; owner can switch each off).
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const formsOn = withForms && (bookingOn || contactOn);
  const forms = formsOn ? (
    <SiteContactForms
      tenantId={tenant.id}
      booking={bookingOn}
      contact={contactOn}
      bookingTitle={BOOKING_TITLES[archetypeFor(tenant.preset)] ?? "Request a booking"}
    />
  ) : null;

  // Minimal footer: a single compact contact band on the brand colour, no map.
  if (content.footer_variant === "minimal") {
    return (
      <footer id="contact" className="bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center">
          <p className="font-display text-2xl font-semibold tracking-tight">{tenant.business_name}</p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/75">
            {content.address && <span data-edit="content.address">{content.address}</span>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="hover:text-white">{content.email}</a>}
          </div>
          {content.hours && content.hours.length > 0 && (
            <div className="mx-auto mt-6 max-w-sm space-y-1 text-sm text-white/55">
              {content.hours.map((h, i) => (
                <div key={i} className="flex justify-between border-b border-white/10 py-1">
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`}>{h.open}</span>
                </div>
              ))}
            </div>
          )}
          {forms && <div className="mt-9 text-left">{forms}</div>}
          {cta && (
            <div className="mt-7">
              <a href={cta.href} className={cx("inline-flex bg-white px-7 py-3.5 text-sm font-semibold text-[var(--primary)] transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>{cta.label}</a>
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} className="text-sm text-white/70 underline-offset-4 hover:underline">{s.label}</a>
              ))}
            </div>
          )}
          <p className="mt-10 text-xs text-white/40">© {tenant.business_name}. All rights reserved.</p>
        </div>
      </footer>
    );
  }

  return (
    <>
      {(hasContact || formsOn) && (
        <section id="contact" className="border-t border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="Get in touch" title="Come say hello" />
            <div className="mt-12 grid max-w-3xl gap-8 sm:grid-cols-2">
                {content.address && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Find us</p>
                    <p data-edit="content.address" className="mt-2 text-neutral-700">{content.address}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Contact</p>
                  {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="mt-2 block text-neutral-700 hover:text-[var(--primary)]">{content.phone}</a>}
                  {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-neutral-700 hover:text-[var(--primary)]">{content.email}</a>}
                </div>
                {content.hours && content.hours.length > 0 && (
                  <div className="sm:col-span-2">
                    <p className="text-xs font-semibold uppercase tracking-widest text-neutral-400">Opening hours</p>
                    <ul className="mt-2 space-y-1">
                      {content.hours.map((h, i) => (
                        <li key={i} className="flex justify-between gap-8 border-b border-dashed border-neutral-200 py-1.5 text-neutral-700">
                          <span data-edit={`hours:${i}:day`}>{h.day}</span>
                          <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
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
            {forms && <div className="mt-14 border-t border-black/5 pt-12">{forms}</div>}
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
  video?: string;
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
 *  - editorial: split (text left, image right; light, magazine)
 *  - classic:   split (image left, text right; light)
 *  - warm:      centered text on cream, large rounded inset image
 *  - minimal:   text-first light hero, full-width image band below
 */
export function Hero(props: HeroProps) {
  const { tokens, kicker, title, subtitle, image, video, primary, secondary, badges, titleEdit, subtitleEdit, kickerEdit } = props;
  const hasMedia = !!(video || image);

  const renderMedia = (className?: string, dim?: boolean) => {
    if (video) {
      return (
      <video src={video} autoPlay muted loop playsInline className={cx(className, dim && "opacity-70")} />
      );
    }
    if (image) {
      return (
      // eslint-disable-next-line @next/next/no-img-element
      <img data-edit-image="hero" src={image} alt="" className={cx(className, dim && "opacity-70")} />
      );
    }
    return null;
  };

  const renderKicker = (light?: boolean) =>
    kicker ? (
      tokens.label === "serif" ? (
        <p data-edit={kickerEdit} className={cx("font-display text-lg italic", light ? "text-white/85" : "text-[var(--primary)]")}>{kicker}</p>
      ) : (
        <p data-edit={kickerEdit} className={cx("text-xs font-semibold uppercase tracking-[0.35em]", light ? "text-white/80" : "text-[var(--primary)]")}>{kicker}</p>
      )
    ) : null;
  const renderH1 = (cls: string) => <h1 data-edit={titleEdit} className={cls}>{title}</h1>;
  const renderSub = (cls: string) => (subtitle ? <p data-edit={subtitleEdit} className={cls}>{subtitle}</p> : null);

  // ---- BOLD: full-bleed, content bottom-left ----
  if (tokens.hero === "bold") {
    return (
      <section className={cx("relative isolate flex min-h-[92vh] items-center overflow-hidden", tokens.heroBase)}>
        {hasMedia && (
          <>
            {renderMedia("absolute inset-0 h-full w-full object-cover")}
            <div className={cx("absolute inset-0", tokens.heroOverlay)} />
          </>
        )}
        <div className="relative mx-auto w-full max-w-6xl px-6 py-28 text-white">
          {renderKicker(true)}
          {renderH1(cx("font-display mt-4 max-w-4xl text-6xl text-white sm:text-8xl", tokens.heading))}
          {renderSub("mt-5 max-w-xl text-lg text-white/80")}
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
        {hasMedia && (
          <>
            {renderMedia("absolute inset-0 h-full w-full object-cover", true)}
            <div className={cx("absolute inset-0", tokens.heroOverlay)} />
          </>
        )}
        <div className="relative mx-auto max-w-3xl px-6 text-center text-white">
          <div className="mx-auto mb-7 h-px w-14 bg-[var(--accent)]" />
          {renderKicker(true)}
          {renderH1(cx("font-display mt-5 text-5xl text-white sm:text-7xl", tokens.heading))}
          {renderSub("mx-auto mt-5 max-w-xl text-white/75")}
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
            {renderKicker()}
            {renderH1(cx("font-display mt-4 text-5xl text-neutral-900 sm:text-6xl", tokens.heading))}
            {renderSub("mt-5 text-lg text-neutral-600")}
            <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight />
            <Badges badges={badges} onLight />
          </div>
        </div>
        <div className="relative min-h-[42vh] bg-neutral-200">
          {hasMedia ? (
            renderMedia("absolute inset-0 h-full w-full object-cover")
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
          {hasMedia ? (
            renderMedia("absolute inset-0 h-full w-full object-cover")
          ) : (
            <div className={cx("absolute inset-0", tokens.heroBase)} />
          )}
        </div>
        <div className="flex items-center bg-white px-6 py-24 lg:px-16">
          <div className="max-w-md">
            <div className="mb-5 h-1 w-12 bg-[var(--accent)]" />
            {renderKicker()}
            {renderH1(cx("font-display mt-3 text-5xl text-neutral-900 sm:text-6xl", tokens.heading))}
            {renderSub("mt-5 text-lg text-neutral-600")}
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
          {renderKicker()}
          {renderH1(cx("font-display mt-4 text-5xl text-neutral-900 sm:text-6xl", tokens.heading))}
          {renderSub("mx-auto mt-5 max-w-xl text-lg text-neutral-600")}
          <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight center />
          <Badges badges={badges} onLight center />
        </div>
        {hasMedia && (
          <div className="mx-auto mt-14 max-w-5xl">
            {renderMedia(cx("aspect-[16/8] w-full object-cover", tokens.card))}
          </div>
        )}
      </section>
    );
  }

  // ---- MINIMAL: text-first light hero, full-width image band below ----
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-6 pt-32 pb-14 text-center">
        {renderKicker()}
        {renderH1(cx("font-display mt-5 text-5xl text-neutral-900 sm:text-7xl", tokens.heading))}
        {renderSub("mx-auto mt-5 max-w-lg text-lg text-neutral-500")}
        <HeroButtons tokens={tokens} primary={primary} secondary={secondary} onLight center />
        <Badges badges={badges} onLight center />
      </div>
      {hasMedia && renderMedia("h-[52vh] w-full object-cover")}
    </section>
  );
}

// ---------------------------------------------------------------------------
// Multi-page rendering
// ---------------------------------------------------------------------------

// Shared chrome for a multi-page site: branded root + header (with real-path
// nav) + the page content + the footer. A plain function (not a component) so
// callers compose it without creating components during render.
export function siteShell({
  site,
  tokens,
  nav,
  cta,
  basePath,
  children,
  withForms = true,
}: {
  site: TenantSite;
  tokens: StyleTokens;
  nav: NavItem[];
  cta?: { label: string; href: string };
  basePath: string;
  children: ReactNode;
  withForms?: boolean;
}): ReactNode {
  return (
    <div id="top" style={siteRootStyle(site.theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={cta} home={pageHref(basePath, "home")} />
      {children}
      <ContactFooter site={site} tokens={tokens} cta={cta} withForms={withForms} />
    </div>
  );
}

// Generic multi-page renderer shared by the bookings/services/beauty/fitness
// templates (hero + about + catalog + gallery + contact). The catalog page uses
// the premium card grid; the contact page's form/details come from the footer.
export function renderMultiPage({
  site,
  tokens,
  page,
  basePath,
  cta,
  heroEl,
  groups,
  about,
  catalogLabel,
  catalogTitle,
  catalogKicker,
}: {
  site: TenantSite;
  tokens: StyleTokens;
  page: PageKey;
  basePath: string;
  cta?: { label: string; href: string };
  heroEl: ReactNode;
  groups: CatalogGroup[];
  about?: string;
  catalogLabel: string;
  catalogTitle: string;
  catalogKicker: string;
}): ReactNode {
  const gallery = site.gallery;
  const nav: NavItem[] = [
    groups.length > 0 && { label: catalogLabel, href: pageHref(basePath, "services") },
    about && { label: "About", href: pageHref(basePath, "about") },
    gallery.length > 0 && { label: "Gallery", href: pageHref(basePath, "gallery") },
    { label: "Contact", href: pageHref(basePath, "contact") },
  ].filter(Boolean) as NavItem[];

  // Multi-page: forms live on the contact page, never in the per-page footer.
  const wrap = (children: ReactNode) => siteShell({ site, tokens, nav, cta, basePath, withForms: false, children });
  const ctaBtn = cta ? (
    <div className="mt-14 text-center">
      <a href={cta.href} className={cx("inline-flex bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>{cta.label}</a>
    </div>
  ) : null;

  if (page === "services" || page === "menu") {
    return wrap(
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
        <SectionHeading tokens={tokens} kicker={catalogKicker} title={catalogTitle} center />
        <CatalogCards groups={groups} tokens={tokens} />
        {ctaBtn}
      </section>,
    );
  }
  if (page === "about") {
    return wrap(<AboutSection tokens={tokens} about={about} kicker="About" />);
  }
  if (page === "gallery") {
    return wrap(
      <div className="py-10">
        <GallerySection gallery={gallery} />
      </div>,
    );
  }
  if (page === "contact") {
    const content = site.content;
    const bookingOn = content.booking_enabled !== false;
    const contactOn = content.contact_form_enabled !== false;
    return wrap(
      <div className="mx-auto max-w-2xl px-6 pt-20 pb-24 sm:pt-28">
        <SectionHeading tokens={tokens} kicker="Get in touch" title="Come say hello" center />

        {(content.phone || content.email || content.address) && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-neutral-600">
            {content.address && <span data-edit="content.address">{content.address}</span>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="hover:text-[var(--primary)]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="hover:text-[var(--primary)]">{content.email}</a>}
          </div>
        )}

        {(bookingOn || contactOn) && (
          <div className="mt-12">
            <SiteContactForms
              tenantId={site.tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle={BOOKING_TITLES[archetypeFor(site.tenant.preset)] ?? "Request a booking"}
            />
          </div>
        )}
      </div>,
    );
  }

  // home — a rich landing page: intro, featured catalog, gallery, closing CTA
  const featuredItems = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, 6);
  const featuredGroups: CatalogGroup[] = [{ section: "", categories: [{ category: null, items: featuredItems }] }];

  return wrap(
    <>
      {heroEl}

      {about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">Welcome</p>
          <p data-edit="content.about" className={cx("mt-6 font-display text-2xl leading-relaxed text-neutral-800 sm:text-[2.1rem] sm:leading-[1.4]", tokens.serif ? "font-normal" : "font-light")}>{about}</p>
        </section>
      )}

      {groups.length > 0 && (
        <section className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading tokens={tokens} kicker={catalogKicker} title={catalogTitle} />
              <a href={pageHref(basePath, "services")} className="shrink-0 text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline">
                View {catalogLabel.toLowerCase()} →
              </a>
            </div>
            <CatalogCards groups={featuredGroups} tokens={tokens} />
          </div>
        </section>
      )}

      {gallery.length > 0 && <GallerySection gallery={gallery} />}

      {cta && (
        <section className="bg-[var(--primary)] text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
            <h2 className={cx("font-display text-4xl font-semibold tracking-tight sm:text-5xl", tokens.heading)}>Ready when you are.</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/65">Get in touch today and we&apos;ll take care of the rest.</p>
            <a href={cta.href} className={cx("mt-9 inline-flex bg-white px-8 py-4 text-sm font-semibold text-[var(--primary)] transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>{cta.label}</a>
          </div>
        </section>
      )}
    </>,
  );
}
