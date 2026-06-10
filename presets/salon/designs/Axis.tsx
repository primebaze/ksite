import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AxisHeader } from "./AxisHeader";
import { AxisBooking } from "./AxisBooking";

// Axis — a precise, reassuring chiropractic & spinal-health clinic (single
// venue), MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery /
// Booking / Contact) under basePath, never scroll anchors. Sticky charcoal
// header + footer are shared. Palette is baked structural — warm charcoal,
// amber/ochre, sage-grey, bone, deep clay accent. The signature is a vertical
// "axis"/spine line motif and precise geometric alignment, calm and grounded.
// The tenant swaps in their own photography, copy, treatments, practitioners,
// hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CHARCOAL = "#25282B";
const AMBER = "#D69A3C";
const SAGE = "#9AA897";
const BONE = "#EFEAE1";
const CLAY = "#8C5A3B";

// Static design copy (no brand names, no lorem) — reviews, FAQ, conditions,
// path and trust are not tenant data, so they live as small design arrays.
const REVIEWS = [
  { quote: "I came in barely able to turn my neck. A few sessions later I am back to full movement and sleeping properly again.", author: "Verified patient" },
  { quote: "They actually explained what was happening with my spine and built a clear plan. No vague promises, just steady progress.", author: "Verified patient" },
  { quote: "Years of lower back pain, gone. The posture work has changed how I sit at my desk every single day.", author: "Verified patient" },
  { quote: "Calm, precise and genuinely reassuring. I never felt rushed and the adjustments were gentle and effective.", author: "Verified patient" },
];

const CONDITIONS = [
  { title: "Back pain", note: "Lower & upper back, disc-related discomfort" },
  { title: "Posture", note: "Desk strain, rounded shoulders, alignment" },
  { title: "Sciatica", note: "Nerve pain, leg tingling and numbness" },
  { title: "Headaches", note: "Tension and neck-related headaches" },
  { title: "Neck & shoulders", note: "Stiffness, restricted movement" },
  { title: "Sports strain", note: "Recovery and injury prevention" },
];

const PATH = [
  { step: "01", title: "Assessment", note: "A thorough posture and spinal exam to understand the root cause of your pain." },
  { step: "02", title: "Adjustment", note: "Precise, gentle adjustments to restore alignment and relieve pressure on the nerves." },
  { step: "03", title: "Maintenance", note: "A tailored plan of care and posture guidance to keep you moving freely, for good." },
];

const TRUST = [
  { title: "Registered practitioners", note: "Qualified, regulated chiropractors" },
  { title: "Root-cause focus", note: "We treat the source, not the symptom" },
  { title: "Gentle techniques", note: "Precise, comfortable adjustments" },
  { title: "Clear care plans", note: "Honest, structured and pressure-free" },
];

const STATS = [
  { value: "15k+", label: "Adjustments delivered" },
  { value: "4.9", label: "Average patient rating" },
  { value: "12+", label: "Years in practice" },
  { value: "96%", label: "Report lasting relief" },
];

const FAQ = [
  { q: "Do I need a referral to book?", a: "No referral is needed. You can book an initial assessment directly with us, and we will take a full history before any treatment begins." },
  { q: "Is a chiropractic adjustment painful?", a: "Adjustments are gentle and precise. Most patients feel relief and a release of tension. We always work within your comfort and explain each step." },
  { q: "How many sessions will I need?", a: "It depends on your condition and how long it has been present. After your assessment we will set out a clear, honest plan with realistic timeframes." },
  { q: "Can chiropractic help my posture?", a: "Yes. Alongside adjustments we provide targeted posture guidance and exercises so your spine stays aligned between visits, especially for desk-based work." },
];

export default function AxisDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
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

  // A small vertical-spine vertebrae motif used as a section signature.
  const Spine = ({ className = "" }: { className?: string }) => (
    <svg width="14" height="60" viewBox="0 0 14 60" fill="none" aria-hidden className={className}>
      <line x1="7" y1="0" x2="7" y2="60" stroke={AMBER} strokeWidth="1.5" />
      {[6, 18, 30, 42, 54].map((y) => (
        <rect key={y} x="2.5" y={y - 2} width="9" height="4" rx="1" fill={AMBER} />
      ))}
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: CHARCOAL }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <span aria-hidden className="h-7 w-[3px]" style={{ background: AMBER }} />
            <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "rgba(239,234,225,0.7)" }}>{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4" style={{ color: SAGE }}>
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="transition hover:text-white" style={{ color: "rgba(239,234,225,0.7)" }}>{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: AMBER }}>Visit the clinic</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: "rgba(239,234,225,0.7)" }}>{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white" style={{ color: "rgba(239,234,225,0.7)" }}>{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white" style={{ color: "rgba(239,234,225,0.7)" }}>{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t px-6 py-6 text-center text-xs" style={{ borderColor: "rgba(239,234,225,0.12)", color: "rgba(239,234,225,0.45)" }}>
        © {new Date().getFullYear()} {name}. Aligned, balanced, pain-free.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <AxisHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Bone page banner — clears the fixed header on sub-pages, with the spine tick.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: BONE }}>
      <div className="mx-auto max-w-5xl px-6 pb-14 pt-32 text-center sm:pt-40">
        <span aria-hidden className="mx-auto block h-8 w-[3px]" style={{ background: AMBER }} />
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>{kicker}</p>
        <h1 style={{ ...serif, color: CHARCOAL }} className="mt-3 text-4xl font-medium sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "#5b5e5c" }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "Care for your spine and posture", "From acute pain relief to long-term alignment, every plan begins with a full assessment.")}
        <section className="mx-auto max-w-5xl px-6 py-20" style={{ background: "#fff" }}>
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 style={{ ...serif, color: CHARCOAL }} className="text-2xl">{section.section}</h2>}
                  <div className="mt-8 space-y-12">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <div className="flex items-center gap-3">
                            <span aria-hidden className="h-4 w-[3px]" style={{ background: AMBER }} />
                            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: CLAY }}>{catg.category}</h3>
                          </div>
                        )}
                        <ul className="mt-4 divide-y" style={{ borderColor: "rgba(37,40,43,0.1)" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-4" style={{ borderColor: "rgba(37,40,43,0.1)" }}>
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: CHARCOAL }}>{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed" style={{ color: "#6b6e6c" }}>{item.description}</p>}
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
          ) : <p style={{ color: "#6b6e6c" }}>Our treatment menu is coming soon.</p>}

          <div className="mt-16 px-8 py-12 text-center" style={{ background: CHARCOAL }}>
            <h3 style={serif} className="text-2xl text-white">Not sure what you need?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "rgba(239,234,225,0.7)" }}>Book an initial assessment and we will build a clear, structured plan around your pain and posture.</p>
            <a href={book} className="mt-6 inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>Book an assessment</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Structure you can rely on")}
        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: "#fff" }}>
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: "#3d403e" }}>{content.about}</p>
          ) : <p style={{ color: "#6b6e6c" }}>Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl" style={{ ...serif, color: AMBER }}>{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: "#6b6e6c" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className="border-t" style={{ background: BONE, borderColor: "rgba(37,40,43,0.08)" }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>Our practitioners</p>
                <h2 style={{ ...serif, color: CHARCOAL }} className="mt-3 text-3xl sm:text-4xl">Meet your clinical team</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden" style={{ background: SAGE, borderTop: `3px solid ${AMBER}` }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-5 text-lg font-medium" style={{ color: CHARCOAL }}>{m.name}</p>
                    {m.role && <p className="text-sm" style={{ color: CLAY }}>{m.role}</p>}
                    {m.credentials && <p className="text-xs" style={{ color: "#8b8e8c" }}>{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: "#fff" }}>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>Good to know</p>
            <h2 style={{ ...serif, color: CHARCOAL }} className="mt-3 text-3xl sm:text-4xl">Common questions</h2>
          </div>
          <dl className="mt-10 divide-y" style={{ borderColor: "rgba(37,40,43,0.1)" }}>
            {FAQ.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="flex items-start gap-3 text-base font-medium" style={{ color: CHARCOAL }}>
                  <span aria-hidden className="mt-1 h-4 w-[3px] shrink-0" style={{ background: AMBER }} />
                  {f.q}
                </dt>
                <dd className="mt-2 pl-6 text-sm leading-relaxed" style={{ color: "#6b6e6c" }}>{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the clinic", "A calm, considered space designed for assessment, treatment and recovery.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16" style={{ background: "#fff" }}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20" style={{ color: "#6b6e6c" }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOKING (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Booking", "Book your assessment", "Tell us a little about your pain or posture and we will be in touch to confirm your time.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16" style={{ background: "#fff" }}>
          <div>
            <h2 style={{ ...serif, color: CHARCOAL }} className="text-3xl">A clear path to relief</h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "#6b6e6c" }}>Every journey starts with a thorough assessment. We will examine your posture and spine, explain what we find, and recommend a structured plan, with no pressure.</p>
            <ul className="mt-7 space-y-3 text-sm" style={{ color: "#3d403e" }}>
              {["Full posture and spinal assessment", "Registered, regulated chiropractors", "Gentle, precise adjustments", "Honest, structured care plans"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center text-[11px] font-semibold" style={{ background: AMBER, color: CHARCOAL }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm" style={{ color: "#6b6e6c" }}>Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: CLAY }}>{content.phone}</a></p>
            )}
          </div>
          <AxisBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit the clinic, call, or send a message and we will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16" style={{ background: "#fff" }}>
          <div>
            <h2 style={{ ...serif, color: CHARCOAL }} className="text-2xl">Clinic details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: "#3d403e" }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "rgba(37,40,43,0.12)", color: "#3d403e" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#8b8e8c" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>Get directions</a>
              )}
              <a href={book} className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ borderColor: CHARCOAL, color: CHARCOAL }}>Book an assessment</a>
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-4" style={{ color: CLAY }}>
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
              contactBlurb="Questions about a treatment, your symptoms, or anything else? We would love to hear from you."
              contactCta="Submit"
              theme={{ card: CHARCOAL, cardBorder: CHARCOAL, heading: "#ffffff", blurb: "rgba(239,234,225,0.75)", label: "rgba(239,234,225,0.7)", fieldBg: "rgba(255,255,255,0.06)", fieldBorder: "rgba(255,255,255,0.2)", fieldText: "#ffffff", button: AMBER, buttonText: CHARCOAL, radius: "0", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden">
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
      {/* hero — structural charcoal/bone with the strong vertical axis line */}
      <section className="relative isolate overflow-hidden" style={{ background: CHARCOAL }}>
        {hero && (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, rgba(37,40,43,0.94) 0%, rgba(37,40,43,0.72) 55%, rgba(37,40,43,0.5) 100%)" }} />
        {/* the central vertical axis spine line */}
        <div aria-hidden className="absolute inset-y-0 left-1/2 hidden w-px lg:block" style={{ background: "rgba(214,154,60,0.45)" }} />
        <div aria-hidden className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <span key={i} className="my-9 block h-2.5 w-2.5 rounded-sm" style={{ background: AMBER, opacity: 0.55 }} />
          ))}
        </div>

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-40 sm:pt-48">
          <div className="max-w-xl">
            <div className="flex items-center gap-3">
              <span aria-hidden className="h-8 w-[3px]" style={{ background: AMBER }} />
              {content.tagline ? (
                <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>{content.tagline}</p>
              ) : (
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>Chiropractic & spinal health</p>
              )}
            </div>
            <h1 data-edit="tenant.business_name" style={serif} className="mt-5 text-5xl font-medium leading-[1.04] text-white sm:text-7xl">{name}</h1>
            <p style={{ ...serif, color: AMBER }} className="mt-4 text-2xl font-medium">
              Aligned, balanced, pain-free.
            </p>
            <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: "rgba(239,234,225,0.78)" }}>
              Precise, reassuring chiropractic care that gets to the root of your pain and keeps your spine moving freely.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>Book an assessment</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex border px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10" style={{ borderColor: "rgba(239,234,225,0.4)" }}>View treatments</a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* trust strip */}
      <section className="border-b" style={{ background: BONE, borderColor: "rgba(37,40,43,0.08)" }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3">
              <span aria-hidden className="mt-1 h-9 w-[3px] shrink-0" style={{ background: AMBER }} />
              <div>
                <p className="text-sm font-semibold" style={{ color: CHARCOAL }}>{t.title}</p>
                <p className="text-xs" style={{ color: "#6b6e6c" }}>{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center" style={{ background: "#fff" }}>
          <span aria-hidden className="mx-auto block h-8 w-[3px]" style={{ background: AMBER }} />
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>Welcome</p>
          <p data-edit="content.about" className="mt-5 text-[19px] leading-[1.9]" style={{ color: "#3d403e" }}>{content.about}</p>
        </section>
      )}

      {/* what we help with — conditions list */}
      <section style={{ background: BONE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex items-end gap-4">
            <Spine className="hidden sm:block" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>What we help with</p>
              <h2 style={{ ...serif, color: CHARCOAL }} className="mt-2 text-3xl sm:text-4xl">Relief for everyday pain</h2>
            </div>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden sm:grid-cols-2 lg:grid-cols-3" style={{ background: "rgba(37,40,43,0.1)" }}>
            {CONDITIONS.map((c) => (
              <div key={c.title} className="flex items-start gap-3 px-6 py-7" style={{ background: BONE }}>
                <span aria-hidden className="mt-1 h-5 w-[3px] shrink-0" style={{ background: AMBER }} />
                <div>
                  <h3 className="text-base font-semibold" style={{ color: CHARCOAL }}>{c.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "#6b6e6c" }}>{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* your path to relief — assessment → adjustment → maintenance */}
      <section style={{ background: CHARCOAL }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: AMBER }}>Your path to relief</p>
            <h2 style={serif} className="mt-3 text-3xl text-white sm:text-4xl">Three precise steps</h2>
          </div>
          <div className="relative mt-14 grid gap-10 md:grid-cols-3">
            {/* connecting axis line */}
            <div aria-hidden className="absolute left-0 right-0 top-7 hidden h-px md:block" style={{ background: "rgba(214,154,60,0.35)" }} />
            {PATH.map((p) => (
              <div key={p.step} className="relative">
                <span className="relative z-10 grid h-14 w-14 place-items-center text-lg font-semibold" style={{ background: AMBER, color: CHARCOAL, fontFamily: "var(--font-fraunces)" }}>{p.step}</span>
                <h3 style={serif} className="mt-5 text-xl text-white">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(239,234,225,0.7)" }}>{p.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={book} className="inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>Start with an assessment</a>
          </div>
        </div>
      </section>

      {/* treatments teaser — grouped, links to full page */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20" style={{ background: "#fff" }}>
          <div className="flex items-end gap-4">
            <Spine className="hidden sm:block" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>Treatments</p>
              <h2 style={{ ...serif, color: CHARCOAL }} className="mt-2 text-3xl sm:text-4xl">Adjustments, posture & wellness</h2>
            </div>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {teaseCategories.map((c) => (
              <div key={c.label} className="border-t pt-5" style={{ borderColor: "rgba(37,40,43,0.12)" }}>
                <div className="flex items-center gap-3">
                  <span aria-hidden className="h-4 w-[3px]" style={{ background: AMBER }} />
                  <h3 className="text-base font-semibold uppercase tracking-[0.06em]" style={{ color: CHARCOAL }}>{c.label}</h3>
                </div>
                <ul className="mt-3 space-y-1.5 text-sm" style={{ color: "#6b6e6c" }}>
                  {c.items.slice(0, 5).map((item) => (
                    <li key={item.id} data-edit={`item:${item.id}:name`}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={href("services")} className="inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: CHARCOAL, color: "#fff" }}>View all treatments</a>
          </div>
        </section>
      )}

      {/* reviews — static design array */}
      <section style={{ background: BONE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: CLAY }}>Patient stories</p>
            <h2 style={{ ...serif, color: CHARCOAL }} className="mt-3 text-3xl sm:text-4xl">Back to moving freely</h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden sm:grid-cols-2" style={{ background: "rgba(37,40,43,0.1)" }}>
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex flex-col px-7 py-8" style={{ background: BONE }}>
                <span aria-hidden className="h-[3px] w-10" style={{ background: AMBER }} />
                <blockquote style={serif} className="mt-5 text-lg leading-relaxed" >
                  <span style={{ color: CHARCOAL }}>“{r.quote}”</span>
                </blockquote>
                <figcaption className="mt-5 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: CLAY }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* booking band: portrait + charcoal booking panel */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden" style={{ background: SAGE }}>
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center">
              <Spine />
            </div>
          )}
        </div>
        {bookingOn ? (
          <AxisBooking tenantId={tenant.id} name={name} />
        ) : (
          <div className="flex flex-col justify-center px-8 py-14" style={{ background: CHARCOAL }}>
            <h3 style={serif} className="text-2xl text-white">Get in touch</h3>
            {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block" style={{ color: BONE }}>{content.phone}</a>}
            {content.email && <a href={`mailto:${content.email}`} className="mt-1 block" style={{ color: BONE }}>{content.email}</a>}
            <a href={href("contact")} className="mt-6 inline-flex w-fit px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: AMBER, color: CHARCOAL }}>Contact us</a>
          </div>
        )}
      </section>

      {/* details band: address + map + hours */}
      <section className="border-t" style={{ background: "#fff", borderColor: "rgba(37,40,43,0.08)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: CLAY }}>Visit the clinic</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: "#3d403e" }}>{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: CLAY }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: CLAY }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "#3d403e" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "#8b8e8c" }}>{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm" style={{ color: "#6b6e6c" }}>Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: CLAY }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm" style={{ color: "#3d403e" }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: CHARCOAL, color: "#fff" }}>Book an assessment</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
