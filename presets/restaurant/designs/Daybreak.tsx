import type { PresetProps } from "@/lib/site-pages";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DaybreakHeader } from "./DaybreakHeader";
import { DaybreakBooking } from "./DaybreakBooking";

// Daybreak — bright, energetic all-day dining design (inspired by Bill's,
// adapted to a single venue):
//  1. Sticky header — cheerful wordmark, nav, "Book a table"; transparent over
//     the hero, solid cream on scroll; functional hamburger on mobile.
//  2. Bright photo hero with venue name + warm tagline + reservation CTA.
//  3. "What's On" highlights row — three cards (seasonal menu / events / offers).
//  4. Friendly intro / about.
//  5. All-day menu sections from groupCatalog (breakfast/lunch/dinner).
//  6. Ordering links rendered as buttons (when present).
//  7. Gallery grid (when non-empty).
//  8. Visit / Find us — address, tel/mailto, directions, working contact form.
//  9. Cheerful footer — hours, socials, real in-page anchor links.
// Palette baked warm and friendly; the client swaps in their own photography,
// copy, menu, hours, socials and contact details.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CREAM = "#fbf6ee";
const TOMATO = "#d2402e";
const GREEN = "#3f6b3a";
const INK = "#20201d";

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

// Placeholder "What's On" highlights — friendly copy a tenant can re-theme.
const HIGHLIGHTS = [
  {
    badge: "Seasonal menu",
    title: "Fresh on the plate",
    body: "New dishes landing this season, made with the good stuff and best enjoyed with friends.",
    href: "#menu",
    cta: "See the menu",
    color: TOMATO,
  },
  {
    badge: "What's on",
    title: "Events & get-togethers",
    body: "Bottomless brunches, supper clubs and the odd late one. There's always something happening.",
    href: "#visit",
    cta: "Plan a visit",
    color: GREEN,
  },
  {
    badge: "Offers",
    title: "Midweek treats",
    body: "Little perks through the week, from early-bird breakfasts to happy-hour favourites.",
    href: "#book",
    cta: "Book a table",
    color: INK,
  },
];

export default function DaybreakDesign({ site }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.reservation_url || content.cta_url || "#book";
  const name = tenant.business_name;

  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const navLinks = [
    { label: "What's on", href: "#whats-on" },
    { label: "Menu", href: "#menu" },
    ...(bookingOn ? [{ label: "Book", href: "#book" }] : []),
    { label: "Visit", href: "#visit" },
  ];

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-[#20201d]">
      <style>{`html{scroll-behavior:smooth}section[id],div[id="book"]{scroll-margin-top:5rem}`}</style>

      {/* Sticky header (transparent over hero, solid cream on scroll) */}
      <DaybreakHeader name={name} book={book} links={navLinks} />

      {/* 2 — BRIGHT HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col justify-end overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${TOMATO} 0%, ${GREEN} 100%)` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/20" />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 pb-16 sm:px-8 sm:pb-24">
          <h1 data-edit="tenant.business_name" style={serif} className="max-w-3xl text-5xl font-semibold leading-[1.05] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">
            {name}
          </h1>
          <p data-edit="content.tagline" className="mt-5 max-w-xl text-lg leading-relaxed text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.45)] sm:text-xl">
            {content.tagline ?? "Breakfast, lunch and dinner, all day every day. Bright food and a warm welcome."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={book} className="rounded-full px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-xl transition hover:opacity-90" style={{ background: TOMATO }}>
              Book a table
            </a>
            {groups.length > 0 && (
              <a href="#menu" className="rounded-full border-2 border-white/80 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#20201d]">
                See the menu
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 3 — WHAT'S ON HIGHLIGHTS */}
      <section id="whats-on" style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: TOMATO }}>What&apos;s on</p>
            <h2 style={serif} className="mt-3 text-4xl font-semibold sm:text-5xl">Always something good</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {HIGHLIGHTS.map((h) => (
              <div key={h.title} className="flex flex-col rounded-[1.5rem] border border-black/[0.06] bg-white p-8 shadow-[0_12px_40px_-22px_rgba(0,0,0,0.3)] transition hover:-translate-y-1">
                <span className="self-start rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white" style={{ background: h.color }}>{h.badge}</span>
                <h3 style={serif} className="mt-5 text-2xl font-semibold">{h.title}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-neutral-600">{h.body}</p>
                <a href={h.href} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5" style={{ color: h.color }}>
                  {h.cta} <span aria-hidden>→</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 — INTRO / ABOUT */}
      {content.about && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GREEN }}>Hello there</p>
            <p data-edit="content.about" style={serif} className="mt-6 text-2xl font-normal leading-[1.45] text-neutral-800 sm:text-[2rem]">
              {content.about}
            </p>
            {content.cuisine_type && (
              <p data-edit="content.cuisine_type" className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-neutral-600">{content.cuisine_type}</p>
            )}
          </div>
        </section>
      )}

      {/* 5 — ALL-DAY MENU */}
      {groups.length > 0 && (
        <section id="menu" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: TOMATO }}>All day, every day</p>
              <h2 style={serif} className="mt-3 text-4xl font-semibold sm:text-5xl">Our menu</h2>
            </div>
            <div className="mt-14 grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
              {groups.map((section) => (
                <div key={section.section} className="break-inside-avoid rounded-[1.5rem] bg-white p-8 shadow-[0_10px_36px_-22px_rgba(0,0,0,0.28)]">
                  {section.section && <h3 style={{ ...serif, borderColor: TOMATO }} className="mb-5 border-b-2 pb-3 text-xl font-semibold">{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-5 first:mt-0">
                      {catg.category && <h4 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</h4>}
                      <ul className="space-y-4">
                        {catg.items.map((item) => (
                          <li key={item.id}>
                            <div className="flex items-baseline justify-between gap-3">
                              <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg font-medium">{item.name}</span>
                              <span className="mx-2 flex-1 border-b border-dotted border-neutral-300" />
                              {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-semibold" style={{ color: TOMATO }}>{item.price}</span>}
                            </div>
                            {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* 6 — ORDERING LINKS */}
            {content.ordering_links && content.ordering_links.length > 0 && (
              <div className="mt-14 flex flex-wrap justify-center gap-4">
                {content.ordering_links.map((o) => (
                  <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
                    {o.label}{o.commission_free ? " · commission-free" : ""}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7 — GALLERY */}
      {gallery.length > 0 && (
        <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
          {gallery.slice(0, 6).map((g) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover transition duration-500 hover:opacity-90" />
          ))}
        </section>
      )}

      {/* BOOK A TABLE (functional widget — posts to /api/site-forms) */}
      {bookingOn && (
        <section style={{ background: GREEN }} className="text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">Reservations</p>
              <h2 style={serif} className="mt-3 text-4xl font-semibold sm:text-5xl">Grab yourself a table</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
                Whether it&apos;s an early breakfast, a long lunch or dinner with the gang, we&apos;d love to have you. Tell us when and we&apos;ll save you a spot.
              </p>
            </div>
            <DaybreakBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      )}

      {/* 8 — VISIT / FIND US (working contact form) */}
      <section id="visit" className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 sm:py-24 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GREEN }}>Come and see us</p>
            <h2 style={serif} className="mt-3 text-4xl font-semibold sm:text-5xl">Visit us</h2>
            <div className="mt-8 space-y-4 text-[16px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium transition hover:opacity-70" style={{ color: TOMATO }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-medium transition hover:opacity-70" style={{ color: TOMATO }}>{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
                Get directions
              </a>
            )}

            {content.hours && content.hours.length > 0 && (
              <div className="mt-10">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">Opening hours</p>
                <ul className="mt-3 max-w-sm space-y-1.5 text-sm text-neutral-700">
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6 border-b border-dashed border-neutral-200 py-1.5">
                      <span data-edit={`hours:${i}:day`}>{h.day}</span>
                      <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {contactOn && (
            <div>
              <SiteContactForms tenantId={tenant.id} booking={false} contact />
            </div>
          )}
        </div>
      </section>

      {/* 9 — CHEERFUL FOOTER */}
      <footer style={{ background: INK }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <p data-edit="tenant.business_name" style={serif} className="text-2xl font-semibold">{name}</p>
            <a href={bookingOn ? "#book" : "#visit"} className="mt-5 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: TOMATO }}>
              {bookingOn ? "Book a table" : "Get in touch"}
            </a>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-6 flex gap-4 text-white/90">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60">
                    <SocialIcon kind={`${s.label} ${s.url}`} />
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Explore</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              {[
                { label: "What's on", href: "#whats-on" },
                ...(groups.length > 0 ? [{ label: "Menu", href: "#menu" }] : []),
                ...(bookingOn ? [{ label: "Book a table", href: "#book" }] : []),
                { label: "Visit us", href: "#visit" },
              ].map((l) => <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>)}
            </ul>
          </div>

          {(content.phone || content.email || content.address) && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Find us</p>
              <div className="mt-4 space-y-2 text-sm text-white/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
              </div>
            </div>
          )}

          {content.hours && content.hours.length > 0 && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40">Hours</p>
              <ul className="mt-4 space-y-1.5 text-sm text-white/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <p className="px-6 pb-8 text-center text-xs text-white/40 sm:px-8 sm:text-right">© {name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
