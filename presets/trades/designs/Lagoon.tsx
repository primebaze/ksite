import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LagoonHeader } from "./LagoonHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Lagoon — a calm, spa-like bespoke bathroom design & installation studio.
// Soft seafoam + off-white grounds with a deep teal-slate ink and a soft-brass
// accent; rounded forms, hairline rules and a gentle ripple/tile-grid motif.
// Design-led, not rugged: leads with a free design & quote, a start-to-finish
// journey, full supply & fit, and a before/after portfolio. MULTI-PAGE: nav
// opens real routes (Services / About / Work / Contact) under basePath; the
// floating header and serene footer are shared. Tenant swaps photography, copy,
// services and accreditations. Deliberately distinct from the navy plumber.

const SEAFOAM = "#9CC6BE"; // soft seafoam
const SLATE = "#2F4A4D"; // deep teal-slate ink
const SAND = "#E7DDCB"; // warm sand
const OFFWHITE = "#F6F4EF"; // off-white page
const BRASS = "#C2A468"; // soft brass accent
const MUTE = "#5d7472"; // muted teal body text
const display = { fontFamily: "var(--font-space)" } as const;

// gentle ripple / tile-grid motif as a tiling SVG background
const RIPPLE = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%232F4A4D' stroke-opacity='0.06' stroke-width='1'%3E%3Cpath d='M0 40c20 0 20-20 40-20s20 20 40 20'/%3E%3Cpath d='M0 60c20 0 20-20 40-20s20 20 40 20'/%3E%3Cpath d='M0 20c20 0 20-20 40-20s20 20 40 20'/%3E%3C/g%3E%3C/svg%3E")`;

function Kicker({ children, color = BRASS }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color }}>
      <span className="inline-block h-px w-7" style={{ background: color }} />
      {children}
    </span>
  );
}

export default function LagoonDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Free design & quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnSolid = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-8 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 ${full ? "block w-full" : "inline-flex items-center justify-center"}`}
      style={{ background: SLATE }}
    >
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-8 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-white/40 ${full ? "block w-full" : "inline-flex items-center justify-center"}`}
      style={{ border: `1px solid ${BRASS}`, color: SLATE }}
    >
      {label}
    </a>
  );

  const journey = [
    { n: "01", t: "Design", d: "A free home or showroom consultation, 3D plans and a fixed quote." },
    { n: "02", t: "Supply", d: "We source every tile, fitting and finish — delivered and ready." },
    { n: "03", t: "Fit", d: "One trusted team handles plumbing, tiling, electrics and joinery." },
    { n: "04", t: "Enjoy", d: "A spotless handover, aftercare and a workmanship guarantee." },
  ];

  const footer = (
    <footer style={{ background: SLATE }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span aria-hidden className="relative inline-flex h-7 w-7 items-center justify-center">
              <span className="absolute inset-0 rounded-full" style={{ border: `1.5px solid ${BRASS}` }} />
              <span className="absolute inset-[5px] rounded-full" style={{ border: `1.5px solid ${BRASS}99` }} />
              <span className="h-1 w-1 rounded-full" style={{ background: BRASS }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold tracking-[0.02em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em] text-white/70" style={{ border: "1px solid #ffffff2e" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-[#2F4A4D]" style={{ border: "1px solid #ffffff33" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]" >Studio</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">By appointment, Mon–Sat.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#ffffff6e" }}>
        <p>© {new Date().getFullYear()} {name}. Bespoke bathrooms, designed &amp; fitted.</p>
        {phone && <a href={`tel:${phone}`} className="font-medium uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE, color: SLATE }} className="min-h-screen font-body">
      <LagoonHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: SEAFOAM }}>
      <div className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: RIPPLE }} />
      <div className="relative mx-auto max-w-6xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker color={SLATE}>{kicker}</Kicker>
        <h1 className="mt-4 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl" style={{ ...display, color: SLATE }}>{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Bathrooms, start to finish")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: `${SLATE}1f` }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={display} className="text-xl font-semibold tracking-tight" >{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-semibold" style={{ color: BRASS }}>{s.price}</p>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our studio", "Designed to relax in")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2" style={{ background: `${SLATE}14` }}>
            {[
              { t: "Free design & quote", d: "No-obligation consultation and a fixed, transparent price." },
              { t: "Full supply & fit", d: "One studio for design, products and installation." },
              { t: "Workmanship guarantee", d: "Every bathroom backed in writing." },
              { t: "Tidy, trusted teams", d: "Dust-sheeted, respectful and spotless at handover." },
            ].map((f) => (
              <div key={f.t} className="p-7" style={{ background: OFFWHITE }}>
                <h3 style={display} className="text-base font-semibold tracking-tight">{f.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{f.d}</p>
              </div>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-semibold uppercase tracking-[0.24em]" >Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ border: `1px solid ${BRASS}`, color: SLATE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-semibold uppercase tracking-[0.24em]" >Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's begin", "Book your free design")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-semibold tracking-tight" >Visit the studio</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2F4A4D]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2F4A4D]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${SLATE}1f`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${SLATE}80` }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-7">{btnOutline("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about your space and we'll arrange a free design visit."
                bookingCta="Request my quote"
                theme={{ card: "#ffffff", cardBorder: `${SLATE}1f`, heading: SLATE, blurb: MUTE, label: SLATE, fieldBg: OFFWHITE, fieldBorder: `${SLATE}26`, fieldText: SLATE, button: SLATE, buttonText: "#ffffff", radius: "16px", font: "var(--font-space)" }}
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
        {banner("Portfolio", "Bathrooms we've created")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-14 sm:px-8">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {gallery.map((g) => (
                <figure key={g.id} className="mb-4 break-inside-avoid overflow-hidden rounded-2xl" style={{ border: `1px solid ${SLATE}14` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="w-full object-cover" />
                  {g.caption && <figcaption className="px-4 py-3 text-xs uppercase tracking-[0.16em]" style={{ background: "#ffffff", color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — calm, spa-like, seafoam grounded */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: SEAFOAM }}>
        <div className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: RIPPLE }} />
        <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 px-8 py-32 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Kicker color={SLATE}>{content.service_areas?.[0] ? `Bespoke bathrooms in ${content.service_areas[0]}` : "Bespoke bathroom design & fit"}</Kicker>
            <h1 className="mt-5 max-w-xl text-5xl font-semibold leading-[1.02] tracking-tight sm:text-[4.2rem]" style={{ ...display, color: SLATE }}>
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Bathrooms worth relaxing in."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-medium uppercase tracking-[0.28em]" style={{ color: `${SLATE}b3` }}>{name}</p>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: `${SLATE}cc` }}>
              Designed, supplied and fitted by one calm, trusted studio — from a free design visit to a spotless, guaranteed finish.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnSolid(ctaLabel, cta)}
              {phone && btnOutline(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: `${SLATE}b3` }}>
              <span>✓ Free design &amp; quote</span>
              <span>✓ Full supply &amp; fit</span>
              <span>✓ Workmanship guarantee</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(47,74,77,0.55)]" style={{ aspectRatio: "4 / 5", background: OFFWHITE }}>
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full" style={{ background: `linear-gradient(160deg, ${OFFWHITE}, ${SAND})` }} />
              )}
            </div>
            <span className="pointer-events-none absolute -bottom-4 -left-4 -z-10 h-28 w-28 rounded-[1.5rem]" style={{ background: BRASS, opacity: 0.4 }} />
            <span className="pointer-events-none absolute -right-4 -top-4 -z-10 h-24 w-24 rounded-full" style={{ border: `2px solid ${OFFWHITE}` }} />
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section style={{ background: OFFWHITE, borderBottom: `1px solid ${SLATE}14` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-6 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: MUTE }}>
          <span>Free in-home design</span>
          <span aria-hidden style={{ color: BRASS }}>◦</span>
          <span>Project portfolio</span>
          <span aria-hidden style={{ color: BRASS }}>◦</span>
          <span>Full supply &amp; fit</span>
          <span aria-hidden style={{ color: BRASS }}>◦</span>
          <span>Guaranteed workmanship</span>
        </div>
      </section>

      {/* journey band — design → supply → fit → enjoy */}
      <section style={{ background: SAND }}>
        <div className="mx-auto max-w-6xl px-8 py-24">
          <Kicker>Your bathroom, start to finish</Kicker>
          <h2 style={{ ...display, color: SLATE }} className="mt-4 max-w-2xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">One studio, four calm steps</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: `${SLATE}1a` }}>
            {journey.map((j) => (
              <div key={j.n} className="p-8" style={{ background: OFFWHITE }}>
                <span style={display} className="text-sm font-semibold tracking-[0.2em]" >{j.n}</span>
                <h3 style={{ ...display, color: SLATE }} className="mt-3 text-xl font-semibold tracking-tight">{j.t}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTE }}>{j.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[2rem]" style={{ aspectRatio: "5 / 4", background: SEAFOAM }}>
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="h-full w-full object-cover" />
              ) : (
                <div className="h-full w-full" style={{ backgroundImage: RIPPLE, backgroundColor: SEAFOAM }} />
              )}
            </div>
            <span className="pointer-events-none absolute -bottom-4 -right-4 -z-10 h-28 w-28 rounded-[1.5rem]" style={{ background: BRASS, opacity: 0.35 }} />
          </div>
          <div className="order-1 lg:order-2">
            <Kicker>Our studio</Kicker>
            <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Design-led, beautifully fitted</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: BRASS }}>More about us →</a>
          </div>
        </section>
      )}

      {/* services — what we do, clean divider rows */}
      {services.length > 0 && (
        <section style={{ background: OFFWHITE, borderTop: `1px solid ${SLATE}14`, borderBottom: `1px solid ${SLATE}14` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker>What we do</Kicker>
            <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Bathrooms &amp; wet rooms</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: `${SLATE}1f` }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: SLATE }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-semibold" style={{ color: BRASS }}>{s.price}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnOutline("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* work — before/after portfolio strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 py-24">
          <Kicker>Portfolio</Kicker>
          <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Recently completed</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              <div key={g.id} className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${SLATE}14` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              </div>
            ))}
          </div>
          <div className="mt-10">{btnOutline("See the full portfolio", href("gallery"))}</div>
        </section>
      )}

      {/* guarantee + areas covered band */}
      <section className="relative overflow-hidden" style={{ background: SLATE }}>
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'%3E%3Cg fill='none' stroke='%239CC6BE' stroke-opacity='0.18' stroke-width='1'%3E%3Cpath d='M0 40c20 0 20-20 40-20s20 20 40 20'/%3E%3Cpath d='M0 60c20 0 20-20 40-20s20 20 40 20'/%3E%3C/g%3E%3C/svg%3E")` }} />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-8 py-20 text-white lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <Kicker color={SEAFOAM}>Peace of mind</Kicker>
            <h2 style={display} className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Guaranteed, top to bottom</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/70">
              Every Lagoon bathroom is fully project-managed, fitted by our own trusted team and backed by a written workmanship guarantee. Free design, fixed quote, no surprises.
            </p>
            <div className="mt-7">
              <a href={cta} className="inline-flex rounded-full px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: BRASS, color: SLATE }}>{ctaLabel}</a>
            </div>
          </div>
          <div className="lg:pl-8 lg:border-l" style={{ borderColor: "#ffffff1f" }}>
            <h3 style={display} className="text-xs font-semibold uppercase tracking-[0.24em] text-white/80">Areas we cover</h3>
            {content.service_areas && content.service_areas.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2.5">
                {content.service_areas.map((a) => (
                  <span key={a} className="rounded-full px-4 py-2 text-[12px] tracking-wide text-white/85" style={{ border: "1px solid #ffffff2e" }}>{a}</span>
                ))}
              </div>
            ) : (
              <p className="mt-5 text-[15px] leading-relaxed text-white/70">Serving homes across the local area — get in touch to check your postcode.</p>
            )}
            {content.accreditations && content.accreditations.length > 0 && (
              <>
                <h3 style={display} className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-white/80">Accredited &amp; insured</h3>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  {content.accreditations.map((a) => (
                    <span key={a} className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.12em]" style={{ border: `1px solid ${BRASS}`, color: SEAFOAM }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* closing CTA */}
      <section style={{ background: SEAFOAM }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-90" style={{ backgroundImage: RIPPLE }} />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-8 py-20 sm:flex-row sm:items-center" style={{ color: SLATE }}>
          <div>
            <h2 style={display} className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">Ready to design your bathroom?</h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em]" style={{ color: `${SLATE}b3` }}>Free design visit · fixed quote · full supply &amp; fit.</p>
          </div>
          {btnSolid(phone ? `Call ${phone}` : ctaLabel, phone ? `tel:${phone}` : cta)}
        </div>
      </section>
    </>,
    false,
  );
}
