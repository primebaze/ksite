import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ChambersHeader } from "./ChambersHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Chambers — an established, authoritative solicitor / law-firm design. Deep
// legal navy and warm parchment, a refined serif for gravitas, fine brass rules
// and a burgundy accent reserved for emphasis. Built to read as trustworthy,
// discreet and senior: SRA-regulated, decades of experience, free initial
// consultation. Lives in the TRADES set (services + enquiry) but in a fully
// PROFESSIONAL register. MULTI-PAGE: nav opens real routes (Practice areas /
// About / Cases / Contact) under basePath; the sticky navy header and parchment
// footer are shared. Practice areas render as fine divider rows, never cards.

const NAVY = "#16263F"; // deep legal navy — page chrome, headings on light
const BURGUNDY = "#7A2733"; // burgundy accent (reserved emphasis)
const PARCH = "#F2ECE0"; // warm parchment page
const PANEL = "#E9E1D2"; // tinted parchment panel
const BRASS = "#B08A4A"; // brass / gold rules + kickers
const INK = "#14181F"; // charcoal ink body on light
const MUTE = "#5a6472"; // muted slate body on light
const PARCHMUTE = "#cdd4de"; // muted parchment text on navy
const LINE = "#D8CFBC"; // parchment hairline
const serif = { fontFamily: "var(--font-fraunces)" } as const;
const display = { fontFamily: "var(--font-space)" } as const;

const PRACTICE_FALLBACK = ["Conveyancing", "Family", "Wills & Probate", "Commercial", "Employment", "Litigation"];

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: light ? BRASS : BURGUNDY }}>
      <span className="h-px w-8" style={{ background: BRASS }} />
      {children}
    </p>
  );
}

export default function ChambersDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Request a consultation";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Practice areas", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Cases", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const credentials =
    content.accreditations && content.accreditations.length > 0
      ? content.accreditations
      : ["SRA-regulated", "Legal 500 recommended", "Confidential advice", "Free initial consultation"];

  const btnSolid = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] transition hover:brightness-110" style={{ background: BRASS, color: NAVY }}>
      {label}
    </a>
  );
  const btnOutlineLight = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center border px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] transition hover:bg-white/10" style={{ borderColor: "#ffffff55", color: PARCH }}>
      {label}
    </a>
  );
  const btnOutlineDark = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center border px-8 py-4 text-center text-[11px] font-bold uppercase tracking-[0.18em] transition hover:bg-black/[0.04]" style={{ borderColor: NAVY, color: NAVY }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: NAVY, borderTop: `3px solid ${BRASS}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl font-medium tracking-[0.01em]" >{name}</span>
            <span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.42em]" style={{ color: BRASS }}>Solicitors &amp; Legal Advisers</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: PARCHMUTE }}>{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {credentials.map((a) => (
              <span key={a} className="border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: "#ffffff24", color: PARCHMUTE }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/75 transition hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: BRASS }} className="text-[11px] font-bold uppercase tracking-[0.24em]">The firm</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: PARCHMUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: BRASS }} className="text-[11px] font-bold uppercase tracking-[0.24em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: PARCHMUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: BRASS }} className="text-[11px] font-bold uppercase tracking-[0.24em]">Office hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: PARCHMUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: PARCHMUTE }}>By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="text-white/55">Authorised &amp; regulated by the Solicitors Regulation Authority.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PARCH }} className="min-h-screen font-body" >
      <ChambersHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: NAVY }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={{ ...serif, color: PARCH }} className="mt-5 max-w-3xl text-4xl font-medium leading-[1.08] tracking-tight sm:text-6xl">{title}</h1>
        {blurb && <p className="mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: PARCHMUTE }}>{blurb}</p>}
      </div>
    </section>
  );

  // Practice-area divider rows — clean, fine rules, name+desc left / price
  // right. No dotted leaders, no card panels.
  const practiceList = (limit?: number) => (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {services.slice(0, limit ?? services.length).map((s, i) => (
        <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
          <div className="flex min-w-0 gap-6">
            <span style={{ ...serif, color: BRASS }} className="text-lg leading-none">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: NAVY }} className="text-xl font-medium">{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BURGUNDY }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- PRACTICE AREAS / SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Practice areas", "Expert counsel across every matter", "Senior, partner-led advice — clearly scoped, sensitively handled and fairly priced.")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? practiceList() : <p style={{ color: MUTE }}>Our practice areas will be listed here shortly.</p>}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The firm", "Established counsel you can trust")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...serif, color: NAVY }} className="mt-12 text-2xl font-medium">Where we act</h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
              </>
            )}
          </div>
          <aside className="h-fit p-7" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BURGUNDY }}>Why instruct us</h4>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
              {credentials.map((a) => (
                <li key={a} className="flex items-start gap-2 border-b pb-3 last:border-0" style={{ borderColor: LINE }}><span style={{ color: BRASS }}>—</span><span>{a}</span></li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold" style={{ color: NAVY }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block transition hover:text-[#16263F]">{content.email}</a>}
            </div>
            <div className="mt-6">{btnOutlineDark(ctaLabel, cta)}</div>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Enquiries", "Request a consultation", "Tell us about your matter in confidence and we'll arrange a free initial consultation.")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: NAVY }} className="text-2xl font-medium">Our chambers</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#16263F]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#16263F]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#9aa3af" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <p className="mt-8 max-w-xs text-xs leading-relaxed" style={{ color: MUTE }}>All enquiries are treated in the strictest confidence and protected by legal privilege.</p>
            {content.map_url && (
              <div className="mt-7">{btnOutlineDark("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a consultation"
                bookingBlurb="Outline your matter in confidence and we'll arrange a free initial consultation."
                bookingCta="Submit enquiry"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: NAVY, blurb: MUTE, label: "#3c4654", fieldBg: "#ffffff", fieldBorder: "#cfc7b6", fieldText: INK, button: NAVY, buttonText: PARCH, radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- CASES / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Selected matters", "Cases & outcomes", "A discreet selection of the work we are proud to have delivered for our clients.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" style={{ border: `1px solid ${LINE}` }} />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Selected matters coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    { k: "30+", v: "Years of counsel" },
    services.length > 0 && { k: `${String(services.length).padStart(2, "0")}`, v: "Practice areas" },
    content.service_areas && content.service_areas.length > 0 && { k: `${content.service_areas.length}`, v: "Regions served" },
  ].filter(Boolean) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero — authoritative navy with parchment headline, image inset right */}
      <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="relative z-10 text-white">
            <Kicker light>{content.service_areas?.[0] ? `Trusted legal counsel · ${content.service_areas[0]}` : "Trusted legal counsel"}</Kicker>
            <h1 style={{ ...serif, color: PARCH }} className="mt-6 max-w-2xl text-5xl font-medium leading-[1.04] tracking-tight sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Considered counsel, decisive results."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: BRASS }}>{name}</p>
            {content.about && <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: PARCHMUTE }}>{content.about.slice(0, 170)}{content.about.length > 170 ? "…" : ""}</p>}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnSolid(ctaLabel, cta)}
              {phone && btnOutlineLight(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ color: PARCHMUTE }}>
              {credentials.slice(0, 4).map((a) => <span key={a} className="flex items-center gap-2"><span style={{ color: BRASS }}>—</span>{a}</span>)}
            </div>
          </div>
          <div className="relative">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]" style={{ border: `1px solid ${BRASS}55` }} />
            ) : (
              <div className="aspect-[4/5] w-full" style={{ background: `linear-gradient(160deg,#1f3457,${NAVY})`, border: `1px solid ${BRASS}55` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -left-3 hidden h-20 w-20 lg:block" style={{ borderBottom: `2px solid ${BRASS}`, borderLeft: `2px solid ${BRASS}` }} />
          </div>
        </div>
      </section>

      {/* SRA / regulated trust strip */}
      <section style={{ background: BURGUNDY }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-5 text-center text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: "#f4e7e3" }}>
          {credentials.map((a) => <span key={a}>{a}</span>)}
        </div>
      </section>

      {/* why instruct us — credentials band */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="lg:max-w-xs">
            <Kicker>Why instruct us</Kicker>
            <h2 style={{ ...serif, color: NAVY }} className="mt-4 text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">A firm built on judgement and discretion</h2>
            <p className="mt-5 text-[15px] leading-relaxed" style={{ color: MUTE }}>For decades our solicitors have guided clients through their most important decisions — with clarity, candour and complete confidentiality.</p>
          </div>
          <div className="grid gap-px sm:grid-cols-2" style={{ background: LINE }}>
            {[
              { t: "Senior, partner-led advice", d: "Your matter is handled by experienced solicitors from first instruction to resolution — never passed down the line." },
              { t: "SRA-regulated assurance", d: "Authorised and regulated by the Solicitors Regulation Authority, with full professional indemnity cover." },
              { t: "Free initial consultation", d: "We begin with a no-obligation conversation to understand your position and set out clear, honest options." },
              { t: "Discretion guaranteed", d: "Every matter is treated in the strictest confidence and protected by legal professional privilege." },
            ].map((c) => (
              <div key={c.t} className="p-8" style={{ background: PARCH }}>
                <h3 style={{ ...serif, color: NAVY }} className="text-lg font-medium">{c.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stat band */}
      {stats.length > 0 && (
        <section style={{ background: NAVY }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-8 py-14 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-4 border-l pl-5" style={{ borderColor: `${BRASS}66` }}>
                <span style={{ ...serif, color: PARCH }} className="text-5xl font-medium leading-none">{s.k}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: PARCHMUTE }}>{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* practice areas — divider rows */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker>Practice areas</Kicker>
            <h2 style={{ ...serif, color: NAVY }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Areas in which we act</h2>
            <p className="mt-4 text-[15px]" style={{ color: MUTE }}>{PRACTICE_FALLBACK.join(" · ")}.</p>
            <div className="mt-12">{practiceList(6)}</div>
            <a href={href("services")} className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: BURGUNDY }}>All practice areas →</a>
          </div>
        </section>
      )}

      {/* experienced-team / about angle */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" style={{ border: `1px solid ${LINE}` }} />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: `linear-gradient(160deg,#1f3457,${NAVY})` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 hidden h-20 w-20 lg:block" style={{ borderBottom: `2px solid ${BRASS}`, borderRight: `2px solid ${BRASS}` }} />
          </div>
          <div>
            <Kicker>An experienced team</Kicker>
            <h2 style={{ ...serif, color: NAVY }} className="mt-4 text-3xl font-medium leading-[1.1] tracking-tight sm:text-4xl">Solicitors who have seen it before</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: BURGUNDY }}>About the firm →</a>
          </div>
        </section>
      )}

      {/* cases strip */}
      {gallery.length > 0 && (
        <section style={{ background: NAVY }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker light>Selected matters</Kicker>
            <h2 style={{ ...serif, color: PARCH }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Cases we are proud of</h2>
            <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" style={{ border: `1px solid ${BRASS}40` }} />
              ))}
            </div>
            <div className="mt-10">{btnOutlineLight("View all cases", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* confidential-enquiry CTA */}
      <section style={{ background: PARCH }}>
        <div className="mx-auto max-w-4xl px-8 py-24 text-center">
          <Kicker>In confidence</Kicker>
          <h2 style={{ ...serif, color: NAVY }} className="mt-5 text-4xl font-medium tracking-tight sm:text-5xl">Discuss your matter in confidence</h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed" style={{ color: MUTE }}>Arrange a free, no-obligation initial consultation. Every conversation is private and protected by legal privilege.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {btnSolid(ctaLabel, cta)}
            {phone && btnOutlineDark(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
