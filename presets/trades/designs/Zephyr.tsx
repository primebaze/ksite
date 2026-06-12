import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ZephyrHeader } from "./ZephyrHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Zephyr — a cool, modern air-conditioning, ventilation & climate-control
// specialist. The whole register is the opposite of a warm heating brand:
// fresh mint-white surfaces, cool slate ink and a crisp cyan accent, with a
// deep-teal grounding tone. The signature motif is flowing AIRFLOW STREAMLINES
// (curved breeze lines) that appear in the hero, dividers and section marks —
// the feeling of moving, conditioned air. Built for commercial & domestic
// climate work: installs, servicing, ventilation, heat pumps and maintenance
// plans. MULTI-PAGE: nav opens real routes (Services / About / Work / Contact).

const SLATE = "#2B3640"; // cool slate ink
const CYAN = "#25B4D6"; // crisp cyan accent
const MINT = "#EFF7F8"; // fresh mint-white surface
const SILVER = "#C3D0D4"; // silver-grey lines / muted
const TEAL = "#15616E"; // deep teal grounding accent
const INK = "#22303A"; // body text
const MUTE = "#5b6a73"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

// The signature: a set of curved airflow streamlines. Reused at several sizes
// and tones so the breeze motif threads through the whole site.
function Airflow({ className, stroke = CYAN, opacity = 1 }: { className?: string; stroke?: string; opacity?: number }) {
  return (
    <svg className={className} viewBox="0 0 240 120" fill="none" preserveAspectRatio="none" aria-hidden style={{ opacity }}>
      <path d="M-10 30 C 60 0, 110 60, 180 30 S 280 30, 250 30" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M-10 58 C 70 24, 120 84, 200 52 S 280 56, 250 56" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <path d="M-10 86 C 50 56, 130 104, 190 80 S 280 84, 250 84" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// Small kicker with a leading breeze tick — the cool counterpart to a bullet.
function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: light ? "#bff0fb" : TEAL }}>
      <svg width="22" height="10" viewBox="0 0 22 10" fill="none" aria-hidden>
        <path d="M1 3 C 6 0, 10 6, 15 3 S 21 3, 21 3" stroke={light ? "#7fdcf0" : CYAN} strokeWidth="1.6" strokeLinecap="round" />
        <path d="M1 7 C 6 4, 10 10, 15 7" stroke={light ? "#7fdcf0" : CYAN} strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      {children}
    </span>
  );
}

export default function ZephyrDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    <a
      href={to}
      className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: CYAN, color: "#06222b", boxShadow: "0 12px 30px -10px rgba(37,180,214,0.65)" }}
    >
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-white/10 ${full ? "block w-full" : "inline-flex"}`}
      style={{ borderColor: "#ffffff55", color: "#ffffff" }}
    >
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string) => (
    <a
      href={to}
      className="inline-flex rounded-full border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-[#25B4D6] hover:text-[#06222b]"
      style={{ borderColor: `${TEAL}55`, color: TEAL }}
    >
      {label}
    </a>
  );

  // Trust signals tenants in this trade lead with.
  const trust = ["F-Gas certified", "Fully insured", "Free site survey", "Commercial & domestic"];

  const footer = (
    <footer style={{ background: SLATE }} className="relative overflow-hidden text-white">
      <Airflow className="pointer-events-none absolute inset-x-0 top-0 h-24 w-full" stroke="#3f5560" opacity={0.5} />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden>
              <path d="M2 8c4-3 9 1 13-1s7-3 9-1" stroke={CYAN} strokeWidth="2" strokeLinecap="round" />
              <path d="M2 14c4-3 9 1 13-1s5-2 8-1" stroke="#ffffff" strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 20c4-2.5 8 1 11-0.5" stroke={CYAN} strokeOpacity="0.6" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[0.04em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70" style={{ borderColor: "#ffffff24" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#25B4D6] hover:text-[#06222b]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]" >Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">Mon–Fri, with emergency call-out.</p>}
        </div>
      </div>
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs text-white/55 sm:flex-row" style={{ borderColor: "#ffffff14" }}>
        <p>© {new Date().getFullYear()} {name}. Climate control done right.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: MINT, color: INK }} className="min-h-screen font-body">
      <ZephyrHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner: a slate band with airflow streamlines threading across.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: SLATE }}>
      <Airflow className="pointer-events-none absolute inset-0 h-full w-full" stroke={CYAN} opacity={0.18} />
      <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full" style={{ background: "radial-gradient(circle, rgba(37,180,214,0.22), transparent 70%)" }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold leading-[1.0] tracking-tight text-white sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Climate services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: SILVER }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[12px] font-bold tabular-nums" style={{ color: CYAN }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${s.id}:name`} style={display} className="text-lg font-bold tracking-tight" >{s.name}</h3>
                    </div>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 pl-7 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</p>}
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
        {banner("Who we are", "Year-round comfort")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" >Certified &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: `${CYAN}66`, color: TEAL }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" >Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnOutline(ctaLabel, cta)}</div>
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
            <h2 style={{ ...display, color: SLATE }} className="text-2xl font-bold tracking-tight" >Speak to the team</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#15616E]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#15616E]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: SILVER, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SLATE }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about your space and we'll arrange a free site survey and a fixed price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: SILVER, heading: SLATE, blurb: MUTE, label: "#3f5560", fieldBg: MINT, fieldBorder: SILVER, fieldText: INK, button: CYAN, buttonText: "#06222b", radius: "9999px", font: "var(--font-space)" }}
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
        {banner("Recent installs", "Our work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  // The six things this trade does, surfaced as a clean "what we do" list even
  // when the tenant hasn't filled a catalog yet.
  const capabilities = [
    { t: "Air-con installs", d: "Wall, ceiling cassette & multi-split systems sized and fitted for your space." },
    { t: "Servicing & repairs", d: "Planned servicing and fast fault-finding to keep systems running clean and quiet." },
    { t: "Ventilation", d: "Fresh-air MVHR and extract systems for healthier, better-balanced buildings." },
    { t: "Heat pumps", d: "Efficient air-source heating and cooling from one low-energy system." },
    { t: "Commercial systems", d: "Offices, retail and server rooms kept at the perfect temperature, all year." },
    { t: "Maintenance plans", d: "Scheduled cover with priority response and F-Gas leak checks built in." },
  ];

  return shell(
    <>
      {/* hero — cool, airy slate/cyan with airflow streamlines */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: SLATE }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        ) : null}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(43,54,64,0.96) 0%, rgba(21,97,110,0.72) 55%, rgba(37,180,214,0.35) 100%)" }} />
        {/* the signature: large flowing breeze lines drifting across the hero */}
        <Airflow className="pointer-events-none absolute inset-x-0 top-[14%] h-1/2 w-full" stroke="#7fdcf0" opacity={0.35} />
        <Airflow className="pointer-events-none absolute inset-x-0 bottom-[6%] h-1/3 w-full" stroke="#ffffff" opacity={0.12} />
        <div className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full" style={{ background: "radial-gradient(circle, rgba(37,180,214,0.3), transparent 70%)" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Cooling & heating across ${content.service_areas[0]}` : "Commercial & domestic climate control"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.35)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Perfect temperature, all year round."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/75">{name}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">Cool air in summer, efficient warmth in winter — air-conditioning, ventilation and heat-pump specialists for homes and businesses.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* F-Gas trust strip */}
      <section style={{ background: TEAL }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-5 text-[12px] font-bold uppercase tracking-[0.16em] text-white/90">
          {(content.accreditations && content.accreditations.length > 0 ? content.accreditations : trust).map((a) => (
            <span key={a} className="inline-flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden><path d="M3 8.5l3 3 7-8" stroke="#7fdcf0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              {a}
            </span>
          ))}
        </div>
      </section>

      {/* dual-comfort: cooling & heating angle */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl p-9" style={{ background: "#ffffff", border: `1px solid ${SILVER}` }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: `${CYAN}1f` }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 2v20M12 2l-3 3M12 2l3 3M12 22l-3-3M12 22l3-3M3.3 7l17.4 10M3.3 7l4.1-.4M3.3 7l.4 4.1M20.7 17l-4.1.4M20.7 17l-.4-4.1M20.7 7L3.3 17M20.7 7l-4.1-.4M20.7 7l.4 4.1M3.3 17l4.1.4M3.3 17l-.4-4.1" stroke={CYAN} strokeWidth="1.4" strokeLinecap="round" /></svg>
            </div>
            <h3 style={display} className="mt-5 text-2xl font-bold tracking-tight" >Cooling</h3>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>Crisp, quiet air-conditioning that holds the perfect temperature through the hottest days — precisely sized so you never pay for capacity you don&apos;t need.</p>
          </div>
          <div className="rounded-3xl p-9" style={{ background: SLATE, color: "#ffffff" }}>
            <div className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: "#ffffff1f" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden><path d="M12 3c-2 3 1 4 0 7-1 2 1 4 0 7M9 7c-1 1 .5 2 0 3.5M15 7c-1 1 .5 2 0 3.5" stroke="#7fdcf0" strokeWidth="1.6" strokeLinecap="round" /></svg>
            </div>
            <h3 style={display} className="mt-5 text-2xl font-bold tracking-tight" >Heating</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-white/75">Reverse-cycle and air-source heat pumps deliver efficient, low-carbon warmth from the very same system — one clean install for comfort all year round.</p>
          </div>
        </div>
      </section>

      {/* what we do — clean divider rows */}
      <section style={{ background: "#ffffff", borderTop: `1px solid ${SILVER}`, borderBottom: `1px solid ${SILVER}` }}>
        <div className="mx-auto max-w-5xl px-8 py-24">
          <Kicker>What we do</Kicker>
          <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Air-con, ventilation &amp; climate control</h2>
          {services.length > 0 ? (
            <ul className="mt-12 divide-y" style={{ borderColor: SILVER }}>
              {services.slice(0, 8).map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[12px] font-bold tabular-nums" style={{ color: CYAN }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${s.id}:name`} style={display} className="text-lg font-bold tracking-tight" >{s.name}</h3>
                    </div>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 pl-7 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</p>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-12 divide-y" style={{ borderColor: SILVER }}>
              {capabilities.map((c, i) => (
                <li key={c.t} className="flex items-start justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[12px] font-bold tabular-nums" style={{ color: CYAN }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 style={display} className="text-lg font-bold tracking-tight">{c.t}</h3>
                    </div>
                    <p className="mt-1.5 pl-7 text-sm leading-relaxed" style={{ color: MUTE }}>{c.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {services.length > 0 && <div className="mt-12">{btnOutline("View all services", href("services"))}</div>}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-3xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-3xl" style={{ background: `linear-gradient(140deg, ${SLATE}, ${TEAL})` }} />
            )}
            <Airflow className="pointer-events-none absolute -bottom-4 left-6 right-6 h-16" stroke={CYAN} opacity={0.7} />
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-bold leading-[1.0] tracking-tight sm:text-5xl">Fresh air, engineered properly</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>More about us →</a>
          </div>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: MINT }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker>Recent installs</Kicker>
            <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Our work</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnOutline("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: SLATE }} className="relative overflow-hidden text-white">
          <Airflow className="pointer-events-none absolute inset-0 h-full w-full" stroke={CYAN} opacity={0.14} />
          <div className="relative mx-auto max-w-7xl px-8 py-16">
            <Kicker light>Areas we cover</Kicker>
            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full border px-4 py-2 text-[13px] font-semibold tracking-wide text-white/85" style={{ borderColor: "#ffffff2a" }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${TEAL}, ${CYAN})` }}>
        <Airflow className="pointer-events-none absolute inset-0 h-full w-full" stroke="#ffffff" opacity={0.2} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.0] tracking-tight sm:text-4xl">Ready for the perfect temperature?</h2>
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/80">Free site survey · fixed-price quotes.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: "#06222b", color: "#ffffff" }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
