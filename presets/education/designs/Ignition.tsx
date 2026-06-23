import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Ignition — practical driving-school design. Clear, confident and
// approachable: bright signal-yellow + road-sign green on clean white, bold
// chunky type and reassuring "pass with confidence" messaging. MULTI-PAGE: nav
// opens real routes (Lessons / About / Gallery / Contact) under basePath.
// Palette is baked; the tenant swaps in their own copy, lesson packages,
// gallery, hours and address. Best suits: driving school / instructor.

const INK = "#15201a"; // near-black green-tinted ink
const MUTE = "#566058"; // muted body
const GREEN = "#127a4b"; // road-sign green primary
const GREEN_DK = "#0c5c38";
const YELLOW = "#ffcf2d"; // signal yellow accent
const MINT = "#eaf5ee"; // light green tint
const LINE = "#e2e8e3";

function Step({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="relative rounded-2xl border p-7" style={{ borderColor: LINE, background: "#fff" }}>
      <span className="flex h-11 w-11 items-center justify-center rounded-full text-base font-extrabold" style={{ background: YELLOW, color: INK }}>{n}</span>
      <h3 className="mt-4 text-lg font-extrabold tracking-tight" style={{ color: INK }}>{title}</h3>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{body}</p>
    </div>
  );
}

// Generic, honestly-true driving-school strengths (no invented stats, so a real
// client can stand behind every word). Each is an icon + a short reassurance.
const WHY = [
  {
    title: "Calm, patient instructors",
    body: "Friendly, fully qualified instructors who teach at a pace that suits you — nervous first-timers welcome.",
    icon: <path d="M12 12a4 4 0 100-8 4 4 0 000 8zM4 20a8 8 0 0116 0" />,
  },
  {
    title: "Lessons that fit your life",
    body: "Door-to-door pick-up and flexible times around work, school or college — manual or automatic.",
    icon: <path d="M8 2v3M16 2v3M4 8h16M5 6h14a1 1 0 011 1v12a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1z" />,
  },
  {
    title: "Ready for test day",
    body: "Mock tests, theory support and Pass Plus so you sit your test calm, prepared and confident.",
    icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />,
  },
];

function Why({ ink, mute, green, line }: { ink: string; mute: string; green: string; line: string }) {
  return (
    <section className="mx-auto max-w-6xl px-6 pt-20">
      <div className="grid gap-5 sm:grid-cols-3">
        {WHY.map((w) => (
          <div key={w.title} className="rounded-2xl border p-7" style={{ borderColor: line, background: "#fff" }}>
            <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: MINT, color: green }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">{w.icon}</svg>
            </span>
            <h3 className="mt-5 text-lg font-extrabold tracking-tight" style={{ color: ink }}>{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed" style={{ color: mute }}>{w.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function IgnitionDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Lessons & prices", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const header = (
    <header className="sticky top-0 z-50" style={{ background: "#ffffffeb", backdropFilter: "blur(8px)", borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <a href={href("home")} className="flex items-center gap-2.5">
          {theme.logo_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={theme.logo_url} alt={name} className="h-8 w-auto object-contain" />
          ) : (
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-lg text-lg font-extrabold" style={{ background: GREEN, color: "#fff" }}>L</span>
          )}
          <span data-edit="tenant.business_name" className="text-xl font-extrabold tracking-tight" style={{ color: INK }}>{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-bold transition hover:opacity-70" style={{ color: MUTE }}>{l.label}</a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="text-sm font-extrabold" style={{ color: GREEN }}>{content.phone}</a>}
          <a href={cta} className="rounded-lg px-5 py-2.5 text-sm font-extrabold text-white transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
        </div>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={INK} panelBg="#ffffff" panelText={INK} ctaBg={GREEN} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: INK, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span className="text-xl font-extrabold tracking-tight">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="rounded border border-white/15 px-3 py-1.5 text-xs font-bold text-white/75 transition hover:border-white/40 hover:text-white">{s.label}</a>
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
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: "#ffffff" }} className="min-h-screen font-body" >
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: MINT, borderBottom: `1px solid ${LINE}` }}>
      <div className="mx-auto max-w-5xl px-6 py-14 sm:py-16">
        <p className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ background: GREEN, color: "#fff" }}>{kicker}</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl" style={{ color: INK }}>{title}</h1>
        {sub && <p className="mt-3 max-w-2xl text-[16px] leading-relaxed" style={{ color: MUTE }}>{sub}</p>}
      </div>
    </section>
  );

  // Clean thin-divider lessons & prices list. Used on home (featured) + services.
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
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-extrabold" style={{ color: GREEN_DK }}>{item.price}</span>}
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
                {catg.category && <p className="mb-2 text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: GREEN }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: LINE }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} className="text-[17px] font-extrabold tracking-tight" style={{ color: INK }}>{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-extrabold" style={{ color: GREEN_DK }}>{item.price}</span>}
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

  // ---- LESSONS & PRICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lessons & prices", "Lessons & prices", "Manual and automatic lessons, intensive courses and Pass Plus — clear prices, no surprises.")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {groups.length > 0 ? lessonList() : <p style={{ color: MUTE }}>Our lesson packages are coming soon.</p>}
          <div className="mt-12">
            <a href={cta} className="inline-flex rounded-lg px-7 py-3.5 text-sm font-extrabold text-white transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Calm, patient, fully qualified")}
        <section className="mx-auto max-w-3xl px-6 py-16">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.85]" style={{ color: MUTE }}>{content.about}</p>
          ) : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          {gallery[0] && (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="mt-10 aspect-[16/9] w-full rounded-2xl object-cover" />
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
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
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
        {banner("Contact", "Book your first lesson", "Tell us where you are and when suits — we will get you booked in and on the road.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 py-16 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-2xl p-8" style={{ background: MINT }}>
            <h2 className="text-xl font-extrabold tracking-tight" style={{ color: INK }}>Get in touch</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-extrabold transition hover:opacity-70" style={{ color: GREEN }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-extrabold transition hover:opacity-70" style={{ color: GREEN }}>{content.email}</a>}
            </div>
            {content.service_areas && content.service_areas.length > 0 && (
              <div className="mt-6 border-t pt-5" style={{ borderColor: LINE }}>
                <p className="text-xs font-extrabold uppercase tracking-[0.16em]" style={{ color: GREEN }}>Areas covered</p>
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
              theme={{ card: "#ffffff", cardBorder: LINE, heading: INK, blurb: MUTE, label: INK, fieldBg: "#fbfdfb", fieldBorder: LINE, fieldText: INK, button: GREEN, buttonText: "#ffffff", radius: "0.75rem" }}
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
      <section className="relative overflow-hidden" style={{ background: MINT }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em]" style={{ background: GREEN, color: "#fff" }}>Pass with confidence</p>
            <h1 className="mt-5 text-5xl font-extrabold leading-[1.0] tracking-tight sm:text-6xl" style={{ color: INK }}>
              <span data-edit="tenant.business_name">{name}</span>
            </h1>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[17px] leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-lg px-7 py-3.5 text-sm font-extrabold text-white shadow-lg transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
              {content.phone && (
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="rounded-lg px-7 py-3.5 text-sm font-extrabold transition hover:opacity-90" style={{ background: YELLOW, color: INK }}>Call {content.phone}</a>
              )}
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold" style={{ color: GREEN_DK }}>
              <span>✓ Fully qualified instructors</span>
              <span>✓ Manual & automatic</span>
              <span>✓ Pick-up from home</span>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-3xl shadow-2xl" style={{ background: "#fff" }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/3] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/3] w-full items-center justify-center text-7xl" style={{ background: GREEN, color: YELLOW }}>🚗</div>
              )}
            </div>
            <span aria-hidden className="absolute -bottom-4 -right-4 rounded-2xl px-5 py-3 text-sm font-extrabold shadow-xl" style={{ background: YELLOW, color: INK }}>Learners welcome</span>
          </div>
        </div>
      </section>

      {/* why learn with us */}
      <Why ink={INK} mute={MUTE} green={GREEN} line={LINE} />

      {/* how it works */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-2xl">
          <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: GREEN }}>How it works</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>From first lesson to full licence</h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          <Step n="1" title="Get booked in" body="Call or message and we will find a slot that fits around school, work or college." />
          <Step n="2" title="Learn at your pace" body="Patient, structured lessons in a dual-control car, picking up from your door." />
          <Step n="3" title="Pass & drive" body="Mock tests and Pass Plus to get you test-ready and confident on your own." />
        </div>
      </section>

      {/* about */}
      {content.about && (
        <section style={{ background: INK }} className="text-white">
          <div className="mx-auto max-w-4xl px-6 py-20">
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: YELLOW }}>About us</p>
            <p data-edit="content.about" className="mt-5 text-2xl font-bold leading-[1.5] tracking-tight sm:text-[1.7rem]">{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex text-sm font-extrabold transition hover:opacity-80" style={{ color: YELLOW }}>More about us →</a>
          </div>
        </section>
      )}

      {/* lessons & prices preview */}
      {featuredCount > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div>
            <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Lessons & prices</p>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Clear prices, no surprises</h2>
          </div>
          <div className="mt-10 rounded-2xl border p-7 sm:p-9" style={{ borderColor: LINE }}>
            {lessonList(6)}
          </div>
          <div className="mt-10">
            <a href={href("services")} className="inline-flex rounded-lg px-7 py-3.5 text-sm font-extrabold text-white transition hover:opacity-90" style={{ background: GREEN }}>See all lessons & prices</a>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: MINT }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="max-w-2xl">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Recent passes</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: INK }}>Another one through</h2>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            {gallery.length > 4 && (
              <div className="mt-8">
                <a href={href("gallery")} className="inline-flex text-sm font-extrabold transition hover:opacity-70" style={{ color: GREEN }}>See the gallery →</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="rounded-3xl px-8 py-16 text-center" style={{ background: GREEN }}>
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Ready to get on the road?</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed text-white/85">Book your first lesson today and take the first step towards passing.</p>
          <a href={cta} className="mt-8 inline-flex rounded-lg px-9 py-4 text-sm font-extrabold transition hover:opacity-90" style={{ background: YELLOW, color: INK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
