import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DriftHeader } from "./DriftHeader";
import { DriftBooking } from "./DriftBooking";

// Drift — light, bright, photo-led Japanese/Nordic design (inspired by the
// structure of Sticks'n'Sushi), adapted to a single venue. MULTI-PAGE: the nav
// opens real routes (Menu / About / Gallery / Reservations / Visit) under
// basePath, never scroll anchors. Each page is its own layout; the sticky white
// header and dark footer are shared via shell(). Palette is baked
// (white / ink / coral / soft grey); the tenant swaps in their own photography,
// copy, menu, hours and address.
//
// Distinct from Ember:
//  - Menu page = a card-grid (clean item cards in a responsive 2-col grid),
//    not Ember's dotted-leader list.
//  - Reservations page = a slim horizontal booking bar (DriftBooking).
//  - Contact page = map-forward, two-column (address + Get directions left,
//    contact form right).

const WHITE = "#ffffff";
const INK = "#1a1a1a";
const CORAL = "#e0483d";
const SOFT = "#f4f4f2";

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

export default function DriftDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "Our story", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-[0.12em]">{name}</p>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-4 space-y-1 text-sm text-white/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Opening hours</h4>
          {content.hours && content.hours.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6">
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "Our story", href: href("about") },
              bookingOn && { label: "Book a table", href: href("reservations") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">Follow</h4>
          {content.socials && content.socials.length > 0 ? (
            <div className="mt-4 flex gap-4 text-white">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60">
                  <SocialIcon kind={`${s.label} ${s.url}`} />
                </a>
              ))}
            </div>
          ) : (
            <a
              href={book}
              className="mt-4 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90"
              style={{ background: CORAL }}
            >
              {bookingOn ? "Book a table" : "Contact us"}
            </a>
          )}
        </div>
      </div>
      <p className="px-6 pb-8 text-right text-xs text-white/40 sm:px-8">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900">
      <div style={{ background: WHITE }}>
        <DriftHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Light page header — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: SOFT }} className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-32 sm:px-8 sm:pb-16 sm:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>{kicker}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">{title}</h1>
        {blurb && <p className="mt-4 max-w-xl text-[17px] leading-[1.7] text-neutral-600">{blurb}</p>}
      </div>
    </section>
  );

  // ---- MENU (card-grid layout) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The menu", "Today's plates", "A short, focused menu of seasonal plates, prepared fresh each day and built to share across the table.")}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && (
                    <div className="mb-8 flex items-center gap-4">
                      <h2 className="text-2xl font-semibold sm:text-3xl">{section.section}</h2>
                      <span className="h-px flex-1" style={{ background: "#e6e6e2" }} />
                    </div>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</p>}
                      <div className="grid gap-5 sm:grid-cols-2">
                        {catg.items.map((item) => (
                          <div
                            key={item.id}
                            className="rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-neutral-300 hover:shadow-[0_2px_18px_rgba(0,0,0,0.05)]"
                          >
                            <div className="flex items-baseline justify-between gap-3">
                              <span data-edit={`item:${item.id}:name`} className="text-lg font-medium text-neutral-900">{item.name}</span>
                              {item.price && (
                                <span
                                  data-edit={`item:${item.id}:price`}
                                  className="shrink-0 rounded-full px-3 py-1 text-sm font-semibold text-white"
                                  style={{ background: CORAL }}
                                >
                                  {item.price}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed text-neutral-500">{item.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}

              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="flex flex-wrap gap-3 border-t border-neutral-200 pt-12">
                  {content.ordering_links.map((o) => (
                    <a
                      key={o.url}
                      href={o.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex rounded-full border px-7 py-3 text-sm font-semibold transition hover:bg-neutral-900 hover:text-white"
                      style={{ borderColor: INK, color: INK }}
                    >
                      {o.label}{o.commission_free ? " · commission-free" : ""}
                    </a>
                  ))}
                </div>
              )}

              {bookingOn && (
                <div className="border-t border-neutral-200 pt-12 text-center">
                  <a
                    href={href("reservations")}
                    style={{ background: CORAL }}
                    className="inline-flex rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90"
                  >
                    Book a table
                  </a>
                </div>
              )}
            </div>
          ) : (
            <p className="text-neutral-500">Our menu is being updated. Please check back soon.</p>
          )}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS (slim horizontal booking bar) ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book a table", "Reserve in a few seconds and we'll confirm by phone or email. For parties of 8 or more, please call us.")}
        <section className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <DriftBooking tenantId={tenant.id} name={name} />
          {(content.phone || content.email) && (
            <p className="mt-8 text-center text-sm text-neutral-500">
              Prefer to call?{" "}
              {content.phone && <a href={`tel:${content.phone}`} className="font-medium" style={{ color: CORAL }}>{content.phone}</a>}
              {content.phone && content.email && " · "}
              {content.email && <a href={`mailto:${content.email}`} className="font-medium" style={{ color: CORAL }}>{content.email}</a>}
            </p>
          )}
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT (map-forward, two-column) ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Find us")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
          {/* left: address + prominent Get directions */}
          <div>
            <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.map_url && (
              <a
                href={content.map_url}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-white shadow-lg transition hover:opacity-90"
                style={{ background: CORAL }}
              >
                Get directions
              </a>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-10 max-w-xs space-y-2 border-t border-neutral-200 pt-7 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* right: contact form */}
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Drop us a line"
                contactCta="Send message"
                theme={{ heading: "#1a1a1a", button: "#e0483d", buttonText: "#ffffff", fieldBorder: "#e3e3e0", radius: "1rem" }}
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
        {banner("Our story", "A bright room, honest food")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.9] text-neutral-700">{content.about}</p>
          ) : (
            <p className="text-neutral-500">Our story is coming soon.</p>
          )}
          {content.cuisine_type && (
            <>
              <h2 className="mt-12 text-2xl font-semibold">What we cook</h2>
              <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
            </>
          )}
          {gallery[0]?.image_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-12 aspect-[16/9] w-full rounded-3xl object-cover" />
          )}
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
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover sm:aspect-[4/3]" />
            ))}
          </section>
        ) : (
          <p className="mx-auto max-w-6xl px-6 py-20 text-neutral-500 sm:px-8">Photos coming soon.</p>
        )}
      </>,
    );
  }

  // ---- HOME (hero + short teasers only) ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 4);
  return shell(
    <>
      {/* HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col justify-end overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-300 to-neutral-500" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/25" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-24">
          <h1 data-edit="tenant.business_name" className="max-w-3xl text-4xl font-semibold leading-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-6xl">
            {name}
          </h1>
          {content.tagline && (
            <p data-edit="content.tagline" className="mt-4 max-w-xl text-lg text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)] sm:text-xl">
              {content.tagline}
            </p>
          )}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={book}
              style={{ background: CORAL }}
              className="inline-flex rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-xl transition hover:opacity-90"
            >
              Book a table
            </a>
            {groups.length > 0 && (
              <a
                href={href("menu")}
                className="inline-flex rounded-full border border-white/70 px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900"
              >
                See the menu
              </a>
            )}
          </div>
        </div>
      </section>

      {/* INTRO teaser → links to about */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>Welcome</p>
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9] text-neutral-700">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: CORAL }}>Our story →</a>
        </section>
      )}

      {/* MENU HIGHLIGHTS teaser → links to full menu page */}
      {featured.length > 0 && (
        <section style={{ background: SOFT }} className="border-y border-neutral-200">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>The menu</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">A few favourites</h2>
              </div>
              <a href={href("menu")} className="text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: CORAL }}>View full menu →</a>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2">
              {featured.map((item) => (
                <div key={item.id} className="rounded-2xl border border-neutral-200 bg-white p-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <span data-edit={`item:${item.id}:name`} className="text-lg font-medium text-neutral-900">{item.name}</span>
                    {item.price && (
                      <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: CORAL }}>{item.price}</span>
                    )}
                  </div>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUICK INFO band → hours + visit + reserve CTA */}
      <section className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Opening hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 text-sm text-neutral-500">Open daily.</p>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            <div className="mt-3 space-y-1 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            <a href={href("contact")} className="mt-4 inline-flex text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: CORAL }}>Visit us →</a>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Reserve</h3>
            <p className="mt-4 text-sm text-neutral-700">{bookingOn ? "Book your table online in seconds." : "Get in touch to plan your visit."}</p>
            <a
              href={book}
              style={{ background: CORAL }}
              className="mt-5 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
            >
              {bookingOn ? "Book a table" : "Contact us"}
            </a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
