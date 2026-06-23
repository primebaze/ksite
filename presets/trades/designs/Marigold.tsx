import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { MarigoldHeader } from "./MarigoldHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Marigold — fresh, friendly cleaning & home-services design. Bright and airy
// with a clean teal/mint palette, soft rounded shapes and a reassuring,
// approachable structure. Built for cleaners, gardeners, window cleaners,
// handymen, pest control and other domestic services. MULTI-PAGE: nav opens
// real routes (Services / About / Gallery / Contact) under basePath; the sticky
// white header + footer are shared.

const TEAL = "#0e9488"; // primary accent
const DEEP = "#0b5e57"; // deep teal
const INK = "#10302c"; // heading ink
const SLATE = "#4e635f"; // muted body text
const MINT = "#eef8f5"; // tinted panels
const LINE = "#d9eae6"; // hairlines
const sans = { fontFamily: "var(--font-inter)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ background: MINT, color: DEEP }}>
      {children}
    </span>
  );
}

export default function MarigoldDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Get a free quote";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-bold text-white" style={{ background: TEAL }}>{name.trim().charAt(0)}</span>
            <span data-edit="tenant.business_name" className="text-xl font-bold tracking-tight">{name}</span>
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
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">7 days a week.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.accreditations && content.accreditations.length > 0 && <p className="text-white/55">{content.accreditations.join(" · ")}</p>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body">
      <MarigoldHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: MINT, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-16 text-center sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...sans, color: INK }} className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: SLATE }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Sparkling results, every time", "Reliable, friendly and fully insured — pick what you need and we'll handle the rest.")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {services.length > 0 ? (
            <ul className="divide-y rounded-3xl border bg-white px-6 sm:px-9" style={{ borderColor: LINE }}>
              {services.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6" style={{ borderColor: LINE }}>
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ color: INK }} className="text-lg font-bold tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: DEEP }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12 text-center">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: TEAL }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "Friendly faces you can trust")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ color: INK }} className="mt-12 text-2xl font-bold tracking-tight">Where we work</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: SLATE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-3xl p-7" style={{ background: MINT, border: `1px solid ${LINE}` }}>
            {content.accreditations && content.accreditations.length > 0 && (
              <>
                <h4 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: DEEP }}>Why choose us</h4>
                <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
                  {content.accreditations.map((a) => (
                    <li key={a} className="flex items-start gap-2"><span style={{ color: TEAL }}>✓</span><span>{a}</span></li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:text-[#0e9488]" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block transition hover:text-[#0e9488]">{content.email}</a>}
            </div>
            <a href={cta} className="mt-6 inline-flex w-full justify-center rounded-full px-6 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ background: TEAL }}>{ctaLabel}</a>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Get a free quote", "Tell us what you need cleaned or sorted and we'll get straight back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ color: INK }} className="text-2xl font-bold tracking-tight">How to reach us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#0e9488]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#0e9488]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-6 py-3 text-sm font-bold transition hover:bg-neutral-50" style={{ borderColor: LINE, color: DEEP }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us a little about the job and we'll send a free, no-obligation quote."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SLATE, label: "#3c5b56", fieldBg: "#ffffff", fieldBorder: "#c4ddd7", fieldText: INK, button: TEAL, buttonText: "#ffffff", radius: "1rem", font: "var(--font-inter)" }}
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
        {banner("Our work", "Before & after")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
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
      {/* hero — soft rounded split */}
      <section style={{ background: MINT }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <Kicker>{content.service_areas?.[0] ? `Serving ${content.service_areas[0]}` : "Home services"}</Kicker>
            <h1 style={{ ...sans, color: INK }} className="mt-5 text-4xl font-extrabold leading-[1.04] tracking-tight sm:text-6xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "A cleaner home, a happier you."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-4 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: DEEP }}>{name}</p>
            {content.about && <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: SLATE }}>{content.about.slice(0, 150)}{content.about.length > 150 ? "…" : ""}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="inline-flex rounded-full px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: TEAL }}>{ctaLabel}</a>
              {content.phone && <a href={`tel:${content.phone}`} className="inline-flex rounded-full border px-7 py-3.5 text-sm font-bold transition hover:bg-white" style={{ borderColor: LINE, color: DEEP }}>Call {content.phone}</a>}
            </div>
            {content.accreditations && content.accreditations.length > 0 && (
              <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: SLATE }}>
                {content.accreditations.map((a) => <span key={a} className="flex items-center gap-1.5"><span style={{ color: TEAL }}>✓</span>{a}</span>)}
              </div>
            )}
          </div>
          <div className="relative">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-[0_30px_70px_-36px_rgba(11,94,87,0.55)]" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2rem]" style={{ background: `linear-gradient(160deg,#1bb5a6,${DEEP})` }} />
            )}
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section style={{ background: TEAL }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-6 py-6 text-center text-xs font-bold uppercase tracking-[0.16em] text-white/85">
          {(content.accreditations && content.accreditations.length > 0
            ? content.accreditations
            : ["Fully insured", "Eco-friendly", "Satisfaction guaranteed", "Trusted & local"]
          ).map((a) => (
            <span key={a}>{a}</span>
          ))}
        </div>
      </section>

      {/* services */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-24">
          <div className="text-center">
            <Kicker>What we do</Kicker>
            <h2 style={{ color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Our services</h2>
          </div>
          <ul className="mt-12 divide-y rounded-3xl border bg-white px-6 sm:px-9" style={{ borderColor: LINE }}>
            {services.slice(0, 6).map((s) => (
              <li key={s.id} className="flex items-baseline justify-between gap-8 py-6" style={{ borderColor: LINE }}>
                <div className="min-w-0">
                  <p data-edit={`item:${s.id}:name`} style={{ color: INK }} className="text-lg font-bold tracking-tight">{s.name}</p>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                </div>
                {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-bold" style={{ color: DEEP }}>{s.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <a href={href("services")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: TEAL }}>View all services →</a>
          </div>
        </section>
      )}

      {/* about band */}
      {content.about && (
        <section style={{ background: MINT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <Kicker>About us</Kicker>
            <p data-edit="content.about" style={{ color: INK }} className="mt-6 text-2xl font-semibold leading-[1.45] sm:text-[2rem]">{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-sm font-bold" style={{ color: TEAL }}>Read more →</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <h2 style={{ color: INK }} className="text-3xl font-extrabold tracking-tight sm:text-4xl">Ready for a fresh start?</h2>
        <p className="mx-auto mt-4 max-w-lg text-[16px] leading-relaxed" style={{ color: SLATE }}>Get a free, no-obligation quote today — friendly, reliable and always on time.</p>
        <a href={cta} className="mt-8 inline-flex rounded-full px-8 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: TEAL }}>{ctaLabel}</a>
      </section>
    </>,
  );
}
