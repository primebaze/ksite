import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CulinaHeader } from "./CulinaHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Culina — premium bespoke kitchen design & installation studio. Aspirational,
// design-led and warm: soft marble & off-white grounds, deep forest ink, warm
// brass detailing and a muted clay accent. Built for a fitted-kitchen studio
// that sells trust — free design consultations, a project portfolio, guarantees
// and finance. Owns the forest + brass + marble register, distinct from the
// rugged builder/industrial siblings. MULTI-PAGE: nav opens real routes
// (Services / About / Work / Contact) under basePath; the sticky transparent
// header + warm footer are shared. Tenant swaps in its own photography, copy,
// services and accreditations.

const FOREST = "#2B3A34"; // deep forest ink
const FOREST_DEEP = "#21302A"; // darker forest panels
const BRASS = "#B68A4E"; // warm brass detailing
const STONE = "#E5DECF"; // soft stone
const MARBLE = "#F7F4EE"; // off-white marble ground
const CLAY = "#B07C63"; // muted clay accent
const INK = "#34423B"; // body text on light
const MUTE = "#6c776f"; // muted body on light
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: light ? "#d8cdb6" : BRASS }}>
      <span className="inline-block h-[1.5px] w-7" style={{ background: light ? "#d8cdb6" : BRASS }} />
      {children}
    </span>
  );
}

export default function CulinaDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const phone = content.phone || content.emergency_phone;

  const nav = [
    services.length > 0 && { label: "Kitchens", href: href("services") },
    content.about && { label: "Studio", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnBrass = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:brightness-105" style={{ background: BRASS, color: "#1e2a25" }}>
      {label}
    </a>
  );
  const btnOutlineLight = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff66" }}>
      {label}
    </a>
  );
  const btnOutlineDark = (label: string, to: string) => (
    <a href={to} className="inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-black/[0.03]" style={{ borderColor: `${FOREST}33`, color: FOREST }}>
      {label}
    </a>
  );

  // ---- shared footer ----
  const footer = (
    <footer style={{ background: FOREST_DEEP, color: STONE }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span className="inline-block h-3 w-3 rotate-45" style={{ border: `1.5px solid ${BRASS}` }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-medium uppercase tracking-[0.16em] text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#bcc4bd" }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff24", color: "#cdd3cb" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-7 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-[#1e2a25] hover:bg-[#B68A4E]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white">Studio</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: "#bcc4bd" }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white">Visit &amp; call</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: "#bcc4bd" }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white">Showroom hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: "#bcc4bd" }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#8d978e" }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: "#bcc4bd" }}>By appointment.</p>}
        </div>
      </div>
      <div className="border-t" style={{ borderColor: "#ffffff14" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-8 py-7 text-xs sm:flex-row" style={{ color: "#ffffff66" }}>
          <p>© {new Date().getFullYear()} {name}. Bespoke kitchens, beautifully made.</p>
          {phone && <a href={`tel:${phone}`} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Call {phone}</a>}
        </div>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: MARBLE }} className="min-h-screen font-body" >
      <CulinaHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Subpage banner — forest ground with a brass kicker, marble headline.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: FOREST }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker light>{kicker}</Kicker>
        <h1 style={display} className="mt-5 max-w-3xl text-4xl font-medium leading-[1.05] tracking-[-0.01em] text-white sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // Clean divider-row services list — name + desc left, price right. No leaders,
  // no card panels. Shared by the home preview and the full services page.
  const serviceList = (items: typeof services) => (
    <ul className="divide-y" style={{ borderColor: `${FOREST}1f` }}>
      {items.map((s, i) => (
        <li key={s.id} className="grid grid-cols-[auto_1fr_auto] items-baseline gap-x-6 py-7">
          <span style={{ ...display, color: BRASS }} className="text-sm font-medium tabular-nums">{String(i + 1).padStart(2, "0")}</span>
          <div className="min-w-0">
            <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: FOREST }} className="text-xl font-medium tracking-[-0.01em] sm:text-2xl">{s.name}</h3>
            {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} className="whitespace-nowrap text-[15px] font-semibold" style={{ color: CLAY }}>{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES (Kitchens) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we offer", "Kitchens, made to measure")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? (
            <>
              <p className="max-w-2xl text-[17px] leading-relaxed" style={{ color: MUTE }}>
                Every Culina kitchen is designed around how you live and cook — then crafted, supplied and fitted by our own team.
              </p>
              <div className="mt-12">{serviceList(services)}</div>
            </>
          ) : <p style={{ color: MUTE }}>Our collections are coming soon.</p>}
          <div className="mt-14">{btnBrass(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT (Studio) ----
  if (page === "about") {
    return shell(
      <>
        {banner("The studio", "The heart of the home, beautifully made")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: FOREST }} className="mt-14 text-[11px] font-semibold uppercase tracking-[0.24em]">Guaranteed &amp; accredited</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em]" style={{ borderColor: `${BRASS}80`, color: INK }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: FOREST }} className="mt-14 text-[11px] font-semibold uppercase tracking-[0.24em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-14">{btnBrass(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's begin", "Request a quote")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: FOREST }} className="text-2xl font-medium tracking-[-0.01em] sm:text-3xl">Book a free design consultation</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }}>
              Tell us about your space and how you cook. We&apos;ll arrange a visit, take measurements and prepare a no-obligation design and quote.
            </p>
            <div className="mt-8 space-y-4 text-[15px] leading-relaxed" style={{ color: INK }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[var(--accent)]" style={{ color: CLAY }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70" style={{ color: CLAY }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-9 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${FOREST}1f`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#9aa39b" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <div className="mt-8">{btnOutlineDark("Get directions", content.map_url)}</div>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about your kitchen project and we'll be in touch to arrange your design consultation."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: `${FOREST}1f`, heading: FOREST, blurb: MUTE, label: INK, fieldBg: MARBLE, fieldBorder: `${FOREST}26`, fieldText: FOREST, button: BRASS, buttonText: "#1e2a25", radius: "14px", font: "var(--font-space)" }}
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
        {banner("Recent kitchens", "Our work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: STONE }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  {g.caption && <figcaption className="px-4 py-3 text-[13px]" style={{ color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Our portfolio is coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const journey = [
    { k: "01", t: "Design consultation", d: "A free visit to understand your space, your style and how you cook." },
    { k: "02", t: "3D plan & quote", d: "A made-to-measure design rendered in 3D, with a clear, fixed quote." },
    { k: "03", t: "Installation", d: "Our own fitters supply and install — joinery, worktops and appliances." },
    { k: "04", t: "Handover", d: "A final walk-through, a snag-free finish and your guarantee." },
  ];

  return shell(
    <>
      {/* hero — aspirational marble / forest with a premium interior feel */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${FOREST} 0%, ${FOREST_DEEP} 55%, #1a241f 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(33,48,42,0.82) 0%, rgba(33,48,42,0.55) 45%, rgba(33,48,42,0.18) 100%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-32 text-white">
          <Kicker light>{content.service_areas?.[0] ? `Bespoke kitchens across ${content.service_areas[0]}` : "Bespoke kitchen studio"}</Kicker>
          <h1 style={display} className="mt-6 max-w-3xl text-5xl font-medium leading-[1.02] tracking-[-0.015em] [text-shadow:0_2px_30px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="content.tagline" className="block">{content.tagline ?? "The kitchen, beautifully made."}</span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-6 text-[13px] font-medium uppercase tracking-[0.3em] text-white/70">{name}</p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnBrass(ctaLabel, cta)}
            {gallery.length > 0 && btnOutlineLight("View our kitchens", href("gallery"))}
          </div>
          <div className="mt-12 flex flex-wrap gap-x-8 gap-y-2 text-[12px] font-medium uppercase tracking-[0.18em] text-white/70">
            <span>Free design consultation</span>
            <span style={{ color: BRASS }}>·</span>
            <span>Made-to-measure</span>
            <span style={{ color: BRASS }}>·</span>
            <span>Supplied &amp; fitted</span>
          </div>
        </div>
      </section>

      {/* trust strip — stone band leading with the promise */}
      <section style={{ background: STONE }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-10 text-center sm:grid-cols-3" style={{ color: FOREST }}>
          {[
            { t: "Design-led", d: "Your kitchen, drawn around your life" },
            { t: "Made to measure", d: "Crafted to fit your space exactly" },
            { t: "Guaranteed", d: "Quality you can trust for years" },
          ].map((x) => (
            <div key={x.t}>
              <p style={display} className="text-base font-semibold uppercase tracking-[0.18em]">{x.t}</p>
              <p className="mt-1 text-sm" style={{ color: "#5d6a62" }}>{x.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about — editorial split on marble */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-[1.5rem] object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[1.5rem]" style={{ background: STONE }} />
            )}
            <span className="pointer-events-none absolute -right-3 -top-3 h-20 w-20 rounded-tr-[1.5rem]" style={{ borderTop: `2px solid ${BRASS}`, borderRight: `2px solid ${BRASS}` }} />
          </div>
          <div>
            <Kicker>The studio</Kicker>
            <h2 style={{ ...display, color: FOREST }} className="mt-5 text-4xl font-medium leading-[1.08] tracking-[-0.015em] sm:text-5xl">Designed to be lived in</h2>
            <p data-edit="content.about" className="mt-6 text-[17px] leading-[1.9]" style={{ color: INK }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: BRASS }}>More about the studio →</a>
          </div>
        </section>
      )}

      {/* your kitchen journey — forest band, 4-step timeline */}
      <section style={{ background: FOREST }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <Kicker light>Your kitchen journey</Kicker>
          <h2 style={display} className="mt-5 max-w-2xl text-4xl font-medium leading-[1.08] tracking-[-0.015em] text-white sm:text-5xl">From first sketch to the heart of the home</h2>
          <div className="mt-14 grid gap-px sm:grid-cols-2 lg:grid-cols-4" style={{ background: "#ffffff14" }}>
            {journey.map((s) => (
              <div key={s.k} className="px-6 py-8" style={{ background: FOREST }}>
                <span style={{ ...display, color: BRASS }} className="text-3xl font-medium">{s.k}</span>
                <h3 style={{ ...display, color: "#fff" }} className="mt-4 text-lg font-medium tracking-[-0.01em]">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "#bcc4bd" }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* what we offer — clean divider-row services list */}
      {services.length > 0 && (
        <section className="mx-auto max-w-5xl px-8 py-24">
          <Kicker>What we offer</Kicker>
          <h2 style={{ ...display, color: FOREST }} className="mt-5 text-4xl font-medium tracking-[-0.015em] sm:text-5xl">Our kitchens</h2>
          <div className="mt-12">{serviceList(services.slice(0, 6))}</div>
          <div className="mt-12">{btnOutlineDark("View all kitchens", href("services"))}</div>
        </section>
      )}

      {/* before / after work — strong portfolio strip */}
      {gallery.length > 0 && (
        <section style={{ background: MARBLE, borderTop: `1px solid ${FOREST}14` }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>Recent kitchens</Kicker>
                <h2 style={{ ...display, color: FOREST }} className="mt-5 text-4xl font-medium tracking-[-0.015em] sm:text-5xl">Our work</h2>
              </div>
              <a href={href("gallery")} className="text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: BRASS }}>See the portfolio →</a>
            </div>
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.slice(0, 3).map((g) => (
                <figure key={g.id} className="overflow-hidden rounded-2xl" style={{ background: STONE }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover transition duration-500 hover:scale-[1.03]" />
                  {g.caption && <figcaption className="px-4 py-3 text-[13px]" style={{ color: MUTE }}>{g.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* finance / guarantee + areas covered band */}
      <section style={{ background: FOREST_DEEP, color: STONE }}>
        <div className="mx-auto max-w-7xl px-8 py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="rounded-2xl p-7" style={{ background: "#ffffff0a", border: "1px solid #ffffff14" }}>
              <h3 style={{ ...display, color: "#fff" }} className="text-lg font-medium tracking-[-0.01em]">Finance available</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#bcc4bd" }}>Spread the cost of your dream kitchen with flexible, interest-free finance options.</p>
            </div>
            <div className="rounded-2xl p-7" style={{ background: "#ffffff0a", border: "1px solid #ffffff14" }}>
              <h3 style={{ ...display, color: "#fff" }} className="text-lg font-medium tracking-[-0.01em]">Our guarantee</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#bcc4bd" }}>Designed, supplied and fitted by us — and backed by a workmanship guarantee.</p>
            </div>
            <div className="rounded-2xl p-7" style={{ background: "#ffffff0a", border: "1px solid #ffffff14" }}>
              <h3 style={{ ...display, color: "#fff" }} className="text-lg font-medium tracking-[-0.01em]">Areas we cover</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "#bcc4bd" }}>
                {content.service_areas && content.service_areas.length > 0 ? content.service_areas.join(" · ") : "Get in touch to see if we cover your area."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* closing CTA — warm clay-into-brass invitation */}
      <section style={{ background: STONE }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 px-8 py-20 sm:flex-row sm:items-center" style={{ color: FOREST }}>
          <div>
            <h2 style={display} className="text-3xl font-medium leading-[1.08] tracking-[-0.015em] sm:text-4xl">Let&apos;s design your kitchen.</h2>
            <p className="mt-3 text-sm" style={{ color: "#5d6a62" }}>Free, no-obligation design consultation and quote.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnBrass(ctaLabel, cta)}
            {phone && (
              <a href={`tel:${phone}`} className="inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-black/[0.03]" style={{ borderColor: `${FOREST}33`, color: FOREST }}>
                Call {phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
