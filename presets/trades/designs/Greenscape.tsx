import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { GreenscapeHeader } from "./GreenscapeHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Greenscape — fresh, friendly garden-maintenance & lawn-care service. A warm
// cream canvas with deep garden-green, fresh grass and soil-brown accents, a
// recurring lawn-stripe motif and a rounded, outdoorsy rhythm. Built for
// gardeners, lawn-care rounds, hedge & grounds-maintenance teams who sell
// reliability and a free quote. MULTI-PAGE: nav opens real routes (Services /
// About / Work / Contact) under basePath; the sticky green header + deep-green
// footer are shared. Deliberately a maintenance SERVICE — not a florist.

const GARDEN = "#234B30"; // deep garden green — headings / footer
const GRASS = "#6FAE54"; // fresh grass — primary accent
const SKY = "#BFD9E0"; // sky — soft tint
const CREAM = "#F4F1E6"; // warm cream — page
const SOIL = "#7A5A3A"; // soil brown — secondary accent
const PANEL = "#ECE7D6"; // tinted panel
const LINE = "#ddd6c1"; // hairline
const INK = "#3a4138"; // muted body on cream
const display = { fontFamily: "var(--font-space)" } as const;

// repeating lawn-stripe band — the structural signature of the design
const lawnStripes = (a = GRASS, b = GARDEN) =>
  `repeating-linear-gradient(90deg, ${a} 0 18px, ${b} 18px 36px)`;

function LeafMark({ color = GRASS, size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M21 3c-7 0-12 4-12 11 0 0 0 .5.1 1.2C12 12 16 10 16 10s-3.5 3-5.5 6.8C10 18 11 19 13 19c7 0 8-9 8-16Z" />
      <path d="M3 21c1.5-3.5 4-6 7-7.5" />
    </svg>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: light ? GRASS : GARDEN }}>
      <LeafMark color={light ? GRASS : SOIL} size={15} />
      {children}
    </span>
  );
}

export default function GreenscapeDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-105 ${full ? "block w-full" : "inline-block"}`} style={{ background: GRASS, color: GARDEN }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-7 py-3.5 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-[#234B30] hover:text-white ${full ? "block w-full" : "inline-block"}`} style={{ borderColor: GARDEN, color: GARDEN }}>
      {label}
    </a>
  );

  // trust pills — insured / free quotes / regular or one-off
  const trust = [
    "Fully insured",
    "Free quotes",
    "Regular or one-off",
    content.service_areas?.[0] ? `${content.service_areas[0]} & nearby` : "Local & reliable",
  ];

  const footer = (
    <footer style={{ background: GARDEN }} className="text-white">
      <div className="h-2 w-full" style={{ background: lawnStripes(GRASS, "#1b3a25") }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: GRASS }}><LeafMark color={GARDEN} size={18} /></span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-[0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/80" style={{ background: "#ffffff14" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition hover:text-[#234B30]" style={{ background: "#ffffff1a" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: GRASS }} className="text-xs font-extrabold uppercase tracking-[0.2em]">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: GRASS }} className="text-xs font-extrabold uppercase tracking-[0.2em]">Get in touch</h4>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: GRASS }} className="text-xs font-extrabold uppercase tracking-[0.2em]">Visiting hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/70">Mon–Sat, dawn till dusk.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#ffffff80" }}>
        <p>© {new Date().getFullYear()} {name}. Keeping gardens beautifully kept.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <GreenscapeHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: GARDEN }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 -top-10 h-48 w-48 opacity-15" style={{ color: GRASS }}><LeafMark color={GRASS} size={192} /></div>
      <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold leading-[1.0] tracking-tight text-white sm:text-6xl">{title}</h1>
      </div>
      <div className="h-2 w-full" style={{ background: lawnStripes() }} />
    </section>
  );

  // shared clean divider-row services list (name+desc left / price right)
  const servicesList = (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {services.map((s) => (
        <li key={s.id} className="flex items-start justify-between gap-6 py-6">
          <div className="flex items-start gap-4">
            <span className="mt-1 shrink-0"><LeafMark color={GRASS} size={18} /></span>
            <div>
              <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: GARDEN }} className="text-lg font-extrabold tracking-tight">{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: INK }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-base font-extrabold" style={{ ...display, color: SOIL }}>{s.price}</p>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Garden services")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          <p className="max-w-2xl text-[17px] leading-relaxed" style={{ color: INK }}>
            From a weekly lawn cut to a full seasonal tidy-up — regular rounds or one-off jobs, all done with care and cleared away after.
          </p>
          {services.length > 0 ? <div className="mt-10">{servicesList}</div> : <p className="mt-10" style={{ color: INK }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Rooted in good work")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: INK }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: GARDEN }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Insured &amp; accredited</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: GRASS, color: GARDEN }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: GARDEN }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: INK }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Get a price", "Request a quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: GARDEN }} className="text-2xl font-extrabold tracking-tight">Tell us about your garden</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: INK }}>Regular visits or a one-off — send the details and we&apos;ll come back with a free, no-obligation price.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: INK }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#234B30]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#234B30]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: INK }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="opacity-60">{h.open}</span></li>
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
                bookingBlurb="Tell us about the garden and we'll come back with a free price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: GARDEN, blurb: INK, label: GARDEN, fieldBg: CREAM, fieldBorder: LINE, fieldText: GARDEN, button: GRASS, buttonText: GARDEN, radius: "14px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — before/after angle) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Before & after", "Gardens we keep")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: PANEL }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
                  {g.caption && <figcaption className="px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ color: GARDEN }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: INK }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const plans = [
    { name: "Regular visits", blurb: "Weekly, fortnightly or monthly — your lawn and beds kept tidy all season, no chasing required." },
    { name: "One-off jobs", blurb: "Overgrown garden, a hedge that's got away, or a tidy before you sell — booked in and sorted in one visit." },
    { name: "Seasonal care", blurb: "Spring feeds, autumn clearance and winter prep so the garden looks its best year-round." },
  ];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${GARDEN} 0%, #1b3a25 60%, ${SOIL} 140%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,40,26,0.92) 0%, rgba(20,40,26,0.7) 45%, rgba(20,40,26,0.2) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Caring for gardens across ${content.service_areas[0]}` : "Your local garden team"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.98] tracking-tight [text-shadow:0_2px_20px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Lawns, hedges & gardens, beautifully kept."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/75">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/70">
            {trust.map((t) => <span key={t} className="flex items-center gap-1.5"><span style={{ color: GRASS }}>✓</span>{t}</span>)}
          </div>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-2.5" style={{ background: lawnStripes() }} />
      </section>

      {/* areas-covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: SKY }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-8 py-5 text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: GARDEN }}>
            <span className="flex items-center gap-2"><LeafMark color={SOIL} size={16} />Covering:</span>
            {content.service_areas.map((a) => <span key={a} className="rounded-full bg-white/60 px-3 py-1">{a}</span>)}
          </div>
        </section>
      )}

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-3xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-3xl" style={{ background: PANEL }} />
            )}
            <span className="absolute -bottom-3 -left-3 grid h-16 w-16 place-items-center rounded-2xl shadow-lg" style={{ background: GRASS }}><LeafMark color={GARDEN} size={28} /></span>
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: GARDEN }} className="mt-4 text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">A friendly, reliable garden team</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: INK }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: SOIL }}>More about us →</a>
          </div>
        </section>
      )}

      {/* services — clean divider list */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker>What we do</Kicker>
            <h2 style={{ ...display, color: GARDEN }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Garden services</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed" style={{ color: INK }}>Mowing, hedges, planting, clearance and seasonal tidy-ups — booked as a regular round or a one-off.</p>
            <div className="mt-10">{servicesList}</div>
            <div className="mt-10">{btnGhost("See all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* regular or one-off plan strip */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="text-center">
          <Kicker>Regular or one-off</Kicker>
          <h2 style={{ ...display, color: GARDEN }} className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-5xl">However your garden needs us</h2>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {plans.map((p, i) => (
            <div key={p.name} className="flex flex-col rounded-3xl p-8" style={{ background: i === 0 ? GARDEN : "#ffffff", border: `1px solid ${LINE}`, color: i === 0 ? "#ffffff" : INK }}>
              <span className="grid h-11 w-11 place-items-center rounded-full" style={{ background: i === 0 ? GRASS : PANEL }}><LeafMark color={GARDEN} size={20} /></span>
              <h3 style={{ ...display, color: i === 0 ? "#ffffff" : GARDEN }} className="mt-5 text-xl font-extrabold tracking-tight">{p.name}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: i === 0 ? "rgba(255,255,255,0.78)" : INK }}>{p.blurb}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">{btnPrimary(ctaLabel, cta)}</div>
      </section>

      {/* work strip — before & after */}
      {gallery.length > 0 && (
        <section style={{ background: SKY }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker>Before &amp; after</Kicker>
            <h2 style={{ ...display, color: GARDEN }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Gardens we keep</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnGhost("See more of our work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: GARDEN }} className="relative overflow-hidden">
        <div className="h-2 w-full" style={{ background: lawnStripes() }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold leading-[1.02] tracking-tight sm:text-4xl">Ready for a tidier garden?</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/70">Free quotes · insured · regular or one-off.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ background: GRASS, color: GARDEN }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
