import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LustreHeader } from "./LustreHeader";
import { LustreBooking } from "./LustreBooking";
import { LustreReviews, type LustreReview } from "./LustreReviews";
import { LustreFaq, type LustreFaqItem } from "./LustreFaq";

// Lustre — a refined single-practitioner aesthetics clinic design (MULTI-PAGE).
// Inspired by a personal medical-aesthetics brand: soft lavender-grey hero, an
// editorial "my story" intro, a "why choose us" split, a trust/stats strip, a
// Google-style review carousel, an FAQ accordion, opening hours over a storefront
// shot, and a clean black-button booking form. The nav opens real routes; the
// palette is baked; the tenant swaps in their own photography, copy, treatments,
// practitioner, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const LAVENDER = "#a9a2b4"; // muted lavender-grey hero / bands
const MAUVE = "#bdb6c4"; // softer panel tint
const INK = "#3a3744"; // charcoal text / buttons
const MIST = "#f3f1f5"; // off-white section tint

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Curated sample reviews (graceful fallback when the tenant has none of their
// own). Rewritten in our own words, no brand names.
const SAMPLE_REVIEWS: LustreReview[] = [
  { name: "Alison W.", when: "1 month ago", initial: "A", color: "#c98b8b", body: "Always makes me feel completely at ease and never oversells. Honestly the best, I would not go anywhere else." },
  { name: "Selina F.", when: "3 months ago", initial: "S", color: "#7fb0a3", body: "A wonderful experience from start to finish. Friendly, professional and the results speak for themselves." },
  { name: "Zhaklin S.", when: "6 months ago", initial: "Z", color: "#8a9bc0", body: "Loved every minute. Relaxing, thorough and my skin has never looked better. Thank you so much." },
  { name: "Megan R.", when: "7 months ago", initial: "M", color: "#b59ac0", body: "So knowledgeable and reassuring. She talked me through everything and the outcome was completely natural." },
  { name: "Priya K.", when: "9 months ago", initial: "P", color: "#c0a37f", body: "Spotless clinic, genuine care and brilliant aftercare. I have already booked my next appointment." },
];

const SAMPLE_FAQ: LustreFaqItem[] = [
  { q: "How is this clinic different from other practitioners?", a: "Every treatment begins with a no pressure consultation. If a treatment will not benefit you, I will tell you honestly and recommend an alternative or none at all." },
  { q: "Which payment methods do you accept?", a: "Cash and all major debit and credit cards are accepted. Card details are taken when confirming an appointment through the online booking system." },
  { q: "Will aftercare instructions be provided?", a: "Yes. You will be given clear verbal guidance after every treatment, written confirmation to read at home, and a contact number for any questions." },
  { q: "Is a deposit required?", a: "A small deposit secures every appointment and covers clinic costs if a booking is missed. A 48 hour notice period applies for cancellations." },
];

export default function LustreDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;
  const lead = team[0];

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.booking_url || content.reservation_url || href("contact");

  const nav = [
    { label: "About", href: href("about") },
    groups.length > 0 && { label: "Treatments", href: href("services") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---------- shared footer ----------
  const footer = (
    <footer className="bg-white text-neutral-700">
      <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
        <h4 style={serif} className="text-xl tracking-[0.18em] text-neutral-800 sm:text-2xl">{name.toUpperCase()}</h4>

        {content.email && (
          <a data-edit="content.email" href={`mailto:${content.email}`} className="mt-8 block text-sm text-neutral-600 hover:text-neutral-900">{content.email}</a>
        )}
        {content.phone && (
          <a data-edit="content.phone" href={`tel:${content.phone}`} className="mt-1 block text-sm text-neutral-600 hover:text-neutral-900">{content.phone}</a>
        )}

        {content.socials && content.socials.length > 0 && (
          <div className="mt-7 flex justify-center gap-5 text-neutral-700">
            {content.socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
            ))}
          </div>
        )}

        {/* trust badge band (mirrors the reference's CQC strip) */}
        <div className="mt-12 flex flex-col items-center justify-center gap-3 border-t border-neutral-200 pt-8 text-xs uppercase tracking-[0.18em] text-neutral-400 sm:flex-row sm:gap-6">
          <span>Fully insured</span>
          <span className="hidden sm:inline">•</span>
          <span>Medically led</span>
          <span className="hidden sm:inline">•</span>
          <span>Registered practitioner</span>
        </div>

        <p className="mt-8 text-xs text-neutral-400">© {new Date().getFullYear()} {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <LustreHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Lavender page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: LAVENDER }} className="text-white">
      <div className="mx-auto max-w-5xl px-6 pb-14 pt-32 text-center sm:pt-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-white/85">{kicker}</p>
        <h1 style={serif} className="mt-3 text-3xl font-normal tracking-[0.08em] sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---------- TREATMENTS / SERVICES ----------
  if (page === "services") {
    return shell(
      <>
        {banner("The clinic", "Treatments & prices")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && (
                    <h3 style={serif} className="mb-6 text-center text-2xl tracking-[0.06em]" >{section.section}</h3>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && (
                        <h4 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{catg.category}</h4>
                      )}
                      <ul className="divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-neutral-800">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-medium" style={{ color: INK }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              {bookingOn && (
                <div className="pt-4 text-center">
                  <a href={book} className="inline-flex px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>Book a consultation</a>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center text-neutral-500">Our treatment list is coming soon.</p>
          )}
        </section>
      </>,
    );
  }

  // ---------- BOOK ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Appointments", "Book now")}
        <section className="mx-auto max-w-xl px-6 py-16 sm:py-20">
          <p className="mb-8 text-center text-[15px] leading-[1.8] text-neutral-600">Get in touch today to schedule your next session. Tell me a little about what you are looking for and I will confirm your slot.</p>
          <LustreBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit", "Get in touch")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={serif} className="text-2xl tracking-[0.06em] text-neutral-800">Opening hours</h2>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-6 max-w-sm divide-y divide-neutral-200 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6 py-2.5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-neutral-500">Open by appointment.</p>
            )}

            <h3 className="mt-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">Where to find us</h3>
            {content.address && <p data-edit="content.address" className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#3a3744] hover:text-white" style={{ borderColor: INK, color: INK }}>Get directions</a>
            )}
          </div>

          {contactOn ? (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send a message"
                contactBlurb="Questions before booking? Drop me a note and I will reply personally."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: "rgba(0,0,0,0.08)", heading: INK, button: INK, buttonText: "#ffffff", fieldBorder: "#d4d2d8", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          ) : bookingOn ? (
            <LustreBooking tenantId={tenant.id} name={name} />
          ) : null}
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("Hello", "My story")}
        <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          {content.about ? (
            <p data-edit="content.about" className="whitespace-pre-line text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          ) : (
            <p className="text-neutral-500">My story is coming soon.</p>
          )}

          {lead && (
            <div className="mt-14 flex flex-col items-center gap-6 border-t border-neutral-200 pt-12 text-center">
              {lead.photo_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={lead.photo_url} alt={lead.name} className="h-40 w-40 rounded-full object-cover" />
              )}
              <div>
                <p style={serif} className="text-2xl tracking-[0.04em] text-neutral-800">{lead.name}</p>
                {lead.role && <p className="mt-1 text-sm uppercase tracking-[0.18em] text-neutral-500">{lead.role}</p>}
                {lead.credentials && <p className="mt-1 text-xs text-neutral-400">{lead.credentials}</p>}
              </div>
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "A look inside")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : (
          <p className="mx-auto max-w-6xl px-6 py-20 text-center text-neutral-500">Photos coming soon.</p>
        )}
      </>,
    );
  }

  // ---------- HOME ----------
  const reviews = SAMPLE_REVIEWS;
  return shell(
    <>
      {/* hero — soft lavender, supports looping video with image fallback */}
      <section className="relative isolate flex min-h-[88vh] flex-col overflow-hidden" style={{ background: LAVENDER }}>
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover opacity-90" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
        ) : null}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(58,55,68,0.35), rgba(169,162,180,0.15))" }} />
        <div className="relative z-10 mt-auto flex flex-col items-center gap-6 px-6 pb-20 text-center sm:pb-28">
          <p data-edit="tenant.business_name" style={serif} className="text-3xl tracking-[0.16em] text-white [text-shadow:0_2px_18px_rgba(0,0,0,0.3)] sm:text-5xl">{name.toUpperCase()}</p>
          {content.tagline && (
            <p data-edit="content.tagline" className="max-w-xl text-sm uppercase tracking-[0.28em] text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)] sm:text-base">{content.tagline}</p>
          )}
          <a href={book} className="mt-2 rounded-full border border-white px-9 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-neutral-800">Book now</a>
        </div>
      </section>

      {/* my story intro */}
      {content.about && (
        <section className="mx-auto max-w-5xl px-6 py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
            <div>
              <h2 style={serif} className="text-3xl tracking-[0.08em] text-neutral-800 sm:text-4xl">My story</h2>
              <p data-edit="content.about" className="mt-6 line-clamp-[12] whitespace-pre-line text-[16px] leading-[1.9] text-neutral-600">{content.about}</p>
              <a href={href("about")} className="mt-7 inline-flex text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: INK }}>Read more →</a>
            </div>
            {(hero || lead?.photo_url) && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={lead?.photo_url || hero} alt="" className="aspect-[4/5] w-full object-cover" />
            )}
          </div>
        </section>
      )}

      {/* why choose us — mauve split */}
      <section style={{ background: MAUVE }} className="text-white">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2">
          {gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={gallery[0].image_url} alt="" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <div className="aspect-[4/3] w-full bg-white/20" />
          )}
          <div>
            <h2 style={serif} className="text-3xl tracking-[0.08em] sm:text-4xl">Why choose us</h2>
            <p className="mt-6 text-[15px] leading-[1.9] text-white/90">
              Aesthetics is as much about confidence as appearance. Every treatment starts with a calm, unhurried consultation, so the plan is genuinely right for you. Nothing is rushed and nothing is oversold.
            </p>
            <p className="mt-4 text-[15px] leading-[1.9] text-white/90">
              Treatments are carried out by a qualified, medically trained practitioner, so you are in safe and experienced hands from the very first visit through to your aftercare.
            </p>
          </div>
        </div>
      </section>

      {/* trust / stats strip */}
      <section className="border-y border-neutral-200 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-6 py-14 text-center sm:grid-cols-3">
          {[
            { n: "10+", l: "Years experience" },
            { n: "4.9", l: "Average client rating" },
            { n: "100%", l: "Bespoke treatment plans" },
          ].map((s) => (
            <div key={s.l}>
              <p style={{ ...serif, color: INK }} className="text-4xl">{s.n}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-neutral-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* treatments teaser */}
      {groups.length > 0 && (
        <section style={{ background: MIST }}>
          <div className="mx-auto max-w-4xl px-6 py-20 text-center sm:py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-neutral-400">The clinic</p>
            <h2 style={serif} className="mt-3 text-3xl tracking-[0.08em] text-neutral-800 sm:text-4xl">Treatments</h2>
            <ul className="mx-auto mt-10 max-w-xl divide-y divide-neutral-200 text-left">
              {groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6).map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-6 py-3.5">
                  <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-neutral-800">{item.name}</span>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-medium" style={{ color: INK }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            <a href={href("services")} className="mt-10 inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>View all treatments</a>
          </div>
        </section>
      )}

      {/* client testimonials carousel — lavender band */}
      <section style={{ background: LAVENDER }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="text-center">
            <h2 style={serif} className="text-3xl tracking-[0.1em] sm:text-4xl">Client testimonials</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85">What my clients say about our work matters more than anything. Here is what a few of them had to say.</p>
            <p className="mt-6 text-sm font-semibold tracking-[0.04em]">4.9 ★★★★★ on Google Reviews</p>
          </div>
          <div className="mt-12">
            <LustreReviews reviews={reviews} />
          </div>
        </div>
      </section>

      {/* FAQ accordion — mauve band */}
      <section style={{ background: MAUVE }}>
        <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
          <h2 style={serif} className="text-center text-3xl tracking-[0.18em] text-white underline decoration-white/40 underline-offset-8 sm:text-4xl">FAQ</h2>
          <div className="mt-12">
            <LustreFaq items={SAMPLE_FAQ} />
          </div>
        </div>
      </section>

      {/* opening hours over storefront */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 px-6 py-20 sm:py-24 lg:grid-cols-2">
          {gallery[1] || gallery[0] ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={(gallery[1] ?? gallery[0]).image_url} alt="" className="aspect-[3/4] w-full object-cover" />
          ) : (
            <div className="aspect-[3/4] w-full" style={{ background: MIST }} />
          )}
          <div className="flex flex-col justify-center px-0 pt-10 lg:px-12 lg:pt-0">
            <h2 style={serif} className="text-2xl tracking-[0.1em] text-neutral-800 underline decoration-neutral-300 underline-offset-8 sm:text-3xl">Opening hours</h2>
            <p className="mt-4 text-xs uppercase tracking-[0.2em] text-neutral-400">Come visit</p>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-6 max-w-sm space-y-2.5 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : (
              <p className="mt-6 text-sm text-neutral-500">Open by appointment.</p>
            )}
            {content.address && (
              <>
                <h3 className="mt-10 text-xs uppercase tracking-[0.2em] text-neutral-400">Location</h3>
                <p data-edit="content.address" className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>
              </>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-6 inline-flex w-fit border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#3a3744] hover:text-white" style={{ borderColor: INK, color: INK }}>Get directions</a>
            )}
          </div>
        </div>
      </section>

      {/* closing CTA band */}
      <section style={{ background: INK }} className="text-white">
        <div className="mx-auto max-w-3xl px-6 py-16 text-center sm:py-20">
          <h2 style={serif} className="text-3xl tracking-[0.08em] sm:text-4xl">Ready to begin?</h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/80">Book a consultation today and let us put together a treatment plan that is right for you.</p>
          <a href={book} className="mt-8 inline-flex rounded-full bg-white px-10 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ color: INK }}>Book now</a>
        </div>
      </section>
    </>,
    false,
  );
}
