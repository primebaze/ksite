"use client";

import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import { useState, type ReactNode } from "react";
import { groupCatalog, siteRootStyle, tokensFor } from "../../shared";
import { SiteContactForms } from "@/components/SiteContactForms";
import { AureliaHeader } from "./AureliaHeader";
import { AureliaBooking } from "./AureliaBooking";

// Aurelia — premium aesthetics / skin clinic design (single venue), faithfully
// recreating the in-depth structure of a real clinic: video/image hero with a
// review trust strip, an "about" split, a treatments CAROUSEL, a numbered
// "why choose us" accordion over imagery, a "concerns we treat" CAROUSEL, a
// "how it works" step accordion, a dedicated TEAM carousel on a dark band, a
// testimonials carousel, a full-width CTA band and a stepped consultation form.
// Palette is baked (warm ink / bone / soft taupe). The tenant swaps in their own
// photography, treatments, practitioners, hours and contact. MULTI-PAGE: nav
// opens real routes under basePath (never scroll anchors).

const serif = { fontFamily: "var(--font-fraunces)" } as const;
const INK = "#16140f";
const BONE = "#f4f1ec";
const TAUPE = "#9c8466";

function SocialIcon({ kind }: { kind: string }) {
  const k = kind.toLowerCase();
  if (k.includes("face")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M14 9h3V6h-3c-1.7 0-3 1.3-3 3v2H8v3h3v7h3v-7h3l1-3h-4V9c0-.6.4-1 1-1z" /></svg>;
  if (k.includes("insta")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" /></svg>;
  if (k.includes("tiktok")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M16 3c.3 2.2 1.6 3.7 3.8 3.9v2.6c-1.3.1-2.5-.3-3.8-1v5.9c0 3.3-2.5 5.6-5.6 5.6S5 17.7 5 14.6c0-3 2.3-5.3 5.6-5.1v2.7c-.4-.1-.9-.2-1.3-.1-1.4.2-2.3 1.2-2.2 2.7.1 1.4 1.2 2.4 2.6 2.3 1.5-.1 2.3-1.1 2.3-2.7V3z" /></svg>;
  if (k.includes("linkedin")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.1c.5-1 1.8-2 3.7-2 4 0 4.7 2.6 4.7 6V21h-4v-5.3c0-1.3 0-3-1.8-3s-2.1 1.4-2.1 2.9V21h-4z" /></svg>;
  if (k.includes("you")) return <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.3.4-2.5.4-3.8s-.1-2.5-.4-3.8zM10 15V9l5 3z" /></svg>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>;
}

function Stars({ light }: { light?: boolean }) {
  return (
    <div className="flex gap-0.5" style={{ color: light ? "#e8d9bf" : TAUPE }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17.8 5.9 21.4l1.4-6.8L2.2 9.9l6.9-.8z" />
        </svg>
      ))}
    </div>
  );
}

// ---- Generic horizontal photo carousel (treatments + concerns) ----
function PhotoCarousel({
  items,
  bookHref,
  showPrice,
}: {
  items: { id: string; title: string; subtitle?: string; image?: string }[];
  bookHref?: string;
  showPrice?: boolean;
}) {
  const [start, setStart] = useState(0);
  const per = 4;
  const max = Math.max(0, items.length - per);
  const clamp = (n: number) => Math.min(max, Math.max(0, n));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div
          className="flex gap-3 transition-transform duration-500 ease-out sm:gap-4"
          style={{ transform: `translateX(calc(-${start} * (25% )))` }}
        >
          {items.map((it) => (
            <div key={it.id} className="relative aspect-[3/4] w-[78%] flex-none overflow-hidden sm:w-[calc(50%-0.5rem)] lg:w-[calc(25%-0.75rem)]">
              {it.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={it.image} alt={it.title} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#cdc4b6,#8c8170)" }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5">
                <div>
                  <p data-edit={showPrice ? `item:${it.id}:name` : undefined} style={serif} className="text-lg leading-tight text-white">{it.title}</p>
                  {it.subtitle && <p data-edit={showPrice ? `item:${it.id}:price` : undefined} className="mt-1 text-xs uppercase tracking-[0.18em] text-white/80">{it.subtitle}</p>}
                </div>
                {bookHref && (
                  <a href={bookHref} aria-label={`Book ${it.title}`} className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/90 text-neutral-900 transition hover:bg-white">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {items.length > per && (
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => setStart((s) => clamp(s - 1))}
            disabled={start === 0}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-400 text-neutral-700 transition hover:bg-neutral-900 hover:text-white disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => setStart((s) => clamp(s + 1))}
            disabled={start >= max}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-400 text-neutral-700 transition hover:bg-neutral-900 hover:text-white disabled:opacity-30"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Team carousel (dark band) ----
function TeamCarousel({ team }: { team: { id: string; name: string; role: string | null; credentials: string | null; photo_url: string | null }[] }) {
  const [start, setStart] = useState(0);
  const per = 3;
  const max = Math.max(0, team.length - per);
  const clamp = (n: number) => Math.min(max, Math.max(0, n));

  return (
    <div className="relative">
      <div className="overflow-hidden">
        <div className="flex gap-4 transition-transform duration-500 ease-out" style={{ transform: `translateX(calc(-${start} * (33.333% )))` }}>
          {team.map((m) => (
            <div key={m.id} className="relative aspect-[3/4] w-[82%] flex-none overflow-hidden sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.7rem)]">
              {m.photo_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img loading="lazy" decoding="async" src={m.photo_url} alt={m.name} className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#3a352c,#1c1812)" }} />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p data-edit={`team:${m.id}:name`} style={serif} className="text-xl text-white">{m.name}</p>
                {m.role && <p data-edit={`team:${m.id}:role`} className="mt-1 text-xs uppercase tracking-[0.18em]" style={{ color: "#e8d9bf" }}>{m.role}</p>}
                {m.credentials && <p className="mt-1 text-sm text-white/70">{m.credentials}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
      {team.length > per && (
        <div className="mt-6 flex gap-3">
          <button type="button" aria-label="Previous" onClick={() => setStart((s) => clamp(s - 1))} disabled={start === 0} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-neutral-900 disabled:opacity-30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
          </button>
          <button type="button" aria-label="Next" onClick={() => setStart((s) => clamp(s + 1))} disabled={start >= max} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/40 text-white transition hover:bg-white hover:text-neutral-900 disabled:opacity-30">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
          </button>
        </div>
      )}
    </div>
  );
}

// ---- Testimonials carousel ----
function TestimonialCarousel({ items }: { items: { quote: string; author: string }[] }) {
  const [i, setI] = useState(0);
  const prev = () => setI((n) => (n - 1 + items.length) % items.length);
  const next = () => setI((n) => (n + 1) % items.length);
  const t = items[i];
  return (
    <div className="mx-auto max-w-3xl text-center">
      <Stars />
      <blockquote style={serif} className="mt-6 min-h-[7rem] text-2xl leading-snug text-neutral-900 sm:text-3xl">
        “{t.quote}”
      </blockquote>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-500">{t.author}</p>
      <div className="mt-9 flex justify-center gap-3">
        <button type="button" aria-label="Previous review" onClick={prev} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:bg-neutral-900 hover:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M15 18l-6-6 6-6" /></svg>
        </button>
        <button type="button" aria-label="Next review" onClick={next} className="flex h-11 w-11 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition hover:bg-neutral-900 hover:text-white">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M9 18l6-6-6-6" /></svg>
        </button>
      </div>
    </div>
  );
}

// ---- Numbered accordion (why choose us / how it works) ----
function Accordion({ items, dark }: { items: { title: string; body: ReactNode }[]; dark?: boolean }) {
  const [open, setOpen] = useState(0);
  const border = dark ? "border-white/15" : "border-neutral-200";
  const muted = dark ? "text-white/40" : "text-neutral-400";
  const head = dark ? "text-white" : "text-neutral-900";
  const body = dark ? "text-white/70" : "text-neutral-600";
  return (
    <div className={`border-t ${border}`}>
      {items.map((it, idx) => {
        const isOpen = open === idx;
        return (
          <div key={idx} className={`border-b ${border}`}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : idx)}
              className="flex w-full items-center gap-5 py-6 text-left"
            >
              <span className={`text-xs font-semibold tabular-nums ${muted}`}>{String(idx + 1).padStart(2, "0")}</span>
              <span style={serif} className={`flex-1 text-lg sm:text-xl ${head}`}>{it.title}</span>
              <span className={`text-2xl font-light ${head}`}>{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && <div className={`pb-7 pl-11 pr-8 text-[15px] leading-relaxed ${body}`}>{it.body}</div>}
          </div>
        );
      })}
    </div>
  );
}

// Default copy used where we have no matching data field.
const TESTIMONIALS = [
  { quote: "From the consultation through to aftercare I felt completely looked after. Natural, beautiful results.", author: "Olivia, verified patient" },
  { quote: "The team took the time to understand what I wanted and never pushed anything. I could not recommend them more.", author: "Priya, verified patient" },
  { quote: "A calm, professional clinic. My skin has never looked better and the results speak for themselves.", author: "Sophie, verified patient" },
  { quote: "Expert hands and a genuinely warm welcome every single visit. Worth every moment.", author: "Daniel, verified patient" },
];

const WHY_US = [
  { title: "Expert practitioners", body: "Our team is led by experienced clinicians dedicated to delivering safe, effective treatments and a result that looks like you, only refreshed." },
  { title: "Personalised treatment plans", body: "No two faces are the same. Every plan begins with a thorough consultation and is tailored to your goals, anatomy and lifestyle." },
  { title: "State of the art facilities", body: "Treatments are carried out in a clean, modern clinical setting using trusted, medically approved products and equipment." },
  { title: "Commitment to client satisfaction", body: "Your comfort and confidence come first. We are here before, during and after your treatment, every step of the way." },
];

export default function AureliaDesign({ site, page = "home", basePath = "" }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const items = groups.flatMap((s) => s.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const video = content.hero_video_url;
  const name = tenant.business_name;
  const bookingOn = content.booking_enabled !== false;
  const contactOn = content.contact_form_enabled !== false;

  const href = (p: Parameters<typeof pageHref>[1]) => pageHref(basePath, p);
  const externalBook = content.booking_url;
  const book = bookingOn ? href("reservations") : externalBook || href("contact");

  const serviceNames = items.map((i) => i.name).slice(0, 24);

  const nav = [
    groups.length > 0 && { label: "Treatments", href: href("services") },
    content.about && { label: "About", href: href("about") },
    gallery.length > 0 && { label: "Gallery", href: href("gallery") },
    bookingOn && { label: "Book", href: href("reservations") },
    { label: "Contact", href: href("contact") },
  ].filter(Boolean) as { label: string; href: string }[];

  // ---- Footer ----
  const footer = (
    <footer style={{ background: INK }} className="text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-8 py-20 sm:grid-cols-2 lg:grid-cols-[1.1fr_1fr_1fr_1.2fr]">
        <div>
          <p data-edit="tenant.business_name" style={serif} className="text-xl tracking-[0.08em]">{name}</p>
          <div className="mt-5 space-y-2 text-sm text-white/70">
            {content.address && <p data-edit="content.address" className="whitespace-pre-line leading-relaxed">{content.address}</p>}
            {content.phone && <a data-edit="content.phone" href={`tel:${content.phone}`} className="block hover:text-white">{content.phone}</a>}
            {content.email && <a data-edit="content.email" href={`mailto:${content.email}`} className="block hover:text-white">{content.email}</a>}
          </div>
          {content.socials && content.socials.length > 0 && (
            <div className="mt-6 flex gap-4 text-white/80">
              {content.socials.map((s) => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" aria-label={s.label} className="transition hover:opacity-60"><SocialIcon kind={`${s.label} ${s.url}`} /></a>
              ))}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: TAUPE }}>Explore</h4>
          <ul className="mt-5 space-y-2.5 text-sm text-white/70">
            {([
              content.about && { label: "About us", href: href("about") },
              groups.length > 0 && { label: "Treatments", href: href("services") },
              gallery.length > 0 && { label: "Gallery", href: href("gallery") },
              bookingOn && { label: "Book a consultation", href: href("reservations") },
              { label: "Contact", href: href("contact") },
            ].filter(Boolean) as { label: string; href: string }[]).map((l) => (
              <li key={l.label}><a href={l.href} className="hover:text-white">{l.label}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: TAUPE }}>Opening hours</h4>
          {content.hours && content.hours.length > 0 ? (
            <ul className="mt-5 space-y-2 text-sm text-white/70">
              {content.hours.map((h, i) => (
                <li key={i} className="flex justify-between gap-6"><span data-edit={`hours:${i}:day`}>{h.day}</span><span data-edit={`hours:${i}:open`} className="text-white/45">{h.open}</span></li>
              ))}
            </ul>
          ) : <p className="mt-5 text-sm text-white/55">By appointment.</p>}
        </div>
        <div className="flex flex-col items-start justify-center rounded-2xl border border-white/15 px-7 py-8">
          <h4 style={serif} className="text-2xl">Ready to begin?</h4>
          <p className="mt-2 text-sm text-white/65">Book a personalised consultation with our team.</p>
          <a href={book} className="mt-5 inline-flex px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-neutral-900 transition hover:opacity-90" style={{ background: BONE }}>{bookingOn ? "Book an appointment" : "Contact us"}</a>
        </div>
      </div>
      <div className="border-t border-white/10 px-8 py-6 text-center text-xs text-white/45">© {name}. All rights reserved.</div>
    </footer>
  );

  const shell = (children: ReactNode, solid = true) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="min-h-screen bg-white font-body text-neutral-900">
      <AureliaHeader name={name} book={book} links={nav} home={href("home")} solid={solid} />
      {children}
      {footer}
    </div>
  );

  const banner = (kicker: string, title: string) => (
    <section style={{ background: INK }} className="text-white">
      <div className="mx-auto max-w-6xl px-8 pb-14 pt-32 sm:pt-40">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>{kicker}</p>
        <h1 style={serif} className="mt-3 text-4xl font-medium sm:text-5xl">{title}</h1>
      </div>
    </section>
  );

  // ---- SERVICES / TREATMENTS ----
  if (page === "services") {
    return shell(
      <>
        {banner("Treatments", "Expert-led aesthetic services")}
        <section className="mx-auto max-w-5xl px-8 py-20">
          {groups.length > 0 ? (
            <div className="space-y-16">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h2 data-edit={`section:${section.categories[0]?.items[0]?.id ?? ""}`} style={serif} className="mb-7 border-b border-neutral-200 pb-4 text-2xl">{section.section}</h2>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <h3 data-edit={`category:${catg.items[0]?.id ?? ""}`} className="mb-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-400">{catg.category}</h3>}
                      <ul className="divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-5">
                            <div>
                              <p data-edit={`item:${item.id}:name`} style={serif} className="text-lg text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-xl text-sm leading-relaxed text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap text-sm font-semibold" style={{ color: TAUPE }}>{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
              <div className="pt-4 text-center">
                <a href={book} className="inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90" style={{ background: INK }}>Book an appointment</a>
              </div>
            </div>
          ) : <p className="text-neutral-500">Our treatment menu is coming soon.</p>}
        </section>
      </>,
    );
  }

  // ---- RESERVATIONS / BOOK ----
  if (page === "reservations") {
    return shell(
      <>
        {banner("Book now", "Schedule your consultation")}
        <section className="mx-auto max-w-xl px-8 py-20">
          <p className="mb-8 text-center text-[16px] leading-[1.8] text-neutral-700">
            Tell us a little about what you are looking for and we will be in touch to arrange your personalised consultation.
          </p>
          {externalBook && (
            <p className="mb-8 text-center text-sm text-neutral-500">
              Prefer to book online?{" "}
              <a href={externalBook} target="_blank" rel="noreferrer" className="font-semibold underline" style={{ color: TAUPE }}>Use our booking system</a>.
            </p>
          )}
          <AureliaBooking tenantId={tenant.id} services={serviceNames} />
        </section>
      </>,
    );
  }

  // ---- ABOUT ----
  if (page === "about") {
    return shell(
      <>
        {banner("About us", "Personalised care by certified experts")}
        <section className="mx-auto max-w-3xl px-8 py-20">
          {content.about ? <p data-edit="content.about" className="text-[17px] leading-[1.9] text-neutral-700">{content.about}</p> : <p className="text-neutral-500">Our story is coming soon.</p>}
          <div className="mt-14 border-t border-neutral-200 pt-12">
            <h3 style={serif} className="text-2xl">Why choose us</h3>
            <div className="mt-6">
              <Accordion items={WHY_US.map((w) => ({ title: w.title, body: w.body }))} />
            </div>
          </div>
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
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </section>
        ) : <p className="mx-auto max-w-6xl px-8 py-20 text-neutral-500">Photos coming soon.</p>}
      </>,
    );
  }

  // ---- CONTACT ----
  if (page === "contact") {
    return shell(
      <>
        {banner("Contact", "Get in touch")}
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
              <a href={content.map_url} target="_blank" rel="noreferrer" className="mt-7 inline-flex border px-7 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Get directions</a>
            )}
          </div>
          {contactOn && (
            <div>
              <SiteContactForms
                tenantId={tenant.id}
                booking={false}
                contact
                contactTitle="Send us a message"
                contactBlurb="Have a question before you book? Our team is happy to help."
                contactCta="Send message"
                theme={{ card: "#ffffff", cardBorder: "#e5e1da", heading: "#16140f", button: "#16140f", buttonText: "#ffffff", fieldBorder: "#d8d2c8", radius: "0", font: "var(--font-fraunces)" }}
              />
            </div>
          )}
        </section>
      </>,
    );
  }

  // ---- HOME ----
  const treatmentCards = items.slice(0, 8).map((it) => ({ id: it.id, title: it.name, subtitle: it.price ?? undefined, image: gallery[items.indexOf(it) % Math.max(1, gallery.length)]?.image_url }));
  const concernSrc = items.length > 8 ? items.slice(8, 16) : items.slice(0, 8);
  const concernCards = concernSrc.map((it, idx) => ({ id: `c-${it.id}`, title: it.category ?? it.name, image: gallery[(idx + 1) % Math.max(1, gallery.length)]?.image_url }));

  return shell(
    <>
      {/* hero — video with image fallback */}
      <section className="relative isolate flex min-h-[100vh] flex-col overflow-hidden">
        {video ? (
          <video src={video} autoPlay muted loop playsInline poster={hero} className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img data-edit-image="hero" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#3a352c,#16140f)" }} />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/35" />
        <div className="relative z-10 mt-auto px-6 pb-16 sm:px-12 sm:pb-20">
          <div className="max-w-2xl">
            {content.tagline && <p data-edit="content.tagline" className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/80">{content.tagline}</p>}
            <h1 style={serif} className="mt-4 text-4xl font-medium leading-[1.05] text-white [text-shadow:0_2px_24px_rgba(0,0,0,0.5)] sm:text-5xl lg:text-6xl">
              Your trusted aesthetic experts
            </h1>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85">
              Expert anti-wrinkle, filler, skinbooster and skin-rejuvenation treatments, tailored to you in a calm, certified clinical setting.
            </p>
            <a href={book} className="mt-8 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 shadow-2xl transition hover:opacity-90" style={{ background: BONE }}>Book an appointment</a>
            <div className="mt-8 flex flex-wrap items-center gap-3 text-white/90">
              <Stars light />
              <span className="text-sm text-white/80">Rated excellent by our patients</span>
            </div>
          </div>
        </div>
      </section>

      {/* about split */}
      {content.about && (
        <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>About us</p>
            <h2 style={serif} className="mt-4 text-3xl leading-tight sm:text-4xl">Personalised care by certified aesthetic experts</h2>
            <p data-edit="content.about" className="mt-6 text-[16px] leading-[1.9] text-neutral-600">{content.about}</p>
            <a href={href("about")} className="mt-7 inline-flex border px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:bg-neutral-900 hover:text-white" style={{ borderColor: INK, color: INK }}>Learn more</a>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden">
            {gallery[0]?.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={gallery[0].image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : hero ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#cdc4b6,#8c8170)" }} />
            )}
          </div>
        </section>
      )}

      {/* treatments carousel (dark) */}
      {treatmentCards.length > 0 && (
        <section style={{ background: INK }} className="text-white">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>Treatments</p>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h2 style={serif} className="max-w-xl text-3xl leading-tight sm:text-4xl">Expert-led aesthetic services tailored to you</h2>
              <a href={href("services")} className="text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: "#e8d9bf" }}>View all treatments →</a>
            </div>
            <div className="mt-12">
              <PhotoCarousel items={treatmentCards} bookHref={book} showPrice />
            </div>
          </div>
        </section>
      )}

      {/* why choose us — accordion over image */}
      <section className="mx-auto grid max-w-6xl items-center gap-12 px-8 py-24 lg:grid-cols-2 lg:gap-16">
        <div className="relative order-2 hidden aspect-[3/4] overflow-hidden lg:order-1 lg:block">
          {gallery[1]?.image_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img loading="lazy" decoding="async" src={gallery[1].image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#cdc4b6,#8c8170)" }} />
          )}
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>Why choose us</p>
          <h2 style={serif} className="mt-4 text-3xl leading-tight sm:text-4xl">Care you can trust</h2>
          <div className="mt-8">
            <Accordion items={WHY_US.map((w) => ({ title: w.title, body: w.body }))} />
          </div>
        </div>
      </section>

      {/* concerns we treat carousel */}
      {concernCards.length > 0 && (
        <section style={{ background: BONE }}>
          <div className="mx-auto max-w-6xl px-8 py-24">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>What we treat</p>
            <h2 style={serif} className="mt-3 max-w-xl text-3xl leading-tight sm:text-4xl">Concerns we treat with expertise and care</h2>
            <div className="mt-12">
              <PhotoCarousel items={concernCards} bookHref={book} />
            </div>
          </div>
        </section>
      )}

      {/* how it works — step accordion */}
      <section className="mx-auto max-w-3xl px-8 py-24">
        <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>The journey</p>
        <h2 style={serif} className="mt-3 text-3xl leading-tight sm:text-4xl">How does it work?</h2>
        <div className="mt-9">
          <Accordion
            items={[
              { title: "Book your consultation", body: <>Start by getting in touch or use our quick online booking form. We offer flexible scheduling to accommodate your needs.</> },
              { title: "Personalised consultation", body: <>We assess your concerns and goals, talk through your options honestly, and design a treatment plan tailored to you.</> },
              { title: "Treatment day", body: <>Relax in our calm clinical setting. We carry out your treatment with care and guide you through aftercare so results last.</> },
            ]}
          />
        </div>
      </section>

      {/* dedicated team carousel (dark) */}
      {team.length > 0 && (
        <section style={{ background: INK }} className="text-white">
          <div className="mx-auto max-w-6xl px-8 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>Our team</p>
                <h2 style={serif} className="mt-3 max-w-xl text-3xl leading-tight sm:text-4xl">Our dedicated aesthetic team</h2>
              </div>
              {content.about && <p className="max-w-sm text-sm leading-relaxed text-white/65">Experienced, certified practitioners who combine clinical expertise with genuine, personalised care.</p>}
            </div>
            <div className="mt-12">
              <TeamCarousel team={team} />
            </div>
          </div>
        </section>
      )}

      {/* testimonials carousel */}
      <section style={{ background: BONE }}>
        <div className="mx-auto max-w-6xl px-8 py-24">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: TAUPE }}>Testimonials</p>
          <h2 style={serif} className="mt-3 text-center text-3xl leading-tight sm:text-4xl">Hear from our patients</h2>
          <div className="mt-14">
            <TestimonialCarousel items={TESTIMONIALS} />
          </div>
        </div>
      </section>

      {/* CTA band over image */}
      <section className="relative isolate overflow-hidden">
        {gallery[2]?.image_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={gallery[2].image_url} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg,#3a352c,#16140f)" }} />
        )}
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 mx-auto max-w-3xl px-8 py-28 text-center text-white">
          <h2 style={serif} className="text-3xl leading-tight sm:text-4xl lg:text-5xl">Schedule your personalised aesthetic consultation today</h2>
          <a href={book} className="mt-9 inline-flex px-10 py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-neutral-900 transition hover:opacity-90" style={{ background: BONE }}>Book an appointment</a>
        </div>
      </section>
    </>,
    false,
  );
}
