import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Milestone — a warm, patient, reassuring driving school for nervous and
// first-time learners. Calm and supportive: soft coral + peach on warm cream
// with a calm navy ink and sage detail, rounded friendly shapes and a gentle
// winding-road / milestone-marker signature. "Learn to drive, at your own
// pace." MULTI-PAGE: nav opens real routes (Lessons / About / Gallery /
// Contact) under basePath. Palette is baked; the tenant swaps in their own
// copy, lesson packages, gallery, hours and address. Best suits: driving
// school / instructor focused on anxious or first-time learners.

const display = { fontFamily: "var(--font-fraunces)" } as const;

const CREAM = "#fbf3ec"; // warm cream page background
const CARD = "#ffffff";
const NAVY = "#25364b"; // calm navy ink
const MUTE = "#5f6c7c"; // muted slate body
const CORAL = "#ee7a5f"; // warm coral accent
const CORAL_DK = "#d65f44";
const PEACH = "#f8d2be"; // soft peach
const PEACH_SOFT = "#fbe5d9";
const SAGE = "#9bb29e"; // calm sage

// Signature motif: a gentle winding road with milestone markers + a friendly
// L-plate. Reassuring, hand-drawn-soft, not technical.
function WindingRoad({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 300" fill="none" aria-hidden className={className} preserveAspectRatio="xMidYMid meet">
      <path
        d="M70 290 C 70 230, 250 220, 250 165 C 250 110, 90 110, 90 60 C 90 25, 200 20, 290 18"
        stroke={NAVY}
        strokeOpacity="0.18"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M70 290 C 70 230, 250 220, 250 165 C 250 110, 90 110, 90 60 C 90 25, 200 20, 290 18"
        stroke={CREAM}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeDasharray="2 16"
      />
      {/* milestone markers along the journey */}
      {[
        { cx: 70, cy: 285 },
        { cx: 250, cy: 165 },
        { cx: 90, cy: 62 },
        { cx: 290, cy: 18 },
      ].map((m, i) => (
        <g key={i}>
          <circle cx={m.cx} cy={m.cy} r="13" fill={i === 3 ? CORAL : "#fff"} stroke={i === 3 ? CORAL : SAGE} strokeWidth="3" />
          {i === 3 && <circle cx={m.cx} cy={m.cy} r="4.5" fill="#fff" />}
        </g>
      ))}
    </svg>
  );
}

// Friendly square L-plate badge.
function LPlate({ className, size = 44 }: { className?: string; size?: number }) {
  return (
    <span
      aria-hidden
      className={`inline-flex items-center justify-center ${className ?? ""}`}
      style={{ width: size, height: size, background: "#fff", borderRadius: size * 0.22, border: `${Math.max(2, size * 0.07)}px solid ${CORAL}` }}
    >
      <span style={{ ...display, color: CORAL, fontSize: size * 0.56, lineHeight: 1, fontWeight: 600 }}>L</span>
    </span>
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ background: PEACH_SOFT, color: CORAL_DK }}>
      {children}
    </span>
  );
}

export default function MilestoneDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const cta = href("contact");
  const ctaLabel = "Book your first lesson";

  const nav = [
    groups.length > 0 && { label: "Lessons", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const header = (
    <header className="sticky top-0 z-50" style={{ background: `${CREAM}f0`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${NAVY}12` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-9 w-auto object-contain" />
          ) : (
            <LPlate size={36} />
          )}
          <span data-edit="tenant.business_name" style={{ ...display, color: NAVY }} className="text-xl font-semibold">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold transition hover:opacity-70" style={{ color: MUTE }}>{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="text-sm font-semibold" style={{ color: CORAL_DK }}>{content.phone}</a>}
          <a href={cta} className="rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
        </div>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={NAVY} panelBg={CREAM} panelText={NAVY} ctaBg={CORAL} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: NAVY, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span style={display} className="text-2xl font-semibold">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded-full bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/85 transition hover:bg-white/20">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Get in touch</h4>
            <div className="mt-4 space-y-2 text-sm text-white/80">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.16em] text-white/45">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/45">© {new Date().getFullYear()} {name}. Learn to drive, at your own pace.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen overflow-x-hidden font-body">
      {header}
      <div style={{ color: NAVY }}>{children}</div>
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: PEACH_SOFT, borderBottom: `1px solid ${NAVY}10` }}>
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <Pill>{kicker}</Pill>
        <h1 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed" style={{ color: MUTE }}>{sub}</p>}
      </div>
    </section>
  );

  // Clean thin-divider lessons & packages list. Used on home (featured) + services.
  const lessonList = (limit?: number) => {
    if (limit) {
      const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: `${NAVY}12` }}>
          {items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} style={{ ...display, color: NAVY }} className="text-[17px] font-semibold">{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: CORAL_DK }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: NAVY }} className="text-2xl font-semibold">{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: CORAL_DK }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: `${NAVY}12` }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} style={{ ...display, color: NAVY }} className="text-[17px] font-semibold">{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: CORAL_DK }}>{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // Owner-managed reviews (edited in the dashboard); section hides when empty.
  const reviews = (content.reviews ?? []).map((r) => ({ quote: r.quote, who: r.name ?? "", note: r.meta }));

  const reviewsSection = reviews.length === 0 ? null : (
    <section style={{ background: CARD }}>
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <Pill>Kind words</Pill>
          <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-semibold sm:text-4xl">From learners who were nervous too</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {reviews.map((r, i) => (
            <figure key={i} className="flex h-full flex-col rounded-[1.75rem] p-7" style={{ background: CREAM, border: `1px solid ${NAVY}0d` }}>
              <span aria-hidden style={{ ...display, color: CORAL }} className="text-3xl leading-none">“</span>
              <blockquote className="mt-2 text-[15px] leading-relaxed" style={{ color: NAVY }}>{r.quote}</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold text-white" style={{ background: SAGE }}>{r.who.charAt(0)}</span>
                <span>
                  <span className="block text-sm font-semibold" style={{ color: NAVY }}>{r.who}</span>
                  <span className="block text-xs" style={{ color: MUTE }}>{r.note}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );

  // ---- LESSONS & PACKAGES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lessons & packages", "Lessons that go at your pace", "Manual and automatic lessons, gentle starter blocks, refreshers and intensive courses — clear prices, no pressure.")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {groups.length > 0 ? lessonList() : <p style={{ color: MUTE }}>Our lesson packages are coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Friendly instructors, all ages welcome")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.85]" style={{ color: MUTE }}>{content.about}</p>
          ) : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-10 aspect-[16/9] w-full rounded-[2rem] object-cover" />
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Happy new drivers")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Book your first lesson", "Tell us where you are and what worries you — we will take it gently and get you booked in when you are ready.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] p-8" style={{ background: PEACH_SOFT }}>
            <h2 style={{ ...display, color: NAVY }} className="text-xl font-semibold">Get in touch</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: CORAL_DK }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: CORAL_DK }}>{content.email}</a>}
            </div>
            {content.service_areas && content.service_areas.length > 0 && (
              <div className="mt-6 border-t pt-5" style={{ borderColor: `${NAVY}12` }}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: CORAL_DK }}>Areas covered</p>
                <p className="mt-2 text-sm" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
              </div>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t pt-5 text-sm" style={{ borderColor: `${NAVY}12`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`}>{h.open}</span></li>
                ))}
              </ul>
            )}
          </div>
          {(bookingOn || contactOn) && (
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book your first lesson"
              bookingBlurb="Pop in your details and we will give you a friendly call to arrange a relaxed first lesson."
              bookingCta="Request a lesson"
              theme={{ card: CARD, cardBorder: `${NAVY}12`, heading: NAVY, blurb: MUTE, label: NAVY, fieldBg: CREAM, fieldBorder: `${NAVY}1f`, fieldText: NAVY, button: CORAL, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredCount = Math.min(6, groups.flatMap((g) => g.categories.flatMap((c) => c.items)).length);

  return shell(
    <>
      {/* hero — warm, reassuring, human */}
      <section className="relative overflow-hidden" style={{ background: CREAM }}>
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full" style={{ background: PEACH, opacity: 0.5 }} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div className="relative">
            <div className="inline-flex items-center gap-3">
              <LPlate size={44} />
              <Pill>Nervous? You're in safe hands</Pill>
            </div>
            <h1 style={{ ...display, color: NAVY }} className="mt-6 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              Learn to drive, at your own pace.
            </h1>
            <p className="mt-3 text-lg font-semibold" style={{ color: CORAL_DK }}>
              <span data-edit="tenant.business_name">{name}</span>
            </p>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[17px] leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="rounded-full px-7 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ background: "#fff", color: NAVY, border: `1px solid ${NAVY}1f` }}>Call {content.phone}</a>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" style={{ color: SAGE }}>
              <span style={{ color: MUTE }}>♥ Patient, friendly instructors</span>
              <span style={{ color: MUTE }}>♥ First-timers &amp; all ages</span>
              <span style={{ color: MUTE }}>♥ Go at your pace</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ background: PEACH_SOFT }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="relative flex aspect-[4/5] w-full items-center justify-center" style={{ background: PEACH_SOFT }}>
                  <WindingRoad className="h-[78%] w-[78%]" />
                </div>
              )}
            </div>
            <span aria-hidden className="absolute -bottom-5 -left-5 flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold shadow-xl" style={{ background: "#fff", color: NAVY }}>
              <span className="flex h-7 w-7 items-center justify-center rounded-full text-white" style={{ background: SAGE }}>✓</span>
              No pressure, ever
            </span>
          </div>
        </div>
      </section>

      {/* "we make it easy" reassurance band */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <Pill>We make it easy</Pill>
          <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-semibold sm:text-4xl">Everything you need to feel calm behind the wheel</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { icon: "☕", title: "Patient instructors", body: "Warm, friendly female and male instructors who never rush you and explain everything gently." },
            { icon: "🚗", title: "Calm, modern cars", body: "Clean, easy dual-control cars that are simple to handle — perfect for your very first time." },
            { icon: "🌿", title: "No pressure, ever", body: "We move at your pace. If something feels too much, we slow right down and try again together." },
          ].map((c) => (
            <div key={c.title} className="rounded-[1.75rem] p-7" style={{ background: CARD, border: `1px solid ${NAVY}0d` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full text-2xl" style={{ background: PEACH_SOFT }}>{c.icon}</span>
              <h3 style={{ ...display, color: NAVY }} className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about teaser */}
      {content.about && (
        <section style={{ background: NAVY }} className="text-white">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <Pill>About us</Pill>
            <p data-edit="content.about" style={{ ...display }} className="mt-6 text-2xl font-medium leading-[1.5] sm:text-[1.7rem]">{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex text-sm font-semibold transition hover:opacity-80" style={{ color: PEACH }}>More about us →</a>
          </div>
        </section>
      )}

      {/* lessons & packages preview */}
      {featuredCount > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div>
            <Pill>Lessons &amp; packages</Pill>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-semibold sm:text-4xl">Gentle lessons, clear prices</h2>
          </div>
          <div className="mt-10 rounded-[2rem] p-7 sm:p-9" style={{ background: CARD, border: `1px solid ${NAVY}0d` }}>
            {lessonList(6)}
          </div>
          <div className="mt-10">
            <a href={href("services")} className="inline-flex rounded-full px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: CORAL }}>See all lessons &amp; prices</a>
          </div>
        </section>
      )}

      {/* "your journey to passing" step band */}
      <section style={{ background: PEACH_SOFT }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <Pill>Your journey</Pill>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-semibold sm:text-4xl">Your journey to passing</h2>
            <p className="mt-3 text-[16px] leading-relaxed" style={{ color: MUTE }}>One gentle milestone at a time — we are with you the whole way.</p>
          </div>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "1", title: "A friendly chat", body: "We listen to your worries and find a slot that suits you — no awkward sales pitch." },
              { n: "2", title: "Your first lesson", body: "Quiet roads, a calm car and an instructor who keeps it all relaxed and simple." },
              { n: "3", title: "Building confidence", body: "Step by step we add skills at your pace, celebrating every little milestone." },
              { n: "4", title: "Test ready", body: "Mock tests and gentle prep so you walk into your test calm and ready to pass." },
            ].map((s) => (
              <li key={s.n} className="rounded-[1.75rem] p-7" style={{ background: CARD, border: `1px solid ${NAVY}0d` }}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full text-base font-semibold text-white" style={{ background: CORAL }}>{s.n}</span>
                <h3 style={{ ...display, color: NAVY }} className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* learner reviews */}
      {reviewsSection}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <Pill>Recent passes</Pill>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-3xl font-semibold sm:text-4xl">Another happy new driver</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>
          {gallery.length > 4 && (
            <div className="mt-8">
              <a href={href("gallery")} className="inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: CORAL_DK }}>See the gallery →</a>
            </div>
          )}
        </section>
      )}

      {/* book your first lesson CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center" style={{ background: CORAL }}>
          <span aria-hidden className="pointer-events-none absolute -left-12 -top-12 h-44 w-44 rounded-full" style={{ background: "#ffffff", opacity: 0.12 }} />
          <h2 style={{ ...display }} className="text-3xl font-semibold text-white sm:text-4xl">Ready when you are</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/90">Take the first small step. Book your first lesson and we will make it as gentle and reassuring as possible.</p>
          <a href={cta} className="mt-8 inline-flex rounded-full px-9 py-4 text-sm font-semibold transition hover:opacity-90" style={{ background: "#fff", color: CORAL_DK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
