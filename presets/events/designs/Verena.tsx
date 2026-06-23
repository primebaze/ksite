"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EventsMobileNav } from "./EventsMobileNav";

// Verena — refined, romantic wedding & event planner. Soft cream / blush canvas,
// dusty-gold accents, generous serif headings and a delicate hairline motif.
// MULTI-PAGE — nav opens real routes (Services / Gallery / About / Contact) under
// basePath, never scroll anchors. Palette and typography are baked; the tenant
// supplies their own imagery, copy, packages, hours and contact details.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CREAM = "#faf5ef"; // warm cream canvas
const BLUSH = "#f3e8e1"; // soft blush panel
const INK = "#3a322c"; // soft espresso text
const SUB = "#8a7d72"; // muted body
const GOLD = "#b89a6a"; // dusty gold accent
const LINE = "#3a322c1a"; // hairline

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("pin")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.7 1.5 1.7 1.7 0 3-1.8 3-4.4 0-2.3-1.6-3.9-4-3.9-2.7 0-4.3 2-4.3 4.1 0 .8.3 1.7.7 2.2.1.1.1.2.1.3l-.3 1.1c0 .2-.1.2-.3.1-1.2-.5-1.9-2.3-1.9-3.7 0-3 2.2-5.8 6.3-5.8 3.3 0 5.9 2.4 5.9 5.5 0 3.3-2.1 6-5 6-1 0-1.9-.5-2.2-1.1l-.6 2.3c-.2.8-.8 1.9-1.2 2.5A10 10 0 1 0 12 2z" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Small centred motif: thin gold rules around a diamond.
function Flourish({ center = true }: { center?: boolean }) {
  return (
    <span className={`flex items-center gap-2 ${center ? "justify-center" : ""}`} aria-hidden>
      <span className="h-px w-10" style={{ background: GOLD }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ border: `1px solid ${GOLD}` }} />
      <span className="h-px w-10" style={{ background: GOLD }} />
    </span>
  );
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
        <nav className={`hidden items-center gap-7 text-[11px] font-medium uppercase tracking-[0.22em] md:flex ${onDark ? "text-white/90" : ""}`} style={onDark ? undefined : { color: SUB }}>
          {links.slice(0, 2).map((l) => <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>)}
        </nav>
        <a href={home} className="text-center md:absolute md:left-1/2 md:-translate-x-1/2">
          <span data-edit="tenant.business_name" style={serif} className={`block text-xl tracking-[0.04em] sm:text-2xl ${onDark ? "text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.4)]" : ""}`}>{name}</span>
          <span className={`mt-0.5 block text-[8px] uppercase tracking-[0.42em] ${onDark ? "text-white/70" : ""}`} style={onDark ? undefined : { color: GOLD }}>Weddings &amp; Events</span>
        </a>
        <div className="hidden items-center gap-7 md:flex">
          <nav className={`flex items-center gap-7 text-[11px] font-medium uppercase tracking-[0.22em] ${onDark ? "text-white/90" : ""}`} style={onDark ? undefined : { color: SUB }}>
            {links.slice(2).map((l) => <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>)}
          </nav>
          <a href={enquire} className={`px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition ${onDark ? "border border-white/50 text-white hover:bg-white hover:text-neutral-900" : "text-white hover:opacity-90"}`} style={onDark ? undefined : { background: GOLD }}>Enquire</a>
        </div>
        <EventsMobileNav links={links} cta={enquire} ctaLabel="Enquire" bg={INK} fg="#fff" accent={GOLD} barColor={onDark ? "#fff" : INK} />
      </div>
    </header>
  );
}

export default function Verena({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Services", href: href("services") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 py-16 text-center">
        <a href={href("home")} className="inline-block">
          <span data-edit="tenant.business_name" style={serif} className="text-3xl">{name}</span>
          <span className="mt-1 block text-[8px] uppercase tracking-[0.42em]" style={{ color: GOLD }} {...editCopy(content, "footer_eyebrow", "Weddings & Events")} />
        </a>
        <div className="mt-6 flex justify-center"><Flourish /></div>
        <div className="mt-6 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/70">
          {nav.map((l) => <a key={l.label} href={l.href} className="transition hover:text-white">{l.label}</a>)}
        </div>
        <div className="mt-7 space-y-1 text-sm text-white/65">
          {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
          <p className="flex flex-wrap justify-center gap-x-5">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="transition hover:text-white">{content.email}</a>}
          </p>
        </div>
        {content.socials && content.socials.length > 0 && (
          <div className="mt-6 flex justify-center gap-3">
            {content.socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:border-white hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-white/10 px-8 py-6 text-center text-xs text-white/40">© {new Date().getFullYear()} {name}. With love.</div>
    </footer>
  );

  const shell = (children: ReactNode, dark = false) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <Header name={name} links={nav} enquire={enquire} home={href("home")} dark={dark} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: BLUSH, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-4xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <Flourish />
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }} {...editCopy(content, kickerKey, kicker)} />
        <h1 style={{ ...serif, color: INK }} className="mt-3 text-4xl font-medium leading-[1.08] sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("How We Help", "svc_kicker", "Our Services", "svc_title")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, gi) => (
                <div key={section.section || gi} className={gi > 0 ? "mt-16" : ""}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: INK }} className="text-center text-3xl">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-12 text-center">
                <a href={enquire} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>Enquire</a>
              </div>
            </>
          ) : <p className="text-center" style={{ color: SUB }}>Our services are coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Moments", "gallery_kicker", "Gallery", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-24 text-center" style={{ color: SUB }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Hello", "about_kicker", "About Us", "about_title")}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
          ) : <div className="aspect-[4/5] w-full" style={{ background: BLUSH }} />}
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p> : <p style={{ color: SUB }}>Our story is coming soon.</p>}
            <a href={enquire} className="mt-9 inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>Plan with us</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say Hello", "contact_kicker", "Let's Begin", "contact_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl" {...editCopy(content, "contact_findus", "Find us")} />
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
              bookingBlurb="Share your date and vision and we'll be in touch to begin."
              bookingCta="Check availability"
              contactTitle="Send a note"
              contactBlurb="Questions, ideas or just saying hello — we'd love to hear from you."
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SUB, label: "#9c8f83", fieldBg: "#fff", fieldBorder: "#e3d8cf", fieldText: INK, button: GOLD, buttonText: "#fff", radius: "0.25rem", font: "var(--font-fraunces)" }}
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
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col items-center justify-center overflow-hidden text-center">
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#e8d6cc,#cdb6a6)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(40,32,28,0.4) 0%, rgba(40,32,28,0.15) 40%, rgba(40,32,28,0.5) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6">
          <div className="flex justify-center"><span className="flex items-center gap-2"><span className="h-px w-12 bg-white/70" /><span className="h-1.5 w-1.5 rotate-45 border border-white/70" /><span className="h-px w-12 bg-white/70" /></span></div>
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/85" {...editCopy(content, "hero_eyebrow", "Weddings & Events")} />
          <h1 style={{ ...serif, color: "#fff" }} className="mt-4 text-5xl font-medium leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.4)] sm:text-base">{content.tagline}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <a href={enquire} className="px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:opacity-90" style={{ background: "#fff" }}>Enquire</a>
            {groups.length > 0 && <a href={href("services")} className="border border-white/60 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">Our services</a>}
          </div>
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-8 py-24 text-center">
          <Flourish />
          <p data-edit="content.about" style={{ ...serif, color: INK }} className="mt-7 text-2xl font-medium leading-[1.5] sm:text-[2rem]">{content.about}</p>
          <a href={href("about")} className="mt-8 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Our story &rarr;</a>
        </section>
      )}

      {/* gallery preview */}
      {gallery.length > 0 && (
        <section style={{ background: BLUSH }} className="py-24">
          <div className="mx-auto max-w-5xl px-8 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }} {...editCopy(content, "home_gallery_eyebrow", "Moments")} />
            <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium sm:text-4xl" {...editCopy(content, "home_gallery_heading", "A glimpse of the days we've shaped")} />
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl grid-cols-2 gap-3 px-3 sm:grid-cols-4 sm:px-6">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>View gallery</a>
          </div>
        </section>
      )}

      {/* services preview — thin-divider list */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-3xl px-8 py-24">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }} {...editCopy(content, "home_services_eyebrow", "How We Help")} />
            <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium sm:text-4xl" {...editCopy(content, "home_services_heading", "Our services")} />
          </div>
          <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: LINE }}>
            {featured.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                </div>
                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>View all services</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: BLUSH, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-2xl px-8 py-24 text-center">
          <Flourish />
          <h2 style={{ ...serif, color: INK }} className="mt-6 text-3xl font-medium sm:text-4xl" {...editCopy(content, "cta_heading", "Let's plan something unforgettable")} />
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: SUB }}>From first idea to final farewell, we&apos;ll craft a celebration that feels entirely yours.</p>
          <a href={enquire} className="mt-8 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>Enquire</a>
        </div>
      </section>
    </>,
    true,
  );
}
