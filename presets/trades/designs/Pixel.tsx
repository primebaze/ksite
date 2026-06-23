import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PixelHeader } from "./PixelHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Pixel — a sleek, modern web design & development studio. Near-black canvas,
// electric-indigo accent + mint-teal secondary, a fine pixel-grid / viewport
// motif and a clean product-led layout: a refined hero framed like a browser
// viewport, a "what we do" services list, a Discover→Design→Build→Launch
// process band, a device-framed Work gallery, a tech/credibility strip and a
// start-a-project CTA. Built for studios selling beautiful, fast, results-led
// websites & products. MULTI-PAGE: nav opens real routes (Services / About /
// Work / Contact) under basePath; the sticky header + dark footer are shared.

const INK = "#0D0E12"; // near-black page
const PANEL = "#14161C"; // lifted panel
const CARD = "#191C24"; // card surface
const PAPER = "#F4F4F2"; // off-white text
const INDIGO = "#4B6BFB"; // electric accent
const MINT = "#34D6B4"; // mint-teal secondary
const GREY = "#C7CBD4"; // cool grey body
const MUTE = "#878D9B"; // muted grey
const LINE = "rgba(255,255,255,0.08)";
const display = { fontFamily: "var(--font-space)" } as const;

// Subtle pixel-grid backdrop — the structural signature.
const PIXEL_GRID =
  "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)";

function Tag({ children, color = INDIGO }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color }}>
      <span aria-hidden className="grid h-2.5 w-2.5 grid-cols-2 grid-rows-2 gap-[1.5px]">
        <span style={{ background: color }} />
        <span style={{ background: `${color}66` }} />
        <span style={{ background: `${color}66` }} />
        <span style={{ background: color }} />
      </span>
      {children}
    </span>
  );
}

export default function PixelDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Start a project";
  const cta = content.cta_url ?? href("contact");
  const phone = content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[13px] font-semibold tracking-wide text-white transition hover:brightness-110 ${full ? "block" : "inline-flex"}`} style={{ background: INDIGO }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border px-7 py-3.5 text-center text-[13px] font-semibold tracking-wide transition hover:bg-white/5 ${full ? "block" : "inline-flex"}`} style={{ borderColor: "rgba(255,255,255,0.18)", color: PAPER }}>
      {label}
    </a>
  );

  const process = [
    { k: "01", t: "Discover", d: "We dig into your goals, users and brand to shape a focused brief." },
    { k: "02", t: "Design", d: "Wireframes to polished UI — clean, on-brand and built to convert." },
    { k: "03", t: "Build", d: "Fast, accessible, SEO-ready front-end engineered to last." },
    { k: "04", t: "Launch", d: "We ship, measure and tune — then keep it healthy with care plans." },
  ];

  const footer = (
    <footer style={{ background: "#0A0B0E", borderTop: `1px solid ${LINE}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span aria-hidden className="grid h-6 w-6 grid-cols-2 grid-rows-2 gap-[2px]">
              <span style={{ background: INDIGO }} />
              <span style={{ background: MINT }} />
              <span style={{ background: "rgba(255,255,255,0.28)" }} />
              <span style={{ background: INDIGO }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[-0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-md border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.14em]" style={{ borderColor: LINE, color: MUTE }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/80 transition hover:text-white" style={{ border: `1px solid ${LINE}`, background: PANEL }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.22em]">Studio</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Fri, 9–6.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: LINE, color: "rgba(255,255,255,0.4)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={cta} className="font-semibold tracking-wide transition hover:text-white" style={{ color: GREY }}>{ctaLabel} →</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: INK }} className="min-h-screen font-body">
      <PixelHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, blurb?: string, blurbKey?: string) => (
    <section className="relative overflow-hidden" style={{ background: PANEL, borderBottom: `1px solid ${LINE}` }}>
      <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: PIXEL_GRID, backgroundSize: "32px 32px" }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Tag><span {...editCopy(content, kickerKey, kicker)} /></Tag>
        <h1 style={{ ...display, color: PAPER }} className="mt-5 max-w-3xl text-4xl font-bold leading-[1.02] tracking-[-0.02em] sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: GREY }} {...editCopy(content, blurbKey ?? "", blurb)} />}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Services", "svc_title", "Design and build for the modern web — beautiful, fast and made to convert.", "svc_blurb")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="group flex items-baseline justify-between gap-8 py-7">
                  <div className="flex min-w-0 gap-6">
                    <span style={display} className="text-sm font-semibold tabular-nums" >{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p data-edit={`item:${s.id}:name`} style={{ ...display, color: PAPER }} className="text-xl font-semibold tracking-[-0.01em]">{s.name}</p>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: MINT }}>{s.price}</span>}
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
        {banner("The studio", "about_kicker", "We craft websites that work", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: GREY }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: PAPER }} className="mt-12 text-xs font-semibold uppercase tracking-[0.22em]" {...editCopy(content, "about_tools_heading", "Tools & credentials")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-lg border px-4 py-2 text-[12px] font-medium" style={{ borderColor: `${INDIGO}55`, color: PAPER, background: PANEL }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: PAPER }} className="mt-12 text-xs font-semibold uppercase tracking-[0.22em]" {...editCopy(content, "about_clients_heading", "Who we work with")} />
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
        {banner("Get in touch", "contact_kicker", "Start a project", "contact_title", "Tell us about your project and we'll come back with a plan and a free consultation.", "contact_blurb")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: PAPER }} className="text-2xl font-bold tracking-[-0.01em]" {...editCopy(content, "contact_heading", "Let's talk")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: GREY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
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
                bookingTitle="Start a project"
                bookingBlurb="Share your brief and we'll prepare a scope, timeline and quote."
                bookingCta="Send brief"
                theme={{ card: CARD, cardBorder: LINE, heading: PAPER, blurb: MUTE, label: GREY, fieldBg: PANEL, fieldBorder: "rgba(255,255,255,0.14)", fieldText: PAPER, button: INDIGO, buttonText: "#ffffff", radius: "12px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- WORK / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Selected work", "work_kicker", "Work", "work_title", "A look at recent websites and products we've designed and shipped.", "work_blurb")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid gap-6 sm:grid-cols-2">
              {gallery.map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                  <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${LINE}` }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: MINT }} />
                    {g.caption && <span className="ml-3 truncate text-[11px]" style={{ color: MUTE }}>{g.caption}</span>}
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[16/10] w-full object-cover" />
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Work coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    services.length > 0 && { k: `${services.length}+`, v: "Capabilities" },
    gallery.length > 0 && { k: `${gallery.length}`, v: "Projects shipped" },
    content.accreditations && content.accreditations.length > 0 && { k: content.accreditations.length.toString().padStart(2, "0"), v: "Tools & creds" },
  ].filter(Boolean) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero — refined viewport-framed studio hero */}
      <section className="relative isolate overflow-hidden" style={{ background: INK }}>
        <div className="pointer-events-none absolute inset-0" style={{ backgroundImage: PIXEL_GRID, backgroundSize: "34px 34px" }} />
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 60% at 80% 10%, rgba(75,107,251,0.22), transparent 70%), radial-gradient(50% 50% at 5% 90%, rgba(52,214,180,0.14), transparent 70%)" }} />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
          <div>
            <Tag>{content.service_areas?.[0] ? `Web studio · ${content.service_areas[0]}` : "Web design & development studio"}</Tag>
            <h1 style={{ ...display, color: PAPER }} className="mt-6 max-w-2xl text-5xl font-bold leading-[1.0] tracking-[-0.03em] sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Websites that work as good as they look."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-6 text-[12px] font-semibold uppercase tracking-[0.26em]" style={{ color: MUTE }}>{name}</p>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: GREY }}>Beautiful, fast and SEO-ready websites and products — designed and built end to end, with a free project consultation.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {services.length > 0 && btnGhost("See services", href("services"))}
            </div>
          </div>
          {/* browser/viewport frame */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-2xl" style={{ background: CARD, border: `1px solid ${LINE}` }}>
              <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${LINE}` }}>
                <span className="h-3 w-3 rounded-full" style={{ background: "#FF5F57" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: "#FEBC2E" }} />
                <span className="h-3 w-3 rounded-full" style={{ background: MINT }} />
                <span className="ml-3 flex-1 truncate rounded-md px-3 py-1 text-[11px]" style={{ background: PANEL, color: MUTE }}>{name.toLowerCase().replace(/[^a-z0-9]+/g, "")}.com</span>
              </div>
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[16/11] w-full object-cover" />
              ) : (
                <div className="relative aspect-[16/11] w-full" style={{ background: "linear-gradient(150deg,#1c2030,#10121a)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: PIXEL_GRID, backgroundSize: "24px 24px" }} />
                  <div className="absolute left-6 top-6 h-3 w-28 rounded-full" style={{ background: INDIGO }} />
                  <div className="absolute left-6 top-12 h-2.5 w-44 rounded-full bg-white/15" />
                  <div className="absolute bottom-6 left-6 h-9 w-32 rounded-full" style={{ background: MINT }} />
                </div>
              )}
            </div>
            <span aria-hidden className="absolute -right-3 -top-3 grid h-10 w-10 grid-cols-2 grid-rows-2 gap-[3px]">
              <span style={{ background: INDIGO }} />
              <span style={{ background: `${MINT}88` }} />
              <span style={{ background: `${INDIGO}55` }} />
              <span style={{ background: MINT }} />
            </span>
          </div>
        </div>
      </section>

      {/* stat strip */}
      {stats.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-8 py-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-3">
                <span style={{ ...display, color: MINT }} className="text-4xl font-bold tracking-[-0.02em]">{s.k}</span>
                <span className="text-xs font-medium uppercase tracking-[0.18em]" style={{ color: MUTE }}>{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Tag color={MINT}><span {...editCopy(content, "home_about_kicker", "The studio")} /></Tag>
            <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_about_heading", "Design and build, under one roof")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: GREY }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-semibold tracking-wide" style={{ color: INDIGO }} {...editCopy(content, "home_about_link", "More about the studio →")} />
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-2xl" style={{ background: CARD, border: `1px solid ${LINE}` }}>
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="relative aspect-[4/3] w-full" style={{ background: "linear-gradient(150deg,#1c2030,#10121a)" }}>
                  <div className="absolute inset-0" style={{ backgroundImage: PIXEL_GRID, backgroundSize: "26px 26px" }} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* services */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Tag><span {...editCopy(content, "home_svc_kicker", "What we do")} /></Tag>
            <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_svc_heading", "Services")} />
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="flex min-w-0 gap-6">
                    <span style={display} className="text-sm font-semibold tabular-nums" >{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p data-edit={`item:${s.id}:name`} style={{ ...display, color: PAPER }} className="text-xl font-semibold tracking-[-0.01em]">{s.name}</p>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: MINT }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-10">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* process band — Discover → Design → Build → Launch */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <Tag color={MINT}><span {...editCopy(content, "home_process_kicker", "How we work")} /></Tag>
        <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_process_heading", "Discover → Design → Build → Launch")} />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <div key={p.k} className="relative rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${LINE}` }}>
              <span style={{ ...display, color: i % 2 === 0 ? INDIGO : MINT }} className="text-2xl font-bold">{p.k}</span>
              <h3 style={{ ...display, color: PAPER }} className="mt-3 text-lg font-semibold tracking-[-0.01em]">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* work strip — device/browser frames */}
      {gallery.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Tag><span {...editCopy(content, "home_work_kicker", "Selected work")} /></Tag>
            <h2 style={{ ...display, color: PAPER }} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_work_heading", "Recent projects")} />
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {gallery.slice(0, 4).map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: CARD, border: `1px solid ${LINE}` }}>
                  <div className="flex items-center gap-1.5 px-4 py-3" style={{ borderBottom: `1px solid ${LINE}` }}>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FF5F57" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: "#FEBC2E" }} />
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: MINT }} />
                  </div>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[16/10] w-full object-cover" />
                </figure>
              ))}
            </div>
            <div className="mt-10">{btnGhost("See all work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* tech / credibility strip */}
      <section className="mx-auto max-w-7xl px-8 py-20">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <p className="max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_tech_blurb", "Built on a modern, performance-first stack — fast, accessible and SEO-ready by default.")} />
          <div className="flex flex-wrap gap-2">
            {(content.accreditations && content.accreditations.length > 0
              ? content.accreditations
              : ["Next.js", "React", "TypeScript", "Tailwind", "Vercel", "Figma"]
            ).map((t) => (
              <span key={t} className="rounded-lg border px-4 py-2 text-[12px] font-medium" style={{ borderColor: LINE, color: GREY, background: PANEL }}>{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: INK, borderTop: `1px solid ${LINE}` }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 80% at 70% 50%, rgba(75,107,251,0.2), transparent 70%)" }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-20 sm:flex-row sm:items-center">
          <div>
            <h2 style={{ ...display, color: PAPER }} className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl" {...editCopy(content, "cta_heading", "Got a project in mind?")} />
            <p className="mt-3 text-[15px]" style={{ color: GREY }} {...editCopy(content, "cta_sub", "Free, no-obligation project consultation. Let's build something great.")} />
          </div>
          <div className="flex flex-wrap gap-3">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
