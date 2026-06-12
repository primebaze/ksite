import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RiserHeader } from "./RiserHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Riser — commercial & domestic scaffolding contractor. Safety-led and premium:
// deep charcoal + steel grey base, a hi-vis safety-yellow lead colour, and a
// scaffold-blue support accent. The signature is a SCAFFOLD-TUBE LATTICE: a grid
// of tubes & couplers behind the hero, framed top & bottom by hazard stripes.
// Built for height, access and structure — leads hard with CISRS/TG20, full
// insurance, design & drawings and a free site visit. MULTI-PAGE: nav opens real
// routes (Services / About / Work / Contact) under basePath; the sticky header +
// charcoal footer are shared. Distinct from Forge's skewed amber-industrial look.

const CHARCOAL = "#1B1E22"; // deep charcoal page
const STEEL = "#4B5560"; // steel grey
const PANEL = "#23272C"; // lifted panel
const CARD = "#2A2F35"; // card surface
const HIVIS = "#F6C400"; // hi-vis safety yellow (lead)
const BLUE = "#2D6E9E"; // scaffold-blue accent
const OFFWHITE = "#F3F4F2"; // off-white text
const MUTE = "#9CA3AD"; // muted steel body
const display = { fontFamily: "var(--font-space)" } as const;

// Hazard-stripe band — the scaffolding edge-protection signature.
const HAZARD = "repeating-linear-gradient(45deg,#1B1E22 0 12px,#F6C400 12px 24px)";

function Kicker({ children, color = HIVIS }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.24em]" style={{ color }}>
      <span className="inline-flex h-3 w-3 items-center justify-center border" style={{ borderColor: color }}>
        <span className="h-1 w-1 rounded-full" style={{ background: color }} />
      </span>
      {children}
    </span>
  );
}

export default function RiserDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    <a href={to} className={`px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#1B1E22] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: HIVIS }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: "#ffffff33", color: OFFWHITE }}>
      {label}
    </a>
  );

  // Trust pillars — scaffolding is safety-critical, so these lead everywhere.
  const trust = [
    { t: "CISRS-qualified", d: "Carded scaffolders on every job, supervised to standard." },
    { t: "TG20 compliant", d: "Designed & erected to TG20 — or bespoke TG20:21 drawings." },
    { t: "Fully insured", d: "£10m public liability and full employer cover as standard." },
    { t: "Free site visit", d: "We survey, advise and quote at no cost or obligation." },
  ];

  const certs = (content.accreditations && content.accreditations.length > 0)
    ? content.accreditations
    : ["CISRS", "TG20:21", "NASC member", "Fully insured"];

  const footer = (
    <footer style={{ background: "#15181B" }} className="text-white">
      <div className="h-1.5 w-full" style={{ background: HAZARD }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="relative inline-flex h-6 w-6 items-center justify-center" aria-hidden>
              <span className="absolute inset-0 border-2" style={{ borderColor: HIVIS }} />
              <span className="h-2 w-2 rounded-full" style={{ background: HIVIS }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.08em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {certs.map((a) => (
              <span key={a} className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff1f", color: MUTE }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:bg-[#F6C400] hover:text-[#1B1E22]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Company</h4>
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
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Fri 7am–5pm. Out-of-hours by arrangement.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CHARCOAL }} className="min-h-screen font-body">
      <RiserHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL }}>
      <div className="h-1 w-full" style={{ background: HAZARD }} />
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl" >{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we offer", "Our Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-7" style={{ borderColor: "#ffffff14" }}>
                  <div className="flex min-w-0 gap-5">
                    <span style={{ ...display, color: HIVIS }} className="text-sm font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} style={display} className="text-xl font-extrabold uppercase tracking-tight" >{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: OFFWHITE }}>{s.price}</p>}
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
        {banner("Who we are", "Safe Access, Built Right")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}

          <div className="mt-12 grid gap-px sm:grid-cols-2" style={{ background: "#ffffff14" }}>
            {trust.map((p) => (
              <div key={p.t} className="p-6" style={{ background: CARD }}>
                <h3 style={{ ...display, color: OFFWHITE }} className="text-sm font-extrabold uppercase tracking-[0.12em]">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{p.d}</p>
              </div>
            ))}
          </div>

          <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Accredited &amp; insured</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {certs.map((a) => (
              <span key={a} className="border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${HIVIS}66`, color: OFFWHITE }}>{a}</span>
            ))}
          </div>
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Areas we cover</h3>
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
        {banner("Get in touch", "Request A Quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-extrabold uppercase tracking-tight">Speak to the team</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed" style={{ color: MUTE }}>Tell us about the job — commercial or domestic — and we&apos;ll arrange a free site visit and a written quote.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
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
                bookingBlurb="Tell us about the job and we'll arrange a free site visit and a written quote."
                bookingCta="Send request"
                theme={{ card: CARD, cardBorder: "#ffffff1a", heading: OFFWHITE, blurb: MUTE, label: "#c2c6cd", fieldBg: PANEL, fieldBorder: "#ffffff22", fieldText: OFFWHITE, button: HIVIS, buttonText: "#1B1E22", radius: "0", font: "var(--font-space)" }}
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
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const offers = services.length > 0
    ? services.slice(0, 6).map((s) => ({ name: s.name, edit: `item:${s.id}:name` as string }))
    : [
        { name: "Commercial scaffolding", edit: "" },
        { name: "Domestic scaffolding", edit: "" },
        { name: "Temporary roofs", edit: "" },
        { name: "Edge protection", edit: "" },
        { name: "Scaffold towers", edit: "" },
        { name: "Long-term hire", edit: "" },
      ];

  const stats = [
    { k: "20+", v: "Years on site" },
    { k: "1,400+", v: "Jobs completed" },
    services.length > 0 && { k: `${services.length}`, v: "Access solutions" },
  ].filter(Boolean) as { k: string; v: string }[];

  // Scaffold-tube lattice motif: a grid of tubes + couplers as the hero overlay.
  const latticeStyle: CSSProperties = {
    backgroundImage: [
      "linear-gradient(rgba(243,244,242,0.10) 1.5px, transparent 1.5px)",
      "linear-gradient(90deg, rgba(243,244,242,0.10) 1.5px, transparent 1.5px)",
      "radial-gradient(rgba(246,196,0,0.55) 2px, transparent 2.5px)",
    ].join(","),
    backgroundSize: "96px 96px, 96px 96px, 96px 96px",
    backgroundPosition: "0 0, 0 0, -2px -2px",
  };

  return shell(
    <>
      {/* hero — structural charcoal with scaffold-tube lattice */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${PANEL},${CHARCOAL} 60%,#101316)` }} />
        )}
        {/* darkening + tube lattice */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(20,22,25,0.94) 0%, rgba(20,22,25,0.78) 48%, rgba(20,22,25,0.4) 100%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-70" style={latticeStyle} />
        {/* hazard edges top & bottom */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1.5" style={{ background: HAZARD }} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5" style={{ background: HAZARD }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker>{content.service_areas?.[0] ? `Scaffolding across ${content.service_areas[0]}` : "Commercial & domestic scaffolding"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            Safe access,<br />built right.
          </h1>
          <p data-edit="content.tagline" className="mt-6 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">{content.tagline ?? "Designed, erected and inspected to standard — for builders, developers and homeowners who can't compromise on safety."}</p>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/55">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
            {certs.slice(0, 4).map((a) => <span key={a}>✓ {a}</span>)}
          </div>
        </div>
      </section>

      {/* safety-certification trust strip */}
      <section style={{ background: HIVIS }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-5 text-[12px] font-extrabold uppercase tracking-[0.18em] text-[#1B1E22]">
          <span>CISRS qualified</span>
          <span className="opacity-40">/</span>
          <span>TG20 compliant</span>
          <span className="opacity-40">/</span>
          <span>NASC standards</span>
          <span className="opacity-40">/</span>
          <span>Fully insured</span>
        </div>
      </section>

      {/* trust pillars — lead hard with safety */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <Kicker>Why specify us</Kicker>
        <h2 style={{ ...display, color: OFFWHITE }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">Safety is the spec</h2>
        <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "#ffffff14" }}>
          {trust.map((p, i) => (
            <div key={p.t} className="flex flex-col p-7" style={{ background: CARD, borderTop: `3px solid ${i % 2 === 0 ? HIVIS : BLUE}` }}>
              <h3 style={{ ...display, color: OFFWHITE }} className="text-lg font-extrabold uppercase tracking-tight">{p.t}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: MUTE }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* what we offer — clean divider list */}
      <section style={{ background: PANEL, borderTop: "1px solid #ffffff14", borderBottom: "1px solid #ffffff14" }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <Kicker color={BLUE}>What we offer</Kicker>
          <h2 style={{ ...display, color: OFFWHITE }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Access solutions</h2>
          <ul className="mt-12 grid gap-x-12 sm:grid-cols-2">
            {offers.map((o, i) => (
              <li key={o.name + i} className="flex items-center gap-5 border-b py-5" style={{ borderColor: "#ffffff14" }}>
                <span style={{ ...display, color: HIVIS }} className="text-sm font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span data-edit={o.edit || undefined} style={{ ...display, color: OFFWHITE }} className="text-lg font-extrabold uppercase tracking-tight">{o.name}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12">{btnGhost("View all services", href("services"))}</div>
        </div>
      </section>

      {/* stat strip */}
      {stats.length > 0 && (
        <section style={{ background: CHARCOAL }}>
          <div className="mx-auto grid max-w-7xl gap-px px-8 sm:grid-cols-3" style={{ background: "#ffffff14" }}>
            {stats.map((s) => (
              <div key={s.v} className="flex flex-col items-start gap-1 px-2 py-12" style={{ background: CHARCOAL }}>
                <span style={{ ...display, color: HIVIS }} className="text-5xl font-extrabold">{s.k}</span>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: MUTE }}>{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: OFFWHITE }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">A safe pair of hands at height</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: HIVIS }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={latticeStyle} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16" style={{ borderBottom: `4px solid ${HIVIS}`, borderLeft: `4px solid ${HIVIS}` }} />
            <span className="pointer-events-none absolute -right-2 -top-2 h-16 w-16" style={{ borderTop: `4px solid ${BLUE}`, borderRight: `4px solid ${BLUE}` }} />
          </div>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff14" }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker color={BLUE}>Recent jobs</Kicker>
            <h2 style={{ ...display, color: OFFWHITE }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our work</h2>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-20">
          <Kicker>Areas covered</Kicker>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {content.service_areas.map((a) => (
              <span key={a} className="border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: "#ffffff26", color: OFFWHITE }}>{a}</span>
            ))}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: HIVIS }}>
        <div className="h-1.5 w-full" style={{ background: HAZARD }} />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-[#1B1E22] sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">Planning a job? Book a free site visit.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-[#1B1E22]/70">Survey, design and a written quote — no obligation.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="bg-[#1B1E22] px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-125">
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
