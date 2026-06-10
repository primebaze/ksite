import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Conservatoire — refined music & arts school design. Elegant and creative:
// warm ivory ground, deep aubergine ink and antique-gold accents, serif display
// headings and generous editorial spacing. MULTI-PAGE: nav opens real routes
// (Lessons / About / Gallery / Contact) under basePath. Palette is baked; the
// tenant swaps in their own copy, lessons, gallery, hours and address.
// Best suits: music teacher / music school / dance school / arts academy.

const serif = { fontFamily: "var(--font-fraunces)" } as const;

const IVORY = "#f7f2ea"; // warm ivory page
const PAPER = "#fffdf9";
const AUBERGINE = "#3a2436"; // deep aubergine ink / dark sections
const AUBERGINE_2 = "#4a2f44";
const INK = "#2c2230"; // body heading ink
const MUTE = "#6f6168"; // muted body text
const GOLD = "#a9854e"; // antique gold accent
const GOLD_SOFT = "#efe6d6";

function Rule({ center = false }: { center?: boolean }) {
  return <span className={`block h-px w-12 ${center ? "mx-auto" : ""}`} style={{ background: GOLD }} />;
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`text-[11px] font-semibold uppercase tracking-[0.3em] ${center ? "text-center" : ""}`} style={{ color: GOLD }}>
      {children}
    </p>
  );
}

export default function ConservatoireDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const ctaLabel = "Book a trial lesson";

  const nav = [
    groups.length > 0 && { label: "Lessons", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const header = (
    <header className="sticky top-0 z-50" style={{ background: `${IVORY}f0`, backdropFilter: "blur(8px)", borderBottom: `1px solid ${GOLD}33` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logo_url} alt={name} className="h-9 w-auto object-contain" />
          ) : null}
          <span data-edit="tenant.business_name" style={{ ...serif, color: INK }} className="text-xl font-medium tracking-tight">{name}</span>
        </a>
        <nav className="hidden items-center gap-9 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] font-medium uppercase tracking-[0.12em] transition hover:opacity-70" style={{ color: MUTE }}>{l.label}</a>
          ))}
        </nav>
        <a href={cta} className="hidden px-6 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 md:inline-flex" style={{ background: AUBERGINE }}>{ctaLabel}</a>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={INK} panelBg={IVORY} panelText={INK} ctaBg={AUBERGINE} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: AUBERGINE, color: "#ffffff", borderTop: `1px solid ${GOLD}44` }}>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <span style={serif} className="text-2xl font-medium">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline">{s.label}</a>
              ))}
            </div>
          )}
        </div>
        {(content.address || content.phone || content.email) && (
          <div>
            <h4 style={serif} className="text-lg">Contact</h4>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 style={serif} className="text-lg">Studio hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 style={serif} className="text-lg">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/45">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: IVORY }} className="min-h-screen font-body" >
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: AUBERGINE }} className="text-white">
      <div className="mx-auto max-w-4xl px-6 py-16 text-center sm:py-20">
        <Kicker center>{kicker}</Kicker>
        <Rule center />
        <h1 style={serif} className="mt-5 text-4xl font-medium sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed text-white/65">{sub}</p>}
      </div>
    </section>
  );

  // Clean thin-divider lesson list. Used on home (featured) + lessons page.
  const lessonList = (limit?: number) => {
    if (limit) {
      const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items)).slice(0, limit);
      return (
        <ul className="divide-y" style={{ borderColor: `${INK}1a` }}>
          {items.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} style={{ ...serif, color: INK }} className="text-lg font-medium">{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-14">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 style={{ ...serif, color: GOLD }} className="text-center text-3xl font-medium">{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-8">
                {catg.category && (
                  <p className="mb-5 flex items-center justify-center gap-4 text-[11px] uppercase tracking-[0.28em]" style={{ color: INK }}>
                    <span className="h-px w-8" style={{ background: `${GOLD}88` }} />{catg.category}<span className="h-px w-8" style={{ background: `${GOLD}88` }} />
                  </p>
                )}
                <ul className="divide-y" style={{ borderColor: `${INK}1a` }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} style={{ ...serif, color: INK }} className="text-lg font-medium">{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
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

  // ---- LESSONS ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lessons & tuition", "Lessons & tuition", "Private and group tuition for all ages and stages, from first steps to performance and graded exams.")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {groups.length > 0 ? (
            <div className="relative px-6 py-10 sm:px-10" style={{ background: PAPER, border: `1px solid ${GOLD}40` }}>
              <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t" style={{ borderColor: GOLD }} />
              <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r" style={{ borderColor: GOLD }} />
              {lessonList()}
            </div>
          ) : <p style={{ color: MUTE }}>Our lessons are coming soon.</p>}
          <div className="mt-12 text-center">
            <a href={cta} className="inline-flex px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: AUBERGINE }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "A home for music & the arts")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: MUTE }}>{content.about}</p>
          ) : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-12 aspect-[16/9] w-full object-cover" />
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Performances", "Recitals & moments")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-14">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
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
        {banner("Get in touch", "Book a trial lesson", "Tell us a little about the student and the instrument or discipline, and we will arrange a trial.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl font-medium">Find us</h2>
            <Rule />
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: GOLD }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: GOLD }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-7 max-w-xs space-y-2 border-t pt-5 text-sm" style={{ borderColor: `${INK}1a`, color: MUTE }}>
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
              bookingTitle="Book a trial lesson"
              bookingBlurb="Share a few details and we will be in touch to arrange a time."
              bookingCta="Request a trial"
              theme={{ card: PAPER, cardBorder: `${GOLD}40`, heading: INK, blurb: MUTE, label: MUTE, fieldBg: "#ffffff", fieldBorder: `${INK}26`, fieldText: INK, button: AUBERGINE, buttonText: "#ffffff", radius: "0", font: "var(--font-fraunces)" }}
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
      {/* hero */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden" style={{ background: AUBERGINE }}>
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-45" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${AUBERGINE_2}, ${AUBERGINE})` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(28,16,26,0.7), rgba(28,16,26,0.35))" }} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-28 text-center text-white">
          <Kicker center>Music &amp; arts tuition</Kicker>
          <Rule center />
          <h1 style={serif} className="mt-6 text-5xl font-medium leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/85 [text-shadow:0_2px_16px_rgba(0,0,0,0.4)]">{content.tagline}</p>}
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={cta} className="px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ background: GOLD, color: "#231019" }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#231019]" style={{ border: "1px solid rgba(255,255,255,0.5)" }}>Explore lessons</a>
            )}
          </div>
        </div>
      </section>

      {/* about — image + copy */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full" style={{ background: GOLD_SOFT, border: `1px solid ${GOLD}40` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 border-b border-r" style={{ borderColor: GOLD }} />
          </div>
          <div>
            <Kicker>Our ethos</Kicker>
            <Rule />
            <h2 style={{ ...serif, color: INK }} className="mt-5 text-4xl font-medium leading-tight sm:text-5xl">Where discipline meets delight</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            {content.about && (
              <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ color: GOLD }}>Read more →</a>
            )}
          </div>
        </section>
      )}

      {/* disciplines */}
      <section style={{ background: GOLD_SOFT, borderTop: `1px solid ${GOLD}33`, borderBottom: `1px solid ${GOLD}33` }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <Kicker center>What we offer</Kicker>
            <Rule center />
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {[
              { icon: "♪", title: "Private tuition", body: "One-to-one lessons tailored to each student's pace, taste and goals." },
              { icon: "✦", title: "Graded exams", body: "Preparation and entry for recognised graded music and dance exams." },
              { icon: "❧", title: "Performance", body: "Recitals, ensembles and showcases that build stage confidence." },
            ].map((c) => (
              <div key={c.title} className="px-7 py-8 text-center" style={{ background: PAPER, border: `1px solid ${GOLD}33` }}>
                <span className="text-3xl" style={{ color: GOLD }}>{c.icon}</span>
                <h3 style={{ ...serif, color: INK }} className="mt-4 text-xl font-medium">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* lessons preview */}
      {featuredCount > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-24">
          <div className="text-center">
            <Kicker center>Lessons</Kicker>
            <Rule center />
            <h2 style={{ ...serif, color: INK }} className="mt-5 text-4xl font-medium sm:text-5xl">A repertoire of lessons</h2>
          </div>
          <div className="relative mt-12 px-6 py-10 sm:px-10" style={{ background: PAPER, border: `1px solid ${GOLD}40` }}>
            <span className="pointer-events-none absolute left-3 top-3 h-6 w-6 border-l border-t" style={{ borderColor: GOLD }} />
            <span className="pointer-events-none absolute bottom-3 right-3 h-6 w-6 border-b border-r" style={{ borderColor: GOLD }} />
            {lessonList(6)}
          </div>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[#3a2436] hover:text-white" style={{ border: `1px solid ${AUBERGINE}`, color: AUBERGINE }}>View all lessons</a>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-20">
          <div className="mx-auto max-w-6xl px-6 text-center">
            <Kicker center>Performances</Kicker>
            <Rule center />
            <h2 style={{ ...serif, color: INK }} className="mx-auto mt-5 max-w-2xl text-3xl font-medium leading-snug sm:text-4xl">Moments from our recitals and studios.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-2 px-4 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[#3a2436] hover:text-white" style={{ border: `1px solid ${AUBERGINE}`, color: AUBERGINE }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: AUBERGINE }} className="text-white">
        <div className="mx-auto max-w-2xl px-6 py-20 text-center">
          <h2 style={serif} className="text-3xl font-medium sm:text-4xl">Begin your journey</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/70">Book a relaxed trial lesson and discover the joy of learning with us.</p>
          <a href={cta} className="mt-8 inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ background: GOLD, color: "#231019" }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
