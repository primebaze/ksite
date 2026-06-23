import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ThermaeHeader } from "./ThermaeHeader";
import { ThermaeBooking } from "./ThermaeBooking";

// Thermae — a serene, immersive day-spa design (single venue), MULTI-PAGE: the
// nav opens real routes (Treatments / About / Gallery / Reservations / Contact)
// under basePath, never scroll anchors. A floating header that melts into a
// frosted cream bar and a calm stone footer are shared across pages.
//
// Identity: water, steam, stone and eucalyptus. A misty immersive hero with a
// slow "Breathe. Unwind. Restore." headline; treatments presented as grouped
// "rituals & journeys" (Massage / Facials / Body / Thermal) in clean divider
// rows; a "the spa experience" band (thermal suite, relaxation); ripple/steam
// soft motifs; generous whitespace and rounded organic forms. Fraunces display.
// Palette is baked (eucalyptus green / warm stone / deep slate / cream / soft
// copper accent); the tenant swaps in their own photography, copy, treatments,
// therapists, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const EUCALYPTUS = "#6E8B7A";
const STONE = "#D8CFC2";
const SLATE = "#2E3A3A";
const CREAM = "#F4F0E8";
const COPPER = "#B07F5A";
const MIST = "#E9E4D9";

// Static design copy (no brand names, no lorem) — reviews, ethos, journeys and
// FAQ are not tenant data, so they live as small design arrays per the runbook.
const REVIEWS = [
  { quote: "I arrived tense and left feeling weightless. The thermal journey is pure restoration — I have never felt so completely unwound.", author: "Verified guest" },
  { quote: "Every detail is considered, from the warm stone underfoot to the eucalyptus steam. It is a sanctuary in the truest sense.", author: "Verified guest" },
  { quote: "My therapist read exactly what my body needed. Three days later I still feel the calm. This is now my monthly ritual.", author: "Verified guest" },
];

const ETHOS = [
  { title: "Water & warmth", note: "Thermal pools, steam and sauna to ease the body." },
  { title: "Skilled hands", note: "Therapists who tailor every touch to you." },
  { title: "Stillness", note: "Quiet relaxation spaces to linger and breathe." },
  { title: "Natural ritual", note: "Eucalyptus, mineral salts and botanical care." },
];

const STATS = [
  { value: "38°", label: "Thermal pool warmth" },
  { value: "4.9", label: "Average guest rating" },
  { value: "12", label: "Treatment sanctuaries" },
  { value: "100%", label: "Time that is yours" },
];

// The grouped "rituals & journeys" presentation. Tenant treatments slot under
// whichever pillars exist; these four define the calm structure.
const PILLARS = [
  { key: "massage", label: "Massage", note: "Deep release and gentle, flowing touch." },
  { key: "facials", label: "Facials", note: "Botanical care for luminous, calm skin." },
  { key: "body", label: "Body", note: "Scrubs, wraps and mineral-rich rituals." },
  { key: "thermal", label: "Thermal", note: "Heat, water and steam journeys." },
] as const;

const FAQ = [
  { q: "What should I bring for my visit?", a: "Simply arrive a few minutes early and let everything else go. Robes, slippers and towels are provided; we will guide you gently through your journey from the moment you arrive." },
  { q: "Can I use the thermal suite without a treatment?", a: "Yes. A thermal journey through the pools, sauna and steam can be enjoyed on its own, or woven around a massage or facial for a deeper sense of calm." },
  { q: "How early should I arrive?", a: "We recommend arriving fifteen to twenty minutes before your reservation so you can settle, change and begin to slow down before your ritual begins." },
  { q: "Do you cater to special occasions?", a: "We do. Whether it is a quiet escape for two or a moment of celebration, let us know in your reservation and we will shape the experience around you." },
];

export default function ThermaeDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const allItems = groups.flatMap((s) => s.categories.flatMap((c) => c.items));

  // ---------- shared icons ----------
  const Drop = ({ size = 22, color = "currentColor" }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" aria-hidden>
      <path d="M12 3c3.5 4.2 5.5 7 5.5 9.8A5.5 5.5 0 0 1 12 18a5.5 5.5 0 0 1-5.5-5.2C6.5 10 8.5 7.2 12 3z" />
    </svg>
  );

  const SocialIcon = ({ kind }: { kind: string }) => {
    const k = kind.toLowerCase();
    if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
    if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
    if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
    if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
    if (k.includes("pin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.6 1.3 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3-2.3 3-5 0-2-1.4-3.6-4-3.6-2.9 0-4.7 2.2-4.7 4.6 0 .8.3 1.5.6 1.8.1.1.1.2.1.4l-.3 1.1c0 .2-.2.2-.4.1-1.2-.5-1.9-2.2-1.9-3.6 0-2.9 2.1-5.6 6.1-5.6 3.2 0 5.7 2.3 5.7 5.3 0 3.2-2 5.8-4.8 5.8-1 0-1.8-.5-2.1-1.1l-.6 2.2c-.2.8-.8 1.9-1.2 2.5A10 10 0 1 0 12 2z" /></svg>;
    return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
  };

  // Soft repeating ripple lines — the recurring water motif.
  const Ripple = ({ className = "", color = EUCALYPTUS }: { className?: string; color?: string }) => (
    <svg className={className} viewBox="0 0 200 40" fill="none" preserveAspectRatio="none" aria-hidden>
      <path d="M0 20 Q25 6 50 20 T100 20 T150 20 T200 20" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <path d="M0 30 Q25 16 50 30 T100 30 T150 30 T200 30" stroke={color} strokeWidth="1.2" opacity="0.3" />
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: SLATE }} className="text-white/80">
      <div className="relative overflow-hidden">
        <Ripple className="absolute inset-x-0 top-0 h-10 w-full" color={STONE} />
        <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-14 pt-20 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "rgba(216,207,194,0.15)" }}>
                <Drop size={16} color={STONE} />
              </span>
              <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
            </div>
            {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{content.tagline}</p>}
            {content.socials && content.socials.length > 0 && (
              <div className="mt-6 flex gap-4">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="grid h-9 w-9 place-items-center rounded-full transition hover:text-white" style={{ background: "rgba(255,255,255,0.06)" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: STONE }} {...editCopy(content, "footer_wander_heading", "Wander")} />
            <ul className="mt-4 space-y-2.5 text-sm">
              {nav.map((l) => (
                <li key={l.href}><a href={l.href} className="text-white/70 transition hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: STONE }} {...editCopy(content, "footer_find_heading", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-white/70 transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-white/70 transition hover:text-white">{content.email}</a>}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {name}. A place to breathe.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body text-neutral-900" >
      <div style={{ background: CREAM }}>
        <ThermaeHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Calm page banner — clears the fixed header on sub-pages.
  const banner = (kickerKey: string, kicker: string, titleKey: string, title: string, blurbKey?: string, blurb?: string) => (
    <section className="relative overflow-hidden" style={{ background: MIST }}>
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(110,139,122,0.18), transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -bottom-24 h-80 w-80 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(176,127,90,0.14), transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-36 text-center sm:pt-44">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }} {...editCopy(content, kickerKey, kicker)} />
        <h1 style={{ ...serif, color: SLATE }} className="mt-4 text-4xl font-medium leading-[1.08] sm:text-6xl" {...editCopy(content, titleKey, title)} />
        {blurb && blurbKey && <p className="mx-auto mt-6 max-w-2xl text-[16px] leading-relaxed text-[#2E3A3A]/70" {...editCopy(content, blurbKey, blurb)} />}
        <Ripple className="mx-auto mt-8 h-5 w-40" />
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <>
        {banner("svc_kicker", "Rituals & journeys", "svc_title", "The treatment menu", "svc_blurb", "Choose a single treatment or a complete journey. Every ritual is shaped around how you wish to feel.")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl px-6 py-20 sm:py-28">
            {groups.length > 0 ? (
              <div className="space-y-12">
                {groups.map((section) => (
                  <div key={section.section}>
                    {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...serif, color: SLATE }} className="text-2xl">{section.section}</h2>}
                    <div className="mt-6 space-y-10">
                      {section.categories.map((catg) => (
                        <div
                          key={catg.category ?? "_"}
                          className="rounded-[1.75rem] bg-white/60 p-7 sm:p-9"
                          style={{ border: "1px solid rgba(110,139,122,0.16)" }}
                        >
                          {catg.category && (
                            <div className="flex items-center gap-3">
                              <Drop size={18} color={EUCALYPTUS} />
                              <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} style={{ ...serif, color: SLATE }} className="text-xl">{catg.category}</h3>
                            </div>
                          )}
                          <ul className="mt-5 divide-y" style={{ borderColor: "rgba(110,139,122,0.14)" }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-5 py-4 first:pt-0 last:pb-0">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: SLATE }}>{item.name}</p>
                                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#2E3A3A]/55">{item.description}</p>}
                                </div>
                                {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: COPPER }}>{item.price}</span>}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : <p className="text-[#2E3A3A]/55">Our ritual menu is being prepared.</p>}

            <div className="mt-16 overflow-hidden rounded-[2rem] px-8 py-14 text-center" style={{ background: EUCALYPTUS }}>
              <Ripple className="mx-auto mb-6 h-5 w-40" color="rgba(255,255,255,0.6)" />
              <h3 style={serif} className="text-2xl text-white sm:text-3xl" {...editCopy(content, "svc_cta_heading", "Unsure which journey is yours?")} />
              <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed text-white/80" {...editCopy(content, "svc_cta_blurb", "Tell us how you wish to feel and we will craft the perfect sequence of warmth, water and touch.")} />
              <a href={book} className="mt-7 inline-flex rounded-full bg-white px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ color: SLATE }} {...editCopy(content, "svc_cta_button", "Reserve your visit")} />
            </div>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("about_kicker", "Our sanctuary", "about_title", "A place to breathe")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
            {content.about ? (
              <p data-edit="content.about" className="text-[18px] leading-[2] text-[#2E3A3A]/85">{content.about}</p>
            ) : <p className="text-[#2E3A3A]/55">Our story is being written.</p>}

            <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-4">
              {STATS.map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-4xl sm:text-5xl" style={{ ...serif, color: EUCALYPTUS }}>{s.value}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.16em] text-[#2E3A3A]/55">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {team.length > 0 && (
          <section style={{ background: MIST }}>
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }} {...editCopy(content, "about_team_eyebrow", "Your therapists")} />
                <h2 style={{ ...serif, color: SLATE }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "about_team_heading", "The hands that care for you")} />
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-48 w-48 overflow-hidden rounded-[40%_60%_55%_45%/55%_45%_55%_45%]" style={{ background: STONE }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p data-edit={`team:${m.id}:name`} className="mt-6 text-lg font-medium" style={{ color: SLATE }}>{m.name}</p>
                    {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm" style={{ color: EUCALYPTUS }}>{m.role}</p>}
                    {m.credentials && <p className="mt-0.5 text-xs text-[#2E3A3A]/45">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl px-6 py-20 sm:py-24">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }} {...editCopy(content, "about_faq_eyebrow", "Good to know")} />
              <h2 style={{ ...serif, color: SLATE }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "about_faq_heading", "Before you arrive")} />
            </div>
            <div className="mt-10 space-y-4">
              {FAQ.map((f) => (
                <div key={f.q} className="rounded-[1.5rem] bg-white/60 p-6" style={{ border: "1px solid rgba(110,139,122,0.16)" }}>
                  <p className="font-medium" style={{ color: SLATE }}>{f.q}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#2E3A3A]/65">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("gallery_kicker", "The spaces", "gallery_title", "Within our walls", "gallery_blurb", "Stone, water, warmth and quiet light — a glimpse of the calm that awaits.")}
        <section style={{ background: CREAM }}>
          {gallery.length > 0 ? (
            <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
              <div className="columns-2 gap-4 sm:columns-3 [&>*]:mb-4">
                {gallery.map((g) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="w-full break-inside-avoid rounded-[1.5rem] object-cover" />
                ))}
              </div>
            </div>
          ) : <p className="mx-auto max-w-6xl px-6 py-20 text-[#2E3A3A]/55">Photographs coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---------- RESERVATIONS ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("res_kicker", "Reservations", "res_title", "Reserve your calm", "res_blurb", "Choose your ritual and a time that suits. We will hold a quiet moment just for you.")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:py-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
            <div>
              <h2 style={{ ...serif, color: SLATE }} className="text-3xl sm:text-4xl" {...editCopy(content, "res_heading", "A slow, considered welcome")} />
              <p className="mt-5 text-[15px] leading-relaxed text-[#2E3A3A]/70" {...editCopy(content, "res_body", "From the moment you arrive, time softens. We will settle you in, understand how you wish to feel, and guide you gently through warmth, water and touch.")} />
              <ul className="mt-8 space-y-4 text-sm" style={{ color: SLATE }}>
                {["Thermal suite, sauna and steam access", "Treatments tailored to your body", "Quiet relaxation lounges to linger", "Botanical, eucalyptus-led care"].map((t) => (
                  <li key={t} className="flex items-start gap-3.5">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full" style={{ background: "rgba(110,139,122,0.16)" }}><Drop size={13} color={EUCALYPTUS} /></span>
                    {t}
                  </li>
                ))}
              </ul>
              {content.phone && (
                <p className="mt-9 text-sm text-[#2E3A3A]/70">Prefer to speak with us? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: COPPER }}>{content.phone}</a></p>
              )}
            </div>
            <ThermaeBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("contact_kicker", "Contact", "contact_title", "Find your way to us", "contact_blurb", "Visit, call, or send a quiet word and we will respond with care.")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-24 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 style={{ ...serif, color: SLATE }} className="text-2xl sm:text-3xl" {...editCopy(content, "contact_visiting_heading", "Visiting")} />
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#2E3A3A]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2E3A3A]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2E3A3A]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2.5 border-t pt-6 text-sm text-[#2E3A3A]/80" style={{ borderColor: "rgba(110,139,122,0.2)" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#2E3A3A]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              <div className="mt-8 flex flex-wrap gap-3">
                {content.map_url && (
                  <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: EUCALYPTUS }} {...editCopy(content, "contact_directions_cta", "Directions")} />
                )}
                <a href={book} className="inline-flex rounded-full border px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] transition hover:bg-[#2E3A3A] hover:text-white" style={{ borderColor: SLATE, color: SLATE }} {...editCopy(content, "contact_reserve_cta", "Reserve a visit")} />
              </div>
              {content.socials && content.socials.length > 0 && (
                <div className="mt-8 flex gap-4" style={{ color: SLATE }}>
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
                contactTitle="Send a quiet word"
                contactBlurb="A question about a treatment, a special occasion, or anything else — we would love to hear from you."
                contactCta="Send message"
                theme={{ card: CREAM, cardBorder: "rgba(110,139,122,0.22)", heading: SLATE, blurb: "rgba(46,58,58,0.7)", label: "rgba(46,58,58,0.7)", fieldBg: "rgba(255,255,255,0.7)", fieldBorder: "rgba(110,139,122,0.28)", fieldText: SLATE, button: EUCALYPTUS, buttonText: "#ffffff", radius: "1.25rem", font: "var(--font-fraunces)" }}
              />
            ) : (
              content.map_url && (
                <div className="overflow-hidden rounded-[2rem]">
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
  // Map tenant treatments onto the calm pillar structure, falling back to a flat
  // split so the journeys band always reads well.
  const journeys = PILLARS.map((p, idx) => {
    const matched = allItems.filter((it) => {
      const hay = `${it.section ?? ""} ${it.category ?? ""} ${it.name}`.toLowerCase();
      return hay.includes(p.key) || (p.key === "facials" && hay.includes("facial")) || (p.key === "thermal" && (hay.includes("sauna") || hay.includes("steam") || hay.includes("pool")));
    });
    const items = matched.length ? matched : allItems.filter((_, i) => i % PILLARS.length === idx);
    return { ...p, items: items.slice(0, 4) };
  }).filter((p) => p.items.length > 0);

  const heroImg = hero || "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=80";

  return shell(
    <>
      {/* immersive misty hero */}
      <section className="relative isolate flex min-h-[100vh] items-center overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline poster={hero || undefined} className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
        )}
        {/* steam / mist veils */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(46,58,58,0.45) 0%, rgba(46,58,58,0.25) 40%, rgba(46,58,58,0.6) 100%)" }} />
        <div className="absolute inset-x-0 bottom-0 h-1/2" style={{ background: "linear-gradient(180deg, transparent, rgba(244,240,232,0.0) 60%, rgba(244,240,232,0.18))" }} />

        <div className="relative mx-auto w-full max-w-5xl px-6 text-center text-white">
          {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.42em] text-white/85">{content.tagline}</p>}
          <h1 data-edit="tenant.business_name" style={serif} className="mt-5 text-4xl font-medium leading-[1.05] [text-shadow:0_2px_30px_rgba(0,0,0,0.4)] sm:text-6xl">
            {name}
          </h1>
          {/* the slow breathing line */}
          <p style={serif} className="mt-7 flex flex-wrap items-center justify-center gap-x-4 text-2xl font-light italic text-white/90 sm:text-4xl">
            {["Breathe.", "Unwind.", "Restore."].map((w, i) => (
              <span
                key={w}
                className="thermae-breathe inline-block"
                style={{ animationDelay: `${i * 1.4}s` }}
              >
                {w}
              </span>
            ))}
          </p>
          <p className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-white/80" {...editCopy(content, "hero_sub", "A serene day spa of warm stone, eucalyptus steam and still water — time, gently returned to you.")} />
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={book} className="inline-flex rounded-full px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white shadow-xl transition hover:opacity-90" style={{ background: COPPER }} {...editCopy(content, "hero_reserve_cta", "Reserve your visit")} />
            {groups.length > 0 && (
              <a href={href("services")} className="inline-flex rounded-full border border-white/60 px-9 py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#2E3A3A]" {...editCopy(content, "hero_explore_cta", "Explore rituals")} />
            )}
          </div>
        </div>

        <Ripple className="absolute inset-x-0 bottom-6 mx-auto h-6 w-48 opacity-80" color="rgba(255,255,255,0.8)" />
        <style>{`@keyframes thermaeBreathe{0%,100%{opacity:.55;transform:translateY(2px)}50%{opacity:1;transform:translateY(-2px)}}.thermae-breathe{animation:thermaeBreathe 4.2s ease-in-out infinite}`}</style>
      </section>

      {/* ethos strip */}
      <section style={{ background: CREAM }}>
        <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {ETHOS.map((t) => (
            <div key={t.title} className="text-center sm:text-left">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full sm:mx-0" style={{ background: "rgba(110,139,122,0.14)" }} aria-hidden>
                <Drop size={20} color={EUCALYPTUS} />
              </span>
              <p className="mt-4 font-medium" style={{ color: SLATE }}>{t.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-[#2E3A3A]/60">{t.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* intro statement */}
      {content.about && (
        <section style={{ background: MIST }}>
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }} {...editCopy(content, "intro_eyebrow", "Welcome")} />
            <p data-edit="content.about" className="mt-7 text-[22px] font-light leading-[1.75] text-[#2E3A3A]/85" style={serif}>{content.about}</p>
            <Ripple className="mx-auto mt-9 h-5 w-40" />
          </div>
        </section>
      )}

      {/* rituals & journeys — grouped pillars as clean divider rows */}
      {journeys.length > 0 && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }} {...editCopy(content, "journeys_eyebrow", "Rituals & journeys")} />
              <h2 style={{ ...serif, color: SLATE }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "journeys_heading", "Treatments to unwind by")} />
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[#2E3A3A]/65" {...editCopy(content, "journeys_blurb", "Massage, facials, body rituals and thermal journeys — each shaped around how you wish to feel.")} />
            </div>
            <div className="mt-14 grid gap-x-14 gap-y-12 lg:grid-cols-2">
              {journeys.map((j) => (
                <div key={j.key}>
                  <div className="flex items-baseline justify-between gap-4 border-b pb-3" style={{ borderColor: "rgba(110,139,122,0.25)" }}>
                    <h3 style={{ ...serif, color: SLATE }} className="text-2xl">{j.label}</h3>
                    <span className="text-[11px] uppercase tracking-[0.16em] text-[#2E3A3A]/45">{j.note}</span>
                  </div>
                  <ul className="mt-4 divide-y" style={{ borderColor: "rgba(110,139,122,0.12)" }}>
                    {j.items.map((item) => (
                      <li key={item.id} className="flex items-baseline justify-between gap-5 py-3.5">
                        <div className="min-w-0">
                          <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: SLATE }}>{item.name}</p>
                          {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-[#2E3A3A]/55">{item.description}</p>}
                        </div>
                        {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: COPPER }}>{item.price}</span>}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-14 text-center">
              <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: EUCALYPTUS }} {...editCopy(content, "journeys_view_all", "View the full menu")} />
            </div>
          </div>
        </section>
      )}

      {/* the spa experience band — thermal suite & relaxation */}
      <section className="relative overflow-hidden" style={{ background: SLATE }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-24 lg:grid-cols-2 lg:gap-16">
          <div className="text-white">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: STONE }} {...editCopy(content, "experience_eyebrow", "The spa experience")} />
            <h2 style={serif} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "experience_heading", "Warmth, water & stillness")} />
            <p className="mt-5 text-[15px] leading-relaxed text-white/70" {...editCopy(content, "experience_blurb", "Move slowly between thermal pools, sauna and steam, then drift into our relaxation lounges. A complete journey for the body and the breath.")} />
            <div className="mt-9 grid gap-5 sm:grid-cols-2">
              {[
                { t: "Thermal suite", d: "Heated pools, sauna and eucalyptus steam." },
                { t: "Relaxation lounges", d: "Soft light and silence to linger in." },
                { t: "Mineral rituals", d: "Salt, clay and botanical body care." },
                { t: "Quiet by design", d: "An unhurried space, always calm." },
              ].map((c) => (
                <div key={c.t} className="rounded-[1.5rem] p-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(216,207,194,0.16)" }}>
                  <div className="flex items-center gap-2.5">
                    <Drop size={16} color={STONE} />
                    <p className="font-medium text-white">{c.t}</p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">{c.d}</p>
                </div>
              ))}
            </div>
            <a href={book} className="mt-9 inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.18em] transition hover:opacity-90" style={{ background: COPPER, color: "#fff" }} {...editCopy(content, "experience_cta", "Begin your journey")} />
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-[2.5rem] lg:min-h-[480px]">
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: EUCALYPTUS }} />
            )}
            <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent, rgba(46,58,58,0.35))" }} />
          </div>
        </div>
      </section>

      {/* guest voices */}
      <section style={{ background: MIST }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: COPPER }} {...editCopy(content, "voices_eyebrow", "Guest voices")} />
            <h2 style={{ ...serif, color: SLATE }} className="mt-3 text-3xl sm:text-4xl" {...editCopy(content, "voices_heading", "Moments of calm, remembered")} />
          </div>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure key={r.author} className="flex flex-col rounded-[1.75rem] bg-white/70 p-7" style={{ border: "1px solid rgba(110,139,122,0.16)" }}>
                <Drop size={22} color={EUCALYPTUS} />
                <blockquote style={serif} className="mt-4 flex-1 text-[17px] leading-relaxed text-[#2E3A3A]/85">“{r.quote}”</blockquote>
                <figcaption className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2E3A3A]/45">{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* reservation invitation: image + booking */}
      <section className="grid lg:grid-cols-2" style={{ background: CREAM }}>
        <div className="relative min-h-[380px] overflow-hidden">
          {hero ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: STONE }} />
          )}
          <div className="absolute inset-0" style={{ background: "linear-gradient(120deg, rgba(46,58,58,0.25), transparent)" }} />
        </div>
        <div className="flex items-center px-6 py-16 sm:px-12 lg:py-20">
          {bookingOn ? (
            <div className="w-full"><ThermaeBooking tenantId={tenant.id} name={name} /></div>
          ) : (
            <div>
              <h3 style={{ ...serif, color: SLATE }} className="text-3xl" {...editCopy(content, "invite_fallback_heading", "Come and unwind")} />
              {content.phone && <a href={`tel:${content.phone}`} className="mt-5 block" style={{ color: COPPER }}>{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block" style={{ color: COPPER }}>{content.email}</a>}
              <a href={href("contact")} className="mt-7 inline-flex rounded-full px-8 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: EUCALYPTUS }} {...editCopy(content, "invite_fallback_cta", "Contact us")} />
            </div>
          )}
        </div>
      </section>

      {/* visiting band */}
      <section style={{ background: MIST }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: COPPER }} {...editCopy(content, "visiting_find_heading", "Find us")} />
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#2E3A3A]/75">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: EUCALYPTUS }}>Directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: COPPER }} {...editCopy(content, "visiting_hours_heading", "Opening times")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-[#2E3A3A]/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#2E3A3A]/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-[#2E3A3A]/55">Open by reservation.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: COPPER }} {...editCopy(content, "visiting_reach_heading", "Reach us")} />
            <div className="mt-4 space-y-1.5 text-sm text-[#2E3A3A]/75">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#2E3A3A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#2E3A3A]">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90" style={{ background: EUCALYPTUS }} {...editCopy(content, "visiting_reserve_cta", "Reserve a visit")} />
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
