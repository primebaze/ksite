import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PanelworksHeader } from "./PanelworksHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Panelworks — a precise, professional accident-repair BODYSHOP design. Gunmetal
// graphite with a factory-red accent, brushed-silver detailing and clean white
// space; the signature motif is a row of paint colour-match chips above thin
// panel-seam rules — the visual language of crash repair, dent & scratch,
// resprays and "back to flawless" finishing. Trust leads everything: insurance-
// approved, all makes, lifetime guarantee, free estimates, courtesy cars, areas
// covered. Distinct from the performance-garage siblings (Apex / Velocity) and
// from any car-dealer forecourt. MULTI-PAGE: nav opens real routes (Services /
// About / Work / Contact) under basePath; the sticky header + footer are shared.

const GRAPHITE = "#2B2F36"; // gunmetal page surface
const INK = "#15181C"; // deep ink (footer / panels)
const STEEL = "#222730"; // lifted card surface
const RED = "#D23B2E"; // factory red accent
const SILVER = "#AEB6BD"; // brushed silver
const WHITE = "#F4F6F7"; // clean white text
const MUTE = "#9aa3ad"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

// The colour-match signature: a row of paint swatch chips. Reused across pages.
function PaintChips({ className = "" }: { className?: string }) {
  const chips = [RED, SILVER, "#3a4350", WHITE, INK];
  return (
    <span className={`inline-flex items-center gap-1 ${className}`} aria-hidden>
      {chips.map((c, i) => (
        <span key={i} className="h-3 w-3 rounded-[2px] ring-1 ring-white/15" style={{ background: c }} />
      ))}
    </span>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: RED }}>
      <span className="h-3 w-3 rounded-[2px]" style={{ background: RED }} />
      {children}
    </p>
  );
}

export default function PanelworksDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a free estimate";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  // Trust pillars that lead a modern accident-repair bodyshop.
  const trust = ["Insurance approved", "All makes & models", "Lifetime guarantee", "Free estimates", "Courtesy cars"];

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const redBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: RED }}>{label}</a>
  );
  const ghostBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: "#ffffff33", color: WHITE }}>{label}</a>
  );

  const footer = (
    <footer style={{ background: INK, borderTop: `2px solid ${RED}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <PaintChips />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold uppercase tracking-[0.08em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {(content.accreditations && content.accreditations.length > 0 ? content.accreditations : ["Insurance approved", "Lifetime guarantee"]).map((a) => (
              <span key={a} className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff1f", color: SILVER }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:bg-[#D23B2E] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Bodyshop</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/50">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Fri, Sat by appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: GRAPHITE }} className="min-h-screen font-body">
      <PanelworksHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: INK, borderBottom: `2px solid ${RED}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-bold uppercase leading-[0.96] tracking-tight sm:text-6xl">{title}</h1>
        {/* panel-seam rule under every banner heading */}
        <div className="mt-7 h-px w-full" style={{ background: "linear-gradient(90deg,#ffffff22,transparent)" }} />
      </div>
    </section>
  );

  // Clean divider-row services list — name + desc left, price right. No leaders,
  // no card panels. Shared by the home preview and the full services page.
  const serviceRows = (items: typeof services) => (
    <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
      {items.map((s, i) => (
        <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
          <div className="flex min-w-0 gap-5">
            <span style={{ ...display, color: RED }} className="hidden text-sm font-bold tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <p data-edit={`item:${s.id}:name`} style={{ ...display, color: WHITE }} className="text-lg font-bold uppercase tracking-tight">{s.name}</p>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-bold" style={{ color: SILVER }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Repair Services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            serviceRows(services)
          ) : (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {["Accident repair", "Dent & scratch", "Resprays", "Panel replacement", "Alloy refurb", "Insurance work"].map((s) => (
                <li key={s} className="py-6"><p style={{ ...display, color: WHITE }} className="text-lg font-bold uppercase tracking-tight">{s}</p></li>
              ))}
            </ul>
          )}
          <div className="mt-12 flex flex-wrap gap-3">{redBtn(ctaLabel, cta)}{phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The bodyshop", "Back To Flawless")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}

          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t} className="flex items-center gap-3 border-l-2 py-3 pl-4 text-sm font-semibold uppercase tracking-[0.08em]" style={{ borderColor: RED, color: WHITE }}>{t}</div>
            ))}
          </div>

          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: WHITE }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]">Approved &amp; accredited</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${RED}66`, color: WHITE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: WHITE }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{redBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Free estimate", "Request A Quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: WHITE }} className="text-2xl font-bold uppercase tracking-tight">Bring it in</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }}>Send a few photos of the damage and we&apos;ll come back with a free, no-obligation estimate. Courtesy cars available while we work.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us the make, model and what's happened — attach photos if you can and we'll send a free estimate."
                bookingCta="Send request"
                theme={{ card: STEEL, cardBorder: "#ffffff1a", heading: WHITE, blurb: MUTE, label: "#c2c6cd", fieldBg: INK, fieldBorder: "#ffffff22", fieldText: WHITE, button: RED, buttonText: "#ffffff", radius: "0", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — before/after centrepiece) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Before & after", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.id} className="group relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  {g.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Before &amp; after photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — graphite workshop with paint colour-match signature */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#2B2F36,#15181C)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(21,24,28,0.94) 0%, rgba(21,24,28,0.75) 45%, rgba(21,24,28,0.3) 100%)" }} />
        {/* panel-seam line across the hero */}
        <div className="pointer-events-none absolute inset-x-0 top-[58%] h-px" style={{ background: "linear-gradient(90deg, transparent, #ffffff22 35%, #ffffff22 65%, transparent)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <div className="flex items-center gap-4">
            <PaintChips />
            <span className="text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: SILVER }}>Paint &amp; panel · colour matched</span>
          </div>
          <h1 style={display} className="mt-6 max-w-4xl text-5xl font-bold uppercase leading-[0.92] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Back to flawless."}</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80">Accident repair, dent &amp; scratch, resprays and panel work — finished like the day you bought it.</p>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/55">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {redBtn(ctaLabel, cta)}
            {phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
            {trust.map((t) => <span key={t}>✓ {t}</span>)}
          </div>
        </div>
      </section>

      {/* insurance-approved trust strip */}
      <section style={{ background: RED }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-5 text-center text-white">
          {(content.accreditations && content.accreditations.length > 0 ? content.accreditations : ["Insurance approved", "All makes & models", "Manufacturer-grade paint", "Lifetime guarantee"]).map((a) => (
            <span key={a} className="text-[12px] font-bold uppercase tracking-[0.16em]">{a}</span>
          ))}
        </div>
      </section>

      {/* what we do — colour-chip + panel-seam service grid */}
      <section style={{ background: INK, borderBottom: "1px solid #ffffff12" }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>What we do</Kicker>
          <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">Crash repair &amp; refinishing</h2>
          {services.length > 0 ? (
            <div className="mt-12">{serviceRows(services.slice(0, 6))}</div>
          ) : (
            <div className="mt-12 grid gap-px sm:grid-cols-2 lg:grid-cols-3" style={{ background: "#ffffff14" }}>
              {[
                ["Accident repair", "Structural and cosmetic crash repair, restored to a factory finish."],
                ["Dent & scratch", "Fast, tidy removal of dents, scuffs and kerb scratches."],
                ["Resprays", "Full and panel resprays in a precise, colour-matched finish."],
                ["Panel replacement", "Bonded and welded panel work using OEM-grade parts."],
                ["Alloy refurb", "Kerbed and corroded wheels brought back to as-new."],
                ["Insurance work", "Approved repairs handled start to finish with your insurer."],
              ].map(([t, d]) => (
                <div key={t} className="p-7" style={{ background: INK }}>
                  <PaintChips />
                  <h3 style={{ ...display, color: WHITE }} className="mt-4 text-lg font-bold uppercase tracking-tight">{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{d}</p>
                </div>
              ))}
            </div>
          )}
          {services.length > 0 && <div className="mt-12">{ghostBtn("View all services", href("services"))}</div>}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: STEEL }} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16" style={{ borderBottom: `4px solid ${RED}`, borderLeft: `4px solid ${RED}` }} />
          </div>
          <div>
            <Kicker>The bodyshop</Kicker>
            <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-bold uppercase leading-[0.96] tracking-tight sm:text-5xl">Like the day you bought it</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: RED }}>About the bodyshop →</a>
          </div>
        </section>
      )}

      {/* before/after Work — centrepiece */}
      {gallery.length > 0 && (
        <section style={{ background: INK, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker>Before &amp; after</Kicker>
            <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">The transformation</h2>
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.slice(0, 8).map((g) => (
                <figure key={g.id} className="group relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  {g.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-white">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
            <div className="mt-10">{ghostBtn("See more transforms", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* courtesy car / estimate angle */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-px sm:grid-cols-3" style={{ background: "#ffffff14" }}>
          {[
            ["Free estimates", "Send photos or pop in — a clear, no-obligation price with no surprises."],
            ["Courtesy cars", "Stay mobile while we work, with a courtesy car on request."],
            ["Insurance handled", "We deal directly with your insurer and manage the claim end to end."],
          ].map(([t, d]) => (
            <div key={t} className="p-8" style={{ background: GRAPHITE }}>
              <span className="h-3 w-10 rounded-[2px]" style={{ background: RED, display: "inline-block" }} />
              <h3 style={{ ...display, color: WHITE }} className="mt-4 text-xl font-bold uppercase tracking-tight">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: INK, borderTop: "1px solid #ffffff12" }}>
          <div className="mx-auto max-w-7xl px-8 py-16">
            <Kicker>Areas covered</Kicker>
            <p className="mt-5 flex flex-wrap gap-x-3 gap-y-2 text-lg font-semibold" style={{ color: SILVER }}>
              {content.service_areas.map((a, i) => (
                <span key={a} className="flex items-center gap-3">
                  <span style={{ ...display, color: WHITE }}>{a}</span>
                  {i < content.service_areas!.length - 1 && <span style={{ color: RED }}>/</span>}
                </span>
              ))}
            </p>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: RED }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold uppercase leading-[0.96] tracking-tight sm:text-4xl">Had a knock? Let&apos;s put it right.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/80">Free estimates · courtesy cars · lifetime guarantee.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="bg-[#15181C] px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-125">{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
