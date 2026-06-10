"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EventsMobileNav } from "./EventsMobileNav";

// Aperture — editorial photography / videography PORTFOLIO. Light, gallery-led,
// magazine-style: a full-bleed hero frame, an oversized image-led grid, a clean
// thin-divider package list and an airy contact page. MULTI-PAGE — the nav opens
// real routes (Portfolio / Services / About / Contact) under basePath, never
// scroll anchors. Palette and typography are baked; the tenant swaps in their
// own imagery, copy, packages, hours and contact details.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#161412"; // near-black ink
const PAPER = "#f7f5f1"; // warm paper
const SUB = "#6f6a63"; // muted body
const LINE = "#1614120f"; // hairline
const ACCENT = "#9a6a4c"; // warm terracotta accent

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
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
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300" style={scrolled ? { background: PAPER, borderBottom: `1px solid ${LINE}` } : undefined}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
        <a href={home} className="leading-none">
          <span data-edit="tenant.business_name" style={serif} className={`block text-xl tracking-[0.02em] sm:text-2xl ${onDark ? "text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]" : ""}`} >{name}</span>
          <span className={`mt-0.5 block text-[8px] uppercase tracking-[0.42em] ${onDark ? "text-white/70" : "text-neutral-400"}`}>Photography &amp; Film</span>
        </a>
        <nav className={`hidden items-center gap-8 text-[11px] font-medium uppercase tracking-[0.22em] md:flex ${onDark ? "text-white/90" : "text-neutral-600"}`}>
          {links.map((l) => <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>)}
        </nav>
        <a href={enquire} className={`hidden px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition md:inline-flex ${onDark ? "border border-white/50 text-white hover:bg-white hover:text-neutral-900" : "text-white hover:opacity-90"}`} style={onDark ? undefined : { background: INK }}>Enquire</a>
        <EventsMobileNav links={links} cta={enquire} ctaLabel="Enquire" bg={INK} fg="#fff" accent={ACCENT} barColor={onDark ? "#fff" : INK} />
      </div>
    </header>
  );
}

export default function Aperture({ site, page = "home", basePath = "" }: PresetProps) {
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
    gallery.length > 0 && { label: "Portfolio", href: href("gallery") },
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.42em] text-white/55">Photography &amp; Film</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-white hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={serif} className="text-lg">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            {nav.map((l) => <li key={l.label}><a href={l.href} className="uppercase tracking-[0.14em] transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 style={serif} className="text-lg">Studio</h4>
          <div className="mt-5 space-y-3 text-sm text-white/60">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-7 text-xs text-white/45 sm:flex-row">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={enquire} className="uppercase tracking-[0.16em] transition hover:text-white">Start a project</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, dark = false) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body" >
      <Header name={name} links={nav} enquire={enquire} home={href("home")} dark={dark} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ACCENT }}>{kicker}</p>
        <h1 style={{ ...serif, color: INK }} className="mt-3 text-4xl font-medium leading-[1.05] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- PORTFOLIO (gallery) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Selected Work", "Portfolio")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="columns-1 gap-3 sm:columns-2 lg:columns-3 [&>*]:mb-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full break-inside-avoid object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-24 text-center" style={{ color: SUB }}>New work coming soon.</p>}
      </>,
    );
  }

  // ---- SERVICES (packages) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Investment", "Services & Packages")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, gi) => (
                <div key={section.section || gi} className={gi > 0 ? "mt-16" : ""}>
                  {section.section && <h2 style={{ ...serif, color: INK }} className="text-2xl">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: ACCENT }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: ACCENT }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-12">
                <a href={enquire} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>Enquire about a package</a>
              </div>
            </>
          ) : <p style={{ color: SUB }}>Packages coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The Studio", "About")}
        <section className="mx-auto grid max-w-6xl items-start gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
          ) : <div className="aspect-[4/5] w-full" style={{ background: "#ece8e1" }} />}
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p> : <p style={{ color: SUB }}>Our story is coming soon.</p>}
            <a href={enquire} className="mt-9 inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>Work with us</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's Talk", "Get in Touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl">The studio</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SUB }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-900">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-900">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SUB }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>
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
              bookingBlurb="Tell us your date and what you have in mind — we'll come back with availability."
              bookingCta="Check availability"
              contactTitle="Send an enquiry"
              contactBlurb="Tell us about your project and we'll be in touch."
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SUB, label: "#8a857d", fieldBg: "#fff", fieldBorder: "#dfdbd3", fieldText: INK, button: INK, buttonText: "#fff", radius: "0", font: "var(--font-fraunces)" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  return shell(
    <>
      {/* hero — full-bleed image with editorial overlay */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#2b2622,#161412)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(12,10,8,0.7) 0%, rgba(12,10,8,0.1) 45%, rgba(12,10,8,0.35) 100%)" }} />
        <div className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/85">Photography &amp; Film</p>
          <h1 style={{ ...serif, color: "#fff" }} className="mt-4 max-w-4xl text-5xl font-medium leading-[1.02] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.4)] sm:text-base">{content.tagline}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            {gallery.length > 0 && <a href={href("gallery")} className="px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:opacity-90" style={{ background: "#fff" }}>View portfolio</a>}
            <a href={enquire} className="border border-white/50 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">Enquire</a>
          </div>
        </div>
      </section>

      {/* intro statement */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-8 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ACCENT }}>About</p>
          <p data-edit="content.about" style={{ ...serif, color: INK }} className="mt-6 text-2xl font-medium leading-[1.45] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: ACCENT }}>Read more &rarr;</a>
        </section>
      )}

      {/* portfolio preview — oversized image grid */}
      {gallery.length > 0 && (
        <section style={{ borderTop: `1px solid ${LINE}` }} className="py-20">
          <div className="mx-auto max-w-6xl px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ACCENT }}>Selected Work</p>
                <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium sm:text-4xl">Recent stories</h2>
              </div>
              <a href={href("gallery")} className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: INK }}>Full portfolio &rarr;</a>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:px-6">
            {gallery.slice(0, 6).map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className={`w-full object-cover ${i === 0 ? "col-span-2 row-span-2 aspect-square sm:aspect-[4/5]" : "aspect-[4/5]"}`} />
            ))}
          </div>
        </section>
      )}

      {/* services preview — thin-divider list */}
      {featured.length > 0 && (
        <section style={{ background: "#efece6", borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ACCENT }}>Investment</p>
              <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium sm:text-4xl">Packages</h2>
            </div>
            <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: ACCENT }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>View all packages</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-2xl px-8 py-24 text-center">
        <h2 style={{ ...serif, color: INK }} className="text-3xl font-medium sm:text-4xl">Let&apos;s create something beautiful</h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: SUB }}>Tell us about your day, your brand or your story — we&apos;d love to hear it.</p>
        <a href={enquire} className="mt-8 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>Start a project</a>
      </section>
    </>,
    true,
  );
}
