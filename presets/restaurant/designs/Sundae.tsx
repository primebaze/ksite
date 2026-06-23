import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SundaeHeader } from "./SundaeHeader";
import { SundaeBooking } from "./SundaeBooking";

// Sundae — a joyful, retro-modern ICE-CREAM / gelato parlour (single venue),
// MULTI-PAGE: the nav opens real routes (Scoops / Parties / Gallery / About /
// Visit) under basePath, never scroll anchors. Each page is its own layout; the
// floating cream pill header and cocoa footer are shared via shell(). Palette is
// baked from the brief: bubblegum pink, sky, vanilla cream, pistachio, cherry
// red over warm cocoa ink. The tenant swaps in their own photography, copy,
// menu, hours, socials and contact details.
//
// Distinct structural signature (shares nothing with Meadow's coral diner,
// Stack's bold diner or Gateau's pastel patisserie):
//  - a sunny CANDY-STRIPED hero with a big bouncy headline + a cone/scoop motif;
//  - WAVY / SCALLOPED section dividers between bands;
//  - a colourful "today's scoops" flavour list (each flavour a soft pastel pill
//    swatch) — while the MENU itself stays clean divide-y rows;
//  - polka-dot and drip accents, very rounded geometry (pill buttons, big radii).

const display = { fontFamily: "var(--font-fraunces)" } as const;
const PINK = "#F4A3C0";
const SKY = "#8FCFE6";
const CREAM = "#FCF6EA";
const PISTACHIO = "#BFE0A8";
const CHERRY = "#E0533B";
const COCOA = "#4A352C";

// Rotating pastel swatches for the "today's scoops" flavour pills.
const SCOOP_TINTS = [PINK, SKY, PISTACHIO, "#F6C26B", "#C9B6E4"];

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

// Candy-stripe background as a repeating linear gradient — the core motif.
function stripes(a: string, b: string): CSSProperties {
  return { backgroundImage: `repeating-linear-gradient(135deg, ${a} 0 26px, ${b} 26px 52px)` };
}

// Polka-dot overlay (radial gradient), tuned soft so it reads as confetti.
function dots(color: string, size = 22): CSSProperties {
  return {
    backgroundImage: `radial-gradient(${color} 2.4px, transparent 2.6px)`,
    backgroundSize: `${size}px ${size}px`,
  };
}

// A scalloped bottom edge (like a row of scoops) sitting at the foot of a band.
// `fill` paints the scallops the colour of the *next* section below it.
function Scallop({ fill, flip = false }: { fill: string; flip?: boolean }) {
  return (
    <div className="pointer-events-none -mt-px leading-[0]" style={flip ? { transform: "scaleY(-1)" } : undefined}>
      <svg viewBox="0 0 1200 40" preserveAspectRatio="none" className="block h-[26px] w-full sm:h-[36px]" aria-hidden>
        <path d="M0 40 V20 Q30 40 60 20 T120 20 T180 20 T240 20 T300 20 T360 20 T420 20 T480 20 T540 20 T600 20 T660 20 T720 20 T780 20 T840 20 T900 20 T960 20 T1020 20 T1080 20 T1140 20 T1200 20 V40 Z" fill={fill} />
      </svg>
    </div>
  );
}

export default function SundaeDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "scoops", href: href("menu") },
    bookingOn && { label: "parties", href: href("reservations") },
    gallery.length > 0 && { label: "gallery", href: href("gallery") },
    content.about && { label: "about", href: href("about") },
    { label: "visit", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // The colourful "today's scoops" pill row — pulled from the first menu section
  // so it always reflects real flavours, but rendered as candy swatches.
  const scoops = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 8);

  // ---- shared footer (cocoa, with party CTA + socials) ----
  const footer = (
    <footer style={{ background: COCOA }} className="relative text-white/85">
      <Scallop fill={COCOA} flip />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...display, color: PINK }} className="text-3xl font-bold">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-extrabold lowercase tracking-wide" style={{ color: SKY }} {...editCopy(content, "footer_social", "say hi")} />
              <div className="mt-4 flex gap-4 text-white">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-extrabold lowercase tracking-wide" style={{ color: SKY }} {...editCopy(content, "footer_explore", "wander")} />
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {([
              groups.length > 0 && { label: "the scoops", href: href("menu") },
              bookingOn && { label: "book a party", href: href("reservations") },
              gallery.length > 0 && { label: "gallery", href: href("gallery") },
              content.about && { label: "our story", href: href("about") },
              { label: "visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-extrabold lowercase tracking-wide" style={{ color: SKY }} {...editCopy(content, "footer_hours", "scoop o'clock")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/75">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-white/75">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a real button, never a dead newsletter input */}
        <div className="rounded-[2rem] border-2 px-7 py-9" style={{ background: PINK, borderColor: "#fff", color: COCOA }}>
          <h4 style={display} className="text-2xl font-bold leading-tight" {...editCopy(content, "footer_cta_heading", "Throwing a party?")} />
          <p className="mt-2 text-sm leading-relaxed opacity-90" {...editCopy(content, "footer_cta_body", "Birthdays, big groups or a just-because treat. We'll scoop the whole thing.")} />
          <a href={book} className="mt-6 inline-flex rounded-full border-2 px-7 py-3 text-xs font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5" style={{ background: CHERRY, borderColor: COCOA, color: "#fff" }}>{bookingOn ? "book a party" : "get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50 sm:px-8">© {name}. Made with sprinkles.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" data-page={page}>
      <SundaeHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Striped page banner that clears the floating header on sub-pages, finished
  // with a scallop that flows into the cream body below.
  const banner = (kicker: string, title: string) => (
    <section className="relative isolate" style={{ background: SKY, color: COCOA }}>
      <div className="absolute inset-0 opacity-[0.18]" style={dots(COCOA, 26)} aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-32 sm:px-8 sm:pb-20 sm:pt-40">
        <p className="text-xs font-extrabold lowercase tracking-[0.2em] opacity-70">{kicker}</p>
        <h1 style={display} className="mt-3 text-5xl font-bold leading-[0.92] sm:text-7xl">{title}</h1>
      </div>
      <Scallop fill={CREAM} />
    </section>
  );

  // ---- MENU (clean divide-y rows; NO dotted leaders, NO card panels) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("the good stuff", "Today's scoops")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
            {groups.length > 0 ? (
              <>
                <div className="grid items-start gap-x-16 gap-y-14 md:grid-cols-2">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-5">
                          <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, background: PISTACHIO, color: COCOA, borderColor: COCOA }} className="inline-block rounded-full border-2 px-5 py-1.5 text-lg font-bold">{section.section}</span>
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-7">
                          {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-extrabold lowercase tracking-wide" style={{ color: CHERRY }}>{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${COCOA}26` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-4">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-base font-bold text-[color:#4A352C]" style={display}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#4A352C]/55">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: CHERRY }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full border-2 px-7 py-3 text-xs font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5" style={{ background: CHERRY, borderColor: COCOA, color: "#fff" }}>{o.label}{o.commission_free ? " · no fees" : ""}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="text-[color:#4A352C]/60">Our flavours are churning. Back soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / PARTIES ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("let's celebrate", "Book a party")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-[color:#4A352C]/75">Birthdays, baby showers or a sweet group hangout — pick a day and time and we&apos;ll set out the sprinkles. For big parties of 8 or more, give us a call and we&apos;ll plan it together.</p>
            <SundaeBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("come say hi", "Find us")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#4A352C]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-bold text-[color:#4A352C]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#E0533B]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#E0533B]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-[color:#4A352C]/75" style={{ borderColor: `${COCOA}26` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#4A352C]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border-2 px-7 py-3 text-xs font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5" style={{ background: SKY, borderColor: COCOA, color: COCOA }} {...editCopy(content, "contact_directions_cta", "get directions")} />
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="Got a question, a big celebration or a flavour request? Tell us here and we'll scoop back to you."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: COCOA, heading: COCOA, button: CHERRY, buttonText: "#ffffff", fieldBorder: "#e7d8c9", radius: "1.5rem", font: "var(--font-fraunces)" }}
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
        {banner("our story", "Churned with love")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-[color:#4A352C]/80">{content.about}</p> : <p className="text-[color:#4A352C]/60">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <h3 style={display} className="mt-12 text-3xl font-bold text-[color:#4A352C]" {...editCopy(content, "about_cuisine_heading", "What we churn")} />
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-[color:#4A352C]/75">{content.cuisine_type}</p>
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
        {banner("a peek inside", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] border-2 object-cover" style={{ borderColor: COCOA }} />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#4A352C]/60" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = scoops.slice(0, 3);
  return shell(
    <>
      {/* HERO: candy-striped, big bouncy headline, cone motif, inline booking */}
      <section className="relative isolate overflow-hidden" style={{ ...stripes(PINK, CREAM) }}>
        <div className="absolute inset-0 opacity-[0.12]" style={dots(COCOA, 30)} aria-hidden />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border-2 bg-white px-4 py-1.5 text-[11px] font-extrabold lowercase tracking-wide" style={{ borderColor: COCOA, color: COCOA }}>
              <span aria-hidden>🍨</span> small-batch · churned daily
            </span>
            <h1 data-edit="tenant.business_name" style={display} className="mt-5 text-6xl font-bold leading-[0.86] text-[color:#4A352C] sm:text-8xl">{name}</h1>
            <p data-edit="content.tagline" className="mt-5 max-w-md text-lg font-semibold leading-relaxed text-[color:#4A352C]/80 sm:text-xl">
              {content.tagline ?? "Scoops, sundaes and sunshine. Real cream, silly-good flavours, zero grown-up rules."}
            </p>
            {!bookingOn && (
              <a href={book} className="mt-7 inline-flex rounded-full border-2 px-9 py-4 text-sm font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5" style={{ background: CHERRY, borderColor: COCOA, color: "#fff" }}>get in touch</a>
            )}
          </div>

          {/* big scoop-on-cone illustration */}
          <div className="relative mx-auto hidden w-full max-w-sm lg:block">
            <svg viewBox="0 0 240 300" className="w-full drop-shadow-[0_24px_40px_rgba(74,53,44,0.25)]" aria-hidden>
              <circle cx="120" cy="78" r="58" fill={PINK} stroke={COCOA} strokeWidth="4" />
              <circle cx="78" cy="120" r="48" fill={SKY} stroke={COCOA} strokeWidth="4" />
              <circle cx="164" cy="122" r="46" fill={PISTACHIO} stroke={COCOA} strokeWidth="4" />
              <circle cx="120" cy="150" r="34" fill={CHERRY} stroke={COCOA} strokeWidth="4" />
              {/* sprinkles */}
              <g stroke="#fff" strokeWidth="4" strokeLinecap="round">
                <path d="M108 60 l8 8" /><path d="M140 90 l-8 8" /><path d="M86 110 l8 -6" /><path d="M168 110 l-7 7" /><path d="M120 140 l6 7" />
              </g>
              {/* cone */}
              <path d="M78 168 L162 168 L120 290 Z" fill="#F6C26B" stroke={COCOA} strokeWidth="4" strokeLinejoin="round" />
              <path d="M96 178 l40 60 M120 176 l28 44 M84 196 l34 52" stroke={COCOA} strokeWidth="2" opacity="0.4" />
              {/* cherry on top */}
              <circle cx="120" cy="18" r="11" fill={CHERRY} stroke={COCOA} strokeWidth="3" />
              <path d="M120 8 Q132 0 140 10" stroke={COCOA} strokeWidth="3" fill="none" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* inline booking row sits in a soft cream strip at the foot of the hero */}
        {bookingOn && (
          <div className="relative mx-auto -mb-2 max-w-5xl px-6 pb-12 sm:px-8">
            <SundaeBooking tenantId={tenant.id} name={name} inline />
          </div>
        )}
        <Scallop fill={SKY} />
      </section>

      {/* TODAY'S SCOOPS: sky band with colourful pastel flavour pills */}
      {scoops.length > 0 && (
        <section className="relative isolate" style={{ background: SKY }}>
          <div className="absolute inset-0 opacity-[0.14]" style={dots("#fff", 24)} aria-hidden />
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-xs font-extrabold lowercase tracking-[0.2em] text-[color:#4A352C]/70" {...editCopy(content, "home_scoops_kicker", "scooping now")} />
                <h2 style={display} className="mt-2 text-5xl font-bold leading-[0.9] text-[color:#4A352C] sm:text-6xl" {...editCopy(content, "home_scoops_heading", "Today's flavours")} />
              </div>
              {groups.length > 0 && <a href={href("menu")} className="rounded-full border-2 bg-white px-5 py-2 text-xs font-extrabold lowercase tracking-wide text-[color:#4A352C] transition hover:-translate-y-0.5" style={{ borderColor: COCOA }} {...editCopy(content, "home_scoops_link", "see the whole case →")} />}
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {scoops.map((item, i) => (
                <a
                  key={item.id}
                  href={groups.length > 0 ? href("menu") : "#"}
                  data-edit={`item:${item.id}:name`}
                  className="inline-flex items-center gap-2.5 rounded-full border-2 px-5 py-3 text-base font-bold text-[color:#4A352C] transition hover:-translate-y-0.5"
                  style={{ ...display, background: SCOOP_TINTS[i % SCOOP_TINTS.length], borderColor: COCOA }}
                >
                  <span className="inline-block h-3.5 w-3.5 rounded-full border-2" style={{ background: "#fff", borderColor: COCOA }} aria-hidden />
                  {item.name}
                </a>
              ))}
            </div>
          </div>
          <Scallop fill={CREAM} />
        </section>
      )}

      {/* ABOUT: cream band with big bouncy headline + drip accent */}
      <section className="relative" style={{ background: CREAM }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <p className="text-xs font-extrabold lowercase tracking-[0.22em]" style={{ color: CHERRY }} {...editCopy(content, "home_about_kicker", "scoop scoop hooray")} />
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-6xl font-bold leading-[0.86] text-[color:#4A352C] sm:text-7xl">Made fresh,<br />eaten faster</h2>
            {content.about && <p data-edit="content.about" className="text-[17px] leading-[1.85] text-[color:#4A352C]/80">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-full border-2 px-7 py-3 text-xs font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5" style={{ background: PISTACHIO, borderColor: COCOA, color: COCOA }} {...editCopy(content, "home_about_cta", "our story")} />
          )}
        </div>
        <Scallop fill={PINK} />
      </section>

      {/* PICKS: pink band, three rounded photo/flavour cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section className="relative isolate" style={{ background: PINK }}>
          <div className="absolute inset-0 opacity-[0.12]" style={dots(COCOA, 28)} aria-hidden />
          <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-xs font-extrabold lowercase tracking-[0.22em] text-[color:#4A352C]/70" {...editCopy(content, "home_picks_kicker", "crowd-pleasers")} />
              <h2 style={display} className="mt-2 text-5xl font-bold text-[color:#4A352C] sm:text-6xl" {...editCopy(content, "home_picks_heading", "Fan favourites")} />
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const tint = SCOOP_TINTS[i % SCOOP_TINTS.length];
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={groups.length > 0 ? href("menu") : book} className="group flex flex-col overflow-hidden rounded-[2rem] border-2 bg-white transition hover:-translate-y-1.5" style={{ borderColor: COCOA }}>
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[5/4] w-full object-cover" />
                    ) : (
                      <div className="relative aspect-[5/4] w-full" style={{ background: tint }}>
                        <div className="absolute inset-0 opacity-30" style={dots("#fff", 20)} aria-hidden />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-bold text-[color:#4A352C]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-[color:#4A352C]/65">{item.description}</p>}
                      <span className="mt-5 inline-flex w-fit rounded-full border-2 px-5 py-2 text-xs font-extrabold lowercase tracking-wide text-[color:#4A352C] transition group-hover:-translate-y-0.5" style={{ background: tint, borderColor: COCOA }}>grab a scoop</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
          <Scallop fill={CREAM} />
        </section>
      )}

      {/* PARTY CTA: cream band with a candy-striped panel */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="relative overflow-hidden rounded-[2.5rem] border-2 px-8 py-14 text-center" style={{ ...stripes(SKY, CREAM), borderColor: COCOA }}>
            <div className="relative">
              <h2 style={display} className="text-5xl font-bold leading-[0.9] text-[color:#4A352C] sm:text-6xl" {...editCopy(content, "party_cta_heading", "Let's throw a party")} />
              <p className="mt-3 text-sm font-extrabold lowercase tracking-wide text-[color:#4A352C]/70" {...editCopy(content, "party_cta_sub", "birthdays · big groups · just because")} />
              <a href={book} className="mt-7 inline-flex rounded-full border-2 px-9 py-4 text-sm font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5" style={{ background: CHERRY, borderColor: COCOA, color: "#fff" }}>{bookingOn ? "book a party" : "get in touch"}</a>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK INFO band: cocoa with hours + directions + reserve */}
      <section style={{ background: COCOA }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-extrabold lowercase tracking-wide" style={{ color: PINK }} {...editCopy(content, "info_hours_label", "scoop o'clock")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-extrabold lowercase tracking-wide" style={{ color: PINK }} {...editCopy(content, "info_findus_label", "find us")} />
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-white/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border-2 border-white/50 px-6 py-2.5 text-xs font-extrabold lowercase tracking-wide text-white transition hover:bg-white hover:text-[color:#4A352C]" {...editCopy(content, "info_directions_link", "get directions")} />
            )}
          </div>
          <div>
            <h3 className="text-xs font-extrabold lowercase tracking-wide" style={{ color: PINK }}>{bookingOn ? "celebrate" : "say hi"}</h3>
            <p className="mt-5 text-sm text-white/80">{bookingOn ? "Save a spot for your scoop party in seconds." : "We'd love to hear from you."}</p>
            <a href={book} className="mt-5 inline-flex rounded-full border-2 px-7 py-3 text-xs font-extrabold lowercase tracking-wide text-[color:#4A352C] transition hover:-translate-y-0.5" style={{ background: PINK, borderColor: "#fff" }}>{bookingOn ? "book a party" : "contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
