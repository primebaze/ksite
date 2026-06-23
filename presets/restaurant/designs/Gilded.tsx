import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { GildedHeader } from "./GildedHeader";
import { GildedBooking } from "./GildedBooking";

// Gilded — a glamorous art-deco COCKTAIL BAR / lounge (single venue),
// MULTI-PAGE: the nav opens real routes (The List / Reservations / Gallery /
// About / Contact) under basePath, never scroll anchors. Each page is its own
// layout; the sticky near-black header and deco footer are shared. Palette is
// baked from the brief: near-black midnight, ink-teal, champagne gold, blush,
// ivory. The tenant swaps in their own photography, copy, list, hours and
// address. Structural signature: a black hero with gold deco linework — a
// sunburst frame, symmetric fans and chevrons — a high-tracking serif title, a
// "signature serves" cocktail feature, a deco-framed list, gold geometric
// dividers and fluted column motifs. Speakeasy glamour, midnight, nocturnal.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const BLACK = "#0E0E10";
const TEAL = "#103A36";
const GOLD = "#CBA14B";
const BLUSH = "#D9A9A0";
const IVORY = "#EFE7D6";

// Slightly raised midnight panel for inner sections (one tone above pure black).
const PANEL = "#16161A";

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

// ---- Art-deco geometry primitives (the unique structural signature) ----

// A symmetric gold divider: a centred diamond between two chevron-tipped rules.
function DecoDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <svg width="34" height="14" viewBox="0 0 34 14" fill="none">
        <path d="M17 0 L23 7 L17 14 L11 7 Z" stroke={GOLD} strokeWidth="1" />
        <path d="M17 4 L20 7 L17 10 L14 7 Z" fill={GOLD} />
      </svg>
      <span className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

// A radiating sunburst frame used behind the hero title — fine gold rays from a
// point, the speakeasy glamour signature.
function Sunburst({ className = "" }: { className?: string }) {
  const rays = Array.from({ length: 24 });
  return (
    <svg viewBox="0 0 400 400" className={className} fill="none" aria-hidden>
      {rays.map((_, i) => {
        const a = (i / rays.length) * Math.PI * 2;
        return (
          <line
            key={i}
            x1={200}
            y1={200}
            x2={200 + Math.cos(a) * 320}
            y2={200 + Math.sin(a) * 320}
            stroke={GOLD}
            strokeWidth={i % 2 === 0 ? 1 : 0.4}
          />
        );
      })}
      <circle cx={200} cy={200} r={70} stroke={GOLD} strokeWidth="1.2" />
      <circle cx={200} cy={200} r={82} stroke={GOLD} strokeWidth="0.5" />
    </svg>
  );
}

// Stacked deco fan (quarter-arcs) used as a corner / accent motif.
function Fan({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      {[110, 86, 62, 38].map((r, i) => (
        <path key={r} d={`M0 ${120 - r} A ${r} ${r} 0 0 1 ${r} 120`} stroke={GOLD} strokeWidth={i === 0 ? 1.2 : 0.7} />
      ))}
    </svg>
  );
}

// A thin fluted-column rule (vertical gold lines) — a column motif divider.
function Fluting({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 8" preserveAspectRatio="none" className={className} aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={i} x1={i * 5} y1={0} x2={i * 5} y2={8} stroke={GOLD} strokeWidth="0.6" />
      ))}
    </svg>
  );
}

export default function GildedDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "The list", href: href("menu") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (near-black, gold fluting + deco rules) ----
  const footer = (
    <footer style={{ background: BLACK }} className="text-[#EFE7D6]/85">
      <Fluting className="h-2 w-full opacity-50" />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-9 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div>
            <a href={href("home")} className="flex items-center gap-3">
              <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden><path d="M5 0 L10 5 L5 10 L0 5 Z" fill={GOLD} /></svg>
              <span data-edit="tenant.business_name" style={{ ...serif, color: IVORY }} className="text-2xl font-normal uppercase tracking-[0.18em]">{name}</span>
            </a>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-[1.9] text-[#EFE7D6]/60">{content.tagline}</p>}
            {content.socials && content.socials.length > 0 && (
              <div className="mt-7 flex gap-5" style={{ color: GOLD }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#D9A9A0]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.34em]" style={{ color: GOLD }}>Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-[#EFE7D6]/70">
              {([
                groups.length > 0 && { label: "The list", href: href("menu") },
                content.about && { label: "About", href: href("about") },
                gallery.length > 0 && { label: "Gallery", href: href("gallery") },
                bookingOn && { label: "Reservations", href: href("reservations") },
                { label: "Contact", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-[#CBA14B]">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.34em]" style={{ color: GOLD }}>Hours</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[#EFE7D6]/70">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#EFE7D6]/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[#EFE7D6]/55">Open evenings.</p>}
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.34em]" style={{ color: GOLD }}>Find us</h4>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-[1.8] text-[#EFE7D6]/70">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[#EFE7D6]/70">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#CBA14B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#CBA14B]">{content.email}</a>}
            </div>
            <a href={book} className="mt-6 inline-flex px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.28em] transition hover:brightness-110" style={{ background: GOLD, color: BLACK }}>{bookingOn ? "Reserve" : "Get in touch"}</a>
          </div>
        </div>
      </div>
      <p className="border-t px-6 py-7 text-center text-[11px] uppercase tracking-[0.28em] text-[#EFE7D6]/40 sm:px-9" style={{ borderColor: `${GOLD}33` }}>© {name} · After dark</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body">
      <GildedHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Black deco page banner with a sunburst whisper + gold divider — clears the
  // fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden text-[#EFE7D6]" style={{ background: BLACK }}>
      <Sunburst className="pointer-events-none absolute -right-24 -top-24 h-[26rem] w-[26rem] opacity-[0.12]" />
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-32 text-center sm:px-9 sm:pb-20 sm:pt-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.44em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mt-5 text-5xl font-normal uppercase tracking-[0.08em] sm:text-6xl">{title}</h1>
        <DecoDivider className="mt-8" />
      </div>
    </section>
  );

  // ---- THE LIST (menu) ----
  // Deco-framed cocktail list: clean hairline divider rows — drink name + the
  // ingredients as the descriptor, price right in gold. No dotted leaders.
  if (page === "menu") {
    return shell(
      <>
        {banner("The list", "Cocktails & cellar")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PANEL }}>
          <div className="mx-auto max-w-4xl">
          {groups.length > 0 ? (
            <>
              <div className="space-y-16">
                {groups.map((section) => (
                  <div key={section.section} className="relative break-inside-avoid border p-7 sm:p-10" style={{ borderColor: `${GOLD}40`, background: BLACK }}>
                    {/* deco corner fans frame each section panel */}
                    <Fan className="pointer-events-none absolute left-2 top-2 h-10 w-10 rotate-180 opacity-40" />
                    <Fan className="pointer-events-none absolute bottom-2 right-2 h-10 w-10 opacity-40" />
                    {section.section && (
                      <div className="mb-8 text-center">
                        <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: IVORY }} className="text-2xl font-normal uppercase tracking-[0.14em] sm:text-3xl">{section.section}</h2>
                        <DecoDivider className="mt-4" />
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-9 last:mb-0">
                        {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.34em]" style={{ color: BLUSH }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${GOLD}24` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-[17px] font-normal uppercase tracking-[0.08em] text-[#EFE7D6]" style={serif}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-[13px] leading-relaxed text-[#EFE7D6]/55">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium tracking-[0.1em]" style={{ color: GOLD }}>{item.price}</span>
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
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] transition hover:brightness-110" style={{ background: GOLD, color: BLACK }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-center text-[#EFE7D6]/55">The list is being shaken. Back soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Reserve a table")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PANEL }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-10 text-center text-[16px] leading-[1.9] text-[#EFE7D6]/70">Booths are few and the evenings are long. Choose a night and we will hold a place beneath the gilt. For parties of seven or more, a word by telephone is best.</p>
            <GildedBooking tenantId={tenant.id} name={name} />
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
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PANEL }}>
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#EFE7D6]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg" style={{ ...serif, color: IVORY }}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#CBA14B]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#CBA14B]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-9 max-w-xs space-y-2 border-t pt-7 text-sm text-[#EFE7D6]/70" style={{ borderColor: `${GOLD}33` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#EFE7D6]/45">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.26em] transition hover:brightness-110" style={{ background: GOLD, color: BLACK }}>Directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Send word"
                  contactBlurb="A private booth, a celebration, or simply to say hello — leave a note and we will reply by candlelight."
                  contactCta="Send"
                  theme={{ card: BLACK, cardBorder: `${GOLD}55`, heading: IVORY, button: GOLD, buttonText: BLACK, fieldBorder: "rgba(203,161,75,0.34)", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("About", "After midnight")}
        <section className="px-6 py-16 sm:px-9 sm:py-24" style={{ background: PANEL }}>
          <div className="mx-auto max-w-3xl text-center">
            {content.about ? <p data-edit="content.about" className="text-[19px] leading-[2] text-[#EFE7D6]/80" style={serif}>{content.about}</p> : <p className="text-[#EFE7D6]/55">Our story is being written.</p>}
            {content.cuisine_type && (
              <>
                <DecoDivider className="mt-14" />
                <h3 style={{ ...serif, color: IVORY }} className="mt-8 text-3xl font-normal uppercase tracking-[0.1em]">What we pour</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[16px] leading-[1.9] text-[#EFE7D6]/70">{content.cuisine_type}</p>
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
        {banner("Gallery", "The room")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: PANEL }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-24 text-center text-[#EFE7D6]/55" style={{ background: PANEL }}>Photographs coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const signatures = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* hero: midnight full-bleed, sunburst frame + deco fans, high-tracking
          serif title, inline reservation row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: BLACK }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 120% at 50% 0%, ${TEAL} 0%, ${BLACK} 60%)` }} />
        )}
        {/* darkening so gold linework reads */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(to bottom, ${BLACK}d9 0%, ${BLACK}73 38%, ${BLACK}f2 100%)` }} />
        {/* the sunburst frame behind the title + symmetric corner fans */}
        <Sunburst className="pointer-events-none absolute left-1/2 top-[38%] h-[44rem] w-[44rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.16]" />
        <Fan className="pointer-events-none absolute left-4 top-24 h-24 w-24 rotate-180 opacity-50 sm:left-9" />
        <Fan className="pointer-events-none absolute bottom-40 right-4 h-24 w-24 opacity-50 sm:right-9" />

        <div className="relative z-10 mt-auto px-6 pb-12 pt-36 text-center sm:px-9 sm:pb-16">
          <div className="mx-auto max-w-4xl">
            <p className="text-[11px] font-medium uppercase tracking-[0.46em]" style={{ color: GOLD }}>An art-deco cocktail lounge</p>
            {content.tagline ? (
              <p data-edit="content.tagline" style={serif} className="mx-auto mt-6 max-w-3xl text-4xl font-normal uppercase leading-[1.05] tracking-[0.08em] text-[#EFE7D6] sm:text-6xl">{content.tagline}</p>
            ) : (
              <p style={serif} className="mx-auto mt-6 max-w-3xl text-4xl font-normal uppercase leading-[1.05] tracking-[0.08em] text-[#EFE7D6] sm:text-6xl">Gilded nights, low light, exquisite serves.</p>
            )}
            <DecoDivider className="mt-7" />
            <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-[#EFE7D6]/70">Vintage spirits, theatrical serves and a long brass bar — open from dusk until the small hours.</p>
            {bookingOn ? (
              <div className="mx-auto mt-9 max-w-3xl text-left">
                <GildedBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] transition hover:brightness-110" style={{ background: GOLD, color: BLACK }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* "the philosophy" — ink-teal band, generous negative space, fluting */}
      <section style={{ background: TEAL }} className="relative overflow-hidden text-[#EFE7D6]">
        <Fluting className="absolute inset-x-0 top-0 h-2 w-full opacity-40" />
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-9 sm:py-32">
          <p className="text-[11px] font-medium uppercase tracking-[0.44em]" style={{ color: GOLD }}>The art of the serve</p>
          <DecoDivider className="mt-6" />
          {content.about ? (
            <p data-edit="content.about" style={serif} className="mt-9 text-2xl font-normal leading-[1.6] tracking-[0.01em] text-[#EFE7D6]/90 sm:text-[2rem] sm:leading-[1.55]">{content.about}</p>
          ) : (
            <p style={serif} className="mt-9 text-2xl font-normal leading-[1.6] text-[#EFE7D6]/90 sm:text-[2rem] sm:leading-[1.55]">Every glass is built with intent — rare spirits, house cordials, and a flourish of theatre at the bar.</p>
          )}
          {content.about && (
            <a href={href("about")} className="mt-10 inline-flex border px-8 py-3 text-[11px] font-medium uppercase tracking-[0.28em] transition hover:bg-[#CBA14B] hover:text-[#0E0E10]" style={{ borderColor: GOLD, color: IVORY }}>Our story</a>
          )}
        </div>
      </section>

      {/* SIGNATURE SERVES — the cocktail feature: three deco cards on black */}
      {signatures.length > 0 && (
        <section style={{ background: BLACK }} className="text-[#EFE7D6]">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-9 sm:py-28">
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.44em]" style={{ color: BLUSH }}>Signature serves</p>
              <h2 style={{ ...serif, color: IVORY }} className="mt-3 text-4xl font-normal uppercase tracking-[0.1em] sm:text-5xl">From the bar</h2>
              <DecoDivider className="mt-6" />
            </div>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {signatures.map((item, i) => {
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group relative flex flex-col overflow-hidden border transition hover:-translate-y-1" style={{ borderColor: `${GOLD}55`, background: PANEL }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/5] w-full object-cover opacity-85 transition group-hover:opacity-100" />
                    ) : (
                      <div className="relative aspect-[4/5] w-full" style={{ background: `radial-gradient(120% 120% at 50% 0%, ${TEAL} 0%, ${BLACK} 70%)` }}>
                        <Sunburst className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 opacity-20" />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6 text-center">
                      <span className="text-[10px] font-medium uppercase tracking-[0.3em]" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${item.id}:name`} style={{ ...serif, color: IVORY }} className="mt-2 text-xl font-normal uppercase tracking-[0.08em]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[#EFE7D6]/60">{item.description}</p>}
                      {item.price && <span data-edit={`item:${item.id}:price`} className="mt-4 text-sm font-medium tracking-[0.1em]" style={{ color: GOLD }}>{item.price}</span>}
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-12 text-center">
                <a href={href("menu")} className="inline-flex px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.28em] transition hover:brightness-110" style={{ background: GOLD, color: BLACK }}>The full list</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* deco-framed list preview — ink-teal, hairline rows */}
      {featured.length > 0 && (
        <section style={{ background: TEAL }} className="text-[#EFE7D6]">
          <div className="mx-auto max-w-4xl px-6 py-20 sm:px-9 sm:py-28">
            <div className="border p-7 sm:p-12" style={{ borderColor: `${GOLD}40`, background: `${BLACK}66` }}>
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: GOLD }}>A taste of the list</p>
                  <h2 style={{ ...serif, color: IVORY }} className="mt-3 text-3xl font-normal uppercase tracking-[0.08em] sm:text-4xl">Tonight we pour</h2>
                </div>
                <a href={href("menu")} className="text-[11px] font-medium uppercase tracking-[0.24em] transition hover:text-[#D9A9A0]" style={{ color: GOLD }}>The full list →</a>
              </div>
              <ul className="mt-10 divide-y" style={{ borderColor: `${GOLD}24` }}>
                {featured.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                    <div className="min-w-0">
                      <p data-edit={`item:${item.id}:name`} className="text-[17px] font-normal uppercase tracking-[0.08em] text-[#EFE7D6]" style={serif}>{item.name}</p>
                      {item.description && (
                        <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-[13px] leading-relaxed text-[#EFE7D6]/55">{item.description}</p>
                      )}
                    </div>
                    {item.price && (
                      <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium tracking-[0.1em]" style={{ color: GOLD }}>{item.price}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* gallery whisper — three nocturnal frames */}
      {gallery.length > 0 && (
        <section style={{ background: BLACK }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-9 sm:py-20">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {gallery.slice(0, 3).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={href("gallery")} className="inline-flex text-[11px] font-medium uppercase tracking-[0.28em] transition hover:text-[#D9A9A0]" style={{ color: GOLD }}>Step inside →</a>
            </div>
          </div>
        </section>
      )}

      {/* closing reserve band — black with the sunburst, one gold CTA */}
      <section className="relative overflow-hidden text-[#EFE7D6]" style={{ background: BLACK }}>
        <Sunburst className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 opacity-[0.12]" />
        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center sm:px-9 sm:py-32">
          <h2 style={{ ...serif, color: IVORY }} className="text-4xl font-normal uppercase leading-tight tracking-[0.08em] sm:text-5xl">Until the small hours</h2>
          <DecoDivider className="mt-7" />
          <p className="mt-6 text-[15px] leading-relaxed text-[#EFE7D6]/70">A booth beneath the gilt, a glass in hand. Reserve your evening with us.</p>
          <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.3em] transition hover:brightness-110" style={{ background: GOLD, color: BLACK }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
        </div>
      </section>
    </>,
    false,
  );
}
