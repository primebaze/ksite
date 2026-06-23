import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MeridianHeader } from "./MeridianHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Meridian — refined, photo-led premium general-services design. A crisp white
// canvas with an ink/soft-gold palette, elegant serif headings and large
// imagery. A flexible, sophisticated choice for any service business — cleaners,
// agencies, consultants, premium home services. MULTI-PAGE: nav opens real
// routes (Services / About / Gallery / Contact) under basePath; the sticky
// header + ink footer are shared.

const INK = "#1a1d22"; // headings / footer
const SOFT = "#f7f6f3"; // tinted panel
const GOLD = "#9a7b4f"; // refined accent
const GREY = "#5b6068"; // muted body
const LINE = "#e8e6e1"; // hairline
const serif = { fontFamily: "var(--font-fraunces)" } as const;

function Kicker({ children, center = false, light = false }: { children: ReactNode; center?: boolean; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] ${center ? "justify-center" : ""}`} style={{ color: light ? "rgba(255,255,255,0.85)" : GOLD }}>
      <span className="h-px w-7" style={{ background: light ? "rgba(255,255,255,0.7)" : GOLD }} />
      {children}
    </p>
  );
}

export default function MeridianDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Enquire";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")}><span data-edit="tenant.business_name" style={serif} className="text-2xl font-medium tracking-tight">{name}</span></a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:text-white" style={{ border: `1px solid ${GOLD}66` }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40" {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.accreditations && content.accreditations.length > 0 && <p className="uppercase tracking-[0.14em] text-white/45">{content.accreditations.join(" · ")}</p>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body">
      <MeridianHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // banner doubles as the spacer clearing the fixed header on sub-pages
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: SOFT, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-32 text-center sm:pt-40">
        <Kicker center><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we offer", "svc_kicker", "Our services", "svc_title")}
        <section className="mx-auto max-w-5xl px-6 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <div key={s.id} className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...serif, color: GOLD }} className="text-2xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="text-xl font-medium">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: GREY }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="text-base font-medium" style={{ color: INK }}>{s.price}</span>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: GREY }}>Services coming soon.</p>}
          <div className="mt-14 text-center">
            <a href={cta} className="inline-flex border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-neutral-50" style={{ borderColor: GOLD, color: GOLD }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "about_kicker", "A considered approach", "about_title")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: GREY }}>{content.about}</p> : <p style={{ color: GREY }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_accreditations_heading", "Accreditations")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (<span key={a} className="border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: LINE, color: GREY }}>{a}</span>))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: GREY }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12 text-center">
            <a href={cta} className="inline-flex border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-neutral-50" style={{ borderColor: GOLD, color: GOLD }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Our work", "gallery_kicker", "Gallery", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: GREY }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "contact_kicker", "Let's talk", "contact_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl font-medium" {...editCopy(content, "contact_find_heading", "Find us")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: GREY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#9a7b4f]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#9a7b4f]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: GREY }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition hover:bg-neutral-50" style={{ borderColor: INK, color: INK }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us what you need and we'll put together a tailored proposal."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: GREY, label: "#4a4f57", fieldBg: "#ffffff", fieldBorder: "#d8d5cf", fieldText: INK, button: INK, buttonText: "#ffffff", radius: "0", font: "var(--font-fraunces)" }}
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
      {/* hero — full-bleed image, centred refined headline */}
      <section className="relative isolate flex min-h-[96vh] items-center justify-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(150deg,#2c2f36,#1a1d22)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.55) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <Kicker center light>{name}</Kicker>
          <h1 data-edit="content.tagline" style={serif} className="mt-5 text-5xl font-medium leading-[1.04] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">{content.tagline ?? "Premium service, every detail considered."}</h1>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={cta} className="inline-flex bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:opacity-90">{ctaLabel}</a>
            {content.phone && <a href={`tel:${content.phone}`} className="inline-flex border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ borderColor: "rgba(255,255,255,0.5)" }}>Call {content.phone}</a>}
          </div>
        </div>
      </section>

      {/* about — image left, copy right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full" style={{ background: SOFT }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20" style={{ borderBottom: `1px solid ${GOLD}`, borderRight: `1px solid ${GOLD}` }} />
          </div>
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "About us")} /></Kicker>
            <h2 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium leading-tight tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "A standard you can feel")} />
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: GREY }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }} {...editCopy(content, "home_about_link", "Read more →")} />
          </div>
        </section>
      )}

      {/* services */}
      {services.length > 0 && (
        <section style={{ background: SOFT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-6 py-24">
            <div className="text-center">
              <Kicker center><span {...editCopy(content, "home_services_kicker", "What we offer")} /></Kicker>
              <h2 style={{ ...serif, color: INK }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "home_services_heading", "Our services")} />
            </div>
            <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s, i) => (
                <div key={s.id} className="grid gap-4 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...serif, color: GOLD }} className="text-xl">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="text-lg font-medium">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: GREY }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="text-base font-medium" style={{ color: INK }}>{s.price}</span>}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-white" style={{ borderColor: GOLD, color: GOLD }} {...editCopy(content, "home_services_link", "View all services")} />
            </div>
          </div>
        </section>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Kicker center><span {...editCopy(content, "home_gallery_kicker", "Our work")} /></Kicker>
            <h2 style={{ ...serif, color: INK }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-snug tracking-tight sm:text-4xl" {...editCopy(content, "home_gallery_heading", "Work we're proud to put our name to.")} />
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-neutral-50" style={{ borderColor: INK, color: INK }} {...editCopy(content, "home_gallery_link", "View gallery")} />
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <Kicker center light><span {...editCopy(content, "cta_kicker", "Get started")} /></Kicker>
          <h2 style={serif} className="mt-5 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Let's create something exceptional")} />
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65" {...editCopy(content, "cta_sub", "Get in touch for a tailored quote — we'll handle the rest with care.")} />
          <a href={cta} className="mt-8 inline-flex bg-white px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-neutral-900 transition hover:opacity-90">{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
