import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PulpHeader } from "./PulpHeader";
import { PulpBooking } from "./PulpBooking";

// Pulp — a bright, cold-pressed JUICE & SMOOTHIE bar. MULTI-PAGE: the nav opens
// real routes (Menu / Order ahead / Gallery / About / Contact) under basePath,
// never scroll anchors. Each page is its own layout; the sticky citrus header
// and berry-ink footer are shared via shell(). Palette is baked from the brief:
// bright orange, watermelon pink, sunshine yellow over off-white cream with a
// berry-ink base and a lime pop used only as a tiny accent. The structural
// signature: a high-energy citrus hero with circular fruit-slice graphics and a
// sunny gradient, a "What's in your cup" ingredient-callout band, and a
// colourful juices/smoothies/bowls menu kept as clean divide-y rows with
// nutrition tags. Big pill buttons throughout. Display type is var(--font-fraunces),
// bold and zesty. The tenant swaps in their own photography, copy, menu, hours
// and address.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const ORANGE = "#F47A20";
const PINK = "#F0567A";
const YELLOW = "#FBC02D";
const LIME = "#9CCB3B"; // accent only
const CREAM = "#FFFBF2";
const INK = "#3A1F2B";

const SUNNY = `linear-gradient(120deg, ${ORANGE}, ${PINK})`;

// Rotating fruit-sticker tints for menu section pills + ingredient chips.
const TINTS = [ORANGE, PINK, YELLOW];

// Decorative juicy circle (fruit-slice). Purely visual, never load-bearing.
function FruitBlob({ color, className, style }: { color: string; className?: string; style?: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${className ?? ""}`}
      style={{ background: color, ...style }}
    />
  );
}

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

export default function PulpDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Order ahead", href: href("reservations") },
    groups.length > 0 && { label: "Menu", href: href("menu") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (berry ink, with sunny CTA panel + socials) ----
  const footer = (
    <footer style={{ background: INK }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: YELLOW }} className="text-3xl font-bold">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: PINK }}>Follow the squeeze</h4>
              <div className="mt-4 flex gap-4 text-white">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {([
              bookingOn && { label: "Order ahead", href: href("reservations") },
              groups.length > 0 && { label: "Menu", href: href("menu") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>Open hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-white/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a real button on a sunny gradient */}
        <div className="relative overflow-hidden rounded-[2rem] px-7 py-9" style={{ background: SUNNY, color: "#fff" }}>
          <FruitBlob color={YELLOW} className="-right-6 -top-8 h-28 w-28 opacity-40" />
          <h4 style={display} className="relative text-2xl font-bold leading-tight">Thirsty yet?</h4>
          <p className="relative mt-2 text-sm leading-relaxed text-white/90">Order your juices and smoothies ahead and skip the line, or book a cleanse to feel brand new.</p>
          <a href={book} className="relative mt-6 inline-flex rounded-full bg-white px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ color: INK }}>{bookingOn ? "Order ahead" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50 sm:px-8">© {name}. Cold-pressed with love.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body">
      <PulpHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Sunny page banner that clears the fixed header on sub-pages, with fruit blobs.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden text-white" style={{ background: SUNNY }}>
      <FruitBlob color={YELLOW} className="-left-10 top-6 h-40 w-40 opacity-30" />
      <FruitBlob color="#ffffff" className="-bottom-16 right-10 h-56 w-56 opacity-15" />
      <div className="relative mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <p className="text-xs font-extrabold uppercase tracking-[0.24em] text-white/80">{kicker}</p>
        <h1 style={display} className="mt-3 text-5xl font-bold leading-[0.95] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU (clean divide-y rows + nutrition tags) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Cold-pressed daily", "The menu")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
                {groups.map((section, si) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-5">
                        <span style={{ ...display, background: TINTS[si % TINTS.length], color: "#fff" }} className="inline-block rounded-full px-5 py-1.5 text-lg font-bold">{section.section}</span>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-6">
                        {catg.category && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: PINK }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${INK}1f` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-base font-bold text-[color:#3A1F2B]" style={display}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 rounded-full px-3.5 py-1 text-sm font-extrabold text-white" style={{ background: ORANGE }}>{item.price}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* nutrition tag legend — juice-bar flavour */}
              <div className="mt-14 flex flex-wrap items-center justify-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.14em]">
                {[
                  { t: "Cold-pressed", c: ORANGE },
                  { t: "No added sugar", c: PINK },
                  { t: "Vegan", c: LIME },
                  { t: "Immunity boost", c: YELLOW },
                ].map((tag) => (
                  <span key={tag.t} className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[color:#3A1F2B] shadow-sm">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: tag.c }} />
                    {tag.t}
                  </span>
                ))}
              </div>
              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-12 flex flex-wrap justify-center gap-4">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105" style={{ background: SUNNY }}>{o.label}{o.commission_free ? " · commission-free" : ""}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-neutral-500">Our menu is being squeezed. Check back soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / ORDER AHEAD ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Order ahead", "Skip the line")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Pick your cups, a pickup day and a time — we will have everything cold-pressed and waiting. Planning a multi-day cleanse? Tell us in the notes and we will sort it.</p>
            <PulpBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Find the bar")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-bold text-[color:#3A1F2B]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-neutral-700" style={{ borderColor: `${ORANGE}55` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105" style={{ background: SUNNY }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a big order or a catering enquiry? Squeeze us a message and we will get right back to you."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: PINK, heading: INK, button: ORANGE, buttonText: "#ffffff", fieldBorder: "#F7E0CC", radius: "1.5rem", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "Squeezed fresh, every day")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-3xl font-bold text-[color:#3A1F2B]">What we press</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
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
        {banner("A look around", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-neutral-500" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  // "What's in your cup" ingredient callouts.
  const ingredients = [
    { name: "Oranges", color: ORANGE, note: "Vitamin C" },
    { name: "Watermelon", color: PINK, note: "Hydration" },
    { name: "Pineapple", color: YELLOW, note: "Glow" },
    { name: "Spinach", color: LIME, note: "Iron" },
  ];
  return shell(
    <>
      {/* HERO: sunny gradient (or photo), big rounded type, fruit-slice graphics, inline order row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: SUNNY }} />
        )}
        {/* fruit-slice blobs float over the hero */}
        <FruitBlob color={YELLOW} className="-left-12 top-24 h-44 w-44 opacity-60 mix-blend-screen sm:h-64 sm:w-64" />
        <FruitBlob color={PINK} className="right-[-3rem] top-1/3 h-52 w-52 opacity-50 mix-blend-screen sm:h-72 sm:w-72" />
        <FruitBlob color={LIME} className="bottom-1/4 left-1/4 h-24 w-24 opacity-40 mix-blend-screen" />
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(58,31,43,0.25), rgba(58,31,43,0.05) 40%, rgba(58,31,43,0.5))" }} />
        <div className="relative z-10 mt-auto px-6 pb-10 pt-32 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-5xl">
            <span className="inline-flex rounded-full bg-white/90 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.18em]" style={{ color: INK }}>Cold-pressed juice & smoothie bar</span>
            {content.tagline && (
              <p data-edit="content.tagline" style={display} className="mt-4 max-w-3xl text-5xl font-bold leading-[0.92] text-white [text-shadow:0_2px_24px_rgba(58,31,43,0.5)] sm:text-7xl">{content.tagline}</p>
            )}
            <p className="mt-4 max-w-xl text-base text-white/90 [text-shadow:0_1px_12px_rgba(58,31,43,0.55)] sm:text-lg">Juices, smoothies and bowls, pressed fresh and bursting with sunshine.</p>
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <PulpBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex rounded-full bg-white px-10 py-4 text-sm font-extrabold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ color: INK }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* WHAT'S IN YOUR CUP: ingredient-callout band on cream with fruit chips */}
      <section style={{ background: CREAM }} className="relative overflow-hidden">
        <FruitBlob color={`${ORANGE}22`} className="-right-20 -top-20 h-72 w-72" />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-xs font-extrabold uppercase tracking-[0.28em]" style={{ color: PINK }}>What is in your cup</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-5xl font-bold leading-[0.95] text-[color:#3A1F2B] sm:text-6xl">Real fruit,<br />nothing to hide</h2>
            {content.about ? (
              <p data-edit="content.about" className="text-[17px] leading-[1.85] text-neutral-700">{content.about}</p>
            ) : (
              <p className="text-[17px] leading-[1.85] text-neutral-700">Every cup is pressed to order from whole fruit and veg — no concentrates, no added sugar, just bright, honest flavour.</p>
            )}
          </div>
          {/* ingredient chips */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {ingredients.map((ing) => (
              <div key={ing.name} className="flex items-center gap-3 rounded-full bg-white px-5 py-3 shadow-sm">
                <span className="h-9 w-9 shrink-0 rounded-full" style={{ background: ing.color }} />
                <span>
                  <span className="block text-sm font-bold text-[color:#3A1F2B]" style={display}>{ing.name}</span>
                  <span className="block text-[11px] font-bold uppercase tracking-[0.12em] text-neutral-400">{ing.note}</span>
                </span>
              </div>
            ))}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-full border-2 px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[color:#3A1F2B] transition hover:bg-[color:#3A1F2B] hover:text-white" style={{ borderColor: INK }}>Our story</a>
          )}
        </div>
      </section>

      {/* THE LINEUP: featured juices/smoothies as juicy circular cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: SUNNY }} className="text-white">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-white/80">Today&apos;s lineup</p>
                <h2 style={display} className="mt-3 text-4xl font-bold sm:text-5xl">Bottled sunshine</h2>
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/90 hover:opacity-70">See the full menu</a>}
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const tint = TINTS[i % TINTS.length];
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden rounded-[2rem] bg-white text-[color:#3A1F2B] shadow-lg transition hover:-translate-y-1">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: `${tint}26` }}>
                        <FruitBlob color={tint} className="left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-bold">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                      <span className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-extrabold uppercase tracking-[0.14em]" style={{ color: ORANGE }}>
                        {item.price ? <span data-edit={`item:${item.id}:price`}>{item.price}</span> : "See the menu"}
                        <span aria-hidden>→</span>
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-12 text-center">
                <a href={href("menu")} className="inline-flex rounded-full bg-white px-9 py-4 text-sm font-extrabold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ color: INK }}>View the whole menu</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* CLEANSE / CTA band: cream with a pink-outlined sunny panel */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border-4 bg-white px-8 py-12 text-center" style={{ borderColor: YELLOW }}>
            <FruitBlob color={`${PINK}1f`} className="-left-10 -top-10 h-40 w-40" />
            <FruitBlob color={`${ORANGE}1f`} className="-bottom-12 -right-8 h-48 w-48" />
            <h2 style={display} className="relative text-5xl font-bold leading-[0.95] text-[color:#3A1F2B] sm:text-6xl">Press reset</h2>
            <p className="relative mt-3 text-sm font-bold uppercase tracking-[0.18em] text-neutral-500">3-day cleanses · grab-and-go · catering</p>
            <a href={book} className="relative mt-7 inline-flex rounded-full px-9 py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105" style={{ background: SUNNY }}>{bookingOn ? "Order ahead / Book a cleanse" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* QUICK INFO band: hours + find us + order (berry ink) */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: YELLOW }}>Open hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: YELLOW }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-white/50 px-6 py-2.5 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-[color:#3A1F2B]">Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: YELLOW }}>Order</h3>
            <p className="mt-5 text-sm text-white/80">Get your cups cold-pressed and ready in minutes.</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105" style={{ background: SUNNY }}>{bookingOn ? "Order ahead" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
