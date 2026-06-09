import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LacquerHeader } from "./LacquerHeader";
import { LacquerBooking } from "./LacquerBooking";

// Lacquer — dark, moody, modern-Asian gastropub design (single venue), inspired
// by the structure of The Duck & Rice. MULTI-PAGE: the nav opens real routes
// (Menus / What's on / Reservations / Contact / About / Gallery) under basePath,
// never scroll anchors. The sticky dark header and patterned footer are shared.
// Palette is baked (near-black ink, warm gold, soft cream text); the tenant
// swaps in their own atmospheric photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#0c0b0a";
const PANEL = "#100d0c";
const GOLD = "#c89b3c";
const GOLD_SOFT = "#e7c067";
const CREAM = "#efe7d8";

// Subtle geometric trellis used behind the footer (a CSS approximation of the
// reference's dark patterned panel, never its artwork).
const TRELLIS =
  "repeating-linear-gradient(60deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 26px), repeating-linear-gradient(-60deg, rgba(255,255,255,0.025) 0 1px, transparent 1px 26px)";

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

export default function LacquerDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    gallery.length > 0 && { label: "What's on", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (patterned dark panel) ----
  const footer = (
    <footer style={{ background: INK, backgroundImage: TRELLIS }} className="text-white/75">
      <div className="mx-auto grid max-w-6xl gap-12 px-7 py-20 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6">
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span>
                </li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">Open daily.</p>}
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Links</h4>
          <ul className="mt-5 space-y-2.5 text-sm">
            {([
              groups.length > 0 && { label: "Menus", href: href("menu") },
              gallery.length > 0 && { label: "What's on", href: href("gallery") },
              content.about && { label: "About", href: href("about") },
              bookingOn && { label: "Reservations", href: href("reservations") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="italic transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4 text-white/80">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#e7c067]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Find us</h4>
          {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed">{content.address}</p>}
          <div className="mt-4 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
          {content.map_url && (
            <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black" style={{ borderColor: `${GOLD}66`, color: CREAM }}>Get directions</a>
          )}
        </div>
      </div>
      <div className="border-t px-7 pb-12 pt-12 text-center" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
        <p data-edit="tenant.business_name" style={{ ...serif }} className="text-2xl lowercase tracking-[0.04em] text-white">{name}</p>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/55">By using our website you agree to the terms of our Privacy Policy.</p>
        <p className="mt-3 text-xs text-white/35">© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-white" >
      <div style={{ background: INK }}>
        <LacquerHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Dark page banner that also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: INK, backgroundImage: TRELLIS }} className="text-white">
      <div className="mx-auto max-w-6xl px-7 pb-14 pt-32 text-center sm:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mt-4 text-4xl font-semibold uppercase tracking-[0.04em] sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Our kitchen", "Menus")}
        <section className="mx-auto max-w-4xl px-7 pb-24" style={{ background: INK }}>
          {groups.length > 0 ? (
            <>
              <div className="space-y-16">
                {groups.map((section) => (
                  <div key={section.section}>
                    {section.section && <h3 className="mb-6 text-center text-xl uppercase tracking-[0.2em]" style={{ ...serif, color: GOLD }}>{section.section}</h3>}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-8">
                        {catg.category && <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">{catg.category}</p>}
                        <ul className="space-y-5">
                          {catg.items.map((item) => (
                            <li key={item.id} className="border-b pb-5" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                              <div className="flex items-baseline justify-between gap-4">
                                <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-white">{item.name}</span>
                                <span className="mx-2 flex-1 border-b border-dotted" style={{ borderColor: "rgba(255,255,255,0.18)" }} />
                                {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-semibold" style={{ color: GOLD_SOFT }}>{item.price}</span>}
                              </div>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed text-white/55">{item.description}</p>}
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
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:brightness-110" style={{ background: GOLD, color: INK }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-center text-white/55">Our menus are coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book a table", "Reservations")}
        <section className="px-7 pb-24" style={{ background: INK }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[16px] leading-[1.9] text-white/70">To reserve a table, use the form below and we will confirm by phone or email. For parties of 8 or more, please call us.</p>
            <LacquerBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Contact")}
        <section className="px-7 pb-24" style={{ background: INK }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-2xl uppercase tracking-[0.06em]" style={{ ...serif, color: GOLD }}>Find us</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-white/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block underline transition hover:text-white">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-white/70" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6">
                      <span data-edit={`hours:${i}:day`}>{h.day}</span>
                      <span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span>
                    </li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-white hover:text-black" style={{ borderColor: `${GOLD}66`, color: CREAM }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="Private dining, large parties or a question? Tell us below and we will reply soon."
                  contactCta="Send enquiry"
                  theme={{ card: PANEL, cardBorder: `${GOLD}55`, heading: GOLD, blurb: "rgba(255,255,255,0.55)", label: "rgba(255,255,255,0.6)", fieldBg: "#161311", fieldBorder: "#3a342c", fieldText: "#ffffff", button: GOLD, buttonText: INK, radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "About")}
        <section className="mx-auto max-w-3xl px-7 pb-24 text-center" style={{ background: INK }}>
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[2] text-white/75">{content.about}</p> : <p className="text-white/55">Our story is coming soon.</p>}
          {content.cuisine_type && (
            <>
              <h3 className="mt-14 text-2xl uppercase tracking-[0.06em]" style={{ ...serif, color: GOLD }}>What we cook</h3>
              <p data-edit="content.cuisine_type" className="mt-4 text-[16px] leading-[1.9] text-white/70">{content.cuisine_type}</p>
            </>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY / WHAT'S ON ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("A look inside", "What's on")}
        <div style={{ background: INK }} className="pb-24">
          {gallery.length > 0 ? (
            <section className="grid grid-cols-2 gap-1.5 px-1.5 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ))}
            </section>
          ) : <p className="mx-auto max-w-6xl px-7 text-center text-white/55">Photos coming soon.</p>}
        </div>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* hero — full-bleed atmospheric image, bold uppercase headline + intro */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-black/20" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col justify-center px-7 pt-28 pb-16">
          <div className="max-w-xl">
            {content.tagline && (
              <h1 data-edit="content.tagline" style={serif} className="text-3xl font-semibold uppercase leading-[1.15] tracking-[0.02em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-5xl">{content.tagline}</h1>
            )}
            {content.about && (
              <p data-edit="content.about" className="mt-7 max-w-md text-[15px] leading-[1.9] text-white/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.7)]">{content.about}</p>
            )}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a href={book} className="px-9 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GOLD, color: INK }}>Book a table</a>
              {groups.length > 0 && (
                <a href={href("menu")} className="border px-9 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black" style={{ borderColor: "rgba(255,255,255,0.6)" }}>See our menus</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* "take your seats" centred statement on black */}
      <section style={{ background: INK }} className="px-7 py-20 text-center">
        <h2 style={serif} className="text-2xl font-semibold uppercase tracking-[0.18em] text-white sm:text-3xl">Take your seats</h2>
        {content.cuisine_type && <p data-edit="content.cuisine_type" className="mx-auto mt-5 max-w-2xl text-[16px] leading-[1.9] text-white/70">{content.cuisine_type}</p>}
      </section>

      {/* menus teaser — heading + a few highlights + link to full menus */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderColor: "rgba(255,255,255,0.06)" }} className="border-y">
          <div className="mx-auto max-w-5xl px-7 py-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>Our kitchen</p>
              <h2 style={serif} className="mt-3 text-3xl font-semibold uppercase tracking-[0.04em] text-white sm:text-4xl">Menus</h2>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-3">
              {featured.map((item) => (
                <div key={item.id} className="text-center">
                  <span data-edit={`item:${item.id}:name`} style={serif} className="block text-lg text-white">{item.name}</span>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="mt-1 block text-sm font-semibold" style={{ color: GOLD_SOFT }}>{item.price}</span>}
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed text-white/55">{item.description}</p>}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={href("menu")} className="inline-flex border px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black" style={{ borderColor: `${GOLD}88` }}>See our menus</a>
            </div>
          </div>
        </section>
      )}

      {/* reservations call-out, centred */}
      <section style={{ background: INK }} className="px-7 py-20 text-center">
        <h2 style={serif} className="text-2xl font-semibold uppercase tracking-[0.06em] text-white sm:text-3xl">Reservations</h2>
        <p className="mx-auto mt-4 max-w-xl text-[16px] leading-[1.9] text-white/70">To make a reservation, use our online booking or get in touch. We cannot wait to welcome you.</p>
        <a href={book} className="mt-7 inline-flex px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GOLD, color: INK }}>Book a table</a>
      </section>

      {/* what's on — gallery photo cards linking to the What's on page */}
      {gallery.length > 0 && (
        <section style={{ background: PANEL }} className="px-7 py-20">
          <div className="mx-auto max-w-6xl">
            <h2 style={serif} className="text-center text-2xl font-semibold uppercase tracking-[0.18em] text-white sm:text-3xl">What&apos;s on</h2>
            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {gallery.slice(0, 3).map((g) => (
                <a key={g.id} href={href("gallery")} className="group block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover transition group-hover:opacity-90" />
                  {g.caption && <p className="mt-4 text-center text-sm uppercase tracking-[0.18em] text-white/80">{g.caption}</p>}
                  <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD_SOFT }}>See more</p>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* contact band */}
      <section style={{ background: INK }} className="px-7 py-20 text-center">
        <h2 style={serif} className="text-2xl font-semibold uppercase tracking-[0.18em] text-white sm:text-3xl">Contact</h2>
        <div className="mx-auto mt-6 max-w-md space-y-2 text-[15px] leading-relaxed text-white/75">
          {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
          {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block underline transition hover:text-white">{content.email}</a>}
          {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
        </div>
        <a href={href("contact")} className="mt-7 inline-flex border px-9 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-black" style={{ borderColor: `${GOLD}88` }}>Get in touch</a>
      </section>
    </>,
    false,
  );
}
