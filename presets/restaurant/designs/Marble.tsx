import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MarbleHeader } from "./MarbleHeader";
import { MarbleBooking } from "./MarbleBooking";

// Marble — a premium steakhouse & cocktail lounge design (single venue), warm
// and dark. MULTI-PAGE: the nav opens real routes (Menu / About / Gallery /
// Reservations / Visit) under basePath, never scroll anchors. Each page is its
// own layout; the sticky charcoal header and dark footer are shared via shell().
// Palette is baked (charcoal / warm gold / ember red / cream); the tenant swaps
// in their own photography, copy, menu, hours and address.
//
// Distinct from Ember:
//  - menu: a LARGE editorial serif list grouped by "cuts", big gold prices.
//  - reservations: a party-size-led form beside an info column (two columns).
//  - contact: a CENTERED single-column layout (address, directions, form).

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CHARCOAL = "#1c1a17";
const GOLD = "#c9a227";
const EMBER = "#8a2b22";

// Pick an icon for a social link from its label/url; falls back to a globe.
function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x" || k.includes("/x")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

export default function MarbleDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reserve", href: href("reservations") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer className="border-t border-white/10" style={{ background: "#161310" }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <a href={href("home")}>
            <p data-edit="tenant.business_name" className="text-2xl" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>{name}</p>
          </a>
          {content.cuisine_type && <p data-edit="content.cuisine_type" className="mt-3 text-sm text-[#efe8db]/60">{content.cuisine_type}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-7 flex gap-4 text-[#efe8db]/80">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#c9a227]">
                  <SocialIcon kind={`${s.label} ${s.url}`} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#efe8db]/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6">
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-[#efe8db]/50">{h.open}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-[#efe8db]/50">By reservation.</p>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Explore</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-[#efe8db]/75">
            {([
              groups.length > 0 && { label: "The menu", href: href("menu") },
              content.about && { label: "About us", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Reserve a table", href: href("reservations") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[#c9a227]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Find us</h4>
          <div className="mt-5 space-y-2.5 text-sm text-[#efe8db]/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#c9a227]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#c9a227]">{content.email}</a>}
            {content.map_url && <a href={content.map_url} target="_blank" rel="noreferrer" className="block transition hover:text-[#c9a227]">Get directions</a>}
          </div>
        </div>
      </div>
      <p className="border-t border-white/10 px-8 py-6 text-center text-xs text-[#efe8db]/40 sm:text-right">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CHARCOAL }} className="min-h-screen font-body text-[#efe8db]">
      <MarbleHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Charcoal page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, sub?: string) => (
    <section className="border-b border-white/10" style={{ background: `radial-gradient(120% 100% at 50% 0%, #2a2520 0%, ${CHARCOAL} 70%)` }}>
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 text-center sm:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mt-4 text-4xl font-medium text-[#efe8db] sm:text-6xl">{title}</h1>
        {sub && <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#efe8db]/65">{sub}</p>}
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The menu", "Signature cuts")}
        <section className="mx-auto max-w-4xl px-8 py-20 sm:py-24">
          {groups.length > 0 ? (
            <>
              <div className="space-y-20">
                {groups.map((section) => (
                  <div key={section.section}>
                    {section.section && (
                      <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="mb-10 text-center text-3xl uppercase tracking-[0.14em] sm:text-4xl" style={{ ...serif, color: GOLD }}>
                        {section.section}
                      </h2>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-12 last:mb-0">
                        {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.3em] text-[#efe8db]/45">{catg.category}</p>}
                        <ul className="space-y-10">
                          {catg.items.map((item) => (
                            <li key={item.id} className="text-center">
                              <div className="flex flex-col items-center gap-1.5 sm:flex-row sm:items-baseline sm:justify-center sm:gap-4">
                                <span data-edit={`item:${item.id}:name`} style={serif} className="text-2xl text-[#efe8db] sm:text-[1.7rem]">{item.name}</span>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="text-2xl font-medium sm:text-[1.7rem]" style={{ ...serif, color: GOLD }}>{item.price}</span>
                                )}
                              </div>
                              {item.description && (
                                <p data-edit={`item:${item.id}:description`} className="mx-auto mt-3 max-w-xl text-[15px] leading-[1.8] text-[#efe8db]/60">{item.description}</p>
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
                <div className="mt-20 flex flex-wrap justify-center gap-4 border-t border-white/10 pt-14">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c9a227] hover:text-[#1c1a17]" style={{ borderColor: GOLD, color: GOLD }}>
                      {o.label}{o.commission_free ? " · commission-free" : ""}
                    </a>
                  ))}
                </div>
              )}

              {bookingOn && (
                <div className="mt-16 text-center">
                  <a href={book} className="inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#efe8db] transition hover:opacity-90 sm:text-sm" style={{ background: EMBER }}>
                    Reserve a table
                  </a>
                </div>
              )}
            </>
          ) : (
            <p className="text-center text-[#efe8db]/50">Our menu is coming soon.</p>
          )}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book a table", "Reserve below and we will confirm by phone or email. For larger parties or private dining, please get in touch directly.")}
        <section className="mx-auto max-w-6xl px-8 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
            {/* form (party size led) */}
            <div className="order-2 lg:order-1">
              <MarbleBooking tenantId={tenant.id} name={name} />
            </div>

            {/* side INFO column */}
            <aside className="order-1 space-y-10 lg:order-2 lg:pt-2">
              {content.hours && content.hours.length > 0 && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Opening hours</h3>
                  <ul className="mt-5 space-y-2.5 text-sm text-[#efe8db]/80">
                    {content.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-6 border-b border-white/8 pb-2.5">
                        <span data-edit={`hours:${i}:day`}>{h.day}</span>
                        <span data-edit={`hours:${i}:open`} className="text-[#efe8db]/55">{h.open}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {(content.phone || content.email) && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Prefer to call?</h3>
                  <div className="mt-5 space-y-2 text-[15px] text-[#efe8db]/85">
                    {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#c9a227]">{content.phone}</a>}
                    {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#c9a227]">{content.email}</a>}
                  </div>
                </div>
              )}
              <div className="border-l-2 pl-5 text-[15px] leading-[1.8] text-[#efe8db]/65" style={{ borderColor: GOLD }}>
                A note on bookings: tables are held for fifteen minutes past your reservation time. Please let us know of any dietary requirements when you book and we will be glad to accommodate.
              </div>
            </aside>
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT (centered single column) ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Find us")}
        <section className="mx-auto max-w-2xl px-8 py-20 text-center sm:py-24">
          <div className="space-y-4 text-[16px] leading-relaxed text-[#efe8db]/85">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#c9a227]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#c9a227]">{content.email}</a>}
          </div>

          {content.map_url && (
            <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex border px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c9a227] hover:text-[#1c1a17]" style={{ borderColor: GOLD, color: GOLD }}>
              Get directions
            </a>
          )}

          {content.hours && content.hours.length > 0 && (
            <ul className="mx-auto mt-12 max-w-sm space-y-2.5 border-t border-white/10 pt-10 text-sm text-[#efe8db]/80">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6">
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-[#efe8db]/55">{h.open}</span>
                </li>
              ))}
            </ul>
          )}

          {contactOn && (
            <div className="mt-14 border-t border-white/10 pt-14">
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send a message"
                contactBlurb="Questions, enquiries or private dining? We will get back to you."
                theme={{ card: "#211e1a", cardBorder: "rgba(201,162,39,0.4)", heading: "#efe8db", blurb: "rgba(239,232,219,0.6)", label: "rgba(239,232,219,0.7)", fieldBg: "rgba(255,255,255,0.04)", fieldBorder: "rgba(239,232,219,0.25)", fieldText: "#efe8db", button: "#c9a227", buttonText: "#1c1a17", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Our table", "About us")}
        <section className="mx-auto max-w-3xl px-8 py-20 sm:py-24">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[#efe8db]/80">{content.about}</p>
          ) : (
            <p className="text-[#efe8db]/50">Our story is coming soon.</p>
          )}

          {/* Lounge & private dining teaser lives on About */}
          <div className="mt-16 grid gap-6 border-t border-white/10 pt-14 md:grid-cols-2">
            <div className="border border-white/12 p-8" style={{ background: "rgba(0,0,0,0.2)" }}>
              <h3 className="text-2xl" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>Lounge &amp; bar</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#efe8db]/70">
                Settle into the low light of our cocktail lounge for classics, house creations and a deep cellar of old-world reds and rare whiskies. Walk-ins welcome at the bar.
              </p>
            </div>
            <div className="border border-white/12 p-8" style={{ background: "rgba(0,0,0,0.2)" }}>
              <h3 className="text-2xl" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>Private dining</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#efe8db]/70">
                From intimate dinners to celebrations, our private rooms are yours for the night with a dedicated team and bespoke menus. Enquire for availability.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <a href={book} className="inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#efe8db] transition hover:opacity-90 sm:text-sm" style={{ background: EMBER }}>
              Reserve a table
            </a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "A look inside")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </section>
        ) : (
          <p className="mx-auto max-w-6xl px-8 py-20 text-[#efe8db]/50">Photos coming soon.</p>
        )}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 50% 0%, #2a2520 0%, ${CHARCOAL} 70%)` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/45" />

        <div className="relative z-10 mt-auto px-6 pb-16 text-center sm:pb-24">
          <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>
            {content.cuisine_type ?? "Steakhouse & Lounge"}
          </p>
          <h1 data-edit="tenant.business_name" style={serif} className="mx-auto mt-5 max-w-4xl text-5xl font-medium leading-[1.02] text-[#efe8db] [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-7xl">
            {name}
          </h1>
          {content.tagline && (
            <p data-edit="content.tagline" className="mx-auto mt-6 max-w-xl text-base text-[#efe8db]/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-lg">
              {content.tagline}
            </p>
          )}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={book} style={{ background: EMBER }} className="w-full px-10 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-[#efe8db] shadow-2xl transition hover:opacity-90 sm:w-auto sm:text-sm">
              Reserve a table
            </a>
            {groups.length > 0 && (
              <a href={href("menu")} className="w-full border px-10 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm transition hover:bg-[#c9a227] hover:text-[#1c1a17] sm:w-auto sm:text-sm" style={{ borderColor: GOLD, color: GOLD }}>
                View the menu
              </a>
            )}
          </div>
        </div>
      </section>

      {/* INTRO / ABOUT teaser */}
      <section className="mx-auto max-w-3xl px-8 py-24 text-center sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>Our table</p>
        <h2 style={serif} className="mt-5 text-3xl font-medium leading-tight text-[#efe8db] sm:text-[2.6rem]">
          {content.tagline ?? `Welcome to ${name}`}
        </h2>
        {content.about && (
          <p data-edit="content.about" className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.85] text-[#efe8db]/75">
            {content.about}
          </p>
        )}
        {content.about && (
          <a href={href("about")} className="mt-8 inline-flex text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-80" style={{ color: GOLD }}>
            Our story →
          </a>
        )}
      </section>

      {/* MENU HIGHLIGHTS → links to full menu page */}
      {featured.length > 0 && (
        <section className="border-t border-white/10" style={{ background: "#211d19" }}>
          <div className="mx-auto max-w-5xl px-8 py-24 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>The menu</p>
                <h2 style={serif} className="mt-3 text-4xl font-medium text-[#efe8db] sm:text-5xl">Signature cuts</h2>
              </div>
              <a href={href("menu")} className="text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-80" style={{ color: GOLD }}>View full menu →</a>
            </div>
            <ul className="mx-auto mt-14 max-w-xl divide-y" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium text-[#efe8db]" style={{ ...serif }}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#efe8db]/55">{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* QUICK INFO BAND */}
      <section className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Opening hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[#efe8db]/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-[#efe8db]/50">{h.open}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-[#efe8db]/50">By reservation.</p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#efe8db]/75">{content.address}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-[#efe8db]/75">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#c9a227]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#c9a227]">{content.email}</a>}
            </div>
            <a href={href("contact")} className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-80" style={{ color: GOLD }}>Visit us →</a>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Reserve</h3>
            <p className="mt-5 text-sm text-[#efe8db]/75">Book your table for dinner, the lounge or a private room.</p>
            <a href={book} className="mt-6 inline-flex px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#efe8db] transition hover:opacity-90" style={{ background: EMBER }}>
              {bookingOn ? "Reserve a table" : "Contact us"}
            </a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
