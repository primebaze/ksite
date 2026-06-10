import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CornerstoneHeader } from "./CornerstoneHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Cornerstone — established, dependable building & construction firm: extensions,
// renovations, new builds, project management. A professional, premium register
// built on warm concrete grey and a single hi-vis safety-orange accent, on a
// lighter off-white/sand ground (deliberately distinct from Forge's industrial
// dark and Mason's dark-amber). Signature elements: a grounded charcoal hero with
// a blueprint-grid overlay, a clean "what we build" divider list, a "how we work"
// design → build → handover stages strip, a strong projects gallery, and an
// accreditations + areas-covered band. MULTI-PAGE: nav opens real routes
// (Services / About / Work / Contact) under basePath; sticky header + footer
// shared. Tenant swaps in their own photography, copy, services, accreditations.

const CHARCOAL = "#232220"; // deep charcoal — dark sections, ink
const CONCRETE = "#6B6A66"; // warm concrete grey — muted body
const ORANGE = "#F26A1B"; // hi-vis safety orange — single accent
const SAND = "#E8E1D4"; // warm sand — tint band / dividers
const OFFWHITE = "#F6F3ED"; // off-white — page ground
const display = { fontFamily: "var(--font-space)" } as const;

// Faint blueprint grid used as a structural motif across dark sections.
const blueprintGrid: CSSProperties = {
  backgroundImage:
    "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
  backgroundSize: "44px 44px",
};

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p
      className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]"
      style={{ color: light ? "#ffffffb3" : CONCRETE }}
    >
      <span className="inline-block h-[10px] w-[10px]" style={{ background: ORANGE }} />
      {children}
    </p>
  );
}

export default function CornerstoneDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const btnPrimary = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: ORANGE }}
    >
      {label}
    </a>
  );
  const btnDark = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-black ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: CHARCOAL }}
    >
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, light = false) => (
    <a
      href={to}
      className="inline-flex border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:border-[#F26A1B] hover:text-[#F26A1B]"
      style={{ borderColor: light ? "#ffffff40" : "#23222033", color: light ? "#ffffff" : CHARCOAL }}
    >
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: CHARCOAL }} className="relative text-white">
      <div className="pointer-events-none absolute inset-0 opacity-60" style={blueprintGrid} />
      <span className="absolute inset-x-0 top-0 h-1" style={{ background: ORANGE }} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 grid-cols-2 grid-rows-2 gap-[2px]" aria-hidden>
              <span style={{ background: ORANGE }} />
              <span style={{ background: "#ffffff40" }} />
              <span style={{ background: "#ffffff40" }} />
              <span style={{ background: ORANGE }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.1em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#b7b3ab" }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff22", color: "#cfcbc2" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:bg-[#F26A1B] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Company</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: "#b7b3ab" }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: "#b7b3ab" }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: "#b7b3ab" }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: "#b7b3ab" }}>Mon–Fri, site hours.</p>}
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Built to last.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE }} className="min-h-screen font-body" >
      <CornerstoneHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Dark, blueprint-grid sub-page banner.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: CHARCOAL }}>
      <div className="pointer-events-none absolute inset-0" style={blueprintGrid} />
      <span className="absolute bottom-0 left-0 h-1 w-40" style={{ background: ORANGE }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-5 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // Clean divider-row services list — name + desc left, price right. No leaders,
  // no cards. A leading index number keeps the structural, drawing-set feel.
  const servicesList = (
    <ul className="divide-y" style={{ borderColor: "#23222014" }}>
      {services.map((s, i) => (
        <li key={s.id} className="flex items-start justify-between gap-8 py-6">
          <div className="flex min-w-0 gap-5">
            <span className="mt-1 text-[12px] font-extrabold tracking-[0.1em]" style={{ ...display, color: ORANGE }}>{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 data-edit={`item:${s.id}:name`} className="text-xl font-extrabold uppercase tracking-tight" style={{ ...display, color: CHARCOAL }}>{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: CONCRETE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <p data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-extrabold" style={{ color: CHARCOAL }}>{s.price}</p>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we build", "Our Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? servicesList : <p style={{ color: CONCRETE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Built To Last")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: CONCRETE }}>{content.about}</p> : <p style={{ color: CONCRETE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: CHARCOAL }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${ORANGE}66`, color: CHARCOAL }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: CHARCOAL }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: CONCRETE }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Start your project", "Request A Quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: CHARCOAL }} className="text-2xl font-extrabold uppercase tracking-tight">Speak to the team</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: CONCRETE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#F26A1B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#F26A1B]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#23222018", color: CONCRETE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: CHARCOAL }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about your project and we'll come back with a clear, no-obligation price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: "#23222014", heading: CHARCOAL, blurb: CONCRETE, label: "#4d4a45", fieldBg: OFFWHITE, fieldBorder: "#2322201f", fieldText: CHARCOAL, button: ORANGE, buttonText: "#ffffff", radius: "0", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Recent projects", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: CONCRETE }}>Project photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const buildTypes = services.slice(0, 5);
  const stages = [
    { k: "01", t: "Design", d: "We scope the brief, drawings and costs — fixed and clear before a brick is laid." },
    { k: "02", t: "Build", d: "Your dedicated team builds to programme, with one point of contact throughout." },
    { k: "03", t: "Handover", d: "Snagged, certified and signed off — finished on time and built to last." },
  ];
  const stats = [
    content.accreditations && content.accreditations.length > 0 && { k: content.accreditations.length.toString().padStart(2, "0"), v: "Accreditations" },
    services.length > 0 && { k: `${services.length}+`, v: "What we build" },
    content.service_areas && content.service_areas.length > 0 && { k: `${content.service_areas.length}`, v: "Areas covered" },
  ].filter(Boolean) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero — grounded charcoal + blueprint grid, project-led image */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden" style={{ background: CHARCOAL }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(35,34,32,0.95) 0%, rgba(35,34,32,0.78) 48%, rgba(35,34,32,0.4) 100%)" }} />
        <div className="pointer-events-none absolute inset-0 opacity-70" style={blueprintGrid} />
        <span className="absolute bottom-0 left-0 h-1.5 w-1/3" style={{ background: ORANGE }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Building across ${content.service_areas[0]}` : "Established building contractor"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.92] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Built to last, finished on time."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`, true)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
            {(content.accreditations && content.accreditations.length > 0
              ? content.accreditations
              : ["Fully insured", "Free quotes", "Building-regs compliant"]
            ).map((a) => <span key={a}>✓ {a}</span>)}
          </div>
        </div>
      </section>

      {/* stat strip — sand band, no orange flood (distinct from siblings) */}
      {stats.length > 0 && (
        <section style={{ background: SAND }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-8 py-9 sm:grid-cols-3" style={{ color: CHARCOAL }}>
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-3 border-l-2 pl-4" style={{ borderColor: ORANGE }}>
                <span style={display} className="text-4xl font-extrabold">{s.k}</span>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em]" style={{ color: CONCRETE }}>{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: SAND }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20" style={{ borderBottom: `5px solid ${ORANGE}`, borderRight: `5px solid ${ORANGE}` }} />
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">A dependable name in building</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: CONCRETE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>More about us →</a>
          </div>
        </section>
      )}

      {/* what we build — divider list on sand */}
      {services.length > 0 && (
        <section style={{ background: SAND, borderTop: `1px solid #23222012`, borderBottom: `1px solid #23222012` }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>What we build</Kicker>
            <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our services</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: "#23222018" }}>
              {buildTypes.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-6">
                  <div className="flex min-w-0 gap-5">
                    <span className="mt-1 text-[12px] font-extrabold tracking-[0.1em]" style={{ ...display, color: ORANGE }}>{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} className="text-xl font-extrabold uppercase tracking-tight" style={{ ...display, color: CHARCOAL }}>{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: CONCRETE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-extrabold" style={{ color: CHARCOAL }}>{s.price}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnDark("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* how we work — design → build → handover stages strip (dark, blueprint) */}
      <section className="relative overflow-hidden" style={{ background: CHARCOAL }}>
        <div className="pointer-events-none absolute inset-0 opacity-70" style={blueprintGrid} />
        <div className="relative mx-auto max-w-7xl px-8 py-24">
          <Kicker light>How we work</Kicker>
          <h2 style={display} className="mt-4 text-4xl font-extrabold uppercase tracking-tight text-white sm:text-5xl">Design → Build → Handover</h2>
          <div className="mt-12 grid gap-px sm:grid-cols-3" style={{ background: "#ffffff14" }}>
            {stages.map((s) => (
              <div key={s.k} className="p-8" style={{ background: CHARCOAL }}>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold" style={{ ...display, color: ORANGE }}>{s.k}</span>
                  <h3 style={display} className="text-lg font-extrabold uppercase tracking-[0.08em] text-white">{s.t}</h3>
                </div>
                <p className="mt-4 text-sm leading-relaxed" style={{ color: "#b7b3ab" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* work / projects */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>Recent projects</Kicker>
          <h2 style={{ ...display, color: CHARCOAL }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our work</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnOutline("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* accreditations + areas-covered band */}
      {((content.accreditations && content.accreditations.length > 0) || (content.service_areas && content.service_areas.length > 0)) && (
        <section style={{ background: SAND }}>
          <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 lg:grid-cols-2">
            {content.accreditations && content.accreditations.length > 0 && (
              <div>
                <h3 style={{ ...display, color: CHARCOAL }} className="text-xs font-extrabold uppercase tracking-[0.22em]">Accredited &amp; insured</h3>
                <div className="mt-5 flex flex-wrap gap-3">
                  {content.accreditations.map((a) => (
                    <span key={a} className="border-2 bg-white px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${ORANGE}55`, color: CHARCOAL }}>{a}</span>
                  ))}
                </div>
              </div>
            )}
            {content.service_areas && content.service_areas.length > 0 && (
              <div>
                <h3 style={{ ...display, color: CHARCOAL }} className="text-xs font-extrabold uppercase tracking-[0.22em]">Areas we cover</h3>
                <p className="mt-5 text-[15px] leading-relaxed" style={{ color: CONCRETE }}>{content.service_areas.join(" · ")}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* closing CTA — charcoal with orange rule */}
      <section className="relative overflow-hidden" style={{ background: CHARCOAL }}>
        <span className="absolute inset-x-0 top-0 h-1" style={{ background: ORANGE }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-4xl">Planning a build? Let&apos;s talk.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/60">Free, no-obligation quotes — fixed prices, clear timelines.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: ORANGE }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
