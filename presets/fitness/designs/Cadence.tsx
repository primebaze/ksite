import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CadenceHeader } from "./CadenceHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Cadence — elegant, editorial dance / movement studio design (ballet, contemp,
// barre, heels, kids). MULTI-PAGE: nav opens real routes (Classes / About /
// Gallery / Contact) under basePath, never scroll anchors. Sticky header + ivory
// footer shared. Palette baked: soft ivory / blush / ink with an italic serif
// voice; the tenant swaps in their own media, classes, hours and copy.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const IVORY = "#fbf7f4"; // page
const CREAM = "#ffffff"; // card
const PANEL = "#f3e9e6"; // tinted blush band
const INK = "#1c1a1d"; // ink heading/body
const BLUSH = "#c8657a"; // blush accent
const MUTE = "#7d7378"; // muted body
const LINE = "#1c1a1d17"; // faint hairline

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: BLUSH }}>
      <span className="h-px w-7" style={{ background: BLUSH }} />
      {children}
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: CREAM,
  cardBorder: LINE,
  heading: INK,
  sub: MUTE,
  label: "#6c636a",
  fieldBg: IVORY,
  fieldBorder: "#1c1a1d24",
  fieldText: INK,
  button: BLUSH,
  buttonText: "#ffffff",
  radius: "9999px",
  font: "var(--font-fraunces)",
  scheme: "light",
};

export default function Cadence({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Book a class";

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
    <footer style={{ background: PANEL, borderTop: `1px solid ${LINE}` }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]" style={{ color: INK }}>
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl italic tracking-[0.01em]">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.4em]" style={{ color: BLUSH }}>Movement Studio</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full transition hover:opacity-70" style={{ border: `1px solid ${BLUSH}66`, color: BLUSH }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...serif, color: INK }} className="text-lg italic">Dance</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "Classes", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              { label: ctaLabel, href: join },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:opacity-70">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...serif, color: INK }} className="text-lg italic">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...serif, color: INK }} className="text-lg italic">Studio Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${INK}80` }}>{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: LINE, color: MUTE }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:opacity-70">Book a class</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: IVORY, color: INK }} className="min-h-screen font-body">
      <CadenceHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <Kicker center>{kicker}</Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium italic leading-tight sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("The schedule", "Classes & Passes")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 style={{ ...serif, color: INK }} className="mb-6 text-2xl italic">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: BLUSH }}>{catg.category}</p>
                      )}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BLUSH }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="text-center">
                <a href={join} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: BLUSH }}>{ctaLabel}</a>
              </div>
            </div>
          ) : <p className="text-center" style={{ color: MUTE }}>Our schedule is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our studio", "Where Movement Finds You")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={join} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: BLUSH }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In motion", "A Look Inside")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Join us", "Get In Touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl italic">Find the studio</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: `${INK}80` }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${BLUSH}`, color: BLUSH }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a class" sub="Pick a class and we'll save your place. We'll confirm by phone or email." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a note"
                contactBlurb="New to dance or returning to the floor? Tell us what you're after and we'll reply."
                contactCta="Send note"
                theme={{ card: CREAM, cardBorder: LINE, heading: INK, blurb: MUTE, label: "#6c636a", fieldBg: IVORY, fieldBorder: "#1c1a1d24", fieldText: INK, button: BLUSH, buttonText: "#ffffff", radius: "9999px", font: "var(--font-fraunces)" }}
              />
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  const heroLines = name.trim().split(/\s+/);
  const heroTop = heroLines[0] ?? name;
  const heroRest = heroLines.slice(1).join(" ");

  return shell(
    <>
      {/* hero — editorial split: text left, image right */}
      <section className="grid min-h-[92vh] lg:grid-cols-2">
        <div className="flex items-center px-6 pt-28 pb-16 sm:px-10 lg:px-16" style={{ background: IVORY }}>
          <div className="max-w-md">
            <Kicker>{content.tagline || "Move · Express · Belong"}</Kicker>
            <h1 style={{ ...serif, color: INK }} className="mt-5 text-5xl font-medium leading-[1.02] sm:text-7xl">
              <span data-edit="tenant.business_name" className="block">{heroTop}</span>
              {heroRest && <span className="block italic" style={{ color: BLUSH }}>{heroRest}</span>}
            </h1>
            {content.tagline && <p data-edit="content.tagline" className="mt-6 text-[16px] leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <a href={join} className="rounded-full px-9 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: BLUSH }}>{ctaLabel}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="rounded-full px-9 py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${INK}33`, color: INK }}>View classes</a>
              )}
            </div>
          </div>
        </div>
        <div className="relative min-h-[44vh]" style={{ background: PANEL }}>
          {video ? (
            <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
          ) : hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#e6c4cc,#c8657a)" }} />
          )}
        </div>
      </section>

      {/* about — image left, copy right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-2xl" style={{ background: PANEL, border: `1px solid ${LINE}` }} />
            )}
          </div>
          <div>
            <Kicker>Our studio</Kicker>
            <h2 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium italic leading-tight sm:text-5xl">Where Movement Finds You</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: BLUSH }}>Read more →</a>
          </div>
        </section>
      )}

      {/* classes preview — clean divider row list */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <div className="text-center">
              <Kicker center>The schedule</Kicker>
              <h2 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium italic sm:text-5xl">Classes & Passes</h2>
            </div>
            <ul className="mx-auto mt-12 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BLUSH }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${BLUSH}`, color: BLUSH }}>View full schedule</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-8 text-center">
            <Kicker center>In motion</Kicker>
            <h2 style={{ ...serif, color: INK }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium italic leading-snug sm:text-4xl">A floor for every body and every style.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-xl object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${BLUSH}`, color: BLUSH }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA band */}
      <section style={{ background: BLUSH }}>
        <div className="mx-auto max-w-2xl px-8 py-20 text-center text-white">
          <h2 style={serif} className="text-4xl font-medium italic sm:text-5xl">Your first class is waiting.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/85">No experience needed — just bring yourself. Book a class and find your rhythm.</p>
          <a href={join} className="mt-8 inline-flex rounded-full bg-white px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ color: BLUSH }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
