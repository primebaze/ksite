import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { FadeHeader } from "./FadeHeader";
import { FadeBooking } from "./FadeBooking";

// Fade — modern hair & beauty / barber salon design (single venue), inspired by
// New Cross Hair: warm cream and white sections, a coral accent, a peach
// products band, light italic serif headings over clean sans body, and a calm
// three-column "Location / Opening Hours / Contact" footer. MULTI-PAGE: the nav
// opens real routes (Services / About / Gallery / Book / Contact) under
// basePath, never scroll anchors. The palette is baked; the tenant swaps in
// their own photography, services, stylists, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CORAL = "#e8492e";
const PEACH = "#df8a5a";
const CREAM = "#e7e3dc";
const INK = "#1c1a17";

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

export default function FadeDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Prefer an external booking link when the owner set one; else our own widget.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const allItems = groups.flatMap((s) => s.categories.flatMap((c) => c.items));

  // ---- Shared footer band: Location / Opening Hours / Contact (serif heads) ----
  const footer = (
    <footer style={{ background: CREAM }} className="text-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 text-center md:grid-cols-3 md:text-left">
        <div>
          <h4 style={serif} className="text-2xl" >Location</h4>
          {content.address ? (
            <p data-edit="content.address" className="mt-5 whitespace-pre-line text-[15px] leading-relaxed text-neutral-700">{content.address}</p>
          ) : <p className="mt-5 text-[15px] text-neutral-500">Address coming soon.</p>}
          {content.map_url && (
            <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-sm font-medium underline underline-offset-4" style={{ color: CORAL }}>Get directions</a>
          )}
        </div>
        <div>
          <h4 style={serif} className="text-2xl">Opening Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-3 text-[15px] text-neutral-700">
              {content.hours.map((h, i) => (
                <li key={i}>
                  <span data-edit={`hours:${i}:day`}>{h.day}</span>
                  {h.open && <span data-edit={`hours:${i}:open`} className="text-neutral-500"> {" "}{h.open}</span>}
                </li>
              ))}
            </ul>
          ) : <p className="mt-5 text-[15px] text-neutral-500">Open by appointment.</p>}
        </div>
        <div>
          <h4 style={serif} className="text-2xl">Contact</h4>
          <div className="mt-5 space-y-2 text-[15px] text-neutral-700">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            <a href={book} className="block font-medium" style={{ color: CORAL }}>Book, reschedule or cancel here</a>
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex justify-center gap-4 text-neutral-800 md:justify-start">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="px-8 pb-8 text-center text-xs text-neutral-500">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <FadeHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream page banner that also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: CREAM }}>
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 sm:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl italic sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our menu", "Services and prices")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h3 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={serif} className="text-2xl italic">{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <h4 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</h4>}
                      <ul className="divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap font-medium" style={{ color: CORAL }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="pt-2 text-center">
                <a href={book} className="inline-flex px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: CORAL }}>Book Appointment</a>
              </div>
            </div>
          ) : <p className="text-neutral-500">Our services are coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / BOOK ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Appointments", "Book your visit")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Tell us what you are after and when suits, and we will confirm your appointment. To reschedule or cancel, just give us a call.</p>
          <FadeBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Find us")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h3 style={serif} className="text-2xl italic">Visit the salon</h3>
            <div className="mt-5 space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: INK }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Drop us a line"
                contactBlurb="Questions about a treatment, a colour or your next look? We will get back to you."
                contactCta="Send message"
                theme={{ cardBorder: "#e6e2db", heading: INK, button: CORAL, buttonText: "#ffffff", fieldBorder: "#d8d3ca", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "We care about your hair, beauty and wellbeing")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
        </section>
        {team.length > 0 && (
          <section className="mx-auto max-w-6xl px-8 pb-24">
            <h2 style={serif} className="text-center text-3xl italic">Meet the team</h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.map((m) => (
                <div key={m.id} className="text-center">
                  <div className="mx-auto h-44 w-44 overflow-hidden rounded-full bg-neutral-100">
                    {m.photo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <p data-edit={`team:${m.id}:name`} className="mt-5 text-lg font-medium">{m.name}</p>
                  {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm text-neutral-500">{m.role}</p>}
                  {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
                </div>
              ))}
            </div>
          </section>
        )}
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Our work", "Tag your new look")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const teaser = allItems.slice(0, 6);
  const galleryStrip = gallery.slice(0, 8);
  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[92vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-500 to-neutral-800" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/25" />
        <div className="relative z-10 mt-auto flex flex-col items-start gap-6 px-6 pb-20 sm:px-12 sm:pb-24">
          {content.tagline && <p data-edit="content.tagline" style={serif} className="max-w-2xl text-3xl italic leading-snug text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)] sm:text-5xl">{content.tagline}</p>}
          <a href={book} style={{ background: CORAL }} className="px-9 py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-2xl transition hover:opacity-90">Book Appointment</a>
        </div>
      </section>

      {/* "Discover your service" intro card overlapping a tinted band */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="bg-white p-9 shadow-sm sm:p-12">
              <h2 style={serif} className="text-3xl italic sm:text-4xl">Discover your service.</h2>
              {content.about ? (
                <p data-edit="content.about" className="mt-5 text-[15px] leading-relaxed text-neutral-600">{content.about}</p>
              ) : (
                <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">A welcoming, modern hair and beauty salon. Tell us what you are after and our team will look after the rest.</p>
              )}
              <a href={groups.length ? href("services") : book} className="mt-7 inline-flex px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CORAL }}>{groups.length ? "View services" : "Book now"}</a>
            </div>
            {galleryStrip[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={galleryStrip[0].image_url} alt={galleryStrip[0].caption ?? ""} className="h-72 w-full object-cover sm:h-[28rem]" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={hero} alt="" className="h-72 w-full object-cover sm:h-[28rem]" />
            ) : (
              <div className="h-72 w-full bg-neutral-200 sm:h-[28rem]" />
            )}
          </div>
        </div>
      </section>

      {/* Services teaser: split text + photo, dotted price list */}
      {teaser.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>What we do</p>
              <h2 style={serif} className="mt-3 text-3xl italic sm:text-4xl">Hair, colour and beauty</h2>
              <ul className="mt-8 space-y-4">
                {teaser.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-3 border-b border-neutral-200 pb-3">
                    <span data-edit={`item:${item.id}:name`} className="text-[15px] font-medium text-neutral-800">{item.name}</span>
                    {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-medium" style={{ color: PEACH }}>{item.price}</span>}
                  </li>
                ))}
              </ul>
              <a href={href("services")} className="mt-8 inline-block text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: CORAL }}>View full price list</a>
            </div>
            {galleryStrip[1] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={galleryStrip[1].image_url} alt={galleryStrip[1].caption ?? ""} className="h-80 w-full object-cover sm:h-[32rem]" />
            ) : (
              <div className="h-80 w-full bg-neutral-200 sm:h-[32rem]" />
            )}
          </div>
        </section>
      )}

      {/* Peach "Our products / philosophy" band */}
      <section style={{ background: PEACH }} className="text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 md:grid-cols-2">
          <div>
            <h2 style={serif} className="text-3xl italic sm:text-4xl">Our products</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/90">We use professional, kind to hair products and only recommend what we would use ourselves, so the look we create with you lasts long after you leave the chair.</p>
            <a href={book} className="mt-7 inline-flex bg-white px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ color: INK }}>Book Appointment</a>
          </div>
          {galleryStrip[2] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={galleryStrip[2].image_url} alt={galleryStrip[2].caption ?? ""} className="h-72 w-full object-cover sm:h-96" />
          ) : (
            <div className="h-72 w-full bg-white/20 sm:h-96" />
          )}
        </div>
      </section>

      {/* Instagram-style "Tag your new look" grid */}
      {galleryStrip.length > 0 && (
        <section className="mx-auto max-w-6xl px-2 py-20 sm:px-4">
          <h2 style={serif} className="mb-10 text-center text-3xl italic">Tag your new look</h2>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {galleryStrip.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
            ))}
          </div>
          {gallery.length > galleryStrip.length && (
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: CORAL }}>See the full gallery</a>
            </div>
          )}
        </section>
      )}

      {/* "Leave a Review" cream CTA */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: CORAL }}>Loved your visit?</p>
          <h2 style={serif} className="mt-4 text-4xl italic">Leave a review</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">Your kind words help our little salon grow. We would love to hear how we did.</p>
          <a href={href("contact")} className="mt-8 inline-flex px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: CORAL }}>Get in touch</a>
        </div>
      </section>
    </>,
    false,
  );
}
