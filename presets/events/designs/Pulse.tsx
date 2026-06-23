"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EventsMobileNav } from "./EventsMobileNav";

// Pulse — bold, energetic DJ / party-hire design. Deep ink canvas, electric
// gradient (magenta → cyan), oversized condensed display headings and a high-
// contrast neon CTA. MULTI-PAGE — nav opens real routes (Packages / Gallery /
// About / Contact) under basePath, never scroll anchors. Palette and typography
// are baked; the tenant supplies their own media, packages, hours and contact.

const display = { fontFamily: "var(--font-space)" } as const;
const BG = "#0b0b12"; // deep ink
const PANEL = "#13131d"; // lifted panel
const TEXT = "#f4f3fb"; // near-white
const SUB = "#9b99ad"; // muted lavender-grey
const NEON = "#ff2d8e"; // electric magenta
const CYAN = "#22e0d6"; // electric cyan
const GRAD = "linear-gradient(90deg,#ff2d8e,#7b3ff2 55%,#22e0d6)";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("spot") || k.includes("sound") || k.includes("mix")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="2.5" fill={BG} /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Header({ name, links, book, home }: { name: string; links: { label: string; href: string }[]; book: string; home: string }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className="fixed inset-x-0 top-0 z-50 transition-colors duration-300" style={scrolled ? { background: `${BG}f2`, borderBottom: "1px solid #ffffff14", backdropFilter: "blur(10px)" } : undefined}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
        <a href={home} className="flex items-center gap-2.5">
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: GRAD }} />
          <span data-edit="tenant.business_name" style={display} className="text-lg font-extrabold uppercase tracking-[0.04em]" >{name}</span>
        </a>
        <nav className="hidden items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] md:flex" style={{ color: SUB }}>
          {links.map((l) => <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>)}
        </nav>
        <a href={book} className="hidden px-6 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-black transition hover:opacity-90 md:inline-flex" style={{ background: GRAD }}>Book the night</a>
        <EventsMobileNav links={links} cta={book} ctaLabel="Book the night" bg={BG} fg={TEXT} accent={NEON} barColor={TEXT} />
      </div>
    </header>
  );
}

export default function Pulse({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = href("contact");

  const nav = [
    groups.length > 0 && { label: "Packages", href: href("services") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: PANEL, borderTop: "1px solid #ffffff14" }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: GRAD }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.04em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: SUB }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/80 transition hover:border-white hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: CYAN }}>Menu</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: SUB }}>
            {nav.map((l) => <li key={l.label}><a href={l.href} className="font-semibold uppercase tracking-[0.12em] transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: CYAN }}>Bookings</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: SUB }}>
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-7 text-xs sm:flex-row" style={{ color: SUB }}>
        <p>© {new Date().getFullYear()} {name}. Turn it up.</p>
        <a href={book} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Book the night</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: BG }} className="min-h-screen font-body" >
      <Header name={name} links={nav} book={book} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: "1px solid #ffffff14" }}>
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: NEON }}>{kicker}</p>
        <h1 style={{ ...display, color: TEXT }} className="mt-3 text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-7xl">{title}</h1>
        <span className="mt-6 block h-1 w-24" style={{ background: GRAD }} />
      </div>
    </section>
  );

  // ---- PACKAGES (services) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What You Get", "Packages")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, gi) => (
                <div key={section.section || gi} className={gi > 0 ? "mt-16" : ""}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: TEXT }} className="text-2xl font-extrabold uppercase tracking-tight">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: CYAN }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: "#ffffff1f" }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-bold uppercase tracking-[0.02em]" style={{ color: TEXT }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed normal-case" style={{ color: SUB }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: NEON }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="mt-12">
                <a href={book} className="inline-flex px-9 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:opacity-90" style={{ background: GRAD }}>Book the night</a>
              </div>
            </>
          ) : <p style={{ color: SUB }}>Packages dropping soon.</p>}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("On The Floor", "Gallery")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-24 text-center" style={{ color: SUB }}>Shots from the floor coming soon.</p>}
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The Crew", "About")}
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
          ) : <div className="aspect-[4/5] w-full" style={{ background: PANEL }} />}
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SUB }}>{content.about}</p> : <p style={{ color: SUB }}>Our story is coming soon.</p>}
            <a href={book} className="mt-9 inline-flex px-9 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:opacity-90" style={{ background: GRAD }}>Book us</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Lock It In", "Get in Touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...display, color: TEXT }} className="text-2xl font-extrabold uppercase">Bookings &amp; enquiries</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SUB }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: SUB }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
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
              bookingBlurb="Drop your date and we'll let you know if we're free to bring the noise."
              bookingCta="Check availability"
              contactTitle="Send a message"
              contactBlurb="Got a question or a one-off request? Hit us up."
              theme={{ card: PANEL, cardBorder: "#ffffff1f", heading: TEXT, blurb: SUB, label: "#b9b7c9", fieldBg: "#0e0e16", fieldBorder: "#ffffff26", fieldText: TEXT, button: NEON, buttonText: "#0b0b12", radius: "0.4rem", font: "var(--font-space)" }}
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
      <section className="relative isolate flex min-h-[100vh] items-center overflow-hidden">
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at 30% 20%, #3a1340, #0b0b12 60%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,11,18,0.92) 0%, rgba(11,11,18,0.45) 50%, rgba(11,11,18,0.7) 100%)" }} />
        <div className="pointer-events-none absolute -left-24 top-1/3 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: NEON }} />
        <div className="pointer-events-none absolute -right-24 bottom-1/4 h-72 w-72 rounded-full opacity-30 blur-3xl" style={{ background: CYAN }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.42em]" style={{ color: CYAN }}>DJ &amp; Party Hire</p>
          <h1 style={{ ...display, color: "#fff" }} className="mt-4 max-w-4xl text-6xl font-extrabold uppercase leading-[0.92] tracking-[-0.02em] [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-6 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{content.tagline}</p>}
          <div className="mt-9 flex flex-wrap gap-4">
            <a href={book} className="px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:opacity-90" style={{ background: GRAD }}>Book the night</a>
            {groups.length > 0 && <a href={href("services")} className="border border-white/40 px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-black">See packages</a>}
          </div>
        </div>
      </section>

      {/* intro statement */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-8 py-24 text-center">
          <p data-edit="content.about" style={{ ...display, color: TEXT }} className="text-2xl font-bold leading-[1.4] sm:text-3xl">{content.about}</p>
          <a href={href("about")} className="mt-8 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: NEON }}>Meet the crew &rarr;</a>
        </section>
      )}

      {/* packages preview — thin-divider list */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff14" }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <div className="text-center">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: NEON }}>What You Get</p>
              <h2 style={{ ...display, color: TEXT }} className="mt-3 text-4xl font-extrabold uppercase sm:text-5xl">Packages</h2>
            </div>
            <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: "#ffffff1f" }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-bold uppercase tracking-[0.02em]" style={{ color: TEXT }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SUB }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: NEON }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex px-9 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:opacity-90" style={{ background: GRAD }}>All packages</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-8 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: CYAN }}>On The Floor</p>
            <h2 style={{ ...display, color: TEXT }} className="mt-3 text-4xl font-extrabold uppercase sm:text-5xl">Nights we&apos;ve lit up</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-3 sm:grid-cols-4 sm:px-6">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex border border-white/40 px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black">View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: PANEL, borderTop: "1px solid #ffffff14" }}>
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1" style={{ background: GRAD }} />
        <div className="mx-auto max-w-2xl px-8 py-24 text-center">
          <h2 style={{ ...display, color: TEXT }} className="text-4xl font-extrabold uppercase leading-[0.95] sm:text-5xl">Let&apos;s throw a party they&apos;ll never forget</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: SUB }}>Weddings, birthdays, festivals, corporate blowouts — tell us the vibe and we&apos;ll bring the energy.</p>
          <a href={book} className="mt-8 inline-flex px-10 py-4 text-[11px] font-bold uppercase tracking-[0.2em] text-black transition hover:opacity-90" style={{ background: GRAD }}>Book the night</a>
        </div>
      </section>
    </>,
  );
}
