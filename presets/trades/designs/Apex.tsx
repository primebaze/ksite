import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ApexHeader } from "./ApexHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Apex — sleek, dark, performance-led automotive design. Carbon black with a
// racing-red accent, italic display type and a precise, technical grid. Built
// for garages, MOT centres, detailing studios and tuners. MULTI-PAGE: nav opens
// real routes (Services / About / Gallery / Contact) under basePath; the sticky
// glass header + carbon footer are shared.

const CARBON = "#0a0c10"; // page
const PANEL = "#11141a"; // lifted panel
const CARD = "#161a22"; // card surface
const RED = "#e11d2a"; // racing accent
const TEXT = "#eef0f3"; // light text
const MUTE = "#9298a3"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: RED }}>
      <span className="h-px w-7" style={{ background: RED }} />
      {children}
    </p>
  );
}

export default function ApexDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book in";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const redBtn = (label: string, to: string) => (
    <a href={to} className="-skew-x-12 px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: RED }}>
      <span className="inline-block skew-x-12">{label}</span>
    </a>
  );
  const ghostBtn = (label: string, to: string) => (
    <a href={to} className="-skew-x-12 border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-white/5" style={{ borderColor: "#ffffff33", color: TEXT }}>
      <span className="inline-block skew-x-12">{label}</span>
    </a>
  );

  const footer = (
    <footer style={{ background: "#06070a", borderTop: `1px solid ${RED}55` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="h-6 w-1 -skew-x-12" style={{ background: RED }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold uppercase italic tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/75 transition hover:bg-[#e11d2a] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Workshop</h4>
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
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CARBON }} className="min-h-screen font-body">
      <ApexHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${RED}44` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase italic leading-[0.95] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Workshop", "Services")}
        <section className="mx-auto max-w-7xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.map((s, i) => (
                <div key={s.id} className="group flex flex-col gap-3 py-7 transition sm:flex-row sm:items-center sm:gap-8" style={{ borderColor: "#ffffff14" }}>
                  <span style={{ ...display, color: RED }} className="text-2xl font-bold italic">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="text-xl font-bold uppercase italic tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-bold" style={{ color: RED }}>{s.price}</span>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{redBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The team", "Precision & Performance")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: TEXT }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Certified</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="-skew-x-12 border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${RED}66`, color: TEXT }}><span className="inline-block skew-x-12">{a}</span></span>
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
          <div className="mt-12">{redBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Book in", "Get In Touch")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: TEXT }} className="text-2xl font-bold uppercase italic tracking-tight">Find the workshop</h2>
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
                bookingBlurb="Tell us the make, model and what's needed — we'll come back with a price and a slot."
                bookingCta="Send request"
                theme={{ card: CARD, cardBorder: "#ffffff1a", heading: TEXT, blurb: MUTE, label: "#c2c6cd", fieldBg: PANEL, fieldBorder: "#ffffff22", fieldText: TEXT, button: RED, buttonText: "#ffffff", radius: "0", font: "var(--font-space)" }}
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
        {banner("The work", "Gallery")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#11141a,#0a0c10)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(6,7,10,0.95) 0%, rgba(6,7,10,0.4) 55%, rgba(6,7,10,0.55) 100%)" }} />
        {/* red diagonal accent */}
        <div className="pointer-events-none absolute -right-24 top-1/3 h-2 w-[60%] -skew-y-6" style={{ background: `linear-gradient(90deg, transparent, ${RED})` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 text-white">
          <Kicker>{content.service_areas?.[0] ? `${content.service_areas[0]} & beyond` : "Performance workshop"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-bold uppercase italic leading-[0.9] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-8xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Driven by precision."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {redBtn(ctaLabel, cta)}
            {phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* spec strip */}
      <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-10 text-center sm:grid-cols-3">
          {[
            { k: services.length > 0 ? `${services.length}+` : "Full", v: "Services on offer" },
            { k: content.accreditations?.length ? `${content.accreditations.length}` : "Approved", v: "Certifications" },
            { k: content.service_areas?.length ? `${content.service_areas.length}` : "Local", v: "Areas covered" },
          ].map((s) => (
            <div key={s.v}>
              <p style={{ ...display, color: RED }} className="text-4xl font-bold italic">{s.k}</p>
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
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: CARD }} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-16" style={{ borderBottom: `4px solid ${RED}`, borderRight: `4px solid ${RED}` }} />
          </div>
          <div>
            <Kicker>The team</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase italic leading-[0.95] tracking-tight sm:text-5xl">Precision in every detail</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: RED }}>About the workshop →</a>
          </div>
        </section>
      )}

      {/* services */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker>Workshop</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase italic tracking-tight sm:text-5xl">Services</h2>
            <div className="mt-12 divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.slice(0, 6).map((s, i) => (
                <div key={s.id} className="flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:gap-8" style={{ borderColor: "#ffffff14" }}>
                  <span style={{ ...display, color: RED }} className="text-xl font-bold italic">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="text-lg font-bold uppercase italic tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-bold" style={{ color: TEXT }}>{s.price}</span>}
                </div>
              ))}
            </div>
            <div className="mt-12">{ghostBtn("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>The work</Kicker>
          <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase italic tracking-tight sm:text-5xl">Recent jobs</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10">{ghostBtn("Full gallery", href("gallery"))}</div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: RED }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <h2 style={display} className="text-3xl font-bold uppercase italic leading-[0.95] tracking-tight sm:text-4xl">Book your vehicle in today</h2>
          <a href={phone ? `tel:${phone}` : cta} className="-skew-x-12 bg-black px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-125">
            <span className="inline-block skew-x-12">{phone ? `Call ${phone}` : ctaLabel}</span>
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
