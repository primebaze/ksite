import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { VelocityHeader } from "./VelocityHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Velocity — sharp, modern automotive design with a cool electric-cyan accent on
// deep midnight navy, crisp geometric type and a clean technical grid. A
// distinctly cooler, EV/detailing-flavoured counterpart to Apex (racing red).
// Built for garages, tyre & service centres, EV specialists, detailing and
// valeting. MULTI-PAGE: nav opens real routes (Services / About / Gallery /
// Contact) under basePath; the sticky glass header + footer are shared.

const NIGHT = "#0b0e14"; // page
const PANEL = "#11151e"; // lifted panel
const CARD = "#161b26"; // card surface
const CYAN = "#22d3ee"; // electric accent
const TEXT = "#eef2f7"; // light text
const MUTE = "#8d97a6"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: CYAN }}>
      <span className="h-2 w-2 rotate-45" style={{ background: CYAN }} />
      {children}
    </p>
  );
}

export default function VelocityDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book now";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const cyanBtn = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-md px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-[#0b0e14] transition hover:brightness-110" style={{ background: CYAN }}>{label}</a>
  );
  const ghostBtn = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-md border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:bg-white/5" style={{ borderColor: "#ffffff2e", color: TEXT }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: "#070a0f", borderTop: `1px solid ${CYAN}3a` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rotate-45" style={{ background: CYAN }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold uppercase tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-md text-white/75 transition hover:bg-[#22d3ee] hover:text-[#0b0e14]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
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
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: NIGHT }} className="min-h-screen font-body">
      <VelocityHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${CYAN}33` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Workshop", "Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="text-lg font-bold uppercase tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-bold" style={{ color: CYAN }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{cyanBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The team", "Engineered To Perform")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: TEXT }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Certified</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-md border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${CYAN}55`, color: TEXT }}>{a}</span>
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
          <div className="mt-12">{cyanBtn(ctaLabel, cta)}</div>
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
            <h2 style={{ ...display, color: TEXT }} className="text-2xl font-bold uppercase tracking-tight">Find the workshop</h2>
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
                theme={{ card: CARD, cardBorder: "#ffffff1a", heading: TEXT, blurb: MUTE, label: "#bfc7d2", fieldBg: PANEL, fieldBorder: "#ffffff22", fieldText: TEXT, button: CYAN, buttonText: "#0b0e14", radius: "0.5rem", font: "var(--font-space)" }}
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#11151e,#0b0e14)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(7,10,15,0.95) 0%, rgba(7,10,15,0.35) 55%, rgba(7,10,15,0.5) 100%)" }} />
        {/* cyan light streak */}
        <div className="pointer-events-none absolute right-0 top-1/4 h-px w-[55%]" style={{ background: `linear-gradient(90deg, transparent, ${CYAN})`, boxShadow: `0 0 20px ${CYAN}` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-24 text-white">
          <Kicker>{content.service_areas?.[0] ? `${content.service_areas[0]} & beyond` : "Precision automotive"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-bold uppercase leading-[0.92] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-8xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Performance, perfected."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {cyanBtn(ctaLabel, cta)}
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
              <p style={{ ...display, color: CYAN }} className="text-4xl font-bold">{s.k}</p>
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
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-lg object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-lg" style={{ background: CARD }} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-16 rounded-br-lg" style={{ borderBottom: `3px solid ${CYAN}`, borderRight: `3px solid ${CYAN}` }} />
          </div>
          <div>
            <Kicker>The team</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase leading-[0.98] tracking-tight sm:text-5xl">Engineered to perform</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: CYAN }}>About the workshop →</a>
          </div>
        </section>
      )}

      {/* services */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>Workshop</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">Services</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="text-lg font-bold uppercase tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-bold" style={{ color: CYAN }}>{s.price}</span>}
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
          <Kicker>The work</Kicker>
          <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">Recent jobs</h2>
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
      <section className="relative overflow-hidden" style={{ background: CYAN }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-[#0b0e14] sm:flex-row sm:items-center">
          <h2 style={display} className="text-3xl font-bold uppercase leading-[0.98] tracking-tight sm:text-4xl">Book your vehicle in today</h2>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-md bg-[#0b0e14] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-125">{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
