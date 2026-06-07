import type { TenantSite } from "@/lib/types";
import {
  AboutSection,
  ContactFooter,
  GallerySection,
  HeroButtons,
  NavItem,
  SectionHeading,
  SiteHeader,
  SiteSmoothScroll,
  cx,
  groupCatalog,
  siteRootStyle,
  tokensFor,
} from "../shared";

// "bookings" archetype — salons, barbers, beauty, clinics, fitness studios.
export default function SalonSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.booking_url || content.cta_url;
  const cta = content.cta_label ?? (book ? "Book now" : undefined);

  const nav: NavItem[] = [
    content.about && { label: "About", href: "#about" },
    groups.length > 0 && { label: "Services", href: "#services" },
    team.length > 0 && { label: "Team", href: "#team" },
    gallery.length > 0 && { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ].filter(Boolean) as NavItem[];

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
      <SiteSmoothScroll />
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={book && cta ? { label: cta, href: book } : undefined} />

      {/* Hero */}
      <section className={cx("relative isolate flex min-h-[88vh] items-center overflow-hidden", tokens.heroBase)}>
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className={cx("absolute inset-0", tokens.heroOverlay)} />
          </>
        )}
        <div className={cx("relative mx-auto w-full max-w-6xl px-6 py-28 text-white", tokens.heroAlign === "center" && "text-center")}>
          {content.tagline && (
            <p className={cx("mb-5", tokens.label === "serif" ? "font-display text-lg italic text-white/85" : "text-xs font-semibold uppercase tracking-[0.35em] text-white/80")}>
              {content.tagline}
            </p>
          )}
          <h1 className={cx("font-display max-w-3xl text-5xl text-white sm:text-7xl", tokens.heading, tokens.heroAlign === "center" && "mx-auto")}>
            {tenant.business_name}
          </h1>
          <HeroButtons
            tokens={tokens}
            primary={book && cta ? { label: cta, href: book } : groups.length ? { label: "View services", href: "#services" } : undefined}
            secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
          />
        </div>
      </section>

      <AboutSection tokens={tokens} about={content.about} kicker="Welcome" />

      {/* Services / treatments / classes */}
      {groups.length > 0 && (
        <section id="services" className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-3xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="The list" title="Services & prices" center />
            <div className="mt-14 space-y-14">
              {groups.map((section) => (
                <div key={section.section}>
                  {section.section && <h3 className={cx("font-display text-2xl", tokens.heading)}>{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-6">
                      {catg.category && <h4 className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-400">{catg.category}</h4>}
                      <ul className="divide-y divide-neutral-200">
                        {catg.items.map((item) => (
                          <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                            <div>
                              <p className="font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p className="mt-0.5 text-sm text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span className="whitespace-nowrap font-medium text-[var(--primary)]">{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {book && cta && (
              <div className="mt-14 text-center">
                <a href={book} className={cx("inline-flex bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>{cta}</a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section id="team" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading tokens={tokens} kicker="Meet us" title="The team" center />
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((m) => (
              <div key={m.id} className="text-center">
                <div className="mx-auto h-44 w-44 overflow-hidden rounded-full bg-neutral-100">
                  {m.photo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <p className="mt-5 text-lg font-medium">{m.name}</p>
                {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
                {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <GallerySection gallery={gallery} />

      <ContactFooter site={site} tokens={tokens} cta={book && cta ? { label: cta, href: book } : undefined} />
    </div>
  );
}
