import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DecantHeader } from "./DecantHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Decant — a refined independent wine, craft beer & spirits SHOP (bottle shop /
// off-licence). Warm, characterful and premium: deep vineyard burgundy and oat
// label-paper, an amber accent and bottle-green seam. The signature is a shelf
// row of bottle silhouettes dressed with paper label cartouches — a take-home
// merchant feel, NOT a bar. The catalog reads as "the cellar": ranges of
// hand-picked bottles (Wine / Craft beer / Spirits / Fine & rare / Gifts &
// cases / Low & no). MULTI-PAGE: nav opens real routes (The cellar / About /
// In store / Visit) under basePath; the sticky transparent-over-hero burgundy
// header + deep footer are shared. Tenant swaps in their own bottles, photos,
// copy and opening hours. Lead with character: hand-picked, expert advice,
// tastings & gifting, must be 18+.

const BURGUNDY = "#5A1E2D"; // deep vineyard burgundy — page anchor
const BURG_DEEP = "#481622"; // darker burgundy for footer / depth
const AMBER = "#C58A3A"; // warm amber accent
const GREEN = "#2C3B30"; // bottle-green seam
const OAT = "#EFE7D6"; // oat label-paper
const INK = "#1B1518"; // charcoal ink
const display = { fontFamily: "var(--font-space)" } as const;

// Signature: a shelf row of bottle silhouettes with a paper label cartouche on
// each — the bottle-shop motif. Decorative; scales to its container.
function BottleRow({ color = AMBER, label = `${INK}22`, paper = OAT }: { color?: string; label?: string; paper?: string }) {
  const Bottle = ({ tall = false }: { tall?: boolean }) => (
    <span className="flex flex-col items-center" aria-hidden>
      <svg width="34" height={tall ? "104" : "92"} viewBox={`0 0 34 ${tall ? 104 : 92}`} className="block">
        <path
          d={`M13 2h8v${tall ? 26 : 22}c0 3 4 5 4 11v${tall ? 57 : 49}c0 3-2 5-5 5H14c-3 0-5-2-5-5V${tall ? 41 : 35}c0-6 4-8 4-11z`}
          fill={color}
          stroke={`${INK}30`}
          strokeWidth="1"
        />
        {/* paper label cartouche */}
        <rect x="11" y={tall ? "58" : "50"} width="12" height={tall ? "30" : "26"} rx="1.5" fill={paper} />
        <line x1="13" y1={tall ? "66" : "58"} x2="21" y2={tall ? "66" : "58"} stroke={label} strokeWidth="1.4" />
        <line x1="13" y1={tall ? "72" : "64"} x2="21" y2={tall ? "72" : "64"} stroke={label} strokeWidth="1.4" />
      </svg>
    </span>
  );
  return (
    <div className="flex items-end justify-center gap-2.5 sm:gap-3.5">
      <Bottle />
      <Bottle tall />
      <Bottle />
      <Bottle tall />
      <Bottle />
    </div>
  );
}

// A small label cartouche used as a kicker — paper tag with a hairline frame.
function Cartouche({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em] ${center ? "justify-center" : ""}`} style={{ color: AMBER }}>
      <span aria-hidden className="inline-block h-2 w-2 rotate-45 border" style={{ borderColor: AMBER }} />
      {children}
    </span>
  );
}

export default function DecantDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const bottles = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Reserve a bottle";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    bottles.length > 0 && { label: "The cellar", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "In store", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Default ranges presentation — overridden by the tenant's real catalog
  // sections when present.
  const RANGES = ["Wine", "Craft beer", "Spirits", "Fine & rare", "Gifts & cases", "Low & no"];
  const sectionNames = Array.from(new Set(bottles.map((b) => b.section).filter(Boolean))) as string[];
  const rangeLabels = sectionNames.length > 0 ? sectionNames : RANGES;

  const amberBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: AMBER, color: INK }}>
      {label}
    </a>
  );
  const ghostBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border px-8 py-4 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: `${OAT}66`, color: OAT }}>
      {label}
    </a>
  );

  // 18+ / Challenge 25 note — a recurring character element for the bottle shop.
  const ageNote = (
    <p className="flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.2em]" style={{ color: `${OAT}99` }}>
      <span aria-hidden className="grid h-6 w-6 place-items-center rounded-full border text-[10px] font-bold" style={{ borderColor: `${AMBER}99`, color: AMBER }}>18</span>
      You must be 18 or over · Challenge 25 in store
    </p>
  );

  const footer = (
    <footer style={{ background: BURG_DEEP, borderTop: `1px solid ${AMBER}40` }} className="text-[#EFE7D6]">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span aria-hidden className="grid h-7 w-5 place-items-start overflow-hidden rounded-[3px]" style={{ background: AMBER }}>
              <span className="mt-[3px] h-px w-full" style={{ background: `${INK}55` }} />
              <span className="mt-[3px] h-px w-full" style={{ background: `${INK}55` }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-lg font-medium uppercase tracking-[0.22em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: `${OAT}b0` }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em]" style={{ borderColor: `${OAT}26`, color: `${OAT}cc` }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:border-[#C58A3A] hover:text-[#C58A3A]" style={{ border: `1px solid ${OAT}26`, color: `${OAT}b0` }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: AMBER }} className="text-[11px] font-semibold uppercase tracking-[0.24em]">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: `${OAT}b0` }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: AMBER }} className="text-[11px] font-semibold uppercase tracking-[0.24em]">Find the shop</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: `${OAT}b0` }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: AMBER }} className="text-[11px] font-semibold uppercase tracking-[0.24em]">Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: `${OAT}b0` }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${OAT}66` }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: `${OAT}88` }}>Open Mon–Sat.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: `${OAT}1a`, color: `${OAT}80` }}>
        <p>© {new Date().getFullYear()} {name}. Please drink responsibly · 18+ only.</p>
        <a href={href("contact")} className="uppercase tracking-[0.18em] transition hover:text-white">Tastings &amp; gifting</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: BURGUNDY }} className="min-h-screen font-body">
      <DecantHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: BURG_DEEP, borderBottom: `1px solid ${AMBER}33` }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Cartouche>{kicker}</Cartouche>
        <h1 style={{ ...display, color: OAT }} className="mt-5 text-4xl font-medium tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- THE CELLAR (services / ranges) ----
  if (page === "services") {
    return shell(
      <>
        {banner("The cellar", "Hand-picked bottles")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section} className="break-inside-avoid">
                  {section.section && (
                    <div className="mb-7 flex items-baseline gap-5">
                      <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: OAT }} className="text-2xl font-medium tracking-tight sm:text-3xl">{section.section}</h2>
                      <span className="h-px flex-1" style={{ background: `${AMBER}55` }} />
                    </div>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mb-9 last:mb-0">
                      {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: AMBER }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: `${OAT}1f` }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-[17px] font-medium" style={{ ...display, color: OAT }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-[13px] leading-relaxed" style={{ color: `${OAT}99` }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold tracking-wide" style={{ color: AMBER }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p style={{ color: `${OAT}99` }}>Our shelves are being stocked. Back soon.</p>}
          <div className="mt-14 flex flex-col items-start gap-6">
            {amberBtn(ctaLabel, cta)}
            {ageNote}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Independent & hand-picked", "Our shop")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: `${OAT}d9` }}>{content.about}</p> : <p style={{ color: `${OAT}99` }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: AMBER }} className="mt-12 text-[11px] font-semibold uppercase tracking-[0.26em]">Licensed &amp; trusted</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ borderColor: `${AMBER}66`, color: OAT }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: AMBER }} className="mt-12 text-[11px] font-semibold uppercase tracking-[0.26em]">Local delivery</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: `${OAT}b0` }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12 flex flex-col items-start gap-6">
            {amberBtn(ctaLabel, cta)}
            {ageNote}
          </div>
        </section>
      </>,
    );
  }

  // ---- IN STORE (gallery) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In store", "On the shelves")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: `${OAT}99` }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- VISIT (contact) ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Find the shop")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: OAT }} className="text-2xl font-medium tracking-tight">Pop in &amp; say hello</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: `${OAT}99` }}>Reserve a bottle, plan a tasting or ask us to put together a gift or case. We&apos;re always happy to point you to something good.</p>
            <div className="mt-7 space-y-4 text-[15px] leading-relaxed" style={{ color: `${OAT}d9` }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${OAT}1f`, color: `${OAT}b0` }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${OAT}66` }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7">{ageNote}</div>
            {content.map_url && (
              <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Reserve a bottle"
                bookingBlurb="Tell us what you're after — a special bottle, a tasting or a gift — and we'll hold it behind the counter."
                bookingCta="Send request"
                contactTitle="Get in touch"
                theme={{ card: BURG_DEEP, cardBorder: `${OAT}1f`, heading: OAT, blurb: `${OAT}99`, label: `${OAT}cc`, fieldBg: BURGUNDY, fieldBorder: `${OAT}26`, fieldText: OAT, button: AMBER, buttonText: INK, radius: "0.75rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = bottles.slice(0, 5);
  const offer = [
    { k: "Hand-picked", d: "Every bottle on the shelf is here because we tasted it and loved it. No filler." },
    { k: "Expert advice", d: "Tell us the occasion and your budget — we'll find the bottle to match." },
    { k: "Tastings & gifts", d: "Regular in-store tastings, gift wrapping and made-to-order cases." },
    { k: "Take it home", d: "Reserve online and collect, or ask about local delivery to your door." },
  ];

  return shell(
    <>
      {/* hero — warm burgundy/oat bottle-shop hero with the signature bottle row */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden" style={{ background: BURGUNDY }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 18% 20%, #6c2638 0%, ${BURGUNDY} 48%, ${BURG_DEEP} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(90deg, ${BURG_DEEP}f2 0%, ${BURGUNDY}d9 46%, ${BURGUNDY}73 100%)` }} />
        {/* bottle-green seam along the foot — shelf shadow */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-3" style={{ background: GREEN }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28" style={{ color: OAT }}>
          <Cartouche>{content.service_areas?.[0] ? `Independent merchant · ${content.service_areas[0]}` : "Independent wine, beer & spirits merchant"}</Cartouche>
          <h1 style={display} className="mt-6 max-w-3xl text-5xl font-medium leading-[1.04] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Hand-picked bottles, expert advice."}</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: `${OAT}cc` }}>A small, independent bottle shop — wine, craft beer & spirits chosen by hand, with someone on the floor who&apos;s actually tasted them.</p>
          <p data-edit="tenant.business_name" className="mt-7 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: `${OAT}99` }}>{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {amberBtn(ctaLabel, cta)}
            {bottles.length > 0 && ghostBtn("Browse the cellar", href("services"))}
          </div>
          {/* signature bottle-row motif */}
          <div className="mt-12 max-w-lg opacity-95">
            <BottleRow />
          </div>
        </div>
      </section>

      {/* character band — independent & hand-picked */}
      <section style={{ background: OAT }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {offer.map((o) => (
            <div key={o.k} className="px-2">
              <span aria-hidden className="inline-block h-2.5 w-2.5 rotate-45 border-2" style={{ borderColor: BURGUNDY }} />
              <h3 style={{ ...display, color: INK }} className="mt-3 text-lg font-semibold tracking-tight">{o.k}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: "#5b4f4a" }}>{o.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* the cellar — ranges of hand-picked bottles */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Cartouche>The cellar</Cartouche>
            <h2 style={{ ...display, color: OAT }} className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">What&apos;s on the shelves</h2>
          </div>
          {bottles.length > 0 && <a href={href("services")} className="text-[12px] font-semibold uppercase tracking-[0.2em] transition hover:text-white" style={{ color: AMBER }}>The full range →</a>}
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px sm:grid-cols-3" style={{ background: `${OAT}1f` }}>
          {rangeLabels.slice(0, 6).map((r, i) => (
            <a
              key={r}
              href={bottles.length > 0 ? href("services") : cta}
              className="group relative flex min-h-[170px] flex-col justify-between p-7 transition hover:bg-white/[0.03]"
              style={{ background: i % 2 === 0 ? BURG_DEEP : BURGUNDY }}
            >
              <span className="text-[11px] font-semibold tracking-[0.22em]" style={{ color: AMBER }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 style={{ ...display, color: OAT }} className="text-xl font-medium tracking-tight">{r}</h3>
                <span className="mt-2 inline-block text-[11px] uppercase tracking-[0.2em] transition group-hover:translate-x-1" style={{ color: AMBER }}>Explore →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* staff selections — this month's featured shelf */}
      {featured.length > 0 && (
        <section style={{ background: BURG_DEEP, borderTop: `1px solid ${AMBER}26`, borderBottom: `1px solid ${AMBER}26` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Cartouche>Staff selections</Cartouche>
                <h2 style={{ ...display, color: OAT }} className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">This month&apos;s shelf</h2>
              </div>
              <a href={href("services")} className="text-[12px] font-semibold uppercase tracking-[0.2em] transition hover:text-white" style={{ color: AMBER }}>See all →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: `${OAT}1f` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-[17px] font-medium" style={{ ...display, color: OAT }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-[13px] leading-relaxed" style={{ color: `${OAT}99` }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold tracking-wide" style={{ color: AMBER }}>{item.price}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* about statement + tastings & gifting angle */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Cartouche>Independent &amp; hand-picked</Cartouche>
            <h2 style={{ ...display, color: OAT }} className="mt-4 text-3xl font-medium leading-tight tracking-tight sm:text-4xl">A proper bottle shop, run by people who care</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: `${OAT}cc` }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="grid aspect-[4/5] w-full place-items-center" style={{ background: BURG_DEEP }}>
                <div className="scale-[1.4]"><BottleRow /></div>
              </div>
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16" style={{ borderBottom: `3px solid ${AMBER}`, borderLeft: `3px solid ${AMBER}` }} />
          </div>
        </section>
      )}

      {/* tastings & gifting band */}
      <section style={{ background: GREEN }}>
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-8 py-16 sm:grid-cols-[1.4fr_1fr]" style={{ color: OAT }}>
          <div>
            <Cartouche>Tastings &amp; gifting</Cartouche>
            <h2 style={{ ...display, color: OAT }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Gifts, cases &amp; tasting nights</h2>
            <p className="mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: `${OAT}cc` }}>Made-to-order gift boxes and mixed cases, plus regular evening tastings in the shop. Tell us the occasion — we&apos;ll handle the rest.</p>
          </div>
          <div className="flex sm:justify-end">{amberBtn(ctaLabel, cta)}</div>
        </div>
      </section>

      {/* in-store strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Cartouche>In store</Cartouche>
          <h2 style={{ ...display, color: OAT }} className="mt-4 text-4xl font-medium tracking-tight sm:text-5xl">Come and have a look</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10">{ghostBtn("See the shop", href("gallery"))}</div>
        </section>
      )}

      {/* visit us — opening hours band */}
      <section style={{ background: BURG_DEEP, borderTop: `1px solid ${AMBER}26` }}>
        <div className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-[1fr_1fr]">
          <div>
            <Cartouche>Visit us</Cartouche>
            <h2 style={{ ...display, color: OAT }} className="mt-4 text-3xl font-medium tracking-tight sm:text-4xl">Find the shop</h2>
            {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-[15px] leading-relaxed" style={{ color: `${OAT}cc` }}>{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-[15px]" style={{ color: `${OAT}cc` }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            <div className="mt-7">{ageNote}</div>
          </div>
          <div>
            <h3 style={{ ...display, color: AMBER }} className="text-[11px] font-semibold uppercase tracking-[0.26em]">Opening hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 max-w-sm space-y-2 text-[15px]" style={{ color: `${OAT}cc` }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6 border-b py-1.5" style={{ borderColor: `${OAT}14` }}><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${OAT}80` }}>{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-[15px]" style={{ color: `${OAT}99` }}>Open Mon–Sat. Closed Sundays &amp; bank holidays.</p>}
            {content.map_url && <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
        </div>
      </section>

      {/* closing reserve CTA */}
      <section style={{ background: AMBER }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: INK }}>
          <div>
            <h2 style={display} className="text-3xl font-semibold tracking-tight sm:text-4xl">Found something you fancy?</h2>
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em]" style={{ color: `${INK}b3` }}>Reserve it and collect in store · 18+ only.</p>
          </div>
          <a href={cta} className="rounded-full px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-110" style={{ background: INK, color: OAT }}>
            {ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
