import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ApexHeader } from "./ApexHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Apex — premium, editorial design for personal trainers & performance coaching.
// Restrained, confident, results-led. MULTI-PAGE: nav opens real routes
// (Programmes / About / Results / Apply) under basePath, never scroll anchors.
// Each page is its own layout; the sticky header and charcoal footer are shared.
// Palette is baked (charcoal / bone / warm copper), serif display headings; the
// tenant swaps in their own photography, copy, programmes, hours and address.

const CHAR = "#16181c"; // charcoal page
const PANEL = "#1d2026"; // lifted panel
const BONE = "#f1ece4"; // bone heading / light text
const COPPER = "#c4794e"; // warm metallic accent
const MUTE = "#9aa0a8"; // muted body text
const LINE = "#ffffff12";

const serif = { fontFamily: "var(--font-fraunces)" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Kicker({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] ${center ? "justify-center" : ""}`} style={{ color: COPPER }}>
      <span className="h-px w-7" style={{ background: COPPER }} />
      {children}
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: PANEL,
  cardBorder: "#ffffff1f",
  heading: BONE,
  sub: MUTE,
  label: "#b3a89c",
  fieldBg: "#15171b",
  fieldBorder: "#ffffff26",
  fieldText: BONE,
  button: COPPER,
  buttonText: "#15110d",
  radius: "0",
  font: "var(--font-fraunces)",
  scheme: "dark",
};

export default function Apex({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Apply to train";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const apply = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Programmes", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Results", href: href("gallery") },
    { label: "Apply", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: CHAR, borderTop: `1px solid ${COPPER}26` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl tracking-[0.02em]">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.4em] text-white/55">Performance Coaching</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:text-white" style={{ border: `1px solid ${COPPER}55` }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={{ ...serif, color: BONE }} className="text-lg">Train</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "Programmes", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Results", href: href("gallery") },
              { label: ctaLabel, href: apply },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={{ ...serif, color: BONE }} className="text-lg">Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={{ ...serif, color: BONE }} className="text-lg">Availability</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>By appointment.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: LINE, color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white">Apply to train</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CHAR }} className="min-h-screen font-body" >
      <ApexHeader name={name} cta={ctaLabel} ctaHref={apply} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${COPPER}26` }}>
      <div className="mx-auto max-w-7xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <div className="flex justify-center"><Kicker center>{kicker}</Kicker></div>
        <h1 style={{ ...serif, color: BONE }} className="mt-4 text-4xl font-medium leading-[1.05] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- PROGRAMMES ----
  if (page === "services") {
    return shell(
      <>
        {banner("How we train", "Programmes")}
        <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <p className="mb-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: BONE }}>
                      <span className="h-px w-8" style={{ background: `${COPPER}88` }} />{section.section}<span className="h-px flex-1" style={{ background: LINE }} />
                    </p>
                  )}
                  <ul className="divide-y" style={{ borderColor: LINE }}>
                    {section.categories.flatMap((c) => c.items).map((item) => (
                      <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                        <div className="min-w-0">
                          <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: BONE }}>{item.name}</p>
                          {item.description && (
                            <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>
                          )}
                        </div>
                        {item.price && (
                          <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: COPPER }}>{item.price}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="text-center">
                <a href={apply} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${COPPER}`, color: BONE }}>{ctaLabel}</a>
              </div>
            </div>
          ) : <p className="text-center" style={{ color: MUTE }}>Our programmes are coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("The approach", "Coaching, Not Guesswork")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={apply} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${COPPER}`, color: BONE }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- RESULTS / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Proof", "Results")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- APPLY / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Start here", "Apply To Train")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[16px] leading-[1.9]" style={{ color: MUTE }}>
              Coaching is by application so every client gets real attention. Tell us your goals below and we&apos;ll be in touch to arrange a consultation.
            </p>
            <h2 style={{ ...serif, color: BONE }} className="mt-10 text-2xl">Find us</h2>
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
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a consultation" sub="Tell us when suits and we'll arrange your free consultation." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Apply to train"
                contactBlurb="Share your goals and a little about you. We read every application personally."
                contactCta="Send application"
                theme={{ card: PANEL, cardBorder: "#ffffff1f", heading: BONE, blurb: MUTE, label: "#b3a89c", fieldBg: "#15171b", fieldBorder: "#ffffff26", fieldText: BONE, button: COPPER, buttonText: "#15110d", radius: "0", font: "var(--font-fraunces)" }}
              />
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  const pillars = [
    { n: "01", t: "Assessment", d: "We start with where you are — movement, history and goals." },
    { n: "02", t: "Programme", d: "A plan built around your life, progressed week on week." },
    { n: "03", t: "Accountability", d: "Coaching, check-ins and adjustments until it sticks." },
  ];

  return shell(
    <>
      {/* hero — split editorial */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#22252b,#16181c)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(100deg, rgba(18,20,24,0.92) 0%, rgba(18,20,24,0.5) 50%, rgba(18,20,24,0.2) 100%)" }} />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker>{content.tagline || "Personal Training · Performance Coaching"}</Kicker>
          <h1 style={serif} className="mt-5 max-w-3xl text-5xl font-medium leading-[1.02] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mt-6 max-w-lg text-lg leading-relaxed text-white/80 [text-shadow:0_2px_16px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={apply} className="px-9 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: COPPER, color: "#15110d" }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="px-9 py-4 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>View programmes</a>
            )}
          </div>
        </div>
      </section>

      {/* method pillars */}
      <section style={{ background: PANEL, borderBottom: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-7xl px-8 py-24">
          <div className="text-center">
            <div className="flex justify-center"><Kicker center>The method</Kicker></div>
            <h2 style={{ ...serif, color: BONE }} className="mt-4 text-3xl font-medium sm:text-4xl">A system that delivers</h2>
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.n}>
                <p style={{ ...serif, color: COPPER }} className="text-4xl">{p.n}</p>
                <h3 style={{ ...serif, color: BONE }} className="mt-3 text-xl">{p.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about — image right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>The approach</Kicker>
            <h2 style={{ ...serif, color: BONE }} className="mt-4 text-4xl font-medium leading-[1.1] sm:text-5xl">Coaching, not guesswork</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: COPPER }}>Read more →</a>
          </div>
          <div className="relative order-first lg:order-last">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full" style={{ background: PANEL, border: `1px solid ${LINE}` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 border-b border-r" style={{ borderColor: COPPER }} />
          </div>
        </section>
      )}

      {/* programmes preview */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-5xl px-8 py-24">
            <div className="text-center">
              <div className="flex justify-center"><Kicker center>How we train</Kicker></div>
              <h2 style={{ ...serif, color: BONE }} className="mt-4 text-4xl font-medium sm:text-5xl">Programmes</h2>
            </div>
            <ul className="mt-14 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium" style={{ ...serif, color: BONE }}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: COPPER }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-14 text-center">
              <a href={href("services")} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${COPPER}`, color: BONE }}>All programmes</a>
            </div>
          </div>
        </section>
      )}

      {/* results strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-8 text-center">
            <div className="flex justify-center"><Kicker center>Proof</Kicker></div>
            <h2 style={{ ...serif, color: BONE }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-snug sm:text-4xl">Real clients. Real results.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-2 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8 text-center">
            <a href={href("gallery")} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-white hover:text-neutral-900" style={{ border: `1px solid ${COPPER}`, color: BONE }}>See results</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: PANEL, borderTop: `1px solid ${COPPER}26` }}>
        <div className="mx-auto max-w-2xl px-8 py-24 text-center">
          <h2 style={{ ...serif, color: BONE }} className="text-3xl font-medium leading-[1.15] sm:text-5xl">Train with intent.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }}>Spaces are limited and coaching is by application. If you&apos;re ready to commit, we&apos;re ready to coach.</p>
          <a href={apply} className="mt-9 inline-flex px-12 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: COPPER, color: "#15110d" }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
