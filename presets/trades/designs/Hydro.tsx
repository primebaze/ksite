import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { HydroHeader } from "./HydroHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Hydro — a bright, fast, friendly hand car wash & valeting service. Sparkling
// splash-blue and fresh aqua with a sunny lemon accent on clean white; soft
// rounded shapes, playful water-splash, bubble and sparkle motifs, and an
// energetic friendly voice. The opposite register to the dark luxury detailing
// studios — this is great value, no appointment needed, open 7 days. MULTI-PAGE:
// nav opens real routes (Services / About / Work / Contact) under basePath; the
// floating pill header + bright footer are shared.

const BLUE = "#1FA2E0"; // splash blue
const AQUA = "#5FD0E8"; // fresh aqua
const LEMON = "#FBD24B"; // sunny accent
const WHITE = "#F7FCFE"; // clean white page
const NAVY = "#143A52"; // deep navy ink
const MUTE = "#5b7b8e"; // muted slate-blue body
const display = { fontFamily: "var(--font-space)" } as const;

// Sparkle / shine glints — the signature mark, dotted around bright surfaces.
function Sparkle({ className = "", color = "#ffffff" }: { className?: string; color?: string }) {
  return (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 0c.7 5.6 3.7 8.6 9.3 9.3-5.6.7-8.6 3.7-9.3 9.3-.7-5.6-3.7-8.6-9.3-9.3C8.3 8.6 11.3 5.6 12 0z" />
    </svg>
  );
}

function Bubbles({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" fill="none" aria-hidden preserveAspectRatio="none">
      {[
        [18, 52, 14], [44, 30, 9], [70, 58, 11], [96, 22, 7], [122, 50, 13],
        [150, 34, 8], [176, 56, 10], [60, 14, 5], [134, 16, 6], [188, 28, 6],
      ].map(([cx, cy, r], i) => (
        <circle key={i} cx={cx} cy={cy} r={r} fill="#ffffff" opacity={0.16 + (i % 3) * 0.07} />
      ))}
    </svg>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">
      <Sparkle className="h-3.5 w-3.5" color={LEMON} />
      {children}
    </span>
  );
}

export default function HydroDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book a wash";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Wash Menu", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const lemonBtn = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-8 py-4 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: LEMON, color: NAVY, boxShadow: "0 12px 24px -10px rgba(251,210,75,0.7)" }}
    >
      {label}
    </a>
  );
  const whiteBtn = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full bg-white/15 px-8 py-4 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] text-white ring-1 ring-inset ring-white/40 transition hover:bg-white/25">{label}</a>
  );
  const blueBtn = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full px-8 py-4 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:brightness-110" style={{ background: BLUE }}>{label}</a>
  );

  // Friendly value props — the lead promise.
  const valueProps = [
    { icon: "drop", t: "No appointment needed", d: "Just drive in — most washes done while you wait." },
    { icon: "hand", t: "Hand wash & wax", d: "Gentle hand finish, never harsh brushes." },
    { icon: "leaf", t: "Eco-friendly water", d: "We recycle and reclaim — kinder on the planet." },
    { icon: "card", t: "Loyalty card", d: "Collect stamps and your fifth wash is on us." },
  ];

  function ValueIcon({ kind }: { kind: string }) {
    const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: NAVY, strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, "aria-hidden": true };
    if (kind === "drop") return <svg {...common}><path d="M12 3c3.2 4 6 7 6 10a6 6 0 0 1-12 0c0-3 2.8-6 6-10z" /></svg>;
    if (kind === "hand") return <svg {...common}><path d="M6 11V5.5a1.5 1.5 0 0 1 3 0V10m0 0V4.5a1.5 1.5 0 0 1 3 0V10m0 0V5.5a1.5 1.5 0 0 1 3 0V11m0 0a1.5 1.5 0 0 1 3 0v3a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.8-2.4L4 15" /></svg>;
    if (kind === "leaf") return <svg {...common}><path d="M5 19c0-7 5-12 14-12 0 9-5 14-12 14a8 8 0 0 1-2-.3" /><path d="M5 19c2-4 5-7 9-9" /></svg>;
    return <svg {...common}><rect x="3" y="6" width="18" height="12" rx="2.5" /><path d="M3 10h18M7 14h4" /></svg>;
  }

  const footer = (
    <footer className="text-white" style={{ background: NAVY }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Sparkle className="h-5 w-5" color={LEMON} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75">{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/85 transition hover:bg-[#FBD24B] hover:text-[#143A52]"><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Find us</h4>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/50">Open</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/75">Open 7 days a week.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-white/10 px-8 py-7 text-xs text-white/55 sm:flex-row">
        <p>© {new Date().getFullYear()} {name}. Sparkling clean, every time.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.12em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: WHITE, color: NAVY }} className="min-h-screen font-body">
      <HydroHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Bright splashy banner used on sub-pages (mirrors the home hero register).
  const banner = (kicker: string, title: string) => (
    <section className="relative isolate overflow-hidden" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${AQUA} 100%)` }}>
      <Bubbles className="pointer-events-none absolute inset-x-0 bottom-0 h-24 w-full" />
      <Sparkle className="pointer-events-none absolute right-[12%] top-16 h-6 w-6 opacity-80" color={LEMON} />
      <Sparkle className="pointer-events-none absolute right-[28%] top-28 h-4 w-4 opacity-60" />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 text-white sm:pt-40">
        <Pill>{kicker}</Pill>
        <h1 style={display} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES (Wash Menu) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Pick your wash", "The Wash Menu")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          <p className="text-[15px] leading-relaxed" style={{ color: MUTE }}>Mini, Full or Deluxe — every wash is done by hand with care. No appointment needed, just drive in.</p>
          {services.length > 0 ? (
            <ul className="mt-10 divide-y" style={{ borderColor: "#dceaf1" }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: NAVY }} className="text-lg font-extrabold tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 rounded-full px-4 py-1.5 text-base font-extrabold text-white" style={{ background: BLUE }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p className="mt-10" style={{ color: MUTE }}>Wash menu coming soon.</p>}
          <div className="mt-12">{lemonBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Hello there", "Your Friendly Local Wash")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Trusted &amp; certified</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.1em]" style={{ background: "#e7f4fa", color: BLUE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{lemonBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Come on in", "Book Your Wash")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: NAVY }} className="text-2xl font-extrabold tracking-tight">Drive in or drop us a line</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#1FA2E0]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#1FA2E0]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#dceaf1", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#9bb6c4]">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{blueBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Book a wash"
                bookingBlurb="Tell us your car and which wash you fancy — we'll get you sparkling in no time."
                bookingCta="Book my wash"
                theme={{ card: "#ffffff", cardBorder: "#dceaf1", heading: NAVY, blurb: MUTE, label: NAVY, fieldBg: "#f1f8fc", fieldBorder: "#cfe4ef", fieldText: NAVY, button: LEMON, buttonText: NAVY, radius: "1rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Shiny results", "Before & After")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover shadow-sm" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Sparkling photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const steps = [
    { n: "1", t: "Drive in", d: "No booking, no waiting around — pull up any day of the week." },
    { n: "2", t: "We wash", d: "Our team hand-washes, waxes and valets while you relax." },
    { n: "3", t: "Drive away gleaming", d: "Back on the road sparkling clean, in minutes." },
  ];

  return shell(
    <>
      {/* hero — bright splash-blue with bubbles & sparkles */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : null}
        {/* splash-blue wash over everything keeps the bright register */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, ${AQUA} 100%)`, opacity: hero || content.hero_video_url ? 0.86 : 1 }} />
        {/* sparkles + splash */}
        <Sparkle className="pointer-events-none absolute left-[8%] top-[22%] h-8 w-8 opacity-90" color={LEMON} />
        <Sparkle className="pointer-events-none absolute right-[14%] top-[30%] h-5 w-5 opacity-70" />
        <Sparkle className="pointer-events-none absolute right-[26%] top-[58%] h-6 w-6 opacity-60" color={LEMON} />
        <Bubbles className="pointer-events-none absolute inset-x-0 bottom-0 h-32 w-full" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Pill>{content.service_areas?.[0] ? `Hand car wash in ${content.service_areas[0]}` : "Open 7 days · No appointment needed"}</Pill>
          <h1 style={display} className="mt-5 max-w-3xl text-5xl font-extrabold leading-[0.95] tracking-tight [text-shadow:0_3px_18px_rgba(20,58,82,0.3)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Sparkling clean, in minutes."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/80">{name}</p>
          <p className="mt-3 max-w-xl text-lg text-white/90">Friendly hand car wash &amp; valeting — great value, eco-friendly water, and a shine you can see your face in.</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {lemonBtn(ctaLabel, cta)}
            {phone ? whiteBtn(`Call ${phone}`, `tel:${phone}`) : whiteBtn("See the wash menu", href("services"))}
          </div>
        </div>
      </section>

      {/* value strip — friendly trust */}
      <section className="mx-auto -mt-10 max-w-7xl px-6">
        <div className="relative z-20 grid gap-4 rounded-[28px] bg-white p-6 shadow-[0_24px_60px_-30px_rgba(20,58,82,0.5)] sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((v) => (
            <div key={v.t} className="flex gap-4 rounded-2xl p-4 transition hover:bg-[#f1f8fc]">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full" style={{ background: "#e7f4fa" }}><ValueIcon kind={v.icon} /></span>
              <div>
                <h3 style={{ ...display, color: NAVY }} className="text-[15px] font-extrabold tracking-tight">{v.t}</h3>
                <p className="mt-1 text-[13px] leading-snug" style={{ color: MUTE }}>{v.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* how it works */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ background: "#e7f4fa", color: BLUE }}><Sparkle className="h-3.5 w-3.5" color={BLUE} /> Quick &amp; easy</span>
          <h2 style={{ ...display, color: NAVY }} className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">Three splashes to a spotless car</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-[28px] p-8" style={{ background: i === 1 ? BLUE : "#ffffff", color: i === 1 ? "#ffffff" : NAVY, boxShadow: "0 20px 50px -32px rgba(20,58,82,0.5)" }}>
              <span style={{ ...display, background: i === 1 ? "#ffffff" : LEMON, color: NAVY }} className="flex h-12 w-12 items-center justify-center rounded-full text-2xl font-extrabold">{s.n}</span>
              <h3 style={display} className="mt-4 text-xl font-extrabold tracking-tight">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: i === 1 ? "#eaf7fc" : MUTE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* wash menu preview */}
      {services.length > 0 && (
        <section style={{ background: "#eef8fc" }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex items-end justify-between gap-6">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ background: "#ffffff", color: BLUE }}>Pick your wash</span>
                <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">The wash menu</h2>
              </div>
            </div>
            <ul className="mt-10 divide-y" style={{ borderColor: "#d4e8f1" }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: NAVY }} className="text-lg font-extrabold tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 rounded-full px-4 py-1.5 text-base font-extrabold text-white" style={{ background: BLUE }}>{s.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{blueBtn("See the full menu", href("services"))}</div>
          </div>
        </section>
      )}

      {/* about + eco-water angle */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[28px] object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[28px]" style={{ background: `linear-gradient(135deg, ${BLUE}, ${AQUA})` }} />
            )}
            <span className="absolute -bottom-5 -right-4 flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-extrabold shadow-lg" style={{ color: NAVY }}>
              <Sparkle className="h-4 w-4" color={BLUE} /> Eco-friendly water
            </span>
          </div>
          <div>
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ background: "#e7f4fa", color: BLUE }}>About us</span>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">A wash that&apos;s kind to your car &amp; the planet</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[13px] font-extrabold uppercase tracking-[0.14em]" style={{ color: BLUE }}>More about us →</a>
          </div>
        </section>
      )}

      {/* loyalty / value banner */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[32px] px-8 py-14 text-center sm:px-16" style={{ background: `linear-gradient(135deg, ${BLUE}, ${AQUA})` }}>
          <Sparkle className="pointer-events-none absolute left-[10%] top-8 h-6 w-6 opacity-80" color={LEMON} />
          <Sparkle className="pointer-events-none absolute right-[12%] bottom-8 h-5 w-5 opacity-70" />
          <span className="inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur">Loyalty card</span>
          <h2 style={display} className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">Every fifth wash is on us</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/90">Collect a stamp each visit. Great value washes, even better when they&apos;re free.</p>
          <div className="mt-8 flex justify-center">{lemonBtn(ctaLabel, cta)}</div>
        </div>
      </section>

      {/* before & after gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 pb-24">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ background: "#e7f4fa", color: BLUE }}>Shiny results</span>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Sparkling clean, every time</h2>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover shadow-sm" />
            ))}
          </div>
          <div className="mt-10 text-center">{blueBtn("See more results", href("gallery"))}</div>
        </section>
      )}

      {/* hours / find us band */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-8 py-16 text-white lg:flex-row lg:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">Open 7 days — just drive in</h2>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-6 grid max-w-md grid-cols-2 gap-x-10 gap-y-1.5 text-sm text-white/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-white/75">No appointment needed — pop in any day of the week.</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            {lemonBtn(ctaLabel, cta)}
            {content.map_url && whiteBtn("Find us", content.map_url)}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
