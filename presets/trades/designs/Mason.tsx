import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MasonHeader } from "./MasonHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Mason — bold builder / construction & home-improvement design. Heavy charcoal
// concrete with a safety-amber accent, condensed uppercase display type and a
// rugged, confident structure. Built for builders, contractors, roofers,
// extensions, landscaping and groundworks. MULTI-PAGE: nav opens real routes
// (Services / About / Gallery / Contact) under basePath; the sticky charcoal
// header + footer are shared.

const STEEL = "#15171b"; // page / charcoal
const PANEL = "#1c1f24"; // lifted panel
const CARD = "#22262c"; // card surface
const AMBER = "#f5a524"; // safety accent
const TEXT = "#f2f3f5"; // light text
const MUTE = "#9ba0a8"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: AMBER }}>
      <span className="h-[3px] w-7" style={{ background: AMBER }} />
      {children}
    </p>
  );
}

export default function MasonDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a free quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Projects", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const amberBtn = (label: string, to: string) => (
    <a href={to} className="inline-flex px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-black transition hover:brightness-105" style={{ background: AMBER }}>{label}</a>
  );
  const ghostBtn = (label: string, to: string) => (
    <a href={to} className="inline-flex border-2 px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-white/5" style={{ borderColor: "#ffffff2e", color: TEXT }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: "#0e0f12", borderTop: `2px solid ${AMBER}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="h-6 w-2 -skew-x-12" style={{ background: AMBER }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/75 transition hover:bg-[#f5a524] hover:text-black" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Site map</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Sat.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.accreditations && content.accreditations.length > 0 && <p className="uppercase tracking-[0.14em] text-white/45">{content.accreditations.join(" · ")}</p>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: STEEL }} className="min-h-screen font-body">
      <MasonHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `2px solid ${AMBER}55` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we build", "Our Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="text-lg font-bold uppercase tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-bold" style={{ color: AMBER }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{amberBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Built On Trust")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: TEXT }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Accredited</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${AMBER}77`, color: TEXT }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: TEXT }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Areas covered</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{amberBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Get A Free Quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: TEXT }} className="text-2xl font-extrabold uppercase tracking-tight">Where to find us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about your project and we'll come back with a free, no-obligation quote."
                bookingCta="Send request"
                theme={{ card: CARD, cardBorder: "#ffffff1a", heading: TEXT, blurb: MUTE, label: "#c2c6cd", fieldBg: PANEL, fieldBorder: "#ffffff22", fieldText: TEXT, button: AMBER, buttonText: "#000000", radius: "0", font: "var(--font-space)" }}
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
        {banner("Recent work", "Our Projects")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[94vh] items-end overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#1c1f24,#0e0f12)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,11,14,0.95) 0%, rgba(10,11,14,0.35) 55%, rgba(10,11,14,0.5) 100%)" }} />
        {/* amber hazard stripe */}
        <div className="pointer-events-none absolute bottom-0 left-0 h-2 w-full" style={{ background: `repeating-linear-gradient(45deg, ${AMBER} 0 16px, #000 16px 32px)` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 text-white">
          <Kicker>{content.service_areas?.[0] ? `${content.service_areas[0]} & surrounding areas` : "Builders & contractors"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-8xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Built right, the first time."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/75">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {amberBtn(ctaLabel, cta)}
            {phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* stat strip */}
      <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-10 text-center sm:grid-cols-3">
          {[
            { k: services.length > 0 ? `${services.length}+` : "All", v: "Services offered" },
            { k: content.accreditations?.length ? `${content.accreditations.length}` : "Fully", v: "Accreditations" },
            { k: content.service_areas?.length ? `${content.service_areas.length}` : "Local", v: "Areas covered" },
          ].map((s) => (
            <div key={s.v}>
              <p style={{ ...display, color: AMBER }} className="text-4xl font-extrabold">{s.k}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: MUTE }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: CARD }} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16" style={{ borderBottom: `5px solid ${AMBER}`, borderLeft: `5px solid ${AMBER}` }} />
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">Built on trust &amp; craftsmanship</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: AMBER }}>More about us →</a>
          </div>
        </section>
      )}

      {/* services list */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>What we build</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our services</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="text-lg font-bold uppercase tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-bold" style={{ color: AMBER }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{ghostBtn("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>Recent work</Kicker>
          <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our projects</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10">{ghostBtn("Full gallery", href("gallery"))}</div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: AMBER }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-black sm:flex-row sm:items-center">
          <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">Start your project today</h2>
          <a href={phone ? `tel:${phone}` : cta} className="bg-black px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-125">{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
