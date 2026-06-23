"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EventsMobileNav } from "./EventsMobileNav";

// Feast — an elegant EVENT & WEDDING CATERER. Food-led and abundant: a warm
// forest-green + cream world with a copper accent and soft sage. The signature
// is a laid-table / sharing-feast hero crowned with herb & seasonal-produce
// flourishes, a "Taste → Plan → Celebrate" how-it-works band, a clean
// thin-divider "what we cater" menu list, a seasonal-produce note, a food
// gallery and a "book a tasting" enquiry. MULTI-PAGE — the nav opens real
// routes (Menus / About / Gallery / Contact) under basePath, never anchors.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#28392E"; // deep forest green
const COPPER = "#B5703C"; // warm copper accent
const SAGE = "#A9B79E"; // soft sage
const CREAM = "#F4EEE0"; // warm cream paper
const INK = "#211E18"; // charcoal ink
const SUB = "#5b5648"; // muted body on cream
const LINE = "#211E1818"; // hairline on cream

// A small hand-drawn sprig of herbs / produce — the seasonal flourish that
// recurs across the design as Feast's signature mark.
function Sprig({ className = "", color = COPPER }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 48 64" width="48" height="64" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" className={className} aria-hidden>
      <path d="M24 62V14" />
      <path d="M24 44c-7-1-12-5-13-12 7 0 12 4 13 12z" />
      <path d="M24 44c7-1 12-5 13-12-7 0-12 4-13 12z" />
      <path d="M24 30c-5-1-9-4-10-9 5 0 9 3 10 9z" />
      <path d="M24 30c5-1 9-4 10-9-5 0-9 3-10 9z" />
      <circle cx="24" cy="9" r="5" fill={color} stroke="none" opacity="0.85" />
    </svg>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("pin")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a9 9 0 0 0-3.3 17.4c0-.8 0-1.7.2-2.5l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.5 0 .9-.6 2.2-.9 3.5-.2 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5 0-2-1.4-3.6-3.9-3.6-2.9 0-4.6 2.1-4.6 4.5 0 .8.2 1.4.6 1.9.2.2.2.3.1.5l-.2.9c-.1.3-.3.4-.6.2-1.2-.5-1.7-1.9-1.7-3.4 0-2.6 2.1-5.6 6.4-5.6 3.4 0 5.7 2.5 5.7 5.2 0 3.5-2 6.2-4.9 6.2-1 0-1.9-.5-2.2-1.2l-.6 2.4c-.2.8-.7 1.7-1 2.3A9 9 0 1 0 12 2z" /></svg>;
  if (k.includes("you")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Header({ name, links, enquire, home, dark }: { name: string; links: { label: string; href: string }[]; enquire: string; home: string; dark: boolean }) {
  const [scrolled, setScrolled] = useState(!dark);
  useEffect(() => {
    if (!dark) return;
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dark]);

  const onDark = dark && !scrolled;
  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300" style={scrolled ? { background: CREAM, borderBottom: `1px solid ${LINE}` } : undefined}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2.5 leading-none">
          <Sprig className="h-7 w-auto" color={onDark ? CREAM : COPPER} />
          <span className="block">
            <span data-edit="tenant.business_name" className={`block text-xl tracking-[0.01em] sm:text-2xl ${onDark ? "[text-shadow:0_1px_14px_rgba(0,0,0,0.45)]" : ""}`} style={onDark ? { ...serif, color: CREAM } : serif}>{name}</span>
            <span className={`mt-0.5 block text-[8px] uppercase tracking-[0.42em] ${onDark ? "text-white/70" : ""}`} style={onDark ? undefined : { color: SAGE }}>Event &amp; Wedding Catering</span>
          </span>
        </a>
        <nav className={`hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em] md:flex ${onDark ? "text-white/90" : ""}`} style={onDark ? undefined : { color: FOREST }}>
          {links.map((l) => <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>)}
        </nav>
        <a href={enquire} className={`hidden rounded-full px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition md:inline-flex ${onDark ? "border border-white/50 text-white hover:bg-white hover:text-[#28392E]" : "text-white hover:opacity-90"}`} style={onDark ? undefined : { background: COPPER }}>Book a tasting</a>
        <EventsMobileNav links={links} cta={enquire} ctaLabel="Book a tasting" bg={FOREST} fg={CREAM} accent={COPPER} barColor={onDark ? CREAM : FOREST} />
      </div>
    </header>
  );
}

export default function FeastDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Menus", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: FOREST }} className="text-[color:var(--cream)]">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Sprig className="h-8 w-auto" color={SAGE} />
            <span>
              <span data-edit="tenant.business_name" style={{ ...serif, color: CREAM }} className="text-2xl">{name}</span>
              <span className="mt-1 block text-[8px] uppercase tracking-[0.42em]" style={{ color: SAGE }}>Event &amp; Wedding Catering</span>
            </span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#dfe0d3" }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border text-white/80 transition hover:text-white" style={{ borderColor: "#ffffff35" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...serif, color: CREAM }} className="text-lg">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: "#dfe0d3" }}>
            {nav.map((l) => <li key={l.label}><a href={l.href} className="uppercase tracking-[0.14em] transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 style={{ ...serif, color: CREAM }} className="text-lg">The kitchen</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: "#dfe0d3" }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#c7c9ba" }}>
        <p>© {new Date().getFullYear()} {name}. Beautifully catered.</p>
        <a href={enquire} className="uppercase tracking-[0.16em] transition hover:text-white">Book a tasting</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, dark = false) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, "--cream": CREAM } as React.CSSProperties} className="min-h-screen font-body">
      <Header name={name} links={nav} enquire={enquire} home={href("home")} dark={dark} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: FOREST }}>
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <div className="flex items-center gap-3">
          <Sprig className="h-6 w-auto" color={SAGE} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }}>{kicker}</p>
        </div>
        <h1 style={{ ...serif, color: CREAM }} className="mt-4 text-4xl font-medium leading-[1.05] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENUS (catalog) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What We Cater", "Our Menus")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, gi) => (
                <div key={section.section || gi} className={gi > 0 ? "mt-16" : ""}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: FOREST }} className="text-2xl">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: COPPER }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: COPPER }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-12 rounded-2xl px-7 py-7" style={{ background: "#ecf0e4", border: `1px solid ${LINE}` }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: COPPER }}>Seasonal &amp; local</p>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: SUB }}>Every menu is built around what&apos;s in season and sourced close to home — we&apos;ll happily tailor a bespoke menu around your guests, dietaries and the story of your day.</p>
                <a href={enquire} className="mt-5 inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: FOREST }}>Book a tasting</a>
              </div>
            </>
          ) : <p style={{ color: SUB }}>Menus coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our Story", "About the kitchen")}
        <section className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-3xl object-cover" />
          ) : <div className="aspect-[4/5] w-full rounded-3xl" style={{ background: "#dfe6d4" }} />}
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p> : <p style={{ color: SUB }}>Our story is coming soon.</p>}
            <a href={enquire} className="mt-9 inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: COPPER }}>Book a tasting</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("On the Table", "Gallery")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full break-inside-avoid rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-24 text-center" style={{ color: SUB }}>New work coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's Talk Food", "Book a tasting")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: FOREST }} className="text-2xl">The kitchen</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SUB }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#28392E]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#28392E]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SUB }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SAGE }}>{h.open}</span></li>
                ))}
              </ul>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Enquire about your event"
              bookingBlurb="Tell us your date, your guest count and the kind of feast you imagine — we'll come back with availability and ideas."
              bookingCta="Book a tasting"
              contactTitle="Send an enquiry"
              contactBlurb="Tell us about your event and we'll be in touch with a bespoke proposal."
              theme={{ card: "#ffffff", cardBorder: LINE, heading: FOREST, blurb: SUB, label: "#8a857d", fieldBg: "#fff", fieldBorder: "#d8d3c6", fieldText: INK, button: COPPER, buttonText: "#fff", radius: "14px", font: "var(--font-fraunces)" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  const cater = ["Weddings", "Private parties", "Corporate", "Canapés & bowls", "Sharing feasts", "Dietary & bespoke"];
  const steps: { n: string; title: string; body: string }[] = [
    { n: "01", title: "Taste", body: "Come and taste. We cook a menu around your day and you tell us what you love." },
    { n: "02", title: "Plan", body: "We shape the seasonal menu, staffing and timings down to the last canapé." },
    { n: "03", title: "Celebrate", body: "Our team plates, serves and clears so you can be fully in the moment." },
  ];

  return shell(
    <>
      {/* hero — abundant laid-table / sharing-feast, forest + cream */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden" style={{ background: FOREST }}>
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 70% 10%, #34493b 0%, #28392E 55%, #1c2922 100%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,28,22,0.82) 0%, rgba(20,28,22,0.18) 45%, rgba(20,28,22,0.45) 100%)" }} />
        {/* herb / produce flourishes — the signature */}
        <Sprig className="pointer-events-none absolute -left-2 top-28 h-28 w-auto opacity-40 sm:left-8 sm:h-40" color={SAGE} />
        <Sprig className="pointer-events-none absolute right-4 top-36 h-24 w-auto rotate-12 opacity-30 sm:right-16 sm:h-32" color={COPPER} />
        <div className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: COPPER }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: "#e7d8c6" }}>Event &amp; Wedding Catering</p>
          </div>
          <h1 style={{ ...serif, color: CREAM }} className="mt-5 max-w-4xl text-5xl font-medium leading-[1.02] [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">
            Beautiful food for unforgettable events
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed sm:text-base" style={{ color: "#e9e3d4" }}>
            <span data-edit="tenant.business_name" style={{ ...serif, color: COPPER }} className="font-medium">{name}</span>
            {content.tagline ? <span data-edit="content.tagline"> — {content.tagline}</span> : <> — seasonal, abundant catering for weddings, parties &amp; gatherings.</>}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={enquire} className="rounded-full px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: COPPER }}>Book a tasting</a>
            {groups.length > 0 && <a href={href("services")} className="rounded-full border border-white/50 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#28392E]">View our menus</a>}
          </div>
        </div>
      </section>

      {/* intro statement on cream */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-8 py-24 text-center">
          <Sprig className="mx-auto h-9 w-auto" color={COPPER} />
          <p data-edit="content.about" style={{ ...serif, color: FOREST }} className="mt-6 text-2xl font-medium leading-[1.45] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: COPPER }}>Our story &rarr;</a>
        </section>
      )}

      {/* how it works — Taste → Plan → Celebrate band */}
      <section style={{ background: FOREST }}>
        <div className="mx-auto max-w-6xl px-8 py-20 sm:py-24">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }}>How it works</p>
            <h2 style={{ ...serif, color: CREAM }} className="mt-3 text-3xl font-medium sm:text-4xl">Taste, plan, celebrate</h2>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl sm:grid-cols-3" style={{ background: "#ffffff1a" }}>
            {steps.map((s) => (
              <div key={s.n} className="px-8 py-10" style={{ background: FOREST }}>
                <span style={{ ...serif, color: COPPER }} className="text-3xl">{s.n}</span>
                <h3 style={{ ...serif, color: CREAM }} className="mt-3 text-xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#cdd2c2" }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* what we cater — sage chip band */}
      <section className="mx-auto max-w-5xl px-8 py-20 text-center sm:py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }}>What we cater</p>
        <h2 style={{ ...serif, color: FOREST }} className="mt-3 text-3xl font-medium sm:text-4xl">From canapés to sharing feasts</h2>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {cater.map((c) => (
            <span key={c} className="rounded-full px-5 py-2.5 text-sm" style={{ background: "#ecf0e4", color: FOREST, border: `1px solid ${LINE}` }}>{c}</span>
          ))}
        </div>
      </section>

      {/* menu preview — thin-divider list on cream */}
      {featured.length > 0 && (
        <section style={{ background: "#ecf0e4", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }}>On the menu</p>
              <h2 style={{ ...serif, color: FOREST }} className="mt-3 text-3xl font-medium sm:text-4xl">A taste of our seasonal menus</h2>
            </div>
            <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: COPPER }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: FOREST }}>See all menus</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery preview — food is visual, centrepiece grid */}
      {gallery.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }}>On the table</p>
                <h2 style={{ ...serif, color: FOREST }} className="mt-3 text-3xl font-medium sm:text-4xl">Recent feasts</h2>
              </div>
              <a href={href("gallery")} className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: FOREST }}>Full gallery &rarr;</a>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:px-6">
            {gallery.slice(0, 5).map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className={`w-full rounded-2xl object-cover ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/5]" : "aspect-[4/5]"}`} />
            ))}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: COPPER }}>
        <div className="mx-auto max-w-2xl px-8 py-24 text-center">
          <Sprig className="mx-auto h-9 w-auto" color={CREAM} />
          <h2 style={{ ...serif, color: CREAM }} className="mt-5 text-3xl font-medium sm:text-4xl">Let&apos;s plan your feast</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: "#fbf3e8" }}>Tell us about your day and your guests — we&apos;d love to cook for you.</p>
          <a href={enquire} className="mt-8 inline-flex rounded-full px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: FOREST, color: CREAM }}>Book a tasting</a>
        </div>
      </section>
    </>,
    true,
  );
}
