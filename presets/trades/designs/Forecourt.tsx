import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ForecourtHeader } from "./ForecourtHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Forecourt — a trustworthy, premium-retail used & new CAR DEALERSHIP design.
// Deep showroom navy with polished-steel greys and a premium gold accent on
// crisp white panels: rounded forms, a serif-of-trust display (Space) and a
// "drive away with confidence" register. Distinct from Apex's performance
// garage (carbon/red) and Velocity's EV/detailing (midnight/cyan) — this is the
// calm, finance-and-part-ex forecourt. MULTI-PAGE: nav opens real routes
// (Stock / About / Gallery / Contact) under basePath; the sticky navy header
// and light footer are shared. The catalog items render as vehicles/stock.

const NAVY = "#14233B"; // showroom navy — header, hero, dark bands
const NAVY_DEEP = "#0F1A2C"; // deeper navy for gradients / footer
const STEEL = "#8C97A4"; // polished steel — muted text on dark
const GOLD = "#C7A35A"; // premium gold accent
const WHITE = "#F6F8FA"; // crisp white page
const INK = "#11161D"; // charcoal ink — body text on light
const INK_MUTE = "#5A6573"; // muted ink on light
const LINE = "#E2E7EC"; // hairline on light
const display = { fontFamily: "var(--font-space)" } as const;

function Eyebrow({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  return (
    <p className="flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
      <span className="h-px w-6" style={{ background: GOLD }} />
      <span style={{ color: on === "dark" ? GOLD : GOLD }}>{children}</span>
    </p>
  );
}

export default function ForecourtDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Enquire now";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Stock", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // trust pillars — the forecourt's core promises
  const trust = [
    { t: "Finance available", d: "Flexible plans, decision in minutes." },
    { t: "Part-exchange welcome", d: "Fair value for your current car." },
    { t: "AA-inspected", d: "Every vehicle checked & warranted." },
    { t: "Drive away today", d: "Tax, transfer and keys sorted." },
  ];

  const goldBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: GOLD, color: NAVY }}>{label}</a>
  );
  const navyBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: NAVY }}>{label}</a>
  );
  const ghostBtn = (label: string, to: string, on: "light" | "dark" = "light") => (
    <a href={to} className="inline-flex rounded-full border px-8 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] transition" style={on === "dark" ? { borderColor: "#ffffff33", color: WHITE } : { borderColor: LINE, color: INK }}>{label}</a>
  );

  // ---- shared: stock list (main catalog = divide-y rows, name+desc left / price right) ----
  const stockList = (items: typeof services) => (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {items.map((s) => (
        <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
          <div className="min-w-0">
            <p data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-bold tracking-tight">{s.name}</p>
            {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: INK_MUTE }}>{s.description}</p>}
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-bold tabular-nums" style={{ ...display, color: NAVY }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  const footer = (
    <footer style={{ background: NAVY_DEEP }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold" style={{ background: GOLD, color: NAVY, ...display }} aria-hidden>{(name?.[0] ?? "F").toUpperCase()}</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: STEEL }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: "#ffffff1f", color: STEEL }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-[#14233B] hover:bg-[#C7A35A]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "footer_showroom", "Showroom")} />
          <ul className="mt-5 space-y-3 text-sm" style={{ color: STEEL }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "footer_visit", "Visit us")} />
          <div className="mt-5 space-y-3 text-sm" style={{ color: STEEL }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: STEEL }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: STEEL }}>Mon–Sat, Sun by appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.service_areas && content.service_areas.length > 0 && <p className="uppercase tracking-[0.12em] text-white/45">Serving {content.service_areas.join(" · ")}</p>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: WHITE }} className="min-h-screen font-body">
      <ForecourtHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: `linear-gradient(160deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Eyebrow on="dark"><span {...editCopy(content, kickerKey, kicker)} /></Eyebrow>
        <h1 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- SERVICES (Stock) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Browse the stock", "svc_kicker", "Our Current Stock", "svc_title")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            stockList(services)
          ) : <p style={{ color: INK_MUTE }}>New stock arriving soon — call us for what&apos;s on the way.</p>}
          <div className="mt-12 flex flex-wrap gap-3">{goldBtn(ctaLabel, cta)}{phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About the dealership", "about_kicker", "Buy With Confidence", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: INK_MUTE }}>{content.about}</p> : <p style={{ color: INK_MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t.t} className="rounded-2xl border p-6" style={{ borderColor: LINE, background: "#FFFFFF" }}>
                <p style={{ ...display, color: NAVY }} className="text-base font-bold tracking-tight">{t.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: INK_MUTE }}>{t.d}</p>
              </div>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "about_approved_heading", "Approved & accredited")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ borderColor: `${GOLD}88`, color: INK }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: INK_MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{goldBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "contact_kicker", "Enquire About A Car", "contact_title")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-tight" {...editCopy(content, "contact_heading", "Visit the forecourt")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: INK_MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#14233B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#14233B]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: INK_MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: INK }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Enquire about a car"
                bookingBlurb="Tell us the car you're interested in — plus part-exchange and finance needs — and we'll be in touch."
                bookingCta="Send enquiry"
                contactTitle="Message us"
                contactBlurb="Questions about stock, finance or part-exchange? Drop us a line."
                theme={{ card: "#FFFFFF", cardBorder: LINE, heading: INK, blurb: INK_MUTE, label: INK, fieldBg: WHITE, fieldBorder: LINE, fieldText: INK, button: GOLD, buttonText: NAVY, radius: "0.75rem", font: "var(--font-space)" }}
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
        {banner("The forecourt", "gallery_kicker", "Gallery", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: INK_MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = services.slice(0, 3);

  return shell(
    <>
      {/* hero — premium showroom navy with a stock-search feel */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden" style={{ background: NAVY }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-70" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(105deg, ${NAVY_DEEP}f2 0%, ${NAVY}cc 45%, ${NAVY}55 100%)` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Eyebrow on="dark">{content.service_areas?.[0] ? `Trusted dealership in ${content.service_areas[0]}` : "Quality used & new cars"}</Eyebrow>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-bold leading-[0.98] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Drive away with confidence."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: STEEL }}>{name}</p>
          {/* stock-search bar (visual) */}
          <div className="mt-9 max-w-2xl rounded-2xl border bg-white/[0.06] p-2 backdrop-blur-sm sm:flex sm:items-center sm:gap-2" style={{ borderColor: "#ffffff22" }}>
            <div className="flex flex-1 items-center gap-3 px-4 py-3 text-sm" style={{ color: STEEL }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
              <span {...editCopy(content, "hero_search_placeholder", "Search the stock — make, model or budget")} />
            </div>
            <a href={services.length > 0 ? href("services") : cta} className="mt-2 block rounded-xl px-7 py-3 text-center text-[12px] font-bold uppercase tracking-[0.14em] transition hover:brightness-105 sm:mt-0" style={{ background: GOLD, color: NAVY }} {...editCopy(content, "hero_search_cta", "Browse stock")} />
          </div>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {goldBtn(ctaLabel, cta)}
            {phone && ghostBtn(`Call ${phone}`, `tel:${phone}`, "dark")}
          </div>
        </div>
      </section>

      {/* trust strip — finance / part-ex / warranty / drive away */}
      <section style={{ background: "#FFFFFF", borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-7xl gap-px px-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {trust.map((t) => (
            <div key={t.t} className="px-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: `${GOLD}22` }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="2" aria-hidden><path d="m5 13 4 4L19 7" /></svg>
              </div>
              <p style={{ ...display, color: NAVY }} className="mt-4 text-base font-bold tracking-tight">{t.t}</p>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: INK_MUTE }}>{t.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* featured stock — tidy grid (catalog as cars w/ price) */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow><span {...editCopy(content, "home_featured_kicker", "Featured stock")} /></Eyebrow>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_featured_heading", "This week's pick of the forecourt")} />
            </div>
            {services.length > 0 && <a href={href("services")} className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: NAVY }} {...editCopy(content, "home_featured_link", "View all stock →")} />}
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((s, i) => (
              <div key={s.id} className="group flex flex-col overflow-hidden rounded-2xl border transition hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(20,35,59,0.12)]" style={{ borderColor: LINE, background: "#FFFFFF" }}>
                <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: WHITE }}>
                  {gallery[i] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" src={gallery[i].image_url} alt={gallery[i].caption ?? ""} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center" style={{ background: `linear-gradient(150deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}>
                      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke={STEEL} strokeWidth="1.3" aria-hidden><path d="M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0a2 2 0 0 0-2 2v3h2m14-5a2 2 0 0 1 2 2v3h-2m-14 0v2m0-2h14m0 0v2M7 14h.01M17 14h.01" /></svg>
                    </div>
                  )}
                  <span className="absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ background: GOLD, color: NAVY }}>Available now</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-bold tracking-tight">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: INK_MUTE }}>{s.description}</p>}
                  <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: LINE }}>
                    {s.price ? <span data-edit={`item:${s.id}:price`} style={{ ...display, color: NAVY }} className="text-xl font-bold tabular-nums">{s.price}</span> : <span />}
                    <a href={cta} className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ color: GOLD }}>Enquire →</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* full stock list — main catalog stays divide-y rows */}
      {services.length > 3 && (
        <section style={{ background: "#FFFFFF", borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Eyebrow><span {...editCopy(content, "home_fullstock_kicker", "The full forecourt")} /></Eyebrow>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_fullstock_heading", "All current stock")} />
            <div className="mt-10">{stockList(services)}</div>
            <div className="mt-12">{ghostBtn("View stock page", href("services"))}</div>
          </div>
        </section>
      )}

      {/* value-my-car / finance angle */}
      <section style={{ background: `linear-gradient(150deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }}>
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <Eyebrow on="dark"><span {...editCopy(content, "home_finance_kicker", "Part-exchange & finance")} /></Eyebrow>
            <h2 style={{ ...display, color: WHITE }} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl" {...editCopy(content, "home_finance_heading", "Value your car. Spread the cost.")} />
            <p className="mt-5 text-[16px] leading-[1.9]" style={{ color: STEEL }} {...editCopy(content, "home_finance_body", "Bring your current car in for a fair, no-obligation valuation and put it straight towards your next one. Representative finance from competitive monthly rates, with a quick decision and clear terms.")} />
            <div className="mt-8 flex flex-wrap gap-3">
              {goldBtn("Value my car", cta)}
              {ghostBtn("Finance options", cta, "dark")}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "0%", v: "Deposit options available" },
              { k: services.length > 0 ? `${services.length}+` : "Quality", v: "Cars in stock" },
              { k: content.accreditations?.length ? `${content.accreditations.length}` : "AA", v: "Approved & inspected" },
              { k: content.service_areas?.length ? `${content.service_areas.length}` : "Local", v: "Areas covered" },
            ].map((s) => (
              <div key={s.v} className="rounded-2xl border p-6" style={{ borderColor: "#ffffff1f", background: "#ffffff08" }}>
                <p style={{ ...display, color: GOLD }} className="text-3xl font-bold">{s.k}</p>
                <p className="mt-1 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ color: STEEL }}>{s.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* why buy from us band */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: `linear-gradient(150deg, ${NAVY} 0%, ${NAVY_DEEP} 100%)` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-20 w-20 rounded-bl-2xl" style={{ borderBottom: `3px solid ${GOLD}`, borderLeft: `3px solid ${GOLD}` }} />
          </div>
          <div>
            <Eyebrow><span {...editCopy(content, "home_why_kicker", "Why buy from us")} /></Eyebrow>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl" {...editCopy(content, "home_why_heading", "A dealership you can trust")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: INK_MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: NAVY }} {...editCopy(content, "home_why_link", "More about us →")} />
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: "#FFFFFF", borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Eyebrow><span {...editCopy(content, "home_gallery_kicker", "From the forecourt")} /></Eyebrow>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl" {...editCopy(content, "home_gallery_heading", "Recently sold & in stock")} />
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
              ))}
            </div>
            <div className="mt-10">{ghostBtn("Full gallery", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* enquiry CTA */}
      <section style={{ background: GOLD }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: NAVY }}>
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.02] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Found your next car?")} />
            <p className="mt-2 text-sm font-semibold uppercase tracking-[0.12em]" style={{ color: NAVY_DEEP }} {...editCopy(content, "cta_sub", "Reserve it, part-exchange yours, drive away today.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-bold uppercase tracking-[0.16em] text-white transition hover:brightness-110" style={{ background: NAVY }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
