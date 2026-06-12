import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { BoxwellHeader } from "./BoxwellHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Boxwell — a friendly, careful, reassuring house REMOVALS & storage company.
// Where the rugged trades siblings go near-black + industrial, Boxwell owns a
// warm, human register: friendly deep navy, warm coral accent, kraft-cardboard
// tan and cream. The signature is a calm navy hero carrying a stacked-boxes +
// dashed "moving route" motif ("Moving day, made easy"), a survey → pack → move
// → unpack step strip, a clean divider-row services list, a "fully insured &
// careful" trust strip and an areas-covered band. MULTI-PAGE: nav opens real
// routes (Services / About / Work / Contact). Tenant swaps copy/photos/services.

const NAVY = "#1F3A5F"; // friendly deep navy (primary surface)
const NAVY_DEEP = "#15293f"; // deeper navy for panels over the hero
const CORAL = "#F2724B"; // warm coral accent
const KRAFT = "#C9A06A"; // kraft-cardboard tan
const CREAM = "#F6F1E8"; // cream page background
const SLATE = "#5B6675"; // slate grey body text
const INK = "#23303f"; // near-navy ink for headings on cream
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, onDark = false }: { children: ReactNode; onDark?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]"
      style={{ color: onDark ? KRAFT : CORAL }}
    >
      <span className="inline-block h-2 w-2 rounded-[2px]" style={{ background: onDark ? KRAFT : CORAL }} />
      {children}
    </span>
  );
}

// The signature motif: stacked cardboard boxes sitting on a dashed moving route
// that curves up to a small van. Drawn inline so it scales and recolours.
function MovingMotif({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 240" className={className} fill="none" aria-hidden>
      {/* dashed moving route */}
      <path
        d="M14 206 C 90 206, 110 120, 196 120 S 300 60, 346 54"
        stroke={KRAFT}
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="2 12"
      />
      <circle cx="14" cy="206" r="6" fill={CORAL} />
      {/* stacked boxes */}
      <g stroke="#0f1c2e" strokeOpacity="0.18">
        <rect x="40" y="150" width="58" height="50" rx="4" fill={KRAFT} />
        <rect x="98" y="150" width="58" height="50" rx="4" fill="#b88e58" />
        <rect x="64" y="104" width="58" height="46" rx="4" fill="#d9b486" />
        <path d="M40 168h58M98 168h58M64 124h58" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
        <path d="M69 150v-46M93 104v46" stroke="#0f1c2e" strokeOpacity="0.12" strokeWidth="2" />
      </g>
      {/* moving van */}
      <g>
        <rect x="232" y="40" width="86" height="44" rx="5" fill={CREAM} stroke="#0f1c2e" strokeOpacity="0.15" />
        <path d="M318 56h20l12 16v12h-32z" fill={CORAL} />
        <rect x="338" y="60" width="11" height="11" rx="2" fill={CREAM} opacity="0.9" />
        <circle cx="252" cy="90" r="9" fill="#0f1c2e" />
        <circle cx="252" cy="90" r="3.5" fill={CREAM} />
        <circle cx="328" cy="90" r="9" fill="#0f1c2e" />
        <circle cx="328" cy="90" r="3.5" fill={CREAM} />
        <path d="M240 56h70" stroke={KRAFT} strokeWidth="2" />
      </g>
    </svg>
  );
}

export default function BoxwellDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const btnPrimary = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-7 py-3.5 text-center text-[13px] font-bold tracking-[0.03em] text-white transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: CORAL }}
    >
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, onDark = false, full = false) => (
    <a
      href={to}
      className={`rounded-full border px-7 py-3.5 text-center text-[13px] font-bold tracking-[0.03em] transition ${full ? "block w-full" : "inline-flex"}`}
      style={
        onDark
          ? { borderColor: "rgba(246,241,232,0.4)", color: CREAM }
          : { borderColor: "rgba(31,58,95,0.22)", color: NAVY }
      }
    >
      {label}
    </a>
  );

  const trust = [
    { t: "Fully insured", d: "Goods-in-transit & full public-liability cover on every move." },
    { t: "Careful & on time", d: "Trained crews, blankets & padding — we treat your home like ours." },
    { t: "Free home survey", d: "An accurate, no-obligation quote after we've seen the job." },
  ];

  const steps = [
    { n: "01", t: "Free survey", d: "We visit (or video-call) to scope the move and give a fixed price." },
    { n: "02", t: "We pack", d: "Optional full or part packing — boxes, wrapping, the lot." },
    { n: "03", t: "Moving day", d: "Our crew loads, transports and looks after every item." },
    { n: "04", t: "Unpack", d: "We place everything where you want it, then take the boxes away." },
  ];

  const footer = (
    <footer style={{ background: NAVY }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-[7px]" style={{ background: CORAL }} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="13" width="8" height="8" rx="1" />
                <rect x="13" y="13" width="8" height="8" rx="1" />
                <rect x="8" y="3" width="8" height="8" rx="1" />
              </svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[11px] font-semibold tracking-[0.04em] text-white/75" style={{ border: "1px solid rgba(246,241,232,0.22)" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:text-white" style={{ border: "1px solid rgba(246,241,232,0.22)" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.18em]" >Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.18em]">Get in touch</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.18em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">Mon–Sat, 8am–6pm.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-8 py-7 text-xs sm:flex-row" style={{ borderTop: "1px solid rgba(246,241,232,0.12)", color: "rgba(255,255,255,0.5)" }}>
        <p>© {new Date().getFullYear()} {name}. Moving you with care.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold tracking-[0.04em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: INK }} className="min-h-screen font-body">
      <BoxwellHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner: a compact navy header band so sub-pages share the hero
  // register without repeating the full motif.
  const banner = (kicker: string, title: string, lead?: string) => (
    <section style={{ background: NAVY }} className="text-white">
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker onDark>{kicker}</Kicker>
        <h1 style={display} className="mt-4 max-w-3xl text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl">{title}</h1>
        {lead && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">{lead}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Removals & storage, sorted", "From a single sofa to a full five-bed house — pick what you need and we'll handle the rest.")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "rgba(31,58,95,0.12)" }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-[15px] leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-[15px] font-bold" style={{ color: CORAL }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Safe hands on moving day")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.18em]" >Insured &amp; accredited</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[12px] font-semibold tracking-[0.03em]" style={{ borderColor: KRAFT, color: INK }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.18em]" >Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Get a price", "Let's plan your move")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-bold tracking-tight">Speak to the team</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: SLATE }}>
              Tell us where you&apos;re moving from and to. We&apos;ll arrange a free home survey and come back with a fixed, no-obligation price.
            </p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#1F3A5F]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#1F3A5F]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "rgba(31,58,95,0.12)", color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: KRAFT }}>{h.open}</span></li>
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
                bookingTitle="Get a moving quote"
                bookingBlurb="Share your moving dates and addresses — we'll arrange a survey and a fixed price."
                bookingCta="Request my quote"
                contactTitle="Ask a question"
                contactBlurb="Not ready to book? Ask us anything about your move or storage."
                theme={{ card: "#ffffff", cardBorder: "rgba(31,58,95,0.12)", heading: INK, blurb: SLATE, label: NAVY, fieldBg: CREAM, fieldBorder: "rgba(31,58,95,0.18)", fieldText: INK, button: CORAL, buttonText: "#ffffff", radius: "0.9rem", font: "var(--font-space)" }}
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
        {banner("On the road", "Recent moves")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    { k: "5,000+", v: "Moves completed" },
    services.length > 0 && { k: `${services.length}+`, v: "Services offered" },
    content.service_areas && content.service_areas.length > 0
      ? { k: `${content.service_areas.length}`, v: "Areas covered" }
      : { k: "12", v: "Years moving" },
  ].filter(Boolean) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero — calm navy with the stacked-boxes + route + van motif */}
      <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(120% 90% at 85% 0%, rgba(242,114,75,0.18) 0%, rgba(31,58,95,0) 55%)" }} />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-8 pb-20 pt-36 text-white sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            <Kicker onDark>{content.service_areas?.[0] ? `Removals across ${content.service_areas[0]}` : "Friendly local removals & storage"}</Kicker>
            <h1 style={display} className="mt-5 max-w-2xl text-5xl font-bold leading-[0.98] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-7xl">
              Moving day, made easy
            </h1>
            <p data-edit="content.tagline" className="mt-5 max-w-lg text-[17px] leading-relaxed text-white/75">
              {content.tagline ?? "Careful packing, safe transport and a crew you can trust — so your move feels calm from the first box to the last."}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {phone && btnGhost(`Call ${phone}`, `tel:${phone}`, true)}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[12px] font-semibold tracking-[0.04em] text-white/65">
              <span>✓ Fully insured</span>
              <span>✓ Free home survey</span>
              <span>✓ Careful &amp; on time</span>
            </div>
          </div>
          <div className="relative">
            {hero ? (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[5/4] w-full rounded-2xl object-cover shadow-[0_24px_60px_rgba(15,28,46,0.45)]" />
                <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-2xl" style={{ background: KRAFT, opacity: 0.9, zIndex: -1 }} />
              </div>
            ) : (
              <div className="rounded-2xl p-6 shadow-[0_24px_60px_rgba(15,28,46,0.4)]" style={{ background: NAVY_DEEP, border: "1px solid rgba(246,241,232,0.1)" }}>
                <MovingMotif className="w-full" />
                <p className="mt-2 text-center text-[12px] font-semibold uppercase tracking-[0.16em] text-white/45">Survey · Pack · Move · Unpack</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* stat strip */}
      {stats.length > 0 && (
        <section style={{ background: KRAFT }}>
          <div className="mx-auto grid max-w-7xl gap-8 px-8 py-9 sm:grid-cols-3" style={{ color: NAVY_DEEP }}>
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-3">
                <span style={display} className="text-4xl font-bold">{s.k}</span>
                <span className="text-[13px] font-bold tracking-[0.04em]">{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* how it works — survey → pack → move → unpack */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="max-w-2xl">
          <Kicker>How it works</Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Four calm steps</h2>
          <p className="mt-4 text-[16px] leading-relaxed" style={{ color: SLATE }}>No surprises and no chaos — just a clear plan from your first call to the last box unpacked.</p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li key={s.n} className="relative rounded-2xl bg-white p-7" style={{ border: "1px solid rgba(31,58,95,0.1)" }}>
              <span style={{ ...display, color: KRAFT }} className="text-2xl font-bold">{s.n}</span>
              <span className="ml-2 inline-block h-1 w-8 rounded-full align-middle" style={{ background: CORAL }} />
              <h3 style={{ ...display, color: INK }} className="mt-4 text-lg font-bold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-[14px] leading-relaxed" style={{ color: SLATE }}>{s.d}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* about */}
      {content.about && (
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(31,58,95,0.08)", borderBottom: "1px solid rgba(31,58,95,0.08)" }}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <Kicker>Who we are</Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl">Careful people, the right kit</h2>
              <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
              <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.03em]" style={{ color: CORAL }}>More about us →</a>
            </div>
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full rounded-2xl p-8" style={{ background: NAVY }}>
                  <MovingMotif className="h-full w-full" />
                </div>
              )}
              <span className="pointer-events-none absolute -bottom-3 -left-3 h-16 w-16 rounded-2xl" style={{ background: KRAFT, opacity: 0.85, zIndex: -1 }} />
            </div>
          </div>
        </section>
      )}

      {/* services — clean divider rows */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>What we do</Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Our services</h2>
            </div>
            <a href={href("services")} className="text-[13px] font-bold tracking-[0.03em]" style={{ color: CORAL }}>View all →</a>
          </div>
          <ul className="mt-10 divide-y" style={{ borderColor: "rgba(31,58,95,0.12)" }}>
            {services.slice(0, 6).map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                <div className="min-w-0">
                  <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-[15px] leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                </div>
                {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-[15px] font-bold" style={{ color: CORAL }}>{s.price}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* trust strip — fully insured & careful */}
      <section style={{ background: NAVY }} className="text-white">
        <div className="mx-auto max-w-7xl px-8 py-20">
          <Kicker onDark>Why book us</Kicker>
          <h2 style={display} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Safe hands, start to finish</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {trust.map((it) => (
              <div key={it.t} className="rounded-2xl p-7" style={{ background: NAVY_DEEP, border: "1px solid rgba(246,241,232,0.12)" }}>
                <span className="grid h-10 w-10 place-items-center rounded-full" style={{ background: CORAL }} aria-hidden>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                </span>
                <h3 style={display} className="mt-4 text-lg font-bold tracking-tight">{it.t}</h3>
                <p className="mt-2 text-[14px] leading-relaxed text-white/70">{it.d}</p>
              </div>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2.5">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-4 py-1.5 text-[12px] font-semibold tracking-[0.03em] text-white/80" style={{ border: "1px solid rgba(246,241,232,0.22)" }}>✓ {a}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>On the road</Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">Recent moves</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnGhost("See more moves", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: "#ffffff", borderTop: "1px solid rgba(31,58,95,0.08)" }}>
          <div className="mx-auto max-w-7xl px-8 py-16">
            <Kicker>Areas we cover</Kicker>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full px-4 py-2 text-[13px] font-semibold tracking-[0.02em]" style={{ background: CREAM, border: `1px solid ${KRAFT}`, color: INK }}>{a}</span>
              ))}
            </div>
            <p className="mt-5 text-[14px]" style={{ color: SLATE }}>Moving outside these areas? Ask us — we cover long-distance and international moves too.</p>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: CORAL }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.02] tracking-tight sm:text-4xl">Ready to plan your move?</h2>
            <p className="mt-2 text-[15px] font-semibold text-white/85">Free home survey · fixed price · no obligation.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[13px] font-bold tracking-[0.03em] text-white transition hover:brightness-110" style={{ background: NAVY }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
