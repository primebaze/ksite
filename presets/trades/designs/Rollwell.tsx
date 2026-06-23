import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RollwellHeader } from "./RollwellHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Rollwell — a fresh, precise painter & decorator. The opposite register to the
// dark industrial trades siblings: a crisp off-white page, deep-ink type, and a
// fresh cobalt accent lifted by sunny ochre and soft sage used as multi-colour
// paint-swatch / colour-chip accents. Structural signature: a bright hero with a
// "A fresh coat changes everything" headline + colour-chip motif, a tri-colour
// paint-stripe divider, a numbered "what we do" services list (clean divider
// rows, no cards/dotted leaders), a "clean, considerate, on-time" trust strip, a
// before/after Work angle and an areas-covered band. MULTI-PAGE: nav opens real
// routes (Services / About / Work / Contact) under basePath. Display = Space.

const OFFWHITE = "#F6F4EF"; // crisp page
const PAPER = "#FFFFFF"; // lifted panel
const INK = "#1C2024"; // deep ink
const COBALT = "#2F5FD0"; // fresh accent
const OCHRE = "#E8A83C"; // sunny ochre
const SAGE = "#9DB89A"; // soft sage
const MUTE = "#5C616A"; // muted body
const LINE = "#1C202418"; // hairline on light
const display = { fontFamily: "var(--font-space)" } as const;

// A tri-colour paint stripe — the recurring brand motif.
function PaintStripe({ className = "" }: { className?: string }) {
  return (
    <div className={`flex h-2 w-full overflow-hidden rounded-full ${className}`} aria-hidden>
      <span className="block h-full flex-[3]" style={{ background: COBALT }} />
      <span className="block h-full flex-[2]" style={{ background: OCHRE }} />
      <span className="block h-full flex-[2]" style={{ background: SAGE }} />
      <span className="block h-full flex-1" style={{ background: INK }} />
    </div>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: COBALT }}>
      <span className="flex gap-1" aria-hidden>
        <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: COBALT }} />
        <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: OCHRE }} />
        <span className="h-2.5 w-2.5 rounded-[2px]" style={{ background: SAGE }} />
      </span>
      {children}
    </span>
  );
}

export default function RollwellDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a free quote";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: COBALT }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:bg-[#1C2024] hover:text-white ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: INK, color: INK }}>
      {label}
    </a>
  );

  // Trust pillars lead the brand: insured, free quotes, dust-free clean finish.
  const trust = [
    { t: "Fully insured", d: "Public liability cover on every job, big or small." },
    { t: "Free, fair quotes", d: "Clear written pricing with no surprises." },
    { t: "Clean & dust-free", d: "Dust sheets down, surfaces protected, swept up daily." },
    { t: "On time, tidy, done", d: "We turn up when we say and leave it spotless." },
  ];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <PaintStripe className="rounded-none" />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-6 overflow-hidden rounded-[3px]" aria-hidden>
              <span className="block h-full w-1.5" style={{ background: COBALT }} />
              <span className="block h-full w-1.5" style={{ background: OCHRE }} />
              <span className="block h-full w-1.5" style={{ background: SAGE }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[-0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70" style={{ borderColor: "#ffffff2e" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#2F5FD0] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/50" {...editCopy(content, "footer_company", "Company")} />
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/50" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/50" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Mon–Sat, 8am–6pm.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs text-white/45 sm:flex-row" style={{ borderColor: "#ffffff14" }}>
        <p>© {new Date().getFullYear()} {name}. Painters &amp; decorators.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE, color: INK }} className="min-h-screen font-body">
      <RollwellHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: PAPER, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold leading-[0.98] tracking-[-0.02em] sm:text-6xl" {...editCopy(content, titleKey, title)} />
        <PaintStripe className="mt-7 max-w-xs" />
      </div>
    </section>
  );

  // Clean divider-row services list: name + desc left, price right. No cards.
  const servicesList = (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {services.map((s, i) => (
        <li key={s.id} className="flex items-start justify-between gap-6 py-6">
          <div className="flex min-w-0 gap-5">
            <span style={{ ...display, color: SAGE }} className="select-none text-sm font-bold tabular-nums">{String(i + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <h3 data-edit={`item:${s.id}:name`} style={display} className="text-lg font-bold tracking-[-0.01em]">{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: COBALT }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Our services", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? servicesList : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "about_kicker", "A fresh pair of hands", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {trust.map((t, i) => (
              <div key={t.t} className="rounded-2xl p-6" style={{ background: PAPER, border: `1px solid ${LINE}`, borderTop: `3px solid ${[COBALT, OCHRE, SAGE, COBALT][i % 4]}` }}>
                <h3 style={display} className="text-base font-bold">{t.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{t.d}</p>
              </div>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "about_accredited_heading", "Accredited & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: COBALT, color: INK }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
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
        {banner("Get in touch", "contact_kicker", "Request a quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-bold tracking-[-0.01em]" {...editCopy(content, "contact_lead_heading", "Tell us about your project")} />
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "contact_lead_sub", "A room, a whole house, inside or out — send the details and we'll come back with a clear, no-obligation price.")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2F5FD0]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2F5FD0]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#9aa0a8" }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about the job and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: PAPER, cardBorder: LINE, heading: INK, blurb: MUTE, label: "#3c414a", fieldBg: OFFWHITE, fieldBorder: LINE, fieldText: INK, button: COBALT, buttonText: "#ffffff", radius: "16px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work / before & after) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Before & after", "gallery_kicker", "Our work", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g, i) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
                  <figcaption className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: i % 2 ? OCHRE : COBALT }}>
                    <span className="h-2 w-2 rounded-[2px]" style={{ background: i % 2 ? OCHRE : COBALT }} />
                    {g.caption || (i % 2 ? "After" : "Before")}
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — bright off-white, bold headline, colour-chip motif */}
      <section className="relative overflow-hidden" style={{ background: OFFWHITE }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <Kicker>{content.service_areas?.[0] ? `Painters & decorators in ${content.service_areas[0]}` : "Painters & decorators"}</Kicker>
            <h1 style={display} className="mt-5 text-5xl font-bold leading-[0.95] tracking-[-0.03em] sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "A fresh coat changes everything."}</span>
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-relaxed" style={{ color: MUTE }}>
              Interior &amp; exterior decorating with a flawless finish — fresh colour, tidy work and a considerate crew from <span data-edit="tenant.business_name" className="font-semibold" style={{ color: INK }}>{name}</span>.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: MUTE }}>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-[2px]" style={{ background: COBALT }} /><span {...editCopy(content, "home_trust_1", "Insured")} /></span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-[2px]" style={{ background: OCHRE }} /><span {...editCopy(content, "home_trust_2", "Free quotes")} /></span>
              <span className="inline-flex items-center gap-2"><span className="h-2 w-2 rounded-[2px]" style={{ background: SAGE }} /><span {...editCopy(content, "home_trust_3", "Dust-free finish")} /></span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_30px_60px_-30px_rgba(28,32,36,0.4)]" style={{ border: `1px solid ${LINE}` }}>
              {content.hero_video_url ? (
                <video src={content.hero_video_url} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="aspect-[4/5] w-full" style={{ background: `linear-gradient(150deg, ${COBALT}, ${SAGE})` }} />
              )}
            </div>
            {/* floating colour-chip swatch card */}
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl p-4 shadow-xl sm:block" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
              <div className="flex gap-2">
                {[COBALT, OCHRE, SAGE, INK].map((c) => (
                  <span key={c} className="h-9 w-9 rounded-lg" style={{ background: c }} />
                ))}
              </div>
              <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.16em]" style={{ color: MUTE }} {...editCopy(content, "home_swatch_label", "Any colour you like")} />
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-8 pb-2"><PaintStripe /></div>
      </section>

      {/* trust strip — clean, considerate, on-time */}
      <section style={{ background: PAPER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t, i) => (
            <div key={t.t} className="px-1 sm:px-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg text-[12px] font-bold text-white" style={{ background: [COBALT, OCHRE, SAGE, INK][i] }}>{i + 1}</span>
              <h3 style={display} className="mt-4 text-base font-bold">{t.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={display} className="mt-4 text-4xl font-bold leading-[1.0] tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_about_heading", "Tidy work, flawless finish")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: COBALT }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[2rem] object-cover" style={{ border: `1px solid ${LINE}` }} />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[2rem]" style={{ background: `linear-gradient(150deg, ${OCHRE}, ${SAGE})` }} />
            )}
            <span className="absolute -right-3 -top-3 h-14 w-14 rounded-xl" style={{ background: OCHRE }} aria-hidden />
          </div>
        </section>
      )}

      {/* services — clean divider-row list */}
      {services.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_services_kicker", "What we do")} /></Kicker>
            <h2 style={display} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_services_heading", "Interior, exterior & everything between")} />
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_services_sub", "Walls & ceilings, woodwork, wallpapering, exterior and commercial — all to the same crisp standard.")} />
            <div className="mt-10">{servicesList}</div>
            <div className="mt-12">{btnGhost("See all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* work — before & after angle */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_work_kicker", "Before & after")} /></Kicker>
          <h2 style={display} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-5xl" {...editCopy(content, "home_work_heading", "Recent transformations")} />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g, i) => (
              <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: PAPER, border: `1px solid ${LINE}` }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
                <figcaption className="flex items-center gap-2 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ color: i % 2 ? OCHRE : COBALT }}>
                  <span className="h-2 w-2 rounded-[2px]" style={{ background: i % 2 ? OCHRE : COBALT }} />
                  {g.caption || (i % 2 ? "After" : "Before")}
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: INK }} className="text-white">
          <div className="mx-auto max-w-7xl px-8 py-16">
            <Kicker><span {...editCopy(content, "home_areas_kicker", "Areas we cover")} /></Kicker>
            <div className="mt-6 flex flex-wrap gap-3">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full border px-5 py-2 text-sm font-semibold" style={{ borderColor: "#ffffff2e" }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: COBALT }} className="text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.0] tracking-[-0.02em] sm:text-4xl" {...editCopy(content, "cta_heading", "Ready for a fresh coat?")} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/75" {...editCopy(content, "cta_sub", "Free, no-obligation quotes.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full bg-white px-9 py-4 text-[12px] font-bold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ color: COBALT }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
