import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AtelierHeader } from "./AtelierHeader";
import { AtelierBooking } from "./AtelierBooking";

// Atelier — refined, premium hair & beauty salon design (single venue),
// MULTI-PAGE: the nav opens real routes (Services / About / Gallery /
// Reservations / Contact) under basePath, never scroll anchors. Each page is
// its own layout; the sticky header and footer are shared. Palette is baked
// (charcoal ink / deep wine / soft blush / cream); the tenant swaps in their
// own photography, treatments, stylists, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#2b2826";
const WINE = "#7a2a38";
const BLUSH = "#f7eef0";
const CREAM = "#faf6f3";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function SectionKicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: light ? "rgba(255,255,255,0.7)" : WINE }}>{children}</p>;
}

export default function AtelierDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.booking_url || href("contact");

  const nav = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const allItems = groups.flatMap((s) => s.categories.flatMap((c) => c.items));

  // ---- shared footer ----
  const footer = (
    <footer style={{ background: INK }} className="text-white">
      {/* favourite brands strip */}
      <div className="border-b border-white/10 px-6 py-12 text-center">
        <SectionKicker light>The high quality products</SectionKicker>
        <h4 style={serif} className="mt-3 text-2xl text-white">Crafted with brands we trust</h4>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <a href={href("home")} data-edit="tenant.business_name" style={serif} className="text-2xl tracking-[0.08em] text-white">{name}</a>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">
            A refined hair and beauty salon. Book your visit and let our stylists take care of the rest.
          </p>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-white transition hover:bg-white hover:text-neutral-900">
                  <SocialIcon kind={`${s.label} ${s.url}`} />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Contact us</h4>
          {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
          <div className="mt-4 space-y-1.5 text-sm text-white/80">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
          {content.map_url && (
            <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex text-xs font-semibold uppercase tracking-[0.18em] text-white/90 underline-offset-4 hover:underline" style={{ color: "#e7a8b3" }}>Get directions</a>
          )}
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/80">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open by appointment.</p>}
          <a href={book} style={{ background: WINE }} className="mt-7 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90">Book an appointment</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-8 py-6 text-center text-xs text-white/45">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <AtelierHeader name={name} book={book} links={nav} home={href("home")} promo={content.tagline} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Wine page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: INK }} className="text-white">
      <div className="mx-auto max-w-6xl px-6 pb-16 pt-36 text-center sm:px-8 sm:pt-40">
        <SectionKicker light>{kicker}</SectionKicker>
        <h1 style={serif} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our bespoke services", "Treatments & prices", "Every treatment is tailored to you. Browse the list below and book the moment that suits.")}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={serif} className="border-b border-neutral-200 pb-4 text-2xl text-neutral-900">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-4 text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: WINE }}>{catg.category}</h3>}
                      <ul className="grid gap-x-12 gap-y-6 sm:grid-cols-2">
                        {catg.items.map((item) => (
                          <li key={item.id} className="border-b border-neutral-100 pb-5">
                            <div className="flex items-baseline justify-between gap-4">
                              <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-neutral-900">{item.name}</span>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: WINE }}>{item.price}</span>}
                            </div>
                            {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-neutral-500">Our treatment list is coming soon.</p>}
          <div className="mt-16 text-center">
            <a href={book} style={{ background: WINE }} className="inline-flex px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90">Book your appointment</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Why choose us", "About the salon")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          ) : (
            <p className="text-neutral-500">Our story is coming soon.</p>
          )}
        </section>
        {team.length > 0 && (
          <section style={{ background: CREAM }} className="border-y border-black/5">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
              <div className="text-center">
                <SectionKicker>Meet the team</SectionKicker>
                <h2 style={serif} className="mt-3 text-3xl text-neutral-900">Our stylists</h2>
              </div>
              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full bg-neutral-200">
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p data-edit={`team:${m.id}:name`} style={serif} className="mt-5 text-lg text-neutral-900">{m.name}</p>
                    {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm" style={{ color: WINE }}>{m.role}</p>}
                    {m.credentials && <p className="mt-0.5 text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
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
        {banner("Our work", "A look inside")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book your visit", "Request an appointment", "Tell us what you would like and when. We will confirm your slot by phone or email.")}
        <section className="mx-auto max-w-xl px-6 py-20 sm:px-8">
          {bookingOn ? (
            <AtelierBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="text-center">
              <p className="text-neutral-600">To book, please call or email us and we will arrange your visit.</p>
              <div className="mt-6 flex flex-col items-center gap-3">
                {content.phone && <a href={`tel:${content.phone}`} style={{ background: WINE }} className="inline-flex px-8 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white">Call {content.phone}</a>}
                {content.booking_url && <a href={content.booking_url} target="_blank" rel="noreferrer" className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: WINE }}>Book online</a>}
              </div>
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Have a question?", "Get in touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700">
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
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: WINE }}>Get directions</a>
            )}
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-3">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:border-neutral-900 hover:text-neutral-900">
                    <SocialIcon kind={`${s.label} ${s.url}`} />
                  </a>
                ))}
              </div>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a note"
                contactBlurb="Questions about a treatment, product or your next visit? We would love to hear from you."
                contactCta="Send message"
                theme={{ cardBorder: "#e6dcd8", heading: INK, button: WINE, buttonText: "#ffffff", fieldBorder: "#d8cfca", radius: "0.75rem", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = allItems.slice(0, 8);
  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        <div className="relative z-10 mt-auto px-6 pb-24 sm:px-12 lg:px-20 lg:pb-32">
          <h1 style={serif} className="max-w-2xl text-5xl font-medium leading-[1.05] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-6xl lg:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          <p className="mt-5 max-w-md text-lg text-white/85 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)]">
            We care about your hair, your skin and your time.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={book} style={{ background: WINE }} className="inline-flex justify-center px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-xl transition hover:opacity-90">Book now</a>
            {groups.length > 0 && (
              <a href={href("services")} className="inline-flex justify-center border border-white/70 px-9 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">View services</a>
            )}
          </div>
        </div>
      </section>

      {/* services teaser */}
      {groups.length > 0 && (
        <section className="border-b border-black/5 bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
            <div className="text-center">
              <SectionKicker>Our services</SectionKicker>
              <h2 style={serif} className="mt-3 text-4xl text-neutral-900 sm:text-5xl">What we do</h2>
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.slice(0, 4).map((item) => (
                <div key={item.id} style={{ background: BLUSH }} className="rounded-2xl p-7">
                  <p data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-neutral-900">{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>}
                  {item.price && <p data-edit={`item:${item.id}:price`} className="mt-4 text-sm font-semibold" style={{ color: WINE }}>{item.price}</p>}
                </div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex border px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Explore our services</a>
            </div>
          </div>
        </section>
      )}

      {/* why choose us */}
      {content.about && (
        <section style={{ background: CREAM }} className="border-b border-black/5">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionKicker>Why choose us</SectionKicker>
              <h2 style={serif} className="mt-3 text-4xl text-neutral-900 sm:text-5xl">A salon that puts you first</h2>
              <p data-edit="content.about" className="mt-6 text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: WINE }}>More about us</a>
            </div>
            <div className="overflow-hidden rounded-2xl bg-neutral-200">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={hero} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full bg-gradient-to-br from-neutral-300 to-neutral-400" />
              )}
            </div>
          </div>
        </section>
      )}

      {/* offer / booking band */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-20 text-center sm:px-8">
          <SectionKicker light>Ready when you are</SectionKicker>
          <h2 style={serif} className="max-w-2xl text-4xl font-medium sm:text-5xl">Book your appointment today</h2>
          <p className="max-w-xl text-[15px] leading-relaxed text-white/70">Reserve your slot online in seconds. We will confirm by phone or email and have everything ready for your visit.</p>
          <a href={book} style={{ background: WINE }} className="inline-flex px-10 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90">Book now</a>
        </div>
      </section>

      {/* gallery teaser */}
      {gallery.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <SectionKicker>Our work</SectionKicker>
                <h2 style={serif} className="mt-3 text-4xl text-neutral-900 sm:text-5xl">Recent looks</h2>
              </div>
              <a href={href("gallery")} className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: WINE }}>View gallery</a>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-xl object-cover" />
              ))}
            </div>
          </div>
        </section>
      )}
    </>,
    false,
  );
}
