import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { FlowHeader } from "./FlowHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Flow — calm, light, editorial design for yoga / pilates / barre / breathwork
// studios. MULTI-PAGE: nav opens real routes (Classes / About / Gallery /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the translucent header and warm-paper footer are shared. Palette is baked
// (warm paper / muted sage / clay), serif headings; the tenant swaps in their
// own photography, copy, schedule, hours and address.

const PAPER = "#f6f3ec"; // warm paper page
const SAND = "#ece6da"; // tinted band / cards
const SAGE = "#5b6b54"; // muted sage ink & accent
const CLAY = "#a06650"; // soft clay secondary accent
const INK = "#33352f"; // body text
const MUTE = "#76796f"; // muted body text

const serif = { fontFamily: "var(--font-fraunces)" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Kicker({ children, center }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`text-[11px] uppercase tracking-[0.34em] ${center ? "text-center" : ""}`} style={{ color: CLAY }}>{children}</p>
  );
}

const bookingSkin: BookingSkin = {
  card: "#ffffff",
  cardBorder: `${SAGE}2e`,
  heading: SAGE,
  sub: MUTE,
  label: SAGE,
  fieldBg: PAPER,
  fieldBorder: `${SAGE}33`,
  fieldText: INK,
  button: SAGE,
  buttonText: "#ffffff",
  radius: "0.85rem",
  font: "var(--font-fraunces)",
  scheme: "light",
};

export default function Flow({ site, page = "home", basePath = "" }: PresetProps) {
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
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer style={{ background: SAGE }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="block">
            <span data-edit="tenant.business_name" style={serif} className="text-2xl tracking-[0.02em]">{name}</span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.4em] text-white/60">Studio</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-white/75">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/85 transition hover:bg-white/10" style={{ border: "1px solid #ffffff44" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={serif} className="text-lg">Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {([
              groups.length > 0 && { label: "Classes", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              { label: "Visit", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={serif} className="text-lg">Visit</h4>
          <div className="mt-5 space-y-3 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={serif} className="text-lg">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/75">Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t border-white/15 px-8 py-7 text-xs text-white/55 sm:flex-row">
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="uppercase tracking-[0.16em] transition hover:text-white">Book your first class</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body" >
      <FlowHeader name={name} cta={ctaLabel} ctaHref={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: SAND }}>
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <Kicker center>{kicker}</Kicker>
        <h1 style={{ ...serif, color: SAGE }} className="mt-4 text-4xl font-medium leading-[1.05] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our schedule", "Classes & Membership")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <p className="mb-7 flex items-center gap-4 text-[11px] uppercase tracking-[0.3em]" style={{ color: CLAY }}>
                      <span className="h-px w-8" style={{ background: `${CLAY}66` }} />{section.section}<span className="h-px flex-1" style={{ background: `${SAGE}22` }} />
                    </p>
                  )}
                  <ul className="space-y-7">
                    {section.categories.flatMap((c) => c.items).map((item) => (
                      <li key={item.id}>
                        <div className="flex items-baseline justify-between gap-3">
                          <span data-edit={`item:${item.id}:name`} style={{ ...serif, color: SAGE }} className="text-xl">{item.name}</span>
                          <span className="mx-2 flex-1 border-b border-dotted" style={{ borderColor: `${SAGE}3a` }} />
                          {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm" style={{ color: CLAY }}>{item.price}</span>}
                        </div>
                        {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="text-center">
                <a href={book} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: SAGE }}>{ctaLabel}</a>
              </div>
            </div>
          ) : <p className="text-center" style={{ color: MUTE }}>Our schedule is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our practice", "A Space To Breathe")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95]" style={{ color: INK }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={book} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: SAGE }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("The studio", "Inside Our Space")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
            <div className="columns-2 gap-4 sm:columns-3 [&>img]:mb-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT / VISIT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Come To The Studio")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: SAGE }} className="text-2xl">Find us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: INK }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: `${SAGE}26`, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] font-medium uppercase tracking-[0.18em] transition hover:bg-white" style={{ border: `1px solid ${SAGE}`, color: SAGE }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} sub="Reserve your mat — we'll confirm by phone or email." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Say hello"
                contactBlurb="New to the studio or have a question? We'd love to hear from you."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: `${SAGE}2e`, heading: SAGE, blurb: MUTE, label: SAGE, fieldBg: PAPER, fieldBorder: `${SAGE}33`, fieldText: INK, button: SAGE, buttonText: "#ffffff", radius: "0.85rem", font: "var(--font-fraunces)" }}
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
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#e7e0d3,#d6cdbd)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(40,38,32,0.55) 0%, rgba(40,38,32,0.18) 45%, rgba(40,38,32,0.28) 100%)" }} />
        <div className="relative z-10 m-auto flex max-w-3xl flex-col items-center gap-6 px-6 text-center">
          <Kicker center>{content.tagline || "Move · Breathe · Restore"}</Kicker>
          <h1 style={serif} className="text-5xl font-medium leading-[1.04] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">
            <span data-edit="tenant.business_name">{name}</span>
          </h1>
          {content.tagline && <p data-edit="content.tagline" className="max-w-xl text-[16px] leading-relaxed text-white/90 [text-shadow:0_2px_14px_rgba(0,0,0,0.4)]">{content.tagline}</p>}
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <a href={book} className="rounded-full px-9 py-4 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-white shadow-xl transition hover:opacity-90" style={{ background: SAGE }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="rounded-full border border-white/70 px-9 py-4 text-center text-[12px] font-medium uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white/10">View schedule</a>
            )}
          </div>
        </div>
      </section>

      {/* about — image left, copy right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-28 lg:grid-cols-2 lg:gap-20">
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/5] w-full rounded-[2rem] object-cover" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2rem]" style={{ background: SAND }} />
            )}
          </div>
          <div>
            <Kicker>Our practice</Kicker>
            <h2 style={{ ...serif, color: SAGE }} className="mt-4 text-4xl font-medium leading-[1.1] sm:text-5xl">A Space To Breathe</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.95]" style={{ color: INK }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.2em]" style={{ color: CLAY }}>Read more →</a>
          </div>
        </section>
      )}

      {/* schedule preview */}
      {featured.length > 0 && (
        <section style={{ background: SAND }}>
          <div className="mx-auto max-w-3xl px-8 py-24">
            <div className="text-center">
              <Kicker center>Our schedule</Kicker>
              <h2 style={{ ...serif, color: SAGE }} className="mt-4 text-4xl font-medium sm:text-5xl">Classes & Membership</h2>
            </div>
            <ul className="mt-12 space-y-6">
              {featured.map((item) => (
                <li key={item.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span data-edit={`item:${item.id}:name`} style={{ ...serif, color: SAGE }} className="text-lg">{item.name}</span>
                    <span className="mx-2 flex-1 border-b border-dotted" style={{ borderColor: `${SAGE}3a` }} />
                    {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm" style={{ color: CLAY }}>{item.price}</span>}
                  </div>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                </li>
              ))}
            </ul>
            <div className="mt-12 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] transition hover:bg-white" style={{ border: `1px solid ${SAGE}`, color: SAGE }}>View full schedule</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-8 text-center">
            <Kicker center>The studio</Kicker>
            <h2 style={{ ...serif, color: SAGE }} className="mx-auto mt-4 max-w-2xl text-3xl font-medium leading-snug sm:text-4xl">A calm, considered space to come home to.</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={href("gallery")} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-medium uppercase tracking-[0.18em] transition hover:bg-white" style={{ border: `1px solid ${SAGE}`, color: SAGE }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section style={{ background: SAGE }}>
        <div className="mx-auto max-w-2xl px-8 py-24 text-center text-white">
          <h2 style={serif} className="text-3xl font-medium leading-[1.15] sm:text-5xl">Begin where you are.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-white/75">Every level is welcome. Reserve your first class and arrive a few minutes early to settle in.</p>
          <a href={book} className="mt-9 inline-flex rounded-full bg-white px-10 py-4 text-[12px] font-medium uppercase tracking-[0.18em] transition hover:opacity-90" style={{ color: SAGE }}>{ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
