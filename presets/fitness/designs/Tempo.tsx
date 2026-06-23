import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { TempoHeader } from "./TempoHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Tempo — high-energy boutique indoor-cycling / HIIT studio design.
// MULTI-PAGE: nav opens real routes (Rides / About / Gallery / Contact) under
// basePath, never scroll anchors. Sticky header + night-violet footer shared.
// Palette baked: deep night-violet / neon magenta / cyan glow, club energy; the
// tenant swaps in their own media, classes, hours and copy.

const INK = "#0d0a14"; // night-violet page
const PANEL = "#16111f"; // lifted panel
const LINE = "#ffffff14"; // hairline
const NEON = "#ff2d78"; // neon magenta accent
const CYAN = "#36e0d4"; // secondary glow
const TEXT = "#f2eefb"; // primary light text
const MUTE = "#a99fc0"; // muted body

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

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: NEON }}>
      <span className="h-2 w-2 rounded-full" style={{ background: NEON, boxShadow: `0 0 12px ${NEON}` }} />
      {children}
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: PANEL,
  cardBorder: `${NEON}33`,
  heading: TEXT,
  sub: MUTE,
  label: "#c2b6da",
  fieldBg: "#100b1a",
  fieldBorder: "#ffffff26",
  fieldText: TEXT,
  button: NEON,
  buttonText: "#ffffff",
  radius: "9999px",
  font: "var(--font-space)",
  scheme: "dark",
};

export default function Tempo({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Reserve a bike";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const join = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Rides", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK, borderTop: `1px solid ${NEON}40` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full text-sm font-black" style={{ background: NEON, color: "#fff" }}>{name.trim().charAt(0).toUpperCase() || "T"}</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-[0.02em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/75 transition hover:text-white" style={{ border: `1px solid ${NEON}55` }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ color: TEXT }} className="text-xs font-bold uppercase tracking-[0.2em]">Ride</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "Rides", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              { label: ctaLabel, href: join },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ color: TEXT }} className="text-xs font-bold uppercase tracking-[0.2em]">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ color: TEXT }} className="text-xs font-bold uppercase tracking-[0.2em]">Studio Hours</h4>
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
        <a href={href("contact")} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Clip in</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: INK }} className="min-h-screen font-body">
      <TempoHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${NEON}40` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: TEXT }} className="mt-4 text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-7xl">{title}</h1>
      </div>
    </section>
  );

  // ---- RIDES / CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("The timetable", "Rides & Packages")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: NEON }} className="mb-6 text-2xl font-extrabold uppercase tracking-[0.02em]">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: CYAN }}>{catg.category}</p>
                      )}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: TEXT }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: NEON }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <a href={join} className="inline-flex rounded-full px-10 py-4 text-xs font-bold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: NEON, color: "#fff" }}>{ctaLabel}</a>
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
        {banner("Our vibe", "Lights Down. Volume Up.")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={join} className="inline-flex rounded-full px-10 py-4 text-xs font-bold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: NEON, color: "#fff" }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In the room", "Inside The Studio")}
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
        {banner("Get on a bike", "Reserve Your Spot")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: TEXT }} className="text-2xl font-bold uppercase tracking-[0.02em]">Find the studio</h2>
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
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${NEON}`, color: NEON }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Reserve a bike" sub="Pick a ride and we'll save your bike. We'll confirm by text or email." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about packages, first-timer deals or private rides? We'll get back to you."
                contactCta="Send message"
                theme={{ card: PANEL, cardBorder: `${NEON}33`, heading: TEXT, blurb: MUTE, label: "#c2b6da", fieldBg: "#100b1a", fieldBorder: "#ffffff26", fieldText: TEXT, button: NEON, buttonText: "#ffffff", radius: "9999px", font: "var(--font-space)" }}
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
    { k: "45", v: "Minute rides" },
    { k: `${classNames.length || 25}+`, v: "Rides weekly" },
    { k: "0", v: "Bad days here" },
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#2a1240,#0d0a14)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(13,10,20,0.92) 0%, rgba(13,10,20,0.5) 45%, rgba(13,10,20,0.2) 100%)" }} />
        <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full opacity-30 blur-3xl" style={{ background: NEON }} />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker>{content.tagline || "Clip in · Climb · Repeat"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-6xl font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={join} className="rounded-full px-9 py-4 text-center text-[12px] font-bold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: NEON }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="rounded-full px-9 py-4 text-center text-[12px] font-bold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>See the rides</a>
            )}
          </div>
        </div>
      </section>

      {/* stat strip */}
      <section style={{ background: `linear-gradient(90deg, ${NEON}, #b3187f)` }}>
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x px-8 py-8" style={{ borderColor: "#ffffff2a" }}>
          {stats.map((s) => (
            <div key={s.v} className="px-4 text-center text-white">
              <p style={display} className="text-3xl font-extrabold sm:text-4xl">{s.k}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about — copy left, image right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Our vibe</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl">Lights Down. Volume Up.</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: NEON }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: PANEL, border: `1px solid ${LINE}` }} />
            )}
            <span className="pointer-events-none absolute -bottom-4 -left-4 h-24 w-24 rounded-full opacity-50 blur-2xl" style={{ background: CYAN }} />
          </div>
        </section>
      )}

      {/* ride preview — clean divider row list */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>The timetable</Kicker>
                <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.01em] sm:text-5xl">Rides & Packages</h2>
              </div>
              <a href={href("services")} className="text-[12px] font-bold uppercase tracking-[0.18em] transition hover:text-white" style={{ color: NEON }}>View all →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: TEXT }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: NEON }}>{item.price}</span>}
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
            <Kicker>In the room</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 max-w-2xl text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-4xl">Neon, sweat and your best 45 minutes</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8">
            <a href={href("gallery")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${NEON}`, color: NEON }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: `linear-gradient(120deg, ${NEON}, #7a1bb0)` }}>
        <div className="mx-auto max-w-4xl px-8 py-20 text-center text-white">
          <h2 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl" style={display}>First ride is on us.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed text-white/85">Shoes provided, bikes ready. Reserve your spot and find your tempo.</p>
          <a href={join} className="mt-8 inline-flex rounded-full px-12 py-4 text-[12px] font-bold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: "#fff", color: NEON }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
