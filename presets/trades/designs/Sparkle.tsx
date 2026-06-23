import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SparkleHeader, SparkleMark } from "./SparkleHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Sparkle — bright, trustworthy domestic & commercial CLEANING design. Built for
// cleaners offering regular home cleans, deep cleans, end-of-tenancy, offices,
// carpets and ovens. A squeaky-clean white/aqua identity with a sunny lemon
// accent, floating soap-bubble + four-point sparkle motifs, big airy whitespace
// and rounded, energetic shapes. Leads with trust — vetted/DBS staff, insured,
// satisfaction guarantee, eco products, regular or one-off. MULTI-PAGE: nav opens
// real routes (Services / About / Work / Contact) under basePath; the floating
// pill header + deep-teal footer are shared. var(--font-space) display.

const AQUA = "#19A7A0"; // fresh aqua-teal primary
const LEMON = "#FBD24B"; // sunny accent
const SKY = "#DDEFF0"; // soft sky tint
const INK = "#133A3A"; // deep teal-ink heading / footer
const SLATE = "#4f6f6c"; // muted body
const LINE = "#cfe6e4"; // hairlines
const display = { fontFamily: "var(--font-space)" } as const;

function Kicker({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.16em]"
      style={light ? { background: "#ffffff26", color: "#ffffff" } : { background: SKY, color: AQUA }}
    >
      <SparkleMark color={light ? LEMON : AQUA} size={12} />
      {children}
    </span>
  );
}

// Decorative floating bubbles — the squeaky-clean Sparkle signature.
function Bubbles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {[
        { l: "8%", t: "18%", s: 120, o: 0.16 },
        { l: "78%", t: "12%", s: 180, o: 0.13 },
        { l: "62%", t: "58%", s: 90, o: 0.18 },
        { l: "30%", t: "70%", s: 150, o: 0.1 },
        { l: "90%", t: "64%", s: 70, o: 0.2 },
        { l: "44%", t: "8%", s: 56, o: 0.22 },
      ].map((b, i) => (
        <span
          key={i}
          className="absolute rounded-full"
          style={{
            left: b.l,
            top: b.t,
            width: b.s,
            height: b.s,
            background: `radial-gradient(circle at 32% 28%, rgba(255,255,255,${b.o + 0.25}), rgba(255,255,255,0) 62%)`,
            border: `1px solid rgba(255,255,255,${b.o})`,
            opacity: 1,
          }}
        />
      ))}
    </div>
  );
}

export default function SparkleDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const trust =
    content.accreditations && content.accreditations.length > 0
      ? content.accreditations
      : ["Vetted & DBS-checked", "Fully insured", "100% satisfaction guarantee", "Eco-friendly products"];

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnLemon = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-7 py-3.5 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: LEMON, color: INK }}
    >
      {label}
    </a>
  );
  const btnAqua = (label: string, to: string, full = false) => (
    <a
      href={to}
      className={`rounded-full px-7 py-3.5 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`}
      style={{ background: AQUA }}
    >
      {label}
    </a>
  );
  const btnOutline = (label: string, to: string) => (
    <a
      href={to}
      className="inline-flex rounded-full border px-7 py-3.5 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] transition hover:bg-white"
      style={{ borderColor: LINE, color: INK }}
    >
      {label}
    </a>
  );

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="relative grid h-9 w-9 place-items-center rounded-full" style={{ background: AQUA }}>
              <SparkleMark color="#ffffff" size={18} />
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full" style={{ background: LEMON }} />
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ background: "#ffffff14", color: "#cfeae8" }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/75 transition hover:text-white" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/45" {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/45" {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/45" {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">7 days a week.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-6 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1a", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. Spotless results, every time.</p>
        {phone && <a href={`tel:${phone}`} className="font-bold uppercase tracking-[0.12em] transition hover:text-white">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body">
      <SparkleHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, blurb?: string, blurbKey?: string) => (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${AQUA} 0%, #0f8a84 100%)` }}>
      <Bubbles />
      <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-32 text-white sm:pt-36">
        <Kicker light><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={display} className="mt-5 max-w-3xl text-4xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {blurb && <p className="mt-5 max-w-xl text-[16px] leading-relaxed text-white/85" {...editCopy(content, blurbKey ?? "", blurb)} />}
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we clean", "svc_kicker", "A spotless finish, top to bottom", "svc_title", "Regular cleans, deep cleans, end-of-tenancy, offices, carpets and ovens — pick what you need and we'll sort the rest.", "svc_blurb")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {services.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: LINE }}>
              {services.map((s, i) => (
                <li key={s.id} className="flex items-start justify-between gap-8 py-6" style={{ borderColor: LINE }}>
                  <div className="flex min-w-0 gap-4">
                    <span className="mt-0.5 hidden shrink-0 sm:block"><SparkleMark color={LEMON} size={18} /></span>
                    <div className="min-w-0">
                      <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-extrabold tracking-tight">{s.name}</h3>
                      {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                    </div>
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-extrabold" style={{ color: AQUA }}>{s.price}</span>}
                  {!s.price && <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ color: SLATE }}>{String(i + 1).padStart(2, "0")}</span>}
                </li>
              ))}
            </ul>
          ) : <p style={{ color: SLATE }}>Services coming soon.</p>}
          <div className="mt-12">{btnLemon(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "about_kicker", "Friendly, vetted, spotless", "about_title", "Reliable cleaners you'll be happy to have in your home or office.", "about_blurb")}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-[1.4fr_1fr]">
          <div>
            {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p> : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
            {content.service_areas && content.service_areas.length > 0 && (
              <>
                <h3 style={{ ...display, color: INK }} className="mt-12 text-2xl font-extrabold tracking-tight" {...editCopy(content, "about_areas_heading", "Areas we cover")} />
                <div className="mt-5 flex flex-wrap gap-2">
                  {content.service_areas.map((a) => (
                    <span key={a} className="rounded-full border px-4 py-1.5 text-sm" style={{ borderColor: LINE, color: SLATE }}>{a}</span>
                  ))}
                </div>
              </>
            )}
            <div className="mt-12">{btnLemon(ctaLabel, cta)}</div>
          </div>
          <aside className="h-fit rounded-3xl p-7" style={{ background: SKY }}>
            <h4 style={{ ...display, color: AQUA }} className="text-xs font-extrabold uppercase tracking-[0.18em]" {...editCopy(content, "about_whybook_heading", "Why book us")} />
            <ul className="mt-4 space-y-3 text-sm" style={{ color: INK }}>
              {trust.map((a) => (
                <li key={a} className="flex items-start gap-2.5"><span className="mt-0.5 shrink-0"><SparkleMark color={AQUA} size={14} /></span><span>{a}</span></li>
              ))}
            </ul>
            <div className="mt-7 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-bold transition hover:text-[#19A7A0]" style={{ color: INK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-1 block transition hover:text-[#19A7A0]">{content.email}</a>}
            </div>
          </aside>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in touch", "contact_kicker", "Request a quote", "contact_title", "Tell us what needs cleaning and we'll come back with a fast, no-obligation price.", "contact_blurb")}
        <section className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-extrabold tracking-tight" {...editCopy(content, "contact_heading", "Speak to the team")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#19A7A0]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#19A7A0]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: SLATE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-400">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && <div className="mt-7">{btnOutline("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Request a quote"
                bookingBlurb="Tell us about the job and we'll send a fast, no-obligation price."
                bookingCta="Send request"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: SLATE, label: "#356864", fieldBg: "#ffffff", fieldBorder: "#bfdedb", fieldText: INK, button: AQUA, buttonText: "#ffffff", radius: "1rem", font: "var(--font-space)" }}
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
        {banner("Our work", "gallery_kicker", "Before & after", "gallery_title", "Real homes and offices, transformed. See the sparkle for yourself.", "gallery_blurb")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-6 py-20" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const plans = [
    { name: "Regular clean", blurb: "Weekly or fortnightly visits from the same trusted team.", tag: "Most popular" },
    { name: "One-off clean", blurb: "A deep clean or end-of-tenancy sparkle, exactly when you need it.", tag: "No contract" },
  ];

  return shell(
    <>
      {/* hero — full-bleed aqua, airy, bubbles + sparkle */}
      <section className="relative isolate overflow-hidden" style={{ background: `linear-gradient(155deg, ${AQUA} 0%, #0f8a84 70%, #0c7a74 100%)` }}>
        <Bubbles />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 pb-20 pt-36 sm:pt-40 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div className="text-white">
            <Kicker light>{content.service_areas?.[0] ? `Cleaning across ${content.service_areas[0]}` : "Domestic & commercial cleaning"}</Kicker>
            <h1 style={display} className="mt-5 text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
              <span data-edit="content.tagline" className="block">{content.tagline ?? "A spotless home, every time."}</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-bold uppercase tracking-[0.22em] text-white/80">{name}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
              {btnLemon(ctaLabel, cta)}
              {phone && (
                <a href={`tel:${phone}`} className="inline-flex rounded-full border px-7 py-3.5 text-center text-[13px] font-extrabold uppercase tracking-[0.1em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff5c" }}>Call {phone}</a>
              )}
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/75">
              {trust.slice(0, 4).map((a) => (
                <span key={a} className="flex items-center gap-1.5"><SparkleMark color={LEMON} size={12} />{a}</span>
              ))}
            </div>
          </div>
          <div className="relative">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-[2rem] border-[6px] border-white/70 object-cover shadow-[0_40px_80px_-32px_rgba(12,60,57,0.6)]" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2rem] border-[6px] border-white/70" style={{ background: "linear-gradient(160deg,#7fd6d0,#0f8a84)" }} />
            )}
            <span className="absolute -bottom-5 -left-5 grid h-20 w-20 place-items-center rounded-full shadow-lg" style={{ background: LEMON }}>
              <SparkleMark color={INK} size={30} />
            </span>
          </div>
        </div>
        {/* curved white base for a fresh, bubbly transition */}
        <div className="relative h-10 sm:h-14">
          <div className="absolute inset-x-0 bottom-0 h-16 rounded-t-[50%] bg-white sm:h-24" />
        </div>
      </section>

      {/* trust strip — vetted / insured / guaranteed */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 pb-4 sm:grid-cols-2 lg:grid-cols-4">
          {trust.slice(0, 4).map((t) => (
            <div key={t} className="flex items-center gap-3 rounded-2xl px-5 py-4" style={{ background: SKY }}>
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full" style={{ background: AQUA }}><SparkleMark color="#ffffff" size={16} /></span>
              <span style={{ color: INK }} className="text-sm font-bold leading-tight">{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* what we clean — divider-row list */}
      {services.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 py-24">
          <div className="text-center">
            <Kicker><span {...editCopy(content, "home_clean_kicker", "What we clean")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-5xl" {...editCopy(content, "home_clean_heading", "Every corner, sparkling")} />
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
            {services.slice(0, 8).map((s) => (
              <li key={s.id} className="flex items-start justify-between gap-8 py-6" style={{ borderColor: LINE }}>
                <div className="flex min-w-0 gap-4">
                  <span className="mt-0.5 hidden shrink-0 sm:block"><SparkleMark color={LEMON} size={18} /></span>
                  <div className="min-w-0">
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: INK }} className="text-lg font-extrabold tracking-tight">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: SLATE }}>{s.description}</p>}
                  </div>
                </div>
                {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-extrabold" style={{ color: AQUA }}>{s.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-10 text-center">
            <a href={href("services")} className="text-sm font-extrabold underline-offset-4 hover:underline" style={{ color: AQUA }} {...editCopy(content, "home_clean_link", "See all services →")} />
          </div>
        </section>
      )}

      {/* regular or one-off plan strip */}
      <section style={{ background: SKY }}>
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <Kicker><span {...editCopy(content, "home_plans_kicker", "Regular or one-off")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_plans_heading", "Clean your way")} />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {plans.map((p) => (
              <div key={p.name} className="relative rounded-[1.75rem] bg-white p-8 shadow-[0_24px_60px_-40px_rgba(19,58,58,0.5)]">
                <span className="inline-flex rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.12em]" style={{ background: LEMON, color: INK }}>{p.tag}</span>
                <h3 style={{ ...display, color: INK }} className="mt-4 text-2xl font-extrabold tracking-tight">{p.name}</h3>
                <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SLATE }}>{p.blurb}</p>
                <a href={cta} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold" style={{ color: AQUA }}>{ctaLabel} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker><span {...editCopy(content, "home_about_kicker", "About us")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl" {...editCopy(content, "home_about_heading", "Cleaners you can trust")} />
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-sm font-extrabold" style={{ color: AQUA }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[2rem]" style={{ background: `linear-gradient(160deg,#7fd6d0,${AQUA})` }} />
            )}
            <span className="absolute -right-4 -top-4 grid h-16 w-16 place-items-center rounded-full shadow-lg" style={{ background: LEMON }}><SparkleMark color={INK} size={26} /></span>
          </div>
        </section>
      )}

      {/* work strip — before & after */}
      {gallery.length > 0 && (
        <section style={{ background: SKY }}>
          <div className="mx-auto max-w-7xl px-6 py-24">
            <div className="text-center">
              <Kicker><span {...editCopy(content, "home_work_kicker", "Our work")} /></Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_work_heading", "Before & after")} />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10 text-center">{btnOutline("See more work", href("gallery"))}</div>
          </div>
        </section>
      )}

      {/* areas covered band */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 py-20">
          <div className="rounded-[2rem] px-8 py-12 text-center" style={{ background: AQUA }}>
            <h2 style={display} className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl" {...editCopy(content, "home_areas_heading", "Areas we cover")} />
            <div className="mt-6 flex flex-wrap justify-center gap-2.5">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full px-4 py-1.5 text-sm font-semibold text-white" style={{ background: "#ffffff26" }}>{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: INK }}>
        <Bubbles />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-20 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold leading-[1.05] tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Ready for a sparkling clean?")} />
            <p className="mt-3 text-sm font-semibold uppercase tracking-[0.1em] text-white/65" {...editCopy(content, "cta_sub", "Free, no-obligation quotes.")} />
          </div>
          {btnLemon(phone ? `Call ${phone}` : ctaLabel, phone ? `tel:${phone}` : cta)}
        </div>
      </section>
    </>,
    false,
  );
}
