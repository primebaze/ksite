import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { BoxHeader } from "./BoxHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Box — gritty, industrial CrossFit / functional-fitness "box" design.
// MULTI-PAGE: nav opens real routes (WODs / About / Gallery / Contact) under
// basePath, never scroll anchors. Sticky header + dark concrete footer shared.
// Palette baked: dark concrete / safety orange / chalk white, condensed bold
// caps display; the tenant swaps in their own media, classes, hours and copy.

const INK = "#161412"; // dark concrete page
const PANEL = "#1f1c19"; // lifted panel
const LINE = "#ffffff14"; // hairline
const ORANGE = "#f4511e"; // safety-orange accent
const TEXT = "#efe9e2"; // chalk text
const MUTE = "#a39a8f"; // muted body

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
    <p className="inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em]" style={{ color: ORANGE }}>
      <span className="h-[3px] w-7" style={{ background: ORANGE }} />
      {children}
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: PANEL,
  cardBorder: "#ffffff1f",
  heading: TEXT,
  sub: MUTE,
  label: "#bdb2a6",
  fieldBg: "#15120f",
  fieldBorder: "#ffffff26",
  fieldText: TEXT,
  button: ORANGE,
  buttonText: "#171310",
  radius: "0",
  font: "var(--font-space)",
  scheme: "dark",
};

export default function Box({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Drop in";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const join = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "WODs", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: INK, borderTop: `2px solid ${ORANGE}` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center text-sm font-black" style={{ background: ORANGE, color: INK }}>{name.trim().charAt(0).toUpperCase() || "B"}</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold uppercase tracking-[0.06em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center text-white/75 transition hover:text-white" style={{ border: `1px solid ${ORANGE}66` }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ color: TEXT }} className="text-xs font-bold uppercase tracking-[0.2em]">Train</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "WODs", href: href("services") },
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
          <h4 style={{ color: TEXT }} className="text-xs font-bold uppercase tracking-[0.2em]">Box Hours</h4>
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
        <a href={href("contact")} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Book your first WOD</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: INK }} className="min-h-screen font-body">
      <BoxHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `2px solid ${ORANGE}` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: TEXT }} className="mt-4 text-5xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-7xl">{title}</h1>
      </div>
    </section>
  );

  // ---- WODs / CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("The whiteboard", "WODs & Memberships")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 style={{ ...display, color: ORANGE }} className="mb-6 text-2xl font-extrabold uppercase tracking-[0.02em]">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.24em]" style={{ color: MUTE }}>{catg.category}</p>
                      )}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: TEXT }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: ORANGE }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <a href={join} className="inline-flex px-10 py-4 text-xs font-extrabold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: ORANGE, color: INK }}>{ctaLabel}</a>
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
        {banner("Who we are", "Show Up. Work Hard.")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={join} className="inline-flex px-10 py-4 text-xs font-extrabold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: ORANGE, color: INK }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Inside the box", "On The Floor")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
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
        {banner("Get started", "Drop In For A Session")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: TEXT }} className="text-2xl font-bold uppercase tracking-[0.02em]">Find the box</h2>
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
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${ORANGE}`, color: ORANGE }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a class" sub="Tell us when works and we'll confirm your first WOD." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about drop-ins, memberships or on-ramp? We'll get back to you."
                contactCta="Send message"
                theme={{ card: PANEL, cardBorder: "#ffffff1f", heading: TEXT, blurb: MUTE, label: "#bdb2a6", fieldBg: "#15120f", fieldBorder: "#ffffff26", fieldText: TEXT, button: ORANGE, buttonText: "#171310", radius: "0", font: "var(--font-space)" }}
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
    { k: `${classNames.length || 30}+`, v: "WODs each week" },
    { k: "All", v: "Levels coached" },
    { k: "1", v: "Community" },
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#241f1a,#161412)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(14,11,9,0.92) 0%, rgba(14,11,9,0.55) 45%, rgba(14,11,9,0.25) 100%)" }} />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker>{content.tagline || "Functional · Strength · Community"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-6xl font-extrabold uppercase leading-[0.88] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={join} className="px-9 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: ORANGE, color: INK }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="px-9 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>See the WODs</a>
            )}
          </div>
        </div>
      </section>

      {/* stat strip */}
      <section style={{ background: ORANGE }}>
        <div className="mx-auto grid max-w-7xl grid-cols-3 divide-x px-8 py-8" style={{ borderColor: "#00000022" }}>
          {stats.map((s) => (
            <div key={s.v} className="px-4 text-center">
              <p style={{ ...display, color: INK }} className="text-3xl font-extrabold sm:text-4xl">{s.k}</p>
              <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: "#2a1409" }}>{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about — copy left, image right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-5xl">Show Up. Work Hard.</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: ORANGE }}>More about us →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: PANEL, border: `1px solid ${LINE}` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -left-3 h-20 w-20 border-b-[3px] border-l-[3px]" style={{ borderColor: ORANGE }} />
          </div>
        </section>
      )}

      {/* WOD preview — clean divider row list */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>The whiteboard</Kicker>
                <h2 style={{ ...display, color: TEXT }} className="mt-4 text-4xl font-extrabold uppercase tracking-[-0.01em] sm:text-5xl">WODs & Memberships</h2>
              </div>
              <a href={href("services")} className="text-[12px] font-bold uppercase tracking-[0.18em] transition hover:text-white" style={{ color: ORANGE }}>View all →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: TEXT }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: ORANGE }}>{item.price}</span>}
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
            <Kicker>Inside the box</Kicker>
            <h2 style={{ ...display, color: TEXT }} className="mt-4 max-w-2xl text-3xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-4xl">Chalk, iron and a crew that shows up</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8">
            <a href={href("gallery")} className="inline-flex px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${ORANGE}`, color: ORANGE }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: ORANGE }}>
        <div className="mx-auto max-w-4xl px-8 py-20 text-center">
          <h2 className="text-4xl font-extrabold uppercase leading-[0.95] tracking-[-0.01em] sm:text-6xl" style={{ ...display, color: INK }}>Your first WOD is free.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed" style={{ color: "#2a1409" }}>No experience needed — every movement scales. Book a drop-in and meet the crew.</p>
          <a href={join} className="mt-8 inline-flex px-12 py-4 text-[12px] font-extrabold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
