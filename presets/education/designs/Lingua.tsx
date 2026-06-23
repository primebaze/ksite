import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Lingua — a vibrant, welcoming LANGUAGE SCHOOL. Bright teal + warm coral +
// sunny yellow on off-white. Signature: a friendly global hero built from
// speech bubbles saying hello in many languages (Bonjour / Hola / Ciao) wrapped
// around a globe — "Speak with confidence". Distinct structural beats: a
// "what we offer" course list, an A1–C2 levels progression band, a native-
// teachers trust strip, an "Assess → Learn → Speak" how-it-works band, a
// friendly gallery and a free-assessment CTA. MULTI-PAGE: nav opens real routes
// (Courses / About / Gallery / Contact) under basePath. Palette is baked; the
// tenant swaps in their own photography, copy, courses, hours and address.
// Best suits: language school / tutoring centre / conversation classes.

const display = { fontFamily: "var(--font-fraunces)" } as const;

const TEAL = "#1AA3A3"; // bright primary
const TEAL_DEEP = "#13807f";
const TEAL_SOFT = "#dff1f0"; // tinted panels
const CORAL = "#F2724B"; // warm accent
const SUN = "#F7C948"; // sunny yellow
const PAPER = "#F6F8F7"; // off-white page
const INK = "#1E2A2A"; // deep ink text
const MUTE = "#5a6a69"; // muted body

// Speech-bubble greeting chip used across the design (the signature motif).
function Hello({
  text,
  bg,
  color,
  className,
  rotate = 0,
}: {
  text: string;
  bg: string;
  color: string;
  className?: string;
  rotate?: number;
}) {
  return (
    <span
      className={`relative inline-flex items-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm ${className ?? ""}`}
      style={{ background: bg, color, transform: `rotate(${rotate}deg)`, borderRadius: "1rem 1rem 1rem 0.25rem" }}
    >
      {text}
    </span>
  );
}

function Kicker({ children, color = TEAL, bg = TEAL_SOFT }: { children: ReactNode; color?: string; bg?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ background: bg, color }}>
      {children}
    </span>
  );
}

export default function LinguaDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const ctaLabel = "Book a free assessment";

  const greetings = ["Bonjour", "Hola", "Ciao", "Hallo", "Olá", "你好", "こんにちは", "مرحبا"];

  const nav = [
    groups.length > 0 && { label: "Courses", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const header = (
    <header className="sticky top-0 z-50" style={{ background: `${PAPER}f0`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${INK}12` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-9 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-9 w-9 items-center justify-center text-lg font-bold text-white" style={{ background: TEAL, borderRadius: "0.85rem 0.85rem 0.85rem 0.2rem" }}>¡</span>
          )}
          <span data-edit="tenant.business_name" style={{ ...display, color: INK }} className="text-xl font-semibold">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold transition hover:opacity-70" style={{ color: MUTE }}>{l.label}</a>
          ))}
        </nav>
        <a href={cta} className="hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex" style={{ background: CORAL }}>{ctaLabel}</a>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={INK} panelBg={PAPER} panelText={INK} ctaBg={CORAL} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: INK, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span style={display} className="text-2xl font-semibold">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">{content.tagline}</p>}
          <div className="mt-6 flex flex-wrap gap-2">
            <Hello text="Hola" bg={TEAL} color="#fff" rotate={-3} />
            <Hello text="Ciao" bg={SUN} color={INK} rotate={2} />
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold transition hover:bg-white/25">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60" {...editCopy(content, "footer_contact", "Visit & contact")} />
            <div className="mt-4 space-y-2 text-sm text-white/85">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60" {...editCopy(content, "footer_hours", "Class hours")} />
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/60" {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/55">© {new Date().getFullYear()} {name}. Speak with confidence.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen overflow-x-hidden font-body">
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const pageHeader = (kicker: string, kickerKey: string, title: string, titleKey: string, sub?: string, subKey?: string) => (
    <section className="relative overflow-hidden" style={{ background: TEAL_SOFT }}>
      <div className="mx-auto max-w-4xl px-6 pb-12 pt-16 text-center sm:pt-20">
        <Kicker><span {...editCopy(content, kickerKey, kicker)} /></Kicker>
        <h1 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold sm:text-5xl" {...editCopy(content, titleKey, title)} />
        {sub && <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, subKey ?? titleKey, sub)} />}
      </div>
    </section>
  );

  // Clean thin-divider course list — name + description left, price right.
  const courseList = (limit?: number) => {
    const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
    const shown = limit ? items.slice(0, limit) : null;
    if (limit) {
      return (
        <ul className="divide-y" style={{ borderColor: `${INK}12` }}>
          {shown!.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-semibold">{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: TEAL_DEEP }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: TEAL_DEEP }} className="text-2xl font-semibold">{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CORAL }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: `${INK}12` }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-semibold">{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: TEAL_DEEP }}>{item.price}</span>}
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

  // ---- COURSES ----
  if (page === "services") {
    return shell(
      <>
        {pageHeader("What we offer", "courses_kicker", "Courses for every learner", "courses_title", "Beginner to advanced, conversation, exam prep and business language — group or 1-to-1.", "courses_sub")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {groups.length > 0 ? courseList() : <p className="text-center" style={{ color: MUTE }}>Our course list is coming soon.</p>}
          <div className="mt-12 text-center">
            <a href={cta} className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {pageHeader("About us", "about_kicker", "A warm, global classroom", "about_title")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
          ) : (
            <p style={{ color: MUTE }}>Our story is coming soon.</p>
          )}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-10 aspect-[16/9] w-full rounded-3xl object-cover" />
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {pageHeader("Gallery", "gallery_kicker", "Life at the school", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-16 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {pageHeader("Get in touch", "contact_kicker", "Start speaking with us", "contact_title", "Tell us which language you'd like to learn and your level — we'll book a free assessment to match you to the right class.", "contact_sub")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl p-8" style={{ background: TEAL_SOFT }}>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold" {...editCopy(content, "contact_find_heading", "Find us")} />
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: TEAL_DEEP }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: TEAL_DEEP }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t pt-5 text-sm" style={{ borderColor: `${INK}14`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              <Hello text="Bonjour" bg={TEAL} color="#fff" rotate={-3} />
              <Hello text="Olá" bg={SUN} color={INK} rotate={3} />
            </div>
          </div>
          {(bookingOn || contactOn) && (
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book a free assessment"
              bookingBlurb="Tell us your target language and current level and we'll arrange a friendly, no-pressure assessment."
              bookingCta="Request my assessment"
              theme={{ card: "#ffffff", cardBorder: `${INK}12`, heading: INK, blurb: MUTE, label: MUTE, fieldBg: PAPER, fieldBorder: `${INK}1f`, fieldText: INK, button: CORAL, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredCount = Math.min(6, groups.flatMap((g) => g.categories.flatMap((c) => c.items)).length);

  const levels = [
    { code: "A1", label: "Beginner" },
    { code: "A2", label: "Elementary" },
    { code: "B1", label: "Intermediate" },
    { code: "B2", label: "Upper int." },
    { code: "C1", label: "Advanced" },
    { code: "C2", label: "Mastery" },
  ];

  const steps = [
    { n: "01", title: "Assess", body: "A free chat and short placement to find your exact level and goals." },
    { n: "02", title: "Learn", body: "Small, lively classes with native teachers and real conversation from day one." },
    { n: "03", title: "Speak", body: "Build confidence fast and use your new language out in the world." },
  ];

  return shell(
    <>
      {/* hero — friendly global, speech bubbles around a globe */}
      <section className="relative overflow-hidden" style={{ background: TEAL }}>
        <span aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full" style={{ background: "#ffffff14" }} />
        <span aria-hidden className="pointer-events-none absolute -bottom-28 -left-20 h-72 w-72 rounded-full" style={{ background: "#ffffff10" }} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div className="text-white">
            <Kicker color={INK} bg={SUN}><span {...editCopy(content, "hero_kicker", "Native teachers · all levels")} /></Kicker>
            <h1 style={{ ...display }} className="mt-5 text-5xl font-semibold leading-[1.04] sm:text-6xl" {...editCopy(content, "hero_headline", "Speak with confidence")} />
            <p className="mt-4 text-lg font-medium text-white/90">
              <span data-edit="tenant.business_name">{name}</span>
            </p>
            {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-md text-[17px] leading-relaxed text-white/85">{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ color: TEAL_DEEP }} {...editCopy(content, "hero_courses_cta", "See courses")} />
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {greetings.slice(0, 5).map((g, i) => (
                <Hello key={g} text={g} bg={i % 2 === 0 ? "#ffffff" : SUN} color={INK} rotate={i % 2 === 0 ? -2 : 3} />
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-md">
              {/* globe */}
              <div className="absolute inset-6 overflow-hidden rounded-full shadow-2xl ring-8 ring-white/20">
                {heroVideo ? (
                  <video src={heroVideo} autoPlay muted loop playsInline className="h-full w-full object-cover" />
                ) : hero ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img data-edit-image="hero" src={hero} alt="" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-8xl" style={{ background: TEAL_DEEP }}>🌍</div>
                )}
              </div>
              {/* orbiting greeting bubbles */}
              <span className="absolute left-0 top-2"><Hello text="Bonjour" bg={SUN} color={INK} rotate={-8} /></span>
              <span className="absolute -right-2 top-1/3"><Hello text="Hola" bg={CORAL} color="#fff" rotate={6} /></span>
              <span className="absolute bottom-2 left-1/4"><Hello text="Ciao" bg="#ffffff" color={TEAL_DEEP} rotate={-4} /></span>
              <span className="absolute -bottom-1 right-4"><Hello text="你好" bg={INK} color="#fff" rotate={5} /></span>
            </div>
          </div>
        </div>
      </section>

      {/* trust strip — native teachers / small classes */}
      <section className="border-b" style={{ background: "#ffffff", borderColor: `${INK}0d` }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-3">
          {[
            { icon: "🗣️", title: "Native teachers", body: "Learn from qualified speakers who bring the language to life." },
            { icon: "👥", title: "Small classes", body: "Group sizes that keep everyone speaking, plus 1-to-1 options." },
            { icon: "🎯", title: "Exam prep", body: "Structured paths for IELTS, DELE and other recognised exams." },
          ].map((c) => (
            <div key={c.title} className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl" style={{ background: TEAL_SOFT }}>{c.icon}</span>
              <div>
                <h3 style={{ ...display, color: INK }} className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{c.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* about teaser */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Kicker><span {...editCopy(content, "home_about_kicker", "Our approach")} /></Kicker>
          <p data-edit="content.about" style={{ ...display, color: INK }} className="mx-auto mt-6 max-w-2xl text-2xl font-medium leading-[1.5] sm:text-[1.7rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: TEAL_DEEP }} {...editCopy(content, "home_about_link", "More about us →")} />
        </section>
      )}

      {/* courses preview */}
      {featuredCount > 0 && (
        <section style={{ background: TEAL_SOFT }}>
          <div className="mx-auto max-w-3xl px-6 py-20">
            <div className="text-center">
              <Kicker color={CORAL} bg="#ffffff"><span {...editCopy(content, "home_courses_kicker", "What we offer")} /></Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl" {...editCopy(content, "home_courses_heading", "Courses for every learner")} />
              <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "home_courses_sub", "Conversation, exam prep, business language, kids & teens and 1-to-1.")} />
            </div>
            <div className="mt-10 rounded-3xl p-7 sm:p-9" style={{ background: "#ffffff" }}>
              {courseList(6)}
            </div>
            <div className="mt-10 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: TEAL }} {...editCopy(content, "home_courses_link", "View all courses")} />
            </div>
          </div>
        </section>
      )}

      {/* levels A1–C2 progression band */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <Kicker><span {...editCopy(content, "levels_kicker", "Your progression")} /></Kicker>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl" {...editCopy(content, "levels_heading", "From A1 to C2")} />
          <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: MUTE }} {...editCopy(content, "levels_sub", "Follow the Common European Framework — we'll place you at the right step and move you up as you grow.")} />
        </div>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {levels.map((lv, i) => (
            <div key={lv.code} className="rounded-2xl p-5 text-center" style={{ background: i === levels.length - 1 ? SUN : "#ffffff", border: `1px solid ${INK}10` }}>
              <span style={{ ...display, color: i === levels.length - 1 ? INK : TEAL_DEEP }} className="text-2xl font-semibold">{lv.code}</span>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: MUTE }}>{lv.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* how it works — Assess / Learn / Speak */}
      <section style={{ background: INK }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center text-white">
            <Kicker color={INK} bg={SUN}><span {...editCopy(content, "how_kicker", "How it works")} /></Kicker>
            <h2 style={{ ...display }} className="mt-4 text-3xl font-semibold sm:text-4xl" {...editCopy(content, "how_heading", "Assess → Learn → Speak")} />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n} className="rounded-3xl p-7" style={{ background: "#ffffff0d", border: "1px solid #ffffff1f" }}>
                <span style={{ ...display, color: SUN }} className="text-4xl font-semibold">{s.n}</span>
                <h3 style={{ ...display }} className="mt-3 text-xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <Kicker color={CORAL} bg={TEAL_SOFT}><span {...editCopy(content, "home_gallery_kicker", "Our school")} /></Kicker>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl" {...editCopy(content, "home_gallery_heading", "Friendly faces, real conversation")} />
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
            ))}
          </div>
          {gallery.length > 4 && (
            <div className="mt-8 text-center">
              <a href={href("gallery")} className="inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: TEAL_DEEP }} {...editCopy(content, "home_gallery_link", "See the gallery →")} />
            </div>
          )}
        </section>
      )}

      {/* free-assessment CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center" style={{ background: TEAL }}>
          <span aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full" style={{ background: "#ffffff14" }} />
          <div className="relative">
            <div className="mb-5 flex flex-wrap justify-center gap-2.5">
              <Hello text="Hallo" bg={SUN} color={INK} rotate={-4} />
              <Hello text="こんにちは" bg="#ffffff" color={TEAL_DEEP} rotate={3} />
              <Hello text="مرحبا" bg={CORAL} color="#fff" rotate={-2} />
            </div>
            <h2 style={{ ...display, color: "#fff" }} className="text-3xl font-semibold sm:text-4xl" {...editCopy(content, "cta_heading", "Ready to start speaking?")} />
            <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/85" {...editCopy(content, "cta_sub", "Book a free, friendly assessment and we'll match you to the perfect class.")} />
            <a href={cta} className="mt-8 inline-flex rounded-full px-9 py-4 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
          </div>
        </div>
      </section>
    </>,
  );
}
