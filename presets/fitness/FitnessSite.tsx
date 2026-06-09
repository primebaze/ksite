import type { TenantSite } from "@/lib/types";
import {
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
} from "../shared";

// Bespoke template for gyms, studios and trainers: energetic and
// class/membership-led. Reuses the shared header/hero/footer so the on-screen
// editor keeps working, arranged around classes and a strong join CTA.
export default function FitnessSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const hero = content.hero_image_url;
  const book = content.booking_url || content.reservation_url || content.cta_url;
  const cta = content.cta_label ?? (book ? "Start training" : undefined);

  const nav: NavItem[] = [
    content.about && { label: "About", href: "#about" },
    groups.length > 0 && { label: "Classes", href: "#classes" },
    gallery.length > 0 && { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ].filter(Boolean) as NavItem[];

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
      <SiteSmoothScroll />
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={book && cta ? { label: cta, href: book } : undefined} />

      <Hero
        tokens={tokens}
        kicker={content.tagline}
        kickerEdit="content.tagline"
        title={tenant.business_name}
        titleEdit="tenant.business_name"
        image={hero}
        video={content.hero_video_url}
        primary={book && cta ? { label: cta, href: book } : groups.length ? { label: "See classes", href: "#classes" } : undefined}
        secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
        badges={content.accreditations}
      />

      {/* Intro */}
      {content.about && (
        <section id="about" className="mx-auto max-w-4xl px-6 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--primary)]">Why train with us</p>
          <p
            data-edit="content.about"
            className={cx("mx-auto mt-6 max-w-2xl font-display text-2xl leading-relaxed text-neutral-800 sm:text-[2rem] sm:leading-[1.4]", tokens.serif ? "font-normal" : "font-light")}
          >
            {content.about}
          </p>
        </section>
      )}

      {/* Classes & memberships — cards */}
      {groups.length > 0 && (
        <section id="classes" className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="Timetable" title="Classes & memberships" center />
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

      <GallerySection gallery={gallery} />

      <ContactFooter site={site} tokens={tokens} cta={book && cta ? { label: cta, href: book } : undefined} />
    </div>
  );
}
