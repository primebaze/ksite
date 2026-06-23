import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LemongrassHeader } from "./LemongrassHeader";
import { LemongrassBooking } from "./LemongrassBooking";

// Lemongrass — a fresh, herbal, vibrant modern THAI restaurant (single venue),
// MULTI-PAGE: the nav opens real routes (Menu / Reservations / Gallery / About /
// Contact) under basePath, never scroll anchors. The sticky emerald header and
// deep-emerald footer are shared. The palette is baked from fresh Thai
// aromatics: deep emerald, lime/chartreuse, chilli red, gold and a warm cream.
// The structural signature: a lush BOTANICAL hero (emerald with chartreuse
// leaf/herb motifs and a bright stacked headline), a "balance of five flavours"
// (hot / sour / salty / sweet / umami) horizontal feature, a fresh-herb-tagged
// menu, leafy organic dividers and generously rounded forms. Display type is
// Fraunces, kept lively. The tenant swaps in their own photography, copy, menu,
// hours and address.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const EMERALD = "#14532D";
const EMERALD_DEEP = "#0E3D21";
const CHARTREUSE = "#A3C847";
const CHILLI = "#D1462F";
const GOLD = "#C8941E";
const CREAM = "#F7F3E6";

// The five Thai flavour pillars — the home page's horizontal feature.
const FLAVOURS: { name: string; thai: string; note: string; tint: string }[] = [
  { name: "Hot", thai: "เผ็ด", note: "Bird's eye chilli, fresh & dried", tint: CHILLI },
  { name: "Sour", thai: "เปรี้ยว", note: "Lime, tamarind, green mango", tint: CHARTREUSE },
  { name: "Salty", thai: "เค็ม", note: "Fish sauce, fermented soy", tint: EMERALD },
  { name: "Sweet", thai: "หวาน", note: "Palm sugar, coconut", tint: GOLD },
  { name: "Umami", thai: "อูมามิ", note: "Shrimp paste, grilled char", tint: EMERALD_DEEP },
];

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

// A single botanical leaf — the recurring motif (header glyph, hero scatter,
// menu-section tag). Filled chartreuse with an emerald midrib.
function Leaf({ size = 24, fill = CHARTREUSE, vein = EMERALD, className = "", style }: { size?: number; fill?: string; vein?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className} style={style}>
      <path d="M4 20C4 11 11 4 20 4c0 9-7 16-16 16Z" fill={fill} />
      <path d="M5 19C9 13 14 9 18 7" stroke={vein} strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

// A leafy organic divider: a soft scalloped/wave edge in a given colour, used to
// transition between bands instead of a hard horizontal line.
function LeafyDivider({ color, flip = false }: { color: string; flip?: boolean }) {
  return (
    <div aria-hidden className="leading-[0]" style={{ transform: flip ? "scaleY(-1)" : undefined }}>
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="block h-[34px] w-full sm:h-[52px]">
        <path d="M0 30 Q 75 0 150 30 T 300 30 T 450 30 T 600 30 T 750 30 T 900 30 T 1050 30 T 1200 30 V 60 H 0 Z" fill={color} />
      </svg>
    </div>
  );
}

export default function LemongrassDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (deep emerald, leafy, with a chilli reserve CTA) ----
  const footer = (
    <footer style={{ background: EMERALD_DEEP }} className="relative text-[color:#F7F3E6]/85">
      {/* scattered leaves, very faint, top-right */}
      <div aria-hidden className="pointer-events-none absolute right-6 top-8 opacity-[0.12]">
        <Leaf size={120} fill={CHARTREUSE} vein={EMERALD_DEEP} />
      </div>
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.3fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Leaf size={26} />
            <span data-edit="tenant.business_name" style={{ ...display, color: CREAM }} className="text-3xl font-semibold">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[color:#F7F3E6]/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARTREUSE }}>Follow us</h4>
              <div className="mt-4 flex gap-4" style={{ color: CREAM }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARTREUSE }}>Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-[color:#F7F3E6]/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "About us", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Reservations", href: href("reservations") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[color:#A3C847]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARTREUSE }}>Opening times</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[color:#F7F3E6]/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F7F3E6]/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-[color:#F7F3E6]/60">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[color:#F7F3E6]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-[color:#F7F3E6]/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#A3C847]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#A3C847]">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a real button, never a dead newsletter input */}
        <div className="rounded-[2rem] px-7 py-9" style={{ background: CHARTREUSE, color: EMERALD_DEEP }}>
          <Leaf size={30} fill={EMERALD} vein={CHARTREUSE} />
          <h4 style={display} className="mt-3 text-2xl font-semibold leading-tight">Hungry for something fresh?</h4>
          <p className="mt-2 text-sm leading-relaxed opacity-90">Bright, aromatic Thai cooking, made to share. Save your table now.</p>
          <a href={book} className="mt-6 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CHILLI }}>{bookingOn ? "Reserve a table" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-[color:#F7F3E6]/10 px-6 py-6 text-center text-xs text-[color:#F7F3E6]/50 sm:px-8">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <LemongrassHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Emerald page banner that clears the fixed header on sub-pages, with a faint
  // botanical scatter and a leafy divider into the page body.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: EMERALD }}>
      <div aria-hidden className="pointer-events-none absolute -right-6 -top-6 opacity-[0.14]">
        <Leaf size={220} fill={CHARTREUSE} vein={EMERALD} />
      </div>
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-28 sm:px-8 sm:pb-20 sm:pt-36">
        <div className="flex items-center gap-2.5">
          <Leaf size={18} />
          <p className="text-xs font-bold uppercase tracking-[0.24em]" style={{ color: CHARTREUSE }}>{kicker}</p>
        </div>
        <h1 style={display} className="mt-3 text-5xl font-semibold leading-[0.95] text-[color:#F7F3E6] sm:text-6xl">{title}</h1>
      </div>
      <LeafyDivider color={CREAM} />
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Our kitchen", "The menu")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-14 gap-y-14 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-5 flex items-center gap-2.5">
                        <Leaf size={20} fill={CHARTREUSE} vein={EMERALD} />
                        <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: EMERALD }} className="text-2xl font-semibold">{section.section}</span>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-7">
                        {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-bold uppercase tracking-[0.16em]" style={{ color: CHILLI }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${EMERALD}1f` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-base font-semibold text-[color:#14532D]" style={display}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: CHILLI }}>{item.price}</span>
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
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: EMERALD }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-neutral-500">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book a table")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Pick a day and a time and we will save you a spot. For groups of 8 or more, give us a call and we will look after you.</p>
            <LemongrassBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Find us")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-neutral-700">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-semibold text-[color:#14532D]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#D1462F]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#D1462F]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t-2 pt-6 text-sm text-neutral-700" style={{ borderColor: `${CHARTREUSE}` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: EMERALD }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a big celebration or a bit of feedback? Tell us here and we will get right back to you."
                  contactCta="Send it over"
                  theme={{ card: "#ffffff", cardBorder: CHARTREUSE, heading: EMERALD, button: CHILLI, buttonText: "#ffffff", fieldBorder: "#d8d2bd", radius: "1.5rem", font: "var(--font-fraunces)" }}
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
        {banner("About us", "Fresh, aromatic, alive")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <div className="mt-12 flex items-center gap-2.5">
                  <Leaf size={22} fill={CHARTREUSE} vein={EMERALD} />
                  <h3 style={display} className="text-3xl font-semibold text-[color:#14532D]">What we cook</h3>
                </div>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.8] text-neutral-700">{content.cuisine_type}</p>
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
        {banner("A look around", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3" style={{ background: CREAM }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-[1.5rem] object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-neutral-500" style={{ background: CREAM }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* hero: lush botanical emerald, big stacked headline, inline reservation row */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: EMERALD }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 100% at 80% 0%, ${EMERALD} 0%, ${EMERALD_DEEP} 70%)` }} />
        )}
        {/* botanical leaf scatter + emerald wash for legibility over photos */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(180deg, ${EMERALD}cc 0%, ${EMERALD_DEEP}66 40%, ${EMERALD_DEEP}e6 100%)` }} />
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <Leaf size={260} className="absolute -left-12 top-24 rotate-[18deg] opacity-25" />
          <Leaf size={180} className="absolute right-[-30px] top-10 rotate-[200deg] opacity-20" />
          <Leaf size={150} className="absolute bottom-40 right-24 rotate-[60deg] opacity-[0.18]" fill={GOLD} vein={EMERALD} />
        </div>

        <div className="relative z-10 mt-auto px-6 pb-12 pt-32 sm:px-8 sm:pb-16">
          <div className="mx-auto max-w-5xl">
            <div className="flex items-center gap-2.5">
              <Leaf size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: CHARTREUSE }}>Fresh Thai kitchen</span>
            </div>
            {content.tagline ? (
              <p data-edit="content.tagline" style={display} className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] text-[color:#F7F3E6] sm:text-7xl">{content.tagline}</p>
            ) : (
              <p style={display} className="mt-4 max-w-3xl text-5xl font-semibold leading-[0.95] text-[color:#F7F3E6] sm:text-7xl">Bright, herbal,<br /><span style={{ color: CHARTREUSE }}>alive with flavour</span></p>
            )}
            <p className="mt-5 max-w-xl text-base text-[color:#F7F3E6]/85 sm:text-lg">Lemongrass, lime and chilli — Thai cooking built for sharing, served fresh from the wok.</p>
            {bookingOn ? (
              <div className="mt-8 max-w-3xl">
                <LemongrassBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-8 inline-flex rounded-full px-10 py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CHILLI }}>Get in touch</a>
            )}
          </div>
        </div>
      </section>

      {/* about: cream band with a big leafy headline */}
      <section style={{ background: CREAM }} className="relative">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="flex items-center gap-2.5">
            <Leaf size={20} fill={CHARTREUSE} vein={EMERALD} />
            <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: CHILLI }}>About us</p>
          </div>
          <div className="mt-4 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={display} className="text-5xl font-semibold leading-[0.95] text-[color:#14532D] sm:text-6xl">A table full of<br />fresh herbs &amp; fire</h2>
            {content.about && <p data-edit="content.about" className="text-[17px] leading-[1.85] text-neutral-700">{content.about}</p>}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-8 inline-flex rounded-full border-2 px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-[color:#14532D] hover:text-[color:#F7F3E6]" style={{ borderColor: EMERALD, color: EMERALD }}>Our story</a>
          )}
        </div>
      </section>

      {/* balance of five flavours — the horizontal feature on deep emerald */}
      <section className="relative" style={{ background: EMERALD }}>
        <LeafyDivider color={EMERALD} flip />
        <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2.5">
              <Leaf size={20} />
              <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: CHARTREUSE }}>The Thai way</p>
            </div>
            <h2 style={display} className="mt-3 text-4xl font-semibold leading-tight text-[color:#F7F3E6] sm:text-5xl">A balance of five flavours</h2>
            <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-relaxed text-[color:#F7F3E6]/75">Every plate we cook chases harmony between the five — hot, sour, salty, sweet and umami — so each mouthful lands in balance.</p>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {FLAVOURS.map((f) => (
              <div key={f.name} className="rounded-[1.75rem] border px-5 py-7 text-center" style={{ borderColor: `${CHARTREUSE}33`, background: EMERALD_DEEP }}>
                <span className="mx-auto block h-10 w-10 rounded-full" style={{ background: f.tint }} />
                <p style={display} className="mt-4 text-xl font-semibold text-[color:#F7F3E6]">{f.name}</p>
                <p className="mt-0.5 text-lg" style={{ color: CHARTREUSE }}>{f.thai}</p>
                <p className="mt-2 text-xs leading-relaxed text-[color:#F7F3E6]/65">{f.note}</p>
              </div>
            ))}
          </div>
        </div>
        <LeafyDivider color={CREAM} />
      </section>

      {/* from the menu: cream band with rounded dish cards */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <Leaf size={20} fill={CHARTREUSE} vein={EMERALD} />
                  <p className="text-xs font-bold uppercase tracking-[0.28em]" style={{ color: CHILLI }}>From the wok</p>
                </div>
                <h2 style={display} className="mt-3 text-4xl font-semibold text-[color:#14532D] sm:text-5xl">Fresh off the pass</h2>
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-xs font-bold uppercase tracking-[0.16em] transition hover:opacity-70" style={{ color: EMERALD }}>See the full menu &rarr;</a>}
            </div>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item, i) => {
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    {photo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[4/3] w-full object-cover" />
                    ) : (
                      <div className="aspect-[4/3] w-full" style={{ background: `radial-gradient(120% 120% at 30% 20%, ${CHARTREUSE} 0%, ${EMERALD} 100%)` }}>
                        <Leaf size={88} className="m-6 opacity-80" fill={CREAM} vein={EMERALD} />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h3 data-edit={`item:${item.id}:name`} style={display} className="text-xl font-semibold text-[color:#14532D]">{item.name}</h3>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-600">{item.description}</p>}
                      <span className="mt-5 inline-flex w-fit items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] transition group-hover:gap-3" style={{ color: CHILLI }}>View menu <span aria-hidden>&rarr;</span></span>
                    </div>
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: EMERALD }}>View all dishes</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* chilli CTA band: vibrant, rounded panel */}
      <section className="relative" style={{ background: CHILLI }}>
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <div className="rounded-[2.5rem] border-2 px-8 py-12 text-center" style={{ borderColor: CREAM, background: `${EMERALD_DEEP}1a` }}>
            <Leaf size={36} className="mx-auto" fill={CHARTREUSE} vein={EMERALD} />
            <h2 style={display} className="mt-4 text-4xl font-semibold leading-[1] text-[color:#F7F3E6] sm:text-5xl">Pull up a chair</h2>
            <p className="mt-3 text-sm font-bold uppercase tracking-[0.18em] text-[color:#F7F3E6]/85">Bright plates, big flavour, made to share</p>
            <a href={book} className="mt-7 inline-flex rounded-full px-9 py-4 text-sm font-bold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: CREAM, color: EMERALD }}>{bookingOn ? "Reserve your table" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* quick info band: hours + directions + reserve, deep emerald */}
      <section style={{ background: EMERALD_DEEP }} className="text-[color:#F7F3E6]">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARTREUSE }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#F7F3E6]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F7F3E6]/55">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#F7F3E6]/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARTREUSE }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[color:#F7F3E6]/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[color:#F7F3E6]/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#A3C847]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#A3C847]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border px-6 py-2.5 text-xs font-bold uppercase tracking-[0.16em] transition hover:bg-[color:#F7F3E6] hover:text-[color:#14532D]" style={{ borderColor: `${CHARTREUSE}66`, color: CREAM }}>Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: CHARTREUSE }}>Reserve</h3>
            <p className="mt-5 text-sm text-[color:#F7F3E6]/80">Save a table in seconds, lunch or dinner.</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CHILLI }}>{bookingOn ? "Reserve a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
