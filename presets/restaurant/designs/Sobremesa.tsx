import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { SobremesaHeader } from "./SobremesaHeader";
import { SobremesaBooking } from "./SobremesaBooking";

// Sobremesa — a warm, sultry Spanish tapas & sherry bar (single venue),
// MULTI-PAGE: the nav opens real routes (Menu / Reservations / Gallery / About /
// Contact) under basePath, never scroll anchors. Each page is its own layout;
// the sticky oxblood header and ink footer are shared. The palette is baked from
// a deeper, rustic-refined Spanish register — rioja oxblood, burnt ochre, olive,
// terracotta clay, warm parchment, ink. The structural signature: an arched,
// azulejo-tiled hero; a "la sobremesa" lingering-table story; a two-column tapas
// list grouped para picar / raciones; hand-painted azulejo tile accents and warm
// earthy blocks. Display type is Fraunces with a Spanish soul.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const RIOJA = "#6E1F26"; // deep oxblood / rioja
const OCHRE = "#C77B33"; // burnt ochre
const OLIVE = "#6E6A3B"; // olive
const CLAY = "#B6543A"; // terracotta clay
const PARCHMENT = "#F2E7D2"; // warm parchment
const INK = "#241813"; // ink

// Azulejo tile motif — a tasteful, hand-painted-feel four-pointed tile lattice in
// ochre/olive over parchment, used as a section background accent.
const AZULEJO = {
  backgroundColor: PARCHMENT,
  backgroundImage: `
    radial-gradient(circle at 0 0, rgba(110,31,38,0.16) 0 6px, transparent 6px),
    radial-gradient(circle at 36px 36px, rgba(110,31,38,0.16) 0 6px, transparent 6px),
    repeating-linear-gradient(45deg, rgba(199,123,51,0.14) 0 2px, transparent 2px 18px),
    repeating-linear-gradient(-45deg, rgba(110,106,59,0.14) 0 2px, transparent 2px 18px)`,
  backgroundSize: "36px 36px, 36px 36px, 36px 36px, 36px 36px",
} as const;

// Faint azulejo wash for dark oxblood bands.
const AZULEJO_DARK = {
  backgroundColor: RIOJA,
  backgroundImage: `
    repeating-linear-gradient(45deg, rgba(242,231,210,0.05) 0 2px, transparent 2px 20px),
    repeating-linear-gradient(-45deg, rgba(199,123,51,0.07) 0 2px, transparent 2px 20px)`,
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

// A small four-pointed azulejo star ornament used to flank kickers.
function TileStar({ color = OCHRE }: { color?: string }) {
  return <span aria-hidden className="inline-block h-2.5 w-2.5 rotate-45" style={{ background: color, clipPath: "polygon(50% 0,62% 38%,100% 50%,62% 62%,50% 100%,38% 62%,0 50%,38% 38%)" }} />;
}

export default function SobremesaDesign({ site, page = "home", basePath = "" }: PresetProps) {
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
    groups.length > 0 && { label: "Carta", href: href("menu") },
    content.about && { label: "Nosotros", href: href("about") },
    gallery.length > 0 && { label: "Galería", href: href("gallery") },
    bookingOn && { label: "Reservas", href: href("reservations") },
    { label: "Contacto", href: href("contact") },
    ...(content.ordering_links ?? []).map((o) => ({ label: o.label, href: o.url })),
  ].filter(Boolean) as { label: string; href: string }[];

  // Kicker label flanked by azulejo stars.
  const kicker = (text: string, color = RIOJA) => (
    <p className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color }}>
      <TileStar color={color} />
      <span>{text}</span>
    </p>
  );

  // ---- shared footer (ink, with hours / find us / lingering CTA) ----
  const footer = (
    <footer style={{ background: INK }} className="text-[color:#F2E7D2]/85">
      {/* azulejo rule */}
      <div
        className="h-2 w-full"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, ${RIOJA} 0 14px, ${OCHRE} 14px 18px, ${OLIVE} 18px 22px, ${CLAY} 22px 26px)`,
          opacity: 0.85,
        }}
      />
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 sm:py-20 md:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_1.2fr]">
        <div>
          <a href={href("home")}>
            <span data-edit="tenant.business_name" style={{ ...serif, color: PARCHMENT }} className="text-3xl font-medium">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-[color:#F2E7D2]/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <>
              <h4 className="mt-8 text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: OCHRE }}>Síguenos</h4>
              <div className="mt-4 flex gap-4 text-[color:#F2E7D2]">
                {content.socials.map((s) => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[color:#C77B33]"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
                ))}
              </div>
            </>
          )}
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: OCHRE }}>Explorar</h4>
          <ul className="mt-5 space-y-3 text-sm text-[color:#F2E7D2]/70">
            {([
              groups.length > 0 && { label: "Carta", href: href("menu") },
              content.about && { label: "Nosotros", href: href("about") },
              gallery.length > 0 && { label: "Galería", href: href("gallery") },
              bookingOn && { label: "Reservas", href: href("reservations") },
              { label: "Contacto", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-[color:#C77B33]">{l.label}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: OCHRE }}>Horario</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-[color:#F2E7D2]/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#F2E7D2]/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-[color:#F2E7D2]/55">Abierto a diario.</p>}
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-[color:#F2E7D2]/70">{content.address}</p>}
          <div className="mt-3 space-y-1.5 text-sm text-[color:#F2E7D2]/70">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#C77B33]">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#C77B33]">{content.email}</a>}
          </div>
        </div>

        {/* lingering-table CTA panel */}
        <div className="px-7 py-9" style={{ background: RIOJA, color: PARCHMENT, boxShadow: `inset 0 -5px 0 ${OCHRE}` }}>
          <h4 style={serif} className="text-2xl font-medium leading-tight">Quédese a la sobremesa</h4>
          <p className="mt-2 text-sm leading-relaxed text-[color:#F2E7D2]/85">A table, a glass of sherry and an afternoon with nowhere to be. Reserve yours.</p>
          <a href={book} className="mt-6 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:#241813] transition hover:opacity-90" style={{ background: OCHRE }}>{bookingOn ? "Reservar mesa" : "Contáctenos"}</a>
        </div>
      </div>
      <p className="border-t border-[color:#F2E7D2]/10 px-6 py-6 text-center text-xs text-[color:#F2E7D2]/45 sm:px-8">© {name}. Todos los derechos reservados.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen font-body" >
      <SobremesaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Oxblood page banner (azulejo wash) that clears the fixed header on sub-pages.
  const banner = (kickerText: string, title: string) => (
    <section style={AZULEJO_DARK} className="text-[color:#F2E7D2]">
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-32 sm:px-8 sm:pb-16 sm:pt-40">
        {kicker(kickerText, OCHRE)}
        <h1 style={serif} className="mt-4 text-5xl font-medium leading-[0.98] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- MENU ---- two-column tapas list grouped para picar / raciones.
  if (page === "menu") {
    return shell(
      <>
        {banner("La carta", "Para compartir")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={AZULEJO}>
          <div className="mx-auto max-w-5xl">
          {groups.length > 0 ? (
            <>
              <div className="grid items-start gap-x-16 gap-y-14 md:grid-cols-2">
                {groups.map((section) => (
                  <div key={section.section} className="break-inside-avoid">
                    {section.section && (
                      <div className="mb-6 flex items-center gap-3">
                        <span aria-hidden className="h-px w-7" style={{ background: OCHRE }} />
                        <h3 style={{ ...serif, color: RIOJA }} className="text-2xl font-medium sm:text-3xl">{section.section}</h3>
                      </div>
                    )}
                    {section.categories.map((catg) => (
                      <div key={catg.category ?? "_"} className="mb-7">
                        {catg.category && <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: OLIVE }}>{catg.category}</p>}
                        <ul className="divide-y" style={{ borderColor: "rgba(36,24,19,0.18)" }}>
                          {catg.items.map((item) => (
                            <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                              <div className="min-w-0">
                                <p data-edit={`item:${item.id}:name`} className="text-[17px] font-medium text-[color:#241813]" style={serif}>{item.name}</p>
                                {item.description && (
                                  <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#5b4a3f]">{item.description}</p>
                                )}
                              </div>
                              {item.price && (
                                <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: RIOJA }}>{item.price}</span>
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
                    <a key={o.url} href={o.url} target="_blank" rel="noreferrer" className="inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F2E7D2] transition hover:opacity-90" style={{ background: RIOJA }}>{o.label}</a>
                  ))}
                </div>
              )}
            </>
          ) : <p className="text-[color:#5b4a3f]">Nuestra carta llegará pronto.</p>}
          {bookingOn && (
            <div className="mt-16 text-center">
              <a href={book} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#241813] transition hover:opacity-90" style={{ background: OCHRE }}>Reservar mesa</a>
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
        {banner("Reservas", "Su mesa le espera")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={AZULEJO}>
          <div className="mx-auto max-w-xl">
            <p className="mb-9 text-center text-[17px] leading-[1.85] text-[color:#5b4a3f]">
              Elija el día y la hora y le guardaremos un sitio. Para grupos de ocho o más, o un evento, llámenos y lo organizamos con mucho gusto.
            </p>
            <SobremesaBooking tenantId={tenant.id} name={name} />
            {content.phone && (
              <p className="mt-7 text-center text-sm text-[color:#5b4a3f]">
                ¿Prefiere llamar? <a data-edit="content.phone" href={`tel:${content.phone}`} className="font-semibold underline" style={{ color: RIOJA }}>{content.phone}</a>
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
        {banner("Contacto", "Venga a vernos")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={AZULEJO}>
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:gap-20">
            <div>
              <h2 style={{ ...serif, color: RIOJA }} className="text-2xl font-medium">Dónde encontrarnos</h2>
              <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-[color:#5b4a3f]">
                {content.address && <p data-edit="content.address" className="whitespace-pre-line text-lg font-medium text-[color:#241813]">{content.address}</p>}
                {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#6E1F26]">{content.phone}</a>}
                {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#6E1F26]">{content.email}</a>}
              </div>
              {content.hours && content.hours.length > 0 && (
                <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm text-[color:#5b4a3f]" style={{ borderColor: "rgba(36,24,19,0.2)" }}>
                  {content.hours.map((h, i) => (
                    <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#8a7665]">{h.open}</span></li>
                  ))}
                </ul>
              )}
              {content.map_url && (
                <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-8 inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F2E7D2] transition hover:opacity-90" style={{ background: RIOJA }}>Cómo llegar</a>
              )}
            </div>
            {contactOn && (
              <div>
                <SiteContactForms
                  tenantId={tenant.id}
                  booking={false}
                  contact
                  contactTitle="Escríbanos"
                  contactBlurb="¿Una celebración, un grupo grande o cualquier pregunta? Déjenos una nota y le responderemos enseguida."
                  contactCta="Enviar"
                  theme={{ card: PARCHMENT, cardBorder: RIOJA, heading: RIOJA, blurb: "#5b4a3f", label: OLIVE, fieldBorder: "rgba(36,24,19,0.28)", fieldText: INK, button: RIOJA, buttonText: PARCHMENT, radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Nosotros", "La sobremesa")}
        <section className="px-6 py-16 sm:px-8 sm:py-24" style={AZULEJO}>
          <div className="mx-auto max-w-3xl">
            <p className="text-sm italic leading-relaxed text-[color:#5b4a3f]">
              <span className="font-semibold not-italic" style={{ color: RIOJA }}>sobremesa</span> — the time spent lingering at the table after a meal, in no hurry, talking and pouring another glass.
            </p>
            {content.about ? <p data-edit="content.about" className="mt-8 text-[19px] leading-[1.95] text-[color:#3b2e26]">{content.about}</p> : <p className="mt-8 text-[color:#5b4a3f]">Nuestra historia llegará pronto.</p>}
            {content.cuisine_type && (
              <>
                <span className="mt-12 block h-px w-10" style={{ background: OCHRE }} />
                <h3 style={{ ...serif, color: RIOJA }} className="mt-8 text-3xl font-medium">De nuestra cocina</h3>
                <p data-edit="content.cuisine_type" className="mt-4 text-[17px] leading-[1.85] text-[color:#3b2e26]">{content.cuisine_type}</p>
              </>
            )}
            {bookingOn && (
              <div className="mt-12">
                <a href={book} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#241813] transition hover:opacity-90" style={{ background: OCHRE }}>Reservar mesa</a>
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
        {banner("Galería", "Un vistazo")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-3" style={{ background: INK }}>
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="px-6 py-20 text-center text-[color:#5b4a3f]" style={AZULEJO}>Fotos próximamente.</p>}
      </>,
    );
  }

  // ---- HOME ----
  const featured = groups.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 5);
  return shell(
    <>
      {/* HERO: arched, azulejo-framed window onto warm imagery, oxblood ground */}
      <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden" style={{ background: RIOJA }}>
        {/* faint azulejo wash on the oxblood ground */}
        <div aria-hidden className="absolute inset-0" style={AZULEJO_DARK} />
        {/* the arched window */}
        <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center px-6 pb-12 pt-28 sm:px-8 sm:pt-32">
          <div
            className="relative w-full flex-1 overflow-hidden"
            style={{ borderRadius: "min(46vw, 360px) min(46vw, 360px) 0 0", border: `3px solid ${OCHRE}`, boxShadow: `0 40px 120px -50px ${INK}` }}
          >
            {hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${CLAY}, ${RIOJA} 60%, ${INK})` }} />
            )}
            <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(to top, rgba(36,24,19,0.7), rgba(36,24,19,0.1) 55%, rgba(36,24,19,0.25))" }} />
            <div className="absolute inset-x-0 bottom-0 px-6 pb-9 text-center sm:px-10 sm:pb-12">
              {kicker("Tapas · Vinos · Jerez", OCHRE)}
              {content.tagline ? (
                <h1 data-edit="content.tagline" style={serif} className="mx-auto mt-3 max-w-3xl text-4xl font-medium leading-[1.02] text-[color:#F2E7D2] [text-shadow:0_2px_26px_rgba(0,0,0,0.6)] sm:text-6xl">{content.tagline}</h1>
              ) : (
                <h1 style={serif} className="mx-auto mt-3 max-w-3xl text-4xl font-medium leading-[1.02] text-[color:#F2E7D2] [text-shadow:0_2px_26px_rgba(0,0,0,0.6)] sm:text-6xl">{name}</h1>
              )}
              <p className="mx-auto mt-4 max-w-md text-[15px] text-[color:#F2E7D2]/85 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)]">Long, lazy lunches and small plates worth lingering over.</p>
            </div>
          </div>
          {/* inline booking row under the arch */}
          <div className="mt-7 w-full max-w-3xl">
            {bookingOn ? (
              <SobremesaBooking tenantId={tenant.id} name={name} inline />
            ) : (
              <div className="text-center">
                <a href={book} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#241813] transition hover:opacity-90" style={{ background: OCHRE }}>Contáctenos</a>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* LA SOBREMESA — lingering-table story on parchment, azulejo accent */}
      <section style={{ background: PARCHMENT }} className="relative overflow-hidden">
        <div aria-hidden className="absolute -right-16 -top-16 h-56 w-56 rotate-12 opacity-50" style={AZULEJO} />
        <div className="relative mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
          {kicker("La sobremesa")}
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-16">
            <h2 style={{ ...serif, color: RIOJA }} className="text-5xl font-medium leading-[0.98] sm:text-6xl">No hay prisa.<br />Quédese un rato más.</h2>
            {content.about ? (
              <p data-edit="content.about" className="text-[17px] leading-[1.85] text-[color:#3b2e26]">{content.about}</p>
            ) : (
              <p className="text-[17px] leading-[1.85] text-[color:#3b2e26]">A warm room, a bottle of something honest, and small plates that keep arriving. The Spanish call the hour after lunch the sobremesa — and here, it is the whole point.</p>
            )}
          </div>
          {content.about && (
            <a href={href("about")} className="mt-9 inline-flex border-2 px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] transition hover:bg-[color:#6E1F26] hover:text-[color:#F2E7D2]" style={{ borderColor: RIOJA, color: RIOJA }}>Nuestra historia</a>
          )}
        </div>
      </section>

      {/* PARA PICAR — featured small plates on an olive earthy block */}
      {featured.length > 0 && (
        <section style={{ background: OLIVE }} className="text-[color:#F2E7D2]">
          <div className="mx-auto max-w-5xl px-6 py-20 sm:px-8 sm:py-28">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                {kicker("Para picar", OCHRE)}
                <h2 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">Pequeños placeres</h2>
              </div>
              {groups.length > 0 && <a href={href("menu")} className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:#F2E7D2]/85 hover:text-[color:#F2E7D2]">Ver la carta entera →</a>}
            </div>
            <ul className="mt-10 divide-y" style={{ borderColor: "rgba(242,231,210,0.22)" }}>
              {featured.map((item) => (
                <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${item.id}:name`} className="text-[18px] font-medium text-[color:#F2E7D2]" style={serif}>{item.name}</p>
                    {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed text-[color:#F2E7D2]/70">{item.description}</p>}
                  </div>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-semibold" style={{ color: OCHRE }}>{item.price}</span>}
                </li>
              ))}
            </ul>
            {groups.length > 0 && (
              <div className="mt-12">
                <a href={href("menu")} className="inline-flex px-9 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#241813] transition hover:opacity-90" style={{ background: OCHRE }}>Ver la carta</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* azulejo gallery teaser strip */}
      {gallery.length > 0 && (
        <section style={{ background: INK }}>
          <div className="grid grid-cols-2 gap-1.5 p-1.5 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* RESERVE band — oxblood azulejo wash with arch motif */}
      <section style={AZULEJO_DARK} className="relative overflow-hidden text-[color:#F2E7D2]">
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 opacity-30" style={{ borderRadius: "9999px 9999px 0 0", border: `2px solid ${OCHRE}` }} />
        <div className="relative mx-auto max-w-2xl px-6 py-24 text-center">
          {kicker("Reservas", OCHRE)}
          <h2 style={serif} className="mx-auto mt-5 max-w-xl text-4xl font-medium leading-[1.05] sm:text-5xl">Una mesa, una copa, una tarde entera</h2>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[color:#F2E7D2]/80">Reserve su mesa y déjese llevar — del aperitivo a la sobremesa, sin mirar el reloj.</p>
          <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#241813] transition hover:opacity-90" style={{ background: OCHRE }}>{bookingOn ? "Reservar mesa" : "Contáctenos"}</a>
        </div>
      </section>

      {/* quick info band — parchment, hours / find us / reserve */}
      <section style={{ background: PARCHMENT }} className="text-[color:#3b2e26]">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-8 md:grid-cols-3">
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: RIOJA }}>Horario</h3>
            {content.hours && content.hours.length > 0 ? (
              <ul className="mt-5 space-y-2 text-sm">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-[color:#8a7665]">{h.open}</span></li>
                ))}
              </ul>
            ) : <p className="mt-5 text-sm text-[color:#8a7665]">Abierto a diario.</p>}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: RIOJA }}>Dónde estamos</h3>
            {content.address && <p data-edit="content.address" className="mt-5 whitespace-pre-line text-sm leading-relaxed">{content.address}</p>}
            <div className="mt-3 space-y-1.5 text-sm">
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-[color:#6E1F26]">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-[color:#6E1F26]">{content.email}</a>}
            </div>
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-4 inline-block text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: RIOJA }}>Cómo llegar →</a>
            )}
          </div>
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: RIOJA }}>Reservas</h3>
            <p className="mt-5 text-sm text-[color:#5b4a3f]">Su mesa le espera. Reserve en un momento.</p>
            <a href={book} className="mt-5 inline-flex px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:#F2E7D2] transition hover:opacity-90" style={{ background: RIOJA }}>{bookingOn ? "Reservar mesa" : "Contáctenos"}</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
