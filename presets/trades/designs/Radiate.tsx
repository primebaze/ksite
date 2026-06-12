import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RadiateHeader } from "./RadiateHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Radiate — a warm, reliable heating & boiler specialist (boilers, radiators,
// central heating, gas). Deep charcoal warmed by an ember-orange + copper heat
// register, with soft heat-amber glows on cream. The structural signature is a
// RADIATING-HEAT motif: concentric warmth arcs / radiator-fin lines that fan out
// from the hero corner and reappear as section accents — the feeling of a home
// being warmed properly. Sections: charcoal hero ("Warm homes, sorted properly"),
// a Gas-Safe + finance trust strip, a "what we do" divider-row services list, a
// new-boiler-from-£ / boiler-brands angle, a Work gallery and an areas-covered
// band. MULTI-PAGE: nav opens real routes (Services / About / Work / Contact)
// under basePath; the sticky header + charcoal footer are shared. Quote requests
// use SiteContactForms — no separate booking file.

const CHARCOAL = "#211C1A"; // deep charcoal — base / dark sections
const CHAR2 = "#1A1614"; // deeper charcoal — footer / overlays
const EMBER = "#E2622E"; // warm ember orange — primary accent / CTA
const COPPER = "#B5743E"; // copper — secondary warm accent
const AMBER = "#F2B45C"; // soft heat-amber — glow / highlights
const CREAM = "#F5EFE6"; // cream — light page
const SAND = "#EFE6D8"; // warmer cream panel
const INK = "#2B2421"; // body text on light
const MUTE = "#6E625A"; // muted body on light
const display = { fontFamily: "var(--font-space)" } as const;

// The signature radiating-heat motif: concentric warmth arcs fanning from a point.
function HeatGlyph({ color = EMBER, glow = AMBER, className = "" }: { color?: string; glow?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden>
      <circle cx="100" cy="100" r="10" fill={color} />
      {[28, 48, 70, 94, 120].map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} stroke={i % 2 === 0 ? color : glow} strokeWidth="2" opacity={0.55 - i * 0.08} />
      ))}
    </svg>
  );
}

// Radiator-fin lines — thin warm verticals used as a section accent band.
function FinLines({ color = COPPER, className = "" }: { color?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 240 16" preserveAspectRatio="none" fill="none" aria-hidden>
      {Array.from({ length: 24 }).map((_, i) => (
        <line key={i} x1={i * 10 + 4} y1="1" x2={i * 10 + 4} y2="15" stroke={color} strokeWidth="2" strokeLinecap="round" opacity="0.5" />
      ))}
    </svg>
  );
}

function Kicker({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  const c = on === "dark" ? AMBER : EMBER;
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: c }}>
      <span className="inline-flex h-2 w-2 rounded-full" style={{ background: c, boxShadow: `0 0 0 4px ${c}22` }} />
      {children}
    </span>
  );
}

export default function RadiateDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const accreds = content.accreditations ?? [];
  const trustBadges = accreds.length > 0 ? accreds : ["Gas Safe registered", "Fully insured", "Finance available"];

  const btnEmber = (label: string, to: string, full = false) => (
    <a href={to} className={`items-center justify-center rounded-full px-7 py-3.5 text-center text-[13px] font-extrabold tracking-[0.02em] text-white shadow-lg transition hover:brightness-110 ${full ? "flex w-full" : "inline-flex"}`} style={{ background: EMBER, boxShadow: `0 14px 30px -12px ${EMBER}99` }}>{label}</a>
  );
  const btnOutline = (label: string, to: string, full = false) => (
    <a href={to} className={`items-center justify-center rounded-full px-7 py-3.5 text-center text-[13px] font-extrabold tracking-[0.02em] transition hover:bg-[#211C1A] hover:text-white ${full ? "flex w-full" : "inline-flex"}`} style={{ border: `1.5px solid ${CHARCOAL}`, color: CHARCOAL }}>{label}</a>
  );
  const btnGlass = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center text-[13px] font-extrabold tracking-[0.02em] text-white transition hover:bg-white/10" style={{ border: "1.5px solid rgba(245,239,230,0.4)" }}>{label}</a>
  );

  // ---- shared chrome ----
  const footer = (
    <footer style={{ background: CHAR2 }} className="relative overflow-hidden text-white">
      <HeatGlyph className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 opacity-20" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center" aria-hidden>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
                <circle cx="16" cy="16" r="3.4" fill={EMBER} />
                <path d="M16 9.5a6.5 6.5 0 0 1 6.5 6.5" stroke={EMBER} strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
                <path d="M16 5.5a10.5 10.5 0 0 1 10.5 10.5" stroke={AMBER} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
                <path d="M16 22.5A6.5 6.5 0 0 1 9.5 16" stroke={EMBER} strokeWidth="1.7" strokeLinecap="round" opacity="0.85" />
                <path d="M16 26.5A10.5 10.5 0 0 1 5.5 16" stroke={AMBER} strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
              </svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.05em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((a) => (
              <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/85" style={{ background: "rgba(242,180,92,0.10)", border: "1px solid rgba(242,180,92,0.28)" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-2.5">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#E2622E] hover:text-white" style={{ background: "rgba(255,255,255,0.06)" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em]">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">24/7 breakdown cover.</p>}
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row sm:px-8" style={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: INK }} className="min-h-screen font-body">
      <RadiateHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner — charcoal block with a radiating-heat glow in the corner.
  const banner = (kicker: string, title: string) => (
    <section className="relative isolate overflow-hidden" style={{ background: CHARCOAL }}>
      <HeatGlyph className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 opacity-25" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-72 w-72 rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${EMBER}44, transparent 70%)` }} />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:px-8 sm:pt-44">
        <Kicker on="dark">{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold uppercase leading-[0.98] tracking-tight text-white sm:text-6xl">{title}</h1>
      </div>
      <FinLines color={AMBER} className="absolute inset-x-0 bottom-0 h-4 w-full opacity-60" />
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Heating, sorted properly")}
        <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "rgba(33,28,26,0.10)" }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-6 py-6">
                  <div className="flex gap-5">
                    <span style={{ ...display, color: COPPER }} className="mt-0.5 text-sm font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-extrabold uppercase tracking-tight">{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-extrabold" style={{ color: EMBER }}>{s.price}</p>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12 flex flex-wrap gap-3">{btnEmber(ctaLabel, cta)}{phone && btnOutline(`Call ${phone}`, `tel:${phone}`)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Keeping homes warm")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {trustBadges.length > 0 && (
            <>
              <h3 style={{ ...display, color: CHARCOAL }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Gas Safe &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {trustBadges.map((a) => (
                  <span key={a} className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: SAND, color: CHARCOAL }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: CHARCOAL }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnEmber(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Request a quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: CHARCOAL }} className="text-2xl font-extrabold uppercase tracking-tight">Speak to the team</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#E2622E]" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#E2622E]">{content.email}</a>}
            </div>
            {phone && (
              <div className="mt-7 flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: CHARCOAL }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: EMBER }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: AMBER }}>24/7 breakdown line</p>
                  <a href={`tel:${phone}`} style={display} className="text-lg font-extrabold text-white">{phone}</a>
                </div>
              </div>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "rgba(33,28,26,0.12)", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: INK }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{btnOutline("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about your boiler or heating and we'll come back with a fixed price — free, no obligation."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: "rgba(33,28,26,0.10)", heading: CHARCOAL, blurb: MUTE, label: INK, fieldBg: CREAM, fieldBorder: "rgba(33,28,26,0.16)", fieldText: INK, button: EMBER, buttonText: "#ffffff", radius: "0.9rem", font: "var(--font-space)" }}
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
        {banner("Recent jobs", "Our work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-4 py-14 sm:px-8">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-6 py-20 sm:px-8" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const promises = [
    { t: "Gas Safe registered", d: "Every gas job carried out by a registered, insured engineer — done by the book." },
    { t: "Fixed-price quotes", d: "Clear written prices up front. No call-out surprises, and your home left clean." },
    { t: "Finance available", d: "Spread the cost of a new boiler with flexible, interest-free options." },
  ];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: CHARCOAL }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 110% at 88% 12%, ${EMBER}3d, transparent 52%), linear-gradient(155deg, ${CHARCOAL} 0%, ${CHAR2} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${CHAR2}f5 0%, ${CHAR2}d4 44%, ${CHAR2}4d 100%)` }} />
        {/* radiating-heat signature — concentric warmth fanning from the corner */}
        <HeatGlyph className="pointer-events-none absolute -right-24 top-8 h-[34rem] w-[34rem] opacity-40" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 text-white sm:px-8">
          <Kicker on="dark">{content.service_areas?.[0] ? `Heating engineers in ${content.service_areas[0]}` : "Heating & boiler specialists"}</Kicker>
          <h1 style={display} className="mt-5 max-w-3xl text-4xl font-extrabold uppercase leading-[0.95] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Warm homes, sorted properly."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/65">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnEmber(ctaLabel, cta)}
            {phone && btnGlass(`Call ${phone}`, `tel:${phone}`)}
          </div>
          {/* trust badges */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map((a) => (
              <span key={a} className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.12em] text-white/75">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2.5" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* trust strip — Gas Safe + finance + free quotes */}
      <section style={{ background: EMBER }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-white sm:flex-row sm:px-8">
          <p className="flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-[0.1em]">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
            </span>
            No heating or hot water? 24/7 breakdown cover
          </p>
          <a href={phone ? `tel:${phone}` : cta} style={{ ...display, color: EMBER }} className="rounded-full bg-white px-6 py-2 text-sm font-extrabold tracking-[0.02em] transition hover:bg-white/90">{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>

      {/* intro / about split */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-3xl" style={{ background: `linear-gradient(150deg, ${SAND}, ${AMBER}55)` }} />
            )}
            <span className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: EMBER }}>
              <HeatGlyph color="#ffffff" glow="#ffffff" className="h-12 w-12 opacity-90" />
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-3xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-4xl">Heating done by the book</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.14em]" style={{ color: EMBER }}>More about us →</a>
          </div>
        </section>
      )}

      {/* why us — warmth promises */}
      <section style={{ background: SAND }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Kicker>Why choose us</Kicker>
          <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Warmth you can rely on</h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {promises.map((g) => (
              <div key={g.t} className="rounded-3xl bg-white p-7 shadow-sm" style={{ border: "1px solid rgba(33,28,26,0.06)" }}>
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: CHARCOAL }}>
                  <HeatGlyph className="h-8 w-8" />
                </span>
                <h3 style={{ ...display, color: CHARCOAL }} className="mt-5 text-lg font-extrabold uppercase tracking-tight">{g.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services — clean divider rows */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
          <Kicker>What we do</Kicker>
          <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Our services</h2>
          <ul className="mt-10 divide-y" style={{ borderColor: "rgba(33,28,26,0.10)" }}>
            {services.slice(0, 8).map((s, i) => (
              <li key={s.id} className="group flex items-start justify-between gap-6 py-6">
                <div className="flex gap-5">
                  <span style={{ ...display, color: COPPER }} className="mt-0.5 text-sm font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-extrabold uppercase tracking-tight transition group-hover:text-[#E2622E]">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                </div>
                {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-extrabold" style={{ color: EMBER }}>{s.price}</p>}
              </li>
            ))}
          </ul>
          <div className="mt-10">{btnOutline("View all services", href("services"))}</div>
        </section>
      )}

      {/* new-boiler-from angle — copper band with radiator-fin accent */}
      <section className="relative overflow-hidden" style={{ background: CHARCOAL }}>
        <FinLines color={COPPER} className="absolute inset-x-0 top-0 h-4 w-full opacity-50" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-20 sm:px-8 lg:flex-row lg:items-center">
          <div className="max-w-xl">
            <Kicker on="dark">New boiler?</Kicker>
            <h2 style={display} className="mt-4 text-3xl font-extrabold uppercase leading-[1.02] tracking-tight text-white sm:text-4xl">A warmer, cheaper-to-run home</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-white/70">A-rated boilers from all the leading brands, supplied and fitted by Gas Safe engineers — with smart controls and a long manufacturer warranty. Spread the cost with interest-free finance.</p>
            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-bold uppercase tracking-[0.14em] text-white/60">
              <span>Worcester Bosch</span><span>Vaillant</span><span>Ideal</span><span>Baxi</span><span>Viessmann</span>
            </div>
          </div>
          <div className="w-full shrink-0 rounded-3xl p-7 text-center sm:w-auto" style={{ background: `linear-gradient(150deg, ${EMBER}, ${COPPER})` }}>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/80">New boilers from</p>
            <p style={display} className="mt-1 text-5xl font-extrabold text-white">£1,895</p>
            <p className="mt-1 text-[12px] font-semibold text-white/80">supplied &amp; fitted · 10-yr warranty</p>
            <div className="mt-5">{btnGlass(ctaLabel, cta)}</div>
          </div>
        </div>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
          <Kicker>Recent jobs</Kicker>
          <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Our work</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnOutline("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: SAND }}>
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
            <Kicker>Where we work</Kicker>
            <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Areas we cover</h2>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.service_areas.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold" style={{ background: "#ffffff", color: CHARCOAL, border: "1px solid rgba(33,28,26,0.08)" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={EMBER} strokeWidth="2" aria-hidden><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: CHAR2 }}>
        <HeatGlyph className="pointer-events-none absolute -left-24 -bottom-24 h-80 w-80 opacity-25" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 text-white sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[1.02] tracking-tight sm:text-4xl">Ready for a warmer home?</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/55">Free, no-obligation quotes.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {btnEmber(ctaLabel, cta)}
            {phone && btnGlass(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
