import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LumiereHeader } from "./LumiereHeader";
import { LumiereBooking } from "./LumiereBooking";

// Lumiere — elegant beauty / aesthetics clinic design (single venue), inspired by
// Beauty Club London. MULTI-PAGE: the nav opens real routes (Services / About /
// Gallery / Book / Contact) under basePath, never scroll anchors. Palette is
// baked monochrome ink + white with a soft champagne-gold accent; the tenant
// swaps in their own photography, treatments, stylists, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#0e0e0e";
const GOLD = "#b79257";
const MIST = "#f6f4f1";

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

function Stars() {
  return (
    <span className="inline-flex gap-0.5" style={{ color: GOLD }} aria-hidden>
      {[0, 1, 2, 3, 4].map((i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.2 6.8.8-5 4.6 1.3 6.7L12 17.8 5.9 20.3 7.2 13.6l-5-4.6 6.8-.8z" /></svg>
      ))}
    </span>
  );
}

export default function LumiereDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // External booking link wins; otherwise our own reservations page or contact.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Flatten treatments for the home service tiles + footer columns.
  const allItems = groups.flatMap((s) => s.categories.flatMap((c) => c.items));
  const serviceSections = groups.filter((s) => s.section).slice(0, 6);

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 py-20">
        {/* centred crest */}
        <div className="mb-14 text-center">
          <span style={serif} className="text-2xl tracking-[0.28em]">{name.toUpperCase()}</span>
        </div>
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>The clinic</h4>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-white/70">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-6 flex gap-4 text-white/80">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Explore</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-white/70">
              {([
                groups.length > 0 && { label: "Treatments", href: href("services") },
                content.about && { label: "About us", href: href("about") },
                gallery.length > 0 && { label: "Gallery", href: href("gallery") },
                bookingOn && { label: "Book a consultation", href: href("reservations") },
                { label: "Contact", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Treatments</h4>
            {serviceSections.length > 0 ? (
              <ul className="mt-5 space-y-2.5 text-sm text-white/70">
                {serviceSections.map((s) => (
                  <li key={s.section}><a href={href("services")} className="hover:text-white">{s.section}</a></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/50">Treatments coming soon.</p>}
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Opening times</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/70">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/50">Open by appointment.</p>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-8 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span>© {name}. All rights reserved.</span>
          <span className="uppercase tracking-[0.2em]">Privacy policy</span>
        </div>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <LumiereHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Light page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: MIST }} className="border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-40 text-center sm:pt-44">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES / TREATMENTS ----
  if (page === "services") {
    return shell(
      <>
        {banner("The menu", "Treatments & prices")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h3 style={serif} className="mb-6 border-b border-neutral-200 pb-3 text-2xl">{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-7">
                      {catg.category && <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{catg.category}</h4>}
                      <ul className="divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
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
            <a href={book} className="inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>Book a consultation</a>
          </div>
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
          <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Tell us what you are looking for and when suits you. We will be in touch to confirm your appointment and answer any questions.</p>
          <LumiereBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Visit the clinic")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
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
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about a treatment or anything else? We would love to hear from you."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: "#e7e3dc", heading: "#0e0e0e", button: "#b79257", buttonText: "#ffffff", fieldBorder: "#d8d2c6", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "A new standard in beauty")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
        </section>

        {/* Team / practitioners */}
        {team.length > 0 && (
          <section className="border-t border-neutral-200" style={{ background: MIST }}>
            <div className="mx-auto max-w-6xl px-8 py-20">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>The team</p>
                <h2 style={serif} className="mt-4 text-3xl font-medium sm:text-4xl">Meet our specialists</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto aspect-[3/4] w-full max-w-[16rem] overflow-hidden bg-neutral-200">
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p style={serif} className="mt-5 text-lg">{m.name}</p>
                    {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
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
        {banner("Our work", "The gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — dark image, bold centred wordmark, star reviews, location */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        <div className="relative z-10 mt-auto flex flex-col items-center gap-5 px-6 pb-24 text-center sm:pb-28">
          <div className="flex items-center gap-3 text-sm text-white/90">
            <Stars />
            <span className="tracking-wide">Loved by our clients</span>
          </div>
          <h1 data-edit="tenant.business_name" style={serif} className="text-4xl font-medium uppercase tracking-[0.12em] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl">{name}</h1>
          {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
          <a href={book} style={{ background: GOLD }} className="mt-2 w-full max-w-xs px-10 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90 sm:w-auto">Book a consultation</a>
        </div>
      </section>

      {/* explore our services — image-tile grid teaser linking to full list */}
      {(allItems.length > 0 || serviceSections.length > 0) && (
        <section className="mx-auto max-w-6xl px-8 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>An unrivalled experience</p>
          <h2 style={serif} className="mt-4 text-4xl font-medium sm:text-5xl">Explore our treatments</h2>
          {serviceSections.length > 0 && (
            <div className="mt-14 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-3">
              {serviceSections.map((s, i) => {
                const img = gallery[i % Math.max(gallery.length, 1)]?.image_url;
                return (
                  <a key={s.section} href={href("services")} className="group relative isolate flex aspect-[4/3] items-end overflow-hidden bg-neutral-900">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-neutral-600 to-neutral-900" />
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span className="relative z-10 w-full px-6 pb-5 text-left text-lg font-medium uppercase tracking-[0.14em] text-white">{s.section}</span>
                  </a>
                );
              })}
            </div>
          )}
          <div className="mt-12">
            <a href={href("services")} className="inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>See all treatments</a>
          </div>
        </section>
      )}

      {/* about block — copy + image, "a new standard" */}
      {content.about && (
        <section style={{ background: MIST }} className="border-y border-neutral-200">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-20">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>A new standard</p>
              <h2 style={serif} className="mt-4 text-3xl font-medium sm:text-4xl">Beauty, perfected</h2>
              <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9] text-neutral-700">{content.about}</p>
              <a href={href("about")} className="mt-8 inline-flex border px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Our story</a>
            </div>
            <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
              {gallery[0]?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0].image_url} alt="" className="h-full w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={hero} alt="" className="h-full w-full object-cover" />
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* complimentary consultations band */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-8 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>No obligation</p>
          <h2 style={serif} className="text-3xl font-medium sm:text-4xl">Complimentary consultations</h2>
          <p className="max-w-xl text-[16px] leading-[1.9] text-white/75">Explore your options with our specialists and find the treatment that is right for you. We take the time to understand exactly what you want.</p>
          <a href={book} className="mt-2 inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GOLD }}>Book a free consultation</a>
        </div>
      </section>

      {/* community / gallery teaser */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>Follow along</p>
          <h2 style={serif} className="mt-4 text-3xl font-medium sm:text-4xl">Join our community</h2>
          <div className="mt-12 grid grid-cols-2 gap-1.5 sm:grid-cols-3 lg:grid-cols-5">
            {gallery.slice(0, 5).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" />
            ))}
          </div>
          <div className="mt-12">
            <a href={href("gallery")} className="inline-flex border px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>See more</a>
          </div>
        </section>
      )}
    </>,
    false,
  );
}
