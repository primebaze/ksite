import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Clutch — a modern, tech-forward driving school. App-like and confidence-
// building: easy online booking, track-your-progress messaging, manual &
// automatic, friendly approachable instructors. Fresh teal + bright lime on
// clean white, with a steering-wheel / route-line signature and a Book → Learn
// → Pass band. MULTI-PAGE: nav opens real routes (Lessons / About / Gallery /
// Contact) under basePath. Palette is baked; the tenant swaps in their own
// copy, lesson packages, gallery, hours and address. Best suits: driving school
// / driving instructor.

const TEAL = "#0EA5A0"; // fresh teal primary
const INK = "#103A37"; // deep ink-teal
const LIME = "#B6E24B"; // bright lime accent
const WASH = "#F5FBFA"; // clean white-teal page wash
const CHAR = "#16201E"; // charcoal footer
const MUTE = "#5b716d"; // muted body
const LINE = "#dceae8"; // hairline

// Signature motif: a clean steering wheel rendered in SVG.
function Wheel({ size = 220, stroke = "#ffffff", spoke = LIME, op = 1 }: { size?: number; stroke?: string; spoke?: string; op?: number }) {
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} fill="none" style={{ opacity: op }} aria-hidden>
      <circle cx="50" cy="50" r="44" stroke={stroke} strokeWidth="4" />
      <circle cx="50" cy="50" r="13" stroke={stroke} strokeWidth="4" />
      <circle cx="50" cy="50" r="4" fill={spoke} />
      <path d="M50 54 V90" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M46.5 51 L14 70" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M53.5 51 L86 70" stroke={stroke} strokeWidth="4" strokeLinecap="round" />
      <path d="M50 37 V46" stroke={spoke} strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function ClutchDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // Static learner reviews — generic, no real brand names.
  const reviews = [
    { quote: "Passed first time with zero faults. The online booking made fitting lessons around work so easy.", name: "Maya", meta: "Passed in 4 months" },
    { quote: "Calm, patient and genuinely encouraging. I went from terrified to confident on the motorway.", name: "Tom", meta: "Automatic learner" },
    { quote: "Loved being able to track my progress between lessons. Knew exactly what to practise.", name: "Priya", meta: "Passed first time" },
  ];

  // Header: solid by default; transparent-over-hero only on the home page.
  const transparentHeader = page === "home";
  const header = (
    <header
      className={transparentHeader ? "absolute inset-x-0 top-0 z-50" : "sticky top-0 z-50"}
      style={
        transparentHeader
          ? { background: "transparent" }
          : { background: "#ffffffeb", backdropFilter: "blur(8px)", borderBottom: `1px solid ${LINE}` }
      }
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-8 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-black" style={{ background: TEAL, color: "#fff" }}>◎</span>
          )}
          <span data-edit="tenant.business_name" className="text-xl font-extrabold tracking-tight" style={{ color: transparentHeader ? "#fff" : INK }}>{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-bold transition hover:opacity-70" style={{ color: transparentHeader ? "#ffffffcc" : MUTE }}>{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="text-sm font-extrabold" style={{ color: transparentHeader ? "#fff" : TEAL }}>{content.phone}</a>}
          <a href={cta} className="rounded-full px-5 py-2.5 text-sm font-extrabold transition hover:opacity-90" style={{ background: LIME, color: INK }}>{ctaLabel}</a>
        </div>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={transparentHeader ? "#ffffff" : INK} panelBg={INK} panelText="#ffffff" ctaBg={LIME} ctaText={INK} />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: CHAR, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2">
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-xl text-lg font-black" style={{ background: TEAL, color: "#fff" }}>◎</span>
            <span className="text-xl font-extrabold tracking-tight">{name}</span>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-3 py-1.5 text-xs font-bold text-white/75 transition hover:border-white/40 hover:text-white">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Get in touch</h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.16em] text-white/40">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/40">© {new Date().getFullYear()} {name}. Pass with confidence.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: WASH }} className="min-h-screen overflow-x-hidden font-body">
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: INK }} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute -right-10 -top-16">
        <Wheel size={280} stroke="#ffffff22" spoke="#ffffff22" />
      </div>
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <p className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ background: LIME, color: INK }}>{kicker}</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-white/70">{sub}</p>}
      </div>
    </section>
  );

  // Clean thin-divider lessons & packages list (home featured + services page).
  const lessonList = (limit?: number) => {
    if (limit) {
      const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: LINE }}>
          {items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} className="text-[17px] font-extrabold tracking-tight" style={{ color: INK }}>{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 rounded-full px-3 py-1 text-sm font-extrabold" style={{ background: "#e3f6f4", color: TEAL }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: TEAL }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: LINE }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} className="text-[17px] font-extrabold tracking-tight" style={{ color: INK }}>{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 rounded-full px-3 py-1 text-sm font-extrabold" style={{ background: "#e3f6f4", color: TEAL }}>{item.price}</span>}
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

  // ---- LESSONS & PACKAGES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lessons & packages", "Lessons & packages", "Beginner lessons, block bookings, intensive courses, Pass Plus, mock tests and refreshers — clear prices, no surprises.")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {groups.length > 0 ? lessonList() : <p style={{ color: MUTE }}>Our lesson packages are coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-full px-7 py-3.5 text-sm font-extrabold transition hover:opacity-90" style={{ background: TEAL, color: "#fff" }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Friendly, modern, fully qualified")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.85]" style={{ color: MUTE }}>{content.about}</p>
          ) : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
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
        {banner("Gallery", "Happy new drivers")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-3xl object-cover" />
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
        {banner("Contact", "Book your first lesson", "Tell us where you are and when suits — we will get you booked in and out on the road.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-3xl p-8" style={{ background: "#e3f6f4" }}>
            <h2 className="text-xl font-extrabold tracking-tight" style={{ color: INK }}>Get in touch</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-extrabold transition hover:opacity-70" style={{ color: TEAL }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-extrabold transition hover:opacity-70" style={{ color: TEAL }}>{content.email}</a>}
            </div>
            {content.service_areas && content.service_areas.length > 0 && (
              <div className="mt-6 border-t pt-5" style={{ borderColor: LINE }}>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: TEAL }}>Areas covered</p>
                <p className="mt-2 text-sm" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
              </div>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t pt-5 text-sm" style={{ borderColor: LINE, color: MUTE }}>
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
              bookingBlurb="Pop in your details and we will confirm your first lesson by phone or text."
              bookingCta="Request a lesson"
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: MUTE, label: INK, fieldBg: WASH, fieldBorder: LINE, fieldText: INK, button: TEAL, buttonText: "#ffffff", radius: "1rem" }}
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
      {/* hero — app-like, teal, with steering-wheel signature */}
      <section className="relative overflow-hidden" style={{ background: INK }}>
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full" style={{ background: TEAL, opacity: 0.35, filter: "blur(8px)" }} />
          <div className="absolute right-[8%] top-[12%] hidden lg:block">
            <Wheel size={300} stroke="#ffffff" spoke={LIME} op={0.18} />
          </div>
        </div>
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-28 lg:grid-cols-2 lg:gap-14 lg:pb-24 lg:pt-36">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ background: LIME, color: INK }}>Driving lessons made easy</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.02] tracking-tight text-white sm:text-6xl">
              Pass with <span style={{ color: LIME }}>confidence</span>
            </h1>
            <p className="mt-4 text-lg font-bold text-white/80">
              <span data-edit="tenant.business_name">{name}</span>
            </p>
            {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-md text-[17px] leading-relaxed text-white/65">{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-full px-7 py-3.5 text-sm font-extrabold shadow-lg transition hover:opacity-90" style={{ background: LIME, color: INK }}>{ctaLabel}</a>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="rounded-full px-7 py-3.5 text-sm font-extrabold text-white transition hover:bg-white/10" style={{ border: "1px solid #ffffff44" }}>Call {content.phone}</a>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-white/85">
              <span>✓ Manual &amp; automatic</span>
              <span>✓ Easy online booking</span>
              <span>✓ Track your progress</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-2xl" style={{ background: "#0c2e2b", border: "1px solid #ffffff1a" }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/3] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center" style={{ background: TEAL }}>
                  <Wheel size={180} stroke="#ffffff" spoke={LIME} />
                </div>
              )}
            </div>
            <span aria-hidden className="absolute -bottom-4 -left-4 rounded-2xl px-5 py-3 text-sm font-extrabold shadow-xl" style={{ background: LIME, color: INK }}>Learners welcome</span>
          </div>
        </div>
      </section>

      {/* how it works — Book → Learn → Pass route band */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>How it works</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Book → Learn → Pass</h2>
        </div>
        <div className="relative mt-12">
          {/* connecting route line */}
          <div aria-hidden className="absolute left-0 right-0 top-7 hidden border-t-2 border-dashed sm:block" style={{ borderColor: LINE }} />
          <div className="relative grid gap-5 sm:grid-cols-3">
            {[
              { n: "1", title: "Book online", body: "Pick a slot in seconds with easy online booking — fitting lessons around school, work or college." },
              { n: "2", title: "Learn your way", body: "Friendly, fully qualified instructors and a clear progress tracker, manual or automatic, picked up from your door." },
              { n: "3", title: "Pass & drive", body: "Mock tests and Pass Plus get you test-ready and confident to drive on your own." },
            ].map((s) => (
              <div key={s.n} className="rounded-3xl border p-7" style={{ borderColor: LINE, background: "#fff" }}>
                <span className="flex h-14 w-14 items-center justify-center rounded-full text-lg font-black" style={{ background: TEAL, color: "#fff", boxShadow: `0 0 0 6px ${WASH}` }}>{s.n}</span>
                <h3 className="mt-4 text-lg font-extrabold tracking-tight" style={{ color: INK }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section style={{ background: "#e3f6f4" }}>
          <div className="mx-auto max-w-4xl px-6 py-20">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>About us</p>
            <p data-edit="content.about" className="mt-5 text-2xl font-bold leading-[1.5] tracking-tight sm:text-[1.7rem]" style={{ color: INK }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex text-sm font-extrabold transition hover:opacity-80" style={{ color: TEAL }}>More about us →</a>
          </div>
        </section>
      )}

      {/* pass-rate / stats band */}
      <section style={{ background: INK }} className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -left-16 -bottom-20">
          <Wheel size={260} stroke="#ffffff14" spoke="#ffffff14" />
        </div>
        <div className="relative mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-3">
          {[
            { k: "96%", v: "First-time pass rate" },
            { k: "10k+", v: "Lessons delivered" },
            { k: "4.9★", v: "Average learner rating" },
          ].map((s) => (
            <div key={s.v}>
              <p className="text-5xl font-black tracking-tight" style={{ color: LIME }}>{s.k}</p>
              <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/60">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* lessons & packages preview */}
      {featuredCount > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>Lessons & packages</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Clear prices, no surprises</h2>
          </div>
          <div className="mt-10 rounded-3xl border bg-white p-7 sm:p-9" style={{ borderColor: LINE }}>
            {lessonList(6)}
          </div>
          <div className="mt-10">
            <a href={href("services")} className="inline-flex rounded-full px-7 py-3.5 text-sm font-extrabold text-white transition hover:opacity-90" style={{ background: TEAL }}>See all lessons & packages</a>
          </div>
        </section>
      )}

      {/* reviews */}
      <section style={{ background: "#e3f6f4" }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>Learner reviews</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Passed first time</h2>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="flex flex-col rounded-3xl bg-white p-7" style={{ border: `1px solid ${LINE}` }}>
                <div className="text-base" style={{ color: LIME, textShadow: `0 0 1px ${TEAL}` }} aria-hidden>★★★★★</div>
                <blockquote className="mt-3 flex-1 text-[15px] leading-relaxed" style={{ color: INK }}>“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-extrabold" style={{ color: INK }}>{r.name}</span>
                  <span className="ml-2" style={{ color: MUTE }}>{r.meta}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>Recent passes</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Another one through</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-3xl object-cover" />
            ))}
          </div>
          {gallery.length > 4 && (
            <div className="mt-8">
              <a href={href("gallery")} className="inline-flex text-sm font-extrabold transition hover:opacity-70" style={{ color: TEAL }}>See the gallery →</a>
            </div>
          )}
        </section>
      )}

      {/* booking form */}
      {(bookingOn || contactOn) && (
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>Get started</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Book your first lesson</h2>
              <p className="mt-4 max-w-sm text-[16px] leading-relaxed" style={{ color: MUTE }}>Pop in your details and we will confirm your first lesson by phone or text. No deposit needed to enquire.</p>
              <div className="mt-7 hidden lg:block">
                <Wheel size={150} stroke={TEAL} spoke={LIME} />
              </div>
            </div>
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book your first lesson"
              bookingBlurb="Pop in your details and we will confirm your first lesson by phone or text."
              bookingCta="Request a lesson"
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: MUTE, label: INK, fieldBg: WASH, fieldBorder: LINE, fieldText: INK, button: TEAL, buttonText: "#ffffff", radius: "1rem" }}
            />
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2rem] px-8 py-16 text-center" style={{ background: TEAL }}>
          <div aria-hidden className="pointer-events-none absolute -right-10 -top-12">
            <Wheel size={220} stroke="#ffffff2e" spoke="#ffffff2e" />
          </div>
          <h2 className="relative text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ready to get on the road?</h2>
          <p className="relative mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/85">Book your first lesson today and take the first step towards passing with confidence.</p>
          <a href={cta} className="relative mt-8 inline-flex rounded-full px-9 py-4 text-sm font-extrabold transition hover:opacity-90" style={{ background: LIME, color: INK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
