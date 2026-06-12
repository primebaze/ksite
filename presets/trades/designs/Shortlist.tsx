import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ShortlistHeader } from "./ShortlistHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Shortlist — modern, human, specialist recruitment-agency design. Confident
// indigo with a warm coral accent and fresh mint highlights, an off-white canvas
// and charcoal ink, rounded geometric sans display. People-focused and dual-
// audience: it speaks to employers ("hire") and candidates ("get hired") at once.
// The structural signature is a connect / two-paths / people-dot motif — paths
// meeting in the hero, a two-audience split, a placements stat band and a
// Brief → Search → Shortlist → Placement process. Built for recruiters, search &
// staffing agencies, talent partners. MULTI-PAGE: nav opens real routes (Sectors
// / About / Stories / Contact) under basePath; the sticky header + indigo footer
// are shared. Tenant swaps in their own copy, sectors, stats and accreditations.

const INDIGO = "#2A2E7A"; // confident brand indigo
const CORAL = "#FB6E5C"; // warm coral accent
const MINT = "#6FD3A6"; // fresh mint highlight
const OFF = "#F6F6FB"; // off-white canvas
const INK = "#181A2E"; // charcoal ink
const SLATE = "#5b5e7e"; // muted body on light
const LINE = "#e6e6f1"; // hairlines on light
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: light ? MINT : CORAL }}>
      <span className="inline-flex items-center gap-1" aria-hidden>
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: light ? MINT : CORAL }} />
        <span className="inline-block h-px w-4" style={{ background: light ? "rgba(111,211,166,0.6)" : "rgba(251,110,92,0.5)" }} />
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: light ? "#ffffff" : INDIGO }} />
      </span>
      {children}
    </p>
  );
}

// The signature "connect" mark: two people-dots joined by a meeting path.
function ConnectMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <path d="M8 20 C 44 20, 44 60, 60 60 C 76 60, 76 100, 112 100" stroke={CORAL} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" opacity="0.85" />
      <path d="M8 100 C 44 100, 44 60, 60 60 C 76 60, 76 20, 112 20" stroke={MINT} strokeWidth="2.5" strokeLinecap="round" strokeDasharray="1 7" opacity="0.85" />
      <circle cx="8" cy="20" r="6" fill={CORAL} />
      <circle cx="8" cy="100" r="6" fill={MINT} />
      <circle cx="112" cy="20" r="6" fill={MINT} />
      <circle cx="112" cy="100" r="6" fill={CORAL} />
      <circle cx="60" cy="60" r="8" fill="#ffffff" />
      <circle cx="60" cy="60" r="3.5" fill={INDIGO} />
    </svg>
  );
}

export default function ShortlistDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get in touch";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Sectors", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Stories", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const pill = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[13px] font-bold tracking-wide text-white transition hover:brightness-105 ${full ? "block w-full" : "inline-flex items-center justify-center"}`} style={{ background: CORAL }}>{label}</a>
  );
  const pillGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-7 py-3.5 text-center text-[13px] font-bold tracking-wide transition hover:bg-white/10 ${full ? "block w-full" : "inline-flex items-center justify-center"}`} style={{ borderColor: "rgba(255,255,255,0.35)", color: "#ffffff" }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: INDIGO }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="relative inline-flex h-7 w-7 items-center justify-center" aria-hidden>
              <span className="absolute inline-block h-2.5 w-2.5 rounded-full" style={{ background: CORAL, transform: "translate(-4px,-3px)" }} />
              <span className="absolute inline-block h-2.5 w-2.5 rounded-full" style={{ background: MINT, transform: "translate(4px,3px)" }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[-0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75" style={{ borderColor: "rgba(255,255,255,0.22)" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white" style={{ border: "1px solid rgba(255,255,255,0.22)" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Agency</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/50">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Mon–Fri, 8.30–6.00.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.14)", color: "rgba(255,255,255,0.55)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-semibold tracking-wide transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFF }} className="min-h-screen font-body">
      <ShortlistHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: INDIGO }} className="relative overflow-hidden text-white">
      <ConnectMark className="pointer-events-none absolute -right-10 top-6 hidden h-64 w-64 opacity-40 sm:block" />
      <div className="relative mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl">{title}</h1>
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/75">{blurb}</p>}
      </div>
    </section>
  );

  // ---- SECTORS / SERVICES ---- (clean divide-y rows; no cards, no dotted leaders)
  if (page === "services") {
    return shell(
      <>
        {banner("Sectors we recruit for", "Specialists across the roles that matter", "Deep expertise in the markets we know best — for the people who build them and the teams who need them.")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <div key={s.id} className="grid gap-3 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: CORAL }} className="text-sm font-bold tracking-wide">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-[-0.01em] sm:text-2xl">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-bold" style={{ color: INDIGO }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: SLATE }}>Sectors coming soon.</p>}
          <div className="mt-12">{pill(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "People-first recruitment, done properly")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Members &amp; accreditations</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[12px] font-bold" style={{ borderColor: `${INDIGO}33`, color: INDIGO }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Where we work</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{pill(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's talk", "Hire great people — or find your next role", "Whether you're building a team or planning your next move, we'd love to hear from you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-[-0.01em]">Talk to the team</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2A2E7A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2A2E7A]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#9a9cbb" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border-2 px-6 py-3 text-sm font-bold transition hover:bg-[#f0f0f8]" style={{ borderColor: LINE, color: INDIGO }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Hire or get hired"
                bookingBlurb="Tell us who you're looking for, or where you'd like to go next."
                bookingCta="Send enquiry"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SLATE, label: "#4a4d6e", fieldBg: "#ffffff", fieldBorder: "#d8d8ea", fieldText: INK, button: CORAL, buttonText: "#ffffff", radius: "0.9rem", font: "var(--font-space)" }}
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
        {banner("Success stories", "People we've placed, teams we've built")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: SLATE }}>Stories coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    services.length > 0 && { k: `${services.length}`, v: "Specialist sectors" },
    content.service_areas && content.service_areas.length > 0 && { k: `${content.service_areas.length}`, v: "Markets covered" },
    content.accreditations && content.accreditations.length > 0 && { k: content.accreditations.length.toString().padStart(2, "0"), v: "Accreditations" },
  ].filter(Boolean) as { k: string; v: string }[];

  const placements = [
    { k: "2,400+", v: "Roles filled" },
    { k: "21", v: "Avg. days to hire" },
    { k: "94%", v: "12-month retention" },
  ];

  const audiences = [
    { tag: "For employers", color: CORAL, title: "Hire with confidence", body: "Pre-qualified shortlists, sector specialists and a process that respects your time — so you meet the right people, faster.", points: ["Targeted, headhunted search", "Vetted, motivated candidates", "Honest, no-surprise advice"], action: { label: "Hire talent", to: cta } },
    { tag: "For candidates", color: MINT, title: "Find your next role", body: "Real conversations, genuine roles and a partner who's in your corner — from first chat to first day and beyond.", points: ["Roles that fit your goals", "Interview coaching & prep", "Long-term career partner"], action: { label: "Find a role", to: cta } },
  ];

  const process = [
    { n: "01", t: "Brief", d: "We get to know the role, the team and what great really looks like." },
    { n: "02", t: "Search", d: "We headhunt and engage the market — not just whoever's applying." },
    { n: "03", t: "Shortlist", d: "You meet a tight list of vetted, genuinely interested people." },
    { n: "04", t: "Placement", d: "We manage offers, onboarding and check in long after day one." },
  ];

  return shell(
    <>
      {/* hero — indigo, human, dual-audience, with the connect motif */}
      <section className="relative isolate overflow-hidden text-white" style={{ background: INDIGO }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 85% 10%, rgba(251,110,92,0.22), transparent 55%), radial-gradient(90% 80% at 10% 95%, rgba(111,211,166,0.2), transparent 55%)" }} />
        <ConnectMark className="pointer-events-none absolute right-[-3rem] top-24 hidden h-[26rem] w-[26rem] opacity-50 lg:block" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Kicker light>{content.accreditations?.[0] ?? "Specialist recruitment"}</Kicker>
            <h1 style={display} className="mt-5 text-5xl font-bold leading-[0.98] tracking-[-0.03em] sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "The right people, the right roles."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/60">{name}</p>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed text-white/75">For employers building brilliant teams and candidates chasing their next move — we connect great people with great roles.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {pill(ctaLabel, cta)}
              {phone ? pillGhost(`Call ${phone}`, `tel:${phone}`) : pillGhost("Find a role", cta)}
            </div>
            {content.accreditations && content.accreditations.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/55">
                {content.accreditations.map((a) => <span key={a}>● {a}</span>)}
              </div>
            )}
          </div>
          {/* dual employer / candidate split card */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {audiences.map((a) => (
              <div key={a.tag} className="rounded-3xl bg-white/[0.07] p-6 backdrop-blur-sm" style={{ border: "1px solid rgba(255,255,255,0.14)" }}>
                <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: a.color }}>
                  <span className="inline-block h-2 w-2 rounded-full" style={{ background: a.color }} />{a.tag}
                </span>
                <p style={display} className="mt-2 text-lg font-bold tracking-[-0.01em] text-white">{a.title}</p>
                <a href={a.action.to} className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-bold" style={{ color: a.color }}>{a.action.label} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* placements / stats band */}
      <section style={{ background: CORAL }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-8 py-12 sm:grid-cols-3">
          {placements.map((s) => (
            <div key={s.v} className="flex flex-col">
              <span style={display} className="text-4xl font-bold tracking-[-0.02em] sm:text-5xl">{s.k}</span>
              <span className="mt-1 text-[12px] font-bold uppercase tracking-[0.16em] text-white/85">{s.v}</span>
            </div>
          ))}
        </div>
      </section>

      {/* two-audience split (full) */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <Kicker>Two paths, one partner</Kicker>
          <h2 style={{ ...display, color: INK }} className="mx-auto mt-4 max-w-2xl text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl">Whichever side of the table you're on</h2>
        </div>
        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {audiences.map((a) => (
            <div key={a.tag} className="flex flex-col rounded-3xl bg-white p-9" style={{ border: `1px solid ${LINE}`, boxShadow: "0 30px 70px -50px rgba(24,26,46,0.55)" }}>
              <span className="inline-flex w-fit items-center gap-2 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ background: `${a.color}1f`, color: INK }}>
                <span className="inline-block h-2 w-2 rounded-full" style={{ background: a.color }} />{a.tag}
              </span>
              <h3 style={{ ...display, color: INK }} className="mt-5 text-2xl font-bold tracking-[-0.01em]">{a.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SLATE }}>{a.body}</p>
              <ul className="mt-6 space-y-2.5">
                {a.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px]" style={{ color: INK }}>
                    <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: a.color }}>✓</span>
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-7"><a href={a.action.to} className="inline-flex rounded-full px-6 py-3 text-[13px] font-bold text-white transition hover:brightness-105" style={{ background: INDIGO }}>{a.action.label}</a></div>
            </div>
          ))}
        </div>
      </section>

      {/* sectors we recruit for — clean divide-y rows */}
      {services.length > 0 && (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>What we recruit for</Kicker>
                <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">Sectors we know inside out</h2>
              </div>
              <a href={href("services")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: CORAL }}>All sectors →</a>
            </div>
            <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s, i) => (
                <div key={s.id} className="grid gap-3 py-7 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span style={{ ...display, color: CORAL }} className="text-sm font-bold tracking-wide">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-[-0.01em] sm:text-2xl">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-bold" style={{ color: INDIGO }}>{s.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* process band — Brief → Search → Shortlist → Placement */}
      <section style={{ background: INDIGO }} className="relative overflow-hidden text-white">
        <ConnectMark className="pointer-events-none absolute -left-16 -bottom-10 hidden h-72 w-72 opacity-30 sm:block" />
        <div className="relative mx-auto max-w-6xl px-8 py-24">
          <Kicker light>How it works</Kicker>
          <h2 style={display} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl">From brief to placement</h2>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(255,255,255,0.14)" }}>
            {process.map((p, i) => (
              <div key={p.n} className="relative bg-[#2A2E7A] p-7">
                <span style={{ ...display, color: i % 2 === 0 ? CORAL : MINT }} className="text-sm font-bold">{p.n}</span>
                <h3 style={display} className="mt-3 text-xl font-bold tracking-[-0.01em]">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about band */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div>
            <Kicker>About us</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-5xl">Recruitment built on real relationships</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold" style={{ color: CORAL }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] || hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={gallery[0]?.image_url ?? hero} alt={gallery[0]?.caption ?? ""} className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2rem]" style={{ background: `linear-gradient(160deg, ${INDIGO}, ${INK})` }} />
            )}
            <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl bg-white px-5 py-4" style={{ boxShadow: "0 24px 60px -34px rgba(24,26,46,0.6)" }}>
              <ConnectMark className="h-10 w-10" />
              <div>
                <p style={{ ...display, color: INK }} className="text-lg font-bold leading-none">Great people</p>
                <p className="text-[12px] font-semibold" style={{ color: SLATE }}>Great roles</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* placements stat strip (light) */}
      {stats.length > 0 && (
        <section style={{ background: OFF, borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto grid max-w-6xl gap-8 px-8 py-14 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-3">
                <span style={{ ...display, color: INDIGO }} className="text-4xl font-bold tracking-[-0.02em]">{s.k}</span>
                <span className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: SLATE }}>{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* clients / testimonial strip */}
      <section className="mx-auto max-w-5xl px-8 py-24 text-center">
        <ConnectMark className="mx-auto h-12 w-12" />
        <blockquote style={{ ...display, color: INK }} className="mx-auto mt-7 max-w-3xl text-2xl font-bold leading-[1.35] tracking-[-0.01em] sm:text-[2rem]">
          “They actually listened — and sent us a shortlist where every single person was worth meeting.”
        </blockquote>
        <p className="mt-6 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: SLATE }}>Trusted by teams across our sectors</p>
        {content.accreditations && content.accreditations.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: "#9a9cbb" }}>
            {content.accreditations.map((a) => <span key={a}>{a}</span>)}
          </div>
        )}
      </section>

      {/* closing CTA */}
      <section style={{ background: INDIGO }} className="relative overflow-hidden text-white">
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(80% 120% at 100% 0%, rgba(111,211,166,0.22), transparent 55%)" }} />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl">Ready to find the right fit?</h2>
            <p className="mt-2 text-sm font-semibold text-white/65">For employers and candidates alike — let&apos;s talk.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {pill(ctaLabel, cta)}
            {phone && pillGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
