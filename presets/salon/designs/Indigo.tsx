import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { IndigoHeader } from "./IndigoHeader";
import { IndigoBooking } from "./IndigoBooking";

// Indigo — creative, modern hair-salon design (single venue), MULTI-PAGE: the
// nav opens real routes (Services / About / Gallery / Book / Contact) under
// basePath, never scroll anchors. Each page is its own layout; the sticky white
// header and soft footer are shared. Inspired by a characterful London salon:
// off-white canvas, bold geometric sans, playful mint / pink / blue accent
// chips, photo cards with corner labels, oversized statement copy. Palette is
// baked; the tenant swaps in their own photography, copy, services, stylists,
// hours and address.

const INK = "#15130f";
const PAPER = "#f3f1ec";
const MINT = "#9fe7c6";
const PINK = "#f6bdd6";
const BLUE = "#aecbf2";

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

// A small rounded corner label, like the salon's playful photo-card chips.
function Chip({ children, color }: { children: ReactNode; color: string }) {
  return (
    <span className="rounded-lg px-3 py-1.5 text-sm font-bold" style={{ background: color, color: INK }}>
      {children}
    </span>
  );
}

export default function IndigoDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Booking: external booking_url wins; else our reservations page (or contact).
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // The accent chips cycle through the playful palette.
  const accents = [MINT, PINK, BLUE];

  const footer = (
    <footer style={{ background: PAPER }} className="text-neutral-800">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <a href={href("home")} className="flex items-center gap-2.5">
              <span aria-hidden className="h-5 w-5 rounded-full" style={{ background: MINT, border: `1.5px solid ${INK}` }} />
              <span data-edit="tenant.business_name" className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>{name}</span>
            </a>
            {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-600">{content.tagline}</p>}
            {content.socials && content.socials.length > 0 && (
              <div className="mt-6 flex gap-4 text-neutral-800">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Explore</h4>
            <ul className="mt-5 space-y-2.5 text-sm font-semibold" style={{ color: INK }}>
              {nav.map((l) => (
                <li key={l.href}><a href={l.href} className="transition hover:opacity-60">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Opening hours</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-neutral-500">Open by appointment.</p>}
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-neutral-500">Find us</h4>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
          </div>
        </div>
        <p className="mt-14 border-t border-black/10 pt-8 text-xs text-neutral-500">© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900" >
      <div style={{ background: PAPER }}>
        <IndigoHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Page banner clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, color: string) => (
    <section style={{ background: PAPER }}>
      <div className="mx-auto max-w-7xl px-6 pb-12 pt-32 sm:px-8 sm:pt-36">
        <Chip color={color}>{kicker}</Chip>
        <h1 className="mt-5 max-w-4xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl" style={{ color: INK }}>{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Services", "What we do", MINT)}
        <section className="mx-auto max-w-5xl px-6 pb-24 pt-8 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, si) => (
                <div key={section.section ?? si}>
                  {section.section && (
                    <h2 className="mb-6 inline-block text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
                      <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="rounded-lg px-3 py-1" style={{ background: accents[si % accents.length] }}>{section.section}</span>
                    </h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-neutral-500">{catg.category}</h3>}
                      <ul className="divide-y divide-black/10">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="text-lg font-bold" style={{ color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-lg font-bold" style={{ color: INK }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="pt-4">
                <a href={book} className="inline-flex rounded-full px-8 py-4 text-sm font-bold transition hover:opacity-85" style={{ background: MINT, color: INK, border: `1.5px solid ${INK}` }}>Book your appointment</a>
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
        {banner("Book", "Book your visit", PINK)}
        <section className="mx-auto max-w-2xl px-6 pb-24 pt-8 sm:px-8">
          {content.booking_url ? (
            <div className="rounded-3xl border border-black/10 bg-white p-9 text-center shadow-sm">
              <p className="text-lg leading-relaxed text-neutral-700">Pick a time that suits you and we will see you soon.</p>
              <a href={content.booking_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-9 py-4 text-sm font-bold transition hover:opacity-85" style={{ background: MINT, color: INK, border: `1.5px solid ${INK}` }}>Book online</a>
            </div>
          ) : (
            <IndigoBooking tenantId={tenant.id} name={name} />
          )}
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Say hello", BLUE)}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 pb-24 pt-8 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-medium" style={{ color: INK }}>{content.address}</p>}
              <div className="space-y-1.5">
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold hover:text-neutral-950">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold hover:text-neutral-950">{content.email}</a>}
              </div>
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-black/10 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3.5 text-sm font-bold transition hover:opacity-85" style={{ background: MINT, color: INK, border: `1.5px solid ${INK}` }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <SiteContactForms
              tenantId={tenant.id}
              booking={false}
              contact
              contactTitle="Drop us a line"
              contactBlurb="Questions about a service, a colour, or anything else? We would love to hear from you."
              contactCta="Send message"
              theme={{ card: "#ffffff", cardBorder: "rgba(0,0,0,0.1)", heading: INK, button: MINT, buttonText: INK, fieldBorder: "rgba(0,0,0,0.15)", radius: "1.5rem" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "It is not just about hair", PINK)}
        <section className="mx-auto max-w-3xl px-6 pb-24 pt-8 sm:px-8">
          {content.about ? (
            <p data-edit="content.about" className="text-2xl font-medium leading-[1.5] tracking-tight text-neutral-800 sm:text-3xl">{content.about}</p>
          ) : <p className="text-neutral-500">Our story is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Recent work", BLUE)}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-6 pb-24 pt-8 sm:px-8">
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-6 pb-24 pt-8 text-neutral-500 sm:px-8">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  return shell(
    <>
      {/* hero: light split, big photo + bold mixed-weight statement */}
      <section style={{ background: PAPER }}>
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-6 pb-16 pt-28 sm:px-8 sm:pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pb-24 lg:pt-40">
          <div className="overflow-hidden rounded-3xl bg-neutral-200">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/3] w-full object-cover lg:aspect-[5/6]" />
            ) : (
              <div className="aspect-[4/3] w-full lg:aspect-[5/6]" style={{ background: `linear-gradient(135deg, ${MINT}, ${BLUE})` }} />
            )}
          </div>
          <div>
            <h1 className="text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl" style={{ color: INK }}>
              {content.tagline ? (
                <span data-edit="content.tagline">{content.tagline}</span>
              ) : (
                <>A salon that puts <span style={{ background: MINT }} className="rounded-lg px-2">your hair</span> first.</>
              )}
            </h1>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a href={book} className="inline-flex rounded-full px-7 py-4 text-sm font-bold transition hover:opacity-85" style={{ background: MINT, color: INK, border: `1.5px solid ${INK}` }}>Book appointment</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border px-7 py-4 text-sm font-bold transition hover:bg-black/5" style={{ borderColor: INK, color: INK }}>See our services</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* playful card grid teasing the key areas (single venue) */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {groups.length > 0 && (
              <a href={href("services")} className="group relative overflow-hidden rounded-3xl bg-neutral-100 lg:col-span-2">
                {gallery[0] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img loading="lazy" decoding="async" src={gallery[0].image_url} alt="" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                ) : (
                  <div className="aspect-[16/10] w-full" style={{ background: `linear-gradient(135deg, ${PINK}, ${MINT})` }} />
                )}
                <span className="absolute left-4 top-4"><Chip color={MINT}>Services</Chip></span>
              </a>
            )}
            <a href={href("reservations")} className="group relative flex min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl p-7" style={{ background: PINK }}>
              <span className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>Book your visit</span>
              <span className="text-sm font-semibold" style={{ color: INK }}>Pick a time online &rarr;</span>
            </a>
            {gallery.length > 0 && (
              <a href={href("gallery")} className="group relative overflow-hidden rounded-3xl bg-neutral-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={(gallery[1] ?? gallery[0]).image_url} alt="" className="aspect-square w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
                <span className="absolute left-4 top-4"><Chip color={BLUE}>Gallery</Chip></span>
              </a>
            )}
            {content.about && (
              <a href={href("about")} className="group relative flex min-h-[14rem] flex-col justify-between overflow-hidden rounded-3xl p-7 lg:col-span-2" style={{ background: BLUE }}>
                <span className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>About us</span>
                <span className="text-sm font-semibold" style={{ color: INK }}>The people and the philosophy &rarr;</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* big statement intro */}
      {content.about && (
        <section style={{ background: PAPER }}>
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
            <p data-edit="content.about" className="text-3xl font-medium leading-[1.45] tracking-tight text-neutral-800 sm:text-4xl">{content.about}</p>
          </div>
        </section>
      )}

      {/* services teaser → links to full services page */}
      {featured.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-6 py-24 sm:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>
                <span className="rounded-lg px-2" style={{ background: MINT }}>Popular services</span>
              </h2>
              <a href={href("services")} className="text-sm font-bold transition hover:opacity-60" style={{ color: INK }}>See the full list &rarr;</a>
            </div>
            <div className="mt-12 grid gap-x-12 gap-y-5 md:grid-cols-2">
              {featured.map((item) => (
                <div key={item.id} className="flex items-baseline justify-between gap-4 border-b border-black/10 pb-5">
                  <div>
                    <p data-edit={`item:${item.id}:name`} className="text-lg font-bold" style={{ color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 max-w-md text-sm text-neutral-500">{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-lg font-bold" style={{ color: INK }}>{item.price}</span>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* stylists — rendered from site.team (edited in the dashboard) */}
      {team.length > 0 && (
        <section style={{ background: PAPER }}>
          <div className="mx-auto max-w-7xl px-6 py-24 sm:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>
              <span className="rounded-lg px-2" style={{ background: PINK }}>Our stylists</span>
            </h2>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((m) => (
                <div key={m.id}>
                  <div className="overflow-hidden rounded-2xl bg-neutral-200">
                    {m.photo_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="aspect-[4/5] w-full object-cover" />
                    ) : (
                      <div className="aspect-[4/5] w-full" style={{ background: `linear-gradient(135deg, ${BLUE}, ${MINT})` }} />
                    )}
                  </div>
                  <p data-edit={`team:${m.id}:name`} className="mt-4 text-lg font-bold" style={{ color: INK }}>{m.name}</p>
                  {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm text-neutral-500">{m.role}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing call to action band */}
      <section style={{ background: INK }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-7 px-6 py-20 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <h2 className="max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">Ready when you are.</h2>
          <a href={book} className="inline-flex rounded-full px-9 py-4 text-sm font-bold transition hover:opacity-85" style={{ background: MINT, color: INK }}>Book appointment</a>
        </div>
      </section>
    </>,
    false,
  );
}
