import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CellarHeader } from "./CellarHeader";
import { CellarBooking } from "./CellarBooking";

// Cellar — an intimate, candle-lit natural wine bar / enoteca (single venue),
// MULTI-PAGE: the nav opens real routes (Wine List / Reservations / Gallery /
// About / Contact) under basePath, never scroll anchors. Each page is its own
// layout; the sticky charcoal header and deep-plum footer are shared. Palette is
// baked from the brief: deep aubergine/plum, near-black charcoal, dusty rose,
// muted gold, oat. The tenant swaps in their own photography, copy, list, hours
// and address. Display type is a fine Fraunces serif, light tracking on dark —
// sophisticated, nocturnal, understated. Negative space and thin gold rules do
// the work; nothing shouts.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const PLUM = "#2A1B2E";
const CHARCOAL = "#1A1720";
const ROSE = "#C98F86";
const GOLD = "#B79653";
const OAT = "#E7DECF";

// A faint warm glow used behind the hero and accent moments — the single candle.
const GLOW = `radial-gradient(60% 70% at 50% 35%, ${ROSE}26 0%, transparent 60%)`;

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

export default function CellarDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Wine list", href: href("menu") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (deep plum, candle glow, thin gold rules) ----
  const footer = (
    <footer style={{ background: PLUM, backgroundImage: GLOW }} className="text-[#E7DECF]/85">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-9 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <a href={href("home")}>
              <span data-edit="tenant.business_name" style={{ ...serif, color: OAT }} className="text-3xl font-normal tracking-[0.03em]">{name}</span>
            </a>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-[1.9] text-[#E7DECF]/65">{content.tagline}</p>}
            {content.socials && content.socials.length > 0 && (
              <div className="mt-7 flex gap-5" style={{ color: ROSE }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#E7DECF]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>Visit</h4>
            <ul className="mt-5 space-y-3 text-sm text-[#E7DECF]/70">
              {([
                groups.length > 0 && { label: "Wine list", href: href("menu") },
                content.about && { label: "About", href: href("about") },
                gallery.length > 0 && { label: "Gallery", href: href("gallery") },
                bookingOn && { label: "Reservations", href: href("reservations") },
                { label: "Contact", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-[#C98F86]">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>Hours</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[#E7DECF]/70">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#E7DECF]/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[#E7DECF]/55">Open evenings.</p>}
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>Find us</h4>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-[1.8] text-[#E7DECF]/70">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[#E7DECF]/70">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#C98F86]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#C98F86]">{content.email}</a>}
            </div>
            <a href={book} className="mt-6 inline-flex border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.28em] transition hover:bg-[#B79653] hover:text-[#1A1720]" style={{ borderColor: GOLD, color: OAT }}>{bookingOn ? "Reserve" : "Get in touch"}</a>
          </div>
        </div>
      </div>
      <p className="border-t px-6 py-7 text-center text-[11px] tracking-[0.15em] text-[#E7DECF]/40 sm:px-9" style={{ borderColor: `${GOLD}26` }}>© {name} · An intimate wine bar</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <CellarHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Charcoal page banner with a thin gold rule + candle glow — clears the fixed
  // header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: CHARCOAL, backgroundImage: GLOW }} className="text-[#E7DECF]">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 sm:px-9 sm:pb-20 sm:pt-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: ROSE }}>{kicker}</p>
        <h1 style={serif} className="mt-4 text-5xl font-normal tracking-[0.01em] sm:text-6xl">{title}</h1>
        <div className="mt-7 h-px w-20" style={{ background: GOLD }} />
      </div>
    </section>
  );

  // ---- WINE LIST (menu) ----
  // Elegant "by the glass / by the bottle" treatment: clean hairline divider
  // rows, name on the left with region+grape as the descriptor, price right.
  if (page === "menu") {
    return shell(
      <>
        {banner("The list", "What we pour")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PLUM }}>
          <div className="mx-auto max-w-4xl">
          {groups.length > 0 ? (
            <>
              <div className="space-y-16">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-7 flex items-baseline gap-5">
                        <h2 style={{ ...serif, color: OAT }} className="text-2xl font-normal tracking-tight sm:text-3xl">{section.section}</h2>
                        <span className="h-px flex-1" style={{ background: `${GOLD}55` }} />
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-9 last:mb-0">
                        {catg.category && <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: ROSE }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${OAT}1f` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-[17px] font-normal text-[#E7DECF]" style={serif}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-[13px] italic leading-relaxed text-[#E7DECF]/55">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium tracking-wide" style={{ color: GOLD }}>{item.price}</span>
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
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.28em] transition hover:bg-[#B79653] hover:text-[#1A1720]" style={{ borderColor: GOLD, color: OAT }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-[#E7DECF]/55">Our list is being poured. Back soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Join us for the evening")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PLUM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-10 text-center text-[16px] leading-[1.9] text-[#E7DECF]/70">Tables are intimate and few. Choose an evening and we will hold a spot by candlelight. For parties of six or more, a quiet word by phone is best.</p>
            <CellarBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Find the door")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PLUM }}>
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#E7DECF]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg" style={{ ...serif, color: OAT }}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#C98F86]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#C98F86]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-9 max-w-xs space-y-2 border-t pt-7 text-sm text-[#E7DECF]/70" style={{ borderColor: `${GOLD}33` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#E7DECF]/45">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.28em] transition hover:bg-[#B79653] hover:text-[#1A1720]" style={{ borderColor: GOLD, color: OAT }}>Directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Write to us"
                  contactBlurb="A private evening, a special bottle, or simply hello — leave a note and we will reply soon."
                  contactCta="Send"
                  theme={{ card: CHARCOAL, cardBorder: `${GOLD}55`, heading: OAT, button: GOLD, buttonText: CHARCOAL, fieldBorder: "rgba(231,222,207,0.22)", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("About", "A small room, low light")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PLUM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[19px] leading-[2] text-[#E7DECF]/80" style={serif}>{content.about}</p> : <p className="text-[#E7DECF]/55">Our story is being written.</p>}
            {content.cuisine_type && (
              <>
                <div className="mt-14 h-px w-20" style={{ background: GOLD }} />
                <h3 style={{ ...serif, color: OAT }} className="mt-8 text-3xl font-normal tracking-tight">What we pour</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[16px] leading-[1.9] text-[#E7DECF]/70">{content.cuisine_type}</p>
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
        {banner("Gallery", "By candlelight")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: PLUM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-24 text-center text-[#E7DECF]/55" style={{ background: PLUM }}>Photographs coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* hero: moody nocturnal full-bleed, single warm glow, fine serif title,
          inline reservation row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: CHARCOAL }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${PLUM} 0%, ${CHARCOAL} 65%)` }} />
        )}
        {/* darkening + the single candle glow */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, ${CHARCOAL}cc 0%, ${CHARCOAL}66 40%, ${CHARCOAL}e6 100%)` }} />
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: `radial-gradient(50% 55% at 50% 42%, ${ROSE}30 0%, transparent 62%)` }} />
        <div className="relative z-10 mt-auto px-6 pb-12 pt-36 sm:px-9 sm:pb-16">
          <div className="mx-auto max-w-5xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.42em]" style={{ color: ROSE }}>An intimate wine bar</p>
            {content.tagline ? (
              <p data-edit="content.tagline" style={serif} className="mt-5 max-w-3xl text-4xl font-normal leading-[1.1] tracking-[0.01em] text-[#E7DECF] sm:text-6xl">{content.tagline}</p>
            ) : (
              <p style={serif} className="mt-5 max-w-3xl text-4xl font-normal leading-[1.1] tracking-[0.01em] text-[#E7DECF] sm:text-6xl">Low light, natural wine, and time slowed down.</p>
            )}
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#E7DECF]/70">Natural &amp; low-intervention bottles, a short plate menu, and a candle at every table.</p>
            {bookingOn ? (
              <div className="mt-9 max-w-3xl">
                <CellarBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-9 inline-flex border px-10 py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition hover:bg-[#B79653] hover:text-[#1A1720]" style={{ borderColor: GOLD, color: OAT }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* "what we pour" philosophy — deep plum, generous negative space */}
      <section style={{ background: PLUM, backgroundImage: GLOW }} className="text-[#E7DECF]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-9 sm:py-32">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: ROSE }}>What we pour</p>
          <div className="mx-auto mt-7 h-px w-16" style={{ background: GOLD }} />
          {content.about ? (
            <p data-edit="content.about" style={serif} className="mt-9 text-2xl font-normal leading-[1.6] tracking-[0.005em] text-[#E7DECF]/90 sm:text-[2rem] sm:leading-[1.55]">{content.about}</p>
          ) : (
            <p style={serif} className="mt-9 text-2xl font-normal leading-[1.6] text-[#E7DECF]/90 sm:text-[2rem] sm:leading-[1.55]">Growers we trust, bottles made with patience, and a list that changes as often as the season turns.</p>
          )}
          {content.about && (
            <a href={href("about")} className="mt-10 inline-flex border px-8 py-3 text-[11px] font-medium uppercase tracking-[0.28em] transition hover:bg-[#B79653] hover:text-[#1A1720]" style={{ borderColor: GOLD, color: OAT }}>Our story</a>
          )}
        </div>
      </section>

      {/* by the glass / by the bottle — a quiet preview of the list */}
      {featured.length > 0 && (
        <section style={{ background: CHARCOAL }} className="text-[#E7DECF]">
          <div className="mx-auto max-w-4xl px-6 py-20 sm:px-9 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: ROSE }}>From the list</p>
                <h2 style={{ ...serif, color: OAT }} className="mt-3 text-4xl font-normal tracking-tight sm:text-5xl">A few we love</h2>
              </div>
              <a href={href("menu")} className="text-[11px] font-medium uppercase tracking-[0.24em] transition hover:text-[#C98F86]" style={{ color: GOLD }}>The full list →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: `${OAT}1f` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-[17px] font-normal text-[#E7DECF]" style={serif}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-[13px] italic leading-relaxed text-[#E7DECF]/55">{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium tracking-wide" style={{ color: GOLD }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* gallery whisper — a single wide candlelit frame */}
      {gallery.length > 0 && (
        <section style={{ background: PLUM }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-9 sm:py-20">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {gallery.slice(0, 3).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={href("gallery")} className="inline-flex text-[11px] font-medium uppercase tracking-[0.28em] transition hover:text-[#C98F86]" style={{ color: GOLD }}>More by candlelight →</a>
            </div>
          </div>
        </section>
      )}

      {/* closing reserve band — charcoal with the glow, one quiet CTA */}
      <section style={{ background: CHARCOAL, backgroundImage: GLOW }} className="text-[#E7DECF]">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:px-9 sm:py-32">
          <h2 style={{ ...serif, color: OAT }} className="text-4xl font-normal leading-tight tracking-tight sm:text-5xl">Stay a while.</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-[#E7DECF]/70">A handful of tables, lit by candle. Reserve yours for the evening.</p>
          <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-medium uppercase tracking-[0.3em] transition hover:opacity-90" style={{ background: GOLD, color: CHARCOAL }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
        </div>
      </section>
    </>,
    false,
  );
}
