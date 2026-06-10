import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RenderHeader } from "./RenderHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Render — a calm, premium design for a PLASTERER & rendering specialist.
// Where the industrial siblings go dark and hard-edged, Render owns a smooth
// plaster-toned register: off-white walls, soft putty greys, a trowel
// steel-blue and a warm sand accent. The visual language is *surface* — broad
// trowel-sweep gradients, rounded soft-pressed shapes, generous calm space and
// a flawless-finish promise. MULTI-PAGE: nav opens real routes (Services /
// About / Work / Contact) under basePath; the sticky header + pale footer are
// shared. Tenant swaps in their own photography, copy, services and trades.

const PLASTER = "#EDE8DF"; // smooth plaster off-white (page)
const PUTTY = "#B9B2A6"; // soft putty grey
const INK = "#2A2C2E"; // deep slate ink (text)
const STEEL = "#5E7488"; // trowel steel-blue
const SAND = "#D7C7AE"; // warm sand accent
const CARD = "#F6F2EB"; // lifted plaster card
const MUTE = "#6B6962"; // muted body text
const display = { fontFamily: "var(--font-space)" } as const;

// A trowel-sweep: broad diagonal smooth gradient used as the texture motif.
const sweep = (a: string, b: string) =>
  `linear-gradient(115deg, ${a} 0%, ${b} 55%, ${a} 100%)`;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: STEEL }}>
      <span className="inline-block h-[2px] w-7 rounded-full" style={{ background: SAND }} />
      {children}
    </span>
  );
}

export default function RenderDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Trust pillars — lead with reassurance, not bravado.
  const trust = [
    "Fully insured",
    "Free no-obligation quotes",
    "Flawless, smooth finish",
    content.service_areas?.[0] ? `${content.service_areas[0]} & beyond` : "Local & reliable",
  ];

  // Calm primary / quiet ghost buttons — pill-shaped, soft-pressed.
  const btnPrimary = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: INK, color: PLASTER }}
    >
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full border px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-white/50 ${full ? "block w-full" : "inline-flex"}`}
      style={{ borderColor: `${INK}2e`, color: INK }}
    >
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: INK }} className="text-[#E6E2DA]">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full" style={{ background: STEEL }} aria-hidden>
              <span className="h-[2px] w-3.5 rounded-full" style={{ background: PLASTER }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold tracking-[0.04em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#A9A498" }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em]" style={{ border: `1px solid ${STEEL}66`, color: "#C7C2B8" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#E6E2DA] transition hover:text-[#2A2C2E]" style={{ border: `1px solid ${STEEL}55` }} onMouseDown={undefined}>
                  <span className="flex h-full w-full items-center justify-center rounded-full transition hover:bg-[#D7C7AE]"><TradesSocialIcon kind={`${s.label} ${s.url}`} /></span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]" >Company</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: "#A9A498" }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: "#A9A498" }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: "#A9A498" }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: "#A9A498" }}>Mon–Sat, by appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-medium uppercase tracking-[0.18em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PLASTER }} className="min-h-screen font-body" >
      <RenderHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner: a smooth trowelled plaster band, sand hairline below.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: sweep(CARD, PLASTER), borderBottom: `1px solid ${SAND}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----  clean divider rows, name+desc left / price right
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Our services")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: `${PUTTY}80` }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-7">
                  <div className="max-w-2xl">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 pt-1 text-base font-semibold" style={{ color: STEEL }}>{s.price}</p>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "A flawless finish, every time")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-semibold uppercase tracking-[0.24em]" >Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ background: CARD, border: `1px solid ${SAND}`, color: INK }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-semibold uppercase tracking-[0.24em]" >Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Request a quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold tracking-tight" >Talk to a plasterer</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2A2C2E]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2A2C2E]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${PUTTY}80`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: PUTTY }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-7">{btnGhost("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about the walls and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: CARD, cardBorder: `${PUTTY}66`, heading: INK, blurb: MUTE, label: INK, fieldBg: "#FFFFFF", fieldBorder: `${PUTTY}88`, fieldText: INK, button: INK, buttonText: PLASTER, radius: "14px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----  before/after register: rough → smooth
  if (page === "gallery") {
    return shell(
      <>
        {banner("Recent work", "Rough to smooth")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: CARD, border: `1px solid ${PUTTY}55` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                  {g.caption && <figcaption className="px-5 py-3 text-[13px]" style={{ color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const steps = [
    { n: "01", t: "Survey & quote", d: "We assess the walls, talk through the finish you want and send a clear, free quote." },
    { n: "02", t: "Prep & protect", d: "Surfaces are cleaned, beaded and protected so every coat goes on true and even." },
    { n: "03", t: "Skim & smooth", d: "Trowelled, polished and left flawless — ready to decorate and built to last." },
  ];
  const whatWeDo = services.length > 0
    ? services.slice(0, 6).map((s) => s.name)
    : ["Skimming", "Plastering", "Rendering", "Coving & cornice", "Damp & repair", "Venetian polish"];

  return shell(
    <>
      {/* hero — smooth, tactile, plaster-toned */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: PLASTER }}>
        {/* trowel-sweep surface texture */}
        <div className="pointer-events-none absolute inset-0" style={{ background: sweep(CARD, PLASTER) }} />
        <div className="pointer-events-none absolute -right-24 top-1/2 hidden h-[120%] w-[55%] -translate-y-1/2 rounded-[40%] opacity-70 lg:block" style={{ background: sweep(`${SAND}55`, `${PLASTER}00`), filter: "blur(20px)" }} />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-8 py-28 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Kicker>{content.service_areas?.[0] ? `Plastering across ${content.service_areas[0]}` : "Plastering & rendering specialist"}</Kicker>
            <h1 style={{ ...display, color: INK }} className="mt-6 max-w-2xl text-5xl font-semibold leading-[1.0] tracking-tight sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Flawless walls, perfectly smooth."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-[13px] font-medium uppercase tracking-[0.28em]" style={{ color: STEEL }}>{name}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[12px] font-medium tracking-[0.04em]" style={{ color: MUTE }}>
              {trust.map((t) => (
                <span key={t} className="inline-flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: STEEL }} />{t}
                </span>
              ))}
            </div>
          </div>
          {/* hero image framed as a smooth panel */}
          <div className="relative">
            <div className="overflow-hidden rounded-[28px] shadow-[0_30px_70px_-30px_rgba(42,44,46,0.5)]" style={{ border: `1px solid ${PUTTY}66` }}>
              {content.hero_video_url ? (
                <video src={content.hero_video_url} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="aspect-[4/5] w-full" style={{ background: sweep(PUTTY, CARD) }} />
              )}
            </div>
            <span className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-2xl" style={{ background: sweep(`${SAND}`, `${PLASTER}`), boxShadow: `inset 0 -6px 14px ${PUTTY}99` }} />
          </div>
        </div>
      </section>

      {/* what we do — quiet pill list of disciplines */}
      <section style={{ background: INK }}>
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-3">
            <span className="mr-2 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: SAND }}>What we do</span>
            {whatWeDo.map((w) => (
              <span key={w} className="rounded-full px-4 py-1.5 text-[13px] tracking-wide" style={{ background: "#ffffff10", color: "#E6E2DA", border: `1px solid ${STEEL}55` }}>{w}</span>
            ))}
          </div>
        </div>
      </section>

      {/* about — smooth two-up with a tactile panel */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[24px]" style={{ border: `1px solid ${PUTTY}66` }}>
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[5/4] w-full object-cover" />
              ) : (
                <div className="aspect-[5/4] w-full" style={{ background: sweep(PUTTY, CARD) }} />
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">The smoothest finish on the street</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: STEEL }}>More about us →</a>
          </div>
        </section>
      )}

      {/* services — clean divider rows on a lifted plaster card */}
      {services.length > 0 && (
        <section style={{ background: sweep(CARD, PLASTER), borderTop: `1px solid ${SAND}`, borderBottom: `1px solid ${SAND}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker>What we do</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Our services</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: `${PUTTY}80` }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-7">
                  <div className="max-w-2xl">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 pt-1 text-base font-semibold" style={{ color: STEEL }}>{s.price}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* smooth process — 3-step strip */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <Kicker>How it works</Kicker>
        <h2 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">A smooth process</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-[22px] p-8" style={{ background: CARD, border: `1px solid ${PUTTY}55` }}>
              <span className="text-3xl font-semibold" style={{ color: SAND, fontFamily: "var(--font-space)" }}>{s.n}</span>
              <h3 style={{ ...display, color: INK }} className="mt-3 text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* work — before/after rough → smooth */}
      {gallery.length > 0 && (
        <section style={{ background: INK }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: SAND }}>
              <span className="inline-block h-[2px] w-7 rounded-full" style={{ background: SAND }} />Recent work
            </span>
            <h2 style={{ ...display, color: PLASTER }} className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Rough to smooth</h2>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${STEEL}55` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
                </figure>
              ))}
            </div>
            <div className="mt-10"><a href={href("gallery")} className="inline-flex rounded-full border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-white/10" style={{ borderColor: `${PLASTER}3a`, color: PLASTER }}>See more work</a></div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: sweep(SAND, CARD) }}>
          <div className="mx-auto max-w-7xl px-8 py-16">
            <span className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: STEEL }}>Areas we cover</span>
            <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-lg" style={{ ...display, color: INK }}>
              {content.service_areas.map((a, i) => (
                <span key={a} className="inline-flex items-center gap-6">
                  <span className="font-semibold tracking-tight">{a}</span>
                  {i < content.service_areas!.length - 1 && <span style={{ color: `${INK}55` }}>·</span>}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA — calm, confident */}
      <section style={{ background: INK }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={{ ...display, color: PLASTER }} className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">Ready for walls worth touching?</h2>
            <p className="mt-2 text-sm tracking-[0.04em]" style={{ color: "#A9A498" }}>Free, no-obligation quotes — a clean, flawless finish guaranteed.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-110" style={{ background: SAND, color: INK }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
