import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PetHeader, type PetHeaderTheme, type PetLink } from "../PetChrome";

// Stroll — a friendly, trustworthy dog walking & daycare service. Outdoorsy and
// active: cream page, meadow-green primary, sky-blue and warm sunshine supports,
// bark-brown ink. Signature motif is a winding paw-print trail running over
// rolling hills — fresh air, daily adventures, happy dogs. MULTI-PAGE.
// Distinct from Romp's coral grooming brand and the other pet siblings.

const INK = "#5A4632"; // bark brown text
const GREEN = "#3E9A57"; // meadow green primary
const SKY = "#59B4D9"; // sky blue
const SUN = "#F6B83E"; // warm sunshine accent
const CREAM = "#F6F1E4"; // cream page
const CARD = "#ffffff";
const HAIR = "#5A463218"; // faint bark hairline
const BODY = "#7a6a54"; // muted body

const display = { fontFamily: "var(--font-space)" } as const;

function Paw({ className, color = GREEN }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden>
      <ellipse cx="6.5" cy="11" rx="2.1" ry="2.7" />
      <ellipse cx="11" cy="8.3" rx="2.1" ry="2.9" />
      <ellipse cx="16" cy="8.8" rx="2.1" ry="2.8" />
      <ellipse cx="19" cy="13" rx="1.9" ry="2.4" />
      <path d="M12.4 13c2.7 0 4.7 1.8 4.7 4 0 1.8-1.4 2.7-3.3 2.7-1 0-1.6-.3-2.4-.3s-1.4.3-2.4.3c-1.9 0-3.3-.9-3.3-2.7 0-2.2 2-4 4.7-4z" />
    </svg>
  );
}

// The signature: a winding paw-print trail over rolling hills.
function HillTrail({ className, hill = GREEN, sky = SKY, paw = SUN }: { className?: string; hill?: string; sky?: string; paw?: string }) {
  return (
    <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className={className} aria-hidden>
      <path d="M0 150 Q 200 90 400 130 T 800 120 T 1200 110 V220 H0 Z" fill={sky} opacity="0.5" />
      <path d="M0 178 Q 250 118 520 160 T 1000 150 T 1200 158 V220 H0 Z" fill={hill} opacity="0.85" />
      <path d="M0 200 Q 300 168 640 192 T 1200 186 V220 H0 Z" fill={hill} />
      {/* winding leash-line / paw trail */}
      <path d="M40 192 C 220 120, 360 196, 540 150 S 860 196, 1160 132" fill="none" stroke={paw} strokeWidth="3" strokeDasharray="2 16" strokeLinecap="round" opacity="0.9" />
    </svg>
  );
}

function PawTrail({ className, color = SUN }: { className?: string; color?: string }) {
  // A short row of paw prints stepping along a path.
  return (
    <svg viewBox="0 0 120 28" className={className} fill={color} aria-hidden>
      {[8, 38, 68, 98].map((x, i) => (
        <g key={x} transform={`translate(${x} ${i % 2 ? 14 : 4}) scale(0.55)`}>
          <ellipse cx="4" cy="11" rx="2.1" ry="2.7" />
          <ellipse cx="9" cy="8.3" rx="2.1" ry="2.9" />
          <ellipse cx="14" cy="8.8" rx="2.1" ry="2.8" />
          <ellipse cx="18" cy="12" rx="1.9" ry="2.4" />
          <path d="M11 13c2.7 0 4.7 1.8 4.7 4 0 1.8-1.4 2.7-3.3 2.7-1 0-1.6-.3-2.4-.3s-1.4.3-2.4.3c-1.9 0-3.3-.9-3.3-2.7 0-2.2 2-4 4.7-4z" />
        </g>
      ))}
    </svg>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

const ACCENTS = [GREEN, SKY, SUN];

function Tag({ children, color = GREEN }: { children: ReactNode; color?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.1em]" style={{ background: `${color}1f`, color }}>
      <Paw className="h-3.5 w-3.5" color={color} />{children}
    </span>
  );
}

export default function StrollDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("contact") : content.booking_url || href("contact");

  const nav: PetLink[] = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as PetLink[];

  const headerTheme: PetHeaderTheme = {
    bar: CREAM,
    border: HAIR,
    brand: GREEN,
    link: INK,
    ctaBg: GREEN,
    ctaText: "#ffffff",
    heroDark: false,
    brandFont: "var(--font-space)",
    radius: "9999px",
    eyebrow: "Dog Walking & Daycare",
  };

  const cta = { label: bookingOn ? "Book a walk" : "Get in touch", href: book };

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2">
            <Paw className="h-6 w-6" color={SUN} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {content.socials.map((s, i) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full transition hover:opacity-80" style={{ background: ACCENTS[i % ACCENTS.length], color: "#fff" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: SUN }} {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {nav.map((l) => <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: SUN }} {...editCopy(content, "footer_sayhello", "Say hello")} />
          <div className="mt-4 space-y-2.5 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: SUN }} {...editCopy(content, "footer_hours", "Walking hours")} />
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-white/55">Out and about, rain or shine.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-6 text-xs text-white/45 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <p>© {new Date().getFullYear()} {name}. Fresh air & happy tails.</p>
        <a href={href("contact")} className="transition hover:text-white">Bookings &amp; meet-and-greets</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM }} className="min-h-screen font-body">
      <PetHeader name={name} cta={cta} links={nav} home={href("home")} solid={solid} theme={headerTheme} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, kickerKey: string, title: string, titleKey: string, color = GREEN, sub?: string, subKey?: string) => (
    <section className="relative overflow-hidden" style={{ background: CARD, borderBottom: `1px solid ${HAIR}` }}>
      <div className="relative z-10 mx-auto max-w-4xl px-8 pb-20 pt-32 text-center sm:pt-36">
        <div className="flex justify-center"><Tag color={color}><span {...editCopy(content, kickerKey, kicker)} /></Tag></div>
        <h1 style={{ ...display, color: INK }} className="mt-5 text-4xl font-extrabold tracking-tight sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {sub && <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: BODY }} {...editCopy(content, subKey ?? `${titleKey}_sub`, sub)} />}
      </div>
      <HillTrail className="absolute inset-x-0 bottom-0 h-24 w-full" />
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we offer", "svc_kicker", "Walks, daycare & visits", "svc_title", SKY, "Every dog is different — pick the routine that keeps your best friend happy and tired.", "svc_sub")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: ACCENTS[gi % ACCENTS.length] }} className="text-2xl font-extrabold tracking-tight">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-5">
                      {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-1 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color: SKY }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: HAIR }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: GREEN }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-center" style={{ color: BODY }}>Our services are coming soon.</p>}
          <div className="mt-14 text-center">
            <a href={book} className="inline-flex px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: GREEN, borderRadius: "9999px" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our pack", "about_kicker", "Reliable hands, wagging tails", "about_title", SUN)}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p> : <p style={{ color: BODY }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[{ t: "Fully insured", c: GREEN }, { t: "DBS-checked", c: SKY }, { t: "Photo updates", c: SUN }].map((b) => (
              <div key={b.t} className="rounded-[1.75rem] p-6" style={{ background: `${b.c}16` }}>
                <Paw className="h-6 w-6" color={b.c} />
                <p className="mt-3 text-base font-bold" style={{ color: INK }}>{b.t}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={book} className="inline-flex px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: GREEN, borderRadius: "9999px" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Out on the trail", "gallery_kicker", "Happy dogs, every day", "gallery_title", GREEN)}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.75rem] object-cover" style={{ border: `3px solid ${ACCENTS[i % ACCENTS.length]}` }} />
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
        {banner("Let's meet", "contact_kicker", "Book a walk", "contact_title", SKY, "Tell us about your dog and we'll arrange a free meet-and-greet before the adventures begin.", "contact_sub")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-extrabold tracking-tight" {...editCopy(content, "contact_findus", "Find us")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: BODY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: GREEN }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: GREEN }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: HAIR, color: BODY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SKY }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-sm font-bold transition hover:opacity-90" style={{ background: SUN, color: INK, borderRadius: "9999px" }}>Get directions</a>
            )}
          </div>
          <div>
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book a walk"
              bookingBlurb="Tell us about your dog and the days you need — we'll be in touch to set up a meet-and-greet."
              bookingCta="Request a walk"
              theme={{ card: CARD, cardBorder: HAIR, heading: INK, blurb: BODY, label: SKY, fieldBg: CREAM, fieldBorder: HAIR, fieldText: INK, button: GREEN, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-space)" }}
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
      {/* hero — outdoorsy, fresh air, rolling hills + paw trail signature */}
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(170deg, ${SKY}1f 0%, ${CREAM} 55%)` }}>
        <div className="pointer-events-none absolute -right-16 top-24 h-44 w-44 rounded-full opacity-40" style={{ background: SUN }} />
        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-10 px-6 pb-28 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-2 lg:gap-14 lg:pb-36">
          <div>
            <div className="flex flex-wrap gap-2"><Tag color={GREEN}><span {...editCopy(content, "hero_tag_walks", "Group walks")} /></Tag><Tag color={SKY}><span {...editCopy(content, "hero_tag_daycare", "Daycare")} /></Tag><Tag color={SUN}><span {...editCopy(content, "hero_tag_sitting", "Pet sitting")} /></Tag></div>
            <h1 style={{ ...display, color: INK }} className="mt-6 text-5xl font-extrabold leading-[0.98] tracking-tight sm:text-7xl">
              Happy dogs,<br /><span style={{ color: GREEN }}>every day</span>
            </h1>
            <p style={{ ...display, color: INK }} className="sr-only" data-edit="tenant.business_name">{name}</p>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[17px] leading-relaxed" style={{ color: BODY }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:opacity-90" style={{ background: GREEN, borderRadius: "9999px" }}>{cta.label}</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex px-8 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: SUN, color: INK, borderRadius: "9999px" }}>See services</a>
              )}
            </div>
            <div className="mt-7"><PawTrail className="h-7 w-36" color={`${GREEN}99`} /></div>
          </div>
          <div className="relative">
            {heroVideo ? (
              <video src={heroVideo} autoPlay muted loop playsInline className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full rounded-[2.5rem] object-cover shadow-2xl" />
            ) : (
              <div className="aspect-[4/5] w-full rounded-[2.5rem]" style={{ background: `linear-gradient(150deg, ${SKY}, ${GREEN})` }} />
            )}
            <div className="absolute -bottom-4 -left-3 flex items-center gap-2 rounded-full px-5 py-3 shadow-xl" style={{ background: CARD, color: GREEN }}>
              <Paw className="h-5 w-5" color={GREEN} /><span className="text-sm font-bold">Out for a stroll</span>
            </div>
          </div>
        </div>
        <HillTrail className="absolute inset-x-0 bottom-0 h-28 w-full" />
      </section>

      {/* trust strip — insured / DBS-checked / photo updates */}
      <section style={{ background: GREEN }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-8 sm:grid-cols-3 sm:px-8">
          {[
            { t: "Fully insured & first-aid trained", },
            { t: "DBS-checked, trusted walkers", },
            { t: "Updates & photos after every walk", },
          ].map((b) => (
            <div key={b.t} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}><Paw className="h-5 w-5" color="#fff" /></span>
              <p className="text-sm font-semibold leading-snug text-white">{b.t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* what we offer — clean row list */}
      {featured.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <div className="flex justify-center"><Tag color={SKY}><span {...editCopy(content, "home_offer_tag", "What we offer")} /></Tag></div>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_offer_heading", "Walks, daycare & visits")} />
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: HAIR }}>
            {featured.map((item) => (
              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ color: INK }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                </div>
                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-extrabold" style={{ color: GREEN }}>{item.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: GREEN, borderRadius: "9999px" }}>See everything</a>
          </div>
        </section>
      )}

      {/* your dog's day — how it works band */}
      <section style={{ background: CARD, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <div className="flex justify-center"><Tag color={SUN}><span {...editCopy(content, "home_how_tag", "Your dog's day")} /></Tag></div>
            <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_how_heading", "How a stroll works")} />
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", t: "Meet & greet", d: "We come to you for a free, no-obligation hello so your dog knows their walker.", c: GREEN },
              { n: "02", t: "Doorstep pick-up", d: "Friendly collection from your home, with your routine and quirks all noted.", c: SKY },
              { n: "03", t: "Fresh-air adventure", d: "Off to fields and trails for sniffs, play and a proper leg-stretch.", c: SUN },
              { n: "04", t: "Home & a photo", d: "Safely back, fed if you like, with a happy snap to your phone.", c: GREEN },
            ].map((s) => (
              <div key={s.n} className="rounded-[1.75rem] p-6" style={{ background: CREAM }}>
                <span className="text-sm font-extrabold" style={{ ...display, color: s.c }}>{s.n}</span>
                <h3 style={{ ...display, color: INK }} className="mt-2 text-lg font-extrabold">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* about band */}
      {content.about && (
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[2rem] object-cover" style={{ border: `4px solid ${SUN}` }} />
              ) : (
                <div className="aspect-[4/3] w-full rounded-[2rem]" style={{ background: `${SKY}22` }} />
              )}
            </div>
            <div>
              <Tag color={GREEN}><span {...editCopy(content, "home_about_tag", "About us")} /></Tag>
              <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_about_heading", "Local, reliable & dog-mad")} />
              <p data-edit="content.about" className="mt-5 text-[16px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p>
              <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}>Meet the pack →</a>
            </div>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: CARD, borderTop: `1px solid ${HAIR}` }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="text-center">
              <div className="flex justify-center"><Tag color={SKY}><span {...editCopy(content, "home_gallery_tag", "On the trail")} /></Tag></div>
              <h2 style={{ ...display, color: INK }} className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "home_gallery_heading", "Happy dogs, every day")} />
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-[1.75rem] object-cover" style={{ border: `3px solid ${ACCENTS[i % ACCENTS.length]}` }} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="inline-flex px-9 py-4 text-sm font-bold text-white transition hover:opacity-90" style={{ background: SKY, borderRadius: "9999px" }}>See the gallery</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA — meet & greet */}
      <section className="relative overflow-hidden" style={{ background: GREEN }}>
        <HillTrail className="absolute inset-x-0 top-0 h-24 w-full rotate-180" hill="#2f7a44" sky={`${SKY}cc`} paw={SUN} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 py-24 text-center sm:px-8">
          <PawTrail className="mx-auto h-7 w-40" color="#ffffffcc" />
          <h2 style={{ ...display, color: "#fff" }} className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl" {...editCopy(content, "cta_heading", "Let's go for a walk")} />
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/85">Book a free meet-and-greet and we'll plan the perfect routine for your dog.</p>
          <a href={book} className="mt-8 inline-flex px-9 py-4 text-sm font-bold transition hover:opacity-90" style={{ background: "#fff", color: GREEN, borderRadius: "9999px" }}>{cta.label}</a>
        </div>
      </section>
    </>,
    false,
  );
}
