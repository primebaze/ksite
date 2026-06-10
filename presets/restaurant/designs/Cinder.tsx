import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CinderHeader } from "./CinderHeader";
import { CinderBooking } from "./CinderBooking";

// Cinder — warm-dark premium steakhouse & cocktail lounge design (single venue),
// MULTI-PAGE: the nav opens real routes (Menus / Gallery / Reservations / About /
// Contact) under basePath, never scroll anchors. Each page is its own layout; the
// sticky header and near-black footer are shared. Palette is baked (warm near-black
// / brass gold / cream serif headings); the tenant swaps in their own photography,
// copy, menu, hours and address. Recreates the Kobe Mayfair structure adapted to a
// single venue.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const DARK = "#14100e"; // warm near-black page
const PANEL = "#1b1613"; // slightly lifted panel
const GOLD = "#b08d57"; // brass accent
const CREAM = "#f4efe7"; // serif heading / light text
const MUTE = "#a9a097"; // muted warm grey body text

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Small kicker with gold rules either side, used above every section title.
function Kicker({ children, center = true }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
      <span className="h-px w-7" style={{ background: GOLD }} />
      {children}
      <span className="h-px w-7" style={{ background: GOLD }} />
    </p>
  );
}

export default function CinderDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.reservation_url || href("contact");

  const nav = [
    groups.length > 0 && { label: "Menus", href: href("menu") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: DARK, borderTop: `1px solid ${GOLD}26` }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        {/* crest + blurb + socials */}
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl lowercase tracking-[0.06em]" >{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.4em] text-white/55">Steakhouse &amp; Lounge</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-white" style={{ border: `1px solid ${GOLD}55` }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        {/* quick links */}
        <div>
          <h4 style={{ ...serif, color: CREAM }} className="text-lg">Quick Links</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              bookingOn && { label: "Book a table", href: book },
              groups.length > 0 && { label: "Menus", href: href("menu") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="uppercase tracking-[0.14em] transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        {/* contact */}
        <div>
          <h4 style={{ ...serif, color: CREAM }} className="text-lg">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        {/* opening hours */}
        <div>
          <h4 style={{ ...serif, color: CREAM }} className="text-lg">Opening Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white">Reservations &amp; enquiries</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: DARK }} className="min-h-screen font-body text-white">
      <CinderHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Dark page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${GOLD}26` }}>
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...serif, color: CREAM }} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Our Menus", "Culinary Excellence")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <>
              {/* tab-style section labels (anchor jumps within this page) */}
              {groups.length > 1 && (
                <div className="mb-12 flex flex-wrap justify-center gap-3">
                  {groups.map((s, gi) => (
                    <a key={s.section || gi} href={`#sec-${gi}`} className="border px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:bg-white hover:text-neutral-900" style={{ borderColor: `${GOLD}66`, color: CREAM }}>{s.section || "Menu"}</a>
                  ))}
                </div>
              )}

              <div className="relative px-5 py-12 sm:px-12" style={{ background: PANEL, border: `1px solid ${GOLD}40` }}>
                <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t" style={{ borderColor: GOLD }} />
                <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r" style={{ borderColor: GOLD }} />

                {groups.map((section, gi) => (
                  <div key={section.section || gi} id={`sec-${gi}`} className={gi > 0 ? "mt-16" : ""}>
                    {section.section && (
                      <h2 style={{ ...serif, color: GOLD }} className="text-center text-3xl">{section.section}</h2>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mt-10">
                        {catg.category && (
                          <p className="mb-6 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: CREAM }}>
                            <span className="h-px w-8" style={{ background: `${GOLD}66` }} />{catg.category}<span className="h-px w-8" style={{ background: `${GOLD}66` }} />
                          </p>
                        )}
                        <ul className="divide-y" style={{ borderColor: "#ffffff26" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: CREAM }}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}

                <p className="mt-12 text-center text-[11px] uppercase tracking-[0.2em]" style={{ color: "#ffffff55" }}>Please inform us of any allergies.</p>
                {bookingOn && (
                  <div className="mt-8 text-center">
                    <a href={book} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>Book a table</a>
                  </div>
                )}
              </div>

              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:opacity-90" style={{ background: GOLD }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-center" style={{ color: MUTE }}>Our menu is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Reserve a Table")}
        <section className="mx-auto max-w-xl px-6 py-20 sm:px-8">
          <p className="mb-10 text-center text-[16px] leading-[1.8]" style={{ color: MUTE }}>
            Book your table below and we will confirm by phone or email. For parties of 8 or more, or private dining enquiries, please call us directly.
          </p>
          <CinderBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit Us", "Get in Touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: CREAM }} className="text-2xl">Find us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a note"
                contactBlurb="Questions, private dining or anything else? We will get back to you."
                contactCta="Send note"
                theme={{ card: PANEL, cardBorder: `${GOLD}55`, heading: CREAM, blurb: MUTE, label: "#cbbfb1", fieldBg: "transparent", fieldBorder: "#ffffff33", fieldText: "#f4efe7", button: GOLD, buttonText: "#171310", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our Story", "A Dining Experience Like No Other")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.cuisine_type && (
            <>
              <h3 style={{ ...serif, color: CREAM }} className="mt-12 text-2xl">A taste of what we do</h3>
              <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8]" style={{ color: MUTE }}>{content.cuisine_type}</p>
            </>
          )}
          {bookingOn && (
            <div className="mt-12">
              <a href={book} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>Book a table</a>
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
        {banner("Inside", "A Look Inside")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 8);
  const heroLines = name.trim().split(/\s+/);
  const heroTop = heroLines[0] ?? name;
  const heroRest = heroLines.slice(1).join(" ");

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#2a211b,#14100e)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,6,0.85) 0%, rgba(10,8,6,0.35) 45%, rgba(10,8,6,0.45) 100%)" }} />
        <div className="relative z-10 m-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="inline-flex px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/90" style={{ border: `1px solid ${GOLD}` }}>Now Taking Bookings</span>
          <h1 style={{ ...serif, color: "#ffffff" }} className="text-5xl font-medium leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-7xl">
            <span data-edit="tenant.business_name" className="block">{heroTop}</span>
            {heroRest && <span className="block" style={{ color: GOLD }}>{heroRest}</span>}
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="max-w-xl text-[15px] leading-relaxed text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-base">{content.tagline}</p>}
          <div className="mt-2 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a href={book} className="w-full px-9 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 shadow-2xl transition hover:opacity-90 sm:w-auto" style={{ background: GOLD }}>Book a table</a>
            {groups.length > 0 && (
              <a href={href("menu")} className="w-full px-9 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 sm:w-auto" style={{ border: "1px solid rgba(255,255,255,0.6)" }}>View menus</a>
            )}
          </div>
        </div>
      </section>

      {/* our story — image left, copy right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: PANEL, border: `1px solid ${GOLD}40` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 border-b border-r" style={{ borderColor: GOLD }} />
          </div>
          <div>
            <Kicker center={false}>Our Story</Kicker>
            <h2 style={{ ...serif, color: CREAM }} className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">A Dining Experience Like No Other</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            {content.about && (
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Read more &rarr;</a>
            )}
          </div>
        </section>
      )}

      {/* info band — Location / Opening Hours / Contact */}
      <section style={{ background: PANEL, borderTop: `1px solid ${GOLD}26`, borderBottom: `1px solid ${GOLD}26` }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 text-center md:grid-cols-3">
          <div className="flex flex-col items-center">
            <h3 style={{ ...serif, color: CREAM }} className="text-xl">Location</h3>
            {content.address && <p data-edit="content.address" className="mt-4 max-w-xs whitespace-pre-line text-sm leading-relaxed" style={{ color: MUTE }}>{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>Get directions</a>
            )}
          </div>
          <div className="flex flex-col items-center">
            <h3 style={{ ...serif, color: CREAM }} className="text-xl">Opening Hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 w-full max-w-xs space-y-2 text-sm" style={{ color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm" style={{ color: MUTE }}>Open daily.</p>}
          </div>
          <div className="flex flex-col items-center">
            <h3 style={{ ...serif, color: CREAM }} className="text-xl">Contact Us</h3>
            <div className="mt-4 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            </div>
            <a href={href("contact")} className="mt-5 inline-flex px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>Email us</a>
          </div>
        </div>
      </section>

      {/* reservation teaser */}
      {bookingOn && (
        <section className="mx-auto max-w-3xl px-8 py-24 text-center">
          <Kicker>Reservations</Kicker>
          <h2 style={{ ...serif, color: CREAM }} className="mt-4 text-4xl font-medium sm:text-5xl">Reserve a Table</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }}>Reserve your table for an unforgettable evening of warm hospitality, fine cuts and considered cocktails.</p>
          <div className="relative mx-auto mt-10 max-w-md px-8 py-10" style={{ background: PANEL, border: `1px solid ${GOLD}55` }}>
            <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t" style={{ borderColor: GOLD }} />
            <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r" style={{ borderColor: GOLD }} />
            <a href={book} className="inline-flex w-full justify-center px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:opacity-90" style={{ background: GOLD }}>Book a table</a>
          </div>
        </section>
      )}

      {/* menu highlights → full menu page */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${GOLD}26` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="text-center">
              <Kicker>Our Menus</Kicker>
              <h2 style={{ ...serif, color: CREAM }} className="mt-4 text-4xl font-medium sm:text-5xl">Culinary Excellence</h2>
            </div>
            <ul className="mx-auto mt-14 max-w-xl divide-y" style={{ borderColor: "#ffffff26" }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: CREAM }}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-14 text-center">
              <a href={href("menu")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>View full menu</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip → full gallery page */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-8 text-center">
            <Kicker>Inside {heroTop}</Kicker>
            <h2 style={{ ...serif, color: CREAM }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-snug sm:text-4xl">Warm, welcoming rooms and a cosy cocktail lounge for every occasion.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${GOLD}`, color: CREAM }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA band */}
      <section style={{ background: PANEL, borderTop: `1px solid ${GOLD}26` }}>
        <div className="mx-auto max-w-2xl px-8 py-20 text-center">
          <h2 style={{ ...serif, color: CREAM }} className="text-3xl font-medium sm:text-4xl">Celebrate with us</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }}>Treat your loved ones and friends to an exceptional dining experience where premium ingredients, expert hospitality and a warm atmosphere come together.</p>
          <a href={book} className="mt-8 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:opacity-90" style={{ background: GOLD }}>{bookingOn ? "Book a table" : "Contact us"}</a>
        </div>
      </section>
    </>,
    false,
  );
}
