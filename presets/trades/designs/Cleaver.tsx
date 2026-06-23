import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CleaverHeader } from "./CleaverHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Cleaver — a proper traditional craft butcher. Butcher-block cream and deep
// meat-red with charcoal ink, a sage butcher-stripe and brass accents. The
// signature is the butcher-stripe awning + a chalkboard counter board: hearty,
// honest, premium-independent shop character. Built for butchers, farm shops,
// delis and BBQ-box specialists who sell quality local meat and expert cuts.
// MULTI-PAGE: nav opens real routes (Counter / About / Shop / Contact) under
// basePath; the sticky header + dark footer are shared. Catalog reads as the
// cuts "at the counter". Tenant swaps in their own photography and copy.

const CREAM = "#F2E9DA"; // butcher-block page
const PAPER = "#EADFCB"; // tinted band
const RED = "#8E2B2B"; // deep meat-red
const CHAR = "#232120"; // charcoal ink / footer
const SAGE = "#3E5240"; // butcher-stripe green
const BRASS = "#B58A45"; // brass accent
const MUTE = "#6b6258"; // muted body
const LINE = "#dccdb4"; // hairline
const display = { fontFamily: "var(--font-space)" } as const;

// The signature butcher-stripe — a repeating diagonal awning band in red/cream.
function Stripe({ className = "", color = RED }: { className?: string; color?: string }) {
  return (
    <div
      aria-hidden
      className={className}
      style={{ background: `repeating-linear-gradient(45deg, ${color} 0 10px, ${CREAM} 10px 20px)` }}
    />
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.24em]" style={{ color: light ? BRASS : RED }}>
      <span aria-hidden className="inline-block h-3 w-3 rounded-[2px]" style={{ background: `repeating-linear-gradient(45deg, ${light ? BRASS : RED} 0 3px, transparent 3px 6px)` }} />
      {children}
    </span>
  );
}

export default function CleaverDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const cuts = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Order for collection";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    cuts.length > 0 && { label: "Counter", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "The Shop", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnRed = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: RED }}>{label}</a>
  );
  const btnOutline = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-white/40" style={{ borderColor: CHAR, color: CHAR }}>{label}</a>
  );

  // Chalkboard counter board — the signature surface for the cuts list.
  const Board = ({ children }: { children: ReactNode }) => (
    <div className="relative overflow-hidden rounded-[14px] p-7 sm:p-10" style={{ background: CHAR, border: `3px solid ${BRASS}`, boxShadow: `inset 0 0 0 1px #ffffff10, 0 30px 60px -40px rgba(35,33,32,0.8)` }}>
      <Stripe className="absolute inset-x-0 top-0 h-2.5" />
      {children}
    </div>
  );

  const footer = (
    <footer style={{ background: CHAR }} className="text-[#f2e9da]">
      <Stripe className="h-3" />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span aria-hidden className="inline-block h-7 w-3 rounded-[2px]" style={{ background: `repeating-linear-gradient(45deg, ${RED} 0 4px, ${CREAM} 4px 8px)` }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.05em] text-[#f2e9da]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#f2e9da]/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#f2e9da]/75" style={{ borderColor: "#ffffff26" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-[#f2e9da]/75 transition hover:bg-[#8E2B2B] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#f2e9da]/45" {...editCopy(content, "footer_shop", "The Shop")} />
          <ul className="mt-5 space-y-3 text-sm text-[#f2e9da]/70">
            {nav.map((l) => (<li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#f2e9da]/45" {...editCopy(content, "footer_findus", "Find us")} />
          <div className="mt-5 space-y-3 text-sm text-[#f2e9da]/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-[#f2e9da]/45" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#f2e9da]/70">
              {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#f2e9da]/40">{h.open}</span></li>))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#f2e9da]/60">Tue–Sat, fresh daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#f2e9da66" }}>
        <p>© {new Date().getFullYear()} {name}. Traditional craft butcher.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <CleaverHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, blurb?: string, blurbKey?: string) => (
    <section className="relative overflow-hidden" style={{ background: PAPER, borderBottom: `1px solid ${LINE}` }}>
      <Stripe className="absolute inset-x-0 top-0 h-2.5" />
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...display, color: CHAR }} className="mt-4 max-w-4xl text-4xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {blurb && <p className="mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, blurbKey ?? "", blurb)} />}
      </div>
    </section>
  );

  // ---- COUNTER / SERVICES (the cuts) ----
  if (page === "services") {
    return shell(
      <>
        {banner("At the counter", "svc_kicker", "Today's cuts", "svc_title", "Beef, lamb, pork and poultry — plus our own sausages, burgers and BBQ packs. Ask and we'll cut to order.", "svc_blurb")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {cuts.length > 0 ? (
            <Board>
              <ul className="divide-y" style={{ borderColor: "#ffffff1f" }}>
                {cuts.map((s) => (
                  <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                    <div className="min-w-0">
                      <p data-edit={`item:${s.id}:name`} style={display} className="text-lg font-extrabold uppercase tracking-[0.02em] text-[#f2e9da]">{s.name}</p>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed text-[#f2e9da]/60">{s.description}</p>}
                    </div>
                    {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: BRASS }}>{s.price}</span>}
                  </li>
                ))}
              </ul>
            </Board>
          ) : <p style={{ color: MUTE }}>The counter is being stocked — back shortly.</p>}
          <div className="mt-12 text-center">{btnRed(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our trade", "about_kicker", "Proper butchers, properly trained", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: CHAR }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "about_quality_heading", "Quality & provenance")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${BRASS}99`, color: CHAR }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: CHAR }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "about_provenance_heading", "Where our meat comes from")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnRed(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- THE SHOP / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("The shop", "gallery_kicker", "Behind the counter", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-[10px] object-cover" />
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
        {banner("Visit us", "contact_kicker", "Place an order", "contact_title", "Drop in, give us a ring, or send your order for collection — BBQ packs and bulk orders welcome.", "contact_blurb")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: CHAR }} className="text-2xl font-extrabold uppercase tracking-tight" {...editCopy(content, "contact_heading", "Find the shop")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#8E2B2B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#8E2B2B]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (<li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a89679]">{h.open}</span></li>))}
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
                bookingTitle="Place an order"
                bookingBlurb="Tell us the cuts, quantities and your collection day — sausages, BBQ packs and bulk orders all welcome."
                bookingCta="Send order"
                contactTitle="Ask the butcher"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: CHAR, blurb: MUTE, label: "#6b6258", fieldBg: CREAM, fieldBorder: "#d8c8ad", fieldText: CHAR, button: RED, buttonText: "#ffffff", radius: "0.75rem", font: "var(--font-space)" }}
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
      {/* hero — hearty cream/red with the butcher-stripe awning */}
      <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${RED} 0%, #6f2222 60%, ${CHAR} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(35,33,32,0.86) 0%, rgba(35,33,32,0.6) 45%, rgba(35,33,32,0.2) 100%)" }} />
        {/* butcher-stripe awning along the top */}
        <Stripe className="absolute inset-x-0 top-0 z-10 h-4" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Your local butcher in ${content.service_areas[0]}` : "Traditional craft butcher"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.9] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Proper meat, properly butchered."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75" {...editCopy(content, "hero_sub", "Locally sourced, expertly cut. Beef, lamb and pork, our own sausages and burgers, and BBQ boxes made to order.")} />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnRed(ctaLabel, cta)}
            {phone && <a href={`tel:${phone}`} className="inline-flex rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff66" }}>{`Call ${phone}`}</a>}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
              {content.accreditations.map((a) => <span key={a}>✓ {a}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* trust strip — what the shop stands for */}
      <section style={{ background: SAGE }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-9 text-center sm:grid-cols-3" style={{ color: "#f2e9da" }}>
          {[
            { k: "Locally sourced", v: "We know every farm and field." },
            { k: "Cut to order", v: "Trained butchers at the block." },
            { k: "Sausages & BBQ", v: "Made in-house, fresh daily." },
          ].map((s) => (
            <div key={s.k}>
              <p style={display} className="text-sm font-extrabold uppercase tracking-[0.14em]">{s.k}</p>
              <p className="mt-1 text-[13px] text-[#f2e9da]/75">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[12px] object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[12px]" style={{ background: `linear-gradient(145deg, ${PAPER}, #ddccae)` }} />
            )}
            <Stripe className="absolute -bottom-3 -left-3 h-12 w-12 rounded-[8px]" />
          </div>
          <div>
            <Kicker><span {...editCopy(content, "about_kicker_home", "Our trade")} /></Kicker>
            <h2 style={{ ...display, color: CHAR }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl" {...editCopy(content, "about_heading_home", "A proper butcher you can trust")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: RED }} {...editCopy(content, "about_link_home", "More about us →")} />
          </div>
        </section>
      )}

      {/* at the counter — cuts on the chalkboard */}
      {cuts.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="text-center">
              <Kicker><span {...editCopy(content, "counter_kicker", "At the counter")} /></Kicker>
              <h2 style={{ ...display, color: CHAR }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "counter_heading", "Today's cuts")} />
            </div>
            <div className="mt-12">
              <Board>
                <ul className="divide-y" style={{ borderColor: "#ffffff1f" }}>
                  {cuts.slice(0, 7).map((s) => (
                    <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${s.id}:name`} style={display} className="text-lg font-extrabold uppercase tracking-[0.02em] text-[#f2e9da]">{s.name}</p>
                        {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed text-[#f2e9da]/60">{s.description}</p>}
                      </div>
                      {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: BRASS }}>{s.price}</span>}
                    </li>
                  ))}
                </ul>
              </Board>
            </div>
            <div className="mt-10 text-center">
              <a href={href("services")} className="text-[12px] font-extrabold uppercase tracking-[0.18em] underline-offset-4 hover:underline" style={{ color: RED }} {...editCopy(content, "counter_link", "See the full counter →")} />
            </div>
          </div>
        </section>
      )}

      {/* provenance band — where our meat comes from */}
      <section style={{ background: CHAR }} className="text-[#f2e9da]">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-8 py-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Kicker light><span {...editCopy(content, "provenance_kicker", "Where our meat comes from")} /></Kicker>
            <h2 style={display} className="mt-4 text-3xl font-extrabold uppercase leading-[0.98] tracking-tight sm:text-4xl" {...editCopy(content, "provenance_heading", "Known farms, named fields, full provenance")} />
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-[#f2e9da]/70">
              {content.service_areas && content.service_areas.length > 0
                ? `We work with trusted farms across ${content.service_areas.join(", ")} — short journeys, high welfare, proper flavour.`
                : "We work with trusted local farms — short journeys, high welfare and proper flavour, every time."}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {(gallery.length > 0 ? gallery.slice(0, 6) : []).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[10px] object-cover" />
            ))}
            {gallery.length === 0 && (
              <>
                {["Beef", "Lamb", "Pork", "Poultry", "Sausages", "BBQ"].map((t) => (
                  <div key={t} className="grid aspect-square w-full place-items-center rounded-[10px] text-center" style={{ background: "#2e2b29", border: `1px solid ${BRASS}40` }}>
                    <span style={display} className="text-xs font-extrabold uppercase tracking-[0.14em]" >{t}</span>
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
            <Kicker><span {...editCopy(content, "shop_kicker", "The shop")} /></Kicker>
            <h2 style={{ ...display, color: CHAR }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "shop_heading", "Behind the counter")} />
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-[10px] object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="text-[12px] font-extrabold uppercase tracking-[0.18em] underline-offset-4 hover:underline" style={{ color: RED }} {...editCopy(content, "shop_link", "Look around the shop →")} />
          </div>
        </section>
      )}

      {/* visit us — opening hours band */}
      {content.hours && content.hours.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-8 py-20">
            <div className="text-center">
              <Kicker><span {...editCopy(content, "visit_kicker", "Visit us")} /></Kicker>
              <h2 style={{ ...display, color: CHAR }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl" {...editCopy(content, "visit_heading", "Opening hours")} />
            </div>
            <ul className="mx-auto mt-10 max-w-lg divide-y" style={{ borderColor: LINE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex items-baseline justify-between gap-8 py-3">
                  <span data-edit={`hours:${i}:day`} style={display} className="text-sm font-extrabold uppercase tracking-[0.1em]" >{h.day}</span>
                  <span data-edit={`hours:${i}:open`} className="text-sm" style={{ color: MUTE }}>{h.open}</span>
                </li>
              ))}
            </ul>
            {content.address && <p data-edit="content.address" className="mx-auto mt-8 max-w-md whitespace-pre-line text-center text-sm leading-relaxed" style={{ color: MUTE }}>{content.address}</p>}
          </div>
        </section>
      )}

      {/* closing CTA — order / enquiry */}
      <section className="relative overflow-hidden" style={{ background: RED }}>
        <Stripe className="absolute inset-x-0 top-0 h-2.5" color={CHAR} />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Order for collection or a BBQ pack")} />
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/75" {...editCopy(content, "cta_sub", "Cut to order. Ready when you are.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full bg-white px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:brightness-95" style={{ color: RED }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
