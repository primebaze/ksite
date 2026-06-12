import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { DojoHeader } from "./DojoHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Dojo — a disciplined, premium martial-arts academy (karate, BJJ, kickboxing,
// MMA). MULTI-PAGE: nav opens real routes (Classes / About / Gallery / Contact)
// under basePath, never scroll anchors. Sticky header + ink footer shared.
// Identity: ink-black + rice-paper + disciplined crimson + warm bamboo gold,
// a single calligraphic enso (brush circle) and a belt-rank stripe as the
// signature motif. Serif display (Fraunces) for a respected, calm-but-powerful
// register — distinct from the condensed gritty siblings.

const INK = "#14110F"; // ink-black page
const PANEL = "#2A2724"; // charcoal panel
const RICE = "#F2EDE3"; // rice-paper text / light surfaces
const CRIMSON = "#B5292B"; // disciplined crimson accent
const GOLD = "#C2A24A"; // warm bamboo gold
const MUTE = "#9A9189"; // muted body on dark
const INK_MUTE = "#6E665E"; // muted body on rice paper

const serif = { fontFamily: "var(--font-fraunces)" } as const;

// Belt-rank progression — the signature colour stripe used across the site.
const BELTS = ["#F2EDE3", "#C2A24A", "#7A8C3F", "#3F6BB0", "#7B4A26", "#14110F", "#B5292B"];

function BeltStripe({ className = "", height = 4 }: { className?: string; height?: number }) {
  return (
    <div className={`flex w-full overflow-hidden ${className}`} style={{ height }} aria-hidden>
      {BELTS.map((c) => (
        <span key={c} className="h-full flex-1" style={{ background: c }} />
      ))}
    </div>
  );
}

// Single calligraphic brush circle (enso) — the calm martial centrepiece.
function Enso({ size = 280, stroke = CRIMSON, className = "" }: { size?: number; stroke?: string; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" className={className} aria-hidden>
      <path
        d="M70 22 C56 12 38 12 27 23 C13 36 13 62 28 75 C44 89 70 86 82 70 C90 59 90 44 81 34"
        stroke={stroke}
        strokeWidth="5.5"
        strokeLinecap="round"
        style={{ strokeDasharray: "0.5 5", opacity: 0.18 }}
      />
      <path
        d="M70 22 C56 12 38 12 27 23 C13 36 13 62 28 75 C44 89 70 86 82 70 C90 59 90 44 81 34"
        stroke={stroke}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function Kicker({ children, color = CRIMSON }: { children: ReactNode; color?: string }) {
  return (
    <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.32em]" style={{ color }}>
      <span className="h-px w-8" style={{ background: color }} />
      {children}
    </p>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

const bookingSkin: BookingSkin = {
  card: RICE,
  cardBorder: "#14110F1f",
  heading: INK,
  sub: INK_MUTE,
  label: "#5a5048",
  fieldBg: "#ffffff",
  fieldBorder: "#14110F26",
  fieldText: INK,
  button: CRIMSON,
  buttonText: RICE,
  radius: "0",
  font: "var(--font-fraunces)",
  scheme: "light",
};

const VALUES = [
  { jp: "礼", k: "Respect", d: "Every class opens and closes with a bow. Respect for the art, the instructor and each other is the first lesson on the mat." },
  { jp: "鍛", k: "Discipline", d: "Progress is earned one repetition at a time. We build the habits and focus that carry far beyond training." },
  { jp: "信", k: "Confidence", d: "Real skill builds quiet self-belief. Students leave standing taller — calm, capable and ready for anything." },
];

export default function DojoDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Free trial class";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const join = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Classes", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK, color: RICE }}>
      <BeltStripe height={4} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3.5">
            <span className="relative grid h-10 w-10 place-items-center">
              <span className="absolute inset-0 rounded-full" style={{ border: `2px solid ${CRIMSON}` }} />
              <span className="text-[15px] font-semibold" style={{ ...serif, color: RICE }}>{name.trim().charAt(0).toUpperCase() || "道"}</span>
            </span>
            <span data-edit="tenant.business_name" style={serif} className="text-xl font-semibold tracking-[0.1em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full transition hover:text-white" style={{ border: `1px solid ${GOLD}55`, color: MUTE }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ color: GOLD }} className="text-[11px] font-bold uppercase tracking-[0.24em]">Train</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "Classes", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              { label: ctaLabel, href: join },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: GOLD }} className="text-[11px] font-bold uppercase tracking-[0.24em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ color: GOLD }} className="text-[11px] font-bold uppercase tracking-[0.24em]">Mat Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${RICE}66` }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: `${RICE}66` }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="font-semibold uppercase tracking-[0.18em] transition hover:text-white">Book your free trial</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: INK }} className="min-h-screen font-body">
      <DojoHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Page banner — rice-paper field with a faint enso, crimson kicker, belt foot.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: RICE }}>
      <Enso size={420} stroke={INK} className="pointer-events-none absolute -right-20 -top-16 opacity-[0.05]" />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-5 text-5xl font-semibold leading-[1.02] tracking-[-0.01em] sm:text-7xl">{title}</h1>
      </div>
      <BeltStripe height={4} />
    </section>
  );

  // ---- CLASSES / TIMETABLE ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we teach", "Classes & Memberships")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 style={{ ...serif, color: CRIMSON }} className="mb-6 text-2xl font-semibold tracking-[0.01em]">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: GOLD }}>{catg.category}</p>
                      )}
                      <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-lg font-semibold" style={{ ...serif, color: RICE }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: GOLD }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <a href={join} className="inline-flex px-10 py-4 text-[11px] font-bold uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: CRIMSON, color: RICE }}>{ctaLabel}</a>
              </div>
            </div>
          ) : <p style={{ color: MUTE }}>Our timetable is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our way", "Train With Purpose")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={join} className="inline-flex px-10 py-4 text-[11px] font-bold uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: CRIMSON, color: RICE }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("On the mat", "Inside The Dojo")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Begin", "Step Onto The Mat")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: RICE }} className="text-2xl font-semibold tracking-[0.01em]">Find the academy</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff14", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${RICE}66` }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a free trial" sub="Tell us when works and we'll confirm your first class on the mat." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about classes, gradings or kids programmes? We'll get back to you."
                contactCta="Send message"
                theme={{ card: RICE, cardBorder: "#14110F1f", heading: INK, blurb: INK_MUTE, label: "#5a5048", fieldBg: "#ffffff", fieldBorder: "#14110F26", fieldText: INK, button: CRIMSON, buttonText: RICE, radius: "0", font: "var(--font-fraunces)" }}
              />
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  const stats = [
    { k: classNames.length ? `${classNames.length}` : "6", v: "Disciplines taught" },
    { k: "All", v: "Ages & levels" },
    { k: "礼", v: "Respect first" },
  ];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "radial-gradient(120% 90% at 75% 15%, #221c17 0%, #14110F 60%)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(20,17,15,0.94) 0%, rgba(20,17,15,0.6) 50%, rgba(20,17,15,0.3) 100%)" }} />
        <Enso size={520} stroke={CRIMSON} className="pointer-events-none absolute -right-24 top-1/2 hidden -translate-y-1/2 opacity-[0.22] lg:block" />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker color={GOLD}>{content.tagline || "Karate · Jiu-Jitsu · Kickboxing · MMA"}</Kicker>
          <p className="mt-6 text-[13px] font-bold uppercase tracking-[0.42em]" style={{ color: `${RICE}cc` }}>Discipline · Respect · Confidence</p>
          <h1 style={serif} className="mt-4 max-w-3xl text-6xl font-semibold leading-[0.98] tracking-[-0.015em] [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl" >
            <span data-edit="tenant.business_name" style={{ color: RICE }}>{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-6 max-w-lg text-lg leading-relaxed [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]" style={{ color: `${RICE}cc` }}>{content.tagline}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={join} className="px-9 py-4 text-center text-[11px] font-bold uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: CRIMSON, color: RICE }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="px-9 py-4 text-center text-[11px] font-bold uppercase tracking-[0.24em] backdrop-blur-sm transition hover:bg-white/10" style={{ border: `1px solid ${GOLD}99`, color: RICE }}>See the classes</a>
            )}
          </div>
        </div>
        <div className="relative z-10"><BeltStripe height={5} /></div>
      </section>

      {/* values band — respect / discipline / confidence */}
      <section style={{ background: RICE }}>
        <div className="mx-auto max-w-7xl px-8 py-20">
          <div className="grid gap-10 sm:grid-cols-3">
            {VALUES.map((v) => (
              <div key={v.k} className="text-center">
                <p className="text-4xl" style={{ ...serif, color: CRIMSON }}>{v.jp}</p>
                <h3 className="mt-4 text-xl font-semibold tracking-[0.04em]" style={{ ...serif, color: INK }}>{v.k}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed" style={{ color: INK_MUTE }}>{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stat strip */}
      <section style={{ background: PANEL }}>
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x px-8 py-10" style={{ borderColor: "#ffffff14" }}>
          {stats.map((s) => (
            <div key={s.v} className="px-4 text-center">
              <p style={{ ...serif, color: GOLD }} className="text-3xl font-semibold sm:text-4xl">{s.k}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: MUTE }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about — copy left, image right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Our way</Kicker>
            <h2 style={{ ...serif, color: RICE }} className="mt-4 text-4xl font-semibold leading-[1.02] tracking-[-0.01em] sm:text-5xl">Train with purpose.</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: GOLD }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="grid aspect-[4/3] w-full place-items-center" style={{ background: PANEL, border: "1px solid #ffffff14" }}>
                <Enso size={200} stroke={GOLD} className="opacity-30" />
              </div>
            )}
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-20 w-20 border-b-2 border-l-2" style={{ borderColor: CRIMSON }} />
          </div>
        </section>
      )}

      {/* classes preview — clean divider row list */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff14", borderBottom: "1px solid #ffffff14" }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>What we teach</Kicker>
                <h2 style={{ ...serif, color: RICE }} className="mt-4 text-4xl font-semibold tracking-[-0.01em] sm:text-5xl">Classes & Memberships</h2>
              </div>
              <a href={href("services")} className="text-[11px] font-bold uppercase tracking-[0.2em] transition hover:text-white" style={{ color: GOLD }}>View all →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: "#ffffff14" }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-lg font-semibold" style={{ ...serif, color: RICE }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: GOLD }}>{item.price}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-8">
            <Kicker>On the mat</Kicker>
            <h2 style={{ ...serif, color: RICE }} className="mt-4 max-w-2xl text-3xl font-semibold leading-[1.02] tracking-[-0.01em] sm:text-4xl">Technique, focus and a family that trains together</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8">
            <a href={href("gallery")} className="inline-flex px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${GOLD}`, color: GOLD }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA — rice paper with enso + belt */}
      <section className="relative overflow-hidden" style={{ background: RICE }}>
        <Enso size={460} stroke={CRIMSON} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.07]" />
        <BeltStripe height={4} />
        <div className="relative mx-auto max-w-4xl px-8 py-24 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.4em]" style={{ color: CRIMSON }}>All ages · No experience needed</p>
          <h2 className="mt-5 text-4xl font-semibold leading-[1.04] tracking-[-0.01em] sm:text-6xl" style={{ ...serif, color: INK }}>Your first class is free.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: INK_MUTE }}>Step onto the mat, meet the instructors and find out what training with purpose feels like — for kids, teens and adults alike.</p>
          <a href={join} className="mt-8 inline-flex px-12 py-4 text-[11px] font-bold uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: CRIMSON, color: RICE }}>{ctaLabel}</a>
        </div>
        <BeltStripe height={4} />
      </section>
    </>,
    false,
  );
}
