import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { TesseraHeader } from "./TesseraHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Tessera — precise, design-aware wall & floor tiling specialist. Glazed-ceramic
// white canvas, deep ink type, a Moroccan-blue glaze primary and a terracotta
// clay accent, with a warm grey-green grout neutral. The structural signature is
// a literal tessellating tile grid: a square/hex motif recurs as the hero
// backdrop, as section dividers and as accent blocks. Premium, geometric and
// level-to-the-millimetre. MULTI-PAGE: nav opens real routes under basePath; the
// sticky header + ceramic footer are shared. var(--font-space) display.

const CERAMIC = "#F4F2EE"; // glazed ceramic white page
const INK = "#1E2329"; // deep ink text / dark bands
const GLAZE = "#2E6E8E"; // Moroccan-blue glaze (primary)
const CLAY = "#C16A4A"; // terracotta clay (accent)
const GROUT = "#9AA39B"; // warm grey-green grout (neutral)
const MUTE = "#5C6168"; // muted ink body
const LINE = "#1E23291a"; // hairline on ceramic
const display = { fontFamily: "var(--font-space)" } as const;

// The recurring tessellation motif — a tight grid of glazed tiles in the palette,
// laid in a fixed pattern so it reads as a deliberate, repeating signature rather
// than noise. Used as a hero backdrop and as a slim divider strip.
function TileField({ rows = 6, cols = 16, className = "", style }: { rows?: number; cols?: number; className?: string; style?: CSSProperties }) {
  const palette = [GLAZE, CLAY, GROUT, INK];
  const cells = Array.from({ length: rows * cols });
  return (
    <div
      className={className}
      style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 2, ...style }}
      aria-hidden
    >
      {cells.map((_, i) => {
        const r = Math.floor(i / cols);
        // Deterministic, woven pattern: diagonals of glaze with clay/grout accents.
        const seed = (r * 7 + (i % cols) * 3) % 11;
        const c = seed < 5 ? palette[0] : seed < 7 ? palette[2] : seed < 9 ? palette[1] : palette[3];
        return <span key={i} style={{ background: c, aspectRatio: "1 / 1" }} />;
      })}
    </div>
  );
}

// A slim tessellating divider — single row of alternating glazed tiles.
function TileRule({ className = "" }: { className?: string }) {
  const palette = [GLAZE, CLAY, GROUT, INK, GLAZE, GROUT, CLAY, GLAZE];
  return (
    <div className={`flex h-2 w-full overflow-hidden ${className}`} aria-hidden>
      {Array.from({ length: 40 }).map((_, i) => (
        <span key={i} className="h-full flex-1" style={{ background: palette[i % palette.length] }} />
      ))}
    </div>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: light ? CLAY : GLAZE }}>
      <span className="grid h-3 w-3 grid-cols-2 grid-rows-2 gap-px" aria-hidden>
        <span style={{ background: GLAZE }} />
        <span style={{ background: CLAY }} />
        <span style={{ background: GROUT }} />
        <span style={{ background: GLAZE }} />
      </span>
      {children}
    </span>
  );
}

export default function TesseraDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Request a quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnPrimary = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: CLAY, color: CERAMIC }}>
      {label}
    </a>
  );
  const btnGlaze = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: GLAZE, color: CERAMIC }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:bg-black/[0.04]" style={{ borderColor: INK, color: INK }}>
      {label}
    </a>
  );

  // Trust pillars — what makes a precise, design-aware tiler worth booking.
  const trust = [
    { t: "Fully insured", d: "Every job covered, start to finish." },
    { t: "Free, fixed quotes", d: "Clear pricing before any tile is cut." },
    { t: "Dead level & true", d: "Laser-set lines, lippage-free finishes." },
    { t: "Sealed for life", d: "Waterproofed bathrooms & wet rooms done right." },
  ];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <TileRule />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-6 w-6 grid-cols-2 grid-rows-2 gap-px overflow-hidden" aria-hidden>
              <span style={{ background: GLAZE }} />
              <span style={{ background: CLAY }} />
              <span style={{ background: GROUT }} />
              <span style={{ background: GLAZE }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold uppercase tracking-[0.14em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70" style={{ borderColor: "#ffffff24" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:bg-[#C16A4A] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]" >Studio</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/60">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/60">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Mon–Sat, by appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Tiled to perfection.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CERAMIC }} className="min-h-screen font-body" >
      <TesseraHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner — geometric: ink panel with a tessellating tile field behind.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: INK }}>
      <TileField rows={10} cols={26} className="pointer-events-none absolute inset-0 opacity-[0.14]" />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight text-white sm:text-6xl" >{title}</h1>
      </div>
      <TileRule />
    </section>
  );

  // ---- SERVICES ---- clean divider rows (name+desc left / price right)
  if (page === "services") {
    return shell(
      <>
        {banner("What we tile", "Our Services")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: GLAZE }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${s.id}:name`} className="text-xl font-semibold uppercase tracking-tight" style={{ ...display, color: INK }}>{s.name}</h3>
                    </div>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: CLAY }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The studio", "Precision, By Hand")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" >Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: GLAZE, color: GLAZE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" >Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Start your project", "Request A Quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold uppercase tracking-tight" >Talk to the tiler</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2E6E8E]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2E6E8E]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: GROUT }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-7">{btnGhost("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about the room, the tiles you have in mind and rough sizes — we'll come back with a fixed price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: MUTE, label: "#3a3f45", fieldBg: CERAMIC, fieldBorder: "#1E232924", fieldText: INK, button: CLAY, buttonText: CERAMIC, radius: "0", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ---- before/after-ready tile work grid
  if (page === "gallery") {
    return shell(
      <>
        {banner("Laid by us", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.id} className="relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
                  {g.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const services6 = services.slice(0, 6);

  return shell(
    <>
      {/* hero — geometric tile-grid backdrop behind a "Tiled to perfection" headline */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: INK }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-60" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-60" />
        ) : (
          <TileField rows={14} cols={26} className="absolute inset-0 opacity-90" />
        )}
        {/* tessellating overlay always present as the signature motif */}
        {(hero || content.hero_video_url) && <TileField rows={14} cols={26} className="pointer-events-none absolute inset-0 opacity-[0.12]" />}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(30,35,41,0.92) 0%, rgba(30,35,41,0.72) 48%, rgba(30,35,41,0.35) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Tilers across ${content.service_areas[0]}` : "Wall & floor tiling specialists"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-bold uppercase leading-[0.9] tracking-tight sm:text-7xl">
            <span className="block">Tiled to</span>
            <span className="block" style={{ color: CLAY }}>perfection.</span>
          </h1>
          <p data-edit="content.tagline" className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">{content.tagline ?? "Bathrooms, kitchens, floors and mosaics — set dead level, grouted clean, finished to last."}</p>
          <p data-edit="tenant.business_name" className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-white/55">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGlaze(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* precision & level-finish trust strip */}
      <section style={{ background: GLAZE }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-12 sm:grid-cols-2 lg:grid-cols-4" style={{ color: CERAMIC }}>
          {trust.map((t) => (
            <div key={t.t} className="px-2">
              <h3 style={display} className="text-sm font-bold uppercase tracking-[0.16em]">{t.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about — text beside a framed tile field / first job photo */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>The studio</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl">Every line, considered</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: GLAZE }}>More about the studio →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <TileField rows={9} cols={12} className="aspect-[4/3] w-full" />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 grid h-16 w-16 grid-cols-2 grid-rows-2 gap-1" aria-hidden>
              <span style={{ background: GLAZE }} />
              <span style={{ background: CLAY }} />
              <span style={{ background: GROUT }} />
              <span style={{ background: INK }} />
            </span>
          </div>
        </section>
      )}

      {/* services — clean divider rows, "what we tile" */}
      {services.length > 0 && (
        <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker>What we tile</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">Our services</h2>
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services6.map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-bold tracking-[0.2em]" style={{ color: GLAZE }}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 data-edit={`item:${s.id}:name`} className="text-xl font-semibold uppercase tracking-tight" style={{ ...display, color: INK }}>{s.name}</h3>
                    </div>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: CLAY }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* tessellation divider */}
      <TileRule />

      {/* work — before/after-ready tile gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>Laid by us</Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold uppercase tracking-tight sm:text-5xl">Recent work</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              <figure key={g.id} className="relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
                {g.caption && <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
          <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: CERAMIC, borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-7xl px-8 py-16">
            <Kicker>Areas covered</Kicker>
            <div className="mt-6 flex flex-wrap gap-x-3 gap-y-3">
              {content.service_areas.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 border px-4 py-2 text-[13px] font-semibold uppercase tracking-[0.1em]" style={{ borderColor: GROUT, color: INK }}>
                  <span className="h-2 w-2" style={{ background: GLAZE }} aria-hidden />
                  {a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA — ink panel with tessellating field */}
      <section className="relative overflow-hidden" style={{ background: INK }}>
        <TileField rows={8} cols={26} className="pointer-events-none absolute inset-0 opacity-[0.14]" />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-20 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold uppercase leading-[0.95] tracking-tight sm:text-4xl">Got tiles to lay? Let&apos;s talk.</h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Free, fixed quotes — insured, level, sealed for life.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: CLAY, color: CERAMIC }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
