import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CompassHeader } from "./CompassHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Compass — calm, trustworthy wealth & financial-planning firm. A sophisticated
// deep teal-green base with soft sage, warm cream and a single warm-gold accent;
// a generous, reassuring rhythm built around a compass-rose / planning-horizon
// motif. Built for financial advisers, chartered planners and wealth managers —
// a firm that leads with trust: FCA-regulated, independent / whole-of-market,
// chartered, free initial review, fiduciary. MULTI-PAGE: nav opens real routes
// (Services / About / Gallery / Contact) under basePath; the sticky header
// (transparent over the teal hero) and the deep-teal footer are shared.

const TEAL = "#14463E"; // deep teal-green — base / footer / dark sections
const TEAL_DEEP = "#0E332D"; // deeper teal for gradient depth
const SAGE = "#B9CBBF"; // soft sage — secondary tint
const SAGE_TINT = "#E7EDE8"; // pale sage panel on cream
const GOLD = "#C2A04C"; // warm gold accent
const CREAM = "#F4F0E7"; // cream page
const INK = "#1A211E"; // charcoal ink body
const MUTE = "#5A6862"; // muted body on cream
const LINE = "#D8D2C4"; // hairline on cream
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: light ? GOLD : "#9a8336" }}>
      <span className="inline-block h-px w-7" style={{ background: GOLD }} />
      {children}
    </p>
  );
}

// The planning-horizon signature: a calm gold line rising gently to the right
// over a faint sage field — "a steady upward path". Decorative; sits in the hero
// and reappears as a divider motif.
function HorizonLine({ className = "", stroke = GOLD }: { className?: string; stroke?: string }) {
  return (
    <svg viewBox="0 0 600 120" preserveAspectRatio="none" aria-hidden className={className} fill="none">
      <path d="M0 104 C 140 96, 230 70, 320 52 C 410 34, 500 20, 600 10" stroke={stroke} strokeWidth="2" strokeLinecap="round" />
      <circle cx="600" cy="10" r="4.5" fill={stroke} />
      <path d="M0 118 C 160 112, 260 100, 360 90 C 460 80, 540 74, 600 70" stroke={stroke} strokeWidth="1" opacity="0.35" />
    </svg>
  );
}

export default function CompassDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book a consultation";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Insights", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Trust signals lead everywhere — fall back to a sensible adviser set.
  const trust = content.accreditations && content.accreditations.length > 0
    ? content.accreditations
    : ["FCA regulated", "Independent · whole of market", "Chartered", "Fiduciary advice"];

  const btnGold = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[13px] font-semibold uppercase tracking-[0.12em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: GOLD, color: TEAL }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, onTeal = false) => (
    <a href={to} className="inline-flex rounded-full border px-7 py-3.5 text-center text-[13px] font-semibold uppercase tracking-[0.12em] transition" style={onTeal ? { borderColor: "#ffffff4d", color: CREAM } : { borderColor: TEAL, color: TEAL }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: TEAL }} className="text-[#e9efe9]">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden className="shrink-0">
              <circle cx="12" cy="12" r="10.5" fill="none" stroke={CREAM} strokeWidth="1" opacity="0.5" />
              <path d="M12 3.5 L13.5 10.5 L20.5 12 L13.5 13.5 L12 20.5 L10.5 13.5 L3.5 12 L10.5 10.5 Z" fill={GOLD} />
              <circle cx="12" cy="12" r="1.3" fill={CREAM} />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold tracking-[0.03em] text-[#f4f0e7]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trust.map((a) => (
              <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: "#ffffff26", color: "#cfe0d6" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:text-[#14463E]" style={{ border: "1px solid #ffffff26" }}>
                  <span className="transition hover:text-[#14463E]"><TradesSocialIcon kind={`${s.label} ${s.url}`} /></span>
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Firm</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Office hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff77" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="max-w-2xl text-white/45">{name} is authorised and regulated for the provision of financial advice. The value of investments can fall as well as rise.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body" >
      <CompassHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: TEAL }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 opacity-30">
        <HorizonLine className="absolute bottom-0 h-40 w-full" stroke={SAGE} />
      </div>
      <div className="relative mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={{ ...display, color: CREAM }} className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("How we help", "Advice for every stage of your financial life", "Considered, whole-of-market planning — clearly explained and built entirely around your goals.")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <div key={s.id} className="grid gap-3 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: GOLD }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-semibold" style={{ color: TEAL }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnGold(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About the firm", "Your future, planned with confidence")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...display, color: INK }} className="mt-12 text-2xl font-semibold">Who we work with</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: MUTE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-2xl p-7" style={{ background: SAGE_TINT, border: `1px solid ${LINE}` }}>
            <h4 style={{ ...display, color: "#9a8336" }} className="text-xs font-semibold uppercase tracking-[0.2em]">Why clients trust us</h4>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
              {trust.map((a) => (
                <li key={a} className="flex items-start gap-2.5"><span style={{ color: GOLD }}>◆</span><span>{a}</span></li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block">{content.email}</a>}
            </div>
            <div className="mt-6">{btnGold(ctaLabel, cta, true)}</div>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Book your free initial review", "A relaxed, no-obligation conversation about where you are and where you'd like to be.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold tracking-tight">Speak to an adviser</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#14463E]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#14463E]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#94a39b" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {trust.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: SAGE_TINT, color: TEAL }}>{a}</span>
              ))}
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
                bookingTitle="Book a consultation"
                bookingBlurb="Tell us a little about your plans and we'll arrange your free initial review."
                bookingCta="Request consultation"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: TEAL, blurb: MUTE, label: "#3c4f48", fieldBg: "#ffffff", fieldBorder: "#cbd6cf", fieldText: INK, button: GOLD, buttonText: TEAL, radius: "0.9rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- INSIGHTS / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Insights", "Perspectives & planning notes")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-8 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: MUTE }}>Coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const processSteps = [
    { t: "Discover", d: "We start by understanding your life, your priorities and what financial confidence looks like for you." },
    { t: "Plan", d: "We build a clear, whole-of-market plan — investments, pensions and protection working together." },
    { t: "Implement", d: "We put your plan into action, handling the detail and the paperwork on your behalf." },
    { t: "Review", d: "We meet regularly to keep your plan on course as markets, rules and your life evolve." },
  ];

  const helpAreas = [
    { t: "Retirement planning", d: "Plan the income to fund the life you want, for as long as you need it." },
    { t: "Investments", d: "A disciplined, diversified portfolio matched to your goals and comfort with risk." },
    { t: "Pensions", d: "Consolidate, optimise and make the most of your workplace and personal pensions." },
    { t: "Protection", d: "Safeguard your family and income against the unexpected, without overpaying." },
    { t: "Estate planning", d: "Pass on more of what you've built, with less tax and more certainty." },
    { t: "Tax planning", d: "Use allowances and structures wisely so your money works harder for you." },
  ];

  const stats = [
    { k: "£480m", v: "Assets advised" },
    services.length > 0 ? { k: `${services.length}`, v: "Planning services" } : { k: "25yrs", v: "Advising families" },
    { k: "600+", v: "Clients guided" },
  ];

  return shell(
    <>
      {/* hero — premium deep-teal with compass/horizon signature */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 80% 10%, ${TEAL} 0%, ${TEAL_DEEP} 70%)` }} />
        )}
        {(hero || content.hero_video_url) && (
          <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${TEAL_DEEP}f2 0%, ${TEAL_DEEP}d9 42%, ${TEAL_DEEP}59 100%)` }} />
        )}
        {/* horizon / planning-line signature */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 opacity-50">
          <HorizonLine className="h-full w-full" stroke={GOLD} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-28">
          <Kicker light>{trust[0]}</Kicker>
          <h1 style={{ ...display, color: CREAM }} className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.35)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Plan for the life you want."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/65">{name}</p>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">Independent, chartered financial planning — long-term advice that brings clarity, confidence and a clear path to your goals.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnGold(ctaLabel, cta)}
            {phone ? btnOutline(`Call ${phone}`, `tel:${phone}`, true) : btnOutline("Our services", href("services"), true)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/60">
            {trust.map((a) => <span key={a} className="flex items-center gap-2"><span style={{ color: GOLD }}>◆</span>{a}</span>)}
          </div>
        </div>
      </section>

      {/* trust strip — FCA / chartered band */}
      <section style={{ background: SAGE_TINT, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-6 text-center text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL }}>
          {trust.map((a) => (
            <span key={a} className="flex items-center gap-2.5"><span style={{ color: GOLD }}>◆</span>{a}</span>
          ))}
        </div>
      </section>

      {/* intro / about teaser */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_30px_80px_-44px_rgba(20,70,62,0.6)]" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-2xl" style={{ background: `linear-gradient(160deg, ${TEAL}, ${TEAL_DEEP})` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl" style={{ borderBottom: `3px solid ${GOLD}`, borderRight: `3px solid ${GOLD}` }} />
          </div>
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl">Calm, independent advice you can build a life around</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em]" style={{ color: "#9a8336" }}>More about the firm →</a>
          </div>
        </section>
      )}

      {/* how we help — services */}
      {services.length > 0 ? (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>How we help</Kicker>
                <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Our advice</h2>
              </div>
              <a href={href("services")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: "#9a8336" }}>All services →</a>
            </div>
            <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s, i) => (
                <div key={s.id} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: GOLD }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-semibold" style={{ color: TEAL }}>{s.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <Kicker>How we help</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Areas of advice</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3" style={{ background: LINE }}>
              {helpAreas.map((h) => (
                <div key={h.t} className="p-7" style={{ background: "#ffffff" }}>
                  <h3 style={{ ...display, color: INK }} className="text-lg font-semibold tracking-tight">{h.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{h.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* our advice process — 4 steps */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center"><Kicker>Our advice process</Kicker></div>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">A clear path, every step of the way</h2>
        </div>
        <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px lg:block" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}66, transparent)` }} />
          {processSteps.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold" style={{ background: TEAL, color: CREAM, ...display }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ ...display, color: INK }} className="mt-5 text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* stat band */}
      <section style={{ background: TEAL }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <HorizonLine className="absolute inset-x-0 bottom-0 h-40 w-full" stroke={SAGE} />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.v} className="text-center sm:text-left">
              <p style={{ ...display, color: GOLD }} className="text-4xl font-semibold tracking-tight sm:text-5xl">{s.k}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* insights strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>Insights</Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Perspectives</h2>
            </div>
            <a href={href("gallery")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: "#9a8336" }}>View all →</a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* closing consultation CTA */}
      <section style={{ background: SAGE_TINT, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-4xl px-8 py-24 text-center">
          <div className="flex justify-center"><Kicker>Free initial review</Kicker></div>
          <h2 style={{ ...display, color: TEAL }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s plan the next chapter together</h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: MUTE }}>Book a relaxed, no-obligation conversation. We&apos;ll listen first, then show you a clear path forward.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {btnGold(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
