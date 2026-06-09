import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LuminaHeader } from "./LuminaHeader";
import { LuminaBooking } from "./LuminaBooking";
import { LuminaReviews, LuminaTeamSlider, type Review } from "./LuminaCarousels";

// Lumina — a clinical, science-forward aesthetics-clinic design (single venue),
// MULTI-PAGE: the nav opens real routes (Treatments / About / Results /
// Consultation / Visit) under basePath, never scroll anchors. Each page is its
// own layout; the sticky header and rose footer are shared. Palette is baked
// (warm ivory, soft rose, deep plum accent, near-black ink); the tenant swaps in
// their own photography, copy, treatment menu, practitioners, hours and address.
//
// Reference structure recreated in depth: centred-wordmark sticky header; split
// hero (claim + dual CTA + portrait collage); press-logo strip; intro story with
// portrait and a Google-style review carousel; FACE / BODY / INJECTABLES
// category cards; a "why us" feature/stats grid; a free-consultation CTA band; a
// press/trust quote with star rating; an "Our experts" team slider; a rose
// newsletter/CTA band; a trust-badge footer with addresses and socials.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#26201c";
const PLUM = "#7a4f63";
const ROSE = "#e9d6cf";
const ROSE_SOFT = "#f3e7e1";
const IVORY = "#fbf7f4";

const REVIEWS: Review[] = [
  { quote: "From the first consultation I felt completely at ease. Honest advice, no pressure, and results that look like the very best version of me.", author: "Verified client" },
  { quote: "The team here are true experts. They explained every option and the outcome was natural and beautifully done.", author: "Verified client" },
  { quote: "A calm, spotless clinic with staff who genuinely care. I would not go anywhere else now.", author: "Verified client" },
  { quote: "Years of skin concerns sorted with a clear, gentle plan. I finally feel confident in my own skin.", author: "Verified client" },
  { quote: "Professional, friendly and incredibly knowledgeable. The whole experience felt safe and considered.", author: "Verified client" },
];

const PRESS = ["The Daily", "Style Edit", "Beauty Journal", "Wellness Weekly", "City Life", "The Review"];

// Plain inline icons for the "why us" feature grid (no brand assets).
function FeatureIcon({ kind }: { kind: string }) {
  const common = { width: 28, height: 28, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (kind === "experts") return <svg {...common}><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-6 8-6s8 2 8 6" /></svg>;
  if (kind === "choice") return <svg {...common}><path d="M4 7h16M4 12h16M4 17h10" /></svg>;
  if (kind === "safety") return <svg {...common}><path d="M12 3l7 3v5c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" /><path d="M9 12l2 2 4-4" /></svg>;
  return <svg {...common}><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" /></svg>;
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

export default function LuminaDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.booking_url || content.reservation_url || href("contact");

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Results", href: href("gallery") },
    bookingOn && { label: "Consultation", href: href("reservations") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (trust-badge style) ----
  const footer = (
    <footer style={{ background: ROSE_SOFT }} className="text-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-xl tracking-[0.18em]" >{name.toUpperCase()}</p>
          {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-neutral-600">{content.address}</p>}
          <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4 text-neutral-700">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: PLUM }}>Explore</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
            {([
              groups.length > 0 && { label: "Treatments", href: href("services") },
              content.about && { label: "About the clinic", href: href("about") },
              gallery.length > 0 && { label: "Results", href: href("gallery") },
              bookingOn && { label: "Book a consultation", href: href("reservations") },
              { label: "Visit us", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-neutral-950">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: PLUM }}>Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-neutral-700">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-neutral-500">By appointment.</p>}
          <div className="mt-6 inline-flex items-center gap-2 border px-4 py-2.5 text-xs" style={{ borderColor: ROSE, color: INK }}>
            <span className="inline-block h-2 w-2 rounded-full" style={{ background: "#3aa657" }} />
            Registered, insured &amp; clinically led
          </div>
        </div>
      </div>
      <div className="border-t" style={{ borderColor: ROSE }}>
        <p className="mx-auto max-w-6xl px-8 py-6 text-xs text-neutral-500">© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <LuminaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: IVORY, borderColor: ROSE }} className="border-b">
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 text-center sm:pt-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl" >{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-neutral-600">{blurb}</p>}
      </div>
    </section>
  );

  // ---- TREATMENTS (full menu, grouped, with prices) ----
  if (page === "services") {
    return shell(
      <>
        {banner("Our treatments", "Treatments & prices", "Personalised, results-driven treatments across face, body and injectables, each preceded by a thorough consultation.")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 style={serif} className="text-2xl font-medium" >{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{catg.category}</h3>}
                      <ul className="divide-y" style={{ borderColor: ROSE }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 border-b py-5" style={{ borderColor: ROSE }}>
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="text-[17px] font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-[15px] font-semibold" style={{ color: PLUM }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="pt-4 text-center">
                <a href={book} className="inline-flex px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: PLUM }}>Book a free consultation</a>
              </div>
            </div>
          ) : <p className="text-neutral-500">Our treatment menu is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- CONSULTATION (booking widget) ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Consultation", "Book a free consultation", "Every treatment begins with a relaxed, no-pressure consultation so we can tailor a plan to you.")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <LuminaBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- VISIT / CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Find the clinic")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={serif} className="text-2xl font-medium" >Getting here</h2>
            <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-neutral-700" style={{ borderColor: ROSE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a note"
                contactBlurb="Questions about a treatment or anything else? We will get back to you."
                contactCta="Send enquiry"
                theme={{ cardBorder: ROSE, heading: INK, button: PLUM, buttonText: "#ffffff", fieldBorder: "#d8ccc4", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("About the clinic", "Beauty with depth")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {[
              { k: "experts", t: "Led by experts", d: "Our doctors, nurses and aestheticians are hand picked specialists." },
              { k: "safety", t: "Clinically safe", d: "Registered, insured and held to the highest clinical standards." },
              { k: "care", t: "Honest care", d: "Tailored plans and visible, natural results in calm surroundings." },
            ].map((f) => (
              <div key={f.k}>
                <span style={{ color: PLUM }}><FeatureIcon kind={f.k} /></span>
                <h3 className="mt-3 text-[15px] font-semibold" style={{ color: INK }}>{f.t}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{f.d}</p>
              </div>
            ))}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESULTS / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Results", "Before & after", "A selection of real results from treatments at the clinic.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-8 py-16">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // =========================== HOME ===========================
  return shell(
    <>
      {/* hero — split: claim + dual CTA / portrait media (video or image) */}
      <section style={{ background: IVORY }} className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-8 pb-16 pt-32 sm:pt-40 lg:grid-cols-2 lg:gap-16 lg:pb-24">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>Aesthetics &amp; skin clinic</p>
            {content.tagline ? (
              <h1 data-edit="content.tagline" style={serif} className="mt-5 text-4xl font-medium leading-[1.1] text-neutral-900 sm:text-5xl lg:text-6xl">{content.tagline}</h1>
            ) : (
              <h1 style={serif} className="mt-5 text-4xl font-medium leading-[1.1] text-neutral-900 sm:text-5xl lg:text-6xl">Multi-award winning cosmetic &amp; aesthetic clinic</h1>
            )}
            {content.about && <p data-edit="content.about" className="mt-6 max-w-md text-[16px] leading-relaxed text-neutral-600">{content.about}</p>}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={book} className="inline-flex items-center justify-center px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: PLUM }}>Book a free consultation</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex items-center justify-center border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Our treatments</a>
              )}
            </div>
          </div>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-200 lg:aspect-auto lg:h-[34rem]">
            {heroVideo ? (
              <video src={heroVideo} autoPlay muted loop playsInline poster={hero} className="absolute inset-0 h-full w-full object-cover" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${ROSE}, ${PLUM})` }} />
            )}
          </div>
        </div>
      </section>

      {/* press / as-seen-in logo strip */}
      <section className="border-y" style={{ borderColor: ROSE, background: "#ffffff" }}>
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-8 py-7">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-neutral-400">As seen in</span>
          {PRESS.map((p) => (
            <span key={p} style={serif} className="text-lg text-neutral-400">{p}</span>
          ))}
        </div>
      </section>

      {/* intro story + portrait + reviews carousel */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>Welcome</p>
            <h2 style={serif} className="mt-4 text-3xl font-medium leading-snug sm:text-4xl">A clinic where science meets a softer touch</h2>
            <p className="mt-6 text-[16px] leading-[1.9] text-neutral-600">
              {content.cuisine_type ?? "Our team of doctors, nurses and aestheticians offer advanced, evidence-led treatments using the latest technology. Every plan starts with an honest consultation, so the results always look like the very best version of you."}
            </p>
            <a href={content.about ? href("about") : book} className="mt-7 inline-flex text-[12px] font-semibold uppercase tracking-[0.2em]" style={{ color: PLUM }}>Read our story &#8594;</a>
          </div>
          <div className="relative aspect-[5/4] w-full overflow-hidden bg-neutral-200">
            {gallery[0]?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="absolute inset-0 h-full w-full object-cover" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: ROSE }} />
            )}
          </div>
        </div>

        <div className="mt-20">
          <div className="mb-10 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>What our clients say</p>
            <h3 style={serif} className="mt-3 text-2xl font-medium sm:text-3xl">Rated excellent by those who matter most</h3>
          </div>
          <LuminaReviews reviews={REVIEWS} />
        </div>
      </section>

      {/* treatment categories (FACE / BODY / INJECTABLES) */}
      {groups.length > 0 && (
        <section style={{ background: ROSE_SOFT }} className="py-24">
          <div className="mx-auto max-w-6xl px-8">
            <div className="grid gap-2 md:grid-cols-3">
              {groups.slice(0, 3).map((g, idx) => {
                const img = gallery[idx + 1]?.image_url ?? gallery[idx]?.image_url;
                return (
                  <a key={g.section ?? idx} href={href("services")} className="group relative block aspect-[3/4] overflow-hidden bg-neutral-300">
                    {img ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${ROSE}, ${PLUM})` }} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                      <h3 style={serif} className="text-2xl">{g.section ?? "Treatments"}</h3>
                      <span className="mt-3 inline-flex text-[11px] font-semibold uppercase tracking-[0.22em]">Find out more &#8594;</span>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* why us — feature / stats grid */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>Why choose us</p>
          <h2 style={serif} className="mt-3 text-3xl font-medium sm:text-4xl">Expertise you can trust</h2>
        </div>
        <div className="mt-14 grid gap-x-12 gap-y-12 sm:grid-cols-2">
          {[
            { k: "experts", t: "Experts", d: "Our team of doctors, nurses and aestheticians are hand picked specialists, founders and leaders with years of experience." },
            { k: "choice", t: "Choice", d: "A comprehensive range of treatments and products designed to address every skin and body concern under one roof." },
            { k: "safety", t: "Safety", d: "We thoroughly evaluate every technology and product before introducing it, so you only ever receive the best." },
            { k: "care", t: "Personal attention", d: "Every treatment is tailored to you, with honest advice and a calm, considered plan. No pressure, ever." },
          ].map((f) => (
            <div key={f.k} className="flex gap-5">
              <span className="mt-0.5 shrink-0" style={{ color: PLUM }}><FeatureIcon kind={f.k} /></span>
              <div>
                <h3 className="text-lg font-semibold" style={{ color: INK }}>{f.t}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-neutral-600">{f.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* free-consultation CTA band */}
      <section style={{ background: INK }} className="text-center text-white">
        <div className="mx-auto max-w-2xl px-8 py-20">
          <h2 style={serif} className="text-3xl font-medium sm:text-4xl">Ready to begin?</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">Book a complimentary consultation and we will design a plan that is right for you.</p>
          <a href={book} className="mt-8 inline-flex px-10 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: "#ffffff", color: INK }}>Book a free consultation</a>
        </div>
      </section>

      {/* press / trust quote with star rating */}
      <section className="mx-auto max-w-4xl px-8 py-24 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>Most trusted</p>
        <div className="mt-5 flex justify-center gap-1.5 text-lg" style={{ color: PLUM }} aria-hidden>
          {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
        </div>
        <blockquote style={serif} className="mt-6 text-2xl leading-relaxed text-neutral-800 sm:text-3xl">
          &ldquo;A clinic regularly named among the most trusted for results, safety and care, with a loyal following that keeps returning.&rdquo;
        </blockquote>
        <p className="mt-6 text-[12px] font-semibold uppercase tracking-[0.22em] text-neutral-400">The national press</p>
      </section>

      {/* our experts — team slider */}
      {team.length > 0 && (
        <section style={{ background: IVORY }} className="border-y py-24" >
          <div className="mx-auto max-w-6xl px-8">
            <div className="mb-12 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: PLUM }}>Our experts</p>
              <h2 style={serif} className="mt-3 text-3xl font-medium sm:text-4xl">Hand picked top specialists</h2>
            </div>
            <LuminaTeamSlider team={team} />
          </div>
        </section>
      )}

      {/* rose newsletter / CTA band */}
      <section style={{ background: ROSE_SOFT }} className="text-center">
        <div className="mx-auto max-w-2xl px-8 py-20">
          <h2 style={serif} className="text-2xl font-medium sm:text-3xl">Begin your journey with us</h2>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-neutral-600">Speak to our team about the right treatment for you. Every consultation is complimentary and completely no-pressure.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a href={book} className="inline-flex items-center justify-center px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: PLUM }}>Book a consultation</a>
            <a href={href("contact")} className="inline-flex items-center justify-center border px-8 py-4 text-[12px] font-semibold uppercase tracking-[0.22em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Get in touch</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
