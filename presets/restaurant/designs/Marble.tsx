import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MarbleHeader } from "./MarbleHeader";
import { MarbleBooking } from "./MarbleBooking";

// Marble — a premium steakhouse & cocktail lounge design (single venue), warm
// and dark, inspired by the structure of kobe-restaurant.co.uk:
//  1. Sticky header — wordmark, nav, "Reserve a table"; transparent over hero,
//     solid charcoal on scroll; functional hamburger on mobile.
//  2. Dark full-bleed hero — steak/grill mood — venue name + reservation CTA.
//  3. Warm serif intro / about.
//  4. "Signature cuts" menu from groupCatalog(catalog), elegant list.
//  5. "Lounge & bar" section.
//  6. "Private dining" section.
//  7. Ordering links (if any) as buttons.
//  8. Gallery grid (only if non-empty).
//  9. "Visit / Find us" with address, tel:/mailto:, directions, contact form.
// 10. Footer: hours, socials, real in-page anchor links.
// Palette is baked to a warm dark steakhouse look; the client swaps in their
// own photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CHARCOAL = "#1c1a17";
const GOLD = "#c9a227";
const EMBER = "#8a2b22";
const CREAM = "#efe8db";

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

export default function MarbleDesign({ site }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.reservation_url || content.cta_url || "#book";
  const name = tenant.business_name;

  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const navLinks = [
    ...(groups.length > 0 ? [{ label: "Menu", href: "#menu" }] : []),
    { label: "Lounge", href: "#lounge" },
    { label: "Private dining", href: "#private" },
    ...(bookingOn ? [{ label: "Reserve", href: "#book" }] : []),
    { label: "Visit", href: "#visit" },
  ];

  return (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CHARCOAL }} className="min-h-screen font-body text-[#efe8db]">
      {/* Sticky header (transparent over hero, solid charcoal on scroll) */}
      <MarbleHeader name={name} book={book} links={navLinks} />

      {/* 1 — HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 50% 0%, #2a2520 0%, ${CHARCOAL} 70%)` }} />
        )}
        {/* dark wash for legibility */}
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
              <a href="#menu" className="w-full border px-10 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] backdrop-blur-sm transition hover:bg-[#c9a227] hover:text-[#1c1a17] sm:w-auto sm:text-sm" style={{ borderColor: GOLD, color: GOLD }}>
                View the menu
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 2 — INTRO / ABOUT */}
      <section className="mx-auto max-w-3xl px-8 py-24 text-center sm:py-28">
        <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>Our table</p>
        <h2 data-edit="content.tagline" style={serif} className="mt-5 text-3xl font-medium leading-tight text-[#efe8db] sm:text-[2.6rem]">
          {content.tagline ?? `Welcome to ${name}`}
        </h2>
        {content.about && (
          <p data-edit="content.about" className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.85] text-[#efe8db]/75">
            {content.about}
          </p>
        )}
      </section>

      {/* 3 — SIGNATURE CUTS (menu) */}
      {groups.length > 0 && (
        <section id="menu" className="border-t border-white/10" style={{ background: "#211d19" }}>
          <div className="mx-auto max-w-5xl px-8 py-24 sm:py-28">
            <p className="text-center text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>The menu</p>
            <h2 style={serif} className="mt-3 text-center text-4xl font-medium text-[#efe8db] sm:text-5xl">Signature cuts</h2>
            <div className="mt-14 grid items-start gap-x-16 gap-y-14 md:grid-cols-2">
              {groups.map((section) => (
                <div key={section.section} className="break-inside-avoid">
                  {section.section && <h3 className="mb-5 border-b border-white/15 pb-3 text-lg uppercase tracking-[0.16em]" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <ul key={catg.category ?? "_"} className="space-y-5">
                      {catg.items.map((item) => (
                        <li key={item.id}>
                          <div className="flex items-baseline justify-between gap-3">
                            <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-[#efe8db]">{item.name}</span>
                            <span className="mx-2 flex-1 border-b border-dotted border-white/20" />
                            {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
                          </div>
                          {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-[#efe8db]/55">{item.description}</p>}
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
                  <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c9a227] hover:text-[#1c1a17]" style={{ borderColor: GOLD, color: GOLD }}>
                    {o.label}{o.commission_free ? " · commission-free" : ""}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5 — LOUNGE & BAR */}
      <section id="lounge" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-24 sm:py-28 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>After dark</p>
            <h2 style={serif} className="mt-3 text-4xl font-medium text-[#efe8db] sm:text-5xl">Lounge &amp; bar</h2>
            <p className="mt-7 max-w-xl text-[17px] leading-[1.85] text-[#efe8db]/75">
              Settle into the low light of our cocktail lounge. Our bartenders pour classics and house creations alongside a deep cellar of old-world reds, rare whiskies and small-batch spirits, the perfect prelude or finish to dinner.
            </p>
            <p className="mt-4 max-w-xl text-[17px] leading-[1.85] text-[#efe8db]/75">
              Walk-ins welcome at the bar; reserve ahead for a booth on weekends.
            </p>
            {bookingOn && (
              <a href="#book" className="mt-8 inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c9a227] hover:text-[#1c1a17]" style={{ borderColor: GOLD, color: GOLD }}>
                Reserve a booth
              </a>
            )}
          </div>
          <div className="grid grid-cols-3 gap-3 text-center">
            {[
              { k: "Cellar", v: "Old & new world" },
              { k: "Bar", v: "House cocktails" },
              { k: "Spirits", v: "Rare & aged" },
            ].map((c) => (
              <div key={c.k} className="border border-white/12 px-3 py-8" style={{ background: "rgba(0,0,0,0.2)" }}>
                <p className="text-xl" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>{c.k}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[#efe8db]/60">{c.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — PRIVATE DINING */}
      <section id="private" className="border-t border-white/10" style={{ background: "#211d19" }}>
        <div className="mx-auto max-w-6xl px-8 py-24 sm:py-28">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>Occasions</p>
            <h2 style={serif} className="mt-3 text-4xl font-medium text-[#efe8db] sm:text-5xl">Private dining</h2>
            <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.85] text-[#efe8db]/75">
              From intimate dinners to celebrations and corporate evenings, our private rooms are yours for the night with a dedicated team and bespoke menus.
            </p>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { name: "The Cellar Room", detail: "Up to 14 guests seated, surrounded by our reserve wines." },
              { name: "The Grill Table", detail: "A chef's table for 8 with a front-row view of the pass." },
              { name: "Whole-venue hire", detail: "Up to 80 guests for receptions and celebrations." },
            ].map((r) => (
              <div key={r.name} className="border border-white/12 p-8" style={{ background: "rgba(0,0,0,0.2)" }}>
                <h3 className="text-2xl" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>{r.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#efe8db]/70">{r.detail}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href="#visit" className="inline-flex px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#efe8db] transition hover:opacity-90 sm:text-sm" style={{ background: EMBER }}>
              Enquire about private dining
            </a>
          </div>
        </div>
      </section>

      {/* 8 — GALLERY (optional) */}
      {gallery.length > 0 && (
        <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {gallery.slice(0, 6).map((g) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
          ))}
        </section>
      )}

      {/* 9 — VISIT / FIND US (working contact form) */}
      <section id="visit" className="border-t border-white/10">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-24 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>Visit us</p>
            <h2 style={serif} className="mt-3 text-4xl font-medium text-[#efe8db] sm:text-5xl">Find us</h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[#efe8db]/80">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[#c9a227]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[#c9a227]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#c9a227] hover:text-[#1c1a17]" style={{ borderColor: GOLD, color: GOLD }}>
                Get directions
              </a>
            )}

            {/* Booking widget (functional, posts to /api/site-forms) */}
            {bookingOn && (
              <div className="mt-12">
                <MarbleBooking tenantId={tenant.id} name={name} />
              </div>
            )}
          </div>

          {contactOn && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>Enquiries</p>
              <h3 style={serif} className="mb-6 mt-3 text-3xl font-medium text-[#efe8db]">Get in touch</h3>
              <SiteContactForms tenantId={tenant.id} booking={false} contact />
            </div>
          )}
        </div>
      </section>

      {/* 10 — FOOTER */}
      <footer className="border-t border-white/10" style={{ background: "#161310" }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p data-edit="tenant.business_name" className="text-2xl" style={{ color: GOLD, fontFamily: "var(--font-fraunces)" }}>{name}</p>
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
              {[
                ...(groups.length > 0 ? [{ label: "The menu", href: "#menu" }] : []),
                { label: "Lounge & bar", href: "#lounge" },
                { label: "Private dining", href: "#private" },
                ...(bookingOn ? [{ label: "Reserve a table", href: "#book" }] : []),
                { label: "Visit us", href: "#visit" },
              ].map((l) => (
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
    </div>
  );
}
