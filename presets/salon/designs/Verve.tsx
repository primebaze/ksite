import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { VerveHeader } from "./VerveHeader";
import { VerveBooking } from "./VerveBooking";

// Verve — bold, contemporary hair-salon design (single venue), inspired by the
// VA Salon layout: thin dark utility bar, full-bleed hero with an oversized
// overlay word, a "match with your professional" intro block, service category
// cards with script labels, a dark testimonials band, and an espresso footer
// with a boxed logo crest. MULTI-PAGE: nav opens real routes (Services / About /
// Gallery / Appointments / Contact) under basePath, never scroll anchors. The
// sticky header and footer are shared across pages. Palette is baked
// (ink / espresso / champagne gold / cream); the tenant swaps in their own
// photography, services, stylists, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const script = { fontFamily: "var(--font-fraunces)", fontStyle: "italic" } as const;
const INK = "#141210";
const ESPRESSO = "#231a16";
const GOLD = "#c9a96a";
const CREAM = "#f6f2ec";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

const SCRIPT_LABELS = ["Lovely", "Natural", "Perfect", "Signature", "Radiant", "Polished"];

export default function VerveDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Prefer the tenant's external booking link if set, else our own booking page.
  const externalBook = content.booking_url;
  const book = externalBook || (bookingOn ? href("reservations") : href("contact"));

  const nav = [
    groups.length > 0 && { label: "Prices", href: href("services") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    content.about && { label: "About", href: href("about") },
    { label: "News", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // Flatten service groups into "category cards" for the home teaser.
  const categories = groups.flatMap((s) =>
    s.categories.map((c) => ({
      title: c.category || s.section || "Services",
      count: c.items.length,
    })),
  );

  const footer = (
    <footer style={{ background: ESPRESSO }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr]">
        {/* boxed logo crest */}
        <div>
          <a href={href("home")} className="inline-flex items-center justify-center px-10 py-8 text-center" style={{ border: `1px solid ${GOLD}` }}>
            <span data-edit="tenant.business_name" style={serif} className="text-3xl tracking-[0.12em] text-white">{name.toUpperCase()}</span>
          </a>
          {content.address && <p data-edit="content.address" className="mt-6 whitespace-pre-line text-sm leading-relaxed text-white/65">{content.address}</p>}
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4 text-white/80">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:text-[var(--verve-gold)]" style={{ ["--verve-gold" as string]: GOLD }}><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>

        {/* info / hours */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Info</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">Open by appointment.</p>}
        </div>

        {/* contact */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>Contact us</h4>
          <div className="mt-5 space-y-2 text-sm text-white/75">
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
          <a href={book} className="mt-6 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] transition hover:opacity-90" style={{ background: GOLD, color: INK }}>Book appointment</a>
        </div>
      </div>
      <p className="px-8 pb-8 text-center text-xs text-white/40">© {name}. All rights reserved.</p>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <VerveHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Ink page banner — also clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section style={{ background: INK }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 pb-16 pt-36 text-center sm:pt-40">
        <p style={{ ...script, color: GOLD }} className="text-3xl sm:text-4xl">{kicker}</p>
        <h1 className="mt-2 text-4xl font-semibold uppercase tracking-[0.12em] sm:text-6xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES / PRICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("Lovely", "Prices")}
        <section className="mx-auto max-w-4xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 className="mb-8 text-center text-2xl font-semibold uppercase tracking-[0.18em]">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <p style={{ ...script, color: GOLD }} className="text-2xl">{catg.category}</p>}
                      <ul className="mt-4 divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p data-edit={`item:${item.id}:name`} className="font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 max-w-md text-sm text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap font-semibold" style={{ color: INK }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="text-center">
                <a href={book} className="inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.24em] transition hover:opacity-90" style={{ background: INK, color: "#fff" }}>Book appointment</a>
              </div>
            </div>
          ) : <p className="text-center text-neutral-500">Our price list is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- APPOINTMENTS / RESERVATIONS ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Your visit", "Appointments")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <p className="mb-8 text-center text-[17px] leading-[1.8] text-neutral-700">Tell us what you are after and when suits you. We will confirm your appointment by phone or email. For bridal or group bookings, please call us.</p>
          <VerveBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT / NEWS ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Say hello", "Contact")}
        <section className="mx-auto grid max-w-6xl gap-12 px-8 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-neutral-950">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-neutral-950">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span></li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex px-7 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition hover:opacity-90" style={{ background: INK, color: "#fff" }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Drop us a line"
                contactBlurb="Questions about a service, colour or your next visit? We will get right back to you."
                contactCta="Send message"
                theme={{ card: "#141210", cardBorder: "#c9a96a", heading: "#ffffff", blurb: "rgba(255,255,255,0.6)", label: "rgba(255,255,255,0.6)", fieldBg: "transparent", fieldBorder: "rgba(255,255,255,0.25)", fieldText: "#ffffff", button: "#c9a96a", buttonText: "#141210", radius: "0", font: "var(--font-fraunces)" }}
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
        {banner("Our story", "About")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
        </section>

        {/* stylists / team */}
        {team.length > 0 && (
          <section style={{ background: CREAM }} className="border-y border-black/5">
            <div className="mx-auto max-w-6xl px-8 py-20">
              <p style={{ ...script, color: GOLD }} className="text-center text-2xl">Match with your</p>
              <h2 className="mt-1 text-center text-3xl font-semibold uppercase tracking-[0.16em]">Perfect professional</h2>
              <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-neutral-200">
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p style={serif} className="mt-5 text-lg">{m.name}</p>
                    {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </>,
    );
  }

  // ---- GALLERY ----
  if (page === "gallery") {
    return shell(
      <>
        {banner("A look inside", "Gallery")}
        {gallery.length > 0 ? (
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-center text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- HOME ----
  return shell(
    <>
      {/* full-bleed hero with oversized overlay word */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-700 to-neutral-900" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/25" />
        <div className="relative z-10 mt-auto px-6 pb-20 sm:px-12 sm:pb-24">
          {content.tagline && (
            <p data-edit="content.tagline" style={{ ...script, color: GOLD }} className="mb-2 text-3xl [text-shadow:0_2px_20px_rgba(0,0,0,0.5)] sm:text-4xl">{content.tagline}</p>
          )}
          <h1 className="text-[15vw] font-semibold uppercase leading-[0.85] tracking-[0.04em] text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.45)] sm:text-[12vw]">
            {name.split(" ")[0]}<span style={{ color: GOLD }}>.</span>
          </h1>
          <a href={book} className="mt-8 inline-flex px-10 py-4 text-xs font-semibold uppercase tracking-[0.24em] shadow-2xl transition hover:opacity-90" style={{ background: GOLD, color: INK }}>Book appointment</a>
        </div>
      </section>

      {/* "match with your professional" intro: image + text */}
      <section className="mx-auto max-w-6xl px-8 py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
            {gallery[0] ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={gallery[0].image_url} alt={gallery[0].caption ?? ""} className="h-full w-full object-cover" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={hero} alt="" className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-neutral-200 to-neutral-300" />
            )}
          </div>
          <div>
            <p style={{ ...script, color: GOLD }} className="text-3xl">Match with your</p>
            <h2 className="mt-1 text-3xl font-semibold uppercase tracking-[0.12em] sm:text-4xl">Perfect professional</h2>
            <p data-edit="content.about" className="mt-6 text-[17px] leading-[1.9] text-neutral-600">
              {content.about || "New to our salon, or just haven't found the right professional for your goals yet? Meet a team perfectly matched to your style and personality."}
            </p>
            <a href={groups.length ? href("services") : href("reservations")} className="mt-8 inline-flex px-9 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90" style={{ background: INK }}>Find your match</a>
          </div>
        </div>
      </section>

      {/* service category cards with script labels (alternating ink / cream) */}
      {categories.length > 0 && (
        <section className="grid sm:grid-cols-3">
          {categories.slice(0, 3).map((c, i) => {
            const dark = i === 1;
            return (
              <div
                key={c.title + i}
                className="flex flex-col items-center justify-center px-8 py-20 text-center"
                style={dark ? { background: INK, color: "#fff" } : { background: CREAM, color: INK }}
              >
                <p style={{ ...script, color: GOLD }} className="text-3xl">{SCRIPT_LABELS[i % SCRIPT_LABELS.length]}</p>
                <h3 className="mt-2 text-2xl font-semibold uppercase tracking-[0.16em]">{c.title}</h3>
                <p className="mt-1 text-[11px] uppercase tracking-[0.3em] opacity-60">{c.count} {c.count === 1 ? "service" : "services"}</p>
                <a href={href("services")} className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] underline-offset-4 hover:underline" style={{ color: GOLD }}>Check prices</a>
              </div>
            );
          })}
        </section>
      )}

      {/* testimonials band (dark, script watermark) */}
      <section style={{ background: INK }} className="relative overflow-hidden text-white">
        <div className="relative mx-auto max-w-3xl px-8 py-24 text-center">
          <span style={{ ...script, color: "rgba(201,169,106,0.18)" }} className="pointer-events-none absolute inset-x-0 top-10 text-center text-7xl">They said</span>
          <p className="relative text-5xl leading-none" style={{ color: GOLD }}>&ldquo;</p>
          <h2 className="relative mt-2 text-3xl font-semibold uppercase tracking-[0.18em]">Testimonials</h2>
          <p className="relative mt-8 text-[17px] leading-[1.9] text-white/85">This salon has the highest standard. We are always warmly welcomed and walk out with top-notch service every single time. Thank you for your brilliant work.</p>
          <p className="relative mt-5 text-xs uppercase tracking-[0.3em] text-white/55">A happy client</p>
        </div>
      </section>
    </>,
    false,
  );
}
