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
          <h1 data-edit="content.tagline" className={cx("font-display max-w-3xl text-5xl text-white sm:text-6xl", tokens.heading, tokens.heroAlign === "center" && "mx-auto")}>
            {content.tagline ?? tenant.business_name}
          </h1>
          <p data-edit="tenant.business_name" className={cx("mt-4 text-lg text-white/75", tokens.heroAlign === "center" && "mx-auto")}>{tenant.business_name}</p>
          <HeroButtons
            tokens={tokens}
            primary={{ label: cta, href: ctaUrl }}
            secondary={content.phone ? { label: `Call ${content.phone}`, href: `tel:${content.phone}` } : undefined}
          />
          {content.accreditations && content.accreditations.length > 0 && (
            <div className={cx("mt-10 flex flex-wrap gap-2", tokens.heroAlign === "center" && "justify-center")}>
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur">✓ {a}</span>
              ))}
            </div>
          )}
        </div>
      </section>

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
