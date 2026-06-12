import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AgaveHeader } from "./AgaveHeader";
import { AgaveBooking } from "./AgaveBooking";

// Agave — a vibrant Mexican cantina / taquería (single venue), MULTI-PAGE: the
// nav opens real routes (Menu / Reservations / Gallery / About / Contact) under
// basePath, never scroll anchors. Each page is its own layout; the sticky cream
// header and deep-ink footer are shared. The identity is baked: a warm,
// sun-soaked hero with playful arches and a bold stacked headline, then vivid
// colour BLOCKS that alternate terracotta / teal / sunflower section to section,
// a "taquería" divider-row menu with chilli-heat tags, and papel-picado banners.
// The tenant swaps in their own photography, copy, menu, hours and address.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const TERRACOTTA = "#C9542A";
const TEAL = "#1F7A6D";
const SUNFLOWER = "#F2A93B";
const CREAM = "#FBF1E2";
const INK = "#221A14";

// Alternating vivid block tints — the structural signature of this design.
const BLOCK_TINTS = [TERRACOTTA, TEAL, SUNFLOWER];

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

// Papel-picado banner — a row of cut-paper bunting flags drawn with pure CSS.
function PapelPicado({ colors = [SUNFLOWER, TEAL, CREAM, TERRACOTTA] }: { colors?: string[] }) {
  const flags = Array.from({ length: 16 });
  return (
    <div aria-hidden className="flex w-full items-start justify-center overflow-hidden">
      {flags.map((_, i) => (
        <span
          key={i}
          className="h-4 flex-1"
          style={{
            background: colors[i % colors.length],
            clipPath: "polygon(0 0, 100% 0, 100% 55%, 50% 100%, 0 55%)",
            opacity: 0.95,
          }}
        />
      ))}
    </div>
  );
}

// A small chilli-heat tag for the taquería menu, derived deterministically from
// the item id so it stays stable without extra data.
function heatFor(id: string): number {
  let sum = 0;
  for (let i = 0; i < id.length; i++) sum += id.charCodeAt(i);
  return sum % 4; // 0..3
}
function HeatTag({ level }: { level: number }) {
  if (level <= 0) return null;
  return (
    <span aria-label={`${level} chilli heat`} className="ml-2 inline-flex translate-y-[-1px] gap-0.5 align-middle">
      {Array.from({ length: level }).map((_, i) => (
        <span key={i} aria-hidden className="text-[11px]" style={{ color: TERRACOTTA }}>🌶</span>
      ))}
    </span>
  );
}

export default function AgaveDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Reserve", href: href("reservations") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "Our story", href: href("about") },
    { label: "Visit", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (deep ink, papel-picado top, sunflower CTA panel) ----
  const footer = (
    <footer style={{ background: INK }} className="text-[color:#FBF1E2]/85">
      <PapelPicado />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-6 w-6 rotate-45 rounded-[5px]" style={{ background: SUNFLOWER }} />
            <span data-edit="tenant.business_name" style={{ ...display, color: SUNFLOWER }} className="text-3xl font-semibold">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[color:#FBF1E2]/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUNFLOWER }}>Follow the fiesta</h4>
              <div className="mt-4 flex gap-4 text-[color:#FBF1E2]">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUNFLOWER }}>Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-[color:#FBF1E2]/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              bookingOn && { label: "Reserve a table", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "Our story", href: href("about") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-[color:#FBF1E2]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUNFLOWER }}>Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[color:#FBF1E2]/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#FBF1E2]/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-[color:#FBF1E2]/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[color:#FBF1E2]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-[color:#FBF1E2]/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#FBF1E2]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#FBF1E2]">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: an arched sunflower card with a real button */}
        <div className="overflow-hidden rounded-t-[6rem] rounded-b-[1.75rem] px-7 py-9" style={{ background: SUNFLOWER, color: INK }}>
          <h4 style={display} className="text-3xl font-semibold leading-tight">Hambre?</h4>
          <p className="mt-2 text-sm leading-relaxed opacity-90">Pull up a chair. Tacos, margaritas and a whole lot of sunshine are waiting.</p>
          <a href={book} className="mt-6 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: TERRACOTTA }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-[color:#FBF1E2]/50 sm:px-8">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <AgaveHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Vivid arched page banner that clears the fixed header on sub-pages. The tint
  // rotates so each page leads with a different fiesta colour.
  const banner = (kicker: string, title: string, tint: string = TERRACOTTA) => {
    const onTeal = tint === TEAL;
    const fg = onTeal ? CREAM : INK;
    return (
      <section style={{ background: tint }} className="relative overflow-hidden">
        <PapelPicado colors={[CREAM, SUNFLOWER, TEAL === tint ? TERRACOTTA : TEAL, CREAM]} />
        {/* faint arch motif */}
        <div aria-hidden className="pointer-events-none absolute -right-16 -top-10 h-72 w-72 rounded-full opacity-15" style={{ border: `3px solid ${fg}` }} />
        <div className="mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-8 sm:pb-18 sm:pt-36" style={{ color: fg }}>
          <p className="text-xs font-bold uppercase tracking-[0.26em] opacity-75">{kicker}</p>
          <h1 style={display} className="mt-3 text-5xl font-semibold leading-[0.95] sm:text-7xl">{title}</h1>
        </div>
      </section>
    );
  };

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("La carta", "The taquería", TERRACOTTA)}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
            {groups.length > 0 ? (
              <>
                <p className="mb-10 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[color:#221A14]/55">
                  <span aria-hidden>🌶</span> = heat level, building from mild to fiery
                </p>
                <div className="grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
                  {groups.map((section, si) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-5">
                          <span style={{ ...display, background: BLOCK_TINTS[si % BLOCK_TINTS.length], color: BLOCK_TINTS[si % BLOCK_TINTS.length] === TEAL ? CREAM : INK }} className="inline-block rounded-full px-5 py-1.5 text-lg font-semibold">{section.section}</span>
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-6">
                          {catg.category && <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${INK}1f` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                                <div className="min-w-0">
                                  <p className="text-base font-medium text-[color:#221A14]" style={display}>
                                    <span data-edit={`item:${item.id}:name`}>{item.name}</span>
                                    <HeatTag level={heatFor(item.id)} />
                                  </p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#221A14]/60">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: TERRACOTTA }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: TEAL }}>{o.label}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="text-[color:#221A14]/60">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservaciones", "Save a table", TEAL)}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-[color:#221A14]/75">Tell us the day, the time and how many — we will save you a spot. For big groups of 8 or more, give us a call and we will sort the whole fiesta.</p>
            <AgaveBooking tenantId={tenant.id} name={name} />
            {content.phone && (
              <p className="mt-7 text-center text-sm text-[color:#221A14]/65">
                Rather call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-bold underline" style={{ color: TERRACOTTA }}>{content.phone}</a>
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
        {banner("Encuéntranos", "Come visit", SUNFLOWER)}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#221A14]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-semibold text-[color:#221A14]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#C9542A]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#C9542A]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-[color:#221A14]/75" style={{ borderColor: `${TEAL}40` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#221A14]/50">{h.open}</span></li>
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
                  contactTitle="Say hola"
                  contactBlurb="A question, a big celebration or a bit of feedback? Drop us a line and we will get right back to you."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: SUNFLOWER, heading: TERRACOTTA, blurb: "#6b5b4a", label: INK, fieldBorder: "#e7d6bb", fieldText: INK, button: TERRACOTTA, buttonText: "#ffffff", radius: "1.5rem", font: "var(--font-fraunces)" }}
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
        {banner("Nuestra historia", "Hecho con cariño", TEAL)}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-[color:#221A14]/80">{content.about}</p> : <p className="text-[color:#221A14]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={{ ...display, color: TERRACOTTA }} className="mt-12 text-3xl font-semibold">From our kitchen</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-[color:#221A14]/75">{content.cuisine_type}</p>
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
        {banner("Un vistazo", "Gallery", SUNFLOWER)}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className={`aspect-[4/3] w-full object-cover ${i % 5 === 0 ? "rounded-t-[3rem] rounded-b-2xl" : "rounded-2xl"}`} />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#221A14]/60" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* hero: full-bleed sun-soaked photo, playful arch frame, bold stacked headline, inline booking */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: TERRACOTTA }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${SUNFLOWER}, ${TERRACOTTA} 60%, ${TEAL})` }} />
        )}
        {/* warm sunshine wash + bottom darkening for legibility */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(34,26,20,0.28) 0%, rgba(34,26,20,0.05) 35%, rgba(34,26,20,0.55) 100%)" }} />
        <div className="pointer-events-none absolute inset-0 mix-blend-soft-light" style={{ background: `radial-gradient(120% 80% at 80% 0%, ${SUNFLOWER}66, transparent 60%)` }} />
        {/* giant arch outline motif */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-[18%] hidden h-[60vh] w-[44vw] -translate-x-1/2 rounded-t-full border-[3px] opacity-25 sm:block" style={{ borderColor: CREAM }} />

        <div className="relative z-10 pt-4">
          <PapelPicado />
        </div>

        <div className="relative z-10 mt-auto px-6 pb-10 pt-24 sm:px-8 sm:pb-14">
          <div className="mx-auto max-w-5xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[color:#FBF1E2] [text-shadow:0_1px_10px_rgba(0,0,0,0.5)]">Cantina · Taquería</p>
            {content.tagline ? (
              <h1 data-edit="content.tagline" style={display} className="mt-3 max-w-3xl text-5xl font-semibold uppercase leading-[0.92] text-[color:#FBF1E2] [text-shadow:0_3px_28px_rgba(0,0,0,0.5)] sm:text-7xl">{content.tagline}</h1>
            ) : (
              <h1 style={display} className="mt-3 max-w-3xl text-5xl font-semibold uppercase leading-[0.92] text-[color:#FBF1E2] [text-shadow:0_3px_28px_rgba(0,0,0,0.5)] sm:text-7xl">{name}</h1>
            )}
            <p className="mt-4 max-w-xl text-base text-[color:#FBF1E2]/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)] sm:text-lg">Tacos al pastor, fresh margaritas and fiesta energy from open till late.</p>
            {bookingOn ? (
              <div className="mt-7 max-w-3xl">
                <AgaveBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-7 inline-flex rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: TEAL }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* BLOCK 1 — teal: about, big stacked headline + arch-framed note */}
      <section style={{ background: TEAL }} className="relative overflow-hidden text-[color:#FBF1E2]">
        <div aria-hidden className="pointer-events-none absolute -left-20 bottom-0 h-80 w-80 rounded-full opacity-10" style={{ border: `4px solid ${CREAM}` }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: SUNFLOWER }}>Bienvenidos</p>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-6xl font-semibold uppercase leading-[0.9] sm:text-7xl">Come hungry<br />leave dancing</h2>
            {content.about && <p data-edit="content.about" className="text-[17px] leading-[1.85] text-[color:#FBF1E2]/90">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: SUNFLOWER, color: INK }}>Our story</a>
          )}
        </div>
      </section>

      {/* BLOCK 2 — cream: featured dishes as arched cards over rotating tints */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: TERRACOTTA }}>Del menú</p>
                <h2 style={display} className="mt-2 text-4xl font-semibold uppercase leading-[0.95] text-[color:#221A14] sm:text-5xl">House favourites</h2>
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-bold uppercase tracking-[0.16em] transition hover:opacity-60" style={{ color: TEAL }}>See the full menu →</a>}
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const tint = BLOCK_TINTS[i % BLOCK_TINTS.length];
                const onTeal = tint === TEAL;
                const fg = onTeal ? CREAM : INK;
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden rounded-t-[3.5rem] rounded-b-[1.5rem] shadow-sm transition hover:-translate-y-1 hover:shadow-lg" style={{ background: tint }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="aspect-[4/3] w-full" style={{ background: `linear-gradient(160deg, ${SUNFLOWER}, ${tint})` }} />
                    )}
                    <div className="flex flex-1 flex-col p-6" style={{ color: fg }}>
                      <h3 style={display} className="text-xl font-semibold">
                        <span data-edit={`item:${item.id}:name`}>{item.name}</span>
                        <HeatTag level={heatFor(item.id)} />
                      </h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed" style={{ color: fg, opacity: 0.85 }}>{item.description}</p>}
                      <span className="mt-5 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2 text-xs font-bold uppercase tracking-[0.14em] text-[color:#221A14] transition group-hover:opacity-90">See the menu</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* BLOCK 3 — sunflower: arched CTA panel */}
      <section style={{ background: SUNFLOWER }} className="relative overflow-hidden">
        <PapelPicado colors={[TERRACOTTA, CREAM, TEAL, CREAM]} />
        <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl overflow-hidden rounded-t-[5rem] rounded-b-[1.75rem] bg-[color:#FBF1E2] px-8 py-12">
            <h2 style={display} className="text-5xl font-semibold uppercase leading-[0.95] text-[color:#C9542A] sm:text-6xl">Let&apos;s fiesta</h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[color:#221A14]/70">Tacos, margs and good times</p>
            <a href={book} className="mt-7 inline-flex rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: TEAL }}>{bookingOn ? "Reserve your table" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* BLOCK 4 — deep ink: quick info band */}
      <section style={{ background: INK }} className="text-[color:#FBF1E2]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUNFLOWER }}>Hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#FBF1E2]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#FBF1E2]/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#FBF1E2]/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUNFLOWER }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[color:#FBF1E2]/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[color:#FBF1E2]/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#FBF1E2]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#FBF1E2]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition hover:opacity-80" style={{ borderColor: `${CREAM}80`, color: CREAM }}>Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SUNFLOWER }}>Reserve</h3>
            <p className="mt-5 text-sm text-[color:#FBF1E2]/80">Save a table in seconds — any night of the week.</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: TERRACOTTA }}>{bookingOn ? "Reserve a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
