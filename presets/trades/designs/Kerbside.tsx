import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { KerbsideHeader } from "./KerbsideHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Kerbside — driveways, paving & patio specialist. A light, premium "kerb
// appeal" register: warm off-white pages, charcoal asphalt bands, sandstone /
// buff block-paving accents and a fresh teal call-to-action. The structural
// signature is a herringbone paving-pattern motif (a repeating SVG used as a
// hero texture, a section divider and a small mark) plus a transformational
// before/after lean. MULTI-PAGE: Services / About / Work / Contact under
// basePath; sticky header + footer shared. Tenant swaps photography & copy.

const ASPHALT = "#2A2D31"; // charcoal asphalt — dark bands
const ASPHALT_2 = "#33373C"; // lifted asphalt panel
const SAND = "#C8A87C"; // warm sandstone / buff block paving
const SLATE = "#6E7B86"; // slate blue-grey — muted text
const OFFWHITE = "#F4F1EB"; // warm off-white page
const TEAL = "#2E8C8A"; // fresh teal accent
const INK = "#23262A"; // body ink on light
const display = { fontFamily: "var(--font-space)" } as const;

// Repeating herringbone paving texture, tinted via `color`. Used as a faint
// hero overlay and as a divider strip — the visual thread of the brand.
function herringbone(color: string, opacity = 1): CSSProperties {
  const c = encodeURIComponent(color);
  return {
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44'%3E%3Cg fill='none' stroke='${c}' stroke-width='1.5'%3E%3Cpath d='M0 11 L22 11 L22 22 L0 22 Z'/%3E%3Cpath d='M22 0 L33 0 L33 22 L22 22 Z'/%3E%3Cpath d='M0 22 L22 22 L22 33 L0 33 Z M22 22 L44 22 L44 33 L22 33 Z'/%3E%3Cpath d='M11 11 L11 0 M33 33 L44 33 M0 33 L11 33 L11 44'/%3E%3C/g%3E%3C/svg%3E")`,
    backgroundRepeat: "repeat",
    opacity,
  };
}

// Small kicker: a sandstone paving block followed by teal uppercase label.
function Kicker({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: on === "dark" ? SAND : TEAL }}>
      <span className="inline-flex gap-[2px]">
        <span className="inline-block h-3 w-1.5 rounded-[1px]" style={{ background: SAND }} />
        <span className="inline-block h-3 w-1.5 rounded-[1px]" style={{ background: TEAL }} />
      </span>
      {children}
    </span>
  );
}

export default function KerbsideDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    <a
      href={to}
      className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: TEAL }}
    >
      {label}
    </a>
  );
  const btnSand = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: SAND, color: ASPHALT }}
    >
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:bg-white ${full ? "block w-full" : "inline-flex"}`}
      style={{ borderColor: `${ASPHALT}33`, color: ASPHALT }}
    >
      {label}
    </a>
  );

  // Paving-pattern divider — a thin sandstone herringbone strip on asphalt.
  const pavingDivider = (
    <div aria-hidden className="h-6 w-full" style={{ background: ASPHALT }}>
      <div className="h-full w-full" style={herringbone(SAND, 0.35)} />
    </div>
  );

  const footer = (
    <footer style={{ background: ASPHALT }} className="text-white">
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${SAND} 0%, ${SAND} 50%, ${TEAL} 50%, ${TEAL} 100%)` }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="inline-flex gap-[2px]">
              <span className="inline-block h-5 w-2.5 rounded-[1px]" style={{ background: SAND }} />
              <span className="inline-block h-5 w-2.5 rounded-[1px]" style={{ background: TEAL }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold uppercase tracking-[0.1em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#c9ccd0" }}>{content.tagline}</p>}
          {content.service_areas && content.service_areas.length > 0 && (
            <p className="mt-5 text-[13px] leading-relaxed" style={{ color: SAND }}>
              Covering {content.service_areas.join(" · ")}
            </p>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-white" style={{ background: ASPHALT_2 }}>
                  <TradesSocialIcon kind={`${s.label} ${s.url}`} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]" >Explore</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: "#c9ccd0" }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: "#c9ccd0" }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: ASPHALT_2, color: SAND }}>{a}</span>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: "#c9ccd0" }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#8b9098" }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: "#c9ccd0" }}>Mon–Sat, site visits by arrangement.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-8 py-7 text-xs sm:flex-row" style={{ borderTop: "1px solid #ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white" style={{ color: SAND }}>Free quote: {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE, color: INK }} className="min-h-screen font-body">
      <KerbsideHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Dark asphalt page banner with a faint herringbone texture.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: ASPHALT }}>
      <div aria-hidden className="absolute inset-0" style={herringbone(SAND, 0.07)} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker on="dark">{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">{title}</h1>
      </div>
      <div className="h-1.5 w-full" style={{ background: `linear-gradient(90deg, ${SAND} 0%, ${SAND} 50%, ${TEAL} 50%, ${TEAL} 100%)` }} />
    </section>
  );

  // ---- SERVICES (clean divider rows, never cards / dotted leaders) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we lay", "Driveways & paving services")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: `${SLATE}33` }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[12px] font-bold tabular-nums" style={{ color: SAND }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: ASPHALT }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                    </div>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 pl-8 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Kerb appeal that lasts")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: ASPHALT }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]">Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: SAND, color: ASPHALT, background: "#ffffff" }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: ASPHALT }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Free site survey", "Request a quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: ASPHALT }} className="text-2xl font-bold uppercase tracking-tight">Tell us about your driveway</h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SLATE }}>Free, no-obligation quote with a site survey. We&apos;ll measure up, talk through finishes and give you a clear fixed price.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: INK }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 pt-6 text-sm" style={{ borderTop: `1px solid ${SLATE}33`, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: ASPHALT }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about the job — size, current surface and the finish you want — and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: `${SAND}66`, heading: ASPHALT, blurb: SLATE, label: ASPHALT, fieldBg: OFFWHITE, fieldBorder: `${SLATE}55`, fieldText: INK, button: TEAL, buttonText: "#ffffff", radius: "0.9rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (before/after work) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Transformations", "Our work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.id} className="group relative overflow-hidden rounded-lg">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
                  {g.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  // "What we lay" finishes — driven by real services where present, else a
  // sensible paving default set so the section always reads well.
  const finishes = (services.length > 0
    ? services.slice(0, 6).map((s) => s.name)
    : ["Block paving", "Resin bound", "Tarmac", "Patios", "Kerbs & edging", "Drainage"]
  );

  const trust = [
    "Fully insured",
    "Free site survey & quote",
    content.accreditations && content.accreditations.length > 0 ? content.accreditations[0] : "Workmanship guarantee",
    content.service_areas && content.service_areas.length > 0 ? `Covering ${content.service_areas[0]}` : "Local, family-run",
  ];

  const materials = [
    { name: "Block paving", note: "Clay & concrete blocks laid in classic herringbone or stretcher bond.", swatch: SAND },
    { name: "Resin bound", note: "Smooth, permeable, low-maintenance — a clean modern finish.", swatch: "#A9743F" },
    { name: "Tarmac", note: "Hard-wearing macadam for a crisp, cost-effective driveway.", swatch: ASPHALT },
    { name: "Natural stone patios", note: "Sandstone & porcelain slabs to extend your living space outdoors.", swatch: SLATE },
  ];

  return shell(
    <>
      {/* hero — transform your driveway */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: ASPHALT }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${ASPHALT_2}, ${ASPHALT})` }} />
        )}
        {/* herringbone paving texture + readability scrim */}
        <div aria-hidden className="pointer-events-none absolute inset-0" style={herringbone(SAND, 0.1)} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(42,45,49,0.94) 0%, rgba(42,45,49,0.78) 45%, rgba(42,45,49,0.35) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker on="dark">{content.service_areas?.[0] ? `Driveways across ${content.service_areas[0]}` : "Driveways & paving specialists"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-bold uppercase leading-[0.92] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Kerb appeal that lasts"}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80">
            Block paving, resin, tarmac & patios — laid to last by <span data-edit="tenant.business_name" className="font-semibold" style={{ color: SAND }}>{name}</span>. Transform your driveway with a free site survey and a clear, fixed quote.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnSand(ctaLabel, cta)}
            {phone && btnPrimary(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* trust strip — free site survey & quote */}
      <section style={{ background: OFFWHITE, borderBottom: `1px solid ${SAND}55` }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-1">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[12px] font-bold text-white" style={{ background: i % 2 ? SAND : TEAL }}>✓</span>
              <span className="text-[13px] font-semibold uppercase tracking-[0.08em]" style={{ color: ASPHALT }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: ASPHALT }}>
                <div className="h-full w-full rounded-2xl" style={herringbone(SAND, 0.25)} />
              </div>
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-2xl" style={{ border: `3px solid ${TEAL}` }} />
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: ASPHALT }} className="mt-4 text-4xl font-bold uppercase leading-[0.97] tracking-tight sm:text-5xl">Driveways laid to last</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>More about us →</a>
          </div>
        </section>
      )}

      {pavingDivider}

      {/* what we lay — finishes chips on asphalt */}
      <section style={{ background: ASPHALT }} className="text-white">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <Kicker on="dark">What we lay</Kicker>
          <h2 style={display} className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">Every surface, one team</h2>
          <div className="mt-10 flex flex-wrap gap-3">
            {finishes.map((f) => (
              <span key={f} className="rounded-full px-5 py-3 text-[13px] font-semibold uppercase tracking-[0.08em]" style={{ background: ASPHALT_2, color: "#e7e9eb", border: `1px solid ${SAND}33` }}>{f}</span>
            ))}
          </div>
        </div>
      </section>

      {/* materials & finishes showcase */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <Kicker>Materials & finishes</Kicker>
        <h2 style={{ ...display, color: ASPHALT }} className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">Choose your finish</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {materials.map((m) => (
            <div key={m.name} className="overflow-hidden rounded-2xl bg-white shadow-[0_1px_3px_rgba(42,45,49,0.08)]" style={{ border: `1px solid ${SAND}40` }}>
              <div className="h-24 w-full" style={{ background: m.swatch }}>
                <div className="h-full w-full" style={herringbone(m.swatch === ASPHALT ? SAND : "#ffffff", 0.3)} />
              </div>
              <div className="p-6">
                <h3 style={{ ...display, color: ASPHALT }} className="text-lg font-bold uppercase tracking-tight">{m.name}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{m.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* services preview — clean divider rows */}
      {services.length > 0 && (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${SAND}40`, borderBottom: `1px solid ${SAND}40` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker>Our services</Kicker>
            <h2 style={{ ...display, color: ASPHALT }} className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">What we do</h2>
            <ul className="mt-10 divide-y" style={{ borderColor: `${SLATE}33` }}>
              {services.slice(0, 6).map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[12px] font-bold tabular-nums" style={{ color: SAND }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: ASPHALT }} className="text-lg font-bold tracking-tight">{s.name}</h3>
                    </div>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 pl-8 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-10">{btnOutline("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* before/after work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>Transformations</Kicker>
          <h2 style={{ ...display, color: ASPHALT }} className="mt-4 text-3xl font-bold uppercase tracking-tight sm:text-4xl">Before & after</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnOutline("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: SAND }}>
          <div className="mx-auto max-w-7xl px-8 py-12" style={{ color: ASPHALT }}>
            <Kicker>Areas covered</Kicker>
            <div className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-[15px] font-semibold">
              {content.service_areas.map((a, i) => (
                <span key={a} className="inline-flex items-center gap-3">
                  {i > 0 && <span style={{ color: `${ASPHALT}66` }}>•</span>}
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA — free quote */}
      <section className="relative overflow-hidden" style={{ background: ASPHALT }}>
        <div aria-hidden className="absolute inset-0" style={herringbone(SAND, 0.08)} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold uppercase leading-[0.97] tracking-tight sm:text-4xl">Ready to transform your driveway?</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: SAND }}>Free site survey & no-obligation quote.</p>
          </div>
          <a href={cta} className="rounded-full px-9 py-4 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: TEAL }}>
            {ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
