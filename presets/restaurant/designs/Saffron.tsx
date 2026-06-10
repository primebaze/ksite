import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SaffronHeader } from "./SaffronHeader";
import { SaffronBooking } from "./SaffronBooking";

// Saffron — a rich, modern-luxe Indian dining design (single venue), MULTI-PAGE:
// the nav opens real routes (Menu / Reservations / Gallery / About / Contact)
// under basePath, never scroll anchors. The sticky maroon header and warm dark
// footer are shared. The palette is baked from a contemporary, opulent Indian
// reference: deep maroon, saffron gold, warm cream and a near-black charcoal,
// with thin gold-hairline ornament kept restrained (never gaudy). The structural
// signature is a deep DARK gold-framed hero, a gold-ruled "spice story" /
// provenance section, and a thali-inspired menu grouping. Display type is an
// elegant serif (Fraunces) with generous gold-on-maroon tracking. The tenant
// swaps in their own photography, copy, menu, hours and address.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const MAROON = "#5B1F2A";
const MAROON_DEEP = "#4A1722";
const GOLD = "#E0A02E";
const GOLD_SOFT = "#EBC06B";
const MARIGOLD = "#D9622B";
const CHARCOAL = "#1A1413";
const CREAM = "#F6ECD9";

// A faint hand-block-print style diamond lattice — a modern, very subtle nod to
// Indian textile motifs, used as a near-invisible texture on dark bands.
const LATTICE =
  "repeating-linear-gradient(45deg, rgba(224,160,46,0.05) 0 1px, transparent 1px 22px), repeating-linear-gradient(-45deg, rgba(224,160,46,0.05) 0 1px, transparent 1px 22px)";

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

// A small centred gold ornament: a thin rule, a diamond lozenge, a thin rule.
function GoldDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: GOLD }} />
      <span className="h-px w-12 sm:w-20" style={{ background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  );
}

export default function SaffronDesign({ site, page = "home", basePath = "" }: PresetProps) {
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

  // ---- shared footer: warm charcoal with a lattice texture + gold accents ----
  const footer = (
    <footer style={{ background: CHARCOAL, backgroundImage: LATTICE }} className="text-[#F6ECD9]/75">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.1fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...serif, color: GOLD }} className="text-3xl tracking-[0.12em]">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed text-[#F6ECD9]/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD_SOFT }}>Follow</h4>
              <div className="mt-4 flex gap-4 text-[#F6ECD9]">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[#E0A02E]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD_SOFT }}>Explore</h4>
          <ul className="mt-5 space-y-3 text-sm text-[#F6ECD9]/70">
            {([
              groups.length > 0 && { label: "Menu", href: href("menu") },
              content.about && { label: "Our story", href: href("about") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Reservations", href: href("reservations") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-[#E0A02E]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: GOLD_SOFT }}>Visit us</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[#F6ECD9]/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#F6ECD9]/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-[#F6ECD9]/55">Open daily.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[#F6ECD9]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-[#F6ECD9]/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#E0A02E]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-[#E0A02E]">{content.email}</a>}
          </div>
          {content.map_url && (
            <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-5 inline-flex border px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#E0A02E] hover:text-[#1A1413]" style={{ borderColor: `${GOLD}66`, color: CREAM }}>Get directions</a>
          )}
        </div>
      </div>
      <div className="border-t px-6 py-7 text-center sm:px-8" style={{ borderColor: `${GOLD}1f` }}>
        <p className="text-xs text-[#F6ECD9]/45">© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body">
      <SaffronHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Dark, gold-framed page banner that clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: MAROON, backgroundImage: LATTICE }} className="relative text-[#F6ECD9]">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 text-center sm:px-8 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mt-4 text-4xl tracking-[0.04em] sm:text-5xl">{title}</h1>
        <GoldDivider className="mt-7" />
      </div>
    </section>
  );

  // ---- MENU (thali-inspired grouping: gold-ruled sections, clean divider rows) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The kitchen", "Our menu")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-4xl">
            {groups.length > 0 ? (
              <>
                <div className="space-y-16">
                  {groups.map((section) => (
                    <div key={section.section}>
                      {section.section && (
                        <div className="mb-7 text-center">
                          <h2 style={{ ...serif, color: MAROON }} className="text-2xl tracking-[0.08em] sm:text-3xl">{section.section}</h2>
                          <GoldDivider className="mt-4" />
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-9">
                          {catg.category && (
                            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: MARIGOLD }}>{catg.category}</p>
                          )}
                          {/* thali-inspired: each section framed by a thin gold rule */}
                          <ul className="divide-y border-y" style={{ borderColor: `${GOLD}40` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5" style={{ borderColor: `${MAROON}1f` }}>
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-lg text-[#3a221f]" style={serif}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#7a5c52]">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: MAROON }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-110" style={{ background: MAROON }}>{o.label}</a>
                    ))}
                  </div>
                )}
              </>
            ) : <p className="text-center text-[#7a5c52]">Our menu is coming soon.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Join us", "Reservations")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-9 text-center text-[16px] leading-[1.9] text-[#5B1F2A]/80">Reserve your table below and we will confirm by phone or email. For private dining or parties of eight or more, please call us directly.</p>
            <SaffronBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Find us")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 className="text-2xl tracking-[0.06em]" style={{ ...serif, color: MAROON }}>Visit us</h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-[#5b3e37]">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-medium text-[#3a221f]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-[#5B1F2A]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block underline transition hover:text-[#5B1F2A]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[#5b3e37]" style={{ borderColor: `${GOLD}55` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[#7a5c52]">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-110" style={{ background: MAROON }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Drop us a line"
                  contactBlurb="A question, a celebration to plan or a note of feedback? Tell us below and we will reply soon."
                  contactCta="Send enquiry"
                  theme={{ card: "#ffffff", cardBorder: `${GOLD}`, heading: MAROON, blurb: "#7a5c52", label: "#5b3e37", fieldBg: "#fbf5e8", fieldBorder: "#d9c7a6", fieldText: "#1A1413", button: MAROON, buttonText: "#ffffff", radius: "0", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT / OUR STORY ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our story", "Rooted in spice")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl text-center">
            {content.about ? <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[#5b3e37]">{content.about}</p> : <p className="text-[#7a5c52]">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <>
                <GoldDivider className="mt-14" />
                <h3 style={{ ...serif, color: MAROON }} className="mt-12 text-3xl tracking-[0.04em]">Our kitchen</h3>
                <p data-edit="content.cuisine_type" className="mt-5 text-[17px] leading-[1.85] text-[#5b3e37]">{content.cuisine_type}</p>
              </>
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
        {banner("A look around", "Gallery")}
        <div style={{ background: CREAM }} className="pb-24 pt-2">
          {gallery.length > 0 ? (
            <section className="grid grid-cols-2 gap-2 p-2 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
              ))}
            </section>
          ) : <p className="px-6 py-20 text-center text-[#7a5c52]">Photos coming soon.</p>}
        </div>
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);
  return shell(
    <>
      {/* HERO — deep dark photograph, gold hairline frame, centred serif title */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: MAROON_DEEP }}>
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 30% 20%, ${MAROON}, ${CHARCOAL})`, backgroundImage: LATTICE }} />
        )}
        {/* warm darkening wash so the gold + cream type reads on any photo */}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(26,20,19,0.55), rgba(74,23,34,0.35) 40%, rgba(26,20,19,0.88))" }} />
        {/* gold hairline frame inset from the edges */}
        <div className="pointer-events-none absolute inset-4 border sm:inset-6" style={{ borderColor: `${GOLD}55` }} />

        <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-12 pt-28 text-center sm:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.4em]" style={{ color: GOLD }}>
            {content.cuisine_type ? "Modern Indian dining" : "Welcome"}
          </p>
          {content.tagline ? (
            <h1 data-edit="content.tagline" style={serif} className="mt-5 max-w-3xl text-4xl leading-[1.1] tracking-[0.02em] text-[#F6ECD9] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)] sm:text-6xl">{content.tagline}</h1>
          ) : (
            <h1 data-edit="tenant.business_name" style={serif} className="mt-5 max-w-3xl text-5xl tracking-[0.06em] text-[#F6ECD9] [text-shadow:0_2px_30px_rgba(0,0,0,0.6)] sm:text-7xl">{name}</h1>
          )}
          <GoldDivider className="mt-7" />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-[#F6ECD9]/85 [text-shadow:0_1px_16px_rgba(0,0,0,0.7)] sm:text-lg">
            A warm table of spice, smoke and slow-cooked tradition — served with quiet luxury.
          </p>

          {bookingOn ? (
            <div className="mt-9 w-full max-w-3xl text-left">
              <SaffronBooking tenantId={tenant.id} name={name} inline />
            </div>
          ) : (
            <a href={book} className="mt-9 inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GOLD, color: CHARCOAL }}>Get in touch</a>
          )}
        </div>
      </section>

      {/* SPICE STORY / PROVENANCE — cream band, gold dividers, editorial column */}
      {content.about && (
        <section style={{ background: CREAM }} className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: MARIGOLD }}>Our story</p>
            <GoldDivider className="mt-5" />
            <p data-edit="content.about" className="mt-8 text-2xl leading-[1.55] text-[#3a221f] sm:text-[2rem] sm:leading-[1.5]" style={serif}>{content.about}</p>
            <a href={href("about")} className="mt-9 inline-flex border px-8 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-[#5B1F2A] hover:text-[#F6ECD9]" style={{ borderColor: MAROON, color: MAROON }}>Read more</a>
          </div>
        </section>
      )}

      {/* SPICE / PROVENANCE TRIPTYCH — three gold-numbered provenance notes */}
      <section style={{ background: MAROON, backgroundImage: LATTICE }} className="px-6 py-20 text-[#F6ECD9] sm:px-8 sm:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>From source to table</p>
            <h2 style={serif} className="mt-3 text-3xl tracking-[0.04em] sm:text-4xl">The spice story</h2>
            <GoldDivider className="mt-6" />
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border sm:grid-cols-3" style={{ borderColor: `${GOLD}40`, background: `${GOLD}40` }}>
            {[
              { n: "01", t: "Hand-ground masala", d: "Whole spices toasted and milled in-house each morning for depth you can taste." },
              { n: "02", t: "Clay-oven craft", d: "Breads and tandoori marinades fired in a blazing charcoal tandoor." },
              { n: "03", t: "Slow & low", d: "Curries and dals simmered for hours, the way a home kitchen would." },
            ].map((c) => (
              <div key={c.n} className="px-7 py-10 text-center sm:py-12" style={{ background: MAROON_DEEP }}>
                <span style={{ ...serif, color: GOLD }} className="text-3xl tracking-[0.1em]">{c.n}</span>
                <h3 style={serif} className="mt-4 text-xl text-[#F6ECD9]">{c.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#F6ECD9]/70">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENU TASTER — a few highlights as clean gold-ruled rows + link to menu */}
      {featured.length > 0 && (
        <section style={{ background: CREAM }} className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: MARIGOLD }}>From the kitchen</p>
              <h2 style={{ ...serif, color: MAROON }} className="mt-3 text-3xl tracking-[0.04em] sm:text-4xl">A taste of the menu</h2>
              <GoldDivider className="mt-6" />
            </div>
            <ul className="mt-12 divide-y border-y" style={{ borderColor: `${GOLD}40` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5" style={{ borderColor: `${MAROON}1f` }}>
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-lg text-[#3a221f]" style={serif}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[#7a5c52]">{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: MAROON }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:brightness-110" style={{ background: MAROON }}>View the full menu</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* GALLERY STRIP — atmospheric photographs linking to the gallery */}
      {gallery.length > 0 && (
        <section style={{ background: CHARCOAL, backgroundImage: LATTICE }} className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="text-center text-[#F6ECD9]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: GOLD }}>The room</p>
              <h2 style={serif} className="mt-3 text-3xl tracking-[0.04em] sm:text-4xl">A look around</h2>
              <GoldDivider className="mt-6" />
            </div>
            <div className="mt-12 grid gap-3 sm:grid-cols-3">
              {gallery.slice(0, 3).map((g) => (
                <a key={g.id} href={href("gallery")} className="group block overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  {g.caption && <p className="mt-3 text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-[#F6ECD9]/80">{g.caption}</p>}
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* RESERVE CALL-OUT — gold-framed maroon panel */}
      <section style={{ background: MAROON }} className="px-6 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="relative border px-8 py-14 text-center sm:px-12" style={{ borderColor: `${GOLD}66` }}>
            <div className="pointer-events-none absolute inset-2 border" style={{ borderColor: `${GOLD}2e` }} aria-hidden />
            <div className="relative">
              <h2 style={serif} className="text-4xl tracking-[0.03em] text-[#F6ECD9] sm:text-5xl">Reserve your table</h2>
              <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.85] text-[#F6ECD9]/75">Gather your favourite people for an evening of warmth and spice. We would be honoured to host you.</p>
              <a href={book} className="mt-8 inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] transition hover:brightness-110" style={{ background: GOLD, color: CHARCOAL }}>{bookingOn ? "Book a table" : "Get in touch"}</a>
            </div>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
