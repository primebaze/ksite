import {
  CatalogCards,
  ContactFooter,
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
import { getSalonDesign } from "../salon/designs";

// Bespoke template for makeup artists & beauty pros: image-forward and
// portfolio-led — distinct from the generic bookings layout. Reuses the shared
// header/hero/footer so the on-screen editor (text, image, colours, variants)
// keeps working, but arranges the page editorially around the artist's work.
export default function BeautySite(props: PresetProps) {
  // A bespoke real-world-inspired design takes over the whole page when set.
  const Design = getSalonDesign(props.site.content.design);
  if (Design) return <Design {...props} />;

  const { site, page = "home", basePath = "", multiPage = false } = props;
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.booking_url || content.reservation_url || content.cta_url;
  const cta = content.cta_label ?? (book ? "Book your session" : undefined);
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
      catalogTitle: "Signature services",
      catalogKicker: "Services",
    });
  }

  const nav: NavItem[] = [
    content.about && { label: "About", href: "#about" },
    groups.length > 0 && { label: "Services", href: "#services" },
    gallery.length > 0 && { label: "Portfolio", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ].filter(Boolean) as NavItem[];

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
      <SiteSmoothScroll />
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={ctaObj} />

      {heroEl}

      {/* About the artist — editorial split with portrait */}
      {content.about && (
        <section id="about" className="mx-auto max-w-5xl px-6 py-24">
          <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">The artist</p>
              <p
                data-edit="content.about"
                className={cx("mt-6 font-display text-2xl leading-relaxed text-neutral-800 sm:text-[1.9rem] sm:leading-[1.5]", tokens.serif ? "font-normal" : "font-light")}
              >
                {content.about}
              </p>
              {book && cta && (
                <a href={book} className={cx("mt-8 inline-flex bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>
                  {cta}
                </a>
              )}
            </div>
            {hero && (
              // eslint-disable-next-line @next/next/no-img-element
              <img data-edit-image="hero" src={hero} alt="" className={cx("aspect-[4/5] w-full object-cover shadow-[0_30px_70px_-30px_rgba(0,0,0,0.45)]", tokens.card)} />
            )}
          </div>
        </section>
      )}

      {/* Signature services — premium cards */}
      {groups.length > 0 && (
        <section id="services" className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="Services" title="Signature services" center />
            <CatalogCards groups={groups} tokens={tokens} />
            {book && cta && (
              <div className="mt-14 text-center">
                <a href={book} className={cx("inline-flex bg-[var(--primary)] px-8 py-3.5 text-sm font-semibold text-white transition active:scale-[0.98] hover:opacity-90", tokens.btn)}>
                  {cta}
                </a>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Portfolio — masonry */}
      {gallery.length > 0 && (
        <section id="gallery" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading tokens={tokens} kicker="Portfolio" title="Recent work" center />
          <div className="mt-12 columns-2 gap-3 sm:columns-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img loading="lazy" decoding="async" key={g.id} src={g.image_url} alt={g.caption ?? ""} className={cx("mb-3 w-full break-inside-avoid object-cover", tokens.card)} />
            ))}
          </div>
        </section>
      )}

      <ContactFooter site={site} tokens={tokens} cta={ctaObj} />
    </div>
  );
}
