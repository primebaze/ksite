import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AmplifyHeader } from "./AmplifyHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Amplify — a loud, high-energy creative & digital marketing agency design.
// Rich ink-violet canvas with electric-magenta and vivid-lime accents, oversized
// kinetic display type, bold blocks and a marquee strip as the structural
// signature. Built for brand, growth, campaigns and big ideas — results-led and
// premium. MULTI-PAGE: nav opens real routes (Services / About / Work /
// Contact) under basePath; the sticky transparent-over-hero header + ink footer
// are shared. Deliberately distinct from the buttoned-up professional siblings.

const INK = "#1E1640"; // rich ink-violet page
const INK_DEEP = "#14121C"; // deep charcoal sections
const PANEL = "#271C52"; // lifted ink panel
const MAGENTA = "#F0367A"; // electric magenta accent
const LIME = "#C6F24E"; // vivid lime accent
const OFF = "#F7F5FF"; // off-white text
const MUTE = "#B7AEDC"; // muted lavender body
const display = { fontFamily: "var(--font-space)" } as const;

function Pill({ children, tone = "magenta" }: { children: ReactNode; tone?: "magenta" | "lime" }) {
  const bg = tone === "lime" ? LIME : MAGENTA;
  const fg = tone === "lime" ? INK : OFF;
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-black uppercase tracking-[0.16em]" style={{ background: bg, color: fg }}>
      {children}
    </span>
  );
}

export default function AmplifyDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Free strategy call";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    services.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Work", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const btnMagenta = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[13px] font-black uppercase tracking-[0.08em] transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: MAGENTA, color: OFF }}>
      {label}
    </a>
  );
  const btnLime = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[13px] font-black uppercase tracking-[0.08em] transition hover:brightness-105 ${full ? "block w-full" : "inline-flex"}`} style={{ background: LIME, color: INK }}>
      {label}
    </a>
  );
  const btnGhost = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border-2 px-8 py-4 text-center text-[13px] font-black uppercase tracking-[0.08em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: "rgba(247,245,255,0.28)", color: OFF }}>
      {label}
    </a>
  );

  // Marquee strip — the structural signature: oversized kinetic type that loops.
  const marqueeWords = (() => {
    const base = (content.service_areas && content.service_areas.length > 0)
      ? content.service_areas
      : ["Brand", "Growth", "Campaigns", "Big ideas", "Results"];
    return base;
  })();
  const Marquee = ({ tone = "lime" }: { tone?: "lime" | "magenta" }) => {
    const bg = tone === "lime" ? LIME : MAGENTA;
    const fg = tone === "lime" ? INK : OFF;
    const row = (
      <span className="flex shrink-0 items-center" style={display}>
        {marqueeWords.map((w, i) => (
          <span key={`${w}-${i}`} className="flex items-center">
            <span className="px-6 text-3xl font-black uppercase tracking-[-0.02em] sm:text-4xl">{w}</span>
            <span className="text-2xl">★</span>
          </span>
        ))}
      </span>
    );
    return (
      <div className="overflow-hidden py-4" style={{ background: bg, color: fg }}>
        <div className="flex w-max animate-[amplify-marquee_22s_linear_infinite] whitespace-nowrap">
          {row}
          {row}
        </div>
        <style>{`@keyframes amplify-marquee{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </div>
    );
  };

  const footer = (
    <footer style={{ background: INK_DEEP, borderTop: `2px solid ${MAGENTA}` }}>
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]" style={{ color: OFF }}>
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full text-sm font-black" style={{ background: MAGENTA, color: OFF, ...display }}>{name.trim().charAt(0) || "A"}</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-black uppercase tracking-[-0.02em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: "rgba(247,245,255,0.18)", color: MUTE }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#F0367A] hover:text-white" style={{ border: "1px solid rgba(247,245,255,0.2)", color: "rgba(247,245,255,0.8)" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-black uppercase tracking-[0.2em]" >Agency</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[#C6F24E]">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-black uppercase tracking-[0.2em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#C6F24E]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#C6F24E]">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-black uppercase tracking-[0.2em]">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "rgba(247,245,255,0.4)" }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Mon–Fri, 9–6.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "rgba(247,245,255,0.12)", color: "rgba(247,245,255,0.5)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        {phone && <a href={`tel:${phone}`} className="font-black uppercase tracking-[0.12em] transition hover:text-[#C6F24E]">Call {phone}</a>}
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: INK }} className="min-h-screen font-body" >
      <AmplifyHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: ReactNode) => (
    <section style={{ background: PANEL, borderBottom: `2px solid ${LIME}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Pill tone="lime">{kicker}</Pill>
        <h1 style={display} className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-[-0.03em] sm:text-7xl" >{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES (clean divide-y rows, no cards, no dotted leaders) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we do", <>Our<br /><span style={{ color: MAGENTA }}>services</span></>)}
        <section className="mx-auto max-w-7xl px-8 py-20">
          {services.length > 0 ? (
            <div className="divide-y" style={{ borderColor: "rgba(247,245,255,0.12)" }}>
              {services.map((s, i) => (
                <div key={s.id} className="group grid gap-4 py-9 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8" style={{ borderColor: "rgba(247,245,255,0.12)" }}>
                  <span style={{ ...display, color: LIME }} className="text-2xl font-black tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: OFF }} className="text-2xl font-black uppercase tracking-[-0.02em] transition group-hover:text-[#F0367A] sm:text-3xl">{s.name}</h3>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <p data-edit={`item:${s.id}:price`} className="text-base font-black" style={{ color: LIME }}>{s.price}</p>}
                </div>
              ))}
            </div>
          ) : <p style={{ color: MUTE }}>Services coming soon.</p>}
          <div className="mt-12">{btnMagenta(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", <>Big ideas,<br /><span style={{ color: LIME }}>bigger results</span></>)}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-black uppercase tracking-[0.2em]">Award-winning &amp; certified</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border-2 px-4 py-2 text-[11px] font-black uppercase tracking-[0.12em]" style={{ borderColor: `${MAGENTA}66`, color: OFF }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={display} className="mt-12 text-xs font-black uppercase tracking-[0.2em]" >We work with</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{btnMagenta(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's talk", <>Start a<br /><span style={{ color: MAGENTA }}>project</span></>)}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: OFF }} className="text-3xl font-black uppercase tracking-[-0.02em]" >Book a strategy call</h2>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>Free, no-obligation. Tell us where you want to grow and we&apos;ll bring a plan.</p>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#C6F24E]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#C6F24E]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "rgba(247,245,255,0.16)", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "rgba(247,245,255,0.4)" }}>{h.open}</span></li>
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
                bookingTitle="Start a project"
                bookingBlurb="Tell us about your goals and we'll map the fastest route to growth."
                bookingCta="Book strategy call"
                theme={{ card: PANEL, cardBorder: "rgba(247,245,255,0.14)", heading: OFF, blurb: MUTE, label: "#D6CEF5", fieldBg: INK, fieldBorder: "rgba(247,245,255,0.2)", fieldText: OFF, button: MAGENTA, buttonText: OFF, radius: "999px", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY / WORK (punchy case-study grid) ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Selected work", <>Case<br /><span style={{ color: LIME }}>studies</span></>)}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-8 py-16">
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {gallery.map((g, i) => (
                <figure key={g.id} className="group relative overflow-hidden rounded-3xl" style={{ background: PANEL }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#14121C] to-transparent p-5">
                    <span style={{ ...display, color: OFF }} className="text-base font-black uppercase tracking-[-0.01em]">{g.caption || `Project ${String(i + 1).padStart(2, "0")}`}</span>
                    <span className="text-lg" style={{ color: LIME }}>↗</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Work coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const stats = [
    { k: "3.4×", v: "Avg. ROI" },
    services.length > 0 && { k: `${services.length}+`, v: "Capabilities" },
    content.accreditations && content.accreditations.length > 0 && { k: `${content.accreditations.length}`, v: "Awards" },
    { k: "+180%", v: "Audience growth" },
  ].filter(Boolean).slice(0, 4) as { k: string; v: string }[];

  return shell(
    <>
      {/* hero — oversized kinetic type, bold blocks */}
      <section className="relative isolate overflow-hidden" style={{ background: INK }}>
        {/* bold shapes */}
        <span className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full opacity-30 blur-2xl" style={{ background: MAGENTA }} />
        <span className="pointer-events-none absolute -bottom-32 left-1/3 h-80 w-80 rounded-full opacity-20 blur-2xl" style={{ background: LIME }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
          <Pill tone="lime">{content.service_areas?.[0] ? `Results-driven in ${content.service_areas[0]}` : "Results-driven creative agency"}</Pill>
          <h1 style={display} className="mt-6 max-w-5xl text-6xl font-black uppercase leading-[0.86] tracking-[-0.04em] sm:text-8xl">
            <span style={{ color: OFF }}>We make brands </span>
            <span style={{ color: MAGENTA }}>impossible</span>
            <span style={{ color: OFF }}> to </span>
            <span style={{ color: LIME }}>ignore</span>
          </h1>
          <p data-edit="content.tagline" className="mt-7 max-w-xl text-lg leading-relaxed" style={{ color: MUTE }}>{content.tagline ?? "Brand, growth and campaigns that move the numbers — built by an award-winning, data-led team."}</p>
          <p data-edit="tenant.business_name" className="mt-4 text-sm font-black uppercase tracking-[0.2em]" style={{ color: "rgba(247,245,255,0.55)" }}>{name}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {btnMagenta(ctaLabel, cta)}
            {gallery.length > 0 ? btnGhost("See our work", href("gallery")) : (phone && btnGhost(`Call ${phone}`, `tel:${phone}`))}
          </div>
          {hero && (
            <div className="mt-14 overflow-hidden rounded-[2rem]" style={{ border: `2px solid ${LIME}` }}>
              {content.hero_video_url ? (
                <video src={content.hero_video_url} autoPlay muted loop playsInline className="aspect-[16/7] w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[16/7] w-full object-cover" />
              )}
            </div>
          )}
        </div>
      </section>

      {/* marquee signature */}
      <Marquee tone="lime" />

      {/* results / stats band */}
      <section style={{ background: INK_DEEP }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.v}>
              <p style={{ ...display, color: MAGENTA }} className="text-5xl font-black tracking-[-0.03em] sm:text-6xl">{s.k}</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.16em]" style={{ color: MUTE }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* trusted-by logo wall */}
      {(content.accreditations && content.accreditations.length > 0) || (content.service_areas && content.service_areas.length > 0) ? (
        <section className="mx-auto max-w-7xl px-8 py-16">
          <p className="text-center text-[11px] font-black uppercase tracking-[0.24em]" style={{ color: "rgba(247,245,255,0.5)" }}>Trusted by ambitious brands</p>
          <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-2xl sm:grid-cols-3 lg:grid-cols-6" style={{ background: "rgba(247,245,255,0.12)" }}>
            {(content.accreditations && content.accreditations.length > 0
              ? content.accreditations
              : content.service_areas ?? []
            ).slice(0, 12).map((a) => (
              <div key={a} className="flex items-center justify-center px-4 py-7 text-center text-[13px] font-black uppercase tracking-[0.06em]" style={{ background: INK, color: "rgba(247,245,255,0.78)" }}>{a}</div>
            ))}
          </div>
        </section>
      ) : null}

      {/* about */}
      {content.about && (
        <section style={{ background: PANEL, borderTop: `2px solid ${MAGENTA}`, borderBottom: `2px solid ${MAGENTA}` }}>
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-[auto_1fr] lg:gap-16">
            <div className="lg:pt-2"><Pill>Who we are</Pill></div>
            <div>
              <p data-edit="content.about" style={{ ...display, color: OFF }} className="max-w-3xl text-3xl font-black uppercase leading-[1.05] tracking-[-0.02em] sm:text-4xl">{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-[0.12em]" style={{ color: LIME }}>More about us →</a>
            </div>
          </div>
        </section>
      )}

      {/* what we do — clean divide-y list */}
      {services.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <Pill tone="lime">What we do</Pill>
          <h2 style={{ ...display, color: OFF }} className="mt-5 text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em] sm:text-6xl">Everything you need<br />to grow</h2>
          <div className="mt-12 divide-y" style={{ borderColor: "rgba(247,245,255,0.12)" }}>
            {services.slice(0, 6).map((s, i) => (
              <div key={s.id} className="group grid gap-4 py-8 sm:grid-cols-[auto_1fr_auto] sm:items-baseline sm:gap-8" style={{ borderColor: "rgba(247,245,255,0.12)" }}>
                <span style={{ ...display, color: LIME }} className="text-xl font-black tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 data-edit={`item:${s.id}:name`} style={{ ...display, color: OFF }} className="text-2xl font-black uppercase tracking-[-0.02em] transition group-hover:text-[#F0367A] sm:text-3xl">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                </div>
                {s.price && <p data-edit={`item:${s.id}:price`} className="text-base font-black" style={{ color: LIME }}>{s.price}</p>}
              </div>
            ))}
          </div>
          <div className="mt-12">{btnLime("View all services", href("services"))}</div>
        </section>
      )}

      {/* second marquee */}
      <Marquee tone="magenta" />

      {/* work strip — case studies */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Pill>Selected work</Pill>
              <h2 style={{ ...display, color: OFF }} className="mt-5 text-4xl font-black uppercase tracking-[-0.03em] sm:text-6xl">Recent campaigns</h2>
            </div>
            <a href={href("gallery")} className="text-[13px] font-black uppercase tracking-[0.12em]" style={{ color: LIME }}>All work →</a>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.slice(0, 3).map((g, i) => (
              <figure key={g.id} className="group relative overflow-hidden rounded-3xl" style={{ background: PANEL }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-105" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-[#14121C] to-transparent p-5">
                  <span style={{ ...display, color: OFF }} className="text-base font-black uppercase tracking-[-0.01em]">{g.caption || `Project ${String(i + 1).padStart(2, "0")}`}</span>
                  <span className="text-lg" style={{ color: LIME }}>↗</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {/* strategy-call CTA */}
      <section style={{ background: MAGENTA }}>
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-20 sm:flex-row sm:items-center" style={{ color: OFF }}>
          <div>
            <h2 style={display} className="text-4xl font-black uppercase leading-[0.92] tracking-[-0.03em] sm:text-5xl">Ready to amplify?</h2>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.12em]" style={{ color: "rgba(247,245,255,0.85)" }}>Free strategy call. No pitch decks, just a plan.</p>
          </div>
          <a href={cta} className="inline-flex rounded-full px-9 py-4 text-[13px] font-black uppercase tracking-[0.08em] transition hover:brightness-105" style={{ background: LIME, color: INK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
