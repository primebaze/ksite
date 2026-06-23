import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { HeartwoodHeader } from "./HeartwoodHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Heartwood — a master carpenter & joiner's site: bespoke fitted furniture,
// staircases, doors, kitchens and fine timber craft. Warm, artisanal and
// tactile. Walnut + warm oak on a sawdust-cream ground with a sage accent, a
// woodgrain / dovetail line motif, and an editorial "what we make" + "craft &
// process" register. MULTI-PAGE: nav opens real routes (Services / About /
// Work / Contact) under basePath; the header + footer are shared. Tenant swaps
// in their own photography, copy, services and accreditations.

const WALNUT = "#5A3E2B"; // rich walnut brown
const OAK = "#B98A52"; // warm oak
const CREAM = "#EFE6D6"; // sawdust cream page ground
const PAPER = "#F6EFE2"; // lighter cream panel
const INK = "#221A12"; // deep timber ink (text)
const SAGE = "#7E8A6A"; // sage-green accent
const MUTE = "#6E5D49"; // muted warm body text
const display = { fontFamily: "var(--font-space)" } as const;

// A fine woodgrain / contour rule — the recurring line motif.
function Grain({ color = OAK, className = "" }: { color?: string; className?: string }) {
  return (
    <svg viewBox="0 0 240 12" preserveAspectRatio="none" className={`h-3 w-40 ${className}`} aria-hidden>
      <path d="M0 6c20-5 40-5 60 0s40 5 60 0 40-5 60 0 40 5 60 0" fill="none" stroke={color} strokeWidth="1.2" />
      <path d="M0 9c20-4 40-4 60 0s40 4 60 0 40-4 60 0 40 4 60 0" fill="none" stroke={color} strokeWidth="0.8" opacity="0.5" />
    </svg>
  );
}

function Kicker({ children, color = WALNUT }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color }}>
      <span className="inline-block h-px w-7" style={{ background: color }} />
      {children}
    </span>
  );
}

export default function HeartwoodDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const btnSolid = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-105 ${full ? "block w-full" : "inline-block"}`} style={{ background: WALNUT, color: CREAM }}>
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[#5A3E2B] hover:text-[#EFE6D6] ${full ? "block w-full" : "inline-block"}`} style={{ borderColor: WALNUT, color: WALNUT }}>
      {label}
    </a>
  );

  const trust = [
    "Bespoke, made to measure",
    "Fully insured",
    "Free no-obligation quotes",
    "Portfolio on request",
  ];

  const footer = (
    <footer style={{ background: INK, color: CREAM }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <svg width="26" height="20" viewBox="0 0 26 20" aria-hidden>
              <path d="M1 1h7l2 4h6l2-4h7v18h-7l-2-4h-6l-2 4H1z" fill="none" stroke={OAK} strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-semibold tracking-[0.1em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: `${CREAM}aa` }}>{content.tagline}</p>}
          <Grain color={OAK} className="mt-6 opacity-70" />
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.16em]" style={{ borderColor: `${CREAM}33`, color: `${CREAM}cc` }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#B98A52] hover:text-[#221A12]" style={{ border: `1px solid ${CREAM}33`, color: `${CREAM}cc` }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "footer_workshop", "Workshop")} />
          <ul className="mt-5 space-y-3 text-sm" style={{ color: `${CREAM}aa` }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[#EFE6D6]">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm" style={{ color: `${CREAM}aa` }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#EFE6D6]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#EFE6D6]">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-semibold uppercase tracking-[0.24em]" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: `${CREAM}aa` }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${CREAM}66` }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: `${CREAM}aa` }}>By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: `${CREAM}1a`, color: `${CREAM}66` }}>
        <p>© {new Date().getFullYear()} {name}. Handmade with care.</p>
        {phone && <a href={`tel:${phone}`} className="font-medium uppercase tracking-[0.18em] transition hover:text-[#EFE6D6]">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: INK }} className="min-h-screen font-body">
      <HeartwoodHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: WALNUT, color: CREAM }} className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker color={OAK}><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-5 text-4xl font-semibold leading-[1.02] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
      </div>
      <Grain color={`${CREAM}55`} className="absolute bottom-5 right-8 w-56 opacity-60" />
    </section>
  );

  // ---- SERVICES (clean divider rows: name+desc left, price right) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we make", "svc_kicker", "Our craft", "svc_title")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: `${WALNUT}22` }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={display} className="text-xl font-semibold tracking-tight sm:text-2xl" >{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} style={{ ...display, color: WALNUT }} className="shrink-0 text-lg font-semibold">{s.price}</p>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The maker", "about_kicker", "Made by hand", "about_title")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-semibold uppercase tracking-[0.26em]" {...editCopy(content, "about_accred_heading", "Accredited & insured")} />
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ borderColor: `${WALNUT}55`, color: WALNUT }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-semibold uppercase tracking-[0.26em]" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnSolid(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Start a project", "contact_kicker", "Request a quote", "contact_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-semibold tracking-tight" {...editCopy(content, "contact_heading", "Talk to the workshop")} />
            <Grain color={OAK} className="mt-4" />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#5A3E2B]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#5A3E2B]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${WALNUT}22`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${MUTE}99` }}>{h.open}</span></li>
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
                bookingBlurb="Tell us about the piece or project and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: PAPER, cardBorder: `${WALNUT}22`, heading: INK, blurb: MUTE, label: WALNUT, fieldBg: CREAM, fieldBorder: `${WALNUT}33`, fieldText: INK, button: WALNUT, buttonText: CREAM, radius: "14px", font: "var(--font-space)" }}
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
        {banner("Portfolio", "gallery_kicker", "Recent work", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-lg object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const process = [
    { n: "01", t: "Design", d: "We measure, sketch and agree every detail with you before a single board is cut." },
    { n: "02", t: "Handcraft", d: "Each piece is built by hand in the workshop from carefully selected timber." },
    { n: "03", t: "Install", d: "We fit it on site with a clean finish — and leave the place as we found it." },
  ];

  return shell(
    <>
      {/* hero — warm, crafted, tactile timber */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg,${WALNUT},${INK})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(95deg, rgba(34,26,18,0.92) 0%, rgba(34,26,18,0.66) 48%, rgba(34,26,18,0.18) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 py-28" style={{ color: CREAM }}>
          <Kicker color={OAK}>{content.service_areas?.[0] ? `Bespoke joinery in ${content.service_areas[0]}` : "Bespoke carpentry & joinery"}</Kicker>
          <h1 style={display} className="mt-6 max-w-3xl text-5xl font-semibold leading-[1.0] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Made by hand, built to last."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-6 text-sm font-medium uppercase tracking-[0.28em]" style={{ color: `${CREAM}b3` }}>{name}</p>
          <Grain color={`${OAK}cc`} className="mt-7 w-52" />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnSolid(ctaLabel, cta)}
            {phone && (
              <a href={`tel:${phone}`} className="inline-block rounded-full border px-8 py-3.5 text-center text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-white/10" style={{ borderColor: `${CREAM}66`, color: CREAM }}>Call {phone}</a>
            )}
          </div>
          <div className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: `${CREAM}99` }}>
            {trust.map((t) => <span key={t}>— {t}</span>)}
          </div>
        </div>
      </section>

      {/* intro / about */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "The workshop")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl" {...editCopy(content, "home_about_heading", "Fine timber, finished by hand")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.18em]" style={{ color: WALNUT }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-2xl" style={{ background: `linear-gradient(135deg,${OAK},${WALNUT})` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl" style={{ borderBottom: `3px solid ${SAGE}`, borderRight: `3px solid ${SAGE}` }} />
          </div>
        </section>
      )}

      {/* what we make — clean divider rows */}
      {services.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${WALNUT}1a`, borderBottom: `1px solid ${WALNUT}1a` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <Kicker><span {...editCopy(content, "home_make_kicker", "What we make")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl" {...editCopy(content, "home_make_heading", "From a single shelf to a whole home")} />
            <ul className="mt-12 divide-y" style={{ borderColor: `${WALNUT}22` }}>
              {services.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-xl font-semibold tracking-tight sm:text-2xl">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} style={{ ...display, color: WALNUT }} className="shrink-0 text-lg font-semibold">{s.price}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-12">{btnOutline("See all we make", href("services"))}</div>
          </div>
        </section>
      )}

      {/* craft & process band */}
      <section style={{ background: WALNUT, color: CREAM }}>
        <div className="mx-auto max-w-6xl px-8 py-24">
          <Kicker color={OAK}><span {...editCopy(content, "home_process_kicker", "Craft & process")} /></Kicker>
          <h2 style={display} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl" {...editCopy(content, "home_process_heading", "Design → handcraft → install")} />
          <div className="mt-12 grid gap-px sm:grid-cols-3" style={{ background: `${CREAM}1f` }}>
            {process.map((p) => (
              <div key={p.n} className="p-8" style={{ background: WALNUT }}>
                <span style={display} className="text-3xl font-semibold" >{p.n}</span>
                <h3 style={display} className="mt-3 text-xl font-semibold tracking-tight" >{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: `${CREAM}b3` }}>{p.d}</p>
                <Grain color={`${OAK}aa`} className="mt-5 w-28" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* work / portfolio */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-8 py-24">
          <Kicker><span {...editCopy(content, "home_portfolio_kicker", "Portfolio")} /></Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl" {...editCopy(content, "home_portfolio_heading", "Recent work")} />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-lg object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnOutline("View the portfolio", href("gallery"))}</div>
        </section>
      )}

      {/* accreditations + areas */}
      {((content.accreditations && content.accreditations.length > 0) || (content.service_areas && content.service_areas.length > 0)) && (
        <section style={{ background: PAPER, borderTop: `1px solid ${WALNUT}1a` }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2">
            {content.accreditations && content.accreditations.length > 0 && (
              <div>
                <Kicker color={SAGE}><span {...editCopy(content, "home_accred_kicker", "Accredited & insured")} /></Kicker>
                <div className="mt-5 flex flex-wrap gap-3">
                  {content.accreditations.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em]" style={{ borderColor: `${WALNUT}55`, color: WALNUT }}>{a}</span>
                  ))}
                </div>
              </div>
            )}
            {content.service_areas && content.service_areas.length > 0 && (
              <div>
                <Kicker color={SAGE}><span {...editCopy(content, "home_areas_kicker", "Areas we cover")} /></Kicker>
                <p className="mt-5 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK, color: CREAM }}>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-semibold leading-[1.05] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Got a project in mind? Let's make it.")} />
            <p className="mt-2 text-sm font-medium uppercase tracking-[0.14em]" style={{ color: `${CREAM}99` }} {...editCopy(content, "cta_sub", "Free, no-obligation quotes.")} />
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:brightness-105" style={{ background: OAK, color: INK }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
