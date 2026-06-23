import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AlignHeader } from "./AlignHeader";
import { AlignBooking } from "./AlignBooking";

// Align — a sleek, confident modern orthodontics & clear-aligner clinic (single
// venue). MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery /
// Consultation / Contact) under basePath, never scroll anchors. The teal/coral
// identity is baked; the tenant swaps in photography, copy, treatments,
// practitioners, hours and contact.
//
// Structural signature (shared with NO sibling): a bold deep-teal hero with a
// confident "Your best smile, on the way" headline and a clear-aligner tech
// feel; a "your aligner journey" 3-step timeline (assessment → plan → reveal);
// treatments grouped (Clear aligners / Braces / Retainers) as clean divider
// rows; a finance / 0% APR + free-consult trust strip; subtle alignment-grid
// and smile-arc motifs throughout.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const TEAL = "#0E6E6E";
const AQUA = "#BFE3DE";
const CORAL = "#F2856B";
const INK = "#1E2A2A";
const OFF = "#F6FAF9";

// Static design copy (no brand names, no lorem) — reviews, stats, FAQ and the
// journey/finance arrays are design data, not tenant data, so they live here.
const REVIEWS = [
  { quote: "I was nervous about treatment, but the 3D scan and clear plan made everything feel effortless. My aligners barely show.", author: "Verified patient" },
  { quote: "Twelve months and my smile is completely transformed. The team checked in at every step and the result is incredible.", author: "Verified patient" },
  { quote: "Honest advice, no pressure, and a finance plan that actually worked for my budget. I only wish I had started sooner.", author: "Verified patient" },
  { quote: "From consultation to reveal, the whole journey was calm and modern. The retainer aftercare has kept everything perfect.", author: "Verified patient" },
  { quote: "Confident, friendly and seriously good with technology. My braces were quicker and more comfortable than I expected.", author: "Verified patient" },
];

const STATS = [
  { value: "12k+", label: "Smiles aligned" },
  { value: "4.9", label: "Average patient rating" },
  { value: "6mo", label: "Average aligner time" },
  { value: "0%", label: "APR finance available" },
];

const JOURNEY = [
  { step: "01", title: "Assessment", note: "A free consultation and 3D digital scan map your bite and goals — no impressions, no guesswork." },
  { step: "02", title: "Your plan", note: "We design a custom treatment preview so you can see your future smile before you ever begin." },
  { step: "03", title: "The reveal", note: "Aligners or braces guide each tooth into place, with check-ins and retainers to keep it for life." },
];

const TRUST = [
  { title: "0% APR finance", note: "Spread the cost interest-free" },
  { title: "Free consultation", note: "No obligation smile assessment" },
  { title: "3D digital scanning", note: "Impression-free, precise plans" },
  { title: "GDC-registered team", note: "Specialist orthodontic care" },
];

const FAQ = [
  { q: "Clear aligners or braces — which is right for me?", a: "It depends on your bite and goals. Clear aligners are discreet and removable; modern braces can be faster for complex cases. Your consultation and 3D scan will show the best route for you, with honest pros and cons." },
  { q: "How long does treatment take?", a: "Many clear-aligner cases complete in six to twelve months, while more complex movements take longer. We will give you a clear, personalised timeline at your assessment before you commit to anything." },
  { q: "Do you offer finance?", a: "Yes. We offer 0% APR finance so you can spread the cost of treatment over manageable monthly payments. We will walk you through the options during your consultation." },
  { q: "Will I need to wear a retainer afterwards?", a: "Yes — retainers are essential to keep your new smile in place. They are included in our aftercare, and we will show you exactly how and when to wear them for lasting results." },
];

export default function AlignDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Consultation", href: href("reservations") },
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

  // Smile-arc mark, used as a quiet section motif.
  const SmileArc = ({ className = "", color = TEAL }: { className?: string; color?: string }) => (
    <svg className={className} width="64" height="22" viewBox="0 0 64 22" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" aria-hidden>
      <path d="M3 4c12 16 46 16 58 0" />
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: INK }} className="text-white/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          <SmileArc className="mt-5" color={CORAL} />
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: AQUA }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/70 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: AQUA }}>Visit us</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/70 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/70 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900" >
      <div style={{ background: OFF }}>
        <AlignHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Sub-page banner — a deep-teal band that clears the fixed header, with a
  // subtle alignment grid and a coral kicker dot.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section className="relative overflow-hidden" style={{ background: `linear-gradient(160deg, ${TEAL} 0%, #0a5757 100%)` }}>
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        aria-hidden
        style={{
          backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-32 text-center sm:pt-40">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.28em] text-white/85">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} />{kicker}
        </p>
        <h1 style={serif} className="mt-4 text-4xl font-medium text-white sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/75">{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "Aligners, braces & retainers", "Browse our full range of orthodontic treatments. Every plan begins with a free consultation and 3D digital scan.")}
        <section className="mx-auto max-w-5xl px-6 py-20" style={{ background: OFF }}>
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={serif} className="text-2xl" >{section.section}</h2>}
                  <div className="mt-6 space-y-10">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <div className="flex items-center gap-3">
                            <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }}>{catg.category}</h3>
                            <span className="h-px flex-1" style={{ background: AQUA }} />
                          </div>
                        )}
                        <ul className="mt-3 divide-y" style={{ borderColor: "rgba(14,110,110,0.12)" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: INK }}>{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: CORAL }}>{item.price}</span>}
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

          <div className="mt-16 overflow-hidden rounded-3xl px-8 py-12 text-center" style={{ background: AQUA }}>
            <SmileArc className="mx-auto" color={TEAL} />
            <h3 className="mt-4 text-2xl" style={{ ...serif, color: INK }}>Not sure where to start?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "rgba(30,42,42,0.75)" }}>Book a free consultation and 3D scan. We will show you your future smile before you decide.</p>
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: TEAL, color: "#fff" }}>Book a consultation</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Modern orthodontics, done with confidence")}
        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: OFF }}>
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          ) : <p className="text-neutral-500">Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl" style={{ ...serif, color: TEAL }}>{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className="border-t" style={{ background: "#fff", borderColor: "rgba(14,110,110,0.12)" }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: CORAL }}>Our team</p>
                <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Meet your orthodontists</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-[2rem]" style={{ background: AQUA }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p data-edit={`team:${m.id}:name`} className="mt-5 text-lg font-medium" style={{ color: INK }}>{m.name}</p>
                    {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: OFF }}>
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: CORAL }}>Good to know</p>
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Common questions</h2>
          </div>
          <div className="mt-10 divide-y border-y" style={{ borderColor: "rgba(14,110,110,0.14)" }}>
            {FAQ.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="text-[15px] font-medium" style={{ color: INK }}>{it.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg leading-none text-white transition group-open:rotate-45" style={{ background: TEAL }} aria-hidden>+</span>
                </summary>
                <p className="mt-3 pr-12 text-sm leading-relaxed text-neutral-600">{it.a}</p>
              </details>
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
        {banner("Gallery", "Smiles & spaces", "Real transformations and a look inside our modern clinic.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16" style={{ background: OFF }}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-neutral-500" style={{ background: OFF }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- CONSULTATION (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Consultation", "Book your smile assessment", "Free, no obligation, and impression-free. Tell us a little about you and we will be in touch.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-16" style={{ background: OFF }}>
          <div>
            <h2 className="text-3xl" style={{ ...serif, color: INK }}>A confident, modern approach</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">Every journey starts with a 3D digital scan and an honest conversation. We will assess your bite, show you your future smile, and recommend only what is right for you — with clear pricing and 0% finance options.</p>
            <ul className="mt-7 space-y-3 text-sm text-neutral-700">
              {["Free, no obligation consultation", "Impression-free 3D scanning", "See your result before you start", "0% APR finance available"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] text-white" style={{ background: TEAL }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm text-neutral-600">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: CORAL }}>{content.phone}</a></p>
            )}
          </div>
          <AlignBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit us, call, or send a message and we will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16" style={{ background: OFF }}>
          <div>
            <h2 className="text-2xl" style={{ ...serif, color: INK }}>Clinic details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-neutral-700" style={{ borderColor: "rgba(14,110,110,0.16)" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90" style={{ background: TEAL }}>Get directions</a>
              )}
              <a href={book} className="inline-flex rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Book consult</a>
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-4" style={{ color: TEAL }}>
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
              contactBlurb="Questions about aligners, braces or anything else? We would love to hear from you."
              contactCta="Submit"
              theme={{ card: TEAL, cardBorder: TEAL, heading: "#ffffff", blurb: "rgba(255,255,255,0.85)", label: "rgba(255,255,255,0.85)", fieldBg: "rgba(255,255,255,0.12)", fieldBorder: "rgba(255,255,255,0.4)", fieldText: "#ffffff", button: CORAL, buttonText: INK, radius: "1rem", font: "var(--font-fraunces)" }}
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
    .slice(0, 3);

  return shell(
    <>
      {/* ---- HERO: bold deep-teal, confident headline, clear-aligner feel ---- */}
      <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden" style={{ background: `linear-gradient(155deg, ${TEAL} 0%, #0a5757 55%, #073f3f 100%)` }}>
        {/* alignment grid + glow */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.10]" aria-hidden style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="pointer-events-none absolute -right-32 -top-32 h-[34rem] w-[34rem] rounded-full opacity-30 blur-3xl" aria-hidden style={{ background: AQUA }} />
        <div className="relative mx-auto grid w-full max-w-6xl gap-12 px-6 pt-28 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pt-20">
          <div className="text-white">
            {content.tagline ? (
              <p data-edit="content.tagline" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/85"><span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} />{content.tagline}</p>
            ) : (
              <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.26em] text-white/85"><span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} />Modern orthodontics</p>
            )}
            <h1 style={serif} className="mt-5 text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-[4.4rem]">
              Your best smile,<br /><span style={{ color: AQUA }}>on the way.</span>
            </h1>
            <p data-edit="tenant.business_name" className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-white/70">{name}</p>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/80">Clear aligners and braces, planned in 3D and guided with confidence. See your future smile before you begin.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex rounded-full px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] shadow-xl transition hover:opacity-90" style={{ background: CORAL, color: INK }}>Book free consult</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border border-white/40 px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#0a5757]">View treatments</a>
              )}
            </div>
            <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium uppercase tracking-[0.14em] text-white/70">
              <span className="inline-flex items-center gap-2"><span style={{ color: CORAL }}>✦</span> 0% APR finance</span>
              <span className="inline-flex items-center gap-2"><span style={{ color: CORAL }}>✦</span> 3D scanning</span>
              <span className="inline-flex items-center gap-2"><span style={{ color: CORAL }}>✦</span> GDC registered</span>
            </div>
          </div>
          {/* hero media card */}
          <div className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/15 bg-white/5 shadow-2xl">
              {video ? (
                <video src={video} autoPlay muted loop playsInline poster={hero || undefined} className="absolute inset-0 h-full w-full object-cover" />
              ) : hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center" style={{ background: "rgba(191,227,222,0.15)" }}>
                  <SmileArc color="#fff" className="h-10 w-32" />
                </div>
              )}
            </div>
            {/* floating rating chip */}
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white px-5 py-3 shadow-xl">
              <p className="text-lg font-bold" style={{ color: TEAL }}>4.9★</p>
              <p className="text-[11px] uppercase tracking-[0.12em] text-neutral-500">Patient rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* ---- trust / finance strip ---- */}
      <section className="border-b" style={{ background: "#fff", borderColor: "rgba(14,110,110,0.12)" }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl" style={{ background: AQUA, color: TEAL }} aria-hidden>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </span>
              <div>
                <p className="text-sm font-semibold" style={{ color: INK }}>{t.title}</p>
                <p className="text-xs text-neutral-500">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- intro ---- */}
      {content.about && (
        <section className="px-6 py-20 text-center" style={{ background: OFF }}>
          <div className="mx-auto max-w-3xl">
            <SmileArc className="mx-auto" color={CORAL} />
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: TEAL }}>Welcome</p>
            <p data-edit="content.about" className="mt-5 text-[19px] leading-[1.9] text-neutral-700">{content.about}</p>
          </div>
        </section>
      )}

      {/* ---- ALIGNER JOURNEY timeline (structural signature) ---- */}
      <section className="relative overflow-hidden" style={{ background: INK }}>
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: CORAL }}>Your aligner journey</p>
            <h2 style={serif} className="mt-3 text-3xl text-white sm:text-4xl">Three steps to a confident smile</h2>
          </div>
          <div className="relative mt-16 grid gap-10 md:grid-cols-3">
            {/* connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px md:block" style={{ background: "linear-gradient(to right, transparent, rgba(191,227,222,0.5), transparent)" }} aria-hidden />
            {JOURNEY.map((j) => (
              <div key={j.step} className="relative text-center md:text-left">
                <span className="relative z-10 grid h-14 w-14 place-items-center rounded-full text-lg font-bold md:mx-0 mx-auto" style={{ background: CORAL, color: INK }}>{j.step}</span>
                <h3 style={serif} className="mt-5 text-xl text-white">{j.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{j.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-14 text-center">
            <a href={book} className="inline-flex rounded-full px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: AQUA, color: INK }}>Start your journey</a>
          </div>
        </div>
      </section>

      {/* ---- treatments teaser (grouped) → full treatments page ---- */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24" style={{ background: OFF }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: TEAL }}>Treatments</p>
              <h2 style={serif} className="mt-3 text-3xl sm:text-4xl">Built around your smile</h2>
            </div>
            <a href={href("services")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: CORAL }}>View all treatments →</a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {teaseCategories.map((c) => (
              <div key={c.label} className="rounded-3xl border bg-white p-7 transition hover:-translate-y-1 hover:shadow-[0_24px_60px_-30px_rgba(14,110,110,0.45)]" style={{ borderColor: "rgba(14,110,110,0.14)" }}>
                <span className="grid h-12 w-12 place-items-center rounded-2xl" style={{ background: AQUA, color: TEAL }} aria-hidden>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 9c2.5 5 13.5 5 16 0" /><path d="M7 13c1.5 2 8.5 2 10 0" opacity="0.6" /></svg>
                </span>
                <h3 className="mt-5 text-xl" style={{ ...serif, color: INK }}>{c.label}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-neutral-500">
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item.id} data-edit={`item:${item.id}:name`} className="flex items-center gap-2">
                      <span className="h-1 w-1 rounded-full" style={{ background: CORAL }} />{item.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- reviews ---- */}
      <section style={{ background: AQUA }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: TEAL }}>Patient stories</p>
            <h2 className="mt-3 text-3xl sm:text-4xl" style={{ ...serif, color: INK }}>Transformations they love</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r, idx) => (
              <figure key={idx} className="flex h-full flex-col rounded-3xl bg-white p-7 shadow-[0_18px_50px_-30px_rgba(14,110,110,0.5)]">
                <div className="flex gap-0.5" aria-hidden style={{ color: CORAL }}>
                  {Array.from({ length: 5 }).map((_, s) => <span key={s}>★</span>)}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-600">{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm font-semibold" style={{ color: TEAL }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- finance / free-consult CTA band ---- */}
      <section className="grid items-stretch lg:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-20 sm:px-12" style={{ background: `linear-gradient(150deg, ${TEAL}, #0a5757)` }}>
          <div className="pointer-events-none absolute inset-0 opacity-[0.10]" aria-hidden style={{ backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)", backgroundSize: "38px 38px" }} />
          <div className="relative text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.28em]" style={{ color: AQUA }}>Affordable from day one</p>
            <h2 style={serif} className="mt-4 text-3xl sm:text-4xl">0% APR finance & a free consultation</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/80">Spread the cost of your treatment interest-free, and start with a no obligation 3D smile assessment. Confident care, on your terms.</p>
            <ul className="mt-6 space-y-2 text-sm text-white/85">
              {["Interest-free monthly plans", "No obligation, impression-free assessment", "Clear, fixed pricing"].map((t) => (
                <li key={t} className="flex items-start gap-2.5"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: CORAL }} />{t}</li>
              ))}
            </ul>
            <div className="mt-8">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.16em] transition hover:opacity-90" style={{ background: CORAL, color: INK }}>Book a consultation</a>
            </div>
          </div>
        </div>
        <div className="relative min-h-[340px] overflow-hidden bg-neutral-900 lg:min-h-0">
          {gallery[0]?.image_url || hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0]?.image_url || hero!} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: AQUA }} />
          )}
          <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(14,110,110,0.45), transparent)" }} />
        </div>
      </section>

      {/* ---- booking band: portrait + teal booking panel ---- */}
      <section className="grid items-stretch lg:grid-cols-2" style={{ background: OFF }}>
        <div className="relative min-h-[380px] overflow-hidden bg-neutral-200">
          {gallery[1]?.image_url || hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[1]?.image_url || hero!} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 grid place-items-center" style={{ background: AQUA }}><SmileArc color={TEAL} className="h-12 w-40" /></div>
          )}
        </div>
        <div className="px-6 py-14 sm:px-10">
          {bookingOn ? (
            <AlignBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="flex h-full flex-col justify-center rounded-3xl px-8 py-14" style={{ background: TEAL }}>
              <h3 style={serif} className="text-2xl text-white">Get in touch</h3>
              {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-white/90">{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-white/90">{content.email}</a>}
              <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: CORAL, color: INK }}>Contact us</a>
            </div>
          )}
        </div>
      </section>

      {/* ---- details band: address + map + hours ---- */}
      <section className="border-t" style={{ background: "#fff", borderColor: "rgba(14,110,110,0.12)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CORAL }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: TEAL }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CORAL }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-neutral-500">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: CORAL }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: TEAL, color: "#fff" }}>Book consult</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
