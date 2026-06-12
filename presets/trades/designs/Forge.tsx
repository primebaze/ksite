import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ForgeHeader } from "./ForgeHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Forge — bold industrial contractor / trade design. Near-black with a single
// hot-amber accent, hard-edged skewed buttons, heavy condensed display type.
// Built for plumbers, electricians, builders, roofers — anyone who sells trust
// and a fast quote. MULTI-PAGE: nav opens real routes (Services / About /
// Work / Contact) under basePath; the sticky header + dark footer are shared.
// Tenant swaps in their own photography, copy, services and accreditations.

const DARK = "#0d0f12"; // near-black page
const PANEL = "#15181d"; // lifted panel
const STEEL = "#1d2127"; // card surface
const AMBER = "#f5a524"; // hot accent
const TEXT = "#e9eaec"; // primary light text
const MUTE = "#9aa0aa"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.22em]" style={{ color: AMBER }}>
      <span className="inline-block h-3 w-1 skew-x-[-12deg]" style={{ background: AMBER }} />
      {children}
    </span>
  );
}

export default function ForgeDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    <a href={to} className={`group skew-x-[-10deg] px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] text-black transition hover:brightness-110 ${full ? "w-full" : "inline-flex"}`} style={{ background: AMBER }}>
      <span className="inline-block skew-x-[10deg]">{label}</span>
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`skew-x-[-10deg] border-2 px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.16em] transition hover:bg-white/5 ${full ? "w-full" : "inline-flex"}`} style={{ borderColor: "#ffffff33", color: TEXT }}>
      <span className="inline-block skew-x-[10deg]">{label}</span>
    </a>
  );

  const footer = (
    <footer style={{ background: "#08090b", borderTop: `2px solid ${AMBER}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2">
            <span className="inline-block h-6 w-2 skew-x-[-12deg]" style={{ background: AMBER }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.06em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff1f", color: MUTE }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:text-black hover:bg-[#f5a524]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]" >Company</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Sat, on call.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: DARK }} className="min-h-screen font-body" >
      <ForgeHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `2px solid ${AMBER}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Tag>{kicker}</Tag>
        <h1 style={display} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-6xl" >{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", "Our Services")}
        <section className="mx-auto max-w-7xl px-8 py-20">
          {services.length > 0 ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s, i) => (
                <div key={s.id} className="group relative flex flex-col p-7 transition hover:-translate-y-1" style={{ background: STEEL, borderLeft: `3px solid ${AMBER}` }}>
                  <span className="text-[11px] font-extrabold tracking-[0.2em]" style={{ color: AMBER }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 data-edit={`item:${s.id}:name`} style={display} className="mt-2 text-xl font-extrabold uppercase tracking-tight" >{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  {s.price && <p data-edit={`item:${s.id}:price`} className="mt-5 text-sm font-extrabold" style={{ color: TEXT }}>{s.price}</p>}
                </div>
              ))}
            </div>
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
        {banner("Who we are", "Built On Trust")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" >Accredited &amp; insured</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="border-2 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: `${AMBER}66`, color: TEXT }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]" >Areas we cover</h3>
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
        {banner("Get in touch", "Request A Quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={display} className="text-2xl font-extrabold uppercase tracking-tight" >Speak to the team</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
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
                bookingBlurb="Tell us about the job and we'll come back with a price."
                bookingCta="Send request"
                theme={{ card: STEEL, cardBorder: "#ffffff1a", heading: TEXT, blurb: MUTE, label: "#c2c6cd", fieldBg: PANEL, fieldBorder: "#ffffff22", fieldText: TEXT, button: AMBER, buttonText: "#0d0f12", radius: "0", font: "var(--font-space)" }}
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
        {banner("Recent jobs", "Our Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    content.accreditations && content.accreditations.length > 0 && { k: content.accreditations.length.toString().padStart(2, "0"), v: "Accreditations" },
    services.length > 0 && { k: `${services.length}+`, v: "Services" },
    content.service_areas && content.service_areas.length > 0 && { k: `${content.service_areas.length}`, v: "Areas covered" },
  ].filter(Boolean) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg,#15181d,#0d0f12)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(8,9,11,0.92) 0%, rgba(8,9,11,0.7) 45%, rgba(8,9,11,0.25) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Tag>{content.service_areas?.[0] ? `Trusted across ${content.service_areas[0]}` : "Trusted local trade"}</Tag>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold uppercase leading-[0.92] tracking-tight [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Reliable work, done right first time."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.25em] text-white/70">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnPrimary(ctaLabel, cta)}
            {phone && btnGhost(`Call ${phone}`, `tel:${phone}`)}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/60">
              {content.accreditations.map((a) => <span key={a}>✓ {a}</span>)}
            </div>
          )}
        </div>
      </section>

      {/* stat strip */}
      {stats.length > 0 && (
        <section style={{ background: AMBER }}>
          <div className="mx-auto grid max-w-7xl gap-px px-8 py-8 text-black sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.v} className="flex items-baseline gap-3">
                <span style={display} className="text-4xl font-extrabold">{s.k}</span>
                <span className="text-xs font-extrabold uppercase tracking-[0.18em]">{s.v}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Tag>Who we are</Tag>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-5xl">Built on trust, finished to last</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: AMBER }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: STEEL }} />
            )}
            <span className="pointer-events-none absolute -bottom-2 -left-2 h-16 w-16" style={{ borderBottom: `4px solid ${AMBER}`, borderLeft: `4px solid ${AMBER}` }} />
          </div>
        </section>
      )}

      {/* services */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff14", borderBottom: "1px solid #ffffff14" }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <Tag>What we do</Tag>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our services</h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.slice(0, 6).map((s, i) => (
                <div key={s.id} className="group flex flex-col p-7 transition hover:-translate-y-1" style={{ background: STEEL, borderLeft: `3px solid ${AMBER}` }}>
                  <span className="text-[11px] font-extrabold tracking-[0.2em]" style={{ color: AMBER }}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: TEXT }} className="mt-2 text-xl font-extrabold uppercase tracking-tight">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  {s.price && <p data-edit={`item:${s.id}:price`} className="mt-5 text-sm font-extrabold" style={{ color: TEXT }}>{s.price}</p>}
                </div>
              ))}
            </div>
            <div className="mt-12">{btnGhost("View all services", href("services"))}</div>
          </div>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Tag>Recent jobs</Tag>
          <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-tight sm:text-5xl">Our work</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
            ))}
          </div>
          <div className="mt-10">{btnGhost("See more work", href("gallery"))}</div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: AMBER }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-black sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold uppercase leading-[0.95] tracking-tight sm:text-4xl">Need it sorted? Let&apos;s talk.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-black/70">Free, no-obligation quotes.</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="skew-x-[-10deg] bg-black px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-125">
            <span className="inline-block skew-x-[10deg]">{phone ? `Call ${phone}` : ctaLabel}</span>
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
