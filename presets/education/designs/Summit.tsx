import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Summit — modern tutoring / academy design. Sharp, results-led and
// trustworthy: deep navy + electric indigo, crisp sans typography, confident
// stat band and clean square-cornered cards. MULTI-PAGE: nav opens real routes
// (Courses / About / Results / Contact) under basePath. Palette is baked; the
// tenant swaps in their own copy, courses, gallery, hours and address.
// Best suits: private tutor / tutoring academy / language school.

const NAVY = "#0d1b3e"; // deep navy
const NAVY_2 = "#13234a"; // lifted navy panel
const INDIGO = "#4f6bff"; // electric accent
const INK = "#101828"; // dark text on light
const MUTE = "#5a6478"; // muted body text on light
const LIGHT = "#f5f7fb"; // light section tint
const LINE = "#e3e8f0";

function Eyebrow({ children, light = false, ...rest }: { children: ReactNode; light?: boolean } & Record<string, unknown>) {
  return (
    <p {...rest} className="text-[12px] font-bold uppercase tracking-[0.22em]" style={{ color: light ? "#aeb9ff" : INDIGO }}>
      {children}
    </p>
  );
}

export default function SummitDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  const nav = [
    groups.length > 0 && { label: "Courses", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Results", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const header = (
    <header className="sticky top-0 z-50" style={{ background: `${NAVY}f0`, backdropFilter: "blur(8px)", borderBottom: `1px solid #ffffff14` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 text-white">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-8 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-8 w-8 items-center justify-center rounded text-sm font-bold" style={{ background: INDIGO }}>▲</span>
          )}
          <span data-edit="tenant.business_name" className="text-lg font-bold tracking-tight">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold text-white/75 transition hover:text-white">{l.label}</a>
          ))}
        </nav>
        <a href={cta} className="hidden rounded-md px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90 md:inline-flex" style={{ background: INDIGO }}>{ctaLabel}</a>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor="#ffffff" panelBg={NAVY} panelText="#ffffff" ctaBg={INDIGO} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: NAVY, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span className="text-xl font-bold tracking-tight">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-3 py-1.5 text-xs font-semibold text-white/75 transition hover:border-white/40 hover:text-white">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Contact</h4>
            <div className="mt-4 space-y-2 text-sm text-white/75">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/75">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/40">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: "#ffffff" }} className="min-h-screen font-body" >
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: NAVY }} className="text-white">
      <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <Eyebrow light>{kicker}</Eyebrow>
        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {sub && <p className="mt-4 max-w-2xl text-[16px] leading-relaxed text-white/65">{sub}</p>}
      </div>
    </section>
  );

  // Clean thin-divider course list. Used on home (featured) + courses page.
  const courseList = (limit?: number, dark = false) => {
    const lineColor = dark ? "#ffffff1f" : LINE;
    const nameColor = dark ? "#ffffff" : INK;
    const muteColor = dark ? "#9aa6c4" : MUTE;
    const priceColor = dark ? "#aeb9ff" : INDIGO;
    if (limit) {
      const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: lineColor }}>
          {items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} className="text-[17px] font-bold tracking-tight" style={{ color: nameColor }}>{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: muteColor }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: priceColor }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="text-2xl font-bold tracking-tight" style={{ color: nameColor }}>{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <Eyebrow data-edit={`category:${catg.items[0]?.id ?? ""}`}>{catg.category}</Eyebrow>}
                <ul className="mt-2 divide-y" style={{ borderColor: lineColor }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} className="text-[17px] font-bold tracking-tight" style={{ color: nameColor }}>{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: muteColor }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: priceColor }}>{item.price}</span>}
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
        {banner("Courses & tuition", "Programmes built around results", "One-to-one and small-group tuition mapped to the exams that matter, taught by specialists.")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {groups.length > 0 ? courseList() : <p style={{ color: MUTE }}>Our courses are coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-md px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: INDIGO }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "Specialist teaching that builds confidence")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.85]" style={{ color: MUTE }}>{content.about}</p>
          ) : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-10 aspect-[16/9] w-full rounded-lg object-cover" />
          )}
        </section>
      </>,
    );
  }

  // ---- RESULTS / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Results & moments", "Progress you can see")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-lg object-cover" />
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
        {banner("Get in touch", "Book a free assessment", "Tell us about the student and the goals. We will recommend the right tutor and plan.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <h2 className="text-xl font-bold tracking-tight" style={{ color: INK }}>Contact</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: INDIGO }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: INDIGO }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-7 max-w-xs space-y-2 border-t pt-5 text-sm" style={{ borderColor: LINE, color: MUTE }}>
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
              bookingTitle="Book a free assessment"
              bookingBlurb="Share the details and we will be in touch to arrange a time."
              bookingCta="Request assessment"
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: MUTE, label: INK, fieldBg: LIGHT, fieldBorder: LINE, fieldText: INK, button: INDIGO, buttonText: "#ffffff", radius: "0.5rem" }}
            />
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredCount = Math.min(6, groups.flatMap((g) => g.categories.flatMap((c) => c.items)).length);
  const stats = [
    { value: "1:1", label: "Tailored to every student" },
    { value: "100%", label: "Specialist, vetted tutors" },
    { value: "All ages", label: "Primary to A-Level & beyond" },
  ];

  return shell(
    <>
      {/* hero */}
      <section style={{ background: NAVY }} className="relative isolate overflow-hidden text-white">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30" style={{ background: `radial-gradient(circle, ${INDIGO}, transparent 70%)` }} />
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16 lg:py-28">
          <div>
            <Eyebrow light>Tuition that gets results</Eyebrow>
            <h1 className="mt-4 text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
              <span data-edit="tenant.business_name">{name}</span>
            </h1>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-lg leading-relaxed text-white/70">{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-md px-7 py-3.5 text-sm font-bold text-white shadow-lg transition hover:opacity-90" style={{ background: INDIGO }}>{ctaLabel}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="rounded-md border border-white/25 px-7 py-3.5 text-sm font-bold text-white backdrop-blur transition hover:bg-white/10">View courses</a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-xl shadow-2xl ring-1 ring-white/10" style={{ background: NAVY_2 }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/3] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center text-6xl text-white/30">▲</div>
              )}
            </div>
          </div>
        </div>
        {/* stat band */}
        <div className="border-t border-white/10">
          <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold tracking-tight" style={{ color: "#aeb9ff" }}>{s.value}</p>
                <p className="mt-1 text-sm text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* approach cards */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <Eyebrow>Our approach</Eyebrow>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: INK }}>A clear path to better grades</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {[
            { n: "01", title: "Assess", body: "A free assessment pinpoints strengths and the gaps holding a student back." },
            { n: "02", title: "Plan", body: "A focused plan matched to the syllabus, exam board and timeline." },
            { n: "03", title: "Progress", body: "Regular feedback so families always know exactly how things are going." },
          ].map((c) => (
            <div key={c.n} className="rounded-lg border p-7" style={{ borderColor: LINE, background: "#fff" }}>
              <span className="text-sm font-bold" style={{ color: INDIGO }}>{c.n}</span>
              <h3 className="mt-3 text-xl font-bold tracking-tight" style={{ color: INK }}>{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about statement */}
      {content.about && (
        <section style={{ background: LIGHT, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-6 py-20">
            <Eyebrow>Why families choose us</Eyebrow>
            <p data-edit="content.about" className="mt-5 text-2xl font-medium leading-[1.5] tracking-tight sm:text-[1.75rem]" style={{ color: INK }}>{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex text-sm font-bold transition hover:opacity-70" style={{ color: INDIGO }}>More about us →</a>
          </div>
        </section>
      )}

      {/* courses preview (dark band) */}
      {featuredCount > 0 && (
        <section style={{ background: NAVY }} className="text-white">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <Eyebrow light>Courses</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Popular programmes</h2>
            <div className="mt-10">{courseList(6, true)}</div>
            <div className="mt-12">
              <a href={href("services")} className="inline-flex rounded-md px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: INDIGO }}>View all courses</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: INK }}>Ready to see real progress?</h2>
        <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed" style={{ color: MUTE }}>Book a free, no-obligation assessment and we will map out the right plan.</p>
        <a href={cta} className="mt-8 inline-flex rounded-md px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: INDIGO }}>{ctaLabel}</a>
      </section>
    </>,
  );
}
