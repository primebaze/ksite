import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { FacetHeader } from "./FacetHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Facet — refined fine-jewellery boutique & bespoke goldsmith design. A luxe,
// near-black canvas lit with champagne gold and ivory, a faceted-gem signature
// motif and fine sparkle, spaced display type and a "made to be treasured"
// register. Built for fine jewellers selling engagement rings, bespoke
// commissions and timeless pieces by private appointment. The catalog reads as
// "collections" (Engagement / Wedding / Bespoke / Necklaces / Earrings /
// Watches). MULTI-PAGE: nav opens real routes (Collections / About / Showcase /
// Appointment) under basePath; the sticky transparent-over-hero header + deep
// footer are shared. Tenant swaps in their own photography, pieces and copy.

const INK = "#0B0B0D"; // deep ink page
const NEAR = "#111114"; // near-black surface
const PANEL = "#17171b"; // lifted panel
const GOLD = "#C9A86A"; // champagne gold accent
const IVORY = "#F4F1EA"; // ivory / primary light text
const PLAT = "#C9CBCD"; // soft platinum-grey
const MUTE = "#9b9ca0"; // muted body
const HAIR = "#ffffff1a"; // hairline on dark
const display = { fontFamily: "var(--font-space)" } as const;

// Signature: a faceted gem mark — diamond outline with internal facet lines.
function Gem({ size = 26, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M5 3h14l3 5-10 13L2 8z" fill="none" stroke={GOLD} strokeWidth="1.1" strokeLinejoin="round" />
      <path d="M2 8h20M9 3 7 8l5 13 5-13-2-5M7 8l5 4 5-4" fill="none" stroke={GOLD} strokeWidth="0.8" strokeOpacity="0.7" strokeLinejoin="round" />
    </svg>
  );
}

// A fine sparkle — four-point star, used to dress headings and bands.
function Sparkle({ className = "", color = GOLD }: { className?: string; color?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden className={className}>
      <path d="M12 1c.4 4.8 3.2 7.6 11 8-7.8.4-10.6 3.2-11 8-.4-4.8-3.2-7.6-11-8 7.8-.4 10.6-3.2 11-8z" fill={color} />
    </svg>
  );
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2.5 text-[11px] font-medium uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: GOLD }}>
      <Sparkle />
      {children}
    </p>
  );
}

export default function FacetDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const pieces = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book an appointment";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    pieces.length > 0 && { label: "Collections", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Showcase", href: href("gallery") },
    { label: "Appointment", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Default collection presentation — overridden by real catalog sections.
  const COLLECTIONS = ["Engagement", "Wedding", "Bespoke", "Necklaces", "Earrings", "Watches"];
  const sectionNames = Array.from(new Set(pieces.map((p) => p.section).filter(Boolean))) as string[];
  const collectionLabels = sectionNames.length > 0 ? sectionNames : COLLECTIONS;

  const goldBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.22em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: GOLD, color: INK }}>
      {label}
    </a>
  );
  const ghostBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`border px-8 py-4 text-center text-[11px] font-medium uppercase tracking-[0.22em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: `${GOLD}88`, color: GOLD }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: INK, borderTop: `1px solid ${GOLD}40` }} className="text-[#F4F1EA]">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Gem size={22} />
            <span data-edit="tenant.business_name" style={display} className="text-lg font-medium uppercase tracking-[0.3em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]" style={{ borderColor: HAIR, color: PLAT }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:border-[#C9A86A] hover:text-[#C9A86A]" style={{ border: `1px solid ${HAIR}`, color: `${IVORY}b0` }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: GOLD }} className="text-[11px] font-medium uppercase tracking-[0.26em]">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: GOLD }} className="text-[11px] font-medium uppercase tracking-[0.26em]">The atelier</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: GOLD }} className="text-[11px] font-medium uppercase tracking-[0.26em]">By appointment</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${IVORY}55` }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Private appointments daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: HAIR, color: `${IVORY}66` }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.2em] transition hover:text-white">Bespoke commissions</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: NEAR }} className="min-h-screen font-body" >
      <FacetHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: INK, borderBottom: `1px solid ${GOLD}33` }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-36 text-center sm:pt-44">
        <Kicker center>{kicker}</Kicker>
        <h1 style={{ ...display, color: IVORY }} className="mt-5 text-4xl font-medium tracking-[0.02em] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- COLLECTIONS (services) ----
  if (page === "services") {
    return shell(
      <>
        {banner("The collections", "Pieces to treasure")}
        <section className="mx-auto max-w-7xl px-8 py-20">
          {pieces.length > 0 ? (
            <div className="divide-y" style={{ borderColor: HAIR }}>
              {pieces.map((s, i) => (
                <div key={s.id} className="grid gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8">
                  <span className="text-[11px] font-medium tracking-[0.22em]" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: IVORY }} className="text-xl font-medium tracking-[0.02em]">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-medium tracking-[0.04em]" style={{ color: PLAT }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: MUTE }}>Our collections are coming soon.</p>}
          <div className="mt-14">{goldBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The house", "Our craft & heritage")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: PLAT }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: GOLD }} className="mt-12 text-[11px] font-medium uppercase tracking-[0.28em]">Hallmarks &amp; memberships</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em]" style={{ borderColor: `${GOLD}55`, color: IVORY }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: GOLD }} className="mt-12 text-[11px] font-medium uppercase tracking-[0.28em]">Serving</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{goldBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- SHOWCASE (gallery) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("The showcase", "A gallery of fine pieces")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20 text-center" style={{ color: MUTE }}>Photographs coming soon.</p>}
      </>,
    );
  }

  // ---- APPOINTMENT (contact) ----
  if (page === "contact") {
    return shell(
      <>
        {banner("By appointment", "Visit the atelier")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: IVORY }} className="text-2xl font-medium tracking-[0.02em]">Private appointments</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }}>Sit with one of our goldsmiths over a glass of something to discuss engagement rings, bespoke commissions or a treasured repair.</p>
            <div className="mt-7 space-y-4 text-[15px] leading-relaxed" style={{ color: PLAT }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: HAIR, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${IVORY}55` }}>{h.open}</span></li>
                ))}
              </ul>
            )}
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
                bookingTitle="Book an appointment"
                bookingBlurb="Reserve a private consultation with one of our goldsmiths."
                bookingCta="Request appointment"
                contactTitle="Make an enquiry"
                theme={{ card: PANEL, cardBorder: HAIR, heading: IVORY, blurb: MUTE, label: PLAT, fieldBg: NEAR, fieldBorder: "#ffffff22", fieldText: IVORY, button: GOLD, buttonText: INK, radius: "0", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const process = [
    { n: "01", k: "Consultation", d: "A private, unhurried conversation about the piece you imagine." },
    { n: "02", k: "Design", d: "Hand sketches and CAD bring your commission to life before we begin." },
    { n: "03", k: "Craft", d: "Our master goldsmiths set every stone and finish every facet by hand." },
    { n: "04", k: "Reveal", d: "Your finished piece, presented and ready to be treasured for life." },
  ];

  const trust = [
    { k: "Expert goldsmiths", d: "Decades at the bench, every piece hallmarked and hand-finished." },
    { k: "Ethically sourced", d: "Conflict-free diamonds and responsibly traded precious metals." },
    { k: "Bespoke commissions", d: "One-of-a-kind designs created with you, made to be yours alone." },
    { k: "Private appointments", d: "Considered, one-to-one time in the calm of our atelier." },
  ];

  return shell(
    <>
      {/* hero — luxe dark, faceted register */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 70% 20%, #1c1c22 0%, #111114 45%, #0B0B0D 100%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(11,11,13,0.94) 0%, rgba(11,11,13,0.78) 42%, rgba(11,11,13,0.4) 100%)" }} />
        {/* faceted-gem signature watermark */}
        <Gem size={520} className="pointer-events-none absolute -right-32 top-1/2 hidden -translate-y-1/2 opacity-[0.08] lg:block" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28" style={{ color: IVORY }}>
          <Kicker>{content.service_areas?.[0] ? `Fine jewellers · ${content.service_areas[0]}` : "Fine jewellers · since 1952"}</Kicker>
          <h1 style={display} className="mt-6 max-w-3xl text-5xl font-medium leading-[1.05] tracking-[0.01em] [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Made to be treasured."}</span>
          </h1>
          <p className="mt-6 max-w-md text-[15px] leading-relaxed" style={{ color: PLAT }}>Engagement rings, bespoke commissions and timeless pieces, crafted by hand in our atelier.</p>
          <p data-edit="tenant.business_name" className="mt-7 text-[11px] font-medium uppercase tracking-[0.34em]" style={{ color: `${IVORY}99` }}>{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {goldBtn(ctaLabel, cta)}
            {pieces.length > 0 && ghostBtn("View collections", href("services"))}
          </div>
        </div>
      </section>

      {/* trust strip — ethical sourcing / expert goldsmiths */}
      <section style={{ background: INK, borderTop: `1px solid ${GOLD}26`, borderBottom: `1px solid ${GOLD}26` }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.k} className="px-2">
              <Sparkle />
              <h3 style={{ ...display, color: IVORY }} className="mt-3 text-base font-medium uppercase tracking-[0.14em]">{t.k}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* collections presentation */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="text-center">
          <Kicker center>The collections</Kicker>
          <h2 style={{ ...display, color: IVORY }} className="mt-4 text-4xl font-medium tracking-[0.02em] sm:text-5xl">Explore the house</h2>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-px sm:grid-cols-3" style={{ background: HAIR }}>
          {collectionLabels.slice(0, 6).map((c, i) => (
            <a
              key={c}
              href={pieces.length > 0 ? href("services") : cta}
              className="group relative flex min-h-[180px] flex-col justify-between p-7 transition hover:bg-white/[0.02]"
              style={{ background: i % 2 === 0 ? NEAR : PANEL }}
            >
              <span className="text-[11px] font-medium tracking-[0.22em]" style={{ color: GOLD }}>{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 style={{ ...display, color: IVORY }} className="text-xl font-medium uppercase tracking-[0.1em]">{c}</h3>
                <span className="mt-2 inline-block text-[11px] uppercase tracking-[0.2em] transition group-hover:translate-x-1" style={{ color: GOLD }}>Discover →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* about statement */}
      {content.about && (
        <section style={{ background: INK, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <Kicker>The house</Kicker>
              <h2 style={{ ...display, color: IVORY }} className="mt-4 text-3xl font-medium leading-tight tracking-[0.02em] sm:text-4xl">Crafted at the bench, since the beginning</h2>
              <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: PLAT }}>{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em]" style={{ color: GOLD }}>Our craft &amp; heritage →</a>
            </div>
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/5] w-full place-items-center" style={{ background: PANEL }}><Gem size={72} /></div>
              )}
              <span className="pointer-events-none absolute -bottom-2 -right-2 h-16 w-16" style={{ borderBottom: `2px solid ${GOLD}`, borderRight: `2px solid ${GOLD}` }} />
              <span className="pointer-events-none absolute -left-2 -top-2 h-16 w-16" style={{ borderTop: `2px solid ${GOLD}`, borderLeft: `2px solid ${GOLD}` }} />
            </div>
          </div>
        </section>
      )}

      {/* bespoke commission process band */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="text-center">
          <Kicker center>Bespoke commissions</Kicker>
          <h2 style={{ ...display, color: IVORY }} className="mt-4 text-4xl font-medium tracking-[0.02em] sm:text-5xl">From idea to heirloom</h2>
        </div>
        <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: HAIR }}>
          {process.map((p) => (
            <div key={p.n} className="flex flex-col p-8" style={{ background: NEAR }}>
              <span style={{ ...display, color: GOLD }} className="text-3xl font-medium">{p.n}</span>
              <h3 style={{ ...display, color: IVORY }} className="mt-4 text-lg font-medium uppercase tracking-[0.12em]">{p.k}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTE }}>{p.d}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">{ghostBtn("Begin a commission", cta)}</div>
      </section>

      {/* showcase — jewellery is visual */}
      {gallery.length > 0 && (
        <section style={{ background: INK, borderTop: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <div className="text-center">
              <Kicker center>The showcase</Kicker>
              <h2 style={{ ...display, color: IVORY }} className="mt-4 text-4xl font-medium tracking-[0.02em] sm:text-5xl">Pieces in the light</h2>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
            <div className="mt-10 text-center">{ghostBtn("View the showcase", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* closing appointment CTA */}
      <section style={{ background: GOLD }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-8 py-20 text-center" style={{ color: INK }}>
          <Sparkle color={INK} />
          <h2 style={display} className="max-w-2xl text-3xl font-medium tracking-[0.02em] sm:text-4xl">Book a private appointment</h2>
          <p className="max-w-md text-sm leading-relaxed" style={{ color: "#0B0B0Dcc" }}>Let us help you find — or create — a piece made to be treasured for a lifetime.</p>
          <a href={cta} className="mt-2 inline-flex px-9 py-4 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F4F1EA] transition hover:brightness-125" style={{ background: INK }}>
            {ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
