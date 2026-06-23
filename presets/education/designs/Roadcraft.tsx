import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Roadcraft — a bold, results-driven driving school. Confident, premium and
// no-nonsense: charcoal canvas, hi-vis amber accent, road-marking white and a
// signal-red urgency cue. Signature motif is the dashed road lane marking and a
// big pass-rate badge — high-pass-rate energy, get test-ready fast. MULTI-PAGE:
// nav opens real routes (Lessons / About / Gallery / Contact) under basePath.
// Palette is baked; the tenant swaps in their own copy, courses, gallery, hours
// and address. Best suits: driving school / intensive-course instructor.

const CHARCOAL = "#1B1D21"; // charcoal canvas / ink
const AMBER = "#F5A201"; // hi-vis amber accent
const PAPER = "#F4F5F2"; // road-marking white
const ASPHALT = "#5A6068"; // asphalt grey (muted body)
const RED = "#D8412F"; // signal red (urgency)
const LINE = "#E2E3DF"; // hairline on paper
const CHAR_2 = "#23262B"; // raised charcoal panel

// Dashed lane-marking divider — the structural signature.
function Lane({ color = AMBER, className = "" }: { color?: string; className?: string }) {
  return (
    <div
      aria-hidden
      className={`h-1.5 w-full ${className}`}
      style={{
        backgroundImage: `repeating-linear-gradient(90deg, ${color} 0 28px, transparent 28px 52px)`,
      }}
    />
  );
}

// Bold pass-rate badge — the hero centrepiece.
function PassBadge({ rate = "96%" }: { rate?: string }) {
  return (
    <div className="relative flex h-44 w-44 items-center justify-center rounded-full sm:h-52 sm:w-52" style={{ background: AMBER, boxShadow: `0 0 0 10px ${CHAR_2}, 0 0 0 12px ${AMBER}` }}>
      <div className="text-center" style={{ color: CHARCOAL }}>
        <p className="text-5xl font-black leading-none tracking-tight sm:text-6xl">{rate}</p>
        <p className="mt-1 text-[11px] font-black uppercase tracking-[0.22em]">Pass rate</p>
      </div>
    </div>
  );
}

export default function RoadcraftDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Lessons & courses", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Header: transparent over the dark hero on home; solid charcoal elsewhere.
  const header = (solid: boolean) => (
    <header
      className={solid ? "sticky top-0 z-50" : "absolute inset-x-0 top-0 z-50"}
      style={solid ? { background: `${CHARCOAL}f2`, backdropFilter: "blur(8px)", borderBottom: `1px solid #ffffff14` } : undefined}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 text-white">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-8 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-md text-lg font-black" style={{ background: AMBER, color: CHARCOAL }}>R</span>
          )}
          <span data-edit="tenant.business_name" className="text-xl font-black uppercase tracking-tight">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-bold uppercase tracking-[0.08em] text-white/75 transition hover:text-white">{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="text-sm font-black" style={{ color: AMBER }}>{content.phone}</a>}
          <a href={cta} className="rounded-md px-5 py-2.5 text-[13px] font-black uppercase tracking-[0.06em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>{ctaLabel}</a>
        </div>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor="#ffffff" panelBg={CHARCOAL} panelText="#ffffff" ctaBg={AMBER} ctaText={CHARCOAL} />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: CHARCOAL, color: "#ffffff" }}>
      <Lane color={AMBER} />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span className="text-xl font-black uppercase tracking-tight">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-3 py-1.5 text-xs font-bold text-white/70 transition hover:border-white/40 hover:text-white">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: AMBER }}>Get in touch</h4>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: AMBER }}>Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-[11px] font-black uppercase tracking-[0.18em]" style={{ color: AMBER }}>Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/40">© {new Date().getFullYear()} {name}. Pass faster. Drive for life.</p>
      </div>
    </footer>
  );

  // solid header for all inner pages; transparent only on the home hero.
  const shell = (children: ReactNode, solidHeader = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body">
      {header(solidHeader)}
      <div style={{ color: CHARCOAL }}>{children}</div>
      {footer}
    </div>
  );

  // Inner-page banner — dark charcoal block with a dashed-lane underline.
  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: CHARCOAL, color: "#fff" }}>
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-12 sm:pb-14">
        <p className="inline-flex items-center gap-2 rounded-sm px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]" style={{ background: AMBER, color: CHARCOAL }}>{kicker}</p>
        <h1 className="mt-5 text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-6xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65">{sub}</p>}
      </div>
      <Lane color={AMBER} />
    </section>
  );

  // Clean divide-y lessons & courses list (no cards, no dotted leaders).
  const lessonRow = (item: { id: string; name: string; description?: string | null; price?: string | null }) => (
    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
      <div className="min-w-0">
        <p data-edit={`item:${item.id}:name`} className="text-[17px] font-black uppercase tracking-tight" style={{ color: CHARCOAL }}>{item.name}</p>
        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: ASPHALT }}>{item.description}</p>}
      </div>
      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-black" style={{ color: CHARCOAL }}>{item.price}</span>}
    </li>
  );

  const lessonList = (limit?: number) => {
    if (limit) {
      const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: LINE }}>
          {items.map(lessonRow)}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 className="text-2xl font-black uppercase tracking-tight" style={{ color: CHARCOAL }}>{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p className="mb-2 text-xs font-black uppercase tracking-[0.18em]" style={{ color: RED }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: LINE }}>
                  {catg.items.map(lessonRow)}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  // ---- LESSONS & COURSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lessons & courses", "Lessons & intensive courses", "Hourly lessons, fast-track intensive courses and test-ready packages — straight prices, no surprises.")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {groups.length > 0 ? lessonList() : <p style={{ color: ASPHALT }}>Our courses are coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-md px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Built to get results")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.85]" style={{ color: ASPHALT }}>{content.about}</p>
          ) : <p style={{ color: ASPHALT }}>Our story is coming soon.</p>}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-10 aspect-[16/9] w-full rounded-lg object-cover" />
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Test passed")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: ASPHALT }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Book your first lesson", "Tell us where you are and when suits — we will get you booked in and test-ready fast.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-lg p-8" style={{ background: CHARCOAL, color: "#fff" }}>
            <h2 className="text-xl font-black uppercase tracking-tight">Get in touch</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-white/70">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-black transition hover:opacity-80" style={{ color: AMBER }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-black transition hover:opacity-80" style={{ color: AMBER }}>{content.email}</a>}
            </div>
            {content.service_areas && content.service_areas.length > 0 && (
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-xs font-black uppercase tracking-[0.18em]" style={{ color: AMBER }}>Areas covered</p>
                <p className="mt-2 text-sm text-white/70">{content.service_areas.join(" · ")}</p>
              </div>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t border-white/10 pt-5 text-sm text-white/70">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
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
              bookingBlurb="Pop in your details and we will confirm your first lesson by phone or text."
              bookingCta="Request a lesson"
              theme={{ card: "#ffffff", cardBorder: LINE, heading: CHARCOAL, blurb: ASPHALT, label: CHARCOAL, fieldBg: PAPER, fieldBorder: LINE, fieldText: CHARCOAL, button: AMBER, buttonText: CHARCOAL, radius: "0.5rem" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredCount = Math.min(6, groups.flatMap((g) => g.categories.flatMap((c) => c.items)).length);

  const stats = [
    { value: "96%", label: "First-time pass rate" },
    { value: "8,000+", label: "Learners passed" },
    { value: "23", label: "Avg lessons to test" },
  ];

  const reasons = [
    { title: "Expert instructors", body: "Fully qualified, DBS-checked instructors who know exactly what the examiner is looking for." },
    { title: "Test-ready fast", body: "Structured lesson plans and mock tests get you confident and prepared in fewer hours." },
    { title: "Intensive courses", body: "Need a licence quickly? Fast-track courses with a test slot built in from day one." },
  ];

  const reviews = [
    { quote: "Passed first time with zero faults. The mock tests made the real thing feel easy.", name: "Learner, manual", tag: "Passed first time" },
    { quote: "Did the one-week intensive course and passed at the end of it. Brilliant from start to finish.", name: "Learner, intensive", tag: "Passed in 7 days" },
    { quote: "Nervous driver who finally got there. Patient, clear and seriously good at the job.", name: "Learner, automatic", tag: "Passed first time" },
  ];

  return shell(
    <>
      {/* hero — bold charcoal, big results energy + pass-rate badge */}
      <section className="relative overflow-hidden" style={{ background: CHARCOAL }}>
        {/* faint lane motif running through the hero */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px -translate-x-1/2 lg:block" style={{ backgroundImage: `repeating-linear-gradient(180deg, ${AMBER}33 0 36px, transparent 36px 70px)` }} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-24 lg:pt-32">
          <div>
            <p className="inline-flex items-center gap-2 rounded-sm px-3 py-1 text-[11px] font-black uppercase tracking-[0.2em]" style={{ background: RED, color: "#fff" }}>High pass rate · Test-ready fast</p>
            <h1 className="mt-5 text-5xl font-black uppercase leading-[0.9] tracking-tight text-white sm:text-7xl">
              Pass faster.<br /><span style={{ color: AMBER }}>Drive for life.</span>
            </h1>
            <p className="mt-4 text-lg font-bold uppercase tracking-[0.08em] text-white/50">
              <span data-edit="tenant.business_name">{name}</span>
            </p>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[17px] leading-relaxed text-white/70">{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-md px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] shadow-lg transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>{ctaLabel}</a>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="rounded-md border-2 px-7 py-3 text-sm font-black uppercase tracking-[0.06em] text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff33" }}>Call {content.phone}</a>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-bold uppercase tracking-[0.06em]" style={{ color: AMBER }}>
              <span>Manual &amp; automatic</span>
              <span>Intensive courses</span>
              <span>Door-to-door pick-up</span>
            </div>
          </div>
          <div className="relative">
            {heroVideo || hero ? (
              <div className="overflow-hidden rounded-2xl shadow-2xl" style={{ background: CHAR_2 }}>
                {heroVideo ? (
                  <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
                )}
              </div>
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl" style={{ background: CHAR_2 }}>
                <span aria-hidden className="text-8xl">🚦</span>
              </div>
            )}
            <div className="absolute -bottom-6 -left-6">
              <PassBadge />
            </div>
          </div>
        </div>
        <Lane color={AMBER} />
      </section>

      {/* STATS band — big confident numbers */}
      <section style={{ background: CHAR_2, color: "#fff" }}>
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-14 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} className="px-2 text-center sm:px-6">
              <p className="text-5xl font-black tracking-tight sm:text-6xl" style={{ color: AMBER }}>{s.value}</p>
              <p className="mt-2 text-[12px] font-black uppercase tracking-[0.16em] text-white/55">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* why we get results */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: RED }}>Why we get results</p>
          <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl" style={{ color: CHARCOAL }}>No nonsense. Just passes.</h2>
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-lg sm:grid-cols-3" style={{ background: LINE }}>
          {reasons.map((r, i) => (
            <div key={r.title} className="bg-white p-8">
              <span className="text-2xl font-black" style={{ color: AMBER }}>{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-lg font-black uppercase tracking-tight" style={{ color: CHARCOAL }}>{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: ASPHALT }}>{r.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section style={{ background: CHARCOAL }} className="text-white">
          <Lane color={AMBER} />
          <div className="mx-auto max-w-4xl px-6 py-20">
            <p className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: AMBER }}>About us</p>
            <p data-edit="content.about" className="mt-5 text-2xl font-bold leading-[1.5] tracking-tight sm:text-[1.7rem]">{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex text-sm font-black uppercase tracking-[0.06em] transition hover:opacity-80" style={{ color: AMBER }}>More about us →</a>
          </div>
        </section>
      )}

      {/* lessons & courses preview — clean divide-y rows */}
      {featuredCount > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: RED }}>Lessons & courses</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl" style={{ color: CHARCOAL }}>Straight prices</h2>
          </div>
          <div className="mt-10">
            {lessonList(6)}
          </div>
          <div className="mt-10">
            <a href={href("services")} className="inline-flex rounded-md px-7 py-3.5 text-sm font-black uppercase tracking-[0.06em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>See all lessons & courses</a>
          </div>
        </section>
      )}

      {/* REVIEWS — passed first time */}
      <section style={{ background: PAPER, borderTop: `1px solid ${LINE}` }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: RED }}>Learner reviews</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl" style={{ color: CHARCOAL }}>Passed first time</h2>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.quote} className="flex flex-col rounded-lg border bg-white p-7" style={{ borderColor: LINE }}>
                <span className="inline-flex w-fit rounded-sm px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.16em]" style={{ background: AMBER, color: CHARCOAL }}>{r.tag}</span>
                <blockquote className="mt-4 flex-1 text-[15px] font-semibold leading-relaxed" style={{ color: CHARCOAL }}>“{r.quote}”</blockquote>
                <figcaption className="mt-4 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: ASPHALT }}>{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[12px] font-black uppercase tracking-[0.18em]" style={{ color: RED }}>Recent passes</p>
            <h2 className="mt-3 text-3xl font-black uppercase tracking-tight sm:text-5xl" style={{ color: CHARCOAL }}>Another one through</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
          {gallery.length > 4 && (
            <div className="mt-8">
              <a href={href("gallery")} className="inline-flex text-sm font-black uppercase tracking-[0.06em] transition hover:opacity-70" style={{ color: RED }}>See the gallery →</a>
            </div>
          )}
        </section>
      )}

      {/* book your first lesson CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl" style={{ background: CHARCOAL }}>
          <Lane color={AMBER} />
          <div className="grid items-start gap-10 px-8 py-14 lg:grid-cols-[0.9fr_1.1fr] lg:px-12 lg:py-16">
            <div className="text-white">
              <h2 className="text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl">Ready to<br /><span style={{ color: AMBER }}>get test-ready?</span></h2>
              <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/65">Book your first lesson today and take the fast lane to your full licence.</p>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="mt-7 inline-flex text-lg font-black" style={{ color: AMBER }}>{content.phone}</a>
              )}
            </div>
            {(bookingOn || contactOn) ? (
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={false}
                bookingTitle="Book your first lesson"
                bookingBlurb="Pop in your details and we will confirm your first lesson by phone or text."
                bookingCta="Request a lesson"
                theme={{ card: CHAR_2, cardBorder: "#ffffff1f", heading: "#ffffff", blurb: "#ffffffa6", label: "#ffffffcc", fieldBg: CHARCOAL, fieldBorder: "#ffffff26", fieldText: "#ffffff", button: AMBER, buttonText: CHARCOAL, radius: "0.5rem" }}
              />
            ) : (
              <div className="flex items-center">
                <a href={cta} className="inline-flex rounded-md px-9 py-4 text-sm font-black uppercase tracking-[0.06em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>{ctaLabel}</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
