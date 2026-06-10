import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { LaurelHeader } from "./LaurelHeader";
import { LaurelBooking } from "./LaurelBooking";

// Laurel — an elegant, luxe, botanical single-venue design (inspired by the
// structure of The Ivy Collection), MULTI-PAGE: the nav opens real routes
// (Menu / About / Gallery / Reservations / Visit) under basePath, never scroll
// anchors. Each page is its own layout; the sticky serif header and ornate
// footer are shared via shell(). The palette is baked to the reference's
// botanical look (deep green / gold / cream / ink); the client swaps in their
// own photography, copy, menu, hours and contact.
//
// Distinct layouts (vs Ember):
//  - menu: elegant CENTERED single-column with gold decorative dividers.
//  - reservations: a refined, centred boutique gold-bordered card (LaurelBooking).
//  - contact: two-column with opening hours emphasised in a bordered card on one
//    side and the contact form on the other.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GREEN = "#163d2b";
const GOLD = "#b8975a";
const CREAM = "#f6f1e7";
const INK = "#1c1c1c";

// Pick an icon for a social link from its label/url; falls back to a globe.
function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("linkedin")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("tiktok")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x" || k.includes("/x")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

// A small botanical leaf mark used as an ornament between sections.
function Sprig() {
  return (
    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke={GOLD} strokeWidth="1" aria-hidden className="mx-auto">
      <path d="M12 21V6" />
      <path d="M12 11c-2-1-4-1-5-3 2 0 4 0 5 2zM12 11c2-1 4-1 5-3-2 0-4 0-5 2zM12 16c-2-1-4-1-5-3 2 0 4 0 5 2zM12 16c2-1 4-1 5-3-2 0-4 0-5 2z" />
    </svg>
  );
}

// A decorative centred gold rule with a sprig at its middle, for menu sections.
function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2" aria-hidden>
      <span className="h-px w-16" style={{ background: `${GOLD}88` }} />
      <Sprig />
      <span className="h-px w-16" style={{ background: `${GOLD}88` }} />
    </div>
  );
}

export default function LaurelDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- SHARED FOOTER ----
  const footer = (
    <footer style={{ background: GREEN }} className="text-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="text-center">
          <Sprig />
          <a href={href("home")} data-edit="tenant.business_name" style={serif} className="mt-4 block text-2xl tracking-[0.16em]">{name}</a>
        </div>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Explore</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-white/75">
              {([
                groups.length > 0 && { label: "Our menu", href: href("menu") },
                content.about && { label: "About us", href: href("about") },
                gallery.length > 0 && { label: "Gallery", href: href("gallery") },
                bookingOn && { label: "Reservations", href: href("reservations") },
                { label: "Visit us", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Opening hours</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-white/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/50">{h.open}</span></li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 text-sm text-white/60">Open daily for lunch and dinner.</p>
            )}
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Find us</h4>
            <div className="mt-5 space-y-2 text-sm text-white/75">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GOLD }}>Follow</h4>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-5 flex gap-4">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60">
                    <SocialIcon kind={`${s.label} ${s.url}`} />
                  </a>
                ))}
              </div>
            )}
            <a href={book} className="mt-6 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
              {bookingOn ? "Book a table" : "Contact us"}
            </a>
          </div>
        </div>

        <p className="mt-14 border-t pt-8 text-center text-xs text-white/45" style={{ borderColor: `${GOLD}33` }}>© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  // ---- SHARED SHELL ----
  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: INK }} className="min-h-screen font-body">
      <LaurelHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream sub-page banner — sets the elegant tone and clears the fixed header.
  const banner = (kicker: string, title: string) => (
    <section className="border-b text-center" style={{ background: CREAM, borderColor: `${GOLD}33` }}>
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-32 sm:pt-36">
        <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">{title}</h1>
        <div className="mt-6"><Sprig /></div>
      </div>
    </section>
  );

  // ---- MENU (elegant centred single-column with gold dividers) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Our menu", "The seasonal table")}
        <section className="mx-auto max-w-2xl px-6 py-20">
          {groups.length > 0 ? (
            <>
              {groups.map((section, si) => (
                <div key={section.section} className="break-inside-avoid">
                  {si > 0 && <GoldDivider />}
                  {section.section && (
                    <h2 style={serif} className="mt-2 text-center text-2xl uppercase tracking-[0.18em]" >{section.section}</h2>
                  )}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && (
                        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>{catg.category}</p>
                      )}
                      <ul className="space-y-7">
                        {catg.items.map((item) => (
                          <li key={item.id} className="text-center">
                            <div className="flex items-baseline justify-center gap-3">
                              <span data-edit={`item:${item.id}:name`} style={serif} className="text-lg" >{item.name}</span>
                              {item.price && <span data-edit={`item:${item.id}:price`} className="text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
                            </div>
                            {item.description && <p data-edit={`item:${item.id}:description`} className="mx-auto mt-1.5 max-w-md text-sm italic leading-relaxed text-neutral-600">{item.description}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}

              {content.ordering_links && content.ordering_links.length > 0 && (
                <>
                  <GoldDivider />
                  <div className="mt-6 flex flex-wrap justify-center gap-4">
                    {content.ordering_links.map((o) => (
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
                        {o.label}{o.commission_free ? " · commission-free" : ""}
                      </a>
                    ))}
                  </div>
                </>
              )}

              <div className="mt-14 text-center">
                <a href={book} className="inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
                  {bookingOn ? "Book a table" : "Contact us"}
                </a>
              </div>
            </>
          ) : (
            <p className="text-center text-neutral-500">Our menu is coming soon.</p>
          )}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS (refined boutique boxed card) ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Reservations", "Book a table")}
        <section className="mx-auto max-w-xl px-6 py-20">
          <p className="mb-10 text-center text-[17px] leading-[1.9] text-neutral-700">
            We would be delighted to welcome you to {name}. Reserve your table below and we will confirm by phone or email. For parties of eight or more, or private dining, please call us directly.
          </p>
          <LaurelBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT (hours card + contact form, two-column) ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Find us")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <h2 style={serif} className="text-3xl font-medium">How to find us</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:opacity-70">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:opacity-70">{content.email}</a>}
            </div>

            {/* Opening hours emphasised in a bordered card */}
            {content.hours && content.hours.length > 0 && (
              <div className="mt-9 p-7" style={{ border: `1px solid ${GOLD}`, boxShadow: `inset 0 0 0 4px ${CREAM}, inset 0 0 0 5px ${GOLD}33` }}>
                <p className="text-xs font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Opening hours</p>
                <ul className="mt-4 space-y-2.5 text-sm text-neutral-700">
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6 border-b border-dashed py-1.5" style={{ borderColor: `${GREEN}22` }}>
                      <span data-edit={`hours:${i}:day`}>{h.day}</span>
                      <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
                Get directions
              </a>
            )}
          </div>

          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Make an enquiry"
                contactBlurb="For reservations, events or private dining, send us a note."
                contactCta="Send enquiry"
                theme={{ card: "#ffffff", cardBorder: "#b8975a", heading: "#163d2b", blurb: "#4a5b4f", label: "#4a5b4f", fieldBg: "#ffffff", fieldBorder: "#d8cdb0", fieldText: "#163d2b", button: "#163d2b", buttonText: "#f6f1e7", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", `Welcome to ${name}`)}
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.95] text-neutral-700">{content.about}</p>
          ) : (
            <p className="text-neutral-500">Our story is coming soon.</p>
          )}
          {content.cuisine_type && (
            <>
              <GoldDivider />
              <h2 style={serif} className="mt-2 text-3xl font-medium">A taste of what we do</h2>
              <p data-edit="content.cuisine_type" className="mx-auto mt-5 max-w-2xl text-[17px] leading-[1.85] text-neutral-700">{content.cuisine_type}</p>
            </>
          )}
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
          <section className="grid grid-cols-2 gap-1.5 px-1.5 pb-1.5 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : (
          <p className="mx-auto max-w-6xl px-6 py-20 text-center text-neutral-500">Photos coming soon.</p>
        )}
      </>,
    );
  }

  // ---- HOME (hero + short teasers only) ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* LUSH HERO */}
      <section className="relative isolate flex min-h-[100vh] flex-col items-center justify-center overflow-hidden text-center">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${GREEN}, #0d2419)` }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/45" />

        <div className="relative z-10 px-6 text-white">
          {content.cuisine_type && (
            <p data-edit="content.cuisine_type" className="text-xs font-medium uppercase tracking-[0.4em] text-white/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.5)]">{content.cuisine_type}</p>
          )}
          <h1 data-edit="content.tagline" style={serif} className="mx-auto mt-5 max-w-3xl text-4xl font-medium leading-[1.1] [text-shadow:0_2px_24px_rgba(0,0,0,0.45)] sm:text-6xl">
            {content.tagline ?? "An all-day dining destination"}
          </h1>
          <p style={serif} className="mt-5 text-lg italic text-white/90 [text-shadow:0_1px_14px_rgba(0,0,0,0.5)] sm:text-2xl">{name}</p>
          <div className="mt-9">
            <a href={book} className="inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.22em] shadow-xl transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
              Reserve a table
            </a>
          </div>
        </div>
      </section>

      {/* INTRO / WELCOME teaser */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Sprig />
          <h2 style={serif} className="mt-6 text-3xl font-medium sm:text-4xl">Welcome to {name}</h2>
          <p data-edit="content.about" className="mx-auto mt-7 max-w-2xl text-[17px] leading-[1.9] text-neutral-700">{content.about}</p>
          {content.about.length > 0 && (
            <div className="mt-9">
              <a href={href("about")} className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: GREEN }}>Read our story →</a>
            </div>
          )}
        </section>
      )}

      {/* MENU HIGHLIGHTS → link to full menu page */}
      {featured.length > 0 && (
        <section style={{ background: GREEN }} className="text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>Our menu</p>
            <h2 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">The seasonal table</h2>
            <ul className="mx-auto mt-12 max-w-xl divide-y text-left" style={{ borderColor: `${GOLD}55` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-base font-medium text-white" style={{ ...serif }}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-white/65">{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <a href={href("menu")} className="inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
                View the full menu
              </a>
            </div>
          </div>
        </section>
      )}

      {/* QUICK INFO / CTA band */}
      <section className="mx-auto max-w-5xl px-6 py-24 text-center">
        <Sprig />
        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.35em]" style={{ color: GOLD }}>An evening at {name}</p>
        <h2 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">Reserve your table</h2>
        <p className="mx-auto mt-6 max-w-2xl text-[17px] leading-[1.9] text-neutral-700">
          Whether an intimate dinner or a milestone celebration, our team is ready to welcome you. Book online in moments, or get in touch to plan something special.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <a href={book} className="inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: GREEN }}>
            {bookingOn ? "Book a table" : "Contact us"}
          </a>
          <a href={href("contact")} className="inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ border: `1px solid ${GREEN}`, color: GREEN }}>
            Visit us
          </a>
        </div>
      </section>
    </>,
    false,
  );
}
