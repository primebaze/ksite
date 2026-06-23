import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PalisadeHeader } from "./PalisadeHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Palisade — a fencing, gates & decking specialist. Boundaries done properly:
// secure, private, timber craftsmanship for gardens. Deep pine-green ground with
// warm cedar timber, stone grey and an off-white canvas. The recurring structural
// signature is a run of VERTICAL fence slats (pickets) used as dividers, accents
// and section caps. A "what we install" list, a materials showcase, a before/after
// Work gallery, a guaranteed-&-insured trust strip and an areas-covered band.
// MULTI-PAGE: nav opens real routes (Services / About / Work / Contact) under
// basePath; the sticky header + pine footer are shared. Tenant swaps in their own
// photography, copy, services and accreditations.

const PINE = "#2C3B2E"; // deep pine green
const CEDAR = "#A9743F"; // warm cedar timber
const STONE = "#8B8C82"; // stone grey
const OFF = "#F2EFE7"; // off-white canvas
const INK = "#21251F"; // charcoal ink
const PANEL = "#E7E2D5"; // warm panel tint
const LINE = "#d8d2c2"; // hairline on off-white
const display = { fontFamily: "var(--font-space)" } as const;

// The signature: a fence-slat run. A row of vertical timber pickets used as a
// divider / section cap. Heights stagger like a real picket fence.
function SlatRow({ color = CEDAR, className = "", height = 28 }: { color?: string; className?: string; height?: number }) {
  const slats = [0.62, 1, 0.78, 1, 0.7, 1, 0.86, 1, 0.66, 1, 0.8, 1, 0.72, 1, 0.9, 1];
  return (
    <div className={`flex items-end gap-[5px] ${className}`} aria-hidden>
      {slats.map((h, i) => (
        <span key={i} className="w-[6px] rounded-t-[3px]" style={{ height: height * h, background: color, opacity: i % 2 === 0 ? 0.9 : 1 }} />
      ))}
    </div>
  );
}

// Small cedar kicker with a single picket tick.
function Kicker({ children, color = CEDAR }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-extrabold uppercase tracking-[0.26em]" style={{ color }}>
      <span className="inline-flex items-end gap-[2px]" aria-hidden>
        <span className="w-[2px]" style={{ height: 8, background: color }} />
        <span className="w-[2px]" style={{ height: 12, background: color }} />
        <span className="w-[2px]" style={{ height: 9, background: color }} />
      </span>
      {children}
    </span>
  );
}

export default function PalisadeDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Built-in timber-type materials shown on the home page (static copy; this is a
  // showcase, not editable catalog data).
  const materials = [
    { name: "Pressure-treated softwood", note: "Durable, value fencing & posts" },
    { name: "Western red cedar", note: "Naturally weather-resistant, premium" },
    { name: "Oak & hardwood", note: "Sleepers, gates, statement boundaries" },
    { name: "Composite decking", note: "Low-maintenance, splinter-free" },
  ];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-sm px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: CEDAR }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-sm border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-black/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: PINE, color: PINE }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: PINE }} className="text-white">
      <SlatRow color={CEDAR} height={22} className="mx-auto max-w-7xl px-8 pt-10 opacity-90" />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span className="flex h-6 items-end gap-[3px]" aria-hidden>
              <span className="w-[3px] rounded-t-[2px]" style={{ height: "62%", background: CEDAR }} />
              <span className="w-[3px] rounded-t-[2px]" style={{ height: "100%", background: CEDAR }} />
              <span className="w-[3px] rounded-t-[2px]" style={{ height: "80%", background: CEDAR }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.08em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-sm border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/75" style={{ borderColor: "#ffffff33" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-sm text-white/80 transition hover:text-white" style={{ background: "#ffffff14", border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "footer_company", "Company")} />
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/70">Mon–Sat, free site visits.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#ffffff77" }}>
        <p>© {new Date().getFullYear()} {name}. Fencing, gates &amp; decking.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const rootStyle: CSSProperties = { ...siteRootStyle(theme, tokens), background: OFF, color: INK };

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={rootStyle} className="min-h-screen font-body">
      <PalisadeHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: PINE }} className="text-white">
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
      <SlatRow color={CEDAR} height={20} className="mx-auto max-w-7xl px-8 pb-0" />
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we install", "svc_kicker", "Our Services", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="flex min-w-0 gap-5">
                    <span style={{ ...display, color: CEDAR }} className="text-sm font-extrabold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-extrabold uppercase tracking-tight">{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: STONE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-extrabold" style={{ color: CEDAR }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: STONE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "about_kicker", "Boundaries Done Properly", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: STONE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "about_guaranteed_heading", "Guaranteed & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-sm border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: CEDAR, color: PINE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: STONE }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Get in touch", "contact_kicker", "Request A Quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: PINE }} className="text-2xl font-extrabold uppercase tracking-tight" {...editCopy(content, "contact_team_heading", "Speak to the team")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: STONE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70" style={{ color: PINE }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70" style={{ color: PINE }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: STONE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: INK }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about the boundary, gate or deck and we'll come out for a free measure and price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: STONE, label: PINE, fieldBg: OFF, fieldBorder: LINE, fieldText: INK, button: CEDAR, buttonText: "#ffffff", radius: "4px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Recent jobs", "gallery_kicker", "Our Work", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-sm object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: STONE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const trust = [
    "Fully insured installers",
    "Free no-obligation quotes",
    "Workmanship guaranteed",
  ];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(120deg, ${PINE}, ${INK})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(33,37,31,0.9) 0%, rgba(44,59,46,0.7) 45%, rgba(44,59,46,0.2) 100%)" }} />
        {/* vertical-slat fence ribbon along the bottom of the hero */}
        <SlatRow color={CEDAR} height={34} className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto w-full max-w-none justify-center px-0 opacity-90" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker color={OFF}>{content.service_areas?.[0] ? `Fencing & decking across ${content.service_areas[0]}` : "Fencing · Gates · Decking"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.92] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Boundaries done properly."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/75">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && (
              <a href={`tel:${phone}`} className="inline-flex rounded-sm border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff66" }}>
                Call {phone}
              </a>
            )}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/65">
              {content.accreditations.map((a) => <span key={a}>✓ {a}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* guaranteed & insured trust strip */}
      <section style={{ background: PINE }} className="text-white">
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-7 sm:grid-cols-3">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <span className="flex items-end gap-[2px]" aria-hidden>
                <span className="w-[3px] rounded-t-[2px]" style={{ height: 10, background: CEDAR }} />
                <span className="w-[3px] rounded-t-[2px]" style={{ height: 16, background: CEDAR }} />
                <span className="w-[3px] rounded-t-[2px]" style={{ height: 12, background: CEDAR }} />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-[0.14em]">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: PINE }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "Timber craftsmanship, built to last")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: STONE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: CEDAR }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-sm object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-sm" style={{ background: PANEL }} />
            )}
            <SlatRow color={CEDAR} height={20} className="absolute -bottom-3 left-4" />
          </div>
        </section>
      )}

      {/* services — clean divider rows */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_services_kicker", "What we install")} /></Kicker>
            <h2 style={{ ...display, color: PINE }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "home_services_heading", "Our services")} />
            <ul className="mt-10 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-extrabold uppercase tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: STONE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-extrabold" style={{ color: CEDAR }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-10">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* materials showcase — timber types */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <Kicker><span {...editCopy(content, "home_materials_kicker", "Materials")} /></Kicker>
        <h2 style={{ ...display, color: PINE }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "home_materials_heading", "Timber, chosen well")} />
        <p className="mt-4 max-w-2xl text-[15px] leading-relaxed" style={{ color: STONE }} {...editCopy(content, "home_materials_sub", "We build with the right material for the job — from value softwood to premium cedar, hardwood and low-maintenance composite.")} />
        <div className="mt-12 grid gap-px overflow-hidden rounded-sm sm:grid-cols-2 lg:grid-cols-4" style={{ background: LINE }}>
          {materials.map((m, i) => (
            <div key={m.name} className="flex flex-col gap-3 bg-[#ffffff] p-7">
              <SlatRow color={i % 2 === 0 ? CEDAR : PINE} height={18} className="opacity-90" />
              <h3 style={{ ...display, color: INK }} className="text-base font-extrabold uppercase tracking-tight">{m.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: STONE }}>{m.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* before/after work strip */}
      {gallery.length > 0 && (
        <section style={{ background: PINE }} className="text-white">
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker color={OFF}><span {...editCopy(content, "home_work_kicker", "Recent jobs")} /></Kicker>
            <h2 style={display} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl" {...editCopy(content, "home_work_heading", "Before & after")} />
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-sm object-cover" />
              ))}
            </div>
            <div className="mt-10">
              <a href={href("gallery")} className="inline-flex rounded-sm border-2 px-8 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff55" }} {...editCopy(content, "home_work_link", "See more work")} />
            </div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-20">
          <Kicker><span {...editCopy(content, "home_areas_kicker", "Areas covered")} /></Kicker>
          <h2 style={{ ...display, color: PINE }} className="mt-4 text-3xl font-extrabold uppercase tracking-tight sm:text-4xl" {...editCopy(content, "home_areas_heading", "Working across your area")} />
          <div className="mt-8 flex flex-wrap gap-3">
            {content.service_areas.map((a) => (
              <span key={a} className="rounded-sm border px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: LINE, color: INK, background: "#ffffff" }}>{a}</span>
            ))}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: CEDAR }} className="text-white">
        <SlatRow color="#ffffff" height={18} className="mx-auto max-w-7xl px-8 pt-12 opacity-50" />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-14 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Ready for a new boundary?")} />
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/80" {...editCopy(content, "cta_sub", "Free site visit and a clear, fixed price.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-sm px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: PINE }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
