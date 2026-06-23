import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PennyHeader } from "./PennyHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Penny — a friendly, approachable bookkeeping & small-business finance-admin
// service. Fresh mint-green with a warm coral accent over soft butter and an
// off-white page, rounded shapes and a reassuring, jargon-free voice. Built for
// small businesses, sole traders and start-ups: books sorted, stress-free, more
// time for the work they love. Signature motif: a tidy stack of coins, neat
// ledger ticks and a clean receipt — "your books, beautifully sorted". Leads
// with trust: Xero & QuickBooks certified, AAT-qualified, fixed monthly fees,
// free no-obligation consultation. MULTI-PAGE: nav opens real routes (Services /
// About / Gallery / Contact) under basePath; the sticky header (transparent over
// the mint hero) and the deep teal-ink footer are shared. Distinct from Ledger's
// corporate navy and Compass's teal-gold wealth feel — this owns the friendly
// mint + coral + butter small-business register.

const MINT = "#2BB78A"; // fresh mint-green — primary
const MINT_DEEP = "#1F9C75"; // deeper mint for gradient depth / hovers
const CORAL = "#FF7A5C"; // warm coral accent
const BUTTER = "#FCEFD6"; // soft butter panels
const INK = "#1B3B36"; // deep teal-ink — text / footer
const OFFWHITE = "#F6FBF8"; // off-white page
const MUTE = "#5B6F69"; // muted body on light
const LINE = "#DCEAE3"; // soft hairline
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: light ? "#ffffff" : MINT_DEEP }}>
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: CORAL }} />
      {children}
    </p>
  );
}

// The signature: a tidy stack of coins with a neat ledger tick — "books sorted".
// Decorative; sits in the hero corner and reappears as a quiet motif.
function CoinTick({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden className={className} fill="none">
      <ellipse cx="46" cy="86" rx="34" ry="11" fill={BUTTER} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="46" cy="74" rx="34" ry="11" fill={MINT} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="46" cy="62" rx="34" ry="11" fill={BUTTER} stroke={INK} strokeWidth="2.5" />
      <ellipse cx="46" cy="50" rx="34" ry="11" fill={MINT} stroke={INK} strokeWidth="2.5" />
      <circle cx="92" cy="40" r="22" fill={CORAL} stroke={INK} strokeWidth="2.5" />
      <path d="M83 40l6 6 12-13" stroke="#ffffff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PennyDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a free quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Friendly trust signals lead everywhere — fall back to a sensible bookkeeping set.
  const trust = content.accreditations && content.accreditations.length > 0
    ? content.accreditations
    : ["Xero certified", "QuickBooks certified", "AAT qualified", "Fixed monthly fees"];

  const btnCoral = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[14px] font-bold transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: CORAL, color: "#ffffff" }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, onMint = false) => (
    <a href={to} className="inline-flex rounded-full border-2 px-7 py-3.5 text-center text-[14px] font-bold transition hover:bg-white/10" style={onMint ? { borderColor: "#ffffff66", color: "#ffffff" } : { borderColor: INK, color: INK }}>
      {label}
    </a>
  );

  const steps = [
    { t: "Say hello", d: "Book a free, friendly chat. We'll get to know your business and exactly what you need — no jargon, no pressure." },
    { t: "We sort your books", d: "We take the receipts, invoices and admin off your plate and keep everything tidy, accurate and up to date." },
    { t: "You relax & grow", d: "Get clear monthly figures and more time for the work you love, knowing your finances are in safe hands." },
  ];

  const footer = (
    <footer style={{ background: INK }} className="text-[#e6f1ec]">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: MINT, color: OFFWHITE }} aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9" /><path d="M8.5 12.5l2.5 2.5 4.5-5" /></svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[-0.01em] text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trust.map((a) => (
              <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ borderColor: "#ffffff26", color: "#cfe5db" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-[#2BB78A] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Say hello</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Mon–Fri, 9–5.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff77" }}>
        <p>© {new Date().getFullYear()} {name}. Friendly bookkeeping for small businesses.</p>
        {content.accreditations && content.accreditations.length > 0 && (
          <p className="text-white/45">{content.accreditations.join(" · ")}</p>
        )}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE }} className="min-h-screen font-body">
      <PennyHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, blurb?: string, blurbKey?: string) => (
    <section style={{ background: `linear-gradient(150deg, ${MINT} 0%, ${MINT_DEEP} 100%)` }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-6 bottom-0 w-44 opacity-90 sm:w-56">
        <CoinTick className="h-full w-full" />
      </div>
      <div className="relative mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...display, color: "#ffffff" }} className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-[-0.01em] sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/80" {...editCopy(content, blurbKey ?? "", blurb)} />}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Everything to keep your books sorted", "svc_title", "Friendly, jargon-free finance admin — clearly priced and built around your small business.", "svc_blurb")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <div key={s.id} className="grid gap-3 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: CORAL }} className="text-sm font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-[-0.01em]">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-bold" style={{ color: MINT_DEEP }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnCoral(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Hello there", "about_kicker", "The friendly face behind your figures", "about_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...display, color: INK }} className="mt-12 text-2xl font-bold tracking-[-0.01em]" {...editCopy(content, "about_help_heading", "Who we help")} />
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: MUTE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-3xl p-7" style={{ background: BUTTER, border: `1px solid ${LINE}` }}>
            <h4 style={{ ...display, color: MINT_DEEP }} className="text-xs font-bold uppercase tracking-[0.18em]" {...editCopy(content, "about_love_heading", "Why clients love us")} />
            <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
              {trust.map((a) => (
                <li key={a} className="flex items-start gap-2.5"><span style={{ color: CORAL }}>✓</span><span>{a}</span></li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: "#e7d7b8", color: MUTE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block">{content.email}</a>}
            </div>
            <div className="mt-6">{btnCoral(ctaLabel, cta, true)}</div>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's chat", "contact_kicker", "Get a free quote", "contact_title", "Tell us a little about your business and we'll come back with a friendly, fixed-fee quote.", "contact_blurb")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-[-0.01em]" {...editCopy(content, "contact_heading", "Say hello")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2BB78A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2BB78A]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#9bb0a7" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {trust.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ background: BUTTER, color: INK }}>{a}</span>
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
                bookingTitle="Get a free quote"
                bookingBlurb="Tell us about your business and we'll send a friendly, fixed-fee quote — no obligation."
                bookingCta="Request my quote"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: MUTE, label: "#3f534d", fieldBg: OFFWHITE, fieldBorder: "#cbded4", fieldText: INK, button: CORAL, buttonText: "#ffffff", radius: "1rem", font: "var(--font-space)" }}
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
        {banner("A peek behind the books", "gallery_kicker", "Our gallery", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-8 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const pricePoint = services.find((s) => s.price)?.price;

  return shell(
    <>
      {/* hero — friendly mint/off-white with the coin-tick signature */}
      <section className="relative isolate overflow-hidden" style={{ background: `linear-gradient(160deg, ${MINT} 0%, ${MINT_DEEP} 78%)` }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `radial-gradient(circle, #ffffff 1.5px, transparent 1.5px)`, backgroundSize: "26px 26px" }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:pb-28">
          <div>
            <Kicker light>{trust[0] ?? "Friendly bookkeeping"}</Kicker>
            <h1 style={{ ...display, color: "#ffffff" }} className="mt-5 max-w-2xl text-5xl font-bold leading-[1.02] tracking-[-0.02em] [text-shadow:0_2px_24px_rgba(0,0,0,0.18)] sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Your books, beautifully sorted."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.2em] text-white/70">{name}</p>
            <p className="mt-5 max-w-md text-[17px] leading-relaxed text-white/85">Stress-free bookkeeping for small businesses & sole traders. We sort the numbers, so you get more time for the work you love.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnCoral(ctaLabel, cta)}
              {phone ? btnOutline(`Call ${phone}`, `tel:${phone}`, true) : btnOutline("See our services", href("services"), true)}
            </div>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/70">
              {trust.map((a) => <span key={a} className="flex items-center gap-2"><span style={{ color: BUTTER }}>✓</span>{a}</span>)}
            </div>
          </div>
          <div className="relative">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_80px_-40px_rgba(0,0,0,0.4)]" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2rem] p-10" style={{ background: OFFWHITE }}>
                <CoinTick className="h-full w-full" />
              </div>
            )}
            <span className="pointer-events-none absolute -bottom-4 -left-4 hidden h-20 w-20 rounded-2xl sm:block" style={{ background: CORAL }} />
          </div>
        </div>
      </section>

      {/* software / trust strip — Xero & QuickBooks certified */}
      <section style={{ background: BUTTER, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-9 gap-y-3 px-8 py-6 text-center text-[13px] font-bold uppercase tracking-[0.12em]" style={{ color: INK }}>
          <span className="text-[11px] font-semibold tracking-[0.16em]" style={{ color: MUTE }}>Certified in</span>
          {(content.accreditations && content.accreditations.length > 0 ? content.accreditations : ["Xero", "QuickBooks", "FreeAgent", "AAT qualified"]).map((a) => (
            <span key={a} className="flex items-center gap-2"><span style={{ color: CORAL }}>✓</span>{a}</span>
          ))}
        </div>
      </section>

      {/* what we do — services list */}
      {services.length > 0 ? (
        <section className="mx-auto max-w-5xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker><span {...editCopy(content, "home_svc_kicker", "What we do")} /></Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "home_svc_heading", "Everything to keep you sorted")} />
            </div>
            <a href={href("services")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: MINT_DEEP }} {...editCopy(content, "home_svc_link", "All services →")} />
          </div>
          <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
            {services.slice(0, 6).map((s, i) => (
              <div key={s.id} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                <span style={{ ...display, color: CORAL }} className="text-sm font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-[-0.01em]">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                </div>
                {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-bold" style={{ color: MINT_DEEP }}>{s.price}</p>}
              </div>
            ))}
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-5xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_svc_empty_kicker", "What we do")} /></Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "home_svc_empty_heading", "Everything to keep you sorted")} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-3" style={{ background: LINE }}>
            {["Bookkeeping", "VAT returns", "Payroll", "Self-assessment", "Invoicing", "Management accounts"].map((t) => (
              <div key={t} className="flex items-center gap-3 p-7" style={{ background: "#ffffff" }}>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm" style={{ background: BUTTER, color: MINT_DEEP }}>✓</span>
                <h3 style={{ ...display, color: INK }} className="text-lg font-bold tracking-[-0.01em]">{t}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about teaser */}
      {content.about && (
        <section style={{ background: BUTTER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_80px_-44px_rgba(27,59,54,0.4)]" />
              ) : (
                <div className="aspect-[4/5] w-full rounded-[2rem] p-10" style={{ background: OFFWHITE }}>
                  <CoinTick className="h-full w-full" />
                </div>
              )}
              <span className="pointer-events-none absolute -bottom-4 -right-4 hidden h-20 w-20 rounded-2xl sm:block" style={{ background: MINT }} />
            </div>
            <div>
              <Kicker><span {...editCopy(content, "home_about_kicker", "Hello there")} /></Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold leading-[1.1] tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "home_about_heading", "Friendly, jargon-free finance on your side")} />
              <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[14px] font-bold" style={{ color: MINT_DEEP }} {...editCopy(content, "home_about_link", "More about us →")} />
            </div>
          </div>
        </section>
      )}

      {/* pricing band — fixed monthly fees */}
      <section style={{ background: `linear-gradient(150deg, ${MINT} 0%, ${MINT_DEEP} 100%)` }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-6 -bottom-6 w-48 opacity-90">
          <CoinTick className="h-full w-full" />
        </div>
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <Kicker light><span {...editCopy(content, "home_pricing_kicker", "Simple pricing")} /></Kicker>
            <h2 style={{ ...display, color: "#ffffff" }} className="mt-4 text-3xl font-bold tracking-[-0.01em] sm:text-4xl">Fixed monthly fees{pricePoint ? <> from <span style={{ color: BUTTER }}>{pricePoint}</span></> : <> — no surprises</>}</h2>
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/80" {...editCopy(content, "home_pricing_sub", "One simple monthly price. No hidden costs, no hourly billing — just tidy books and total peace of mind.")} />
          </div>
          <div className="shrink-0">{btnCoral("Get a free quote", cta)}</div>
        </div>
      </section>

      {/* how it works — 3 friendly steps */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center"><Kicker><span {...editCopy(content, "home_steps_kicker", "How it works")} /></Kicker></div>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "home_steps_heading", "Getting sorted is easy")} />
        </div>
        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.t} className="rounded-3xl p-8" style={{ background: i === 1 ? BUTTER : "#ffffff", border: `1px solid ${LINE}` }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full text-base font-bold" style={{ background: CORAL, color: "#ffffff", ...display }}>{i + 1}</div>
              <h3 style={{ ...display, color: INK }} className="mt-5 text-xl font-bold tracking-[-0.01em]">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 pb-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker><span {...editCopy(content, "home_gallery_kicker", "A peek behind the books")} /></Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "home_gallery_heading", "Our gallery")} />
            </div>
            <a href={href("gallery")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: MINT_DEEP }} {...editCopy(content, "home_gallery_link", "View all →")} />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* closing free-quote CTA */}
      <section style={{ background: BUTTER, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-4xl px-8 py-24 text-center">
          <div className="flex justify-center"><Kicker><span {...editCopy(content, "cta_kicker", "Free, no-obligation")} /></Kicker></div>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "cta_heading", "Ready to get your books sorted?")} />
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "cta_sub", "Book a friendly, no-pressure chat. We'll listen first, then show you exactly how we can help — and what it'll cost.")} />
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {btnCoral(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
