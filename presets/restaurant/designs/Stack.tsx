import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { StackHeader } from "./StackHeader";
import { StackBooking } from "./StackBooking";

// Stack — loud, fun, retro Americana smash-burger joint (single venue),
// MULTI-PAGE: the nav opens real routes (Menu / Order / Gallery / About /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the sticky charcoal header and footer are shared via shell(). Palette is baked
// from the brief — mustard, charcoal, ketchup red, off-white — and the display
// type is Fraunces pushed to extreme black, tight, ALL CAPS. Structural
// signature: full-bleed hero with HUGE condensed type + sticker/stamp badges, a
// scrolling marquee ticker, a numbered "Build the stack" menu, thick borders and
// hard offset shadows, plus a diagonal halftone accent.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const MUSTARD = "#F2B705";
const CHARCOAL = "#161616";
const KETCHUP = "#D62828";
const CREAM = "#F7F3E8";

// Repeating dot halftone used as a graphic accent behind panels.
const HALFTONE = `radial-gradient(${CHARCOAL} 1.4px, transparent 1.4px)`;

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

export default function StackDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // ---- scrolling marquee ticker strip (signature element) ----
  const tickerWords = ["100% beef", "smashed to order", "no freezer · ever", "hand-cut fries", "milkshakes", "est. & proud", "fresh daily"];
  const ticker = (bg: string, fg: string) => (
    <div className="relative overflow-hidden border-y-[3px] py-3" style={{ background: bg, borderColor: CHARCOAL }}>
      <div className="flex w-max animate-[stack-marquee_22s_linear_infinite] gap-0 whitespace-nowrap will-change-transform">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex items-center gap-0" aria-hidden={dup === 1}>
            {tickerWords.map((w, i) => (
              <span key={`${dup}-${i}`} className="flex items-center">
                <span style={{ ...display, color: fg }} className="px-6 text-lg font-black uppercase tracking-[0.04em]">{w}</span>
                <span style={{ color: fg }} className="text-lg">★</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      <style>{`@keyframes stack-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
    </div>
  );

  // ---- shared footer (charcoal, halftone top edge, stamped CTA) ----
  const footer = (
    <footer style={{ background: CHARCOAL }} className="text-[color:#F7F3E8]">
      <div className="h-3 w-full" style={{ backgroundImage: HALFTONE, backgroundColor: MUSTARD, backgroundSize: "10px 10px" }} />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: MUSTARD }} className="text-4xl font-black uppercase leading-none tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Follow us</h4>
              <div className="mt-4 flex gap-4 text-white">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#F2B705]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>The goods</h4>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-white/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              bookingOn && { label: "Order ahead", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Open hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm font-semibold text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm font-semibold leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm font-semibold text-white/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* stamped CTA panel */}
        <div className="border-[4px] px-7 py-9 shadow-[8px_8px_0_0_#D62828]" style={{ background: MUSTARD, color: CHARCOAL, borderColor: CREAM }}>
          <h4 style={display} className="text-3xl font-black uppercase leading-none tracking-tight">Hungry?</h4>
          <p className="mt-3 text-sm font-semibold leading-relaxed">Smashed-to-order patties, crispy edges, no waiting around. Get your order on the rail.</p>
          <a href={book} className="mt-6 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CHARCOAL, borderColor: CHARCOAL }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t-[3px] px-6 py-6 text-center text-xs font-bold uppercase tracking-[0.18em] text-white/50 sm:px-8" style={{ borderColor: "rgba(247,243,232,0.15)" }}>© {name} · Est. & proud</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: CHARCOAL }} className="min-h-screen font-body">
      <StackHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Mustard page banner with halftone + offset title block; clears fixed header.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden border-b-[4px]" style={{ background: MUSTARD, borderColor: CHARCOAL, color: CHARCOAL }}>
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: HALFTONE, backgroundSize: "14px 14px" }} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <span className="inline-flex border-[3px] bg-[color:#161616] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[color:#F2B705]" style={{ borderColor: CHARCOAL }}>{kicker}</span>
        <h1 style={display} className="mt-4 text-6xl font-black uppercase leading-[0.85] tracking-tight sm:text-7xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU (numbered "Build the stack" divider rows) ----
  if (page === "menu") {
    let counter = 0;
    return shell(
      <>
        {banner("The line-up", "Build the stack")}
        {ticker(KETCHUP, CREAM)}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-4xl">
            {groups.length > 0 ? (
              <>
                <div className="space-y-14">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-6">
                          <span style={{ ...display, background: CHARCOAL, color: MUSTARD }} className="inline-block border-[3px] px-4 py-1.5 text-2xl font-black uppercase tracking-tight shadow-[5px_5px_0_0_#D62828]" >{section.section}</span>
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-8">
                          {catg.category && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: KETCHUP }}>{catg.category}</p>}
                          <ul className="divide-y-[2px]" style={{ borderColor: CHARCOAL }}>
                            {catg.items.map((item) => {
                              counter += 1;
                              const num = String(counter).padStart(2, "0");
                              return (
                                <li key={item.id} className="flex items-baseline gap-5 py-5">
                                  <span style={{ ...display, color: KETCHUP }} className="shrink-0 text-2xl font-black tabular-nums leading-none">{num}</span>
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline justify-between gap-6">
                                      <p data-edit={`item:${item.id}:name`} style={display} className="text-lg font-black uppercase leading-tight tracking-tight text-[color:#161616]">{item.name}</p>
                                      {item.price && (
                                        <span data-edit={`item:${item.id}:price`} className="shrink-0 text-base font-black text-[color:#161616]">{item.price}</span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm font-medium leading-relaxed text-[color:#161616]/65">{item.description}</p>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-16 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#F2B705] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#F2B705]" style={{ background: KETCHUP, borderColor: CHARCOAL }}>{o.label}{o.commission_free ? " · no fees" : ""}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="font-semibold text-[color:#161616]/60">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / ORDER AHEAD ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Skip the wait", "Order ahead")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] font-semibold leading-[1.7] text-[color:#161616]/75">Reserve a booth or get your order on the rail. Big crew of 8 or more? Give us a shout and we&apos;ll sort it.</p>
            <StackBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Roll up", "Find us")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] font-semibold leading-relaxed text-[color:#161616]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-black uppercase tracking-tight text-[color:#161616]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#D62828]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#D62828]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-[3px] pt-6 text-sm font-semibold text-[color:#161616]/80" style={{ borderColor: CHARCOAL }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#161616]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#F2B705] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#F2B705]" style={{ background: CHARCOAL, borderColor: CHARCOAL }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Holler at us"
                  contactBlurb="Got a question, a big party or a bit of feedback? Drop it here and we'll fire back fast."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: CHARCOAL, heading: CHARCOAL, button: KETCHUP, buttonText: "#ffffff", fieldBorder: CHARCOAL, radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("The story", "Smashed with pride")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[19px] font-semibold leading-[1.85] text-[color:#161616]/85">{content.about}</p> : <p className="font-semibold text-[color:#161616]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-4xl font-black uppercase tracking-tight text-[color:#161616]">What we cook</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] font-semibold leading-[1.8] text-[color:#161616]/80">{content.cuisine_type}</p>
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
        {banner("The goods", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full border-[3px] object-cover" style={{ borderColor: CHARCOAL }} />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center font-semibold text-[color:#161616]/60" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* HERO: full-bleed photo, HUGE condensed caps headline, stamp badges, inline order row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: CHARCOAL }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${KETCHUP}, ${CHARCOAL})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(22,22,22,0.55), rgba(22,22,22,0.2) 40%, rgba(22,22,22,0.85))" }} />

        {/* rotating stamp badges */}
        <div className="pointer-events-none absolute right-5 top-24 z-10 flex h-24 w-24 rotate-[12deg] items-center justify-center rounded-full border-[4px] text-center sm:right-10 sm:top-28 sm:h-32 sm:w-32" style={{ background: MUSTARD, borderColor: CHARCOAL, color: CHARCOAL }}>
          <span style={display} className="text-sm font-black uppercase leading-[0.95] tracking-tight sm:text-lg">100%<br />Beef</span>
        </div>

        <div className="relative z-10 mt-auto px-6 pb-10 pt-32 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex -rotate-2 border-[3px] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_0_#161616]" style={{ background: KETCHUP, borderColor: CHARCOAL, color: CREAM }}>Est. &amp; proud · smash burgers</span>
            <h1 data-edit="tenant.business_name" style={display} className="mt-4 text-[18vw] font-black uppercase leading-[0.8] tracking-tighter text-[color:#F2B705] [text-shadow:6px_6px_0_#161616] sm:text-[14vw] lg:text-[11rem]">{name}</h1>
            {content.tagline && (
              <p data-edit="content.tagline" className="mt-4 max-w-2xl text-lg font-black uppercase leading-tight tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-2xl">{content.tagline}</p>
            )}
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <StackBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex border-[3px] px-10 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[6px_6px_0_0_#161616] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#161616]" style={{ background: KETCHUP, borderColor: CREAM }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* MARQUEE TICKER */}
      {ticker(MUSTARD, CHARCOAL)}

      {/* ABOUT: charcoal band with halftone + huge headline */}
      <section className="relative overflow-hidden" style={{ background: CHARCOAL }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `radial-gradient(${MUSTARD} 1.4px, transparent 1.4px)`, backgroundSize: "16px 16px" }} aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <span className="inline-flex border-[3px] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]" style={{ borderColor: MUSTARD, color: MUSTARD }}>The story</span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-6xl font-black uppercase leading-[0.82] tracking-tight text-[color:#F2B705] sm:text-7xl">Smashed,<br />never<br /><span style={{ color: KETCHUP }}>frozen</span></h2>
            {content.about && <p data-edit="content.about" className="text-[17px] font-semibold leading-[1.8] text-white/80">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-[color:#161616] transition hover:opacity-90" style={{ background: MUSTARD, borderColor: MUSTARD }}>Our story</a>
          )}
        </div>
      </section>

      {/* THE LINE-UP: featured menu items as numbered hard-shadow cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 style={display} className="text-5xl font-black uppercase leading-[0.85] tracking-tight text-[color:#161616] sm:text-6xl">The line-up</h2>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-black uppercase tracking-[0.16em] text-[color:#D62828] hover:opacity-70">See the full menu →</a>}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const photo = gallery[i]?.image_url;
                const num = String(i + 1).padStart(2, "0");
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden border-[4px] bg-white shadow-[8px_8px_0_0_#161616] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[12px_12px_0_0_#161616]" style={{ borderColor: CHARCOAL }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full border-b-[4px] object-cover" style={{ borderColor: CHARCOAL }} />
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center border-b-[4px]" style={{ background: MUSTARD, borderColor: CHARCOAL }}>
                        <span style={display} className="text-7xl font-black text-[color:#161616]/30">{num}</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-5">
                      <div className="flex items-baseline gap-3">
                        <span style={{ ...display, color: KETCHUP }} className="text-xl font-black leading-none">{num}</span>
                        <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-black uppercase leading-tight tracking-tight text-[color:#161616]">{item.name}</h3>
                      </div>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-[color:#161616]/65">{item.description}</p>}
                      {item.price && <span data-edit={`item:${item.id}:price`} className="mt-4 inline-flex w-fit border-[3px] px-3 py-1 text-sm font-black text-[color:#161616]" style={{ background: MUSTARD, borderColor: CHARCOAL }}>{item.price}</span>}
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex border-[3px] px-8 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#F2B705] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#F2B705]" style={{ background: CHARCOAL, borderColor: CHARCOAL }}>Build the stack</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BIG CTA band: ketchup with stamped panel */}
      <section className="relative overflow-hidden" style={{ background: KETCHUP }}>
        <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: `radial-gradient(${CREAM} 1.4px, transparent 1.4px)`, backgroundSize: "16px 16px" }} aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="border-[4px] px-8 py-12 text-center shadow-[10px_10px_0_0_#161616]" style={{ background: CREAM, borderColor: CHARCOAL }}>
            <h2 style={display} className="text-5xl font-black uppercase leading-[0.85] tracking-tight text-[color:#161616] sm:text-6xl">Come get smashed</h2>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-[color:#161616]/70">Crispy edges · stacked high · no freezer ever</p>
            <a href={book} className="mt-7 inline-flex border-[3px] px-9 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[6px_6px_0_0_#F2B705] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#F2B705]" style={{ background: CHARCOAL, borderColor: CHARCOAL }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* QUICK INFO band: hours + find us + order */}
      <section style={{ background: CHARCOAL }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Open hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm font-semibold text-white/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm font-semibold leading-relaxed text-white/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm font-semibold text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex border-[3px] px-6 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[color:#161616]" style={{ borderColor: "rgba(255,255,255,0.5)" }}>Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: MUSTARD }}>Order</h3>
            <p className="mt-5 text-sm font-semibold text-white/80">Skip the line — get your order on the rail in seconds.</p>
            <a href={book} className="mt-5 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-[color:#161616] transition hover:opacity-90" style={{ background: MUSTARD, borderColor: MUSTARD }}>{bookingOn ? "Order ahead" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
