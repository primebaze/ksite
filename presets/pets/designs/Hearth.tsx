import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PetHeader, type PetHeaderTheme, type PetLink } from "../PetChrome";

// Hearth — a trusted neighbourhood veterinary clinic. Calm, clean and
// "medical-but-warm": a soft off-white page, a deep teal/spruce primary, a sage
// support tone and a warm clay accent. Rounded but composed; reassuring rather
// than playful. MULTI-PAGE: the nav opens real routes (Services / About /
// Gallery / Contact) under basePath; shared sticky header + footer. Best suited
// to a vet practice.

const INK = "#16302e"; // deep spruce text / headings
const TEAL = "#1f5d57"; // primary brand teal
const SAGE = "#5b8a7e"; // muted sage
const CLAY = "#d98c5f"; // warm clay accent (paws / highlights)
const PAPER = "#f6f3ec"; // warm off-white page
const CARD = "#ffffff"; // clean cards
const HAIR = "#1f5d571f"; // faint teal hairline
const BODY = "#4a5b57"; // muted body text

const heading = { fontFamily: "var(--font-fraunces)" } as const;

function Paw({ className, color = CLAY }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden>
      <ellipse cx="6.5" cy="11" rx="2" ry="2.6" />
      <ellipse cx="11" cy="8.5" rx="2" ry="2.8" />
      <ellipse cx="16" cy="9" rx="2" ry="2.7" />
      <ellipse cx="19" cy="13" rx="1.8" ry="2.3" />
      <path d="M12.4 13c2.6 0 4.6 1.7 4.6 3.9 0 1.7-1.4 2.6-3.2 2.6-1 0-1.6-.3-2.4-.3s-1.4.3-2.4.3c-1.8 0-3.2-.9-3.2-2.6C5.8 14.7 7.8 13 10.4 13z" />
    </svg>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Kicker({ children, center = true }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.28em] ${center ? "justify-center" : ""}`} style={{ color: SAGE }}>
      <Paw className="h-3.5 w-3.5" />
      {children}
    </p>
  );
}

export default function Hearth({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("contact") : content.booking_url || content.reservation_url || href("contact");

  const nav: PetLink[] = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as PetLink[];

  const headerTheme: PetHeaderTheme = {
    bar: PAPER,
    border: HAIR,
    brand: TEAL,
    link: INK,
    ctaBg: TEAL,
    ctaText: "#ffffff",
    heroDark: false,
    brandFont: "var(--font-fraunces)",
    radius: "9999px",
    eyebrow: "Veterinary Care",
  };

  const cta = { label: bookingOn ? "Book a visit" : "Contact us", href: book };

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2">
            <Paw className="h-5 w-5" color={CLAY} />
            <span data-edit="tenant.business_name" style={heading} className="text-xl font-medium text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-white" style={{ border: "1px solid rgba(255,255,255,0.25)" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Contact</h4>
          <div className="mt-4 space-y-2.5 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/45">Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-white/55">Open weekdays.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-6 text-xs text-white/45 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="transition hover:text-white">Appointments &amp; enquiries</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAPER }} className="min-h-screen font-body" >
      <PetHeader name={name} cta={cta} links={nav} home={href("home")} solid={solid} theme={headerTheme} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: CARD, borderBottom: `1px solid ${HAIR}` }}>
      <div className="mx-auto max-w-4xl px-8 pb-16 pt-32 text-center sm:pt-36">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...heading, color: INK }} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: BODY }}>{sub}</p>}
      </div>
    </section>
  );

  // ---- catalog row list (clean thin-divider) ----
  const catalogList = (
    <div className="space-y-14">
      {groups.map((section, gi) => (
        <div key={section.section || gi}>
          {section.section && <h2 style={{ ...heading, color: TEAL }} className="text-2xl font-medium">{section.section}</h2>}
          {section.categories.map((catg) => (
            <div key={catg.category ?? "_"} className="mt-5">
              {catg.category && <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: SAGE }}>{catg.category}</p>}
              <ul className="divide-y" style={{ borderColor: HAIR }}>
                {catg.items.map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                    <div className="min-w-0">
                      <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ color: INK }}>{item.name}</p>
                      {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                    </div>
                    {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ))}
    </div>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our Services", "Care for every life stage", "From wellness checks and vaccinations to dentistry and surgery — gentle, attentive veterinary care.")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? catalogList : <p className="text-center" style={{ color: BODY }}>Our services are coming soon.</p>}
          <div className="mt-14 text-center">
            <a href={book} className="inline-flex px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: TEAL, borderRadius: "9999px" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About the Practice", "Trusted, gentle veterinary care")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p> : <p style={{ color: BODY }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {["Compassionate team", "Modern facilities", "Lifelong partnership"].map((t) => (
              <div key={t} className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${HAIR}` }}>
                <Paw className="h-5 w-5" />
                <p className="mt-3 text-sm font-semibold" style={{ color: INK }}>{t}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={book} className="inline-flex px-8 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: TEAL, borderRadius: "9999px" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Faces from our clinic")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-3xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center" style={{ color: BODY }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in Touch", "Book a visit", "We will confirm your appointment by phone or email. For emergencies, please call us directly.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...heading, color: INK }} className="text-2xl font-medium">Find us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: BODY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70" style={{ color: TEAL }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70" style={{ color: TEAL }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: HAIR, color: BODY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SAGE }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-sm font-semibold transition hover:opacity-90" style={{ border: `1px solid ${TEAL}`, color: TEAL, borderRadius: "9999px" }}>Get directions</a>
            )}
          </div>
          <div>
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book an appointment"
              bookingBlurb="Tell us about your pet and when suits — we'll confirm your appointment."
              bookingCta="Request appointment"
              theme={{ card: CARD, cardBorder: HAIR, heading: INK, blurb: BODY, label: SAGE, fieldBg: PAPER, fieldBorder: HAIR, fieldText: INK, button: TEAL, buttonText: "#ffffff", radius: "1rem", font: "var(--font-fraunces)" }}
            />
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);

  return shell(
    <>
      {/* hero — soft, calm, split with rounded media */}
      <section className="relative overflow-hidden" style={{ background: CARD }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-2 lg:gap-14 lg:pb-24">
          <div>
            <Kicker center={false}>Caring for your companions</Kicker>
            <h1 style={{ ...heading, color: INK }} className="mt-4 text-4xl font-medium leading-[1.08] sm:text-6xl">
              <span data-edit="tenant.business_name">{name}</span>
            </h1>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: BODY }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex px-7 py-3.5 text-sm font-semibold text-white transition hover:opacity-90" style={{ background: TEAL, borderRadius: "9999px" }}>{cta.label}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex px-7 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ border: `1px solid ${TEAL}`, color: TEAL, borderRadius: "9999px" }}>Our services</a>
              )}
            </div>
            {content.phone && (
              <p className="mt-6 text-sm" style={{ color: BODY }}>Or call us: <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: TEAL }}>{content.phone}</a></p>
            )}
          </div>
          <div className="relative">
            {heroVideo ? (
              <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-xl" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2rem]" style={{ background: `linear-gradient(150deg, ${SAGE}, ${TEAL})` }} />
            )}
            <div className="absolute -bottom-5 -left-5 hidden items-center gap-3 rounded-2xl px-5 py-4 shadow-lg sm:flex" style={{ background: PAPER, border: `1px solid ${HAIR}` }}>
              <Paw className="h-7 w-7" />
              <div>
                <p className="text-sm font-semibold" style={{ color: INK }}>Gentle, attentive care</p>
                <p className="text-xs" style={{ color: BODY }}>For every cat, dog &amp; companion</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* reassurance trio */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-3">
          {[
            { t: "Wellness & prevention", d: "Routine checks, vaccinations and tailored advice to keep them thriving." },
            { t: "Diagnostics & dentistry", d: "Modern on-site facilities for accurate, comfortable treatment." },
            { t: "Surgery & recovery", d: "Skilled, careful procedures with attentive aftercare." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl p-7" style={{ background: CARD, border: `1px solid ${HAIR}` }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-full" style={{ background: `${TEAL}14` }}><Paw className="h-5 w-5" color={TEAL} /></span>
              <h3 style={{ ...heading, color: INK }} className="mt-4 text-lg font-medium">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* about band */}
      {content.about && (
        <section style={{ background: CARD, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full rounded-[2rem]" style={{ background: `${SAGE}22` }} />
              )}
            </div>
            <div>
              <Kicker center={false}>About us</Kicker>
              <h2 style={{ ...heading, color: INK }} className="mt-4 text-3xl font-medium leading-tight sm:text-4xl">A practice your family can trust</h2>
              <p data-edit="content.about" className="mt-5 text-[16px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p>
              <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold" style={{ color: TEAL }}>Read more →</a>
            </div>
          </div>
        </section>
      )}

      {/* services teaser — clean row list */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <Kicker>What we offer</Kicker>
            <h2 style={{ ...heading, color: INK }} className="mt-4 text-3xl font-medium sm:text-4xl">Our services</h2>
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: HAIR }}>
            {featured.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ color: INK }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                </div>
                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-8 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ border: `1px solid ${TEAL}`, color: TEAL, borderRadius: "9999px" }}>View all services</a>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: CARD, borderTop: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="text-center">
              <Kicker>Our patients</Kicker>
              <h2 style={{ ...heading, color: INK }} className="mt-4 text-3xl font-medium sm:text-4xl">Happy, healthy companions</h2>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="inline-flex px-8 py-3.5 text-sm font-semibold transition hover:opacity-90" style={{ border: `1px solid ${TEAL}`, color: TEAL, borderRadius: "9999px" }}>View gallery</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center sm:px-8">
        <div className="rounded-[2.5rem] px-8 py-14" style={{ background: INK }}>
          <Paw className="mx-auto h-8 w-8" />
          <h2 style={{ ...heading, color: "#ffffff" }} className="mt-4 text-3xl font-medium sm:text-4xl">Your pet deserves the best care</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">Book an appointment today and give your companion the gentle, expert attention they deserve.</p>
          <a href={book} className="mt-8 inline-flex px-9 py-4 text-sm font-semibold transition hover:opacity-90" style={{ background: CLAY, color: "#1b1109", borderRadius: "9999px" }}>{cta.label}</a>
        </div>
      </section>
    </>,
    false,
  );
}
