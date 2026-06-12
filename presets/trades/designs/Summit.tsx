import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SummitHeader } from "./SummitHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Summit — confident, modern corporate consultancy & agency design. Crisp white
// with a near-black ink and an indigo accent, a bold geometric sans and a
// structured, results-led layout (dark hero band, stat strip, numbered
// capabilities). Built for consultancies, marketing & creative agencies, IT &
// software firms, recruiters and B2B service providers. MULTI-PAGE: nav opens
// real routes (Services / About / Work / Contact) under basePath; the sticky
// white header + ink footer are shared.

const INK = "#101114"; // heading ink / dark sections
const INDIGO = "#4f46e5"; // accent
const SLATE = "#52565f"; // muted body
const MIST = "#f5f6fa"; // tinted panels
const LINE = "#e7e9f0"; // hairlines
const sans = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: light ? "#a5a8ff" : INDIGO }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: light ? "#a5a8ff" : INDIGO }} />
      {children}
    </p>
  );
}

export default function SummitDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-md" style={{ background: `conic-gradient(from 140deg, ${INDIGO}, #ffffff)` }} />
            <span data-edit="tenant.business_name" style={sans} className="text-xl font-bold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-lg text-white/65 transition hover:bg-[#4f46e5] hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Company</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">Hours</h4>
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
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body">
      <SummitHeader name={name} cta={cta} ctaLabel={ctaLabel} links={nav} home={href("home")} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: MIST, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...sans, color: INK }} className="mt-4 max-w-3xl text-4xl font-bold leading-[1.04] tracking-tight sm:text-5xl">{title}</h1>
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed" style={{ color: SLATE }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Capabilities", "Services that move the needle", "Senior-led, outcome-focused work — clearly scoped and measurably delivered.")}
        <section className="mx-auto max-w-5xl px-6 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-7">
                  <div className="flex min-w-0 gap-6">
                    <span style={{ ...sans, color: INDIGO }} className="text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
                    <div className="min-w-0">
                      <p data-edit={`item:${s.id}:name`} style={{ ...sans, color: INK }} className="text-xl font-bold tracking-tight">{s.name}</p>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: INDIGO }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-lg px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: INDIGO }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "Partners in your growth")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...sans, color: INK }} className="mt-12 text-2xl font-bold tracking-tight">Who we work with</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-lg border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: SLATE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
          </div>
          <aside className="h-fit rounded-2xl p-7" style={{ background: MIST, border: `1px solid ${LINE}` }}>
            {content.accreditations && content.accreditations.length > 0 && (
              <>
                <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: INDIGO }}>Credentials</h4>
                <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
                  {content.accreditations.map((a) => (
                    <li key={a} className="flex items-start gap-2"><span style={{ color: INDIGO }}>✓</span><span>{a}</span></li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-bold transition hover:text-[#4f46e5]" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block transition hover:text-[#4f46e5]">{content.email}</a>}
            </div>
            <a href={cta} className="mt-6 inline-flex w-full justify-center rounded-lg px-6 py-3 text-sm font-bold text-white transition hover:opacity-90" style={{ background: INDIGO }}>{ctaLabel}</a>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "Let's talk", "Tell us about your goals and we'll arrange a no-obligation conversation.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...sans, color: INK }} className="text-2xl font-bold tracking-tight">Our office</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#4f46e5]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#4f46e5]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-lg border px-6 py-3 text-sm font-bold transition hover:bg-neutral-50" style={{ borderColor: LINE, color: INK }}>Get directions</a>
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
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SLATE, label: "#41454d", fieldBg: "#ffffff", fieldBorder: "#cdd1dd", fieldText: INK, button: INDIGO, buttonText: "#ffffff", radius: "0.5rem", font: "var(--font-space)" }}
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
        {banner("Selected work", "Case studies & projects")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
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
      {/* hero — dark band, confident statement */}
      <section className="relative isolate overflow-hidden" style={{ background: INK }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-30" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        ) : null}
        <div className="pointer-events-none absolute -right-40 -top-40 h-[28rem] w-[28rem] rounded-full opacity-50 blur-3xl" style={{ background: INDIGO }} />
        <div className="relative mx-auto max-w-6xl px-6 py-28 sm:py-36">
          <Kicker light>{content.service_areas?.[0] ? content.service_areas[0] : "Strategy · Delivery · Growth"}</Kicker>
          <h1 style={sans} className="mt-5 max-w-4xl text-5xl font-bold leading-[1.02] tracking-tight text-white sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "Strategy that delivers results."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-6 text-sm font-bold uppercase tracking-[0.22em] text-white/55">{name}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={cta} className="inline-flex rounded-lg px-7 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: INDIGO }}>{ctaLabel}</a>
            {services.length > 0 && <a href={href("services")} className="inline-flex rounded-lg border px-7 py-4 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10" style={{ borderColor: "#ffffff3a" }}>Our services</a>}
          </div>
        </div>
      </section>

      {/* stat strip */}
      <section style={{ background: MIST, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 text-center sm:grid-cols-3">
          {[
            { k: services.length > 0 ? `${services.length}+` : "Full", v: "Service offering" },
            { k: content.accreditations?.length ? `${content.accreditations.length}` : "Trusted", v: "Accreditations" },
            { k: content.service_areas?.length ? `${content.service_areas.length}` : "Global", v: "Sectors served" },
          ].map((s) => (
            <div key={s.v}>
              <p style={{ ...sans, color: INK }} className="text-4xl font-bold tracking-tight">{s.k}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: SLATE }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* services — numbered */}
      {services.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>Capabilities</Kicker>
              <h2 style={{ ...sans, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">What we do</h2>
            </div>
            <a href={href("services")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: INDIGO }}>All services →</a>
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
            {services.slice(0, 6).map((s, i) => (
              <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                <div className="flex min-w-0 gap-6">
                  <span style={{ ...sans, color: INDIGO }} className="text-lg font-bold">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...sans, color: INK }} className="text-lg font-bold tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                </div>
                {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: INDIGO }}>{s.price}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* about statement band */}
      {content.about && (
        <section style={{ background: INK }}>
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-24 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:pt-2"><Kicker light>About us</Kicker></div>
            <div>
              <p data-edit="content.about" style={sans} className="max-w-3xl text-3xl font-bold leading-[1.25] tracking-tight text-white sm:text-[2.6rem]">{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-sm font-bold" style={{ color: "#a5a8ff" }}>More about us →</a>
            </div>
          </div>
        </section>
      )}

      {/* work */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <Kicker>Selected work</Kicker>
          <h2 style={{ ...sans, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Recent projects</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-xl object-cover" />
            ))}
          </div>
          <a href={href("gallery")} className="mt-10 inline-flex rounded-lg border px-7 py-3.5 text-sm font-bold transition hover:bg-neutral-50" style={{ borderColor: LINE, color: INK }}>View all work</a>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INDIGO }}>
        <div className="mx-auto max-w-3xl px-6 py-24 text-center text-white">
          <h2 style={sans} className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to make progress?</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/75">Book a no-obligation consultation and we&apos;ll map out the clearest path forward.</p>
          <a href={cta} className="mt-8 inline-flex rounded-lg bg-white px-8 py-4 text-sm font-bold transition hover:opacity-90" style={{ color: INDIGO }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
