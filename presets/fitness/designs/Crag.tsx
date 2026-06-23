import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CSSProperties, ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CragHeader } from "./CragHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Crag — vibrant indoor climbing & bouldering gym design. MULTI-PAGE: nav opens
// real routes (Climb / About / Gallery / Contact) under basePath, never scroll
// anchors. Each page is its own layout; the transparent-over-hero header and the
// slate footer are shared. Palette baked (slate-charcoal / chalk white with
// vivid climbing-hold accents — orange / teal / magenta). Signature: colourful
// climbing holds scattered as accents plus V0–V8 grade tags; bold vertical hero.
// The tenant swaps in their own media, areas, classes, hours and copy.

const SLATE = "#21262B"; // slate-charcoal page
const PANEL = "#2A3036"; // lifted slate panel
const DEEP = "#1A1E22"; // deeper slate band
const CHALK = "#F2F0EA"; // chalk white text
const MUTE = "#A4ABB2"; // muted body
const LINE = "#ffffff14"; // hairline
const ORANGE = "#F2762E"; // hold-orange
const TEAL = "#19A7A0"; // hold-teal
const MAGENTA = "#D6457E"; // hold-magenta

const HOLDS = [ORANGE, TEAL, MAGENTA] as const;
const hold = (i: number) => HOLDS[i % HOLDS.length];

const display = { fontFamily: "var(--font-space)" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// the climbing-hold signature: a small rounded blob accent
function Hold({ color, size = 14, style }: { color: string; size?: number; style?: CSSProperties }) {
  return (
    <span
      aria-hidden
      className="inline-block shrink-0"
      style={{ width: size, height: size, background: color, borderRadius: "42% 58% 60% 40% / 55% 45% 55% 45%", ...style }}
    />
  );
}

// a grade tag like V0–V8 used as the route-marker motif
function Grade({ label, color }: { label: string; color: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ background: `${color}1f`, color, border: `1px solid ${color}55` }}>
      <Hold color={color} size={8} />
      {label}
    </span>
  );
}

function Kicker({ children, color = ORANGE }: { children: ReactNode; color?: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.28em]" style={{ color }}>
      <Hold color={color} size={11} />
      {children}
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: PANEL,
  cardBorder: "#ffffff1f",
  heading: CHALK,
  sub: MUTE,
  label: "#c6ccd2",
  fieldBg: "#171B1F",
  fieldBorder: "#ffffff26",
  fieldText: CHALK,
  button: ORANGE,
  buttonText: SLATE,
  radius: "14px",
  font: "var(--font-space)",
  scheme: "dark",
};

const GRADES = ["V0", "V1", "V2", "V3", "V4", "V5", "V6", "V7", "V8"];

export default function CragDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Climb with us";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const join = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Climb", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // signature "what's here" areas list
  const areas = [
    { t: "Bouldering", d: "Hundreds of problems reset weekly across every grade." },
    { t: "Top rope & lead", d: "Tall walls, auto-locking belays and lead-certified routes." },
    { t: "Auto-belays", d: "Climb solo any time — no partner needed to send." },
    { t: "Classes & coaching", d: "Technique, movement and strength sessions for all levels." },
    { t: "Kids & youth", d: "After-school clubs, holiday camps and youth squad." },
    { t: "Memberships", d: "Flexible monthly passes, punch cards and day tickets." },
  ];

  const footer = (
    <footer style={{ background: DEEP }} className="text-white">
      <div className="h-[3px] w-full" style={{ background: `linear-gradient(90deg, ${ORANGE} 0 33%, ${TEAL} 33% 66%, ${MAGENTA} 66% 100%)` }} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black" style={{ background: ORANGE, color: SLATE }}>{name.trim().charAt(0).toUpperCase() || "C"}</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.12em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            {GRADES.slice(0, 5).map((g, i) => <Grade key={g} label={g} color={hold(i)} />)}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s, i) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/75 transition hover:text-white" style={{ border: `1px solid ${hold(i)}66` }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ color: CHALK }} className="text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "footer_climb", "Climb")} />
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "Sessions & passes", href: href("services") },
              content.about && { label: "About the gym", href: href("about") },
              gallery.length > 0 && { label: "Our walls", href: href("gallery") },
              { label: ctaLabel, href: join },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: CHALK }} className="text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "footer_findus", "Find us")} />
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ color: CHALK }} className="text-xs font-bold uppercase tracking-[0.2em]" {...editCopy(content, "footer_hours", "Opening hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: LINE, color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={join} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Book your first climb</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: SLATE }} className="min-h-screen font-body">
      <CragHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, color = ORANGE) => (
    <section style={{ background: PANEL }} className="relative overflow-hidden">
      <span aria-hidden className="pointer-events-none absolute right-10 top-28 h-24 w-24 opacity-30" style={{ background: TEAL, borderRadius: "42% 58% 60% 40% / 55% 45% 55% 45%" }} />
      <span aria-hidden className="pointer-events-none absolute right-44 top-48 h-14 w-14 opacity-25" style={{ background: MAGENTA, borderRadius: "55% 45% 45% 55% / 45% 55% 45% 55%" }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker color={color}>{kicker}</Kicker>
        <h1 style={{ ...display, color: CHALK }} className="mt-4 text-5xl font-extrabold uppercase leading-[0.9] tracking-[-0.01em] sm:text-7xl">{title}</h1>
      </div>
    </section>
  );

  // catalog list as clean divider rows with a hold marker + cycling colour
  const catalogList = (items: { id: string; name: string; description?: string | null; price?: string | null }[]) => (
    <ul className="divide-y" style={{ borderColor: LINE }}>
      {items.map((item, i) => (
        <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
          <div className="flex min-w-0 items-baseline gap-3">
            <Hold color={hold(i)} size={11} style={{ transform: "translateY(1px)" }} />
            <div className="min-w-0">
              <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: CHALK }}>{item.name}</p>
              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
            </div>
          </div>
          {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: hold(i) }}>{item.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---- CLIMB / CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Sessions & passes", "Find Your Next Route")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: ORANGE }} className="mb-6 text-2xl font-extrabold uppercase tracking-[0.02em]">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: MUTE }}>{catg.category}</p>
                      )}
                      {catalogList(catg.items)}
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <a href={join} className="inline-flex rounded-full px-10 py-4 text-xs font-extrabold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: ORANGE, color: SLATE }}>{ctaLabel}</a>
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
        {banner("Who we are", "All Levels. One Crew.", TEAL)}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <div className="mb-10 flex flex-wrap gap-2">
            {GRADES.map((g, i) => <Grade key={g} label={g} color={hold(i)} />)}
          </div>
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={join} className="inline-flex rounded-full px-10 py-4 text-xs font-extrabold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: ORANGE, color: SLATE }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
      true,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Our walls", "Send It", MAGENTA)}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
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
        {banner("Get started", "Drop In & Climb", TEAL)}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: CHALK }} className="text-2xl font-bold uppercase tracking-[0.02em]" {...editCopy(content, "contact_heading", "Find the gym")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${TEAL}`, color: TEAL }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a session" sub="Tell us when works and we'll confirm your first climb." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about day passes, memberships or kit hire? We'll get back to you."
                contactCta="Send message"
                theme={{ card: PANEL, cardBorder: "#ffffff1f", heading: CHALK, blurb: MUTE, label: "#c6ccd2", fieldBg: "#171B1F", fieldBorder: "#ffffff26", fieldText: CHALK, button: ORANGE, buttonText: SLATE, radius: "14px", font: "var(--font-space)" }}
              />
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  return shell(
    <>
      {/* hero — bold, vertical, energetic slate */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#2A3036,#21262B 55%,#1A1E22)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(110deg, rgba(26,30,34,0.94) 0%, rgba(26,30,34,0.7) 48%, rgba(26,30,34,0.4) 100%)" }} />
        {/* scattered climbing-hold accents — the signature */}
        <span aria-hidden className="pointer-events-none absolute right-[12%] top-[18%] h-16 w-16 opacity-80" style={{ background: ORANGE, borderRadius: "42% 58% 60% 40% / 55% 45% 55% 45%" }} />
        <span aria-hidden className="pointer-events-none absolute right-[28%] top-[42%] h-10 w-10 opacity-75" style={{ background: TEAL, borderRadius: "55% 45% 45% 55% / 45% 55% 45% 55%" }} />
        <span aria-hidden className="pointer-events-none absolute right-[18%] bottom-[16%] h-12 w-12 opacity-70" style={{ background: MAGENTA, borderRadius: "48% 52% 55% 45% / 52% 48% 52% 48%" }} />
        <span aria-hidden className="pointer-events-none absolute right-[40%] bottom-[28%] h-7 w-7 opacity-70" style={{ background: ORANGE, borderRadius: "55% 45% 50% 50% / 50% 55% 45% 50%" }} />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker>{content.tagline ? "Indoor climbing · Bouldering" : "Indoor climbing · Bouldering · All levels"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-6xl font-extrabold uppercase leading-[0.86] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl">
            Find your<br />next route<span style={{ color: ORANGE }}>.</span>
          </h1>
          <p className="mt-5 text-sm font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }}>
            <span data-edit="tenant.business_name">{name}</span>
          </p>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-lg text-lg leading-relaxed text-white/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
          {/* grade tags row */}
          <div className="mt-7 flex flex-wrap gap-2">
            {GRADES.slice(0, 6).map((g, i) => <Grade key={g} label={g} color={hold(i)} />)}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={join} className="rounded-full px-9 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: ORANGE, color: SLATE }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="rounded-full px-9 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.5)" }} {...editCopy(content, "hero_sessions_cta", "See sessions")} />
            )}
          </div>
        </div>
      </section>

      {/* what's here — areas list */}
      <section style={{ background: DEEP }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <Kicker color={TEAL}><span {...editCopy(content, "home_areas_kicker", "What's here")} /></Kicker>
          <h2 style={{ ...display, color: CHALK }} className="mt-4 max-w-2xl text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl" {...editCopy(content, "home_areas_heading", "Everything to send your best")} />
          <div className="mt-12 grid gap-px overflow-hidden rounded-3xl sm:grid-cols-2 lg:grid-cols-3" style={{ background: LINE }}>
            {areas.map((a, i) => (
              <div key={a.t} className="p-8" style={{ background: PANEL }}>
                <div className="flex items-center gap-3">
                  <Hold color={hold(i)} size={18} />
                  <h3 style={{ ...display, color: CHALK }} className="text-lg font-extrabold uppercase tracking-[0.02em]">{a.t}</h3>
                </div>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTE }}>{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* grades / levels band */}
      <section style={{ background: ORANGE }}>
        <div className="mx-auto max-w-7xl px-8 py-12">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <h2 style={{ ...display, color: SLATE }} className="max-w-md text-2xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-3xl" {...editCopy(content, "home_grades_heading", "From your first V0 to project sends")} />
            <div className="flex flex-wrap gap-2">
              {GRADES.map((g) => (
                <span key={g} className="inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-extrabold uppercase tracking-[0.1em]" style={{ background: SLATE, color: CHALK }}>{g}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* about — copy left, image right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker color={MAGENTA}><span {...editCopy(content, "home_about_kicker", "Who we are")} /></Kicker>
            <h2 style={{ ...display, color: CHALK }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl" {...editCopy(content, "home_about_heading", "All levels. One crew.")} />
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: TEAL }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-3xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-3xl" style={{ background: PANEL, border: `1px solid ${LINE}` }} />
            )}
            <span aria-hidden className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16" style={{ background: MAGENTA, borderRadius: "42% 58% 60% 40% / 55% 45% 55% 45%" }} />
            <span aria-hidden className="pointer-events-none absolute -right-3 -top-3 h-10 w-10" style={{ background: TEAL, borderRadius: "55% 45% 45% 55% / 45% 55% 45% 55%" }} />
          </div>
        </section>
      )}

      {/* sessions preview — clean divider row list */}
      {featured.length > 0 && (
        <section style={{ background: DEEP, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker><span {...editCopy(content, "home_sessions_kicker", "Sessions & passes")} /></Kicker>
                <h2 style={{ ...display, color: CHALK }} className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.01em] sm:text-5xl" {...editCopy(content, "home_sessions_heading", "Pick your way up")} />
              </div>
              <a href={href("services")} className="text-[12px] font-bold uppercase tracking-[0.18em] transition hover:text-white" style={{ color: ORANGE }} {...editCopy(content, "home_sessions_link", "View all →")} />
            </div>
            <div className="mt-12">{catalogList(featured)}</div>
          </div>
        </section>
      )}

      {/* community / sessions angle */}
      <section className="mx-auto max-w-7xl px-8 py-24">
        <div className="grid gap-px overflow-hidden rounded-3xl sm:grid-cols-3" style={{ background: LINE }}>
          {[
            { c: ORANGE, t: "Community climbs", d: "Weekly socials, comps and partner-finder nights — show up solo, leave with a crew." },
            { c: TEAL, t: "Coaching for all", d: "From never-ever intros to movement clinics that level up your sends." },
            { c: MAGENTA, t: "Open every day", d: "Auto-belays and bouldering whenever you need to chalk up and climb." },
          ].map((b) => (
            <div key={b.t} className="p-9" style={{ background: PANEL }}>
              <Hold color={b.c} size={22} />
              <h3 style={{ ...display, color: CHALK }} className="mt-5 text-xl font-extrabold uppercase tracking-[0.02em]">{b.t}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: MUTE }}>{b.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: DEEP }} className="py-24">
          <div className="mx-auto max-w-7xl px-8">
            <Kicker color={MAGENTA}><span {...editCopy(content, "home_gallery_kicker", "Our walls")} /></Kicker>
            <h2 style={{ ...display, color: CHALK }} className="mt-4 max-w-2xl text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-4xl" {...editCopy(content, "home_gallery_heading", "Chalk, colour and a wall for every grade")} />
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8">
            <a href={href("gallery")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${MAGENTA}`, color: MAGENTA }} {...editCopy(content, "home_gallery_cta", "View gallery")} />
          </div>
        </section>
      )}

      {/* join CTA */}
      <section className="relative overflow-hidden" style={{ background: TEAL }}>
        <span aria-hidden className="pointer-events-none absolute left-[8%] top-8 h-16 w-16 opacity-40" style={{ background: SLATE, borderRadius: "42% 58% 60% 40% / 55% 45% 55% 45%" }} />
        <span aria-hidden className="pointer-events-none absolute right-[10%] bottom-8 h-12 w-12 opacity-40" style={{ background: MAGENTA, borderRadius: "55% 45% 45% 55% / 45% 55% 45% 55%" }} />
        <div className="relative mx-auto max-w-4xl px-8 py-20 text-center">
          <h2 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl" style={{ ...display, color: SLATE }}>Your first climb is on us.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed" style={{ color: "#0f3b39" }}>No experience needed — every wall scales. Grab a day pass, chalk up and find your next route.</p>
          <a href={join} className="mt-8 inline-flex rounded-full px-12 py-4 text-[12px] font-extrabold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: SLATE }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
