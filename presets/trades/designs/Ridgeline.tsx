import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RidgelineHeader } from "./RidgelineHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Ridgeline — a solid, dependable ROOFER. The visual signature is structural:
// a slate grey-blue sky, a repeating roof-ridge / shingle silhouette motif, and
// warm terracotta-tile accents that read like clay roof tiles. Trust leads
// everything (insured, guaranteed, free roof inspections, emergency leaks,
// areas covered). Clean divider rows for "what we do" — no cards, no leaders.
// MULTI-PAGE: nav opens real routes (Services / About / Work / Contact) under
// basePath; the sticky header + slate footer are shared across pages.

const SLATE = "#34404C"; // slate grey-blue — primary structure
const INK = "#1F262C"; // charcoal ink — deepest
const TILE = "#C45A3B"; // warm terracotta-tile — accent
const SKY = "#8AB2C9"; // sky blue — soft secondary
const PAPER = "#F3F1EC"; // off-white page
const MUTE = "#5d6b76"; // muted slate body on paper
const display = { fontFamily: "var(--font-space)" } as const;

// A repeating roof-ridge silhouette used as a structural divider/motif.
function RidgeBand({ color = TILE, height = 18, className = "" }: { color?: string; height?: number; className?: string }) {
  return (
    <svg className={`block w-full ${className}`} viewBox="0 0 120 18" preserveAspectRatio="none" style={{ height }} aria-hidden>
      <path d="M0 18 L15 4 L30 18 L45 4 L60 18 L75 4 L90 18 L105 4 L120 18 Z" fill={color} />
    </svg>
  );
}

// Small label with a terracotta ridge tick.
function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: light ? SKY : TILE }}>
      <svg width="16" height="11" viewBox="0 0 16 11" fill="none" aria-hidden><path d="M1 10L8 3l7 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="square" /></svg>
      {children}
    </span>
  );
}

export default function RidgelineDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // Trust pillars a roofer leads with.
  const trust = [
    "Fully insured",
    "Workmanship guaranteed",
    "Free roof inspections",
    "24/7 emergency leaks",
  ];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-7 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110 ${full ? "block w-full" : "inline-block"}`} style={{ background: TILE, color: PAPER }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, light = false, full = false) => (
    <a href={to} className={`rounded-full border px-7 py-3.5 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition ${full ? "block w-full" : "inline-block"} ${light ? "hover:bg-white/10" : "hover:bg-[#34404C]/5"}`} style={{ borderColor: light ? "#ffffff55" : "#34404C44", color: light ? "#ffffff" : SLATE }}>
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <RidgeBand color={SLATE} height={20} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" aria-hidden><path d="M2 14L13 4l11 10" stroke={TILE} strokeWidth="3" strokeLinecap="square" strokeLinejoin="miter" /><path d="M6.5 18L13 12.5 19.5 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" opacity="0.85" /></svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold uppercase tracking-[0.1em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/70" style={{ borderColor: "#ffffff24" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-white hover:border-[#C45A3B]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...display, color: SKY }} className="text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "footer_company", "Company")} />
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...display, color: SKY }} className="text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...display, color: SKY }} className="text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/65">Mon–Sat, plus emergency call-out.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Roofs done right, rain or shine.</p>
        {phone && <a href={`tel:${phone}`} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER, color: SLATE }} className="min-h-screen font-body">
      <RidgelineHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Slate page banner with the ridge motif along the bottom edge.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: SLATE }} className="relative text-white">
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
      <RidgeBand color={PAPER} height={18} />
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "svc_kicker", "Roofing services", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "#34404C22" }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-start justify-between gap-6 py-6" style={{ borderColor: "#34404C22" }}>
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={display} className="text-lg font-bold tracking-tight" >{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} style={{ ...display, color: TILE }} className="shrink-0 text-right text-base font-bold">{s.price}</p>}
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
        {banner("Who we are", "about_kicker", "A roofer you can rely on", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-10 flex flex-wrap gap-2.5">
            {trust.map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[12px] font-semibold" style={{ background: "#34404C0f", color: SLATE }}>
                <span className="inline-block h-2 w-2 rotate-45" style={{ background: TILE }} />{t}
              </span>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: SLATE }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "about_accredited_heading", "Accredited & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: `${TILE}66`, color: SLATE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: SLATE }} className="mt-12 text-xs font-bold uppercase tracking-[0.22em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
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
        {banner("Get in touch", "contact_kicker", "Request a free quote", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: SLATE }} className="text-2xl font-bold tracking-tight" {...editCopy(content, "contact_lead_heading", "Book a roof inspection")} />
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "contact_lead_sub", "Free, no-obligation. We'll inspect, advise and quote — including emergency leaks.")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#C45A3B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#C45A3B]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#34404C22", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SLATE }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about your roof and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: "#34404C1f", heading: SLATE, blurb: MUTE, label: SLATE, fieldBg: PAPER, fieldBorder: "#34404C2e", fieldText: SLATE, button: TILE, buttonText: PAPER, radius: "14px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — before/after roofs) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Recent roofs", "gallery_kicker", "Our work", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-lg" style={{ background: "#fff", border: "1px solid #34404C1a" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                  {g.caption && <figcaption className="px-4 py-3 text-[13px] font-medium" style={{ color: SLATE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const whatWeDo = services.length > 0
    ? services.slice(0, 6)
    : (["Roof repairs", "New roofs", "Flat roofs", "Guttering", "Chimneys", "Emergency leaks"].map((n, i) => ({ id: `_d${i}`, name: n, description: undefined as string | undefined, price: undefined as string | undefined })));

  return shell(
    <>
      {/* hero — slate sky with ridge silhouette */}
      <section className="relative isolate flex min-h-[90vh] items-center overflow-hidden" style={{ background: SLATE }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#3d4b58 0%,#34404C 45%,#1F262C 100%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(31,38,44,0.92) 0%, rgba(52,64,76,0.78) 48%, rgba(52,64,76,0.35) 100%)" }} />
        {/* faint ridge silhouette across the sky */}
        <svg className="pointer-events-none absolute inset-x-0 bottom-0 w-full opacity-[0.16]" viewBox="0 0 1200 200" preserveAspectRatio="none" style={{ height: "40%" }} aria-hidden>
          <path d="M0 200 L120 90 L240 200 L360 70 L480 200 L600 50 L720 200 L840 90 L960 200 L1080 70 L1200 200 Z" fill={SKY} />
        </svg>
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Roofers across ${content.service_areas[0]}` : "Local roofing specialists"}</Kicker>
          <h1 style={display} className="mt-5 max-w-3xl text-5xl font-bold leading-[1.0] tracking-tight [text-shadow:0_2px_24px_rgba(31,38,44,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Roofs done right, rain or shine."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`, true)}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/65">
            {trust.map((t) => <span key={t} className="inline-flex items-center gap-2"><span className="inline-block h-2 w-2 rotate-45" style={{ background: TILE }} />{t}</span>)}
          </div>
        </div>
      </section>

      {/* guaranteed & insured trust strip */}
      <section style={{ background: TILE }} className="text-white">
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-7 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t} className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden><path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z" /><path d="M9 12l2 2 4-4" /></svg>
              <span style={display} className="text-sm font-bold uppercase tracking-[0.08em]">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-xl" style={{ background: SLATE }} />
            )}
            <RidgeBand color={TILE} height={14} className="absolute inset-x-0 -bottom-1 rounded-b-xl" />
          </div>
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "Built to keep the weather out")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: TILE }}>More about us →</a>
          </div>
        </section>
      )}

      {/* what we do — clean divider rows */}
      <section style={{ background: "#fff", borderTop: "1px solid #34404C14", borderBottom: "1px solid #34404C14" }}>
        <div className="mx-auto max-w-4xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_services_kicker", "What we do")} /></Kicker>
          <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_services_heading", "Every kind of roof")} />
          <ul className="mt-12 divide-y" style={{ borderColor: "#34404C1f" }}>
            {whatWeDo.map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-6 py-6" style={{ borderColor: "#34404C1f" }}>
                <div className="min-w-0">
                  <h3 data-edit={s.id.startsWith("_d") ? undefined : `item:${s.id}:name`} style={display} className="text-lg font-bold tracking-tight">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                </div>
                {s.price && <p data-edit={`item:${s.id}:price`} style={{ ...display, color: TILE }} className="shrink-0 text-right text-base font-bold">{s.price}</p>}
              </li>
            ))}
          </ul>
          {services.length > 0 && <div className="mt-12">{btnGhost("View all services", href("services"))}</div>}
        </div>
      </section>

      {/* work — recent roofs */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_work_kicker", "Recent roofs")} /></Kicker>
          <h2 style={{ ...display, color: SLATE }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_work_heading", "Our work")} />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(0, 3).map((g) => (
              <figure key={g.id} className="overflow-hidden rounded-lg" style={{ background: "#fff", border: "1px solid #34404C1a" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
                {g.caption && <figcaption className="px-4 py-3 text-[13px] font-medium" style={{ color: SLATE }}>{g.caption}</figcaption>}
              </figure>
            ))}
          </div>
          <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: SLATE }} className="relative text-white">
          <RidgeBand color={PAPER} height={16} className="rotate-180" />
          <div className="mx-auto max-w-7xl px-8 py-20">
            <Kicker light><span {...editCopy(content, "home_areas_kicker", "Where we work")} /></Kicker>
            <h2 style={display} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl" {...editCopy(content, "home_areas_heading", "Areas we cover")} />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {content.service_areas.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px] font-semibold" style={{ background: "#ffffff14", color: "#fff" }}>
                  <span className="inline-block h-2 w-2 rotate-45" style={{ background: SKY }} />{a}
                </span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.04] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Got a leak? Need a new roof?")} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.14em] text-white/60" {...editCopy(content, "cta_sub", "Free roof inspections & honest quotes.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: TILE, color: PAPER }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
