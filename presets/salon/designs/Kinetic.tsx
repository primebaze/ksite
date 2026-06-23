import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { KineticHeader } from "./KineticHeader";
import { KineticBooking } from "./KineticBooking";

// Kinetic — an energetic sports physiotherapy, injury-rehab & performance clinic
// (single venue). MULTI-PAGE: the nav opens real routes (Services / About /
// Gallery / Book / Contact) under basePath, never scroll anchors. The sticky
// navy header and footer are shared. Palette is baked athletic navy + electric
// lime with a signal-orange accent; the tenant swaps in their own photography,
// copy, treatments, practitioners, hours and contact.
//
// Structural signature (shares nothing with the calm beauty siblings): a dark
// athletic hero with a "Move better. Recover faster." headline, a numbered
// recovery pathway (assess → treat → strengthen → perform), kinetic pulse-line
// motifs, a stats bar, a "what we treat" tag list, services as clean divider
// rows grouped by discipline, and a navy booking band.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const NAVY = "#122036";
const NAVY_2 = "#0d1828";
const LIME = "#C6F24E";
const SLATE = "#44505F";
const WHITE = "#F4F6F8";
const ORANGE = "#F2693C";

// --- static design copy (no brand names, no lorem) ---
const PATHWAY = [
  { n: "01", title: "Assess", note: "A hands-on movement screen to find the real source of the problem, not just the symptom." },
  { n: "02", title: "Treat", note: "Targeted manual therapy and pain relief to settle things down and get you moving again." },
  { n: "03", title: "Strengthen", note: "A progressive loading plan that rebuilds capacity and bullet-proofs the injured area." },
  { n: "04", title: "Perform", note: "Return-to-sport testing and conditioning so you come back stronger than before." },
];

const STATS = [
  { value: "25k+", label: "Sessions delivered" },
  { value: "94%", label: "Return-to-sport rate" },
  { value: "4.9", label: "Average client rating" },
  { value: "48h", label: "Typical first appointment" },
];

const TREATS = [
  "Knee & ACL rehab",
  "Runner's injuries",
  "Shoulder pain",
  "Lower back pain",
  "Tendon issues",
  "Ankle sprains",
  "Hamstring strains",
  "Post-op recovery",
  "Hypermobility",
  "Strength & conditioning",
];

const REVIEWS = [
  { quote: "Back on the pitch six weeks ahead of schedule. The rehab plan was relentless but it worked.", author: "Verified client", sport: "Semi-pro footballer" },
  { quote: "They actually found why my knee kept giving way. First time anyone has explained it properly.", author: "Verified client", sport: "Marathon runner" },
  { quote: "Came in barely able to lift my arm overhead. Left genuinely stronger than before the injury.", author: "Verified client", sport: "CrossFit athlete" },
];

const FAQ = [
  { q: "Do I need a referral to be seen?", a: "No. You can book directly with us. If we feel you need imaging or a specialist opinion, we will refer you on and coordinate your care." },
  { q: "How soon will I be back to training?", a: "It depends on the injury, but we build every plan around a return-to-sport date. We will give you a realistic timeline at your first assessment and track progress against it." },
  { q: "What should I bring to my first session?", a: "Comfortable kit you can move and exercise in, plus any scan reports or notes you already have. We will do a full movement assessment, so wear something you would train in." },
  { q: "Do you treat non-athletes too?", a: "Absolutely. The same assessment-led, strength-based approach works just as well for everyday aches, desk-related pain and post-surgery recovery." },
];

export default function KineticDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const heroImg = hero || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1600&q=80";

  // ---------- shared bits ----------
  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
    if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  // a kinetic pulse line — recurring motif
  const Pulse = ({ className, color = LIME }: { className?: string; color?: string }) => (
    <svg viewBox="0 0 320 40" className={className} fill="none" stroke={color} strokeWidth="2.5" aria-hidden preserveAspectRatio="none">
      <path d="M0 20h70l10-16 14 32 11-24 9 12h196" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: NAVY_2 }} className="text-white/70">
      <Pulse className="h-7 w-full opacity-30" />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={display} className="text-2xl font-bold text-white">{name}</p>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition hover:border-[#C6F24E] hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: LIME }} {...editCopy(content, "footer_explore", "Explore")} />
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/60 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.22em]" style={{ color: LIME }} {...editCopy(content, "footer_findus", "Find us")} />
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/60">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/60 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/60 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/40">
        © {new Date().getFullYear()} {name}. Move better, recover faster.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <KineticHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // navy page banner — clears the fixed header on sub-pages.
  const banner = (keyBase: string, kicker: string, title: string, blurb?: string) => (
    <section className="relative overflow-hidden" style={{ background: NAVY }}>
      <Pulse className="absolute inset-x-0 bottom-0 h-20 w-full opacity-10" />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-32 text-center sm:pt-40">
        <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: LIME }} {...editCopy(content, `${keyBase}_kicker`, kicker)} />
        <h1 style={display} className="mt-4 text-4xl font-bold leading-[1.02] text-white sm:text-6xl" {...editCopy(content, `${keyBase}_title`, title)} />
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/60" {...editCopy(content, `${keyBase}_blurb`, blurb)} />}
      </div>
    </section>
  );

  // ---------- SERVICES ----------
  if (page === "services") {
    return shell(
      <>
        {banner("svc_banner", "Services", "How we get you moving", "From acute injury to peak performance — pick the discipline that fits, or book an assessment and we will map it out for you.")}
        <section className="mx-auto max-w-5xl px-6 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} className="text-2xl font-bold" style={{ ...display, color: NAVY }}>{section.section}</h2>}
                  <div className="mt-8 space-y-12">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <div className="mb-5 flex items-center gap-3">
                            <span className="h-2 w-2 -skew-x-12" style={{ background: LIME }} aria-hidden />
                            <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="text-xs font-bold uppercase tracking-[0.22em]" style={{ color: SLATE }}>{catg.category}</h3>
                          </div>
                        )}
                        <ul className="divide-y" style={{ borderColor: "#E2E7EC" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="font-semibold" style={{ color: NAVY }}>{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed" style={{ color: SLATE }}>{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: NAVY }}>{item.price}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p style={{ color: SLATE }}>Our services are coming soon.</p>}

          <div className="mt-16 overflow-hidden rounded-2xl px-8 py-12 text-center" style={{ background: NAVY }}>
            <h3 style={display} className="text-2xl font-bold text-white" {...editCopy(content, "svc_cta_heading", "Not sure what you need?")} />
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/60" {...editCopy(content, "svc_cta_blurb", "Book an assessment and our team will pinpoint the problem and build your plan around it.")} />
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-sm font-bold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ background: LIME, color: NAVY }} {...editCopy(content, "svc_cta_button", "Book an assessment")} />
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("about_banner", "About", "Built around getting you back")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: SLATE }}>{content.about}</p>
          ) : <p style={{ color: SLATE }}>Our story is coming soon.</p>}
        </section>

        {/* stats band */}
        <section style={{ background: NAVY }}>
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-6 py-16 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl font-bold sm:text-5xl" style={{ ...display, color: LIME }}>{s.value}</p>
                <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section style={{ background: WHITE }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: ORANGE }} {...editCopy(content, "about_team_eyebrow", "The team")} />
                <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ ...display, color: NAVY }} {...editCopy(content, "about_team_heading", "Meet your physios")} />
              </div>
              <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgba(18,32,54,0.45)]">
                    <div className="relative aspect-[4/5] bg-neutral-200">
                      {m.photo_url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="absolute inset-0 h-full w-full object-cover" />
                      ) : (
                        <div className="absolute inset-0" style={{ background: NAVY }} />
                      )}
                      <span className="absolute bottom-0 left-0 h-1.5 w-1/3" style={{ background: LIME }} aria-hidden />
                    </div>
                    <div className="p-5">
                      <p data-edit={`team:${m.id}:name`} className="text-lg font-bold" style={{ color: NAVY }}>{m.name}</p>
                      {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm" style={{ color: SLATE }}>{m.role}</p>}
                      {m.credentials && <p className="mt-1 text-xs text-neutral-400">{m.credentials}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQ */}
        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: ORANGE }} {...editCopy(content, "about_faq_eyebrow", "Good to know")} />
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ ...display, color: NAVY }} {...editCopy(content, "about_faq_heading", "Common questions")} />
          </div>
          <div className="mt-10 space-y-4">
            {FAQ.map((f) => (
              <div key={f.q} className="rounded-xl border p-6" style={{ borderColor: "#E2E7EC" }}>
                <p className="font-bold" style={{ color: NAVY }}>{f.q}</p>
                <p className="mt-2 text-[15px] leading-relaxed" style={{ color: SLATE }}>{f.a}</p>
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
        {banner("gallery_banner", "Gallery", "Inside the clinic", "Our space, our team and the work that gets people back to what they love.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20" style={{ color: SLATE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOK (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("book_banner", "Book", "Book your assessment", "Get a movement assessment and a clear plan to get you back. Tell us a little about you and we will confirm your slot.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold" style={{ ...display, color: NAVY }} {...editCopy(content, "book_first_heading", "What happens first")} />
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: SLATE }} {...editCopy(content, "book_first_blurb", "Your first visit is a full movement assessment. We find the root cause, explain it in plain terms, and map a realistic return-to-sport plan — with a date to work towards.")} />
            <ul className="mt-7 space-y-3 text-sm" style={{ color: NAVY }}>
              {["Hands-on movement assessment", "Clear diagnosis, no jargon", "A return-to-sport timeline", "Direct access — no referral needed"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: LIME, color: NAVY }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm" style={{ color: SLATE }}>Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-bold" style={{ color: ORANGE }}>{content.phone}</a></p>
            )}
          </div>
          <KineticBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("contact_banner", "Contact", "Get in touch", "Drop by, call, or send a message and we will get straight back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-2xl font-bold" style={{ ...display, color: NAVY }} {...editCopy(content, "contact_details_heading", "Clinic details")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: SLATE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#E2E7EC", color: NAVY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SLATE }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ background: LIME, color: NAVY }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
              )}
              <a href={book} className="inline-flex rounded-full border px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] transition hover:text-white" style={{ borderColor: NAVY, color: NAVY }} {...editCopy(content, "contact_book_cta", "Book a session")} />
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-3" style={{ color: NAVY }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full border transition hover:opacity-60" style={{ borderColor: "#E2E7EC" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
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
              contactBlurb="Question about an injury, a treatment or anything else? We are happy to help."
              contactCta="Send message"
              theme={{ card: NAVY, cardBorder: NAVY, heading: "#ffffff", blurb: "rgba(244,246,248,0.6)", label: "rgba(244,246,248,0.6)", fieldBg: "rgba(255,255,255,0.06)", fieldBorder: "rgba(255,255,255,0.15)", fieldText: "#ffffff", button: LIME, buttonText: NAVY, radius: "0.75rem", font: "var(--font-fraunces)" }}
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
  const teaseGroups = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 4);

  return shell(
    <>
      {/* athletic hero */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden" style={{ background: NAVY }}>
        {video ? (
          <video src={video} autoPlay muted loop playsInline poster={hero || undefined} className="absolute inset-0 h-full w-full object-cover opacity-45" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-45" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(105deg, #122036 12%, rgba(18,32,54,0.78) 48%, rgba(18,32,54,0.35) 100%)" }} />
        <Pulse className="absolute bottom-10 left-0 h-24 w-full opacity-20" />

        <div className="relative mx-auto w-full max-w-6xl px-6 py-32">
          <div className="max-w-2xl">
            {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: LIME }}>{content.tagline}</p>}
            <h1 style={display} className="mt-5 text-5xl font-bold leading-[0.98] text-white sm:text-7xl">
              Move better.<br /><span style={{ color: LIME }}>Recover faster.</span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/70" {...editCopy(content, "hero_blurb", "Sports physiotherapy, injury rehab and performance coaching — built to get you back to what you love, stronger than before.")} />
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-xs font-bold uppercase tracking-[0.16em] transition hover:brightness-95" style={{ background: LIME, color: NAVY }} {...editCopy(content, "hero_book_cta", "Book a session")} />
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border border-white/30 px-9 py-4 text-xs font-bold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10" {...editCopy(content, "hero_services_cta", "Our services")} />
              )}
            </div>
            {/* wordmark for inline editing */}
            <p data-edit="tenant.business_name" className="mt-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/35">{name}</p>
          </div>
        </div>
      </section>

      {/* stats bar */}
      <section style={{ background: NAVY_2 }}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-8 px-6 py-10 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-3xl font-bold sm:text-4xl" style={{ ...display, color: LIME }}>{s.value}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/50">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: ORANGE }} {...editCopy(content, "home_whyus_eyebrow", "Why us")} />
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.8]" style={{ color: SLATE }}>{content.about}</p>
        </section>
      )}

      {/* recovery pathway */}
      <section style={{ background: WHITE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: ORANGE }} {...editCopy(content, "pathway_eyebrow", "The pathway")} />
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ ...display, color: NAVY }} {...editCopy(content, "pathway_heading", "How we get you back")} />
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: SLATE }} {...editCopy(content, "pathway_blurb", "Every plan follows the same proven progression — from settling the injury to returning stronger than before.")} />
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: "#DDE3E9" }}>
            {PATHWAY.map((step, i) => (
              <div key={step.n} className="group relative bg-white p-7 transition hover:bg-[#122036]">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold transition" style={{ ...display, color: i === PATHWAY.length - 1 ? ORANGE : LIME }}>{step.n}</span>
                  <span className="h-px flex-1 transition group-hover:bg-white/20" style={{ background: "#DDE3E9" }} />
                </div>
                <h3 className="mt-4 text-lg font-bold transition group-hover:text-white" style={{ color: NAVY }}>{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed transition group-hover:text-white/65" style={{ color: SLATE }}>{step.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services teaser as divider rows */}
      {teaseGroups.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: ORANGE }} {...editCopy(content, "home_services_eyebrow", "Services")} />
              <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ ...display, color: NAVY }} {...editCopy(content, "home_services_heading", "What we do")} />
            </div>
            <a href={href("services")} className="text-sm font-bold underline-offset-4 hover:underline" style={{ color: NAVY }} {...editCopy(content, "home_services_link", "View all services →")} />
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-10 lg:grid-cols-2">
            {teaseGroups.map((c) => (
              <div key={c.label}>
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-2 w-2 -skew-x-12" style={{ background: LIME }} aria-hidden />
                  <h3 className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: SLATE }}>{c.label}</h3>
                </div>
                <ul className="divide-y" style={{ borderColor: "#E2E7EC" }}>
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 py-3">
                      <span data-edit={`item:${item.id}:name`} className="font-semibold" style={{ color: NAVY }}>{item.name}</span>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-bold" style={{ color: SLATE }}>{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* what we treat */}
      <section style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="lg:flex lg:items-center lg:justify-between lg:gap-12">
            <div className="max-w-md">
              <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: LIME }} {...editCopy(content, "treat_eyebrow", "What we treat")} />
              <h2 style={display} className="mt-3 text-3xl font-bold text-white sm:text-4xl" {...editCopy(content, "treat_heading", "From niggles to full ruptures")} />
              <p className="mt-4 text-[15px] leading-relaxed text-white/60" {...editCopy(content, "treat_blurb", "If it stops you training, competing or moving freely, we can help. A few of the things people come to us for:")} />
              <a href={book} className="mt-7 inline-flex rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ background: LIME, color: NAVY }} {...editCopy(content, "treat_cta", "Book an assessment")} />
            </div>
            <div className="mt-10 flex flex-wrap gap-2.5 lg:mt-0 lg:max-w-md">
              {TREATS.map((t) => (
                <span key={t} className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:border-[#C6F24E]">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* reviews */}
      <section style={{ background: WHITE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.34em]" style={{ color: ORANGE }} {...editCopy(content, "reviews_eyebrow", "Results")} />
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl" style={{ ...display, color: NAVY }} {...editCopy(content, "reviews_heading", "Back to what they love")} />
          </div>
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_10px_30px_-20px_rgba(18,32,54,0.5)]">
                <Pulse className="h-5 w-20" color={LIME} />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ color: NAVY }}>“{r.quote}”</blockquote>
                <figcaption className="mt-5 border-t pt-4 text-sm" style={{ borderColor: "#E2E7EC" }}>
                  <span className="font-bold" style={{ color: NAVY }}>{r.author}</span>
                  <span className="block text-xs" style={{ color: SLATE }}>{r.sport}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* booking band: image + navy booking panel */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden bg-neutral-200">
          {gallery[0]?.image_url || hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[0]?.image_url || hero!} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: NAVY }} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(18,32,54,0) 40%, rgba(18,32,54,0.55))" }} />
        </div>
        {bookingOn ? (
          <div className="flex items-center px-6 py-14 sm:px-10" style={{ background: NAVY_2 }}>
            <div className="w-full">
              <KineticBooking tenantId={tenant.id} name={name} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col justify-center px-8 py-14" style={{ background: NAVY_2 }}>
            <h3 style={display} className="text-2xl font-bold text-white" {...editCopy(content, "bookband_heading", "Get in touch")} />
            {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-white/75">{content.phone}</a>}
            {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-white/75">{content.email}</a>}
            <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-xs font-bold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ background: LIME, color: NAVY }} {...editCopy(content, "bookband_cta", "Contact us")} />
          </div>
        )}
      </section>

      {/* details band */}
      <section className="border-t" style={{ background: WHITE, borderColor: "#E2E7EC" }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ORANGE }} {...editCopy(content, "details_findus_heading", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: SLATE }}>{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-bold" style={{ color: NAVY }} {...editCopy(content, "details_directions_link", "Get directions →")} />
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ORANGE }} {...editCopy(content, "details_hours_heading", "Opening hours")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm" style={{ color: NAVY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: SLATE }}>{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm" style={{ color: SLATE }}>Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: ORANGE }} {...editCopy(content, "details_contact_heading", "Contact")} />
            <div className="mt-4 space-y-1.5 text-sm" style={{ color: SLATE }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-bold uppercase tracking-[0.14em] transition hover:brightness-95" style={{ background: LIME, color: NAVY }} {...editCopy(content, "details_book_cta", "Book a session")} />
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
