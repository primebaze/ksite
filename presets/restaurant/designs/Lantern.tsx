import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LanternHeader } from "./LanternHeader";
import { LanternBooking } from "./LanternBooking";

// Lantern — dark, moody, modern-Asian gastropub design (single venue),
// MULTI-PAGE: the nav opens real routes (Menu / About / Gallery / Reservations
// / Visit) under basePath, never scroll anchors. Each page is its own layout;
// the sticky header and dark footer are shared via shell(). Palette is baked
// (near-black / lacquer red / gold / off-white, serif headings); the tenant
// swaps in their own photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const NEAR_BLACK = "#141210";
const PANEL = "#1b1714";
const RED = "#c1272d";
const GOLD = "#c8a24a";
const OFF_WHITE = "#f3ede1";

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

export default function LanternDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer className="border-t border-white/10" style={{ background: NEAR_BLACK }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-2xl text-[#f3ede1]">{name}</p>
          <a href={book} className="mt-5 inline-flex px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: RED }} {...editCopy(content, "footer_book_cta", "Book a table")} />
          {content.socials && content.socials.length > 0 && (
            <div className="mt-7 flex gap-4 text-[#f3ede1]">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#c8a24a]">
                  <SocialIcon kind={`${s.label} ${s.url}`} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#f3ede1]/80">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6">
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-[#f3ede1]/55">{h.open}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-[#f3ede1]/55">Add your opening hours in the dashboard.</p>
          )}
        </div>

        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-5 space-y-2.5 text-sm text-[#f3ede1]/80">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "About", href: href("about") },
              bookingOn && { label: "Book a table", href: href("reservations") },
              { label: "Visit", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[#c8a24a]">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <p className="px-8 pb-8 text-right text-xs text-[#f3ede1]/40">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: NEAR_BLACK, color: OFF_WHITE }} className="min-h-screen font-body">
      <LanternHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Dark top banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section className="border-b border-white/10" style={{ background: NEAR_BLACK }}>
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 sm:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }} {...editCopy(content, kickerKey, kicker)} />
        <h1 style={serif} className="mt-3 text-4xl font-medium text-[#f3ede1] sm:text-5xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- MENU (dark compact two-column dim-sum grid with category chips) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The menu", "menu_kicker", "Dim sum & mains", "menu_title")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-12 gap-y-12 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <h3 style={serif} className="mb-4 text-xl text-[#f3ede1]">
                        <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="border-b-2 pb-1" style={{ borderColor: RED }}>{section.section}</span>
                      </h3>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-6">
                        {catg.category && (
                          <span data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 inline-flex rounded-sm px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ background: "rgba(193,39,45,0.18)", color: GOLD }}>
                            {catg.category}
                          </span>
                        )}
                        <ul className="divide-y divide-white/8">
                          {catg.items.map((item) => (
                            <li key={item.id} className="py-2.5">
                              <div className="flex items-baseline justify-between gap-3">
                                <span data-edit={`item:${item.id}:name`} className="text-[15px] font-medium text-[#f3ede1]">{item.name}</span>
                                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
                              </div>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-[13px] leading-relaxed text-[#f3ede1]/55">{item.description}</p>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-14 flex flex-wrap justify-center gap-4">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede1] transition hover:bg-[#f3ede1] hover:text-neutral-900" style={{ borderColor: GOLD }}>
                      {o.label}{o.commission_free ? " · commission-free" : ""}
                    </a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-[#f3ede1]/55">Our menu is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS (dark inline form on a dark panel) ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "reservations_kicker", "Book a table", "reservations_title")}
        <section className="mx-auto max-w-2xl px-8 py-20">
          <p className="mb-8 text-[17px] leading-[1.8] text-[#f3ede1]/75" {...editCopy(content, "reservations_intro", "Reserve your table below and we will confirm by phone or email. For parties of 8 or more, please call us.")} />
          <LanternBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT (single column: address + directions stacked above form) ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "contact_kicker", "Find us", "contact_title")}
        <section className="mx-auto max-w-2xl px-8 py-20">
          <div className="border border-white/12 p-8 sm:p-10" style={{ background: PANEL }}>
            <div className="space-y-4 text-[15px] leading-relaxed text-[#f3ede1]/80">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-7 max-w-xs space-y-2 border-t border-white/10 pt-6 text-sm text-[#f3ede1]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#f3ede1]/55">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-full justify-center px-7 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 sm:w-auto" style={{ background: RED }} {...editCopy(content, "contact_directions", "Get directions")} />
            )}
          </div>

          {contactOn && (
            <div className="lantern-contact mt-10">
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Get in touch"
                theme={{ card: "#1b1714", cardBorder: "rgba(200,162,74,0.35)", heading: "#f3ede1", blurb: "rgba(243,237,225,0.6)", label: "rgba(243,237,225,0.7)", fieldBg: "rgba(255,255,255,0.05)", fieldBorder: "rgba(243,237,225,0.25)", fieldText: "#f3ede1", button: "#c1272d", buttonText: "#ffffff", radius: "0" }}
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
        {banner("About", "about_kicker", "Our story", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-[#f3ede1]/80">{content.about}</p>
          ) : (
            <p className="text-[#f3ede1]/55">Our story is coming soon.</p>
          )}
          {content.cuisine_type && (
            <>
              <h3 style={serif} className="mt-12 text-2xl font-medium text-[#f3ede1]" {...editCopy(content, "about_taste_heading", "A taste of what we do")} />
              <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-[#f3ede1]/80">{content.cuisine_type}</p>
            </>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "gallery_kicker", "A look inside", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-[#f3ede1]/55">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME (hero + short teasers only) ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 30%, #2a1410, ${NEAR_BLACK})` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/40" />

        <div className="relative z-10 mt-auto px-6 pb-20 text-center sm:pb-24">
          <p data-edit="content.cuisine_type" className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>
            {content.cuisine_type ?? "Dim sum · craft beer"}
          </p>
          <h1 data-edit="tenant.business_name" style={serif} className="mt-4 text-5xl font-medium text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.6)] sm:text-7xl">
            {name}
          </h1>
          {content.tagline && (
            <p data-edit="content.tagline" className="mx-auto mt-5 max-w-xl text-base text-white/85 sm:text-lg">
              {content.tagline}
            </p>
          )}
          <div className="mt-9 flex justify-center">
            <a href={book} style={{ background: RED }} className="inline-flex w-full max-w-xs justify-center px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90 sm:w-auto sm:text-sm" {...editCopy(content, "hero_book_cta", "Book a table")} />
          </div>
        </div>
      </section>

      {/* INTRO / ABOUT teaser */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-8 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: RED }} {...editCopy(content, "home_welcome_eyebrow", "Welcome")} />
          <p data-edit="content.about" className="mx-auto mt-7 max-w-2xl text-[19px] leading-[1.9] text-[#f3ede1]/80">
            {content.about}
          </p>
          <div className="mt-7">
            <a href={href("about")} className="inline-flex text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: GOLD }} {...editCopy(content, "home_about_cta", "Our story →")} />
          </div>
        </section>
      )}

      {/* MENU HIGHLIGHTS → links to full menu page */}
      {featured.length > 0 && (
        <section className="border-y border-white/10" style={{ background: PANEL }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }} {...editCopy(content, "home_menu_eyebrow", "The menu")} />
                <h2 style={serif} className="mt-3 text-4xl font-medium text-[#f3ede1] sm:text-5xl" {...editCopy(content, "home_menu_heading", "Signature plates")} />
              </div>
              <a href={href("menu")} className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: RED }} {...editCopy(content, "home_menu_link", "View full menu →")} />
            </div>
            <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium text-[#f3ede1]">{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#f3ede1]/55">{item.description}</p>
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
      <section style={{ background: NEAR_BLACK }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "home_hours_heading", "Opening hours")} />
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-5 space-y-2 text-sm text-[#f3ede1]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#f3ede1]/55">{h.open}</span></li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "home_findus_heading", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[#f3ede1]/80">{content.address}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-[#f3ede1]/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "home_reserve_heading", "Reserve")} />
            <p className="mt-5 text-sm text-[#f3ede1]/80" {...editCopy(content, "home_reserve_sub", "Book your table online in seconds.")} />
            <a href={book} className="mt-6 inline-flex border border-white/40 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede1] transition hover:bg-[#f3ede1] hover:text-neutral-900" {...editCopy(content, "home_reserve_cta", "Book a table")} />
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
