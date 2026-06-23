import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { VellumHeader } from "./VellumHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Vellum — a characterful independent BOOKSHOP (a RETAIL sibling in the trades
// set). Warm parchment & ink with bottle-green, burgundy and aged-gold; a
// literary serif paired with a quiet display caps. The signature is a row of
// coloured book spines / a shelf line that runs through the design. The catalog
// reads as ranges & staff picks; "Reserve a book" / enquiry forms stand in for
// booking. MULTI-PAGE: nav opens real routes (Shop / About / In store / Visit)
// under basePath; the sticky parchment header + bottle-green footer are shared.

const PARCH = "#F3EAD8"; // parchment page
const PAGE = "#EFE3CC"; // tinted panel (a touch deeper)
const INK = "#20211C"; // ink text / headings
const GREEN = "#2C4034"; // deep bottle green / footer
const BURGUNDY = "#7C3A33"; // accent
const GOLD = "#B08A3E"; // aged gold
const MUTE = "#5C5A4E"; // muted body on parchment
const LINE = "#DDCFB4"; // hairline on parchment
const serif = { fontFamily: "var(--font-fraunces)" } as const;
const display = { fontFamily: "var(--font-space)" } as const;

const SPINES = [GREEN, BURGUNDY, GOLD, INK, "#496353", "#8C4A41"];

// The signature motif: a row of coloured book spines standing on a shelf line.
function Shelf({ count = 18, className = "" }: { count?: number; className?: string }) {
  const heights = [26, 34, 22, 38, 30, 28, 36, 24, 32, 40];
  return (
    <div className={`flex items-end gap-[3px] ${className}`} aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="block w-[7px] rounded-t-[2px]"
          style={{ height: `${heights[(i * 3) % heights.length]}px`, background: SPINES[i % SPINES.length], opacity: 0.92 }}
        />
      ))}
    </div>
  );
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em] ${center ? "justify-center" : ""}`} style={{ ...display, color: BURGUNDY }}>
      <span className="inline-block h-3 w-[3px] rounded-[1px]" style={{ background: GOLD }} />
      {children}
    </p>
  );
}

export default function VellumDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const products = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Reserve a book";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    products.length > 0 && { label: "Shop", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "In store", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // The "what you'll find" ranges — used when the tenant has no catalog yet, so
  // the bookshop still reads as a bookshop out of the box.
  const defaultRanges = [
    { name: "Fiction", description: "New releases, modern classics and the novels we can't stop pressing on people." },
    { name: "Non-fiction", description: "History, nature, politics, art and the big ideas — shelves to get lost in." },
    { name: "Children's", description: "Picture books, first readers and bedtime favourites, chosen with care." },
    { name: "Local interest", description: "Stories, walks and histories from our own corner of the world." },
    { name: "Cards & gifts", description: "Greetings cards, notebooks, bookmarks and bookish bits and bobs." },
    { name: "Secondhand", description: "A rotating wall of pre-loved finds — come and rummage." },
  ];

  const btnSolid = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-[#F3EAD8] transition hover:opacity-90" style={{ ...display, background: BURGUNDY }}>{label}</a>
  );
  const btnOutline = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full border px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-[#20211C0a]" style={{ ...display, borderColor: GREEN, color: GREEN }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: GREEN }} className="text-[#EFE6D4]">
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <Shelf count={32} className="opacity-90" />
        <div className="mt-6 h-px w-full" style={{ background: "#ffffff1f" }} />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl font-medium tracking-tight text-[#F6EFDD]">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.42em] text-[#EFE6D4]/45" style={display} {...editCopy(content, "footer_subtitle", "Independent Bookshop")} />
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#EFE6D4]/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-[#EFE6D4]/70" style={{ borderColor: "#ffffff26", ...display }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#EFE6D4]/75 transition hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EFE6D4]/45" {...editCopy(content, "footer_shop", "The shop")} />
          <ul className="mt-5 space-y-3 text-sm text-[#EFE6D4]/75">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EFE6D4]/45" {...editCopy(content, "footer_findus", "Find us")} />
          <div className="mt-5 space-y-3 text-sm text-[#EFE6D4]/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#EFE6D4]/45" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#EFE6D4]/75">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#EFE6D4]/45">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#EFE6D4]/60">Open Tue–Sun. Pop in.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#EFE6D499" }}>
        <p>© {new Date().getFullYear()} {name}. Champions of the printed page.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white" style={display}>Events &amp; book clubs</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PARCH }} className="min-h-screen font-body" >
      <VellumHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: PAGE, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 pb-12 pt-32 text-center sm:pt-40">
        <Kicker center><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium leading-[1.04] tracking-tight sm:text-5xl" {...editCopy(content, titleKey, title)} />
        <div className="mt-7 flex justify-center"><Shelf count={20} /></div>
      </div>
    </section>
  );

  // A clean divide-y row — no card panels, no dotted leaders.
  const Row = ({ label, title, desc, price, id }: { label?: string; title: string; desc?: string; price?: string; id?: string }) => (
    <div className="flex items-baseline gap-6 py-6">
      <span className="mt-1 hidden h-7 w-[6px] shrink-0 self-start rounded-[1px] sm:block" style={{ background: SPINES[(title.charCodeAt(0) || 0) % SPINES.length] }} aria-hidden />
      <div className="min-w-0 flex-1">
        {label && <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ ...display, color: GOLD }}>{label}</p>}
        <h3 data-edit={id ? `item:${id}:name` : undefined} style={{ ...serif, color: INK }} className="mt-1 text-xl font-medium tracking-tight">{title}</h3>
        {desc && <p data-edit={id ? `item:${id}:description` : undefined} className="mt-1.5 max-w-2xl text-sm leading-relaxed" style={{ color: MUTE }}>{desc}</p>}
      </div>
      {price && <span data-edit={id ? `item:${id}:price` : undefined} className="shrink-0 text-sm font-medium" style={{ color: BURGUNDY }}>{price}</span>}
    </div>
  );

  // ---- SHOP / SERVICES (ranges + full list) ----
  if (page === "services") {
    const ranges = products.length > 0 ? products : defaultRanges.map((r, i) => ({ id: `range-${i}`, ...r, price: "" }));
    return shell(
      <>
        {banner("What you'll find", "shop_kicker", "On our shelves", "shop_title")}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="divide-y" style={{ borderColor: LINE }}>
            {ranges.map((s) => (
              <Row key={s.id} title={s.name} desc={s.description ?? undefined} price={s.price || undefined} id={products.length > 0 ? s.id : undefined} />
            ))}
          </div>
          <p className="mt-10 text-sm leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "shop_order_note", "Can't see what you're after? We can order in almost any book in print — usually within a day or two. Just ask.")} />
          <div className="mt-8">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "about_kicker", "A shop full of recommendations", "about_title")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_proudly_heading", "Proudly part of")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] uppercase tracking-[0.14em]" style={{ ...display, borderColor: `${GREEN}55`, color: GREEN }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl font-medium" {...editCopy(content, "about_readers_heading", "Readers from")} />
              <p className="mt-4 text-[16px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- IN STORE / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In store", "gallery_kicker", "Come and browse", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-12">
            <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full rounded-[3px] object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- VISIT / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "contact_kicker", "Come in for a browse", "contact_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl font-medium" {...editCopy(content, "contact_findshop_heading", "Find the shop")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#7C3A33]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#7C3A33]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#8c8770]">{h.open}</span></li>))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.12em] transition hover:bg-[#20211C0a]" style={{ ...display, borderColor: GREEN, color: GREEN }} {...editCopy(content, "directions_cta", "Get directions")} />
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Reserve a book"
                bookingBlurb="Want us to set a title aside, order something in or save you a spot at an event? Tell us more."
                bookingCta="Send request"
                contactTitle="Ask us anything"
                theme={{ card: "#FBF5E7", cardBorder: LINE, heading: INK, blurb: MUTE, label: "#5C5A4E", fieldBg: PARCH, fieldBorder: "#D6C6A8", fieldText: INK, button: BURGUNDY, buttonText: "#F3EAD8", radius: "0.9rem", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const staffPicks = products.slice(0, 3);
  const homeRanges = defaultRanges;

  return shell(
    <>
      {/* hero — warm parchment/ink, literary, with the book-spine signature */}
      <section className="relative overflow-hidden" style={{ background: PARCH }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-32 pb-16 sm:pt-40 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:pb-24">
          <div>
            <Kicker>{content.service_areas?.[0] ? `Your bookshop in ${content.service_areas[0]}` : "Hand-picked · independent · since day one"}</Kicker>
            <h1 style={{ ...serif, color: INK }} className="mt-5 text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Books worth getting lost in."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-[13px] font-semibold uppercase tracking-[0.25em]" style={{ ...display, color: BURGUNDY }}>{name}</p>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "hero_intro", "A small, characterful bookshop with shelves chosen by hand, recommendations always going spare, and a comfy corner to read in. Browsers very welcome.")} />
            <div className="mt-9 flex flex-wrap gap-3">
              {products.length > 0 ? btnSolid("Browse the shelves", href("services")) : btnSolid(ctaLabel, cta)}
              {phone ? btnOutline(`Call ${phone}`, `tel:${phone}`) : btnOutline("Visit us", href("contact"))}
            </div>
            <div className="mt-10"><Shelf count={26} /></div>
          </div>
          <div className="relative">
            <div className="relative overflow-hidden rounded-[6px]" style={{ boxShadow: "0 40px 80px -50px rgba(32,33,28,0.65)" }}>
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/5] w-full place-items-center" style={{ background: `linear-gradient(150deg,${PAGE},#E4D4B4)` }}>
                  <span style={{ ...serif, color: `${GREEN}` }} className="text-6xl">{name.trim().charAt(0)}</span>
                </div>
              )}
            </div>
            {/* bookmark ribbon */}
            <span aria-hidden className="absolute -top-1 right-8 hidden w-7 sm:block" style={{ height: "84px", background: BURGUNDY, clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% 80%, 0 100%)" }} />
          </div>
        </div>
      </section>

      {/* staff picks / this month — featured shelf */}
      {staffPicks.length > 0 && (
        <section style={{ background: PAGE, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker><span {...editCopy(content, "home_picks_kicker", "Staff picks · this month")} /></Kicker>
                <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "home_picks_heading", "Books we're pressing on everyone")} />
              </div>
              <a href={href("services")} className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: BURGUNDY }} {...editCopy(content, "home_picks_link", "See the shelves →")} />
            </div>
            <div className="mt-10 grid gap-10 sm:grid-cols-3">
              {staffPicks.map((s, i) => (
                <div key={s.id} className="flex flex-col">
                  <div className="relative overflow-hidden rounded-[4px]" style={{ background: "#E4D4B4" }}>
                    {gallery[i % Math.max(gallery.length, 1)]?.image_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={gallery[i % gallery.length].image_url} alt="" className="aspect-[3/4] w-full object-cover" />
                    ) : (
                      <div className="grid aspect-[3/4] w-full place-items-center" style={{ background: SPINES[i % SPINES.length] }}>
                        <span style={{ ...serif }} className="px-4 text-center text-lg font-medium text-[#F3EAD8]">{s.name}</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 flex items-baseline justify-between gap-3">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="text-lg font-medium">{s.name}</h3>
                    {s.price && <span data-edit={`item:${s.id}:price`} className="text-sm font-medium" style={{ color: BURGUNDY }}>{s.price}</span>}
                  </div>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* what you'll find — ranges list (clean divide-y rows) */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Kicker center><span {...editCopy(content, "home_find_kicker", "What you'll find")} /></Kicker>
        <h2 style={{ ...serif, color: INK }} className="mx-auto mt-3 max-w-xl text-center text-3xl font-medium leading-snug tracking-tight sm:text-4xl" {...editCopy(content, "home_find_heading", "Shelves to wander, in no particular hurry")} />
        <div className="mt-12 divide-y" style={{ borderColor: LINE }}>
          {homeRanges.map((r) => (
            <Row key={r.name} title={r.name} desc={r.description} />
          ))}
        </div>
        <p className="mt-8 text-center text-sm leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_find_note", "Not in stock? We'll order almost any book in print, usually in a day or two.")} />
      </section>

      {/* about statement */}
      {content.about && (
        <section style={{ background: PAGE, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Kicker center><span {...editCopy(content, "home_story_kicker", "Our story")} /></Kicker>
            <p data-edit="content.about" style={{ ...serif, color: INK }} className="mt-6 text-2xl font-medium leading-[1.5] sm:text-[2rem]">{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ ...display, color: BURGUNDY }} {...editCopy(content, "home_story_link", "More about us →")} />
          </div>
        </section>
      )}

      {/* events & book clubs band */}
      <section style={{ background: GREEN }} className="text-[#EFE6D4]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ ...display, color: GOLD }}>
                <span className="inline-block h-3 w-[3px] rounded-[1px]" style={{ background: GOLD }} />Events &amp; book clubs
              </p>
              <h2 style={serif} className="mt-3 max-w-xl text-3xl font-medium tracking-tight text-[#F6EFDD] sm:text-4xl" {...editCopy(content, "home_events_heading", "Author evenings, story times and a monthly book club")} />
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[#EFE6D4]/75" {...editCopy(content, "home_events_body", "There's nearly always something on — readings, signings, children's story times and our book club (everyone welcome, no homework required). Ask in store or get in touch to join the mailing list.")} />
              <div className="mt-7"><a href={cta} className="inline-flex rounded-full px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ ...display, background: GOLD, color: INK }} {...editCopy(content, "home_events_cta", "Join the list")} /></div>
            </div>
            <div className="hidden lg:block"><Shelf count={10} className="rotate-90 origin-center scale-[1.6]" /></div>
          </div>
        </div>
      </section>

      {/* in store strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Kicker center><span {...editCopy(content, "home_instore_kicker", "In store")} /></Kicker>
          <h2 style={{ ...serif, color: INK }} className="mx-auto mt-3 max-w-2xl text-center text-3xl font-medium leading-snug tracking-tight sm:text-4xl" {...editCopy(content, "home_instore_heading", "A proper bookshop to spend an afternoon in")} />
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-[3px] object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">{btnOutline("See the shop", href("gallery"))}</div>
        </section>
      )}

      {/* visit us — opening hours & find us band */}
      <section style={{ background: PAGE, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_visit_kicker", "Visit us")} /></Kicker>
            <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" {...editCopy(content, "home_visit_heading", "Opening hours & find us")} />
            <div className="mt-6 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#7C3A33]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#7C3A33]">{content.email}</a>}
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              {btnSolid(ctaLabel, cta)}
              {content.map_url && btnOutline("Get directions", content.map_url)}
            </div>
          </div>
          <div>
            {content.hours && content.hours.length > 0 ? (
              <ul className="divide-y text-[15px]" style={{ borderColor: LINE, color: INK }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6 py-3.5">
                    <span data-edit={`hours:${i}:day`} className="font-medium">{h.day}</span>
                    <span data-edit={`hours:${i}:open`} style={{ color: MUTE }}>{h.open}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_visit_hours_fallback", "Open Tuesday to Sunday. Pop in whenever the lights are on — there's always a recommendation waiting.")} />
            )}
          </div>
        </div>
      </section>

      {/* friendly enquiry CTA */}
      <section style={{ background: BURGUNDY }} className="text-[#F3EAD8]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={serif} className="text-3xl font-medium leading-[1.05] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Looking for something in particular?")} />
            <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#F3EAD8]/80" {...editCopy(content, "cta_sub", "Reserve a title, order anything in print, or just ask us what to read next.")} />
          </div>
          <a href={cta} className="inline-flex shrink-0 rounded-full bg-[#F3EAD8] px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ ...display, color: BURGUNDY }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
