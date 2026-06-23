import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LarderHeader } from "./LarderHeader";
import { LarderBooking } from "./LarderBooking";

// Larder — a refined, modern British gastropub (single venue), MULTI-PAGE: the
// nav opens real routes (Menu / Reservations / Gallery / About / Contact) under
// basePath, never scroll anchors. Each page is its own layout; the airy sticky
// header and quiet footer are shared via shell(). The palette is baked to a
// calm, light, produce-led look — muted sage, warm stone, charcoal ink, soft
// clay, off-white. The client swaps in their own photography, copy, menu, hours
// and contact.
//
// Structural signature (distinct from every sibling): a gallery-like editorial
// layout on stone/off-white with generous margins and fine hairline rules; a
// large, quiet Fraunces headline used sparingly; a "from the larder — this
// week" seasonal feature with a TALL portrait image beside a short note; an
// understated daily-menu list (clean divider rows, no leaders, no cards).

const display = { fontFamily: "var(--font-fraunces)" } as const;
const SAGE = "#7C8567";
const STONE = "#E7E1D4";
const INK = "#2A2A26";
const CLAY = "#C7A98B";
const OFFWHITE = "#F6F3EC";

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

export default function LarderDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reservations", href: href("reservations") },
    { label: "Contact", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- SHARED FOOTER (quiet, light — off-white over a hairline seam) ----
  const footer = (
    <footer style={{ background: OFFWHITE, color: INK }} className="border-t" >
      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20" style={{ borderColor: `${INK}1f` }}>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href={href("home")}>
              <span data-edit="tenant.business_name" style={display} className="text-2xl font-normal tracking-[0.2em]">{name}</span>
            </a>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-[1.8] text-[color:#2A2A26]/65">{content.tagline}</p>}
            {content.socials && content.socials.length > 0 && (
              <div className="mt-7 flex gap-5" style={{ color: SAGE }}>
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#2A2A26]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: SAGE }}>Explore</h4>
            <ul className="mt-5 space-y-3 text-sm text-[color:#2A2A26]/70">
              {([
                groups.length > 0 && { label: "Menu", href: href("menu") },
                content.about && { label: "About", href: href("about") },
                gallery.length > 0 && { label: "Gallery", href: href("gallery") },
                bookingOn && { label: "Reservations", href: href("reservations") },
                { label: "Contact", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-[color:#2A2A26]">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: SAGE }}>Hours</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#2A2A26]/70">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#2A2A26]/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#2A2A26]/55">Open daily.</p>}
          </div>

          <div>
            <h4 className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: SAGE }}>Find us</h4>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-[1.8] text-[color:#2A2A26]/70">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[color:#2A2A26]/70">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#2A2A26]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#2A2A26]">{content.email}</a>}
            </div>
            <a href={book} className="mt-6 inline-flex border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.22em] transition hover:border-[color:#7C8567] hover:text-[color:#7C8567]" style={{ borderColor: `${INK}40` }}>{bookingOn ? "Reserve" : "Contact"}</a>
          </div>
        </div>
        <p className="mt-16 border-t pt-8 text-xs tracking-wide text-[color:#2A2A26]/45" style={{ borderColor: `${INK}1f` }}>© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: OFFWHITE, color: INK }} className="min-h-screen font-body">
      <LarderHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Quiet, generously-margined sub-page banner that clears the fixed header.
  // A small sage kicker over a large, calm Fraunces headline, on stone.
  const banner = (kicker: string, title: string) => (
    <section className="border-b" style={{ background: STONE, borderColor: `${INK}1f` }}>
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em]" style={{ color: SAGE }}>{kicker}</p>
        <h1 style={display} className="mt-5 max-w-3xl text-5xl font-normal leading-[1.04] sm:text-7xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU (understated daily-menu list — clean divider rows) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("The menu", "From the kitchen, daily")}
        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            {groups.length > 0 ? (
              <>
                {groups.map((section, si) => (
                  <div key={section.section} className={si > 0 ? "mt-20" : ""}>
                    {section.section && (
                      <div className="mb-8 flex items-baseline gap-5">
                        <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={display} className="text-2xl font-normal tracking-wide">{section.section}</h2>
                        <span className="h-px flex-1" style={{ background: `${INK}26` }} aria-hidden />
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-10">
                        {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: SAGE }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: `${INK}1f` }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} style={display} className="text-lg font-normal text-[color:#2A2A26]">{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1.5 text-sm leading-relaxed text-[color:#2A2A26]/55">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium" style={{ color: SAGE }}>{item.price}</span>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ))}

                {content.ordering_links && content.ordering_links.length > 0 && (
                  <div className="mt-16 flex flex-wrap gap-4 border-t pt-12" style={{ borderColor: `${INK}1f` }}>
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-7 py-3.5 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F6F3EC] transition hover:opacity-90" style={{ background: SAGE }}>
                        {o.label}{o.commission_free ? " · commission-free" : ""}
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-16 text-center">
                  <a href={book} className="inline-flex px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F6F3EC] transition hover:opacity-90" style={{ background: INK }}>
                    {bookingOn ? "Reserve a table" : "Get in touch"}
                  </a>
                </div>
              </>
            ) : <p className="text-center text-[color:#2A2A26]/50">Our menu is coming soon.</p>}
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
        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-xl">
            <p className="mb-10 text-[17px] leading-[1.9] text-[color:#2A2A26]/75">
              We would be glad to have you. Choose a day and a time below and we will confirm by phone or email. For parties of eight or more, or to enquire about the private room, please call us directly.
            </p>
            <LarderBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Find us")}
        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-24">
            <div>
              <div className="space-y-4 text-[15px] leading-relaxed text-[color:#2A2A26]/75">
                {content.address && <p data-edit="content.address" style={display} className="whitespace-pre-line text-xl font-normal text-[color:#2A2A26]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#2A2A26]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#2A2A26]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <div className="mt-10 border-t pt-8" style={{ borderColor: `${INK}1f` }}>
                  <p className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: SAGE }}>Opening hours</p>
                  <ul className="mt-4 max-w-xs space-y-2.5 text-sm text-[color:#2A2A26]/75">
                    {content.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#2A2A26]/45">{h.open}</span></li>
                    ))}
                  </ul>
                </div>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-9 inline-flex border px-7 py-3 text-[10px] font-medium uppercase tracking-[0.22em] transition hover:border-[color:#7C8567] hover:text-[color:#7C8567]" style={{ borderColor: `${INK}40` }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Send us a note"
                  contactBlurb="For a private dinner, a question about the menu, or a bit of feedback, write to us here and we will reply soon."
                  contactCta="Send"
                  theme={{ card: OFFWHITE, cardBorder: `${INK}1f`, heading: INK, blurb: "#5A5A52", label: SAGE, fieldBg: OFFWHITE, fieldBorder: "#CFC7B6", fieldText: INK, button: SAGE, buttonText: OFFWHITE, radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("About", "Seasonal, local, unhurried")}
        <section className="px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-3xl">
            {content.about ? <p data-edit="content.about" className="text-[19px] leading-[1.95] text-[color:#2A2A26]/80">{content.about}</p> : <p className="text-[color:#2A2A26]/50">Our story is coming soon.</p>}
            {content.cuisine_type && (
              <div className="mt-16 border-t pt-12" style={{ borderColor: `${INK}1f` }}>
                <p className="text-[10px] font-medium uppercase tracking-[0.28em]" style={{ color: SAGE }}>In the kitchen</p>
                <p data-edit="content.cuisine_type" className="mt-5 text-[17px] leading-[1.85] text-[color:#2A2A26]/75">{content.cuisine_type}</p>
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
        {banner("Gallery", "A look around")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-6 py-16 sm:px-8 sm:py-20">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-24 text-center text-[color:#2A2A26]/50">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  // "From the larder — this week": the seasonal feature (tall image + note).
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 5);
  const featureImg = gallery[0]?.image_url;
  return shell(
    <>
      {/* HERO — light, editorial. Off-white field, large quiet headline, a tall
          framed photo to one side, and the airy inline booking strip beneath. */}
      <section className="relative overflow-hidden" style={{ background: OFFWHITE }}>
        <div className="mx-auto max-w-6xl px-6 pb-16 pt-36 sm:px-8 sm:pb-20 sm:pt-44">
          <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div>
              {content.cuisine_type && (
                <p data-edit="content.cuisine_type" className="text-[11px] font-medium uppercase tracking-[0.34em]" style={{ color: SAGE }}>{content.cuisine_type}</p>
              )}
              <h1 data-edit="content.tagline" style={display} className="mt-6 max-w-xl text-5xl font-normal leading-[1.03] sm:text-7xl">
                {content.tagline ?? "A seasonal kitchen and bar"}
              </h1>
              <p className="mt-7 max-w-md text-[17px] leading-[1.85] text-[color:#2A2A26]/70">
                Produce-led plates and a well-kept bar, in unhurried rooms. We cook what the season gives us.
              </p>
              {!bookingOn && (
                <a href={book} className="mt-9 inline-flex px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F6F3EC] transition hover:opacity-90" style={{ background: INK }}>Get in touch</a>
              )}
            </div>
            <div className="relative">
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="aspect-[4/5] w-full" style={{ background: `linear-gradient(160deg, ${STONE}, ${CLAY})` }} data-edit-image="hero" />
              )}
              {/* a fine clay seam, lower-left, as a quiet framing detail */}
              <span className="absolute -bottom-3 -left-3 hidden h-24 w-px sm:block" style={{ background: CLAY }} aria-hidden />
            </div>
          </div>

          {bookingOn && (
            <div className="mt-14">
              <LarderBooking tenantId={tenant.id} name={name} inline />
            </div>
          )}
        </div>
      </section>

      {/* ABOUT — a calm statement band on stone */}
      {content.about && (
        <section className="border-y" style={{ background: STONE, borderColor: `${INK}1f` }}>
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-24 sm:px-8 sm:py-28 lg:grid-cols-[auto_1fr] lg:gap-16">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] lg:pt-3" style={{ color: SAGE }}>About</p>
            <div>
              <p data-edit="content.about" style={display} className="max-w-3xl text-2xl font-normal leading-[1.45] text-[color:#2A2A26] sm:text-[2rem] sm:leading-[1.4]">{content.about}</p>
              <a href={href("about")} className="mt-8 inline-flex text-[11px] font-medium uppercase tracking-[0.22em] transition hover:text-[color:#7C8567]" style={{ color: INK }}>Our story →</a>
            </div>
          </div>
        </section>
      )}

      {/* FROM THE LARDER — THIS WEEK: the seasonal feature (tall image + note) */}
      {(featureImg || featured.length > 0) && (
        <section style={{ background: OFFWHITE }}>
          <div className="mx-auto max-w-6xl px-6 py-24 sm:px-8 sm:py-28">
            <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
              {/* tall portrait image */}
              <div className="relative">
                {featureImg ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img loading="lazy" decoding="async" src={featureImg} alt="" className="aspect-[3/4] w-full object-cover" />
                ) : (
                  <div className="aspect-[3/4] w-full" style={{ background: `linear-gradient(160deg, ${SAGE}, ${INK})` }} />
                )}
              </div>
              {/* note + this week's plates */}
              <div className="lg:pt-4">
                <p className="text-[11px] font-medium uppercase tracking-[0.34em]" style={{ color: SAGE }}>From the larder — this week</p>
                <h2 style={display} className="mt-5 max-w-md text-4xl font-normal leading-[1.08] sm:text-5xl">What is good right now</h2>
                <p className="mt-6 max-w-md text-[16px] leading-[1.85] text-[color:#2A2A26]/70">
                  A short list that shifts with the markets and the garden. Here is a little of what we are cooking this week.
                </p>
                {featured.length > 0 && (
                  <ul className="mt-9 divide-y" style={{ borderColor: `${INK}1f` }}>
                    {featured.map((item) => (
                      <li key={item.id} className="flex items-baseline justify-between gap-8 py-4">
                        <div className="min-w-0">
                          <p data-edit={`item:${item.id}:name`} style={display} className="text-lg font-normal text-[color:#2A2A26]">{item.name}</p>
                          {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 line-clamp-1 text-sm text-[color:#2A2A26]/55">{item.description}</p>}
                        </div>
                        {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium" style={{ color: SAGE }}>{item.price}</span>}
                      </li>
                    ))}
                  </ul>
                )}
                {groups.length > 0 && (
                  <a href={href("menu")} className="mt-9 inline-flex text-[11px] font-medium uppercase tracking-[0.22em] transition hover:text-[color:#7C8567]" style={{ color: INK }}>See the full menu →</a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QUIET CTA band on sage — the one place colour comes forward */}
      <section style={{ background: SAGE }} className="text-[#F6F3EC]">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 sm:py-28">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-[#F6F3EC]/75">An evening with us</p>
          <h2 style={display} className="mt-4 text-4xl font-normal leading-[1.1] sm:text-6xl">Pull up a chair</h2>
          <p className="mx-auto mt-6 max-w-lg text-[16px] leading-[1.85] text-[#F6F3EC]/85">
            Whether a quiet dinner for two or a long table with friends, we will look after you.
          </p>
          <a href={book} className="mt-10 inline-flex px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: OFFWHITE, color: INK }}>
            {bookingOn ? "Reserve a table" : "Get in touch"}
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
