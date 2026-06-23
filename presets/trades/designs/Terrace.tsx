import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { TerraceHeader } from "./TerraceHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Terrace — an aspirational, design-led landscaping & garden-design studio.
// Full garden transformations, patios & paving, planting schemes, outdoor
// living, water features and lighting. Refined and editorial rather than rugged
// trade: a deep slate-green canvas with natural stone, warm sandstone and a
// quiet sage accent, hairline rules, generous whitespace and an uppercase
// letter-spaced display register that reads like a premium architecture studio.
// MULTI-PAGE: nav opens real routes (Services / About / Work / Contact) under
// basePath; the sticky header + slate footer are shared. The portfolio-led Work
// gallery is the centrepiece — landscaping sells on what it creates.
// Distinct from Greenscape's bright lawn-care, Canopy's woodland and Kerbside's
// paving: this owns the slate-green + stone + sandstone aspirational register.

const SLATE = "#34423A"; // deep slate-green — primary surface
const INK = "#23271F"; // charcoal ink — deepest dark
const STONE = "#CFC6B4"; // natural stone — light canvas
const SAND = "#B89B6E"; // warm sandstone — primary accent
const SAGE = "#97A888"; // sage — secondary accent
const PAPER = "#F4F1E8"; // soft paper — page background
const LINE = "#DAD2C0"; // hairline on paper
const MUTE = "#5C6157"; // muted body on paper
const display = { fontFamily: "var(--font-space)" } as const;

export default function TerraceDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book a consultation";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "Studio", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // refined buttons — squared, letter-spaced, no skew
  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`px-8 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-[1.08] ${full ? "block w-full" : "inline-block"}`} style={{ background: SAND, color: INK }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, dark = false, full = false) => (
    <a
      href={to}
      className={`border px-8 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] transition ${full ? "block w-full" : "inline-block"} ${dark ? "hover:bg-[#34423A] hover:text-white" : "hover:bg-white/10"}`}
      style={dark ? { borderColor: SLATE, color: SLATE } : { borderColor: "#ffffff66", color: "#ffffff" }}
    >
      {label}
    </a>
  );

  // editorial section eyebrow — a fine sandstone rule + letter-spaced label
  const eyebrow = (text: string, light = false, key?: string) => (
    <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: light ? SAND : SLATE }}>
      <span className="block h-px w-8" style={{ background: SAND }} />
      {key ? <span {...editCopy(content, key, text)} /> : text}
    </span>
  );

  const trust = [
    "Award-winning design",
    "Design & build",
    "Fully insured",
    content.service_areas?.[0] ? `${content.service_areas[0]} & beyond` : "Free consultation",
  ];

  // design & build process — the structural signature
  const process = [
    { n: "01", t: "Consultation", d: "We walk the garden with you, understand how you want to live outdoors and agree a brief and budget." },
    { n: "02", t: "Design", d: "Concept plans, planting palettes and considered detail drawings — your garden, fully resolved before a spade is lifted." },
    { n: "03", t: "Build", d: "Our own craftsmen handle the hard landscaping — levels, structures, patios and paving, built to last." },
    { n: "04", t: "Planting", d: "A layered planting scheme and the finishing touches, then aftercare so the garden settles in beautifully." },
  ];

  const footer = (
    <footer style={{ background: SLATE }} className="text-white">
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${SAND}, transparent)` }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span aria-hidden className="grid h-9 w-9 place-items-center border" style={{ borderColor: STONE }}>
              <span className="block h-2 w-2 rotate-45" style={{ background: SAND }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-lg font-medium uppercase tracking-[0.24em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white/70" style={{ borderColor: "#ffffff24" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center border text-white/80 transition hover:bg-white hover:text-[#34423A]" style={{ borderColor: "#ffffff2e" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: SAND }} className="text-[11px] font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "footer_studio", "Studio")} />
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: SAND }} className="text-[11px] font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "footer_enquiries", "Enquiries")} />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: SAND }} className="text-[11px] font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "footer_hours", "Studio hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">By appointment, Mon–Sat.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Gardens, designed &amp; built.</p>
        {phone && <a href={`tel:${phone}`} className="font-medium uppercase tracking-[0.18em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body">
      <TerraceHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // dark editorial banner for sub-pages
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, lead?: string, leadKey?: string) => (
    <section style={{ background: SLATE }} className="relative">
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        {eyebrow(kicker, true, kickerKey)}
        <h1 style={display} className="mt-5 max-w-4xl text-4xl font-medium uppercase leading-[1.05] tracking-[0.04em] text-white sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {lead && <p className="mt-6 max-w-2xl text-[16px] leading-relaxed text-white/70" {...editCopy(content, leadKey ?? "", lead)} />}
      </div>
      <div className="h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${SAND}, transparent)` }} />
    </section>
  );

  // shared clean divider-row services list (name+desc left / price right)
  const servicesList = (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {services.map((s, i) => (
        <li key={s.id} className="flex items-start justify-between gap-6 py-7">
          <div className="flex min-w-0 items-start gap-5">
            <span style={{ ...display, color: SAND }} className="mt-1 shrink-0 text-[13px] font-medium tracking-[0.1em]">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: SLATE }} className="text-xl font-medium uppercase tracking-[0.06em]">{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-base font-medium" style={{ ...display, color: SLATE }}>{s.price}</p>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we create", "svc_kicker", "Garden design & build", "svc_title", "From a single considered patio to a complete garden transformation — every project is designed in-house and built by our own craftsmen.", "svc_lead")}
        <section className="mx-auto max-w-4xl px-8 py-20 sm:py-24">
          {services.length > 0 ? servicesList : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-14">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT (Studio) ----
  if (page === "about") {
    return shell(
      <>
        {banner("The studio", "about_kicker", "A garden design practice", "about_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div className="max-w-2xl">
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
            {content.accreditations && content.accreditations.length > 0 && (
              <>
                <h3 style={{ ...display, color: SLATE }} className="mt-12 text-[11px] font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "about_accreditations_heading", "Awards & accreditations")} />
                <div className="mt-5 flex flex-wrap gap-3">
                  {content.accreditations.map((a) => (
                    <span key={a} className="border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ borderColor: SAND, color: SLATE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...display, color: SLATE }} className="mt-12 text-[11px] font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
              </>
            )}
            <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full" style={{ background: STONE }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-20 w-20 border-b border-l" style={{ borderColor: SAND }} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Start a project", "contact_kicker", "Request a consultation", "contact_title", "Tell us about your garden and how you'd like to use it. We'll arrange a visit and talk through the possibilities.", "contact_lead")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: SLATE }} className="text-2xl font-medium uppercase tracking-[0.06em]" {...editCopy(content, "contact_heading", "Speak to the studio")} />
            <p className="mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "contact_intro", "Every garden begins with a conversation. Share a few details and we'll be in touch to arrange your design consultation.")} />
            <div className="mt-7 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium transition hover:text-[#34423A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#34423A]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="opacity-60">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-8">{btnOutline("Get directions", content.map_url, true)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a consultation"
                bookingBlurb="Tell us about your garden and we'll arrange a design visit."
                bookingCta="Request consultation"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: SLATE, blurb: MUTE, label: SLATE, fieldBg: PAPER, fieldBorder: LINE, fieldText: SLATE, button: SAND, buttonText: INK, radius: "0", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — portfolio centrepiece) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Selected work", "gallery_kicker", "A portfolio of gardens", "gallery_title", "A few of the gardens we've designed and built — patios, planting, outdoor living and complete transformations.", "gallery_lead")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16 sm:py-20">
            <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>figure]:mb-5">
              {gallery.map((g) => (
                <figure key={g.id} className="break-inside-avoid">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="w-full object-cover" />
                  {g.caption && <figcaption className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
            <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photographs coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* editorial hero */}
      <section className="relative isolate flex min-h-[94vh] items-end overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${SLATE} 0%, ${INK} 70%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(35,39,31,0.45) 0%, rgba(35,39,31,0.15) 40%, rgba(35,39,31,0.85) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-20 pt-40 text-white">
          {eyebrow(content.service_areas?.[0] ? `Garden design studio · ${content.service_areas[0]}` : "Design-led garden studio", true)}
          <h1 style={display} className="mt-6 max-w-4xl text-5xl font-medium uppercase leading-[1.02] tracking-[0.02em] [text-shadow:0_2px_28px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Gardens, reimagined."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-6 text-[12px] font-medium uppercase tracking-[0.3em] text-white/75">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {gallery.length > 0 && btnOutline("View our work", href("gallery"))}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[11px] font-medium uppercase tracking-[0.16em] text-white/65">
            {trust.map((t) => <span key={t} className="flex items-center gap-2"><span style={{ color: SAND }}>—</span>{t}</span>)}
          </div>
        </div>
      </section>

      {/* areas-covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: INK }}>
          <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-4 gap-y-2 px-8 py-5 text-[12px] font-medium uppercase tracking-[0.18em] text-white/80">
            <span style={{ color: SAND }} {...editCopy(content, "home_areas_label", "Designing & building across")} />
            {content.service_areas.map((a, i) => (
              <span key={a} className="flex items-center gap-4">
                {i > 0 && <span style={{ color: SAGE }}>·</span>}
                {a}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* about / studio intro */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 sm:py-28 lg:grid-cols-2 lg:gap-20">
          <div>
            {eyebrow("The studio", false, "home_about_kicker")}
            <h2 style={{ ...display, color: SLATE }} className="mt-5 text-4xl font-medium uppercase leading-[1.08] tracking-[0.03em] sm:text-5xl" {...editCopy(content, "home_about_heading", "Considered gardens, built to last")} />
            <p data-edit="content.about" className="mt-7 text-[16px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: SAND }} {...editCopy(content, "home_about_link", "About the studio →")} />
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full" style={{ background: STONE }} />
            )}
            <span className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 border-r border-t" style={{ borderColor: SAND }} />
          </div>
        </section>
      )}

      {/* design & build process — structural signature */}
      <section style={{ background: SLATE }} className="text-white">
        <div className="mx-auto max-w-7xl px-8 py-24 sm:py-28">
          {eyebrow("How we work", true, "home_process_kicker")}
          <h2 style={display} className="mt-5 max-w-2xl text-4xl font-medium uppercase leading-[1.08] tracking-[0.03em] sm:text-5xl" {...editCopy(content, "home_process_heading", "From first sketch to last plant")} />
          <div className="mt-14 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-4" style={{ background: "#ffffff14" }}>
            {process.map((p) => (
              <div key={p.n} className="flex flex-col px-7 py-9" style={{ background: SLATE }}>
                <span style={{ ...display, color: SAND }} className="text-3xl font-medium tracking-[0.04em]">{p.n}</span>
                <h3 style={{ ...display }} className="mt-4 text-lg font-medium uppercase tracking-[0.1em]">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/65">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* what we create — services list */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-8 py-24 sm:py-28">
          {eyebrow("What we create", false, "home_services_kicker")}
          <h2 style={{ ...display, color: SLATE }} className="mt-5 text-4xl font-medium uppercase tracking-[0.03em] sm:text-5xl" {...editCopy(content, "home_services_heading", "Our work")} />
          <p className="mt-5 max-w-2xl text-[16px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_services_intro", "Garden design, patios & paving, planting schemes, outdoor living, water features and lighting — designed and built as one.")} />
          <div className="mt-12">{servicesList}</div>
          <div className="mt-12">{btnOutline("All services", href("services"), true)}</div>
        </section>
      )}

      {/* portfolio centrepiece */}
      {gallery.length > 0 && (
        <section style={{ background: STONE }}>
          <div className="mx-auto max-w-7xl px-8 py-24 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                {eyebrow("Selected work", false, "home_portfolio_kicker")}
                <h2 style={{ ...display, color: SLATE }} className="mt-5 text-4xl font-medium uppercase tracking-[0.03em] sm:text-5xl" {...editCopy(content, "home_portfolio_heading", "A portfolio of gardens")} />
              </div>
              <a href={href("gallery")} className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: SLATE }} {...editCopy(content, "home_portfolio_link", "View full portfolio →")} />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {gallery.slice(0, 8).map((g, i) => (
                <figure key={g.id} className={i % 5 === 0 ? "col-span-2 row-span-2" : ""}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="h-full w-full object-cover" />
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto max-w-7xl px-8 py-24 text-center sm:py-28">
          {eyebrow("Start a project", true, "cta_kicker")}
          <h2 style={display} className="mx-auto mt-6 max-w-3xl text-4xl font-medium uppercase leading-[1.06] tracking-[0.03em] sm:text-6xl" {...editCopy(content, "cta_heading", "Let's design your garden")} />
          <p className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/70" {...editCopy(content, "cta_sub", "Book a design consultation and we'll talk through how your garden could look, work and feel.")} />
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnOutline(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
