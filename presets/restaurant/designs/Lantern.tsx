import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LanternHeader } from "./LanternHeader";
import { LanternBooking } from "./LanternBooking";

// Lantern — dark, moody, modern-Asian gastropub design (inspired by the
// structure of The Duck & Rice), adapted to a single editable venue:
//  1. Dark sticky header: wordmark, nav, "Book a table" (transparent over the
//     hero, solid near-black on scroll; functional hamburger on mobile).
//  2. Full-bleed dark hero: venue name + tagline + reservation CTA, warm
//     red/amber accents.
//  3. Intro/about on dark.
//  4. Menu (dim sum / mains) from groupCatalog on a dark surface.
//  5. "Bar & beer" drinks highlight band.
//  6. Ordering links (if any) as buttons.
//  7. Gallery grid (if non-empty).
//  8. "Visit / Find us": address, tel/mailto, Get directions, contact form.
//  9. Dark footer: hours, socials, links to real in-page anchors.
// Palette is baked to the reference's mood; the client swaps in their own
// photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const NEAR_BLACK = "#141210";
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

export default function LanternDesign({ site }: PresetProps) {
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
    { label: "Bar & beer", href: "#bar" },
    ...(bookingOn ? [{ label: "Book", href: "#book" }] : []),
    { label: "Visit", href: "#visit" },
  ];

  return (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: NEAR_BLACK, color: OFF_WHITE }} className="min-h-screen font-body">
      <div>
        {/* Sticky header (transparent over hero, solid near-black on scroll) */}
        <LanternHeader name={name} book={book} links={navLinks} />

        {/* 1 — HERO */}
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
              <a href={book} style={{ background: RED }} className="inline-flex w-full max-w-xs justify-center px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90 sm:w-auto sm:text-sm">
                Book a table
              </a>
            </div>
          </div>
        </section>

        {/* 2 — INTRO / ABOUT */}
        {(content.about || content.tagline) && (
          <section className="mx-auto max-w-3xl px-8 py-24 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: RED }}>Welcome</p>
            <h2 data-edit="content.tagline" style={serif} className="mt-4 text-3xl font-medium leading-tight text-[#f3ede1] sm:text-[2.5rem]">
              {content.tagline ?? `Welcome to ${name}`}
            </h2>
            {content.about && (
              <p data-edit="content.about" className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.8] text-[#f3ede1]/75">
                {content.about}
              </p>
            )}
          </section>
        )}

        {/* 4 — MENU */}
        {groups.length > 0 && (
          <section id="menu" className="border-y border-white/10" style={{ background: "#1b1714" }}>
            <div className="mx-auto max-w-5xl px-8 py-24">
              <p className="text-center text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>The menu</p>
              <h2 style={serif} className="mt-3 text-center text-4xl font-medium text-[#f3ede1] sm:text-5xl">Dim sum &amp; mains</h2>
              <div className="mt-14 grid items-start gap-x-16 gap-y-14 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && <h3 style={serif} className="mb-5 border-b border-white/15 pb-3 text-lg uppercase tracking-[0.16em] text-[#f3ede1]">{section.section}</h3>}
                    {section.categories.map((catg) => (
                      <ul key={catg.category ?? "_"} className="space-y-4">
                        {catg.items.map((item) => (
                          <li key={item.id}>
                            <div className="flex items-baseline justify-between gap-3">
                              <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-[#f3ede1]">{item.name}</span>
                              <span className="mx-2 flex-1 border-b border-dotted border-white/20" />
                              {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
                            </div>
                            {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-[#f3ede1]/55">{item.description}</p>}
                          </li>
                        ))}
                      </ul>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 5 — BAR & BEER highlight band */}
        <section id="bar" className="relative overflow-hidden" style={{ background: NEAR_BLACK }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-24 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: RED }}>Bar &amp; beer</p>
              <h2 style={serif} className="mt-3 text-4xl font-medium text-[#f3ede1] sm:text-5xl">Craft on tap, late into the night</h2>
              <p className="mt-6 max-w-lg text-[17px] leading-[1.8] text-[#f3ede1]/75">
                A rotating line-up of independent craft beers alongside our own house pours, low-intervention wines and a short list of sharp, spirit-forward cocktails. Pull up a stool, order a round of dim sum and stay a while.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-[#f3ede1]">
              {[
                { t: "Craft beer", d: "Rotating taps from independent brewers." },
                { t: "House pours", d: "Our own lager and pale, brewed for the room." },
                { t: "Cocktails", d: "Spirit-forward, low on fuss, high on flavour." },
                { t: "Wine", d: "A tight, low-intervention by-the-glass list." },
              ].map((c) => (
                <div key={c.t} className="border border-white/12 p-6">
                  <p style={{ ...serif, color: GOLD }} className="text-lg">{c.t}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#f3ede1]/60">{c.d}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 6 — ORDERING LINKS */}
          {content.ordering_links && content.ordering_links.length > 0 && (
            <div className="mx-auto -mt-6 max-w-6xl px-8 pb-20">
              <div className="flex flex-wrap justify-center gap-4">
                {content.ordering_links.map((o) => (
                  <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede1] transition hover:bg-[#f3ede1] hover:text-neutral-900" style={{ borderColor: GOLD }}>
                    {o.label}{o.commission_free ? " · commission-free" : ""}
                  </a>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* 7 — GALLERY (optional) */}
        {gallery.length > 0 && (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.slice(0, 6).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </section>
        )}

        {/* 8 — VISIT / FIND US (working contact form) */}
        <section id="visit" className="border-t border-white/10" style={{ background: "#1b1714" }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Visit us</p>
              <h2 style={serif} className="mt-3 text-4xl font-medium text-[#f3ede1] sm:text-5xl">Find us</h2>
              <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-[#f3ede1]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
              </div>
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#f3ede1] transition hover:bg-[#f3ede1] hover:text-neutral-900" style={{ borderColor: GOLD }}>
                  Get directions
                </a>
              )}

              {/* booking widget (functional — posts to /api/site-forms) */}
              {bookingOn && (
                <div className="mt-12">
                  <LanternBooking tenantId={tenant.id} name={name} />
                </div>
              )}
            </div>

            {contactOn && (
              <div className="lantern-contact">
                <SiteContactForms tenantId={tenant.id} booking={false} contact />
              </div>
            )}
          </div>
        </section>

        {/* 9 — FOOTER */}
        <footer className="border-t border-white/10" style={{ background: NEAR_BLACK }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
            <div>
              <p data-edit="tenant.business_name" style={serif} className="text-2xl text-[#f3ede1]">{name}</p>
              <a href={book} className="mt-5 inline-flex px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: RED }}>
                Book a table
              </a>
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
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Opening hours</h4>
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
              <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Explore</h4>
              <ul className="mt-5 space-y-2.5 text-sm text-[#f3ede1]/80">
                {[
                  { label: "Menu", href: "#menu" },
                  { label: "Bar & beer", href: "#bar" },
                  ...(bookingOn ? [{ label: "Book a table", href: "#book" }] : []),
                  { label: "Visit", href: "#visit" },
                ].map((l) => <li key={l.label}><a href={l.href} className="transition hover:text-[#c8a24a]">{l.label}</a></li>)}
              </ul>
            </div>
          </div>
          <p className="px-8 pb-8 text-right text-xs text-[#f3ede1]/40">© {name}. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}
