import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { CamelliaHeader } from "./CamelliaHeader";
import { CamelliaBooking } from "./CamelliaBooking";

// Camellia — a genteel English afternoon TEAROOM (single venue), MULTI-PAGE: the
// nav opens real routes (Menu / Reservations / Gallery / About / Contact) under
// basePath, never scroll anchors. Each page is its own layout; the transparent
// floral header and footer are shared via shell(). Palette is baked from a
// heritage country-garden register: rose, sage, duck-egg blue, clotted cream,
// soft gold and a warm grey-brown ink. The tenant swaps in their own photography,
// copy, menu, hours, socials and contact details.
//
// Signature, sharing no resemblance to siblings:
//  - a soft, romantic cream hero with a delicate floral-sprig motif and an
//    italic script-like serif wordmark
//  - a "the afternoon tea" TIERED-STAND feature (scones / sandwiches / cakes)
//  - a pretty loose-leaf "our teas" list as clean divide-y rows
//  - botanical camellia-sprig dividers and fine gold hairline rules throughout

const display = { fontFamily: "var(--font-fraunces)" } as const;
const ROSE = "#C56B7A";
const SAGE = "#9FB08A";
const DUCK = "#AFCBD0";
const CREAM = "#FBF4E9";
const GOLD = "#C2A24C";
const INK = "#4A3F3A";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// A single camellia bloom mark, recoloured per use.
function Bloom({ color = ROSE, size = 26, className }: { color?: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden className={className}>
      <ellipse cx="12" cy="5.6" rx="2.7" ry="3.8" fill={color} opacity="0.85" />
      <ellipse cx="18.4" cy="12" rx="3.8" ry="2.7" fill={color} opacity="0.7" />
      <ellipse cx="12" cy="18.4" rx="2.7" ry="3.8" fill={color} opacity="0.85" />
      <ellipse cx="5.6" cy="12" rx="3.8" ry="2.7" fill={color} opacity="0.7" />
      <ellipse cx="7.6" cy="7.6" rx="2.9" ry="2.3" fill={color} opacity="0.55" transform="rotate(-45 7.6 7.6)" />
      <ellipse cx="16.4" cy="16.4" rx="2.9" ry="2.3" fill={color} opacity="0.55" transform="rotate(-45 16.4 16.4)" />
      <circle cx="12" cy="12" r="3" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={GOLD} />
    </svg>
  );
}

// A botanical sprig divider: a fine gold rule with a small leafed bloom centred.
function SprigDivider({ tint = SAGE, className = "" }: { tint?: string; className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden>
      <span className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}88)` }} />
      <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
        <path d="M3 9c5 0 7-3 9-3M31 9c-5 0-7-3-9-3" stroke={tint} strokeWidth="1.1" strokeLinecap="round" />
        <ellipse cx="9" cy="6.5" rx="2.4" ry="1.3" fill={tint} opacity="0.7" transform="rotate(-25 9 6.5)" />
        <ellipse cx="25" cy="6.5" rx="2.4" ry="1.3" fill={tint} opacity="0.7" transform="rotate(25 25 6.5)" />
      </svg>
      <Bloom color={ROSE} size={18} />
      <svg width="34" height="18" viewBox="0 0 34 18" fill="none">
        <path d="M31 9c-5 0-7-3-9-3M3 9c5 0 7-3 9-3" stroke={tint} strokeWidth="1.1" strokeLinecap="round" />
        <ellipse cx="25" cy="6.5" rx="2.4" ry="1.3" fill={tint} opacity="0.7" transform="rotate(25 25 6.5)" />
        <ellipse cx="9" cy="6.5" rx="2.4" ry="1.3" fill={tint} opacity="0.7" transform="rotate(-25 9 6.5)" />
      </svg>
      <span className="h-px w-16 sm:w-24" style={{ background: `linear-gradient(270deg, transparent, ${GOLD}88)` }} />
    </div>
  );
}

// A faint floral-sprig field used behind cream sections (the romantic motif).
function FloralField({ opacity = 0.5 }: { opacity?: number }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden style={{ opacity }}>
      <Bloom color={ROSE} size={130} className="absolute -left-10 -top-8 rotate-12" />
      <Bloom color={SAGE} size={86} className="absolute right-8 top-16 -rotate-12" />
      <Bloom color={DUCK} size={108} className="absolute -right-8 bottom-4 rotate-6" />
      <Bloom color={GOLD} size={64} className="absolute left-1/3 bottom-10 -rotate-6" />
    </div>
  );
}

export default function CamelliaDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const book = bookingOn ? href("reservations") : content.reservation_url || href("contact");

  const nav = [
    groups.length > 0 && { label: "Menu", href: href("menu") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // The afternoon-tea tiered stand: three elegant tiers (scones / sandwiches /
  // cakes). Pulls real menu items when available, with graceful copy fallback.
  const TIERS = [
    { tier: "Top tier", title: "Cakes & pastries", note: "Victoria sponge, lemon drizzle, fruit scones with clotted cream", tint: ROSE },
    { tier: "Middle tier", title: "Finger sandwiches", note: "Cucumber, smoked salmon, coronation chicken, egg & cress", tint: SAGE },
    { tier: "Bottom tier", title: "Warm scones", note: "Plain & fruit, with clotted cream and strawberry preserve", tint: DUCK },
  ];

  // ---- shared footer (cream, with gold rule + sprigs + CTA) ----
  const footer = (
    <footer style={{ background: INK }} className="text-white/85">
      <div className="mx-auto max-w-6xl px-6 pt-16 sm:px-8">
        <SprigDivider tint={DUCK} className="opacity-90" />
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-14 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <Bloom color={ROSE} size={24} />
            <span data-edit="tenant.business_name" style={{ ...display, color: CREAM, fontStyle: "italic" }} className="text-3xl font-medium">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: DUCK }}>Find us social</h4>
              <div className="mt-4 flex gap-4 text-white/85">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#C56B7A]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: DUCK }}>Wander</h4>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            {([
              groups.length > 0 && { label: "The menu", href: href("menu") },
              bookingOn && { label: "Reservations", href: href("reservations") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              content.about && { label: "Our story", href: href("about") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: DUCK }}>The kettle&apos;s on</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/60">Open daily for tea.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-white/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
        </div>

        {/* CTA panel: a rose card, never a dead newsletter input */}
        <div className="rounded-[1.5rem] px-7 py-9" style={{ background: ROSE, color: "#fff", boxShadow: `0 0 0 1px ${GOLD}55 inset` }}>
          <Bloom color="#ffffff" size={28} />
          <h4 style={{ ...display, fontStyle: "italic" }} className="mt-3 text-2xl font-medium leading-tight">A table by the window?</h4>
          <p className="mt-2 text-sm leading-relaxed text-white/90">Scones, sandwiches and a pot of something lovely. Do come and join us.</p>
          <a href={book} className="mt-6 inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#4A3F3A] transition hover:opacity-90" style={{ background: CREAM }}>{bookingOn ? "Book afternoon tea" : "Get in touch"}</a>
        </div>
      </div>
      <p className="border-t border-white/10 px-6 py-6 text-center text-xs text-white/45 sm:px-8">© {name}. With love, from our tearoom to yours.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" data-page={page}>
      <CamelliaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream page banner with floral field, clearing the fixed header on sub-pages.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section className="relative isolate overflow-hidden" style={{ background: CREAM }}>
      <FloralField opacity={0.4} />
      <div className="relative mx-auto max-w-6xl px-6 pb-14 pt-32 text-center sm:px-8 sm:pb-16 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ROSE }}>{kicker}</p>
        <h1 style={{ ...display, fontStyle: "italic" }} className="mx-auto mt-4 max-w-3xl text-5xl font-medium leading-[1.02] text-[color:#4A3F3A] sm:text-6xl">{title}</h1>
        {blurb && <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.8] text-[color:#4A3F3A]/65">{blurb}</p>}
        <SprigDivider className="mt-8" />
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Loose-leaf & cake stands", "The menu", "Loose-leaf teas, warm scones and a proper afternoon spread, served on heritage china.")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: "#fff" }}>
          <div className="mx-auto max-w-3xl">
            {groups.length > 0 ? (
              <>
                <div className="space-y-16">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-6 text-center">
                          <span data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={{ ...display, color: ROSE, fontStyle: "italic" }} className="text-3xl font-medium">{section.section}</span>
                          <div className="mx-auto mt-3 h-px w-20" style={{ background: `${GOLD}99` }} />
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-8">
                          {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: SAGE }}>{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${GOLD}33` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-lg font-medium text-[color:#4A3F3A]" style={display}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#4A3F3A]/55">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: ROSE }}>{item.price}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-16 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: SAGE, boxShadow: `0 0 0 1px ${GOLD}55` }}>{o.label}{o.commission_free ? " · commission-free" : ""}</a>
                    ))}
                  </div>
                )}
                {bookingOn && (
                  <div className="mt-14 text-center">
                    <a href={href("reservations")} className="inline-flex rounded-full px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55, 0 14px 32px -18px ${ROSE}` }}>Book afternoon tea</a>
                  </div>
                )}
              </>
            ) : <p className="text-center text-[color:#4A3F3A]/55">Our menu is being hand-lettered. Do come back soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book afternoon tea", "Choose your sitting and the number in your party; we will save you a table and pop the kettle on.")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <CamelliaBooking tenantId={tenant.id} name={name} />
            {content.phone && (
              <p className="mt-6 text-center text-sm text-[color:#4A3F3A]/65">
                A larger party or a special occasion?{" "}
                <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-medium underline-offset-4 hover:underline" style={{ color: ROSE }}>Telephone {content.phone}</a>
              </p>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Do come and see us", "Find the tearoom", "Tucked into the village and always happy to see you. Here is how to find us and how to call.")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: "#fff" }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#4A3F3A]/75">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-medium text-[color:#4A3F3A]" style={display}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:opacity-70" style={{ color: ROSE }}>{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:opacity-70" style={{ color: ROSE }}>{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <div className="mt-8 max-w-xs">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: SAGE }}>Opening times</p>
                  <ul className="mt-4 space-y-2 border-t pt-4 text-sm text-[color:#4A3F3A]/75" style={{ borderColor: `${GOLD}44` }}>
                    {content.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#4A3F3A]/45">{h.open}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: SAGE, boxShadow: `0 0 0 1px ${GOLD}55` }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a celebration to plan or a private tea party? Write to us here and we will reply by return."
                  contactCta="Send with love"
                  theme={{ card: "#ffffff", cardBorder: `${GOLD}66`, heading: INK, blurb: "#4A3F3A99", label: "#4A3F3A99", button: ROSE, buttonText: "#ffffff", fieldBorder: `${GOLD}66`, radius: "1rem", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("A little heritage", "Our story", "A village tearoom in the English tradition — heritage china, country-garden flowers and a warm welcome.")}
        <section className="px-6 py-16 sm:px-8 sm:py-20" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" style={display} className="text-center text-2xl font-normal italic leading-[1.6] text-[color:#4A3F3A] sm:text-[1.9rem]">{content.about}</p> : <p className="text-center text-[color:#4A3F3A]/55">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <SprigDivider className="my-12" />
                <h3 style={{ ...display, color: ROSE, fontStyle: "italic" }} className="text-center text-3xl font-medium">What we serve</h3>
                <p data-edit="content.cuisine_type" className="mx-auto mt-4 max-w-xl text-center text-[16px] leading-[1.8] text-[color:#4A3F3A]/70">{content.cuisine_type}</p>
              </>
            )}
            {groups.length > 0 && (
              <div className="mt-12 text-center">
                <a href={href("menu")} className="inline-flex rounded-full px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55` }}>See the menu</a>
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("A peek inside", "Gallery", "Cake stands, country flowers and pretty corners of the tearoom.")}
        {gallery.length > 0 ? (
          <section className="px-3 py-3 sm:px-4 sm:py-4" style={{ background: "#fff" }}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-[1.25rem] object-cover shadow-[0_18px_44px_-30px_rgba(74,63,58,0.6)] ring-1 transition duration-500 hover:opacity-95" style={{ borderColor: `${GOLD}55` }} />
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#4A3F3A]/55" style={{ background: "#fff" }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 4);

  return shell(
    <>
      {/* HERO: soft romantic cream, floral sprigs, italic script wordmark, inline reserve */}
      <section className="relative isolate overflow-hidden" style={{ background: CREAM }}>
        <FloralField opacity={0.6} />
        <div className="relative mx-auto max-w-5xl px-6 pb-16 pt-36 text-center sm:px-8 sm:pb-20 sm:pt-44">
          <div className="flex justify-center"><Bloom color={ROSE} size={40} /></div>
          <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.36em]" style={{ color: SAGE }}>An English afternoon tearoom</p>
          <h1 data-edit="tenant.business_name" style={{ ...display, fontStyle: "italic" }} className="mt-4 text-6xl font-medium leading-[0.98] text-[color:#4A3F3A] sm:text-8xl">{name}</h1>
          {content.tagline && (
            <p data-edit="content.tagline" className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.85] text-[color:#4A3F3A]/70 sm:text-lg">{content.tagline}</p>
          )}
          <SprigDivider className="mt-9" />
          {bookingOn ? (
            <div className="mx-auto mt-9 max-w-3xl text-left">
              <CamelliaBooking tenantId={tenant.id} name={name} inline />
            </div>
          ) : (
            <a href={book} className="mt-9 inline-flex rounded-full px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55` }}>Get in touch</a>
          )}
        </div>
      </section>

      {/* HERO PHOTOGRAPH band (if provided): a framed, rounded inset image */}
      {hero && (
        <section style={{ background: "#fff" }}>
          <div className="mx-auto max-w-5xl px-6 pb-4 pt-12 sm:px-8">
            <div className="overflow-hidden rounded-[1.75rem] ring-1" style={{ borderColor: `${GOLD}66` }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img data-edit-image="hero" src={hero} alt="" className="aspect-[16/8] w-full object-cover" />
            </div>
          </div>
        </section>
      )}

      {/* THE AFTERNOON TEA — tiered cake-stand feature */}
      <section style={{ background: "#fff" }}>
        <div className="mx-auto max-w-5xl px-6 py-20 text-center sm:px-8 sm:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ROSE }}>Our speciality</p>
          <h2 style={{ ...display, fontStyle: "italic" }} className="mt-3 text-4xl font-medium text-[color:#4A3F3A] sm:text-5xl">The afternoon tea</h2>
          <p className="mx-auto mt-4 max-w-lg text-[16px] leading-[1.8] text-[color:#4A3F3A]/65">A tiered stand laid for two, with loose-leaf tea poured at the table.</p>

          {/* the tiered stand: three tiers stacked, each a china-plate row */}
          <div className="mx-auto mt-12 flex max-w-2xl flex-col items-center">
            {TIERS.map((t, i) => (
              <div key={t.tier} className="flex w-full flex-col items-center">
                <div
                  className="w-full rounded-[1.5rem] border bg-[color:#FBF4E9] px-6 py-6 text-center sm:px-10"
                  style={{ borderColor: `${GOLD}55`, width: `${100 - i * 14}%`, boxShadow: "0 16px 40px -30px rgba(74,63,58,0.7)" }}
                >
                  <div className="flex items-center justify-center gap-2">
                    <Bloom color={t.tint} size={18} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: t.tint }}>{t.tier}</span>
                  </div>
                  <h3 style={{ ...display, fontStyle: "italic" }} className="mt-1.5 text-2xl font-medium text-[color:#4A3F3A]">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[color:#4A3F3A]/60">{t.note}</p>
                </div>
                {/* the stand's pole between tiers */}
                {i < TIERS.length - 1 && <span className="h-7 w-1.5 rounded-full" style={{ background: `${GOLD}88` }} />}
              </div>
            ))}
            {/* the stand's base plate */}
            <span className="mt-1 h-2 w-44 rounded-full" style={{ background: `${GOLD}88` }} />
            <span className="h-1 w-24 rounded-full" style={{ background: `${GOLD}55` }} />
          </div>

          <div className="mt-12">
            <a href={book} className="inline-flex rounded-full px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55, 0 14px 32px -18px ${ROSE}` }}>{bookingOn ? "Reserve your stand" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* OUR TEAS — pretty loose-leaf list as clean divide-y rows */}
      {featured.length > 0 && (
        <section style={{ background: CREAM }} className="relative isolate overflow-hidden">
          <FloralField opacity={0.3} />
          <div className="relative mx-auto max-w-3xl px-6 py-20 sm:px-8 sm:py-24">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: SAGE }}>From the menu</p>
              <h2 style={{ ...display, fontStyle: "italic" }} className="mt-3 text-4xl font-medium text-[color:#4A3F3A] sm:text-5xl">Our teas & treats</h2>
            </div>
            <ul className="mt-12 divide-y" style={{ borderColor: `${GOLD}44` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-lg font-medium text-[color:#4A3F3A]" style={display}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#4A3F3A]/55">{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: ROSE }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex items-center gap-2 rounded-full border px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#4A3F3A] transition hover:bg-[color:#4A3F3A] hover:text-white" style={{ borderColor: ROSE }}>The full menu</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ABOUT teaser — duck-egg band, centred statement */}
      {content.about && (
        <section style={{ background: DUCK }} className="text-[color:#4A3F3A]">
          <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-24">
            <Bloom color={ROSE} size={30} className="mx-auto" />
            <p data-edit="content.about" style={{ ...display, fontStyle: "italic" }} className="mt-6 text-2xl font-normal leading-[1.5] sm:text-[2rem]">{content.about}</p>
            <a href={href("about")} className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] transition hover:gap-2.5" style={{ color: INK }}>Read our story <span aria-hidden>→</span></a>
          </div>
        </section>
      )}

      {/* GALLERY teaser strip */}
      {gallery.length > 0 && (
        <section style={{ background: "#fff" }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="mb-8 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: ROSE }}>A peek inside</p>
              <h2 style={{ ...display, fontStyle: "italic" }} className="mt-3 text-4xl font-medium text-[color:#4A3F3A] sm:text-5xl">The tearoom</h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full rounded-[1.25rem] object-cover shadow-[0_18px_44px_-30px_rgba(74,63,58,0.6)]" />
              ))}
            </div>
            <div className="mt-8 text-center">
              <a href={href("gallery")} className="inline-flex items-center gap-1.5 text-[12px] font-semibold uppercase tracking-[0.2em] transition hover:gap-2.5" style={{ color: ROSE }}>See the gallery <span aria-hidden>→</span></a>
            </div>
          </div>
        </section>
      )}

      {/* QUICK INFO band — sage, hours + find us + reserve */}
      <section style={{ background: SAGE }} className="text-white">
        <div className="mx-auto max-w-6xl px-6 pt-14 sm:px-8"><SprigDivider tint={CREAM} className="opacity-90" /></div>
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">The kettle&apos;s on</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/90">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/65">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-white/80">Open daily for tea.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-white/90">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-white/90">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border border-white/60 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-[color:#9FB08A]">Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/85">{bookingOn ? "Reserve" : "Get in touch"}</h3>
            <p className="mt-5 text-sm text-white/90">{bookingOn ? "Save yourself a table and a tiered stand, any afternoon." : "We would love to hear from you."}</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#4A3F3A] transition hover:opacity-90" style={{ background: CREAM }}>{bookingOn ? "Book afternoon tea" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
