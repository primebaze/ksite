import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PivotHeader } from "./PivotHeader";
import { PivotBooking } from "./PivotBooking";

// Pivot — a warm, holistic OSTEOPATHY & manual-therapy clinic (single venue).
// MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery /
// Booking / Contact) under basePath, never scroll anchors. The sticky oat-cream
// header + olive footer are shared. Palette is baked natural: terracotta-clay,
// warm sand, deep olive, oat cream, muted teal accent. The tenant swaps in their
// own photography, copy, treatments, practitioners, hours and contact.
//
// Structural signature (shares nothing with siblings): a warm sand/clay hero
// with a "Restore your body's balance" feel and an organic rotating pivot motif;
// a "who we help" band (back & neck, pregnancy, sports, babies & children, older
// adults); a "your treatment journey" booking feature; treatments grouped by
// discipline as clean divider rows; a practitioners section; reassuring reviews,
// stats and an FAQ.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CLAY = "#C07A52";
const SAND = "#E8D9C4";
const OLIVE = "#3F4A33";
const OAT = "#F5EFE4";
const TEAL = "#6E8E8A";
const MUTED = "#6b6451";

// Static design copy (no brand names, no lorem) — reviews / stats / FAQ are not
// tenant data, so they live as small design arrays per the runbook.
const REVIEWS = [
  { quote: "After months of back pain I can finally move freely again. Gentle, thorough and genuinely caring hands.", author: "Verified patient" },
  { quote: "They treated my whole body, not just the symptom. I left understanding exactly what was going on and how to keep it from returning.", author: "Verified patient" },
  { quote: "I came in during pregnancy with hip pain and felt so looked after. Calm, unhurried and wonderfully effective.", author: "Verified patient" },
  { quote: "Brilliant with my little one's reflux too. The whole family sees them now — warm, reassuring and clearly expert.", author: "Verified patient" },
];

const HELP = [
  { title: "Back & neck", note: "Everyday aches, stiffness and postural strain", icon: "spine" },
  { title: "Pregnancy", note: "Comfort through every trimester and beyond", icon: "bloom" },
  { title: "Sports & injury", note: "Recover, rebuild and move with confidence", icon: "bolt" },
  { title: "Babies & children", note: "Gentle cranial care for the youngest", icon: "child" },
  { title: "Older adults", note: "Mobility, balance and pain relief with age", icon: "leaf" },
];

const JOURNEY = [
  { step: "01", title: "Listen", note: "We take a full history and understand how your whole body moves and feels." },
  { step: "02", title: "Assess", note: "A hands-on, head-to-toe examination to find the true source, not just the symptom." },
  { step: "03", title: "Treat", note: "Gentle, tailored manual therapy to release tension and restore balance." },
  { step: "04", title: "Restore", note: "Simple advice and movement so the relief lasts long after you leave." },
];

const STATS = [
  { value: "20yr+", label: "Of hands-on care" },
  { value: "12k+", label: "Treatments given" },
  { value: "All ages", label: "Babies to older adults" },
  { value: "4.9", label: "Average patient rating" },
];

const FAQ = [
  { q: "What is osteopathy?", a: "Osteopathy is a gentle, hands-on approach that looks at the whole body. By easing tension in muscles, joints and connective tissue, we help your body find its natural balance and heal itself." },
  { q: "Does treatment hurt?", a: "Our approach is gentle and considered. Some techniques may feel firm, but we always work within your comfort and explain everything as we go. Many people find treatment deeply relaxing." },
  { q: "Is it safe during pregnancy or for babies?", a: "Yes. We offer gentle care adapted for every stage of pregnancy, and cranial techniques suitable for newborns and children. Comfort and safety come first, always." },
  { q: "What should I wear to my appointment?", a: "Comfortable, loose clothing you can move in is ideal. We will let you know if anything else helps for your particular treatment." },
];

export default function PivotDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Clinic", href: href("gallery") },
    bookingOn && { label: "Booking", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---------- shared bits ----------
  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
    if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  const HelpIcon = ({ kind }: { kind: string }) => {
    const c = { width: 24, height: 24, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.5 } as const;
    if (kind === "spine") return <svg {...c} aria-hidden><path d="M12 3v18" /><path d="M9 5h6M9 9h6M9 13h6M9 17h6" /></svg>;
    if (kind === "bloom") return <svg {...c} aria-hidden><circle cx="12" cy="12" r="3" /><path d="M12 9c0-3 2-5 2-5s-1 4 0 6M12 15c0 3-2 5-2 5s1-4 0-6M9 12c-3 0-5-2-5-2s4 1 6 0M15 12c3 0 5 2 5 2s-4-1-6 0" /></svg>;
    if (kind === "bolt") return <svg {...c} aria-hidden><path d="M13 2 4 14h7l-1 8 9-12h-7z" /></svg>;
    if (kind === "child") return <svg {...c} aria-hidden><circle cx="12" cy="6" r="3" /><path d="M9 21v-5l-2-1 2-4h6l2 4-2 1v5" /></svg>;
    return <svg {...c} aria-hidden><path d="M12 21c-5-2-8-6-8-11a8 8 0 0 1 16 0c0 5-3 9-8 11z" /><path d="M12 21V8" /></svg>;
  };

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: OLIVE }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full text-white" style={{ background: CLAY }} aria-hidden>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><circle cx="12" cy="12" r="3.2" /><path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2" /></svg>
            </span>
            <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="text-white/75 transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: SAND }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/75 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: SAND }}>Visit us</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/75">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/75 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/75 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/55">
        © {new Date().getFullYear()} {name}. Whole-body care, gentle hands.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" data-bg="oat">
      <div style={{ background: "#fff", color: OLIVE }}>
        <PivotHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Sand page banner — clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: SAND }} className="relative overflow-hidden">
      <span aria-hidden className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full" style={{ border: `1px solid rgba(63,74,51,0.16)` }} />
      <span aria-hidden className="pointer-events-none absolute -right-4 top-10 h-40 w-40 rounded-full" style={{ border: `1px solid rgba(192,122,82,0.3)` }} />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-36 text-center sm:pt-44">
        <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl" >{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: MUTED }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "Care for every body", "Hands-on osteopathy and manual therapy, grouped by discipline. Every visit begins with a full assessment.")}
        <section className="mx-auto max-w-5xl px-6 py-20" style={{ background: OAT }}>
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 style={{ ...serif, color: OLIVE }} className="text-2xl">{section.section}</h2>}
                  <div className="mt-6 space-y-10">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <div className="flex items-center gap-3">
                            <span className="h-px w-6" style={{ background: CLAY }} />
                            <h3 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: CLAY }}>{catg.category}</h3>
                          </div>
                        )}
                        <ul className="mt-3 divide-y" style={{ borderColor: "rgba(63,74,51,0.14)" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-4" style={{ borderColor: "rgba(63,74,51,0.14)" }}>
                              <div>
                                <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: OLIVE }}>{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed" style={{ color: MUTED }}>{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: CLAY }}>{item.price}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p style={{ color: MUTED }}>Our treatment list is coming soon.</p>}

          <div className="mt-16 rounded-[2rem] px-8 py-12 text-center text-white" style={{ background: OLIVE }}>
            <h3 style={serif} className="text-2xl">Not sure what you need?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/75">Book an appointment and we will assess your whole body, then recommend the gentlest path back to balance.</p>
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Book an appointment</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Whole-body, hands-on care")}
        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: OAT }}>
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: "#4d4636" }}>{content.about}</p>
          ) : <p style={{ color: MUTED }}>Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl" style={{ ...serif, color: CLAY }}>{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em]" style={{ color: MUTED }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section style={{ background: SAND }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>Our team</p>
                <h2 style={{ ...serif, color: OLIVE }} className="mt-3 text-3xl sm:text-4xl">Meet your practitioners</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full" style={{ background: OAT, outline: `1px solid rgba(63,74,51,0.18)`, outlineOffset: 6 }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-6 text-lg font-medium" style={{ color: OLIVE }}>{m.name}</p>
                    {m.role && <p className="text-sm" style={{ color: MUTED }}>{m.role}</p>}
                    {m.credentials && <p className="mt-0.5 text-xs" style={{ color: TEAL }}>{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: OAT }}>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>Good to know</p>
            <h2 style={{ ...serif, color: OLIVE }} className="mt-3 text-3xl sm:text-4xl">Common questions</h2>
          </div>
          <dl className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border p-6" style={{ borderColor: "rgba(63,74,51,0.14)", background: "#fff" }}>
                <dt className="text-[15px] font-semibold" style={{ color: OLIVE }}>{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed" style={{ color: MUTED }}>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </>,
    );
  }

  // ---------- GALLERY (clinic) ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Our clinic", "A calm, natural space", "Step inside the calm, light-filled rooms where we care for you.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16" style={{ background: OAT }}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-20 text-center" style={{ background: OAT, color: MUTED }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOKING (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Booking", "Book your appointment", "Tell us a little about you and what you would like help with. We will be in touch to confirm a time.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16" style={{ background: OAT }}>
          <div>
            <h2 style={{ ...serif, color: OLIVE }} className="text-3xl">Your treatment journey</h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTED }}>Every visit follows the same gentle, unhurried path. We listen first, assess your whole body, then treat with care.</p>
            <ol className="mt-8 space-y-5">
              {JOURNEY.map((j) => (
                <li key={j.step} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold text-white" style={{ background: CLAY, ...serif }}>{j.step}</span>
                  <div>
                    <p className="font-semibold" style={{ color: OLIVE }}>{j.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed" style={{ color: MUTED }}>{j.note}</p>
                  </div>
                </li>
              ))}
            </ol>
            {content.phone && (
              <p className="mt-8 text-sm" style={{ color: MUTED }}>Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: CLAY }}>{content.phone}</a></p>
            )}
          </div>
          <PivotBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit us, call, or send a message and we will get back to you soon.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16" style={{ background: OAT }}>
          <div>
            <h2 style={{ ...serif, color: OLIVE }} className="text-2xl">Clinic details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: "#4d4636" }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "rgba(63,74,51,0.18)", color: "#4d4636" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: MUTED }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Get directions</a>
              )}
              <a href={book} className="inline-flex rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-[#3F4A33] hover:text-white" style={{ borderColor: OLIVE, color: OLIVE }}>Book appointment</a>
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-4" style={{ color: OLIVE }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>
          {contactOn ? (
            <SiteContactForms
              tenantId={tenant.id}
              booking={false}
              contact
              contactTitle="Send us a message"
              contactBlurb="Questions about a treatment or anything else? We would love to hear from you."
              contactCta="Send message"
              theme={{ card: "#fff", cardBorder: "rgba(63,74,51,0.16)", heading: OLIVE, blurb: MUTED, label: OLIVE, fieldBg: OAT, fieldBorder: "rgba(63,74,51,0.22)", fieldText: OLIVE, button: OLIVE, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden rounded-[1.5rem]">
                <iframe title="Map" src={content.map_url} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
              </div>
            )
          )}
        </section>
      </>,
    );
  }

  // ---------- HOME ----------
  const teaseCategories = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 4);

  return shell(
    <>
      {/* hero — warm sand/clay, organic pivot motif, hands-on care feel */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden" style={{ background: SAND }}>
        {hero ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(63,74,51,0.78) 0%, rgba(63,74,51,0.45) 42%, rgba(192,122,82,0.18) 100%)" }} />
          </>
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(115deg, #3F4A33 0%, #C07A52 100%)" }} />
        )}
        {/* organic rotating pivot rings */}
        <span aria-hidden className="pointer-events-none absolute -right-24 top-1/2 hidden h-[34rem] w-[34rem] -translate-y-1/2 rounded-full sm:block" style={{ border: "1px solid rgba(245,239,228,0.28)" }} />
        <span aria-hidden className="pointer-events-none absolute -right-10 top-1/2 hidden h-[22rem] w-[22rem] -translate-y-1/2 rounded-full sm:block" style={{ border: "1px solid rgba(232,217,196,0.5)" }} />
        <span aria-hidden className="pointer-events-none absolute right-24 top-1/2 hidden h-44 w-44 -translate-y-1/2 place-items-center rounded-full sm:grid" style={{ background: "rgba(110,142,138,0.35)", backdropFilter: "blur(2px)" }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#F5EFE4" strokeWidth="1.1" aria-hidden><circle cx="12" cy="12" r="3.2" /><path d="M12 2.6v3.2M12 18.2v3.2M2.6 12h3.2M18.2 12h3.2M5.3 5.3l2.3 2.3M16.4 16.4l2.3 2.3M18.7 5.3l-2.3 2.3M7.6 16.4l-2.3 2.3" /></svg>
        </span>

        <div className="relative z-10 mx-auto w-full max-w-6xl px-6 sm:px-10">
          <div className="max-w-xl text-white">
            {content.tagline ? (
              <p data-edit="content.tagline" className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: SAND }}>{content.tagline}</p>
            ) : (
              <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: SAND }}>Osteopathy & manual therapy</p>
            )}
            <h1 style={serif} className="mt-4 text-5xl font-medium leading-[1.04] [text-shadow:0_2px_24px_rgba(0,0,0,0.35)] sm:text-[4.5rem]">Restore your body&apos;s balance</h1>
            <p data-edit="tenant.business_name" className="mt-5 text-lg font-medium" style={{ color: SAND }}>{name}</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85">Gentle, whole-body hands-on care for all ages — easing pain, restoring movement and helping you feel like yourself again.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-xl transition hover:opacity-90" style={{ background: CLAY }}>Book now</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border border-white/60 px-9 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#3F4A33]">View treatments</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* reassurance strip */}
      <section style={{ background: OAT, borderColor: "rgba(63,74,51,0.1)" }} className="border-b">
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-9 sm:grid-cols-3">
          {[
            { t: "Registered practitioners", n: "Qualified, regulated and trusted" },
            { t: "Whole-body approach", n: "We treat the cause, not just the ache" },
            { t: "Gentle for all ages", n: "From newborns to older adults" },
          ].map((x) => (
            <div key={x.t} className="flex items-center gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-white" style={{ background: TEAL }} aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: OLIVE }}>{x.t}</p>
                <p className="text-xs" style={{ color: MUTED }}>{x.n}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center" style={{ background: OAT }}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>Welcome</p>
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9]" style={{ color: "#4d4636" }}>{content.about}</p>
        </section>
      )}

      {/* WHO WE HELP band */}
      <section style={{ background: SAND }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>Who we help</p>
            <h2 style={{ ...serif, color: OLIVE }} className="mt-3 text-3xl sm:text-4xl">Gentle care for every body</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: MUTED }}>Whatever stage of life you are in, our hands-on approach meets you where you are.</p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {HELP.map((h) => (
              <div key={h.title} className="rounded-[1.5rem] bg-[#FBF7EE] p-6 text-center transition hover:-translate-y-0.5" style={{ boxShadow: "0 10px 28px rgba(63,74,51,0.08)" }}>
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: OAT, color: CLAY }} aria-hidden><HelpIcon kind={h.icon} /></span>
                <h3 className="mt-4 text-base font-semibold" style={{ color: OLIVE }}>{h.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed" style={{ color: MUTED }}>{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* treatments teaser by discipline */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20" style={{ background: OAT }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>Treatments</p>
              <h2 style={{ ...serif, color: OLIVE }} className="mt-3 text-3xl sm:text-4xl">Grouped by discipline</h2>
            </div>
            <a href={href("services")} className="text-sm font-semibold" style={{ color: CLAY }}>View all treatments →</a>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {teaseCategories.map((c) => (
              <div key={c.label} className="rounded-[1.5rem] border p-7" style={{ borderColor: "rgba(63,74,51,0.14)", background: "#fff" }}>
                <h3 className="text-lg font-semibold" style={{ ...serif, color: OLIVE }}>{c.label}</h3>
                <ul className="mt-4 divide-y" style={{ borderColor: "rgba(63,74,51,0.12)" }}>
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 py-2.5" style={{ borderColor: "rgba(63,74,51,0.12)" }}>
                      <span data-edit={`item:${item.id}:name`} className="text-sm" style={{ color: "#4d4636" }}>{item.name}</span>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: CLAY }}>{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* YOUR TREATMENT JOURNEY feature + booking */}
      <section style={{ background: OLIVE }} className="text-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: SAND }}>Your treatment journey</p>
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Unhurried, gentle, whole-body</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/70">From the first hello to lasting relief, every step is calm and considered.</p>
            <ol className="mt-9 space-y-6">
              {JOURNEY.map((j) => (
                <li key={j.step} className="flex gap-4">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full text-sm font-semibold" style={{ background: "rgba(245,239,228,0.14)", color: SAND, ...serif }}>{j.step}</span>
                  <div>
                    <p className="font-semibold text-white">{j.title}</p>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/65">{j.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          {bookingOn ? (
            <PivotBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="flex flex-col justify-center rounded-[2rem] p-9" style={{ background: OAT, color: OLIVE }}>
              <h3 style={serif} className="text-2xl">Get in touch</h3>
              {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block font-medium">{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block font-medium">{content.email}</a>}
              <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Contact us</a>
            </div>
          )}
        </div>
      </section>

      {/* reviews (static) */}
      <section style={{ background: OAT }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: CLAY }}>Kind words</p>
            <h2 style={{ ...serif, color: OLIVE }} className="mt-3 text-3xl sm:text-4xl">What our patients say</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.author} className="flex h-full flex-col rounded-[1.5rem] border bg-[#FBF7EE] p-7" style={{ borderColor: "rgba(63,74,51,0.12)" }}>
                <div className="flex gap-0.5" aria-hidden style={{ color: CLAY }}>
                  {Array.from({ length: 5 }).map((_, s) => <span key={s}>★</span>)}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ color: "#4d4636" }}>{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm font-semibold" style={{ color: TEAL }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* details band */}
      <section style={{ background: SAND }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CLAY }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: "#4d4636" }}>{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: CLAY }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CLAY }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "#4d4636" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: MUTED }}>{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm" style={{ color: MUTED }}>Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CLAY }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm" style={{ color: "#4d4636" }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: OLIVE }}>Book appointment</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
