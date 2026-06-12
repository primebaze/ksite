import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RoadworthyHeader } from "./RoadworthyHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Roadworthy — a clean, trustworthy MOT & servicing centre design. Workshop-white
// with a pass-green accent, deep navy ink and a hazard-amber advisory note. The
// signature is an MOT-certificate feel: a green pass roundel, ticked checklists
// and an honest fixed-price register. Built to read as DVSA-approved, honest,
// quick & local — deliberately the bright, certificate-clean opposite of the dark
// performance garages (Apex / Velocity). MULTI-PAGE: nav opens real routes
// (Services / About / Work / Contact) under basePath; the sticky header + footer
// are shared. Tenant swaps in their own photography, copy, services & pricing.

const WHITE = "#F4F6F4"; // clean workshop white (page)
const NAVY = "#182433"; // deep navy ink
const GREEN = "#2E9E5B"; // MOT pass green (accent)
const AMBER = "#F2A93C"; // hazard amber (advisory)
const STEEL = "#5C6671"; // steel grey (muted body)
const LINE = "#dfe4e0"; // hairline on white
const display = { fontFamily: "var(--font-space)" } as const;

function Tick({ color = GREEN, size = 16 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function Kicker({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  return (
    <p className="flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: GREEN }}>
      <Tick size={14} />
      <span style={{ color: on === "dark" ? "#ffffffcc" : NAVY }}>{children}</span>
    </p>
  );
}

// The signature pass-roundel: an "MOT PASS" certificate stamp.
function Roundel({ size = 132 }: { size?: number }) {
  return (
    <div
      className="relative flex flex-col items-center justify-center rounded-full text-center"
      style={{ width: size, height: size, background: "#ffffff", border: `3px solid ${GREEN}`, boxShadow: "0 16px 40px rgba(24,36,51,0.16)" }}
    >
      <span className="absolute inset-1.5 rounded-full" style={{ border: `1px dashed ${GREEN}88` }} />
      <Tick size={26} />
      <span style={display} className="mt-1 text-[15px] font-extrabold uppercase leading-none tracking-[0.04em]" >MOT</span>
      <span className="text-[9px] font-extrabold uppercase tracking-[0.28em]" style={{ color: GREEN }}>Pass</span>
    </div>
  );
}

export default function RoadworthyDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book your MOT";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  // Lowest service price for the honest-pricing band, e.g. "MOT from £X".
  const firstPrice = services.map((s) => s.price).find((p): p is string => !!p);

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const trust = [
    "DVSA-approved test centre",
    "While-you-wait appointments",
    "Free retest",
    "All makes & models",
    "Fixed, honest prices",
    "Same-day slots",
  ];

  const greenBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: GREEN }}>{label}</a>
  );
  const ghostBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-[#18243308] ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: NAVY, color: NAVY }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: NAVY }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full text-[9px] font-extrabold uppercase tracking-[0.04em] text-white" style={{ background: GREEN, fontFamily: "var(--font-space)" }}>MOT</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.04em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70" style={{ border: "1px solid #ffffff26" }}><Tick size={11} />{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#2E9E5B] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Centre</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Mon–Sat.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: WHITE, color: NAVY }} className="min-h-screen font-body">
      <RoadworthyHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: "#ffffff", borderBottom: `3px solid ${GREEN}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // Clean divider-row services list — name+desc left, price right. No leaders, no cards.
  const serviceList = (items: typeof services) => (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {items.map((s) => (
        <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
          <div className="flex min-w-0 gap-4">
            <span className="mt-1 shrink-0"><Tick /></span>
            <div className="min-w-0">
              <p data-edit={`item:${s.id}:name`} style={{ ...display, color: NAVY }} className="text-lg font-extrabold uppercase tracking-tight">{s.name}</p>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: STEEL }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-extrabold" style={{ color: GREEN }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we offer", "Our Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? serviceList(services) : <p style={{ color: STEEL }}>Services coming soon.</p>}
          <div className="mt-12">{greenBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Honest, Local, Approved")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: STEEL }}>{content.about}</p> : <p style={{ color: STEEL }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Approved &amp; accredited</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="inline-flex items-center gap-2 rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${GREEN}66`, color: NAVY }}><Tick size={13} />{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: STEEL }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{greenBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Book Your MOT")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: NAVY }} className="text-2xl font-extrabold uppercase tracking-tight">Find the centre</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: STEEL }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#182433]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#182433]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: STEEL }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: NAVY }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Book your MOT"
                bookingBlurb="Tell us your reg, make and model — we'll confirm a slot, often same-day."
                bookingCta="Book my MOT"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: NAVY, blurb: STEEL, label: NAVY, fieldBg: WHITE, fieldBorder: LINE, fieldText: NAVY, button: GREEN, buttonText: "#ffffff", radius: "0.75rem", font: "var(--font-space)" }}
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
        {banner("The workshop", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: STEEL }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — navy, certificate-clean, with the signature pass roundel */}
      <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(24,36,51,0.95) 0%, rgba(24,36,51,0.8) 55%, rgba(24,36,51,0.55) 100%)" }} />
          </>
        )}
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.4fr_1fr]">
          <div className="text-white">
            <Kicker on="dark">{content.service_areas?.[0] ? `DVSA-approved · ${content.service_areas[0]}` : "DVSA-approved test centre"}</Kicker>
            <h1 style={display} className="mt-5 max-w-3xl text-5xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Book your MOT, pass with confidence."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/60">{name}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {greenBtn(ctaLabel, cta)}
              {phone && (
                <a href={`tel:${phone}`} className="inline-flex rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff44" }}>Call {phone}</a>
              )}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2.5 text-[12px] font-bold text-white/70">
              {trust.slice(0, 3).map((t) => (
                <span key={t} className="inline-flex items-center gap-2"><Tick size={14} />{t}</span>
              ))}
            </div>
          </div>
          <div className="hidden justify-center lg:flex"><Roundel size={172} /></div>
        </div>
      </section>

      {/* trust strip — while-you-wait, free retest, fixed prices */}
      <section style={{ background: "#ffffff", borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-4 px-8 py-8 sm:grid-cols-2 lg:grid-cols-3">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full" style={{ background: `${GREEN}1a` }}><Tick size={15} /></span>
              <span className="text-sm font-bold uppercase tracking-[0.08em]" style={{ color: NAVY }}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* honest-pricing band */}
      {firstPrice && (
        <section style={{ background: GREEN }}>
          <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-8 py-10 text-white sm:flex-row sm:items-center">
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-white/80">MOT from</span>
              <span style={display} className="text-4xl font-extrabold sm:text-5xl">{firstPrice}</span>
            </div>
            <p className="text-sm font-bold uppercase tracking-[0.12em] text-white/85">Fixed prices · no surprises · free retest included</p>
            <a href={cta} className="rounded-full bg-white px-8 py-3.5 text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-[#eef2ee]" style={{ color: NAVY }}>{ctaLabel}</a>
          </div>
        </section>
      )}

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: "#ffffff", border: `1px solid ${LINE}` }} />
            )}
            <span className="absolute -bottom-5 -right-5 hidden lg:block"><Roundel size={108} /></span>
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-5xl">No-nonsense, honest workmanship</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: STEEL }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: GREEN }}>More about us →</a>
          </div>
        </section>
      )}

      {/* services — clean divider rows on white */}
      {services.length > 0 && (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>What we offer</Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our services</h2>
            <div className="mt-12">{serviceList(services.slice(0, 6))}</div>
            <div className="mt-12">{ghostBtn("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* advisory note — hazard amber, honest touch */}
      <section className="mx-auto max-w-5xl px-8 py-16">
        <div className="flex items-start gap-4 rounded-2xl p-7" style={{ background: `${AMBER}14`, border: `1px solid ${AMBER}55` }}>
          <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-extrabold text-white" style={{ background: AMBER, fontFamily: "var(--font-space)" }}>!</span>
          <div>
            <p style={{ ...display, color: NAVY }} className="text-sm font-extrabold uppercase tracking-[0.1em]">Advisories explained, never inflated</p>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: STEEL }}>If your vehicle needs work, we show you exactly what and why — honest advice, fixed prices and a free retest if anything comes up.</p>
          </div>
        </div>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 pb-24">
          <Kicker>The workshop</Kicker>
          <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our work</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
          <div className="mt-10">{ghostBtn("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* closing CTA — navy with pass roundel */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div className="flex items-center gap-6">
            <span className="hidden sm:block"><Roundel size={96} /></span>
            <div>
              <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-4xl">Pass with confidence.</h2>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/60">Same-day slots · while-you-wait · free retest.</p>
            </div>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: GREEN }}>{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
