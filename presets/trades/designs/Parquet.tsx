import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ParquetHeader } from "./ParquetHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Parquet — a flooring supply & fit specialist: engineered wood, LVT, laminate,
// carpet and parquet restoration. Cool, room-led and premium — an interiors
// register rather than a trade-grit one. Soft ivory / cool greige ground, deep
// espresso ink, a muted-teal accent and a warm-honey highlight. The signature
// is a HERRINGBONE / plank motif used as a hero accent and as the rule between
// sections. Clean horizontal hero, a flat "what we fit" divider list, a
// measure → supply → fit strip, a room before/after Work gallery and an
// areas-covered band. MULTI-PAGE: nav opens real routes (Services / About /
// Work / Contact) under basePath; header + footer are shared. Tenant swaps in
// their own photography, copy, services and accreditations.

const GREIGE = "#CFC7BA"; // cool greige
const ESPRESSO = "#34291F"; // deep espresso ink
const TEAL = "#41706B"; // muted teal accent
const HONEY = "#C99A56"; // warm honey highlight
const IVORY = "#F5F1EA"; // soft ivory ground
const MUTE = "#6B6258"; // muted greige-brown body text
const display = { fontFamily: "var(--font-space)" } as const;

// The herringbone signature — a band of interlocking planks. Used as a hero
// accent and as the divider between sections.
function Herringbone({ color = TEAL, className = "", opacity = 1 }: { color?: string; className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 96 24" preserveAspectRatio="none" className={className} aria-hidden style={{ opacity }}>
      <defs>
        <pattern id={`hb-${color.replace("#", "")}`} width="24" height="24" patternUnits="userSpaceOnUse" patternTransform="rotate(0)">
          <path d="M0 0l6 6-6 6V0zM12 0L0 12v6l12-12 12 12v-6L12 0z" fill={color} />
          <path d="M12 12l12 12h-6L0 6V0l12 12z" fill="none" />
        </pattern>
      </defs>
      <rect width="96" height="24" fill={`url(#hb-${color.replace("#", "")})`} />
    </svg>
  );
}

// A simpler, reliable herringbone rule: alternating angled bars.
function HerringboneRule({ color = TEAL, className = "" }: { color?: string; className?: string }) {
  const bars = Array.from({ length: 28 });
  return (
    <div className={`flex h-3 w-full items-stretch gap-[2px] overflow-hidden ${className}`} aria-hidden>
      {bars.map((_, i) => (
        <span
          key={i}
          className="block h-full flex-1"
          style={{ background: color, opacity: i % 2 === 0 ? 0.85 : 0.4, transform: i % 2 === 0 ? "skewX(28deg)" : "skewX(-28deg)" }}
        />
      ))}
    </div>
  );
}

function Kicker({ children, color = TEAL }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color }}>
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" aria-hidden>
        <path d="M1 9l4-7 1.4 2.8L2.4 12z" fill={color} />
        <path d="M7.5 9l4-7 1.4 2.8L9 12z" fill={color} opacity="0.5" />
      </svg>
      {children}
    </span>
  );
}

export default function ParquetDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Request a quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: TEAL }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:bg-[#34291F0a] ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: `${ESPRESSO}33`, color: ESPRESSO }}>
      {label}
    </a>
  );

  // Trust points — flooring-specialist register.
  const trust = [
    "Fully insured",
    "Free measure & quote",
    "Expert supply & fit",
    content.service_areas?.[0] ? `Covering ${content.service_areas[0]}` : "Local specialists",
  ];

  const footer = (
    <footer style={{ background: ESPRESSO }} className="text-[#E9E2D6]">
      <HerringboneRule color={HONEY} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 14l5-9 2 4-5 9z" fill={HONEY} />
              <path d="M11 14l5-9 2 4-5 9z" fill={HONEY} opacity="0.55" />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[0.02em] text-[#F5F1EA]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#E9E2D6]/70">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: "#ffffff1f", color: "#E9E2D6cc" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#E9E2D6]/80 transition hover:text-white hover:bg-[#41706B]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA]">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-[#E9E2D6]/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-[#E9E2D6]/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-[#F5F1EA]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#E9E2D6]/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#E9E2D6]/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#E9E2D6]/70">Mon–Sat, by appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#E9E2D666" }}>
        <p>© {new Date().getFullYear()} {name}. Supply &amp; fit flooring specialists.</p>
        {phone && <a href={`tel:${phone}`} className="font-semibold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: IVORY }} className="min-h-screen font-body" >
      <ParquetHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: GREIGE }}>
      <div className="mx-auto max-w-7xl px-8 pb-12 pt-32 sm:pt-40">
        <Kicker><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...display, color: ESPRESSO }} className="mt-4 text-4xl font-bold leading-[0.98] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
      <HerringboneRule color={TEAL} />
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we fit", "svc_kicker", "Our flooring services", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: `${ESPRESSO}1f` }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6" style={{ borderColor: `${ESPRESSO}1f` }}>
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: ESPRESSO }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</span>}
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
        {banner("Who we are", "about_kicker", "Floors fitted to last", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: ESPRESSO }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "about_accred_heading", "Accredited & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: `${TEAL}66`, color: ESPRESSO }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: ESPRESSO }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
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
        {banner("Get in touch", "contact_kicker", "Request a quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: ESPRESSO }} className="text-2xl font-bold tracking-tight" {...editCopy(content, "contact_heading", "Book a free measure")} />
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "contact_blurb", "Tell us about the room and we'll measure up, advise on the right floor and come back with a fixed price.")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#34291F]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#34291F]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${ESPRESSO}1f`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${MUTE}aa` }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about the room and floor type and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: `${ESPRESSO}1a`, heading: ESPRESSO, blurb: MUTE, label: ESPRESSO, fieldBg: IVORY, fieldBorder: `${ESPRESSO}22`, fieldText: ESPRESSO, button: TEAL, buttonText: "#ffffff", radius: "14px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — room before/after) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Rooms transformed", "work_kicker", "Our work", "work_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-xl bg-white" style={{ border: `1px solid ${ESPRESSO}14` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                  {g.caption && <figcaption className="px-4 py-3 text-sm" style={{ color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const fitTypes = services.length > 0 ? services.slice(0, 6) : null;
  const steps = [
    { n: "01", t: "Measure", d: "A free home visit — we measure up, check the subfloor and talk through options." },
    { n: "02", t: "Supply", d: "Choose from engineered wood, LVT, laminate and carpet, with samples to view at home." },
    { n: "03", t: "Fit", d: "Expert fitting and clean finishing — your room transformed, ready to walk on." },
  ];

  return shell(
    <>
      {/* hero — clean, horizontal, room-led */}
      <section className="relative isolate overflow-hidden" style={{ background: IVORY }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 pb-16 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24">
          <div>
            <Kicker>{content.service_areas?.[0] ? `Flooring across ${content.service_areas[0]}` : "Supply & fit flooring"}</Kicker>
            <h1 style={{ ...display, color: ESPRESSO }} className="mt-5 text-5xl font-bold leading-[0.95] tracking-tight sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Floors that transform a room."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em]" style={{ color: TEAL }}>{name}</p>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: MUTE }}>
              Engineered wood, LVT, laminate &amp; carpet — supplied and fitted by specialists. A free measure, honest advice and a finish that lasts.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.13em]" style={{ color: MUTE }}>
              {trust.map((t) => <span key={t} className="inline-flex items-center gap-1.5"><span style={{ color: TEAL }}>✓</span> {t}</span>)}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl" style={{ border: `1px solid ${ESPRESSO}14`, boxShadow: "0 30px 60px -30px rgba(52,41,31,0.35)" }}>
              {content.hero_video_url ? (
                <video src={content.hero_video_url} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[5/6]" />
              ) : (
                <div className="aspect-[4/5] w-full sm:aspect-[5/6]" style={{ background: `linear-gradient(135deg, ${GREIGE}, ${IVORY})` }} />
              )}
            </div>
            {/* herringbone accent corner — the signature */}
            <div className="pointer-events-none absolute -bottom-4 -left-4 hidden h-20 w-32 overflow-hidden rounded-lg sm:block" style={{ background: IVORY, border: `1px solid ${ESPRESSO}14` }}>
              <Herringbone color={TEAL} className="h-full w-full" opacity={0.8} />
            </div>
          </div>
        </div>
        <HerringboneRule color={TEAL} />
      </section>

      {/* what we fit — flat divider list */}
      {fitTypes && (
        <section style={{ background: IVORY }}>
          <div className="mx-auto max-w-4xl px-8 py-20 sm:py-24">
            <Kicker><span {...editCopy(content, "home_fit_kicker", "What we fit")} /></Kicker>
            <h2 style={{ ...display, color: ESPRESSO }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_fit_heading", "Flooring for every room")} />
            <ul className="mt-10 divide-y" style={{ borderColor: `${ESPRESSO}1f` }}>
              {fitTypes.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6" style={{ borderColor: `${ESPRESSO}1f` }}>
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: ESPRESSO }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-10">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* measure → supply → fit strip */}
      <section style={{ background: GREIGE }}>
        <HerringboneRule color={HONEY} />
        <div className="mx-auto max-w-7xl px-8 py-20 sm:py-24">
          <Kicker color={ESPRESSO}><span {...editCopy(content, "home_steps_kicker", "How it works")} /></Kicker>
          <h2 style={{ ...display, color: ESPRESSO }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" {...editCopy(content, "home_steps_heading", "Measure · Supply · Fit")} />
          <div className="mt-12 grid gap-px sm:grid-cols-3" style={{ background: `${ESPRESSO}1f` }}>
            {steps.map((s) => (
              <div key={s.n} className="p-8" style={{ background: GREIGE }}>
                <span style={{ ...display, color: TEAL }} className="text-5xl font-bold">{s.n}</span>
                <h3 style={{ ...display, color: ESPRESSO }} className="mt-4 text-xl font-bold tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
        <HerringboneRule color={HONEY} />
      </section>

      {/* about */}
      {content.about && (
        <section style={{ background: IVORY }}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" style={{ border: `1px solid ${ESPRESSO}14` }} />
              ) : (
                <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: GREIGE }} />
              )}
            </div>
            <div>
              <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
              <h2 style={{ ...display, color: ESPRESSO }} className="mt-4 text-4xl font-bold leading-[0.98] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "Specialists in floors that last")} />
              <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
              <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }} {...editCopy(content, "home_about_link", "More about us →")} />
            </div>
          </div>
        </section>
      )}

      {/* work — room before/after */}
      {gallery.length > 0 && (
        <section style={{ background: IVORY, borderTop: `1px solid ${ESPRESSO}12` }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_work_kicker", "Rooms transformed")} /></Kicker>
            <h2 style={{ ...display, color: ESPRESSO }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_work_heading", "Our work")} />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(0, 6).map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-xl bg-white" style={{ border: `1px solid ${ESPRESSO}14` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                  {g.caption && <figcaption className="px-4 py-3 text-sm" style={{ color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
            <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: ESPRESSO }} className="text-[#E9E2D6]">
          <div className="mx-auto max-w-7xl px-8 py-16">
            <Kicker color={HONEY}><span {...editCopy(content, "home_areas_kicker", "Areas covered")} /></Kicker>
            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-lg" style={{ fontFamily: "var(--font-space)" }}>
              {content.service_areas.map((a) => (
                <span key={a} className="font-bold tracking-tight text-[#F5F1EA]">{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: TEAL }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[0.98] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Ready to transform your floors?")} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.13em] text-white/75" {...editCopy(content, "cta_sub", "Free measure & no-obligation quote.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full bg-white px-9 py-4 text-[12px] font-bold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ color: TEAL }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
