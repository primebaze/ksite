import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PulseHeader } from "./PulseHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Pulse — vibrant, modern boutique studio design for spin / HIIT / dance / rave-
// ride concepts. MULTI-PAGE: nav opens real routes (Classes / About / Gallery /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the sticky header and deep-plum footer are shared. Palette is baked (deep plum
// / magenta→orange gradient / soft lilac); the tenant swaps in their own
// photography, copy, classes, hours and address.

const PLUM = "#1a0b2e"; // deep plum page
const PANEL = "#241140"; // lifted panel
const LILAC = "#efe7fb"; // soft light surface
const PINK = "#ff3d81"; // magenta accent
const ORANGE = "#ff8a3d"; // gradient end
const TEXT = "#f4eefb"; // light text
const MUTE = "#c3b3da"; // muted lilac body text
const GRAD = `linear-gradient(90deg, ${PINK}, ${ORANGE})`;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function GradKicker({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`text-[11px] font-extrabold uppercase tracking-[0.28em] ${center ? "text-center" : ""}`}>
      <span style={{ background: GRAD, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>{children}</span>
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: PANEL,
  cardBorder: "#ffffff1f",
  heading: TEXT,
  sub: MUTE,
  label: "#d3c4ea",
  fieldBg: "#1c0d33",
  fieldBorder: "#ffffff26",
  fieldText: TEXT,
  button: PINK,
  buttonText: "#ffffff",
  radius: "1rem",
  scheme: "dark",
};

export default function Pulse({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Book a class";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Classes", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: PLUM, borderTop: `1px solid ${PINK}33` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" className="text-2xl font-extrabold tracking-[-0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition hover:text-white" style={{ border: "1px solid #ffffff33" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: TEXT }} {...editCopy(content, "footer_studio", "Studio")} />
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {([
              groups.length > 0 && { label: "Classes", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              { label: ctaLabel, href: book },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: TEXT }} {...editCopy(content, "footer_contact", "Contact")} />
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-extrabold uppercase tracking-[0.2em]" style={{ color: TEXT }} {...editCopy(content, "footer_hours", "Hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="font-semibold uppercase tracking-[0.16em] transition hover:text-white">Ride with us</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PLUM }} className="min-h-screen font-body" >
      <PulseHeader name={name} cta={ctaLabel} ctaHref={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string) => (
    <section style={{ background: PANEL, borderBottom: `1px solid ${PINK}33` }}>
      <div className="mx-auto max-w-7xl px-8 pb-14 pt-32 text-center sm:pt-40">
        <GradKicker center><span {...editCopy(content, kickerKey, kicker)} /></GradKicker>
        <h1 className="mt-4 text-5xl font-extrabold tracking-[-0.02em] sm:text-7xl" style={{ color: TEXT }} {...editCopy(content, titleKey, title)} />
      </div>
    </section>
  );

  // ---- CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("The timetable", "classes_kicker", "Classes & Packs", "classes_title")}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="mb-7 text-2xl font-extrabold tracking-[-0.01em]" style={{ color: TEXT }}>{section.section}</h2>}
                  <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {section.categories.flatMap((c) => c.items).map((item) => (
                      <div key={item.id} className="flex flex-col rounded-3xl p-7 transition hover:-translate-y-1" style={{ background: PANEL, border: "1px solid #ffffff1a" }}>
                        <div className="flex items-baseline justify-between gap-3">
                          <h3 data-edit={`item:${item.id}:name`} className="text-lg font-bold" style={{ color: TEXT }}>{item.name}</h3>
                          {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: PINK }}>{item.price}</span>}
                        </div>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="text-center">
                <a href={book} className="inline-flex rounded-full px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: GRAD }}>{ctaLabel}</a>
              </div>
            </div>
          ) : <p className="text-center" style={{ color: MUTE }}>Our timetable is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our vibe", "about_kicker", "Turn It Up", "about_title")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={book} className="inline-flex rounded-full px-10 py-4 text-xs font-bold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: GRAD }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Inside", "gallery_kicker", "The Room", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-3 py-12 sm:px-5">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Let's go", "contact_kicker", "Book Your First Ride", "contact_title")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: TEXT }} {...editCopy(content, "contact_find_heading", "Find us")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ border: `1px solid ${PINK}`, color: PINK }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} sub="Grab your spot — class sizes are limited, so book ahead." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Drop us a line"
                contactBlurb="New rider, group booking or just curious? Hit us up."
                contactCta="Send message"
                theme={{ card: PANEL, cardBorder: "#ffffff1f", heading: TEXT, blurb: MUTE, label: "#d3c4ea", fieldBg: "#1c0d33", fieldBorder: "#ffffff26", fieldText: TEXT, button: PINK, buttonText: "#ffffff", radius: "1rem" }}
              />
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#2a1147,#1a0b2e)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(115deg, rgba(26,11,46,0.85) 0%, rgba(26,11,46,0.35) 50%, rgba(255,61,129,0.25) 100%)" }} />
        <div className="relative z-10 m-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <span className="inline-flex rounded-full px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.24em] text-white" style={{ background: GRAD }} {...editCopy(content, "hero_eyebrow", "Now booking")} />
          <h1 className="text-6xl font-extrabold leading-[0.92] tracking-[-0.02em] text-white [text-shadow:0_2px_30px_rgba(0,0,0,0.5)] sm:text-8xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="max-w-xl text-[16px] leading-relaxed text-white/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a href={book} className="rounded-full px-9 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-white shadow-2xl transition hover:opacity-90" style={{ background: GRAD }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="rounded-full border border-white/70 px-9 py-4 text-center text-[12px] font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10" {...editCopy(content, "hero_classes_cta", "See classes")} />
            )}
          </div>
        </div>
      </section>

      {/* about — gradient card band */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[2rem]" style={{ background: PANEL }} />
            )}
            <span className="pointer-events-none absolute -right-3 -top-3 h-24 w-24 rounded-tr-[2rem]" style={{ background: GRAD, opacity: 0.3 }} />
          </div>
          <div>
            <GradKicker><span {...editCopy(content, "home_about_kicker", "Our vibe")} /></GradKicker>
            <h2 className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-[-0.01em] sm:text-5xl" style={{ color: TEXT }} {...editCopy(content, "home_about_heading", "Sweat, beats & good energy")} />
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.18em]" style={{ color: PINK }} {...editCopy(content, "home_about_link", "More about us →")} />
          </div>
        </section>
      )}

      {/* classes preview */}
      {featured.length > 0 && (
        <section style={{ background: PANEL, borderTop: "1px solid #ffffff14", borderBottom: "1px solid #ffffff14" }}>
          <div className="mx-auto max-w-7xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <GradKicker><span {...editCopy(content, "home_classes_kicker", "The timetable")} /></GradKicker>
                <h2 className="mt-4 text-4xl font-extrabold tracking-[-0.01em] sm:text-5xl" style={{ color: TEXT }} {...editCopy(content, "home_classes_heading", "Classes & Packs")} />
              </div>
              <a href={href("services")} className="text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: PINK }} {...editCopy(content, "home_classes_link", "View all →")} />
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((item) => (
                <div key={item.id} className="flex flex-col rounded-3xl p-7" style={{ background: PLUM, border: "1px solid #ffffff1a" }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 data-edit={`item:${item.id}:name`} className="text-lg font-bold" style={{ color: TEXT }}>{item.name}</h3>
                    {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: PINK }}>{item.price}</span>}
                  </div>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-8 text-center">
            <GradKicker center><span {...editCopy(content, "home_gallery_kicker", "Inside")} /></GradKicker>
            <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-extrabold leading-[1] tracking-[-0.01em] sm:text-4xl" style={{ color: TEXT }} {...editCopy(content, "home_gallery_heading", "This is where the magic happens")} />
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 px-3 sm:grid-cols-4 sm:px-5">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-bold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ border: `1px solid ${PINK}`, color: PINK }} {...editCopy(content, "home_gallery_cta", "View gallery")} />
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: GRAD }}>
        <div className="mx-auto max-w-3xl px-8 py-20 text-center text-white">
          <h2 className="text-4xl font-extrabold leading-[0.98] tracking-[-0.01em] sm:text-6xl" {...editCopy(content, "cta_heading", "Your first class is on the clock.")} />
          <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed text-white/90" {...editCopy(content, "cta_sub", "Clip in, turn it up and leave it all in the room. Book now and bring a friend.")} />
          <a href={book} className="mt-8 inline-flex rounded-full px-12 py-4 text-[12px] font-bold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ background: PLUM, color: "#ffffff" }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
