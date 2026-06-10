import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { UptimeHeader } from "./UptimeHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Uptime — modern managed-IT / cyber-security provider design. A calm, premium
// tech register: deep tech-navy with a bright cyan-blue accent and a signal-green
// "online / 100% uptime" status motif. Built for MSPs, IT-support firms, cyber
// and cloud providers. The signature is a connected-network hero (nodes wired
// together with a live green status pulse) over navy, a clean "what we do"
// services list, a 99.9% uptime / fast-response stat band, an accreditations
// strip, an SLA/process band and a free-IT-review CTA. MULTI-PAGE: nav opens
// real routes (Services / About / Gallery / Contact) under basePath; the sticky
// transparent-over-hero header + navy footer are shared. Tenant swaps in their
// own copy, services and accreditations.

const NAVY = "#0F1E33"; // deep tech-navy page / dark sections
const NAVY2 = "#13263F"; // lifted navy panel
const CYAN = "#2BB0F0"; // bright accent
const GREEN = "#2FCB7E"; // signal green — uptime / online
const GREY = "#DCE3EA"; // cool grey
const OFF = "#F5F8FB"; // off-white page
const INK = "#0F1E33"; // heading ink on light
const SLATE = "#5A6B7E"; // muted body on light
const LINE = "#E2E9F1"; // light hairline
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: light ? CYAN : CYAN }}>
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: GREEN }} />
        <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: GREEN }} />
      </span>
      {children}
    </p>
  );
}

// Connected-network / status motif — the design signature.
function NodeWeb() {
  return (
    <svg viewBox="0 0 480 360" fill="none" className="h-full w-full" aria-hidden preserveAspectRatio="xMidYMid slice">
      <g stroke={CYAN} strokeOpacity="0.28" strokeWidth="1.2">
        <path d="M70 80 L210 60 L360 120 L410 250 L250 300 L90 250 Z" />
        <path d="M210 60 L250 300 M70 80 L360 120 M90 250 L410 250 M210 60 L90 250 M360 120 L250 300" />
        <path d="M240 180 L70 80 M240 180 L210 60 M240 180 L360 120 M240 180 L410 250 M240 180 L250 300 M240 180 L90 250" />
      </g>
      {[
        [70, 80], [210, 60], [360, 120], [410, 250], [250, 300], [90, 250],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="5" fill={CYAN} />
      ))}
      <circle cx="240" cy="180" r="11" fill={GREEN} />
      <circle cx="240" cy="180" r="11" fill="none" stroke={GREEN} strokeWidth="2">
        <animate attributeName="r" values="11;26;11" dur="2.4s" repeatCount="indefinite" />
        <animate attributeName="stroke-opacity" values="0.7;0;0.7" dur="2.4s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

export default function UptimeDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a free IT review";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const accreditations = content.accreditations && content.accreditations.length > 0
    ? content.accreditations
    : ["Cyber Essentials", "Microsoft Partner", "ISO 27001"];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[13px] font-bold tracking-tight text-[#0F1E33] transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: CYAN, boxShadow: `0 12px 30px -12px ${CYAN}` }}>{label}</a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border px-7 py-3.5 text-center text-[13px] font-bold tracking-tight transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: "#ffffff33", color: "#ffffff" }}>{label}</a>
  );

  // What-we-do fallback list (only used when the tenant has no catalog yet).
  const defaultServices = [
    "Managed IT support", "Cyber security", "Cloud & Microsoft 365",
    "Backup & recovery", "Networks & Wi-Fi", "VoIP & telecoms",
  ];

  const footer = (
    <footer style={{ background: NAVY, borderTop: `1px solid ${CYAN}26` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: `linear-gradient(140deg, ${CYAN}, ${NAVY2})`, boxShadow: `0 0 0 1px ${CYAN}40` }}>
              <span className="h-2 w-2 rounded-full" style={{ background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {accreditations.map((a) => (
              <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-white/70" style={{ borderColor: "#ffffff1f" }}>{a}</span>
            ))}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:border-[#2BB0F0] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Support hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 flex items-center gap-2 text-sm text-white/70"><span className="h-2 w-2 rounded-full" style={{ background: GREEN }} />24/7 monitoring</p>
          )}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-semibold tracking-tight transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFF }} className="min-h-screen font-body">
      <UptimeHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: NAVY }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 top-0 h-full w-[40%] opacity-50">
        <NodeWeb />
      </div>
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl">{title}</h1>
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/70">{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "IT support that just works", "Proactive, jargon-free technology services — fully managed, monitored and secured.")}
        <section className="mx-auto max-w-7xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y rounded-2xl border bg-white" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <div key={s.id} className="flex flex-col gap-2 px-7 py-7 transition hover:bg-[#F5F8FB] sm:flex-row sm:items-baseline sm:gap-8" style={{ borderColor: LINE }}>
                  <span style={{ ...display, color: CYAN }} className="text-sm font-bold tabular-nums tracking-tight">{String(i + 1).padStart(2, "0")}</span>
                  <div className="flex-1">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-bold tracking-tight" style={{ color: CYAN }}>{s.price}</p>}
                </div>
              ))}
            </div>
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
        {banner("Who we are", "Your IT department, on tap", "A reliable, security-first partner that keeps your business running — and your data safe.")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Accredited &amp; certified</h3>
          <div className="mt-5 flex flex-wrap gap-3">
            {accreditations.map((a) => (
              <span key={a} className="flex items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold" style={{ borderColor: LINE, color: INK }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />{a}</span>
            ))}
          </div>
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]">Areas we cover</h3>
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
        {banner("Get in touch", "Book a free IT review", "Tell us about your setup and we'll show you where you can be faster, safer and better supported.")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-tight">Talk to our team</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2BB0F0]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2BB0F0]">{content.email}</a>}
            </div>
            <div className="mt-8 rounded-2xl border p-6" style={{ borderColor: LINE, background: "#ffffff" }}>
              <p className="flex items-center gap-2 text-sm font-bold tracking-tight" style={{ color: INK }}><span className="h-2 w-2 rounded-full" style={{ background: GREEN }} />24/7 monitoring &amp; rapid response</p>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>Our team watches your systems around the clock and responds fast when it matters.</p>
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-7 py-3.5 text-[13px] font-bold tracking-tight transition hover:bg-neutral-50" style={{ borderColor: LINE, color: INK }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Book a free IT review"
                bookingBlurb="Pick a time and we'll assess your IT, security and support — no obligation."
                bookingCta="Book my review"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SLATE, label: "#33536e", fieldBg: "#ffffff", fieldBorder: "#cdd9e6", fieldText: INK, button: CYAN, buttonText: "#0F1E33", radius: "0.75rem", font: "var(--font-space)" }}
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
        {banner("Our work", "Projects & deployments")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    { k: "99.9%", v: "Uptime SLA" },
    { k: "<15min", v: "Avg. response" },
    { k: "24/7", v: "Monitoring" },
  ];

  const process = [
    { t: "Review", d: "We audit your IT, security and licensing — and find the quick wins." },
    { t: "Onboard", d: "We secure, document and bring your systems under proactive management." },
    { t: "Support", d: "Round-the-clock monitoring and a friendly team a phone call away." },
  ];

  return shell(
    <>
      {/* hero — navy, connected-node motif right, copy left */}
      <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-25" />
        ) : null}
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 90% at 100% 0%, ${CYAN}22, transparent 55%)` }} />
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/2 items-center lg:flex">
          <NodeWeb />
        </div>
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-12 px-8 pb-24 pt-36 sm:pt-44 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <Kicker light>{content.service_areas?.[0] ? `Trusted IT across ${content.service_areas[0]}` : "Managed IT & cyber security"}</Kicker>
            <h1 style={display} className="mt-5 max-w-2xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "IT that just works — keeping your business running and secure."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/55">{name}</p>
            <p className="mt-5 max-w-lg text-[16px] leading-relaxed text-white/70">No jargon, no surprises — just fast, friendly support, 24/7 monitoring and security built in from day one.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
              {accreditations.map((a) => <span key={a} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: GREEN }} />{a}</span>)}
            </div>
          </div>
          {/* live status card */}
          <div className="hidden items-end lg:flex">
            <div className="w-full rounded-2xl border p-6 backdrop-blur" style={{ borderColor: "#ffffff1f", background: "rgba(19,38,63,0.6)" }}>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-white/55">System status</span>
                <span className="flex items-center gap-2 text-xs font-bold tracking-tight" style={{ color: GREEN }}>
                  <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: GREEN }} /><span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: GREEN }} /></span>
                  All systems online
                </span>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.v}>
                    <p style={display} className="text-2xl font-bold tracking-tight text-white">{s.k}</p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.1em] text-white/50">{s.v}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* accreditations strip */}
      <section style={{ background: NAVY2 }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-5 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/65">
          {accreditations.map((a) => (
            <span key={a} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full" style={{ background: CYAN }} />{a}</span>
          ))}
        </div>
      </section>

      {/* what we do — clean divide-y list */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker>What we do</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Everything your business needs to run</h2>
          </div>
          {services.length > 0 && <a href={href("services")} className="text-sm font-bold tracking-tight underline-offset-4 hover:underline" style={{ color: CYAN }}>All services →</a>}
        </div>
        <div className="mt-12 divide-y rounded-2xl border bg-white" style={{ borderColor: LINE }}>
          {(services.length > 0 ? services.slice(0, 6) : defaultServices.map((n, i) => ({ id: `d${i}`, name: n, description: undefined as string | undefined, price: undefined as string | undefined }))).map((s, i) => (
            <div key={s.id} className="flex flex-col gap-2 px-7 py-7 transition hover:bg-[#F5F8FB] sm:flex-row sm:items-baseline sm:gap-8" style={{ borderColor: LINE }}>
              <span style={{ ...display, color: CYAN }} className="text-sm font-bold tabular-nums tracking-tight">{String(i + 1).padStart(2, "0")}</span>
              <div className="flex-1">
                {services.length > 0
                  ? <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-bold tracking-tight">{s.name}</h3>
                  : <h3 style={{ ...display, color: INK }} className="text-xl font-bold tracking-tight">{s.name}</h3>}
                {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
              </div>
              {s.price && <p data-edit={`item:${s.id}:price`} className="text-sm font-bold tracking-tight" style={{ color: CYAN }}>{s.price}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* stat band — uptime / response */}
      <section style={{ background: NAVY }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(80% 120% at 0% 50%, ${CYAN}1f, transparent 60%)` }} />
        <div className="relative mx-auto grid max-w-7xl gap-8 px-8 py-16 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.v} className="text-center sm:text-left">
              <p style={display} className="text-4xl font-bold tracking-tight text-white sm:text-5xl">{s.k}</p>
              <p className="mt-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">A security-first partner you can rely on</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-bold tracking-tight" style={{ color: CYAN }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl" style={{ background: NAVY }}>
                <NodeWeb />
              </div>
            )}
          </div>
        </section>
      )}

      {/* SLA / process band */}
      <section style={{ background: OFF, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>How it works</Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Simple onboarding, backed by an SLA</h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {process.map((p, i) => (
              <div key={p.t} className="rounded-2xl border bg-white p-7" style={{ borderColor: LINE }}>
                <span style={{ ...display, color: CYAN }} className="text-sm font-bold tracking-tight">{String(i + 1).padStart(2, "0")}</span>
                <h3 style={{ ...display, color: INK }} className="mt-3 text-xl font-bold tracking-tight">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>Our work</Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Recent projects</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
          <div className="mt-10"><a href={href("gallery")} className="text-sm font-bold tracking-tight underline-offset-4 hover:underline" style={{ color: CYAN }}>See more work →</a></div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: NAVY }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-10 top-0 h-full w-[45%] opacity-40"><NodeWeb /></div>
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-20 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="max-w-xl text-3xl font-bold leading-[1.1] tracking-tight text-white sm:text-4xl">Ready for IT that just works?</h2>
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white/60">Free, no-obligation IT review.</p>
          </div>
          {btnPrimary(ctaLabel, cta)}
        </div>
      </section>
    </>,
    false,
  );
}
