import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { editCopy, groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { ComptoirHeader } from "./ComptoirHeader";
import { ComptoirBooking } from "./ComptoirBooking";

// Comptoir — a classic Parisian corner BISTRO, MULTI-PAGE. Real routes under
// basePath (La Carte / Réserver / Galerie / La Maison / Nous Trouver), never
// scroll anchors. Each page is its own layout; the sticky cream header (crowned
// by a red awning stripe) and the zinc footer are shared via shell().
//
// Distinct structural identity — shares NOTHING with Vialetto's Italian cypress
// arches, Gateau's pastels, Laurel's botanical centre-column or Meadow's bright
// diner:
//  - HERO: a Parisian café-terrace on CREAM, crowned by a full-width red AWNING
//    stripe, an elegant French serif wordmark, a quiet introduction and a slim
//    zinc "comptoir" réservation strip. No dark photo overlay.
//  - L'ARDOISE DU JOUR: the signature — a dark SLATE chalkboard panel framed in
//    brass, listing the day's plates as clean divide-y rows (chalk-white type).
//  - MENU: clean two-column divider rows (Entrées / Plats / Desserts), brass
//    hairlines, prices in brass — NO leaders, NO cards.
//  - Bistro-tile (mosaic) + awning-stripe motifs recur as framing devices.
// Palette baked: bistro red, zinc/charcoal, cream, brass, deep bottle green.
// Display type is Fraunces — timeless, romantic, premium neighbourhood bistro.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const RED = "#9E2B25";
const ZINC = "#2B2B2E";
const CREAM = "#F2ECDD";
const BRASS = "#B89150";
const GREEN = "#234034";
const PAPER = "#FBF7EC";

// The repeating red/cream awning stripe — the bistro's roof, a recurring motif.
const AWNING = `repeating-linear-gradient(90deg, ${RED} 0 22px, ${CREAM} 22px 44px)`;
// A small zinc/cream mosaic — the classic bistro floor tile, used as a texture.
const TILE = `repeating-conic-gradient(${ZINC} 0% 25%, ${CREAM} 0% 50%) 50% / 18px 18px`;

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

// A slim brass rule with a centred fleuron — the recurring section ornament.
function Fleuron({ light = false }: { light?: boolean }) {
  const line = light ? `${BRASS}88` : `${BRASS}99`;
  return (
    <div className="flex items-center justify-center gap-3 py-1" aria-hidden>
      <span className="h-px w-14" style={{ background: line }} />
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={BRASS} strokeWidth="1.3" aria-hidden>
        <path d="M12 4c2 3 2 6 0 9-2-3-2-6 0-9z" />
        <path d="M12 13v7M8 18c1.5 0 2.5-.8 4-2M16 18c-1.5 0-2.5-.8-4-2" />
      </svg>
      <span className="h-px w-14" style={{ background: line }} />
    </div>
  );
}

export default function ComptoirDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "La Carte", href: href("menu") },
    content.about && { label: "La Maison", href: href("about") },
    gallery.length > 0 && { label: "Galerie", href: href("gallery") },
    bookingOn && { label: "Réserver", href: href("reservations") },
    { label: "Nous Trouver", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- SHARED FOOTER (zinc/charcoal, brass accents, awning rule on top) ----
  const footer = (
    <footer style={{ background: ZINC }} className="text-[color:#F2ECDD]">
      <div className="h-1.5 w-full" style={{ backgroundImage: AWNING }} aria-hidden />
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.3fr]">
          <div>
            <a href={href("home")} data-edit="tenant.business_name" style={{ ...serif, color: CREAM }} className="block text-3xl">{name}</a>
            {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[color:#F2ECDD]/65">{content.tagline}</p>}
            {content.socials && content.socials.length > 0 && (
              <>
                <h4 className="mt-8 text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "footer_social_heading", "Suivez-nous")} />
                <div className="mt-4 flex gap-4 text-[color:#F2ECDD]">
                  {content.socials.map((s) => (
                    <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                  ))}
                </div>
              </>
            )}
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "footer_bistro_heading", "Le Bistrot")} />
            <ul className="mt-5 space-y-2.5 text-sm text-[color:#F2ECDD]/70">
              {([
                groups.length > 0 && { label: "La carte", href: href("menu") },
                content.about && { label: "La maison", href: href("about") },
                gallery.length > 0 && { label: "Galerie", href: href("gallery") },
                bookingOn && { label: "Réserver une table", href: href("reservations") },
                { label: "Nous trouver", href: href("contact") },
              ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
                <li key={l.label}><a href={l.href} className="transition hover:text-[color:#F2ECDD]">{l.label}</a></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: BRASS }} {...editCopy(content, "footer_hours_heading", "Horaires")} />
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#F2ECDD]/70">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F2ECDD]/45">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#F2ECDD]/60">Ouvert tous les jours.</p>}
            {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[color:#F2ECDD]/70">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[color:#F2ECDD]/70">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#F2ECDD]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#F2ECDD]">{content.email}</a>}
            </div>
          </div>

          {/* CTA panel — bottle-green card with a brass keyline */}
          <div className="px-7 py-9" style={{ background: GREEN, borderRadius: "3px", border: `1px solid ${BRASS}55` }}>
            <h4 style={{ ...serif, color: CREAM }} className="text-2xl leading-tight" {...editCopy(content, "footer_cta_heading", "Une table vous attend")} />
            <p className="mt-2 text-sm leading-relaxed text-[color:#F2ECDD]/80" {...editCopy(content, "footer_cta_blurb", "Déjeuner sur la terrasse ou dîner au comptoir — réservez en quelques instants.")} />
            <a href={book} className="mt-6 inline-flex px-7 py-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[color:#F2ECDD] transition hover:opacity-90" style={{ background: RED, borderRadius: "2px" }}>{bookingOn ? "Réserver une table" : "Nous contacter"}</a>
          </div>
        </div>

        <p className="mt-14 border-t pt-8 text-center text-xs text-[color:#F2ECDD]/45" style={{ borderColor: `${BRASS}33` }}>© {name}. Tous droits réservés.</p>
      </div>
    </footer>
  );

  // ---- SHARED SHELL ----
  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: CREAM, color: ZINC }} className="min-h-screen font-body">
      <ComptoirHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Cream sub-page banner that clears the fixed header; a thin tile rule below.
  const banner = (kicker: string, kickerKey: string, title: string, titleKey?: string) => (
    <section className="text-center" style={{ background: PAPER, borderBottom: `1px solid ${BRASS}33` }}>
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-32 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: RED }} {...editCopy(content, kickerKey, kicker)} />
        {titleKey ? <h1 style={serif} className="mt-4 text-5xl sm:text-6xl" {...editCopy(content, titleKey, title)} /> : <h1 style={serif} className="mt-4 text-5xl sm:text-6xl">{title}</h1>}
        <div className="mt-6"><Fleuron /></div>
      </div>
      <div className="h-2 w-full" style={{ background: TILE, opacity: 0.5 }} aria-hidden />
    </section>
  );

  // ---- MENU (two-column divider rows, brass hairlines) ----
  if (page === "menu") {
    return shell(
      <>
        {banner("La carte", "menu_kicker", "À la carte", "menu_title")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-5xl">
            {groups.length > 0 ? (
              <>
                <div className="grid items-start gap-x-16 gap-y-16 md:grid-cols-2">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="mb-7 text-center">
                          <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={serif} className="text-3xl">{section.section}</h2>
                          <div className="mt-3"><Fleuron /></div>
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mb-9">
                          {catg.category && <p data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: RED }}>{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${BRASS}33` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-lg text-[color:#2B2B2E]" style={serif}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm italic leading-relaxed text-[color:#2B2B2E]/55">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BRASS }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F2ECDD] transition hover:opacity-90" style={{ background: ZINC, borderRadius: "2px" }}>
                        {o.label}{o.commission_free ? " · sans commission" : ""}
                      </a>
                    ))}
                  </div>
                )}

                <div className="mt-16 text-center">
                  <a href={book} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F2ECDD] transition hover:opacity-90" style={{ background: RED, borderRadius: "2px" }}>
                    {bookingOn ? "Réserver une table" : "Nous contacter"}
                  </a>
                </div>
              </>
            ) : (
              <p className="text-center text-[color:#2B2B2E]/55">Notre carte arrive bientôt.</p>
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
        {banner("Réservations", "book_kicker", "Réserver une table", "book_title")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-xl">
            <p className="mb-10 text-center text-[17px] italic leading-[1.9] text-[color:#2B2B2E]/75" style={serif}>
              Nous serions ravis de vous accueillir à {name}. Choisissez le jour et l&apos;heure, nous confirmerons par téléphone ou par email. Pour les tablées de huit couverts ou plus, appelez-nous et nous nous occupons de tout.
            </p>
            <ComptoirBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---- CONTACT / NOUS TROUVER ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Nous trouver", "contact_kicker", "Au coin de la rue", "contact_title")}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 style={serif} className="text-3xl" {...editCopy(content, "contact_heading", "Comment nous rejoindre")} />
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[color:#2B2B2E]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg text-[color:#2B2B2E]" style={serif}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#9E2B25]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#9E2B25]">{content.email}</a>}
              </div>

              {content.hours && content.hours.length > 0 && (
                <div className="mt-9 p-7" style={{ background: PAPER, border: `1px solid ${BRASS}`, borderRadius: "2px" }}>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: RED }} {...editCopy(content, "contact_hours_label", "Horaires d'ouverture")} />
                  <ul className="mt-4 space-y-2.5 text-sm text-[color:#2B2B2E]/80">
                    {content.hours.map((h, i) => (
                      <li key={i} className="flex justify-between gap-6 border-b border-dashed py-1.5" style={{ borderColor: `${ZINC}22` }}>
                        <span data-edit={`hours:${i}:day`}>{h.day}</span>
                        <span data-edit={`hours:${i}:open`} className="text-[color:#2B2B2E]/50">{h.open}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F2ECDD] transition hover:opacity-90" style={{ background: ZINC, borderRadius: "2px" }} {...editCopy(content, "contact_directions_cta", "Itinéraire")} />
              )}
            </div>

            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Écrivez-nous"
                  contactBlurb="Pour une réservation, un événement ou une privatisation, laissez-nous un mot et nous reviendrons vers vous rapidement."
                  contactCta="Envoyer"
                  theme={{ card: PAPER, cardBorder: BRASS, heading: ZINC, blurb: "#5a554b", label: "#5a554b", fieldBg: "#ffffff", fieldBorder: "#d8cdb0", fieldText: ZINC, button: RED, buttonText: CREAM, radius: "2px", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT / LA MAISON ----
  if (page === "about") {
    return shell(
      <>
        {banner("La maison", "about_kicker", `Bienvenue chez ${name}`, undefined)}
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div className="mx-auto max-w-3xl">
            {content.about ? (
              <p data-edit="content.about" className="text-[18px] leading-[1.95] text-[color:#2B2B2E]/80">{content.about}</p>
            ) : (
              <p className="text-[color:#2B2B2E]/55">Notre histoire arrive bientôt.</p>
            )}
            {content.cuisine_type && (
              <>
                <div className="mt-10"><Fleuron /></div>
                <h3 style={serif} className="mt-8 text-center text-3xl" {...editCopy(content, "about_cuisine_heading", "Notre cuisine")} />
                <p data-edit="content.cuisine_type" className="mt-4 text-center text-[17px] leading-[1.85] text-[color:#2B2B2E]/80">{content.cuisine_type}</p>
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
        {banner("Galerie", "gallery_kicker", "L'ambiance", "gallery_title")}
        {gallery.length > 0 ? (
          <section className="px-6 py-12 sm:py-16" style={{ background: CREAM }}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" style={{ border: `1px solid ${BRASS}55` }} />
              ))}
            </div>
          </section>
        ) : (
          <p className="px-6 py-20 text-center text-[color:#2B2B2E]/55" style={{ background: CREAM }}>Les photos arrivent bientôt.</p>
        )}
      </>,
    );
  }

  // ---- HOME ----
  const ardoise = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  return shell(
    <>
      {/* PARISIAN TERRACE HERO — café-terrace photo under a red awning, on cream. */}
      <section className="relative overflow-hidden" style={{ background: CREAM }}>
        {/* full-width red awning roof over the hero */}
        <div className="h-3 w-full" style={{ backgroundImage: AWNING }} aria-hidden />
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pt-24 pb-16 sm:pt-28 sm:pb-20 lg:grid-cols-[1fr_0.92fr] lg:gap-16">
          {/* headline + intro + inline réservation strip */}
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: RED }}>
              {content.cuisine_type ? <span data-edit="content.cuisine_type">{content.cuisine_type}</span> : "Bistrot · Paris"}
            </p>
            <h1 data-edit="content.tagline" style={serif} className="mt-5 max-w-xl text-5xl leading-[1.02] text-[color:#2B2B2E] sm:text-7xl">
              {content.tagline ?? "Le bistrot du coin"}
            </h1>
            <p className="mt-6 max-w-md text-[17px] leading-[1.85] text-[color:#2B2B2E]/75">
              Un comptoir en zinc, une terrasse ensoleillée et la cuisine de bistrot que l&apos;on aime. Bienvenue chez {name}.
            </p>
            {bookingOn ? (
              <div className="mt-9 max-w-lg">
                <ComptoirBooking tenantId={tenant.id} name={name} inline />
              </div>
            ) : (
              <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F2ECDD] transition hover:opacity-90" style={{ background: RED, borderRadius: "2px" }}>
                Nous contacter
              </a>
            )}
          </div>

          {/* terrace photo, brass-framed with a tile plinth */}
          <div className="order-first lg:order-last">
            <div className="relative overflow-hidden" style={{ borderRadius: "3px", border: `1px solid ${BRASS}`, boxShadow: `0 0 0 6px ${PAPER}, 0 0 0 7px ${BRASS}44` }}>
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover" />
              ) : (
                <div className="aspect-[4/5] w-full" style={{ background: `linear-gradient(160deg, ${ZINC}, #1a1a1d)` }} />
              )}
            </div>
            <div className="mt-3 h-2 w-full" style={{ background: TILE, opacity: 0.55 }} aria-hidden />
          </div>
        </div>
      </section>

      {/* L'ARDOISE DU JOUR — the signature dark slate chalkboard panel. */}
      {ardoise.length > 0 && (
        <section className="px-6 py-16 sm:py-24" style={{ background: CREAM }}>
          <div
            className="mx-auto max-w-3xl px-7 py-12 sm:px-12 sm:py-14"
            style={{ background: ZINC, borderRadius: "4px", border: `2px solid ${BRASS}`, boxShadow: `inset 0 0 60px rgba(0,0,0,0.45), 0 24px 60px -28px rgba(0,0,0,0.6)` }}
          >
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.34em]" style={{ color: BRASS }} {...editCopy(content, "home_ardoise_kicker", "L'ardoise du jour")} />
              <h2 style={{ ...serif, color: CREAM }} className="mt-3 text-4xl sm:text-5xl" {...editCopy(content, "home_ardoise_heading", "Le menu")} />
              <div className="mt-4"><Fleuron light /></div>
            </div>
            <ul className="mx-auto mt-9 max-w-xl divide-y text-left" style={{ borderColor: `${CREAM}22` }}>
              {ardoise.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-lg text-[color:#F2ECDD]" style={serif}>{item.name}</p>
                    {item.description && (
                      <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm italic leading-relaxed text-[color:#F2ECDD]/55">{item.description}</p>
                    )}
                  </div>
                  {item.price && (
                    <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: BRASS }}>{item.price}</span>
                  )}
                </li>
              ))}
            </ul>
            {groups.length > 0 && (
              <div className="mt-10 text-center">
                <a href={href("menu")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: CREAM, color: ZINC, borderRadius: "2px" }} {...editCopy(content, "home_ardoise_cta", "Voir toute la carte")} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* LA MAISON — heritage band on bottle green with a brass keyline. */}
      {content.about && (
        <section style={{ background: GREEN }} className="text-[color:#F2ECDD]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:py-28 md:grid-cols-[1fr_0.82fr] md:gap-16">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: BRASS }} {...editCopy(content, "home_maison_kicker", "La maison")} />
              <h2 style={{ ...serif, color: CREAM }} className="mt-4 text-4xl sm:text-5xl" {...editCopy(content, "home_maison_heading", "Une histoire de quartier")} />
              <p data-edit="content.about" className="mt-7 max-w-xl text-[17px] leading-[1.9] text-[color:#F2ECDD]/80">{content.about}</p>
              <a href={href("about")} className="mt-8 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: CREAM, color: GREEN, borderRadius: "2px" }} {...editCopy(content, "home_maison_cta", "Notre histoire")} />
            </div>
            <div className="relative overflow-hidden" style={{ borderRadius: "3px", border: `1px solid ${BRASS}`, boxShadow: `0 0 0 6px ${GREEN}, 0 0 0 7px ${BRASS}55` }}>
              {(gallery[0]?.image_url ?? hero) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={gallery[0]?.image_url ?? hero} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full" style={{ background: TILE }} />
              )}
            </div>
          </div>
        </section>
      )}

      {/* GALLERY STRIP — a slim brass-framed terrace row teasing the gallery. */}
      {gallery.length > 0 && (
        <section style={{ background: PAPER, borderTop: `1px solid ${BRASS}33`, borderBottom: `1px solid ${BRASS}33` }}>
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover" style={{ borderRadius: "2px", border: `1px solid ${BRASS}66` }} />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: RED }} {...editCopy(content, "home_gallery_link", "Toute la galerie →")} />
            </div>
          </div>
        </section>
      )}

      {/* CLOSING CTA — prix-fixe invitation on cream, tile rule. */}
      <section className="px-6 py-20 text-center sm:py-28" style={{ background: CREAM }}>
        <div className="mx-auto max-w-2xl">
          <Fleuron />
          <p className="mt-6 text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: RED }} {...editCopy(content, "home_cta_kicker", "Le prix fixe · midi et soir")} />
          <h2 style={serif} className="mt-4 text-4xl sm:text-5xl" {...editCopy(content, "home_cta_heading", "Passez nous voir au comptoir")} />
          <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.9] text-[color:#2B2B2E]/75" {...editCopy(content, "home_cta_blurb", "Un déjeuner rapide en terrasse ou un dîner qui s'éternise au comptoir : notre table vous attend. Réservez en ligne en un instant, ou écrivez-nous pour organiser une occasion particulière.")} />
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href={book} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F2ECDD] transition hover:opacity-90" style={{ background: RED, borderRadius: "2px" }}>
              {bookingOn ? "Réserver une table" : "Nous contacter"}
            </a>
            <a href={href("contact")} className="inline-flex px-9 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ border: `1px solid ${ZINC}`, color: ZINC, borderRadius: "2px" }} {...editCopy(content, "home_cta_findus", "Nous trouver")} />
          </div>
          <div className="mx-auto mt-12 h-2 max-w-md" style={{ background: TILE, opacity: 0.5 }} aria-hidden />
        </div>
      </section>
    </>,
    false,
  );
}
