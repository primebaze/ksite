import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LumenHeader } from "./LumenHeader";
import { LumenBooking } from "./LumenBooking";

// Lumen — a crisp, design-led independent optician & eyewear boutique (single
// venue). MULTI-PAGE: the nav opens real routes (Services / About / Gallery /
// Book / Contact) under basePath, never scroll anchors. Editorial, high-
// contrast register: near-black ink on optical white, a lens-blue secondary and
// a warm tortoiseshell-amber accent. The recurring motif is a circular lens /
// aperture / focus ring. The tenant swaps in their own photography, copy,
// services, opticians, hours and contact; the palette and structure are baked.
//
// Structural signature (shared with NO sibling): a gallery-like white/ink hero
// with a precise "See the difference" headline beside an eyewear image; a focus-
// ring motif; an "eye care & eyewear" split (clinical eye tests one side,
// curated frames the other); services as clean divider rows grouped by section;
// a trust strip (OCT scanning, independent dispensing, etc.).

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#181A1B";
const WHITE = "#FBFBF9";
const BLUE = "#3C6E91";
const AMBER = "#B07A36";
const GREY = "#E9E9E5";

// Static design copy (no brand names, no lorem) — reviews, trust, stats and FAQ
// are not tenant data, so they live as small design arrays per the runbook.
const REVIEWS = [
  { quote: "The most thorough eye test I have ever had. They talked me through every scan and never rushed a thing.", author: "Verified patient" },
  { quote: "An honest, considered approach to frames. They found a pair that suits my face and my prescription perfectly.", author: "Verified patient" },
  { quote: "Switched to them after years elsewhere. The OCT scan picked up something my old optician missed entirely.", author: "Verified patient" },
  { quote: "Calm, precise and genuinely independent. No pressure, no upselling, just brilliant eye care.", author: "Verified patient" },
];

const TRUST = [
  { title: "OCT scanning", note: "3D imaging at every eye test" },
  { title: "Independent", note: "Hand-curated frame collections" },
  { title: "Registered", note: "GOC-registered optometrists" },
  { title: "Precision fitting", note: "Lenses measured to the millimetre" },
];

const STATS = [
  { value: "20+", label: "Frame houses curated" },
  { value: "4.9", label: "Average patient rating" },
  { value: "60min", label: "Unhurried eye exam" },
  { value: "1:1", label: "Personal dispensing" },
];

const FAQ = [
  { q: "How long does an eye examination take?", a: "Allow around an hour. We never rush — your test includes OCT 3D scanning, a full sight assessment and time to talk through the results and any frame or lens options." },
  { q: "Do I need an appointment, or can I just browse frames?", a: "You are very welcome to browse our collections any time. Eye examinations and contact-lens fittings are by appointment so we can give you our full, unhurried attention." },
  { q: "Can you make up lenses for my existing frames?", a: "In most cases, yes. Bring your frames in and our dispensing team will assess whether they can safely take new lenses and advise on the best options for your prescription." },
  { q: "Do you test children's eyes?", a: "We do. Children's eye care is a core part of our practice, with relaxed, child-friendly testing and clear guidance for parents at every stage." },
];

export default function LumenDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Book via the tenant's external booking link if set, else our booking page.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));

  const HERO_FALLBACK =
    "https://images.unsplash.com/photo-1574258495973-f010dfbb5371?auto=format&fit=crop&w=1500&q=80";
  const heroImg = hero || HERO_FALLBACK;

  const nav = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
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

  // eye / lens motif used through the design
  const EyeMark = ({ size = 24, color = INK }: { size?: number; color?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.4" aria-hidden>
      <path d="M1.5 12S5 5.5 12 5.5 22.5 12 22.5 12 19 18.5 12 18.5 1.5 12 1.5 12z" />
      <circle cx="12" cy="12" r="3.2" />
    </svg>
  );

  // ---------- footer ----------
  const footer = (
    <footer style={{ background: INK }} className="text-[#FBFBF9]/85">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-7 w-7 place-items-center rounded-full border-[1.5px]" style={{ borderColor: AMBER }} aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full border-[1.5px]" style={{ borderColor: WHITE }} />
            </span>
            <p data-edit="tenant.business_name" style={serif} className="text-2xl text-white">{name}</p>
          </div>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[#FBFBF9]/60">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-white"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Explore</h4>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((l) => (
              <li key={l.href}><a href={l.href} className="text-[#FBFBF9]/70 transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Visit the practice</h4>
          {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#FBFBF9]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block text-[#FBFBF9]/70 transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block text-[#FBFBF9]/70 transition hover:text-white">{content.email}</a>}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-[#FBFBF9]/45">
        © {new Date().getFullYear()} {name}. All rights reserved.
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <div style={{ background: WHITE, color: INK }}>
        <LumenHeader name={name} book={book} links={nav} home={href("home")} phone={content.phone} solid={solid} />
        {children}
        {footer}
      </div>
    </div>
  );

  // Sub-page banner — optical-white with a thin amber focus ring, clears the
  // fixed header.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: WHITE }} className="border-b" >
      <div className="mx-auto max-w-5xl px-6 pb-16 pt-36 sm:pt-44" style={{ borderColor: GREY }}>
        <div className="flex items-center gap-3">
          <span className="h-px w-10" style={{ background: AMBER }} />
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>{kicker}</p>
        </div>
        <h1 style={serif} className="mt-4 text-4xl font-medium leading-[1.05] sm:text-6xl" >{title}</h1>
        {blurb && <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[#181A1B]/60">{blurb}</p>}
      </div>
    </section>
  );

  // ---------- SERVICES ----------
  if (page === "services") {
    return shell(
      <>
        {banner("Services", "Eye care & eyewear", "Clinical eye examinations, contact-lens care, and a considered approach to frames and lenses. Every appointment is unhurried and personal.")}
        <section className="mx-auto max-w-5xl px-6 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && (
                    <div className="flex items-center gap-3">
                      <EyeMark size={20} color={BLUE} />
                      <h2 style={serif} className="text-2xl">{section.section}</h2>
                    </div>
                  )}
                  <div className="mt-8 space-y-12">
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"}>
                        {catg.category && (
                          <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>{catg.category}</h3>
                        )}
                        <ul className="mt-4 divide-y" style={{ borderColor: GREY }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-6 py-4" style={{ borderColor: GREY }}>
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="font-medium" style={{ color: INK }}>{item.name}</p>
                                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm leading-relaxed text-[#181A1B]/55">{item.description}</p>}
                              </div>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: BLUE }}>{item.price}</span>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : <p className="text-[#181A1B]/50">Our services are coming soon.</p>}

          <div className="mt-16 flex flex-col items-start gap-5 border p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10" style={{ borderColor: INK }}>
            <div>
              <h3 style={serif} className="text-2xl">Due for an eye test?</h3>
              <p className="mt-2 max-w-md text-[15px] leading-relaxed text-[#181A1B]/60">Book a full examination with OCT scanning and let us look after your vision.</p>
            </div>
            <a href={book} className="inline-flex shrink-0 px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: INK }}>Book a visit</a>
          </div>
        </section>
      </>,
    );
  }

  // ---------- ABOUT ----------
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Independent by design")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {content.about ? (
            <p data-edit="content.about" className="text-[17px] leading-[1.9] text-[#181A1B]/80">{content.about}</p>
          ) : <p className="text-[#181A1B]/50">Our story is coming soon.</p>}

          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 border-t pt-12 sm:grid-cols-4" style={{ borderColor: GREY }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-4xl" style={{ ...serif, color: BLUE }}>{s.value}</p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.14em] text-[#181A1B]/50">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {team.length > 0 && (
          <section className="border-t" style={{ background: GREY, borderColor: GREY }}>
            <div className="mx-auto max-w-6xl px-6 py-20">
              <div className="flex items-center gap-3">
                <span className="h-px w-10" style={{ background: AMBER }} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>The team</p>
              </div>
              <h2 style={serif} className="mt-4 text-3xl sm:text-4xl">Your optometrists & dispensing opticians</h2>
              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id}>
                    <div className="aspect-[4/5] w-full overflow-hidden" style={{ background: WHITE }}>
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p className="mt-4 text-lg font-medium" style={serif}>{m.name}</p>
                    {m.role && <p className="text-sm text-[#181A1B]/55">{m.role}</p>}
                    {m.credentials && <p className="mt-0.5 text-xs uppercase tracking-[0.12em]" style={{ color: BLUE }}>{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="mx-auto max-w-3xl px-6 py-20">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: AMBER }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>Good to know</p>
          </div>
          <h2 style={serif} className="mt-4 text-3xl sm:text-4xl">Common questions</h2>
          <dl className="mt-10 divide-y border-y" style={{ borderColor: GREY }}>
            {FAQ.map((f) => (
              <div key={f.q} className="py-6" style={{ borderColor: GREY }}>
                <dt className="text-[15px] font-medium" style={{ color: INK }}>{f.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-[#181A1B]/60">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      </>,
    );
  }

  // ---------- GALLERY ----------
  if (page === "gallery") {
    return shell(
      <>
        {banner("Gallery", "Inside the practice", "A look at our consulting rooms and the frame collections we curate.")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-6 py-20 text-[#181A1B]/50">Photos coming soon.</p>}
      </>,
    );
  }

  // ---------- BOOK (reservations) ----------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book", "Reserve your appointment", "Book a full eye examination, contact-lens fitting or a frames-styling consultation. Tell us a little about you and we will confirm your slot.")}
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <h2 style={serif} className="text-3xl">Precise, unhurried eye care</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#181A1B]/60">Every visit is built around you. We take the time to assess your vision and eye health properly, explain what we find, and guide you to the right lenses and frames — never the other way around.</p>
            <ul className="mt-8 space-y-4 text-sm text-[#181A1B]/75">
              {["Full eye examination with OCT 3D scanning", "GOC-registered optometrists", "Independent, hand-curated frame houses", "Lenses measured and fitted to the millimetre"].map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0"><EyeMark size={18} color={AMBER} /></span>
                  {t}
                </li>
              ))}
            </ul>
            {content.phone && (
              <p className="mt-8 text-sm text-[#181A1B]/60">Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold" style={{ color: BLUE }}>{content.phone}</a></p>
            )}
          </div>
          <LumenBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---------- CONTACT ----------
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Visit us", "Find the practice, call, or send a message and we will get back to you.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={serif} className="text-2xl">Practice details</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#181A1B]/75">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-60">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-60">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[#181A1B]/75" style={{ borderColor: GREY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#181A1B]/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            <div className="mt-7 flex flex-wrap gap-3">
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: INK }}>Get directions</a>
              )}
              <a href={book} className="inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[#181A1B] hover:text-white" style={{ borderColor: INK, color: INK }}>Book a visit</a>
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-8 flex gap-4" style={{ color: INK }}>
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
              contactBlurb="Questions about an eye test, a prescription or your frames? We would love to hear from you."
              contactCta="Send message"
              theme={{ card: WHITE, cardBorder: INK, heading: INK, blurb: "rgba(24,26,27,0.6)", label: "rgba(24,26,27,0.55)", fieldBg: "#ffffff", fieldBorder: "rgba(24,26,27,0.15)", fieldText: INK, button: INK, buttonText: "#ffffff", radius: "0", font: "var(--font-fraunces)" }}
            />
          ) : (
            content.map_url && (
              <div className="overflow-hidden">
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
  const galleryShots = gallery.map((g) => g.image_url).filter(Boolean) as string[];
  const splitImg = galleryShots[0] || heroImg;

  return shell(
    <>
      {/* HERO — gallery-like, high-contrast white/ink split */}
      <section style={{ background: WHITE }}>
        <div className="mx-auto grid max-w-6xl items-stretch gap-0 px-6 pt-32 pb-0 lg:grid-cols-2 lg:gap-12 lg:pt-40">
          <div className="flex flex-col justify-center pb-16 lg:pb-24">
            <div className="flex items-center gap-3">
              <span className="h-px w-12" style={{ background: AMBER }} />
              {content.tagline ? (
                <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>{content.tagline}</p>
              ) : (
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>Independent optician</p>
              )}
            </div>
            <h1 style={serif} className="mt-6 text-5xl font-medium leading-[0.98] tracking-[-0.01em] sm:text-7xl">
              See the<br />difference.
            </h1>
            <p className="mt-6 max-w-md text-[16px] leading-relaxed text-[#181A1B]/65">
              <span data-edit="tenant.business_name" className="font-medium" style={{ color: INK }}>{name}</span> — precision eye care and considered eyewear from an independent practice. Sharp vision, expert dispensing, frames worth wearing.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href={book} className="inline-flex px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: INK }}>Book an eye test</a>
              {groups.length > 0 && (
                <a href={href("services")} className="inline-flex border px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#181A1B] hover:text-white" style={{ borderColor: INK, color: INK }}>Our services</a>
              )}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden lg:aspect-auto lg:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-edit-image="hero" src={heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
            </div>
            {/* focus-ring / aperture motif overlay */}
            <span className="pointer-events-none absolute -left-5 top-8 hidden h-24 w-24 rounded-full border-2 lg:block" style={{ borderColor: AMBER }} aria-hidden />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section style={{ background: INK }}>
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-start gap-3 px-2">
              <span className="mt-0.5 shrink-0"><EyeMark size={20} color={AMBER} /></span>
              <div>
                <p className="text-sm font-semibold text-white">{t.title}</p>
                <p className="mt-0.5 text-xs text-[#FBFBF9]/55">{t.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* INTRO statement */}
      {content.about && (
        <section className="mx-auto max-w-4xl px-6 py-24" style={{ background: WHITE }}>
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: AMBER }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>The practice</p>
          </div>
          <p data-edit="content.about" style={serif} className="mt-6 text-2xl leading-[1.45] text-[#181A1B] sm:text-3xl sm:leading-[1.4]">{content.about}</p>
        </section>
      )}

      {/* EYE CARE & EYEWEAR SPLIT — the structural signature */}
      <section style={{ background: GREY }} className="border-y" >
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-0 md:grid-cols-2" style={{ borderColor: GREY }}>
          <div className="flex flex-col justify-center px-2 py-16 md:pr-12">
            <EyeMark size={28} color={BLUE} />
            <h2 style={serif} className="mt-5 text-3xl sm:text-4xl">Eye care</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#181A1B]/65">Thorough, unhurried examinations with OCT 3D scanning to look beyond the surface — protecting your sight and your eye health for the long term.</p>
            <ul className="mt-6 space-y-2.5 text-sm text-[#181A1B]/70">
              {["Comprehensive eye examinations", "OCT retinal scanning", "Contact-lens fitting & aftercare", "Children's eye care"].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />{t}</li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[320px] overflow-hidden md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={splitImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
        <div className="mx-auto grid max-w-6xl gap-px px-6 py-0 md:grid-cols-2">
          <div className="relative order-last min-h-[320px] overflow-hidden md:order-first md:min-h-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={galleryShots[1] || heroImg} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-center px-2 py-16 md:pl-12">
            <span className="grid h-7 w-7 place-items-center rounded-full border-2" style={{ borderColor: AMBER }} aria-hidden>
              <span className="h-2.5 w-2.5 rounded-full" style={{ background: BLUE }} />
            </span>
            <h2 style={serif} className="mt-5 text-3xl sm:text-4xl">Eyewear</h2>
            <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-[#181A1B]/65">A hand-curated edit of independent frame houses, dispensed with care. We find the shape, colour and lens that suit your face, your prescription and how you live.</p>
            <ul className="mt-6 space-y-2.5 text-sm text-[#181A1B]/70">
              {["Curated independent frames", "Personal styling & dispensing", "Precision lens technology", "Repairs & adjustments"].map((t) => (
                <li key={t} className="flex items-center gap-2.5"><span className="h-1.5 w-1.5 rounded-full" style={{ background: AMBER }} />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* SERVICES teaser — clean divider rows grouped, links to full page */}
      {teaseCategories.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24" style={{ background: WHITE }}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-10" style={{ background: AMBER }} />
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>Services</p>
              </div>
              <h2 style={serif} className="mt-4 text-3xl sm:text-4xl">What we offer</h2>
            </div>
            <a href={href("services")} className="text-sm font-medium underline-offset-4 hover:underline" style={{ color: BLUE }}>View all services →</a>
          </div>
          <div className="mt-12 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {teaseCategories.map((c) => (
              <div key={c.label}>
                <h3 className="border-b pb-3 text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER, borderColor: GREY }}>{c.label}</h3>
                <ul className="mt-3 divide-y" style={{ borderColor: GREY }}>
                  {c.items.slice(0, 4).map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 py-3" style={{ borderColor: GREY }}>
                      <span data-edit={`item:${item.id}:name`} className="text-sm font-medium" style={{ color: INK }}>{item.name}</span>
                      {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm" style={{ color: BLUE }}>{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* REVIEWS — static, ink panel */}
      <section style={{ background: INK }}>
        <div className="mx-auto max-w-6xl px-6 py-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-10" style={{ background: AMBER }} />
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>In their words</p>
          </div>
          <h2 style={serif} className="mt-4 text-3xl text-white sm:text-4xl">What our patients say</h2>
          <div className="mt-12 grid gap-px sm:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure key={r.quote} className="flex h-full flex-col px-2 py-6">
                <div className="flex gap-0.5" aria-hidden style={{ color: AMBER }}>
                  {Array.from({ length: 5 }).map((_, s) => <span key={s}>★</span>)}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-[#FBFBF9]/80">{r.quote}</blockquote>
                <figcaption className="mt-5 text-xs uppercase tracking-[0.14em] text-[#FBFBF9]/50">{r.author}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKING band: portrait + crisp booking panel */}
      <section style={{ background: GREY }}>
        <div className="mx-auto grid max-w-6xl gap-0 px-6 py-20 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
          <div className="flex flex-col justify-center pb-12 lg:pb-0">
            <div className="flex items-center gap-3">
              <span className="h-px w-10" style={{ background: AMBER }} />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AMBER }}>Book a visit</p>
            </div>
            <h2 style={serif} className="mt-4 text-3xl sm:text-4xl">Ready when you are</h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-[#181A1B]/65">Reserve a full eye examination, a contact-lens fitting, or a relaxed frames-styling appointment. We will confirm every booking personally.</p>
            {content.phone && (
              <p className="mt-6 text-sm text-[#181A1B]/60">Or call us on <a href={`tel:${content.phone}`} className="font-semibold" style={{ color: BLUE }}>{content.phone}</a></p>
            )}
          </div>
          {bookingOn ? (
            <LumenBooking tenantId={tenant.id} name={name} />
          ) : (
            <div className="flex flex-col justify-center border p-9" style={{ borderColor: INK, background: WHITE }}>
              <h3 style={serif} className="text-2xl">Get in touch</h3>
              {content.phone && <a href={`tel:${content.phone}`} className="mt-4 block text-[#181A1B]/75">{content.phone}</a>}
              {content.email && <a href={`mailto:${content.email}`} className="mt-1 block text-[#181A1B]/75">{content.email}</a>}
              <a href={href("contact")} className="mt-6 inline-flex w-fit px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: INK }}>Contact us</a>
            </div>
          )}
        </div>
      </section>

      {/* DETAILS band: address + hours + contact */}
      <section className="border-t" style={{ background: WHITE, borderColor: GREY }}>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Visit us</h3>
            {content.address && <p data-edit="content.address" className="mt-4 whitespace-pre-line text-sm leading-relaxed text-[#181A1B]/75">{content.address}</p>}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex text-sm font-semibold" style={{ color: BLUE }}>Get directions →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Opening hours</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-4 space-y-2 text-sm text-[#181A1B]/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#181A1B]/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-4 text-sm text-[#181A1B]/50">Open by appointment.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: AMBER }}>Contact</h3>
            <div className="mt-4 space-y-1.5 text-sm text-[#181A1B]/75">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-60">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-60">{content.email}</a>}
            </div>
            <a href={book} className="mt-5 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90" style={{ background: INK }}>Book a visit</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
