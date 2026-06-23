import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DaybreakHeader } from "./DaybreakHeader";
import { DaybreakBooking } from "./DaybreakBooking";

// Daybreak — bright, energetic all-day dining design (single venue, Bill's feel),
// MULTI-PAGE: the nav opens real routes (Menu / About / Gallery / Reservations /
// Visit) under basePath, never scroll anchors. Each page is its own layout; the
// sticky cheerful header and ink footer are shared via shell(). Palette is baked
// (cream / tomato / leafy green / ink); the tenant swaps in their own
// photography, copy, menu, hours, socials and contact details.
//
// Distinct from Ember:
//  - menu = cheerful sectioned CARD groups (rounded white cards per section),
//    not Ember's dotted-leader two-column list.
//  - reservations = friendly rounded-card form (DaybreakBooking), not the sharp
//    gold widget.
//  - contact = bright two-column split with a big map / "Get directions" panel
//    on one side and the contact form on the other.

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

export default function DaybreakDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // ---- shared footer ----
  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <a href={href("home")} data-edit="tenant.business_name" style={serif} className="text-2xl font-semibold">{name}</a>
          <a href={book} className="mt-5 inline-flex rounded-full px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: TOMATO }}>
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
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Book a table", href: href("reservations") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
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
  );

  // ---- shared shell: header + page body + footer ----
  const shell = (children: ReactNode, solid = true) => (
    <div style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-[#20201d]" data-page={page}>
      <DaybreakHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: CREAM }} className="border-b border-black/[0.06]">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 sm:px-8 sm:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: TOMATO }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-semibold text-[#20201d] sm:text-5xl">{title}</h1>
        {blurb && <p className="mt-4 max-w-xl text-[16px] leading-relaxed text-neutral-600">{blurb}</p>}
      </div>
    </section>
  );

  // -------------------------------------------------------------------------
  // MENU — cheerful sectioned card groups (breakfast / lunch / dinner etc.)
  // -------------------------------------------------------------------------
  if (page === "menu") {
    return shell(
      <>
        {banner("All day, every day", "Our menu", "From first-light breakfasts to long, lazy dinners. Here's everything we're plating up.")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
            {groups.length > 0 ? (
              <>
                <div className="grid items-start gap-8 md:grid-cols-2">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid rounded-[1.5rem] bg-white p-8 shadow-[0_14px_44px_-26px_rgba(0,0,0,0.32)]">
                      {section.section && (
                        <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: GREEN }} className="text-2xl font-semibold">{section.section}</h2>
                      )}
                      <div className="mt-1 h-1 w-12 rounded-full" style={{ background: TOMATO }} />
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mt-6 first:mt-5">
                          {catg.category && <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</h3>}
                          <ul className="space-y-4">
                            {catg.items.map((item) => (
                              <li key={item.id}>
                                <div className="flex items-baseline justify-between gap-3">
                                  <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg font-medium text-[#20201d]">{item.name}</span>
                                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: TOMATO }}>{item.price}</span>}
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

                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-14 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
                        {o.label}{o.commission_free ? " · commission-free" : ""}
                      </a>
                    ))}
                  </div>
                )}

                {bookingOn && (
                  <div className="mt-14 text-center">
                    <a href={href("reservations")} className="inline-flex rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:opacity-90" style={{ background: TOMATO }}>
                      Book a table
                    </a>
                  </div>
                )}
              </>
            ) : (
              <p className="text-neutral-500">Our menu is on its way.</p>
            )}
          </div>
        </section>
      </>,
    );
  }

  // -------------------------------------------------------------------------
  // RESERVATIONS — friendly rounded-card form on its own page
  // -------------------------------------------------------------------------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Grab yourself a table", "Breakfast, a long lunch or dinner with the gang. Tell us when and we'll save you a spot.")}
        <section style={{ background: GREEN }} className="text-white">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">How it works</p>
              <h2 style={serif} className="mt-3 text-3xl font-semibold sm:text-4xl">A warm welcome awaits</h2>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-white/85">
                Pop your details in the form and we&apos;ll confirm by phone or email. For larger groups, give us a call and we&apos;ll sort it out together.
              </p>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="mt-6 inline-flex rounded-full border-2 border-white/70 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-[#3f6b3a]">
                  Call {content.phone}
                </a>
              )}
            </div>
            <DaybreakBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // -------------------------------------------------------------------------
  // CONTACT / VISIT — bright two-column split: map/directions + contact form
  // -------------------------------------------------------------------------
  if (page === "contact") {
    return shell(
      <>
        {banner("Come and see us", "Visit us", "We're easy to find and always happy to see you. Here's how to get here and how to reach us.")}
        <section className="bg-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:gap-16">
            {/* left — map / directions */}
            <div className="flex flex-col">
              <div className="overflow-hidden rounded-[1.5rem]" style={{ background: CREAM, border: `1px solid rgba(0,0,0,0.06)` }}>
                <div className="flex aspect-[4/3] flex-col items-center justify-center px-8 text-center">
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="1.6" aria-hidden>
                    <path d="M12 21s-7-6.3-7-11a7 7 0 0 1 14 0c0 4.7-7 11-7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {content.address ? (
                    <p data-edit="content.address" className="mt-4 whitespace-pre-line text-[16px] leading-relaxed text-neutral-700">{content.address}</p>
                  ) : (
                    <p className="mt-4 text-[16px] text-neutral-500">Find us in the heart of town.</p>
                  )}
                  {content.map_url && (
                    <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex rounded-full px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-md transition hover:opacity-90" style={{ background: GREEN }}>
                      Get directions
                    </a>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-2 text-[16px] leading-relaxed text-neutral-700">
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium transition hover:opacity-70" style={{ color: TOMATO }}>{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-medium transition hover:opacity-70" style={{ color: TOMATO }}>{content.email}</a>}
              </div>

              {content.hours && content.hours.length > 0 && (
                <div className="mt-8">
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

            {/* right — contact form (or fallback) */}
            <div>
              {contactOn ? (
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Say hello"
                  theme={{ heading: "#20201d", button: "#d2402e", buttonText: "#ffffff", fieldBorder: "#e7ddca", radius: "1.25rem" }}
                />
              ) : (
                <div className="rounded-[1.5rem] p-8" style={{ background: CREAM }}>
                  <h2 style={serif} className="text-2xl font-semibold">Say hello</h2>
                  <p className="mt-3 text-[16px] leading-relaxed text-neutral-600">Give us a call or drop us an email and we&apos;ll get right back to you.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </>,
    );
  }

  // -------------------------------------------------------------------------
  // ABOUT
  // -------------------------------------------------------------------------
  if (page === "about") {
    return shell(
      <>
        {banner("Hello there", "Our story")}
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
            {content.about ? (
              <p data-edit="content.about" style={serif} className="text-2xl font-normal leading-[1.5] text-neutral-800 sm:text-[2rem]">{content.about}</p>
            ) : (
              <p className="text-neutral-500">Our story is coming soon.</p>
            )}
            {content.cuisine_type && (
              <p data-edit="content.cuisine_type" className="mx-auto mt-7 max-w-xl text-[16px] leading-relaxed text-neutral-600">{content.cuisine_type}</p>
            )}
            {groups.length > 0 && (
              <a href={href("menu")} className="mt-10 inline-flex rounded-full px-9 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white shadow-lg transition hover:opacity-90" style={{ background: TOMATO }}>
                See the menu
              </a>
            )}
          </div>
        </section>
      </>,
    );
  }

  // -------------------------------------------------------------------------
  // GALLERY
  // -------------------------------------------------------------------------
  if (page === "gallery") {
    return shell(
      <>
        {banner("A look inside", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover transition duration-500 hover:opacity-90" />
            ))}
          </section>
        ) : (
          <p className="mx-auto max-w-6xl px-6 py-16 text-neutral-500 sm:px-8">Photos coming soon.</p>
        )}
      </>,
    );
  }

  // -------------------------------------------------------------------------
  // HOME — hero + short teasers only (What's On, intro, menu highlights, CTA)
  // -------------------------------------------------------------------------
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  const HIGHLIGHTS = [
    { badge: "Seasonal menu", title: "Fresh on the plate", body: "New dishes landing this season, made with the good stuff and best enjoyed with friends.", href: href("menu"), cta: "See the menu", color: TOMATO },
    { badge: "What's on", title: "Events & get-togethers", body: "Bottomless brunches, supper clubs and the odd late one. There's always something happening.", href: href("contact"), cta: "Plan a visit", color: GREEN },
    { badge: "Offers", title: "Midweek treats", body: "Little perks through the week, from early-bird breakfasts to happy-hour favourites.", href: book, cta: "Book a table", color: INK },
  ];

  return shell(
    <>
      {/* BRIGHT HERO */}
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
              <a href={href("menu")} className="rounded-full border-2 border-white/80 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#20201d]">
                See the menu
              </a>
            )}
          </div>
        </div>
      </section>

      {/* WHAT'S ON HIGHLIGHTS (teasers linking to real pages) */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: TOMATO }}>What&apos;s on</p>
            <h2 style={serif} className="mt-3 text-4xl font-semibold text-[#20201d] sm:text-5xl">Always something good</h2>
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

      {/* INTRO / ABOUT teaser */}
      {content.about && (
        <section className="bg-white">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GREEN }}>Hello there</p>
            <p data-edit="content.about" style={serif} className="mt-6 text-2xl font-normal leading-[1.45] text-neutral-800 sm:text-[2rem]">
              {content.about}
            </p>
            <a href={href("about")} className="mt-8 inline-flex items-center gap-1.5 text-sm font-semibold transition hover:gap-2.5" style={{ color: GREEN }}>
              Read our story <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      )}

      {/* MENU HIGHLIGHTS → links to full menu page */}
      {featured.length > 0 && (
        <section style={{ background: CREAM }} className="border-y border-black/[0.06]">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: TOMATO }}>A taste of it</p>
                <h2 style={serif} className="mt-3 text-4xl font-semibold sm:text-5xl">Menu favourites</h2>
              </div>
              <a href={href("menu")} className="text-sm font-semibold transition hover:opacity-70" style={{ color: GREEN }}>View full menu →</a>
            </div>
            <div className="mt-10 grid items-start gap-x-10 gap-y-5 md:grid-cols-2">
              {featured.map((item) => (
                <div key={item.id} className="rounded-2xl bg-white p-5 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.3)]">
                  <div className="flex items-baseline justify-between gap-3">
                    <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg font-medium">{item.name}</span>
                    {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: TOMATO }}>{item.price}</span>}
                  </div>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* QUICK INFO + CTA band */}
      <section style={{ background: GREEN }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Opening hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-1.5 text-sm text-white/85">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/60">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-white/70">Open all day, every day.</p>}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/85">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-white/85">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            <a href={href("contact")} className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition hover:gap-2.5">Visit us <span aria-hidden>→</span></a>
          </div>
          <div className="flex flex-col items-start">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{bookingOn ? "Reserve" : "Get in touch"}</h3>
            <p className="mt-4 text-sm text-white/85">{bookingOn ? "Save yourself a table in a couple of taps." : "We'd love to hear from you."}</p>
            <a href={book} className="mt-6 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: TOMATO }}>
              {bookingOn ? "Book a table" : "Contact us"}
            </a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
