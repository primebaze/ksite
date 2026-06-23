import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { KeystoneHeader } from "./KeystoneHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Keystone — a warm, reassuring mortgage broker / mortgage adviser. The promise
// is simple: the keys to your new home. Warm slate-blue and cream with a
// terracotta accent (warmth / home) and a soft sage support tone; a homely-but-
// professional rhythm built around a keystone-arch / doorway / roofline + key
// signature. Built for advisers who lead with trust: FCA-regulated, whole-of-
// market, fee-free options, first-time-buyer friendly, thousands approved.
// MULTI-PAGE: nav opens real routes (Services / About / Gallery / Contact)
// under basePath; the sticky header (transparent over the slate hero) and the
// slate footer are shared. Tenant swaps in their own copy, services and logos.

const SLATE = "#2F4A63"; // warm slate-blue — base / hero / footer
const SLATE_DEEP = "#243A4E"; // deeper slate for gradient depth
const TERRA = "#D08158"; // terracotta accent — warmth / home
const SAGE = "#9DB3A0"; // sage support tone
const SAGE_TINT = "#E6EBE3"; // pale sage panel on cream
const CREAM = "#F4EEE3"; // warm cream page
const INK = "#1E2730"; // charcoal ink body
const MUTE = "#5E6A6B"; // muted body on cream
const LINE = "#DED6C6"; // hairline on cream
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: light ? TERRA : "#b06a40" }}>
      <span className="inline-block h-px w-7" style={{ background: TERRA }} />
      {children}
    </p>
  );
}

// The Keystone signature — a keystone arch / doorway / roofline, large and calm,
// cradling a key. Decorative; anchors the hero and reappears as a quiet motif.
function ArchMotif({ className = "", stroke = TERRA, keyStroke = CREAM }: { className?: string; stroke?: string; keyStroke?: string }) {
  return (
    <svg viewBox="0 0 200 200" aria-hidden className={className} fill="none">
      {/* roofline */}
      <path d="M22 78 L100 22 L178 78" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.7" />
      {/* doorway / keystone arch */}
      <path d="M48 178 V112 a52 52 0 0 1 104 0 V178" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
      {/* keystone block at the apex */}
      <path d="M88 70 L112 70 L118 92 L82 92 Z" stroke={stroke} strokeWidth="2" strokeLinejoin="round" opacity="0.85" />
      {/* key */}
      <circle cx="100" cy="120" r="13" stroke={keyStroke} strokeWidth="2.5" />
      <path d="M100 133 V164 M100 150 h13 M100 158 h10" stroke={keyStroke} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

export default function KeystoneDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book a free chat";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Stories", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Trust signals lead everywhere — fall back to a sensible broker set.
  const trust = content.accreditations && content.accreditations.length > 0
    ? content.accreditations
    : ["FCA regulated", "Whole of market", "Fee-free options", "First-time-buyer friendly"];

  const btnTerra = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[13px] font-semibold uppercase tracking-[0.1em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: TERRA, color: CREAM }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, onSlate = false) => (
    <a href={to} className="inline-flex rounded-full border px-7 py-3.5 text-center text-[13px] font-semibold uppercase tracking-[0.1em] transition hover:opacity-90" style={onSlate ? { borderColor: "#ffffff55", color: CREAM } : { borderColor: SLATE, color: SLATE }}>
      {label}
    </a>
  );

  // Default "what we do" list — used only when the tenant has no catalog yet.
  const helpAreas = [
    { t: "First-time buyers", d: "Step-by-step guidance from deposit to keys — jargon-free, and we'll find the lenders right for you." },
    { t: "Remortgages", d: "Coming to the end of a deal? We'll compare the whole market so you never slip onto the standard rate." },
    { t: "Buy-to-let", d: "Landlord and portfolio mortgages, including limited-company and specialist lending." },
    { t: "Moving home", d: "Porting, upsizing or relocating — we handle the numbers so you can focus on the move." },
    { t: "Self-employed", d: "One year of accounts, contractors, day-rate or company directors — we know who says yes." },
    { t: "Protection", d: "Life, income and critical-illness cover, sized sensibly so your home is protected whatever happens." },
  ];

  const steps = [
    { t: "Chat", d: "A relaxed, no-obligation conversation about your plans, your budget and what's possible — in person, by phone or video." },
    { t: "Compare", d: "We search the whole market and present the right mortgage clearly, with the costs and trade-offs explained." },
    { t: "Complete", d: "We handle the application, chase the lender and keep you updated right through to the keys in your hand." },
  ];

  const footer = (
    <footer style={{ background: SLATE }} className="text-[#eef2ec]">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <ArchMotif className="h-9 w-9 shrink-0" stroke={TERRA} keyStroke={CREAM} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold tracking-[0.02em] text-[#f4eee3]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {trust.map((a) => (
              <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ borderColor: "#ffffff26", color: "#d8e1d8" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:text-[#D08158]" style={{ border: "1px solid #ffffff26" }}>
                  <TradesSocialIcon kind={`${s.label} ${s.url}`} />
                </a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45" {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Evenings &amp; weekends by appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff77" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="max-w-2xl text-white/45">Your home may be repossessed if you do not keep up repayments on your mortgage. {name} is authorised and regulated for mortgage advice.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <KeystoneHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, blurb?: string, blurbKey?: string) => (
    <section style={{ background: SLATE }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-72 w-72 -translate-y-1/2 opacity-25 sm:block">
        <ArchMotif className="h-full w-full" stroke={SAGE} keyStroke={CREAM} />
      </div>
      <div className="relative mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...display, color: CREAM }} className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {blurb && blurbKey && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70" {...editCopy(content, blurbKey, blurb)} />}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Mortgage advice for every move", "svc_title", "From your very first home to your next buy-to-let — whole-of-market advice, clearly explained, with your interests first.", "svc_blurb")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <div key={s.id} className="grid gap-3 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: TERRA }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-semibold" style={{ color: SLATE }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : (
            <div className="divide-y" style={{ borderColor: LINE }}>
              {helpAreas.map((h, i) => (
                <div key={h.t} className="grid gap-3 py-8 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: TERRA }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{h.t}</h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{h.d}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-12">{btnTerra(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "about_kicker", "Friendly experts, on your side", "about_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...display, color: INK }} className="mt-12 text-2xl font-semibold" {...editCopy(content, "about_where_heading", "Where we help")} />
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: MUTE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-2xl p-7" style={{ background: SAGE_TINT, border: `1px solid ${LINE}` }}>
            <h4 style={{ ...display, color: "#b06a40" }} className="text-xs font-semibold uppercase tracking-[0.2em]" {...editCopy(content, "about_trust_heading", "Why buyers trust us")} />
            <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
              {trust.map((a) => (
                <li key={a} className="flex items-start gap-2.5"><KeyTick /><span>{a}</span></li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block">{content.email}</a>}
            </div>
            <div className="mt-6">{btnTerra(ctaLabel, cta, true)}</div>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "contact_kicker", "Book your free chat", "contact_title", "A relaxed, no-obligation conversation — tell us where you're at and we'll show you what's possible.", "contact_blurb")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold tracking-tight" {...editCopy(content, "contact_form_heading", "Talk to an adviser")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2F4A63]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2F4A63]">{content.email}</a>}
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
                <span key={a} className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em]" style={{ background: SAGE_TINT, color: SLATE }}>{a}</span>
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
                bookingTitle="Book a free chat"
                bookingBlurb="Tell us a little about your plans and we'll arrange a relaxed, no-obligation chat."
                bookingCta="Request my chat"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: SLATE, blurb: MUTE, label: "#46586a", fieldBg: "#ffffff", fieldBorder: "#d3cab9", fieldText: INK, button: TERRA, buttonText: CREAM, radius: "0.9rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- STORIES / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Stories", "gallery_kicker", "Homes we've helped open", "gallery_title")}
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
  const stats = [
    { k: "1000s", v: "Mortgages approved" },
    services.length > 0 ? { k: `${services.length}`, v: "Ways we help" } : { k: "90+", v: "Lenders searched" },
    { k: "Fee-free", v: "Options available" },
  ];

  return shell(
    <>
      {/* hero — warm slate-blue with the keystone-arch + key signature */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 95% at 78% 12%, ${SLATE} 0%, ${SLATE_DEEP} 72%)` }} />
        )}
        {(hero || content.hero_video_url) && (
          <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${SLATE_DEEP}f2 0%, ${SLATE_DEEP}d9 44%, ${SLATE_DEEP}59 100%)` }} />
        )}
        {/* keystone-arch / doorway signature, large and calm on the right */}
        <div className="pointer-events-none absolute -right-12 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 opacity-45 lg:block">
          <ArchMotif className="h-full w-full" stroke={TERRA} keyStroke={CREAM} />
        </div>
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-28">
          <Kicker light>{trust[0]}</Kicker>
          <h1 style={{ ...display, color: CREAM }} className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.04] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.32)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "The keys to your new home."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/65">{name}</p>
          <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">Warm, expert mortgage advice for first-time buyers, home-movers and remortgages — whole of market, with someone in your corner from first chat to the keys in your hand.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnTerra(ctaLabel, cta)}
            {phone ? btnOutline(`Call ${phone}`, `tel:${phone}`, true) : btnOutline("How we help", href("services"), true)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.1em] text-white/60">
            {trust.map((a) => <span key={a} className="flex items-center gap-2"><KeyTick light />{a}</span>)}
          </div>
        </div>
      </section>

      {/* FCA-regulated trust strip */}
      <section style={{ background: SAGE_TINT, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-6 text-center text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: SLATE }}>
          {trust.map((a) => (
            <span key={a} className="flex items-center gap-2.5"><KeyTick /><span>{a}</span></span>
          ))}
        </div>
      </section>

      {/* intro / about teaser */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_30px_80px_-44px_rgba(47,74,99,0.6)]" />
            ) : (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl" style={{ background: `linear-gradient(160deg, ${SLATE}, ${SLATE_DEEP})` }}>
                <ArchMotif className="absolute inset-0 m-auto h-2/3 w-2/3 opacity-40" stroke={SAGE} keyStroke={CREAM} />
              </div>
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl" style={{ borderBottom: `3px solid ${TERRA}`, borderRight: `3px solid ${TERRA}` }} />
          </div>
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold leading-[1.1] tracking-tight sm:text-4xl" {...editCopy(content, "home_about_heading", "Warm, expert advice — never any pressure")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: "#b06a40" }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
        </section>
      )}

      {/* what we do — services list (clean divide-y rows) */}
      {services.length > 0 ? (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker><span {...editCopy(content, "home_services_kicker", "What we do")} /></Kicker>
                <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl" {...editCopy(content, "home_services_heading", "How we help")} />
              </div>
              <a href={href("services")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: "#b06a40" }} {...editCopy(content, "home_services_link", "All services →")} />
            </div>
            <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s, i) => (
                <div key={s.id} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: TERRA }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-semibold" style={{ color: SLATE }}>{s.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_help_kicker", "What we do")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl" {...editCopy(content, "home_help_heading", "How we help")} />
            <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {helpAreas.map((h, i) => (
                <div key={h.t} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: TERRA }} className="text-sm font-semibold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight">{h.t}</h3>
                    <p className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{h.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* how it works — Chat → Compare → Complete */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center"><Kicker><span {...editCopy(content, "home_how_kicker", "How it works")} /></Kicker></div>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl" {...editCopy(content, "home_how_heading", "Three calm steps to your keys")} />
        </div>
        <div className="relative mt-14 grid gap-8 sm:grid-cols-3">
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px sm:block" style={{ background: `linear-gradient(90deg, transparent, ${TERRA}66, transparent)` }} />
          {steps.map((s, i) => (
            <div key={s.t} className="relative">
              <div className="flex h-14 w-14 items-center justify-center rounded-full text-base font-semibold" style={{ background: SLATE, color: CREAM, ...display }}>{String(i + 1).padStart(2, "0")}</div>
              <h3 style={{ ...display, color: INK }} className="mt-5 text-xl font-semibold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* fee-free / whole-of-market reassurance band */}
      <section style={{ background: SLATE }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 top-1/2 hidden h-72 w-72 -translate-y-1/2 opacity-25 sm:block">
          <ArchMotif className="h-full w-full" stroke={SAGE} keyStroke={CREAM} />
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-8 py-20 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Kicker light><span {...editCopy(content, "home_market_kicker", "Whole of market")} /></Kicker>
            <h2 style={{ ...display, color: CREAM }} className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl" {...editCopy(content, "home_market_heading", "Fee-free options and lenders the high street can't reach")} />
            <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">We search the whole market — including specialist lenders for the self-employed, first-time buyers and trickier cases — and we&apos;ll always tell you up front exactly how we&apos;re paid.</p>
            <div className="mt-8">{btnTerra(ctaLabel, cta)}</div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.v}>
                <p style={{ ...display, color: TERRA }} className="text-3xl font-semibold tracking-tight sm:text-4xl">{s.k}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/65">{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stories strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker><span {...editCopy(content, "home_stories_kicker", "Stories")} /></Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl" {...editCopy(content, "home_stories_heading", "Homes we've helped open")} />
            </div>
            <a href={href("gallery")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: "#b06a40" }} {...editCopy(content, "home_stories_link", "View all →")} />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* closing free-chat CTA */}
      <section style={{ background: SAGE_TINT, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-4xl px-8 py-24 text-center">
          <div className="flex justify-center"><Kicker><span {...editCopy(content, "cta_kicker", "Free, no-obligation")} /></Kicker></div>
          <h2 style={{ ...display, color: SLATE }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Let's get you the keys")} />
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: MUTE }}>Book a relaxed chat with a friendly adviser. We&apos;ll listen first, then show you a clear, achievable path to your new home.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {btnTerra(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}

// Small key-shaped tick used in place of a bullet across the trust lists — keeps
// the "keys to your home" motif present even at body scale.
function KeyTick({ light = false }: { light?: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden className="mt-0.5 shrink-0" style={{ color: light ? TERRA : "#b06a40" }}>
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 11 L19 19 M16 16 l2.5 -2.5 M18.5 18.5 l2 -2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
