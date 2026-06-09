import {
  AboutSection,
  CatalogCards,
  ContactFooter,
  GallerySection,
  Hero,
  NavItem,
  SectionHeading,
  SiteHeader,
  SiteSmoothScroll,
  cx,
  groupCatalog,
  renderMultiPage,
  siteRootStyle,
  tokensFor,
} from "../shared";
import { pageHref, type PresetProps } from "@/lib/site-pages";

// "bookings" archetype: salons, barbers, beauty, clinics, fitness studios.
export default function SalonSite({ site, page = "home", basePath = "", multiPage = false }: PresetProps) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.booking_url || content.cta_url;
  const cta = content.cta_label ?? (book ? "Book now" : undefined);
  const ctaObj = book && cta ? { label: cta, href: book } : undefined;

  const heroEl = (
    <Hero
      tokens={tokens}
      kicker={content.tagline}
      kickerEdit="content.tagline"
      title={tenant.business_name}
      titleEdit="tenant.business_name"
      image={hero}
      video={content.hero_video_url}
      primary={ctaObj ?? (groups.length ? { label: "View services", href: multiPage ? pageHref(basePath, "services") : "#services" } : undefined)}
      secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
    />
  );

  if (multiPage) {
    return renderMultiPage({
      site,
      tokens,
      page,
      basePath,
      cta: ctaObj,
      heroEl,
      groups,
      about: content.about,
      catalogLabel: "Services",
      catalogTitle: "Services & prices",
      catalogKicker: "The list",
    });
  }

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
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={ctaObj} />

      {heroEl}

      <AboutSection tokens={tokens} about={content.about} kicker="Welcome" />

      {/* Services / treatments / classes */}
      {groups.length > 0 && (
        <section id="services" className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-3xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="The list" title="Services & prices" center />
            {(content.body_variant ?? tokens.body) === "cards" ? (
              <CatalogCards groups={groups} tokens={tokens} />
            ) : (
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
                              <p data-edit={`item:${item.id}:name`} className="font-medium text-neutral-900">{item.name}</p>
                              {item.description && <p data-edit={`item:${item.id}:description`} className="mt-0.5 text-sm text-neutral-500">{item.description}</p>}
                            </div>
                            {item.price && <span data-edit={`item:${item.id}:price`} className="whitespace-nowrap font-medium text-[var(--primary)]">{item.price}</span>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            )}
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

      <ContactFooter site={site} tokens={tokens} cta={ctaObj} />
    </div>
  );
}
