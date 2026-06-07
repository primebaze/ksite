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

// "menu" archetype — restaurants, cafés, bars, bakeries and the rest of food & drink.
export default function RestaurantSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const sections = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.reservation_url || content.cta_url;
  const cta = content.cta_label ?? (book ? "Book a table" : undefined);

  const nav: NavItem[] = [
    content.about && { label: "About", href: "#about" },
    sections.length > 0 && { label: "Menu", href: "#menu" },
    gallery.length > 0 && { label: "Gallery", href: "#gallery" },
    { label: "Visit", href: "#contact" },
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
          {content.cuisine_type && (
            <p className={cx("mb-5", tokens.label === "serif" ? "font-display text-lg italic text-white/85" : "text-xs font-semibold uppercase tracking-[0.35em] text-white/80")}>
              {content.cuisine_type}
            </p>
          )}
          <h1 className={cx("font-display max-w-3xl text-5xl text-white sm:text-7xl", tokens.heading, tokens.heroAlign === "center" && "mx-auto")}>
            {tenant.business_name}
          </h1>
          {content.tagline && (
            <p className={cx("mt-5 max-w-xl text-lg text-white/80 sm:text-xl", tokens.heroAlign === "center" && "mx-auto")}>{content.tagline}</p>
          )}
          <HeroButtons
            tokens={tokens}
            primary={book && cta ? { label: cta, href: book } : sections.length ? { label: "View the menu", href: "#menu" } : undefined}
            secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
          />
        </div>
      </section>

      <AboutSection tokens={tokens} about={content.about} kicker="Our story" />

      {/* Menu */}
      {sections.length > 0 && (
        <section id="menu" className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-3xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="What's cooking" title="The menu" center />
            <div className="mt-14 space-y-16">
              {sections.map((section) => (
                <div key={section.section}>
                  {section.section && <h3 className={cx("font-display text-center text-2xl", tokens.heading)}>{section.section}</h3>}
                  {section.categories.map((catg) => (
                    <div key={catg.category ?? "_"} className="mt-8">
                      {catg.category && <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">{catg.category}</h4>}
                      <ul className="space-y-6">
                        {catg.items.map((item) => (
                          <li key={item.id}>
                            <div className="flex items-baseline gap-3">
                              <span className="font-display text-lg text-neutral-900">{item.name}</span>
                              <span className="mb-1 flex-1 border-b border-dotted border-neutral-300" />
                              {item.price && <span className="font-medium text-[var(--primary)]">{item.price}</span>}
                            </div>
                            {item.description && <p className="mt-1 max-w-md text-sm text-neutral-500">{item.description}</p>}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            {content.ordering_links && content.ordering_links.length > 0 && (
              <div className="mt-16 flex flex-wrap justify-center gap-3">
                {content.ordering_links.map((l) => (
                  <a key={l.url} href={l.url} className={cx("inline-flex border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:border-[var(--primary)] hover:text-[var(--primary)]", tokens.btn)}>
                    {l.label}{l.commission_free ? " · commission-free" : ""}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      <GallerySection gallery={gallery} />

      <ContactFooter site={site} tokens={tokens} cta={book && cta ? { label: cta, href: book } : undefined} />
    </div>
  );
}
