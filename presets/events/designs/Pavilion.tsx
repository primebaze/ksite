"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EventsMobileNav } from "./EventsMobileNav";

// Pavilion — refined event venue / hire space. Architectural and spacious: a
// warm-stone canvas, generous whitespace, restrained sans display headings, a
// structured spec band and large calm imagery. MULTI-PAGE — nav opens real routes
// (Spaces / Gallery / About / Contact) under basePath, never scroll anchors.
// Palette and typography are baked; the tenant supplies their own media, hire
// options, hours and contact details.

const sans = { fontFamily: "var(--font-inter)" } as const;
const STONE = "#f4f1ec"; // warm stone canvas
const CARD = "#fbfaf7"; // lifted card
const INK = "#26241f"; // charcoal text
const SUB = "#736e64"; // muted body
const SAGE = "#5f6b57"; // muted sage accent
const LINE = "#26241f17"; // hairline

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("pin")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><path d="M20 10c0 6-8 11-8 11s-8-5-8-11a8 8 0 0 1 16 0z" /><circle cx="12" cy="10" r="2.5" /></svg>;
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
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300" style={scrolled ? { background: STONE, borderBottom: `1px solid ${LINE}` } : undefined}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
        <a href={home} className="leading-none">
          <span data-edit="tenant.business_name" style={sans} className={`block text-lg font-semibold tracking-[0.14em] uppercase sm:text-xl ${onDark ? "text-white [text-shadow:0_1px_12px_rgba(0,0,0,0.45)]" : ""}`} >{name}</span>
        </a>
        <nav className={`hidden items-center gap-8 text-[11px] font-semibold uppercase tracking-[0.2em] md:flex ${onDark ? "text-white/90" : ""}`} style={onDark ? undefined : { color: SUB }}>
          {links.map((l) => <a key={l.href} href={l.href} className="transition hover:opacity-60">{l.label}</a>)}
        </nav>
        <a href={enquire} className={`hidden px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition md:inline-flex ${onDark ? "border border-white/50 text-white hover:bg-white hover:text-neutral-900" : "text-white hover:opacity-90"}`} style={onDark ? undefined : { background: INK }}>Enquire</a>
        <EventsMobileNav links={links} cta={enquire} ctaLabel="Enquire" bg={INK} fg="#fff" accent={SAGE} barColor={onDark ? "#fff" : INK} />
      </div>
    </header>
  );
}

export default function Pavilion({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Spaces", href: href("services") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={sans} className="text-xl font-semibold uppercase tracking-[0.14em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition hover:border-white hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => <li key={l.label}><a href={l.href} className="uppercase tracking-[0.12em] transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">Visit</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-7 text-xs text-white/45 sm:flex-row">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={enquire} className="uppercase tracking-[0.16em] transition hover:text-white">Enquire about your event</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, dark = false) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: STONE }} className="min-h-screen font-body">
      <Header name={name} links={nav} enquire={enquire} home={href("home")} dark={dark} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>{kicker}</p>
        <h1 style={{ ...sans, color: INK }} className="mt-3 text-4xl font-semibold leading-[1.04] tracking-[-0.01em] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SPACES (services) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Hire Options", "Our Spaces")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, gi) => (
                <div key={section.section || gi} className={gi > 0 ? "mt-16" : ""}>
                  {section.section && <h2 style={{ ...sans, color: INK }} className="text-2xl font-semibold tracking-tight">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: SAGE }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: SAGE }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-12">
                <a href={enquire} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: INK }}>Enquire about hire</a>
              </div>
            </>
          ) : <p style={{ color: SUB }}>Hire options coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("The Spaces", "Gallery")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className={`w-full object-cover ${i % 3 === 0 ? "aspect-[16/10] sm:col-span-2" : "aspect-[4/3]"}`} />
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
        {banner("The Venue", "About")}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
          ) : <div className="aspect-[4/3] w-full" style={{ background: "#e7e3db" }} />}
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p> : <p style={{ color: SUB }}>Our story is coming soon.</p>}
            <a href={enquire} className="mt-9 inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: INK }}>Plan your event</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Plan Your Event", "Get in Touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...sans, color: INK }} className="text-2xl font-semibold">Visit us</h2>
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
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:bg-neutral-900 hover:text-white" style={{ border: `1px solid ${INK}`, color: INK }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Check availability"
              bookingBlurb="Share your date and guest numbers and we'll confirm availability."
              bookingCta="Check availability"
              contactTitle="Send an enquiry"
              contactBlurb="Tell us about your event and we'll be in touch with options."
              theme={{ card: CARD, cardBorder: LINE, heading: INK, blurb: SUB, label: "#8a857a", fieldBg: "#fff", fieldBorder: "#ddd8cf", fieldText: INK, button: INK, buttonText: "#fff", radius: "0.25rem", font: "var(--font-inter)" }}
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
      {/* hero — full-bleed architectural image, content lower-left */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#3b3a33,#26241f)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,19,15,0.7) 0%, rgba(20,19,15,0.1) 50%, rgba(20,19,15,0.3) 100%)" }} />
        <div className="relative z-10 mx-auto mt-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-white/85">Events &amp; Hire</p>
          <h1 style={{ ...sans, color: "#fff" }} className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.0] tracking-[-0.01em] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-base">{content.tagline}</p>}
          <div className="mt-8 flex flex-wrap gap-4">
            <a href={enquire} className="px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:opacity-90" style={{ background: "#fff" }}>Enquire</a>
            {gallery.length > 0 && <a href={href("gallery")} className="border border-white/50 px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">View the space</a>}
          </div>
        </div>
      </section>

      {/* intro split — copy left, image right */}
      {(content.about || gallery[1]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>The Venue</p>
            <h2 style={{ ...sans, color: INK }} className="mt-3 text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">A space made for gathering</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>More about us &rarr;</a>
          </div>
          {gallery[1] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[1].image_url} alt={gallery[1].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
          ) : gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
          ) : <div className="aspect-[4/5] w-full" style={{ background: "#e7e3db" }} />}
        </section>
      )}

      {/* spaces preview — thin-divider list */}
      {featured.length > 0 && (
        <section style={{ background: CARD, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>Hire Options</p>
              <h2 style={{ ...sans, color: INK }} className="mt-3 text-3xl font-semibold sm:text-4xl">Our spaces</h2>
            </div>
            <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: SAGE }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: INK }}>View all spaces</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>The Spaces</p>
                <h2 style={{ ...sans, color: INK }} className="mt-3 text-3xl font-semibold sm:text-4xl">Inside the venue</h2>
              </div>
              <a href={href("gallery")} className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: INK }}>Full gallery &rarr;</a>
            </div>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-3 sm:grid-cols-3 sm:px-6">
            {gallery.slice(0, 3).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto max-w-2xl px-8 py-24 text-center">
          <h2 style={sans} className="text-3xl font-semibold leading-tight sm:text-4xl">Host your event with us</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/65">Weddings, receptions, conferences and celebrations — let&apos;s find the right space for your day.</p>
          <a href={enquire} className="mt-8 inline-flex bg-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:opacity-90">Enquire now</a>
        </div>
      </section>
    </>,
    true,
  );
}
