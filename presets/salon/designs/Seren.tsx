import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SerenHeader } from "./SerenHeader";
import { SerenBooking } from "./SerenBooking";
import {
  SerenHeroSlider,
  SerenReviews,
  SerenFaqAccordion,
  type SerenReview,
  type SerenFaq,
} from "./SerenCarousels";

// Seren — a calm, refined skin & aesthetics clinic design (single venue),
// MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery /
// Consultation / Contact) under basePath, never scroll anchors. The sticky
// rose header and footer are shared. Palette is baked (rose / ink / cream /
// soft blue-grey); the tenant swaps in their own photography, video, copy,
// treatments, practitioners, hours and contact.
//
// Reference structure recreated: rose header, hero photo SLIDER with overlaid
// title + book button, trust strip, reviews CAROUSEL, treatments grid by
// category, free-consultation CTA band + VIDEO hero, results stats, contact
// (two-tone portrait + rose form), map + details band, footer.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const ROSE = "#cf9583";
const ROSE_SOFT = "#f3e2da";
const INK = "#2c2622";
const CREAM = "#faf4f0";
const MIST = "#eef2f5";

// Static design copy (no brand names, no lorem) — reviews & FAQ are not tenant
// data, so they live as small design arrays per the runbook.
const REVIEWS: SerenReview[] = [
  { quote: "From the first consultation I felt completely at ease. The results look natural and exactly what I hoped for.", author: "Verified client" },
  { quote: "A calm, spotless clinic with a team that genuinely listens. They never push treatments you do not need.", author: "Verified client" },
  { quote: "My skin has not looked this clear in years. The aftercare advice made all the difference.", author: "Verified client" },
  { quote: "Professional, warm and reassuring throughout. I have already booked my follow up.", author: "Verified client" },
  { quote: "Honest guidance and a gentle approach. I would recommend them to anyone nervous about their first visit.", author: "Verified client" },
];

const TRUST = [
  { title: "Expert clinicians", note: "Qualified, registered practitioners" },
  { title: "Advanced technology", note: "Clinically proven devices" },
  { title: "Tailored plans", note: "Treatments built around you" },
  { title: "Years of care", note: "Trusted by our community" },
];

const STATS = [
  { value: "10k+", label: "Treatments delivered" },
  { value: "4.9", label: "Average client rating" },
  { value: "30+", label: "Treatments offered" },
  { value: "98%", label: "Would recommend us" },
];

const FAQ: SerenFaq[] = [
  { q: "Do I need a consultation before treatment?", a: "Yes. Every new client starts with a no obligation consultation so we can understand your goals and recommend the safest, most effective plan for your skin." },
  { q: "Are treatments suitable for all skin types?", a: "Our clinicians assess each client individually. We offer options suited to a wide range of skin types and tones, and will always advise honestly on what is right for you." },
  { q: "How soon will I see results?", a: "It depends on the treatment. Some give an immediate glow, while others build gradually over a course. We will set clear expectations during your consultation." },
  { q: "Is there any downtime?", a: "Many of our treatments have little to no downtime. Where aftercare is needed, we provide full guidance so you know exactly what to expect." },
];

export default function SerenDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Book via the tenant's external booking link if set, else our consultation page.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Consultation", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Hero slides: gallery first, hero image as the lead/fallback.
  const slideUrls = [hero, ...gallery.map((g) => g.image_url)].filter(Boolean) as string[];
  const slides = slideUrls.length ? slideUrls.slice(0, 5) : ["https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1600&q=80"];

  // ---------- shared icons ----------
  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
    if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    if (k.includes("pin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5 0-2-1.4-3.6-4-3.6-2.9 0-4.7 2.2-4.7 4.6 0 .8.3 1.5.6 1.8.1.1.1.2.1.4l-.3 1.1c0 .2-.2.2-.4.1-1.2-.5-1.9-2.2-1.9-3.6 0-2.9 2.1-5.6 6.1-5.6 3.2 0 5.7 2.3 5.7 5.3 0 3.2-2 5.8-4.8 5.8-1 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.8 1.9-1.2 2.5A10 10 0 1 0 12 2z" /></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: INK }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ROSE }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/75 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ROSE }}>Visit us</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/75">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/75 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/75 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/55">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <SerenHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Rose page banner — clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: ROSE_SOFT }}>
      <div className="mx-auto max-w-5xl px-6 pb-14 pt-32 text-center sm:pt-40">
        <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl" >{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600">{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "What we can do for you", "Browse our full menu of skin and aesthetic treatments. Every plan begins with a personal consultation.")}
        <section className="mx-auto max-w-6xl px-6 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 style={serif} className="text-2xl">{section.section}</h2>}
                  <div className="mt-8 grid gap-x-12 gap-y-10 sm:grid-cols-2">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <h3 className="border-b pb-2 text-sm font-semibold uppercase tracking-[0.16em]" style={{ color: INK, borderColor: ROSE_SOFT }}>{catg.category}</h3>
                        )}
                        <ul className="mt-4 space-y-4">
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-4">
                              <div>
                                <p data-edit={`item:${item.id}:name`} className="font-medium text-neutral-900">{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: ROSE }}>{item.price}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-neutral-500">Our treatment menu is coming soon.</p>}

          <div className="mt-16 rounded-2xl px-8 py-12 text-center" style={{ background: MIST }}>
            <h3 style={serif} className="text-2xl">Not sure where to start?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-neutral-600">Book a no obligation consultation and our clinicians will build a plan around your goals.</p>
            <a href={book} className="mt-6 inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: ROSE }}>Book a consultation</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Care you can trust")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          ) : <p className="text-neutral-500">Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl" style={{ ...serif, color: ROSE }}>{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className="border-t" style={{ background: CREAM, borderColor: ROSE_SOFT }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>Our team</p>
                <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Meet your clinicians</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full" style={{ background: ROSE_SOFT }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-5 text-lg font-medium">{m.name}</p>
                    {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>Good to know</p>
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Frequently asked questions</h2>
          </div>
          <div className="mt-10"><SerenFaqAccordion items={FAQ} /></div>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the clinic", "A look at our space and the results our clients love.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- CONSULTATION (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Consultation", "Book your visit", "Get your free, no obligation consultation. Tell us a little about you and we will be in touch.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 style={serif} className="text-3xl">A gentle, personal approach</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">Every journey starts with a conversation. We will listen to your goals, assess your skin, and recommend only what is right for you, with clear pricing and no pressure.</p>
            <ul className="mt-7 space-y-3 text-sm text-neutral-700">
              {["Free, no obligation consultation", "Qualified, registered clinicians", "Honest, tailored treatment plans", "Comfortable, private clinic setting"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] text-white" style={{ background: ROSE }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm text-neutral-600">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: ROSE }}>{content.phone}</a></p>
            )}
          </div>
          <SerenBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit us, call, or send a message and we will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={serif} className="text-2xl">Clinic details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-neutral-700" style={{ borderColor: ROSE_SOFT }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: ROSE }}>Get directions</a>
              )}
              <a href={book} className="inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Book appointment</a>
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
              contactBlurb="Questions about a treatment or anything else? We would love to hear from you."
              contactCta="Submit"
              theme={{ card: ROSE, cardBorder: ROSE, heading: "#ffffff", blurb: "rgba(255,255,255,0.85)", label: "rgba(255,255,255,0.85)", fieldBg: "rgba(255,255,255,0.15)", fieldBorder: "rgba(255,255,255,0.4)", fieldText: "#ffffff", button: INK, buttonText: "#ffffff", radius: "0.75rem", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden rounded-2xl">
                <iframe title="Map" src={content.map_url} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
              </div>
            )
          )}
        </section>
      </>,
    );
  }

  // ---------- HOME ----------
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items));
  // Treatment "cards" grouped by category for the home teaser, like the reference grid.
  const teaseCategories = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 8);

  return shell(
    <>
      {/* hero slider */}
      <SerenHeroSlider slides={slides}>
        <div className="mx-auto max-w-6xl">
          <div className="max-w-xl text-white">
            {content.tagline && <p data-edit="content.tagline" className="text-xs font-semibold uppercase tracking-[0.32em] text-white/85">{content.tagline}</p>}
            <h1 data-edit="tenant.business_name" style={serif} className="mt-4 text-5xl font-medium leading-[1.05] [text-shadow:0_2px_24px_rgba(0,0,0,0.4)] sm:text-7xl">{name}</h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/85">Refined skin and aesthetic treatments, delivered with care in a calm, private clinic.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white shadow-xl transition hover:opacity-90" style={{ background: ROSE }}>Book now</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex border border-white/70 px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">View treatments</a>
              )}
            </div>
          </div>
        </div>
      </SerenHeroSlider>

      {/* trust strip */}
      <section className="border-b" style={{ background: "#fff", borderColor: ROSE_SOFT }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full text-white" style={{ background: ROSE }} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 18.9 7.2 17l.9-5.4L4.2 7.7l5.4-.8z" /></svg>
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: INK }}>{t.title}</p>
                <p className="text-xs text-neutral-500">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>Welcome</p>
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9] text-neutral-700">{content.about}</p>
        </section>
      )}

      {/* reviews carousel */}
      <section style={{ background: MIST }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>Reviews</p>
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">What our clients say</h2>
          </div>
          <div className="mt-12"><SerenReviews reviews={REVIEWS} /></div>
        </div>
      </section>

      {/* treatments teaser → links to full treatments page */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>Treatments</p>
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">What we can do for you</h2>
          </div>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {teaseCategories.map((c) => (
              <div key={c.label} className="text-center">
                <span className="mx-auto grid h-14 w-14 place-items-center rounded-full" style={{ background: ROSE_SOFT, color: ROSE }} aria-hidden>
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><path d="M8 13s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
                </span>
                <h3 className="mt-4 text-base font-semibold underline decoration-1 underline-offset-4" style={{ color: INK }}>{c.label}</h3>
                <ul className="mt-3 space-y-1 text-sm text-neutral-500">
                  {c.items.slice(0, 5).map((item) => (
                    <li key={item.id} data-edit={`item:${item.id}:name`}>{item.name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: ROSE }}>View all treatments</a>
          </div>
        </section>
      )}

      {/* free consultation CTA + video hero */}
      <section className="grid items-stretch lg:grid-cols-2">
        <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:py-24" style={{ background: ROSE_SOFT }}>
          <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: ROSE }}>Get started</p>
          <h2 style={serif} className="mt-4 text-3xl sm:text-4xl">Your free, no obligation consultation</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">Book a relaxed chat with our clinicians. We will assess your skin and recommend a plan that is right for you, with no pressure.</p>
          <ul className="mt-6 space-y-2 text-sm text-neutral-700">
            {["Skin and aesthetics consultations", "Personalised treatment plans", "Clear, honest pricing"].map((t) => (
              <li key={t} className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: ROSE }} />{t}</li>
            ))}
          </ul>
          <div className="mt-8">
            <a href={book} className="inline-flex px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: INK }}>Book a consultation</a>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden bg-neutral-900 lg:min-h-0">
          {video ? (
            <video
              src={video}
              autoPlay
              muted
              loop
              playsInline
              poster={hero || undefined}
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" />
          ) : (
            <div className="absolute inset-0" style={{ background: INK }} />
          )}
          <div className="pointer-events-none absolute inset-0 bg-black/25" />
          <div className="absolute inset-0 grid place-items-center text-center text-white">
            <div>
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/25 backdrop-blur" aria-hidden>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              </span>
              <p style={serif} className="mt-5 px-6 text-2xl [text-shadow:0_2px_18px_rgba(0,0,0,0.5)]">Transform your skin with expert care</p>
            </div>
          </div>
        </div>
      </section>

      {/* contact band: two-tone portrait + rose booking panel */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden bg-neutral-200">
          {slides[1] || hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={slides[1] || hero!} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: ROSE_SOFT }} />
          )}
        </div>
        {bookingOn ? (
          <SerenBooking tenantId={tenant.id} name={name} />
        ) : (
          <div className="flex flex-col justify-center px-8 py-14" style={{ background: ROSE }}>
            <h3 style={serif} className="text-2xl text-white">Get in touch</h3>
            {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-white">{content.phone}</a>}
            {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-white">{content.email}</a>}
            <a href={href("contact")} className="mt-6 inline-flex w-fit px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>Contact us</a>
          </div>
        )}
      </section>

      {/* details band: address + map link + hours */}
      <section className="border-t" style={{ background: CREAM, borderColor: ROSE_SOFT }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ROSE }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: ROSE }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ROSE }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-neutral-500">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: ROSE }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: INK }}>Book appointment</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
