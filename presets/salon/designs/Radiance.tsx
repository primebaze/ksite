import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { RadianceHeader } from "./RadianceHeader";
import { RadianceBooking } from "./RadianceBooking";
import { RadianceTestimonials, RadianceCommunitySlider } from "./RadianceCarousels";
import { RadianceFaq } from "./RadianceFaq";

// Radiance — doctor-led aesthetics & wellness clinic design (single venue),
// MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery / Book /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the sticky forest-green header and detailed cream footer are shared. Palette
// is baked (deep forest green / warm cream / soft gold / black award badge);
// the tenant swaps in their own photography, video, copy, treatments, hours and
// contact. Faithful to the reference's section order and density.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GREEN = "#2f4a3c";
const GOLD = "#a98b54";
const CREAM = "#f4f0e8";
const SAND = "#faf8f3";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// Small black award badge with a gold star, recreated in CSS (no brand asset).
function AwardBadge({ label }: { label: string }) {
  return (
    <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-[#161616] text-center text-white" style={{ border: `2px solid ${GOLD}` }}>
      <span style={{ color: GOLD }} className="text-lg leading-none">&#9733;</span>
      <span className="mt-1 px-2 text-[8px] font-semibold uppercase leading-tight tracking-[0.12em]">{label}</span>
    </div>
  );
}

export default function RadianceDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const allItems = groups.flatMap((s) => s.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.booking_url || content.reservation_url || href("contact");
  const bookExternal = !bookingOn && (content.booking_url || content.reservation_url);

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer (mailing list + navigation + contact + location/hours) ----
  const footer = (
    <footer style={{ background: CREAM }} className="text-neutral-800">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr]">
        <div>
          <h4 style={serif} className="text-2xl" >Join our mailing list</h4>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">Stay in the know. Sign up for expert skincare advice, clinic news and exclusive offers.</p>
          {contactOn && (
            <div className="mt-6">
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Email address"
                contactBlurb="We will only send what is worth your time."
                contactCta="Submit"
                theme={{ card: SAND, cardBorder: "#e4ddcd", heading: GREEN, button: GREEN, buttonText: "#ffffff", fieldBg: "#ffffff", fieldBorder: "#d8d2c6", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-7 flex gap-4" style={{ color: GREEN }}>
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Navigation</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-neutral-700">
            {([
              groups.length > 0 && { label: "Treatments", href: href("services") },
              content.about && { label: "About", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Book a consultation", href: href("reservations") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-neutral-950">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Contact</h4>
          <div className="mt-5 space-y-2.5 text-sm text-neutral-700">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">TEL: {content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">EMAIL: {content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Location</h4>
          {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
          {content.hours && content.hours.length > 0 && (
            <ul className="mt-5 space-y-1.5 text-sm text-neutral-700">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`} className="font-semibold">{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* accreditation trust mark (CSS, no brand asset) */}
      <div className="flex justify-center pb-12">
        <div className="flex items-center gap-3" style={{ color: GREEN }}>
          <span className="flex h-12 w-12 items-center justify-center rounded-full text-2xl" style={{ background: GREEN, color: "#fff", fontFamily: "var(--font-fraunces)" }}>Q</span>
          <span style={serif} className="text-xl leading-tight">Care Quality<br />Commission</span>
        </div>
      </div>
      <div className="border-t border-black/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-8 py-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href={href("contact")} className="hover:text-neutral-800">Terms &amp; Conditions</a>
            <a href={href("contact")} className="hover:text-neutral-800">Privacy Policy</a>
            <a href={href("contact")} className="hover:text-neutral-800">Complaints Policy</a>
            <a href={href("contact")} className="hover:text-neutral-800">Safety and Quality</a>
          </div>
          <p>Copyright {new Date().getFullYear()} {name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <RadianceHeader name={name} book={book} links={nav} home={href("home")} bookLabel="Book now" solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Forest-green page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: GREEN }} className="text-white">
      <div className="mx-auto max-w-5xl px-8 pb-16 pt-32 text-center sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mx-auto mt-4 max-w-3xl text-4xl font-medium sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75">{blurb}</p>}
      </div>
    </section>
  );

  // ---- TREATMENTS (services) ----
  if (page === "services") {
    return shell(
      <>
        {banner("The treatments", "Treatments & prices", "Unrivalled aesthetics, advised and delivered by our doctor-led team. Browse our treatment menu and request a consultation when you are ready.")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 className="border-b pb-4 text-3xl" style={{ ...serif, borderColor: "#e4ddcd", color: GREEN }}>{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</h3>}
                      <ul className="divide-y divide-[#ece6d8]">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="text-lg" style={{ ...serif, color: GREEN }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="pt-4 text-center">
                <a href={book} className="inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GREEN }}>Book a consultation</a>
              </div>
            </div>
          ) : <p className="text-neutral-500">Our treatment menu is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / BOOK ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book", "Book your appointment", "Before your treatments begin, a crucial step awaits, your consultation. Tell us what you are looking for and our team will be in touch to confirm a time that works for you.")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <RadianceBooking tenantId={tenant.id} name={name} treatments={allItems.slice(0, 24).map((i) => i.name)} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Questions about a treatment, pricing or your suitability? Our team is here to help.")}
        <section className="mx-auto grid max-w-6xl gap-14 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 className="text-2xl" style={{ ...serif, color: GREEN }}>Visit the clinic</h2>
            <div className="mt-6 space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-neutral-700" style={{ borderColor: "#e4ddcd" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`} className="font-semibold">{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:bg-[#2f4a3c] hover:text-white" style={{ borderColor: GREEN, color: GREEN }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Tell us how we can help and we will reply as soon as we can."
                contactCta="Send message"
                theme={{ card: SAND, cardBorder: "#e4ddcd", heading: GREEN, button: GREEN, buttonText: "#ffffff", fieldBg: "#ffffff", fieldBorder: "#d8d2c6", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("About", "The home of aesthetics and wellness")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <AwardBadge label="Aesthetic Award Winner" />
            <AwardBadge label="Diamond Award 2025" />
          </div>
          {team.length > 0 && (
            <div className="mt-16">
              <h2 className="text-center text-3xl" style={{ ...serif, color: GREEN }}>Meet the team</h2>
              <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full bg-neutral-100">
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-5 text-lg" style={{ ...serif, color: GREEN }}>{m.name}</p>
                    {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the clinic")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ============================= HOME =============================
  // Category cards from the top treatment sections.
  const categories = groups.slice(0, 3).map((s, idx) => ({
    label: s.section || ["Face", "Body & Wellness", "Injectables"][idx] || "Treatments",
    image: gallery[idx]?.image_url ?? hero,
  })).filter((c) => c.label);

  // Community slider tiles from gallery, falling back to hero.
  const sliderTiles = (gallery.length > 0 ? gallery : (hero ? [{ image_url: hero, caption: null }] : []))
    .slice(0, 8)
    .map((g, idx) => ({
      image: g.image_url,
      label: g.caption || allItems[idx]?.name || "Discover more",
      href: href("services"),
    }));

  // Testimonials derived from data with a graceful fallback.
  const reviews = [
    { quote: "From the consultation to the results, every step felt considered and genuinely expert. I have never felt more confident.", author: "Verified client" },
    { quote: "A calm, beautiful clinic with a team that truly listens. The results speak for themselves.", author: "Verified client" },
    { quote: "Professional, honest advice and natural, refined results. I would not go anywhere else.", author: "Verified client" },
  ];

  const faqs = [
    { q: "Do I need a consultation before treatment?", a: "Yes. Every treatment begins with a consultation so we can understand your goals, assess your suitability and recommend the right plan for you." },
    { q: "Are your practitioners medically qualified?", a: "Our clinic is doctor-led and our team holds the relevant medical and aesthetic qualifications. Your safety and care come first at every step." },
    { q: "How do I book?", a: "Request a consultation through our online form or call the clinic. We will confirm a time that suits you and answer any questions beforehand." },
  ];

  return shell(
    <>
      {/* announcement bar */}
      <div style={{ background: GREEN }} className="relative z-40 px-4 py-2.5 text-center text-[10px] font-semibold uppercase tracking-[0.25em] text-white sm:text-[11px]">
        {content.tagline ? <span data-edit="content.tagline">{content.tagline}</span> : "Doctor-led aesthetics and wellness. Book your consultation today."}
      </div>

      {/* hero: video (priority) or image, with headline, CTA and award badge */}
      <section className="relative isolate flex min-h-[88vh] flex-col overflow-hidden">
        {heroVideo ? (
          <video src={heroVideo} autoPlay muted loop playsInline poster={hero} className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#2f4a3c] to-[#1c2e25]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

        {/* award badge top-right */}
        <div className="absolute right-5 top-20 z-10 hidden sm:right-10 sm:top-28 sm:block">
          <div className="flex flex-col items-center gap-2 rounded-xl bg-[#161616]/85 px-6 py-5 text-center text-white backdrop-blur" style={{ border: `1px solid ${GOLD}55` }}>
            <span style={{ color: GOLD }} className="text-2xl leading-none">&#9733;</span>
            <span style={serif} className="text-lg leading-tight">Award<br />Winner</span>
            <span className="text-[9px] uppercase tracking-[0.2em] text-white/70">Aesthetics 2025</span>
          </div>
        </div>

        <div className="relative z-10 mt-auto max-w-2xl px-6 pb-20 sm:px-12 sm:pb-28">
          <h1 style={serif} className="text-4xl font-medium leading-[1.1] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl">
            The finest aesthetics and wellness clinic
          </h1>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">
            Unrivalled care for anti-wrinkle injections, dermal fillers and advanced laser treatments, delivered by a doctor-led team.
          </p>
          <a href={book} {...(bookExternal ? { target: "_blank", rel: "noreferrer" } : {})} className="mt-8 inline-flex bg-white px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] shadow-2xl transition hover:opacity-90" style={{ color: GREEN }}>Book a consultation</a>
        </div>
      </section>

      {/* category cards */}
      {categories.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-3">
          {categories.map((c) => (
            <a key={c.label} href={href("services")} className="group relative aspect-[3/4] overflow-hidden sm:aspect-[3/4]">
              {c.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={c.image} alt={c.label} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              ) : <div className="h-full w-full bg-neutral-200" />}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <span style={serif} className="absolute bottom-6 left-6 text-2xl text-white sm:text-3xl">{c.label}</span>
            </a>
          ))}
        </section>
      )}

      {/* press / partner logo strip (text wordmarks, no brand assets) */}
      <section className="border-b border-black/5 bg-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-8 py-10 text-center text-sm font-semibold uppercase tracking-[0.2em] text-neutral-400">
          {["Clinically led", "Medical grade", "Award winning", "Trusted care", "Premium results"].map((p) => (
            <span key={p}>{p}</span>
          ))}
        </div>
      </section>

      {/* clinic interior split */}
      <section style={{ background: SAND }}>
        <div className="mx-auto grid max-w-6xl items-center gap-0 lg:grid-cols-2">
          <div className="aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[28rem]">
            {gallery[3]?.image_url || hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[3]?.image_url ?? hero} alt="" className="h-full w-full object-cover" />
            ) : <div className="h-full w-full bg-neutral-200" />}
          </div>
          <div className="px-8 py-16 sm:px-14">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Our clinic</p>
            <h2 className="mt-4 text-3xl sm:text-4xl" style={{ ...serif, color: GREEN }}>The home of aesthetics and wellness</h2>
            {content.about ? (
              <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9] text-neutral-600">{content.about}</p>
            ) : (
              <p className="mt-6 text-[16px] leading-[1.9] text-neutral-600">Our profound expertise spans anti-wrinkle injections, dermal fillers, skin and laser treatments, making our clinic a leading destination for non-surgical beauty.</p>
            )}
            <div className="mt-8 flex gap-6">
              <AwardBadge label="Aesthetic Award Winner" />
              <AwardBadge label="Diamond Award 2025" />
            </div>
            <a href={href("about")} className="mt-8 inline-flex text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: GREEN }}>Read more &#8594;</a>
          </div>
        </div>
      </section>

      {/* stats / numbers band */}
      <section style={{ background: GREEN }} className="text-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-8 py-16 text-center sm:grid-cols-3">
          {[
            { n: allItems.length > 0 ? `${allItems.length}+` : "40+", l: "Treatments offered" },
            { n: "10,000+", l: "Happy clients" },
            { n: "5.0", l: "Average rating" },
          ].map((s) => (
            <div key={s.l}>
              <p className="text-5xl" style={{ ...serif, color: GOLD }}>{s.n}</p>
              <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/75">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* treatment highlights → links to full treatments page */}
      {allItems.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-5xl px-8 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>The treatments</p>
                <h2 className="mt-3 text-3xl sm:text-4xl" style={{ ...serif, color: GREEN }}>Must-have treatments</h2>
              </div>
              <a href={href("services")} className="text-sm font-semibold uppercase tracking-[0.15em]" style={{ color: GREEN }}>View all &#8594;</a>
            </div>
            <div className="mt-10 grid gap-x-14 gap-y-6 md:grid-cols-2">
              {allItems.slice(0, 6).map((item) => (
                <div key={item.id} className="border-b pb-4" style={{ borderColor: "#ece6d8" }}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span data-edit={`item:${item.id}:name`} className="text-lg" style={{ ...serif, color: GREEN }}>{item.name}</span>
                    {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
                  </div>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* booking band */}
      <section style={{ background: SAND }} className="text-center">
        <div className="mx-auto max-w-2xl px-8 py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Your visit</p>
          <h2 className="mt-4 text-3xl sm:text-4xl" style={{ ...serif, color: GREEN }}>Book your appointment</h2>
          <p className="mt-5 text-[15px] leading-relaxed text-neutral-600">Before your treatments begin, a crucial step awaits, your consultation. Our expert team will discuss your goals and recommend the right plan for you.</p>
          <a href={book} {...(bookExternal ? { target: "_blank", rel: "noreferrer" } : {})} className="mt-8 inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GREEN }}>Book now</a>
        </div>
      </section>

      {/* testimonial carousel */}
      <section style={{ background: GREEN }}>
        <div className="py-20">
          <RadianceTestimonials reviews={reviews} />
        </div>
      </section>

      {/* join our community image slider */}
      {sliderTiles.length > 0 && (
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-8 pt-20">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Join our community</p>
            <h2 className="mt-3 text-3xl sm:text-4xl" style={{ ...serif, color: GREEN }}>Follow the journey</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-neutral-600">A glimpse of our work, our space and the treatments our clients love most.</p>
          </div>
          <div className="mt-10">
            <RadianceCommunitySlider tiles={sliderTiles} />
          </div>
        </section>
      )}

      {/* FAQ accordion */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-8 py-20">
          <h2 className="text-center text-3xl sm:text-4xl" style={{ ...serif, color: GREEN }}>Questions, answered</h2>
          <div className="mt-10">
            <RadianceFaq items={faqs} />
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
