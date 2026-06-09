import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LaurelHeader } from "./LaurelHeader";
import { LaurelBooking } from "./LaurelBooking";

// Laurel — an elegant, luxe, botanical single-venue design (inspired by the
// structure of The Ivy Collection), adapted to one fully-editable restaurant:
//  1. Sticky centred serif wordmark header — transparent over the hero, solid
//     deep green on scroll, prominent "Book a table" button, mobile hamburger.
//  2. Lush full-bleed hero — serif headline, venue name, reservation CTA.
//  3. A prominent, persistent booking widget (guests/date/time) — the signature.
//  4. Refined serif intro / about section.
//  5. Seasonal menu as elegant cards from groupCatalog(catalog).
//  6. Events & private dining section (placeholder copy).
//  7. Order/delivery buttons from content.ordering_links (when present).
//  8. Botanical gallery grid (only when gallery is non-empty).
//  9. Visit / Find us — address, tel/mailto, directions, working contact form.
// 10. Ornate footer — hours, socials, in-page links.
// Palette is baked to the reference's botanical look (deep green / gold / cream
// / ink); the client swaps in their own photography, copy, menu, hours, contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GREEN = "#163d2b";
const GOLD = "#b8975a";
const CREAM = "#f6f1e7";
const INK = "#1c1c1c";

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

// A small botanical leaf mark used as an ornament between sections.
function Sprig() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1" aria-hidden className="mx-auto">
      <path d="M12 21V6" />
      <path d="M12 11c-2-1-4-1-5-3 2 0 4 0 5 2zM12 11c2-1 4-1 5-3-2 0-4 0-5 2zM12 16c-2-1-4-1-5-3 2 0 4 0 5 2zM12 16c2-1 4-1 5-3-2 0-4 0-5 2z" />
    </svg>
  );
}

export default function LaurelDesign({ site }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;

  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const book = bookingOn ? "#book" : content.reservation_url || content.cta_url || "#visit";

  const navLinks = [
    { label: "Menu", href: "#menu" },
    { label: "Events", href: "#events" },
    ...(bookingOn ? [{ label: "Book", href: "#book" }] : []),
    { label: "Visit", href: "#visit" },
  ];

  return (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: INK }} className="min-h-screen font-body">
      {/* Sticky header (transparent over hero, solid green on scroll) */}
      <LaurelHeader name={name} book={book} links={navLinks} />

      {/* 2 — LUSH HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col items-center justify-center overflow-hidden text-center">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${GREEN}, #0d2419)` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/45" />

        <div className="relative z-10 px-6 text-white">
          {content.cuisine_type && (
            <p data-edit="content.cuisine_type" className="text-xs font-medium uppercase tracking-[0.4em] text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{content.cuisine_type}</p>
          )}
          <h1 data-edit="content.tagline" style={serif} className="mx-auto mt-5 max-w-3xl text-4xl font-medium leading-[1.1] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl">
            {content.tagline ?? "An all-day dining destination"}
          </h1>
          <p style={serif} className="mt-5 text-lg italic text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:text-2xl">{name}</p>
          <div className="mt-9">
            <a href={book} className="inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] shadow-xl transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
              Reserve a table
            </a>
          </div>
        </div>
      </section>

      {/* 3 — PERSISTENT BOOKING WIDGET (signature) */}
      {bookingOn && (
        <section style={{ background: GREEN }} className="relative z-20 -mt-px text-white">
          <div className="mx-auto max-w-6xl px-6 py-10 sm:py-12">
            <p style={serif} className="text-center text-xl" >Book your table</p>
            <p className="mt-1 text-center text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>Reservations at {name}</p>
            <div className="mt-8">
              <LaurelBooking tenantId={tenant.id} name={name} />
            </div>
          </div>
        </section>
      )}

      {/* 4 — INTRO / ABOUT */}
      {(content.about || content.cuisine_type) && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Sprig />
          <h2 style={serif} className="mt-6 text-3xl font-medium sm:text-4xl" >Welcome to {name}</h2>
          {content.about && (
            <p data-edit="content.about" className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          )}
        </section>
      )}

      {/* 5 — SEASONAL MENU */}
      {groups.length > 0 && (
        <section id="menu" style={{ background: GREEN }} className="text-white">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>Our menu</p>
            <h2 style={serif} className="mt-3 text-center text-4xl font-medium sm:text-5xl">The seasonal table</h2>
            <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
              {groups.map((section) => (
                <div key={section.section} className="break-inside-avoid">
                  {section.section && (
                    <h3 className="mb-6 border-b pb-3 text-xl uppercase tracking-[0.16em]" style={{ borderColor: `${GOLD}55`, color: GOLD, fontFamily: "var(--font-fraunces)" }}>{section.section}</h3>
                  )}
                  {section.categories.map((catg) => (
                    <ul key={catg.category ?? "_"} className="space-y-6">
                      {catg.items.map((item) => (
                        <li key={item.id}>
                          <div className="flex items-baseline justify-between gap-3">
                            <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-white">{item.name}</span>
                            <span className="mx-2 flex-1 border-b border-dotted" style={{ borderColor: `${GOLD}55` }} />
                            {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
                          </div>
                          {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-white/65">{item.description}</p>}
                        </li>
                      ))}
                    </ul>
                  ))}
                </div>
              ))}
            </div>

            {/* 7 — ORDERING LINKS */}
            {content.ordering_links && content.ordering_links.length > 0 && (
              <div className="mt-14 flex flex-wrap justify-center gap-4">
                {content.ordering_links.map((o) => (
                  <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
                    {o.label}{o.commission_free ? " · commission-free" : ""}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 6 — EVENTS & PRIVATE DINING */}
      <section id="events" className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Sprig />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>Celebrate with us</p>
        <h2 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">Events &amp; private dining</h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.9] text-neutral-700">
          From intimate dinners to milestone celebrations, our team will craft an occasion to remember. Elegant private rooms, bespoke menus and attentive service, tailored to you.
        </p>
        <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
          {[
            { t: "Private rooms", d: "Beautiful spaces for seated dinners and receptions, with dedicated service throughout." },
            { t: "Bespoke menus", d: "Seasonal tasting menus and curated wine pairings, designed around your party." },
            { t: "Special occasions", d: "Birthdays, anniversaries and corporate gatherings, hosted with care from start to finish." },
          ].map((c) => (
            <div key={c.t} className="border-t pt-5" style={{ borderColor: `${GOLD}66` }}>
              <h3 className="text-xl" style={{ color: GREEN, fontFamily: "var(--font-fraunces)" }}>{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{c.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12">
          <a href={bookingOn ? "#book" : "#visit"} className="inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
            Enquire now
          </a>
        </div>
      </section>

      {/* 8 — GALLERY */}
      {gallery.length > 0 && (
        <section className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
          {gallery.slice(0, 6).map((g) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
          ))}
        </section>
      )}

      {/* 9 — VISIT / FIND US (working contact form) */}
      <section id="visit" style={{ background: CREAM }} className="border-t" >
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>Visit us</p>
            <h2 className="mt-3 text-4xl font-medium sm:text-5xl" style={{ color: GREEN, fontFamily: "var(--font-fraunces)" }}>Find us</h2>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-sm space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6 border-b border-dashed py-1.5" style={{ borderColor: `${GREEN}22` }}>
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
                  </li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
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

      {/* 10 — ORNATE FOOTER */}
      <footer style={{ background: GREEN }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 py-16">
          <div className="text-center">
            <Sprig />
            <p data-edit="tenant.business_name" style={serif} className="mt-4 text-2xl tracking-[0.16em]">{name}</p>
          </div>

          <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Explore</h4>
              <ul className="mt-5 space-y-2.5 text-sm text-white/75">
                {[
                  { label: "Our menu", href: "#menu" },
                  { label: "Events & private dining", href: "#events" },
                  ...(bookingOn ? [{ label: "Book a table", href: "#book" }] : []),
                  { label: "Visit us", href: "#visit" },
                ].map((l) => (
                  <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Opening hours</h4>
              {content.hours && content.hours.length > 0 ? (
                <ul className="mt-5 space-y-2 text-sm text-white/75">
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
                  ))}
                </ul>
              ) : (
                <p className="mt-5 text-sm text-white/60">Open daily for lunch and dinner.</p>
              )}
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Find us</h4>
              <div className="mt-5 space-y-2 text-sm text-white/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
              </div>
            </div>

            <div>
              <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Follow</h4>
              {content.socials && content.socials.length > 0 && (
                <div className="mt-5 flex gap-4">
                  {content.socials.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60">
                      <SocialIcon kind={`${s.label} ${s.url}`} />
                    </a>
                  ))}
                </div>
              )}
              <a href={book} className="mt-6 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
                {bookingOn ? "Book a table" : "Contact us"}
              </a>
            </div>
          </div>

          <p className="mt-14 border-t pt-8 text-center text-xs text-white/45" style={{ borderColor: `${GOLD}33` }}>© {name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
