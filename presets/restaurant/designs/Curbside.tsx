import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CurbsideHeader } from "./CurbsideHeader";
import { CurbsideBooking } from "./CurbsideBooking";

// Curbside — a loud, urban STREET-FOOD TRUCK (single vendor, but it MOVES),
// MULTI-PAGE: the nav opens real routes (Menu / Book us / Gallery / About /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the asphalt header and footer are shared via shell(). Palette is baked from
// the brief — electric tangerine, asphalt charcoal, spray-can teal, hazard
// yellow, concrete grey — and the display type is Fraunces pushed to extreme
// black, condensed, ALL CAPS with a stencil/spray voice. Structural signature
// (owned by no sibling): a "FIND US TODAY" location banner with day/spot chips
// because a truck moves around, a "this week's stops" schedule strip, a
// sticker-bombed menu board, tape + hazard-stripe + sticker motifs, hard offset
// shadows and gritty urban energy.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const TANGERINE = "#F5631E";
const ASPHALT = "#1B1B1D";
const TEAL = "#18A39B";
const HAZARD = "#FFD23F";
const CONCRETE = "#E7E3DC";

// Diagonal hazard caution stripe — a recurring street motif.
const HAZARD_STRIPE = `repeating-linear-gradient(45deg, ${HAZARD} 0, ${HAZARD} 14px, ${ASPHALT} 14px, ${ASPHALT} 28px)`;
// Rotating sticker accent colours for the menu board + chips.
const STICKER_TINTS = [TANGERINE, TEAL, HAZARD];

// Default weekly pitch schedule (a truck always advertises where it'll be).
// Tenants without their own hours fall back to this so the section never empties.
const DEFAULT_STOPS = [
  { day: "Mon", open: "Off the road" },
  { day: "Tue", open: "Riverside Market · 11–3" },
  { day: "Wed", open: "Tech Park · 12–2" },
  { day: "Thu", open: "Night Market · 5–10" },
  { day: "Fri", open: "Harbour Lot · 5–late" },
  { day: "Sat", open: "Street Food Fest · 12–late" },
  { day: "Sun", open: "Roast Yard · 12–6" },
];

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

export default function CurbsideDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.reservation_url || href("contact");

  // The truck's weekly stops: prefer the tenant's own hours, else a sensible
  // street-food default so the "where to find us" idea always reads.
  const stops = content.hours && content.hours.length > 0 ? content.hours : DEFAULT_STOPS;
  const usingOwnHours = !!(content.hours && content.hours.length > 0);

  const nav = [
    groups.length > 0 && { label: "Menu", href: href("menu") },
    bookingOn && { label: "Book us", href: href("reservations") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Find us", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- "FIND US TODAY" banner: the signature element. A truck moves, so the
  // top-of-funnel question is always "where is it right now?". Day/spot chips. ----
  const findUsBanner = (
    <section className="relative overflow-hidden border-y-[4px]" style={{ background: TEAL, borderColor: ASPHALT }}>
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: `radial-gradient(${ASPHALT} 1.5px, transparent 1.5px)`, backgroundSize: "14px 14px" }} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-wrap items-center gap-4">
          <span className="inline-flex shrink-0 items-center gap-2 border-[3px] bg-[color:#1B1B1D] px-4 py-2" style={{ borderColor: ASPHALT, borderRadius: "0.4rem" }}>
            <span className="h-2.5 w-2.5 animate-pulse rounded-full" style={{ background: TANGERINE }} aria-hidden />
            <span style={{ ...display, color: HAZARD }} className="text-sm font-black uppercase tracking-[0.18em]">Find us today</span>
          </span>
          {content.address ? (
            <p data-edit="content.address" style={display} className="text-2xl font-black uppercase leading-none tracking-tight text-[color:#1B1B1D] sm:text-3xl">{content.address}</p>
          ) : (
            <p style={display} className="text-2xl font-black uppercase leading-none tracking-tight text-[color:#1B1B1D] sm:text-3xl">Chasing the city · check the stops</p>
          )}
          {content.map_url && (
            <a href={content.map_url} target="_blank" rel="noreferrer" className="ml-auto inline-flex border-[3px] bg-white px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.16em] text-[color:#1B1B1D] shadow-[4px_4px_0_0_#1B1B1D] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1B1B1D]" style={{ borderColor: ASPHALT, borderRadius: "0.4rem" }}>Map it →</a>
          )}
        </div>
        {/* quick day chips — a glance at where the truck rolls this week */}
        <div className="mt-5 flex flex-wrap gap-2">
          {stops.slice(0, 7).map((s, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 border-[2.5px] bg-white px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em] text-[color:#1B1B1D]" style={{ borderColor: ASPHALT, borderRadius: "999px" }}>
              <span data-edit={usingOwnHours ? `hours:${i}:day` : undefined} className="text-[color:#F5631E]">{s.day}</span>
              <span data-edit={usingOwnHours ? `hours:${i}:open` : undefined} className="text-[color:#1B1B1D]/70">{s.open}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );

  // ---- shared footer (asphalt, hazard top edge, sticker CTA) ----
  const footer = (
    <footer style={{ background: ASPHALT }} className="text-[color:#E7E3DC]">
      <div className="h-2.5 w-full" style={{ backgroundImage: HAZARD_STRIPE }} aria-hidden />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: "#FFFFFF" }} className="text-4xl font-black uppercase leading-none tracking-tight [text-shadow:2px_2px_0_#F5631E]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm font-semibold leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-black uppercase tracking-[0.2em]" style={{ color: HAZARD }}>Track the truck</h4>
              <div className="mt-4 flex gap-4 text-white">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#F5631E]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: HAZARD }}>The truck</h4>
          <ul className="mt-5 space-y-3 text-sm font-semibold text-white/65">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              bookingOn && { label: "Book us", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Find us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: HAZARD }}>This week&apos;s stops</h4>
          <ul className="mt-5 space-y-2 text-sm font-semibold text-white/65">
            {stops.map((h, i) => (
              <li key={i} className="flex justify-between gap-5"><span data-edit={usingOwnHours ? `hours:${i}:day` : undefined} className="text-[color:#FFD23F]">{h.day}</span><span data-edit={usingOwnHours ? `hours:${i}:open` : undefined} className="text-right text-white/50">{h.open}</span></li>
            ))}
          </ul>
          <div className="mt-6 space-y-1.5 text-sm font-semibold text-white/65">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* sticker CTA panel */}
        <div className="border-[4px] px-7 py-9 shadow-[8px_8px_0_0_#18A39B]" style={{ background: TANGERINE, color: ASPHALT, borderColor: HAZARD, borderRadius: "0.6rem" }}>
          <h4 style={display} className="text-3xl font-black uppercase leading-none tracking-tight">Got a gig?</h4>
          <p className="mt-3 text-sm font-semibold leading-relaxed">Festivals, weddings, office lunches, street parties — wherever there&apos;s a hungry crowd, we&apos;ll roll up.</p>
          <a href={book} className="mt-6 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: ASPHALT, borderColor: ASPHALT, borderRadius: "0.4rem" }}>{bookingOn ? "Book us" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t-[3px] px-6 py-6 text-center text-xs font-black uppercase tracking-[0.18em] text-white/45 sm:px-8" style={{ borderColor: "rgba(231,227,220,0.15)" }}>© {name} · Roll up &amp; roll out</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CONCRETE, color: ASPHALT }} className="min-h-screen font-body">
      <CurbsideHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Asphalt page banner with spray-paint title + sticker kicker; clears header.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: ASPHALT }}>
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: `radial-gradient(${HAZARD} 1.5px, transparent 1.5px)`, backgroundSize: "16px 16px" }} aria-hidden />
      <div className="absolute bottom-0 left-0 h-2 w-full" style={{ backgroundImage: HAZARD_STRIPE }} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-8 sm:pb-18 sm:pt-36">
        <span className="inline-flex -rotate-2 border-[3px] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_0_#18A39B]" style={{ background: TANGERINE, borderColor: HAZARD, color: "#FFFFFF", borderRadius: "0.3rem" }}>{kicker}</span>
        <h1 style={display} className="mt-4 text-6xl font-black uppercase leading-[0.82] tracking-tight text-white [text-shadow:4px_4px_0_#F5631E] sm:text-7xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU (sticker-bombed board: divider rows on a board, sticker prices) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("From the hatch", "The board")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CONCRETE }}>
          <div className="mx-auto max-w-4xl">
            {groups.length > 0 ? (
              <>
                {/* the menu board panel — taped to the truck */}
                <div className="relative border-[4px] bg-white px-6 py-10 shadow-[12px_12px_0_0_#1B1B1D] sm:px-10" style={{ borderColor: ASPHALT, borderRadius: "0.6rem" }}>
                  {/* tape corners */}
                  <span className="absolute -left-3 -top-3 h-7 w-16 -rotate-12 opacity-90" style={{ background: HAZARD, border: `2px solid ${ASPHALT}` }} aria-hidden />
                  <span className="absolute -right-3 -top-3 h-7 w-16 rotate-12 opacity-90" style={{ background: TEAL, border: `2px solid ${ASPHALT}` }} aria-hidden />
                  <div className="space-y-12">
                    {groups.map((section, si) => (
                      <div key={section.section} className="break-inside-avoid">
                        {section.section && (
                          <div className="mb-6">
                            <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, background: STICKER_TINTS[si % STICKER_TINTS.length], color: ASPHALT, borderColor: ASPHALT }} className="inline-block -rotate-1 border-[3px] px-4 py-1.5 text-2xl font-black uppercase tracking-tight shadow-[4px_4px_0_0_#1B1B1D]">{section.section}</span>
                          </div>
                        )}
                        {section.categories.map((catg) => (
                          <div key={catg.category ?? "_"} className="mb-8">
                            {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: TEAL }}>{catg.category}</p>}
                            <ul className="divide-y-[2.5px]" style={{ borderColor: ASPHALT }}>
                              {catg.items.map((item) => (
                                <li key={item.id} className="flex items-baseline gap-5 py-5">
                                  <div className="min-w-0 flex-1">
                                    <div className="flex items-baseline justify-between gap-6">
                                      <p data-edit={`item:${item.id}:name`} style={display} className="text-lg font-black uppercase leading-tight tracking-tight text-[color:#1B1B1D]">{item.name}</p>
                                      {item.price && (
                                        <span data-edit={`item:${item.id}:price`} className="inline-flex shrink-0 border-[2.5px] px-2.5 py-0.5 text-sm font-black text-[color:#1B1B1D]" style={{ background: HAZARD, borderColor: ASPHALT, borderRadius: "0.3rem" }}>{item.price}</span>
                                      )}
                                    </div>
                                    {item.description && (
                                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm font-medium leading-relaxed text-[color:#1B1B1D]/65">{item.description}</p>
                                    )}
                                  </div>
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
                  <div className="mt-16 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#18A39B] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#18A39B]" style={{ background: TANGERINE, borderColor: ASPHALT, borderRadius: "0.4rem" }}>{o.label}{o.commission_free ? " · no fees" : ""}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="font-semibold text-[color:#1B1B1D]/60">Our menu is coming soon — follow us for the drop.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- BOOK US (catering / event enquiry) ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Roll up to yours", "Book the truck")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CONCRETE }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] font-semibold leading-[1.7] text-[color:#1B1B1D]/75">Festivals, weddings, office lunches, street parties — tell us the where and the when and we&apos;ll roll back with menus and a quote.</p>
            <CurbsideBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- FIND US / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Catch the truck", "Find us")}
        {findUsBanner}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CONCRETE }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] font-semibold leading-relaxed text-[color:#1B1B1D]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-black uppercase tracking-tight text-[color:#1B1B1D]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#F5631E]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#F5631E]">{content.email}</a>}
              </div>
              <div className="mt-8 max-w-xs border-t-[3px] pt-6" style={{ borderColor: ASPHALT }}>
                <p className="mb-3 text-xs font-black uppercase tracking-[0.18em]" style={{ color: TEAL }}>Where we roll this week</p>
                <ul className="space-y-2 text-sm font-semibold text-[color:#1B1B1D]/80">
                  {stops.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={usingOwnHours ? `hours:${i}:day` : undefined} className="text-[color:#F5631E]">{h.day}</span><span data-edit={usingOwnHours ? `hours:${i}:open` : undefined} className="text-right text-[color:#1B1B1D]/55">{h.open}</span></li>
                  ))}
                </ul>
              </div>
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#18A39B] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#18A39B]" style={{ background: ASPHALT, borderColor: ASPHALT, borderRadius: "0.4rem" }}>Map the truck</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Holler at us"
                  contactBlurb="Spotted us and missed us? Want us at your spot? Drop a line and we'll roll back fast."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: ASPHALT, heading: ASPHALT, button: TANGERINE, buttonText: "#ffffff", fieldBorder: ASPHALT, radius: "0.5rem", font: "var(--font-fraunces)" }}
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
        {banner("Our lane", "Born on the curb")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CONCRETE }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[19px] font-semibold leading-[1.85] text-[color:#1B1B1D]/85">{content.about}</p> : <p className="font-semibold text-[color:#1B1B1D]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-4xl font-black uppercase tracking-tight text-[color:#1B1B1D]">What we sling</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] font-semibold leading-[1.8] text-[color:#1B1B1D]/80">{content.cuisine_type}</p>
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
        {banner("Out on the street", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: CONCRETE }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full border-[3px] object-cover" style={{ borderColor: ASPHALT }} />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center font-semibold text-[color:#1B1B1D]/60" style={{ background: CONCRETE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* HERO: full-bleed photo, stencil/spray headline, sticker badge, inline book row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: ASPHALT }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${TANGERINE}, ${ASPHALT})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(27,27,29,0.55), rgba(27,27,29,0.2) 40%, rgba(27,27,29,0.9))" }} />

        {/* spray-can sticker badge */}
        <div className="pointer-events-none absolute right-5 top-24 z-10 flex h-24 w-24 rotate-[-10deg] items-center justify-center rounded-full border-[4px] text-center sm:right-10 sm:top-28 sm:h-32 sm:w-32" style={{ background: HAZARD, borderColor: ASPHALT, color: ASPHALT }}>
          <span style={display} className="text-sm font-black uppercase leading-[0.95] tracking-tight sm:text-lg">Street<br />Food</span>
        </div>

        <div className="relative z-10 mt-auto px-6 pb-10 pt-32 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-6xl">
            <span className="inline-flex -rotate-2 border-[3px] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] shadow-[4px_4px_0_0_#1B1B1D]" style={{ background: TEAL, borderColor: HAZARD, color: "#FFFFFF", borderRadius: "0.3rem" }}>Always on the move · catch us if you can</span>
            <h1 data-edit="tenant.business_name" style={display} className="mt-4 text-[18vw] font-black uppercase leading-[0.78] tracking-tighter text-white [text-shadow:6px_6px_0_#F5631E] sm:text-[14vw] lg:text-[11rem]">{name}</h1>
            {content.tagline && (
              <p data-edit="content.tagline" className="mt-4 max-w-2xl text-lg font-black uppercase leading-tight tracking-tight text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] sm:text-2xl">{content.tagline}</p>
            )}
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <CurbsideBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex border-[3px] px-10 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[6px_6px_0_0_#1B1B1D] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#1B1B1D]" style={{ background: TANGERINE, borderColor: HAZARD, borderRadius: "0.4rem" }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* FIND US TODAY banner — the signature "where's the truck?" strip */}
      {findUsBanner}

      {/* ABOUT: tangerine band with halftone + big spray headline */}
      <section className="relative overflow-hidden" style={{ background: TANGERINE }}>
        <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: `radial-gradient(${ASPHALT} 1.5px, transparent 1.5px)`, backgroundSize: "16px 16px" }} aria-hidden />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <span className="inline-flex border-[3px] px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em] text-[color:#1B1B1D]" style={{ borderColor: ASPHALT, background: HAZARD, borderRadius: "0.3rem" }}>Our lane</span>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-6xl font-black uppercase leading-[0.82] tracking-tight text-[color:#1B1B1D] [text-shadow:4px_4px_0_#FFD23F] sm:text-7xl">No fixed<br />address,<br /><span style={{ color: "#FFFFFF", textShadow: `4px 4px 0 ${ASPHALT}` }}>big flavour</span></h2>
            {content.about && <p data-edit="content.about" className="text-[17px] font-semibold leading-[1.8] text-[color:#1B1B1D]/85">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: ASPHALT, borderColor: ASPHALT, borderRadius: "0.4rem" }}>Our story</a>
          )}
        </div>
      </section>

      {/* THE BOARD: featured menu items as sticker-bombed hard-shadow cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: CONCRETE }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 style={display} className="text-5xl font-black uppercase leading-[0.85] tracking-tight text-[color:#1B1B1D] sm:text-6xl">Off the board</h2>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-black uppercase tracking-[0.16em] text-[color:#18A39B] hover:opacity-70">See the full menu →</a>}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const photo = gallery[i]?.image_url;
                const tint = STICKER_TINTS[i % STICKER_TINTS.length];
                return (
                  <a key={item.id} href={href("menu")} className="group relative flex flex-col overflow-hidden border-[4px] bg-white shadow-[8px_8px_0_0_#1B1B1D] transition hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-[12px_12px_0_0_#1B1B1D]" style={{ borderColor: ASPHALT, borderRadius: "0.5rem" }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full border-b-[4px] object-cover" style={{ borderColor: ASPHALT }} />
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center border-b-[4px]" style={{ background: tint, borderColor: ASPHALT }}>
                        <span style={display} className="text-6xl font-black uppercase text-[color:#1B1B1D]/30">{name.slice(0, 1)}</span>
                      </div>
                    )}
                    {/* corner sticker dot */}
                    <span className="absolute right-3 top-3 z-10 h-6 w-6 rounded-full border-[3px]" style={{ background: tint, borderColor: ASPHALT }} aria-hidden />
                    <div className="flex flex-1 flex-col p-5">
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-black uppercase leading-tight tracking-tight text-[color:#1B1B1D]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm font-medium leading-relaxed text-[color:#1B1B1D]/65">{item.description}</p>}
                      {item.price && <span data-edit={`item:${item.id}:price`} className="mt-4 inline-flex w-fit border-[3px] px-3 py-1 text-sm font-black text-[color:#1B1B1D]" style={{ background: HAZARD, borderColor: ASPHALT, borderRadius: "0.3rem" }}>{item.price}</span>}
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex border-[3px] px-8 py-3 text-xs font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#18A39B] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#18A39B]" style={{ background: ASPHALT, borderColor: ASPHALT, borderRadius: "0.4rem" }}>See the whole board</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* BIG CTA band: asphalt with hazard-edged sticker panel */}
      <section className="relative overflow-hidden" style={{ background: ASPHALT }}>
        <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: `radial-gradient(${HAZARD} 1.5px, transparent 1.5px)`, backgroundSize: "16px 16px" }} aria-hidden />
        <div className="relative mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="border-[4px] px-8 py-12 text-center shadow-[10px_10px_0_0_#18A39B]" style={{ background: TANGERINE, borderColor: HAZARD, borderRadius: "0.6rem" }}>
            <h2 style={display} className="text-5xl font-black uppercase leading-[0.85] tracking-tight text-[color:#1B1B1D] sm:text-6xl">Book us for your gig</h2>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.18em] text-[color:#1B1B1D]/80">Festivals · weddings · markets · street parties</p>
            <a href={book} className="mt-7 inline-flex border-[3px] px-9 py-4 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[6px_6px_0_0_#1B1B1D] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#1B1B1D]" style={{ background: ASPHALT, borderColor: ASPHALT, borderRadius: "0.4rem" }}>{bookingOn ? "Book the truck" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* QUICK INFO band: this week's stops + find us + book */}
      <section style={{ background: ASPHALT }} className="text-white">
        <div className="h-2.5 w-full" style={{ backgroundImage: HAZARD_STRIPE }} aria-hidden />
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: HAZARD }}>This week&apos;s stops</h3>
            <ul className="mt-5 space-y-2 text-sm font-semibold text-white/80">
              {stops.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={usingOwnHours ? `hours:${i}:day` : undefined} className="text-[color:#F5631E]">{h.day}</span><span data-edit={usingOwnHours ? `hours:${i}:open` : undefined} className="text-right text-white/55">{h.open}</span></li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: HAZARD }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm font-semibold leading-relaxed text-white/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm font-semibold text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex border-[3px] px-6 py-2.5 text-xs font-black uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[color:#1B1B1D]" style={{ borderColor: "rgba(255,255,255,0.5)", borderRadius: "0.4rem" }}>Map the truck</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em]" style={{ color: HAZARD }}>Book us</h3>
            <p className="mt-5 text-sm font-semibold text-white/80">Want the truck at your event? Get us pencilled in.</p>
            <a href={book} className="mt-5 inline-flex border-[3px] px-7 py-3 text-xs font-black uppercase tracking-[0.16em] text-[color:#1B1B1D] transition hover:opacity-90" style={{ background: HAZARD, borderColor: HAZARD, borderRadius: "0.4rem" }}>{bookingOn ? "Book the truck" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
