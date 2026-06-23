import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MeadowHeader } from "./MeadowHeader";
import { MeadowBooking } from "./MeadowBooking";

// Meadow — bright, energetic all-day-dining design (single venue), MULTI-PAGE:
// the nav opens real routes (Menu / Reservations / Gallery / About / Contact)
// under basePath, never scroll anchors. Each page is its own layout; the sticky
// coral header and dark footer are shared. Palette is baked from the reference:
// coral, mint, lavender, cream over a warm ink. The tenant swaps in their own
// photography, copy, menu, hours and address. Display type is a chunky serif.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const CORAL = "#f4a7a3";
const MINT = "#9fd9c4";
const LAVENDER = "#c9bce0";
const CREAM = "#fbf3ea";
const INK = "#3a322f";

// Rotating accent colours for the "What's On" cards, like the reference grid.
const CARD_TINTS = [CORAL, MINT, LAVENDER];

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

export default function MeadowDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Book a table", href: href("reservations") },
    groups.length > 0 && { label: "Menu", href: href("menu") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (dark, with newsletter CTA + socials) ----
  const footer = (
    <footer style={{ background: INK }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: CORAL }} className="text-3xl font-semibold">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.2em] text-white">Follow us</h4>
              <div className="mt-4 flex gap-4 text-white">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {([
              bookingOn && { label: "Book a table", href: href("reservations") },
              groups.length > 0 && { label: "Menus", href: href("menu") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white">Opening times</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-white/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a real button, never a dead newsletter input */}
        <div className="rounded-3xl px-7 py-9" style={{ background: CORAL, color: INK }}>
          <h4 style={display} className="text-2xl font-semibold leading-tight">Hungry yet?</h4>
          <p className="mt-2 text-sm leading-relaxed opacity-90">Grab a table for breakfast, lunch or dinner. We cannot wait to feed you.</p>
          <a href={book} className="mt-6 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>{bookingOn ? "Book a table" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50 sm:px-8">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <MeadowHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Coral page banner that clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: CORAL }} className="text-[color:#3a322f]">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <p className="text-xs font-bold uppercase tracking-[0.24em] opacity-70">{kicker}</p>
        <h1 style={display} className="mt-3 text-5xl font-semibold leading-[0.95] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Our food", "The menu")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-5">
                        <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, background: MINT, color: INK }} className="inline-block rounded-full px-4 py-1.5 text-lg font-semibold">{section.section}</span>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-6">
                        {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-neutral-400">{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${INK}1f` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-base font-medium text-[color:#3a322f]" style={display}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold text-[color:#3a322f]">{item.price}</span>
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
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-neutral-500">Our menu is coming soon.</p>}
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
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Pick a day and a time and we will save you a spot. For big groups of 8 or more, give us a call and we will sort it.</p>
            <MeadowBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Find us")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-medium text-[color:#3a322f]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 border-neutral-200 pt-6 text-sm text-neutral-700">
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a big celebration or a bit of feedback? Tell us here and we will get right back to you."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: CORAL, heading: INK, button: INK, buttonText: "#ffffff", fieldBorder: "#eadfd6", radius: "1rem", font: "var(--font-fraunces)" }}
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
        {banner("About us", "Come hungry, leave happy")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-3xl font-semibold text-[color:#3a322f]">What we cook</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
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
        {banner("A look around", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-neutral-500" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* hero: full-bleed photo, big promo headline, inline booking row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${CORAL}, ${LAVENDER})` }} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/45" />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-32 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-5xl">
            {content.tagline && (
              <p data-edit="content.tagline" style={display} className="max-w-3xl text-4xl font-semibold uppercase leading-[0.95] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl">{content.tagline}</p>
            )}
            <p className="mt-4 max-w-xl text-base text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-lg">Breakfast, lunch and dinner, served all day with a smile.</p>
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <MeadowBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* about: coral band with big condensed headline */}
      <section style={{ background: CORAL }} className="text-[color:#3a322f]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.28em] opacity-70">About us</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-6xl font-semibold uppercase leading-[0.9] sm:text-7xl">Come hungry<br />leave happy</h2>
            {content.about && <p data-edit="content.about" className="text-[17px] leading-[1.85]">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-full border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-[color:#3a322f] hover:text-white" style={{ borderColor: INK }}>Our story</a>
          )}
        </div>
      </section>

      {/* what's on: mint header bar + tinted cards (menu highlights / gallery) */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: CREAM }}>
          <div className="px-6 sm:px-8">
            <div className="mx-auto -mb-px max-w-6xl">
              <div className="flex items-center justify-between rounded-t-2xl px-6 py-4 sm:px-8" style={{ background: MINT, color: INK }}>
                <h2 style={display} className="text-2xl font-semibold sm:text-3xl">What is on</h2>
                {groups.length > 0 && <a href={href("menu")} className="text-xs font-bold uppercase tracking-[0.16em] hover:opacity-70">See the full menu</a>}
              </div>
            </div>
          </div>
          <div className="mx-auto max-w-6xl px-6 py-12 sm:px-8 sm:py-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const tint = CARD_TINTS[i % CARD_TINTS.length];
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="aspect-[4/3] w-full" style={{ background: tint }} />
                    )}
                    <div className="flex flex-1 flex-col p-6" style={{ background: tint }}>
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-semibold text-[color:#3a322f]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[color:#3a322f]/80">{item.description}</p>}
                      <span className="mt-5 inline-flex w-fit rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[color:#3a322f] transition group-hover:opacity-90">Find out more</span>
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex rounded-full border-2 px-8 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-[color:#3a322f] hover:text-white" style={{ borderColor: INK, color: INK }}>View all</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* gift-card / CTA band: lavender with a mint-outlined panel */}
      <section style={{ background: LAVENDER }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="rounded-3xl border-4 bg-white/60 px-8 py-12 text-center" style={{ borderColor: MINT }}>
            <h2 style={display} className="text-5xl font-semibold uppercase leading-[0.95] text-[color:#3a322f] sm:text-6xl">Thanks a brunch</h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[color:#3a322f]/70">For breakfast, lunch or dinner</p>
            <a href={book} className="mt-7 inline-flex rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>{bookingOn ? "Book your table" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* quick info band: hours + directions */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CORAL }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CORAL }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-white/50 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[color:#3a322f]">Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CORAL }}>Reserve</h3>
            <p className="mt-5 text-sm text-white/80">Save a table in seconds, any time of day.</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-[color:#3a322f] transition hover:opacity-90" style={{ background: CORAL }}>{bookingOn ? "Book a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
