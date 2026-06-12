import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { VialettoHeader } from "./VialettoHeader";
import { VialettoBooking } from "./VialettoBooking";

// Vialetto — an elegant Italian trattoria, MULTI-PAGE. Real routes under
// basePath (Menu / Reservations / Gallery / About / Contact), never anchors.
//
// Distinct structural identity (shares nothing with Meadow's bright full-bleed
// diner or Laurel's botanical centre-column):
//  - HERO: an asymmetric editorial spread on CREAM — a tall portrait photo on
//    the left framed in a terracotta ARCH, a quiet lowercase-italic serif
//    headline on the right, a slim inline reservation strip below it. No dark
//    overlay anywhere.
//  - "la famiglia" heritage spread: text + portrait, gold rule, magazine feel.
//  - MENU: a two-column editorial divider list (Antipasti / Primi / Secondi)
//    with small italic descriptions — divider rows, NO cards, NO leaders.
//  - Arches / fluted-column motif recurs as a framing device.
// Palette baked: cypress green, cream, terracotta, antique gold. Display type is
// a restrained lowercase-italic Fraunces — quiet luxury, lots of whitespace.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const GREEN = "#2F4A36";
const CREAM = "#F4EFE3";
const TERRA = "#C56A3E";
const GOLD = "#B8893B";
const PAPER = "#FBF8F1";

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

// A small gold rule with a centred diamond — the recurring section ornament.
function Flourish({ light = false }: { light?: boolean }) {
  const c = light ? `${CREAM}88` : `${GOLD}99`;
  return (
    <div className="flex items-center justify-center gap-3 py-1" aria-hidden>
      <span className="h-px w-12" style={{ background: c }} />
      <span className="h-1.5 w-1.5 rotate-45" style={{ background: light ? CREAM : GOLD }} />
      <span className="h-px w-12" style={{ background: c }} />
    </div>
  );
}

// An arched image frame — the trattoria's signature motif. A terracotta keyline
// arch around a portrait photo (or a quiet placeholder when none is supplied).
function ArchImage({ src, editKey, className = "", ratio = "aspect-[3/4]" }: { src?: string; editKey?: string; className?: string; ratio?: string }) {
  return (
    <div
      className={`relative overflow-hidden ${ratio} ${className}`}
      style={{ borderRadius: "9999px 9999px 12px 12px", border: `1px solid ${GOLD}`, boxShadow: `0 0 0 7px ${PAPER}, 0 0 0 8px ${GOLD}55` }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img loading="lazy" decoding="async" data-edit-image={editKey} src={src} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${GREEN}, #20331f)` }} />
      )}
    </div>
  );
}

export default function VialettoDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    content.about && { label: "La Famiglia", href: href("about") },
    gallery.length > 0 && { label: "Galleria", href: href("gallery") },
    bookingOn && { label: "Prenota", href: href("reservations") },
    { label: "Contatti", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- SHARED FOOTER (cypress green, gold accents) ----
  const footer = (
    <footer style={{ background: GREEN }} className="text-[color:#F4EFE3]">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="text-center">
          <a href={href("home")} data-edit="tenant.business_name" style={{ ...serif, color: CREAM }} className="block text-3xl italic lowercase">{name}</a>
          {content.tagline && <p data-edit="content.tagline" className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:#F4EFE3]/70">{content.tagline}</p>}
          <div className="mt-7"><Flourish light /></div>
        </div>

        <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>Naviga</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-[color:#F4EFE3]/75">
              {([
                groups.length > 0 && { label: "Il menu", href: href("menu") },
                content.about && { label: "La famiglia", href: href("about") },
                gallery.length > 0 && { label: "Galleria", href: href("gallery") },
                bookingOn && { label: "Prenota un tavolo", href: href("reservations") },
                { label: "Contatti", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-[color:#F4EFE3]">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>Orari</h4>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#F4EFE3]/75">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F4EFE3]/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#F4EFE3]/60">Aperto tutti i giorni.</p>}
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>Dove siamo</h4>
            <div className="mt-5 space-y-2 text-sm text-[color:#F4EFE3]/75">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#F4EFE3]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#F4EFE3]">{content.email}</a>}
            </div>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.26em]" style={{ color: GOLD }}>Seguici</h4>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-5 flex gap-4 text-[color:#F4EFE3]">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
            <a href={book} className="mt-6 inline-flex px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
              {bookingOn ? "Prenota un tavolo" : "Contattaci"}
            </a>
          </div>
        </div>

        <p className="mt-14 border-t pt-8 text-center text-xs text-[color:#F4EFE3]/45" style={{ borderColor: `${GOLD}33` }}>© {name}. Tutti i diritti riservati.</p>
      </div>
    </footer>
  );

  // ---- SHARED SHELL ----
  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: GREEN }} className="min-h-screen font-body">
      <VialettoHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream sub-page banner that clears the fixed header.
  const banner = (kicker: string, title: string) => (
    <section className="text-center" style={{ background: PAPER, borderBottom: `1px solid ${GOLD}33` }}>
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-32 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: TERRA }}>{kicker}</p>
        <h1 style={serif} className="mt-4 text-5xl italic lowercase sm:text-6xl">{title}</h1>
        <div className="mt-6"><Flourish /></div>
      </div>
    </section>
  );

  // ---- MENU (two-column editorial divider list) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("Il menu", "a tavola")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
            {groups.length > 0 ? (
              <>
                <div className="grid items-start gap-x-16 gap-y-16 md:grid-cols-2">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-7 text-center">
                          <h2 style={serif} className="text-3xl italic lowercase">{section.section}</h2>
                          <div className="mt-3"><Flourish /></div>
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-9">
                          {catg.category && <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: TERRA }}>{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${GOLD}33` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-lg text-[color:#2F4A36]" style={serif}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm italic leading-relaxed text-[color:#2F4A36]/55">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F4EFE3] transition hover:opacity-90" style={{ background: GREEN }}>
                        {o.label}{o.commission_free ? " · senza commissioni" : ""}
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-16 text-center">
                  <a href={book} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F4EFE3] transition hover:opacity-90" style={{ background: TERRA }}>
                    {bookingOn ? "Prenota un tavolo" : "Contattaci"}
                  </a>
                </div>
              </>
            ) : (
              <p className="text-center text-[color:#2F4A36]/55">Il nostro menu arriverà presto.</p>
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
        {banner("Prenotazioni", "prenota un tavolo")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-10 text-center text-[17px] italic leading-[1.9] text-[color:#2F4A36]/75" style={serif}>
              Saremmo lieti di accogliervi a {name}. Scegliete giorno e orario e vi confermeremo per telefono o email. Per tavolate di otto o più persone, chiamateci e penseremo a tutto noi.
            </p>
            <VialettoBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contatti", "venite a trovarci")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 style={serif} className="text-3xl italic lowercase">come raggiungerci</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[color:#2F4A36]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg text-[color:#2F4A36]" style={serif}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:opacity-70">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:opacity-70">{content.email}</a>}
              </div>

              {content.hours && content.hours.length > 0 && (
                <div className="mt-9 p-7" style={{ background: PAPER, border: `1px solid ${GOLD}` }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: TERRA }}>Orari di apertura</p>
                  <ul className="mt-4 space-y-2.5 text-sm text-[color:#2F4A36]/80">
                    {content.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-6 border-b border-dashed py-1.5" style={{ borderColor: `${GREEN}22` }}>
                        <span data-edit={`hours:${i}:day`}>{h.day}</span>
                        <span data-edit={`hours:${i}:open`} className="text-[color:#2F4A36]/50">{h.open}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F4EFE3] transition hover:opacity-90" style={{ background: GREEN }}>
                  Indicazioni stradali
                </a>
              )}
            </div>

            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Scriveteci"
                  contactBlurb="Per prenotazioni, eventi o cene private, lasciateci due righe e vi risponderemo presto."
                  contactCta="Invia"
                  theme={{ card: PAPER, cardBorder: GOLD, heading: GREEN, blurb: "#5a6b56", label: "#5a6b56", fieldBg: "#ffffff", fieldBorder: "#d8cdb0", fieldText: GREEN, button: GREEN, buttonText: CREAM, radius: "0", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT (la famiglia heritage spread) ----
  if (page === "about") {
    return shell(
      <>
        {banner("La nostra storia", "la famiglia")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-[1fr_0.8fr] md:gap-16">
            <div>
              {content.about ? (
                <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[color:#2F4A36]/80">{content.about}</p>
              ) : (
                <p className="text-[color:#2F4A36]/55">La nostra storia arriverà presto.</p>
              )}
              {content.cuisine_type && (
                <>
                  <div className="mt-10"><Flourish /></div>
                  <h3 style={serif} className="mt-8 text-3xl italic lowercase">la nostra cucina</h3>
                  <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.85] text-[color:#2F4A36]/80">{content.cuisine_type}</p>
                </>
              )}
            </div>
            <ArchImage src={gallery[0]?.image_url ?? hero} />
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("Galleria", "uno sguardo")}
        {gallery.length > 0 ? (
          <section className="px-6 py-12 sm:py-16" style={{ background: CREAM }}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" style={{ border: `1px solid ${GOLD}55` }} />
              ))}
            </div>
          </section>
        ) : (
          <p className="px-6 py-20 text-center text-[color:#2F4A36]/55" style={{ background: CREAM }}>Le foto arriveranno presto.</p>
        )}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 5);
  return shell(
    <>
      {/* ASYMMETRIC EDITORIAL HERO — portrait arch image + serif headline on cream. */}
      <section className="relative overflow-hidden px-6 pt-28 pb-16 sm:pt-36 sm:pb-20" style={{ background: CREAM }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.85fr_1fr] lg:gap-16">
          {/* tall portrait, arched */}
          <div className="order-last mx-auto w-full max-w-sm lg:order-first lg:max-w-none">
            <ArchImage src={hero} editKey="hero" ratio="aspect-[3/4]" />
          </div>

          {/* headline + intro + inline booking */}
          <div>
            {content.cuisine_type && (
              <p data-edit="content.cuisine_type" className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: TERRA }}>{content.cuisine_type}</p>
            )}
            <h1 data-edit="content.tagline" style={serif} className="mt-5 max-w-xl text-5xl italic lowercase leading-[1.04] text-[color:#2F4A36] sm:text-7xl">
              {content.tagline ?? "trattoria di famiglia"}
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-[1.85] text-[color:#2F4A36]/75">
              Pasta fatta a mano, ricette di casa e l&apos;ospitalità di una tavola italiana. Benvenuti a {name}.
            </p>
            {bookingOn ? (
              <div className="mt-9 max-w-md">
                <VialettoBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F4EFE3] transition hover:opacity-90" style={{ background: GREEN }}>
                Contattaci
              </a>
            )}
          </div>
        </div>
      </section>

      {/* HERITAGE BAND — "la famiglia" spread on cypress green. */}
      {content.about && (
        <section style={{ background: GREEN }} className="text-[color:#F4EFE3]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 md:grid-cols-[0.8fr_1fr] md:gap-16">
            <ArchImage src={gallery[0]?.image_url ?? hero} className="mx-auto w-full max-w-xs md:max-w-none" />
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: GOLD }}>La famiglia</p>
              <h2 style={serif} className="mt-4 text-4xl italic lowercase sm:text-5xl">una storia di famiglia</h2>
              <p data-edit="content.about" className="mt-7 max-w-xl text-[17px] leading-[1.9] text-[color:#F4EFE3]/80">{content.about}</p>
              <a href={href("about")} className="mt-8 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN }}>
                La nostra storia
              </a>
            </div>
          </div>
        </section>
      )}

      {/* MENU HIGHLIGHTS — editorial divider list framed by a quiet arch motif. */}
      {featured.length > 0 && (
        <section className="px-6 py-20 sm:py-28" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TERRA }}>Dalla cucina</p>
            <h2 style={serif} className="mt-4 text-4xl italic lowercase sm:text-5xl">qualche assaggio</h2>
            <div className="mt-5"><Flourish /></div>
            <ul className="mx-auto mt-10 max-w-xl divide-y text-left" style={{ borderColor: `${GOLD}33` }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-lg text-[color:#2F4A36]" style={serif}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm italic leading-relaxed text-[color:#2F4A36]/55">{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: GOLD }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
            <div className="mt-12">
              <a href={href("menu")} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F4EFE3] transition hover:opacity-90" style={{ background: GREEN }}>
                Tutto il menu
              </a>
            </div>
          </div>
        </section>
      )}

      {/* GALLERY STRIP — a slim arched-photo row teasing the gallery page. */}
      {gallery.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${GOLD}33`, borderBottom: `1px solid ${GOLD}33` }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" style={{ borderRadius: "9999px 9999px 8px 8px", border: `1px solid ${GOLD}66` }} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GREEN }}>Tutta la galleria →</a>
            </div>
          </div>
        </section>
      )}

      {/* CLOSING CTA — quiet invitation on cream. */}
      <section className="px-6 py-20 text-center sm:py-28" style={{ background: CREAM }}>
        <div className="mx-auto max-w-2xl">
          <Flourish />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: TERRA }}>Una serata da {name}</p>
          <h2 style={serif} className="mt-4 text-4xl italic lowercase sm:text-5xl">vi aspettiamo a tavola</h2>
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.9] text-[color:#2F4A36]/75">
            Una cena intima o una grande festa di famiglia: la nostra tavola è pronta ad accogliervi. Prenotate online in un istante, o scriveteci per organizzare qualcosa di speciale.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={book} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F4EFE3] transition hover:opacity-90" style={{ background: GREEN }}>
              {bookingOn ? "Prenota un tavolo" : "Contattaci"}
            </a>
            <a href={href("contact")} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${GREEN}`, color: GREEN }}>
              Venite a trovarci
            </a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
