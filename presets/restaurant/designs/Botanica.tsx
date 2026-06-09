import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { BotanicaHeader } from "./BotanicaHeader";
import { BotanicaBooking } from "./BotanicaBooking";

// Botanica — elegant botanical brasserie design (single venue), MULTI-PAGE: the
// nav opens real routes (Menu / About / Gallery / Reservations / Contact) under
// basePath, never scroll anchors. Each page is its own layout; the sticky green
// header and ivory footer are shared. Palette is baked (deep botanical green /
// gold / ivory / soft cream) with a diamond-lattice motif; the tenant swaps in
// their own photography, copy, menu, hours and address. Structure mirrors a
// refined collection brasserie: full-bleed hero with a reservation strip, a
// seasonal teaser row, a crested green story band, menu highlights, a private
// dining call to action, and a serif footer with a diamond band above it.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GREEN = "#0d3b2e";
const GREEN_DEEP = "#082a20";
const GOLD = "#c8a45c";
const IVORY = "#f3efe6";
const CREAM = "#faf7f0";

// Repeating diamond-lattice motif used on the deep green bands and the footer
// band, approximating the reference's botanical pattern with pure CSS.
const DIAMONDS = {
  backgroundColor: GREEN,
  backgroundImage:
    "repeating-linear-gradient(45deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 28px), repeating-linear-gradient(-45deg, rgba(255,255,255,0.045) 0 1px, transparent 1px 28px)",
} as const;

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

// Small diamond ornament used to flank kickers, echoing the reference.
function Diamond({ color = GOLD }: { color?: string }) {
  return <span aria-hidden className="inline-block h-2 w-2 rotate-45" style={{ border: `1px solid ${color}` }} />;
}

export default function BotanicaDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "Our story", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Kicker label with flanking diamonds (reference uses this above every block).
  const kicker = (text: string, light = false) => (
    <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: light ? GOLD : GREEN }}>
      <Diamond color={light ? GOLD : GREEN} />
      <span>{text}</span>
      <Diamond color={light ? GOLD : GREEN} />
    </p>
  );

  const footer = (
    <footer>
      {/* diamond band, matching the reference's decorative strip above the footer */}
      <div className="h-28 sm:h-36" style={DIAMONDS} />
      <div style={{ background: IVORY }} className="text-[#3a3a32]">
        {/* thin gold lattice rule */}
        <div className="h-1.5" style={{ backgroundImage: `repeating-linear-gradient(90deg, ${GOLD} 0 6px, transparent 6px 12px)`, opacity: 0.5 }} />
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              <Diamond /> <span data-edit="tenant.business_name">{name}</span> <Diamond />
            </p>
            {content.tagline && (
              <p data-edit="content.tagline" style={{ ...serif, color: GREEN }} className="mt-5 max-w-sm text-[22px] leading-snug">{content.tagline}</p>
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
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Explore</h4>
            <ul className="mt-5 space-y-3 text-[15px]" style={serif}>
              {([
                { label: "Home", href: href("home") },
                groups.length > 0 && { label: "Menu", href: href("menu") },
                content.about && { label: "Our story", href: href("about") },
                bookingOn && { label: "Reservations", href: href("reservations") },
                { label: "Contact", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-[#0d3b2e]" style={{ color: GREEN }}>{l.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Opening times</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#7a7a6e]">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[#7a7a6e]">Open daily.</p>}
          </div>
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Find us</h4>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[#0d3b2e]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[#0d3b2e]">{content.email}</a>}
            </div>
          </div>
        </div>
        <p className="px-8 pb-8 text-center text-xs text-[#9a9a8c]">© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <BotanicaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Green page banner with diamond motif. Also clears the fixed header on sub-pages.
  const banner = (kickerText: string, title: string) => (
    <section style={DIAMONDS} className="text-white">
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-32 text-center sm:pt-40">
        {kicker(kickerText, true)}
        <h1 style={serif} className="mt-4 text-4xl font-medium sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The menu", "Seasonal dishes")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-4xl px-8 py-20">
            {groups.length > 0 ? (
              <>
                {groups.map((section) => (
                  <div key={section.section} className="mb-16 last:mb-0">
                    {section.section && (
                      <div className="mb-9 text-center">
                        <span className="mx-auto mb-3 block h-px w-10" style={{ background: GOLD }} />
                        <h3 style={{ ...serif, color: GREEN }} className="text-2xl sm:text-3xl">{section.section}</h3>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-8 last:mb-0">
                        {catg.category && <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>{catg.category}</p>}
                        <ul className="space-y-5">
                          {catg.items.map((item) => (
                            <li key={item.id}>
                              <div className="flex items-baseline justify-between gap-3">
                                <span data-edit={`item:${item.id}:name`} style={{ ...serif, color: GREEN }} className="text-lg">{item.name}</span>
                                <span className="mx-2 flex-1 border-b border-dotted" style={{ borderColor: "rgba(13,59,46,0.25)" }} />
                                {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
                              </div>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 max-w-xl text-sm leading-relaxed text-[#6b6b5f]">{item.description}</p>}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}
                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-14 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GREEN, color: "#fff" }}>{o.label}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="text-center text-neutral-500">Our menu is coming soon.</p>}
            {bookingOn && (
              <div className="mt-16 text-center">
                <a href={book} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:brightness-110" style={{ background: GOLD, color: GREEN }}>Book a table</a>
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book a table")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl px-8 py-20">
            <p className="mb-9 text-center text-[17px] leading-[1.85] text-[#5a5a4e]">
              Reserve your table below and we will confirm by phone or email. For parties of eight or more, or private dining, please call us and we will look after the details.
            </p>
            <BotanicaBooking tenantId={tenant.id} name={name} />
            {content.phone && (
              <p className="mt-7 text-center text-sm text-[#6b6b5f]">
                Prefer to call? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold underline" style={{ color: GREEN }}>{content.phone}</a>
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
        {banner("Contact", "Visit us")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-14 px-8 py-20 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 style={{ ...serif, color: GREEN }} className="text-2xl">Where to find us</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[#5a5a4e]">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-medium hover:text-[#0d3b2e]" style={{ color: GREEN }}>{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-medium hover:text-[#0d3b2e]" style={{ color: GREEN }}>{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[#5a5a4e]" style={{ borderColor: "rgba(13,59,46,0.18)" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#9a9a8c]">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GREEN, color: "#fff" }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Send an enquiry"
                  contactBlurb="Private dining, larger parties or any other question? Leave us a note and we will reply soon."
                  contactCta="Send enquiry"
                  theme={{ card: "#ffffff", cardBorder: GOLD, heading: GREEN, blurb: "#6b6b5f", label: GREEN, fieldBorder: "rgba(13,59,46,0.25)", fieldText: GREEN, button: GREEN, buttonText: "#ffffff", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "A passion for hospitality")}
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl px-8 py-20 text-center">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[#5a5a4e]">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <span className="mx-auto mt-12 block h-px w-10" style={{ background: GOLD }} />
                <h3 style={{ ...serif, color: GREEN }} className="mt-8 text-2xl">From our kitchen</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.85] text-[#5a5a4e]">{content.cuisine_type}</p>
              </>
            )}
            {bookingOn && (
              <div className="mt-12">
                <a href={book} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:brightness-110" style={{ background: GOLD, color: GREEN }}>Book a table</a>
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
        {banner("Gallery", "A look inside")}
        {gallery.length > 0 ? (
          <section style={{ background: CREAM }} className="px-1 py-1">
            <div className="grid grid-cols-2 gap-1 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  // Seasonal teaser cards built from real data so they stay live.
  const teasers = [
    groups.length > 0 && { kicker: "Seasonal", title: "A specially curated menu", body: "Dishes that follow the seasons, plated with care.", href: href("menu"), cta: "View the menu" },
    { kicker: "Occasions", title: "Celebrate with us", body: "Birthdays, anniversaries and every reason in between.", href: bookingOn ? href("reservations") : href("contact"), cta: bookingOn ? "Reserve a table" : "Enquire" },
    gallery.length > 0 && { kicker: "The room", title: "An extraordinary setting", body: "Step inside our dining room and conservatory.", href: href("gallery"), cta: "See the gallery" },
    { kicker: "Private dining", title: "Your own space", body: "Bespoke dining rooms for life's special moments.", href: content.about ? href("about") : href("contact"), cta: "Discover more" },
  ].filter(Boolean) as { kicker: string; title: string; body: string; href: string; cta: string }[];

  return shell(
    <>
      {/* hero */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[#1c5a45] to-[#082a20]" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30" />
        <div className="relative z-10 mt-auto flex flex-col items-center gap-6 px-6 pb-16 text-center sm:pb-20">
          {kicker(content.cuisine_type ? "The collection" : "Welcome", true)}
          {content.tagline ? (
            <h1 data-edit="content.tagline" style={serif} className="max-w-3xl text-4xl leading-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl">{content.tagline}</h1>
          ) : (
            <h1 style={serif} className="max-w-3xl text-4xl leading-tight text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.55)] sm:text-6xl">{name}</h1>
          )}
          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a href={book} className="px-10 py-4 text-xs font-semibold uppercase tracking-[0.24em] shadow-2xl transition hover:brightness-110" style={{ background: GOLD, color: GREEN }}>Book a table</a>
            {groups.length > 0 && (
              <a href={href("menu")} className="border border-white/70 px-10 py-4 text-xs font-semibold uppercase tracking-[0.24em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#0d3b2e]">Find out more</a>
            )}
          </div>
        </div>
      </section>

      {/* reservation strip — echoes the reference's persistent "find a table" bar */}
      {bookingOn && (
        <section style={DIAMONDS} className="text-white">
          <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-8 py-8 text-center sm:flex-row sm:text-left">
            <div className="flex items-center gap-4">
              <Diamond />
              <p style={serif} className="text-xl sm:text-2xl">A table is always waiting</p>
            </div>
            <a href={book} className="px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:brightness-110" style={{ background: GOLD, color: GREEN }}>Find a table</a>
          </div>
        </section>
      )}

      {/* seasonal teaser cards */}
      {teasers.length > 0 && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-6xl px-8 py-20">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teasers.map((t) => (
                <a key={t.title} href={t.href} className="group block bg-white p-8 text-center shadow-[0_14px_40px_-28px_rgba(13,59,46,0.5)] transition hover:-translate-y-1" style={{ border: `1px solid ${IVORY}` }}>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>{t.kicker}</p>
                  <h3 style={{ ...serif, color: GREEN }} className="mt-4 text-xl leading-snug">{t.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#6b6b5f]">{t.body}</p>
                  <span className="mt-5 inline-block text-[11px] font-semibold uppercase tracking-[0.2em] transition group-hover:opacity-70" style={{ color: GREEN }}>{t.cta}</span>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* crested green story band */}
      {content.about && (
        <section style={DIAMONDS} className="relative overflow-hidden text-white">
          {/* faint crest watermark, like the reference's central emblem */}
          <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-3xl border opacity-10" style={{ borderColor: GOLD, boxShadow: `inset 0 0 0 14px ${GREEN_DEEP}, inset 0 0 0 15px ${GOLD}` }} />
          <div className="relative mx-auto max-w-3xl px-8 py-24 text-center">
            {kicker("Our story", true)}
            <p data-edit="content.about" style={serif} className="mt-6 text-2xl leading-[1.6] sm:text-[28px]">{content.about}</p>
            <a href={content.about ? href("about") : href("contact")} className="mt-8 inline-block text-[12px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD }}>Discover our signature menus →</a>
          </div>
        </section>
      )}

      {/* menu highlights → links to full menu page */}
      {featured.length > 0 && (
        <section style={{ background: CREAM }}>
          <div className="mx-auto max-w-4xl px-8 py-24 text-center">
            {kicker("The menu")}
            <h2 style={{ ...serif, color: GREEN }} className="mt-4 text-4xl sm:text-5xl">Signature dishes</h2>
            <div className="mt-12 grid items-start gap-x-14 gap-y-6 text-left sm:grid-cols-2">
              {featured.map((item) => (
                <div key={item.id}>
                  <div className="flex items-baseline justify-between gap-3">
                    <span data-edit={`item:${item.id}:name`} style={{ ...serif, color: GREEN }} className="text-lg">{item.name}</span>
                    <span className="mx-2 flex-1 border-b border-dotted" style={{ borderColor: "rgba(13,59,46,0.25)" }} />
                    {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>}
                  </div>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1.5 max-w-md text-sm leading-relaxed text-[#6b6b5f]">{item.description}</p>}
                </div>
              ))}
            </div>
            <a href={href("menu")} className="mt-14 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:brightness-110" style={{ background: GREEN, color: "#fff" }}>View the full menu</a>
          </div>
        </section>
      )}

      {/* private dining / book call to action band */}
      <section className="relative isolate overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: GREEN }} />
        )}
        <div className="absolute inset-0" style={{ background: "rgba(8,42,32,0.82)" }} />
        <div className="relative mx-auto max-w-2xl px-8 py-24 text-center text-white">
          {kicker("Special occasions", true)}
          <h2 style={serif} className="mt-5 text-3xl sm:text-4xl">Celebrate your special moments with us</h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-white/80">Whether it is an intimate dinner or a private celebration, our team will make every occasion feel effortless.</p>
          <a href={bookingOn ? book : href("contact")} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] transition hover:brightness-110" style={{ background: GOLD, color: GREEN }}>{bookingOn ? "Make an enquiry" : "Get in touch"}</a>
        </div>
      </section>

      {/* quick info band */}
      <section style={{ background: IVORY }} className="text-[#3a3a32]">
        <div className="mx-auto grid max-w-6xl gap-12 px-8 py-16 md:grid-cols-3">
          <div className="text-center md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Opening times</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#9a9a8c]">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[#9a9a8c]">Open daily.</p>}
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Find us</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[#0d3b2e]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[#0d3b2e]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>Get directions →</a>
            )}
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Reservations</h3>
            <p className="mt-5 text-sm text-[#6b6b5f]">A table is always waiting. Book online in moments.</p>
            <a href={book} className="mt-6 inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GREEN, color: "#fff" }}>{bookingOn ? "Book a table" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
