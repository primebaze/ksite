import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Plie — a joyful children's & youth DANCE SCHOOL design (ballet to street,
// classes by age, graded exams, shows & recitals). Bright, family, energetic:
// warm coral-pink ground with sunny-peach + fresh-turquoise accents, dance-shoe
// / star / spotlight-burst motifs and big bouncy shapes. MULTI-PAGE: nav opens
// real routes (Classes / About / Gallery / Contact) under basePath. Palette is
// baked; tenant swaps in their own photography, copy, classes, hours, address.
// Deliberately NOT the elegant adult-ballet register of fitness "Reverie".
// Best suits: children's / youth dance academy, performing-arts school.

const display = { fontFamily: "var(--font-fraunces)" } as const;

const CREAM = "#fbf3ec"; // soft cream page background
const CARD = "#ffffff";
const INK = "#3a2336"; // plum ink text
const MUTE = "#7c6473"; // muted plummy body text
const CORAL = "#f2768e"; // warm coral-pink primary
const CORAL_SOFT = "#fde3e8";
const PEACH = "#fbb76b"; // sunny peach accent
const PEACH_SOFT = "#fdecd5";
const TEAL = "#2fb4a8"; // fresh turquoise
const TEAL_SOFT = "#d8f0ed";

// Signature dance-shoe / star / spotlight motifs ------------------------------

function Star({ className, color = CORAL }: { className?: string; color?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`pointer-events-none block ${className ?? ""}`} fill={color}>
      <path d="M12 1.6l2.7 6.1 6.6.6-5 4.4 1.5 6.5L12 16l-5.8 3.8 1.5-6.5-5-4.4 6.6-.6z" />
    </svg>
  );
}

function BalletShoe({ className, color = "#fff" }: { className?: string; color?: string }) {
  // Stylised pointe shoe with crossed ribbons.
  return (
    <svg aria-hidden viewBox="0 0 48 48" className={`pointer-events-none block ${className ?? ""}`} fill="none">
      <path d="M9 17c0-2 2-3 4-3 5 0 8 3 13 4 6 1 11 3 11 8 0 4-5 7-13 7-10 0-19-4-19-11 0-2 1-3 4-4z" fill={color} />
      <path d="M11 16c4 9 18 12 26 9" stroke={color} strokeOpacity="0.45" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M14 14l5 12M20 13l6 13" stroke={color} strokeOpacity="0.6" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function Burst({ className, color }: { className?: string; color: string }) {
  // Spotlight / sunburst signature behind hero.
  const rays = Array.from({ length: 16 });
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={`pointer-events-none block ${className ?? ""}`}>
      {rays.map((_, i) => (
        <rect key={i} x="98" y="0" width="4" height="100" rx="2" fill={color} transform={`rotate(${(360 / rays.length) * i} 100 100)`} />
      ))}
    </svg>
  );
}

function Blob({ className, color }: { className?: string; color: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -z-10 block ${className ?? ""}`}
      style={{ background: color, borderRadius: "46% 54% 60% 40% / 52% 44% 56% 48%" }}
    />
  );
}

export default function PlieDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const ctaLabel = "Book a free taster";

  const nav = [
    groups.length > 0 && { label: "Classes", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const header = (
    <header className="sticky top-0 z-50" style={{ background: `${CREAM}f2`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${INK}12` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-9 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full" style={{ background: CORAL }}>
              <Star className="h-5 w-5" color="#fff" />
            </span>
          )}
          <span data-edit="tenant.business_name" style={{ ...display, color: INK }} className="text-xl font-semibold">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold transition hover:opacity-70" style={{ color: MUTE }}>{l.label}</a>
          ))}
        </nav>
        <a href={cta} className="hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex" style={{ background: CORAL }}>{ctaLabel}</a>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={INK} panelBg={CREAM} panelText={INK} ctaBg={CORAL} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: INK, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span style={display} className="text-2xl font-semibold">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/80">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded-full bg-white/12 px-4 py-1.5 text-xs font-semibold transition hover:bg-white/25">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: PEACH }}>Studio &amp; contact</h4>
            <div className="mt-4 space-y-2 text-sm text-white/85">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: PEACH }}>Studio hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/85">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/60">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: PEACH }}>Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/12">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/60">© {new Date().getFullYear()} {name}. Where little dancers shine.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen overflow-x-hidden font-body">
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const Pill = ({ children, bg = CORAL_SOFT, color = CORAL }: { children: ReactNode; bg?: string; color?: string }) => (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ background: bg, color }}>
      {children}
    </span>
  );

  const pageHeader = (kicker: string, title: string, sub?: string) => (
    <section className="relative overflow-hidden">
      <Blob className="-left-16 -top-10 h-56 w-56 opacity-50" color={TEAL_SOFT} />
      <Blob className="-right-10 top-8 h-40 w-40 opacity-60" color={PEACH_SOFT} />
      <Star className="absolute right-[18%] top-10 h-7 w-7 opacity-70" color={PEACH} />
      <Star className="absolute left-[16%] top-24 h-5 w-5 opacity-60" color={TEAL} />
      <div className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center sm:pt-20">
        <Pill>{kicker}</Pill>
        <h1 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed" style={{ color: MUTE }}>{sub}</p>}
      </div>
    </section>
  );

  // Clean divide-y class rows (no dotted leaders, no card panels).
  const classList = (limit?: number) => {
    const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
    if (limit) {
      const shown = items.slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: `${INK}14` }}>
          {shown.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-semibold">{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: CORAL }} className="text-2xl font-semibold">{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: `${INK}14` }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-semibold">{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
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

  // ---- CLASSES / PROGRAMMES ----
  if (page === "services") {
    return shell(
      <>
        {pageHeader("Our classes", "Classes for every age", "From first steps to exam grades — ballet, tap, modern, street and more.")}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          {groups.length > 0 ? classList() : <p className="text-center" style={{ color: MUTE }}>Our class timetable is coming soon.</p>}
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
        {pageHeader("About us", "Where little dancers shine")}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
          ) : (
            <p style={{ color: MUTE }}>Our story is coming soon.</p>
          )}
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
        {pageHeader("Recitals", "On stage & in the studio")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 pb-24">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 pb-24 text-center" style={{ color: MUTE }}>Recital photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {pageHeader("Get in touch", "Come and dance with us", "Book a free taster class and we will confirm a day and time that suits your family.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] p-8" style={{ background: CORAL_SOFT }}>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold">Find the studio</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: CORAL }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: CORAL }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t pt-5 text-sm" style={{ borderColor: `${INK}1a`, color: MUTE }}>
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
              bookingTitle="Book a free taster"
              bookingBlurb="Tell us your child's age and what they would love to try — we will arrange a free taster class."
              bookingCta="Request a taster"
              theme={{ card: CARD, cardBorder: `${INK}12`, heading: INK, blurb: MUTE, label: MUTE, fieldBg: CREAM, fieldBorder: `${INK}1f`, fieldText: INK, button: CORAL, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredCount = Math.min(6, groups.flatMap((g) => g.categories.flatMap((c) => c.items)).length);

  const ageClasses = [
    { age: "2–4 yrs", title: "Tiny Tots", body: "Music, movement and make-believe — first steps to dance.", color: CORAL, soft: CORAL_SOFT },
    { age: "4–6 yrs", title: "Primary", body: "Ballet & tap basics with games, stories and lots of giggles.", color: PEACH, soft: PEACH_SOFT },
    { age: "7–10 yrs", title: "Juniors", body: "Ballet, modern & tap — building technique and stage confidence.", color: TEAL, soft: TEAL_SOFT },
    { age: "11–16 yrs", title: "Seniors", body: "Stronger technique across styles, ready for shows and graded work.", color: CORAL, soft: CORAL_SOFT },
    { age: "All ages", title: "Exam Classes", body: "Focused preparation for ISTD & RAD graded examinations.", color: TEAL, soft: TEAL_SOFT },
    { age: "6+ yrs", title: "Boys' Street", body: "High-energy street & commercial — beats, freestyle and crews.", color: PEACH, soft: PEACH_SOFT },
  ];

  const grades = ["Pre-Primary", "Primary", "Grade 1", "Grade 2", "Grade 3", "Grade 4", "Grade 5+"];

  return shell(
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <Burst className="absolute -right-24 -top-28 h-[28rem] w-[28rem] opacity-20" color={PEACH} />
        <Blob className="-left-24 top-44 h-72 w-72 opacity-50" color={TEAL_SOFT} />
        <Star className="absolute left-[8%] top-16 h-8 w-8 opacity-80" color={PEACH} />
        <Star className="absolute right-[42%] top-8 h-5 w-5 opacity-70" color={TEAL} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <Pill bg={TEAL_SOFT} color={TEAL}>Now enrolling · ages 2–16</Pill>
            <h1 style={{ ...display, color: INK }} className="mt-5 text-5xl font-semibold leading-[1.02] sm:text-6xl">
              Where little<br />dancers <span style={{ color: CORAL }}>shine</span>
            </h1>
            <p className="mt-4 text-lg font-semibold" style={{ color: PEACH }}>Dance · Perform · Belong</p>
            {content.tagline ? (
              <p data-edit="content.tagline" className="mt-4 max-w-md text-[17px] leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>
            ) : (
              <p className="mt-4 max-w-md text-[17px] leading-relaxed" style={{ color: MUTE }}>
                A joyful children&apos;s &amp; youth dance school — ballet to street, graded exams, and shows that build confidence and friendships.
              </p>
            )}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90" style={{ background: CORAL }}>{ctaLabel}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="rounded-full px-7 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ background: CARD, color: INK, border: `1px solid ${INK}14` }}>See classes</a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ background: CORAL_SOFT, border: `4px solid ${CARD}` }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center" style={{ background: CORAL }}>
                  <BalletShoe className="h-32 w-32 opacity-90" color="#fff" />
                </div>
              )}
            </div>
            <span aria-hidden className="absolute -bottom-5 -left-5 flex h-20 w-20 items-center justify-center rounded-full shadow-xl" style={{ background: PEACH }}>
              <BalletShoe className="h-11 w-11" color="#fff" />
            </span>
            <span aria-hidden className="absolute -right-4 top-8 flex h-14 w-14 items-center justify-center rounded-full shadow-lg" style={{ background: TEAL }}>
              <Star className="h-7 w-7" color="#fff" />
            </span>
          </div>
        </div>
      </section>

      {/* first class free trust strip */}
      <section className="mx-auto max-w-6xl px-6 pb-4">
        <div className="grid gap-3 rounded-[1.75rem] p-3 sm:grid-cols-4" style={{ background: INK }}>
          {[
            { k: "First class free", v: "Try before you join" },
            { k: "ISTD & RAD", v: "Accredited grades" },
            { k: "DBS-checked team", v: "Qualified & caring" },
            { k: "Annual show", v: "Every dancer on stage" },
          ].map((s) => (
            <div key={s.k} className="rounded-[1.25rem] px-5 py-4 text-center sm:text-left" style={{ background: "#ffffff10" }}>
              <p style={{ ...display, color: PEACH }} className="text-base font-semibold">{s.k}</p>
              <p className="mt-0.5 text-xs text-white/70">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* classes by age */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <Pill bg={PEACH_SOFT} color={PEACH}>Classes by age</Pill>
          <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl">A class for every little dancer</h2>
        </div>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ageClasses.map((c) => (
            <div key={c.title} className="rounded-[1.75rem] p-7" style={{ background: CARD, border: `1px solid ${INK}0d` }}>
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: c.soft }}>
                  <Star className="h-5 w-5" color={c.color} />
                </span>
                <span className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ background: c.soft, color: c.color }}>{c.age}</span>
              </div>
              <h3 style={{ ...display, color: INK }} className="mt-4 text-xl font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* grades & exams progression band */}
      <section style={{ background: TEAL }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="text-center">
            <Pill bg="#ffffff22" color="#ffffff">Grades &amp; exams</Pill>
            <h2 style={{ ...display }} className="mt-4 text-3xl font-semibold sm:text-4xl">A clear path through ISTD &amp; RAD</h2>
            <p className="mx-auto mt-3 max-w-xl text-[15px] text-white/85">Every dancer progresses at their own pace, with medals and certificates to celebrate each milestone.</p>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2.5">
            {grades.map((g, i) => (
              <span key={g} className="flex items-center gap-2.5">
                <span className="rounded-full px-4 py-2 text-sm font-semibold" style={{ background: "#ffffff", color: TEAL }}>{g}</span>
                {i < grades.length - 1 && <span aria-hidden className="text-white/60">→</span>}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* about teaser */}
      {content.about && (
        <section className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <Star className="absolute left-[12%] top-12 h-6 w-6 opacity-60" color={CORAL} />
          <Star className="absolute right-[14%] top-24 h-5 w-5 opacity-60" color={PEACH} />
          <Pill>Our ethos</Pill>
          <p data-edit="content.about" style={{ ...display, color: INK }} className="mx-auto mt-6 max-w-2xl text-2xl font-medium leading-[1.5] sm:text-[1.7rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: CORAL }}>More about us →</a>
        </section>
      )}

      {/* classes preview */}
      {featuredCount > 0 && (
        <section style={{ background: CORAL_SOFT }}>
          <div className="mx-auto max-w-3xl px-6 py-20">
            <div className="text-center">
              <Pill>This term&apos;s timetable</Pill>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl">Popular classes</h2>
            </div>
            <div className="mt-10 rounded-[2rem] p-7 sm:p-9" style={{ background: CARD }}>
              {classList(6)}
            </div>
            <div className="mt-10 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: CORAL }}>View all classes</a>
            </div>
          </div>
        </section>
      )}

      {/* shows & recitals gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <Pill bg={PEACH_SOFT} color={PEACH}>Shows &amp; recitals</Pill>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl">Lights, music, applause</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>
          {gallery.length > 4 && (
            <div className="mt-8 text-center">
              <a href={href("gallery")} className="inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: CORAL }}>See the gallery →</a>
            </div>
          )}
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center" style={{ background: CORAL }}>
          <Burst className="absolute -left-16 -top-20 h-72 w-72 opacity-25" color="#fff" />
          <Star className="absolute right-[12%] top-10 h-8 w-8 opacity-80" color={PEACH} />
          <h2 style={{ ...display, color: "#fff" }} className="relative text-3xl font-semibold sm:text-4xl">Come and try a free taster</h2>
          <p className="relative mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/90">Bring your dancer along for a fun, no-pressure first class and meet our friendly teachers.</p>
          <a href={cta} className="relative mt-8 inline-flex rounded-full px-9 py-4 text-sm font-semibold transition hover:opacity-90" style={{ background: "#fff", color: CORAL }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
