import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LineaHeader } from "./LineaHeader";
import { LineaBooking } from "./LineaBooking";
import { LineaReviews, LineaBeforeAfter, LineaFaq, LineaNewsletter } from "./LineaInteractive";

// Linea — light, airy aesthetics-clinic design (single venue), inspired by
// AM Aesthetics. MULTI-PAGE: the nav opens real routes (Treatments / About /
// Gallery / Book / Contact) under basePath, never scroll anchors. Each page is
// its own layout; the sticky white header and sage footer are shared. Palette is
// baked soft sage-green + warm taupe serif on cream/white; the tenant swaps in
// their own photography, video, treatments, practitioners, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const SAGE = "#8ba29c";
const TAUPE = "#5c5048";
const CREAM = "#f5f2ec";
const MIST = "#eef1f0";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Default reviews + FAQ + insights copy when the tenant has not added their own
// (no brand names; rewritten in our own words to match the clinic tone).
const FALLBACK_REVIEWS = [
  { quote: "The team put me at ease from the very first consultation. Natural, beautiful results and I felt looked after at every step.", name: "Verified client" },
  { quote: "Genuinely the most thorough skin advice I have ever had. I finally understand my skin and the plan is working.", name: "Verified client" },
  { quote: "Professional, calm and never pushy. I trust them completely with my treatments.", name: "Verified client" },
];

const FALLBACK_FAQ = [
  { q: "Do I need a consultation before treatment?", a: "Yes. Every new client starts with a consultation so we can understand your goals, review your medical history and recommend the right plan for you. There is no obligation to proceed." },
  { q: "Are the treatments safe?", a: "All treatments are carried out by qualified, experienced practitioners using clinically proven products. We talk you through aftercare and are always on hand if you have questions." },
  { q: "How long will my results last?", a: "It depends on the treatment and your skin. We will give you a realistic idea at your consultation and recommend a maintenance schedule to keep you looking your best." },
  { q: "Results may vary", a: "Results vary from person to person and no guarantee of a specific result can be made. Your practitioner will set honest expectations with you." },
];

const FALLBACK_INSIGHTS = [
  { title: "How to care for your skin after treatment", blurb: "Simple, practical aftercare steps to protect your results and keep your skin calm and healthy." },
  { title: "Dry, dehydrated skin: what helps", blurb: "Why skin changes through the seasons and the routine tweaks that make the biggest difference." },
  { title: "Choosing the right treatment for you", blurb: "A clear guide to the most popular treatments and how to know which is right for your goals." },
];

export default function LineaDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // External booking link wins; otherwise our own reservations page or contact.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    content.about && { label: "About", href: href("about") },
    groups.length > 0 && { label: "Treatments", href: href("services") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Treatment tiles for the home grid (one card per individual treatment).
  const allItems = groups.flatMap((s) => s.categories.flatMap((c) => c.items));
  const treatmentTiles = allItems.slice(0, 8);
  const reviews = FALLBACK_REVIEWS;

  const footer = (
    <footer>
      {/* sage band with crest, nav and social icons */}
      <div style={{ background: SAGE }} className="text-white">
        <div className="mx-auto max-w-5xl px-8 py-16 text-center">
          <span style={serif} className="text-2xl tracking-[0.18em]">{name}</span>
          <nav className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
            {nav.map((l) => (
              <a key={l.href} href={l.href} className="transition hover:text-white">{l.label}</a>
            ))}
          </nav>
          <div className="mx-auto my-10 h-px max-w-2xl bg-white/30" />
          {content.socials && content.socials.length > 0 && (
            <div className="flex justify-center gap-5 text-white">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15 transition hover:bg-white/30"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* light legal strip */}
      <div className="bg-white">
        <div className="mx-auto max-w-6xl px-8 py-10 text-center">
          <p className="text-sm font-semibold text-neutral-500">Results may vary from person to person. No guarantee of result can be made.</p>
          <div className="mt-5 flex flex-col items-center justify-between gap-3 text-xs text-neutral-400 sm:flex-row">
            <span>© {new Date().getFullYear()} {name}</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
              <a href={href("services")} className="hover:text-neutral-700" {...editCopy(content, "legal_treatments", "Treatments")} />
              {bookingOn && <a href={href("reservations")} className="hover:text-neutral-700" {...editCopy(content, "legal_bookings", "Bookings policy")} />}
              <a href={href("contact")} className="hover:text-neutral-700" {...editCopy(content, "legal_aftercare", "Aftercare")} />
              <a href={href("contact")} className="hover:text-neutral-700" {...editCopy(content, "legal_privacy", "Privacy policy")} />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <LineaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Light page banner — also clears the fixed header on sub-pages.
  const banner = (keyBase: string, kicker: string, title: string, lead?: string) => (
    <section style={{ background: CREAM }} className="border-b border-black/5">
      <div className="mx-auto max-w-3xl px-8 pb-14 pt-36 text-center sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: SAGE }} {...editCopy(content, `${keyBase}_kicker`, kicker)} />
        <h1 style={{ ...serif, color: TAUPE }} className="mt-4 text-4xl font-medium sm:text-5xl" {...editCopy(content, `${keyBase}_title`, title)} />
        {lead && <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.8] text-neutral-600" {...editCopy(content, `${keyBase}_lead`, lead)} />}
      </div>
    </section>
  );

  // ---- TREATMENTS / SERVICES (full price list) ----
  if (page === "services") {
    return shell(
      <>
        {banner("svc_banner", "Our treatments", "Treatments & prices", "Explore our full range of treatments, from injectables and skincare to dermatology and aesthetic facials.")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h3 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: TAUPE }} className="mb-6 border-b border-neutral-200 pb-3 text-2xl">{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-7">
                      {catg.category && <h4 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{catg.category}</h4>}
                      <ul className="divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: SAGE }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-neutral-500">Our treatment list is coming soon.</p>}
          <div className="mt-16 text-center">
            <a href={book} className="inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: SAGE }} {...editCopy(content, "svc_book_cta", "Book a consultation")} />
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / BOOK ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("book_banner", "Appointments", "Book a consultation", "Tell us what you are looking for and when suits you. We will be in touch to confirm and answer any questions before your visit.")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <LineaBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("contact_banner", "Get in touch", "Visit the clinic")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: TAUPE }} className="text-2xl" {...editCopy(content, "contact_find_heading", "Find us")} />
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: TAUPE, color: TAUPE }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Questions about a treatment or anything else? We would love to hear from you."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: "#e6e2da", heading: TAUPE, button: SAGE, buttonText: "#ffffff", fieldBorder: "#d8d4cc", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("about_banner", "About us", "Bespoke care, expert hands")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
        </section>

        {/* Practitioners / team */}
        {team.length > 0 && (
          <section style={{ background: CREAM }} className="border-t border-black/5">
            <div className="mx-auto max-w-6xl px-8 py-20">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: SAGE }} {...editCopy(content, "about_team_eyebrow", "The team")} />
                <h2 style={{ ...serif, color: TAUPE }} className="mt-4 text-3xl font-medium sm:text-4xl" {...editCopy(content, "about_team_heading", "Meet our practitioners")} />
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto aspect-[3/4] w-full max-w-[16rem] overflow-hidden bg-neutral-200">
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p data-edit={`team:${m.id}:name`} style={{ ...serif, color: TAUPE }} className="mt-5 text-lg">{m.name}</p>
                    {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="mt-0.5 text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ accordion */}
        <section className="mx-auto max-w-3xl px-8 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: SAGE }} {...editCopy(content, "about_faq_eyebrow", "Good to know")} />
            <h2 style={{ ...serif, color: TAUPE }} className="mt-4 text-3xl font-medium sm:text-4xl" {...editCopy(content, "about_faq_heading", "Frequently asked questions")} />
          </div>
          <div className="mt-12">
            <LineaFaq items={FALLBACK_FAQ} />
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("gallery_banner", "Our work", "Before & after")}
        {gallery.length >= 2 && (
          <section className="px-8 pb-4 pt-16">
            <LineaBeforeAfter images={gallery} />
            <p className="mt-6 text-center text-xs text-neutral-400">Results may vary from person to person.</p>
          </section>
        )}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — warm photo (or looping video), text overlaid on the LEFT */}
      <section className="relative isolate flex min-h-[88vh] flex-col justify-center overflow-hidden">
        {heroVideo ? (
          <video src={heroVideo} poster={hero} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#cdbfae] to-[#8d7d6c]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-6xl px-8 pt-24">
          <div className="max-w-xl text-white">
            {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{content.tagline}</p>}
            <h1 style={serif} className="mt-5 text-4xl font-medium leading-[1.15] [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl" {...editCopy(content, "hero_headline", "Bespoke skincare treatments from professional experts")} />
            <a href={book} style={{ background: SAGE }} className="mt-9 inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white shadow-2xl transition hover:opacity-90" {...editCopy(content, "hero_book_cta", "Book now")} />
          </div>
        </div>
      </section>

      {/* intro — short welcome (teaser, not the full about page) */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-8 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: SAGE }} {...editCopy(content, "home_welcome_eyebrow", "Welcome")} />
          <p data-edit="content.about" className="mt-6 text-[18px] leading-[1.9] text-neutral-700">{content.about}</p>
        </section>
      )}

      {/* Our Treatments — photo-card grid with LEARN MORE buttons (teaser → full list) */}
      {treatmentTiles.length > 0 && (
        <section style={{ background: CREAM }} className="border-y border-black/5">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="text-center">
              <h2 style={{ ...serif, color: TAUPE }} className="text-3xl font-medium sm:text-4xl" {...editCopy(content, "home_treatments_heading", "Our treatments")} />
              <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.8] text-neutral-600" {...editCopy(content, "home_treatments_blurb", "Explore our full range of treatments, including aesthetic wellness, dermatology and aesthetic facials. We also offer specialist holistic and nutritional support.")} />
            </div>
            <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
              {treatmentTiles.map((item, i) => {
                const img = gallery[i % Math.max(gallery.length, 1)]?.image_url;
                return (
                  <div key={item.id} className="text-center">
                    <div className="aspect-square w-full overflow-hidden bg-neutral-200">
                      {img ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={img} alt="" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-[#cdbfae] to-[#8d7d6c]" />
                      )}
                    </div>
                    <h3 data-edit={`item:${item.id}:name`} style={{ ...serif, color: TAUPE }} className="mt-6 text-xl">{item.name}</h3>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mx-auto mt-3 max-w-[18rem] text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                    {item.price && <p data-edit={`item:${item.id}:price`} className="mt-3 text-sm font-semibold" style={{ color: SAGE }}>{item.price}</p>}
                    <a href={href("services")} className="mt-5 inline-flex px-6 py-2.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: SAGE }} {...editCopy(content, "home_treatment_card_cta", "Learn more")} />
                  </div>
                );
              })}
            </div>
            <div className="mt-16 text-center">
              <a href={href("services")} className="inline-flex border px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: TAUPE, color: TAUPE }} {...editCopy(content, "home_treatments_link", "View all treatments")} />
            </div>
          </div>
        </section>
      )}

      {/* stats / trust numbers band */}
      <section className="mx-auto max-w-5xl px-8 py-20">
        <div className="grid gap-10 text-center sm:grid-cols-3">
          {[
            { n: "15+", l: "Years of expertise" },
            { n: "30+", l: "Treatments offered" },
            { n: "5★", l: "Rated by our clients" },
          ].map((s) => (
            <div key={s.l}>
              <p style={{ ...serif, color: TAUPE }} className="text-5xl font-medium">{s.n}</p>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-500">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* before & after slider (from gallery) */}
      {gallery.length >= 2 && (
        <section style={{ background: MIST }} className="border-y border-black/5">
          <div className="mx-auto max-w-6xl px-8 py-24 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: SAGE }} {...editCopy(content, "home_results_eyebrow", "Real results")} />
            <h2 style={{ ...serif, color: TAUPE }} className="mt-4 text-3xl font-medium sm:text-4xl" {...editCopy(content, "home_results_heading", "Before & after")} />
            <div className="mt-12">
              <LineaBeforeAfter images={gallery} />
            </div>
            <p className="mt-6 text-xs text-neutral-400">Results may vary from person to person.</p>
          </div>
        </section>
      )}

      {/* reviews carousel */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: SAGE }} {...editCopy(content, "home_reviews_eyebrow", "Reviews")} />
        </div>
        <div className="mt-10">
          <LineaReviews reviews={reviews} />
        </div>
      </section>

      {/* Skincare store split — sage panel + product image */}
      <section style={{ background: MIST }}>
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 lg:grid-cols-2">
          <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200 lg:aspect-auto">
            {gallery[0]?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt="" className="h-full w-full object-cover" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={hero} alt="" className="h-full w-full object-cover" />
            ) : <div className="h-full w-full bg-gradient-to-br from-[#cdbfae] to-[#8d7d6c]" />}
          </div>
          <div className="flex flex-col justify-center px-8 py-16 sm:px-14">
            <h2 style={{ ...serif, color: TAUPE }} className="text-3xl font-medium sm:text-4xl" {...editCopy(content, "store_heading", "Skincare store")} />
            <p className="mt-5 text-[15px] leading-[1.9] text-neutral-600" {...editCopy(content, "store_blurb", "Discover our range of professional products, designed to enhance the effects of your in-clinic treatments and support daily skin health and protection against the environment.")} />
            <a href={href("contact")} className="mt-8 inline-flex w-fit px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: SAGE }} {...editCopy(content, "store_cta", "Ask about products")} />
          </div>
        </div>
      </section>

      {/* Blog / insights grid */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <h2 style={{ ...serif, color: TAUPE }} className="text-3xl font-medium sm:text-4xl" {...editCopy(content, "insights_heading", "Insights")} />
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-[1.8] text-neutral-600" {...editCopy(content, "insights_blurb", "Keep up to date with our clinic, advice and skincare news.")} />
        </div>
        <div className="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {FALLBACK_INSIGHTS.map((post, i) => {
            const img = gallery[(i + 1) % Math.max(gallery.length, 1)]?.image_url;
            return (
              <article key={post.title} className="text-left">
                <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
                  {img ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img loading="lazy" decoding="async" src={img} alt="" className="h-full w-full object-cover" />
                  ) : <div className="h-full w-full bg-gradient-to-br from-[#cdbfae] to-[#8d7d6c]" />}
                </div>
                <h3 style={{ ...serif, color: TAUPE }} className="mt-5 text-xl leading-snug">{post.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">{post.blurb}</p>
                <a href={href("about")} className="mt-4 inline-flex text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: SAGE }} {...editCopy(content, "insights_card_link", "Read more")} />
              </article>
            );
          })}
        </div>
      </section>

      {/* Book a consultation split */}
      <section style={{ background: CREAM }} className="border-y border-black/5">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={{ ...serif, color: TAUPE }} className="text-3xl font-medium sm:text-4xl" {...editCopy(content, "home_book_heading", "Book a consultation")} />
            <p className="mt-5 text-[15px] leading-[1.9] text-neutral-600" {...editCopy(content, "home_book_blurb", "Book a consultation with one of our expert clinicians. Choose your treatment and find the best way to achieve your aesthetic goals.")} />
            <a href={book} className="mt-8 inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: SAGE }} {...editCopy(content, "home_book_cta", "Book a consultation")} />
          </div>
          <div className="aspect-[4/3] w-full overflow-hidden bg-neutral-200">
            {gallery[1]?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[1].image_url} alt="" className="h-full w-full object-cover" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={hero} alt="" className="h-full w-full object-cover" />
            ) : <div className="h-full w-full bg-gradient-to-br from-[#cdbfae] to-[#8d7d6c]" />}
          </div>
        </div>
      </section>

      {/* newsletter signup band */}
      <section style={{ background: SAGE }} className="text-white">
        <div className="mx-auto max-w-3xl px-8 py-20 text-center">
          <h2 style={serif} className="text-3xl font-medium sm:text-4xl" {...editCopy(content, "newsletter_heading", "Sign up to our newsletter")} />
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.7] text-white/85" {...editCopy(content, "newsletter_blurb", "Skincare advice, clinic news and the occasional offer, straight to your inbox.")} />
          <LineaNewsletter tenantId={tenant.id} />
        </div>
      </section>
    </>,
    false,
  );
}
