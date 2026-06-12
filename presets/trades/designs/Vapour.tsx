import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { VapourHeader } from "./VapourHeader";
import { TradesSocialIcon } from "./TradesMobileNav";

// Vapour — a modern, vibrant vape shop / e-cigarette & e-liquid store. Deep
// charcoal-purple with a neon magenta-pink headline accent and an electric-teal
// secondary, soft lilac-white text, rounded pills and a tasteful neon glow. The
// signature is a glowing "Find your flavour" hero with soft vapour swirls + neon
// flavour-cloud tags, a "what we stock" ranges list, a "new to vaping?" switch
// band and an 18+ age-verification note. Built for vape shops selling kits,
// mods, e-liquids, disposables, coils and nic salts — in store & click-and-
// collect. MULTI-PAGE: nav opens real routes (Shop / About / In store /
// Visit) under basePath; the sticky neon header + dark footer are shared.
// The catalog reads as a "shop" of ranges with prices.

const NIGHT = "#1A1525"; // charcoal-purple page
const PANEL = "#221A30"; // lifted panel
const CARD = "#2A2038"; // card surface
const PINK = "#E0399A"; // vivid magenta-pink accent
const TEAL = "#2BD4C4"; // electric teal secondary
const LILAC = "#F4F0FA"; // soft lilac-white text
const INK = "#110D18"; // deepest ink (footer)
const MUTE = "#A99FBC"; // muted lilac body
const display = { fontFamily: "var(--font-space)" } as const;

// flavour families shown as colourful neon tags in the hero / strip.
const FLAVOURS: { label: string; c: string }[] = [
  { label: "Fruit", c: PINK },
  { label: "Menthol", c: TEAL },
  { label: "Dessert", c: "#B66BE0" },
  { label: "Tobacco", c: "#E8A04B" },
];

// default "what we stock" ranges, used when a tenant hasn't added their own.
const STOCK = ["Starter kits", "Mods & tanks", "E-liquids", "Disposables", "Coils & accessories", "Nic salts"];

function Kicker({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.26em]" style={{ color: TEAL }}>
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: PINK, boxShadow: `0 0 10px ${PINK}` }} />
      {children}
    </p>
  );
}

function FlavourTag({ label, c }: { label: string; c: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.12em]" style={{ color: c, background: `${c}1f`, border: `1px solid ${c}55` }}>
      <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: c, boxShadow: `0 0 8px ${c}` }} />
      {label}
    </span>
  );
}

export default function VapourDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const products = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const ctaLabel = content.cta_label ?? "Reserve in store";
  const cta = content.cta_url ?? href("contact");
  const phone = content.emergency_phone || content.phone;

  const nav = [
    products.length > 0 && { label: "Shop", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "In store", href: href("gallery") },
    { label: "Visit", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const pinkBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-110 ${full ? "block w-full" : "inline-flex"}`} style={{ background: PINK, boxShadow: `0 0 28px -6px ${PINK}` }}>{label}</a>
  );
  const ghostBtn = (label: string, to: string, full = false) => (
    <a href={to} className={`rounded-full border px-8 py-4 text-center text-[12px] font-extrabold uppercase tracking-[0.14em] transition hover:bg-white/5 ${full ? "block w-full" : "inline-flex"}`} style={{ borderColor: `${TEAL}66`, color: TEAL }}>{label}</a>
  );

  // 18+ age-verification note, reused on home + contact.
  const ageNote = (
    <div className="flex items-center gap-3 rounded-2xl px-5 py-4 text-sm" style={{ background: `${PINK}14`, border: `1px solid ${PINK}40`, color: LILAC }}>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold" style={{ background: PINK, color: "#fff", boxShadow: `0 0 14px -2px ${PINK}` }}>18+</span>
      <p className="leading-relaxed" style={{ color: MUTE }}>You must be <span style={{ color: LILAC }}>18 or over</span> to buy vaping products. ID may be required in store. Nicotine is an addictive substance.</p>
    </div>
  );

  const footer = (
    <footer style={{ background: INK, borderTop: `1px solid ${PINK}40` }} className="text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-8 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <a href={href("home")} className="flex items-center gap-2.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: PINK, boxShadow: `0 0 12px ${PINK}` }} />
            <span data-edit="tenant.business_name" style={display} className="text-xl font-extrabold tracking-tight">{name}</span>
          </a>
          {content.tagline && <p data-edit="content.tagline" className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: MUTE }}>{content.tagline}</p>}
          <p className="mt-5 inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]" style={{ background: `${PINK}1f`, border: `1px solid ${PINK}55`, color: LILAC }}>18+ only · ID required</p>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em]" style={{ borderColor: "#ffffff1f", color: MUTE }}>{a}</span>
              ))}
            </div>
          )}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-3">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition hover:text-white hover:bg-[#E0399A]" style={{ border: "1px solid #ffffff26" }}><TradesSocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Shop</h4>
          <ul className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {nav.map((l) => (
              <li key={l.label}><a href={l.href} className="transition hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Find us</h4>
          <div className="mt-5 space-y-3 text-sm" style={{ color: MUTE }}>
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
          </div>
        </div>
        <div>
          <h4 style={display} className="text-xs font-extrabold uppercase tracking-[0.22em] text-white/50">Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm" style={{ color: MUTE }}>
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-5"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm" style={{ color: MUTE }}>Open 7 days.</p>}
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t px-8 py-7 text-xs sm:flex-row" style={{ borderColor: "#ffffff14", color: "#ffffff66" }}>
        <p>© {new Date().getFullYear()} {name}. All rights reserved.</p>
        <p className="uppercase tracking-[0.14em] text-white/45">In store &amp; click &amp; collect</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={{ ...siteRootStyle(theme, tokens), background: NIGHT }} className="min-h-screen font-body">
      <VapourHeader name={name} cta={cta} ctaLabel={ctaLabel} phone={phone} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section className="relative overflow-hidden" style={{ background: PANEL, borderBottom: `1px solid ${PINK}33` }}>
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full" style={{ background: `radial-gradient(circle, ${PINK}33, transparent 70%)` }} />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full" style={{ background: `radial-gradient(circle, ${TEAL}26, transparent 70%)` }} />
      <div className="relative mx-auto max-w-7xl px-8 pb-14 pt-32 sm:pt-40">
        <Kicker>{kicker}</Kicker>
        <h1 style={{ ...display, color: LILAC }} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SHOP (services route = ranges/products) ----
  if (page === "services") {
    return shell(
      <>
        {banner("What we stock", "The shop")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          <div className="mb-12 flex flex-wrap gap-3">
            {FLAVOURS.map((f) => <FlavourTag key={f.label} label={f.label} c={f.c} />)}
          </div>
          {products.length > 0 ? (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {products.map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-6">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: LILAC }} className="text-lg font-bold tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1.5 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-lg font-extrabold" style={{ color: PINK }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="divide-y" style={{ borderColor: "#ffffff14" }}>
              {STOCK.map((r) => (
                <li key={r} className="flex items-baseline justify-between gap-8 py-6">
                  <p style={{ ...display, color: LILAC }} className="text-lg font-bold tracking-tight">{r}</p>
                  <span className="shrink-0 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: TEAL }}>In stock</span>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-12">{pinkBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("Our shop", "Helping you switch")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p> : <p style={{ color: MUTE }}>Our story is coming soon.</p>}
          <div className="mt-12 rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${TEAL}33` }}>
            <h3 style={{ ...display, color: TEAL }} className="text-xs font-extrabold uppercase tracking-[0.22em]">New to vaping?</h3>
            <p className="mt-3 text-[15px] leading-relaxed" style={{ color: MUTE }}>Pop in and our team will help you find the right starter kit, nicotine strength and flavour to make switching simple.</p>
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <>
              <h3 style={{ ...display, color: LILAC }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Trusted &amp; compliant</h3>
              <div className="mt-5 flex flex-wrap gap-3">
                {content.accreditations.map((a) => (
                  <span key={a} className="rounded-full border px-4 py-2 text-[11px] font-bold uppercase tracking-[0.12em]" style={{ borderColor: `${PINK}66`, color: LILAC }}>{a}</span>
                ))}
              </div>
            </>
          )}
          {content.service_areas && content.service_areas.length > 0 && (
            <>
              <h3 style={{ ...display, color: LILAC }} className="mt-12 text-xs font-extrabold uppercase tracking-[0.22em]">Where to find us</h3>
              <p className="mt-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>{content.service_areas.join(" · ")}</p>
            </>
          )}
          <div className="mt-12">{pinkBtn(ctaLabel, cta)}</div>
        </section>
      </>,
    );
  }

  // ---- CONTACT / VISIT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit us", "Come say hello")}
        <section className="mx-auto grid max-w-7xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 style={{ ...display, color: LILAC }} className="text-2xl font-extrabold tracking-tight">Find the shop</h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed" style={{ color: MUTE }}>
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block transition hover:text-white">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block transition hover:text-white">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
            <p className="mt-8 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: TEAL }}>In store &amp; click &amp; collect</p>
            <div className="mt-6">{ageNote}</div>
            {content.map_url && <div className="mt-7">{ghostBtn("Get directions", content.map_url)}</div>}
          </div>
          {(bookingOn || contactOn) && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={bookingOn}
                contact={contactOn}
                bookingTitle="Reserve in store"
                contactTitle="Get in touch"
                bookingBlurb="Reserve a kit, flavour or bundle for click & collect and we'll have it ready behind the counter."
                bookingCta="Reserve now"
                theme={{ card: CARD, cardBorder: "#ffffff1a", heading: LILAC, blurb: MUTE, label: "#c9c0db", fieldBg: PANEL, fieldBorder: "#ffffff22", fieldText: LILAC, button: PINK, buttonText: "#ffffff", radius: "1rem", font: "var(--font-space)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- IN STORE / GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("In store", "Inside the shop")}
        {gallery.length > 0 ? (
          <section className="mx-auto max-w-7xl px-2 py-12 sm:px-4">
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
              ))}
            </div>
          </section>
        ) : <p className="mx-auto max-w-7xl px-8 py-20" style={{ color: MUTE }}>Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* hero — neon charcoal-purple "Find your flavour", soft vapour swirls + glow */}
      <section className="relative isolate flex min-h-[94vh] items-center overflow-hidden">
        {content.hero_video_url ? (
          <video src={content.hero_video_url} autoPlay muted loop playsInline className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#221A30,#1A1525 55%,#110D18)" }} />
        )}
        <div className="pointer-events-none absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(17,13,24,0.94) 0%, rgba(26,21,37,0.78) 45%, rgba(26,21,37,0.4) 100%)" }} />
        {/* signature vapour swirls / flavour-cloud neon glow */}
        <div className="pointer-events-none absolute -left-24 top-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${PINK}40, transparent 65%)` }} />
        <div className="pointer-events-none absolute right-[-6rem] top-1/3 h-[24rem] w-[24rem] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${TEAL}33, transparent 65%)` }} />
        <div className="pointer-events-none absolute bottom-[-8rem] left-1/3 h-[22rem] w-[22rem] rounded-full blur-3xl" style={{ background: `radial-gradient(circle, #B66BE033, transparent 65%)` }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 py-28 text-white">
          <Kicker>{content.service_areas?.[0] ? `${content.service_areas[0]}'s vape shop` : "Your local vape shop"}</Kicker>
          <h1 style={display} className="mt-5 max-w-4xl text-5xl font-extrabold leading-[0.95] tracking-tight [text-shadow:0_2px_30px_rgba(0,0,0,0.55)] sm:text-8xl">
            <span className="block" style={{ color: LILAC }}>Find your</span>
            <span className="block" style={{ color: PINK, textShadow: `0 0 32px ${PINK}88` }}>flavour</span>
          </h1>
          <p data-edit="content.tagline" className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: MUTE }}>{content.tagline ?? "Huge e-liquid range, the latest kits and expert advice to help you switch — in store and click & collect."}</p>
          <p data-edit="tenant.business_name" className="mt-4 text-sm font-bold uppercase tracking-[0.25em] text-white/65">{name}</p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {FLAVOURS.map((f) => <FlavourTag key={f.label} label={f.label} c={f.c} />)}
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            {pinkBtn(products.length > 0 ? "Shop the range" : ctaLabel, products.length > 0 ? href("services") : cta)}
            {phone && ghostBtn(`Call ${phone}`, `tel:${phone}`)}
          </div>
        </div>
      </section>

      {/* age-verification note strip */}
      <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
        <div className="mx-auto max-w-7xl px-8 py-7">{ageNote}</div>
      </section>

      {/* about */}
      {content.about && (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <Kicker>Our shop</Kicker>
            <h2 style={{ ...display, color: LILAC }} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl">More than a vape shop</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9]" style={{ color: MUTE }}>{content.about}</p>
            <a href={href("about")} className="mt-6 inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.18em]" style={{ color: TEAL }}>About the shop →</a>
          </div>
          <div className="relative">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="aspect-[4/3] w-full rounded-2xl object-cover" />
            ) : (
              <div className="aspect-[4/3] w-full rounded-2xl" style={{ background: `linear-gradient(135deg,${CARD},${PANEL})` }} />
            )}
            <span className="pointer-events-none absolute -bottom-3 -right-3 h-20 w-20 rounded-br-2xl" style={{ borderBottom: `3px solid ${PINK}`, borderRight: `3px solid ${PINK}`, boxShadow: `4px 4px 24px -6px ${PINK}` }} />
          </div>
        </section>
      )}

      {/* what we stock — ranges list (clean divide-y rows) */}
      <section style={{ background: PANEL, borderTop: "1px solid #ffffff12", borderBottom: "1px solid #ffffff12" }}>
        <div className="mx-auto max-w-5xl px-8 py-24">
          <Kicker>What we stock</Kicker>
          <h2 style={{ ...display, color: LILAC }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">The range</h2>
          {products.length > 0 ? (
            <ul className="mt-12 divide-y" style={{ borderColor: "#ffffff14" }}>
              {products.slice(0, 6).map((s) => (
                <li key={s.id} className="flex items-baseline justify-between gap-8 py-5">
                  <div className="min-w-0">
                    <p data-edit={`item:${s.id}:name`} style={{ ...display, color: LILAC }} className="text-lg font-bold tracking-tight">{s.name}</p>
                    {s.description && <p data-edit={`item:${s.id}:description`} className="mt-1 text-sm leading-relaxed" style={{ color: MUTE }}>{s.description}</p>}
                  </div>
                  {s.price && <span data-edit={`item:${s.id}:price`} className="shrink-0 text-base font-extrabold" style={{ color: PINK }}>{s.price}</span>}
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-12 divide-y" style={{ borderColor: "#ffffff14" }}>
              {STOCK.map((r, i) => (
                <li key={r} className="flex items-baseline justify-between gap-8 py-5">
                  <span style={{ ...display, color: LILAC }} className="text-lg font-bold tracking-tight">
                    <span className="mr-3 text-sm font-extrabold" style={{ color: TEAL }}>{String(i + 1).padStart(2, "0")}</span>{r}
                  </span>
                  <span className="shrink-0 text-sm font-bold uppercase tracking-[0.14em]" style={{ color: TEAL }}>In stock</span>
                </li>
              ))}
            </ul>
          )}
          {products.length > 0 && <div className="mt-12">{ghostBtn("View the full shop", href("services"))}</div>}
        </div>
      </section>

      {/* new to vaping? we'll help you switch — guidance band */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute -left-16 top-0 h-72 w-72 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${TEAL}26, transparent 65%)` }} />
        <div className="relative mx-auto max-w-7xl px-8 py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center lg:gap-16">
            <div>
              <Kicker>New to vaping?</Kicker>
              <h2 style={{ ...display, color: LILAC }} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl">We&apos;ll help you switch</h2>
              <p className="mt-5 text-[16px] leading-[1.9]" style={{ color: MUTE }}>Not sure where to start? Our team will guide you through kits, nicotine strengths and flavours so making the switch is simple and stress-free.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { t: "Starter kits", d: "Easy, refillable devices to get you going." },
                { t: "Expert advice", d: "Friendly help picking strength & flavour." },
                { t: "Huge flavour range", d: "Fruit, menthol, dessert, tobacco & more." },
              ].map((c) => (
                <div key={c.t} className="rounded-2xl p-6" style={{ background: CARD, border: "1px solid #ffffff14" }}>
                  <h3 style={{ ...display, color: PINK }} className="text-base font-extrabold tracking-tight">{c.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: MUTE }}>{c.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* in store strip */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-7xl px-8 py-12">
          <Kicker>In store</Kicker>
          <h2 style={{ ...display, color: LILAC }} className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">Inside the shop</h2>
          <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {gallery.slice(0, 4).map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-xl object-cover" />
            ))}
          </div>
          <div className="mt-10">{ghostBtn("See inside", href("gallery"))}</div>
        </section>
      )}

      {/* visit / click & collect band */}
      <section style={{ background: PANEL, borderTop: "1px solid #ffffff12" }}>
        <div className="mx-auto grid max-w-7xl gap-8 px-8 py-20 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
          <div>
            <Kicker>Visit us</Kicker>
            <h2 style={{ ...display, color: LILAC }} className="mt-4 text-4xl font-extrabold leading-[0.98] tracking-tight sm:text-5xl">In store &amp; click &amp; collect</h2>
            <p className="mt-5 max-w-md text-[16px] leading-relaxed" style={{ color: MUTE }}>Reserve online, collect at the counter — or pop in to browse the full range and get expert advice.</p>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-sm space-y-2 border-t pt-6 text-sm" style={{ borderColor: "#ffffff1f", color: MUTE }}>
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
                ))}
              </ul>
            )}
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl p-6" style={{ background: CARD, border: `1px solid ${PINK}33` }}>
              <h3 style={{ ...display, color: LILAC }} className="text-lg font-extrabold tracking-tight">{name}</h3>
              {content.address && <p data-edit="content.address" className="mt-2 whitespace-pre-line text-sm leading-relaxed" style={{ color: MUTE }}>{content.address}</p>}
              <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                {pinkBtn(ctaLabel, cta)}
                {content.map_url && ghostBtn("Get directions", content.map_url)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* closing CTA — neon pink band */}
      <section className="relative overflow-hidden" style={{ background: PINK }}>
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full" style={{ background: "radial-gradient(circle, rgba(255,255,255,0.25), transparent 65%)" }} />
        <div className="relative mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-8 py-16 text-white sm:flex-row sm:items-center">
          <div>
            <h2 style={display} className="text-3xl font-extrabold leading-[0.98] tracking-tight sm:text-4xl">Find your next flavour.</h2>
            <p className="mt-2 text-sm font-bold uppercase tracking-[0.14em] text-white/80">18+ only · ID may be required</p>
          </div>
          <a href={phone ? `tel:${phone}` : cta} className="rounded-full bg-[#110D18] px-9 py-4 text-[12px] font-extrabold uppercase tracking-[0.14em] text-white transition hover:brightness-125">{phone ? `Call ${phone}` : ctaLabel}</a>
        </div>
      </section>
    </>,
    false,
  );
}
