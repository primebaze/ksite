import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ReverieHeader } from "./ReverieHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Reverie — a graceful, artistic dance studio (ballet, contemporary, jazz, tap,
// street, little movers). MULTI-PAGE: nav opens real routes (Classes / About /
// Gallery / Contact) under basePath, never scroll anchors. Sticky header + deep
// plum footer shared. Signature: a flowing-ribbon / motion-line motif over a
// dusty-gold ballet-barre rule, on a soft-plum + blush + cream palette with an
// airy Fraunces display voice. The tenant swaps in their own media and copy.

const PLUM = "#4A2E45"; // soft plum — primary surface
const INK = "#241620"; // deep ink — darkest plum
const ROSE = "#E5B7C0"; // blush rose
const CREAM = "#F6EFE9"; // warm cream — light page
const GOLD = "#C8A15A"; // dusty gold accent
const MUTE = "#6f5b66"; // muted plum body on cream
const CREAMMUTE = "#e9dcd6"; // muted cream body on plum
const LINE = "#2416201a"; // hairline on cream

const display = { fontFamily: "var(--font-fraunces)" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Signature flourish: a flowing ribbon / motion line. Rendered in gold on plum
// surfaces and used as a quiet divider throughout the design.
function Ribbon({ color = GOLD, className = "", opacity = 1 }: { color?: string; className?: string; opacity?: number }) {
  return (
    <svg viewBox="0 0 1200 80" preserveAspectRatio="none" fill="none" aria-hidden className={className} style={{ opacity }}>
      <path d="M0 56C150 56 170 18 320 18 470 18 500 62 650 62 800 62 830 22 980 22 1080 22 1130 44 1200 44" stroke={color} strokeWidth="1.5" />
      <path d="M0 40C150 40 170 4 320 4 470 4 500 48 650 48 800 48 830 8 980 8 1080 8 1130 30 1200 30" stroke={color} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

// The dusty-gold ballet-barre rule — a thin rail with two pin caps.
function Barre({ color = GOLD, className = "" }: { color?: string; className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden>
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
      <span className="h-px flex-1" style={{ background: color }} />
      <span className="h-2 w-2 rounded-full" style={{ background: color }} />
    </div>
  );
}

function Kicker({ children, onPlum = false, center = false }: { children: ReactNode; onPlum?: boolean; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.36em] ${center ? "justify-center" : ""}`} style={{ color: onPlum ? GOLD : GOLD }}>
      <span className="h-px w-8" style={{ background: GOLD }} />
      <span style={{ color: onPlum ? ROSE : PLUM }}>{children}</span>
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: "#ffffff",
  cardBorder: LINE,
  heading: PLUM,
  sub: MUTE,
  label: "#8a7681",
  fieldBg: CREAM,
  fieldBorder: "#24162026",
  fieldText: INK,
  button: PLUM,
  buttonText: CREAM,
  radius: "2px",
  font: "var(--font-fraunces)",
  scheme: "light",
};

export default function ReverieDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Book a trial class";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const join = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Classes", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Disciplines band — soft default set, overridden by real class names.
  const disciplineDefaults = ["Ballet", "Contemporary", "Jazz", "Tap", "Street", "Little movers"];
  const disciplines = (classNames.length > 0 ? classNames.slice(0, 6) : disciplineDefaults);

  const footer = (
    <footer style={{ background: PLUM, color: CREAM }}>
      <Ribbon className="h-8 w-full" color={`${GOLD}`} opacity={0.55} />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 pb-16 pt-6 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span aria-hidden className="grid h-9 w-9 place-items-center rounded-full" style={{ border: `1px solid ${GOLD}` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1.4" strokeLinecap="round" aria-hidden><path d="M4 16c4-9 12-9 16 0M4 8c4 9 12 9 16 0" /></svg>
            </span>
            <span data-edit="tenant.business_name" style={display} className="text-xl tracking-[0.12em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: CREAMMUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full transition hover:text-white" style={{ border: `1px solid ${GOLD}55`, color: ROSE }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ color: ROSE }} className="text-[11px] uppercase tracking-[0.24em]">Studio</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: CREAMMUTE }}>
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
          <h4 style={{ color: ROSE }} className="text-[11px] uppercase tracking-[0.24em]">Visit</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: CREAMMUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ color: ROSE }} className="text-[11px] uppercase tracking-[0.24em]">Studio hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: CREAMMUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${CREAM}88` }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: CREAMMUTE }}>Open through the week.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-8 py-7 text-xs sm:flex-row" style={{ borderTop: `1px solid ${GOLD}33`, color: `${CREAM}77` }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.2em] transition hover:text-white">Begin your first class</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <ReverieHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PLUM, color: CREAM }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full opacity-20 blur-3xl" style={{ background: ROSE }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-36 sm:pt-44">
        <Kicker onPlum>{kicker}</Kicker>
        <h1 style={display} className="mt-5 max-w-3xl text-5xl leading-[1.02] tracking-[-0.01em] sm:text-7xl">{title}</h1>
        <Barre className="mt-8 max-w-xs" />
      </div>
    </section>
  );

  // ---- CLASSES / TIMETABLE ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our classes", "Studio & timetable")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 style={{ ...display, color: PLUM }} className="mb-6 text-2xl tracking-[-0.01em]">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p className="mb-3 text-[11px] uppercase tracking-[0.28em]" style={{ color: GOLD }}>{catg.category}</p>
                      )}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-lg" style={{ ...display, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm" style={{ color: GOLD }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <a href={join} className="inline-flex rounded-full px-10 py-4 text-[12px] uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: PLUM, color: CREAM }}>{ctaLabel}</a>
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
        {banner("Our studio", "Where movement becomes art")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <Barre className="mt-12 max-w-sm" />
          <div className="mt-10">
            <a href={join} className="inline-flex rounded-full px-10 py-4 text-[12px] uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: PLUM, color: CREAM }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In the studio", "Moments in motion")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-3 py-14 sm:px-6">
            <div className="columns-2 gap-3 sm:columns-3 [&>*]:mb-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full rounded-sm object-cover" />
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
        {banner("Join us", "Book your first class")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: PLUM }} className="text-2xl tracking-[-0.01em]">Visit the studio</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#4A2E45]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#4A2E45]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 pt-6 text-sm" style={{ borderTop: `1px solid ${LINE}`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: GOLD }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${PLUM}`, color: PLUM }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a class" sub="Share a date and discipline and we'll confirm your place at the barre." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about classes, ages or recitals? We'd love to hear from you."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: LINE, heading: PLUM, blurb: MUTE, label: "#8a7681", fieldBg: CREAM, fieldBorder: "#24162026", fieldText: INK, button: PLUM, buttonText: CREAM, radius: "2px", font: "var(--font-fraunces)" }}
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
      {/* hero — flowing plum/blush with ribbon + barre signature */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden" style={{ background: PLUM }}>
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(120% 90% at 80% 10%, ${ROSE}33 0%, transparent 55%), linear-gradient(135deg, ${PLUM} 0%, ${INK} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(100deg, ${INK}E6 0%, ${PLUM}99 45%, ${PLUM}40 100%)` }} />
        {/* signature ribbon, drifting behind the headline */}
        <Ribbon className="pointer-events-none absolute left-0 top-[30%] h-40 w-full" color={GOLD} opacity={0.35} />
        <Ribbon className="pointer-events-none absolute left-0 top-[52%] h-48 w-full" color={ROSE} opacity={0.3} />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker onPlum>{content.tagline || "Ballet · Contemporary · All styles"}</Kicker>
          <h1 style={display} className="mt-6 max-w-4xl text-6xl leading-[0.98] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.4)] sm:text-8xl">
            Move with grace
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]" style={{ color: ROSE }}>
            <span data-edit="tenant.business_name">{name}</span> — where movement becomes art.
          </p>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-lg text-base leading-relaxed" style={{ color: CREAMMUTE }}>{content.tagline}</p>}
          <Barre className="mt-9 max-w-sm" />
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={join} className="rounded-full px-9 py-4 text-center text-[12px] uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: GOLD, color: INK }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="rounded-full px-9 py-4 text-center text-[12px] uppercase tracking-[0.22em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ border: `1px solid ${CREAM}66` }}>Explore classes</a>
            )}
          </div>
        </div>
      </section>

      {/* disciplines band — for every age & stage */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto max-w-7xl px-8 py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>For every age &amp; stage</Kicker>
              <h2 style={{ ...display, color: PLUM }} className="mt-4 max-w-2xl text-3xl leading-[1.05] tracking-[-0.01em] sm:text-4xl">From little movers to pointe — a home for every dancer.</h2>
            </div>
          </div>
          <ul className="mt-10 grid grid-cols-2 gap-x-8 gap-y-0 sm:grid-cols-3">
            {disciplines.map((d, i) => (
              <li key={`${d}-${i}`} className="flex items-center gap-4 border-b py-5" style={{ borderColor: LINE }}>
                <span style={{ ...display, color: GOLD }} className="text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <span style={{ ...display, color: INK }} className="text-lg">{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* about — image left, copy right, on plum */}
      {(content.about || gallery[0]) && (
        <section style={{ background: PLUM, color: CREAM }} className="relative overflow-hidden">
          <Ribbon className="pointer-events-none absolute left-0 top-0 h-24 w-full" color={GOLD} opacity={0.4} />
          <div className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
            <div className="relative order-2 lg:order-1">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-sm object-cover" />
              ) : (
                <div className="aspect-[4/5] w-full rounded-sm" style={{ background: INK, border: `1px solid ${GOLD}33` }} />
              )}
              <span className="pointer-events-none absolute -bottom-3 -right-3 h-24 w-24 rounded-br-[2rem] border-b border-r" style={{ borderColor: GOLD }} />
            </div>
            <div className="order-1 lg:order-2">
              <Kicker onPlum>Our studio</Kicker>
              <h2 style={{ ...display, color: CREAM }} className="mt-4 text-4xl leading-[1.04] tracking-[-0.01em] sm:text-5xl">Technique, expression &amp; joy</h2>
              {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: CREAMMUTE }}>{content.about}</p>}
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Our story →</a>
            </div>
          </div>
        </section>
      )}

      {/* classes preview — clean divider rows */}
      {featured.length > 0 && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>Our classes</Kicker>
                <h2 style={{ ...display, color: PLUM }} className="mt-4 text-4xl tracking-[-0.01em] sm:text-5xl">Find your class</h2>
              </div>
              <a href={href("services")} className="text-[12px] uppercase tracking-[0.2em] transition hover:opacity-70" style={{ color: GOLD }}>View timetable →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-lg" style={{ ...display, color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm" style={{ color: GOLD }}>{item.price}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* recital / performance band */}
      <section style={{ background: ROSE }}>
        <div className="mx-auto max-w-5xl px-8 py-20 text-center">
          <Kicker center>On stage</Kicker>
          <h2 style={{ ...display, color: INK }} className="mx-auto mt-4 max-w-2xl text-3xl leading-[1.06] tracking-[-0.01em] sm:text-5xl">From the barre to the spotlight — our annual recital.</h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed" style={{ color: PLUM }}>Every dancer takes the stage. Costumes, choreography and a season of progress, performed for family and friends.</p>
          <Barre className="mx-auto mt-9 max-w-xs" color={PLUM} />
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: CREAM }} className="py-24">
          <div className="mx-auto max-w-7xl px-8">
            <Kicker>In the studio</Kicker>
            <h2 style={{ ...display, color: PLUM }} className="mt-4 max-w-2xl text-3xl leading-[1.05] tracking-[-0.01em] sm:text-4xl">Light, line and quiet effort</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 px-3 sm:grid-cols-4 sm:px-6">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full rounded-sm object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8">
            <a href={href("gallery")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${PLUM}`, color: PLUM }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA — join / trial */}
      <section style={{ background: PLUM, color: CREAM }} className="relative overflow-hidden">
        <Ribbon className="pointer-events-none absolute left-0 top-0 h-20 w-full" color={GOLD} opacity={0.45} />
        <div className="mx-auto max-w-4xl px-8 py-24 text-center">
          <Kicker onPlum center>Begin</Kicker>
          <h2 className="mt-4 text-4xl leading-[1.04] tracking-[-0.01em] sm:text-6xl" style={{ ...display, color: CREAM }}>Your first class is on us.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: CREAMMUTE }}>No experience needed — just curiosity. Book a trial and find your place at the barre.</p>
          <a href={join} className="mt-9 inline-flex rounded-full px-12 py-4 text-[12px] uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: GOLD, color: INK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
