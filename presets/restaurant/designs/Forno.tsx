import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { FornoHeader } from "./FornoHeader";
import { FornoBooking } from "./FornoBooking";

// Forno — a wood-fired Neapolitan PIZZERIA identity (single venue), MULTI-PAGE:
// the nav opens real routes (Menu / Reservations / Gallery / About / Contact)
// under basePath, never scroll anchors. Each page is its own layout; the sticky
// charcoal header and dark footer are shared. The palette is baked from the
// brief — tomato red, charcoal, warm cream, basil green, mozzarella off-white —
// for a charred, rustic, hand-thrown feel. Display type is a heavy, tight,
// uppercase Fraunces. The tenant swaps in their own photography, copy, menu,
// hours and address.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const TOMATO = "#C1432E";
const CHARCOAL = "#1C1A17";
const CREAM = "#F6EDE0";
const BASIL = "#4F7A4B";
const MOZZ = "#FBF7EF";

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

// Charred speckle texture used behind dark bands for the "wood-fired" feel.
const CHAR_TEXTURE =
  "radial-gradient(circle at 20% 30%, rgba(193,67,46,0.10), transparent 42%), radial-gradient(circle at 82% 12%, rgba(255,255,255,0.04), transparent 38%), radial-gradient(circle at 70% 80%, rgba(79,122,75,0.10), transparent 45%)";

export default function FornoDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Reservations", href: href("reservations") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (charcoal, charred texture, tomato wordmark) ----
  const footer = (
    <footer style={{ background: CHARCOAL, backgroundImage: CHAR_TEXTURE }} className="text-white/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: TOMATO }} className="text-3xl font-black uppercase tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: BASIL }} {...editCopy(content, "footer_badge", "Fired fresh daily")} />
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4 text-white">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#C1432E]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: TOMATO }} {...editCopy(content, "footer_explore_heading", "Explore")} />
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              bookingOn && { label: "Reservations", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "About us", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: TOMATO }} {...editCopy(content, "footer_hours_heading", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/65">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-white/65">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a real button on tomato */}
        <div className="rounded-xl px-7 py-9" style={{ background: TOMATO, color: MOZZ }}>
          <h4 style={display} className="text-3xl font-black uppercase leading-[0.95]" {...editCopy(content, "footer_cta_heading", "Hungry?")} />
          <p className="mt-2 text-sm leading-relaxed text-white/90" {...editCopy(content, "footer_cta_blurb", "Pull up a chair by the oven. Tables fill fast on weekends — reserve ahead.")} />
          <a href={book} className="mt-6 inline-flex rounded-md px-7 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: CHARCOAL }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/45 sm:px-8">© {name}. Wood-fired with love.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <FornoHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Charcoal page banner that clears the fixed header on sub-pages.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: CHARCOAL, backgroundImage: CHAR_TEXTURE }} className="text-white">
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-28 sm:px-8 sm:pb-16 sm:pt-36">
        <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: TOMATO }} {...editCopy(content, kickerKey, kicker)} />
        <h1 style={display} className="mt-3 text-5xl font-black uppercase leading-[0.9] sm:text-7xl" {...editCopy(content, titleKey, title)} />
        <div className="mt-5 h-1 w-20 rounded-full" style={{ background: BASIL }} />
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("From the oven", "menu_banner_kicker", "The menu", "menu_banner_title")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: MOZZ }}>
          <div className="mx-auto max-w-5xl">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-5 flex items-center gap-3">
                        <span className="h-2.5 w-2.5 rotate-45" style={{ background: TOMATO }} />
                        <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={display} className="text-2xl font-black uppercase tracking-tight text-[color:#1C1A17]">{section.section}</h2>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-6">
                        {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BASIL }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${CHARCOAL}1a` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-base font-bold uppercase tracking-tight text-[color:#1C1A17]" style={display}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#1C1A17]/55">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-black text-[color:#C1432E]">{item.price}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-16 flex flex-wrap justify-center gap-4">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-md px-7 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: TOMATO }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-[color:#1C1A17]/60">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book a table", "reservations_banner_kicker", "Reservations", "reservations_banner_title")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: MOZZ }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-[color:#1C1A17]/75" {...editCopy(content, "reservations_blurb", "Grab a spot by the fire. Pick a day and a time and we'll save you a table. For parties of 8 or more, give us a call and we'll sort it.")} />
            <FornoBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Come find us", "contact_banner_kicker", "Contact", "contact_banner_title")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: MOZZ }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#1C1A17]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-bold text-[color:#1C1A17]" style={display}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#C1432E]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#C1432E]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-[color:#1C1A17]/75" style={{ borderColor: `${CHARCOAL}1a` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#1C1A17]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-md px-7 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: CHARCOAL }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a big celebration or a bit of feedback? Tell us here and we'll fire back a reply."
                  contactCta="Send it over"
                  theme={{ card: MOZZ, cardBorder: TOMATO, heading: CHARCOAL, button: TOMATO, buttonText: "#ffffff", fieldBorder: "#e3d4bf", radius: "0.5rem", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "about_banner_kicker", "Born of fire", "about_banner_title")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: MOZZ }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-[color:#1C1A17]/80">{content.about}</p> : <p className="text-[color:#1C1A17]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-3xl font-black uppercase tracking-tight text-[color:#1C1A17]" {...editCopy(content, "about_cook_heading", "What we cook")} />
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-[color:#1C1A17]/75">{content.cuisine_type}</p>
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
        {banner("A look around", "gallery_banner_kicker", "Gallery", "gallery_banner_title")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3" style={{ background: MOZZ }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-md object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#1C1A17]/60" style={{ background: MOZZ }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  const steps = [
    { n: "01", t: "Slow-fermented dough", d: "Rested 48 hours, hand-stretched to a pillowy, blistered Neapolitan crust." },
    { n: "02", t: "San Marzano & fior di latte", d: "Crushed tomatoes, fresh mozzarella and basil — simple, honest, the good stuff." },
    { n: "03", t: "90 seconds at 900°F", d: "Straight into the wood-fired oven for a leopard-spotted, char-kissed finish." },
  ];

  return shell(
    <>
      {/* hero: split — charred copy panel left, full-bleed photo right */}
      <section className="relative grid min-h-[100svh] lg:grid-cols-[1.05fr_1fr]">
        <div className="relative z-10 flex flex-col justify-center px-6 pt-32 pb-14 sm:px-10 lg:pb-20" style={{ background: CHARCOAL, backgroundImage: CHAR_TEXTURE }}>
          <div className="mx-auto w-full max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: BASIL }} {...editCopy(content, "hero_eyebrow", "Wood-fired · Napoli style")} />
            {content.tagline ? (
              <h1 data-edit="content.tagline" style={display} className="mt-4 text-5xl font-black uppercase leading-[0.88] text-[color:#F6EDE0] sm:text-7xl">{content.tagline}</h1>
            ) : (
              <h1 style={display} className="mt-4 text-5xl font-black uppercase leading-[0.88] text-[color:#F6EDE0] sm:text-7xl">Fired daily.<br />Eaten fast.</h1>
            )}
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/70 sm:text-lg" {...editCopy(content, "hero_subtext", "Hand-thrown pizza, charred at 900°F in our wood-burning oven. Pull up a chair.")} />
            {bookingOn ? (
              <div className="mt-8 max-w-xl">
                <FornoBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-8 inline-flex rounded-md px-10 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: TOMATO }} {...editCopy(content, "hero_contact_cta", "Get in touch")} />
            )}
          </div>
        </div>
        <div className="relative min-h-[44vh] lg:min-h-0">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${TOMATO}, ${CHARCOAL})` }} />
          )}
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,26,23,0.35), transparent 45%)" }} />
        </div>
      </section>

      {/* tomato marquee strip — "fired daily" energy */}
      <div style={{ background: TOMATO }} className="overflow-hidden py-3 text-[color:#F6EDE0]">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-1 px-6 text-xs font-black uppercase tracking-[0.24em]">
          <span {...editCopy(content, "marquee_1", "Wood-fired")} /><span style={{ color: CHARCOAL }}>✦</span>
          <span {...editCopy(content, "marquee_2", "48-hour dough")} /><span style={{ color: CHARCOAL }}>✦</span>
          <span {...editCopy(content, "marquee_3", "San Marzano")} /><span style={{ color: CHARCOAL }}>✦</span>
          <span {...editCopy(content, "marquee_4", "900°F oven")} /><span style={{ color: CHARCOAL }}>✦</span>
          <span {...editCopy(content, "marquee_5", "Fired daily")} />
        </div>
      </div>

      {/* about: cream band with big condensed headline */}
      <section style={{ background: CREAM }} className="text-[color:#1C1A17]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: TOMATO }} {...editCopy(content, "home_kitchen_eyebrow", "Our kitchen")} />
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-6xl font-black uppercase leading-[0.85] sm:text-7xl">Simple<br />dough.<br /><span style={{ color: TOMATO }}>Serious</span> fire.</h2>
            {content.about ? (
              <p data-edit="content.about" className="text-[17px] leading-[1.85] text-[color:#1C1A17]/80">{content.about}</p>
            ) : (
              <p className="text-[17px] leading-[1.85] text-[color:#1C1A17]/80" {...editCopy(content, "home_about_fallback", "A neighbourhood pizzeria built around one roaring oven, a few honest ingredients, and the kind of crust you tear with your hands.")} />
            )}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-md border-2 px-7 py-3 text-xs font-black uppercase tracking-[0.18em] transition hover:bg-[color:#1C1A17] hover:text-[color:#F6EDE0]" style={{ borderColor: CHARCOAL, color: CHARCOAL }} {...editCopy(content, "home_about_cta", "Our story")} />
          )}
        </div>
      </section>

      {/* how we make it: numbered band on charcoal */}
      <section style={{ background: CHARCOAL, backgroundImage: CHAR_TEXTURE }} className="text-[color:#F6EDE0]">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: BASIL }} {...editCopy(content, "home_steps_eyebrow", "How we make it")} />
              <h2 style={display} className="mt-3 text-5xl font-black uppercase leading-[0.9] sm:text-6xl" {...editCopy(content, "home_steps_heading", "Three steps to char")} />
            </div>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="border-t-2 pt-6" style={{ borderColor: TOMATO }}>
                <p style={{ ...display, color: TOMATO }} className="text-5xl font-black leading-none">{s.n}</p>
                <h3 style={display} className="mt-4 text-2xl font-black uppercase tracking-tight">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* signature pizzas highlight: menu items as bold cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: MOZZ }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: TOMATO }} {...editCopy(content, "home_featured_eyebrow", "From the oven")} />
                <h2 style={display} className="mt-3 text-5xl font-black uppercase leading-[0.9] text-[color:#1C1A17] sm:text-6xl" {...editCopy(content, "home_featured_heading", "Signature pies")} />
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-black uppercase tracking-[0.18em] text-[color:#C1432E] hover:opacity-70" {...editCopy(content, "home_featured_menu_link", "See the full menu →")} />}
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden rounded-xl border-2 bg-white transition hover:-translate-y-1" style={{ borderColor: `${CHARCOAL}14` }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[4/3] w-full items-center justify-center" style={{ background: CHARCOAL, backgroundImage: CHAR_TEXTURE }}>
                        <span className="text-4xl" aria-hidden>🍕</span>
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <div className="flex items-baseline justify-between gap-3">
                        <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-black uppercase tracking-tight text-[color:#1C1A17]">{item.name}</h3>
                        {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-black text-[color:#C1432E]">{item.price}</span>}
                      </div>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[color:#1C1A17]/60">{item.description}</p>}
                      <span className="mt-5 text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: BASIL }}>View menu →</span>
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex rounded-md px-9 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: TOMATO }} {...editCopy(content, "home_featured_menu_cta", "See the full menu")} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* basil CTA band with a charred-edge panel */}
      <section style={{ background: BASIL }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="rounded-2xl border-4 px-8 py-12 text-center" style={{ borderColor: MOZZ, background: "rgba(28,26,23,0.12)" }}>
            <h2 style={display} className="text-5xl font-black uppercase leading-[0.9] text-[color:#F6EDE0] sm:text-6xl" {...editCopy(content, "home_cta_heading", "Save a seat by the fire")} />
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[color:#F6EDE0]/85" {...editCopy(content, "home_cta_subtext", "Walk-ins welcome · Reservations recommended")} />
            <a href={book} className="mt-7 inline-flex rounded-md px-9 py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: TOMATO }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* quick info band: hours + directions on charcoal */}
      <section style={{ background: CHARCOAL, backgroundImage: CHAR_TEXTURE }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: TOMATO }} {...editCopy(content, "home_info_hours_heading", "Opening hours")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/65">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: TOMATO }} {...editCopy(content, "home_info_find_heading", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/75">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-white/75">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-md border border-white/40 px-6 py-2.5 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:bg-white hover:text-[color:#1C1A17]" {...editCopy(content, "home_info_directions_cta", "Get directions")} />
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: TOMATO }} {...editCopy(content, "home_info_reserve_heading", "Reserve")} />
            <p className="mt-5 text-sm text-white/75" {...editCopy(content, "home_info_reserve_blurb", "Save a table in seconds — best seats are by the oven.")} />
            <a href={book} className="mt-5 inline-flex rounded-md px-7 py-3 text-xs font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: TOMATO }}>{bookingOn ? "Reserve a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
