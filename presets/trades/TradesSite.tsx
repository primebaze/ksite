import type { TenantSite } from "@/lib/types";
import {
  AboutSection,
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

// "services" archetype — trades, home, automotive, professional, retail, events.
export default function TradesSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const tokens = tokensFor(content, theme);
  const groups = groupCatalog(catalog);
  const services = groups.flatMap((g) => g.categories.flatMap((c) => c.items));
  const hero = content.hero_image_url;
  const cta = content.cta_label ?? "Get a quote";
  const ctaUrl = content.cta_url ?? (content.phone ? `tel:${content.phone}` : "#contact");
  const phone = content.emergency_phone || content.phone;

  const nav: NavItem[] = [
    content.about && { label: "About", href: "#about" },
    services.length > 0 && { label: "Services", href: "#services" },
    content.service_areas?.length && { label: "Areas", href: "#areas" },
    gallery.length > 0 && { label: "Work", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ].filter(Boolean) as NavItem[];

  return (
    <div id="top" style={siteRootStyle(theme, tokens)} className="font-body min-h-screen bg-white text-neutral-900">
      <SiteSmoothScroll />
      <SiteHeader site={site} tokens={tokens} nav={nav} cta={phone ? { label: `Call ${phone}`, href: `tel:${phone}` } : { label: cta, href: ctaUrl }} />

      <Hero
        tokens={tokens}
        title={content.tagline ?? tenant.business_name}
        titleEdit="content.tagline"
        subtitle={tenant.business_name}
        subtitleEdit="tenant.business_name"
        image={hero}
        badges={content.accreditations}
        primary={{ label: cta, href: ctaUrl }}
        secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
      />

      <AboutSection tokens={tokens} about={content.about} kicker="About us" />

      {/* Services */}
      {services.length > 0 && (
        <section id="services" className={cx("border-y border-black/5", tokens.tint)}>
          <div className="mx-auto max-w-6xl px-6 py-24">
            <SectionHeading tokens={tokens} kicker="What we do" title="Our services" />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.id} className={cx("border border-black/5 bg-white p-7 transition hover:-translate-y-1 hover:shadow-xl", tokens.card)}>
                  <h3 data-edit={`item:${s.id}:name`} className="font-display text-lg font-semibold text-[var(--primary)]">{s.name}</h3>
                  {s.description && <p data-edit={`item:${s.id}:description`} className="mt-2 text-sm text-neutral-600">{s.description}</p>}
                  {s.price && <p data-edit={`item:${s.id}:price`} className="mt-4 text-sm font-semibold text-neutral-900">{s.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section id="areas" className="mx-auto max-w-6xl px-6 py-24">
          <SectionHeading tokens={tokens} kicker="Where we work" title="Areas we cover" />
          <div className="mt-8 flex flex-wrap gap-2">
            {content.service_areas.map((a) => (
              <span key={a} className={cx("border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm text-neutral-700", tokens.btn)}>{a}</span>
            ))}
          </div>
        </section>
      )}

      <GallerySection gallery={gallery} />

      <ContactFooter site={site} tokens={tokens} cta={{ label: cta, href: ctaUrl }} />
    </div>
  );
}
