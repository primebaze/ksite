import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { PetHeader, type PetHeaderTheme, type PetLink } from "../PetChrome";

// Fetch — a modern, product-led pet shop / retail brand. Crisp and confident:
// near-white page, charcoal ink, a fresh leaf-green accent and a soft butter
// support. Modern sans, a product-grid teaser on the home page and a clean
// thin-divider price list for the full catalogue. MULTI-PAGE with real routes.
// Best suited to a pet shop / retailer.

const INK = "#1d2421"; // near-black charcoal
const GREEN = "#2f9e6b"; // fresh leaf green
const BUTTER = "#f4c95d"; // warm butter accent
const PAGE = "#fbfbf8"; // near-white page
const CARD = "#ffffff";
const HAIR = "#1d242114"; // faint ink hairline
const BODY = "#56605b"; // muted body
const TINT = "#f1f5f0"; // green-tinted panel

const display = { fontFamily: "var(--font-space)" } as const;

function Paw({ className, color = GREEN }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill={color} aria-hidden>
      <ellipse cx="6.5" cy="11" rx="2" ry="2.6" />
      <ellipse cx="11" cy="8.5" rx="2" ry="2.8" />
      <ellipse cx="16" cy="9" rx="2" ry="2.7" />
      <ellipse cx="19" cy="13" rx="1.8" ry="2.3" />
      <path d="M12.4 13c2.6 0 4.6 1.7 4.6 3.9 0 1.7-1.4 2.6-3.2 2.6-1 0-1.6-.3-2.4-.3s-1.4.3-2.4.3c-1.8 0-3.2-.9-3.2-2.6C5.8 14.7 7.8 13 10.4 13z" />
    </svg>
  );
}

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Kicker({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] ${center ? "" : ""}`} style={{ background: `${GREEN}16`, color: GREEN }}>
      <Paw className="h-3.5 w-3.5" />{children}
    </p>
  );
}

export default function Fetch({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const heroVideo = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const shopHref = groups.length > 0 ? href("services") : href("contact");
  const book = bookingOn ? href("contact") : content.booking_url || href("contact");

  const nav: PetLink[] = [
    groups.length > 0 && { label: "Shop", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as PetLink[];

  const headerTheme: PetHeaderTheme = {
    bar: PAGE,
    border: HAIR,
    brand: INK,
    link: INK,
    ctaBg: GREEN,
    ctaText: "#ffffff",
    heroDark: false,
    brandFont: "var(--font-space)",
    radius: "0.7rem",
    eyebrow: "Pet Shop",
  };

  const cta = { label: groups.length > 0 ? "Shop now" : "Visit us", href: shopHref };

  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2">
            <Paw className="h-6 w-6" color={BUTTER} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-bold text-white">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">{content.tagline}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-5 flex gap-2.5">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-xl text-white/80 transition hover:text-white" style={{ border: "1px solid rgba(255,255,255,0.22)" }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: BUTTER }}>Shop</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {nav.map((l) => <li key={l.href}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>)}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: BUTTER }}>Visit</h4>
          <div className="mt-4 space-y-2.5 text-sm text-white/75">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em]" style={{ color: BUTTER }}>Opening Hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-4 space-y-2 text-sm text-white/75">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-4"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-4 text-sm text-white/55">Open daily.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 border-t px-8 py-6 text-xs text-white/45 sm:flex-row" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <a href={href("contact")} className="transition hover:text-white">Stockists &amp; enquiries</a>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: PAGE }} className="min-h-screen font-body">
      <PetHeader name={name} cta={cta} links={nav} home={href("home")} solid={solid} theme={headerTheme} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string, sub?: string) => (
    <section style={{ background: CARD, borderBottom: `1px solid ${HAIR}` }}>
      <div className="mx-auto max-w-4xl px-8 pb-16 pt-32 text-center sm:pt-36">
        <div className="flex justify-center"><Kicker center>{kicker}</Kicker></div>
        <h1 style={{ ...display, color: INK }} className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">{title}</h1>
        {sub && <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed" style={{ color: BODY }}>{sub}</p>}
      </div>
    </section>
  );

  // ---- SHOP (services) — clean thin-divider price list ----
  if (page === "services") {
    return shell(
      <>
        {banner("The Shop", "Everything they need", "Food, treats, toys and essentials — hand-picked for happy, healthy pets.")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {groups.length > 0 ? (
            <div className="space-y-14">
              {groups.map((section, gi) => (
                <div key={section.section || gi}>
                  {section.section && <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-tight">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-5">
                      {catg.category && <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em]" style={{ color: GREEN }}>{catg.category}</p>}
                      <ul className="divide-y" style={{ borderColor: HAIR }}>
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                            <div className="min-w-0">
                              <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ color: INK }}>{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: GREEN }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          ) : <p className="text-center" style={{ color: BODY }}>Our range is coming soon.</p>}
          <div className="mt-14 text-center">
            <a href={href("contact")} className="inline-flex px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: GREEN, borderRadius: "0.7rem" }}>Reserve or enquire</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our Story", "Pet people, through and through")}
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p> : <p style={{ color: BODY }}>Our story is coming soon.</p>}
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[{ t: "Carefully curated", d: "Brands we'd feed our own." }, { t: "Honest advice", d: "Real help, no upselling." }, { t: "Locally loved", d: "Proudly part of the neighbourhood." }].map((b) => (
              <div key={b.t} className="rounded-2xl p-6" style={{ background: TINT }}>
                <Paw className="h-5 w-5" />
                <p className="mt-3 text-base font-bold" style={{ color: INK }}>{b.t}</p>
                <p className="mt-1 text-sm" style={{ color: BODY }}>{b.d}</p>
              </div>
            ))}
          </div>
          <div className="mt-12">
            <a href={shopHref} className="inline-flex px-8 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ background: GREEN, borderRadius: "0.7rem" }}>{cta.label}</a>
          </div>
        </section>
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In Store", "A look inside")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-6xl px-3 py-12 sm:px-6">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center" style={{ color: BODY }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Get in Touch", "Visit or message us", "Pop in to browse, or send us a message to reserve a product or ask anything.")}
        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: INK }} className="text-2xl font-bold tracking-tight">Find the shop</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: BODY }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block font-semibold transition hover:opacity-70" style={{ color: GREEN }}>{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block font-semibold transition hover:opacity-70" style={{ color: GREEN }}>{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: HAIR, color: BODY }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} style={{ color: GREEN }}>{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-sm font-bold transition hover:opacity-90" style={{ background: BUTTER, color: INK, borderRadius: "0.7rem" }}>Get directions</a>
            )}
          </div>
          <div>
            <SiteContactForms
              tenantId={tenant.id}
              booking={bookingOn}
              contact={contactOn}
              bookingTitle="Book an appointment"
              bookingBlurb="Reserve a product or book a service slot — we'll confirm shortly."
              bookingCta="Send request"
              theme={{ card: CARD, cardBorder: HAIR, heading: INK, blurb: BODY, label: GREEN, fieldBg: PAGE, fieldBorder: HAIR, fieldText: INK, button: GREEN, buttonText: "#ffffff", radius: "0.85rem", font: "var(--font-space)" }}
            />
          </div>
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredItems = groups.flatMap((s) =>
    s.categories.flatMap((c) => c.items.map((item) => ({ item, label: c.category ?? s.section }))),
  );
  const teaser = featuredItems.slice(0, 6);

  return shell(
    <>
      {/* hero — split: bold copy + product image, butter band behind */}
      <section className="relative overflow-hidden" style={{ background: CARD }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 pb-16 pt-32 sm:px-8 sm:pt-36 lg:grid-cols-2 lg:gap-14 lg:pb-24">
          <div>
            <Kicker>The local pet shop</Kicker>
            <h1 style={{ ...display, color: INK }} className="mt-5 text-5xl font-bold leading-[0.98] tracking-tight sm:text-7xl">
              <span data-edit="tenant.business_name">{name}</span>
            </h1>
            {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-md text-[17px] leading-relaxed" style={{ color: BODY }}>{content.tagline}</p>}
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={shopHref} className="inline-flex px-8 py-4 text-sm font-bold text-white shadow-lg transition hover:opacity-90" style={{ background: GREEN, borderRadius: "0.7rem" }}>{cta.label}</a>
              <a href={href("contact")} className="inline-flex px-8 py-4 text-sm font-bold transition hover:opacity-90" style={{ border: `1.5px solid ${INK}`, color: INK, borderRadius: "0.7rem" }}>Find us</a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold" style={{ color: BODY }}>
              <span className="inline-flex items-center gap-1.5"><Paw className="h-4 w-4" />Hand-picked brands</span>
              <span className="inline-flex items-center gap-1.5"><Paw className="h-4 w-4" />Friendly advice</span>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -right-6 -top-6 hidden h-40 w-40 rounded-full sm:block" style={{ background: `${BUTTER}55` }} />
            {heroVideo ? (
              <video src={heroVideo} autoPlay muted loop playsInline className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className="relative aspect-[4/5] w-full rounded-3xl object-cover shadow-2xl" />
            ) : (
              <div className="relative aspect-[4/5] w-full rounded-3xl" style={{ background: `linear-gradient(150deg, ${GREEN}, ${INK})` }} />
            )}
          </div>
        </div>
      </section>

      {/* value props strip */}
      <section style={{ background: TINT }}>
        <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-center sm:grid-cols-3 sm:px-8">
          {[
            { t: "Curated range", d: "Quality food, treats & gear." },
            { t: "Expert help", d: "Honest, friendly advice." },
            { t: "Local pickup", d: "Reserve & collect in store." },
          ].map((c) => (
            <div key={c.t} className="flex items-center justify-center gap-3">
              <Paw className="h-6 w-6" />
              <div className="text-left">
                <p className="text-sm font-bold" style={{ color: INK }}>{c.t}</p>
                <p className="text-xs" style={{ color: BODY }}>{c.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* product teaser — card grid (allowed for featured) */}
      {teaser.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Kicker>Shop the range</Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Popular picks</h2>
            </div>
            <a href={shopHref} className="shrink-0 text-sm font-bold" style={{ color: GREEN }}>View all →</a>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {teaser.map(({ item, label }) => (
              <div key={item.id} className="flex flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:shadow-lg" style={{ background: CARD, border: `1px solid ${HAIR}` }}>
                {label && <p className="text-[11px] font-bold uppercase tracking-[0.16em]" style={{ color: GREEN }}>{label}</p>}
                <div className="mt-2 flex items-baseline justify-between gap-3">
                  <h3 data-edit={`item:${item.id}:name`} style={{ ...display, color: INK }} className="text-lg font-bold">{item.name}</h3>
                  {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: GREEN }}>{item.price}</span>}
                </div>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-2 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* about band */}
      {content.about && (
        <section style={{ background: CARD, borderTop: `1px solid ${HAIR}`, borderBottom: `1px solid ${HAIR}` }}>
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 sm:px-8 lg:grid-cols-2 lg:gap-16">
            <div className="relative">
              {gallery[0] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-3xl object-cover" />
              ) : (
                <div className="aspect-[4/3] w-full rounded-3xl" style={{ background: TINT }} />
              )}
            </div>
            <div>
              <Kicker>About us</Kicker>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Run by pet people, for pet people</h2>
              <p data-edit="content.about" className="mt-5 text-[16px] leading-[1.9]" style={{ color: BODY }}>{content.about}</p>
              <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-sm font-bold" style={{ color: GREEN }}>Our story →</a>
            </div>
          </div>
        </section>
      )}

      {/* full catalogue teaser — clean row list */}
      {groups.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 py-20 sm:px-8">
          <div className="text-center">
            <div className="flex justify-center"><Kicker center>Price list</Kicker></div>
            <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Browse the shelves</h2>
          </div>
          <ul className="mt-12 divide-y" style={{ borderColor: HAIR }}>
            {featuredItems.slice(0, 8).map(({ item }) => (
              <li key={item.id} className="flex items-baseline justify-between gap-8 py-5">
                <div className="min-w-0">
                  <p data-edit={`item:${item.id}:name`} className="text-base font-semibold" style={{ color: INK }}>{item.name}</p>
                  {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: BODY }}>{item.description}</p>}
                </div>
                {item.price && <span data-edit={`item:${item.id}:price`} className="shrink-0 text-sm font-bold" style={{ color: GREEN }}>{item.price}</span>}
              </li>
            ))}
          </ul>
          <div className="mt-12 text-center">
            <a href={href("services")} className="inline-flex px-8 py-3.5 text-sm font-bold transition hover:opacity-90" style={{ border: `1.5px solid ${INK}`, color: INK, borderRadius: "0.7rem" }}>See the full range</a>
          </div>
        </section>
      )}

      {/* gallery strip */}
      {gallery.length > 0 && (
        <section style={{ background: TINT }}>
          <div className="mx-auto max-w-6xl px-6 py-20 sm:px-8">
            <div className="text-center">
              <div className="flex justify-center"><Kicker center>In store</Kicker></div>
              <h2 style={{ ...display, color: INK }} className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Come and browse</h2>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {gallery.slice(0, 4).map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-2xl object-cover" />
              ))}
            </div>
            <div className="mt-10 text-center">
              <a href={href("gallery")} className="inline-flex px-8 py-3.5 text-sm font-bold transition hover:opacity-90" style={{ background: GREEN, color: "#fff", borderRadius: "0.7rem" }}>View gallery</a>
            </div>
          </div>
        </section>
      )}

      {/* closing CTA */}
      <section className="mx-auto max-w-4xl px-6 py-20 sm:px-8">
        <div className="grid items-center gap-8 rounded-[2rem] px-8 py-12 sm:grid-cols-[1.4fr_1fr]" style={{ background: INK }}>
          <div>
            <h2 style={{ ...display, color: "#fff" }} className="text-3xl font-bold tracking-tight sm:text-4xl">Treat them to the good stuff</h2>
            <p className="mt-3 max-w-md text-[15px] leading-relaxed text-white/70">Reserve online for collection, or pop in and let us help you find the perfect pick.</p>
          </div>
          <div className="flex flex-wrap gap-3 sm:justify-end">
            <a href={shopHref} className="inline-flex px-7 py-3.5 text-sm font-bold transition hover:opacity-90" style={{ background: BUTTER, color: INK, borderRadius: "0.7rem" }}>{cta.label}</a>
            <a href={href("contact")} className="inline-flex px-7 py-3.5 text-sm font-bold text-white transition hover:opacity-90" style={{ border: "1.5px solid rgba(255,255,255,0.5)", borderRadius: "0.7rem" }}>Contact</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
