import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ClarityHeader } from "./ClarityHeader";
import { ClarityBooking } from "./ClarityBooking";

// Clarity — a warm, reassuring, accessible AUDIOLOGY / hearing-care clinic
// (single venue), MULTI-PAGE: the nav opens real routes (Services / About /
// Gallery / Appointments / Contact) under basePath, never scroll anchors. The
// cream header and warm-navy footer are shared. Palette is baked (warm navy /
// soft amber / calm sky / cream / teal accent); the tenant swaps in their own
// photography, copy, services, audiologists, hours and contact.
//
// Distinct structural signature vs siblings: a calm cream/navy hero with
// concentric SOUND-WAVE ripple motifs and a generous, highly-legible "Hear life
// clearly again" headline; a "how we help" services band; a three-step "your
// hearing journey" (test → fit → follow-up) feature; clean divider-row services
// list (no cards, no dotted leaders); audiologist team; reviews / stats / FAQ as
// static design arrays. Large tap targets and generous type for accessibility.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const NAVY = "#243B53";
const AMBER = "#E0A45E";
const SKY = "#BFD7E0";
const CREAM = "#F6F1E7";
const TEAL = "#4E8C8A";
const SKY_SOFT = "#E4EEF2";

// Static design copy (no brand names, no lorem) — reviews & FAQ are not tenant
// data, so they live as small design arrays per the runbook.
const REVIEWS = [
  { quote: "For the first time in years I can follow a conversation at the dinner table. They took such care and never rushed me.", author: "Hearing aid client, age 72" },
  { quote: "My ears were blocked for weeks. The wax removal was gentle and quick, and I could hear clearly again that same afternoon.", author: "Wax removal client" },
  { quote: "They explained everything in plain English, sat with me, and let me try the aids before deciding. No pressure at all.", author: "First-time client" },
  { quote: "The tinnitus support has genuinely changed how I sleep. I finally feel listened to and looked after.", author: "Tinnitus care client" },
];

const HELP = [
  {
    title: "Hearing assessments",
    note: "Thorough, unhurried tests with results explained clearly, the same day.",
    icon: (
      <path d="M4 13a8 8 0 0 1 16 0M7 13a5 5 0 0 1 10 0M10 13a2 2 0 0 1 4 0M12 13v6" />
    ),
  },
  {
    title: "Hearing aids",
    note: "Discreet, modern devices fitted and fine-tuned around how you live.",
    icon: <path d="M9 18a5 5 0 0 1-1-3 4 4 0 0 1 8 0c0 2-2 3-2 5M12 8a2 2 0 0 0-2 2M16 5l1-1M18 8h1.5M17 11l1 1" />,
  },
  {
    title: "Earwax removal",
    note: "Gentle microsuction by hand — comfortable, safe and quick to clear.",
    icon: <path d="M12 3a6 6 0 0 0-6 6c0 4 3 5 3 8a3 3 0 0 0 6 0M9 9a3 3 0 0 1 4-2" />,
  },
  {
    title: "Tinnitus support",
    note: "Calm, practical care and strategies to help you manage and rest easy.",
    icon: <path d="M5 11v2M9 8v8M13 5v14M17 9v6M21 11v2" />,
  },
];

const JOURNEY = [
  { step: "01", title: "Your hearing test", note: "A relaxed, thorough assessment. We listen to you first, then explain exactly what we find — in plain language, with no jargon." },
  { step: "02", title: "Your fitting", note: "If aids will help, we let you try them and fine-tune the fit, sound and comfort until everything feels natural to you." },
  { step: "03", title: "Ongoing follow-up", note: "We stay with you. Free check-ups, adjustments and aftercare keep you hearing your best for years to come." },
];

const STATS = [
  { value: "30+", label: "Years of hearing care" },
  { value: "12k", label: "Hearing tests carried out" },
  { value: "4.9", label: "Average client rating" },
  { value: "98%", label: "Would recommend us" },
];

const TRUST = [
  "Registered, qualified audiologists",
  "Free, no-obligation hearing tests",
  "All ages welcome",
  "Home visits available",
];

const FAQ = [
  { q: "Is the hearing test really free, and how long does it take?", a: "Yes — your initial hearing test is completely free with no obligation. Allow around an hour so we can assess your hearing properly, talk through your results and answer all of your questions without rushing." },
  { q: "Will I definitely need hearing aids?", a: "Not necessarily. Many people simply have a build-up of earwax, or hearing that is well within normal range. We will only ever recommend hearing aids if they will genuinely help, and we explain why." },
  { q: "Is earwax removal uncomfortable?", a: "Microsuction is gentle and very well tolerated. There is no water or syringing involved, most people find it comfortable, and you can usually hear clearly again straight away." },
  { q: "Do you offer home visits?", a: "Yes. If getting to the clinic is difficult, we can bring our care to you. Just let us know when you book and we will arrange a convenient home visit." },
];

export default function ClarityDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Appointments", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---------- shared bits ----------
  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("you")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  // Concentric sound-wave ripple motif — the design's signature decoration.
  const Ripples = ({ className, color = AMBER }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 200 200" fill="none" stroke={color} aria-hidden>
      <circle cx="100" cy="100" r="22" strokeWidth="2.5" />
      <circle cx="100" cy="100" r="48" strokeWidth="2" opacity="0.7" />
      <circle cx="100" cy="100" r="74" strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="100" r="98" strokeWidth="1.25" opacity="0.3" />
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: NAVY }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-2xl font-semibold text-white">{name}</p>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-[15px] leading-relaxed text-white/75">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: AMBER }}>Explore</h4>
          <ul className="mt-4 space-y-3 text-[15px]">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/80 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: AMBER }}>Visit us</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-[15px] leading-relaxed text-white/80">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-[15px]">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold text-white/85 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/80 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/15 px-6 py-6 text-center text-sm text-white/60">
        © {new Date().getFullYear()} {name}. Hearing care for all ages.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-[#243B53]">
      <ClarityHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Sky page banner — clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section className="relative overflow-hidden" style={{ background: SKY_SOFT }}>
      <Ripples className="pointer-events-none absolute -right-16 -top-16 h-72 w-72 opacity-60" color={SKY} />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-36 text-center sm:pt-44">
        <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>{kicker}</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-6xl" style={{ ...serif, color: NAVY }}>{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed" style={{ color: "#4a5a6a" }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---------- SERVICES ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Our services", "How we help you hear", "Gentle, thorough hearing care for every age — from a simple wax removal to a full hearing assessment and aftercare.")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="text-3xl font-semibold" style={{ ...serif, color: NAVY }}>{section.section}</h2>}
                  <div className="mt-8 space-y-12">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="text-sm font-bold uppercase tracking-[0.18em]" style={{ color: TEAL }}>{catg.category}</h3>
                        )}
                        {/* clean divider rows: name+desc left, price right. No cards, no dotted leaders. */}
                        <ul className="mt-4 divide-y-2" style={{ borderColor: SKY_SOFT, ["--tw-divide-opacity" as string]: "1" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-lg font-semibold" style={{ color: NAVY }}>{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-base leading-relaxed" style={{ color: "#56657a" }}>{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-lg font-bold" style={{ color: TEAL }}>{item.price}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-lg" style={{ color: "#56657a" }}>Our services are coming soon.</p>}

          <div className="mt-16 rounded-3xl px-8 py-12 text-center" style={{ background: CREAM, border: `2px solid #e3d3b6` }}>
            <h3 className="text-2xl font-semibold" style={{ ...serif, color: NAVY }}>Not sure what you need?</h3>
            <p className="mx-auto mt-3 max-w-lg text-lg leading-relaxed" style={{ color: "#4a5a6a" }}>Start with a free hearing test. We&apos;ll listen, assess and explain everything clearly.</p>
            <a href={book} className="mt-7 inline-flex rounded-full px-9 py-4 text-base font-bold tracking-wide text-white transition hover:opacity-90" style={{ background: NAVY }}>Book a free hearing test</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "Trusted hearing care, close to home")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-xl leading-[1.9]" style={{ color: "#3a4756" }}>{content.about}</p>
          ) : <p className="text-lg" style={{ color: "#56657a" }}>Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-semibold sm:text-5xl" style={{ ...serif, color: AMBER }}>{s.value}</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.1em]" style={{ color: "#56657a" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className="border-y-2" style={{ background: SKY_SOFT, borderColor: "#cfe0e7" }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>Our team</p>
                <h2 className="mt-3 text-3xl font-semibold sm:text-4xl" style={{ ...serif, color: NAVY }}>Meet your audiologists</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="rounded-3xl bg-white p-6 text-center shadow-[0_8px_30px_rgba(36,59,83,0.08)]">
                    <div className="mx-auto h-40 w-40 overflow-hidden rounded-full ring-4" style={{ background: SKY, ["--tw-ring-color" as string]: CREAM }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p data-edit={`team:${m.id}:name`} className="mt-5 text-xl font-semibold" style={{ color: NAVY }}>{m.name}</p>
                    {m.role && <p data-edit={`team:${m.id}:role`} className="text-base" style={{ color: TEAL }}>{m.role}</p>}
                    {m.credentials && <p className="mt-1 text-sm" style={{ color: "#7a8696" }}>{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>Good to know</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl" style={{ ...serif, color: NAVY }}>Your questions, answered</h2>
          </div>
          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border-2 px-6 py-5" style={{ borderColor: SKY, background: "#fff" }}>
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold" style={{ color: NAVY }}>
                  {f.q}
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-xl leading-none text-white transition group-open:rotate-45" style={{ background: AMBER }} aria-hidden>+</span>
                </summary>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "#4a5a6a" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside our clinic", "A warm, calm space designed to put you at ease.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-lg" style={{ color: "#56657a" }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- APPOINTMENTS (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Appointments", "Book your visit", "Request a free hearing test or any of our services. Tell us a little about you and we&apos;ll be in touch to confirm.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-semibold" style={{ ...serif, color: NAVY }}>Warm, unhurried care</h2>
            <p className="mt-4 text-lg leading-relaxed" style={{ color: "#4a5a6a" }}>There&apos;s no rush and no jargon. We&apos;ll listen to you, carry out a thorough assessment, and explain exactly what we find — so you always know where you stand.</p>
            <ul className="mt-8 space-y-4 text-lg" style={{ color: "#3a4756" }}>
              {TRUST.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-bold text-white" style={{ background: TEAL }} aria-hidden>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-lg" style={{ color: "#4a5a6a" }}>Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-bold" style={{ color: TEAL }}>{content.phone}</a></p>
            )}
          </div>
          <ClarityBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit us, call, or send a message — we&apos;ll always get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-semibold" style={{ ...serif, color: NAVY }}>Clinic details</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed" style={{ color: "#3a4756" }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: NAVY }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-sm space-y-2.5 border-t-2 pt-6 text-base" style={{ borderColor: SKY, color: "#3a4756" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`} className="font-semibold">{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#56657a" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3.5 text-base font-bold tracking-wide text-white transition hover:opacity-90" style={{ background: TEAL }}>Get directions</a>
              )}
              <a href={book} className="inline-flex rounded-full border-2 px-7 py-3.5 text-base font-bold tracking-wide transition hover:bg-[#243B53] hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>Book an appointment</a>
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-4" style={{ color: NAVY }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>
          {contactOn ? (
            <SiteContactForms
              tenantId={tenant.id}
              booking={false}
              contact
              contactTitle="Send us a message"
              contactBlurb="Have a question about your hearing, an appointment, or anything else? We'd love to help."
              contactCta="Send message"
              theme={{ card: CREAM, cardBorder: "#e3d3b6", heading: NAVY, blurb: "#4a5a6a", label: NAVY, fieldBg: "#ffffff", fieldBorder: "#cdb89a", fieldText: NAVY, button: NAVY, buttonText: "#ffffff", radius: "1rem", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden rounded-3xl">
                <iframe title="Map" src={content.map_url} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
              </div>
            )
          )}
        </section>
      </>,
    );
  }

  // ---------- HOME ----------
  const teaseCategories = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 6);

  return shell(
    <>
      {/* HERO — calm cream/navy, generous accessible type, sound-wave ripples */}
      <section className="relative isolate overflow-hidden" style={{ background: CREAM }}>
        <Ripples className="pointer-events-none absolute -left-24 top-10 h-[28rem] w-[28rem] opacity-50" color={SKY} />
        <Ripples className="pointer-events-none absolute -bottom-32 right-[-6rem] h-[34rem] w-[34rem] opacity-40" color={AMBER} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
          <div>
            {content.tagline && <p data-edit="content.tagline" className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>{content.tagline}</p>}
            <h1 data-edit="tenant.business_name" className="mt-4 text-5xl font-semibold leading-[1.05] sm:text-7xl" style={{ ...serif, color: NAVY }}>Hear life clearly again</h1>
            <p className="mt-6 max-w-md text-xl leading-relaxed" style={{ color: "#3a4756" }}>
              Warm, expert hearing care for all ages at {name}. From free hearing tests to gentle wax removal and the latest hearing aids — we make it easy to reconnect with the people and sounds you love.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-base font-bold tracking-wide text-white shadow-lg transition hover:opacity-90" style={{ background: NAVY }}>Book a free hearing test</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border-2 px-9 py-4 text-base font-bold tracking-wide transition hover:bg-white" style={{ borderColor: NAVY, color: NAVY }}>Our services</a>
              )}
            </div>
            <ul className="mt-9 flex flex-wrap gap-x-7 gap-y-2 text-base font-semibold" style={{ color: "#3a4756" }}>
              {TRUST.slice(0, 3).map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span className="text-lg" style={{ color: TEAL }} aria-hidden>✓</span>{t}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] ring-8 ring-white shadow-[0_24px_60px_rgba(36,59,83,0.18)]" style={{ background: SKY }}>
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="grid aspect-[4/5] w-full place-items-center">
                  <Ripples className="h-56 w-56" color={NAVY} />
                </div>
              )}
            </div>
            {/* warm amber rating chip */}
            <div className="absolute -bottom-5 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-[0_12px_30px_rgba(36,59,83,0.16)]">
              <span className="grid h-10 w-10 place-items-center rounded-full text-lg" style={{ background: AMBER, color: NAVY }} aria-hidden>★</span>
              <div>
                <p className="text-base font-bold" style={{ color: NAVY }}>4.9 out of 5</p>
                <p className="text-sm" style={{ color: "#56657a" }}>Rated by our clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE HELP — services band */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>How we help</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl" style={{ ...serif, color: NAVY }}>Complete hearing care, under one roof</h2>
        </div>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HELP.map((h) => (
            <div key={h.title} className="rounded-3xl border-2 p-7 transition hover:-translate-y-1" style={{ borderColor: SKY_SOFT, background: "#fff" }}>
              <span className="grid h-14 w-14 place-items-center rounded-2xl" style={{ background: SKY_SOFT, color: NAVY }} aria-hidden>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{h.icon}</svg>
              </span>
              <h3 className="mt-5 text-xl font-semibold" style={{ color: NAVY }}>{h.title}</h3>
              <p className="mt-2 text-base leading-relaxed" style={{ color: "#56657a" }}>{h.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section style={{ background: SKY_SOFT }}>
          <div className="mx-auto max-w-3xl px-6 py-20 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>Welcome</p>
            <p data-edit="content.about" className="mt-6 text-2xl leading-[1.7]" style={{ ...serif, color: NAVY }}>{content.about}</p>
          </div>
        </section>
      )}

      {/* YOUR HEARING JOURNEY — test → fit → follow-up */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>Your hearing journey</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl" style={{ ...serif, color: NAVY }}>Three calm, simple steps</h2>
        </div>
        <div className="relative mt-14 grid gap-8 lg:grid-cols-3">
          {JOURNEY.map((j) => (
            <div key={j.step} className="relative rounded-3xl px-8 py-10" style={{ background: CREAM, border: "2px solid #e3d3b6" }}>
              <span className="text-5xl font-semibold" style={{ ...serif, color: AMBER }}>{j.step}</span>
              <h3 className="mt-4 text-2xl font-semibold" style={{ color: NAVY }}>{j.title}</h3>
              <p className="mt-3 text-base leading-relaxed" style={{ color: "#4a5a6a" }}>{j.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* services teaser → links to full services page */}
      {teaseCategories.length > 0 && (
        <section style={{ background: NAVY }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: AMBER }}>What we offer</p>
                <h2 style={serif} className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Our services</h2>
              </div>
              <a href={href("services")} className="inline-flex rounded-full px-7 py-3.5 text-base font-bold tracking-wide text-[#243B53] transition hover:opacity-90" style={{ background: AMBER }}>View all services</a>
            </div>
            <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
              {teaseCategories.map((c) => (
                <div key={c.label} className="border-t-2 pt-5" style={{ borderColor: "rgba(224,164,94,0.4)" }}>
                  <h3 className="text-xl font-semibold text-white">{c.label}</h3>
                  <ul className="mt-3 space-y-1.5 text-base text-white/70">
                    {c.items.slice(0, 4).map((item) => (
                      <li key={item.id} data-edit={`item:${item.id}:name`}>{item.name}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* reviews — static design cards */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>Kind words</p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-5xl" style={{ ...serif, color: NAVY }}>People we&apos;ve helped hear again</h2>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {REVIEWS.map((r) => (
            <figure key={r.author} className="flex flex-col rounded-3xl p-8" style={{ background: SKY_SOFT }}>
              <div className="flex gap-1 text-xl" aria-hidden style={{ color: AMBER }}>
                {Array.from({ length: 5 }).map((_, s) => <span key={s}>★</span>)}
              </div>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed" style={{ color: "#3a4756" }}>“{r.quote}”</blockquote>
              <figcaption className="mt-5 text-base font-bold" style={{ color: NAVY }}>{r.author}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* booking band: warm navy panel + booking form */}
      <section style={{ background: SKY_SOFT }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <p className="text-sm font-bold uppercase tracking-[0.24em]" style={{ color: TEAL }}>Ready when you are</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-5xl" style={{ ...serif, color: NAVY }}>Take the first step today</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: "#4a5a6a" }}>Booking takes a minute. We&apos;ll confirm a time that suits you — at the clinic or in the comfort of your own home.</p>
            {content.phone && (
              <p className="mt-6 text-lg" style={{ color: "#3a4756" }}>Or call us on <a href={`tel:${content.phone}`} className="font-bold" style={{ color: TEAL }}>{content.phone}</a></p>
            )}
          </div>
          {bookingOn ? (
            <ClarityBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="flex flex-col justify-center rounded-3xl px-8 py-12" style={{ background: NAVY }}>
              <h3 style={serif} className="text-2xl font-semibold text-white">Get in touch</h3>
              {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-lg text-white">{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-lg text-white/85">{content.email}</a>}
              <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-base font-bold tracking-wide text-[#243B53] transition hover:opacity-90" style={{ background: AMBER }}>Contact us</a>
            </div>
          )}
        </div>
      </section>

      {/* details band: address + hours + contact */}
      <section className="border-t-2" style={{ background: CREAM, borderColor: "#e3d3b6" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-base leading-relaxed" style={{ color: "#3a4756" }}>{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-base font-bold" style={{ color: TEAL }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-base" style={{ color: "#3a4756" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`} className="font-semibold">{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#56657a" }}>{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-base" style={{ color: "#56657a" }}>Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-sm font-bold uppercase tracking-[0.16em]" style={{ color: TEAL }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-base" style={{ color: "#3a4756" }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3.5 text-base font-bold tracking-wide text-white transition hover:opacity-90" style={{ background: NAVY }}>Book an appointment</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
