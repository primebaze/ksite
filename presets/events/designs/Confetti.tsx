"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EventsMobileNav } from "./EventsMobileNav";

// Confetti — a bright, fun, product-led PARTY & EVENT HIRE company (marquees,
// bouncy castles, soft play, tables & chairs, lighting, games). Cheerful
// multicolour-on-white register: scattered confetti dots, bunting and balloons
// are the signature motif. Reliable + premium, the opposite of a dark DJ vibe.
// MULTI-PAGE — the nav opens real routes (Hire / About / Gallery / Contact)
// under basePath. The tenant swaps in their own copy, hire list, gallery, hours
// and contact details.

const display = { fontFamily: "var(--font-fraunces)" } as const;

const INK = "#2A1E3A"; // deep grape ink
const SUB = "#6b6275"; // muted body
const PINK = "#F0568C"; // party pink
const BLUE = "#2BB3E0"; // sky blue
const YELLOW = "#FBC02D"; // sunny yellow
const MINT = "#46C99A"; // mint
const LINE = "#2A1E3A14"; // hairline on white

const PARTY = [PINK, BLUE, YELLOW, MINT];

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Signature motif: scattered confetti dots + a few squiggles, in brand colours.
function Confetti({ className = "", dense = false }: { className?: string; dense?: boolean }) {
  const dots: { x: number; y: number; r: number; c: string; s: "dot" | "rect" }[] = [
    { x: 6, y: 18, r: 4, c: PINK, s: "dot" },
    { x: 16, y: 64, r: 3, c: BLUE, s: "rect" },
    { x: 27, y: 30, r: 5, c: YELLOW, s: "dot" },
    { x: 38, y: 78, r: 3, c: MINT, s: "rect" },
    { x: 49, y: 14, r: 4, c: BLUE, s: "dot" },
    { x: 61, y: 58, r: 5, c: PINK, s: "rect" },
    { x: 72, y: 26, r: 3, c: MINT, s: "dot" },
    { x: 81, y: 72, r: 4, c: YELLOW, s: "rect" },
    { x: 90, y: 38, r: 5, c: PINK, s: "dot" },
    { x: 95, y: 12, r: 3, c: BLUE, s: "rect" },
  ];
  const extra = dense
    ? [
        { x: 11, y: 44, r: 3, c: YELLOW, s: "dot" as const },
        { x: 33, y: 54, r: 4, c: PINK, s: "rect" as const },
        { x: 55, y: 36, r: 3, c: MINT, s: "dot" as const },
        { x: 67, y: 84, r: 4, c: BLUE, s: "rect" as const },
        { x: 86, y: 58, r: 3, c: MINT, s: "dot" as const },
      ]
    : [];
  const all = [...dots, ...extra];
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className={className} aria-hidden>
      {all.map((d, i) =>
        d.s === "dot" ? (
          <circle key={i} cx={d.x} cy={d.y} r={d.r / 2} fill={d.c} />
        ) : (
          <rect key={i} x={d.x} y={d.y} width={d.r} height={d.r / 1.6} rx="0.4" fill={d.c} transform={`rotate(${(i * 47) % 90} ${d.x} ${d.y})`} />
        ),
      )}
    </svg>
  );
}

// A run of triangular bunting flags in the brand palette.
function Bunting({ className = "" }: { className?: string }) {
  const flags = Array.from({ length: 14 });
  return (
    <svg viewBox="0 0 280 22" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 3 Q140 13 280 3" fill="none" stroke={INK} strokeOpacity="0.25" strokeWidth="1" />
      {flags.map((_, i) => {
        const x = 6 + i * 20;
        return <path key={i} d={`M${x} 4 L${x + 14} 4 L${x + 7} 18 Z`} fill={PARTY[i % PARTY.length]} />;
      })}
    </svg>
  );
}

function Header({ name, links, enquire, home }: { name: string; links: { label: string; href: string }[]; enquire: string; home: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-all duration-300" style={{ background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)", borderBottom: scrolled ? `1px solid ${LINE}` : "1px solid transparent", backdropFilter: scrolled ? "blur(8px)" : undefined }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8">
        <a href={home} className="flex items-center gap-2.5 leading-none">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: PINK }}>
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#fff" }} />
          </span>
          <span className="block">
            <span data-edit="tenant.business_name" style={{ ...display, color: INK }} className="block text-xl font-semibold tracking-tight sm:text-2xl">{name}</span>
            <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.34em]" style={{ color: BLUE }}>Party &amp; Event Hire</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 text-[12px] font-semibold uppercase tracking-[0.16em] md:flex" style={{ color: INK }}>
          {links.map((l) => <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>)}
        </nav>
        <a href={enquire} className="hidden rounded-full px-6 py-3 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:opacity-90 md:inline-flex" style={{ background: PINK }}>Check availability</a>
        <EventsMobileNav links={links} cta={enquire} ctaLabel="Check availability" bg={INK} fg="#fff" accent={YELLOW} barColor={INK} />
      </div>
    </header>
  );
}

export default function ConfettiDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const enquire = href("contact");

  const nav = [
    groups.length > 0 && { label: "Hire", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer className="relative overflow-hidden text-white" style={{ background: INK }}>
      <Bunting className="absolute inset-x-0 top-0 h-5 w-full opacity-90" />
      <div className="mx-auto grid max-w-6xl gap-12 px-8 pb-14 pt-20 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" style={{ background: PINK }}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#fff" }} />
            </span>
            <span>
              <span data-edit="tenant.business_name" style={display} className="block text-2xl font-semibold">{name}</span>
              <span className="mt-0.5 block text-[8px] font-semibold uppercase tracking-[0.34em] text-white/60">Party &amp; Event Hire</span>
            </span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-white hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-lg font-semibold">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => <li key={l.label}><a href={l.href} className="uppercase tracking-[0.12em] transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-lg font-semibold">Get in touch</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-7 text-xs text-white/45 sm:flex-row">
        <p>© {new Date().getFullYear()} {name}. Let&apos;s get the party started.</p>
        <a href={enquire} className="uppercase tracking-[0.14em] transition hover:text-white">Check availability</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: "#ffffff" }} className="min-h-screen font-body">
      <Header name={name} links={nav} enquire={enquire} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, accent: string) => (
    <section className="relative overflow-hidden" style={{ borderBottom: `1px solid ${LINE}` }}>
      <Confetti className="pointer-events-none absolute inset-0 h-full w-full opacity-70" dense />
      <div className="relative mx-auto max-w-6xl px-8 pb-14 pt-32 sm:pt-40">
        <p className="text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: accent }}>{kicker}</p>
        <h1 style={{ ...display, color: INK }} className="mt-3 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  const pill = (text: string, color: string) => (
    <span key={text} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold" style={{ background: `${color}1f`, color }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {text}
    </span>
  );

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Real celebrations", "Gallery", PINK)}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className={`w-full rounded-2xl object-cover ${i % 5 === 0 ? "aspect-square sm:row-span-2 sm:aspect-[3/4]" : "aspect-[4/3]"}`} style={{ border: `3px solid ${PARTY[i % PARTY.length]}22` }} />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-24 text-center" style={{ color: SUB }}>Party photos coming soon.</p>}
      </>,
    );
  }

  // ---- HIRE (services) — clean divide-y rows, no card panels ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we hire", "The hire list", BLUE)}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, gi) => (
                <div key={section.section || gi} className={gi > 0 ? "mt-16" : ""}>
                  {section.section && <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold tracking-tight">{section.section}</h2>}
                  {section.categories.map((catg, ci) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p className="mb-3 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: PARTY[ci % PARTY.length] }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ ...display, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: PINK }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-12">
                <a href={enquire} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: PINK }}>Check availability</a>
              </div>
            </>
          ) : <p style={{ color: SUB }}>Our hire list is on its way.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Hello there", "About us", MINT)}
        <section className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p> : <p style={{ color: SUB }}>Our story is coming soon.</p>}
            <div className="mt-7 flex flex-wrap gap-2.5">
              {pill("Delivered & set up", BLUE)}
              {pill("Fully insured", MINT)}
              {pill("Clean & checked", PINK)}
            </div>
            <a href={enquire} className="mt-9 inline-flex rounded-full px-9 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: PINK }}>Plan your party</a>
          </div>
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-3xl object-cover" style={{ border: `4px solid ${YELLOW}33` }} />
          ) : <div className="aspect-[4/5] w-full rounded-3xl" style={{ background: `linear-gradient(135deg,${PINK}22,${BLUE}22)` }} />}
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's talk", "Check availability", YELLOW)}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold tracking-tight">Say hello</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SUB }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SUB }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: INK }}>{h.open}</span></li>
                ))}
              </ul>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Check availability"
              bookingBlurb="Tell us your date and what you'd like to hire — we'll confirm availability and a quote."
              bookingCta="Check availability"
              contactTitle="Send a message"
              contactBlurb="Got a question about a hire? Drop us a line and we'll get right back."
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SUB, label: "#8a8492", fieldBg: "#fff", fieldBorder: "#e4e0ea", fieldText: INK, button: PINK, buttonText: "#fff", radius: "9999px", font: "var(--font-fraunces)" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  const hireKinds = [
    { label: "Marquees & tents", color: PINK },
    { label: "Bouncy castles", color: BLUE },
    { label: "Soft play", color: YELLOW },
    { label: "Tables & chairs", color: MINT },
    { label: "Lighting & decor", color: PINK },
    { label: "Games", color: BLUE },
  ];

  const steps = [
    { n: "1", t: "Browse", d: "Pick your marquee, castle, soft play or decor from the hire list.", color: PINK },
    { n: "2", t: "Book", d: "Tell us your date and postcode — we confirm availability and a quote.", color: BLUE },
    { n: "3", t: "We set it up", d: "We deliver, build, test and collect. You just enjoy the party.", color: MINT },
  ];

  return shell(
    <>
      {/* hero — bright, white, multicolour, confetti + bunting + balloons */}
      <section className="relative isolate overflow-hidden bg-white">
        <Bunting className="absolute inset-x-0 top-16 h-6 w-full sm:top-20" />
        <Confetti className="pointer-events-none absolute inset-0 h-full w-full opacity-80" dense />
        {/* soft colour wash */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(60% 50% at 15% 10%, ${PINK}14, transparent), radial-gradient(50% 50% at 90% 20%, ${BLUE}14, transparent), radial-gradient(60% 60% at 80% 95%, ${YELLOW}14, transparent)` }} />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-36 sm:px-8 sm:pt-44 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24">
          <div>
            <div className="flex flex-wrap gap-2">
              {pill("Kids parties", PINK)}
              {pill("Big events", BLUE)}
              {pill("Delivered & set up", MINT)}
            </div>
            <h1 style={{ ...display, color: INK }} className="mt-6 text-5xl font-semibold leading-[0.98] tracking-tight sm:text-7xl">
              Let&apos;s get this{" "}
              <span className="relative inline-block">
                <span style={{ color: PINK }}>party</span>
                <svg viewBox="0 0 120 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2.5 w-full" aria-hidden><path d="M2 9 Q60 1 118 8" fill="none" stroke={YELLOW} strokeWidth="5" strokeLinecap="round" /></svg>
              </span>{" "}
              started
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: BLUE }}>{name}</p>
            {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-md text-[16px] leading-relaxed" style={{ color: SUB }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              {groups.length > 0 && <a href={href("services")} className="rounded-full px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] text-white transition hover:opacity-90" style={{ background: PINK }}>See what we hire</a>}
              <a href={enquire} className="rounded-full border-2 px-8 py-4 text-[12px] font-bold uppercase tracking-[0.12em] transition hover:bg-[#2A1E3A] hover:text-white" style={{ borderColor: INK, color: INK }}>Check availability</a>
            </div>
          </div>
          <div className="relative">
            {heroVideo ? (
              <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full rounded-[2rem] object-cover" style={{ border: `5px solid ${BLUE}33` }} />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-[2rem] object-cover" style={{ border: `5px solid ${BLUE}33` }} />
            ) : (
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem]" style={{ background: `linear-gradient(150deg,${PINK}22,${BLUE}22 55%,${YELLOW}22)`, border: `5px solid ${BLUE}33` }}>
                {/* balloon cluster placeholder */}
                <svg viewBox="0 0 200 250" className="absolute inset-0 h-full w-full" aria-hidden>
                  {[
                    { x: 70, y: 90, c: PINK },
                    { x: 110, y: 75, c: BLUE },
                    { x: 95, y: 120, c: YELLOW },
                    { x: 135, y: 110, c: MINT },
                  ].map((b, i) => (
                    <g key={i}>
                      <line x1={b.x} y1={b.y + 30} x2="100" y2="220" stroke={INK} strokeOpacity="0.25" strokeWidth="1" />
                      <ellipse cx={b.x} cy={b.y} rx="26" ry="32" fill={b.c} />
                      <ellipse cx={b.x - 8} cy={b.y - 10} rx="6" ry="9" fill="#fff" opacity="0.35" />
                    </g>
                  ))}
                </svg>
              </div>
            )}
            <span className="absolute -right-3 -top-3 flex h-14 w-14 rotate-12 items-center justify-center rounded-full text-center text-[10px] font-bold uppercase leading-tight text-white" style={{ background: YELLOW, color: INK }}>Set<br />up!</span>
          </div>
        </div>
      </section>

      {/* what we hire — colourful chips strip */}
      <section className="relative" style={{ background: "#fff", borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: BLUE }}>What we hire</p>
            <h2 style={{ ...display, color: INK }} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Everything for the day</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {hireKinds.map((k) => (
              <a key={k.label} href={groups.length > 0 ? href("services") : enquire} className="group flex items-center gap-3 rounded-2xl bg-white p-5 transition hover:-translate-y-0.5" style={{ border: `1px solid ${LINE}`, boxShadow: "0 1px 2px rgba(42,30,58,0.04)" }}>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full" style={{ background: `${k.color}1f` }}>
                  <span className="h-3.5 w-3.5 rounded-full" style={{ background: k.color }} />
                </span>
                <span style={{ ...display, color: INK }} className="text-base font-semibold leading-tight">{k.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* how it works — Browse → Book → We set it up */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(180deg,#fff,${MINT}0c)`, borderTop: `1px solid ${LINE}` }}>
        <Confetti className="pointer-events-none absolute inset-0 h-full w-full opacity-50" />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <p className="text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: PINK }}>How it works</p>
            <h2 style={{ ...display, color: INK }} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">As easy as 1, 2, 3</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-3xl bg-white p-7 text-center" style={{ border: `1px solid ${LINE}`, boxShadow: "0 8px 30px -18px rgba(42,30,58,0.25)" }}>
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-white" style={{ background: s.color }}>{s.n}</span>
                <h3 style={{ ...display, color: INK }} className="mt-5 text-xl font-semibold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: SUB }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* reassurance strip — delivered, set up & collected */}
      <section style={{ background: INK }} className="relative overflow-hidden text-white">
        <Confetti className="pointer-events-none absolute inset-0 h-full w-full opacity-30" />
        <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-14 sm:px-8 sm:grid-cols-3">
          {[
            { t: "Delivered to your door", d: "We bring it all to you, on time, anywhere local.", color: PINK },
            { t: "Set up & tested", d: "Built, safety-checked and ready before guests arrive.", color: YELLOW },
            { t: "Collected after", d: "We take it all away when the party's over. Easy.", color: MINT },
          ].map((r) => (
            <div key={r.t} className="flex items-start gap-4">
              <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: r.color }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M5 13l4 4L19 7" /></svg>
              </span>
              <div>
                <h3 style={display} className="text-lg font-semibold">{r.t}</h3>
                <p className="mt-1 text-sm leading-relaxed text-white/65">{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* hire preview — clean divide-y rows */}
      {featured.length > 0 && (
        <section className="bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: BLUE }}>Popular hires</p>
                <h2 style={{ ...display, color: INK }} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">From the hire list</h2>
              </div>
              <a href={href("services")} className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: PINK }}>See all &rarr;</a>
            </div>
            <ul className="mt-10 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ ...display, color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: PINK }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: PINK }}>View the full hire list</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery preview */}
      {gallery.length > 0 && (
        <section className="bg-white" style={{ borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[12px] font-bold uppercase tracking-[0.24em]" style={{ color: MINT }}>Happy customers</p>
                <h2 style={{ ...display, color: INK }} className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Real celebrations</h2>
              </div>
              <a href={href("gallery")} className="text-[12px] font-bold uppercase tracking-[0.14em]" style={{ color: PINK }}>Full gallery &rarr;</a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 8).map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" style={{ border: `3px solid ${PARTY[i % PARTY.length]}22` }} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden bg-white">
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center" style={{ background: `linear-gradient(135deg,${PINK},${BLUE})` }}>
            <Confetti className="pointer-events-none absolute inset-0 h-full w-full opacity-40" dense />
            <div className="relative">
              <h2 style={display} className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Ready to celebrate?</h2>
              <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/90">Tell us your date and what you have in mind — we&apos;ll check availability and make it easy.</p>
              <a href={enquire} className="mt-8 inline-flex rounded-full bg-white px-10 py-4 text-[12px] font-bold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ color: INK }}>Check availability</a>
            </div>
          </div>
        </div>
      </section>
    </>,
  );
}
