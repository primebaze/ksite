import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { TavernHeader } from "./TavernHeader";
import { TavernBooking } from "./TavernBooking";

// Tavern — a cosy, traditional British pub (single house), MULTI-PAGE: the nav
// opens real routes (Menu / Reservations / Gallery / About / Contact) under
// basePath, never scroll anchors. Each page is its own layout; the sticky
// header, brass hairline rules and forest-green footer are shared via shell().
// Palette is baked from the brief — dark forest green, deep burgundy, brass,
// aged cream, warm wood brown — in a heritage register (real ale, log fire,
// Sunday roast). The tenant swaps in their own photography, copy, menu, hours
// and address. Display type is a warm serif with a pub-sign character.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const FOREST = "#1E2B22";
const BURGUNDY = "#5A2230";
const BRASS = "#B08D2E";
const CREAM = "#EFE7D3";
const WOOD = "#3A2A1C";
const PARCHMENT = "#F4EEDD";

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

// A small brass wheat/hop crest — a heritage mark used on the hero pub-sign and
// as a section ornament. Decorative only.
function Crest({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden>
      <path d="M12 3v18" />
      <path d="M12 7c-1.6-.4-3-1.4-3.4-3M12 7c1.6-.4 3-1.4 3.4-3" />
      <path d="M12 12c-1.8-.4-3.3-1.6-3.7-3.4M12 12c1.8-.4 3.3-1.6 3.7-3.4" />
      <path d="M12 17c-1.8-.4-3.3-1.6-3.7-3.4M12 17c1.8-.4 3.3-1.6 3.7-3.4" />
    </svg>
  );
}

// Brass hairline rule with a centred crest — the design's signature divider.
function BrassRule({ light = false }: { light?: boolean }) {
  return (
    <div className="flex items-center gap-4" style={{ color: BRASS }}>
      <span className="h-px flex-1" style={{ background: light ? "rgba(176,141,46,0.6)" : "rgba(176,141,46,0.45)" }} />
      <Crest size={20} />
      <span className="h-px flex-1" style={{ background: light ? "rgba(176,141,46,0.6)" : "rgba(176,141,46,0.45)" }} />
    </div>
  );
}

export default function TavernDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Book", href: href("reservations") },
    content.about && { label: "Our story", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Find us", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (deep forest green, brass rules, est. crest) ----
  const footer = (
    <footer style={{ background: FOREST, color: CREAM }} className="border-t" >
      <div className="border-t" style={{ borderColor: "rgba(176,141,46,0.4)" }}>
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
            <div>
              <a href={href("home")} className="inline-block">
                <span className="block text-[9px] font-semibold uppercase tracking-[0.42em]" style={{ color: BRASS }}>The</span>
                <span data-edit="tenant.business_name" style={{ ...display, color: CREAM }} className="mt-1 block text-3xl font-semibold italic">{name}</span>
              </a>
              {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[#EFE7D3]/70">{content.tagline}</p>}
              {content.socials && content.socials.length > 0 && (
                <>
                  <h4 className="mt-7 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "footer_social", "Find us online")} />
                  <div className="mt-3.5 flex gap-4">
                    {content.socials.map((s) => (
                      <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#B08D2E]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "footer_explore", "The house")} />
              <ul className="mt-4 space-y-2.5 text-sm text-[#EFE7D3]/75">
                {([
                  groups.length > 0 && { label: "Our menu", href: href("menu") },
                  bookingOn && { label: "Book a table", href: href("reservations") },
                  content.about && { label: "Our story", href: href("about") },
                  gallery.length > 0 && { label: "Gallery", href: href("gallery") },
                  { label: "Find us", href: href("contact") },
                ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                  <li key={l.label}><a href={l.href} className="transition hover:text-[#EFE7D3]">{l.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "footer_hours", "Opening times")} />
              {content.hours && content.hours.length > 0 ? (
                <ul className="mt-4 space-y-2 text-sm text-[#EFE7D3]/75">
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#EFE7D3]/50">{h.open}</span></li>
                  ))}
                </ul>
              ) : <p className="mt-4 text-sm text-[#EFE7D3]/55">Open daily.</p>}
              {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#EFE7D3]/75">{content.address}</p>}
              <div className="mt-3 space-y-1.5 text-sm text-[#EFE7D3]/75">
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[#EFE7D3]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[#EFE7D3]">{content.email}</a>}
              </div>
            </div>

            {/* CTA panel: a real booking button, framed in brass like a sign */}
            <div className="border px-7 py-9" style={{ borderColor: BRASS, background: "rgba(90,34,48,0.35)" }}>
              <Crest size={26} />
              <h4 style={display} className="mt-3 text-2xl font-semibold italic leading-tight" {...editCopy(content, "footer_cta_heading", "Pull up a chair")} />
              <p className="mt-2 text-sm leading-relaxed text-[#EFE7D3]/80" {...editCopy(content, "footer_cta_body", "Real ales, a roaring fire and a proper Sunday roast. Save your spot by the fire.")} />
              <a href={book} className="mt-6 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: BRASS, color: FOREST, borderRadius: "2px" }}>{bookingOn ? "Book a table" : "Get in touch"}</a>
            </div>
          </div>
        </div>
      </div>
      <p className="border-t px-6 py-6 text-center text-[11px] uppercase tracking-[0.2em] text-[#EFE7D3]/45 sm:px-8" style={{ borderColor: "rgba(176,141,46,0.25)" }}>Est. &amp; ale · {name} · All rights reserved</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PARCHMENT, color: WOOD }} className="min-h-screen font-body">
      <TavernHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Forest-green page banner that clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: FOREST, color: CREAM }} className="border-b" >
      <div className="border-b" style={{ borderColor: "rgba(176,141,46,0.4)" }}>
        <div className="mx-auto max-w-6xl px-6 pb-12 pt-28 text-center sm:px-8 sm:pb-16 sm:pt-36">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: BRASS }}>{kicker}</p>
          <h1 style={display} className="mt-3 text-5xl font-semibold italic leading-[1] sm:text-6xl">{title}</h1>
          <div className="mx-auto mt-6 max-w-xs"><BrassRule light /></div>
        </div>
      </div>
    </section>
  );

  // ---- MENU (classic ales & mains: clean brass-ruled divider rows) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Ales & kitchen", "The menu")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: PARCHMENT }}>
          <div className="mx-auto max-w-5xl">
            {groups.length > 0 ? (
              <>
                <div className="grid items-start gap-x-16 gap-y-14 md:grid-cols-2">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-5">
                          <h3 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="text-2xl font-semibold italic" style={{ ...display, color: BURGUNDY }}>{section.section}</h3>
                          <span className="mt-2 block h-px w-full" style={{ background: "rgba(176,141,46,0.5)" }} />
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-7">
                          {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: BRASS }}>{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: "rgba(58,42,28,0.18)" }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-4">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} style={display} className="text-[17px] font-semibold text-[#2E2419]">{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#3A2A1C]/65">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BURGUNDY }}>{item.price}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-16 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: FOREST, color: CREAM, borderRadius: "2px", border: `1px solid ${BRASS}` }}>{o.label}{o.commission_free ? " · no commission" : ""}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="text-[#3A2A1C]/60">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book a table")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: PARCHMENT }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-[#3A2A1C]/80">Pick a day and a time and we&apos;ll keep a table by the fire. For larger parties of 8 or more, or to book the snug, give us a ring.</p>
            <TavernBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Find us", "Pay us a visit")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: PARCHMENT }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#3A2A1C]/80">
                {content.address && <p data-edit="content.address" style={display} className="whitespace-pre-line text-lg font-semibold text-[#2E2419]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[#2E2419]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[#2E2419]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[#3A2A1C]/80" style={{ borderColor: "rgba(176,141,46,0.5)" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#3A2A1C]/55">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: FOREST, color: CREAM, borderRadius: "2px", border: `1px solid ${BRASS}` }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a big celebration, or fancy booking the whole place out? Send word and we'll reply quick."
                  contactCta="Send word"
                  theme={{ card: CREAM, cardBorder: BRASS, heading: FOREST, blurb: "rgba(58,42,28,0.7)", label: "rgba(58,42,28,0.7)", fieldBg: "#FBF8EF", fieldBorder: "rgba(58,42,28,0.28)", fieldText: "#2E2419", button: BURGUNDY, buttonText: CREAM, radius: "2px", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "A proper local")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: PARCHMENT }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[#3A2A1C]/85 first-letter:float-left first-letter:mr-3 first-letter:font-semibold first-letter:text-[3.6rem] first-letter:leading-[0.8]">{content.about}</p> : <p className="text-[#3A2A1C]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <div className="my-12"><BrassRule /></div>
                <h3 style={display} className="text-3xl font-semibold italic text-[#2E2419]" {...editCopy(content, "about_cuisine_heading", "From our kitchen")} />
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.85] text-[#3A2A1C]/80">{content.cuisine_type}</p>
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
        {banner("A look around", "The gallery")}
        {gallery.length > 0 ? (
          <section className="px-1.5 py-1.5" style={{ background: PARCHMENT }}>
            <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" style={{ border: `1px solid rgba(176,141,46,0.4)` }} />
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-20 text-center text-[#3A2A1C]/60" style={{ background: PARCHMENT }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const onTap = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* HERO — dark heritage scene with a brass-framed pub-sign crest + est. */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: FOREST }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 25%, #2c3d31, ${FOREST} 65%, #14201a)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(20,28,22,0.7), rgba(20,28,22,0.35) 45%, rgba(20,28,22,0.85))" }} />

        <div className="relative z-10 mt-auto px-6 pb-12 pt-32 sm:px-8 sm:pb-16">
          <div className="mx-auto w-full max-w-5xl">
            {/* brass-framed hanging pub-sign */}
            <div className="inline-flex flex-col items-center border px-8 py-6 text-center" style={{ borderColor: BRASS, background: "rgba(20,28,22,0.55)", borderRadius: "3px" }}>
              <span style={{ color: BRASS }}><Crest size={30} /></span>
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.42em]" style={{ color: BRASS }}>The</span>
              <span data-edit="tenant.business_name" style={display} className="mt-1 text-4xl font-semibold italic leading-none text-[#EFE7D3] [text-shadow:0_2px_18px_rgba(0,0,0,0.6)] sm:text-6xl">{name}</span>
              <span className="mt-3 text-[10px] font-semibold uppercase tracking-[0.34em] text-[#EFE7D3]/70" {...editCopy(content, "hero_eyebrow", "Free house · Est. 1842")} />
            </div>

            {content.tagline && (
              <p data-edit="content.tagline" style={display} className="mt-7 max-w-2xl text-2xl font-medium italic text-[#EFE7D3]/95 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-3xl">{content.tagline}</p>
            )}
            <p className="mt-3 max-w-xl text-base text-[#EFE7D3]/80 [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]" {...editCopy(content, "hero_subtitle", "Real ales, a roaring log fire and a proper Sunday roast.")} />

            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <TavernBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: BRASS, color: FOREST, borderRadius: "2px" }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* WELCOME — cream band, dropped serif statement */}
      <section style={{ background: PARCHMENT }} className="text-[#2E2419]">
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 sm:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: BRASS }} {...editCopy(content, "home_welcome_kicker", "Welcome to the house")} />
          {content.about ? (
            <p data-edit="content.about" style={display} className="mx-auto mt-6 max-w-3xl text-3xl font-medium italic leading-[1.4] text-[#2E2419] sm:text-[2.3rem]">{content.about}</p>
          ) : (
            <p style={display} className="mx-auto mt-6 max-w-3xl text-3xl font-medium italic leading-[1.4] text-[#2E2419] sm:text-[2.3rem]">A warm welcome, a well-kept cellar and good food by the fire.</p>
          )}
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2E2419] transition hover:bg-[#1E2B22] hover:text-[#EFE7D3]" style={{ borderColor: FOREST, borderRadius: "2px" }} {...editCopy(content, "home_welcome_cta", "Our story")} />
          )}
        </div>
      </section>

      {/* WHAT'S ON TAP / SUNDAY ROAST feature — forest-green, two heritage panels */}
      <section style={{ background: FOREST, color: CREAM }} className="border-y" >
        <div className="border-y" style={{ borderColor: "rgba(176,141,46,0.4)" }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* What's on tap */}
              <div className="flex flex-col border p-8 sm:p-10" style={{ borderColor: BRASS, background: "rgba(20,28,22,0.4)" }}>
                <div className="flex items-center justify-between gap-4">
                  <h3 style={display} className="text-3xl font-semibold italic" {...editCopy(content, "home_tap_heading", "What's on tap")} />
                  <span style={{ color: BRASS }}><Crest size={26} /></span>
                </div>
                <span className="mt-4 mb-5 block h-px w-full" style={{ background: "rgba(176,141,46,0.5)" }} />
                {onTap.length > 0 ? (
                  <ul className="space-y-3.5">
                    {onTap.map((item) => (
                      <li key={item.id} className="flex items-baseline justify-between gap-6">
                        <span data-edit={`item:${item.id}:name`} style={display} className="text-lg font-medium italic text-[#EFE7D3]">{item.name}</span>
                        {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BRASS }}>{item.price}</span>}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#EFE7D3]/70">A rotating cellar of cask ales, craft kegs and proper ciders, kept just so.</p>
                )}
                {groups.length > 0 && <a href={href("menu")} className="mt-6 inline-flex text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: BRASS }} {...editCopy(content, "home_tap_link", "See the full list →")} />}
              </div>

              {/* Sunday roast */}
              <div className="flex flex-col justify-center border p-8 text-center sm:p-10" style={{ borderColor: BRASS, background: "rgba(90,34,48,0.4)" }}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: BRASS }} {...editCopy(content, "home_roast_kicker", "Every Sunday, 12 till late")} />
                <h3 style={display} className="mt-3 text-4xl font-semibold italic leading-tight sm:text-5xl" {...editCopy(content, "home_roast_heading", "The Sunday roast")} />
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#EFE7D3]/85" {...editCopy(content, "home_roast_body", "Slow-roasted joints, duck-fat potatoes, Yorkshire puddings the size of your head and lashings of gravy. Book early — they go fast.")} />
                <div className="mt-7">
                  <a href={book} className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: BRASS, color: FOREST, borderRadius: "2px" }}>{bookingOn ? "Reserve a roast" : "Get in touch"}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MENU HIGHLIGHTS — cream, clean brass-ruled divider rows */}
      {onTap.length > 0 && (
        <section style={{ background: PARCHMENT }}>
          <div className="mx-auto max-w-3xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: BRASS }} {...editCopy(content, "home_menu_kicker", "From the kitchen")} />
              <h2 style={display} className="mt-3 text-4xl font-semibold italic text-[#2E2419] sm:text-5xl" {...editCopy(content, "home_menu_heading", "House favourites")} />
              <div className="mx-auto mt-6 max-w-xs"><BrassRule /></div>
            </div>
            <ul className="mx-auto mt-12 divide-y" style={{ borderColor: "rgba(58,42,28,0.18)" }}>
              {onTap.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} style={display} className="text-lg font-semibold text-[#2E2419]">{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#3A2A1C]/65">{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BURGUNDY }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex border px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2E2419] transition hover:bg-[#1E2B22] hover:text-[#EFE7D3]" style={{ borderColor: FOREST, borderRadius: "2px" }} {...editCopy(content, "home_menu_cta", "View the full menu")} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* QUICK INFO BAND — wood-brown, hours / find us / reserve */}
      <section style={{ background: WOOD, color: CREAM }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "info_hours_label", "Opening times")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[#EFE7D3]/85">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#EFE7D3]/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[#EFE7D3]/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "info_findus_label", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#EFE7D3]/85">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[#EFE7D3]/85">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[#EFE7D3]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[#EFE7D3]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3] transition hover:bg-[#EFE7D3] hover:text-[#3A2A1C]" style={{ borderColor: "rgba(239,231,211,0.5)", borderRadius: "2px" }} {...editCopy(content, "info_directions_link", "Get directions")} />
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "info_reserve_label", "Reserve")} />
            <p className="mt-5 text-sm text-[#EFE7D3]/85" {...editCopy(content, "info_reserve_body", "Save a table by the fire in seconds.")} />
            <a href={book} className="mt-5 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: BRASS, color: WOOD, borderRadius: "2px" }}>{bookingOn ? "Book a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
