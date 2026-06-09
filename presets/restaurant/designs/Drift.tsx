import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DriftHeader } from "./DriftHeader";
import { DriftBooking } from "./DriftBooking";

// Drift — light, bright, photo-led Japanese/Nordic design (inspired by the
// structure of Sticks'n'Sushi), adapted to a single venue:
//  1. Sticky header: wordmark left, horizontal nav, coral "Book a table" right;
//     transparent over the hero, solid white on scroll, hamburger on mobile.
//  2. Large bright hero photo with the venue name, a short tagline and a
//     reservation CTA.
//  3. Two alternating image/text promo blocks introducing the food philosophy.
//  4. Menu section grouped by section (groupCatalog), clean photo-light list.
//  5. Ordering links row (if any).
//  6. Gallery grid (if non-empty).
//  7. Visit / Find us: address, tel/mailto, Get directions, working contact form.
//  8. Footer: hours, socials, contact, in-page anchor links.
// Palette baked at the top; the client swaps in their own photography, copy,
// menu, hours and address.

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

export default function DriftDesign({ site }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.reservation_url || content.cta_url || "#book";
  const name = tenant.business_name;

  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "Our story", href: "#story" },
    ...(bookingOn ? [{ label: "Book", href: "#book" }] : []),
    { label: "Visit", href: "#visit" },
  ];

  // Promo block copy with graceful fallbacks.
  const philosophy = content.about;
  const cuisine = content.cuisine_type;

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900" >
      <div style={{ background: WHITE }}>
        {/* Sticky header (transparent over hero, solid white on scroll) */}
        <DriftHeader name={name} book={bookingOn ? "#book" : book} links={navLinks} />

        {/* 1 — HERO */}
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
            <p data-edit="content.tagline" className="mt-4 max-w-xl text-lg text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)] sm:text-xl">
              {content.tagline ?? "Fresh, seasonal plates in a bright, easy room."}
            </p>
            <a
              href={bookingOn ? "#book" : book}
              style={{ background: CORAL }}
              className="mt-8 inline-flex rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-xl transition hover:opacity-90"
            >
              Book a table
            </a>
          </div>
        </section>

        {/* 2 — ALTERNATING PROMO BLOCKS (food philosophy) */}
        <section id="story" className="mx-auto max-w-6xl space-y-20 px-6 py-24 sm:px-8 sm:py-28">
          {/* block one: image left, text right */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="overflow-hidden rounded-3xl" style={{ background: SOFT }}>
              {gallery[0]?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={hero} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full" />
              )}
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>Our story</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">A bright room, honest food</h2>
              <p data-edit="content.about" className="mt-5 max-w-xl text-[17px] leading-[1.8] text-neutral-600">
                {philosophy ?? `Welcome to ${name}. We cook with the seasons and serve it simply, in a light, relaxed space made for sharing.`}
              </p>
            </div>
          </div>

          {/* block two: text left, image right (reversed) */}
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-last lg:order-first">
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>In the kitchen</p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">What we cook</h2>
              <p data-edit="content.cuisine_type" className="mt-5 max-w-xl text-[17px] leading-[1.8] text-neutral-600">
                {cuisine ?? "A short, focused menu of seasonal plates, prepared fresh each day and built to share across the table."}
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl" style={{ background: SOFT }}>
              {gallery[1]?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[1].image_url} alt={gallery[1].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ) : gallery[0]?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full" />
              )}
            </div>
          </div>
        </section>

        {/* 3 — MENU + BOOKING WIDGET */}
        <section style={{ background: SOFT }}>
          <div className={`mx-auto max-w-6xl gap-12 px-6 py-24 sm:px-8 sm:py-28 ${bookingOn ? "lg:grid lg:grid-cols-[1.3fr_0.7fr] lg:gap-16" : ""}`}>
            <div>
              <div id="menu" className="scroll-mt-24">
                <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>The menu</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Today&apos;s plates</h2>
              </div>

              {groups.length > 0 ? (
                <div className="mt-12 space-y-12">
                  {groups.map((section) => (
                    <div key={section.section}>
                      {section.section && <h3 className="mb-5 border-b border-neutral-300 pb-3 text-sm font-semibold uppercase tracking-[0.16em] text-neutral-700">{section.section}</h3>}
                      {section.categories.map((catg) => (
                        <ul key={catg.category ?? "_"} className="space-y-5">
                          {catg.category && <li className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</li>}
                          {catg.items.map((item) => (
                            <li key={item.id}>
                              <div className="flex items-baseline justify-between gap-3">
                                <span data-edit={`item:${item.id}:name`} className="text-lg font-medium text-neutral-900">{item.name}</span>
                                <span className="mx-2 flex-1 border-b border-dotted border-neutral-300" />
                                {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-semibold" style={{ color: CORAL }}>{item.price}</span>}
                              </div>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </li>
                          ))}
                        </ul>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-8 text-neutral-500">Our menu is being updated. Please check back soon.</p>
              )}

              {/* 4 — ORDERING LINKS */}
              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-12 flex flex-wrap gap-3">
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
            </div>

            {/* booking widget (functional — posts to /api/site-forms) */}
            {bookingOn && (
              <div className="mt-12 lg:mt-0">
                <DriftBooking tenantId={tenant.id} name={name} />
              </div>
            )}
          </div>
        </section>

        {/* 5 — GALLERY (optional) */}
        {gallery.length > 0 && (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.slice(0, 6).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover sm:aspect-[4/3]" />
            ))}
          </section>
        )}

        {/* 6 — VISIT / FIND US (working contact form) */}
        <section id="visit" className="border-t border-neutral-200">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-8 sm:py-28 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>Visit us</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Find us</h2>
              <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-neutral-700">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
              </div>
              {content.map_url && (
                <a
                  href={content.map_url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex rounded-full px-7 py-3 text-sm font-semibold text-white transition hover:opacity-90"
                  style={{ background: INK }}
                >
                  Get directions
                </a>
              )}
            </div>

            {contactOn && (
              <div>
                <SiteContactForms tenantId={tenant.id} booking={false} contact />
              </div>
            )}
          </div>
        </section>

        {/* 7 — FOOTER */}
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
                {[
                  { label: "Menu", href: "#menu" },
                  { label: "Our story", href: "#story" },
                  ...(bookingOn ? [{ label: "Book a table", href: "#book" }] : []),
                  { label: "Visit us", href: "#visit" },
                ].map((l) => (
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
                  href={bookingOn ? "#book" : "#visit"}
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
      </div>
    </div>
  );
}
