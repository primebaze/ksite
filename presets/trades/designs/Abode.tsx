import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AbodeHeader } from "./AbodeHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Abode — a calm, curated homeware, interiors & lifestyle shop. Warm off-white
// canvas with soft clay, sage-green and deep-walnut accents; an editorial,
// magazine-like register built for beautiful things for the home. The signature
// is a tidy editorial "still-life" grid of room vignettes in the hero, a
// shop-by-room collections presentation, a styled-by-us lookbook and a quiet
// "visit us" opening-hours band. Catalog reads as curated pieces with prices.
// MULTI-PAGE: nav opens real routes (Shop / About / Lookbook / Visit) under
// basePath; the sticky off-white header + walnut footer are shared. Tenant
// swaps in their own photography, copy, collections and opening hours.

const OFFWHITE = "#F3EFE8"; // page
const LINEN = "#EAE3D6"; // tinted panel
const CLAY = "#C08763"; // warm clay / terracotta accent
const SAGE = "#8A9A7B"; // sage-green secondary
const WALNUT = "#4A3B2E"; // deep walnut — headings / footer
const INK = "#2A2722"; // charcoal ink
const TAUPE = "#7c6f60"; // muted body
const LINE = "#e0d6c5"; // hairline
const display = { fontFamily: "var(--font-space)" } as const;

// Fallback "shop by room or category" labels when a tenant hasn't sectioned
// their catalog — purely cosmetic grouping headings for the editorial rhythm.
const ROOMS = ["Living", "Kitchen & dining", "Bedroom", "Lighting", "Textiles", "Gifts"];

function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: CLAY }}>
      <span aria-hidden className="inline-block h-px w-6" style={{ background: CLAY }} />
      {children}
    </p>
  );
}

export default function AbodeDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const products = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Reserve an item";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    products.length > 0 && { label: "Shop", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Lookbook", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // "Shop by room or category" — prefer the tenant's own sections/categories;
  // otherwise fall back to the editorial room labels for a curated feel.
  const roomGroups: { label: string; items: typeof products }[] = (() => {
    const named = groups.flatMap((g) =>
      g.categories
        .filter((c) => (c.category ?? g.section))
        .map((c) => ({ label: (c.category ?? g.section) as string, items: c.items })),
    );
    if (named.length > 0) return named;
    return products.length > 0
      ? [{ label: ROOMS[0], items: products }]
      : [];
  })();

  const pill = (label: string, to: string, filled = false) => (
    <a
      href={to}
      className="inline-flex rounded-full px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.18em] transition"
      style={filled ? { background: WALNUT, color: OFFWHITE } : { border: `1px solid ${WALNUT}`, color: WALNUT }}
    >
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: WALNUT }} className="text-[#efe7d8]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={display} className="text-2xl font-medium tracking-[0.02em] text-[#F3EFE8]">{name}</span>
            <span className="mt-1 block text-[9px] uppercase tracking-[0.42em] text-[#efe7d8]/45" {...editCopy(content, "footer_subtitle", "Homeware & Interiors")} />
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#efe7d8]/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#efe7d8]/70" style={{ borderColor: "#ffffff24" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#efe7d8]/80 transition hover:bg-white/10 hover:text-white" style={{ border: "1px solid #ffffff2a" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-medium uppercase tracking-[0.22em] text-[#efe7d8]/50" {...editCopy(content, "footer_shop", "Shop")} />
          <ul className="mt-5 space-y-3 text-sm text-[#efe7d8]/75">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-medium uppercase tracking-[0.22em] text-[#efe7d8]/50" {...editCopy(content, "footer_visit", "Visit")} />
          <div className="mt-5 space-y-3 text-sm text-[#efe7d8]/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-medium uppercase tracking-[0.22em] text-[#efe7d8]/50" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#efe7d8]/75">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#efe7d8]/45">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#efe7d8]/60">Open Tue–Sun.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#efe7d899" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white" {...editCopy(content, "footer_giftwrap_link", "Gift wrapping & styling")} />
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE }} className="min-h-screen font-body">
      <AbodeHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: LINEN, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 text-center sm:pt-40">
        <Eyebrow center>{kicker}</Eyebrow>
        <h1 style={{ ...display, color: WALNUT }} className="mt-4 text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // Clean divide-y catalog rows — no cards, no dotted leaders.
  const ItemRow = ({ s, n }: { s: (typeof products)[number]; n: number }) => (
    <div className="flex items-baseline justify-between gap-6 py-5">
      <div className="flex min-w-0 items-baseline gap-4">
        <span className="text-[11px] tabular-nums tracking-[0.2em]" style={{ color: SAGE }}>{String(n).padStart(2, "0")}</span>
        <div className="min-w-0">
          <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-medium tracking-tight">{s.name}</h3>
          {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: TAUPE }}>{s.description}</p>}
        </div>
      </div>
      {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-medium" style={{ color: CLAY }}>{s.price}</span>}
    </div>
  );

  // ---- SHOP / COLLECTIONS ----
  if (page === "services") {
    let n = 0;
    return shell(
      <>
        {banner("Shop by room or category", "The collection")}
        <section className="mx-auto max-w-5xl px-6 py-20">
          {roomGroups.length > 0 ? (
            <div className="space-y-16">
              {roomGroups.map((rg) => (
                <div key={rg.label}>
                  <div className="flex items-end justify-between gap-4 border-b pb-4" style={{ borderColor: LINE }}>
                    <h2 style={{ ...display, color: WALNUT }} className="text-2xl font-medium tracking-tight">{rg.label}</h2>
                    <span className="text-[11px] uppercase tracking-[0.24em]" style={{ color: SAGE }}>{rg.items.length} {rg.items.length === 1 ? "piece" : "pieces"}</span>
                  </div>
                  <div className="divide-y" style={{ borderColor: LINE }}>
                    {rg.items.map((s) => { n += 1; return <ItemRow key={s.id} s={s} n={n} />; })}
                  </div>
                </div>
              ))}
            </div>
          ) : <p style={{ color: TAUPE }}>Our collection is coming together — please check back soon.</p>}
          <div className="mt-16 text-center">{pill(ctaLabel, cta, true)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Independent & curated", "Beautiful things, considered")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: TAUPE }}>{content.about}</p> : <p style={{ color: TAUPE }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl p-6" style={{ background: LINEN }}>
              <h3 style={{ ...display, color: WALNUT }} className="text-lg font-medium" {...editCopy(content, "about_giftwrap_heading", "Gift wrapping")} />
              <p className="mt-2 text-sm leading-relaxed" style={{ color: TAUPE }} {...editCopy(content, "about_giftwrap_body", "Every piece can be wrapped by hand — ask in store or note it with your enquiry.")} />
            </div>
            <div className="rounded-2xl p-6" style={{ background: LINEN }}>
              <h3 style={{ ...display, color: WALNUT }} className="text-lg font-medium" {...editCopy(content, "about_styling_heading", "Interior styling")} />
              <p className="mt-2 text-sm leading-relaxed" style={{ color: TAUPE }} {...editCopy(content, "about_styling_body", "From a single corner to a whole room — we'll help you choose pieces that work together.")} />
            </div>
          </div>
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: WALNUT }} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_findus_heading", "Where to find us")} />
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: TAUPE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{pill(ctaLabel, cta, true)}</div>
        </section>
      </>,
    );
  }

  // ---- LOOKBOOK / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Styled by us", "The lookbook")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: TAUPE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- VISIT / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Come and visit", "Reserve or enquire")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: WALNUT }} className="text-2xl font-medium tracking-tight" {...editCopy(content, "contact_findshop_heading", "Find the shop")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: TAUPE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#C08763]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#C08763]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: TAUPE }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a8957f]">{h.open}</span></li>))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-6 py-3 text-[11px] font-medium uppercase tracking-[0.16em] transition hover:bg-white" style={{ borderColor: WALNUT, color: WALNUT }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Reserve an item"
                contactTitle="Get in touch"
                bookingBlurb="Seen something you love? Reserve it in store, or ask about gift wrapping and styling."
                bookingCta="Send enquiry"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: WALNUT, blurb: TAUPE, label: "#7c6f60", fieldBg: OFFWHITE, fieldBorder: "#ddd1bd", fieldText: INK, button: WALNUT, buttonText: "#F3EFE8", radius: "1rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  // Editorial still-life grid: a tidy mosaic of room vignettes drawn from the
  // gallery (the signature). Falls back to soft tinted tiles when empty.
  const tiles = Array.from({ length: 5 }, (_, i) => gallery[i]?.image_url);
  const tileTints = [LINEN, "#e4ddcd", "#dfe2d6", "#ece2d4", "#e6ddcb"];

  return shell(
    <>
      {/* hero — calm editorial split: lifestyle headline beside a still-life grid */}
      <section className="mx-auto max-w-6xl px-6 pt-32 pb-16 sm:pt-40 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <div>
          <Eyebrow>{name}</Eyebrow>
          <h1 style={{ ...display, color: WALNUT }} className="mt-5 text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Beautiful things for every room."}</span>
          </h1>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: TAUPE }} {...editCopy(content, "hero_blurb", "An independent, carefully curated homeware shop — considered design, warm materials and pieces made to be lived with.")} />
          <div className="mt-9 flex flex-wrap gap-3">
            {products.length > 0 && pill("Shop the collection", href("services"), true)}
            {pill(ctaLabel, cta)}
          </div>
          <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: SAGE }}>
            <span {...editCopy(content, "hero_tag_1", "Independent & curated")} />
            <span {...editCopy(content, "hero_tag_2", "Gift wrapping")} />
            <span {...editCopy(content, "hero_tag_3", "Interior styling")} />
          </div>
        </div>

        {/* signature: still-life / room-vignette grid */}
        <div className="mt-12 grid grid-cols-2 gap-3 lg:mt-0">
          <div className="col-span-2 overflow-hidden rounded-3xl" style={{ background: tileTints[0] }}>
            {hero || tiles[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={(hero ?? tiles[0]) as string} alt="" className="aspect-[16/9] w-full object-cover" />
            ) : (
              <div className="grid aspect-[16/9] w-full place-items-center text-sm uppercase tracking-[0.3em]" style={{ color: `${CLAY}` }}>The home, styled</div>
            )}
          </div>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={`overflow-hidden rounded-2xl ${i > 2 ? "" : ""}`} style={{ background: tileTints[i] }}>
              {tiles[i] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={tiles[i] as string} alt="" className="aspect-square w-full object-cover" />
              ) : (
                <div className="aspect-square w-full" />
              )}
            </div>
          ))}
        </div>
      </section>

      {/* shop by room or category */}
      {products.length > 0 && (
        <section style={{ background: LINEN, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="text-center">
              <Eyebrow center><span {...editCopy(content, "rooms_eyebrow", "Shop by room or category")} /></Eyebrow>
              <h2 style={{ ...display, color: WALNUT }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "rooms_heading", "Beautiful things for every room")} />
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {ROOMS.map((room, i) => (
                <a key={room} href={href("services")} className="group flex items-center justify-between rounded-2xl bg-white px-6 py-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_40px_-28px_rgba(74,59,46,0.55)]" style={{ border: `1px solid ${LINE}` }}>
                  <span style={{ ...display, color: INK }} className="text-lg font-medium tracking-tight">{room}</span>
                  <span className="text-[11px] tabular-nums tracking-[0.2em] transition group-hover:translate-x-1" style={{ color: i % 2 ? SAGE : CLAY }}>→</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* about statement */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Eyebrow center><span {...editCopy(content, "about_eyebrow", "Independent & curated")} /></Eyebrow>
          <p data-edit="content.about" style={{ ...display, color: WALNUT }} className="mt-6 text-2xl font-medium leading-[1.5] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.16em]" style={{ color: CLAY }} {...editCopy(content, "about_link", "Our story →")} />
        </section>
      )}

      {/* curated edit — first few pieces as clean divide-y rows */}
      {products.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 pb-8">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b pb-4" style={{ borderColor: LINE }}>
            <div>
              <Eyebrow><span {...editCopy(content, "edit_eyebrow", "This week's edit")} /></Eyebrow>
              <h2 style={{ ...display, color: WALNUT }} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "edit_heading", "Pieces we love")} />
            </div>
            <a href={href("services")} className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: CLAY }} {...editCopy(content, "edit_link", "View the collection →")} />
          </div>
          <div className="divide-y" style={{ borderColor: LINE }}>
            {products.slice(0, 6).map((s, i) => <ItemRow key={s.id} s={s} n={i + 1} />)}
          </div>
        </section>
      )}

      {/* styled-by-us lookbook strip (centrepiece) */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <Eyebrow center><span {...editCopy(content, "lookbook_eyebrow", "Styled by us")} /></Eyebrow>
            <h2 style={{ ...display, color: WALNUT }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-snug tracking-tight sm:text-4xl" {...editCopy(content, "lookbook_heading", "Rooms put together with care")} />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">{pill("View the lookbook", href("gallery"))}</div>
        </section>
      )}

      {/* gift wrapping & styling band */}
      <section style={{ background: SAGE }} className="text-[#f4f1e8]">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-6 py-16 sm:grid-cols-3">
          <div>
            <h3 style={display} className="text-xl font-medium tracking-tight" {...editCopy(content, "band_giftwrap_heading", "Gift wrapping")} />
            <p className="mt-2 text-sm leading-relaxed text-[#f4f1e8]/80" {...editCopy(content, "band_giftwrap_body", "Wrapped by hand, ready to give — just ask.")} />
          </div>
          <div className="sm:border-x sm:px-8" style={{ borderColor: "#ffffff2e" }}>
            <h3 style={display} className="text-xl font-medium tracking-tight" {...editCopy(content, "band_styling_heading", "Interior styling")} />
            <p className="mt-2 text-sm leading-relaxed text-[#f4f1e8]/80" {...editCopy(content, "band_styling_body", "A little help choosing pieces that belong together.")} />
          </div>
          <div>
            <h3 style={display} className="text-xl font-medium tracking-tight" {...editCopy(content, "band_independent_heading", "Independent")} />
            <p className="mt-2 text-sm leading-relaxed text-[#f4f1e8]/80" {...editCopy(content, "band_independent_body", "A small shop, every piece chosen by hand.")} />
          </div>
        </div>
      </section>

      {/* visit us — opening hours band */}
      <section style={{ background: LINEN, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-2">
          <div>
            <Eyebrow><span {...editCopy(content, "visit_eyebrow", "Visit us")} /></Eyebrow>
            <h2 style={{ ...display, color: WALNUT }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "visit_heading", "Come and have a browse")} />
            <div className="mt-6 space-y-2 text-[15px] leading-relaxed" style={{ color: TAUPE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#C08763]">{content.phone}</a>}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {pill(ctaLabel, cta, true)}
              {content.map_url && pill("Get directions", content.map_url)}
            </div>
          </div>
          {content.hours && content.hours.length > 0 && (
            <ul className="space-y-2 rounded-2xl bg-white p-7 text-sm" style={{ border: `1px solid ${LINE}`, color: TAUPE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6 border-b pb-2 last:border-0 last:pb-0" style={{ borderColor: LINE }}>
                  <span data-edit={`hours:${i}:day`} style={{ color: INK }}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-[#a8957f]">{h.open}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>,
    false,
  );
}
