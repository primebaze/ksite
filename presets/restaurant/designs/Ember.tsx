import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EmberHeader } from "./EmberHeader";
import { EmberBooking } from "./EmberBooking";

// Ember — premium dark steakhouse design (adapted to a single venue):
//  1. Bright full-bleed food hero — stacked top-left nav, centred crest, a
//     "Make a reservation" button top-right + a big one centred-bottom.
//  2. Light intro: serif heading + body on the left, a bordered booking widget
//     (Restaurant / Guests / Date / Time / Book now) on the right.
//  3. Dark navy band: Opening times & contact · Private dining · Address —
//     gold uppercase headings.
//  4. Menu (signature dishes), light & serif.
//  5. Cream footer: three nav columns + an email-signup box.
// Palette is baked to match the reference (navy / gold / olive / cream); the
// client swaps in their own photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GOLD = "#b3934f";
const NAVY = "#141b2d";
const OLIVE = "#6f7637";
const CREAM = "#f4f0e8";

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

export default function EmberDesign({ site }: PresetProps) {
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
    { label: "Private dining", href: "#private" },
    ...(bookingOn ? [{ label: "Reservations", href: "#book" }] : []),
    { label: "Visit", href: "#visit" },
  ];

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      {/* Sticky header (transparent over hero, solid navy on scroll) */}
      <EmberHeader name={name} book={book} links={navLinks} />

      {/* 1 — HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}

        {/* centred reservation button */}
        <div className="relative z-10 mt-auto flex justify-center px-6 pb-16 sm:pb-20">
          <a href={book} style={{ background: NAVY }} className="w-full max-w-sm px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90 sm:w-auto sm:px-12 sm:text-sm">Make a reservation</a>
        </div>
      </section>

      {/* 2 — INTRO + BOOKING WIDGET */}
      <section className={`mx-auto grid max-w-6xl gap-12 px-8 py-24 ${bookingOn ? "lg:grid-cols-[1.2fr_0.8fr] lg:gap-20" : ""}`}>
        <div>
          <h2 data-edit="content.tagline" style={serif} className="text-3xl font-medium leading-tight sm:text-[2.5rem]">{content.tagline ?? `Welcome to ${name}`}</h2>
          {content.about && <p data-edit="content.about" className="mt-7 max-w-xl text-[17px] leading-[1.8] text-neutral-700">{content.about}</p>}
          {content.cuisine_type && (
            <>
              <h3 style={serif} className="mt-12 text-2xl font-medium">A taste of what we do</h3>
              <p data-edit="content.cuisine_type" className="mt-4 max-w-xl text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
            </>
          )}
        </div>

        {/* booking widget (functional — posts to /api/site-forms) */}
        {bookingOn && <EmberBooking tenantId={tenant.id} name={name} />}
      </section>

      {/* 3 — NAVY INFO BAND */}
      <section id="private" style={{ background: NAVY }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Opening times</h3>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                ))}
              </ul>
            )}
            <h3 className="mt-10 text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Contact us</h3>
            <div className="mt-5 space-y-1.5 text-sm text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Private dining</h3>
            <div className="mt-5 space-y-4 text-sm text-white/80">
              <p><span className="font-semibold text-white">The Wine Room</span> — up to 22 guests seated.</p>
              <p><span className="font-semibold text-white">Private Dining Room</span> — up to 12 guests seated.</p>
              <p><span className="font-semibold text-white">The Terrace</span> — up to 30 standing.</p>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Address</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
          </div>
        </div>
      </section>

      {/* 4 — MENU */}
      {groups.length > 0 && (
        <section id="menu" className="mx-auto max-w-5xl px-8 py-24">
          <p className="text-center text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>The menu</p>
          <h2 style={serif} className="mt-3 text-center text-4xl font-medium sm:text-5xl">Signature dishes</h2>
          <div className="mt-14 grid items-start gap-x-16 gap-y-14 md:grid-cols-2">
            {groups.map((section) => (
              <div key={section.section} className="break-inside-avoid">
                {section.section && <h3 style={serif} className="mb-5 border-b border-neutral-200 pb-3 text-lg uppercase tracking-[0.16em]">{section.section}</h3>}
                {section.categories.map((catg) => (
                  <ul key={catg.category ?? "_"} className="space-y-4">
                    {catg.items.map((item) => (
                      <li key={item.id}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg">{item.name}</span>
                          <span className="mx-2 flex-1 border-b border-dotted border-neutral-300" />
                          {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-medium" style={{ color: OLIVE }}>{item.price}</span>}
                        </div>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </div>

          {content.ordering_links && content.ordering_links.length > 0 && (
            <div className="mt-14 flex flex-wrap justify-center gap-4">
              {content.ordering_links.map((o) => (
                <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>
                  {o.label}
                </a>
              ))}
            </div>
          )}
        </section>
      )}

      {/* gallery (optional) */}
      {gallery.length > 0 && (
        <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {gallery.slice(0, 6).map((g) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
          ))}
        </section>
      )}

      {/* 4b — VISIT / GET IN TOUCH (working contact form) */}
      <section id="visit" className="border-t border-neutral-200">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Visit us</p>
            <h2 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">Find us</h2>
            <div className="mt-8 space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>
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

      {/* 5 — CREAM FOOTER (rope-framed email sign-up) */}
      <footer style={{ background: CREAM, backgroundImage: "repeating-linear-gradient(45deg,rgba(0,0,0,0.012) 0 2px,transparent 2px 5px)" }} className="text-neutral-800">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr]">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Information</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
              {[
                { label: "Our menu", href: "#menu" },
                { label: "Contact us", href: "#visit" },
                { label: "Private dining", href: "#private" },
                ...(bookingOn ? [{ label: "Reservations", href: "#book" }] : []),
                { label: "Visit us", href: "#visit" },
              ].map((l) => <li key={l.label}><a href={l.href} className="hover:text-neutral-900">{l.label}</a></li>)}
            </ul>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-7 flex gap-4 text-neutral-800">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60">
                    <SocialIcon kind={`${s.label} ${s.url}`} />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Legal</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
              {["Privacy & cookies", "Privacy policy", "Terms & conditions", "Accessibility", "Modern slavery"].map((l) => <li key={l}><a href="#top" className="hover:text-neutral-900">{l}</a></li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Our brand</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
              {["Our story", "Impact & sustainability", "Press enquiries"].map((l) => <li key={l}><a href="#top" className="hover:text-neutral-900">{l}</a></li>)}
            </ul>
          </div>
          {/* rope-framed email sign up */}
          <div className="relative flex flex-col items-center justify-center rounded-[2rem] px-8 py-10 text-center" style={{ border: `2px solid ${GOLD}`, boxShadow: `inset 0 0 0 4px ${CREAM}, inset 0 0 0 5px ${GOLD}55` }}>
            <h4 style={serif} className="text-2xl">Get in touch</h4>
            <p className="mt-2 text-sm text-neutral-600">Reservations, private dining &amp; enquiries</p>
            <a href={bookingOn ? "#book" : "#visit"} className="mt-5 inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: NAVY }}>{bookingOn ? "Book a table" : "Contact us"}</a>
          </div>
        </div>
        <p className="px-8 pb-8 text-right text-xs text-neutral-500">© {name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
