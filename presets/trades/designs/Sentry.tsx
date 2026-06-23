import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SentryHeader } from "./SentryHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Sentry — professional, discreet pest-control specialist. A calm, corporate
// register built on a deep protective teal-green, clean off-white panels and a
// single alert-amber accent reserved for urgency (call-outs, CTAs). The
// signature is a protective SHIELD / concentric protection-ring motif — never
// cartoon bugs. Leads hard with trust & speed: BPCA-certified, fully insured,
// discreet, same-day call-out, guaranteed results. MULTI-PAGE: nav opens real
// routes (Services / About / Work / Contact) under basePath; the sticky header
// and footer are shared. Tenant swaps in their own photography, copy, services
// and accreditations.

const TEAL = "#1C3F3A"; // deep protective teal-green
const TEAL_DK = "#16201D"; // charcoal ink
const PAPER = "#F5F8F6"; // clean white-green
const AMBER = "#E8A22B"; // alert amber accent
const SLATE = "#5E6B66"; // slate grey body
const LINE = "#D7E1DC"; // hairline on paper
const display = { fontFamily: "var(--font-space)" } as const;

// Concentric protection-ring + shield tick — the repeating brand mark.
function Shield({ size = 22, color = AMBER, stroke = 1.6 }: { size?: number; color?: string; stroke?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 2.5l7 2.6v6c0 4.6-3 8.2-7 10.4-4-2.2-7-5.8-7-10.4v-6l7-2.6z" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4.2" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: light ? AMBER : TEAL }}>
      <Shield size={15} stroke={1.8} />
      {children}
    </span>
  );
}

export default function SentryDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const btnAmber = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: AMBER, color: TEAL_DK }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, light = false) => (
    <a href={to} className="inline-flex rounded-full border px-7 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:bg-black/5" style={{ borderColor: light ? "rgba(255,255,255,0.4)" : LINE, color: light ? "#ffffff" : TEAL }}>
      {label}
    </a>
  );

  // The "what we handle" pest categories — derived from the catalog, with a
  // sensible default set so the band always reads as a complete pest-control
  // service even before the owner edits their own list.
  const handleList = services.length > 0
    ? services.map((s) => s.name)
    : ["Rodents", "Wasps & bees", "Crawling insects", "Bed bugs", "Birds & pigeons", "Commercial contracts"];

  // Process feature — Inspect → Treat → Protect. Shared by home + services.
  const processStrip = (
    <section style={{ background: PAPER }}>
      <div className="mx-auto max-w-7xl px-8 py-24">
        <Kicker><span {...editCopy(content, "process_kicker", "How it works")} /></Kicker>
        <h2 style={{ ...display, color: TEAL_DK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "process_heading", "Inspect. Treat. Protect.")} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { n: "01", t: "Inspect", d: "A thorough survey to find the source, scale and entry points — and a clear, honest plan." },
            { n: "02", t: "Treat", d: "Targeted, proven treatments that remove the problem quickly, safely and discreetly." },
            { n: "03", t: "Protect", d: "Proofing, prevention advice and follow-ups so it stays gone — backed by our guarantee." },
          ].map((s) => (
            <div key={s.n} className="rounded-2xl bg-white p-8" style={{ border: `1px solid ${LINE}` }}>
              <div className="flex items-center justify-between">
                <span style={display} className="text-3xl font-bold" >{s.n}</span>
                <Shield size={26} color={AMBER} />
              </div>
              <h3 style={{ ...display, color: TEAL_DK }} className="mt-5 text-xl font-bold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  const footer = (
    <footer style={{ background: TEAL_DK }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "rgba(255,255,255,0.06)", border: `1px solid ${AMBER}` }}><Shield size={18} /></span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[0.02em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/70" style={{ border: "1px solid rgba(255,255,255,0.18)" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:text-[#16201D]" style={{ border: "1px solid rgba(255,255,255,0.2)" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/90" {...editCopy(content, "footer_company", "Company")} />
          <ul className="mt-5 space-y-3 text-sm text-white/60">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/90" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/60">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.22em] text-white/90" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/60">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Same-day call-out, 7 days.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-8 py-7 text-xs sm:flex-row" style={{ borderTop: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.5)" }}>
        <p>© {new Date().getFullYear()} {name}. Pests gone. Peace of mind, guaranteed.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER, color: TEAL_DK }} className="min-h-screen font-body">
      <SentryHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: TEAL }} className="relative overflow-hidden text-white">
      <RingDecor />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we handle", "svc_kicker", "Pest control services", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-6">
                  <div className="flex min-w-0 gap-4">
                    <span className="mt-1 shrink-0"><Shield size={18} color={TEAL} /></span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} style={display} className="text-lg font-bold tracking-tight" >{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: TEAL }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">{btnAmber(ctaLabel, cta)}</div>
        </section>
        {processStrip}
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "about_kicker", "Discreet. Effective. Trusted.", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "about_certified_heading", "Certified & fully insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: LINE, color: TEAL }}><Shield size={13} color={TEAL} />{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnAmber(ctaLabel, cta)}</div>
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
            <h2 style={display} className="text-2xl font-bold tracking-tight" {...editCopy(content, "contact_lead_heading", "Speak to the team")} />
            <p className="mt-3 text-sm leading-relaxed" style={{ color: SLATE }} {...editCopy(content, "contact_lead_sub", "Discreet, same-day call-out across the area. Tell us what you've seen and we'll handle the rest.")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#1C3F3A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#1C3F3A]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="font-medium" style={{ color: TEAL }}>{h.open}</span></li>
                ))}
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
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about the problem and we'll come back fast with a price and a plan."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: TEAL_DK, blurb: SLATE, label: TEAL, fieldBg: PAPER, fieldBorder: LINE, fieldText: TEAL_DK, button: AMBER, buttonText: TEAL_DK, radius: "0.9rem", font: "var(--font-space)" }}
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
        {banner("Recent work", "gallery_kicker", "Jobs done right", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
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
  return shell(
    <>
      {/* hero — deep teal, shield / protection-ring motif */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden" style={{ background: TEAL }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-30" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        ) : null}
        <div className="pointer-events-none absolute inset-0" style={{ background: hero || content.hero_video_url ? "linear-gradient(100deg, rgba(28,63,58,0.96) 0%, rgba(28,63,58,0.82) 50%, rgba(22,32,29,0.7) 100%)" : "radial-gradient(120% 120% at 80% 20%, #234c46 0%, #1C3F3A 55%, #16201D 100%)" }} />
        <RingDecor />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-8 py-28 text-white lg:grid-cols-[1.25fr_0.75fr]">
          <div>
            <Kicker light>{content.service_areas?.[0] ? `Protecting ${content.service_areas[0]}` : "Residential & commercial pest control"}</Kicker>
            <h1 style={display} className="mt-5 max-w-3xl text-5xl font-bold leading-[0.98] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "Pests gone. Peace of mind, guaranteed."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/70">{name}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnAmber(ctaLabel, cta)}
              {phone && btnOutline(`Call ${phone}`, `tel:${phone}`, true)}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/65">
              {(content.accreditations && content.accreditations.length > 0
                ? content.accreditations
                : ["BPCA certified", "Fully insured", "Discreet & unmarked"]
              ).map((a) => <span key={a} className="inline-flex items-center gap-1.5"><Shield size={13} />{a}</span>)}
            </div>
          </div>
          {/* protection-ring emblem */}
          <div className="hidden items-center justify-center lg:flex">
            <div className="relative grid h-64 w-64 place-items-center rounded-full" style={{ border: `1px solid rgba(232,162,43,0.4)` }}>
              <div className="absolute inset-6 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.15)" }} />
              <div className="absolute inset-12 rounded-full" style={{ border: "1px solid rgba(255,255,255,0.1)" }} />
              <div className="grid h-28 w-28 place-items-center rounded-full" style={{ background: "rgba(232,162,43,0.12)" }}>
                <Shield size={64} stroke={1.3} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* fast / discreet / guaranteed promise strip */}
      <section style={{ background: "#ffffff", borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-12 sm:grid-cols-3 sm:gap-10">
          {[
            { t: "Fast response", d: "Same-day call-out, 7 days a week — most problems handled on the first visit." },
            { t: "Discreet service", d: "Unmarked vehicles and uniforms. Neighbours and customers need never know." },
            { t: "Guaranteed results", d: "Proven treatments backed by a written guarantee and follow-up visits." },
          ].map((p) => (
            <div key={p.t} className="flex gap-4">
              <span className="mt-0.5 shrink-0"><Shield size={22} color={AMBER} /></span>
              <div>
                <h3 style={{ ...display, color: TEAL_DK }} className="text-base font-bold tracking-tight">{p.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: SLATE }}>{p.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* same-day call-out banner (amber urgency) */}
      <section style={{ background: AMBER }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-5 px-8 py-8 sm:flex-row sm:items-center" style={{ color: TEAL_DK }}>
          <div className="flex items-center gap-4">
            <Shield size={28} color={TEAL_DK} stroke={1.8} />
            <p style={display} className="text-xl font-bold tracking-tight sm:text-2xl" {...editCopy(content, "home_urgency_heading", "Infestation? We can be there today.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-7 py-3.5 text-[12px] font-bold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: TEAL_DK }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: TEAL_DK }} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "Protection you can rely on")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: "#fff", border: `1px solid ${LINE}` }} />
            )}
            <span className="absolute -bottom-4 -left-4 grid h-16 w-16 place-items-center rounded-full" style={{ background: TEAL }}><Shield size={28} /></span>
          </div>
        </section>
      )}

      {/* what we handle — clean divider list */}
      <section style={{ background: "#ffffff", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_handle_kicker", "What we handle")} /></Kicker>
          <h2 style={{ ...display, color: TEAL_DK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_handle_heading", "Every pest, covered")} />
          <div className="mt-12 grid gap-x-12 sm:grid-cols-2">
            {[handleList.slice(0, Math.ceil(handleList.length / 2)), handleList.slice(Math.ceil(handleList.length / 2))].map((col, ci) => (
              <ul key={ci} className="divide-y" style={{ borderColor: LINE }}>
                {col.map((label) => (
                  <li key={label} className="flex items-center gap-3 py-4">
                    <Shield size={17} color={TEAL} />
                    <span style={{ ...display, color: TEAL_DK }} className="text-lg font-semibold tracking-tight">{label}</span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          {services.length > 0 && <div className="mt-12">{btnOutline("View all services", href("services"))}</div>}
        </div>
      </section>

      {/* certifications trust strip */}
      {content.accreditations && content.accreditations.length > 0 && (
        <section style={{ background: PAPER }}>
          <div className="mx-auto max-w-7xl px-8 py-14">
            <p className="text-center text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: SLATE }} {...editCopy(content, "home_certs_label", "Certified, insured & accredited")} />
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              {content.accreditations.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[12px] font-bold uppercase tracking-[0.1em]" style={{ border: `1px solid ${LINE}`, color: TEAL }}><Shield size={15} color={TEAL} />{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* process — inspect / treat / protect */}
      {processStrip}

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_work_kicker", "Recent work")} /></Kicker>
          <h2 style={{ ...display, color: TEAL_DK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_work_heading", "Jobs done right")} />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnOutline("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: TEAL }} className="relative overflow-hidden text-white">
          <RingDecor />
          <div className="relative mx-auto max-w-7xl px-8 py-20">
            <Kicker light><span {...editCopy(content, "home_areas_kicker", "Areas covered")} /></Kicker>
            <h2 style={display} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" {...editCopy(content, "home_areas_heading", "Local protection, fast")} />
            <div className="mt-8 flex flex-wrap gap-3">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full px-5 py-2.5 text-sm font-semibold" style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)" }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: TEAL_DK }} className="text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.02] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Get your free, no-obligation quote.")} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-white/60" {...editCopy(content, "cta_sub", "Discreet · Same-day call-out · Guaranteed results")} />
          </div>
          {btnAmber(phone ? `Call ${phone}` : ctaLabel, phone ? `tel:${phone}` : cta)}
        </div>
      </section>
    </>,
    false,
  );
}

// Concentric ring / target decoration for the teal sections — the protective
// "ring" half of the brand motif. Purely decorative, pinned to a corner.
function RingDecor() {
  const ring: CSSProperties = { borderColor: "rgba(232,162,43,0.18)" };
  return (
    <div className="pointer-events-none absolute -right-24 -top-24 hidden h-[28rem] w-[28rem] sm:block" aria-hidden>
      <div className="absolute inset-0 rounded-full border" style={ring} />
      <div className="absolute inset-12 rounded-full border" style={ring} />
      <div className="absolute inset-24 rounded-full border" style={ring} />
      <div className="absolute inset-36 rounded-full border" style={ring} />
    </div>
  );
}
