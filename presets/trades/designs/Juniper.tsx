import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { JuniperHeader } from "./JuniperHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Juniper — warm, inviting concept-shop & gift-store design. Soft cream and
// terracotta with a friendly serif, rounded edges and a relaxed boutique
// rhythm. Built for gift shops, homeware & lifestyle stores, plant shops,
// candle/soap makers and concept retail. MULTI-PAGE: nav opens real routes
// (Shop / About / Gallery / Visit) under basePath; the sticky cream header +
// cocoa footer are shared.

const CREAM = "#fbf6ee"; // page
const PANEL = "#f3ebdd"; // tinted panel
const CLAY = "#bd5b3d"; // terracotta accent
const COCOA = "#3c2c24"; // heading ink / footer
const TAUPE = "#7a655a"; // muted body
const LINE = "#e6dccb"; // hairlines
const serif = { fontFamily: "var(--font-fraunces)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: CLAY }}>{children}</p>
  );
}

export default function JuniperDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Visit us";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    services.length > 0 && { label: "Shop", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: COCOA }} className="text-[#f0e7da]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl tracking-[0.04em] text-[#fbf6ee]">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.42em] text-white/40" {...editCopy(content, "footer_subtitle", "Concept Shop")} />
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/65 transition hover:bg-[#bd5b3d] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40" {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40" {...editCopy(content, "footer_findus", "Find us")} />
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40" {...editCopy(content, "footer_hours", "Opening times")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/35">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">Open most days.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff55" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.accreditations && content.accreditations.length > 0 && <p className="text-white/45">{content.accreditations.join(" · ")}</p>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <JuniperHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, blurb?: string, blurbKey?: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Kicker><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...serif, color: COCOA }} className="mx-auto mt-4 max-w-3xl text-4xl leading-[1.06] tracking-tight sm:text-5xl" {...editCopy(content, titleKey, title)} />
        {blurb && blurbKey && <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: TAUPE }} {...editCopy(content, blurbKey, blurb)} />}
      </div>
    </section>
  );

  // ---- SHOP / SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("In store", "shop_kicker", "What you'll find", "shop_title", "A carefully curated collection — drop in and discover something you'll love.", "shop_blurb")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...serif, color: COCOA }} className="text-xl">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: TAUPE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: CLAY }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: TAUPE }}>Our collection is coming soon.</p>}
          <div className="mt-12 text-center">
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
        {banner("Our story", "about_kicker", "A little shop with a lot of heart", "about_title")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: TAUPE }}>{content.about}</p> : <p style={{ color: TAUPE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-12 flex flex-wrap gap-3">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: COCOA }}>{a}</span>
              ))}
            </div>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...serif, color: COCOA }} className="mt-12 text-2xl" {...editCopy(content, "about_areas_heading", "Find us around")} />
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: TAUPE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Come say hello", "contact_kicker", "Visit the shop", "contact_title", "Pop in to browse, or send us a message — we'd love to hear from you.", "contact_blurb")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: COCOA }} className="text-2xl" {...editCopy(content, "contact_heading", "Where to find us")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: TAUPE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#bd5b3d]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#bd5b3d]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: TAUPE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a08a7c]">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.14em] transition hover:bg-[#f3ebdd]" style={{ borderColor: LINE, color: COCOA }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Looking for a gift, a custom order or a special request? Tell us what you have in mind."
                bookingCta="Send message"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: COCOA, blurb: TAUPE, label: "#7a655a", fieldBg: "#ffffff", fieldBorder: "#ddd0bd", fieldText: COCOA, button: CLAY, buttonText: "#ffffff", radius: "1rem", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Inside the shop", "gallery_kicker", "A look around", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20" style={{ color: TAUPE }}>Coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — centered cream, rounded inset image */}
      <section style={{ background: PANEL }}>
        <div className="mx-auto max-w-3xl px-6 pt-16 pb-12 text-center sm:pt-20">
          <Kicker>{content.service_areas?.[0] ? content.service_areas[0] : "A curated concept shop"}</Kicker>
          <h1 style={{ ...serif, color: COCOA }} className="mt-5 text-5xl leading-[1.04] tracking-tight sm:text-6xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Beautiful things, thoughtfully chosen."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: TAUPE }}>{name}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>{ctaLabel}</a>
            {services.length > 0 && <a href={href("services")} className="inline-flex rounded-full border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-white/40" style={{ borderColor: "#cbb9a4", color: COCOA }}>Browse the shop</a>}
          </div>
        </div>
        {hero ? (
          <div className="mx-auto max-w-5xl px-6 pb-16">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-edit-image="hero" src={hero} alt="" className="aspect-[16/9] w-full rounded-[2rem] object-cover shadow-[0_30px_70px_-38px_rgba(60,44,36,0.5)]" />
          </div>
        ) : (
          <div className="mx-auto max-w-5xl px-6 pb-16">
            <div className="aspect-[16/9] w-full rounded-[2rem]" style={{ background: `linear-gradient(160deg,#d98a6c,${CLAY})` }} />
          </div>
        )}
      </section>

      {/* about statement */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Kicker><span {...editCopy(content, "home_about_kicker", "Our story")} /></Kicker>
          <p data-edit="content.about" style={{ ...serif, color: COCOA }} className="mt-6 text-2xl leading-[1.5] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: CLAY }}>Read more →</a>
        </section>
      )}

      {/* shop list */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-6 py-24">
            <div className="text-center">
              <Kicker><span {...editCopy(content, "home_shop_kicker", "In store")} /></Kicker>
              <h2 style={{ ...serif, color: COCOA }} className="mt-4 text-3xl tracking-tight sm:text-4xl" {...editCopy(content, "home_shop_heading", "What you'll find")} />
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...serif, color: COCOA }} className="text-lg">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: TAUPE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: CLAY }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-10 text-center">
              <a href={href("services")} className="text-[12px] font-semibold uppercase tracking-[0.16em] underline-offset-4 hover:underline" style={{ color: CLAY }}>See everything →</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <Kicker><span {...editCopy(content, "home_gallery_kicker", "Inside the shop")} /></Kicker>
            <h2 style={{ ...serif, color: COCOA }} className="mt-4 text-3xl tracking-tight sm:text-4xl" {...editCopy(content, "home_gallery_heading", "A look around")} />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="text-[12px] font-semibold uppercase tracking-[0.16em] underline-offset-4 hover:underline" style={{ color: CLAY }}>View gallery →</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: CLAY }}>
        <div className="mx-auto max-w-2xl px-6 py-20 text-center text-white">
          <h2 style={serif} className="text-3xl tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Come and say hello")} />
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/85" {...editCopy(content, "cta_sub", "Whether you're after the perfect gift or just a browse, you're always welcome.")} />
          <a href={cta} className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ color: CLAY }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
