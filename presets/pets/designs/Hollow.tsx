import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PetHeader, type PetHeaderTheme, type PetLink } from "../PetChrome";

// Hollow — a soft, upscale pet hotel: a boutique boarding cattery & dog hotel.
// Quiet luxury: warm ivory page, espresso-charcoal ink, a muted sand/gold accent
// and a hushed sage. Serif headings, generous whitespace, a hero with a dark
// imagery banner. MULTI-PAGE with real routes. Best suited to a cattery / kennels
// or premium boarding "pet hotel".

const INK = "#2a2521"; // espresso charcoal
const SAND = "#a98a5e"; // muted gold-sand accent
const SAGE = "#7d8473"; // hushed sage
const IVORY = "#f8f4ed"; // warm ivory page
const STONE = "#efe9df"; // soft stone panel
const HAIR = "#a98a5e2e"; // faint sand hairline
const BODY = "#5f574e"; // warm muted body

const serif = { fontFamily: "var(--font-fraunces)" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Kicker({ children, center = true, light = false }: { children: ReactNode; center?: boolean; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em] ${center ? "justify-center" : ""}`} style={{ color: light ? "rgba(255,255,255,0.75)" : SAND }}>
      <span className="h-px w-6" style={{ background: light ? "rgba(255,255,255,0.5)" : SAND }} />
      {children}
      <span className="h-px w-6" style={{ background: light ? "rgba(255,255,255,0.5)" : SAND }} />
    </p>
  );
}

export default function Hollow({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("contact") : content.booking_url || content.reservation_url || href("contact");

  const nav: PetLink[] = [
    groups.length > 0 && { label: "Stays", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as PetLink[];

  const headerTheme: PetHeaderTheme = {
    bar: IVORY,
    border: HAIR,
    brand: INK,
    link: INK,
    ctaBg: INK,
    ctaText: IVORY,
    heroDark: true,
    brandFont: "var(--font-fraunces)",
    radius: "0",
    eyebrow: "Pet Hotel",
  };

  const cta = { label: bookingOn ? "Reserve a stay" : "Enquire", href: book };

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl font-medium tracking-[0.02em] text-white">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.42em] text-white/55">Boarding &amp; Pet Hotel</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center text-white/80 transition hover:text-white" style={{ border: `1px solid ${SAND}66` }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...serif }} className="text-lg text-white">Discover</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/65">
            {nav.map((l) => <li key={l.href}><a href={l.href} className="uppercase tracking-[0.12em] transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 style={{ ...serif }} className="text-lg text-white">Contact</h4>
          <div className="mt-5 space-y-3 text-sm text-white/65">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...serif }} className="text-lg text-white">Reception Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/65">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/40">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/50">By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-6 text-xs text-white/45 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.14em] transition hover:text-white">Reservations &amp; enquiries</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: IVORY }} className="min-h-screen font-body">
      <PetHeader name={name} cta={cta} links={nav} home={href("home")} solid={solid} theme={headerTheme} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: STONE, borderBottom: `1px solid ${HAIR}` }}>
      <div className="mx-auto max-w-4xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: BODY }}>{sub}</p>}
      </div>
    </section>
  );

  // ---- STAYS (services) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our Stays", "Suites & sojourns", "Considered comfort for cats and dogs — from cosy overnight stays to long, leisurely holidays.")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <p className="mb-6 flex items-center justify-center gap-4 text-center text-[11px] uppercase tracking-[0.3em]" style={{ color: SAND }}>
                      <span className="h-px w-8" style={{ background: `${SAND}66` }} />{section.section}<span className="h-px w-8" style={{ background: `${SAND}66` }} />
                    </p>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: SAGE }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: HAIR }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: SAND }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-center" style={{ color: BODY }}>Our stays are coming soon.</p>}
          <div className="mt-16 text-center">
            <a href={book} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: INK, color: IVORY }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our Ethos", "A home away from home")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p> : <p style={{ color: BODY }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-px sm:grid-cols-3" style={{ background: HAIR }}>
            {["Calm & spacious suites", "Round-the-clock care", "Daily updates & photos"].map((t) => (
              <div key={t} className="p-7 text-center" style={{ background: STONE }}>
                <p style={{ ...serif, color: SAND }} className="text-3xl">·</p>
                <p className="mt-1 text-sm font-medium" style={{ color: INK }}>{t}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={book} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: INK, color: IVORY }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("The Retreat", "A glimpse inside")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center" style={{ color: BODY }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Reservations", "Reserve a stay", "Tell us your dates and we will confirm availability and a tailored stay for your companion.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl font-medium">Find us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: BODY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70" style={{ color: SAND }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70" style={{ color: SAND }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: HAIR, color: BODY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SAGE }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ border: `1px solid ${INK}`, color: INK }}>Get directions</a>
            )}
          </div>
          <div>
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book an appointment"
              bookingBlurb="Share your dates and your pet's needs — we'll confirm a suite."
              bookingCta="Request a stay"
              theme={{ card: STONE, cardBorder: HAIR, heading: INK, blurb: BODY, label: SAGE, fieldBg: IVORY, fieldBorder: HAIR, fieldText: INK, button: INK, buttonText: IVORY, radius: "0", font: "var(--font-fraunces)" }}
            />
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  return shell(
    <>
      {/* hero — full-bleed dark imagery banner, centred serif */}
      <section className="relative isolate flex min-h-[92vh] items-center justify-center overflow-hidden">
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, #3a342d, ${INK})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(20,17,13,0.82) 0%, rgba(20,17,13,0.35) 45%, rgba(20,17,13,0.5) 100%)" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white">
          <Kicker light>A boutique pet hotel</Kicker>
          <h1 style={{ ...serif, color: "#fff" }} className="mt-5 text-5xl font-medium leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)] sm:text-base">{content.tagline}</p>}
          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <a href={book} className="w-full px-9 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] shadow-2xl transition hover:opacity-90 sm:w-auto" style={{ background: SAND, color: "#1c160e" }}>{cta.label}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="w-full px-9 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900 sm:w-auto" style={{ border: "1px solid rgba(255,255,255,0.6)" }}>View stays</a>
            )}
          </div>
        </div>
      </section>

      {/* welcome — image left, copy right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: STONE, border: `1px solid ${HAIR}` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 border-b border-r" style={{ borderColor: SAND }} />
          </div>
          <div>
            <Kicker center={false}>Welcome</Kicker>
            <h2 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium leading-tight sm:text-5xl">A serene retreat for cherished pets</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p>}
            {content.about && <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: SAND }}>Our ethos →</a>}
          </div>
        </section>
      )}

      {/* comfort trio */}
      <section style={{ background: STONE, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 text-center md:grid-cols-3">
          {[
            { t: "Spacious suites", d: "Light, airy rooms with soft bedding and quiet, calming surroundings." },
            { t: "Attentive care", d: "Familiar routines, gentle handling and round-the-clock supervision." },
            { t: "Daily updates", d: "Photos and notes so you can relax knowing they are thriving." },
          ].map((c) => (
            <div key={c.t}>
              <h3 style={{ ...serif, color: INK }} className="text-xl font-medium">{c.t}</h3>
              <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed" style={{ color: BODY }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* stays teaser — clean row list */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-24 sm:px-8">
          <div className="text-center">
            <Kicker>Our Stays</Kicker>
            <h2 style={{ ...serif, color: INK }} className="mt-4 text-4xl font-medium sm:text-5xl">Suites &amp; sojourns</h2>
          </div>
          <ul className="mt-14 divide-y" style={{ borderColor: HAIR }}>
            {featured.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: INK }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                </div>
                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: SAND }}>{item.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-14 text-center">
            <a href={href("services")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${INK}`, color: INK }}>View all stays</a>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24" style={{ background: STONE, borderTop: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-6xl px-8 text-center">
            <Kicker>The Retreat</Kicker>
            <h2 style={{ ...serif, color: INK }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-snug sm:text-4xl">Calm, comfortable spaces designed around your pet.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${INK}`, color: INK }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: INK }}>
        <div className="mx-auto max-w-2xl px-8 py-24 text-center">
          <Kicker light>Reservations</Kicker>
          <h2 style={{ ...serif, color: "#fff" }} className="mt-4 text-3xl font-medium sm:text-4xl">Reserve their stay</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/70">Give your companion a restful, attentive retreat while you are away. Enquire today and we will take care of the rest.</p>
          <a href={book} className="mt-8 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: SAND, color: "#1c160e" }}>{cta.label}</a>
        </div>
      </section>
    </>,
    false,
  );
}
