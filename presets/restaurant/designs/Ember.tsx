import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { MobileNav } from "./MobileNav";

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

export default function EmberDesign({ site }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.reservation_url || content.cta_url || "#book";
  const name = tenant.business_name;

  const fieldCls = "w-full border-0 border-b border-neutral-300 bg-transparent pb-2 pt-1 text-[15px] text-neutral-800 outline-none";

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      {/* 1 — HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-black/45 to-transparent" />

        {/* top bar */}
        <div className="relative z-10 flex items-center justify-between px-5 py-6 text-white sm:items-start sm:px-8 sm:py-8">
          {/* desktop nav */}
          <nav className="hidden flex-col gap-2 text-sm font-medium uppercase tracking-[0.18em] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)] md:flex">
            <a href="#menu" className="hover:opacity-80">Restaurants</a>
            <a href="#menu" className="hover:opacity-80">Menus</a>
            <a href="#private" className="hover:opacity-80">Private dining</a>
          </nav>
          {/* mobile menu (functional) */}
          <MobileNav
            links={[
              { label: "Restaurants", href: "#menu" },
              { label: "Menus", href: "#menu" },
              { label: "Private dining", href: "#private" },
              { label: "Visit", href: "#visit" },
            ]}
            book={book}
          />
          {/* centred crest (absolute so it never collides with the sides) */}
          <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 text-center sm:top-8">
            <p data-edit="tenant.business_name" style={serif} className="whitespace-nowrap text-lg font-medium tracking-[0.15em] text-white [text-shadow:0_1px_14px_rgba(0,0,0,0.55)] sm:text-2xl">{name.toUpperCase()}</p>
            <p className="mt-1 text-[9px] tracking-[0.3em] text-white/80 sm:text-[10px]">EST 1994</p>
          </div>
          {/* desktop reservation button */}
          <a href={book} className="hidden border border-white/70 px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 md:inline-flex">Make a reservation</a>
          {/* mobile spacer to balance the menu icon */}
          <span className="w-6 md:hidden" />
        </div>

        {/* centred reservation button */}
        <div className="relative z-10 mt-auto flex justify-center px-6 pb-16 sm:pb-20">
          <a href={book} style={{ background: NAVY }} className="w-full max-w-sm px-8 py-4 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90 sm:w-auto sm:px-12 sm:text-sm">Make a reservation</a>
        </div>
      </section>

      {/* 2 — INTRO + BOOKING WIDGET */}
      <section className="mx-auto grid max-w-6xl gap-12 px-8 py-24 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
        <div>
          <h2 style={serif} className="text-3xl font-medium leading-tight sm:text-[2.5rem]">{content.tagline ?? `Welcome to ${name}`}</h2>
          {content.about && <p data-edit="content.about" className="mt-7 max-w-xl text-[17px] leading-[1.8] text-neutral-700">{content.about}</p>}
          {content.cuisine_type && (
            <>
              <h3 style={serif} className="mt-12 text-2xl font-medium">Visit us</h3>
              <p data-edit="content.cuisine_type" className="mt-4 max-w-xl text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
            </>
          )}
        </div>

        {/* booking widget */}
        <div className="h-fit border p-8" style={{ borderColor: GOLD }}>
          <div className="space-y-6">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-neutral-500">Restaurant</span>
              <select className={fieldCls} defaultValue={name}><option>{name}</option></select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-neutral-500">Number of guests</span>
              <select className={fieldCls} defaultValue="2 guests">{["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests"].map((g) => <option key={g}>{g}</option>)}</select>
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-neutral-500">Booking date</span>
              <input type="date" className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-neutral-500">Booking time</span>
              <select className={fieldCls} defaultValue="5:30 PM">{["12:00 PM", "1:00 PM", "5:30 PM", "7:00 PM", "8:30 PM"].map((t) => <option key={t}>{t}</option>)}</select>
            </label>
            <a href={book} className="mt-2 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: OLIVE }}>Book now</a>
          </div>
        </div>
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

      {/* 5 — CREAM FOOTER (rope-framed email sign-up) */}
      <footer style={{ background: CREAM, backgroundImage: "repeating-linear-gradient(45deg,rgba(0,0,0,0.012) 0 2px,transparent 2px 5px)" }} className="text-neutral-800">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_1.3fr]">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GOLD }}>Information</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
              {["News & events", "Contact us", "Private dining", "Careers", "FAQs"].map((l) => <li key={l}><a href="#top" className="hover:text-neutral-900">{l}</a></li>)}
            </ul>
            <div className="mt-7 flex gap-4 text-neutral-800">
              {/* facebook / instagram / linkedin */}
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>
            </div>
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
            <h4 style={serif} className="text-2xl">Email Sign Up</h4>
            <p className="mt-2 text-sm text-neutral-600">Keep up to date with News &amp; Events</p>
            <a href={book} className="mt-5 inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: NAVY }}>Sign up</a>
          </div>
        </div>
        <p className="px-8 pb-8 text-right text-xs text-neutral-500">© {name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
