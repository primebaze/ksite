import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LotusHeader } from "./LotusHeader";
import { LotusBooking } from "./LotusBooking";

// Lotus — a warm, holistic traditional ACUPUNCTURE & Chinese-medicine clinic
// (single venue). MULTI-PAGE: the nav opens real routes (Treatments / About /
// Gallery / Booking / Contact) under basePath, never scroll anchors. The
// palette is baked — warm clay/terracotta, deep ink, jade green, rice-paper
// cream and a muted-gold accent — for a calm, natural, restrained Eastern
// register. Structural signature: a paper-textured cream hero with a single
// fine lotus line mark, a "how acupuncture helps" band, and a four-step
// "treatment journey". The tenant swaps in their own photography, copy,
// treatments, practitioners, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const CLAY = "#B5623E";
const INK = "#23211C";
const JADE = "#5E7C6B";
const CREAM = "#F3ECDD";
const GOLD = "#C19A4B";
const PAPER = "#F8F3E8";

// Static design copy (no brand names, no lorem) — reviews / FAQ / journey are
// design arrays per the runbook, not tenant data.
const REVIEWS = [
  { quote: "After years of restless nights I finally sleep through. The treatments are gentle and the room is wonderfully calm.", author: "Patient since 2022" },
  { quote: "My back pain eased after just a few sessions. I never felt rushed — every visit begins with a real conversation.", author: "Verified patient" },
  { quote: "A thoughtful, holistic approach. They read my pulse, asked about everything, and built a plan that actually fit my life.", author: "Verified patient" },
  { quote: "Warm, knowledgeable and deeply reassuring. I leave each appointment feeling balanced and looked after.", author: "Patient since 2023" },
];

const HELPS = [
  { title: "Stress & anxiety", note: "Settle a busy mind and restore a steadier sense of calm." },
  { title: "Pain & tension", note: "Ease back, neck, joint and muscular pain at the source." },
  { title: "Sleep", note: "Support deeper, more restful and unbroken sleep." },
  { title: "Fertility & cycles", note: "Gentle support for hormonal balance and reproductive health." },
  { title: "Digestion", note: "Soothe the gut and encourage healthy, regular digestion." },
];

const JOURNEY = [
  { step: "01", title: "Consultation", note: "We listen first — your history, your concerns and how you feel day to day." },
  { step: "02", title: "Diagnosis", note: "Reading pulse and tongue, we trace the pattern behind your symptoms." },
  { step: "03", title: "Treatment", note: "Fine needles, warmth and herbs, applied with care to move stagnant qi." },
  { step: "04", title: "Balance", note: "A plan to restore harmony and keep you well between visits." },
];

const STATS = [
  { value: "15+", label: "Years in practice" },
  { value: "4.9", label: "Average patient rating" },
  { value: "20+", label: "Treatments & therapies" },
  { value: "3000+", label: "Treatments given" },
];

const FAQ = [
  { q: "Does acupuncture hurt?", a: "The needles are extremely fine — far finer than those used for injections. Most people feel only a faint sensation, often followed by a deep, settling calm." },
  { q: "What can it help with?", a: "Traditional Chinese medicine takes a whole-body view. People come to us for pain, stress, sleep, digestion, hormonal balance and general wellbeing, among many other concerns." },
  { q: "How many sessions will I need?", a: "It depends on you and what we are working with. After your first consultation we will suggest a realistic course, and we review your progress at every visit." },
  { q: "Do you use Chinese herbs?", a: "Where helpful, yes. We prescribe carefully sourced herbal formulas tailored to your individual pattern, always explained clearly and reviewed over time." },
];

export default function LotusDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // ---------- shared marks ----------
  const Lotus = ({ size = 64, color = CLAY }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" stroke={color} strokeWidth="1.3" aria-hidden>
      <path d="M40 14c4.5 6 4.5 16 0 24-4.5-8-4.5-18 0-24z" />
      <path d="M40 38c-5-6.5-13.5-8.5-21-5.5C20.5 41 28 47.5 36 47.5c1.6 0 3-.2 4-.6" />
      <path d="M40 38c5-6.5 13.5-8.5 21-5.5C59.5 41 52 47.5 44 47.5c-1.6 0-3-.2-4-.6" />
      <path d="M40 42c-3.4-5.4-9.4-7.6-15.6-6 1.2 6.6 6.8 11.2 13 11.2 1.6 0 2.4-.2 2.6-.4" />
      <path d="M40 42c3.4-5.4 9.4-7.6 15.6-6-1.2 6.6-6.8 11.2-13 11.2-1.6 0-2.4-.2-2.6-.4" />
      <path d="M18 54c8 6 36 6 44 0" opacity="0.5" />
    </svg>
  );

  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
    if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  // Subtle rice-paper texture: faint warm speckle + horizontal grain, kept very
  // low contrast so it reads as paper, never noise.
  const paperBg = {
    background: `${CREAM}`,
    backgroundImage:
      "radial-gradient(rgba(35,33,28,0.035) 1px, transparent 1px), radial-gradient(rgba(193,154,75,0.05) 1px, transparent 1px), linear-gradient(rgba(35,33,28,0.015) 1px, transparent 1px)",
    backgroundSize: "18px 18px, 26px 26px, 100% 7px",
    backgroundPosition: "0 0, 9px 13px, 0 0",
  } as const;

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: INK }} className="text-[#F3ECDD]/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Lotus size={36} color={GOLD} />
            <p data-edit="tenant.business_name" style={serif} className="text-2xl text-[#F3ECDD]">{name}</p>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[#F3ECDD]/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#F3ECDD]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-[#F3ECDD]/70 transition hover:text-[#F3ECDD]">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Visit the clinic</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#F3ECDD]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-[#F3ECDD]/70 transition hover:text-[#F3ECDD]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-[#F3ECDD]/70 transition hover:text-[#F3ECDD]">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-[#F3ECDD]/10 px-6 py-6 text-center text-xs text-[#F3ECDD]/45">
        © {new Date().getFullYear()} {name}. Traditional acupuncture & Chinese medicine.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-[#23211C]" >
      <LotusHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Sub-page banner — paper texture, clears the fixed header.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={paperBg}>
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-36 text-center sm:pt-44">
        <span className="mx-auto block w-fit"><Lotus size={48} color={CLAY} /></span>
        <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: JADE }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#23211C]/65">{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "Our therapies", "A full menu of acupuncture, herbal medicine and complementary therapies. Every plan begins with a personal consultation.")}
        <section className="mx-auto max-w-4xl px-6 py-20" style={{ background: PAPER }}>
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && (
                    <h2 style={serif} className="mb-2 text-2xl" >{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-10 first:mt-6">
                      {catg.category && (
                        <div className="mb-4 flex items-center gap-3">
                          <span className="h-px w-6" style={{ background: CLAY }} />
                          <h3 className="text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: JADE }}>{catg.category}</h3>
                        </div>
                      )}
                      <ul className="divide-y" style={{ borderColor: "rgba(94,124,107,0.25)" }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p data-edit={`item:${item.id}:name`} style={serif} className="text-lg" >{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#23211C]/55">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: CLAY }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-[#23211C]/55">Our treatment menu is coming soon.</p>}

          <div className="mt-16 rounded-2xl px-8 py-12 text-center" style={{ background: JADE }}>
            <h3 style={serif} className="text-2xl text-[#F3ECDD]">Not sure where to begin?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-[#F3ECDD]/80">Book a first consultation and we will trace the pattern behind how you are feeling, then suggest a gentle, realistic course of care.</p>
            <a href={book} className="mt-7 inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Book a consultation</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Our philosophy")}
        <section className="px-6 py-20" style={{ background: PAPER }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? (
              <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[#23211C]/80">{content.about}</p>
            ) : <p className="text-[#23211C]/55">Our story is coming soon.</p>}

            <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-12 sm:grid-cols-4" style={{ borderColor: "rgba(94,124,107,0.3)" }}>
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl" style={{ ...serif, color: CLAY }}>{s.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#23211C]/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {team.length > 0 && (
          <section style={paperBg} className="border-t" >
            <div className="mx-auto max-w-6xl px-6 py-20" style={{ borderColor: "rgba(94,124,107,0.3)" }}>
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: JADE }}>Our practitioners</p>
                <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Meet your team</h2>
              </div>
              <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full ring-1" style={{ background: CREAM, boxShadow: "0 16px 40px rgba(35,33,28,0.12)" }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p style={serif} className="mt-5 text-lg" >{m.name}</p>
                    {m.role && <p className="text-sm" style={{ color: CLAY }}>{m.role}</p>}
                    {m.credentials && <p className="mt-0.5 text-xs text-[#23211C]/45">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-6 py-20" style={{ background: PAPER }}>
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: JADE }}>Good to know</p>
              <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Common questions</h2>
            </div>
            <dl className="mt-10 divide-y" style={{ borderColor: "rgba(94,124,107,0.3)" }}>
              {FAQ.map((f) => (
                <div key={f.q} className="py-6">
                  <dt style={serif} className="text-lg">{f.q}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-[#23211C]/65">{f.a}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the clinic", "A glimpse of our treatment rooms, our herbs and the quiet of the space.")}
        {gallery.length > 0 ? (
          <section className="px-6 py-16" style={{ background: PAPER }}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-20 text-center text-[#23211C]/55" style={{ background: PAPER }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOKING (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Booking", "Book your first visit", "Begin with a relaxed, unhurried consultation. Tell us how you are feeling and we will be in touch.")}
        <section className="px-6 py-20" style={{ background: PAPER }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 style={serif} className="text-3xl">A calm, considered approach</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-[#23211C]/65">Every course of care starts with a conversation. We take time to understand your history and your patterns, then recommend only what is right for you — with clear pricing and no pressure.</p>
              <ul className="mt-8 space-y-4 text-sm text-[#23211C]/80">
                {["Unhurried first consultation", "Registered, experienced practitioners", "Tailored acupuncture & herbal plans", "A warm, private treatment room"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] text-white" style={{ background: JADE }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              {content.phone && (
                <p className="mt-8 text-sm text-[#23211C]/65">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: CLAY }}>{content.phone}</a></p>
              )}
            </div>
            <LotusBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Find us", "Visit the clinic, call, or send a message and we will get back to you.")}
        <section className="px-6 py-20" style={{ background: PAPER }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 style={serif} className="text-2xl">Clinic details</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#23211C]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#23211C]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#23211C]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[#23211C]/80" style={{ borderColor: "rgba(94,124,107,0.3)" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#23211C]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                {content.map_url && (
                  <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Get directions</a>
                )}
                <a href={book} className="inline-flex rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:bg-[#23211C] hover:text-[#F3ECDD]" style={{ borderColor: INK, color: INK }}>Book a visit</a>
              </div>
              {content.socials && content.socials.length > 0 && (
                <div className="mt-8 flex gap-4" style={{ color: INK }}>
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
                contactBlurb="A question about a treatment, or anything else? We would be glad to hear from you."
                contactCta="Send message"
                theme={{ card: CREAM, cardBorder: "rgba(94,124,107,0.4)", heading: INK, blurb: "rgba(35,33,28,0.65)", label: "rgba(35,33,28,0.6)", fieldBg: "rgba(255,255,255,0.7)", fieldBorder: "rgba(94,124,107,0.4)", fieldText: INK, button: CLAY, buttonText: "#ffffff", radius: "1rem", font: "var(--font-fraunces)" }}
              />
            ) : (
              content.map_url && (
                <div className="overflow-hidden rounded-2xl">
                  <iframe title="Map" src={content.map_url} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
                </div>
              )
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---------- HOME ----------
  const teaseCategories = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 6);

  return shell(
    <>
      {/* paper-textured hero — centred serene headline + single lotus line mark */}
      <section className="relative overflow-hidden" style={paperBg}>
        {/* faint concentric ring motif, low contrast */}
        <div className="pointer-events-none absolute inset-0 grid place-items-center opacity-[0.4]" aria-hidden>
          <svg width="760" height="760" viewBox="0 0 760 760" fill="none" stroke={GOLD} strokeWidth="0.8" className="opacity-30">
            <circle cx="380" cy="380" r="200" />
            <circle cx="380" cy="380" r="290" />
            <circle cx="380" cy="380" r="370" />
          </svg>
        </div>
        <div className="relative mx-auto flex max-w-3xl flex-col items-center px-6 pb-24 pt-40 text-center sm:pt-48">
          <Lotus size={84} color={CLAY} />
          {content.tagline ? (
            <p data-edit="content.tagline" className="mt-8 text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: JADE }}>{content.tagline}</p>
          ) : (
            <p className="mt-8 text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: JADE }}>Acupuncture & Chinese medicine</p>
          )}
          <h1 data-edit="tenant.business_name" style={serif} className="mt-5 text-5xl font-medium leading-[1.06] sm:text-7xl">{name}</h1>
          <p className="mt-6 max-w-xl text-[16px] leading-relaxed text-[#23211C]/65">Traditional healing for a modern life — restoring balance, easing pain and quieting the mind through the gentle art of acupuncture and herbal medicine.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a href={book} className="inline-flex rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-lg transition hover:opacity-90" style={{ background: CLAY }}>Book a visit</a>
            {groups.length > 0 && (
              <a href={href("services")} className="inline-flex rounded-full border px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] transition hover:bg-[#23211C] hover:text-[#F3ECDD]" style={{ borderColor: INK, color: INK }}>View treatments</a>
            )}
          </div>
        </div>
        {/* fine seal/brush divider */}
        <div className="relative h-12" style={{ background: "linear-gradient(to bottom, transparent, rgba(94,124,107,0.06))" }} />
      </section>

      {/* "how acupuncture helps" band */}
      <section style={{ background: JADE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: "rgba(243,236,221,0.7)" }}>How it can help</p>
            <h2 style={serif} className="mt-3 text-3xl text-[#F3ECDD] sm:text-4xl">Care for the whole self</h2>
          </div>
          <div className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-5">
            {HELPS.map((h) => (
              <div key={h.title} className="text-center lg:text-left">
                <span className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-full lg:mx-0" style={{ background: "rgba(243,236,221,0.14)" }} aria-hidden>
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: GOLD }} />
                </span>
                <h3 style={serif} className="text-lg text-[#F3ECDD]">{h.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#F3ECDD]/70">{h.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* intro / welcome */}
      {content.about && (
        <section className="px-6 py-24 text-center" style={{ background: PAPER }}>
          <div className="mx-auto max-w-3xl">
            <span className="mx-auto block w-fit"><Lotus size={44} color={CLAY} /></span>
            <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: JADE }}>Welcome</p>
            <p data-edit="content.about" className="mt-5 text-[20px] leading-[1.95] text-[#23211C]/80">{content.about}</p>
          </div>
        </section>
      )}

      {/* treatment journey: consultation → diagnosis → treatment → balance */}
      <section style={paperBg} className="border-y" >
        <div className="mx-auto max-w-6xl px-6 py-20" style={{ borderColor: "rgba(94,124,107,0.25)" }}>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: JADE }}>Your treatment journey</p>
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">From first visit to balance</h2>
          </div>
          <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY.map((j, i) => (
              <li key={j.step} className="relative">
                {i < JOURNEY.length - 1 && (
                  <span className="absolute left-8 top-4 hidden h-px w-full lg:block" style={{ background: "rgba(94,124,107,0.3)" }} aria-hidden />
                )}
                <span className="relative grid h-16 w-16 place-items-center rounded-full" style={{ background: CREAM, border: `1px solid ${CLAY}` }}>
                  <span style={serif} className="text-xl" >{j.step}</span>
                </span>
                <h3 style={serif} className="mt-5 text-xl">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#23211C]/60">{j.note}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* treatments teaser → links to full treatments page (divider rows) */}
      {teaseCategories.length > 0 && (
        <section className="px-6 py-24" style={{ background: PAPER }}>
          <div className="mx-auto max-w-5xl">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: JADE }}>Treatments</p>
              <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Therapies we offer</h2>
            </div>
            <div className="mt-12 grid gap-x-14 gap-y-12 md:grid-cols-2">
              {teaseCategories.map((c) => (
                <div key={c.label}>
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-6" style={{ background: CLAY }} />
                    <h3 className="text-[12px] font-semibold uppercase tracking-[0.22em]" style={{ color: JADE }}>{c.label}</h3>
                  </div>
                  <ul className="divide-y" style={{ borderColor: "rgba(94,124,107,0.25)" }}>
                    {c.items.slice(0, 4).map((item) => (
                      <li key={item.id} className="flex items-baseline justify-between gap-6 py-3">
                        <span data-edit={`item:${item.id}:name`} style={serif} className="text-[15px]">{item.name}</span>
                        {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm" style={{ color: CLAY }}>{item.price}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>View all treatments</a>
            </div>
          </div>
        </section>
      )}

      {/* portrait band + reviews (editable hero image lives here) */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden" style={{ background: CREAM }}>
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center" style={{ background: CREAM }}>
              <Lotus size={120} color={CLAY} />
            </div>
          )}
        </div>
        <div className="flex flex-col justify-center px-8 py-16 sm:px-14" style={{ background: INK }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: GOLD }}>In our patients' words</p>
          <div className="mt-8 space-y-8">
            {REVIEWS.slice(0, 3).map((r) => (
              <figure key={r.author}>
                <blockquote style={serif} className="text-[19px] leading-relaxed text-[#F3ECDD]">“{r.quote}”</blockquote>
                <figcaption className="mt-2 text-xs uppercase tracking-[0.16em] text-[#F3ECDD]/50">{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* booking CTA band */}
      <section className="px-6 py-20" style={{ background: PAPER }}>
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div className="flex flex-col justify-center">
            <span className="mb-5 block w-fit"><Lotus size={52} color={CLAY} /></span>
            <h2 style={serif} className="text-3xl sm:text-4xl">Begin your path to balance</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#23211C]/65">Book a first consultation and let us listen. We will trace the root of how you feel and shape a gentle course of care around you.</p>
            <ul className="mt-6 space-y-2 text-sm text-[#23211C]/75">
              {["Acupuncture & herbal medicine", "Personalised, whole-body care", "Clear, honest guidance"].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CLAY }} />{t}</li>
              ))}
            </ul>
          </div>
          {bookingOn ? (
            <LotusBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="flex flex-col justify-center rounded-2xl px-8 py-14" style={{ background: JADE }}>
              <h3 style={serif} className="text-2xl text-[#F3ECDD]">Get in touch</h3>
              {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-[#F3ECDD]">{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-[#F3ECDD]">{content.email}</a>}
              <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Contact us</a>
            </div>
          )}
        </div>
      </section>

      {/* details band: address + map + hours */}
      <section style={paperBg} className="border-t" >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3" style={{ borderColor: "rgba(94,124,107,0.25)" }}>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: JADE }}>Visit the clinic</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#23211C]/75">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: CLAY }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: JADE }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-[#23211C]/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#23211C]/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-[#23211C]/55">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: JADE }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm text-[#23211C]/75">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#23211C]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#23211C]">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: CLAY }}>Book a visit</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
