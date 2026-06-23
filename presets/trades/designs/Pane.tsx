import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PaneHeader, PaneMark } from "./PaneHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Pane — crisp, reliable WINDOW-CLEANING design. Built for a streak-free round:
// reach-&-wash poles, residential & commercial, regular 4/8-weekly visits, plus
// gutters, fascias, soffits, conservatory roofs and solar panels. A bright,
// glassy identity — clear sky-blue on glass-navy with a sunlit glint accent. The
// structural signature is a window-mullion GRID-OF-PANES motif and a diagonal
// shine/glint sweep across the hero. MULTI-PAGE: nav opens real routes (Services
// / About / Work / Contact) under basePath; the sticky header + navy footer are
// shared. var(--font-space) display.

const SKY = "#2FA6E0"; // bright clear sky-blue primary
const NAVY = "#14344C"; // deep glass-navy
const GLINT = "#FCE38A"; // sunlit highlight (subtle glint)
const WHITE = "#FBFEFF"; // crisp white
const GREY = "#E6EDF1"; // light grey surface
const LINE = "#d4e0e8"; // hairline
const MUTE = "#5b7384"; // muted slate body
const display = { fontFamily: "var(--font-space)" } as const;

// Kicker pill with a tiny glint spark — light variant for navy/photographic backgrounds.
function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em]"
      style={light ? { background: "#ffffff26", color: "#ffffff" } : { background: WHITE, color: SKY, border: `1px solid ${LINE}` }}
    >
      <Glint color={light ? GLINT : SKY} size={11} />
      {children}
    </span>
  );
}

// Four-point glint spark — the sunlit shine accent.
function Glint({ color = SKY, size = 12 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 1 L14 10 L23 12 L14 14 L12 23 L10 14 L1 12 L10 10 Z" fill={color} />
    </svg>
  );
}

// Window-mullion grid overlay — the structural signature laid over the hero.
function PaneGrid() {
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1200 700" fill="none" aria-hidden>
      <g stroke="#ffffff" strokeOpacity="0.16" strokeWidth="2">
        <line x1="300" y1="0" x2="300" y2="700" />
        <line x1="600" y1="0" x2="600" y2="700" />
        <line x1="900" y1="0" x2="900" y2="700" />
        <line x1="0" y1="233" x2="1200" y2="233" />
        <line x1="0" y1="466" x2="1200" y2="466" />
      </g>
      {/* diagonal glint sweep */}
      <g style={{ mixBlendMode: "overlay" }}>
        <polygon points="200,-50 360,-50 -40,750 -200,750" fill="#ffffff" fillOpacity="0.22" />
        <polygon points="420,-50 470,-50 70,750 20,750" fill="#ffffff" fillOpacity="0.14" />
      </g>
    </svg>
  );
}

export default function PaneDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: SKY, color: WHITE }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-[#2fa6e012] ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: SKY, color: NAVY }}>
      {label}
    </a>
  );
  const btnOnDark = (label: string, to: string) => (
    <a href={to} className="inline-flex rounded-full border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff55" }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: NAVY }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <PaneMark />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-[0.02em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/75" style={{ border: "1px solid #ffffff26" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#2FA6E0] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/90" {...editCopy(content, "footer_company", "Company")} />
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/90" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.2em] text-white/90" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">Mon–Sat, rain or shine.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Streak-free, every time.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.14em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: WHITE }} className="min-h-screen font-body" >
      <PaneHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner-page banner: navy with a faint pane-grid + glint, matching the hero signature.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
      <PaneGrid />
      <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-32 text-white sm:pt-40">
        <Kicker light><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we clean", "svc_kicker", "Our Services", "svc_title")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-7">
                  <div className="flex min-w-0 gap-5">
                    <span style={{ ...display, color: SKY }} className="mt-0.5 hidden text-sm font-extrabold tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: NAVY }} className="text-xl font-extrabold tracking-tight">{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-extrabold" style={{ color: SKY }}>{s.price}</p>}
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
        {banner("Who we are", "about_kicker", "Reliable, every visit", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]" {...editCopy(content, "about_insured_heading", "Insured & accredited")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${SKY}55`, color: NAVY }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: NAVY }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.2em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
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
        {banner("Get in touch", "contact_kicker", "Request A Quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: NAVY }} className="text-2xl font-extrabold tracking-tight" {...editCopy(content, "contact_team_heading", "Speak to the team")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[color:#14344C]" style={{ color: MUTE }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[color:#14344C]" style={{ color: MUTE }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SKY }}>{h.open}</span></li>
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
                bookingBlurb="Tell us your address and what needs cleaning — we'll come back with a price and your next round date."
                bookingCta="Send request"
                theme={{ card: WHITE, cardBorder: LINE, heading: NAVY, blurb: MUTE, label: NAVY, fieldBg: GREY, fieldBorder: LINE, fieldText: NAVY, button: SKY, buttonText: WHITE, radius: "14px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — before/after) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Recent rounds", "gallery_kicker", "Our Work", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const whatWeClean = [
    "Windows", "Gutters", "Fascias & soffits", "Conservatory roofs", "Solar panels", "Commercial",
  ];
  const trust = [
    { t: "Fully insured", d: "Public liability cover on every job." },
    { t: "Reliable rounds", d: "We turn up on schedule, rain or shine." },
    { t: "Reach & wash", d: "Pure-water poles for a streak-free finish." },
    { t: "Satisfaction guaranteed", d: "Not happy? We'll come straight back." },
  ];
  const plans = [
    { every: "4", label: "Weekly round", note: "Most popular — sparkling all year." },
    { every: "8", label: "Weekly round", note: "Great value for low-traffic homes." },
    { every: "1", label: "Off clean", note: "One-off deep clean, no commitment." },
  ];

  return shell(
    <>
      {/* hero — glassy sky-blue with window-mullion grid + diagonal glint */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${SKY} 0%, #1f7fb8 55%, ${NAVY} 100%)` }} />
        )}
        {/* navy wash so the glassy headline reads on any photo */}
        <div className="pointer-events-none absolute inset-0" style={{ background: hero || content.hero_video_url ? "linear-gradient(105deg, rgba(20,52,76,0.9) 0%, rgba(20,52,76,0.6) 50%, rgba(47,166,224,0.25) 100%)" : "linear-gradient(105deg, rgba(20,52,76,0.55) 0%, rgba(20,52,76,0.15) 60%, transparent 100%)" }} />
        <PaneGrid />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Window cleaning in ${content.service_areas[0]}` : "Streak-free window cleaning"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight [text-shadow:0_2px_24px_rgba(20,52,76,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Crystal-clear, every time."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/70">{name}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/80" {...editCopy(content, "hero_sub", "Reliable residential & commercial rounds with pure-water reach-&-wash poles — left spotless, dry and streak-free.")} />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnOnDark(`Call ${phone}`, `tel:${phone}`)}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/60">
              {content.accreditations.map((a) => <span key={a}>✓ {a}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* reliability trust strip */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.t} className="px-2 py-2">
              <div className="flex items-center gap-2">
                <Glint color={GLINT} size={14} />
                <h3 style={display} className="text-sm font-extrabold uppercase tracking-[0.1em] text-white">{t.t}</h3>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "A round you can rely on")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em]" style={{ color: SKY }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: `linear-gradient(135deg, ${SKY}, ${NAVY})` }} />
            )}
            {/* glass-pane frame accent */}
            <span className="pointer-events-none absolute inset-3 rounded-xl" style={{ border: "1px solid #ffffff55", boxShadow: `0 0 0 1px ${SKY}33 inset` }} />
            <span className="pointer-events-none absolute left-1/2 top-3 bottom-3 w-px -translate-x-1/2" style={{ background: "#ffffff44" }} />
          </div>
        </section>
      )}

      {/* what we clean — clean divider list */}
      {services.length > 0 ? (
        <section style={{ background: GREY }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_services_kicker", "What we clean")} /></Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl" {...editCopy(content, "home_services_heading", "Our services")} />
            <ul className="mt-10 divide-y" style={{ borderColor: LINE }}>
              {services.slice(0, 6).map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-6">
                  <div className="flex min-w-0 gap-5">
                    <span style={{ ...display, color: SKY }} className="mt-0.5 hidden text-sm font-extrabold tabular-nums sm:block">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: NAVY }} className="text-xl font-extrabold tracking-tight">{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-extrabold" style={{ color: SKY }}>{s.price}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      ) : (
        // fallback "what we clean" chips when no catalog yet
        <section style={{ background: GREY }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_clean_kicker", "What we clean")} /></Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl" {...editCopy(content, "home_clean_heading", "From glass to gutters")} />
            <div className="mt-10 flex flex-wrap gap-3">
              {whatWeClean.map((w) => (
                <span key={w} className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold" style={{ color: NAVY, border: `1px solid ${LINE}` }}>
                  <Glint color={SKY} size={12} />{w}
                </span>
              ))}
            </div>
            <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
          </div>
        </section>
      )}

      {/* regular rounds — 4 / 8 weekly plan strip */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Kicker><span {...editCopy(content, "home_rounds_kicker", "Regular rounds")} /></Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl" {...editCopy(content, "home_rounds_heading", "Pick your schedule")} />
          </div>
          <p className="max-w-sm text-sm leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_rounds_sub", "We text the night before and clean front & back. No contracts — cancel any time.")} />
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          {plans.map((p, i) => (
            <div key={p.label + i} className="relative overflow-hidden rounded-2xl p-7" style={i === 0 ? { background: NAVY } : { background: WHITE, border: `1px solid ${LINE}` }}>
              {i === 0 && <span className="absolute right-4 top-4"><Glint color={GLINT} size={16} /></span>}
              <p style={{ ...display, color: i === 0 ? WHITE : SKY }} className="text-5xl font-extrabold leading-none">
                {p.every}<span className="ml-1 text-base font-bold align-top">{p.every === "1" ? "" : "wk"}</span>
              </p>
              <h3 style={{ ...display, color: i === 0 ? WHITE : NAVY }} className="mt-3 text-lg font-extrabold tracking-tight">{p.every === "1" ? "One-off clean" : `Every ${p.every} weeks`}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: i === 0 ? "#ffffffb3" : MUTE }}>{p.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* work strip — before/after */}
      {gallery.length > 0 && (
        <section style={{ background: GREY }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_work_kicker", "Recent rounds")} /></Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl" {...editCopy(content, "home_work_heading", "Our work")} />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* areas-covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
          <PaneGrid />
          <div className="relative mx-auto max-w-7xl px-8 py-20 text-white">
            <Kicker light><span {...editCopy(content, "home_areas_kicker", "Areas covered")} /></Kicker>
            <h2 style={display} className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_areas_heading", "On the round near you")} />
            <p className="mt-6 max-w-4xl text-lg leading-relaxed text-white/75">{content.service_areas.join(" · ")}</p>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: SKY }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: WHITE }}>
          <div>
            <h2 style={display} className="text-3xl font-extrabold leading-[0.98] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Ready for streak-free windows?")} />
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em]" style={{ color: "#ffffffcc" }} {...editCopy(content, "cta_sub", "Free, no-obligation quotes.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:brightness-105" style={{ background: NAVY, color: WHITE }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
