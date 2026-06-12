import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AssuredHeader } from "./AssuredHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Assured — a dependable, premium independent insurance broker. A corporate
// register built on deep trust-blue with cool steel, cloud white and a single
// confident amber accent reserved for action (quotes, CTAs). The signature is a
// calm protective ARC — an umbrella / cover-you-can-count-on canopy — paired
// with a clean corporate shield mark; professional, never gimmicky. Distinct
// from Sentry's pest-control teal shield and Compass's teal-gold wealth firm.
// Leads with trust: FCA-regulated, whole-of-market, independent advice, we
// handle claims, decades of cover. Lives in the TRADES set (services + enquiry)
// but in a fully PROFESSIONAL register. MULTI-PAGE: nav opens real routes
// (Cover / About / Gallery / Contact) under basePath; the sticky header
// (transparent over the blue hero) and footer are shared.

const BLUE = "#173A6B"; // deep trust-blue — chrome, hero, headings on light
const BLUE_DEEP = "#102B50"; // deeper blue for gradient depth
const STEEL = "#5E7390"; // steel — secondary / muted on light
const AMBER = "#E6A537"; // confident amber accent
const CLOUD = "#F4F7FB"; // cloud-white page
const PANEL = "#E9EEF6"; // tinted cloud panel
const INK = "#14202E"; // charcoal ink body
const MUTE = "#54657A"; // muted slate body on light
const CLOUDMUTE = "#C3D0E2"; // muted cloud text on blue
const LINE = "#D7E0EC"; // hairline on cloud
const display = { fontFamily: "var(--font-space)" } as const;

// The cover signature: a calm protective arc (an umbrella / canopy) sheltering
// a small mark below it. Decorative; anchors the hero and reappears as a band
// motif. Professional and quiet — not a cartoon.
function CoverArc({ className = "", stroke = AMBER, opacity = 1 }: { className?: string; stroke?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden className={className} fill="none" style={{ opacity }}>
      <path d="M20 180 C 120 40, 480 40, 580 180" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M70 180 C 150 80, 450 80, 530 180" stroke={stroke} strokeWidth="1.25" opacity="0.5" />
      <path d="M300 36 V 96" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="300" cy="104" r="6" fill={stroke} />
    </svg>
  );
}

// Small corporate shield + tick — the repeating brand mark for kickers.
function ShieldMark({ size = 16, color = AMBER, stroke = 1.7 }: { size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={(size * 26) / 24} viewBox="0 0 24 26" fill="none" aria-hidden>
      <path d="M12 2 L21 5.4 V12 c0 6.3-3.9 10.2-9 12-5.1-1.8-9-5.7-9-12 V5.4 L12 2Z" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
      <path d="M8 13 l2.6 2.6 L16 9.8" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: light ? AMBER : BLUE }}>
      <ShieldMark size={15} stroke={1.9} />
      {children}
    </span>
  );
}

export default function AssuredDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    services.length > 0 && { label: "Cover", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Trust signals lead everywhere — fall back to a sensible broker set.
  const trust = content.accreditations && content.accreditations.length > 0
    ? content.accreditations
    : ["FCA regulated", "Whole of market", "Independent advice", "Claims support"];

  // The "what we cover" lines — derived from the catalog, with a sensible
  // default broker set so the band always reads complete.
  const coverFallback = ["Home", "Motor", "Business", "Landlord", "Health", "Travel"];

  const btnAmber = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[13px] font-bold uppercase tracking-[0.12em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: AMBER, color: BLUE }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, light = false) => (
    <a href={to} className="inline-flex rounded-full border px-7 py-3.5 text-center text-[13px] font-bold uppercase tracking-[0.12em] transition hover:bg-black/[0.04]" style={light ? { borderColor: "#ffffff59", color: CLOUD } : { borderColor: BLUE, color: BLUE }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: BLUE, borderTop: `3px solid ${AMBER}` }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <ShieldMark size={26} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[0.03em] text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: CLOUDMUTE }}>{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trust.map((a) => (
              <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: "#ffffff2b", color: CLOUDMUTE }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:text-white" style={{ border: "1px solid #ffffff2b" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: AMBER }} className="text-[11px] font-bold uppercase tracking-[0.22em]">Brokerage</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: CLOUDMUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: AMBER }} className="text-[11px] font-bold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: CLOUDMUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: AMBER }} className="text-[11px] font-bold uppercase tracking-[0.22em]">Office hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: CLOUDMUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: CLOUDMUTE }}>Mon–Fri, 9–5.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#ffffff77" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="max-w-2xl text-white/55">{name} is authorised and regulated by the Financial Conduct Authority. Your home may be repossessed if you do not keep up repayments on a mortgage.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CLOUD }} className="min-h-screen font-body">
      <AssuredHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: BLUE }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-64 opacity-25">
        <CoverArc className="h-full w-full" stroke={STEEL} />
      </div>
      <div className="relative mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={{ ...display, color: CLOUD }} className="mt-5 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">{title}</h1>
        {blurb && <p className="mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: CLOUDMUTE }}>{blurb}</p>}
      </div>
    </section>
  );

  // "What we cover" divider rows — clean, fine rules, name + desc left / price
  // right. No dotted leaders, no card panels.
  const coverList = (limit?: number) => (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {services.slice(0, limit ?? services.length).map((s, i) => (
        <li key={s.id} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
          <span style={{ ...display, color: AMBER }} className="text-sm font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: BLUE }} className="text-xl font-bold tracking-tight">{s.name}</h3>
            {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="text-sm font-bold" style={{ color: BLUE }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- COVER / SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we cover", "The right cover, expertly arranged", "From home and motor to business and landlord, we search the whole market to match you with cover that actually fits — and we are here when you need to claim.")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? coverList() : <p style={{ color: MUTE }}>Our cover options will be listed here shortly.</p>}
          <div className="mt-12">{btnAmber(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About the brokerage", "Independent advice you can rely on")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...display, color: INK }} className="mt-12 text-2xl font-bold tracking-tight">Who we look after</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: MUTE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-2xl p-7" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            <h4 style={{ ...display, color: BLUE }} className="text-xs font-bold uppercase tracking-[0.2em]">Why use a broker</h4>
            <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
              {trust.map((a) => (
                <li key={a} className="flex items-start gap-2.5"><span className="mt-0.5 shrink-0"><ShieldMark size={15} stroke={2} /></span><span>{a}</span></li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold" style={{ color: BLUE }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block">{content.email}</a>}
            </div>
            <div className="mt-6">{btnAmber(ctaLabel, cta, true)}</div>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Get a quote", "Tell us a little about what you need cover for and we'll search the whole market for the right policy at the right price.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: BLUE }} className="text-2xl font-bold tracking-tight">Speak to a broker</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#173A6B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#173A6B]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#90a0b5" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {trust.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.1em]" style={{ background: PANEL, color: BLUE }}>{a}</span>
              ))}
            </div>
            <p className="mt-8 max-w-xs text-xs leading-relaxed" style={{ color: MUTE }}>If you ever need to claim, we handle it for you — one call and we are on your side.</p>
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
                bookingTitle="Get a quote"
                bookingBlurb="Tell us what you'd like to cover and we'll come back with a tailored quote."
                bookingCta="Request quote"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: BLUE, blurb: MUTE, label: "#3a4c61", fieldBg: "#ffffff", fieldBorder: "#c6d2e2", fieldText: INK, button: AMBER, buttonText: BLUE, radius: "0.9rem", font: "var(--font-space)" }}
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
        {banner("Our brokerage", "A team you can count on")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-8 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" style={{ border: `1px solid ${LINE}` }} />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const whyBroker = [
    { t: "Whole of market", d: "We are independent — we search across leading insurers to find cover that genuinely fits you, not just the cheapest line." },
    { t: "We handle your claims", d: "If the worst happens, you deal with us, not a call centre. We manage your claim from first notification to settlement." },
    { t: "Personal service", d: "A named broker who knows your cover, reviews it each year and is on the end of the phone when you need answers." },
  ];

  const stats = [
    { k: "30+", v: "Years arranging cover" },
    services.length > 0 ? { k: `${String(services.length).padStart(2, "0")}`, v: "Lines of cover" } : { k: "100s", v: "Policies placed" },
    { k: "98%", v: "Claims supported" },
  ];

  return shell(
    <>
      {/* hero — confident corporate trust-blue with cover-arc signature */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 78% 8%, ${BLUE} 0%, ${BLUE_DEEP} 72%)` }} />
        )}
        {(hero || content.hero_video_url) && (
          <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${BLUE_DEEP}f5 0%, ${BLUE_DEEP}e0 44%, ${BLUE_DEEP}5c 100%)` }} />
        )}
        {/* protective cover-arc signature */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55%] opacity-40">
          <CoverArc className="h-full w-full" stroke={AMBER} opacity={0.85} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-28">
          <Kicker light>{trust[0]}</Kicker>
          <h1 style={{ ...display, color: CLOUD }} className="mt-5 max-w-3xl text-5xl font-bold leading-[1.04] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Cover you can count on."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/65">{name}</p>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/80">Independent, whole-of-market insurance broking — the right protection, expert advice and a real person on your side when you need to claim.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnAmber(ctaLabel, cta)}
            {phone ? btnOutline(`Call ${phone}`, `tel:${phone}`, true) : btnOutline("Our cover", href("services"), true)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-white/65">
            {trust.map((a) => <span key={a} className="flex items-center gap-2"><ShieldMark size={14} stroke={2} />{a}</span>)}
          </div>
        </div>
      </section>

      {/* FCA-regulated trust strip */}
      <section style={{ background: PANEL, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-6 text-center text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: BLUE }}>
          {trust.map((a) => (
            <span key={a} className="flex items-center gap-2.5"><ShieldMark size={15} stroke={2} />{a}</span>
          ))}
        </div>
      </section>

      {/* about teaser */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_30px_80px_-44px_rgba(16,43,80,0.6)]" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-2xl" style={{ background: `linear-gradient(160deg, ${BLUE}, ${BLUE_DEEP})` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl" style={{ borderBottom: `3px solid ${AMBER}`, borderRight: `3px solid ${AMBER}` }} />
          </div>
          <div>
            <Kicker>About the brokerage</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl">An independent broker that puts you first</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: BLUE }}>More about us →</a>
          </div>
        </section>
      )}

      {/* what we cover — divider rows */}
      {services.length > 0 ? (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>What we cover</Kicker>
                <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Cover for what matters</h2>
              </div>
              <a href={href("services")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: BLUE }}>All cover →</a>
            </div>
            <p className="mt-4 text-[15px]" style={{ color: MUTE }}>{coverFallback.join(" · ")}.</p>
            <div className="mt-12">{coverList(6)}</div>
          </div>
        </section>
      ) : (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <Kicker>What we cover</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Cover for what matters</h2>
            <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-3" style={{ background: LINE }}>
              {coverFallback.map((c) => (
                <div key={c} className="flex items-center gap-3 p-7" style={{ background: "#ffffff" }}>
                  <ShieldMark size={20} color={BLUE} />
                  <h3 style={{ ...display, color: INK }} className="text-lg font-bold tracking-tight">{c}</h3>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* why use a broker band */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center"><Kicker>Why use a broker</Kicker></div>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Advice on your side, not the insurer&apos;s</h2>
        </div>
        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-3" style={{ background: LINE }}>
          {whyBroker.map((c) => (
            <div key={c.t} className="p-8" style={{ background: CLOUD }}>
              <div className="flex h-12 w-12 items-center justify-center rounded-full" style={{ background: PANEL }}><ShieldMark size={22} color={BLUE} /></div>
              <h3 style={{ ...display, color: INK }} className="mt-5 text-xl font-bold tracking-tight">{c.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* stat band */}
      <section style={{ background: BLUE }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -bottom-16 h-56 opacity-30">
          <CoverArc className="h-full w-full" stroke={STEEL} />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.v} className="text-center sm:text-left">
              <p style={{ ...display, color: AMBER }} className="text-4xl font-bold tracking-tight sm:text-5xl">{s.k}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/65">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* claims-support reassurance band */}
      <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-8 py-20 lg:grid-cols-[auto_1fr] lg:gap-14">
          <div className="flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full" style={{ background: "#ffffff", border: `1px solid ${LINE}` }}>
              <ShieldMark size={44} color={BLUE} stroke={1.5} />
            </div>
          </div>
          <div>
            <Kicker>Here when you claim</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">We are with you when it matters most</h2>
            <p className="mt-4 max-w-2xl text-[16px] leading-relaxed" style={{ color: MUTE }}>A policy is only worth as much as the support behind it. When you need to claim, you speak to us — we know your cover, manage the process and fight your corner until it&apos;s settled fairly.</p>
            {phone && <div className="mt-7">{btnOutline(`Claims line · ${phone}`, `tel:${phone}`)}</div>}
          </div>
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>Our brokerage</Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">The people behind your cover</h2>
            </div>
            <a href={href("gallery")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: BLUE }}>View all →</a>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* get-a-quote CTA */}
      <section style={{ background: BLUE }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 -top-12 h-56 opacity-25">
          <CoverArc className="h-full w-full" stroke={AMBER} />
        </div>
        <div className="relative mx-auto max-w-4xl px-8 py-24 text-center">
          <div className="flex justify-center"><Kicker light>Get a quote</Kicker></div>
          <h2 style={{ ...display, color: CLOUD }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Let&apos;s find you the right cover</h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: CLOUDMUTE }}>Tell us what you need to protect. We&apos;ll search the whole market and come back with clear, no-obligation advice.</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {btnAmber(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`, true)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
