import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CrumbHeader } from "./CrumbHeader";
import { CrumbBooking } from "./CrumbBooking";

// Crumb — a warm artisan BAKERY identity, MULTI-PAGE: the nav opens real routes
// (Menu / Reservations / Gallery / About / Contact) under basePath, never scroll
// anchors. Each page is its own layout; the floating cream header and the warm
// footer are shared via shell(). The whole site is built on a soft flour-cream
// field — NOT a dark photo overlay — with light Fraunces display type, generous
// air, rounded soft cards and hand-drawn underline motifs. The tenant swaps in
// their own photography, copy, menu, hours, socials and contact details.
//
// Structural signature (shares nothing with Meadow's coral diner or Daybreak):
//  - hero: centered light serif over cream with a sketched underline, the
//    booking card sitting calmly below the headline (no full-bleed photo).
//  - "Fresh today": a horizontal scrolling rail of the morning's bakes.
//  - "From our bakers": a two-column heritage spread with a tall portrait image.
//  - menu: clean divider rows on cream paper, no cards, no dotted leaders.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const CREAM = "#F3E9D8";   // flour cream
const CRUST = "#C98A3C";   // golden crust
const INK = "#43342A";     // soft brown ink
const BERRY = "#9B3B54";   // jam berry
const PAPER = "#FBF6EC";   // lighter paper for raised cards

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

// Hand-drawn underline motif used beneath serif headings throughout.
function Sketch({ color = CRUST, className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 9" preserveAspectRatio="none" className={`h-[7px] w-full ${className}`} aria-hidden>
      <path d="M3 6 C 50 1, 150 1, 197 5" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

// Little wheat sprig, a recurring bakery ornament.
function Wheat({ color = CRUST }: { color?: string }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" aria-hidden>
      <path d="M12 22V8" />
      <path d="M12 8c0-2 1.6-3.6 3.5-3.6C15.5 6.4 13.9 8 12 8zM12 8c0-2-1.6-3.6-3.5-3.6C8.5 6.4 10.1 8 12 8z" />
      <path d="M12 13c0-1.7 1.5-3 3.2-3C15.2 11.7 13.7 13 12 13zM12 13c0-1.7-1.5-3-3.2-3C8.8 11.7 10.3 13 12 13z" />
      <path d="M12 18c0-1.6 1.4-2.8 3-2.8C15 16.8 13.6 18 12 18zM12 18c0-1.6-1.4-2.8-3-2.8C9 16.8 10.4 18 12 18z" />
    </svg>
  );
}

export default function CrumbDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "Our story", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reserve", href: href("reservations") },
    { label: "Visit", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (warm ink panel with wheat ornament + socials) ----
  const footer = (
    <footer style={{ background: INK }} className="text-[color:#F3E9D8]">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-8 sm:pt-20">
        <div className="flex flex-col items-center gap-3 border-b border-[color:#F3E9D8]/15 pb-12 text-center">
          <div className="opacity-80"><Wheat color={CREAM} /></div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={display} className="text-3xl font-light tracking-tight sm:text-4xl">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="max-w-md text-sm font-light leading-relaxed text-[color:#F3E9D8]/70">{content.tagline}</p>}
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#C98A3C]">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm font-light text-[color:#F3E9D8]/75">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "Our story", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Reserve a table", href: href("reservations") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[color:#F3E9D8]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#C98A3C]">Bakery hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm font-light text-[color:#F3E9D8]/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F3E9D8]/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm font-light text-[color:#F3E9D8]/60">Baked fresh, daily.</p>}
        </div>

        <div>
          <h4 className="text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#C98A3C]">Find us</h4>
          {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm font-light leading-relaxed text-[color:#F3E9D8]/75">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm font-light text-[color:#F3E9D8]/75">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#F3E9D8]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#F3E9D8]">{content.email}</a>}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4 text-[color:#F3E9D8]/85">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#C98A3C]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
      </div>
      <p className="border-t border-[color:#F3E9D8]/10 px-6 py-6 text-center text-xs font-light text-[color:#F3E9D8]/45 sm:px-8">© {name}. Baked with care.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" data-page={page}>
      <CrumbHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream page banner that clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: CREAM }}>
      <div className="mx-auto max-w-3xl px-6 pb-12 pt-36 text-center sm:px-8 sm:pb-16 sm:pt-44">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em]" style={{ color: BERRY }}>{kicker}</p>
        <h1 style={display} className="mt-4 text-4xl font-light leading-[1.05] text-[color:#43342A] sm:text-6xl">{title}</h1>
        <div className="mx-auto mt-4 w-40 sm:w-52"><Sketch /></div>
        {blurb && <p className="mx-auto mt-5 max-w-xl text-[15px] font-light leading-[1.8] text-[color:#43342A]/70">{blurb}</p>}
      </div>
    </section>
  );

  // ---- MENU — clean divider rows on cream paper (no cards, no dotted leaders) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Baked fresh this morning", "The day's bakes", "Sourdoughs proved overnight, viennoiserie laminated by hand, and the small sweet things we can't stop making.")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {groups.length > 0 ? (
              <>
                <div className="space-y-16">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-7 text-center">
                          <h2 style={display} className="text-3xl font-light tracking-tight text-[color:#43342A]">{section.section}</h2>
                          <div className="mx-auto mt-3 w-24"><Sketch /></div>
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-8 last:mb-0">
                          {catg.category && <p className="mb-3 text-center text-[11px] font-medium uppercase tracking-[0.26em] text-[color:#C98A3C]">{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${INK}22` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-lg font-light text-[color:#43342A]" style={display}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-sm font-light leading-relaxed text-[color:#43342A]/60">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-base font-light" style={{ ...display, color: BERRY }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:#F3E9D8] transition hover:opacity-90" style={{ background: INK }}>
                        {o.label}{o.commission_free ? " · no fees" : ""}
                      </a>
                    ))}
                  </div>
                )}

                {bookingOn && (
                  <div className="mt-14 text-center">
                    <a href={href("reservations")} className="inline-flex rounded-full border px-9 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:#43342A] transition hover:bg-[color:#43342A] hover:text-[color:#F3E9D8]" style={{ borderColor: INK }}>Reserve a table</a>
                  </div>
                )}
              </>
            ) : <p className="text-center font-light text-[color:#43342A]/60">Our bakes are coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Pull up a chair", "Reserve a table", "Mornings are our busiest, loveliest hours. Tell us when you'd like to come and we'll set a place at the bakery counter.")}
        <section className="px-6 pb-20 sm:px-8 sm:pb-28" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <CrumbBooking tenantId={tenant.id} name={name} />
            {content.phone && (
              <p className="mt-6 text-center text-sm font-light text-[color:#43342A]/65">
                Larger gathering? Call us on{" "}
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="underline decoration-[color:#C98A3C] decoration-2 underline-offset-4">{content.phone}</a>
                {" "}and we'll arrange it.
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
        {banner("Come and see us", "Visit the bakery", "We're easiest to find by the smell of warm bread. Here's how to reach us and where to knock.")}
        <section className="px-6 pb-20 sm:px-8 sm:pb-28" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="rounded-[2rem] border bg-[color:#FBF6EC] p-8 sm:p-10" style={{ borderColor: "#e2d3ba" }}>
                <div className="space-y-4 text-[15px] font-light leading-relaxed text-[color:#43342A]/80">
                  {content.address && <p data-edit="content.address" className="whitespace-pre-line text-xl font-light text-[color:#43342A]" style={display}>{content.address}</p>}
                  {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#9B3B54]">{content.phone}</a>}
                  {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#9B3B54]">{content.email}</a>}
                </div>
                {content.hours && content.hours.length > 0 && (
                  <ul className="mt-7 space-y-2 border-t pt-6 text-sm font-light text-[color:#43342A]/75" style={{ borderColor: `${INK}22` }}>
                    {content.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#43342A]/50">{h.open}</span></li>
                    ))}
                  </ul>
                )}
                {content.map_url && (
                  <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:#F3E9D8] transition hover:opacity-90" style={{ background: CRUST }}>Get directions</a>
                )}
              </div>
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Send us a note"
                  contactBlurb="A custom celebration cake, a big bread order or simply a hello — write to us here and we'll bake you a reply."
                  contactCta="Send your note"
                  theme={{ card: PAPER, cardBorder: "#e2d3ba", heading: INK, button: INK, buttonText: CREAM, fieldBorder: "#e2d3ba", radius: "1.25rem", font: "var(--font-fraunces)" }}
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
        {banner("From our bakers", "Our story")}
        <section className="px-6 pb-20 sm:px-8 sm:pb-28" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? (
              <p data-edit="content.about" style={display} className="text-2xl font-light leading-[1.6] text-[color:#43342A] sm:text-[1.7rem]">{content.about}</p>
            ) : <p className="font-light text-[color:#43342A]/60">Our story is rising. Check back soon.</p>}
            {content.cuisine_type && (
              <div className="mt-12">
                <h3 style={display} className="text-2xl font-light tracking-tight text-[color:#43342A]">What we bake</h3>
                <div className="mt-3 w-20"><Sketch /></div>
                <p data-edit="content.cuisine_type" className="mt-4 text-[16px] font-light leading-[1.8] text-[color:#43342A]/70">{content.cuisine_type}</p>
              </div>
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
        {banner("A peek at the bench", "Gallery")}
        {gallery.length > 0 ? (
          <section className="px-2 pb-2 sm:px-3 sm:pb-3" style={{ background: CREAM }}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-20 text-center font-light text-[color:#43342A]/60" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const freshToday = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 8);

  return shell(
    <>
      {/* HERO: centered light serif over a soft cream field (no dark photo) */}
      <section className="relative overflow-hidden" style={{ background: CREAM }}>
        {/* faint radial warmth + subtle wheat ornaments, never a photo overlay */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 70% at 50% 0%, ${PAPER} 0%, ${CREAM} 55%)` }} />
        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-40 text-center sm:px-8 sm:pb-24 sm:pt-48">
          <div className="flex items-center justify-center gap-3 text-[color:#C98A3C]">
            <Wheat />
            <p className="text-[11px] font-medium uppercase tracking-[0.36em]">Baked fresh this morning</p>
            <Wheat />
          </div>
          <h1 data-edit="tenant.business_name" style={display} className="mx-auto mt-7 max-w-3xl text-5xl font-light leading-[1.02] tracking-tight text-[color:#43342A] sm:text-7xl">
            {name}
          </h1>
          <div className="mx-auto mt-5 w-56 sm:w-72"><Sketch /></div>
          <p data-edit="content.tagline" className="mx-auto mt-7 max-w-xl text-[17px] font-light leading-[1.8] text-[color:#43342A]/70 sm:text-lg">
            {content.tagline ?? "A small neighbourhood bakery for slow-proved sourdough, buttery pastries and good strong coffee."}
          </p>

          {bookingOn ? (
            <div className="mx-auto mt-10 max-w-3xl text-left">
              <CrumbBooking tenantId={tenant.id} name={name} inline />
            </div>
          ) : (
            <div className="mt-10">
              <a href={book} className="inline-flex rounded-full px-10 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#F3E9D8] transition hover:opacity-90" style={{ background: INK }}>Get in touch</a>
            </div>
          )}
        </div>

        {/* optional hero photo sits BELOW the type as a wide rounded band */}
        {hero && (
          <div className="relative mx-auto max-w-6xl px-6 pb-20 sm:px-8 sm:pb-28">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-edit-image="hero" src={hero} alt="" className="aspect-[16/7] w-full rounded-[2.5rem] object-cover shadow-[0_50px_90px_-60px_rgba(67,52,42,0.6)]" />
          </div>
        )}
      </section>

      {/* FRESH TODAY: a horizontal rail of the morning's bakes */}
      {freshToday.length > 0 && (
        <section style={{ background: PAPER, borderColor: `${CRUST}40` }} className="border-y">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.3em]" style={{ color: BERRY }}>Fresh today</p>
                <h2 style={display} className="mt-3 text-4xl font-light tracking-tight text-[color:#43342A] sm:text-5xl">Out of the oven</h2>
                <div className="mt-3 w-28"><Sketch /></div>
              </div>
              {groups.length > 0 && (
                <a href={href("menu")} className="text-[11px] font-medium uppercase tracking-[0.2em] text-[color:#43342A]/70 transition hover:text-[color:#C98A3C]">See the full menu →</a>
              )}
            </div>

            {/* the rail itself: horizontal scroll of soft rounded cards */}
            <div className="mt-10 flex snap-x gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {freshToday.map((item, i) => {
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex w-[16rem] shrink-0 snap-start flex-col overflow-hidden rounded-[1.75rem] border bg-white transition hover:-translate-y-1" style={{ borderColor: "#e2d3ba" }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[5/4] w-full object-cover" />
                    ) : (
                      <div className="flex aspect-[5/4] w-full items-center justify-center" style={{ background: CREAM }}>
                        <Wheat color={CRUST} />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-light tracking-tight text-[color:#43342A]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-2 flex-1 text-sm font-light leading-relaxed text-[color:#43342A]/60">{item.description}</p>}
                      {item.price && <span data-edit={`item:${item.id}:price`} className="mt-4 text-sm font-light" style={{ ...display, color: BERRY }}>{item.price}</span>}
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* FROM OUR BAKERS: two-column heritage spread with a tall portrait image */}
      {content.about && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 sm:py-28 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <div className="relative order-last lg:order-first">
              {gallery[0]?.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt="" className="aspect-[3/4] w-full rounded-[2rem] object-cover shadow-[0_50px_90px_-60px_rgba(67,52,42,0.6)]" />
              ) : (
                <div className="flex aspect-[3/4] w-full items-center justify-center rounded-[2rem]" style={{ background: PAPER }}>
                  <Wheat color={CRUST} />
                </div>
              )}
              {/* a soft "since" stamp, hand-drawn feel */}
              <div className="absolute -right-3 -top-3 flex h-20 w-20 flex-col items-center justify-center rounded-full text-center sm:-right-5 sm:-top-5 sm:h-24 sm:w-24" style={{ background: BERRY, color: CREAM }}>
                <span className="text-[9px] font-medium uppercase tracking-[0.18em] opacity-80">Baked</span>
                <span style={display} className="text-base font-light leading-none">daily</span>
              </div>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.3em]" style={{ color: BERRY }}>From our bakers</p>
              <h2 style={display} className="mt-4 text-4xl font-light leading-[1.1] tracking-tight text-[color:#43342A] sm:text-5xl">A loaf takes time, and we have plenty of it</h2>
              <div className="mt-4 w-32"><Sketch /></div>
              <p data-edit="content.about" className="mt-6 text-[16px] font-light leading-[1.9] text-[color:#43342A]/75">{content.about}</p>
              <a href={href("about")} className="mt-8 inline-flex rounded-full border px-8 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:#43342A] transition hover:bg-[color:#43342A] hover:text-[color:#F3E9D8]" style={{ borderColor: INK }}>Read our story</a>
            </div>
          </div>
        </section>
      )}

      {/* QUIET CTA band: warm crust strip inviting a reservation */}
      <section style={{ background: CRUST }} className="text-[color:#43342A]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
          <div className="flex justify-center text-[color:#43342A]/70"><Wheat color={INK} /></div>
          <h2 style={display} className="mt-5 text-4xl font-light leading-[1.1] tracking-tight sm:text-5xl">Warm bread is best shared</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] font-light leading-relaxed text-[color:#43342A]/80">{bookingOn ? "Save a spot at the counter for a slow weekend breakfast." : "We'd love to bake for your next gathering."}</p>
          <a href={book} className="mt-8 inline-flex rounded-full px-10 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#F3E9D8] transition hover:opacity-90" style={{ background: INK }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
        </div>
      </section>

      {/* QUICK INFO: hours + find us on cream paper */}
      <section style={{ background: PAPER }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.24em]" style={{ color: BERRY }}>Bakery hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm font-light text-[color:#43342A]/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#43342A]/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm font-light text-[color:#43342A]/60">Baked fresh, daily.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.24em]" style={{ color: BERRY }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm font-light leading-relaxed text-[color:#43342A]/75">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm font-light text-[color:#43342A]/75">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#9B3B54]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#9B3B54]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border px-6 py-2.5 text-[11px] font-medium uppercase tracking-[0.2em] text-[color:#43342A] transition hover:bg-[color:#43342A] hover:text-[color:#F3E9D8]" style={{ borderColor: INK }}>Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-medium uppercase tracking-[0.24em]" style={{ color: BERRY }}>{bookingOn ? "Reserve" : "Get in touch"}</h3>
            <p className="mt-5 text-sm font-light text-[color:#43342A]/75">{bookingOn ? "Save a table for a leisurely bakery breakfast." : "Drop us a line any time."}</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-[11px] font-medium uppercase tracking-[0.22em] text-[color:#F3E9D8] transition hover:opacity-90" style={{ background: BERRY }}>{bookingOn ? "Reserve a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
