import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AtelierHeader } from "./AtelierHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Atelier — warm, editorial retail / boutique design. A soft cream canvas, clay
// and ink palette, generous serif headings and a product-led, magazine-style
// layout. Built for boutiques, gift shops, concept stores and makers. The
// catalog reads as a "collection" of products with prices. MULTI-PAGE: nav opens
// real routes (Collection / About / Lookbook / Visit) under basePath; the sticky
// cream header + ink footer are shared.

const CREAM = "#faf6f0"; // page
const SAND = "#f1e9dd"; // tinted panel
const INK = "#2a2320"; // headings / footer
const CLAY = "#a8643c"; // warm accent
const TAUPE = "#6f6358"; // muted body
const LINE = "#e3d8c9"; // hairline
const serif = { fontFamily: "var(--font-fraunces)" } as const;

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${center ? "text-center" : ""}`} style={{ color: CLAY }}>{children}</p>
  );
}

export default function AtelierDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const products = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Enquire";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    products.length > 0 && { label: "Collection", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Lookbook", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-[#f4ede2]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")}><span data-edit="tenant.business_name" style={serif} className="text-2xl font-medium tracking-tight">{name}</span></a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#f4ede2]/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#f4ede2]/75 transition hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4ede2]/45">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm text-[#f4ede2]/70">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4ede2]/45">Find us</h4>
          <div className="mt-5 space-y-3 text-sm text-[#f4ede2]/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#f4ede2]/45">Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#f4ede2]/70">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#f4ede2]/40">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#f4ede2]/60">Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#f4ede299" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white">Stockists &amp; enquiries</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body" >
      <AtelierHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: SAND, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Kicker center>{kicker}</Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  const ProductCard = ({ s, img }: { s: (typeof products)[number]; img?: string }) => (
    <div className="group flex flex-col">
      <div className="relative overflow-hidden" style={{ background: SAND }}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={img} alt="" className="aspect-[4/5] w-full object-cover transition duration-700 group-hover:scale-[1.04]" />
        ) : (
          <div className="grid aspect-[4/5] w-full place-items-center" style={{ color: `${CLAY}88` }}><span style={serif} className="text-3xl">{s.name.trim().charAt(0)}</span></div>
        )}
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-3">
        <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="text-lg font-medium">{s.name}</h3>
        {s.price && <span data-edit={`item:${s.id}:price`} className="text-sm font-medium" style={{ color: CLAY }}>{s.price}</span>}
      </div>
      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: TAUPE }}>{s.description}</p>}
    </div>
  );

  // ---- COLLECTION ----
  if (page === "services") {
    return shell(
      <>
        {banner("The collection", "Pieces we love")}
        <section className="mx-auto max-w-6xl px-6 py-16">
          {products.length > 0 ? (
            <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((s, i) => <ProductCard key={s.id} s={s} img={gallery[i % Math.max(gallery.length, 1)]?.image_url} />)}
            </div>
          ) : <p style={{ color: TAUPE }}>Our collection is coming soon.</p>}
          <div className="mt-16 text-center">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "Made with care")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: TAUPE }}>{content.about}</p> : <p style={{ color: TAUPE }}>Our story is coming soon.</p>}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl font-medium">Where to find us</h3>
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: TAUPE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- LOOKBOOK / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Lookbook", "In the shop")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full object-cover" />
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
        {banner("Visit us", "Say hello")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl font-medium">Find the shop</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: TAUPE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#a8643c]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#a8643c]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: TAUPE }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a89a89]">{h.open}</span></li>))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition hover:bg-white" style={{ borderColor: CLAY, color: CLAY }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="After a bespoke order, gift wrapping or a stockist enquiry? Tell us more."
                bookingCta="Send enquiry"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: TAUPE, label: "#6f6358", fieldBg: CREAM, fieldBorder: "#ddd0bf", fieldText: INK, button: CLAY, buttonText: "#ffffff", radius: "1rem", font: "var(--font-fraunces)" }}
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
      {/* hero — large editorial image with caption card */}
      <section className="mx-auto max-w-6xl px-6 pt-10 sm:pt-14">
        <div className="relative overflow-hidden">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img data-edit-image="hero" src={hero} alt="" className="aspect-[16/10] w-full object-cover sm:aspect-[16/8]" />
          ) : (
            <div className="aspect-[16/8] w-full" style={{ background: `linear-gradient(135deg,${SAND},#e7dccb)` }} />
          )}
        </div>
        <div className="mx-auto -mt-16 max-w-xl px-8 py-10 text-center sm:-mt-20" style={{ background: CREAM, boxShadow: "0 30px 70px -50px rgba(42,35,32,0.6)" }}>
          <Kicker center>{name}</Kicker>
          <h1 data-edit="content.tagline" style={{ ...serif, color: INK }} className="mt-3 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">{content.tagline ?? "Considered pieces, beautifully made."}</h1>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            {products.length > 0 && <a href={href("services")} className="inline-flex rounded-full px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Shop the collection</a>}
            <a href={cta} className="inline-flex rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white" style={{ borderColor: INK, color: INK }}>{ctaLabel}</a>
          </div>
        </div>
      </section>

      {/* about statement */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Kicker center>Our story</Kicker>
          <p data-edit="content.about" style={{ ...serif, color: INK }} className="mt-6 text-2xl font-medium leading-[1.5] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: CLAY }}>Read more →</a>
        </section>
      )}

      {/* featured collection */}
      {products.length > 0 && (
        <section style={{ background: SAND, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>The collection</Kicker>
                <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl">Pieces we love</h2>
              </div>
              <a href={href("services")} className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: CLAY }}>View all →</a>
            </div>
            <div className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {products.slice(0, 6).map((s, i) => <ProductCard key={s.id} s={s} img={gallery[i % Math.max(gallery.length, 1)]?.image_url} />)}
            </div>
          </div>
        </section>
      )}

      {/* lookbook strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Kicker center>Lookbook</Kicker>
          <h2 style={{ ...serif, color: INK }} className="mx-auto mt-3 max-w-2xl text-center text-3xl font-medium leading-snug tracking-tight sm:text-4xl">A space made for slow, considered shopping.</h2>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:bg-white" style={{ borderColor: INK, color: INK }}>View lookbook</a>
          </div>
        </section>
      )}

      {/* closing band */}
      <section style={{ background: INK }} className="text-[#f4ede2]">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 style={serif} className="text-3xl font-medium tracking-tight sm:text-4xl">Come and visit us</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-[#f4ede2]/70">Pop into the shop, or get in touch about bespoke orders, gifting and stockists.</p>
          <a href={cta} className="mt-8 inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
