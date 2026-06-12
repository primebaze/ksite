import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ConcoursHeader } from "./ConcoursHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Concours — a luxe, boutique car-detailing & ceramic-coating studio. Deep gloss
// black with a single liquid-gold accent, pearl text and a quiet iridescent-teal
// highlight; spaced uppercase var(--font-space) display, generous air, no hard
// edges (soft pill buttons, hairline gold rules). Signature motifs: a glossy
// near-black hero with a "mirror finish" reflected headline, a water-bead /
// paint-gloss reflection band, catalog items framed as Bronze/Silver/Gold
// detailing packages on clean divider rows, and a paint-correction before/after
// gloss-transform Work gallery. Distinct from Velocity's electric-cyan EV garage
// and Apex's racing-red performance look. MULTI-PAGE: nav opens real routes
// (Services / About / Work / Contact) under basePath; header + footer shared.

const GLOSS = "#0E0F12"; // deep gloss black page
const PANEL = "#141519"; // lifted panel
const CARD = "#191B20"; // card surface
const GOLD = "#C9A24A"; // liquid gold accent
const PEARL = "#F3F4F2"; // pearl white text
const GRAPHITE = "#3A3D44"; // graphite line/border base
const TEAL = "#2E7E8E"; // single iridescent-teal highlight
const MUTE = "#9A9DA6"; // muted body
const display = { fontFamily: "var(--font-space)" } as const;

// Liquid-gold hairline label with a small reflective dot — the quiet kicker.
function Kicker({ children, tone = GOLD }: { children: ReactNode; tone?: string }) {
  return (
    <p className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-[0.34em]" style={{ color: tone }}>
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: tone, boxShadow: `0 0 8px ${tone}` }} />
      {children}
    </p>
  );
}

// Water-bead / paint-gloss motif: a row of reflective droplets on a gloss sheen.
function BeadBand() {
  const beads = [
    { l: "8%", s: 22, o: 0.9 }, { l: "19%", s: 12, o: 0.7 }, { l: "29%", s: 30, o: 1 },
    { l: "41%", s: 14, o: 0.6 }, { l: "52%", s: 24, o: 0.85 }, { l: "63%", s: 10, o: 0.55 },
    { l: "72%", s: 28, o: 0.95 }, { l: "84%", s: 16, o: 0.7 }, { l: "93%", s: 20, o: 0.8 },
  ];
  return (
    <div className="pointer-events-none relative h-20 w-full overflow-hidden" aria-hidden style={{ background: `linear-gradient(180deg, ${GLOSS}, ${PANEL})` }}>
      <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}55, transparent)` }} />
      {beads.map((b, i) => (
        <span
          key={i}
          className="absolute top-1/2 -translate-y-1/2 rounded-full"
          style={{
            left: b.l,
            height: b.s,
            width: b.s,
            opacity: b.o,
            background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,0.9), rgba(201,162,74,0.35) 45%, rgba(14,15,18,0.1) 70%)`,
            boxShadow: `inset 0 -2px 4px rgba(0,0,0,0.4), 0 2px 6px rgba(0,0,0,0.5)`,
          }}
        />
      ))}
    </div>
  );
}

export default function ConcoursDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Book your detail";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  // Tier framing for packages: Bronze / Silver / Gold cadence across the list.
  const tiers = ["Bronze", "Silver", "Gold", "Platinum"];

  const nav = [
    services.length > 0 && { label: "Packages", href: href("services") },
    content.about && { label: "Studio", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const goldBtn = (label: string, to: string) => (
    <a
      href={to}
      className="inline-flex rounded-full px-8 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110"
      style={{ background: `linear-gradient(120deg, ${GOLD}, #E4C66F)`, color: GLOSS, ...display }}
    >
      {label}
    </a>
  );
  const ghostBtn = (label: string, to: string) => (
    <a
      href={to}
      className="inline-flex rounded-full border px-8 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:border-white/40 hover:text-white"
      style={{ borderColor: `${GRAPHITE}`, color: MUTE, ...display }}
    >
      {label}
    </a>
  );

  // Trust pillars — lead with certified installers / approved coatings / guarantee.
  const trust = [
    "Certified ceramic installers",
    "Manufacturer-approved coatings",
    "Written protection guarantee",
    "Studio & mobile detailing",
  ];

  const footer = (
    <footer style={{ background: "#08090B", borderTop: `1px solid ${GOLD}33` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span className="inline-block h-6 w-px" style={{ background: `linear-gradient(${GOLD}, transparent)` }} />
            <span data-edit="tenant.business_name" style={{ ...display, color: PEARL }} className="text-xl font-semibold uppercase tracking-[0.3em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em]" style={{ borderColor: `${GOLD}3a`, color: MUTE }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:border-[#C9A24A] hover:text-[#C9A24A]" style={{ border: `1px solid ${GRAPHITE}` }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">Studio</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[#C9A24A]">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff12", color: "#ffffff5c" }}>
        <p>© {new Date().getFullYear()} {name}. Detailed to perfection.</p>
        <p className="uppercase tracking-[0.2em] text-white/40">Ceramic coating · Paint correction</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: GLOSS }} className="min-h-screen font-body">
      <ConcoursHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${PANEL}, ${GLOSS})` }}>
      <div className="pointer-events-none absolute -right-32 top-0 h-full w-1/2 opacity-40" style={{ background: `radial-gradient(ellipse at top right, ${GOLD}22, transparent 60%)` }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: PEARL }} className="mt-5 text-4xl font-semibold uppercase leading-[1.02] tracking-[0.02em] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // Packages list as clean divider rows: tier label + name + desc left, price right.
  const packageList = (items: typeof services, limit?: number) => (
    <ul className="divide-y" style={{ borderColor: "#ffffff10" }}>
      {(limit ? items.slice(0, limit) : items).map((s, i) => (
        <li key={s.id} className="flex items-start justify-between gap-8 py-7">
          <div className="flex min-w-0 gap-6">
            <span style={{ ...display, color: GOLD }} className="hidden shrink-0 pt-1 text-[10px] font-semibold uppercase tracking-[0.26em] sm:block sm:w-20">{tiers[i % tiers.length]}</span>
            <div className="min-w-0">
              <p data-edit={`item:${s.id}:name`} style={{ ...display, color: PEARL }} className="text-lg font-semibold uppercase tracking-[0.04em]">{s.name}</p>
              {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
            </div>
          </div>
          {s.price && <span data-edit={`item:${s.id}:price`} style={{ ...display, color: GOLD }} className="shrink-0 text-lg font-semibold">{s.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- SERVICES (Packages) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Detailing menu", "The Packages")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {services.length > 0 ? packageList(services) : <p style={{ color: MUTE }}>Packages coming soon.</p>}
          <p className="mt-10 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>
            Every package is bespoke to your paintwork. We assess finish, swirls and protection on arrival and tailor the work to your vehicle.
          </p>
          <div className="mt-10">{goldBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT (Studio) ----
  if (page === "about") {
    return shell(
      <>
        {banner("Inside the studio", "Obsessed With Finish")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {trust.map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-2xl border px-5 py-4" style={{ borderColor: "#ffffff12", background: CARD }}>
                <span className="inline-block h-2 w-2 shrink-0 rounded-full" style={{ background: GOLD, boxShadow: `0 0 8px ${GOLD}` }} />
                <span className="text-sm" style={{ color: PEARL }}>{t}</span>
              </div>
            ))}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: PEARL }} className="mt-14 text-[11px] font-semibold uppercase tracking-[0.3em]">Certified &amp; approved</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-medium uppercase tracking-[0.16em]" style={{ borderColor: `${GOLD}55`, color: PEARL }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: PEARL }} className="mt-12 text-[11px] font-semibold uppercase tracking-[0.3em]">Areas we cover</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
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
        {banner("Reserve a slot", "Book Your Detail")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: PEARL }} className="text-2xl font-semibold uppercase tracking-[0.04em]">Visit the studio</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff12", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-2">
              {trust.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.16em]" style={{ borderColor: "#ffffff14", color: MUTE }}>{t}</span>
              ))}
            </div>
            {content.map_url && <div className="mt-8">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Book your detail"
                bookingBlurb="Tell us the make, model and the finish you're after — we'll confirm a package, price and studio slot."
                bookingCta="Request booking"
                theme={{ card: CARD, cardBorder: "#ffffff14", heading: PEARL, blurb: MUTE, label: "#c4c7cf", fieldBg: PANEL, fieldBorder: "#ffffff1f", fieldText: PEARL, button: GOLD, buttonText: GLOSS, radius: "0.9rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY (Work — gloss transforms) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gloss transforms", "The Work")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                <figure key={g.id} className="group relative overflow-hidden rounded-xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
                  <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(120deg, ${GOLD}22, transparent 60%)` }} />
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Before / after gallery coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* glossy mirror-finish hero */}
      <section className="relative isolate flex min-h-[96vh] items-center overflow-hidden" style={{ background: GLOSS }}>
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 30% 20%, #1c1d22, ${GLOSS} 70%)` }} />
        )}
        {/* deep gloss vignette + reflective sheen */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(14,15,18,0.55) 0%, rgba(14,15,18,0.65) 40%, rgba(14,15,18,0.95) 100%)" }} />
        <div className="pointer-events-none absolute -left-20 top-0 h-full w-1/2 opacity-50" style={{ background: `linear-gradient(115deg, ${GOLD}1c, transparent 55%)` }} />
        {/* thin reflected-light streak */}
        <div className="pointer-events-none absolute left-0 top-[38%] h-px w-[60%]" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}, transparent)`, boxShadow: `0 0 24px ${GOLD}` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker>{content.service_areas?.[0] ? `${content.service_areas[0]} detailing studio` : "Ceramic coating & paint correction"}</Kicker>
          <h1 style={display} className="mt-6 max-w-4xl text-5xl font-semibold uppercase leading-[1.0] tracking-[0.01em] sm:text-7xl">
            <span data-edit="content.tagline" className="block" style={{ color: PEARL }}>{content.tagline ?? "A flawless, mirror finish."}</span>
            {/* faint reflection of the headline — the gloss signature */}
            <span aria-hidden className="mt-1 block scale-y-[-1] bg-gradient-to-b from-white/12 to-transparent bg-clip-text text-transparent [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.5),transparent_60%)]">
              {content.tagline ?? "A flawless, mirror finish."}
            </span>
          </h1>
          <p data-edit="tenant.business_name" className="mt-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/55">{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {goldBtn(ctaLabel, cta)}
            {phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* certified-installer trust strip */}
      <section style={{ background: PANEL, borderTop: `1px solid ${GOLD}22`, borderBottom: `1px solid ${GOLD}22` }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-6 text-center">
          {trust.map((t) => (
            <span key={t} className="flex items-center gap-2.5 text-[10px] font-semibold uppercase tracking-[0.22em]" style={{ color: MUTE }}>
              <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: GOLD }} />{t}
            </span>
          ))}
        </div>
      </section>

      {/* water-bead / paint-gloss motif band */}
      <BeadBand />

      {/* about — studio */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-last lg:order-first">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-2xl" style={{ background: `radial-gradient(ellipse at 30% 25%, #20222a, ${CARD})` }} />
            )}
            <span className="pointer-events-none absolute inset-0 rounded-2xl" style={{ boxShadow: `inset 0 1px 0 ${GOLD}33, inset 0 0 60px rgba(0,0,0,0.5)` }} />
          </div>
          <div>
            <Kicker>Inside the studio</Kicker>
            <h2 style={{ ...display, color: PEARL }} className="mt-5 text-4xl font-semibold uppercase leading-[1.05] tracking-[0.02em] sm:text-5xl">Protection you can see</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>About the studio →</a>
          </div>
        </section>
      )}

      {/* packages — tiered divider rows */}
      {services.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff10", borderBottom: "1px solid #ffffff10" }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <Kicker>Detailing menu</Kicker>
            <h2 style={{ ...display, color: PEARL }} className="mt-5 text-4xl font-semibold uppercase tracking-[0.02em] sm:text-5xl">The packages</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>From a refreshing maintenance wash to full multi-stage paint correction and ceramic protection.</p>
            <div className="mt-12">{packageList(services, 6)}</div>
            <div className="mt-12">{ghostBtn("View all packages", href("services"))}</div>
          </div>
        </section>
      )}

      {/* ceramic-coating protection / guarantee angle */}
      <section className="relative overflow-hidden" style={{ background: GLOSS }}>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30" style={{ background: `radial-gradient(ellipse at top right, ${TEAL}33, transparent 60%)` }} />
        <div className="relative mx-auto grid max-w-7xl gap-10 px-8 py-24 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Kicker tone={TEAL}>Ceramic protection</Kicker>
            <h2 style={{ ...display, color: PEARL }} className="mt-5 text-3xl font-semibold uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl">A coating that lasts years, not weeks</h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-2">
            {[
              { t: "Multi-stage correction", d: "Swirls, scratches and oxidation machine-polished out to a true mirror finish before any coating goes down." },
              { t: "Manufacturer-approved coatings", d: "Applied by certified installers — registered for warranty and backed by a written guarantee." },
              { t: "Hydrophobic & self-cleaning", d: "Water beads and sheets away, carrying dirt with it. Easier washes, deeper gloss, for years." },
              { t: "Gloss & UV protection", d: "A hard, glassy layer that resists fading, chemical etching and the daily grind of the road." },
            ].map((f) => (
              <div key={f.t} className="rounded-2xl border p-6" style={{ borderColor: "#ffffff10", background: CARD }}>
                <h3 style={{ ...display, color: PEARL }} className="text-sm font-semibold uppercase tracking-[0.12em]">{f.t}</h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTE }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* work — before/after gloss transforms */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Kicker>Gloss transforms</Kicker>
          <h2 style={{ ...display, color: PEARL }} className="mt-5 text-4xl font-semibold uppercase tracking-[0.02em] sm:text-5xl">Before &amp; after</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              <figure key={g.id} className="group relative overflow-hidden rounded-xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover transition duration-700 group-hover:scale-105" />
                <span className="pointer-events-none absolute inset-0 opacity-0 transition duration-500 group-hover:opacity-100" style={{ background: `linear-gradient(120deg, ${GOLD}22, transparent 60%)` }} />
              </figure>
            ))}
          </div>
          <div className="mt-10">{ghostBtn("Full gallery", href("gallery"))}</div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(120deg, ${GOLD}, #E4C66F)` }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 sm:flex-row sm:items-center" style={{ color: GLOSS }}>
          <div>
            <h2 style={display} className="text-3xl font-semibold uppercase leading-[1.05] tracking-[0.02em] sm:text-4xl">Give your car the concours treatment</h2>
            <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#0E0F12aa" }}>Studio & mobile · By appointment</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:brightness-125" style={{ background: GLOSS, ...display }}>
            {phone ? `Call ${phone}` : ctaLabel}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
