import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { GateauHeader } from "./GateauHeader";
import { GateauBooking } from "./GateauBooking";

// Gateau — a couture French PATISSERIE (single maison), MULTI-PAGE: the nav opens
// real routes (La carte / Reserve / Gallery / Maison / Contact) under basePath,
// never scroll anchors. Each page is its own layout; the floating gold-ruled
// header and the soft pistachio footer are shared via shell().
//
// Identity is baked: a refined, symmetrical "jewellery-box" composition on ivory
// — a centred lowercase-italic serif wordmark inside hairline gold framing, a
// pastel-tinted "signature creations" grid (delicate, couture-cake feel), a
// thin-ruled "la carte" menu (clean divider rows, NO dotted leaders, NO stacked
// card panels), scalloped patisserie arches and a great deal of air. Palette:
// soft pistachio, powder rose, gold leaf, ivory, deep cocoa. Display type is the
// graceful serif (Fraunces), kept light, italic and lowercase. This shares no
// resemblance to rustic Crumb or any bold sibling — it reads as pâtisserie de luxe.

const display = { fontFamily: "var(--font-fraunces)" } as const;
const PISTACHIO = "#BCD3B5";
const ROSE = "#E9C3CC";
const GOLD = "#C9A24A";
const IVORY = "#FBF7F1";
const COCOA = "#3B2C28";

// Rotating pastel tints for the signature-creation tiles.
const TILE_TINTS = [ROSE, PISTACHIO, "#F4E3D2"];

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

// A small scalloped/arched motif used to frame headings — a patisserie signature.
function Scallop({ color = GOLD, className = "" }: { color?: string; className?: string }) {
  return (
    <svg width="56" height="14" viewBox="0 0 56 14" fill="none" className={className} aria-hidden>
      <path d="M2 12c4 0 4-8 8-8s4 8 8 8 4-8 8-8 4 8 8 8 4-8 8-8 4 8 8 8" stroke={color} strokeWidth="1.1" strokeLinecap="round" />
    </svg>
  );
}

export default function GateauDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "La carte", href: href("menu") },
    content.about && { label: "Maison", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Reserve", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- shared footer: soft pistachio band, centred & symmetric ----
  const footer = (
    <footer style={{ background: PISTACHIO }} className="text-[color:#3B2C28]">
      <div className="mx-auto max-w-5xl px-6 py-16 text-center sm:px-8 sm:py-20">
        <Scallop className="mx-auto" />
        <a href={href("home")} className="mt-5 inline-block">
          <span data-edit="tenant.business_name" style={display} className="text-3xl font-normal italic lowercase tracking-[0.04em] sm:text-4xl">{name}</span>
        </a>
        {content.tagline && (
          <p data-edit="content.tagline" className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[color:#3B2C28]/70">{content.tagline}</p>
        )}

        <nav className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-3 text-[10px] font-medium uppercase tracking-[0.28em]">
          {nav.map((l) => (
            <a key={l.href} href={l.href} className="transition-colors hover:text-[color:#C9A24A]">{l.label}</a>
          ))}
        </nav>

        <div className="mx-auto mt-10 grid max-w-3xl gap-8 border-t pt-10 text-sm sm:grid-cols-3" style={{ borderColor: `${COCOA}1f` }}>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[color:#3B2C28]/55">La maison</p>
            {content.address && <p data-edit="content.address" className="mt-3 whitespace-pre-line leading-relaxed text-[color:#3B2C28]/80">{content.address}</p>}
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[color:#3B2C28]/55">Heures</p>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-3 space-y-1.5 text-[color:#3B2C28]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#3B2C28]/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-3 text-[color:#3B2C28]/70">Open daily.</p>}
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[color:#3B2C28]/55">Nous écrire</p>
            <div className="mt-3 space-y-1.5 text-[color:#3B2C28]/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition-colors hover:text-[color:#C9A24A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition-colors hover:text-[color:#C9A24A]">{content.email}</a>}
            </div>
            {content.socials && content.socials.length > 0 && (
              <div className="mt-4 flex justify-center gap-4 sm:justify-start">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition-colors hover:text-[color:#C9A24A]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            )}
          </div>
        </div>

        <p className="mt-10 text-[10px] uppercase tracking-[0.24em] text-[color:#3B2C28]/45">© {name} · pâtisserie</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" data-page={page}>
      <GateauHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Ivory sub-page banner — centred, scalloped, clears the fixed header.
  const banner = (kicker: string, title: string, blurb?: string) => (
    <section style={{ background: IVORY }}>
      <div className="mx-auto max-w-3xl px-6 pb-14 pt-32 text-center sm:px-8 sm:pt-40">
        <p className="text-[11px] font-medium uppercase tracking-[0.36em]" style={{ color: GOLD }}>{kicker}</p>
        <h1 style={display} className="mt-3 text-5xl font-normal italic lowercase leading-[1.0] text-[color:#3B2C28] sm:text-6xl">{title}</h1>
        <Scallop className="mx-auto mt-6" />
        {blurb && <p className="mx-auto mt-5 max-w-xl text-[15px] leading-[1.9] text-[color:#3B2C28]/70">{blurb}</p>}
      </div>
    </section>
  );

  // ---------------------------------------------------------------------------
  // LA CARTE — thin-ruled menu: clean divider rows, no dotted leaders, no cards.
  // ---------------------------------------------------------------------------
  if (page === "menu") {
    return shell(
      <>
        {banner("Le menu", "la carte", "Composed each morning, by hand. A small, seasonal selection of our jewel-box pâtisserie.")}
        <section className="px-6 pb-24 sm:px-8" style={{ background: IVORY }}>
          <div className="mx-auto max-w-3xl">
            {groups.length > 0 ? (
              <>
                <div className="space-y-16">
                  {groups.map((section) => (
                    <div key={section.section} className="break-inside-avoid">
                      {section.section && (
                        <div className="text-center">
                          <h2 style={display} className="text-2xl font-normal italic lowercase tracking-[0.04em] text-[color:#3B2C28]">{section.section}</h2>
                          <Scallop className="mx-auto mt-3" color={ROSE} />
                        </div>
                      )}
                      {section.categories.map((catg) => (
                        <div key={catg.category ?? "_"} className="mt-8">
                          {catg.category && <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.3em] text-[color:#3B2C28]/45">{catg.category}</p>}
                          <ul className="divide-y" style={{ borderColor: `${GOLD}33` }}>
                            {catg.items.map((item) => (
                              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                                <div className="min-w-0">
                                  <p data-edit={`item:${item.id}:name`} className="text-lg font-normal text-[color:#3B2C28]" style={display}>{item.name}</p>
                                  {item.description && (
                                    <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm italic leading-relaxed text-[color:#3B2C28]/55">{item.description}</p>
                                  )}
                                </div>
                                {item.price && (
                                  <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-medium tracking-wide" style={{ color: GOLD }}>{item.price}</span>
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
                      <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex rounded-full border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.24em] transition hover:bg-[color:#3B2C28] hover:text-[color:#FBF7F1]" style={{ borderColor: GOLD, color: COCOA }}>
                        {o.label}{o.commission_free ? " · commission-free" : ""}
                      </a>
                    ))}
                  </div>
                )}

                {bookingOn && (
                  <div className="mt-14 text-center">
                    <a href={href("reservations")} className="inline-flex rounded-full px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#FBF7F1] transition hover:opacity-90" style={{ background: COCOA }}>Order a cake</a>
                  </div>
                )}
              </>
            ) : <p className="text-center text-[color:#3B2C28]/50">Our carte is being composed.</p>}
          </div>
        </section>
      </>,
    );
  }

  // ---------------------------------------------------------------------------
  // RESERVE / ORDER
  // ---------------------------------------------------------------------------
  if (page === "reservations") {
    return shell(
      <>
        {banner("Sur commande", "order & reserve", "A celebration cake, a box of pâtisserie or a table in the salon — tell us what you have in mind.")}
        <section className="px-6 pb-24 sm:px-8" style={{ background: IVORY }}>
          <div className="mx-auto max-w-xl">
            <GateauBooking tenantId={tenant.id} name={name} />
          </div>
        </section>
      </>,
    );
  }

  // ---------------------------------------------------------------------------
  // CONTACT
  // ---------------------------------------------------------------------------
  if (page === "contact") {
    return shell(
      <>
        {banner("Bonjour", "find the maison")}
        <section className="px-6 pb-24 sm:px-8" style={{ background: IVORY }}>
          <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <div className="space-y-3 text-[15px] leading-relaxed text-[color:#3B2C28]/80">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg" style={display}>{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition-colors hover:text-[color:#C9A24A]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition-colors hover:text-[color:#C9A24A]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[color:#3B2C28]/80" style={{ borderColor: `${GOLD}40` }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#3B2C28]/50">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-full border px-7 py-3 text-[11px] font-medium uppercase tracking-[0.24em] transition hover:bg-[color:#3B2C28] hover:text-[color:#FBF7F1]" style={{ borderColor: GOLD, color: COCOA }}>Get directions</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Écrivez-nous"
                  contactBlurb="A bespoke cake, a wedding tier or simply a question — leave a note and we will reply with care."
                  contactCta="Send your note"
                  theme={{ card: IVORY, cardBorder: `${GOLD}66`, heading: COCOA, blurb: "#3B2C28a6", label: "#3B2C2899", button: COCOA, buttonText: IVORY, fieldBg: "#ffffff", fieldBorder: "#e6dccb", radius: "0.75rem", font: "var(--font-fraunces)" }}
                />
              </div>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---------------------------------------------------------------------------
  // MAISON / ABOUT
  // ---------------------------------------------------------------------------
  if (page === "about") {
    return shell(
      <>
        {banner("Notre histoire", "the maison")}
        <section className="px-6 pb-24 sm:px-8" style={{ background: IVORY }}>
          <div className="mx-auto max-w-2xl text-center">
            {content.about ? (
              <p data-edit="content.about" style={display} className="text-2xl font-normal italic leading-[1.6] text-[color:#3B2C28] sm:text-[1.7rem]">{content.about}</p>
            ) : <p className="text-[color:#3B2C28]/50">Our story is being written.</p>}
            {content.cuisine_type && (
              <>
                <Scallop className="mx-auto mt-10" color={ROSE} />
                <p data-edit="content.cuisine_type" className="mt-6 text-[15px] leading-[1.9] text-[color:#3B2C28]/70">{content.cuisine_type}</p>
              </>
            )}
            {groups.length > 0 && (
              <a href={href("menu")} className="mt-10 inline-flex rounded-full px-9 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#FBF7F1] transition hover:opacity-90" style={{ background: COCOA }}>View la carte</a>
            )}
          </div>
        </section>
      </>,
    );
  }

  // ---------------------------------------------------------------------------
  // GALLERY — arched, jewel-box tiles.
  // ---------------------------------------------------------------------------
  if (page === "gallery") {
    return shell(
      <>
        {banner("La vitrine", "gallery")}
        {gallery.length > 0 ? (
          <section className="px-3 pb-20 sm:px-6" style={{ background: IVORY }}>
            <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                <div key={g.id} className="overflow-hidden rounded-t-[999px] border" style={{ borderColor: `${GOLD}40` }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img loading="lazy" decoding="async" src={g.image_url} alt={g.caption ?? ""} className="aspect-[3/4] w-full object-cover transition duration-500 hover:scale-105" />
                </div>
              ))}
            </div>
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#3B2C28]/50" style={{ background: IVORY }}>Photographs coming soon.</p>}
      </>,
    );
  }

  // ---------------------------------------------------------------------------
  // HOME — jewellery-box composition on ivory.
  // ---------------------------------------------------------------------------
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 3);

  return shell(
    <>
      {/* HERO — ivory field, centred italic wordmark inside a fine gold frame,
          a framed hero photo within a scalloped arch, then the inline order row. */}
      <section className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-8 sm:pt-40" style={{ background: IVORY }}>
        {/* faint pastel wash, top corners */}
        <div className="pointer-events-none absolute -left-32 -top-32 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: ROSE }} aria-hidden />
        <div className="pointer-events-none absolute -right-32 top-10 h-72 w-72 rounded-full opacity-40 blur-3xl" style={{ background: PISTACHIO }} aria-hidden />

        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-medium uppercase tracking-[0.4em]" style={{ color: GOLD }}>Pâtisserie · de luxe</p>
          <div className="mx-auto mt-5 inline-flex flex-col items-center">
            <span className="h-px w-16" style={{ background: GOLD }} aria-hidden />
            <h1 data-edit="tenant.business_name" style={display} className="my-3 text-6xl font-normal italic lowercase leading-[0.95] tracking-[0.02em] text-[color:#3B2C28] sm:text-8xl">{name}</h1>
            <span className="h-px w-16" style={{ background: GOLD }} aria-hidden />
          </div>
          {content.tagline && (
            <p data-edit="content.tagline" className="mx-auto mt-6 max-w-xl text-[15px] leading-[1.9] text-[color:#3B2C28]/70 sm:text-base">{content.tagline}</p>
          )}
        </div>

        {/* arched hero photo */}
        <div className="relative mx-auto mt-12 max-w-3xl">
          <div className="overflow-hidden rounded-t-[999px] border p-2" style={{ borderColor: `${GOLD}55`, background: "#fff" }}>
            <div className="overflow-hidden rounded-t-[999px]">
              {hero ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img data-edit-image="hero" src={hero} alt="" className="aspect-[4/5] w-full object-cover sm:aspect-[16/11]" />
              ) : (
                <div className="aspect-[16/11] w-full" style={{ background: `linear-gradient(160deg, ${ROSE}, ${PISTACHIO})` }} />
              )}
            </div>
          </div>
          <Scallop className="mx-auto mt-6" />
        </div>

        {/* inline order/reserve row, or a simple CTA when booking is off */}
        <div className="relative mx-auto mt-10 max-w-3xl">
          {bookingOn ? (
            <GateauBooking tenantId={tenant.id} name={name} inline />
          ) : (
            <div className="text-center">
              <a href={book} className="inline-flex rounded-full px-10 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#FBF7F1] transition hover:opacity-90" style={{ background: COCOA }}>Get in touch</a>
            </div>
          )}
        </div>
      </section>

      {/* SIGNATURE CREATIONS — pastel-tinted jewel-box grid */}
      {(featured.length > 0 || gallery.length > 0) && (
        <section style={{ background: "#fff" }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8 sm:py-28">
            <div className="text-center">
              <p className="text-[11px] font-medium uppercase tracking-[0.36em]" style={{ color: GOLD }}>Nos créations</p>
              <h2 style={display} className="mt-3 text-4xl font-normal italic lowercase text-[color:#3B2C28] sm:text-5xl">signature creations</h2>
              <Scallop className="mx-auto mt-5" color={ROSE} />
            </div>
            <div className="mt-14 grid gap-7 sm:grid-cols-3">
              {featured.map((item, i) => {
                const tint = TILE_TINTS[i % TILE_TINTS.length];
                const photo = gallery[i]?.image_url;
                return (
                  <a key={item.id} href={href("menu")} className="group flex flex-col text-center">
                    <div className="overflow-hidden rounded-t-[999px] border p-2 transition group-hover:-translate-y-1" style={{ borderColor: `${GOLD}45`, background: tint }}>
                      <div className="overflow-hidden rounded-t-[999px]">
                        {photo ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img loading="lazy" decoding="async" src={photo} alt="" className="aspect-[3/4] w-full object-cover" />
                        ) : (
                          <div className="aspect-[3/4] w-full" style={{ background: `linear-gradient(160deg, #ffffff80, ${tint})` }} />
                        )}
                      </div>
                    </div>
                    <h3 data-edit={`item:${item.id}:name`} style={display} className="mt-5 text-xl font-normal italic lowercase text-[color:#3B2C28]">{item.name}</h3>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mx-auto mt-1.5 line-clamp-2 max-w-[15rem] text-sm leading-relaxed text-[color:#3B2C28]/55">{item.description}</p>}
                    {item.price && <span data-edit={`item:${item.id}:price`} className="mt-2 text-sm font-medium" style={{ color: GOLD }}>{item.price}</span>}
                  </a>
                );
              })}
            </div>
            {groups.length > 0 && (
              <div className="mt-14 text-center">
                <a href={href("menu")} className="inline-flex rounded-full border px-9 py-3.5 text-[11px] font-medium uppercase tracking-[0.24em] transition hover:bg-[color:#3B2C28] hover:text-[color:#FBF7F1]" style={{ borderColor: GOLD, color: COCOA }}>See la carte</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* MAISON / ABOUT — centred statement on a rose band, fine framing */}
      {content.about && (
        <section style={{ background: ROSE }}>
          <div className="mx-auto max-w-3xl px-6 py-20 text-center sm:py-28">
            <p className="text-[11px] font-medium uppercase tracking-[0.36em] text-[color:#3B2C28]/60">Notre histoire</p>
            <p data-edit="content.about" style={display} className="mt-6 text-2xl font-normal italic leading-[1.55] text-[color:#3B2C28] sm:text-[2rem]">{content.about}</p>
            <a href={href("about")} className="mt-9 inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#3B2C28] transition hover:gap-3">
              The maison <span aria-hidden>→</span>
            </a>
          </div>
        </section>
      )}

      {/* COMMANDE CTA — pistachio-bordered ivory panel */}
      <section style={{ background: IVORY }}>
        <div className="mx-auto max-w-4xl px-6 py-20 sm:px-8 sm:py-24">
          <div className="rounded-[2rem] border px-8 py-14 text-center" style={{ borderColor: `${GOLD}55`, background: "#fff" }}>
            <Scallop className="mx-auto" color={PISTACHIO} />
            <h2 style={display} className="mt-5 text-4xl font-normal italic lowercase text-[color:#3B2C28] sm:text-5xl">a cake to remember</h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-[1.9] text-[color:#3B2C28]/65">Bespoke gâteaux for weddings, fêtes and the quietest of celebrations — composed entirely by hand.</p>
            <a href={book} className="mt-8 inline-flex rounded-full px-10 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#FBF7F1] transition hover:opacity-90" style={{ background: COCOA }}>{bookingOn ? "Order a cake" : "Get in touch"}</a>
          </div>
        </div>
      </section>

      {/* QUICK INFO — pistachio band: hours / find us / reserve */}
      <section style={{ background: PISTACHIO }} className="text-[color:#3B2C28]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-3">
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[color:#3B2C28]/55">Heures</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm text-[color:#3B2C28]/80">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#3B2C28]/50">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#3B2C28]/70">Open daily.</p>}
          </div>
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[color:#3B2C28]/55">La maison</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed text-[color:#3B2C28]/80">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm text-[color:#3B2C28]/80">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition-colors hover:text-[color:#C9A24A]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition-colors hover:text-[color:#C9A24A]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-flex rounded-full border px-6 py-2.5 text-[10px] font-medium uppercase tracking-[0.24em] transition hover:bg-[color:#3B2C28] hover:text-[color:#FBF7F1]" style={{ borderColor: COCOA }}>Get directions</a>
            )}
          </div>
          <div>
            <h3 className="text-[10px] font-medium uppercase tracking-[0.3em] text-[color:#3B2C28]/55">{bookingOn ? "Sur commande" : "Nous écrire"}</h3>
            <p className="mt-5 text-sm text-[color:#3B2C28]/80">{bookingOn ? "A cake, a box of pâtisserie or a table — reserve in a moment." : "We would be delighted to hear from you."}</p>
            <a href={book} className="mt-5 inline-flex rounded-full px-7 py-3 text-[10px] font-medium uppercase tracking-[0.24em] text-[color:#FBF7F1] transition hover:opacity-90" style={{ background: COCOA }}>{bookingOn ? "Order & reserve" : "Contact us"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
