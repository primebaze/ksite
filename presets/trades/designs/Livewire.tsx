import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LivewireHeader } from "./LivewireHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Livewire — a sharp, modern electrician design. Charcoal-ink with an electric
// yellow accent and a cool circuit-blue support colour, clean circuit-trace and
// lightning-bolt linework, and a technical Space-display headline. Leads with
// safety: certified (NICEIC / Part-P style), insured, emergency call-out, areas
// covered. MULTI-PAGE: the nav opens real routes (Services / About / Work /
// Contact) under basePath; the sticky header and charcoal footer are shared.
// Tenant swaps in their own photography, copy, services and accreditations.

const INK = "#16181D"; // charcoal-ink page
const PANEL = "#1C1F26"; // lifted panel
const CARD = "#FAFAF7"; // clean white surface
const GREY = "#E4E4DF"; // mid-grey hairlines
const YELLOW = "#FFD21E"; // electric yellow accent
const BLUE = "#3A6EA5"; // circuit blue
const TEXT = "#16181D"; // primary ink text on light
const LIGHT = "#F2F2EE"; // light text on ink
const MUTE = "#9A9EA8"; // muted body on ink
const MUTE2 = "#5A5E68"; // muted body on light
const display = { fontFamily: "var(--font-space)" } as const;

// A thin circuit-trace divider: a horizontal line with a node and a bolt tap.
function CircuitRule({ color = YELLOW }: { color?: string }) {
  return (
    <svg viewBox="0 0 220 12" className="h-3 w-44" fill="none" aria-hidden>
      <path d="M0 6h70l8-4h40l8 8h86" stroke={color} strokeWidth="1.5" />
      <circle cx="78" cy="2" r="2.5" fill={color} />
      <circle cx="126" cy="10" r="2.5" fill={color} />
    </svg>
  );
}

function Kicker({ children, on = "ink" }: { children: ReactNode; on?: "ink" | "light" }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.24em]" style={{ color: on === "ink" ? "#B98A0E" : YELLOW }}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></svg>
      {children}
    </span>
  );
}

export default function LivewireDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    <a href={to} className={`items-center justify-center rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#16181D] transition hover:brightness-110 ${full ? "flex w-full" : "inline-flex"}`} style={{ background: YELLOW }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`items-center justify-center rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:border-[#FFD21E] hover:text-[#FFD21E] ${full ? "flex w-full" : "inline-flex"}`} style={{ borderColor: "#ffffff2e", color: LIGHT }}>
      {label}
    </a>
  );
  const btnDark = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-[#16181D] hover:text-white" style={{ borderColor: INK, color: INK }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: INK, borderTop: `2px solid ${YELLOW}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-[5px]" style={{ background: YELLOW }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={INK} aria-hidden><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.08em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff1f", color: MUTE }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#FFD21E] hover:text-[#16181D]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "footer_company", "Company")} />
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Sat, plus 24/7 emergency call-out.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">24/7 emergency · {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CARD }} className="min-h-screen font-body">
      <LivewireHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: INK }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{ backgroundImage: `linear-gradient(${YELLOW}22 1px, transparent 1px), linear-gradient(90deg, ${YELLOW}22 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker on="light"><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl" {...editCopy(content, titleKey, title)} />
        <div className="mt-6"><CircuitRule /></div>
      </div>
    </section>
  );

  // Reusable clean divider service list (name+desc left, price right). NO cards.
  const serviceList = (items: typeof services) => (
    <ul className="divide-y" style={{ borderColor: GREY }}>
      {items.map((s, i) => (
        <li key={s.id} className="group flex items-start justify-between gap-6 py-6">
          <div className="flex gap-5">
            <span className="select-none pt-1 text-[12px] font-extrabold tabular-nums" style={{ color: BLUE }}>{String(i + 1).padStart(2, "0")}</span>
            <div>
              <h3 data-edit={`item:${s.id}:name`} style={display} className="text-lg font-extrabold uppercase tracking-tight" >{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE2 }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <p data-edit={`item:${s.id}:price`} style={display} className="shrink-0 pt-1 text-base font-extrabold">{s.price}</p>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Our Services", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? serviceList(services) : <p style={{ color: MUTE2 }}>Services coming soon.</p>}
          <div className="mt-12">{btnDark(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "about_kicker", "Wired For Trust", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE2 }}>{content.about}</p> : <p style={{ color: MUTE2 }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "about_certified_heading", "Certified & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: BLUE, color: TEXT }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE2 }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnDark(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "contact_kicker", "Request A Quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-extrabold uppercase tracking-tight" {...editCopy(content, "contact_form_heading", "Speak to a sparky")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE2 }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#16181D]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#16181D]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: GREY, color: MUTE2 }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#9CA0AA" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-7">{btnDark("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about the job and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: CARD, cardBorder: GREY, heading: TEXT, blurb: MUTE2, label: "#3D414A", fieldBg: "#ffffff", fieldBorder: "#D5D5CF", fieldText: TEXT, button: YELLOW, buttonText: INK, radius: "0.75rem", font: "var(--font-space)" }}
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
        {banner("Recent jobs", "gallery_kicker", "Our Work", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE2 }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    content.accreditations && content.accreditations.length > 0 && { k: content.accreditations.length.toString().padStart(2, "0"), v: "Accreditations" },
    services.length > 0 && { k: `${services.length}+`, v: "Services" },
    content.service_areas && content.service_areas.length > 0 && { k: `${content.service_areas.length}`, v: "Areas covered" },
  ].filter(Boolean) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero — charcoal with electric-yellow circuit linework */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden" style={{ background: INK }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-50" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        ) : null}
        {/* circuit grid + bolt linework */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]" style={{ backgroundImage: `linear-gradient(${YELLOW}22 1px, transparent 1px), linear-gradient(90deg, ${YELLOW}22 1px, transparent 1px)`, backgroundSize: "48px 48px" }} />
        <svg className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 opacity-30 lg:block" viewBox="0 0 400 600" fill="none" aria-hidden preserveAspectRatio="xMaxYMid slice">
          <path d="M40 40h120l30 30v90h120l30 30v140h60" stroke={YELLOW} strokeWidth="2" />
          <path d="M0 200h90l40 40h120v120l40 40h110" stroke={BLUE} strokeWidth="2" />
          <circle cx="160" cy="40" r="5" fill={YELLOW} /><circle cx="310" cy="190" r="5" fill={YELLOW} />
          <circle cx="250" cy="240" r="5" fill={BLUE} /><circle cx="90" cy="200" r="5" fill={BLUE} />
          <path d="M250 300l-26 36h18l-6 44 30-52h-20l4-28z" fill={YELLOW} />
        </svg>
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${INK} 0%, ${INK}e6 42%, ${INK}80 100%)` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28">
          <Kicker on="light">{content.service_areas?.[0] ? `Certified electricians · ${content.service_areas[0]}` : "Certified · insured · 24/7"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Power, safely sorted."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
              {content.accreditations.map((a) => <span key={a} className="flex items-center gap-1.5"><span style={{ color: YELLOW }}>✓</span> {a}</span>)}
            </div>
          )}
        </div>
        {/* emergency phone banner */}
        {phone && (
          <a href={`tel:${phone}`} className="absolute inset-x-0 bottom-0 z-10 block" style={{ background: YELLOW }}>
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-8 py-3 text-[#16181D]">
              <span className="flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[0.16em]">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></svg>
                Power cut or fault? Emergency call-out
              </span>
              <span className="text-[13px] font-extrabold tracking-wide">{phone} →</span>
            </div>
          </a>
        )}
      </section>

      {/* certification trust strip */}
      {(content.accreditations?.length || content.service_areas?.length) && (
        <section style={{ background: PANEL }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-8 py-7 text-center">
            {(content.accreditations && content.accreditations.length > 0 ? content.accreditations : ["NICEIC Approved", "Part-P Certified", "Fully Insured"]).map((a) => (
              <span key={a} className="flex items-center gap-2.5 text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: LIGHT }}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full" style={{ background: YELLOW }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="3" aria-hidden><path d="M5 12l5 5L20 7" /></svg>
                </span>
                {a}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* stat strip */}
      {stats.length > 0 && (
        <section style={{ background: INK, borderBottom: `2px solid ${YELLOW}` }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-8 py-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-3 text-white">
                <span style={{ ...display, color: YELLOW }} className="text-4xl font-extrabold">{s.k}</span>
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
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "Safe, certified, on time")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE2 }}>{content.about}</p>
            <div className="mt-6"><CircuitRule color={BLUE} /></div>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: "#B98A0E" }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: PANEL }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 flex h-16 w-16 items-center justify-center rounded-xl" style={{ background: YELLOW }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill={INK} aria-hidden><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" /></svg>
            </span>
          </div>
        </section>
      )}

      {/* services — clean divider list */}
      {services.length > 0 && (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${GREY}`, borderBottom: `1px solid ${GREY}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_services_kicker", "What we do")} /></Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "home_services_heading", "Our services")} />
            <div className="mt-10">{serviceList(services.slice(0, 7))}</div>
            <div className="mt-12">{btnDark("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_work_kicker", "Recent jobs")} /></Kicker>
          <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "home_work_heading", "Our work")} />
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnDark("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas-covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: BLUE }}>
          <div className="mx-auto max-w-7xl px-8 py-14 text-white">
            <Kicker on="light"><span {...editCopy(content, "home_areas_kicker", "Areas we cover")} /></Kicker>
            <div className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
              {content.service_areas.map((a) => (
                <span key={a} style={display} className="text-xl font-extrabold uppercase tracking-tight sm:text-2xl">{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{ backgroundImage: `linear-gradient(${YELLOW}22 1px, transparent 1px), linear-gradient(90deg, ${YELLOW}22 1px, transparent 1px)`, backgroundSize: "44px 44px" }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={{ ...display, color: "#fff" }} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Need an electrician? Let's talk.")} />
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: MUTE }} {...editCopy(content, "cta_sub", "Free, no-obligation quotes · 24/7 call-out.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-[#16181D] transition hover:brightness-110" style={{ background: YELLOW }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
