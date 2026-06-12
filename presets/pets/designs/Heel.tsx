import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PetHeader, type PetHeaderTheme, type PetLink } from "../PetChrome";

// Heel — a confident, expert, force-free dog TRAINING & behaviour service.
// Calm, premium and authoritative: deep navy and warm cream, a warm amber
// accent and a grounded sage-green support. Square-ish corners, a precise
// clicker / whistle / lead signature mark, results-led copy. This is the
// trainer/behaviourist who solves problems and gets calm, lasting results —
// deliberately distinct from the bright outdoorsy walker and the coral groomer.
// MULTI-PAGE with real routes.

const NAVY = "#1E3A4C"; // confident navy — primary ink / dark sections
const AMBER = "#E6A23C"; // warm amber accent
const SAGE = "#8AA17E"; // grounded sage-green support
const CREAM = "#F4EFE4"; // warm cream page
const INK = "#221E1A"; // charcoal ink
const CARD = "#FBF8F1"; // raised cream card
const HAIR = "#1E3A4C1f"; // faint navy hairline
const BODY = "#4d5a5e"; // muted slate body

const display = { fontFamily: "var(--font-space)" } as const;

// Signature mark — a clicker/target ring crossed with a whistle/lead motif.
// Clean and expert, not cutesy: a target ring (training target), a centre dot
// (the click / focus) and a lead curve sweeping through it.
function Mark({ className, color = AMBER, ink = NAVY }: { className?: string; color?: string; ink?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" aria-hidden>
      <circle cx="16" cy="16" r="11" stroke={ink} strokeWidth="2.2" />
      <circle cx="16" cy="16" r="5.5" stroke={ink} strokeWidth="2.2" />
      <circle cx="16" cy="16" r="1.9" fill={color} />
      <path d="M3 24c5-1.5 7.5-5 9-8" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="3" cy="24" r="2.1" fill={ink} />
    </svg>
  );
}

// Small paw used sparingly as a list/step accent.
function Paw({ className, color = NAVY }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden>
      <ellipse cx="6.5" cy="11" rx="2" ry="2.6" />
      <ellipse cx="11" cy="8.3" rx="2" ry="2.8" />
      <ellipse cx="16" cy="8.8" rx="2" ry="2.7" />
      <ellipse cx="19" cy="13" rx="1.8" ry="2.3" />
      <path d="M12.4 13c2.7 0 4.7 1.8 4.7 4 0 1.8-1.4 2.7-3.3 2.7-1 0-1.6-.3-2.4-.3s-1.4.3-2.4.3c-1.9 0-3.3-.9-3.3-2.7 0-2.2 2-4 4.7-4z" />
    </svg>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("youtu")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 12s0-3-.4-4.4a2.6 2.6 0 0 0-1.8-1.8C18.4 5.4 12 5.4 12 5.4s-6.4 0-7.8.4a2.6 2.6 0 0 0-1.8 1.8C2 9 2 12 2 12s0 3 .4 4.4a2.6 2.6 0 0 0 1.8 1.8c1.4.4 7.8.4 7.8.4s6.4 0 7.8-.4a2.6 2.6 0 0 0 1.8-1.8C22 15 22 12 22 12zm-12 2.8V9.2L15 12z" /></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Small uppercase eyebrow chip — square, expert register.
function Kicker({ children, on = "light" }: { children: ReactNode; on?: "light" | "dark" }) {
  const dark = on === "dark";
  return (
    <span
      className="inline-flex items-center gap-2 rounded-sm px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em]"
      style={{
        background: dark ? "rgba(230,162,60,0.16)" : `${NAVY}0d`,
        color: dark ? AMBER : NAVY,
        border: `1px solid ${dark ? "rgba(230,162,60,0.35)" : HAIR}`,
      }}
    >
      <Mark className="h-3.5 w-3.5" color={AMBER} ink={dark ? AMBER : NAVY} />
      {children}
    </span>
  );
}

export default function HeelDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("contact") : content.booking_url || href("contact");

  const nav: PetLink[] = [
    groups.length > 0 && { label: "What we help with", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Results", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as PetLink[];

  const headerTheme: PetHeaderTheme = {
    bar: CREAM,
    border: HAIR,
    brand: NAVY,
    link: NAVY,
    ctaBg: AMBER,
    ctaText: NAVY,
    heroDark: true,
    brandFont: "var(--font-space)",
    radius: "0.4rem",
    eyebrow: "Dog Training & Behaviour",
  };

  const cta = { label: bookingOn ? "Book a discovery call" : "Get in touch", href: book };

  const footer = (
    <footer style={{ background: NAVY }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Mark className="h-7 w-7" color={AMBER} ink="#ffffff" />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-sm transition hover:opacity-80" style={{ background: "rgba(255,255,255,0.08)", color: AMBER }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {nav.map((l) => <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Get in touch</h4>
          <div className="mt-4 space-y-2.5 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Availability</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-white/55">By appointment, six days a week.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-6 text-xs text-white/45 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <p>© {new Date().getFullYear()} {name}. Force-free, results-led training.</p>
        <a href={href("contact")} className="transition hover:text-white">Book a discovery call</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <PetHeader name={name} cta={cta} links={nav} home={href("home")} solid={solid} theme={headerTheme} />
      {children}
      {footer}
    </div>
  );

  // A dark navy banner for sub-pages — confident and grounded.
  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: NAVY }} className="relative overflow-hidden">
      <div className="pointer-events-none absolute -right-16 top-8 opacity-[0.06]"><Mark className="h-64 w-64" color="#ffffff" ink="#ffffff" /></div>
      <div className="relative mx-auto max-w-4xl px-8 pb-16 pt-32 text-center sm:pt-36">
        <div className="flex justify-center"><Kicker on="dark">{kicker}</Kicker></div>
        <h1 style={{ ...display, color: "#ffffff" }} className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/70">{sub}</p>}
      </div>
    </section>
  );

  // ---- SERVICES ("what we help with") ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we help with", "Training that sticks", "From bright-eyed puppies to deep-rooted behaviour problems — a clear plan, kind methods and lasting results.")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && <h2 style={{ ...display, color: NAVY }} className="text-2xl font-extrabold tracking-tight">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-5">
                      {catg.category && <p className="mb-1 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: SAGE }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: HAIR }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: AMBER }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-center" style={{ color: BODY }}>Our programmes are coming soon.</p>}
          <div className="mt-14 text-center">
            <a href={book} className="inline-flex px-9 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: AMBER, color: NAVY, borderRadius: "0.4rem" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Calm, qualified, in your corner")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p> : <p style={{ color: BODY }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Force-free methods", d: "Reward-based, evidence-led — no fear, no force.", c: SAGE },
              { t: "Qualified & insured", d: "Accredited training and full professional cover.", c: AMBER },
              { t: "Lasting results", d: "Plans you can actually keep up at home.", c: NAVY },
            ].map((b) => (
              <div key={b.t} className="rounded-sm p-6" style={{ background: CARD, border: `1px solid ${HAIR}`, borderTop: `3px solid ${b.c}` }}>
                <Paw className="h-6 w-6" color={b.c} />
                <p className="mt-3 text-base font-bold" style={{ color: INK }}>{b.t}</p>
                <p className="mt-1.5 text-sm leading-relaxed" style={{ color: BODY }}>{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={book} className="inline-flex px-9 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: AMBER, color: NAVY, borderRadius: "0.4rem" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ("results") ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Results", "Calmer dogs, happier homes")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-sm object-cover" style={{ border: `1px solid ${HAIR}` }} />
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
        {banner("Get started", "Book a discovery call", "Tell us about your dog and what you're working on — we'll come back with a plan and the next step.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: NAVY }} className="text-2xl font-extrabold tracking-tight">Where we work</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: BODY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: NAVY }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: NAVY }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: HAIR, color: BODY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SAGE }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-sm font-bold transition hover:opacity-90" style={{ background: NAVY, color: "#ffffff", borderRadius: "0.4rem" }}>Get directions</a>
            )}
          </div>
          <div>
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book a session"
              bookingBlurb="Tell us about your dog and what you'd like to work on — we'll be in touch with the next step."
              bookingCta="Request a call"
              theme={{ card: CARD, cardBorder: HAIR, heading: NAVY, blurb: BODY, label: SAGE, fieldBg: "#ffffff", fieldBorder: HAIR, fieldText: INK, button: AMBER, buttonText: NAVY, radius: "0.4rem", font: "var(--font-space)" }}
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
      {/* hero — confident navy, expert, results-led */}
      <section className="relative isolate overflow-hidden" style={{ background: NAVY }}>
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-30" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        ) : null}
        <div className="absolute inset-0" style={{ background: `linear-gradient(105deg, ${NAVY} 38%, rgba(30,58,76,0.78) 70%, rgba(30,58,76,0.55))` }} />
        <div className="pointer-events-none absolute -right-20 top-24 opacity-[0.08]"><Mark className="h-80 w-80" color="#ffffff" ink="#ffffff" /></div>
        <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-36 sm:px-8 sm:pt-44 lg:pb-28">
          <div className="max-w-2xl">
            <Kicker on="dark">A calmer, happier dog</Kicker>
            <h1 style={{ ...display, color: "#ffffff" }} className="mt-6 text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
              Training that sticks.
            </h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-white/75">
              <span data-edit="content.tagline">{content.tagline || `Force-free, results-led training and behaviour support from ${name}. Real change you can keep up at home.`}</span>
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={book} className="inline-flex px-8 py-4 text-sm font-bold shadow-lg transition hover:opacity-90" style={{ background: AMBER, color: NAVY, borderRadius: "0.4rem" }}>{cta.label}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex px-8 py-4 text-sm font-bold text-white transition hover:bg-white/10" style={{ border: "1px solid rgba(255,255,255,0.35)", borderRadius: "0.4rem" }}>What we help with</a>
              )}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-white/55">
              <span className="flex items-center gap-2"><Mark className="h-4 w-4" color={AMBER} ink={SAGE} />Force-free</span>
              <span className="flex items-center gap-2"><Mark className="h-4 w-4" color={AMBER} ink={SAGE} />Qualified</span>
              <span className="flex items-center gap-2"><Mark className="h-4 w-4" color={AMBER} ink={SAGE} />Fully insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section style={{ background: CARD, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto grid max-w-6xl gap-px px-0 sm:grid-cols-3" style={{ background: HAIR }}>
          {[
            { k: "500+", t: "Dogs through our programmes" },
            { k: "Force-free", t: "Reward-based, no fear or force" },
            { k: "Qualified & insured", t: "Accredited and professionally covered" },
          ].map((s) => (
            <div key={s.t} className="px-6 py-9 text-center" style={{ background: CARD }}>
              <p style={{ ...display, color: NAVY }} className="text-2xl font-extrabold tracking-tight">{s.k}</p>
              <p className="mt-1.5 text-sm" style={{ color: BODY }}>{s.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* what we help with — clean row list */}
      {featured.length > 0 ? (
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <div className="flex justify-center"><Kicker>What we help with</Kicker></div>
            <h2 style={{ ...display, color: NAVY }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Every dog, every challenge</h2>
            <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: BODY }}>Puppies, recall, reactivity and the tricky stuff — a clear plan for each.</p>
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: HAIR }}>
            {featured.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ color: INK }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                </div>
                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: AMBER }}>{item.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: NAVY, borderRadius: "0.4rem" }}>See every programme</a>
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-8">
          <div className="flex justify-center"><Kicker>What we help with</Kicker></div>
          <h2 style={{ ...display, color: NAVY }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Puppy to problem-solving</h2>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {["Puppy training", "1-to-1 training", "Behaviour consultations", "Recall", "Reactivity", "Group classes"].map((t) => (
              <div key={t} className="flex items-center gap-3 rounded-sm px-5 py-4 text-left" style={{ background: CARD, border: `1px solid ${HAIR}` }}>
                <Paw className="h-5 w-5 shrink-0" color={SAGE} />
                <span className="text-sm font-bold" style={{ color: INK }}>{t}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* how it works — assessment → plan → results band */}
      <section style={{ background: NAVY }} className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-16 -bottom-10 opacity-[0.06]"><Mark className="h-72 w-72" color="#ffffff" ink="#ffffff" /></div>
        <div className="relative mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <div className="flex justify-center"><Kicker on="dark">How it works</Kicker></div>
            <h2 style={{ ...display, color: "#ffffff" }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Three steps to calmer</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { n: "01", t: "Assessment", d: "We meet you and your dog, understand the behaviour and what life looks like at home.", c: SAGE },
              { n: "02", t: "Your plan", d: "A tailored, force-free plan with clear steps — practical and easy to follow.", c: AMBER },
              { n: "03", t: "Results", d: "We coach you through it and adjust as we go, until the change holds for good.", c: "#ffffff" },
            ].map((s) => (
              <div key={s.n} className="rounded-sm p-7" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.12)" }}>
                <p style={{ ...display, color: s.c }} className="text-3xl font-extrabold tracking-tight">{s.n}</p>
                <h3 style={{ ...display, color: "#ffffff" }} className="mt-3 text-lg font-extrabold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about band */}
      {content.about && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-sm object-cover" style={{ border: `1px solid ${HAIR}` }} />
              ) : (
                <div className="aspect-[4/3] w-full rounded-sm" style={{ background: `${SAGE}26`, border: `1px solid ${HAIR}` }} />
              )}
              <div className="absolute -bottom-4 -right-3 flex items-center gap-2 rounded-sm px-5 py-3 shadow-xl" style={{ background: AMBER, color: NAVY }}>
                <Mark className="h-5 w-5" color={NAVY} ink={NAVY} /><span className="text-sm font-bold">Calm, lasting change</span>
              </div>
            </div>
            <div>
              <Kicker>About</Kicker>
              <h2 style={{ ...display, color: NAVY }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Expert help, kindly given</h2>
              <p data-edit="content.about" className="mt-5 text-[16px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p>
              <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: AMBER }}>More about us →</a>
            </div>
          </div>
        </section>
      )}

      {/* testimonials / results angle */}
      <section style={{ background: CARD, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <div className="flex justify-center"><Kicker>The results</Kicker></div>
            <h2 style={{ ...display, color: NAVY }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">What owners tell us</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {[
              { q: "Our reactive rescue can finally pass other dogs calmly. Genuinely life-changing.", a: "Sarah & Bramble" },
              { q: "Recall went from non-existent to reliable in weeks. Clear, kind and so practical.", a: "Tom & Nala" },
              { q: "Puppy chaos turned into a calm routine the whole family can keep up.", a: "The Ahmeds & Biscuit" },
            ].map((t) => (
              <figure key={t.a} className="flex h-full flex-col rounded-sm p-6" style={{ background: CREAM, border: `1px solid ${HAIR}`, borderTop: `3px solid ${SAGE}` }}>
                <div className="flex gap-0.5" style={{ color: AMBER }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2l3 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.9 21l1.2-6.8-5-4.9 6.9-1z" /></svg>
                  ))}
                </div>
                <blockquote className="mt-3 flex-1 text-sm leading-relaxed" style={{ color: INK }}>“{t.q}”</blockquote>
                <figcaption className="mt-4 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: NAVY }}>{t.a}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* gallery strip — results */}
      {gallery.length > 0 && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="text-center">
              <div className="flex justify-center"><Kicker>Results</Kicker></div>
              <h2 style={{ ...display, color: NAVY }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Happy dogs, happy homes</h2>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-sm object-cover" style={{ border: `1px solid ${HAIR}` }} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="inline-flex px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: NAVY, borderRadius: "0.4rem" }}>See more results</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA — free discovery call */}
      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
        <div className="rounded-sm px-8 py-14 text-center sm:px-14" style={{ background: NAVY, border: `1px solid ${HAIR}` }}>
          <Mark className="mx-auto h-10 w-10" color={AMBER} ink="#ffffff" />
          <h2 style={{ ...display, color: "#ffffff" }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Book your free discovery call</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">A relaxed chat about your dog, no pressure — we'll tell you exactly how we'd help.</p>
          <a href={book} className="mt-8 inline-flex px-9 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: AMBER, color: NAVY, borderRadius: "0.4rem" }}>{cta.label}</a>
        </div>
      </section>
    </>,
    false,
  );
}
