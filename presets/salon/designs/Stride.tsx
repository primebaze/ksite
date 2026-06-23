import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { StrideHeader } from "./StrideHeader";
import { StrideBooking } from "./StrideBooking";

// Stride — a fresh, confident podiatry & foot-health / gait clinic design
// (single venue), MULTI-PAGE: the nav opens real routes (Treatments / About /
// Gallery / Booking / Contact) under basePath, never scroll anchors. The
// sticky teal header and dark footer are shared. Palette is baked (forest-teal
// / lime-leaf / pale aqua-grey / navy ink / warm white / soft coral); the
// tenant swaps in their own photography, copy, treatments, podiatrists, hours
// and contact.
//
// Structural signature (shares nothing with sibling salon designs): a
// confident active hero on forest-teal with a "Keep moving, pain-free"
// headline and a footstep-rhythm motif, a "what we treat" conditions grid, a
// three-step "your visit" assessment → treatment → keep moving feature, clean
// clinical divider-row treatment lists, gait-line accents, lime + coral active
// register.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const TEAL = "#1F5E54";
const LIME = "#8FBF4D";
const AQUA = "#E3EDEC"; // pale aqua-grey light
const INK = "#16252A"; // navy ink
const WHITE = "#F7FAF8"; // warm white
const CORAL = "#EC7A5E"; // soft coral secondary accent

// Static design copy (no brand names, no lorem) — reviews, conditions, steps,
// stats and FAQ are not tenant data, so they live as small design arrays.
const REVIEWS = [
  { quote: "After months of heel pain I can finally walk the dog again. The assessment was thorough and the orthotics changed everything.", author: "Verified patient" },
  { quote: "Quick, friendly and genuinely expert. My ingrown toenail was treated painlessly and healed perfectly.", author: "Verified patient" },
  { quote: "As a runner I needed real gait analysis, not guesswork. The plan they built got me back on the road in weeks.", author: "Verified patient" },
  { quote: "Calm, clean clinic and a team that explains everything. My diabetic foot checks are something I no longer dread.", author: "Verified patient" },
];

const CONDITIONS = [
  { title: "Heel & arch pain", note: "Plantar fasciitis, heel spurs and arch strain assessed and treated." },
  { title: "Ingrown toenails", note: "Gentle, lasting relief — minor procedures under local anaesthetic." },
  { title: "Bunions & deformities", note: "Conservative care, padding and surgical referral when needed." },
  { title: "Diabetic foot care", note: "Routine checks, circulation screening and risk management." },
  { title: "Custom orthotics", note: "Prescription insoles built from your gait and pressure profile." },
  { title: "Sports injuries", note: "Gait analysis and rehab to get you moving and back in the game." },
];

const STEPS = [
  { n: "01", title: "Assessment", note: "A thorough exam of your feet, gait and footwear to find the real cause, not just the symptom." },
  { n: "02", title: "Treatment", note: "A clear, tailored plan — hands-on care, orthotics or minor procedures, with honest pricing." },
  { n: "03", title: "Keep moving", note: "Aftercare, exercises and follow-up so you stay comfortable, active and pain-free for good." },
];

const STATS = [
  { value: "20k+", label: "Steps assessed" },
  { value: "4.9", label: "Average patient rating" },
  { value: "15+", label: "Conditions treated" },
  { value: "98%", label: "Back on their feet" },
];

const FAQ = [
  { q: "Do I need a referral to book?", a: "No. You can book directly with us. We will carry out a full assessment at your first visit and, where appropriate, liaise with your GP or consultant." },
  { q: "What happens at a first appointment?", a: "We examine your feet, lower limbs and the way you walk, discuss your history and goals, then explain a clear plan with honest pricing — no pressure." },
  { q: "Are custom orthotics worth it?", a: "For many patients, prescription insoles are transformative. We only recommend them when your gait and pressure assessment shows they will genuinely help." },
  { q: "Can you treat ingrown toenails on the day?", a: "Often, yes. Minor procedures are carried out under local anaesthetic in clinic. We will always talk you through what to expect first." },
];

export default function StrideDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
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
    bookingOn && { label: "Booking", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---------- shared icons ----------
  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
    if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  const StepIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M9.5 3c1.6 0 2.6 1.5 2.6 3.6 0 2.4-1 4.3-2.7 4.3-1.5 0-2.4-1.4-2.4-3.5C7 5.2 8 3 9.5 3zM8 13.5c1.6 0 3 1.3 3 3.6 0 2-.6 3.9-2.7 3.9-1.6 0-3.3-.9-3.3-3 0-2.6 1.4-4.5 3-4.5z" />
    </svg>
  );

  // gait-line motif: a dashed baseline with footstep dots
  const GaitLine = ({ className = "" }: { className?: string }) => (
    <svg viewBox="0 0 240 16" className={className} fill="none" aria-hidden preserveAspectRatio="none">
      <line x1="0" y1="8" x2="240" y2="8" stroke={LIME} strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" />
      {[24, 72, 120, 168, 216].map((cx, i) => (
        <circle key={cx} cx={cx} cy={i % 2 === 0 ? 5 : 11} r="2.5" fill={i % 2 === 0 ? LIME : CORAL} />
      ))}
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: INK }} className="text-white/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          <div className="mt-5 max-w-[180px]"><GaitLine className="h-3 w-full" /></div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }} {...editCopy(content, "footer_explore_heading", "Explore")} />
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/70 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: LIME }} {...editCopy(content, "footer_visit_heading", "Visit us")} />
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/70 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/70 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {name}. Keep moving, pain-free.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900" >
      <StrideHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Aqua page banner — clears the fixed header on sub-pages.
  const banner = (kickerKey: string, kicker: string, titleKey: string, title: string, blurbKey?: string, blurb?: string) => (
    <section style={{ background: AQUA }}>
      <div className="mx-auto max-w-5xl px-6 pb-14 pt-32 text-center sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, kickerKey, kicker)} />
        <h1 style={{ ...serif, color: INK }} className="mt-3 text-4xl font-medium sm:text-5xl" {...editCopy(content, titleKey, title)} />
        <div className="mx-auto mt-5 max-w-[160px]"><GaitLine className="h-3 w-full" /></div>
        {blurb && blurbKey && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-neutral-600" {...editCopy(content, blurbKey, blurb)} />}
      </div>
    </section>
  );

  // Clinical divider-row treatment list (name+desc left / price right). No
  // dotted leaders, no card panels.
  const treatmentList = (items: { id: string; name: string; description?: string | null; price?: string | null }[]) => (
    <ul className="divide-y" style={{ borderColor: AQUA }}>
      {items.map((item) => (
        <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
          <div className="min-w-0">
            <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: INK }}>{item.name}</p>
            {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
          </div>
          {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
        </li>
      ))}
    </ul>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("svc_kicker", "Treatments", "svc_title", "Expert foot care, head to toe", "svc_blurb", "From routine care to gait analysis and minor procedures — every plan begins with a thorough assessment.")}
        <section className="mx-auto max-w-5xl px-6 py-20" style={{ background: WHITE }}>
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: INK }} className="text-2xl">{section.section}</h2>}
                  <div className="mt-6 grid gap-x-14 gap-y-10 sm:grid-cols-2">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="border-b pb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL, borderColor: AQUA }}>{catg.category}</h3>
                        )}
                        <div className="mt-2">{treatmentList(catg.items)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-neutral-500">Our treatment menu is coming soon.</p>}

          <div className="mt-16 overflow-hidden rounded-2xl px-8 py-12 text-center" style={{ background: TEAL }}>
            <h3 style={serif} className="text-2xl text-white" {...editCopy(content, "svc_cta_heading", "Not sure what you need?")} />
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/80" {...editCopy(content, "svc_cta_blurb", "Book an assessment and our podiatrists will pinpoint the cause and build a plan to keep you moving.")} />
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: LIME, color: INK }} {...editCopy(content, "svc_cta_button", "Book an assessment")} />
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("about_kicker", "About", "about_title", "Foot health you can feel")}
        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: WHITE }}>
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
          <section className="border-t" style={{ background: AQUA, borderColor: "rgba(31,94,84,0.12)" }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, "about_team_eyebrow", "Our team")} />
                <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "about_team_heading", "Meet your podiatrists")} />
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full ring-4" style={{ background: WHITE, color: LIME }}>
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

        <section className="mx-auto max-w-3xl px-6 py-20" style={{ background: WHITE }}>
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, "about_faq_eyebrow", "Good to know")} />
            <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "about_faq_heading", "Frequently asked questions")} />
          </div>
          <div className="mt-10 divide-y border-y" style={{ borderColor: AQUA }}>
            {FAQ.map((it) => (
              <details key={it.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6">
                  <span className="text-[15px] font-medium" style={{ color: INK }}>{it.q}</span>
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-lg leading-none transition group-open:rotate-45" style={{ background: AQUA, color: TEAL }} aria-hidden>+</span>
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
        {banner("gallery_kicker", "Gallery", "gallery_title", "Inside the clinic", "gallery_blurb", "A look at our space, our team and the care that keeps our patients moving.")}
        <div style={{ background: WHITE }}>
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
        </div>
      </>,
    );
  }

  // ---------- BOOKING (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("book_kicker", "Booking", "book_title", "Book your assessment", "book_blurb", "Tell us what is troubling your feet and a time that suits. We will confirm by phone or email.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16" style={{ background: WHITE }}>
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-3xl" {...editCopy(content, "book_heading", "A clear, confident plan")} />
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600" {...editCopy(content, "book_body", "Every visit starts with a thorough assessment of your feet, gait and footwear. We find the real cause, explain your options and build a plan to get you comfortable and active again.")} />
            <ul className="mt-7 space-y-3 text-sm text-neutral-700">
              {["Registered, experienced podiatrists", "Gait and pressure analysis", "Honest, tailored treatment plans", "Aftercare to keep you moving"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full" style={{ background: LIME, color: INK }} aria-hidden><StepIcon /></span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm text-neutral-600">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: TEAL }}>{content.phone}</a></p>
            )}
          </div>
          <StrideBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("contact_kicker", "Contact", "contact_title", "Get in touch", "contact_blurb", "Visit us, call, or send a message and our team will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16" style={{ background: WHITE }}>
          <div>
            <h2 style={{ ...serif, color: INK }} className="text-2xl" {...editCopy(content, "contact_details_heading", "Clinic details")} />
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-neutral-700" style={{ borderColor: AQUA }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: TEAL, color: "#fff" }} {...editCopy(content, "contact_directions_cta", "Get directions")} />
              )}
              <a href={book} className="inline-flex rounded-full border px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:bg-[#16252A] hover:text-white" style={{ borderColor: INK, color: INK }} {...editCopy(content, "contact_book_cta", "Book appointment")} />
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
              contactBlurb="Questions about a treatment or your feet? We would love to hear from you."
              contactCta="Send message"
              theme={{ card: TEAL, cardBorder: TEAL, heading: "#ffffff", blurb: "rgba(255,255,255,0.82)", label: "rgba(255,255,255,0.82)", fieldBg: "rgba(255,255,255,0.12)", fieldBorder: "rgba(255,255,255,0.35)", fieldText: "#ffffff", button: LIME, buttonText: INK, radius: "0.75rem", font: "var(--font-fraunces)" }}
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
  const teaseCategories = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 4);
  const heroImg = hero || (gallery[0]?.image_url ?? null);

  return shell(
    <>
      {/* ---- active hero on forest-teal ---- */}
      <section className="relative isolate overflow-hidden" style={{ background: TEAL }}>
        {/* motion / footstep rhythm backdrop */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.18]" aria-hidden style={{
          backgroundImage: `radial-gradient(circle at 20% 30%, ${LIME} 0, transparent 38%), radial-gradient(circle at 85% 70%, ${CORAL} 0, transparent 42%)`,
        }} />
        <div className="pointer-events-none absolute -bottom-10 left-0 right-0 opacity-30" aria-hidden>
          <GaitLine className="h-8 w-full" />
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.1fr_1fr] lg:gap-10 lg:pb-28">
          <div className="text-white">
            {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: LIME }}>{content.tagline}</p>}
            <h1 data-edit="tenant.business_name" style={serif} className="mt-4 text-5xl font-medium leading-[1.02] sm:text-6xl">{name}</h1>
            <p className="mt-3 text-2xl font-medium sm:text-3xl" style={{ ...serif, color: LIME }} {...editCopy(content, "hero_subhead", "Keep moving, pain-free.")} />
            <p className="mt-5 max-w-md text-base leading-relaxed text-white/80" {...editCopy(content, "hero_sub", "Expert podiatry and gait care for comfortable, confident feet — from heel pain and orthotics to sports injuries and routine care.")} />
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] shadow-xl transition hover:opacity-90" style={{ background: LIME, color: INK }} {...editCopy(content, "hero_book_cta", "Book an assessment")} />
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border border-white/45 px-9 py-4 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10" {...editCopy(content, "hero_services_cta", "View treatments")} />
              )}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] bg-white/10 shadow-2xl ring-1 ring-white/15">
              {heroImg ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={heroImg} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src="https://images.unsplash.com/photo-1559963110-71b394e7494d?auto=format&fit=crop&w=1200&q=80" alt="" className="aspect-[4/5] w-full object-cover" />
              )}
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl px-5 py-4 shadow-lg sm:block" style={{ background: CORAL, color: "#fff" }}>
              <p className="text-2xl font-semibold" style={serif}>4.9★</p>
              <p className="text-[11px] uppercase tracking-[0.14em] text-white/90" {...editCopy(content, "hero_badge_label", "Patient rated")} />
            </div>
          </div>
        </div>
      </section>

      {/* ---- trust / quick-facts strip ---- */}
      <section style={{ background: WHITE }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Registered podiatrists", n: "HCPC-qualified clinicians" },
            { t: "Gait & pressure analysis", n: "Data-led, not guesswork" },
            { t: "Custom orthotics", n: "Built around your stride" },
            { t: "Comfortable clinic", n: "Calm, clean and modern" },
          ].map((f) => (
            <div key={f.t} className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full" style={{ background: AQUA, color: TEAL }} aria-hidden><StepIcon /></span>
              <div>
                <p className="text-sm font-semibold" style={{ color: INK }}>{f.t}</p>
                <p className="text-xs text-neutral-500">{f.n}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- intro ---- */}
      {content.about && (
        <section className="px-6 py-20 text-center" style={{ background: AQUA }}>
          <div className="mx-auto max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, "intro_eyebrow", "Welcome")} />
            <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9] text-neutral-700">{content.about}</p>
          </div>
        </section>
      )}

      {/* ---- WHAT WE TREAT — conditions grid ---- */}
      <section style={{ background: WHITE }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, "treat_eyebrow", "What we treat")} />
            <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "treat_heading", "Foot and gait care, sorted properly")} />
            <p className="mt-3 text-[15px] leading-relaxed text-neutral-600" {...editCopy(content, "treat_blurb", "Whatever is slowing you down, we assess the cause and treat it — so you can get back to moving freely.")} />
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-2 lg:grid-cols-3" style={{ borderColor: AQUA, background: AQUA }}>
            {CONDITIONS.map((c) => (
              <div key={c.title} className="flex gap-4 p-7" style={{ background: WHITE }}>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full" style={{ background: TEAL, color: "#fff" }} aria-hidden><StepIcon /></span>
                <div>
                  <h3 className="text-base font-semibold" style={{ color: INK }}>{c.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{c.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- YOUR VISIT — assessment → treatment → keep moving ---- */}
      <section className="relative overflow-hidden" style={{ background: INK }}>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/3 opacity-20" aria-hidden style={{ background: `radial-gradient(circle at 70% 30%, ${TEAL}, transparent 70%)` }} />
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: LIME }} {...editCopy(content, "visit_eyebrow", "Your visit")} />
            <h2 style={serif} className="mt-3 text-3xl text-white sm:text-4xl" {...editCopy(content, "visit_heading", "Assessment, treatment, keep moving")} />
          </div>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative">
                <div className="flex items-center gap-3">
                  <span style={{ ...serif, color: LIME }} className="text-4xl">{s.n}</span>
                  {i < STEPS.length - 1 && <div className="hidden flex-1 md:block"><GaitLine className="h-3 w-full" /></div>}
                </div>
                <h3 className="mt-4 text-xl text-white" style={serif}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/65">{s.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <a href={book} className="inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: LIME, color: INK }} {...editCopy(content, "visit_cta", "Start with an assessment")} />
          </div>
        </div>
      </section>

      {/* ---- treatments teaser → full treatments page ---- */}
      {teaseCategories.length > 0 && (
        <section style={{ background: WHITE }}>
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, "teaser_eyebrow", "Treatments")} />
                <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "teaser_heading", "What we can do for you")} />
              </div>
              <a href={href("services")} className="text-sm font-semibold underline-offset-4 hover:underline" style={{ color: TEAL }}>View all treatments →</a>
            </div>
            <div className="mt-12 grid gap-x-14 gap-y-12 sm:grid-cols-2">
              {teaseCategories.map((c) => (
                <div key={c.label}>
                  <h3 className="border-b pb-2 text-xs font-semibold uppercase tracking-[0.16em]" style={{ color: TEAL, borderColor: AQUA }}>{c.label}</h3>
                  <div className="mt-2">{treatmentList(c.items.slice(0, 5))}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ---- reviews ---- */}
      <section style={{ background: AQUA }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TEAL }} {...editCopy(content, "reviews_eyebrow", "Reviews")} />
            <h2 style={{ ...serif, color: INK }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "reviews_heading", "Back on their feet")} />
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex h-full flex-col rounded-2xl bg-white p-7 shadow-[0_10px_30px_rgba(22,37,42,0.06)]">
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

      {/* ---- booking band: image + teal booking panel ---- */}
      <section className="grid lg:grid-cols-2">
        <div className="relative min-h-[360px] overflow-hidden" style={{ background: AQUA }}>
          {video ? (
            <video src={video} autoPlay muted loop playsInline poster={hero || undefined} className="absolute inset-0 h-full w-full object-cover" />
          ) : heroImg ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[1]?.image_url || heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: TEAL }} />
          )}
        </div>
        {bookingOn ? (
          <div className="flex flex-col justify-center p-6 sm:p-10" style={{ background: INK }}>
            <StrideBooking tenantId={tenant.id} name={name} />
          </div>
        ) : (
          <div className="flex flex-col justify-center px-8 py-14" style={{ background: TEAL }}>
            <h3 style={serif} className="text-2xl text-white" {...editCopy(content, "bookband_fallback_heading", "Get in touch")} />
            {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-white">{content.phone}</a>}
            {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-white">{content.email}</a>}
            <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: LIME, color: INK }} {...editCopy(content, "bookband_fallback_cta", "Contact us")} />
          </div>
        )}
      </section>

      {/* ---- details band: address + map + hours ---- */}
      <section style={{ background: WHITE }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }} {...editCopy(content, "details_visit_heading", "Visit us")} />
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: TEAL }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }} {...editCopy(content, "details_hours_heading", "Opening times")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-neutral-500">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: TEAL }} {...editCopy(content, "details_contact_heading", "Contact")} />
            <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:opacity-90" style={{ background: TEAL, color: "#fff" }} {...editCopy(content, "details_book_cta", "Book appointment")} />
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
