import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { ServiceCards } from "../../service-cards";
import { SiteContactForms } from "@/components/SiteContactForms";
import { HaloHeader } from "./HaloHeader";
import { HaloBooking } from "./HaloBooking";

// Halo — a minimal, modern hair-salon design (single venue), inspired by Salt
// Salon London. White canvas, a centred serif wordmark, generous whitespace,
// thin uppercase labels and outlined buttons. MULTI-PAGE: the nav opens real
// routes (Services / About / Gallery / Book / Contact) under basePath, never
// scroll anchors. The sticky header and footer are shared; the tenant swaps in
// their own photography, services, stylists, hours and contact.

const serif = { fontFamily: "var(--font-fraunces)" } as const;

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  if (k.includes("twitter") || k === "x") return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h6l4 6zm-2 18h2L8 4H6z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

export default function HaloDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  // Salt links straight out to an external booking platform when one is set;
  // otherwise our own reservations page (when enabled), then contact.
  const book = content.booking_url || (bookingOn ? href("reservations") : href("contact"));
  const bookExternal = !!content.booking_url;

  const nav = [
    groups.length > 0 && { label: "Services", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  const footer = (
    <footer className="border-t border-neutral-200 bg-white text-neutral-800">
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        {/* booking queries */}
        <h4 className="text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">Booking queries</h4>
        <div className="mt-5 space-y-1.5 text-sm text-neutral-700">
          {content.phone && (
            <a data-edit="content.phone" href={`tel:${content.phone}`} className="block underline-offset-4 hover:underline">{content.phone}</a>
          )}
          {content.email && (
            <a data-edit="content.email" href={`mailto:${content.email}`} className="block underline-offset-4 hover:underline">{content.email}</a>
          )}
          <a href={book} target={bookExternal ? "_blank" : undefined} rel={bookExternal ? "noreferrer" : undefined} className="block underline underline-offset-4">Book online</a>
        </div>

        {/* location */}
        {(content.address || (content.hours && content.hours.length > 0)) && (
          <>
            <h4 className="mt-14 text-[11px] font-semibold uppercase tracking-[0.28em] text-neutral-500">Location</h4>
            {content.address && (
              <p data-edit="content.address" className="mx-auto mt-5 max-w-md whitespace-pre-line text-sm leading-relaxed text-neutral-700">{content.address}</p>
            )}
            {content.hours && content.hours.length > 0 && (
              <ul className="mx-auto mt-5 max-w-xs space-y-1.5 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
                  </li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-6 inline-block text-xs font-semibold uppercase tracking-[0.22em] underline underline-offset-4">Get directions</a>
            )}
          </>
        )}

        <p className="mt-14 text-[11px] uppercase tracking-[0.28em] text-neutral-500">By appointment only</p>

        {/* social + page links */}
        {content.socials && content.socials.length > 0 && (
          <div className="mt-8 flex justify-center gap-5 text-neutral-700">
            {content.socials.map((s) => (
              <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
            ))}
          </div>
        )}
        <div className="mt-8 flex justify-center gap-10 text-[11px] font-medium uppercase tracking-[0.22em] text-neutral-700">
          {content.about && <a href={href("about")} className="underline-offset-4 hover:underline">About</a>}
          {contactOn && <a href={href("contact")} className="underline-offset-4 hover:underline">Contact</a>}
        </div>
        <p className="mt-12 text-xs text-neutral-400">© {name}. All rights reserved.</p>
      </div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <HaloHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  // Plain page banner — clears the fixed header on sub-pages.
  const banner = (kicker: string, title: string) => (
    <section className="border-b border-neutral-200 bg-white">
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-32 text-center sm:pt-36">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-400">{kicker}</p>
        <h1 style={serif} className="mt-4 text-4xl font-medium tracking-wide sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES ----
  if (page === "services") {
    return shell(
      <>
        {banner("The list", "Services & prices")}
        <section className="mx-auto max-w-3xl px-6 py-20">
          {groups.length > 0 ? (
            <>
              <ServiceCards
                groups={groups}
                photos={gallery.map((g) => g.image_url)}
                tone={{ ink: "#171717", muted: "#737373", price: "#525252", border: "#e5e5e5", cardBg: "#ffffff", placeholderBg: "#f5f5f5" }}
                nameStyle={serif}
                radius="0.6rem"
              />
              <div className="mt-16 text-center">
                <a href={book} target={bookExternal ? "_blank" : undefined} rel={bookExternal ? "noreferrer" : undefined} className="inline-block border border-neutral-900 px-12 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white">Book now</a>
              </div>
            </>
          ) : (
            <p className="text-center text-neutral-500">Our service list is coming soon.</p>
          )}
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About", "Our salon")}
        <section className="mx-auto max-w-2xl px-6 py-20 text-center">
          {content.about ? (
            <p data-edit="content.about" className="text-[18px] leading-[1.95] text-neutral-700">{content.about}</p>
          ) : (
            <p className="text-neutral-500">Our story is coming soon.</p>
          )}
          {team.length > 0 && (
            <div className="mt-20">
              <h3 style={serif} className="text-3xl font-medium tracking-wide">The team</h3>
              <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                {team.map((m) => (
                  <div key={m.id} className="text-center">
                    <div className="mx-auto h-44 w-44 overflow-hidden rounded-full bg-neutral-100">
                      {m.photo_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                      )}
                    </div>
                    <p data-edit={`team:${m.id}:name`} style={serif} className="mt-5 text-lg">{m.name}</p>
                    {m.role && <p data-edit={`team:${m.id}:role`} className="text-sm text-neutral-500">{m.role}</p>}
                    {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
                  </div>
                ))}
              </div>
            </div>
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
          <section className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </section>
        ) : (
          <p className="mx-auto max-w-6xl px-6 py-20 text-center text-neutral-500">Photos coming soon.</p>
        )}
      </>,
    );
  }

  // ---- RESERVATIONS / BOOK ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Appointments", "Book in")}
        <section className="mx-auto max-w-xl px-6 py-20">
          {content.booking_url && (
            <p className="mb-10 text-center text-[15px] leading-relaxed text-neutral-600">
              Prefer to book online? Use our booking platform below, or send a request and we will confirm a time.
            </p>
          )}
          {content.booking_url && (
            <div className="mb-10 text-center">
              <a href={content.booking_url} target="_blank" rel="noreferrer" className="inline-block border border-neutral-900 px-12 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white">Book online</a>
            </div>
          )}
          <HaloBooking tenantId={tenant.id} name={name} />
        </section>
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Visit", "Find us")}
        <section className="mx-auto grid max-w-5xl gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20">
          <div>
            <div className="space-y-5 text-[15px] leading-relaxed text-neutral-700">
              {content.address && <p data-edit="content.address" className="whitespace-pre-line">{content.address}</p>}
              {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block underline-offset-4 hover:underline">{content.phone}</a>}
              {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block underline-offset-4 hover:underline">{content.email}</a>}
            </div>
            {content.hours && content.hours.length > 0 && (
              <ul className="mt-8 max-w-xs space-y-2 border-t border-neutral-200 pt-6 text-sm text-neutral-700">
                {content.hours.map((h, i) => (
                  <li key={i} className="flex justify-between gap-6">
                    <span data-edit={`hours:${i}:day`}>{h.day}</span>
                    <span data-edit={`hours:${i}:open`} className="text-neutral-500">{h.open}</span>
                  </li>
                ))}
              </ul>
            )}
            {content.map_url && (
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-block border border-neutral-900 px-7 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white">Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Drop us a line"
                contactBlurb="Questions about a service, a colour consultation or anything else? We will get back to you."
                contactCta="Send"
                theme={{ card: "#ffffff", cardBorder: "#e5e5e5", heading: "#161616", button: "#161616", buttonText: "#ffffff", fieldBg: "#ffffff", fieldBorder: "#d4d4d4", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const featuredGroups = groups.slice(0, 3);
  return shell(
    <>
      {/* full-bleed hero with the wordmark already in the fixed header */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-400" />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <div className="relative z-10 mt-auto flex flex-col items-center gap-7 px-6 pb-20 text-center sm:pb-24">
          {content.tagline && (
            <p data-edit="content.tagline" style={serif} className="max-w-2xl text-2xl leading-snug text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.45)] sm:text-3xl">{content.tagline}</p>
          )}
          <a href={book} target={bookExternal ? "_blank" : undefined} rel={bookExternal ? "noreferrer" : undefined} className="border border-white/80 px-12 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-white hover:text-neutral-900">Book now</a>
        </div>
      </section>

      {/* intro — centred body copy, like Salt's opening paragraphs */}
      {content.about && (
        <section className="mx-auto max-w-2xl px-6 py-24 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-400">Welcome</p>
          <p data-edit="content.about" className="mt-7 text-[18px] leading-[1.95] text-neutral-700">{content.about}</p>
        </section>
      )}

      {/* services teaser → links to the full services page */}
      {featuredGroups.length > 0 && (
        <section className="border-t border-neutral-200 bg-[#f7f6f4]">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center">
            <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-neutral-400">What we do</p>
            <h2 style={serif} className="mt-4 text-4xl font-medium tracking-wide sm:text-5xl">Services</h2>
            <ul className="mx-auto mt-10 max-w-md space-y-3 text-[15px] text-neutral-700">
              {featuredGroups.map((s) => (
                <li key={s.section} style={serif} className="text-lg">{s.section || "Treatments"}</li>
              ))}
            </ul>
            <div className="mt-10">
              <a href={href("services")} className="inline-block text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 underline underline-offset-4">View services and prices</a>
            </div>
          </div>
        </section>
      )}

      {/* book band */}
      <section className="border-t border-neutral-200 bg-white">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h2 style={serif} className="text-3xl font-medium tracking-wide sm:text-4xl">Ready when you are</h2>
          <p className="mt-4 text-[15px] text-neutral-600">Book your next appointment online in a moment.</p>
          <div className="mt-9">
            <a href={book} target={bookExternal ? "_blank" : undefined} rel={bookExternal ? "noreferrer" : undefined} className="inline-block border border-neutral-900 px-12 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white">Book now</a>
          </div>
        </div>
      </section>
    </>,
    false,
  );
}
