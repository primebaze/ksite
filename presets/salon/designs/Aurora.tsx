import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AuroraHeader } from "./AuroraHeader";
import { AuroraBooking } from "./AuroraBooking";

// Aurora — a sleek, modern IV vitamin-drip & wellness-infusion clinic (single
// venue). MULTI-PAGE: the nav opens real routes (Drips / About / Gallery /
// Book / Contact) under basePath, never scroll anchors. The glassy indigo
// header and footer are shared.
//
// Distinct identity: deep indigo-night base, electric-aqua + blush aurora
// glows, droplet/IV-line motifs and glassy cards. The hero is a confident
// "Recharge from within" statement on an aurora-gradient field; the drip menu
// is grouped by GOAL (Energy / Immunity / Glow / Recovery / Hydration) with
// benefit tags; a "how it works" 3-step (consult -> drip -> glow) feature sits
// between. Treatments are clean divider rows (name+benefits left / price
// right). Palette is baked; the tenant swaps in photography, copy, drips,
// clinicians, hours and contact.

const display = { fontFamily: "var(--font-fraunces)" } as const;

const NIGHT = "#20235C"; // deep indigo-night
const AQUA = "#4FD1C5"; // electric aqua
const BLUSH = "#E7A2B0"; // blush
const OFF = "#F7F8FC"; // off-white
const LILAC = "#C9CCE6"; // soft silver-lilac

// Aurora-gradient used across the dark sections.
const AURORA =
  "radial-gradient(120% 90% at 12% 0%, rgba(79,209,197,0.35), transparent 55%), radial-gradient(110% 80% at 88% 12%, rgba(231,162,176,0.32), transparent 55%), radial-gradient(120% 120% at 50% 110%, rgba(201,204,230,0.22), transparent 60%), #20235C";

// ---- static design copy (no brand names, no lorem) ----
const STEPS = [
  {
    n: "01",
    title: "Consult",
    body: "A quick wellness check with a registered nurse to match the right blend to your goals.",
  },
  {
    n: "02",
    title: "Drip",
    body: "Relax in a lounge chair while vitamins and minerals flow straight into your system.",
  },
  {
    n: "03",
    title: "Glow",
    body: "Walk out hydrated and recharged, with effects that build over the days that follow.",
  },
];

const PILLARS = [
  { title: "Nurse-led", note: "Every infusion placed by a registered clinician" },
  { title: "Pharmacy-grade", note: "Clean, sterile, clinically dosed blends" },
  { title: "Tailored blends", note: "Built around your energy and goals" },
  { title: "30 minutes", note: "Fast, calm sessions that fit your day" },
];

const STATS = [
  { value: "25k+", label: "Drips delivered" },
  { value: "4.9", label: "Average client rating" },
  { value: "30+", label: "Minutes per session" },
  { value: "12", label: "Signature blends" },
];

const REVIEWS = [
  { quote: "I came in foggy and drained and floated out an hour later. By the next morning I felt genuinely switched on again.", author: "Verified client" },
  { quote: "The nurses are calm and precise, the lounge is gorgeous, and the glow drip is now part of my monthly routine.", author: "Verified client" },
  { quote: "Best recovery I have found after long-haul travel. Hydration and energy back to normal in a single session.", author: "Verified client" },
];

const FAQ = [
  { q: "What happens during a drip?", a: "A nurse runs a brief health check, places a fine cannula, and your tailored blend infuses over roughly 30 to 45 minutes while you relax in our lounge." },
  { q: "How often should I come in?", a: "It depends on your goals. Many clients book a monthly maintenance drip, with extra sessions around travel, big events, or recovery." },
  { q: "Is it safe?", a: "Every infusion is nurse-led using pharmacy-grade ingredients. We screen for contraindications during your consultation and monitor you throughout." },
  { q: "When will I feel the effects?", a: "Hydration is often felt straight away. Energy, immunity, and glow benefits build over the hours and days after your session." },
];

// Benefit tags shown per drip when a treatment has none of its own.
const GOAL_TAGS = ["Hydration", "Energy", "Recovery", "Immunity", "Glow", "Focus"];

export default function AuroraDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Drips", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---------- shared bits ----------
  const Droplet = ({ size = 18, color = AQUA }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden>
      <path d="M12 2.5s6.5 7 6.5 11.5a6.5 6.5 0 1 1-13 0C5.5 9.5 12 2.5 12 2.5z" />
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

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: AURORA }} className="relative overflow-hidden text-white/85">
      {/* IV-line motif across the top */}
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${AQUA}, ${BLUSH}, transparent)` }} aria-hidden />
      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Droplet />
            <p data-edit="tenant.business_name" style={display} className="text-2xl text-white">{name}</p>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="text-white/70 transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: AQUA }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-white/70 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: AQUA }}>Visit the clinic</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/70 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/70 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="relative border-t border-white/10 px-6 py-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} {name}. Recharge from within.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <AuroraHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Dark aurora banner clearing the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section className="relative overflow-hidden text-white" style={{ background: AURORA }}>
      <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${AQUA}66, transparent)` }} aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-36 text-center sm:pt-44">
        <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: AQUA }}>
          <Droplet size={13} /> {kicker}
        </p>
        <h1 style={display} className="mt-4 text-4xl font-semibold sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed text-white/70">{blurb}</p>}
      </div>
    </section>
  );

  // Treatments rendered as clean divider rows with benefit tags + price.
  const dripRows = (items: typeof catalog) => (
    <ul className="divide-y" style={{ borderColor: LILAC }}>
      {items.map((item, idx) => {
        const tags = item.tags.length ? item.tags : [GOAL_TAGS[idx % GOAL_TAGS.length], GOAL_TAGS[(idx + 2) % GOAL_TAGS.length]];
        return (
          <li key={item.id} className="flex items-start justify-between gap-6 py-5">
            <div className="min-w-0">
              <p data-edit={`item:${item.id}:name`} className="font-semibold tracking-tight" style={{ color: NIGHT }}>{item.name}</p>
              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-neutral-500">{item.description}</p>}
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {tags.slice(0, 3).map((t) => (
                  <span key={t} className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.1em]" style={{ background: `${AQUA}22`, color: "#1c7a72" }}>{t}</span>
                ))}
              </div>
            </div>
            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-base font-semibold" style={{ color: NIGHT }}>{item.price}</span>}
          </li>
        );
      })}
    </ul>
  );

  // ---------- DRIPS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("The drip menu", "Find your blend", "Browse our full menu of IV vitamin drips and booster shots, grouped by the goal they serve. Every session starts with a quick nurse consultation.")}
        <section className="mx-auto max-w-5xl px-6 py-20" style={{ background: OFF }}>
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 style={display} className="text-2xl" >{section.section}</h2>}
                  <div className="mt-6 space-y-12">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <div className="flex items-center gap-3">
                            <span className="grid h-7 w-7 place-items-center rounded-full" style={{ background: NIGHT }} aria-hidden><Droplet size={13} /></span>
                            <h3 className="text-sm font-semibold uppercase tracking-[0.18em]" style={{ color: NIGHT }}>{catg.category}</h3>
                          </div>
                        )}
                        <div className="mt-3">{dripRows(catg.items)}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-neutral-500">Our drip menu is coming soon.</p>}

          <div className="mt-16 overflow-hidden rounded-3xl px-8 py-12 text-center text-white" style={{ background: AURORA }}>
            <h3 style={display} className="text-2xl">Not sure which drip is right?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/75">Tell us how you want to feel and our nurses will match you to the perfect blend.</p>
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] transition hover:brightness-110" style={{ background: AQUA, color: NIGHT }}>Book a consultation</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Wellness, infused")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          ) : <p className="text-neutral-500">Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-4xl" style={{ ...display, color: NIGHT }}>{s.value}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-neutral-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section style={{ background: OFF }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1c7a72" }}>Our team</p>
                <h2 style={display} className="mt-3 text-3xl sm:text-4xl">Meet your clinicians</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="rounded-3xl border bg-white p-7 text-center" style={{ borderColor: LILAC }}>
                    <div className="mx-auto h-36 w-36 overflow-hidden rounded-full ring-4" style={{ background: `${AQUA}22`, ["--tw-ring-color" as string]: `${AQUA}33` }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-5 text-lg font-semibold" style={{ color: NIGHT }}>{m.name}</p>
                    {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="mt-1 text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1c7a72" }}>Good to know</p>
            <h2 style={display} className="mt-3 text-3xl sm:text-4xl">Frequently asked</h2>
          </div>
          <div className="mt-10 space-y-3">
            {FAQ.map((f) => (
              <details key={f.q} className="group rounded-2xl border bg-white px-5 py-4 [&_summary]:cursor-pointer" style={{ borderColor: LILAC }}>
                <summary className="flex items-center justify-between gap-4 text-[15px] font-semibold marker:hidden" style={{ color: NIGHT }}>
                  {f.q}
                  <span className="shrink-0 text-xl leading-none transition group-open:rotate-45" style={{ color: AQUA }} aria-hidden>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{f.a}</p>
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
        {banner("Gallery", "Inside the lounge", "A look at our infusion lounge and the calm, glowing space we have built for you.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16" style={{ background: OFF }}>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOK (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book", "Reserve your drip", "Choose a blend and a time that suits. Tell us a little about you and our nurses will confirm.")}
        <section style={{ background: OFF }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div>
              <h2 style={display} className="text-3xl" >A calm, clinical experience</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">From check-in to glow, every step is nurse-led and unhurried. Settle into a lounge chair, let the blend do its work, and leave recharged.</p>
              <ul className="mt-7 space-y-3 text-sm text-neutral-700">
                {["Registered, nurse-led infusions", "Pharmacy-grade vitamins and minerals", "Blends tailored to your goals", "Calm, private lounge setting"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px] font-bold" style={{ background: AQUA, color: NIGHT }}>✓</span>
                    {t}
                  </li>
                ))}
              </ul>
              {content.phone && (
                <p className="mt-8 text-sm text-neutral-600">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: "#1c7a72" }}>{content.phone}</a></p>
              )}
            </div>
            <AuroraBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch", "Visit the clinic, call, or send a message and we will get back to you.")}
        <section style={{ background: OFF }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 style={display} className="text-2xl" >Clinic details</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-neutral-700" style={{ borderColor: LILAC }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                  ))}
                </ul>
              )}
              <div className="mt-7 flex flex-wrap gap-3">
                {content.map_url && (
                  <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] transition hover:brightness-110" style={{ background: AQUA, color: NIGHT }}>Get directions</a>
                )}
                <a href={book} className="inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: NIGHT }}>Book a drip</a>
              </div>
              {content.socials && content.socials.length > 0 && (
                <div className="mt-8 flex gap-4" style={{ color: NIGHT }}>
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
                contactBlurb="Questions about a drip, a blend, or anything else? We would love to hear from you."
                contactCta="Submit"
                theme={{ card: NIGHT, cardBorder: `${AQUA}33`, heading: "#ffffff", blurb: "rgba(255,255,255,0.7)", label: "rgba(255,255,255,0.7)", fieldBg: "rgba(255,255,255,0.06)", fieldBorder: "rgba(255,255,255,0.18)", fieldText: "#ffffff", button: AQUA, buttonText: NIGHT, radius: "1rem", font: "var(--font-fraunces)" }}
              />
            ) : (
              content.map_url && (
                <div className="overflow-hidden rounded-3xl">
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
  // Drip menu by goal: the catalog categories become the goal columns.
  const goalGroups = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.items.length > 0)
    .slice(0, 6);

  return shell(
    <>
      {/* ---- aurora hero ---- */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden text-white" style={{ background: AURORA }}>
        {/* hero image, dimmed behind the aurora */}
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity" />
        ) : null}
        {video && (
          <video src={video} autoPlay muted loop playsInline poster={hero || undefined} className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity" />
        )}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(32,35,92,0.2), rgba(32,35,92,0.65))" }} aria-hidden />
        {/* floating droplets motif */}
        <div className="pointer-events-none absolute right-[8%] top-[18%] hidden opacity-70 lg:block" aria-hidden>
          <Droplet size={120} color={`${AQUA}22`} />
        </div>
        <div className="pointer-events-none absolute right-[24%] top-[46%] hidden opacity-60 lg:block" aria-hidden>
          <Droplet size={64} color={`${BLUSH}33`} />
        </div>

        <div className="relative mx-auto w-full max-w-6xl px-6 py-28">
          <div className="max-w-2xl">
            {content.tagline ? (
              <p data-edit="content.tagline" className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur">
                <Droplet size={13} /> {content.tagline}
              </p>
            ) : (
              <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85 backdrop-blur">
                <Droplet size={13} /> IV vitamin therapy
              </p>
            )}
            <h1 style={display} className="mt-6 text-5xl font-semibold leading-[1.02] sm:text-7xl">
              Recharge from within
            </h1>
            <p data-edit="tenant.business_name" className="mt-4 text-lg font-medium" style={{ color: AQUA }}>{name}</p>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/80">
              Nurse-led IV vitamin drips and wellness infusions for energy, immunity, glow, recovery and deep hydration — in one calm, 30-minute session.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-xs font-semibold uppercase tracking-[0.16em] transition hover:brightness-110" style={{ background: AQUA, color: NIGHT, boxShadow: `0 16px 44px ${AQUA}55` }}>Book a drip</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border border-white/35 px-9 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition hover:bg-white/10">View the drip menu</a>
              )}
            </div>
          </div>
        </div>
        {/* IV-line baseline */}
        <div className="absolute inset-x-0 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${AQUA}, ${BLUSH}, transparent)` }} aria-hidden />
      </section>

      {/* ---- pillars strip ---- */}
      <section style={{ background: OFF }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p) => (
            <div key={p.title} className="flex items-start gap-3.5">
              <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-2xl" style={{ background: `${AQUA}1f` }} aria-hidden><Droplet size={20} color="#1c7a72" /></span>
              <div>
                <p className="text-sm font-semibold" style={{ color: NIGHT }}>{p.title}</p>
                <p className="text-xs leading-relaxed text-neutral-500">{p.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---- intro ---- */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1c7a72" }}>Welcome</p>
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.9] text-neutral-700">{content.about}</p>
        </section>
      )}

      {/* ---- how it works: consult -> drip -> glow ---- */}
      <section className="relative overflow-hidden text-white" style={{ background: AURORA }}>
        <div className="relative mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: AQUA }}>How it works</p>
            <h2 style={display} className="mt-3 text-3xl sm:text-4xl">Three steps to glow</h2>
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {STEPS.map((s, i) => (
              <div key={s.n} className="relative rounded-3xl border border-white/12 bg-white/[0.05] p-7 backdrop-blur">
                <div className="flex items-center gap-3">
                  <span style={{ ...display, color: AQUA }} className="text-3xl">{s.n}</span>
                  <span className="h-px flex-1" style={{ background: `linear-gradient(90deg, ${AQUA}66, transparent)` }} aria-hidden />
                  {i < STEPS.length - 1 && <span className="hidden text-white/40 md:inline" aria-hidden>→</span>}
                </div>
                <h3 style={display} className="mt-4 text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- drip menu by goal ---- */}
      {goalGroups.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20" style={{ background: "#fff" }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1c7a72" }}>The drip menu</p>
              <h2 style={display} className="mt-3 text-3xl sm:text-4xl">Drips by goal</h2>
            </div>
            <a href={href("services")} className="text-sm font-semibold" style={{ color: "#1c7a72" }}>View full menu →</a>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {goalGroups.map((g) => (
              <div key={g.label} className="rounded-3xl border p-7" style={{ borderColor: LILAC, background: OFF }}>
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: NIGHT }} aria-hidden><Droplet size={16} /></span>
                  <h3 className="text-lg font-semibold" style={{ color: NIGHT }}>{g.label}</h3>
                </div>
                <div className="mt-3">{dripRows(g.items.slice(0, 4))}</div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ---- reviews ---- */}
      <section style={{ background: OFF }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: "#1c7a72" }}>Loved by clients</p>
            <h2 style={display} className="mt-3 text-3xl sm:text-4xl">What our clients say</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex flex-col rounded-3xl border bg-white p-7" style={{ borderColor: LILAC }}>
                <div className="flex gap-1" style={{ color: AQUA }} aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 18.9 7.2 17l.9-5.4L4.2 7.7l5.4-.8z" /></svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-neutral-700">“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: NIGHT }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---- CTA + booking ---- */}
      <section className="grid lg:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-16 text-white sm:px-12 lg:py-24" style={{ background: AURORA }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: AQUA }}>Ready when you are</p>
          <h2 style={display} className="mt-4 text-3xl sm:text-4xl">Your glow starts here</h2>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/75">Book a nurse-led infusion and feel the difference in a single session — energy, hydration and glow, all in 30 minutes.</p>
          <ul className="mt-6 space-y-2 text-sm text-white/80">
            {["Same-week appointments", "Walk-in friendly", "Memberships available"].map((t) => (
              <li key={t} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: AQUA }} />{t}</li>
            ))}
          </ul>
          {content.phone && (
            <p className="mt-8 text-sm text-white/70">Call us on <a href={`tel:${content.phone}`} className="font-semibold" style={{ color: AQUA }}>{content.phone}</a></p>
          )}
        </div>
        {bookingOn ? (
          <div className="px-6 py-16 sm:px-10" style={{ background: OFF }}>
            <AuroraBooking tenantId={tenant.id} name={name} />
          </div>
        ) : (
          <div className="flex flex-col justify-center px-8 py-14" style={{ background: NIGHT }}>
            <h3 style={display} className="text-2xl text-white">Get in touch</h3>
            {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-white/85">{content.phone}</a>}
            {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-white/85">{content.email}</a>}
            <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.14em] transition hover:brightness-110" style={{ background: AQUA, color: NIGHT }}>Contact us</a>
          </div>
        )}
      </section>

      {/* ---- details band ---- */}
      <section className="border-t" style={{ background: "#fff", borderColor: LILAC }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#1c7a72" }}>Visit the clinic</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: "#1c7a72" }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#1c7a72" }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-neutral-500">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: "#1c7a72" }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm text-neutral-700">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-neutral-950">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white transition hover:brightness-110" style={{ background: NIGHT }}>Book a drip</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
