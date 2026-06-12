import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MendwellHeader } from "./MendwellHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Mendwell — friendly, reliable, do-it-all handyman & property-maintenance
// service. "No job too small, sorted properly." A warm, approachable register:
// friendly royal blue with a warm amber-yellow accent on clean white, rounded
// toolbox-y shapes and a checklist/tool motif. Built for handymen, odd-job and
// property-maintenance services — flat-pack, shelving, repairs, painting,
// gutters, the lot. Structural signature: a white/blue can-do hero with a
// little toolbox + checklist, a "what we can do" services list (clean divider
// rows), a simple how-it-works 3-step (call → quick quote → done), a "jobs
// we've done" gallery, a transparent-pricing trust strip and an areas-covered
// band. MULTI-PAGE: nav opens real routes (Services / About / Work / Contact)
// under basePath; the sticky header + footer are shared. Tenant swaps in their
// own photography, copy, services and accreditations.

const BLUE = "#2E5BBA"; // friendly royal blue
const BLUE_DK = "#244A99"; // deeper hover blue
const AMBER = "#F2B03D"; // warm amber-yellow accent
const PAPER = "#FAFAF8"; // clean white
const SLATE = "#5D6B7A"; // soft slate body
const INK = "#1B2533"; // deep navy ink
const LINE = "#E7EBF1"; // hairline
const TINT = "#F1F5FB"; // soft blue tint panel
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]"
      style={light ? { background: "#ffffff22", color: "#ffffff" } : { background: TINT, color: BLUE }}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />
      {children}
    </span>
  );
}

function Check({ color = AMBER }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="shrink-0">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function MendwellDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // Trust points — the heart of the handyman pitch.
  const trust = [
    "No job too small",
    "Fully insured",
    "Fixed & hourly rates",
    "Same-week visits",
    "Tidy, reliable, on time",
  ];

  const btnPrimary = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-7 py-3.5 text-center text-[14px] font-bold transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: AMBER, color: INK }}
    >
      {label}
    </a>
  );
  const btnSolid = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-7 py-3.5 text-center text-[14px] font-bold text-white transition hover:bg-[#244A99] ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: BLUE }}
    >
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full border-2 px-7 py-3.5 text-center text-[14px] font-bold transition hover:bg-[#F1F5FB] ${full ? "block w-full" : "inline-flex"}`}
      style={{ borderColor: LINE, color: INK }}
    >
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: AMBER, color: INK }} aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9h18v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                <path d="M8 9V7a4 4 0 0 1 8 0v2" />
              </svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold tracking-[-0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70" style={{ border: "1px solid #ffffff24" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:bg-[#F2B03D] hover:text-[#1B2533]" style={{ border: "1px solid #ffffff24" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-bold uppercase tracking-[0.18em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">Mon–Sat, give us a call.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body" >
      <MendwellHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: BLUE }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-4 text-4xl font-bold tracking-[-0.02em] sm:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/75">{sub}</p>}
      </div>
    </section>
  );

  // Reusable clean divider-row services list (NO cards, NO dotted leaders).
  const servicesList = (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {services.map((s) => (
        <li key={s.id} className="flex items-start justify-between gap-6 py-5">
          <div className="flex min-w-0 gap-3">
            <span className="mt-1"><Check /></span>
            <div className="min-w-0">
              <h3 data-edit={`item:${s.id}:name`} style={display} className="text-[17px] font-bold tracking-[-0.01em]" >{s.name}</h3>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-[15px] font-bold" style={{ color: BLUE }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we can do", "Services", "From flat-pack and shelving to repairs, painting and gutters — if it needs doing around the home, we'll sort it.")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {services.length > 0 ? servicesList : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">{btnPrimary(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "A reliable pair of hands", "Friendly, tidy and properly insured — the kind of help you'd recommend to a neighbour.")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t} className="flex items-center gap-2.5 rounded-2xl px-4 py-3" style={{ background: TINT, color: INK }}>
                <Check color={BLUE} /><span className="text-sm font-semibold">{t}</span>
              </div>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.18em]">Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: LINE, color: SLATE }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: INK }} className="mt-12 text-xs font-bold uppercase tracking-[0.18em]">Areas we cover</h3>
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
        {banner("Get in touch", "Request a quote", "Tell us about the job and we'll come back quickly with a fair, fixed price.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-[-0.01em]">Have a chat with us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2E5BBA]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2E5BBA]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: INK }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 grid gap-2.5">
              {trust.slice(0, 4).map((t) => (
                <div key={t} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: INK }}>
                  <Check color={BLUE} />{t}
                </div>
              ))}
            </div>
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
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SLATE, label: INK, fieldBg: PAPER, fieldBorder: LINE, fieldText: INK, button: BLUE, buttonText: "#ffffff", radius: "16px", font: "var(--font-space)" }}
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
        {banner("Jobs we've done", "Our work", "A few recent jobs — small fixes and bigger projects, all sorted properly.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const steps = [
    { n: "1", t: "Give us a call", d: "Tell us what needs doing — a quick message or photo is plenty." },
    { n: "2", t: "Get a quick quote", d: "We'll come back fast with a fair, fixed or hourly price." },
    { n: "3", t: "Job done", d: "We turn up on time, do it properly and leave it tidy." },
  ];

  return shell(
    <>
      {/* hero — friendly white/blue, can-do split */}
      <section className="relative isolate overflow-hidden" style={{ background: BLUE }}>
        <div className="pointer-events-none absolute inset-0 opacity-20" style={{ background: "radial-gradient(900px 500px at 85% -10%, #ffffff55, transparent 60%)" }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-8 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          <div className="text-white">
            <Kicker light>{content.service_areas?.[0] ? `Your local handyman in ${content.service_areas[0]}` : "Your friendly local handyman"}</Kicker>
            <h1 style={display} className="mt-5 max-w-xl text-5xl font-bold leading-[1.02] tracking-[-0.03em] sm:text-6xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "No job too small, sorted properly."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-white/70">{name}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnPrimary(ctaLabel, cta)}
              {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
            </div>
            <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-[13px] font-semibold text-white/85">
              {trust.slice(0, 3).map((t) => (
                <span key={t} className="inline-flex items-center gap-2"><Check />{t}</span>
              ))}
            </div>
          </div>

          {/* toolbox / checklist card */}
          <div className="relative">
            {hero ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl" />
              </>
            ) : (
              <div className="aspect-[4/5] w-full rounded-3xl" style={{ background: "linear-gradient(160deg,#3a67c4,#244a99)" }} />
            )}
            <div className="absolute -bottom-5 -left-3 w-[78%] max-w-xs rounded-2xl bg-white p-5 shadow-xl sm:-left-5">
              <p style={{ ...display, color: INK }} className="text-sm font-bold uppercase tracking-[0.12em]">Things we'll sort</p>
              <ul className="mt-3 space-y-2">
                {["Flat-pack & shelving", "Repairs & touch-ups", "Gutters & odd jobs"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5 text-sm font-semibold" style={{ color: SLATE }}>
                    <Check color={BLUE} />{t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-8 py-5 text-[13px] font-bold">
          {trust.map((t) => (
            <span key={t} className="inline-flex items-center gap-2"><Check />{t}</span>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>About us</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl">A reliable pair of hands around the home</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[14px] font-bold" style={{ color: BLUE }}>More about us →</a>
          </div>
          <div className="rounded-3xl p-8" style={{ background: TINT }}>
            <p style={{ ...display, color: INK }} className="text-sm font-bold uppercase tracking-[0.14em]">Why folks call us back</p>
            <div className="mt-5 grid gap-3">
              {trust.map((t) => (
                <div key={t} className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm font-semibold" style={{ color: INK }}>
                  <Check color={BLUE} />{t}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* services — clean divider-row list */}
      {services.length > 0 && (
        <section style={{ background: TINT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <Kicker>What we can do</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Things we'll happily sort</h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SLATE }}>If it&apos;s on your to-do list, it&apos;s on ours. No job too small.</p>
            <div className="mt-10 rounded-3xl bg-white p-6 sm:p-8">{servicesList}</div>
            <div className="mt-10">{btnSolid("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* how it works — simple 3-step */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <Kicker>How it works</Kicker>
        <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Three easy steps</h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.n} className="relative rounded-3xl border p-7" style={{ borderColor: LINE, background: "#ffffff" }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full text-lg font-bold" style={{ background: i === 2 ? AMBER : BLUE, color: i === 2 ? INK : "#ffffff", ...display }}>{s.n}</span>
              <h3 style={{ ...display, color: INK }} className="mt-5 text-xl font-bold tracking-[-0.01em]">{s.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: TINT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <Kicker>Jobs we&apos;ve done</Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Our work</h2>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* transparent pricing band */}
      <section className="mx-auto max-w-6xl px-8 py-20">
        <div className="grid items-center gap-8 rounded-3xl px-8 py-10 sm:grid-cols-[1.3fr_1fr]" style={{ background: INK }}>
          <div className="text-white">
            <Kicker light>Honest pricing</Kicker>
            <h2 style={display} className="mt-4 text-3xl font-bold tracking-[-0.02em] sm:text-4xl">Fair, upfront prices — no surprises</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">Fixed prices for clear jobs, hourly rates for the rest. You&apos;ll always know the cost before we start.</p>
          </div>
          <div className="grid gap-3">
            {["Free, no-obligation quotes", "Fixed or hourly — you choose", "No call-out fee for quotes"].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-white" style={{ background: "#ffffff14" }}>
                <Check />{t}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section style={{ background: TINT, borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-6xl px-8 py-16 text-center">
            <Kicker>Areas we cover</Kicker>
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full bg-white px-4 py-2 text-sm font-semibold" style={{ color: INK, border: `1px solid ${LINE}` }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: AMBER }}>
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: INK }}>
          <div>
            <h2 style={display} className="text-3xl font-bold leading-[1.05] tracking-[-0.02em] sm:text-4xl">Got a job that needs doing?</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.1em]" style={{ color: "#1B253399" }}>No job too small — let&apos;s get it sorted.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-8 py-4 text-[14px] font-bold text-white transition hover:bg-[#244A99]" style={{ background: BLUE }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
