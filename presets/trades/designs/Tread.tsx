import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { TreadHeader } from "./TreadHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Tread — a fast, value tyre shop & fitting centre. Deep tyre-black with a
// single hi-vis-orange accent, a tyre-tread bar motif and a concentric rim /
// wheel graphic as the signature. Leads hard on value & speed: all major
// brands, free fitting, while-you-wait, price-match, mobile & same-day. Built
// for tyre centres, fast-fits, alignment & balancing specialists. MULTI-PAGE:
// nav opens real routes (Services / About / Work / Contact) under basePath; the
// sticky header + dark footer are shared. Owners swap photography, copy,
// services (tyres / alignment / balancing / repairs) and accreditations.

const BLACK = "#17191C"; // tyre-black page
const SLATE = "#2E353B"; // cool slate panel
const STEEL = "#22272C"; // card / lifted surface
const ORANGE = "#F26A1B"; // hi-vis accent
const WHITE = "#F5F6F4"; // road-marking white text
const GREY = "#9AA1A7"; // steel-grey muted body
const display: CSSProperties = { fontFamily: "var(--font-space)" };

// Signature tyre-tread bar: a row of angled blocks like a tyre's contact patch.
function Tread({ color = ORANGE, className = "" }: { color?: string; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-[3px] ${className}`} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <span key={i} className="h-3.5 w-1.5 skew-x-[-18deg]" style={{ background: color, opacity: i % 2 ? 0.55 : 1 }} />
      ))}
    </span>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: ORANGE }}>
      <Tread />
      {children}
    </span>
  );
}

// Concentric rim / wheel graphic — the structural signature, used as a faint
// backdrop behind hero & banners and as a crisp inline mark.
function Rim({ className = "", stroke = ORANGE, opacity = 1 }: { className?: string; stroke?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" aria-hidden style={{ opacity }}>
      <circle cx="100" cy="100" r="96" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="100" r="74" stroke={stroke} strokeWidth="1" strokeDasharray="3 5" />
      <circle cx="100" cy="100" r="52" stroke={stroke} strokeWidth="2" />
      <circle cx="100" cy="100" r="14" stroke={stroke} strokeWidth="2" />
      {Array.from({ length: 10 }).map((_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={100 + Math.cos(a) * 16}
            y1={100 + Math.sin(a) * 16}
            x2={100 + Math.cos(a) * 50}
            y2={100 + Math.sin(a) * 50}
            stroke={stroke}
            strokeWidth="2"
          />
        );
      })}
    </svg>
  );
}

export default function TreadDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book a fitting";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Value props — the speed/value spine of the whole design.
  const VALUE = ["All major brands", "Free fitting", "While-you-wait", "Price-match promise", "Mobile fitting", "Same-day"];
  // Placeholder "all major brands" wordmarks (owner copy can override later).
  const BRANDS = ["Michelin", "Continental", "Pirelli", "Bridgestone", "Goodyear", "Dunlop", "Hankook", "Falken"];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-black transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: ORANGE }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: "#ffffff33", color: WHITE }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: "#101214", borderTop: `3px solid ${ORANGE}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="12" r="10.5" stroke={ORANGE} strokeWidth="1.6" />
              <circle cx="12" cy="12" r="6" stroke="#ffffff" strokeWidth="1.4" />
              <circle cx="12" cy="12" r="2" fill={ORANGE} />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.08em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: GREY }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff1f", color: GREY }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#F26A1B] hover:text-black" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Fitting centre</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: GREY }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: GREY }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: GREY }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: GREY }}>Open 6 days · fitted today.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: BLACK }} className="min-h-screen font-body">
      <TreadHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: SLATE, borderBottom: `3px solid ${ORANGE}` }}>
      <Rim className="pointer-events-none absolute -right-16 -top-16 h-80 w-80" stroke="#ffffff" opacity={0.06} />
      <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Tyres & Fitting")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: WHITE }} className="text-lg font-extrabold uppercase tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: GREY }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-extrabold" style={{ color: ORANGE }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: GREY }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Fitted Right, Fast")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: GREY }}>{content.about}</p> : <p style={{ color: GREY }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: WHITE }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Approved &amp; trusted</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${ORANGE}66`, color: WHITE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: WHITE }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: GREY }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Get booked in", "Book A Fitting")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: WHITE }} className="text-2xl font-extrabold uppercase tracking-tight">Find the centre</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: GREY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: GREY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {VALUE.map((v) => (
                <span key={v} className="rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ background: STEEL, color: GREY }}>{v}</span>
              ))}
            </div>
            {content.map_url && <div className="mt-7">{btnGhost("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Book a fitting"
                bookingBlurb="Send your reg or tyre size and what you need — we'll confirm a price and a same-day slot."
                bookingCta="Book my fitting"
                theme={{ card: STEEL, cardBorder: "#ffffff1a", heading: WHITE, blurb: GREY, label: "#c2c6cd", fieldBg: SLATE, fieldBorder: "#ffffff22", fieldText: WHITE, button: ORANGE, buttonText: "#17191C", radius: "0.75rem", font: "var(--font-space)" }}
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
        {banner("In the bay", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: GREY }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — bold black, tread + concentric-rim signature */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden" style={{ background: BLACK }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#2E353B,#17191C 65%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(23,25,28,0.94) 0%, rgba(23,25,28,0.74) 48%, rgba(23,25,28,0.35) 100%)" }} />
        {/* signature rim graphic */}
        <Rim className="pointer-events-none absolute -right-24 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2" stroke={ORANGE} opacity={0.16} />
        {/* tread strip down the left edge */}
        <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-8 flex-col items-center justify-center gap-2 sm:flex">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="h-5 w-2.5 skew-y-[-18deg]" style={{ background: ORANGE, opacity: i % 2 ? 0.3 : 0.6 }} />
          ))}
        </div>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker>{content.service_areas?.[0] ? `Tyres fitted today · ${content.service_areas[0]}` : "Tyres fitted today"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Tyres fitted today, all major brands."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">New &amp; part-worn tyres, wheel alignment and balancing — fitted while you wait. Free fitting, price-match promise, same-day slots.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* tyre-search strip — enter reg or tyre size */}
      <section style={{ background: ORANGE }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-8 py-7 text-black sm:flex-row">
          <div className="flex items-center gap-3">
            <Tread color="#17191C" />
            <p style={display} className="text-lg font-extrabold uppercase tracking-tight sm:text-xl">Got your reg or tyre size?</p>
          </div>
          <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
            <span className="flex-1 rounded-full bg-black/10 px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-black/60 sm:w-64">e.g. AB12 CDE · 205/55 R16</span>
            <a href={cta} className="shrink-0 rounded-full bg-black px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-125">Get price</a>
          </div>
        </div>
      </section>

      {/* value strip — speed & value spine */}
      <section style={{ background: STEEL, borderBottom: "1px solid #ffffff12" }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-8 sm:grid-cols-3 lg:grid-cols-6">
          {VALUE.map((v) => (
            <div key={v} className="flex items-center gap-2.5 py-2">
              <span className="text-base font-extrabold" style={{ color: ORANGE }}>✓</span>
              <span className="text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: WHITE }}>{v}</span>
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
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-lg object-cover" />
            ) : (
              <div className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-lg" style={{ background: SLATE }}>
                <Rim className="h-64 w-64" stroke={ORANGE} opacity={0.3} />
              </div>
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16 rounded-bl-lg" style={{ borderBottom: `4px solid ${ORANGE}`, borderLeft: `4px solid ${ORANGE}` }} />
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">Fitted right, fitted fast</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: GREY }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: ORANGE }}>More about us →</a>
          </div>
        </section>
      )}

      {/* services — clean divider rows, no cards, no leaders */}
      {services.length > 0 && (
        <section style={{ background: SLATE, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>What we do</Kicker>
            <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">New tyres to alignment</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: "#ffffff1a" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: WHITE }} className="text-lg font-extrabold uppercase tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: GREY }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-extrabold" style={{ color: ORANGE }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* all major brands strip */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <Kicker>All major brands</Kicker>
        <h2 style={{ ...display, color: WHITE }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Budget to premium, stocked &amp; fitted</h2>
        <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg sm:grid-cols-4" style={{ background: "#ffffff14" }}>
          {BRANDS.map((b) => (
            <div key={b} className="flex items-center justify-center px-4 py-7 text-center" style={{ background: STEEL }}>
              <span style={display} className="text-base font-extrabold uppercase tracking-[0.06em] text-white/80">{b}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm" style={{ color: GREY }}>Plus quality part-worn tyres — every tyre fitted, balanced and checked.</p>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: SLATE, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker>In the bay</Kicker>
            <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our work</h2>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* opening-hours band */}
      {content.hours && content.hours.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <Kicker>Open &amp; fitting</Kicker>
              <h2 style={{ ...display, color: WHITE }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl">Drop in or book ahead</h2>
              <p className="mt-5 text-[15px] leading-relaxed" style={{ color: GREY }}>Same-day slots most days — and mobile fitting if you can&apos;t come to us.</p>
              <div className="mt-7">{btnPrimary(ctaLabel, cta)}</div>
            </div>
            <ul className="divide-y self-start" style={{ borderColor: "#ffffff14" }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex items-baseline justify-between gap-8 py-4">
                  <span data-edit={`hours:${i}:day`} style={{ ...display, color: WHITE }} className="text-sm font-extrabold uppercase tracking-[0.12em]">{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-sm" style={{ color: GREY }}>{h.open}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: ORANGE }}>
        <Rim className="pointer-events-none absolute -right-10 -top-10 h-64 w-64" stroke="#17191C" opacity={0.12} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-black sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">Need tyres today? Roll in.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-black/70">Free fitting · price-match · while you wait.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full bg-black px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-125">{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
