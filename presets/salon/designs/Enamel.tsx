import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { EnamelHeader } from "./EnamelHeader";
import { EnamelBooking } from "./EnamelBooking";

// Enamel — a fresh, trustworthy, modern dental practice (single venue),
// MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery /
// Book / Contact) under basePath, never scroll anchors. The crisp white +
// clinical-blue header and ink footer are shared. Palette is baked
// (white / soft mint / clinical sky blue / deep navy ink / warm grey); the
// tenant swaps in their own photography, copy, treatments, practitioners,
// hours and contact.
//
// Structural signature (shares no resemblance to sibling salon designs): a
// bright, airy white/sky hero with a confident headline + "Book a check-up"
// CTA and an inline trust strip; a "your visit, step by step" reassurance
// band for nervous patients; a tooth/smile-arc line motif; treatments as
// clean grouped divider rows (Check-ups / Cosmetic / Implants …); trust
// badges (GDC-registered style, finance available, nervous-patient friendly);
// practitioners; plain-spoken reviews and FAQ.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const WHITE = "#ffffff";
const MINT = "#cde9dd";
const SKY = "#2e7cb8";
const NAVY = "#15293a";
const GREY = "#f2f5f7";

// Static design copy (no brand names, no lorem) — reviews, trust, stats, FAQ
// and the "your visit" steps are not tenant data, so they live as small design
// arrays per the runbook.
const REVIEWS = [
  { quote: "I have always been nervous at the dentist, but the team here put me completely at ease. Gentle, patient and never rushed.", author: "Verified patient" },
  { quote: "Spotlessly clean, modern and calm. Everything was explained clearly before they started, including the cost.", author: "Verified patient" },
  { quote: "Honestly the most reassuring dental visit I have had. My whitening results look natural and bright.", author: "Verified patient" },
  { quote: "Booked my whole family in. The kids actually look forward to their check-ups now, which says it all.", author: "Verified patient" },
];

const TRUST = [
  { title: "Registered clinicians", note: "GDC-registered dentists & hygienists" },
  { title: "Nervous patients welcome", note: "Gentle, judgement-free care" },
  { title: "Finance available", note: "Spread the cost of treatment" },
  { title: "Same-week emergencies", note: "Urgent appointments when you need them" },
];

const STATS = [
  { value: "20k+", label: "Smiles cared for" },
  { value: "4.9", label: "Average patient rating" },
  { value: "15+", label: "Years of trusted care" },
  { value: "98%", label: "Would recommend us" },
];

// "Your visit, step by step" — the reassurance band for new patients.
const VISIT = [
  { n: "01", title: "A warm welcome", body: "Arrive to a calm, modern practice. No clinical chill — just a friendly team who take the time to get to know you." },
  { n: "02", title: "A gentle exam", body: "Your dentist carries out a thorough, unhurried check-up and listens to any worries before anything else happens." },
  { n: "03", title: "A clear plan", body: "We explain exactly what we found and your options in plain English, with honest, up-front pricing." },
  { n: "04", title: "Care at your pace", body: "Treatment only when you are ready. We pause whenever you need and keep you comfortable throughout." },
];

const FAQ = [
  { q: "I am nervous about visiting the dentist. Can you help?", a: "Absolutely. A large part of our practice is caring for anxious patients. We move at your pace, explain everything before we do it, and you are always in control — just raise a hand and we stop." },
  { q: "Are you taking on new patients?", a: "Yes. We welcome new patients of all ages, including families and those who have not seen a dentist in a while. There is no judgement, only a fresh start for your smile." },
  { q: "Do you offer payment plans?", a: "We do. Many treatments can be spread over manageable monthly payments, and we will always be clear about costs before any work begins." },
  { q: "What should I do in a dental emergency?", a: "Call us as early in the day as you can. We hold same-week emergency slots for pain, swelling, a knocked-out tooth or a broken filling or crown." },
];

export default function EnamelDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Book via the tenant's external booking link if set, else our booking page.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
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

  const ToothIcon = ({ className }: { className?: string }) => (
    <svg className={className} width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <path d="M8 3c-2.2 0-3.5 1.7-3.5 4 0 1.3.3 2.4.5 4 .3 2 .4 6 1.6 8 .8 1.3 1.8.7 2.1-.6.3-1.4.5-3.4 1.3-3.4s1 2 1.3 3.4c.3 1.3 1.3 1.9 2.1.6 1.2-2 1.3-6 1.6-8 .2-1.6.5-2.7.5-4 0-2.3-1.3-4-3.5-4-1.3 0-1.9.6-3 .6S9.3 3 8 3Z" />
    </svg>
  );

  // A crisp smile-arc line motif — the signature flourish used under headings.
  const SmileArc = ({ className }: { className?: string }) => (
    <svg className={className} width="120" height="20" viewBox="0 0 120 20" fill="none" aria-hidden>
      <path d="M4 4c20 16 92 16 112 0" stroke={SKY} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="4" cy="4" r="2.5" fill={MINT} />
      <circle cx="116" cy="4" r="2.5" fill={MINT} />
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: NAVY }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: SKY, color: "#fff" }} aria-hidden><ToothIcon /></span>
            <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition hover:bg-white/20"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MINT }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/70 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: MINT }}>Visit us</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/70 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/70 transition hover:text-white">{content.email}</a>}
          </div>
          {content.hours && content.hours.length > 0 && (
            <ul className="mt-5 space-y-1.5 text-sm">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`} className="text-white/70">{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-[#15293a]">
      <EnamelHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Bright page banner — clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: GREY }}>
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-32 text-center sm:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium tracking-tight sm:text-5xl" >{title}</h1>
        <div className="mt-5 flex justify-center"><SmileArc /></div>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-[#5b6f7d]">{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "Confident, healthy smiles", "From routine check-ups to cosmetic and implant care — every treatment starts with a gentle assessment and clear, honest pricing.")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 style={serif} className="text-2xl font-medium tracking-tight" >{section.section}</h2>}
                  <div className="mt-6 space-y-10">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <div className="flex items-center gap-2.5 text-sm font-semibold uppercase tracking-[0.14em]" style={{ color: SKY }}>
                            <ToothIcon className="h-4 w-4" />
                            <h3>{catg.category}</h3>
                          </div>
                        )}
                        <ul className="mt-3 divide-y divide-[#e6edf2] border-t border-[#e6edf2]">
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="font-medium text-[#15293a]">{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-[#5b6f7d]">{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: SKY }}>{item.price}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-[#5b6f7d]">Our treatment menu is coming soon.</p>}

          <div className="mt-16 overflow-hidden rounded-3xl border border-[#dbe9e1] px-8 py-12 text-center" style={{ background: MINT }}>
            <h3 style={{ ...serif, color: NAVY }} className="text-2xl font-medium">Not sure what you need?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "#33505f" }}>Book a check-up and we will assess your smile, talk through your options, and set out a plan with no pressure.</p>
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90" style={{ background: SKY }}>Book a check-up</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Modern dentistry, gentle care")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-[#33505f]">{content.about}</p>
          ) : <p className="text-[#5b6f7d]">Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-medium" style={{ ...serif, color: SKY }}>{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#5b6f7d]">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className="border-y border-[#e6edf2]" style={{ background: GREY }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>Our team</p>
                <h2 style={serif} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" >Meet your clinicians</h2>
                <div className="mt-4 flex justify-center"><SmileArc /></div>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="overflow-hidden rounded-3xl bg-white text-center shadow-[0_18px_44px_-28px_rgba(21,41,58,0.4)]">
                    <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: MINT }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <div className="px-5 py-6">
                      <p className="text-lg font-medium text-[#15293a]">{m.name}</p>
                      {m.role && <p className="text-sm font-semibold" style={{ color: SKY }}>{m.role}</p>}
                      {m.credentials && <p className="mt-1 text-xs text-[#7b8e9b]">{m.credentials}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>Good to know</p>
            <h2 style={serif} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" >Common questions</h2>
          </div>
          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-2xl border border-[#e6edf2] bg-white p-6">
                <p className="flex items-start gap-3 text-[15px] font-semibold text-[#15293a]">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] text-white" style={{ background: SKY }}>?</span>
                  {f.q}
                </p>
                <p className="mt-2 pl-8 text-sm leading-relaxed text-[#5b6f7d]">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the practice", "A look at our calm, modern surroundings and the bright smiles we help create.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-[#5b6f7d]">Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOK (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Appointments", "Book your visit", "Request a check-up or treatment. Tell us a little about you and our reception team will confirm a time that works.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 style={serif} className="text-3xl font-medium tracking-tight" >A calm, reassuring visit</h2>
            <div className="mt-4"><SmileArc /></div>
            <p className="mt-5 text-[15px] leading-relaxed text-[#5b6f7d]">Whether it is your first visit in years or a routine check-up, you are in safe hands. We will listen, explain everything clearly, and never rush you.</p>
            <ul className="mt-7 space-y-3 text-sm text-[#33505f]">
              {["GDC-registered dentists & hygienists", "Nervous-patient friendly, judgement-free", "Honest, up-front pricing — finance available", "Same-week emergency appointments"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] text-white" style={{ background: SKY }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm text-[#5b6f7d]">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: SKY }}>{content.phone}</a></p>
            )}
          </div>
          <EnamelBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit us, call, or send a message and our friendly team will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={serif} className="text-2xl font-medium tracking-tight" >Practice details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#33505f]">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2e7cb8]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2e7cb8]">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-[#e6edf2] pt-6 text-sm text-[#33505f]">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#7b8e9b]">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90" style={{ background: SKY }}>Get directions</a>
              )}
              <a href={book} className="inline-flex rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] transition hover:bg-[#15293a] hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>Book a check-up</a>
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-3" style={{ color: NAVY }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full transition hover:opacity-60" style={{ background: GREY }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
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
              contactBlurb="Questions about a treatment, a nervous-patient query, or anything else? We would love to hear from you."
              contactCta="Send message"
              theme={{ card: "#ffffff", cardBorder: "#e2ebf1", heading: NAVY, blurb: "#5b6f7d", label: "#5b6f7d", fieldBg: "#ffffff", fieldBorder: "#dbe6ee", fieldText: NAVY, button: SKY, buttonText: "#ffffff", radius: "1rem", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden rounded-3xl">
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
    .slice(0, 6);

  const heroImg = hero || "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1400&q=80";

  return shell(
    <>
      {/* HERO — bright, airy white/sky split: confident copy left, photo right */}
      <section className="relative overflow-hidden" style={{ background: WHITE }}>
        {/* soft mint wash + arc motif behind the content */}
        <div className="pointer-events-none absolute inset-0" style={{ background: `radial-gradient(120% 80% at 100% 0%, ${MINT}55 0%, transparent 55%), radial-gradient(80% 60% at 0% 100%, ${GREY} 0%, transparent 60%)` }} />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-32 sm:pt-40 lg:grid-cols-[1.05fr_1fr] lg:pb-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em]" style={{ borderColor: MINT, color: SKY, background: "#f2f9f5" }}>
              <ToothIcon className="h-3.5 w-3.5" /> Now welcoming new patients
            </span>
            {content.tagline ? (
              <p data-edit="content.tagline" className="mt-6 text-sm font-semibold uppercase tracking-[0.2em]" style={{ color: SKY }}>{content.tagline}</p>
            ) : null}
            <h1 data-edit="tenant.business_name" style={serif} className="mt-3 text-5xl font-medium leading-[1.04] tracking-tight text-[#15293a] sm:text-6xl">{name}</h1>
            <p className="mt-3 max-w-md text-lg leading-relaxed text-[#5b6f7d]">Confident, healthy smiles in a calm, modern practice. Gentle dentistry for the whole family — including nervous patients.</p>
            <div className="mt-7"><SmileArc className="h-5 w-auto" /></div>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={book} className="inline-flex items-center rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_16px_40px_-16px_rgba(46,124,184,0.7)] transition hover:opacity-90" style={{ background: SKY }}>Book a check-up</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex items-center rounded-full border px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-[#15293a] hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>View treatments</a>
              )}
            </div>
            {content.phone && (
              <p className="mt-6 text-sm text-[#5b6f7d]">Dental emergency? <a href={`tel:${content.phone}`} className="font-semibold" style={{ color: SKY }}>Call {content.phone}</a></p>
            )}
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-40px_rgba(21,41,58,0.5)]" style={{ aspectRatio: "4 / 5", background: MINT }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-edit-image="hero" src={heroImg} alt="" className="h-full w-full object-cover" />
            </div>
            {/* floating rating chip */}
            <div className="absolute -bottom-5 -left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_18px_44px_-20px_rgba(21,41,58,0.45)] sm:-left-6">
              <span className="grid h-10 w-10 place-items-center rounded-full text-white" style={{ background: SKY }} aria-hidden><ToothIcon className="h-5 w-5" /></span>
              <div>
                <div className="flex gap-0.5 text-sm" style={{ color: SKY }} aria-hidden>{"★★★★★"}</div>
                <p className="text-xs font-medium text-[#5b6f7d]">Rated 4.9 by our patients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST badges strip */}
      <section className="border-y border-[#e6edf2]" style={{ background: GREY }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3.5">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: MINT, color: NAVY }} aria-hidden>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M12 2l2.4 1.7L17.3 4l.9 2.8 2.3 1.8-.9 2.8.9 2.8-2.3 1.8-.9 2.8-2.9.3L12 22l-2.4-1.7-2.9-.3-.9-2.8-2.3-1.8.9-2.8-.9-2.8L5.8 6.8 6.7 4l2.9-.3z" /><path d="M9 12l2 2 4-4" /></svg>
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: NAVY }}>{t.title}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#5b6f7d]">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>Welcome</p>
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9] text-[#33505f]">{content.about}</p>
        </section>
      )}

      {/* YOUR VISIT, STEP BY STEP — reassurance band for nervous patients */}
      <section className="border-y border-[#e6edf2]" style={{ background: WHITE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>Nervous? You are in good hands</p>
            <h2 style={serif} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" >Your visit, step by step</h2>
            <div className="mt-4 flex justify-center"><SmileArc /></div>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[#5b6f7d]">We know a trip to the dentist can feel daunting. Here is exactly what to expect — no surprises, no rush.</p>
          </div>
          <div className="relative mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {VISIT.map((s, idx) => (
              <div key={s.n} className="relative rounded-3xl border border-[#e6edf2] bg-white p-7" style={idx % 2 === 1 ? { background: GREY } : undefined}>
                <span style={{ ...serif, color: MINT }} className="text-4xl font-medium leading-none">{s.n}</span>
                <h3 className="mt-3 text-lg font-semibold text-[#15293a]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#5b6f7d]">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TREATMENTS teaser → links to full treatments page */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>Treatments</p>
            <h2 style={serif} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" >Care for every smile</h2>
            <div className="mt-4 flex justify-center"><SmileArc /></div>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teaseCategories.map((c) => (
              <a key={c.label} href={href("services")} className="group rounded-3xl border border-[#e6edf2] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[#cfe0eb] hover:shadow-[0_24px_50px_-30px_rgba(21,41,58,0.4)]">
                <span className="grid h-12 w-12 place-items-center rounded-full" style={{ background: MINT, color: NAVY }} aria-hidden><ToothIcon /></span>
                <h3 className="mt-4 text-lg font-semibold text-[#15293a]">{c.label}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-[#5b6f7d]">
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item.id} data-edit={`item:${item.id}:name`} className="flex items-baseline gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: SKY }} />
                      {item.name}
                    </li>
                  ))}
                </ul>
                <span className="mt-5 inline-flex text-sm font-semibold transition group-hover:gap-2" style={{ color: SKY }}>Learn more →</span>
              </a>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90" style={{ background: SKY }}>View all treatments</a>
          </div>
        </section>
      )}

      {/* TEAM (practitioners) */}
      {team.length > 0 && (
        <section className="border-y border-[#e6edf2]" style={{ background: GREY }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: SKY }}>Our team</p>
              <h2 style={serif} className="mt-3 text-3xl font-medium tracking-tight sm:text-4xl" >The people behind your smile</h2>
              <div className="mt-4 flex justify-center"><SmileArc /></div>
            </div>
            <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {team.slice(0, 6).map((m) => (
                <div key={m.id} className="overflow-hidden rounded-3xl bg-white text-center shadow-[0_18px_44px_-28px_rgba(21,41,58,0.4)]">
                  <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: MINT }}>
                    {m.photo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <div className="px-5 py-6">
                    <p className="text-lg font-medium text-[#15293a]">{m.name}</p>
                    {m.role && <p className="text-sm font-semibold" style={{ color: SKY }}>{m.role}</p>}
                    {m.credentials && <p className="mt-1 text-xs text-[#7b8e9b]">{m.credentials}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* REVIEWS */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-white">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: MINT }}>Patient stories</p>
            <h2 style={serif} className="mt-3 text-3xl font-medium tracking-tight text-white sm:text-4xl" >Smiles worth talking about</h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex h-full flex-col rounded-3xl bg-white/[0.06] p-7 ring-1 ring-white/10">
                <div className="flex gap-0.5 text-sm" style={{ color: MINT }} aria-hidden>{"★★★★★"}</div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-white/85">{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm font-semibold" style={{ color: MINT }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band — bright booking invitation */}
      <section style={{ background: MINT }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          <div>
            <h2 style={{ ...serif, color: NAVY }} className="text-3xl font-medium tracking-tight sm:text-4xl">Ready for a brighter, healthier smile?</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "#33505f" }}>Book a check-up today. We will get to know you, assess your smile and set out a clear plan — gently, and at your pace.</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={book} className="inline-flex rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: SKY }}>Book a check-up</a>
              <a href={href("contact")} className="inline-flex rounded-full border px-8 py-4 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-[#15293a] hover:text-white" style={{ borderColor: NAVY, color: NAVY }}>Contact us</a>
            </div>
          </div>
          <div className="rounded-3xl bg-white/70 p-7 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-y-8 gap-x-4">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="text-3xl font-medium" style={{ ...serif, color: SKY }}>{s.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#5b6f7d]">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DETAILS band: address + map + hours */}
      <section className="border-t border-[#e6edf2]" style={{ background: WHITE }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: SKY }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#33505f]">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: SKY }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: SKY }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-[#33505f]">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#7b8e9b]">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-[#5b6f7d]">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: SKY }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm text-[#33505f]">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2e7cb8]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2e7cb8]">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90" style={{ background: SKY }}>Book a check-up</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
