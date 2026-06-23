import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ReubenHeader } from "./ReubenHeader";
import { ReubenBooking } from "./ReubenBooking";

// Reuben — a classic NEW YORK Jewish deli / sandwich counter (single venue),
// MULTI-PAGE: the nav opens real routes (Menu / Order / Gallery / About /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the sticky deli-green header and footer are shared via shell(). Palette is
// baked from the brief — deli green, mustard, pickle/olive, cream paper,
// ketchup-brick and ink — for a warm, nostalgic, vintage-grocery register
// (NOT a loud burger diner). Structural signature: a vintage hand-painted-sign
// hero on an enamel/awning-stripe panel with a confident slab-serif wordmark; a
// "the classics / by the pound" feature; a paper "order ticket" menu (clean
// divide-y rows on a cream ticket panel); enamel-pin badges and a price-board
// vibe. Display type is Fraunces, sturdy and characterful.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const DELI = "#2F5D50";     // deli green
const MUSTARD = "#E0A526";  // mustard
const OLIVE = "#6F7A3A";    // pickle / olive
const CREAM = "#F3ECDC";    // cream paper
const BRICK = "#B23A2E";    // ketchup brick
const INK = "#2A211A";      // ink

// Awning-stripe motif — the deli-storefront signature, used on ribbons + bands.
const AWNING = `repeating-linear-gradient(45deg, ${CREAM} 0 14px, ${DELI} 14px 28px)`;
const AWNING_MUSTARD = `repeating-linear-gradient(45deg, ${CREAM} 0 14px, ${MUSTARD} 14px 28px)`;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Small enamel-pin badge used across the design.
function Pin({ children, bg = MUSTARD, fg = INK }: { children: ReactNode; bg?: string; fg?: string }) {
  return (
    <span className="inline-flex items-center border-2 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em]" style={{ background: bg, color: fg, borderColor: INK, borderRadius: "2px" }}>
      {children}
    </span>
  );
}

export default function ReubenDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Menu", href: href("menu") },
    bookingOn && { label: "Order", href: href("reservations") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (ink, awning ribbon top edge, enamel CTA) ----
  const footer = (
    <footer style={{ background: INK }} className="text-[color:#F3ECDC]/85">
      <div className="h-2 w-full" style={{ backgroundImage: AWNING }} aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: MUSTARD }} className="text-3xl font-bold leading-none tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[color:#F3ECDC]/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Follow us</h4>
              <div className="mt-4 flex gap-4 text-[color:#F3ECDC]">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#E0A526]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>The counter</h4>
          <ul className="mt-5 space-y-3 text-sm text-[color:#F3ECDC]/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              bookingOn && { label: "Order ahead", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-[color:#F3ECDC]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Counter hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[color:#F3ECDC]/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F3ECDC]/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-[color:#F3ECDC]/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[color:#F3ECDC]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-[color:#F3ECDC]/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#F3ECDC]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#F3ECDC]">{content.email}</a>}
          </div>
        </div>

        {/* enamel CTA panel */}
        <div className="border-[3px] px-7 py-9 shadow-[7px_7px_0_0_#2F5D50]" style={{ background: MUSTARD, color: INK, borderColor: CREAM, borderRadius: "4px" }}>
          <h4 style={display} className="text-3xl font-bold leading-none tracking-tight">Hungry?</h4>
          <p className="mt-3 text-sm leading-relaxed">Piled-high pastrami, half-sours and rye, the way it&apos;s always been done. Order ahead or grab a table.</p>
          <a href={book} className="mt-6 inline-flex border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#F3ECDC] transition hover:opacity-90" style={{ background: DELI, borderColor: INK, borderRadius: "2px" }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t px-6 py-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-[color:#F3ECDC]/45 sm:px-8" style={{ borderColor: "rgba(243,236,220,0.12)" }}>© {name} · Est. on the corner</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: INK }} className="min-h-screen font-body">
      <ReubenHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Deli-green page banner with awning ribbon; clears the fixed header.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: DELI, color: CREAM }}>
      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <Pin bg={MUSTARD} fg={INK}>{kicker}</Pin>
        <h1 style={display} className="mt-4 text-5xl font-bold leading-[0.95] tracking-tight sm:text-6xl">{title}</h1>
      </div>
      <div className="h-2 w-full" style={{ backgroundImage: AWNING_MUSTARD }} aria-hidden />
    </section>
  );

  // ---- MENU (paper "order ticket" panel, clean divide-y rows) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The board", "On rye, on the counter")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-4xl">
            {groups.length > 0 ? (
              <>
                {/* the order-ticket panel: cream paper, ink border, perforated top */}
                <div className="border-[3px] shadow-[8px_8px_0_0_rgba(42,33,26,0.85)]" style={{ background: "#fbf7ec", borderColor: INK, borderRadius: "4px" }}>
                  <div className="flex items-center justify-between gap-4 border-b-2 border-dashed px-6 py-4 sm:px-8" style={{ borderColor: "#cdbf9e" }}>
                    <span style={{ ...display, color: DELI }} className="text-xl font-bold uppercase tracking-[0.06em]">The menu</span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:#6F7A3A]">Guest check · No. ___</span>
                  </div>
                  <div className="space-y-12 px-6 py-8 sm:px-8 sm:py-10">
                    {groups.map((section) => (
                      <div key={section.section} className="break-inside-avoid">
                        {section.section && (
                          <div className="mb-5 flex items-center gap-3">
                            <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: INK }} className="text-2xl font-bold uppercase tracking-tight">{section.section}</span>
                            <span className="h-[3px] flex-1" style={{ background: DELI }} />
                          </div>
                        )}
                        {section.categories.map((catg) => (
                          <div key={catg.category ?? "_"} className="mb-7">
                            {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRICK }}>{catg.category}</p>}
                            <ul className="divide-y-2" style={{ borderColor: "#e1d6ba" }}>
                              {catg.items.map((item) => (
                                <li key={item.id} className="flex items-baseline justify-between gap-8 py-4">
                                  <div className="min-w-0">
                                    <p data-edit={`item:${item.id}:name`} style={display} className="text-base font-bold tracking-tight text-[color:#2A211A]">{item.name}</p>
                                    {item.description && (
                                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#2A211A]/60">{item.description}</p>
                                    )}
                                  </div>
                                  {item.price && (
                                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold tabular-nums text-[color:#2F5D50]">{item.price}</span>
                                  )}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-12 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#F3ECDC] transition hover:opacity-90" style={{ background: DELI, borderColor: INK, borderRadius: "2px" }}>{o.label}{o.commission_free ? " · no fees" : ""}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="text-[color:#2A211A]/60">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / ORDER AHEAD ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("At the counter", "Order ahead / reserve a table")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-[color:#2A211A]/75">Put your order in ahead of the lunch rush, or save yourself a table. Big party of 8 or more? Give the counter a call and we&apos;ll sort it.</p>
            <ReubenBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Find the counter", "Come on in")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#2A211A]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-bold tracking-tight text-[color:#2A211A]" style={display}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#B23A2E]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#B23A2E]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-[color:#2A211A]/80" style={{ borderColor: "#cdbf9e" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#2A211A]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#F3ECDC] transition hover:opacity-90" style={{ background: DELI, borderColor: INK, borderRadius: "2px" }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a catering order or a big celebration? Tell us here and we'll get right back to you."
                  contactCta="Send it over"
                  theme={{ card: "#fbf7ec", cardBorder: INK, heading: DELI, button: DELI, buttonText: CREAM, fieldBorder: "#cdbf9e", radius: "4px", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "Since the corner stood")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-[color:#2A211A]/85">{content.about}</p> : <p className="text-[color:#2A211A]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-3xl font-bold tracking-tight text-[color:#2A211A]">What we make</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-[color:#2A211A]/80">{content.cuisine_type}</p>
              </>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("A look inside", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full border-2 object-cover" style={{ borderColor: INK }} />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#2A211A]/60" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* HERO: vintage hand-painted-sign panel over photo, awning frame, slab wordmark, inline order ticket */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: DELI }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${DELI}, ${INK})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(42,33,26,0.55), rgba(42,33,26,0.2) 38%, rgba(42,33,26,0.82))" }} />

        {/* top awning stripe along the very top of the hero */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-2.5" style={{ backgroundImage: AWNING }} aria-hidden />

        {/* enamel "by the pound" pin, top-right */}
        <div className="pointer-events-none absolute right-5 top-24 z-10 -rotate-3 sm:right-10 sm:top-28">
          <div className="flex h-24 w-24 flex-col items-center justify-center border-[3px] text-center sm:h-28 sm:w-28" style={{ background: MUSTARD, borderColor: INK, color: INK, borderRadius: "50%" }}>
            <span style={display} className="text-[11px] font-bold uppercase leading-[1.05] tracking-tight sm:text-xs">Sliced<br />by the<br />pound</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto px-6 pb-10 pt-32 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            {/* hand-painted-sign wordmark plate */}
            <div className="inline-block border-[3px] px-6 py-5 shadow-[8px_8px_0_0_rgba(42,33,26,0.6)] sm:px-9 sm:py-7" style={{ background: DELI, borderColor: CREAM, borderRadius: "6px" }}>
              <span className="block text-[10px] font-bold uppercase tracking-[0.32em]" style={{ color: MUSTARD }}>Est. New York · Delicatessen</span>
              <h1 data-edit="tenant.business_name" style={display} className="mt-1.5 text-6xl font-bold leading-[0.85] tracking-tight text-[color:#F3ECDC] sm:text-8xl lg:text-[8rem]">{name}</h1>
              <div className="mt-3 h-1 w-full" style={{ backgroundImage: AWNING_MUSTARD, borderRadius: "2px" }} />
            </div>
            {content.tagline && (
              <p data-edit="content.tagline" className="mt-5 max-w-2xl text-lg font-semibold leading-snug text-[color:#F3ECDC] [text-shadow:0_2px_14px_rgba(0,0,0,0.6)] sm:text-2xl">{content.tagline}</p>
            )}
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <ReubenBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex border-[3px] px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[color:#2A211A] shadow-[6px_6px_0_0_rgba(42,33,26,0.6)] transition hover:opacity-90" style={{ background: MUSTARD, borderColor: CREAM, borderRadius: "2px" }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* ABOUT: deli-green band with painted headline */}
      <section className="relative overflow-hidden" style={{ background: DELI }}>
        <div className="h-2 w-full" style={{ backgroundImage: AWNING_MUSTARD }} aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <Pin bg={MUSTARD} fg={INK}>Our story</Pin>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-5xl font-bold leading-[0.92] tracking-tight text-[color:#F3ECDC] sm:text-6xl">Piled high,<br />the way it<br /><span style={{ color: MUSTARD }}>always was</span></h2>
            {content.about && <p data-edit="content.about" className="text-[17px] leading-[1.85] text-[color:#F3ECDC]/85">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#2A211A] transition hover:opacity-90" style={{ background: MUSTARD, borderColor: MUSTARD, borderRadius: "2px" }}>Our story</a>
          )}
        </div>
      </section>

      {/* THE CLASSICS / BY THE POUND: feature on cream with price-board cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Pin bg={DELI} fg={CREAM}>By the pound</Pin>
                <h2 style={display} className="mt-4 text-5xl font-bold leading-[0.9] tracking-tight text-[color:#2A211A] sm:text-6xl">The classics</h2>
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-bold uppercase tracking-[0.16em] text-[color:#B23A2E] hover:opacity-70">See the full board →</a>}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden border-[3px] bg-[#fbf7ec] shadow-[7px_7px_0_0_#2A211A] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[10px_10px_0_0_#2A211A]" style={{ borderColor: INK, borderRadius: "4px" }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full border-b-[3px] object-cover" style={{ borderColor: INK }} />
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center border-b-[3px]" style={{ background: OLIVE, borderColor: INK }}>
                        <span style={display} className="text-3xl font-bold uppercase tracking-tight text-[color:#F3ECDC]/80">No. {String(i + 1).padStart(2, "0")}</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-bold tracking-tight text-[color:#2A211A]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[color:#2A211A]/60">{item.description}</p>}
                      {item.price && <span data-edit={`item:${item.id}:price`} className="mt-4 inline-flex w-fit border-2 px-3 py-1 text-sm font-bold tabular-nums text-[color:#2A211A]" style={{ background: MUSTARD, borderColor: INK, borderRadius: "2px" }}>{item.price}</span>}
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex border-2 px-8 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#F3ECDC] transition hover:opacity-90" style={{ background: DELI, borderColor: INK, borderRadius: "2px" }}>See the full board</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BIG CTA band: brick with awning frame + enamel panel */}
      <section className="relative overflow-hidden" style={{ background: BRICK }}>
        <div className="h-2 w-full" style={{ backgroundImage: AWNING_MUSTARD }} aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="border-[3px] px-8 py-12 text-center shadow-[9px_9px_0_0_#2A211A]" style={{ background: CREAM, borderColor: INK, borderRadius: "4px" }}>
            <h2 style={display} className="text-5xl font-bold leading-[0.9] tracking-tight text-[color:#2A211A] sm:text-6xl">Pull up a stool</h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[color:#2A211A]/65">Pastrami on rye · half-sour pickles · egg creams</p>
            <a href={book} className="mt-7 inline-flex border-2 px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[color:#F3ECDC] transition hover:opacity-90" style={{ background: DELI, borderColor: INK, borderRadius: "2px" }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
          </div>
        </div>
        <div className="h-2 w-full" style={{ backgroundImage: AWNING_MUSTARD }} aria-hidden />
      </section>

      {/* QUICK INFO band: hours + find us + order, on ink */}
      <section style={{ background: INK }} className="text-[color:#F3ECDC]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Counter hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#F3ECDC]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F3ECDC]/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#F3ECDC]/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[color:#F3ECDC]/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[color:#F3ECDC]/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#F3ECDC]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#F3ECDC]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex border-2 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-[color:#F3ECDC] transition hover:bg-[color:#F3ECDC] hover:text-[color:#2A211A]" style={{ borderColor: "rgba(243,236,220,0.5)", borderRadius: "2px" }}>Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Order</h3>
            <p className="mt-5 text-sm text-[color:#F3ECDC]/80">Put your order in ahead and skip the lunchtime line.</p>
            <a href={book} className="mt-5 inline-flex border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#2A211A] transition hover:opacity-90" style={{ background: MUSTARD, borderColor: MUSTARD, borderRadius: "2px" }}>{bookingOn ? "Order ahead" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
