import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Junction — established, premium driving-school & intensive-course centre.
// Confident professional register: deep navy + warm brass/gold on warm stone,
// structured courses, experienced instructors, a fleet of cars and a trusted
// reputation. Signature motif is a clean road-network / roundabout-junction
// diagram and directional route lines. MULTI-PAGE: nav opens real routes
// (Courses / About / Gallery / Contact) under basePath. Palette is baked; the
// tenant swaps in their own copy, courses, gallery, hours and address.
// Best suits: driving school / intensive-course centre.

const NAVY = "#16243B"; // deep professional navy
const NAVY_DK = "#121821"; // charcoal ink
const BRASS = "#C2922E"; // warm brass / gold accent
const BRASS_DK = "#A77A1F";
const SLATE = "#6E7E92"; // slate blue-grey muted
const STONE = "#EFE9DD"; // warm stone surface
const STONE_DK = "#E4DCCB";
const LINE = "#d9d0bf"; // stone-toned hairline

// Junction / roundabout route diagram — the signature motif.
function RouteMark({ className, stroke = BRASS, dim = SLATE }: { className?: string; stroke?: string; dim?: string }) {
  return (
    <svg viewBox="0 0 120 120" className={className} fill="none" aria-hidden>
      <circle cx="60" cy="60" r="20" stroke={stroke} strokeWidth="2.5" />
      <circle cx="60" cy="60" r="4.5" fill={stroke} />
      <path d="M60 40V8" stroke={stroke} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 80v32" stroke={dim} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M80 60h32" stroke={dim} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 60H8" stroke={dim} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M60 8l-5 8h10l-5-8Z" fill={stroke} />
    </svg>
  );
}

export default function JunctionDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const ctaLabel = "Book a course";

  const nav = [
    groups.length > 0 && { label: "Courses", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Header is transparent over the navy hero (home) and solid elsewhere.
  const solidHeader = page !== "home";
  const header = (
    <header
      className="sticky top-0 z-50"
      style={
        solidHeader
          ? { background: `${NAVY}f2`, backdropFilter: "blur(8px)", borderBottom: `1px solid #ffffff1f` }
          : { background: "transparent" }
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-9 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-10 w-10 items-center justify-center rounded-md" style={{ background: "#ffffff14", border: `1px solid ${BRASS}` }}>
              <RouteMark className="h-6 w-6" stroke={BRASS} dim="#ffffff55" />
            </span>
          )}
          <span data-edit="tenant.business_name" className="text-xl font-bold tracking-tight text-white">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold uppercase tracking-[0.08em] text-white/75 transition hover:text-white">{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="text-sm font-bold" style={{ color: BRASS }}>{content.phone}</a>}
          <a href={cta} className="rounded-md px-5 py-2.5 text-sm font-bold transition hover:opacity-90" style={{ background: BRASS, color: NAVY_DK }}>{ctaLabel}</a>
        </div>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor="#ffffff" panelBg={NAVY} panelText="#ffffff" ctaBg={BRASS} ctaText={NAVY_DK} />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: NAVY_DK, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2.5">
            <RouteMark className="h-7 w-7" stroke={BRASS} dim="#ffffff44" />
            <span className="text-xl font-bold tracking-tight">{name}</span>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/70 transition hover:border-white/40 hover:text-white">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRASS }}>Get in touch</h4>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRASS }}>Office hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRASS }}>Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/40">© {new Date().getFullYear()} {name}. Learn to drive, properly.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: STONE }} className="min-h-screen font-body">
      {header}
      <div style={{ color: NAVY }}>{children}</div>
      {footer}
    </div>
  );

  // Solid navy banner for interior pages (header sits solid above it).
  const banner = (kicker: string, title: string, sub?: string) => (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <RouteMark className="pointer-events-none absolute -right-8 -top-6 h-56 w-56 opacity-[0.12]" stroke="#ffffff" dim="#ffffff" />
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <p className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: BRASS }}>
          <span className="h-px w-7" style={{ background: BRASS }} />
          {kicker}
        </p>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65">{sub}</p>}
      </div>
    </section>
  );

  // Structured course list — clean divide-y rows, no cards, no leaders.
  const courseList = (limit?: number) => {
    if (limit) {
      const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: LINE }}>
          {items.map((item, i) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="flex min-w-0 items-baseline gap-4">
                <span className="hidden shrink-0 text-sm font-bold tabular-nums sm:inline" style={{ color: BRASS }}>{String(i + 1).padStart(2, "0")}</span>
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-[17px] font-bold tracking-tight" style={{ color: NAVY }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SLATE }}>{item.description}</p>}
                </div>
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: BRASS_DK }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 className="text-2xl font-bold tracking-tight" style={{ color: NAVY }}>{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRASS }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: LINE }}>
                  {catg.items.map((item, i) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="flex min-w-0 items-baseline gap-4">
                        <span className="hidden shrink-0 text-sm font-bold tabular-nums sm:inline" style={{ color: BRASS }}>{String(i + 1).padStart(2, "0")}</span>
                        <div className="min-w-0">
                          <p data-edit={`item:${item.id}:name`} className="text-[17px] font-bold tracking-tight" style={{ color: NAVY }}>{item.name}</p>
                          {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: SLATE }}>{item.description}</p>}
                        </div>
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: BRASS_DK }}>{item.price}</span>}
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
        {banner("Our courses", "Courses & prices", "Structured weekly lessons, intensive one-week courses, theory test prep and Pass Plus — fixed prices, no surprises.")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {groups.length > 0 ? courseList() : <p style={{ color: SLATE }}>Our courses are coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-md px-7 py-3.5 text-sm font-bold transition hover:opacity-90" style={{ background: NAVY, color: "#ffffff" }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "An established name in learning to drive")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.85]" style={{ color: SLATE }}>{content.about}</p>
          ) : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-10 aspect-[16/9] w-full rounded-xl object-cover" />
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Our fleet & our pass-outs")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-center" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Book a course", "Tell us where you are and how soon you would like to start — we will get you booked onto the right course.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-xl border p-8" style={{ background: "#ffffff", borderColor: LINE }}>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: NAVY }}>Office &amp; bookings</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-bold transition hover:opacity-70" style={{ color: NAVY }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-bold transition hover:opacity-70" style={{ color: NAVY }}>{content.email}</a>}
            </div>
            {content.service_areas && content.service_areas.length > 0 && (
              <div className="mt-6 border-t pt-5" style={{ borderColor: LINE }}>
                <p className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: BRASS }}>Areas covered</p>
                <p className="mt-2 text-sm" style={{ color: SLATE }}>{content.service_areas.join(" · ")}</p>
              </div>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t pt-5 text-sm" style={{ borderColor: LINE, color: SLATE }}>
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
              bookingTitle="Book a course"
              bookingBlurb="Send us your details and we will confirm your course and a start date by phone or email."
              bookingCta="Request a course"
              theme={{ card: "#ffffff", cardBorder: LINE, heading: NAVY, blurb: SLATE, label: NAVY, fieldBg: STONE, fieldBorder: LINE, fieldText: NAVY, button: NAVY, buttonText: "#ffffff", radius: "0.5rem" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredCount = Math.min(6, groups.flatMap((g) => g.categories.flatMap((c) => c.items)).length);

  const reviews = [
    { quote: "Calm, methodical and never made me feel rushed. The intensive course got me test-ready in a fortnight.", who: "Amara · passed first time" },
    { quote: "Genuinely professional from the first phone call. Modern dual-control car and a structured plan every lesson.", who: "Daniel · automatic course" },
    { quote: "I'd been with two schools before — the difference here was the structure. Theory and practical lined up perfectly.", who: "Priya · weekly lessons" },
  ];

  const pathway = [
    { step: "01", title: "Theory mastery", body: "Hazard perception and theory test prep built into your plan, so the written test is never an afterthought." },
    { step: "02", title: "Behind the wheel", body: "Structured practical lessons in a dual-control car with an experienced, patient instructor." },
    { step: "03", title: "Test & beyond", body: "Mock tests, motorway lessons and Pass Plus to make you a confident, lifelong driver." },
  ];

  return shell(
    <>
      {/* hero — navy/stone, established & premium */}
      <section className="relative -mt-[72px] overflow-hidden pt-[72px]" style={{ background: NAVY }}>
        <RouteMark className="pointer-events-none absolute -right-10 top-10 hidden h-[460px] w-[460px] opacity-[0.10] lg:block" stroke="#ffffff" dim="#ffffff" />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-3 text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: BRASS }}>
              <span className="h-px w-8" style={{ background: BRASS }} />
              Trusted driving courses
            </p>
            <h1 className="mt-5 text-5xl font-bold leading-[1.04] tracking-tight text-white sm:text-6xl">
              Learn to drive,<br /><span style={{ color: BRASS }}>properly.</span>
            </h1>
            <p className="mt-4 text-lg font-semibold text-white/80">
              <span data-edit="tenant.business_name">{name}</span>
            </p>
            {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-md text-[17px] leading-relaxed text-white/65">{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-md px-7 py-3.5 text-sm font-bold shadow-lg transition hover:opacity-90" style={{ background: BRASS, color: NAVY_DK }}>{ctaLabel}</a>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="rounded-md border px-7 py-3.5 text-sm font-bold text-white transition hover:bg-white/10" style={{ borderColor: "#ffffff33" }}>Call {content.phone}</a>
              )}
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t pt-7" style={{ borderColor: "#ffffff1f" }}>
              {[
                { k: "Est.", v: "Years' experience" },
                { k: "DVSA", v: "Approved instructors" },
                { k: "Full", v: "Fleet of cars" },
              ].map((s) => (
                <div key={s.v}>
                  <p className="text-xl font-bold" style={{ color: BRASS }}>{s.k}</p>
                  <p className="mt-1 text-[12px] leading-snug text-white/55">{s.v}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-2xl ring-1" style={{ background: NAVY_DK }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center" style={{ background: NAVY_DK }}>
                  <RouteMark className="h-40 w-40" stroke={BRASS} dim="#ffffff33" />
                </div>
              )}
            </div>
            <span aria-hidden className="absolute -bottom-4 -left-4 rounded-md px-5 py-3 text-sm font-bold shadow-xl" style={{ background: STONE, color: NAVY }}>Established &amp; trusted</span>
          </div>
        </div>
      </section>

      {/* our courses — structured list */}
      {featuredCount > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: BRASS }}>Our courses</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: NAVY }}>Weekly, intensive & specialist</h2>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SLATE }}>Weekly lessons, intensive one-week courses, theory test prep, automatic, motorway lessons and Pass Plus — a structured route for every learner.</p>
            </div>
            <a href={href("services")} className="text-sm font-bold transition hover:opacity-70" style={{ color: NAVY }}>All courses &amp; prices →</a>
          </div>
          <div className="mt-10 rounded-xl border bg-white p-7 sm:p-9" style={{ borderColor: LINE }}>
            {courseList(6)}
          </div>
        </section>
      )}

      {/* instructors / fleet credibility band */}
      <section style={{ background: NAVY }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-3">
            {[
              { title: "Experienced instructors", body: "DVSA-approved, fully qualified and DBS-checked. Patient, methodical and genuinely on your side." },
              { title: "A maintained fleet", body: "Modern, dual-control manual and automatic cars, valeted and serviced — calm, well-kept and test-ready." },
              { title: "A trusted reputation", body: "Years of pass-outs and word-of-mouth recommendations across the area. We take our standards seriously." },
            ].map((c) => (
              <div key={c.title} className="border-t pt-6" style={{ borderColor: "#ffffff26" }}>
                <RouteMark className="h-9 w-9" stroke={BRASS} dim="#ffffff44" />
                <h3 className="mt-4 text-lg font-bold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* theory + practical pathway band */}
      <section style={{ background: STONE_DK }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: BRASS }}>Theory & practical</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: NAVY }}>One structured pathway to your licence</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-xl border sm:grid-cols-3" style={{ borderColor: LINE, background: LINE }}>
            {pathway.map((p) => (
              <div key={p.step} className="bg-white p-7">
                <span className="text-2xl font-bold tabular-nums" style={{ color: BRASS }}>{p.step}</span>
                <h3 className="mt-3 text-lg font-bold tracking-tight" style={{ color: NAVY }}>{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: SLATE }}>{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about teaser */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-6 py-20">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: BRASS }}>About us</p>
          <p data-edit="content.about" className="mt-5 text-2xl font-semibold leading-[1.5] tracking-tight sm:text-[1.7rem]" style={{ color: NAVY }}>{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex text-sm font-bold transition hover:opacity-70" style={{ color: NAVY }}>More about us →</a>
        </section>
      )}

      {/* learner reviews */}
      <section style={{ background: STONE_DK }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: BRASS }}>Learner reviews</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: NAVY }}>Trusted by the people we taught</h2>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.who} className="flex flex-col rounded-xl border bg-white p-7" style={{ borderColor: LINE }}>
                <div className="text-sm tracking-[0.3em]" style={{ color: BRASS }}>★★★★★</div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ color: NAVY }}>“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-xs font-bold uppercase tracking-[0.12em]" style={{ color: SLATE }}>{r.who}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="text-[12px] font-bold uppercase tracking-[0.2em]" style={{ color: BRASS }}>Gallery</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: NAVY }}>Our fleet & our pass-outs</h2>
            </div>
            {gallery.length > 4 && (
              <a href={href("gallery")} className="text-sm font-bold transition hover:opacity-70" style={{ color: NAVY }}>See the gallery →</a>
            )}
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* book a course CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-2xl px-8 py-16 text-center" style={{ background: NAVY }}>
          <RouteMark className="pointer-events-none absolute -left-10 -top-8 h-52 w-52 opacity-[0.12]" stroke="#ffffff" dim="#ffffff" />
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Ready to start the right way?</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/65">Book a course today and learn with an established, professional driving school.</p>
          <a href={cta} className="mt-8 inline-flex rounded-md px-9 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: BRASS, color: NAVY_DK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
