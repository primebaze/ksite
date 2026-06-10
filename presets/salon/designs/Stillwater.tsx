import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { StillwaterHeader } from "./StillwaterHeader";
import { StillwaterBooking } from "./StillwaterBooking";

// Stillwater — a calm, restorative MASSAGE & bodywork therapy clinic (single
// venue), MULTI-PAGE: the nav opens real routes (Treatments / About / Gallery /
// Booking / Contact) under basePath, never scroll anchors. Sticky oat header and
// teal-grey footer are shared. Palette is baked — deep teal-grey, driftwood
// taupe, oat, charcoal ink, muted sage accent. The tenant swaps in their own
// photography, copy, treatments, therapists, hours and contact.
//
// Structural signature (shares nothing with sibling salon designs): a quiet,
// minimal oat hero with a "Release. Restore. Rebalance." headline and lots of
// space; a "find the right treatment" grouped approach (Deep tissue / Sports /
// Swedish / Pregnancy) as understated rows; a "what to expect" reassurance band;
// soft horizontal-line / ripple motifs. Restful, uncluttered, clinical-calm.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const TEAL = "#3A5159"; // deep teal-grey
const DRIFT = "#C9B79C"; // driftwood taupe
const OAT = "#F2EDE3"; // oat
const INK = "#232A2C"; // charcoal ink
const SAGE = "#8FA391"; // muted sage accent
const OAT_DEEP = "#E7DECF"; // a hair deeper than oat for bands

// Static design copy (no brand names, no lorem).
const REVIEWS = [
  { quote: "I walked in carrying months of tension and left feeling like a different person. Genuinely skilled, intuitive hands.", author: "Verified client" },
  { quote: "The most restful, unhurried treatment I have had. They listened, found the knots, and worked at exactly the right pressure.", author: "Verified client" },
  { quote: "My lower back pain has eased more in three sessions here than a year of trying everything else.", author: "Verified client" },
  { quote: "A calm, quiet space and a therapist who clearly knows the body. I leave loose, light and clear-headed every time.", author: "Verified client" },
];

const APPROACH = [
  { name: "Deep tissue", note: "Slow, firm pressure to release chronic knots and long-held tension." },
  { name: "Sports & remedial", note: "Targeted work for recovery, mobility and pre- or post-training care." },
  { name: "Swedish & relaxation", note: "Flowing, full-body massage to calm the nervous system and unwind." },
  { name: "Pregnancy & gentle", note: "Soft, supported treatments adapted to your stage and comfort." },
];

const EXPECT = [
  { step: "01", title: "A quiet welcome", note: "Arrive a few minutes early, settle, and tell us where you hold tension." },
  { step: "02", title: "Hands-on assessment", note: "Your therapist reads the body and agrees pressure and focus with you." },
  { step: "03", title: "Restorative treatment", note: "Unhurried, attentive bodywork in a warm, low-lit, private room." },
  { step: "04", title: "Carry it home", note: "Simple aftercare and stretches so the release lasts well beyond today." },
];

const STATS = [
  { value: "60–90", label: "Minute sessions" },
  { value: "4.9", label: "Average client rating" },
  { value: "8+", label: "Years of practice" },
  { value: "100%", label: "By appointment, never rushed" },
];

const FAQ = [
  { q: "How will I know which treatment is right for me?", a: "Tell us where you hold tension when you book, or simply arrive and we will talk it through. Your therapist will recommend the pressure and approach that suits your body today." },
  { q: "What should I expect at my first session?", a: "Arrive a few minutes early for a short chat about your goals and any injuries. The treatment itself is unhurried and private, and you stay covered apart from the area being worked on." },
  { q: "How much pressure is used?", a: "Entirely your choice. We check in throughout and adjust from light and soothing to firm and deep. Good bodywork should never feel like something to endure." },
  { q: "How often should I come?", a: "For a specific issue, a short course of weekly sessions works well; for maintenance and stress, many clients come every few weeks. We will only ever suggest what genuinely helps." },
];

export default function StillwaterDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const heroImg = hero || "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&w=1600&q=80";

  // ---------- shared bits ----------
  const Ripple = ({ color = TEAL, className = "" }: { color?: string; className?: string }) => (
    <svg viewBox="0 0 200 24" preserveAspectRatio="none" aria-hidden className={className} fill="none" stroke={color}>
      <path d="M0 12c16-12 32-12 48 0s32 12 48 0 32-12 48 0 32 12 48 0" strokeWidth="1.2" opacity="0.5" />
      <path d="M0 18c16-12 32-12 48 0s32 12 48 0 32-12 48 0 32 12 48 0" strokeWidth="1.2" opacity="0.25" />
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
    <footer style={{ background: TEAL }} className="text-[#F2EDE3]/85">
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <Ripple color="#F2EDE3" className="h-5 w-40 opacity-40" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          {content.tagline && <p data-edit="content.tagline" className="mt-3 max-w-xs text-sm leading-relaxed text-[#F2EDE3]/70">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: DRIFT }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-[#F2EDE3]/75 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: DRIFT }}>Visit us</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#F2EDE3]/75">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-[#F2EDE3]/75 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-[#F2EDE3]/75 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-[#F2EDE3]/15 px-6 py-6 text-center text-xs text-[#F2EDE3]/55">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body" >
      <StillwaterHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Quiet oat page banner — clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: OAT }}>
      <div className="mx-auto max-w-4xl px-6 pb-16 pt-32 text-center sm:pt-40">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-8" style={{ background: SAGE }} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>{kicker}</p>
          <span className="h-px w-8" style={{ background: SAGE }} />
        </div>
        <h1 style={{ ...serif, color: TEAL }} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.62)" }}>{blurb}</p>}
      </div>
    </section>
  );

  // ---------- TREATMENTS (services) ----------
  if (page === "services") {
    return shell(
      <main style={{ color: INK }}>
        {banner("Treatments", "Find the right work for your body", "Every session is tailored — choose a treatment below, or tell us where you hold tension and we will guide you.")}
        <section className="mx-auto max-w-4xl px-6 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && (
                    <div className="flex items-center gap-4">
                      <h2 style={{ ...serif, color: TEAL }} className="text-2xl">{section.section}</h2>
                      <span className="h-px flex-1" style={{ background: "rgba(35,42,44,0.12)" }} />
                    </div>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && (
                        <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: SAGE }}>{catg.category}</h3>
                      )}
                      <ul className="divide-y" style={{ borderColor: "rgba(35,42,44,0.1)" }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="text-[17px] font-medium" style={{ color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(35,42,44,0.55)" }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p style={{ color: "rgba(35,42,44,0.55)" }}>Our treatment menu is coming soon.</p>}

          <div className="mt-16 rounded-2xl px-8 py-12 text-center" style={{ background: OAT }}>
            <h3 style={{ ...serif, color: TEAL }} className="text-2xl">Not sure where to begin?</h3>
            <p className="mx-auto mt-3 max-w-lg text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.62)" }}>Tell us where you carry tension and we will match you to the right hands and pressure.</p>
            <a href={book} className="mt-6 inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: TEAL, color: OAT }}>Book a session</a>
          </div>
        </section>
      </main>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <main style={{ color: INK }}>
        {banner("About", "A quiet practice built around release")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.95]" style={{ color: "rgba(35,42,44,0.75)" }}>{content.about}</p>
          ) : <p style={{ color: "rgba(35,42,44,0.55)" }}>Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl sm:text-4xl" style={{ ...serif, color: TEAL }}>{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.5)" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section style={{ background: OAT }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="text-center">
                <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Your therapists</p>
                <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">The hands behind the work</h2>
              </div>
              <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full" style={{ background: DRIFT }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-5 text-lg font-medium" style={{ color: INK }}>{m.name}</p>
                    {m.role && <p className="text-sm" style={{ color: "rgba(35,42,44,0.55)" }}>{m.role}</p>}
                    {m.credentials && <p className="text-xs" style={{ color: "rgba(35,42,44,0.4)" }}>{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Good to know</p>
            <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">Questions, answered</h2>
          </div>
          <div className="mt-10 divide-y" style={{ borderColor: "rgba(35,42,44,0.12)", borderTop: "1px solid rgba(35,42,44,0.12)", borderBottom: "1px solid rgba(35,42,44,0.12)" }}>
            {FAQ.map((it) => (
              <div key={it.q} className="py-6">
                <p className="text-[15px] font-medium" style={{ color: TEAL }}>{it.q}</p>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: "rgba(35,42,44,0.6)" }}>{it.a}</p>
              </div>
            ))}
          </div>
        </section>
      </main>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <main style={{ color: INK }}>
        {banner("Gallery", "Inside the practice", "A glimpse of our calm, private treatment rooms.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20" style={{ color: "rgba(35,42,44,0.55)" }}>Photos coming soon.</p>}
      </main>,
    );
  }

  // ---------- BOOKING (reservations) ----------
  if (page === "reservations") {
    return shell(
      <main style={{ color: INK }}>
        {banner("Book", "Reserve your time to unwind", "Request a session below. Tell us where you hold tension and a time that suits — we will confirm with you.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: TEAL }} className="text-3xl">Unhurried, attentive care</h2>
            <p className="mt-4 text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.65)" }}>Every booking begins with listening. We will agree pressure and focus before we start, and check in throughout so the session is always working for you.</p>
            <ul className="mt-7 space-y-3 text-sm" style={{ color: "rgba(35,42,44,0.75)" }}>
              {["Pressure tailored to you, never one-size-fits-all", "Qualified, experienced bodywork therapists", "Warm, low-lit, private treatment rooms", "Simple aftercare so the release lasts"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full text-[11px]" style={{ background: SAGE, color: "#fff" }}>✓</span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm" style={{ color: "rgba(35,42,44,0.65)" }}>Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: TEAL }}>{content.phone}</a></p>
            )}
          </div>
          <StillwaterBooking tenantId={tenant.id} name={name} />
        </section>
      </main>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <main style={{ color: INK }}>
        {banner("Contact", "Get in touch", "Visit us, call, or send a message and we will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...serif, color: TEAL }} className="text-2xl">Clinic details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.75)" }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-60">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-60">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 pt-6 text-sm" style={{ color: "rgba(35,42,44,0.75)", borderTop: "1px solid rgba(35,42,44,0.12)" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "rgba(35,42,44,0.5)" }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: TEAL, color: OAT }}>Get directions</a>
              )}
              <a href={book} className="inline-flex rounded-full border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#3A5159] hover:text-[#F2EDE3]" style={{ borderColor: TEAL, color: TEAL }}>Book a session</a>
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
              contactBlurb="A question about a treatment, pressure or your first visit? We would love to hear from you."
              contactCta="Send message"
              theme={{ card: OAT, cardBorder: "rgba(35,42,44,0.1)", heading: TEAL, blurb: "rgba(35,42,44,0.65)", label: "rgba(35,42,44,0.6)", fieldBg: "#ffffff", fieldBorder: "rgba(35,42,44,0.16)", fieldText: INK, button: TEAL, buttonText: OAT, radius: "0.9rem", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden rounded-2xl">
                <iframe title="Map" src={content.map_url} className="h-full min-h-[360px] w-full border-0" loading="lazy" />
              </div>
            )
          )}
        </section>
      </main>,
    );
  }

  // ---------- HOME ----------
  const teaseCategories = groups
    .flatMap((s) => s.categories.map((c) => ({ label: c.category ?? s.section, items: c.items })))
    .filter((c) => c.label)
    .slice(0, 4);

  return shell(
    <main style={{ color: INK }}>
      {/* quiet, minimal hero — oat field, calm headline, lots of space */}
      <section className="relative overflow-hidden" style={{ background: OAT }}>
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 pb-20 pt-36 sm:pt-44 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:pb-28">
          <div>
            {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>{content.tagline}</p>}
            <h1 data-edit="tenant.business_name" style={{ ...serif, color: TEAL }} className="mt-5 text-5xl font-medium leading-[1.04] sm:text-6xl">
              Release.<br />Restore.<br />Rebalance.
            </h1>
            <Ripple className="mt-7 h-5 w-44" />
            <p className="mt-6 max-w-md text-[16px] leading-relaxed" style={{ color: "rgba(35,42,44,0.66)" }}>
              {name} is a calm, focused massage &amp; bodywork practice. Expert hands, unhurried sessions, and pressure tailored to your body — to release tension and bring you back to ease.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={book} className="inline-flex rounded-full px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: TEAL, color: OAT }}>Book a session</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex rounded-full border px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:bg-[#3A5159] hover:text-[#F2EDE3]" style={{ borderColor: TEAL, color: TEAL }}>View treatments</a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[1.75rem]" style={{ aspectRatio: "4 / 5", background: DRIFT }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={heroImg} alt="" data-edit-image="hero" className="h-full w-full object-cover" />
            </div>
            <div className="pointer-events-none absolute -bottom-5 -left-5 hidden h-24 w-24 rounded-full sm:block" style={{ background: SAGE, opacity: 0.18 }} />
          </div>
        </div>
      </section>

      {/* welcome / intro */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-8" style={{ background: SAGE }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Welcome</p>
            <span className="h-px w-8" style={{ background: SAGE }} />
          </div>
          <p data-edit="content.about" className="mt-6 text-[19px] leading-[1.95]" style={{ color: "rgba(35,42,44,0.72)" }}>{content.about}</p>
        </section>
      )}

      {/* find the right treatment — understated grouped rows */}
      <section style={{ background: OAT_DEEP }}>
        <div className="mx-auto max-w-5xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Where to start</p>
            <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">Find the right treatment</h2>
            <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.62)" }}>Four ways into the work. Not sure which is for you? Tell us where you hold tension and we will match you.</p>
          </div>
          <ul className="mx-auto mt-12 max-w-3xl divide-y" style={{ borderColor: "rgba(35,42,44,0.14)", borderTop: "1px solid rgba(35,42,44,0.14)", borderBottom: "1px solid rgba(35,42,44,0.14)" }}>
            {APPROACH.map((a, i) => (
              <li key={a.name} className="flex items-baseline gap-5 py-6">
                <span className="text-sm font-semibold tabular-nums" style={{ color: SAGE }}>{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-lg font-medium" style={{ color: TEAL }}>{a.name}</p>
                  <p className="mt-1 text-sm leading-relaxed" style={{ color: "rgba(35,42,44,0.6)" }}>{a.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* treatments teaser → full menu */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Treatments</p>
              <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">A menu built around the body</h2>
            </div>
            <a href={href("services")} className="hidden shrink-0 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-60 sm:inline" style={{ color: TEAL }}>View all →</a>
          </div>
          <div className="mt-10 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {teaseCategories.map((c) => (
              <div key={c.label}>
                <h3 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: SAGE }}>{c.label}</h3>
                <ul className="divide-y" style={{ borderColor: "rgba(35,42,44,0.1)" }}>
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 py-3">
                      <span data-edit={`item:${item.id}:name`} className="text-[15px]" style={{ color: INK }}>{item.name}</span>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: TEAL }}>{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center sm:hidden">
            <a href={href("services")} className="inline-flex rounded-full px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: TEAL, color: OAT }}>View all treatments</a>
          </div>
        </section>
      )}

      {/* what to expect — reassurance band */}
      <section style={{ background: TEAL }}>
        <div className="mx-auto max-w-6xl px-6 py-20 text-[#F2EDE3]">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: DRIFT }}>What to expect</p>
            <h2 style={serif} className="mt-3 text-3xl text-white sm:text-4xl">Your visit, start to finish</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#F2EDE3]/75">No surprises, no pressure to do more than you need. Just calm, considered care from the moment you arrive.</p>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl sm:grid-cols-2 lg:grid-cols-4" style={{ background: "rgba(242,237,227,0.14)" }}>
            {EXPECT.map((e) => (
              <div key={e.step} className="p-7" style={{ background: TEAL }}>
                <span style={{ ...serif, color: DRIFT }} className="text-3xl">{e.step}</span>
                <p className="mt-3 text-base font-medium text-white">{e.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-[#F2EDE3]/72">{e.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* reviews — quiet static cards */}
      <section style={{ background: OAT }}>
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>In their words</p>
            <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">How it feels to leave lighter</h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex h-full flex-col rounded-2xl bg-white p-7" style={{ border: "1px solid rgba(35,42,44,0.08)" }}>
                <Ripple className="h-4 w-20" color={SAGE} />
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.7)" }}>{r.quote}</blockquote>
                <figcaption className="mt-5 text-sm font-semibold" style={{ color: TEAL }}>{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* therapists preview */}
      {team.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Your therapists</p>
            <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">Expert, intuitive hands</h2>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.slice(0, 6).map((m) => (
              <div key={m.id} className="text-center">
                <div className="mx-auto h-44 w-44 overflow-hidden rounded-full" style={{ background: DRIFT }}>
                  {m.photo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <p className="mt-5 text-lg font-medium" style={{ color: INK }}>{m.name}</p>
                {m.role && <p className="text-sm" style={{ color: "rgba(35,42,44,0.55)" }}>{m.role}</p>}
                {m.credentials && <p className="text-xs" style={{ color: "rgba(35,42,44,0.4)" }}>{m.credentials}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* booking band: image + form, or details fallback */}
      <section style={{ background: OAT_DEEP }}>
        <div className="mx-auto grid max-w-6xl items-stretch gap-10 px-6 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div className="flex flex-col justify-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: SAGE }}>Ready when you are</p>
            <h2 style={{ ...serif, color: TEAL }} className="mt-3 text-3xl sm:text-4xl">Make space to feel better</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed" style={{ color: "rgba(35,42,44,0.65)" }}>Book a session and let your body rest. We will confirm your time and tailor the work to exactly what you need.</p>
            <Ripple className="mt-7 h-5 w-48" />
          </div>
          {bookingOn ? (
            <StillwaterBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="flex flex-col justify-center rounded-2xl p-9" style={{ background: TEAL }}>
              <h3 style={serif} className="text-2xl text-white">Get in touch</h3>
              {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-[#F2EDE3]">{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-[#F2EDE3]">{content.email}</a>}
              <a href={href("contact")} className="mt-6 inline-flex w-fit rounded-full px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: OAT, color: TEAL }}>Contact us</a>
            </div>
          )}
        </div>
      </section>

      {/* details band */}
      <section style={{ background: OAT }} className="border-t" >
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3" style={{ borderColor: "rgba(35,42,44,0.08)" }}>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: SAGE }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed" style={{ color: "rgba(35,42,44,0.72)" }}>{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: TEAL }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: SAGE }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm" style={{ color: "rgba(35,42,44,0.72)" }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: "rgba(35,42,44,0.5)" }}>{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm" style={{ color: "rgba(35,42,44,0.5)" }}>Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: SAGE }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm" style={{ color: "rgba(35,42,44,0.72)" }}>
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-60">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-60">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: TEAL, color: OAT }}>Book a session</a>
          </div>
        </div>
      </section>
    </main>,
    false,
  );
}
