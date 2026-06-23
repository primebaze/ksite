import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { BloomHeader } from "./BloomHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Bloom — soft, botanical florist / lifestyle-shop design. A blush-cream canvas
// with foliage green and blush-pink accents, airy serif headings, rounded forms
// and an organic, seasonal feel. Built for florists, plant shops, garden centres
// and gift studios. MULTI-PAGE: nav opens real routes (Shop / About / Gallery /
// Visit) under basePath; the sticky cream header + deep-green footer are shared.

const CREAM = "#fdf8f5"; // page
const PETAL = "#f6ebe6"; // tinted panel
const GREEN = "#3f5d44"; // foliage / footer
const BLUSH = "#d98a8a"; // accent
const SAGE = "#6f7d68"; // muted body
const LINE = "#ecdcd4"; // hairline
const serif = { fontFamily: "var(--font-fraunces)" } as const;

function Leaf() {
  return <span aria-hidden style={{ color: BLUSH }}>❦</span>;
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.24em] ${center ? "justify-center" : ""}`} style={{ color: BLUSH }}>
      <Leaf />{children}
    </p>
  );
}

export default function BloomDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const products = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Order flowers";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    products.length > 0 && { label: "Shop", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: GREEN }} className="text-[#eef2ea]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2"><span aria-hidden style={{ color: BLUSH }}>❧</span><span data-edit="tenant.business_name" style={serif} className="text-2xl font-medium tracking-tight">{name}</span></a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#eef2ea]/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#eef2ea]/80 transition hover:bg-white/10 hover:text-white" style={{ border: "1px solid #ffffff2e" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#eef2ea]/55" {...editCopy(content, "footer_shop", "Shop")} />
          <ul className="mt-5 space-y-3 text-sm text-[#eef2ea]/75">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#eef2ea]/55" {...editCopy(content, "footer_visit", "Visit")} />
          <div className="mt-5 space-y-3 text-sm text-[#eef2ea]/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#eef2ea]/55" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#eef2ea]/75">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#eef2ea]/50">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#eef2ea]/65">Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#eef2ea99" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white" {...editCopy(content, "footer_weddings_link", "Weddings & events")} />
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <BloomHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PETAL, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Kicker center>{kicker}</Kicker>
        <h1 style={{ ...serif, color: GREEN }} className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  const ProductCard = ({ s, img }: { s: (typeof products)[number]; img?: string }) => (
    <div className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_1px_2px_rgba(63,93,68,0.08)] transition hover:-translate-y-1 hover:shadow-[0_26px_50px_-30px_rgba(63,93,68,0.5)]">
      <div className="relative overflow-hidden" style={{ background: PETAL }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={img} alt="" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-[1.05]" />
        ) : (
          <div className="grid aspect-square w-full place-items-center text-4xl" style={{ color: `${BLUSH}aa` }}>❀</div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: GREEN }} className="text-lg font-medium">{s.name}</h3>
          {s.price && <span data-edit={`item:${s.id}:price`} className="text-sm font-semibold" style={{ color: BLUSH }}>{s.price}</span>}
        </div>
        {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 flex-1 text-sm leading-relaxed" style={{ color: SAGE }}>{s.description}</p>}
      </div>
    </div>
  );

  // ---- SHOP ----
  if (page === "services") {
    return shell(
      <>
        {banner("Fresh today", "The shop")}
        <section className="mx-auto max-w-6xl px-6 py-16">
          {products.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((s, i) => <ProductCard key={s.id} s={s} img={gallery[i % Math.max(gallery.length, 1)]?.image_url} />)}
            </div>
          ) : <p style={{ color: SAGE }}>Our shop is coming into bloom soon.</p>}
          <div className="mt-14 text-center">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "Grown with love")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: SAGE }}>{content.about}</p> : <p style={{ color: SAGE }}>Our story is coming soon.</p>}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...serif, color: GREEN }} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_delivery_heading", "Delivery & areas")} />
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: SAGE }}>We deliver across {content.service_areas.join(", ")}.</p>
            </>
          )}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In bloom", "Gallery")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: SAGE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- VISIT / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Visit & enquiries")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: GREEN }} className="text-2xl font-medium" {...editCopy(content, "contact_heading", "Come and see us")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SAGE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#3f5d44]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#3f5d44]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SAGE }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a8978d]">{h.open}</span></li>))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition hover:bg-white" style={{ borderColor: GREEN, color: GREEN }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Wedding flowers, an event, or a bespoke bouquet? Tell us your date and ideas."
                bookingCta="Send enquiry"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: GREEN, blurb: SAGE, label: "#6f7d68", fieldBg: CREAM, fieldBorder: "#e3d2c9", fieldText: "#33402f", button: GREEN, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(140deg,#f6ebe6,#e7efe2)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to right, rgba(253,248,245,0.92) 0%, rgba(253,248,245,0.55) 45%, rgba(253,248,245,0.15) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-24">
          <Kicker>{name}</Kicker>
          <h1 data-edit="content.tagline" style={{ ...serif, color: GREEN }} className="mt-5 max-w-2xl text-5xl font-medium leading-[1.02] tracking-tight sm:text-7xl">{content.tagline ?? "Seasonal flowers, gathered fresh."}</h1>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={cta} className="inline-flex rounded-full px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
            {products.length > 0 && <a href={href("services")} className="inline-flex rounded-full border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white/60" style={{ borderColor: GREEN, color: GREEN }} {...editCopy(content, "hero_browse_cta", "Browse the shop")} />}
          </div>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Kicker center><span {...editCopy(content, "about_kicker", "Our story")} /></Kicker>
          <p data-edit="content.about" style={{ ...serif, color: GREEN }} className="mt-6 text-2xl font-medium leading-[1.5] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: BLUSH }} {...editCopy(content, "about_link", "Read more →")} />
        </section>
      )}

      {/* featured shop */}
      {products.length > 0 && (
        <section style={{ background: PETAL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="text-center">
              <Kicker center><span {...editCopy(content, "shop_kicker", "Fresh today")} /></Kicker>
              <h2 style={{ ...serif, color: GREEN }} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "shop_heading", "From the shop")} />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((s, i) => <ProductCard key={s.id} s={s} img={gallery[i % Math.max(gallery.length, 1)]?.image_url} />)}
            </div>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white" style={{ borderColor: GREEN, color: GREEN }} {...editCopy(content, "shop_full_cta", "View the full shop")} />
            </div>
          </div>
        </section>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <Kicker center><span {...editCopy(content, "gallery_kicker", "In bloom")} /></Kicker>
            <h2 style={{ ...serif, color: GREEN }} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "gallery_heading", "A little colour for every occasion")} />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white" style={{ borderColor: GREEN, color: GREEN }} {...editCopy(content, "gallery_cta", "View gallery")} />
          </div>
        </section>
      )}

      {/* closing band */}
      <section style={{ background: GREEN }} className="text-[#eef2ea]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 style={serif} className="text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "closing_heading", "Weddings & events")} />
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#eef2ea]/75" {...editCopy(content, "closing_blurb", "From intimate ceremonies to grand celebrations, let us bring your day into bloom.")} />
          <a href={cta} className="mt-8 inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: BLUSH, color: "#fff" }} {...editCopy(content, "closing_cta", "Enquire now")} />
        </div>
      </section>
    </>,
  );
}
