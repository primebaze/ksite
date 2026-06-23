import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { TideHeader } from "./TideHeader";
import { TideBooking } from "./TideBooking";

// Tide — bright, photo-led modern sushi house (single venue), MULTI-PAGE: the
// nav opens real routes (Menu / About / Gallery / Reservations / Contact) under
// basePath, never scroll anchors. Faithfully recreates the Sticks'n'Sushi
// layout: dark translucent centred-logo header, full-bleed hero with a centred
// white heading, a stack of ALTERNATING image/text promo blocks on cream, an
// "explore the restaurant" photo row (adapted from the chain's location
// carousel to one venue), a row of dish cards, a "Catch the latest news" CTA,
// and a cream footer with columns plus a get-in-touch card. Palette is baked
// (cream / charcoal / red accent, bold uppercase sans headings); the tenant
// swaps in their own photography, copy, menu, hours and address.

const CREAM = "#ece7dd";
const CREAM_DEEP = "#e2dccf";
const CHARCOAL = "#2b2926";
const RED = "#d83b2e";

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

export default function TideDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const order = content.ordering_links && content.ordering_links.length > 0 ? content.ordering_links[0].url : null;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.reservation_url || href("contact");

  const nav = [
    groups.length > 0 && { label: "Menu", href: href("menu") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: CREAM }} className="text-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: RED }}>Contact info</h4>
          <div className="mt-5 space-y-1.5 text-sm text-neutral-700">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-lg font-bold text-neutral-900 hover:text-neutral-700">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed text-neutral-600">{content.address}</p>}
          </div>
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-7 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: RED }}>Follow us</h4>
              <div className="mt-3 flex gap-4 text-neutral-800">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: RED }}>Explore</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
            {([
              { label: "Home", href: href("home") },
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "About us", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Book a table", href: href("reservations") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-neutral-900">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: RED }}>Opening times</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-neutral-700">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-neutral-500">Open daily.</p>}
        </div>
        <div className="flex flex-col justify-between rounded-2xl p-7 text-white" style={{ background: CHARCOAL }}>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: RED }}>Hungry already?</h4>
            <p className="mt-3 text-lg font-bold leading-snug">Book a table or order in for the full {name} experience.</p>
          </div>
          <div className="mt-6 flex flex-col gap-3">
            <a href={book} className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: RED }}>{bookingOn ? "Book a table" : "Get in touch"}</a>
            {order && <a href={order} target="_blank" rel="noreferrer" className="border border-white/40 px-5 py-3 text-center text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-white hover:text-neutral-900">Order takeaway</a>}
          </div>
        </div>
      </div>
      <p className="px-8 pb-8 text-xs text-neutral-500">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900" >
      <div style={{ background: CREAM }} className="min-h-screen">
        <TideHeader name={name} book={book} order={order} links={nav} home={href("home")} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Charcoal page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: CHARCOAL }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 pb-12 pt-32 sm:pt-36">
        <p className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: RED }}>{kicker}</p>
        <h1 className="mt-3 text-4xl font-extrabold uppercase tracking-[0.02em] sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The menu", "Eat with us")}
        <section className="mx-auto max-w-5xl px-8 py-16 sm:py-20">
          {groups.length > 0 ? (
            <>
              <div className="space-y-16">
                {groups.map((section) => (
                  <div key={section.section}>
                    {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="mb-7 text-2xl font-extrabold uppercase tracking-[0.06em]" style={{ color: CHARCOAL }}>{section.section}</h2>}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-8">
                        {catg.category && <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-4 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: RED }}>{catg.category}</h3>}
                        <ul className="grid gap-x-12 gap-y-5 md:grid-cols-2">
                          {catg.items.map((item) => (
                            <li key={item.id} className="border-b border-neutral-300/60 pb-4">
                              <div className="flex items-baseline justify-between gap-3">
                                <span data-edit={`item:${item.id}:name`} className="text-base font-bold text-neutral-900">{item.name}</span>
                                {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-bold" style={{ color: RED }}>{item.price}</span>}
                              </div>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-600">{item.description}</p>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {content.ordering_links && content.ordering_links.length > 0 && (
                <div className="mt-14 flex flex-wrap justify-center gap-4 border-t border-neutral-300/70 pt-12">
                  {content.ordering_links.map((o) => (
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CHARCOAL }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-neutral-500">Our menu is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book a table", "Reserve with us")}
        <section className="mx-auto max-w-xl px-8 py-16 sm:py-20">
          <p className="mb-8 text-center text-[16px] leading-[1.8] text-neutral-700">Tell us when suits and we will confirm by phone or email. For parties of 8 or more, please call us directly.</p>
          <TideBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Find us")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-lg font-bold text-neutral-900 hover:text-neutral-700">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-neutral-300/70 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CHARCOAL }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Drop us a line"
                contactBlurb="Private dining, large parties or a quick question? We will get right back to you."
                contactCta="Send it over"
                theme={{ card: "#ffffff", cardBorder: "#2b292622", heading: CHARCOAL, button: RED, buttonText: "#ffffff", fieldBorder: "#cfc8ba", radius: "0" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Our story")}
        <section className="mx-auto max-w-3xl px-8 py-16 sm:py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
          {content.cuisine_type && (
            <>
              <h3 className="mt-12 text-2xl font-extrabold uppercase tracking-[0.04em]" style={{ color: CHARCOAL }}>What we serve</h3>
              <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
            </>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the restaurant")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  // Alternating promo blocks, built from real content (about + cuisine_type),
  // mirroring the reference's image/text stack. Images come from the gallery
  // (tenant media) when present; otherwise the block is text-only on cream.
  const g0 = gallery[0];
  const g1 = gallery[1];
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 4);

  const promo = (
    img: { image_url: string; caption: string | null } | undefined,
    kicker: string,
    title: string,
    body: ReactNode,
    editKey: string | undefined,
    flip: boolean,
    bg: string,
  ) => (
    <section style={{ background: bg }}>
      <div className={`mx-auto grid max-w-6xl items-center gap-0 md:grid-cols-2`}>
        {img ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={img.image_url} alt={img.caption ?? ""} className={`h-72 w-full object-cover sm:h-[28rem] ${flip ? "md:order-2" : ""}`} />
        ) : (
          <div className={`h-72 w-full sm:h-[28rem] ${flip ? "md:order-2" : ""}`} style={{ background: CREAM_DEEP }} />
        )}
        <div className={`px-8 py-12 sm:px-12 sm:py-16 ${flip ? "md:order-1" : ""}`}>
          <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: RED }}>{kicker}</p>
          <h2 className="mt-3 text-3xl font-extrabold uppercase leading-tight tracking-[0.01em] sm:text-4xl" style={{ color: CHARCOAL }}>{title}</h2>
          <div data-edit={editKey} className="mt-5 text-[15px] leading-[1.8] text-neutral-700">{body}</div>
          <a href={href("menu")} className="mt-7 inline-block text-xs font-bold uppercase tracking-[0.16em]" style={{ color: CHARCOAL }}>Read more &rarr;</a>
        </div>
      </div>
    </section>
  );

  return shell(
    <>
      {/* full-bleed hero with centred white heading */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-600 to-neutral-900" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-black/30" />
        <div className="relative z-10 m-auto flex flex-col items-center gap-8 px-6 text-center">
          <h1 className="max-w-3xl text-4xl font-extrabold uppercase leading-[1.05] tracking-[0.01em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-6xl">
            {content.tagline ? <span data-edit="content.tagline">{content.tagline}</span> : <>Celebrate sushi with us</>}
          </h1>
          <a href={book} className="px-9 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-2xl transition hover:opacity-90 sm:text-sm" style={{ background: RED }}>{bookingOn ? "Book a table" : "Get in touch"}</a>
        </div>
      </section>

      {/* first promo block — intro / about (text left, image right per reference) */}
      {(content.about || g0) && promo(
        g0,
        "Welcome",
        content.cuisine_type ? "Crafted, fresh, ours" : "Made for sharing",
        content.about ? content.about : "Fresh, seasonal plates designed to be shared, served in a warm and easy room. Pull up a seat and settle in.",
        content.about ? "content.about" : undefined,
        false,
        CREAM,
      )}

      {/* second promo block — cuisine / signature (image left, text right) */}
      {(content.cuisine_type || g1) && promo(
        g1,
        "On the pass",
        "What we are about",
        content.cuisine_type ? content.cuisine_type : "From hand-rolled maki to robata grills, every plate is built around the best of the day's market.",
        content.cuisine_type ? "content.cuisine_type" : undefined,
        true,
        CREAM_DEEP,
      )}

      {/* "explore the restaurant" photo row — single-venue adaptation of the
          chain's location carousel; uses tenant gallery, omitted if empty */}
      {gallery.length > 0 && (
        <section style={{ background: CREAM }} className="py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-8">
            <h2 className="text-center text-2xl font-extrabold uppercase tracking-[0.18em]" style={{ color: CHARCOAL }}>Explore the restaurant</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.slice(0, 6).map((gi) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={gi.id} src={gi.image_url} alt={gi.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="inline-block text-xs font-bold uppercase tracking-[0.16em]" style={{ color: CHARCOAL }}>View the gallery &rarr;</a>
            </div>
          </div>
        </section>
      )}

      {/* dish-card row — teases the full menu */}
      {featured.length > 0 && (
        <section style={{ background: CHARCOAL }} className="py-16 text-white sm:py-20">
          <div className="mx-auto max-w-6xl px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: RED }}>From the menu</p>
                <h2 className="mt-3 text-3xl font-extrabold uppercase tracking-[0.02em] sm:text-4xl">Signature plates</h2>
              </div>
              <a href={href("menu")} className="text-xs font-bold uppercase tracking-[0.16em] text-white/80 hover:text-white">See the full menu &rarr;</a>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {featured.map((item, i) => {
                const gi = gallery[i % Math.max(gallery.length, 1)];
                return (
                  <a key={item.id} href={href("menu")} className="group block">
                    {gi ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={gi.image_url} alt="" className="aspect-square w-full object-cover" />
                    ) : (
                      <div className="aspect-square w-full" style={{ background: "#3a3631" }} />
                    )}
                    <p data-edit={`item:${item.id}:name`} className="mt-3 text-sm font-bold uppercase tracking-[0.06em] text-white">{item.name}</p>
                    {item.price && <p data-edit={`item:${item.id}:price`} className="mt-0.5 text-xs font-semibold" style={{ color: RED }}>{item.price}</p>}
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* "Catch the latest news" — real CTA (links to booking/contact), no dead inputs */}
      <section style={{ background: CREAM }} className="py-16 text-center sm:py-24">
        <div className="mx-auto max-w-2xl px-8">
          <h2 className="text-3xl font-extrabold uppercase tracking-[0.04em] sm:text-4xl" style={{ color: CHARCOAL }}>Pull up a seat</h2>
          <p className="mt-4 text-[16px] leading-[1.8] text-neutral-700">Seasonal specials, late tables and rolling events. The best way to keep up is to come in and see for yourself.</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href={book} className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: RED }}>{bookingOn ? "Book a table" : "Get in touch"}</a>
            <a href={href("contact")} className="px-8 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:opacity-70" style={{ border: `1px solid ${CHARCOAL}`, color: CHARCOAL }}>Contact us</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
