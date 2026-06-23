import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PipeworksHeader } from "./PipeworksHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Pipeworks — a trustworthy plumber & heating engineer. Deep marine-navy with a
// clean water-blue, fresh aqua highlight and a signal-copper accent reserved for
// emergencies + the primary CTA. The structural signature: a confident navy hero
// with a copper emergency call-out banner and Gas-Safe/insured/guaranteed trust
// badges, a flowing water-line motif, a clean divider-row "what we do" services
// list, a "why us" guarantee strip and an areas-covered band. Rounded, premium,
// calm — water, pipes, fast response, no mess. MULTI-PAGE: nav opens real routes
// (Services / About / Work / Contact) under basePath; header + footer are shared.

const NAVY = "#102A43"; // deep marine navy — base
const NAVY2 = "#0B1F33"; // deeper navy — footer / overlays
const WATER = "#2C8FE0"; // clean water blue
const AQUA = "#7FD0E8"; // fresh aqua highlight
const PAPER = "#F7FAFC"; // white / page
const MIST = "#EAF2F8"; // pale blue panel
const COPPER = "#C26B3E"; // signal copper — emergency / CTA
const INK = "#1B3A57"; // body text on light
const MUTE = "#5B7287"; // muted body on light
const display = { fontFamily: "var(--font-space)" } as const;

// A thin flowing water-line — the recurring motif (section dividers, hero base).
function WaterLine({ color = WATER, className = "" }: { color?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1200 24" preserveAspectRatio="none" fill="none" aria-hidden>
      <path d="M0 12 C 100 0, 200 24, 300 12 S 500 0, 600 12 S 800 24, 900 12 S 1100 0, 1200 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function Kicker({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  const c = on === "dark" ? AQUA : WATER;
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: c }}>
      <span className="inline-flex h-1.5 w-1.5 rounded-full" style={{ background: c }} />
      {children}
    </span>
  );
}

export default function PipeworksDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const trustBadges = accreds.length > 0 ? accreds : ["Gas Safe registered", "Fully insured", "Work guaranteed"];

  const btnCopper = (label: string, to: string, full = false) => (
    <a href={to} className={`items-center justify-center rounded-full px-7 py-3.5 text-center text-[13px] font-bold tracking-[0.01em] text-white shadow-lg shadow-[#C26B3E]/20 transition hover:brightness-110 ${full ? "flex w-full" : "inline-flex"}`} style={{ background: COPPER }}>{label}</a>
  );
  const btnNavy = (label: string, to: string, full = false) => (
    <a href={to} className={`items-center justify-center rounded-full px-7 py-3.5 text-center text-[13px] font-bold tracking-[0.01em] transition hover:bg-[#102A43] hover:text-white ${full ? "flex w-full" : "inline-flex"}`} style={{ border: `1.5px solid ${NAVY}`, color: NAVY }}>{label}</a>
  );
  const btnGlass = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-center text-[13px] font-bold tracking-[0.01em] text-white transition hover:bg-white/10" style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>{label}</a>
  );

  // ---- shared chrome ----
  const footer = (
    <footer style={{ background: NAVY2 }} className="relative text-white">
      <WaterLine color={AQUA} className="absolute inset-x-0 top-0 h-5 w-full opacity-50" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full" style={{ background: WATER }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="#ffffff" aria-hidden><path d="M12 2.5c3.6 4.2 6.5 7.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.4 8.4 6.7 12 2.5z" /></svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trustBadges.map((a) => (
              <span key={a} className="rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/85" style={{ background: "rgba(127,208,232,0.12)", border: "1px solid rgba(127,208,232,0.28)" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-2.5">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#2C8FE0] hover:text-white" style={{ background: "rgba(255,255,255,0.06)" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em]">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/70">24/7 emergency call-out.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row sm:px-8" style={{ borderColor: "rgba(255,255,255,0.10)", color: "rgba(255,255,255,0.5)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER, color: INK }} className="min-h-screen font-body">
      <PipeworksHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner — navy block with the water-line motif at its base.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${WATER}, transparent 70%)` }} />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-36 sm:px-8 sm:pt-44">
        <Kicker on="dark"><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
      <WaterLine color={AQUA} className="absolute inset-x-0 bottom-0 h-6 w-full" />
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Plumbing & heating, sorted", "svc_title")}
        <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "rgba(16,42,67,0.10)" }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-6 py-6">
                  <div className="flex gap-5">
                    <span style={{ ...display, color: AQUA }} className="mt-0.5 text-sm font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-bold tracking-tight">{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: WATER }}>{s.price}</p>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12 flex flex-wrap gap-3">{btnCopper(ctaLabel, cta)}{phone && btnNavy(`Call ${phone}`, `tel:${phone}`)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "about_kicker", "Trusted local engineers", "about_title")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {trustBadges.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "about_accred_heading", "Accredited & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {trustBadges.map((a) => (
                  <span key={a} className="rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: MIST, color: NAVY }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnCopper(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "contact_kicker", "Request a quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: NAVY }} className="text-2xl font-bold tracking-tight" {...editCopy(content, "contact_heading", "Speak to the team")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#2C8FE0]" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2C8FE0]">{content.email}</a>}
            </div>
            {phone && (
              <div className="mt-7 flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: NAVY }}>
                <span className="flex h-10 w-10 items-center justify-center rounded-full" style={{ background: COPPER }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" aria-hidden><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" /></svg>
                </span>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: AQUA }} {...editCopy(content, "contact_emergency_label", "24/7 emergency line")} />
                  <a href={`tel:${phone}`} style={display} className="text-lg font-bold text-white">{phone}</a>
                </div>
              </div>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "rgba(16,42,67,0.12)", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: INK }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{btnNavy("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about the job and we'll come back with a fixed price — no call-out surprises."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: "rgba(16,42,67,0.10)", heading: NAVY, blurb: MUTE, label: INK, fieldBg: PAPER, fieldBorder: "rgba(16,42,67,0.16)", fieldText: INK, button: COPPER, buttonText: "#ffffff", radius: "0.9rem", font: "var(--font-space)" }}
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
        {banner("Recent jobs", "work_kicker", "Our work", "work_title")}
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
  const guarantees = [
    { t: "Fast response", d: "Same-day call-outs and a 24/7 emergency line — leaks and breakdowns can't wait." },
    { t: "Fixed, fair pricing", d: "Clear quotes up front. No call-out surprises, no mess left behind." },
    { t: "Workmanship guaranteed", d: "Gas-Safe registered, fully insured, and every job backed by our guarantee." },
  ];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: NAVY }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 80% 0%, ${WATER}33, transparent 55%), linear-gradient(160deg, ${NAVY} 0%, ${NAVY2} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${NAVY2}f2 0%, ${NAVY2}d9 42%, ${NAVY2}59 100%)` }} />
        {/* flowing pipe-line motif */}
        <WaterLine color={AQUA} className="pointer-events-none absolute inset-x-0 bottom-24 h-10 w-full opacity-30" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-28 text-white sm:px-8">
          <Kicker on="dark">{content.service_areas?.[0] ? `Trusted across ${content.service_areas[0]}` : "Plumbing & heating engineers"}</Kicker>
          <h1 style={display} className="mt-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Leaks, boilers, bathrooms — sorted today."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/65">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnCopper(ctaLabel, cta)}
            {phone && btnGlass(`Call ${phone}`, `tel:${phone}`)}
          </div>
          {/* trust badges */}
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
            {trustBadges.map((a) => (
              <span key={a} className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/75">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={AQUA} strokeWidth="2.5" aria-hidden><path d="M20 6 9 17l-5-5" /></svg>
                {a}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* emergency call-out banner */}
      {phone && (
        <section style={{ background: COPPER }}>
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-4 text-white sm:flex-row sm:px-8">
            <p className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-[0.1em]">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/70" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
              </span>
              Burst pipe or no heating? 24/7 emergency call-out
            </p>
            <a href={`tel:${phone}`} style={{ ...display, color: COPPER }} className="rounded-full bg-white px-6 py-2 text-sm font-bold tracking-[0.02em] transition hover:bg-white/90">Call {phone}</a>
          </div>
        </section>
      )}

      {/* intro / about split */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl shadow-[#102A43]/15" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-3xl" style={{ background: `linear-gradient(150deg, ${MIST}, ${AQUA}55)` }} />
            )}
            <span className="absolute -bottom-4 -right-4 flex h-20 w-20 items-center justify-center rounded-2xl text-white shadow-lg" style={{ background: WATER }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" aria-hidden><path d="M12 2.5c3.6 4.2 6.5 7.9 6.5 11.5a6.5 6.5 0 0 1-13 0C5.5 10.4 8.4 6.7 12 2.5z" /></svg>
            </span>
          </div>
          <div className="order-1 lg:order-2">
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl" {...editCopy(content, "home_about_heading", "Clean work, done right — first time")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em]" style={{ color: WATER }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
        </section>
      )}

      {/* why us — guarantee strip */}
      <section style={{ background: MIST }}>
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Kicker><span {...editCopy(content, "home_why_kicker", "Why choose us")} /></Kicker>
          <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" {...editCopy(content, "home_why_heading", "No mess, no surprises")} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {guarantees.map((g) => (
              <div key={g.t} className="rounded-3xl bg-white p-7 shadow-sm" style={{ border: "1px solid rgba(16,42,67,0.06)" }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl" style={{ background: NAVY }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={AQUA} strokeWidth="2.2" aria-hidden><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /><path d="m9 12 2 2 4-4" /></svg>
                </span>
                <h3 style={{ ...display, color: NAVY }} className="mt-5 text-lg font-bold tracking-tight">{g.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{g.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services — clean divider rows */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-24 sm:px-8">
          <Kicker><span {...editCopy(content, "home_svc_kicker", "What we do")} /></Kicker>
          <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" {...editCopy(content, "home_svc_heading", "Our services")} />
          <ul className="mt-10 divide-y" style={{ borderColor: "rgba(16,42,67,0.10)" }}>
            {services.slice(0, 8).map((s, i) => (
              <li key={s.id} className="group flex items-start justify-between gap-6 py-6">
                <div className="flex gap-5">
                  <span style={{ ...display, color: AQUA }} className="mt-0.5 text-sm font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-bold tracking-tight transition group-hover:text-[#2C8FE0]">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                </div>
                {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: WATER }}>{s.price}</p>}
              </li>
            ))}
          </ul>
          <div className="mt-10">{btnNavy("View all services", href("services"))}</div>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: NAVY }} className="relative">
          <WaterLine color={AQUA} className="absolute inset-x-0 top-0 h-5 w-full opacity-40" />
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
            <Kicker on="dark"><span {...editCopy(content, "home_work_kicker", "Recent jobs")} /></Kicker>
            <h2 style={display} className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl" {...editCopy(content, "home_work_heading", "Our work")} />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10"><a href={href("gallery")} className="inline-flex items-center justify-center rounded-full px-7 py-3.5 text-[13px] font-bold tracking-[0.01em] text-white transition hover:bg-white/10" style={{ border: "1.5px solid rgba(255,255,255,0.35)" }}>See more work</a></div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <Kicker><span {...editCopy(content, "home_areas_kicker", "Where we work")} /></Kicker>
          <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" {...editCopy(content, "home_areas_heading", "Areas we cover")} />
          <div className="mt-8 flex flex-wrap gap-3">
            {content.service_areas.map((a) => (
              <span key={a} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold" style={{ background: MIST, color: NAVY }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={WATER} strokeWidth="2" aria-hidden><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="3" /></svg>
                {a}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: NAVY2 }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${WATER}, transparent 70%)` }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 text-white sm:flex-row sm:items-center sm:px-8">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Need it sorted today?")} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/55" {...editCopy(content, "cta_sub", "Free, no-obligation quotes.")} />
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {btnCopper(ctaLabel, cta)}
            {phone && btnGlass(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
