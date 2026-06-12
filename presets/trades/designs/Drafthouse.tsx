import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DrafthouseHeader } from "./DrafthouseHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Drafthouse — premium architecture & design-studio design. A quiet, editorial
// paper-and-ink palette with a refined serif, generous whitespace and numbered,
// magazine-style structure. Built for architects, interior designers, kitchen &
// bathroom studios, joinery and high-end renovation. MULTI-PAGE: nav opens real
// routes (Services / About / Gallery / Contact) under basePath; the sticky
// paper header + ink footer are shared.

const PAPER = "#f3efe7"; // page
const PANEL = "#ebe5da"; // tinted panel
const INK = "#1a1a17"; // heading ink / dark sections
const STONE = "#5c574b"; // muted body
const LINE = "#d8d1c4"; // hairlines
const serif = { fontFamily: "var(--font-fraunces)" } as const;

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: STONE }}>{children}</p>
  );
}

export default function DrafthouseDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Start a project";
  const cta = content.cta_url ?? href("contact");

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "Studio", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-[#e9e4d9]">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl tracking-[0.04em] text-[#f3efe7]">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.42em] text-white/40">Architecture &amp; Design Studio</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/65 transition hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Studio</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/40">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/35">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff55" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {content.accreditations && content.accreditations.length > 0 && <p className="text-white/45">{content.accreditations.join(" · ")}</p>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body" >
      <DrafthouseHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-5 max-w-3xl text-4xl leading-[1.08] tracking-tight sm:text-6xl">{title}</h1>
        {blurb && <p className="mt-6 max-w-xl text-[16px] leading-relaxed" style={{ color: STONE }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Capabilities", "What we offer", "From first sketch to final detail — considered design, carefully delivered.")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="flex min-w-0 gap-6">
                    <span style={{ ...serif, color: "#b3aa97" }} className="text-lg">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="text-xl">{s.name}</p>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: STONE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: INK }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: STONE }}>Services coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex border px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#1a1a17] hover:text-[#f3efe7]" style={{ borderColor: INK, color: INK }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT / STUDIO ----
  if (page === "about") {
    return shell(
      <>
        {banner("The studio", "A practice built on detail")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: STONE }}>{content.about}</p> : <p style={{ color: STONE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...serif, color: INK }} className="mt-12 text-2xl">Where we work</h3>
                <p className="mt-4 text-[15px] leading-relaxed" style={{ color: STONE }}>{content.service_areas.join(" · ")}</p>
              </>
            )}
          </div>
          <aside className="h-fit p-7" style={{ background: PANEL, border: `1px solid ${LINE}` }}>
            {content.accreditations && content.accreditations.length > 0 && (
              <>
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: STONE }}>Credentials</h4>
                <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
                  {content.accreditations.map((a) => (
                    <li key={a} className="border-b pb-3 last:border-0" style={{ borderColor: LINE }}>{a}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: STONE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block transition hover:text-black">{content.email}</a>}
            </div>
            <a href={cta} className="mt-6 inline-flex w-full justify-center border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#1a1a17] hover:text-[#f3efe7]" style={{ borderColor: INK, color: INK }}>{ctaLabel}</a>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Enquiries", "Start a project", "Tell us about your site, brief and timeline — we'll arrange an initial consultation.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl">Visit the studio</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: STONE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-black">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-black">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: STONE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#a9a18d]">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#ebe5da]" style={{ borderColor: LINE, color: INK }}>Get directions</a>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Share your brief and we'll prepare a fee proposal and scope."
                bookingCta="Submit enquiry"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: STONE, label: "#5c574b", fieldBg: "#ffffff", fieldBorder: "#cfc7b6", fieldText: INK, button: INK, buttonText: PAPER, radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- WORK / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Selected work", "Projects")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className={`w-full object-cover ${i % 3 === 0 ? "aspect-[4/3]" : "aspect-square"}`} />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20" style={{ color: STONE }}>Coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — editorial: large serif left, tall image right */}
      <section className="mx-auto grid max-w-6xl items-end gap-10 px-6 pb-12 pt-16 sm:pt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-14">
        <div>
          <Kicker>{content.service_areas?.[0] ? `${content.service_areas[0]} · Studio` : "Architecture & design"}</Kicker>
          <h1 style={{ ...serif, color: INK }} className="mt-6 text-5xl leading-[1.02] tracking-tight sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Spaces designed to last."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-6 text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: STONE }}>{name}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={cta} className="inline-flex bg-[#1a1a17] px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3efe7] transition hover:opacity-90">{ctaLabel}</a>
            {services.length > 0 && <a href={href("services")} className="inline-flex border px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#ebe5da]" style={{ borderColor: INK, color: INK }}>Our services</a>}
          </div>
        </div>
        <div className="relative">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img data-edit-image="hero" src={hero} alt="" className="aspect-[3/4] w-full object-cover" />
          ) : (
            <div className="aspect-[3/4] w-full" style={{ background: `linear-gradient(160deg,#cfc7b6,${PANEL})` }} />
          )}
        </div>
      </section>

      {/* about statement */}
      {content.about && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-24 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:pt-2"><Kicker>The studio</Kicker></div>
            <div>
              <p data-edit="content.about" style={{ ...serif, color: INK }} className="max-w-3xl text-3xl leading-[1.3] sm:text-[2.4rem]">{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: STONE }}>About the studio →</a>
            </div>
          </div>
        </section>
      )}

      {/* services — numbered list */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-24">
          <Kicker>Capabilities</Kicker>
          <h2 style={{ ...serif, color: INK }} className="mt-5 text-4xl tracking-tight sm:text-5xl">What we offer</h2>
          <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
            {services.slice(0, 6).map((s, i) => (
              <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                <div className="flex min-w-0 gap-6">
                  <span style={{ ...serif, color: "#b3aa97" }} className="text-lg">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...serif, color: INK }} className="text-xl">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: STONE }}>{s.description}</p>}
                  </div>
                </div>
                {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: INK }}>{s.price}</span>}
              </li>
            ))}
          </ul>
          <a href={href("services")} className="mt-10 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: STONE }}>All services →</a>
        </section>
      )}

      {/* work strip */}
      {gallery.length > 0 && (
        <section style={{ background: INK }}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/45">Selected work</p>
            <h2 style={serif} className="mt-5 max-w-2xl text-4xl leading-tight tracking-tight text-[#f3efe7] sm:text-5xl">Projects we&apos;re proud of</h2>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" />
              ))}
            </div>
            <a href={href("gallery")} className="mt-10 inline-flex border px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3efe7] transition hover:bg-white/10" style={{ borderColor: "#ffffff44" }}>View all work</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <Kicker>Enquiries</Kicker>
        <h2 style={{ ...serif, color: INK }} className="mt-5 text-4xl tracking-tight sm:text-5xl">Let&apos;s design something enduring</h2>
        <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed" style={{ color: STONE }}>Tell us about your project and we&apos;ll arrange an initial consultation.</p>
        <a href={cta} className="mt-8 inline-flex bg-[#1a1a17] px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#f3efe7] transition hover:opacity-90">{ctaLabel}</a>
      </section>
    </>,
  );
}
