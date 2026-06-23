import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EduMobileNav } from "./EduMobileNav";

// Sprout — warm, friendly early-years / nursery design. Soft rounded shapes,
// reassuring sunny palette (cream, leafy green, warm coral), playful blob
// accents and big breathing room. MULTI-PAGE: nav opens real routes
// (Programmes / About / Gallery / Contact) under basePath. Palette is baked;
// the tenant swaps in their own photography, copy, programmes, hours, address.
// Best suits: nursery / early years / pre-school.

const display = { fontFamily: "var(--font-fraunces)" } as const;

const CREAM = "#fbf6ec"; // page background
const CARD = "#ffffff";
const INK = "#3a352c"; // warm dark text
const MUTE = "#7c7464"; // muted body text
const GREEN = "#5c8a52"; // leafy primary
const GREEN_SOFT = "#e7f0e2";
const CORAL = "#e8896b"; // warm coral accent
const SUN = "#f3c45a"; // sunshine yellow
const SKY = "#cfe4ec"; // soft sky

function Blob({ className, color }: { className?: string; color: string }) {
  return (
    <span
      aria-hidden
      className={`pointer-events-none absolute -z-10 block ${className ?? ""}`}
      style={{ background: color, borderRadius: "42% 58% 63% 37% / 47% 42% 58% 53%" }}
    />
  );
}

function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-semibold uppercase tracking-[0.14em]" style={{ background: GREEN_SOFT, color: GREEN }}>
      {children}
    </span>
  );
}

export default function SproutDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
  const ctaLabel = "Book a visit";

  const nav = [
    groups.length > 0 && { label: "Programmes", href: href("services") },
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
            <span aria-hidden className="flex h-9 w-9 items-center justify-center rounded-full text-lg" style={{ background: SUN, color: INK }}>★</span>
          )}
          <span data-edit="tenant.business_name" style={{ ...display, color: INK }} className="text-xl font-semibold">{name}</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-semibold transition hover:opacity-70" style={{ color: MUTE }}>{l.label}</a>
          ))}
        </nav>
        <a href={cta} className="hidden rounded-full px-6 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 md:inline-flex" style={{ background: GREEN }}>{ctaLabel}</a>
        <EduMobileNav links={nav} cta={cta} ctaLabel={ctaLabel} barColor={INK} panelBg={CREAM} panelText={INK} ctaBg={GREEN} ctaText="#ffffff" />
      </div>
    </header>
  );

  const footer = (
    <footer style={{ background: GREEN, color: "#ffffff" }}>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <span style={display} className="text-2xl font-semibold">{name}</span>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">{content.tagline}</p>}
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
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Visit &amp; contact</h4>
            <div className="mt-4 space-y-2 text-sm text-white/90">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        )}
        {content.hours && content.hours.length > 0 && (
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Opening hours</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/90">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/65">{h.open}</span></li>
              ))}
            </ul>
          </div>
        )}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.16em] text-white/70">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-white/90">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/15">
        <p className="mx-auto max-w-6xl px-6 py-6 text-xs text-white/65">© {new Date().getFullYear()} {name}. A happy place to grow.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen overflow-x-hidden font-body" >
      {header}
      <div style={{ color: INK }}>{children}</div>
      {footer}
    </div>
  );

  const pageHeader = (kicker: string, title: string, sub?: string) => (
    <section className="relative overflow-hidden">
      <Blob className="-left-16 -top-10 h-56 w-56 opacity-40" color={SKY} />
      <Blob className="-right-10 top-10 h-40 w-40 opacity-50" color={SUN} />
      <div className="mx-auto max-w-4xl px-6 pb-10 pt-16 text-center sm:pt-20">
        <Pill>{kicker}</Pill>
        <h1 style={{ ...display, color: INK }} className="mt-5 text-4xl font-semibold sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[16px] leading-relaxed" style={{ color: MUTE }}>{sub}</p>}
      </div>
    </section>
  );

  // Clean thin-divider programme list (shared by home featured + services page).
  const programmeList = (limit?: number) => {
    const items = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
    const shown = limit ? items.slice(0, limit) : null;
    if (limit) {
      return (
        <ul className="divide-y" style={{ borderColor: `${INK}14` }}>
          {shown!.map((item) => (
            <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
              <div className="min-w-0">
                <p data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-semibold">{item.name}</p>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
              </div>
              {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: GREEN }}>{item.price}</span>}
            </li>
          ))}
        </ul>
      );
    }
    return (
      <div className="space-y-12">
        {groups.map((section, gi) => (
          <div key={section.section || gi}>
            {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: GREEN }} className="text-2xl font-semibold">{section.section}</h2>}
            {section.categories.map((catg) => (
              <div key={catg.category ?? "_"} className="mt-4">
                {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-2 text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CORAL }}>{catg.category}</p>}
                <ul className="divide-y" style={{ borderColor: `${INK}14` }}>
                  {catg.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                      <div className="min-w-0">
                        <p data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-semibold">{item.name}</p>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 whitespace-nowrap text-sm font-semibold" style={{ color: GREEN }}>{item.price}</span>}
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

  // ---- SERVICES / PROGRAMMES ----
  if (page === "services") {
    return shell(
      <>
        {pageHeader("Our programmes", "Rooms & programmes", "Nurturing care and play-led learning for every age and stage.")}
        <section className="mx-auto max-w-3xl px-6 pb-24">
          {groups.length > 0 ? programmeList() : <p className="text-center" style={{ color: MUTE }}>Our programmes are coming soon.</p>}
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
        {pageHeader("About us", "A happy place to grow")}
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
        {pageHeader("Gallery", "Moments from our days")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 pb-24">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 pb-24 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {pageHeader("Get in touch", "Come and visit us", "We would love to show you around. Book a visit and we will confirm a time that suits you.")}
        <section className="mx-auto grid max-w-5xl gap-12 px-6 pb-24 lg:grid-cols-[1fr_1.1fr]">
          <div className="rounded-[2rem] p-8" style={{ background: GREEN_SOFT }}>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-semibold">Find us</h2>
            <div className="mt-5 space-y-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: GREEN }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: GREEN }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-6 space-y-2 border-t pt-5 text-sm" style={{ borderColor: `${INK}14`, color: MUTE }}>
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
              bookingTitle="Book a visit"
              bookingBlurb="Tell us a little about your family and we will be in touch to arrange a tour."
              bookingCta="Request a visit"
              theme={{ card: CARD, cardBorder: `${INK}12`, heading: INK, blurb: MUTE, label: MUTE, fieldBg: CREAM, fieldBorder: `${INK}1f`, fieldText: INK, button: GREEN, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
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
      <section className="relative overflow-hidden">
        <Blob className="-right-20 -top-16 h-72 w-72 opacity-40" color={SUN} />
        <Blob className="-left-24 top-40 h-64 w-64 opacity-40" color={SKY} />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-2 lg:gap-14 lg:py-24">
          <div>
            <Pill>Enrolling now</Pill>
            <h1 style={{ ...display, color: INK }} className="mt-5 text-5xl font-semibold leading-[1.05] sm:text-6xl">
              <span data-edit="tenant.business_name">{name}</span>
            </h1>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[17px] leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={cta} className="rounded-full px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition hover:opacity-90" style={{ background: GREEN }}>{ctaLabel}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="rounded-full px-7 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ background: CARD, color: INK, border: `1px solid ${INK}14` }}>See programmes</a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2.5rem] shadow-2xl" style={{ background: GREEN_SOFT }}>
              {heroVideo ? (
                <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="flex aspect-[4/5] w-full items-center justify-center text-7xl" style={{ background: SKY }}>🌱</div>
              )}
            </div>
            <span aria-hidden className="absolute -bottom-5 -left-5 flex h-20 w-20 items-center justify-center rounded-full text-3xl shadow-xl" style={{ background: CORAL, color: "#fff" }}>♥</span>
          </div>
        </div>
      </section>

      {/* values strip */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: "🧸", title: "Play-led learning", body: "Curiosity and confidence grow through play, stories and song." },
            { icon: "🥗", title: "Nourishing meals", body: "Freshly prepared, balanced meals and snacks every day." },
            { icon: "🤝", title: "Warm, qualified team", body: "Caring, experienced staff who know every child by name." },
          ].map((c) => (
            <div key={c.title} className="rounded-[1.75rem] p-7" style={{ background: CARD, border: `1px solid ${INK}0d` }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-full text-2xl" style={{ background: GREEN_SOFT }}>{c.icon}</span>
              <h3 style={{ ...display, color: INK }} className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about teaser */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <Pill>Our ethos</Pill>
          <p data-edit="content.about" style={{ ...display, color: INK }} className="mx-auto mt-6 max-w-2xl text-2xl font-medium leading-[1.5] sm:text-[1.7rem]">{content.about}</p>
          <a href={href("about")} className="mt-7 inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: GREEN }}>More about us →</a>
        </section>
      )}

      {/* programmes preview */}
      {featuredCount > 0 && (
        <section style={{ background: GREEN_SOFT }}>
          <div className="mx-auto max-w-3xl px-6 py-20">
            <div className="text-center">
              <Pill>Programmes</Pill>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl">Rooms for every age</h2>
            </div>
            <div className="mt-10 rounded-[2rem] p-7 sm:p-9" style={{ background: CARD }}>
              {programmeList(6)}
            </div>
            <div className="mt-10 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: GREEN }}>View all programmes</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <Pill>Our days</Pill>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-semibold sm:text-4xl">Happy faces, busy hands</h2>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.5rem] object-cover" />
            ))}
          </div>
          {gallery.length > 4 && (
            <div className="mt-8 text-center">
              <a href={href("gallery")} className="inline-flex text-sm font-semibold transition hover:opacity-70" style={{ color: GREEN }}>See the gallery →</a>
            </div>
          )}
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="relative overflow-hidden rounded-[2.5rem] px-8 py-16 text-center" style={{ background: SUN }}>
          <Blob className="-right-10 -top-10 h-40 w-40 opacity-40" color={CORAL} />
          <h2 style={{ ...display, color: INK }} className="text-3xl font-semibold sm:text-4xl">Come and see for yourself</h2>
          <p className="mx-auto mt-4 max-w-md text-[16px] leading-relaxed" style={{ color: INK, opacity: 0.8 }}>Book a friendly, no-pressure visit and meet the team who will care for your little one.</p>
          <a href={cta} className="mt-8 inline-flex rounded-full px-9 py-4 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: INK }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
  );
}
