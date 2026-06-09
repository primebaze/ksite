import type { ReactNode } from "react";
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
  siteRootStyle,
  tokensFor,
  type StyleTokens,
} from "../shared";
import type { CatalogGroup } from "../shared";
import type { PresetProps } from "@/lib/site-pages";
import { pageHref } from "@/lib/site-pages";
import type { CatalogItem } from "@/lib/types";

// "menu" archetype: restaurants, cafés, bars, bakeries and the rest of food &
// drink. Renders as a single-page site by default; with `multiPage`, the nav
// opens real pages (Menu / About / Gallery / Contact) under basePath.
export default function RestaurantSite({ site, page = "home", basePath = "", multiPage = false }: PresetProps) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const sections = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.reservation_url || content.cta_url;
  const cta = content.cta_label ?? (book ? "Book a table" : undefined);
  const ctaObj = book && cta ? { label: cta, href: book } : undefined;

  // Reusable menu block (shared by the single-page render + the /menu page).
  const menuBlock =
    sections.length > 0 ? (
      <>
        {content.body_variant === "cards" ? (
          <CatalogCards groups={sections} tokens={tokens} />
        ) : (
          <div className="mt-14 space-y-16">
            {sections.map((section) => (
              <MenuSection key={section.section} section={section} tokens={tokens} />
            ))}
          </div>
        )}
        {content.ordering_links && content.ordering_links.length > 0 && (
          <div className="mt-16 flex flex-wrap justify-center gap-3">
            {content.ordering_links.map((l) => (
              <a key={l.url} href={l.url} className={cx("inline-flex border border-neutral-300 px-6 py-3 text-sm font-medium text-neutral-800 transition hover:border-[var(--primary)] hover:text-[var(--primary)]", tokens.btn)}>
                {l.label}{l.commission_free ? " · commission-free" : ""}
              </a>
            ))}
          </div>
        )}
      </>
    ) : null;

  const heroEl = (
    <Hero
      tokens={tokens}
      kicker={content.cuisine_type}
      kickerEdit="content.cuisine_type"
      title={tenant.business_name}
      titleEdit="tenant.business_name"
      subtitle={content.tagline}
      subtitleEdit="content.tagline"
      image={hero}
      video={content.hero_video_url}
      primary={ctaObj ?? (sections.length ? { label: "View the menu", href: multiPage ? pageHref(basePath, "menu") : "#menu" } : undefined)}
      secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
    />
  );

  // ---- SINGLE-PAGE (default, unchanged behaviour) ----
  if (!multiPage) {
    const nav: NavItem[] = [
      content.about && { label: "About", href: "#about" },
      sections.length > 0 && { label: "Menu", href: "#menu" },
      gallery.length > 0 && { label: "Gallery", href: "#gallery" },
      { label: "Visit", href: "#contact" },
    ].filter(Boolean) as NavItem[];

    return (
      <div id="top" style={siteRootStyle(theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
        <SiteSmoothScroll />
        <SiteHeader site={site} tokens={tokens} nav={nav} cta={ctaObj} />
        {heroEl}
        <AboutSection tokens={tokens} about={content.about} kicker="Our story" />
        {sections.length > 0 && (
          <section id="menu" className={cx("border-y border-black/5", tokens.tint)}>
            <div className="mx-auto max-w-3xl px-6 py-24">
              <SectionHeading tokens={tokens} kicker="What's cooking" title="The menu" center />
              {menuBlock}
            </div>
          </section>
        )}
        <GallerySection gallery={gallery} />
        <ContactFooter site={site} tokens={tokens} cta={ctaObj} />
      </div>
    );
  }

  // ---- MULTI-PAGE: nav opens real routes under basePath ----
  const nav: NavItem[] = [
    sections.length > 0 && { label: "Menu", href: pageHref(basePath, "menu") },
    content.about && { label: "About", href: pageHref(basePath, "about") },
    gallery.length > 0 && { label: "Gallery", href: pageHref(basePath, "gallery") },
    { label: "Visit", href: pageHref(basePath, "contact") },
  ].filter(Boolean) as NavItem[];

  const shell = (children: ReactNode) => (
    <div id="top" style={siteRootStyle(theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={ctaObj} home={pageHref(basePath, "home")} />
      {children}
      <ContactFooter site={site} tokens={tokens} cta={ctaObj} />
    </div>
  );

  if (page === "menu") {
    return shell(
      <section className="mx-auto max-w-3xl px-6 py-20 sm:py-28">
        <SectionHeading tokens={tokens} kicker="What's cooking" title="The menu" center />
        {menuBlock}
      </section>,
    );
  }
  if (page === "about") {
    return shell(<AboutSection tokens={tokens} about={content.about} kicker="Our story" />);
  }
  if (page === "gallery") {
    return shell(
      <div className="py-10">
        <GallerySection gallery={gallery} />
      </div>,
    );
  }
  if (page === "contact") {
    return shell(
      <div className="mx-auto max-w-6xl px-6 pt-20 text-center sm:pt-28">
        <SectionHeading tokens={tokens} kicker="Visit us" title="Come and see us" center />
      </div>,
    );
  }

  // home — rich landing: hero, intro, featured menu, gallery, closing CTA
  const featuredItems = sections.flatMap((s) => s.categories.flatMap((c) => c.items)).slice(0, 6);
  const featuredGroups: CatalogGroup[] = [{ section: "", categories: [{ category: null, items: featuredItems }] }];

  return shell(
    <>
      {heroEl}

      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--primary)]">Welcome</p>
          <p
            data-edit="content.about"
            className={cx("mt-6 font-display text-2xl leading-relaxed text-neutral-800 sm:text-[2.1rem] sm:leading-[1.4]", tokens.serif ? "font-normal" : "font-light")}
          >
            {content.about}
          </p>
        </section>
      )}

      {sections.length > 0 && (
        <section className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading tokens={tokens} kicker="What's cooking" title="Menu highlights" />
              <a href={pageHref(basePath, "menu")} className="shrink-0 text-sm font-medium text-[var(--primary)] underline-offset-4 hover:underline">View full menu →</a>
            </div>
            <CatalogCards groups={featuredGroups} tokens={tokens} />
          </div>
        </section>
      )}

      {gallery.length > 0 && <GallerySection gallery={gallery} />}

      {ctaObj && (
        <section className="bg-[var(--primary)] text-white">
          <div className="mx-auto max-w-3xl px-6 py-24 text-center sm:py-28">
            <h2 className={cx("font-display text-4xl font-semibold tracking-tight sm:text-5xl", tokens.heading)}>Hungry yet?</h2>
            <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/65">Reserve your table and we&apos;ll see you soon.</p>
            <a href={ctaObj.href} className={cx("mt-9 inline-flex bg-white px-8 py-4 text-sm font-semibold text-[var(--primary)] transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>{ctaObj.label}</a>
          </div>
        </section>
      )}
    </>,
  );
}

function MenuSection({ section, tokens }: { section: CatalogGroup; tokens: StyleTokens }) {
  return (
    <div>
      {section.section && <h3 className={cx("font-display text-center text-2xl", tokens.heading)}>{section.section}</h3>}
      {section.categories.map((catg) => (
        <div key={catg.category ?? "_"} className="mt-8">
          {catg.category && <h4 className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-neutral-400">{catg.category}</h4>}
          <ul className="space-y-6">
            {catg.items.map((item: CatalogItem) => (
              <li key={item.id}>
                <div className="flex items-baseline gap-3">
                  <span data-edit={`item:${item.id}:name`} className="font-display text-lg text-neutral-900">{item.name}</span>
                  <span className="mb-1 flex-1 border-b border-dotted border-neutral-300" />
                  {item.price && <span data-edit={`item:${item.id}:price`} className="font-medium text-[var(--primary)]">{item.price}</span>}
                </div>
                {item.description && <p data-edit={`item:${item.id}:description`} className="mt-1 max-w-md text-sm text-neutral-500">{item.description}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
