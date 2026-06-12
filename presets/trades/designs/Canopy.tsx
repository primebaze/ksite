import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CanopyHeader } from "./CanopyHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Canopy — a professional tree surgeon / arborist. Atmospheric, safety-led and
// premium: a deep-woodland canvas, bark-brown and moss/lichen accents, a misty
// cream base. The recurring signature is the tree-ring motif (concentric growth
// rings) paired with fine branch silhouettes — felling, crown reduction,
// pruning, stump grinding, hedge work, storm response. Leads with trust:
// NPTC-qualified, fully insured, free quotes, all waste removed. MULTI-PAGE: nav
// opens real routes (Services / About / Work / Contact) under basePath; the
// sticky forest header + deep-green footer are shared. Deliberately an arborist —
// not lawns, not fencing.

const FOREST = "#1E3026"; // deep woodland green — page / headings on light
const BARK = "#5C4632"; // bark brown — secondary accent
const MOSS = "#8FA06B"; // moss / lichen — primary accent
const MIST = "#C7D6CF"; // misty sky — soft tint
const CREAM = "#F1EEE3"; // cream — page base
const PANEL = "#E7E2D2"; // tinted panel on cream
const LINE = "#d8d2bf"; // hairline on cream
const INK = "#46523f"; // muted body on cream
const display = { fontFamily: "var(--font-space)" } as const;

// The tree-ring signature — concentric growth rings. Rendered at a few sizes /
// opacities as a watermark behind section corners and inside the hero.
function TreeRings({ size = 240, color = MOSS, opacity = 0.5, style }: { size?: number; color?: string; opacity?: number; style?: CSSProperties }) {
  const radii = [48, 40, 31, 23, 15, 8];
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" aria-hidden style={{ opacity, ...style }}>
      {radii.map((r, i) => (
        <circle key={r} cx="50" cy="50" r={r} stroke={color} strokeWidth={i === 0 ? 1.1 : 0.8} />
      ))}
      <circle cx="50" cy="50" r="2.4" fill={color} />
    </svg>
  );
}

// Fine bare-branch silhouette used as a horizontal divider / texture.
function BranchLine({ color = MOSS, opacity = 0.55 }: { color?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 600 40" fill="none" stroke={color} strokeWidth="1.1" strokeLinecap="round" aria-hidden className="w-full" style={{ opacity }}>
      <path d="M0 30 H300" />
      <path d="M300 30 C360 30 380 22 420 12 M380 24 C410 24 430 18 470 8 M420 28 C460 28 500 24 560 18 M340 30 C360 30 372 34 396 38" />
      <circle cx="300" cy="30" r="2" fill={color} stroke="none" />
    </svg>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: light ? MOSS : FOREST }}>
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: MOSS }} />
      {children}
    </span>
  );
}

export default function CanopyDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Free quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Default trust signals — arborist-specific, surfaced when the tenant has not
  // supplied their own accreditations.
  const trust = content.accreditations && content.accreditations.length > 0
    ? content.accreditations
    : ["NPTC qualified", "Fully insured", "Free quotes", "All waste removed"];

  const btnSolid = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: MOSS, color: FOREST }}>{label}</a>
  );
  const btnOutline = (label: string, to: string, onDark = false, full = false) => (
    <a href={to} className={`rounded-full border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition ${full ? "block w-full" : "inline-flex"} ${onDark ? "hover:bg-white/10" : "hover:bg-black/[0.04]"}`} style={{ borderColor: onDark ? "#ffffff44" : `${FOREST}33`, color: onDark ? "#ffffff" : FOREST }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: FOREST }} className="relative overflow-hidden text-white">
      <TreeRings size={420} color={MOSS} opacity={0.08} style={{ position: "absolute", right: -120, top: -120 }} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10" stroke={MOSS} strokeWidth="1.4" />
              <circle cx="12" cy="12" r="6" stroke={MOSS} strokeWidth="1.1" opacity="0.8" />
              <circle cx="12" cy="12" r="1" fill={MOSS} />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold tracking-[0.02em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trust.map((a) => (
              <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/75" style={{ borderColor: "#ffffff26" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-[#1E3026] hover:bg-[#8FA06B]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]" >Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Get in touch</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/70">Mon–Sat. Storm call-outs 24/7.</p>}
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Tree care done safely.</p>
        {phone && <a href={`tel:${phone}`} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: FOREST }} className="min-h-screen font-body" >
      <CanopyHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: FOREST }}>
      <TreeRings size={360} color={MOSS} opacity={0.1} style={{ position: "absolute", right: -90, bottom: -120 }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 text-white sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-semibold leading-[1.0] tracking-tight sm:text-6xl" >{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Tree care services")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: FOREST }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-[15px] leading-relaxed" style={{ color: INK }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-[15px] font-semibold" style={{ color: BARK }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: INK }}>Services coming soon.</p>}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Care for every tree")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: INK }}>Our story is coming soon.</p>}
          <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" >Qualified &amp; insured</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {trust.map((a) => (
              <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: `${MOSS}`, color: FOREST }}>{a}</span>
            ))}
          </div>
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" >Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: INK }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Get in touch", "Request a quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-semibold tracking-tight" >Talk to an arborist</h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: INK }}>Tell us about the tree and the access, and we&apos;ll arrange a free site visit and quote.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: INK }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:var(--forest)]" style={{ color: FOREST }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition" style={{ color: FOREST }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: INK }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: BARK }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about the tree work and access, and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: FOREST, blurb: INK, label: FOREST, fieldBg: CREAM, fieldBorder: LINE, fieldText: FOREST, button: MOSS, buttonText: FOREST, radius: "14px", font: "var(--font-space)" }}
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
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: INK }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const whatWeDo = services.length > 0
    ? services.slice(0, 6).map((s) => ({ id: s.id, name: s.name, description: s.description }))
    : [
        { id: "_a", name: "Felling & dismantling", description: "Safe sectional take-downs in tight, built-up spaces." },
        { id: "_b", name: "Crown reduction", description: "Reshaping and reducing canopies to keep trees healthy." },
        { id: "_c", name: "Pruning & thinning", description: "Lifting, thinning and deadwood removal for light and shape." },
        { id: "_d", name: "Stump grinding", description: "Below-ground removal so you can reclaim the space." },
        { id: "_e", name: "Hedge work", description: "Trimming, reshaping and laying for a clean boundary." },
        { id: "_f", name: "Emergency storm work", description: "Rapid, insured response to wind-damaged and unstable trees." },
      ];

  return shell(
    <>
      {/* hero — atmospheric woodland */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: FOREST }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 80% 10%, #2c4636 0%, #1E3026 55%, #16241c 100%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(22,36,28,0.55) 0%, rgba(22,36,28,0.35) 40%, rgba(22,36,28,0.9) 100%)" }} />
        <TreeRings size={520} color={MIST} opacity={0.12} style={{ position: "absolute", right: -120, top: 40 }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Arborists across ${content.service_areas[0]}` : "Professional tree surgeons"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.0] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Expert care for your trees."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-[13px] font-semibold uppercase tracking-[0.28em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnSolid(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`, true)}
          </div>
          <div className="mt-12 flex flex-wrap gap-x-7 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
            {trust.map((a) => <span key={a} className="inline-flex items-center gap-2"><span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: MOSS }} />{a}</span>)}
          </div>
        </div>
      </section>

      {/* safety / trust strip */}
      <section style={{ background: BARK }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-5 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-white/90">
          <span>NPTC-qualified climbers</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
          <span>£5m public liability</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
          <span>All waste chipped &amp; removed</span>
          <span className="hidden h-1 w-1 rounded-full bg-white/40 sm:inline-block" />
          <span>Free no-obligation quotes</span>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="relative mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: FOREST }} className="mt-4 text-4xl font-semibold leading-[1.04] tracking-tight sm:text-5xl">Rooted in safe, careful work</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: INK }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: BARK }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: PANEL }} />
            )}
            <TreeRings size={130} color={MOSS} opacity={0.85} style={{ position: "absolute", bottom: -28, left: -28 }} />
          </div>
        </section>
      )}

      {/* what we do — clean divider rows */}
      <section style={{ background: MIST }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Kicker>What we do</Kicker>
              <h2 style={{ ...display, color: FOREST }} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Complete tree surgery</h2>
            </div>
            {services.length > 0 && <div className="shrink-0">{btnOutline("View all services", href("services"))}</div>}
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: "#aebfb6" }}>
            {whatWeDo.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-6 py-6">
                <span style={{ ...display, color: MOSS }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <h3 data-edit={s.id.startsWith("_") ? undefined : `item:${s.id}:name`} style={{ ...display, color: FOREST }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                  {s.description && <p data-edit={s.id.startsWith("_") ? undefined : `item:${s.id}:description`} className="mt-1.5 text-[15px] leading-relaxed" style={{ color: INK }}>{s.description}</p>}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* seasonal tree-care angle */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <Kicker>Through the seasons</Kicker>
        <h2 style={{ ...display, color: FOREST }} className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">The right work at the right time of year</h2>
        <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-4" style={{ borderColor: LINE, background: LINE }}>
          {[
            { s: "Winter", t: "Major felling & dismantling", d: "Dormant trees and bare canopies make heavy work cleaner and safer." },
            { s: "Spring", t: "Formative pruning", d: "Shape young and established trees before the leaves come in." },
            { s: "Summer", t: "Crown thinning", d: "Reduce sail and let light through while in full leaf." },
            { s: "Autumn", t: "Storm-proofing", d: "Deadwooding and reductions ahead of the windy months." },
          ].map((c) => (
            <div key={c.s} className="p-7" style={{ background: CREAM }}>
              <span className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: MOSS }}>{c.s}</span>
              <h3 style={{ ...display, color: FOREST }} className="mt-2 text-lg font-semibold tracking-tight">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: INK }}>{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12" aria-hidden><BranchLine color={MOSS} opacity={0.4} /></div>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: FOREST }} className="relative overflow-hidden text-white">
          <TreeRings size={380} color={MOSS} opacity={0.07} style={{ position: "absolute", left: -110, top: -110 }} />
          <div className="relative mx-auto max-w-7xl px-8 py-24">
            <Kicker light>Recent jobs</Kicker>
            <h2 style={display} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Our work</h2>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnOutline("See more work", href("gallery"), true)}</div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: PANEL }}>
          <div className="mx-auto max-w-7xl px-8 py-16">
            <Kicker>Areas we cover</Kicker>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full border bg-white px-4 py-2 text-sm font-medium" style={{ borderColor: LINE, color: FOREST }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: MOSS }}>
        <TreeRings size={300} color={FOREST} opacity={0.1} style={{ position: "absolute", right: -70, top: -90 }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: FOREST }}>
          <div>
            <h2 style={display} className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl">Got a tree that needs looking at?</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: `${FOREST}b3` }}>Free site visit · honest advice · fixed quotes.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: FOREST }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
