import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LatchkeyHeader } from "./LatchkeyHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Latchkey — trustworthy 24/7 locksmith & home-security specialist. A calm,
// premium security register: deep midnight blue with brushed-brass and steel
// detailing, an alert-red accent reserved strictly for the 24/7 emergency call.
// Everything leads with TRUST and SPEED — locked out, lock changes, security
// upgrades. Structural signature: reassuring midnight hero with a 24/7 emergency
// banner, a brass keyhole/shield motif, a clean "what we do" services list (no
// cards, divider rows), a heavy trust strip, and an areas-covered band.
// MULTI-PAGE: nav opens real routes (Services / About / Work / Contact) under
// basePath; the sticky header + footer are shared. Tenant swaps in their own
// photography, copy, services and accreditations.

const MIDNIGHT = "#14213A"; // deep midnight-blue page
const MIDNIGHT2 = "#0F1A30"; // darker panel
const PANEL = "#1B294A"; // lifted surface
const BRASS = "#C9A24A"; // brushed brass / gold accent
const STEEL = "#5A6472"; // steel grey
const PAPER = "#F5F6F8"; // clean white
const ALERT = "#D14B45"; // alert red — 24/7 emergency only
const INK = "#101A2E"; // text on brass/paper
const MUTE = "#A9B2C2"; // muted body on dark
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.26em]" style={{ color: BRASS }}>
      <span className="inline-block h-2 w-2 rotate-45" style={{ background: BRASS }} />
      {children}
    </span>
  );
}

// A reassuring trust point — small brass check in a steel ring.
function TrustPoint({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full" style={{ border: `1.5px solid ${BRASS}` }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={BRASS} strokeWidth="3" aria-hidden><path d="M5 13l4 4L19 7" /></svg>
      </span>
      <span className="text-[13px] font-semibold uppercase tracking-[0.1em] leading-tight" style={{ color: PAPER }}>{children}</span>
    </div>
  );
}

export default function LatchkeyDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const phone = content.phone;
  const emergency = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Reassuring trust points — the spine of a locksmith's credibility.
  const trust = [
    "24/7 emergency call-out",
    "DBS-checked locksmiths",
    "No call-out fee",
    "30-min response",
    "Non-destructive entry",
    "Fully insured & vetted",
  ];

  const btnBrass = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-sm px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: BRASS, color: INK }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-sm border px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: `${BRASS}80`, color: PAPER }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: MIDNIGHT2, borderTop: `1px solid ${BRASS}55` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 1.5 3 4.5v6c0 5.4 3.6 9.9 9 12 5.4-2.1 9-6.6 9-12v-6L12 1.5Z" fill={MIDNIGHT} stroke={BRASS} strokeWidth="1.4" />
              <circle cx="12" cy="9.6" r="2.3" fill={BRASS} />
              <path d="M11 11.4h2l.7 4h-3.4l.7-4Z" fill={BRASS} />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.1em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${BRASS}40`, color: BRASS }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-sm text-white/80 transition hover:text-[#14213A] hover:bg-[#C9A24A]" style={{ border: `1px solid ${BRASS}33` }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" >Company</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
          {emergency && (
            <a href={`tel:${emergency}`} className="mt-4 inline-flex items-center gap-2 rounded-sm px-3 py-2 text-[11px] font-extrabold uppercase tracking-[0.12em] text-white" style={{ background: ALERT }}>
              24/7 emergency · {emergency}
            </a>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: STEEL }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open 24 hours · always on call.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {emergency && <a href={`tel:${emergency}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Locked out? Call {emergency}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: MIDNIGHT }} className="min-h-screen font-body">
      <LatchkeyHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} emergency={emergency} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: MIDNIGHT2, borderBottom: `1px solid ${BRASS}40` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl" >{title}</h1>
      </div>
    </section>
  );

  // Clean divider-row service list — name + desc left, price right. No cards.
  const serviceList = (
    <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
      {services.map((s, i) => (
        <li key={s.id} className="flex items-start justify-between gap-6 py-6">
          <div className="flex min-w-0 gap-5">
            <span className="select-none pt-0.5 text-[12px] font-extrabold tracking-[0.18em]" style={{ color: BRASS }}>{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 data-edit={`item:${s.id}:name`} className="text-lg font-extrabold uppercase tracking-tight" style={{ ...display, color: PAPER }}>{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap pt-0.5 text-sm font-extrabold" style={{ color: BRASS }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Our Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? serviceList : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnBrass(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Trusted, Vetted, On Call")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {trust.map((t) => <TrustPoint key={t}>{t}</TrustPoint>)}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" style={{ ...display, color: PAPER }}>Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-sm border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${BRASS}66`, color: BRASS }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" style={{ ...display, color: PAPER }}>Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnBrass(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Request A Quote")}
        {emergency && (
          <section style={{ background: ALERT }}>
            <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-8 py-5 text-white sm:flex-row sm:items-center">
              <p className="text-sm font-extrabold uppercase tracking-[0.14em]">Locked out right now? Don&apos;t wait — call our 24/7 line.</p>
              <a href={`tel:${emergency}`} className="rounded-sm bg-white px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ color: ALERT }}>Call {emergency}</a>
            </div>
          </section>
        )}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-extrabold uppercase tracking-tight" >Speak to a locksmith</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: STEEL }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {trust.slice(0, 4).map((t) => <TrustPoint key={t}>{t}</TrustPoint>)}
            </div>
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
                bookingBlurb="Tell us about the lock or the job and we'll come back fast with a price."
                bookingCta="Send request"
                theme={{ card: PANEL, cardBorder: `${BRASS}26`, heading: PAPER, blurb: MUTE, label: "#c2c6cd", fieldBg: MIDNIGHT2, fieldBorder: "#ffffff22", fieldText: PAPER, button: BRASS, buttonText: INK, radius: "2px", font: "var(--font-space)" }}
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
        {banner("Recent jobs", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-sm object-cover" />
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
      {/* hero — reassuring midnight security register */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 80% 10%, #1B294A 0%, #14213A 45%, #0F1A30 100%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(15,26,48,0.95) 0%, rgba(20,33,58,0.82) 45%, rgba(20,33,58,0.45) 100%)" }} />
        {/* faint keyhole watermark */}
        <svg className="pointer-events-none absolute -right-16 top-1/2 hidden -translate-y-1/2 lg:block" width="520" height="520" viewBox="0 0 24 24" fill="none" aria-hidden style={{ opacity: 0.08 }}>
          <path d="M12 1.5 3 4.5v6c0 5.4 3.6 9.9 9 12 5.4-2.1 9-6.6 9-12v-6L12 1.5Z" stroke={BRASS} strokeWidth="0.6" />
          <circle cx="12" cy="9.6" r="2.3" fill={BRASS} />
          <path d="M11 11.4h2l.7 4h-3.4l.7-4Z" fill={BRASS} />
        </svg>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker>{content.service_areas?.[0] ? `Trusted locksmiths across ${content.service_areas[0]}` : "Your trusted local locksmith"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Locked out? We'll have you back in."}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: MUTE }}>
            Fast, non-destructive entry, lock changes and home-security upgrades — day or night. DBS-checked, insured and on call across your area.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnBrass(ctaLabel, cta)}
            {emergency && btnOutline(`Call ${emergency}`, `tel:${emergency}`)}
          </div>
        </div>
      </section>

      {/* 24/7 emergency banner — the only place alert-red is used loud */}
      {emergency && (
        <section style={{ background: ALERT }}>
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-8 py-5 text-white sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              <p className="text-sm font-extrabold uppercase tracking-[0.14em]">24/7 emergency locksmith · no call-out fee · 30-min response</p>
            </div>
            <a href={`tel:${emergency}`} className="rounded-sm bg-white px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ color: ALERT }}>Call now {emergency}</a>
          </div>
        </section>
      )}

      {/* trust strip — the heart of a locksmith's credibility */}
      <section style={{ background: MIDNIGHT2, borderTop: `1px solid ${BRASS}33`, borderBottom: `1px solid ${BRASS}33` }}>
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {trust.map((t) => <TrustPoint key={t}>{t}</TrustPoint>)}
          </div>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl">Security you can trust</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: BRASS }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-sm object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-sm" style={{ background: PANEL }} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16 rounded-sm" style={{ borderBottom: `3px solid ${BRASS}`, borderLeft: `3px solid ${BRASS}` }} />
          </div>
        </section>
      )}

      {/* services — clean divider rows, no cards */}
      {services.length > 0 && (
        <section style={{ background: MIDNIGHT2, borderTop: `1px solid ${BRASS}22` }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>What we do</Kicker>
            <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Locksmith &amp; security services</h2>
            <div className="mt-10">
              <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
                {services.slice(0, 6).map((s, i) => (
                  <li key={s.id} className="flex items-start justify-between gap-6 py-6">
                    <div className="flex min-w-0 gap-5">
                      <span className="select-none pt-0.5 text-[12px] font-extrabold tracking-[0.18em]" style={{ color: BRASS }}>{String(i + 1).padStart(2, "0")}</span>
                      <div className="min-w-0">
                        <h3 data-edit={`item:${s.id}:name`} className="text-lg font-extrabold uppercase tracking-tight" style={{ ...display, color: PAPER }}>{s.name}</h3>
                        {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                      </div>
                    </div>
                    {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap pt-0.5 text-sm font-extrabold" style={{ color: BRASS }}>{s.price}</span>}
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-12">{btnOutline("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-20">
          <Kicker>Areas we cover</Kicker>
          <h2 style={{ ...display, color: PAPER }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Fast local response</h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {content.service_areas.map((a) => (
              <span key={a} className="rounded-sm border px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ borderColor: `${STEEL}80`, color: PAPER }}>{a}</span>
            ))}
          </div>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: MIDNIGHT2, borderTop: `1px solid ${BRASS}22` }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker>Recent jobs</Kicker>
            <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our work</h2>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-sm object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnOutline("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* accreditations row */}
      {content.accreditations && content.accreditations.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-16">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: STEEL }}>Approved &amp; insured</span>
            {content.accreditations.map((a) => (
              <span key={a} className="rounded-sm border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${BRASS}55`, color: BRASS }}>{a}</span>
            ))}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: BRASS }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: INK }}>
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-4xl">Need a locksmith? We&apos;re ready.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: "#3a3320" }}>Free quotes · no call-out fee · 24/7 cover.</p>
          </div>
          <a href={emergency ? `tel:${emergency}` : cta} className="rounded-sm px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: MIDNIGHT }}>
            {emergency ? `Call ${emergency}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
