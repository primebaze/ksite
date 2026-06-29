import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { CatalogCards } from "../../catalog-layouts";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EmberHeader } from "./EmberHeader";
import { EmberBooking } from "./EmberBooking";

// Ember — premium dark steakhouse design (single venue), MULTI-PAGE: the nav
// opens real routes (Menu / About / Gallery / Reservations / Visit) under
// basePath, never scroll anchors. Each page is its own layout; the sticky header
// and cream footer are shared. Palette is baked (navy / gold / olive / cream);
// the tenant swaps in their own photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GOLD = "#b3934f";
const NAVY = "#141b2d";
const OLIVE = "#6f7637";
const CREAM = "#f4f0e8";

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

export default function EmberDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: CREAM, backgroundImage: "repeating-linear-gradient(45deg,rgba(0,0,0,0.012) 0 2px,transparent 2px 5px)" }} className="text-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr]">
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "footer_info_heading", "Information")} />
          <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
            {([
              groups.length > 0 && { label: "Our menu", href: href("menu") },
              content.about && { label: "Our story", href: href("about") },
              bookingOn && { label: "Reservations", href: href("reservations") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-neutral-900">{l.label}</a></li>
            ))}
          </ul>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-7 flex gap-4 text-neutral-800">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "footer_hours_heading", "Opening times")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-neutral-700">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-neutral-500">Open daily.</p>}
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "footer_find_heading", "Find us")} />
          {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
          <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
          </div>
        </div>
        <div className="relative flex flex-col items-center justify-center rounded-[2rem] px-8 py-10 text-center" style={{ border: `2px solid ${GOLD}`, boxShadow: `inset 0 0 0 4px ${CREAM}, inset 0 0 0 5px ${GOLD}55` }}>
          <h4 style={serif} className="text-2xl" {...editCopy(content, "footer_cta_heading", "Get in touch")} />
          <p className="mt-2 text-sm text-neutral-600" {...editCopy(content, "footer_cta_blurb", "Reservations, private dining & enquiries")} />
          <a href={bookingOn ? href("reservations") : href("contact")} className="mt-5 inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: NAVY }}>{bookingOn ? "Book a table" : "Contact us"}</a>
        </div>
      </div>
      <p className="px-8 pb-8 text-right text-xs text-neutral-500">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <EmberHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Navy page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: NAVY }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 sm:pt-36">
        <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }} {...editCopy(content, kickerKey, kicker)} />
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
      {banner("The menu", "menu_banner_kicker", "Signature dishes", "menu_banner_title")}
      <section className="mx-auto max-w-5xl px-8 py-20">
        {groups.length > 0 ? (
          <>
            <CatalogCards
              groups={groups}
              columns={3}
              tone={{ ink: NAVY, muted: "#6b7280", accent: OLIVE, border: `${NAVY}1f`, cardBg: "#ffffff", nameStyle: serif, headingStyle: serif }}
            />
            {content.ordering_links && content.ordering_links.length > 0 && (
              <div className="mt-16 flex flex-wrap justify-center gap-4">
                {content.ordering_links.map((o) => (
                  <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>{o.label}</a>
                ))}
              </div>
            )}
          </>
        ) : <p className="text-neutral-500">Our menu is coming soon.</p>}
      </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "reservations_banner_kicker", "Book a table", "reservations_banner_title")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Reserve your table below and we will confirm by phone or email. For parties of 8 or more, please call us.</p>
          <EmberBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "contact_banner_kicker", "Find us", "contact_banner_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: NAVY, color: NAVY }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
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
                theme={{ cardBorder: "#b3934f", heading: "#141b2d", button: "#141b2d", buttonText: "#ffffff", fieldBorder: "#d8d2c4", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("About", "about_banner_kicker", "Our story", "about_banner_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
          {content.cuisine_type && (
            <>
              <h3 style={serif} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_taste_heading", "A taste of what we do")} />
              <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
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
        {banner("Gallery", "gallery_banner_kicker", "A look inside", "gallery_banner_title")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="relative z-10 mt-auto flex flex-col items-center gap-7 px-6 pb-20 text-center sm:pb-24">
          {content.tagline && <p data-edit="content.tagline" style={serif} className="max-w-2xl text-2xl leading-snug text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-3xl">{content.tagline}</p>}
          <a href={book} style={{ background: NAVY }} className="w-full max-w-sm px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90 sm:w-auto sm:px-12 sm:text-sm" {...editCopy(content, "hero_cta", "Make a reservation")} />
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-8 py-24 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }} {...editCopy(content, "intro_eyebrow", "Welcome")} />
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9] text-neutral-700">{content.about}</p>
        </section>
      )}

      {/* menu highlights → links to full menu page */}
      {featured.length > 0 && (
        <section className="border-y border-neutral-200" style={{ background: "#faf8f4" }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }} {...editCopy(content, "home_menu_eyebrow", "The menu")} />
                <h2 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl" {...editCopy(content, "home_menu_heading", "Signature dishes")} />
              </div>
              <a href={href("menu")} className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: OLIVE }} {...editCopy(content, "home_menu_link", "View full menu →")} />
            </div>
            <ul className="mx-auto mt-12 max-w-xl divide-y" style={{ borderColor: `${NAVY}1f` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: NAVY }}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: OLIVE }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* navy info band */}
      <section style={{ background: NAVY }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "home_hours_heading", "Opening times")} />
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                ))}
              </ul>
            )}
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "home_find_heading", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }} {...editCopy(content, "home_reserve_heading", "Reserve")} />
            <p className="mt-5 text-sm text-white/80" {...editCopy(content, "home_reserve_blurb", "Book your table online in seconds.")} />
            <a href={book} className="mt-6 inline-flex border border-white/60 px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-neutral-900" {...editCopy(content, "home_reserve_cta", "Make a reservation")} />
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
