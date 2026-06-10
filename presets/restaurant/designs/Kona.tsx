import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { KonaHeader } from "./KonaHeader";
import { KonaBooking } from "./KonaBooking";

// Kona — a fresh coastal Hawaiian POKE bowl bar (single venue), MULTI-PAGE: the
// nav opens real routes (Menu / Build a bowl / Reservations / Gallery / About /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the sticky ocean header and deep-navy footer are shared via shell(). The
// palette is baked from the brief — ocean teal, deep navy, coral, warm sand and
// a lime-yuzu accent over a dark ink. The tenant swaps in their own
// photography, copy, menu, hours and address. Display type is a friendly serif
// (Fraunces); the voice is laid-back and island-fresh.
//
// Structural signature (shared with NO sibling):
//  - a breezy ocean hero: a teal→navy water gradient with a layered wave/horizon
//    line and a relaxed surf-style headline, an inline "order ahead" row.
//  - a "build your bowl" base→protein→toppings step feature with little
//    ingredient chips inside rounded bowl-circles.
//  - a fresh poke/bowls menu as clean divide-y rows with spice/veg tags.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const TEAL = "#0E7C86";
const NAVY = "#123A52";
const CORAL = "#F2755C";
const SAND = "#F4E9D6";
const YUZU = "#C7D94A";
const INK = "#14242E";

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

// A spice/veg/fresh tag inferred from item name/description — gives the menu
// rows their little coastal chips without any extra data.
function itemTags(item: { name: string; description?: string | null }): { label: string; bg: string; fg: string }[] {
  const t = `${item.name} ${item.description ?? ""}`.toLowerCase();
  const tags: { label: string; bg: string; fg: string }[] = [];
  if (/spicy|sriracha|chili|chilli|jalape|wasabi|togarashi|hot /.test(t)) tags.push({ label: "Spicy", bg: CORAL, fg: "#fff" });
  if (/vegan|tofu|edamame|veggie|plant|avocado|cucumber/.test(t)) tags.push({ label: "Veg", bg: YUZU, fg: INK });
  if (/ahi|tuna|salmon|hamachi|fish|poke|shrimp|octopus|sashimi/.test(t)) tags.push({ label: "Fresh catch", bg: TEAL, fg: "#fff" });
  return tags.slice(0, 2);
}

// Reusable wave divider — the coastal section break that recurs through the
// design. `flip` points the crest the other way; `color` paints the wave fill.
function Wave({ color, className = "", flip = false }: { color: string; className?: string; flip?: boolean }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={`block w-full ${className}`}
      style={{ color, transform: flip ? "scaleX(-1)" : undefined }}
    >
      <path d="M0 30 C 150 60 300 60 450 36 C 600 12 750 0 900 18 C 1020 32 1110 44 1200 30 V60 H0 Z" fill="currentColor" />
    </svg>
  );
}

export default function KonaDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Order ahead", href: href("reservations") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // "Build your bowl" steps — the signature bowl-building feature. Pure copy, no
  // data dependency; ingredient chips sit inside rounded bowl-circles.
  const bowlSteps: { n: string; title: string; blurb: string; chips: string[]; tint: string }[] = [
    { n: "01", title: "Pick a base", blurb: "Start your bowl off right.", chips: ["Sushi rice", "Brown rice", "Greens", "Half + half"], tint: TEAL },
    { n: "02", title: "Choose your catch", blurb: "Fresh-cut, marinated daily.", chips: ["Ahi tuna", "Salmon", "Spicy tuna", "Tofu"], tint: CORAL },
    { n: "03", title: "Pile on toppings", blurb: "Go wild — it's your bowl.", chips: ["Avocado", "Edamame", "Mango", "Seaweed", "Crispy onion"], tint: NAVY },
    { n: "04", title: "Finish with sauce", blurb: "Drizzle, then dive in.", chips: ["Shoyu", "Spicy mayo", "Yuzu ponzu", "Sesame"], tint: YUZU },
  ];

  // ---- shared footer (deep navy, with a coral CTA panel + socials) ----
  const footer = (
    <footer style={{ background: NAVY }} className="text-white/85">
      <Wave color={NAVY} className="h-[40px] -mb-px" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: SAND }} className="text-3xl font-semibold">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: YUZU }}>Find us online</h4>
              <div className="mt-4 flex gap-4 text-white">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: YUZU }}>Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              bookingOn && { label: "Order ahead", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: YUZU }}>Open hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open daily by the water.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-white/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a real button on a coral card */}
        <div className="rounded-[2rem] px-7 py-9" style={{ background: CORAL, color: "#fff" }}>
          <h4 style={display} className="text-2xl font-semibold leading-tight">Hungry for the islands?</h4>
          <p className="mt-2 text-sm leading-relaxed text-white/90">Order ahead or book a table by the water. Fresh fish, big aloha.</p>
          <a href={book} className="mt-6 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: SAND, color: NAVY }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50 sm:px-8">© {name}. Made with aloha.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <KonaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Ocean banner that clears the fixed header on sub-pages: a teal→navy water
  // wash with the wave signature along the bottom.
  const banner = (kicker: string, title: string) => (
    <section className="relative isolate overflow-hidden" style={{ background: `linear-gradient(160deg, ${TEAL}, ${NAVY})` }}>
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-32 sm:px-8 sm:pb-24 sm:pt-40">
        <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: YUZU }}>{kicker}</p>
        <h1 style={display} className="mt-3 text-5xl font-semibold leading-[0.95] text-white sm:text-6xl">{title}</h1>
      </div>
      <Wave color={SAND} className="h-[44px] -mb-px" />
    </section>
  );

  // ---- MENU (clean divide-y rows with spice/veg tags) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The good stuff", "Bowls & bites")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: SAND }}>
          <div className="mx-auto max-w-5xl">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-5 flex items-center gap-3">
                        <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: CORAL }} />
                        <span style={{ ...display, color: NAVY }} className="text-2xl font-semibold">{section.section}</span>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-6">
                        {catg.category && <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${NAVY}1f` }}>
                          {catg.items.map((item) => {
                            const tags = itemTags(item);
                            return (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                                <div className="min-w-0">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ ...display, color: NAVY }}>{item.name}</p>
                                    {tags.map((tg) => (
                                      <span key={tg.label} className="rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.1em]" style={{ background: tg.bg, color: tg.fg }}>{tg.label}</span>
                                    ))}
                                  </div>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#14242E]/60">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: CORAL }}>{item.price}</span>
                                )}
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-16 flex flex-wrap justify-center gap-4">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CORAL }}>{o.label}{o.commission_free ? " · no fees" : ""}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-[color:#14242E]/60">Our menu is being prepped fresh. Check back soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Order ahead / Book a table", "Save your spot")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: SAND }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-[color:#14242E]/75">Grab a bowl to go or save a table by the water. Big group of 8 or more? Give us a ring and we&apos;ll sort the spread.</p>
            <KonaBooking tenantId={tenant.id} name={name} />
            {(content.phone || content.email) && (
              <p className="mt-8 text-center text-sm text-[color:#14242E]/60">
                Rather call?{" "}
                {content.phone && <a href={`tel:${content.phone}`} className="font-semibold" style={{ color: TEAL }}>{content.phone}</a>}
                {content.phone && content.email && " · "}
                {content.email && <a href={`mailto:${content.email}`} className="font-semibold" style={{ color: TEAL }}>{content.email}</a>}
              </p>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Come find us", "Say aloha")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: SAND }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#14242E]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-semibold" style={{ color: NAVY }}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#0E7C86]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#0E7C86]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-[color:#14242E]/75" style={{ borderColor: `${TEAL}33` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#14242E]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: TEAL }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a big celebration or a catering order? Send it over and we'll wave back soon."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: TEAL, heading: NAVY, button: CORAL, buttonText: "#ffffff", fieldBorder: "#e3d8c2", radius: "1.5rem", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "Fresh fish, big aloha")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: SAND }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-[color:#14242E]/80">{content.about}</p> : <p className="text-[color:#14242E]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={{ ...display, color: NAVY }} className="mt-12 text-3xl font-semibold">What we serve</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-[color:#14242E]/80">{content.cuisine_type}</p>
              </>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("A look around", "By the water")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3" style={{ background: SAND }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-[1.25rem] object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#14242E]/60" style={{ background: SAND }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* HERO: ocean gradient or full-bleed photo, relaxed surf headline, inline order row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(165deg, ${TEAL} 0%, ${NAVY} 70%, ${INK} 100%)` }} />
        )}
        {/* ocean wash so text reads over any photo */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(18,58,82,0.25), rgba(18,58,82,0.12) 40%, rgba(20,36,46,0.62))" }} />
        {/* faint horizon line — the sea meets the sky */}
        <div className="pointer-events-none absolute left-0 right-0 top-[42%] h-px bg-white/15" />

        <div className="relative z-10 mt-auto px-6 pb-0 pt-32 sm:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: YUZU }}>Coastal poke bar · catch of the day</p>
            {content.tagline ? (
              <p data-edit="content.tagline" style={display} className="mt-3 max-w-3xl text-4xl font-semibold leading-[0.98] text-white [text-shadow:0_2px_24px_rgba(18,58,82,0.55)] sm:text-6xl">{content.tagline}</p>
            ) : (
              <h1 data-edit="tenant.business_name" style={display} className="mt-3 max-w-3xl text-5xl font-semibold leading-[0.98] text-white [text-shadow:0_2px_24px_rgba(18,58,82,0.55)] sm:text-7xl">{name}</h1>
            )}
            <p className="mt-4 max-w-xl text-base text-white/90 [text-shadow:0_1px_12px_rgba(18,58,82,0.6)] sm:text-lg">Fresh-cut fish, sunny bowls, good vibes by the water. Build your own or grab a house favourite.</p>
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <KonaBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CORAL }}>Get in touch</a>
            )}
          </div>
          {/* wave breaking onto the next section */}
          <Wave color={SAND} className="mt-12 h-[52px] -mb-px sm:h-[64px]" />
        </div>
      </section>

      {/* BUILD YOUR BOWL: the signature step feature with ingredient chips in bowl-circles */}
      <section style={{ background: SAND }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: TEAL }}>Build your bowl</p>
            <h2 style={{ ...display, color: NAVY }} className="mt-3 text-4xl font-semibold leading-[0.95] sm:text-5xl">Four steps to your<br />perfect bowl</h2>
            <p className="mt-4 text-[17px] leading-[1.8] text-[color:#14242E]/75">Base, catch, toppings, sauce. Make it yours in the shop or order ahead — we&apos;ll have it ready.</p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bowlSteps.map((step) => (
              <div key={step.n} className="flex flex-col rounded-[2rem] border-2 bg-white p-6" style={{ borderColor: `${step.tint}33` }}>
                {/* bowl-circle motif with the step number */}
                <div className="grid h-14 w-14 place-items-center rounded-full text-lg font-bold text-white" style={{ ...display, background: step.tint }}>{step.n}</div>
                <h3 style={{ ...display, color: NAVY }} className="mt-5 text-xl font-semibold">{step.title}</h3>
                <p className="mt-1 text-sm text-[color:#14242E]/60">{step.blurb}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {step.chips.map((c) => (
                    <span key={c} className="rounded-full border px-3 py-1 text-[11px] font-semibold" style={{ borderColor: `${step.tint}55`, color: NAVY }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {groups.length > 0 && (
            <div className="mt-10">
              <a href={href("menu")} className="inline-flex rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: NAVY }}>See the full menu</a>
            </div>
          )}
        </div>
        <Wave color={TEAL} className="h-[44px] -mb-px" />
      </section>

      {/* ABOUT band: teal water with a sand intro */}
      <section style={{ background: TEAL }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: YUZU }}>Aloha from us</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-5xl font-semibold leading-[0.95] sm:text-6xl">Fresh fish,<br />big aloha</h2>
            {content.about && <p data-edit="content.about" className="text-[17px] leading-[1.85] text-white/90">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-full border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-white hover:text-[color:#0E7C86]" style={{ borderColor: "rgba(255,255,255,0.7)" }}>Our story</a>
          )}
        </div>
        <Wave color={SAND} className="h-[44px] -mb-px" flip />
      </section>

      {/* CATCH OF THE DAY: featured menu items + gallery photos as rounded bowl cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: SAND }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: TEAL }}>Catch of the day</p>
                <h2 style={{ ...display, color: NAVY }} className="mt-3 text-4xl font-semibold sm:text-5xl">House favourites</h2>
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: CORAL }}>View all →</a>}
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="aspect-[4/3] w-full" style={{ background: `linear-gradient(150deg, ${TEAL}, ${NAVY})` }} />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 data-edit={`item:${item.id}:name`} style={{ ...display, color: NAVY }} className="text-xl font-semibold">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[color:#14242E]/70">{item.description}</p>}
                      <div className="mt-5 flex items-center justify-between">
                        {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-bold" style={{ color: CORAL }}>{item.price}</span>}
                        <span className="text-xs font-bold uppercase tracking-[0.14em] transition group-hover:opacity-70" style={{ color: TEAL }}>Order →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <Wave color={NAVY} className="h-[44px] -mb-px" />
        </section>
      )}

      {/* CLOSING CTA + quick info band: deep navy ocean floor */}
      <section style={{ background: NAVY }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="rounded-[2.5rem] px-8 py-12 text-center" style={{ background: `linear-gradient(150deg, ${TEAL}, ${INK})` }}>
            <h2 style={display} className="text-5xl font-semibold leading-[0.95] sm:text-6xl">Catch you by the water</h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em]" style={{ color: YUZU }}>Order ahead · dine in · grab and go</p>
            <a href={book} className="mt-7 inline-flex rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CORAL }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: YUZU }}>Open hours</h3>
              {content.hours && content.hours.length > 0 ? (
                <ul className="mt-5 space-y-2 text-sm text-white/80">
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                  ))}
                </ul>
              ) : <p className="mt-5 text-sm text-white/70">Open daily by the water.</p>}
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: YUZU }}>Find us</h3>
              {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
              <div className="mt-3 space-y-1.5 text-sm text-white/80">
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
              </div>
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-white/50 px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[color:#123A52]">Get directions</a>
              )}
            </div>
            <div>
              <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: YUZU }}>Order ahead</h3>
              <p className="mt-5 text-sm text-white/80">Build your bowl online and skip the line. Ready when you are.</p>
              <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: YUZU, color: INK }}>{bookingOn ? "Order ahead" : "Contact us"}</a>
            </div>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
