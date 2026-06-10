import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { HarvestHeader } from "./HarvestHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Harvest — a bright, fresh local greengrocer / fruit & veg shop. Warm cream and
// leaf-green with a tomato-red and sunny-yellow accent. The signature is the
// market: stacked produce crates + a striped awning band + simple fruit-and-veg
// shapes, with a wholesome "fresh from the market, every day" voice. Built for
// greengrocers, farm shops and veg-box rounds who sell seasonal, locally grown
// produce and home delivery. MULTI-PAGE: nav opens real routes (Produce / About
// / The Shop / Visit) under basePath; the sticky header + green footer are
// shared. Catalog reads as the produce we stock. Tenant swaps in photography and copy.

const CREAM = "#F6F1E2"; // warm cream page
const PAPER = "#EFE7CF"; // tinted band
const GREEN = "#3E8E41"; // fresh leaf-green
const DEEP = "#2E5E2C"; // deep green / footer
const TOMATO = "#E0533B"; // tomato red accent
const SUN = "#F4C430"; // sunny yellow accent
const BROWN = "#5E4A33"; // earthy brown ink
const MUTE = "#6f6450"; // muted body
const LINE = "#e0d4b8"; // hairline
const display = { fontFamily: "var(--font-space)" } as const;

// The signature awning — a repeating vertical market-stripe band (green/cream).
function Awning({ className = "", a = GREEN, b = CREAM }: { className?: string; a?: string; b?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ background: `repeating-linear-gradient(90deg, ${a} 0 16px, ${b} 16px 32px)` }}
    />
  );
}

// A little stacked-slat produce crate — recurs as the brand mark / bullet.
function Crate({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden className={`inline-flex flex-col justify-center gap-[3px] rounded-[5px] p-[3px] ${className}`} style={{ background: "#fff", border: `1.5px solid ${GREEN}` }}>
      <span className="h-[3px] w-full rounded-full" style={{ background: TOMATO }} />
      <span className="h-[3px] w-full rounded-full" style={{ background: SUN }} />
      <span className="h-[3px] w-full rounded-full" style={{ background: GREEN }} />
    </span>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: light ? SUN : TOMATO }}>
      <Crate className="h-4 w-4" />
      {children}
    </span>
  );
}

export default function HarvestDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const produce = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Order a veg box";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  // What we stock — the standing ranges (shown when there's no catalog yet too).
  const ranges = ["Fruit", "Vegetables", "Salads & herbs", "Local & organic", "Veg boxes", "Deli"];

  const nav = [
    produce.length > 0 && { label: "Produce", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "The Shop", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnTomato = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-105" style={{ background: TOMATO }}>{label}</a>
  );
  const btnOutline = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-white/50" style={{ borderColor: GREEN, color: DEEP }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: DEEP }} className="text-[#eef3e6]">
      <Awning className="h-3" a={SUN} b={TOMATO} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Crate className="h-7 w-7" />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-[0.01em] text-[#eef3e6]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#eef3e6]/70">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#eef3e6]/80" style={{ borderColor: "#ffffff2e" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#eef3e6]/80 transition hover:bg-[#E0533B] hover:text-white" style={{ border: "1px solid #ffffff2e" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#eef3e6]/55">The Shop</h4>
          <ul className="mt-5 space-y-3 text-sm text-[#eef3e6]/75">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#eef3e6]/55">Find us</h4>
          <div className="mt-5 space-y-3 text-sm text-[#eef3e6]/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#eef3e6]/55">Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#eef3e6]/75">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#eef3e6]/50">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#eef3e6]/65">Open Mon–Sat, fresh daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#eef3e699" }}>
        <p>© {new Date().getFullYear()} {name}. Locally grown, fresh daily.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <HarvestHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section className="relative overflow-hidden" style={{ background: PAPER, borderBottom: `1px solid ${LINE}` }}>
      <Awning className="absolute inset-x-0 top-0 h-3" />
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: BROWN }} className="mt-4 max-w-4xl text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl">{title}</h1>
        {blurb && <p className="mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: MUTE }}>{blurb}</p>}
      </div>
    </section>
  );

  // The produce list — clean divide-y rows on a cream crate-card (no leaders/panels-per-row).
  const ProduceList = ({ items }: { items: typeof produce }) => (
    <div className="overflow-hidden rounded-[16px] bg-white" style={{ border: `1px solid ${LINE}`, boxShadow: "0 30px 60px -45px rgba(46,74,28,0.4)" }}>
      <Awning className="h-2.5" />
      <ul className="divide-y px-6 sm:px-9" style={{ borderColor: LINE }}>
        {items.map((s) => (
          <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
            <div className="min-w-0">
              <p data-edit={`item:${s.id}:name`} style={display} className="text-lg font-extrabold tracking-[0.01em]" >{s.name}</p>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
            {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: GREEN }}>{s.price}</span>}
          </li>
        ))}
      </ul>
    </div>
  );

  // ---- PRODUCE / SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("On the shelves", "Our produce", "Seasonal fruit and veg, salads and herbs, local and organic lines, plus made-up veg boxes — all in fresh every day.")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {produce.length > 0 ? (
            <ProduceList items={produce} />
          ) : <p style={{ color: MUTE }}>This week&apos;s produce is being stocked — back shortly.</p>}
          <div className="mt-12 text-center">{btnTomato(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "Locally grown, fresh daily")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: BROWN }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Grown &amp; graded well</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${GREEN}80`, color: BROWN }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: BROWN }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Where our produce comes from</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnTomato(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- THE SHOP / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("The shop", "Around the market")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[12px] object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- VISIT / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Come to the shop", "Pop in for your fruit and veg, or order a veg box for collection or local delivery — just tell us what you need.")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: BROWN }} className="text-2xl font-extrabold tracking-tight">Find the shop</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#3E8E41]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#3E8E41]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a89c80]">{h.open}</span></li>))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-7">{btnOutline("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Order a veg box"
                bookingBlurb="Tell us your box size, any favourites or things to leave out, and your collection or delivery day."
                bookingCta="Send order"
                contactTitle="Get in touch"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: BROWN, blurb: MUTE, label: "#6f6450", fieldBg: CREAM, fieldBorder: "#ddd0b4", fieldText: BROWN, button: TOMATO, buttonText: "#ffffff", radius: "0.9rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — bright cream/green market with the awning + crates motif */}
      <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden" style={{ background: CREAM }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, #eef3e0 0%, #dcebcf 55%, #cfe3c2 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(246,241,226,0.95) 0%, rgba(246,241,226,0.72) 45%, rgba(246,241,226,0.25) 100%)" }} />
        {/* striped market awning along the top */}
        <Awning className="absolute inset-x-0 top-0 z-10 h-4" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28">
          <Kicker>{content.service_areas?.[0] ? `Your local greengrocer in ${content.service_areas[0]}` : "Your local greengrocer"}</Kicker>
          <h1 style={{ ...display, color: BROWN }} className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.92] tracking-tight sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Fresh from the market, every day."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em]" style={{ color: GREEN }}>{name}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>Seasonal fruit and veg, salads and herbs, local and organic lines — picked and stacked fresh daily. Veg boxes made up your way, for collection or local delivery.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnTomato(ctaLabel, cta)}
            {phone && <a href={`tel:${phone}`} className="inline-flex rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-white/50" style={{ borderColor: GREEN, color: DEEP }}>{`Call ${phone}`}</a>}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: GREEN }}>
              {content.accreditations.map((a) => <span key={a}>✓ {a}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* fresh-promise strip */}
      <section style={{ background: GREEN }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-9 text-center sm:grid-cols-3" style={{ color: CREAM }}>
          {[
            { k: "Locally grown", v: "From farms and growers nearby." },
            { k: "Fresh daily", v: "Picked, graded and stacked each morning." },
            { k: "Veg boxes & delivery", v: "Made up your way, dropped to your door." },
          ].map((s) => (
            <div key={s.k}>
              <p style={display} className="text-sm font-extrabold uppercase tracking-[0.12em]">{s.k}</p>
              <p className="mt-1 text-[13px]" style={{ color: "#eef3e6cc" }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* what's in season — featured produce strip */}
      {produce.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="text-center">
            <Kicker>What&apos;s in season</Kicker>
            <h2 style={{ ...display, color: BROWN }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Fresh in this week</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {produce.slice(0, 6).map((s, i) => (
              <div key={s.id} className="relative flex flex-col overflow-hidden rounded-[14px] bg-white p-6" style={{ border: `1px solid ${LINE}`, boxShadow: "0 18px 40px -32px rgba(46,74,28,0.5)" }}>
                <span className="absolute right-4 top-4 h-5 w-5 rounded-full" style={{ background: [TOMATO, SUN, GREEN][i % 3] }} />
                <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: BROWN }} className="pr-8 text-lg font-extrabold tracking-[0.01em]">{s.name}</h3>
                {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                {s.price && <p data-edit={`item:${s.id}:price`} className="mt-4 text-sm font-extrabold" style={{ color: GREEN }}>{s.price}</p>}
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("services")} className="text-[12px] font-extrabold uppercase tracking-[0.16em] underline-offset-4 hover:underline" style={{ color: TOMATO }}>See all our produce →</a>
          </div>
        </section>
      )}

      {/* what we stock — ranges list */}
      <section style={{ background: PAPER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="text-center">
            <Kicker>What we stock</Kicker>
            <h2 style={{ ...display, color: BROWN }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">From the crates to your kitchen</h2>
          </div>
          <ul className="mx-auto mt-12 max-w-3xl divide-y" style={{ borderColor: LINE }}>
            {ranges.map((r, i) => (
              <li key={r} className="flex items-center gap-5 py-5">
                <span style={{ ...display, color: SUN }} className="w-10 shrink-0 text-lg font-extrabold">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ ...display, color: BROWN }} className="text-xl font-extrabold tracking-[0.01em]">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[14px] object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[14px]" style={{ background: `linear-gradient(145deg, #dcebcf, #cfe3c2)` }} />
            )}
            <Awning className="absolute -bottom-3 -left-3 h-12 w-24 rounded-[10px]" a={SUN} b={TOMATO} />
          </div>
          <div>
            <Kicker>Our story</Kicker>
            <h2 style={{ ...display, color: BROWN }} className="mt-4 text-4xl font-extrabold leading-[0.96] tracking-tight sm:text-5xl">A proper greengrocer you can trust</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: TOMATO }}>More about us →</a>
          </div>
        </section>
      )}

      {/* locally grown — provenance band */}
      <section style={{ background: DEEP }} className="text-[#eef3e6]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 py-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Kicker light>Locally grown</Kicker>
            <h2 style={display} className="mt-4 text-3xl font-extrabold leading-[0.98] tracking-tight sm:text-4xl">Picked nearby, on the shelves the same day</h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#eef3e6]/75">
              {content.service_areas && content.service_areas.length > 0
                ? `We buy from growers and farms across ${content.service_areas.join(", ")} — short journeys, peak ripeness, proper flavour.`
                : "We buy from growers and farms close to home — short journeys, peak ripeness and proper flavour, every day."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(gallery.length > 0 ? gallery.slice(0, 6) : []).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[12px] object-cover" />
            ))}
            {gallery.length === 0 && (
              <>
                {ranges.map((t) => (
                  <div key={t} className="grid aspect-square w-full place-items-center rounded-[12px] p-3 text-center" style={{ background: "#27502560", border: `1px solid ${SUN}40` }}>
                    <span style={display} className="text-xs font-extrabold uppercase tracking-[0.1em]">{t}</span>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* the shop / gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="text-center">
            <Kicker>The shop</Kicker>
            <h2 style={{ ...display, color: BROWN }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Around the market</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[12px] object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="text-[12px] font-extrabold uppercase tracking-[0.16em] underline-offset-4 hover:underline" style={{ color: TOMATO }}>Look around the shop →</a>
          </div>
        </section>
      )}

      {/* visit us — opening hours band */}
      {content.hours && content.hours.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-8 py-20">
            <div className="text-center">
              <Kicker>Visit us</Kicker>
              <h2 style={{ ...display, color: BROWN }} className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">Opening hours</h2>
            </div>
            <ul className="mx-auto mt-10 max-w-lg divide-y" style={{ borderColor: LINE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex items-baseline justify-between gap-8 py-3">
                  <span data-edit={`hours:${i}:day`} style={display} className="text-sm font-extrabold uppercase tracking-[0.08em]" >{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-sm" style={{ color: MUTE }}>{h.open}</span>
                </li>
              ))}
            </ul>
            {content.address && <p data-edit="content.address" className="mx-auto mt-8 max-w-md whitespace-pre-line text-center text-sm leading-relaxed" style={{ color: MUTE }}>{content.address}</p>}
          </div>
        </section>
      )}

      {/* closing CTA — order / enquiry */}
      <section className="relative overflow-hidden" style={{ background: TOMATO }}>
        <Awning className="absolute inset-x-0 top-0 h-3" a={DEEP} b={SUN} />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold leading-[0.96] tracking-tight sm:text-4xl">Order a veg box, or just come and browse</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-white/80">Collection or local delivery. Fresh when you are.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full bg-white px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ color: TOMATO }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
