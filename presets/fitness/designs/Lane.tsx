import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LaneHeader } from "./LaneHeader";
import { FitnessBooking, type BookingSkin } from "./FitnessBooking";

// Lane — a friendly, confidence-building learn-to-swim school (babies to
// adults). MULTI-PAGE: nav opens real routes (Lessons / About / Gallery /
// Contact) under basePath, never scroll anchors. Signature is a bright, watery
// register — pool-blue + fresh aqua washes, sunny-yellow kid accents, soft
// rounded cards, and a swim-LANE / wave / ripple motif (rope lane-lines + gentle
// ripples) that no fitness sibling shares. Tenant swaps in their own media,
// lessons, hours and copy.

const NAVY = "#103A57"; // deep navy ink
const POOL = "#1B8FD1"; // pool blue (primary)
const AQUA = "#58C7E0"; // fresh aqua
const YELLOW = "#FBD24B"; // sunny yellow (fun / kids accent)
const WHITE = "#F4FBFE"; // clean watery white
const MUTE = "#5C7A8C"; // muted blue-grey body
const LINE = "#1B8FD122"; // soft hairline

const display = { fontFamily: "var(--font-poppins, var(--font-inter))" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Signature: gentle stacked water ripples (used as section ornament).
function Ripples({ color = POOL, className = "" }: { color?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M0 60 Q 180 20 360 60 T 720 60 T 1080 60 T 1440 60" fill="none" stroke={color} strokeWidth="2" opacity="0.55" />
      <path d="M0 84 Q 180 44 360 84 T 720 84 T 1080 84 T 1440 84" fill="none" stroke={color} strokeWidth="2" opacity="0.35" />
      <path d="M0 36 Q 180 76 360 36 T 720 36 T 1080 36 T 1440 36" fill="none" stroke={color} strokeWidth="2" opacity="0.22" />
    </svg>
  );
}

// Signature: swim-lane rope line — alternating bead segments like a pool divider.
function LaneRope({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-1.5 ${className}`} aria-hidden>
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ background: i % 2 === 0 ? POOL : YELLOW, opacity: 0.85 }}
        />
      ))}
    </div>
  );
}

function Kicker({ children, color = POOL }: { children: ReactNode; color?: string }) {
  return (
    <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.16em]" style={{ color }}>
      <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: YELLOW }} />
      {children}
    </p>
  );
}

const bookingSkin: BookingSkin = {
  card: "#ffffff",
  cardBorder: "#1B8FD122",
  heading: NAVY,
  sub: MUTE,
  label: POOL,
  fieldBg: WHITE,
  fieldBorder: "#1B8FD133",
  fieldText: NAVY,
  button: POOL,
  buttonText: "#ffffff",
  radius: "14px",
  font: "var(--font-inter)",
  scheme: "light",
};

// Learn-to-swim progression badges (the stages band).
const STAGES = [
  { label: "Splash", note: "Water confidence", color: YELLOW },
  { label: "Float", note: "Floating & balance", color: AQUA },
  { label: "Glide", note: "First strokes", color: POOL },
  { label: "Swim", note: "Stroke development", color: NAVY },
];

export default function LaneDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const extBook = content.booking_url || content.reservation_url || content.cta_url;
  const ctaLabel = content.cta_label || "Book a lesson";

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const join = extBook || href("contact");
  const classNames = groups.flatMap((s) => s.categories.flatMap((c) => c.items.map((i) => i.name)));

  const nav = [
    groups.length > 0 && { label: "Lessons", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const trust = [
    { k: "Small", v: "Class sizes" },
    { k: "Qualified", v: "Swim teachers" },
    { k: "All ages", v: "Babies to adults" },
  ];

  const footer = (
    <footer style={{ background: NAVY }} className="relative text-white">
      <Ripples color={AQUA} className="absolute left-0 right-0 top-0 h-10 w-full -translate-y-[1px]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-8 pb-16 pt-20 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center text-sm font-extrabold" style={{ background: POOL, color: "#ffffff", borderRadius: "50% 50% 50% 0" }} aria-hidden>{name.trim().charAt(0).toUpperCase() || "L"}</span>
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-[-0.01em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#cfe6f3" }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full text-white/80 transition hover:text-white" style={{ background: "#ffffff14" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: AQUA }}>Swim</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: "#cfe6f3" }}>
            {([
              groups.length > 0 && { label: "Lessons", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              { label: ctaLabel, href: join },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: AQUA }}>Contact</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: "#cfe6f3" }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-[0.16em]" style={{ color: AQUA }}>Pool Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: "#cfe6f3" }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/55">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: "#cfe6f3" }}>Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff1f", color: "#a9c9da" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="font-semibold transition hover:text-white">Book your first lesson</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: WHITE }} className="min-h-screen font-body" >
      <LaneHeader name={name} cta={ctaLabel} ctaHref={join} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Inner page banner — soft watery wash with a lane rope under the title.
  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${POOL} 0%, ${AQUA} 100%)` }}>
      <div className="pointer-events-none absolute inset-0 opacity-30" style={{ background: "radial-gradient(120% 80% at 80% 0%, #ffffff66 0%, transparent 60%)" }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-16 pt-32 sm:pt-40">
        <Kicker color="#ffffff">{kicker}</Kicker>
        <h1 style={{ ...display, color: "#ffffff" }} className="mt-4 text-5xl font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-7xl">{title}</h1>
        <LaneRope className="mt-7" />
      </div>
      <Ripples color="#ffffff" className="absolute bottom-0 left-0 right-0 h-9 w-full" />
    </section>
  );

  // ---- LESSONS / CLASSES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lessons by stage", "Find the right lesson")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && (
                    <h2 style={{ ...display, color: NAVY }} className="mb-6 text-2xl font-extrabold tracking-[-0.01em]">{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className={section.categories.length > 1 ? "mt-8" : ""}>
                      {catg.category && (
                        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: POOL }}>{catg.category}</p>
                      )}
                      <ul className="divide-y" style={{ borderColor: LINE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: NAVY }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: POOL }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div>
                <a href={join} className="inline-flex rounded-full px-9 py-4 text-sm font-bold tracking-[0.01em] text-white transition hover:opacity-90" style={{ background: POOL }}>{ctaLabel}</a>
              </div>
            </div>
          ) : <p style={{ color: MUTE }}>Our lesson timetable is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Who we are", "Confidence in the water")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12">
            <a href={join} className="inline-flex rounded-full px-9 py-4 text-sm font-bold tracking-[0.01em] text-white transition hover:opacity-90" style={{ background: POOL }}>{ctaLabel}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In the pool", "Splashes & smiles")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get started", "Book a lesson")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: NAVY }} className="text-2xl font-bold tracking-[-0.01em]">Find the pool</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70" style={{ color: POOL }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70" style={{ color: POOL }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: LINE, color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: NAVY }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[13px] font-bold tracking-[0.01em] transition hover:opacity-90" style={{ border: `2px solid ${POOL}`, color: POOL }}>Get directions</a>
            )}
          </div>
          <div className="space-y-5">
            {bookingOn && <FitnessBooking tenantId={tenant.id} name={name} skin={bookingSkin} classes={classNames} title="Book a lesson" sub="Tell us your swimmer's age and when suits — we'll confirm a spot." />}
            {contactOn && (
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about levels, age groups or 1-to-1 lessons? We're happy to help."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: "#1B8FD122", heading: NAVY, blurb: MUTE, label: POOL, fieldBg: WHITE, fieldBorder: "#1B8FD133", fieldText: NAVY, button: POOL, buttonText: "#ffffff", radius: "14px", font: "var(--font-inter)" }}
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
      {/* hero — bright, friendly, watery */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(150deg, ${POOL} 0%, ${AQUA} 55%, ${WHITE} 100%)` }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: `linear-gradient(105deg, ${NAVY}e6 0%, ${POOL}99 48%, ${AQUA}40 100%)` }} />
        {/* watery shimmer */}
        <div className="pointer-events-none absolute inset-0 opacity-40" style={{ background: "radial-gradient(90% 60% at 75% 15%, #ffffff55 0%, transparent 55%)" }} />
        <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-32 sm:px-8">
          <Kicker color="#ffffff">{content.tagline || "Learn to swim · All ages · Small classes"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold leading-[1.0] tracking-[-0.02em] text-white [text-shadow:0_2px_28px_rgba(16,58,87,0.4)] sm:text-7xl">
            Confidence in the water, for life
          </h1>
          <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-white/90 [text-shadow:0_2px_14px_rgba(16,58,87,0.4)]">
            <span data-edit="tenant.business_name" className="font-bold">{name}</span>{content.tagline ? <span data-edit="content.tagline"> — {content.tagline}</span> : " — friendly learn-to-swim lessons from babies to adults, taught by qualified swim teachers in small, supportive classes."}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={join} className="rounded-full px-9 py-4 text-center text-sm font-bold tracking-[0.01em] transition hover:opacity-90" style={{ background: YELLOW, color: NAVY }}>{ctaLabel}</a>
            {groups.length > 0 && (
              <a href={href("services")} className="rounded-full px-9 py-4 text-center text-sm font-bold tracking-[0.01em] text-white backdrop-blur-sm transition hover:bg-white/10" style={{ border: "2px solid rgba(255,255,255,0.7)" }}>See lessons</a>
            )}
          </div>
          {/* signature lane ropes laid across the bottom of the hero */}
          <div className="mt-14 space-y-3 opacity-90">
            <LaneRope />
            <LaneRope className="opacity-60" />
          </div>
        </div>
        <Ripples color="#ffffff" className="absolute bottom-0 left-0 right-0 z-10 h-12 w-full" />
      </section>

      {/* trust strip — small classes, qualified teachers */}
      <section style={{ background: "#ffffff" }}>
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-4 px-8 py-12 sm:grid-cols-3">
          {trust.map((s) => (
            <div key={s.v} className="flex items-center gap-4 rounded-2xl px-6 py-5" style={{ background: WHITE, border: `1px solid ${LINE}` }}>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-lg" style={{ background: AQUA, color: NAVY }} aria-hidden>✓</span>
              <div>
                <p style={{ ...display, color: NAVY }} className="text-lg font-extrabold leading-tight">{s.k}</p>
                <p className="text-[13px] font-medium" style={{ color: MUTE }}>{s.v}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* learn-to-swim stages / badges progression band */}
      <section style={{ background: `linear-gradient(135deg, ${POOL} 0%, ${AQUA} 100%)` }} className="relative overflow-hidden">
        <Ripples color="#ffffff" className="absolute left-0 right-0 top-0 h-9 w-full" />
        <div className="relative mx-auto max-w-7xl px-8 py-24">
          <div className="text-center">
            <Kicker color="#ffffff">Our swim journey</Kicker>
            <h2 style={{ ...display, color: "#ffffff" }} className="mt-4 text-4xl font-extrabold tracking-[-0.01em] sm:text-5xl">Stage by stage, badge by badge</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-white/90">Every swimmer progresses at their own pace through clear, celebrated stages — from first splash to confident strokes.</p>
          </div>
          <div className="mt-14 grid grid-cols-2 gap-6 lg:grid-cols-4">
            {STAGES.map((st, i) => (
              <div key={st.label} className="relative rounded-3xl bg-white/12 px-6 py-8 text-center backdrop-blur-sm" style={{ border: "1px solid rgba(255,255,255,0.25)" }}>
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-full text-xl font-extrabold" style={{ background: st.color, color: st.color === YELLOW || st.color === AQUA ? NAVY : "#ffffff" }} aria-hidden>{i + 1}</span>
                <p style={{ ...display }} className="mt-5 text-xl font-extrabold text-white">{st.label}</p>
                <p className="mt-1 text-[13px] font-medium text-white/85">{st.note}</p>
              </div>
            ))}
          </div>
        </div>
        <Ripples color="#ffffff" className="absolute bottom-0 left-0 right-0 h-9 w-full" />
      </section>

      {/* about — image left, copy right */}
      {(content.about || gallery[0]) && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="relative order-2 lg:order-1">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-[2rem] object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-[2rem]" style={{ background: `linear-gradient(135deg, ${AQUA}, ${POOL})` }} />
            )}
            <span className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full" style={{ background: YELLOW, opacity: 0.9 }} />
          </div>
          <div className="order-1 lg:order-2">
            <Kicker>Who we are</Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold leading-[1.05] tracking-[-0.01em] sm:text-5xl">A friendly place to learn</h2>
            {content.about && <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>}
            <a href={href("about")} className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.01em]" style={{ color: POOL }}>More about us →</a>
          </div>
        </section>
      )}

      {/* lessons preview — clean divider row list */}
      {featured.length > 0 && (
        <section style={{ background: WHITE, borderTop: `1px solid ${LINE}`, borderBottom: `1px solid ${LINE}` }}>
          <div className="mx-auto max-w-4xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <Kicker>Lessons by stage</Kicker>
                <h2 style={{ ...display, color: NAVY }} className="mt-4 text-4xl font-extrabold tracking-[-0.01em] sm:text-5xl">Find the right lesson</h2>
              </div>
              <a href={href("services")} className="text-[13px] font-bold tracking-[0.01em] transition hover:opacity-70" style={{ color: POOL }}>View all →</a>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: LINE }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-bold" style={{ ...display, color: NAVY }}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: POOL }}>{item.price}</span>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-8">
            <Kicker>In the pool</Kicker>
            <h2 style={{ ...display, color: NAVY }} className="mt-4 max-w-2xl text-3xl font-extrabold leading-[1.05] tracking-[-0.01em] sm:text-4xl">Happy swimmers, every week</h2>
          </div>
          <div className="mx-auto mt-12 grid max-w-7xl grid-cols-2 gap-3 px-2 sm:grid-cols-4 sm:px-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
            ))}
          </div>
          <div className="mx-auto mt-10 max-w-7xl px-8">
            <a href={href("gallery")} className="inline-flex rounded-full px-8 py-3.5 text-[13px] font-bold tracking-[0.01em] transition hover:opacity-90" style={{ border: `2px solid ${POOL}`, color: POOL }}>View gallery</a>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="relative overflow-hidden" style={{ background: NAVY }}>
        <Ripples color={AQUA} className="absolute left-0 right-0 top-0 h-9 w-full" />
        <div className="relative mx-auto max-w-4xl px-8 py-24 text-center">
          <h2 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.01em] sm:text-6xl" style={{ ...display, color: "#ffffff" }}>Your first lesson is on us.</h2>
          <p className="mx-auto mt-5 max-w-md text-[15px] font-medium leading-relaxed text-white/85">No experience needed — just bring your costume and a smile. Book a trial lesson and meet your teacher.</p>
          <a href={join} className="mt-8 inline-flex rounded-full px-11 py-4 text-sm font-bold tracking-[0.01em] transition hover:opacity-90" style={{ background: YELLOW, color: NAVY }}>{ctaLabel}</a>
          <LaneRope className="mt-12 justify-center" />
        </div>
      </section>
    </>,
    false,
  );
}
