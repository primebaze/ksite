import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LedgerHeader } from "./LedgerHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Ledger — clean, trustworthy professional-services design. Light and corporate
// with a deep-navy / professional-blue palette, a refined serif for headings and
// a credentials-led structure. Built for accountants, consultants, legal, and
// agencies. MULTI-PAGE: nav opens real routes (Services / About / Insights /
// Contact) under basePath; the sticky white header + navy footer are shared.

const NAVY = "#0f2a43"; // deep navy headings / footer
const BLUE = "#1f6feb"; // professional accent
const INK = "#1c2b38"; // body heading ink
const SLATE = "#4b6072"; // muted body text
const MIST = "#f4f7fb"; // tinted panels
const LINE = "#e2e9f1"; // hairlines
const serif = { fontFamily: "var(--font-fraunces)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: BLUE }}>
      <span className="h-px w-6" style={{ background: BLUE }} />
      {children}
    </p>
  );
}

export default function LedgerDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book a consultation";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Insights", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: NAVY }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-md text-sm font-bold" style={{ background: BLUE }}>{name.trim().charAt(0)}</span>
            <span data-edit="tenant.business_name" style={serif} className="text-xl font-semibold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:bg-white/10 hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Firm</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">Office hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.accreditations && content.accreditations.length > 0 && (
          <p className="text-white/55">{content.accreditations.join(" · ")}</p>
        )}
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body" >
      <LedgerHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: MIST, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...serif, color: NAVY }} className="mt-4 max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">{title}</h1>
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: SLATE }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Services built around your goals", "Practical, partner-led advice — clearly scoped and fairly priced.")}
        <section className="mx-auto max-w-6xl px-6 py-20">
          {services.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.id} className="flex flex-col rounded-xl border bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-26px_rgba(15,42,67,0.4)]" style={{ borderColor: LINE }}>
                  <span className="grid h-10 w-10 place-items-center rounded-lg text-sm font-bold text-white" style={{ background: NAVY }}>{s.name.trim().charAt(0)}</span>
                  <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="mt-4 text-xl font-semibold">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  {s.price && <p data-edit={`item:${s.id}:price`} className="mt-5 text-sm font-semibold" style={{ color: BLUE }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-md px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: BLUE }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About the firm", "Trusted advisers, on your side")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl font-semibold">Who we work with</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: SLATE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-2xl p-7" style={{ background: MIST, border: `1px solid ${LINE}` }}>
            {content.accreditations && content.accreditations.length > 0 && (
              <>
                <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: BLUE }}>Credentials</h4>
                <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
                  {content.accreditations.map((a) => (
                    <li key={a} className="flex items-start gap-2"><span style={{ color: BLUE }}>✓</span><span>{a}</span></li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium transition hover:text-[#1f6feb]" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block transition hover:text-[#1f6feb]">{content.email}</a>}
            </div>
            <a href={cta} className="mt-6 inline-flex w-full justify-center rounded-md px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: BLUE }}>{ctaLabel}</a>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Book a consultation", "Tell us what you need and we'll arrange a no-obligation conversation.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl font-semibold">Our office</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#1f6feb]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#1f6feb]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-md border px-6 py-3 text-sm font-semibold transition hover:bg-neutral-50" style={{ borderColor: LINE, color: NAVY }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Outline your requirements and we'll prepare a tailored proposal."
                bookingCta="Request proposal"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: NAVY, blurb: SLATE, label: "#33536e", fieldBg: "#ffffff", fieldBorder: "#cdd9e6", fieldText: INK, button: BLUE, buttonText: "#ffffff", radius: "0.75rem", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- INSIGHTS / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Inside the firm", "Our work & insights")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-lg object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20" style={{ color: SLATE }}>Coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — split: copy left, image right */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-16 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div>
          <Kicker>{content.accreditations?.[0] ? content.accreditations[0] : "Trusted advisers"}</Kicker>
          <h1 style={{ ...serif, color: NAVY }} className="mt-5 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Clarity, confidence and considered advice."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-4 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: SLATE }}>{name}</p>
          {content.about && <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: SLATE }}>{content.about.slice(0, 160)}{content.about.length > 160 ? "…" : ""}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta} className="inline-flex rounded-md px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: BLUE }}>{ctaLabel}</a>
            {content.phone && <a href={`tel:${content.phone}`} className="inline-flex rounded-md border px-7 py-3.5 text-sm font-semibold transition hover:bg-neutral-50" style={{ borderColor: LINE, color: NAVY }}>Call {content.phone}</a>}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: SLATE }}>
              {content.accreditations.map((a) => <span key={a} className="flex items-center gap-2"><span style={{ color: BLUE }}>✓</span>{a}</span>)}
            </div>
          )}
        </div>
        <div className="relative">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-2xl object-cover shadow-[0_30px_80px_-40px_rgba(15,42,67,0.6)]" />
          ) : (
            <div className="aspect-[4/5] w-full rounded-2xl" style={{ background: `linear-gradient(160deg,#173a5c,${NAVY})` }} />
          )}
        </div>
      </section>

      {/* trust strip */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-center text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
          {(content.accreditations && content.accreditations.length > 0
            ? content.accreditations
            : ["Regulated", "Insured", "Fixed fees", "Local & responsive"]
          ).map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </section>

      {/* services */}
      {services.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>What we do</Kicker>
              <h2 style={{ ...serif, color: NAVY }} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">Our services</h2>
            </div>
            <a href={href("services")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: BLUE }}>All services →</a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <div key={s.id} className="flex flex-col rounded-xl border bg-white p-7 transition hover:-translate-y-0.5 hover:shadow-[0_22px_50px_-26px_rgba(15,42,67,0.4)]" style={{ borderColor: LINE }}>
                <span className="grid h-10 w-10 place-items-center rounded-lg text-sm font-bold text-white" style={{ background: NAVY }}>{s.name.trim().charAt(0)}</span>
                <h3 data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="mt-4 text-xl font-semibold">{s.name}</h3>
                {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                {s.price && <p data-edit={`item:${s.id}:price`} className="mt-5 text-sm font-semibold" style={{ color: BLUE }}>{s.price}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about band */}
      {content.about && (
        <section style={{ background: MIST, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:pt-2"><Kicker>About us</Kicker></div>
            <div>
              <p data-edit="content.about" style={{ ...serif, color: NAVY }} className="max-w-3xl text-2xl font-medium leading-[1.4] sm:text-[2rem]">{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: BLUE }}>Read more →</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 style={{ ...serif, color: NAVY }} className="text-3xl font-semibold tracking-tight sm:text-4xl">Let&apos;s talk about what&apos;s next</h2>
        <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: SLATE }}>Book a no-obligation consultation and we&apos;ll help you find the clearest way forward.</p>
        <a href={cta} className="mt-8 inline-flex rounded-md px-8 py-4 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: BLUE }}>{ctaLabel}</a>
      </section>
    </>,
  );
}
