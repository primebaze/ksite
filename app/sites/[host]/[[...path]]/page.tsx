import type { Metadata } from "next";
import { createElement } from "react";
import { notFound } from "next/navigation";
import { getSiteByHost } from "@/lib/tenant";
import { getPresetComponent } from "@/presets";
import { SiteFieldStyles } from "@/presets/shared";
import { pageFromPath } from "@/lib/site-pages";
import { archetypeFor } from "@/lib/verticals";
import { APP_DOMAIN } from "@/lib/marketing";
import { JsonLd } from "@/components/JsonLd";
import HoldingPage from "../HoldingPage";
import type { TenantSite } from "@/lib/types";

interface Props {
  params: Promise<{ host: string; path?: string[] }>;
}

// Preferred public URL for a tenant — its custom domain once live, otherwise the
// kovasite subdomain. Used as the canonical so subdomain + custom domain don't
// compete as duplicate content.
function canonicalBase(tenant: TenantSite["tenant"]): string {
  if (tenant.custom_domain && tenant.domain_status === "active") return `https://${tenant.custom_domain}`;
  return `https://${tenant.subdomain}.${APP_DOMAIN}`;
}

const SCHEMA_TYPE: Record<string, string> = {
  menu: "Restaurant",
  bookings: "HealthAndBeautyBusiness",
  services: "LocalBusiness",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { host, path } = await params;
  const site = await getSiteByHost(host);
  if (!site) return { title: "Site not found", robots: { index: false } };
  const { tenant, content } = site;
  const base = canonicalBase(tenant);
  const pagePath = path && path.length ? `/${path.join("/")}` : "/";
  const title = tenant.meta_title ?? tenant.business_name;
  const description = tenant.meta_description ?? content.tagline ?? undefined;
  const live = tenant.published && tenant.plan_status !== "suspended" && tenant.plan_status !== "canceled";
  const image = tenant.og_image_url ?? content.hero_image_url ?? undefined;
  return {
    title,
    description,
    metadataBase: new URL(base),
    alternates: { canonical: pagePath },
    icons: tenant.favicon_url ? { icon: tenant.favicon_url } : undefined,
    robots: live ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      type: "website",
      siteName: tenant.business_name,
      url: `${base}${pagePath}`,
      title,
      description,
      images: image ? [image] : undefined,
    },
    twitter: { card: image ? "summary_large_image" : "summary", title, description },
  };
}

// schema.org LocalBusiness for the tenant — strong signal for local search.
// Convert free-text hours ("Tue to Fri" / "09:00 to 19:00") into valid
// schema.org openingHours ("Tu-Fr 09:00-19:00"). Unparseable / "Closed" rows
// are dropped rather than emitting invalid data Google silently ignores.
const SCHEMA_DAY: Record<string, string> = {
  mon: "Mo", monday: "Mo", tue: "Tu", tues: "Tu", tuesday: "Tu", wed: "We", weds: "We", wednesday: "We",
  thu: "Th", thur: "Th", thurs: "Th", thursday: "Th", fri: "Fr", friday: "Fr", sat: "Sa", saturday: "Sa",
  sun: "Su", sunday: "Su",
};
function schemaOpeningHours(hours: { day?: string; open?: string }[] | undefined): string[] {
  if (!Array.isArray(hours)) return [];
  const out: string[] = [];
  for (const h of hours) {
    const openRaw = String(h?.open ?? "").trim();
    if (!openRaw || /closed/i.test(openRaw)) continue;
    const tm = openRaw.match(/(\d{1,2}:\d{2})\s*(?:to|–|—|-)\s*(\d{1,2}:\d{2})/i);
    if (!tm) continue;
    const time = `${tm[1]}-${tm[2]}`;
    const dayRaw = String(h?.day ?? "").toLowerCase().trim();
    const tokens = dayRaw.split(/\s*(?:to|–|—|-|&|and|,|\/)\s*/).map((t) => t.trim()).filter(Boolean);
    const days = tokens.map((t) => SCHEMA_DAY[t]).filter(Boolean);
    if (!days.length) continue;
    const isRange = /(\bto\b|–|—|-)/.test(dayRaw) && days.length === 2;
    out.push(`${isRange ? `${days[0]}-${days[1]}` : days.join(",")} ${time}`);
  }
  return out;
}

function tenantJsonLd(site: TenantSite, base: string) {
  const { tenant, content } = site;
  const type = SCHEMA_TYPE[archetypeFor(tenant.preset)] ?? "LocalBusiness";
  const sameAs = (content.socials ?? []).map((s) => s.url).filter(Boolean);
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": type,
    name: tenant.business_name,
    url: base,
    "@id": base,
  };
  if (content.tagline || tenant.meta_description) data.description = tenant.meta_description ?? content.tagline;
  if (tenant.og_image_url || content.hero_image_url) data.image = tenant.og_image_url ?? content.hero_image_url;
  if (content.phone) data.telephone = content.phone;
  if (content.email) data.email = content.email;
  if (content.address) data.address = { "@type": "PostalAddress", streetAddress: content.address };
  const oh = schemaOpeningHours(content.hours);
  if (oh.length) data.openingHours = oh;
  if (Array.isArray(content.service_areas) && content.service_areas.length) {
    data.areaServed = content.service_areas.filter(Boolean).map((a) => ({ "@type": "Place", name: a }));
  }
  // Reviews → rich-snippet ratings. Owner-curated testimonials; rating defaults
  // to 5 when the owner hasn't set one.
  const revs = (Array.isArray(content.reviews) ? content.reviews : []).filter((r) => r?.quote);
  if (revs.length) {
    const ratingOf = (r: { rating?: number }) => (Number(r.rating) >= 1 && Number(r.rating) <= 5 ? Number(r.rating) : 5);
    data.review = revs.map((r) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: ratingOf(r), bestRating: 5, worstRating: 1 },
      author: { "@type": "Person", name: r.name || "Customer" },
      reviewBody: r.quote,
    }));
    const avg = revs.reduce((s, r) => s + ratingOf(r), 0) / revs.length;
    data.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: Math.round(avg * 10) / 10,
      reviewCount: revs.length,
      bestRating: 5,
      worstRating: 1,
    };
  }
  if (sameAs.length) data.sameAs = sameAs;
  return data;
}

export default async function SitePage({ params }: Props) {
  const { host, path } = await params;

  const page = pageFromPath(path);
  if (!page) notFound();

  const site = await getSiteByHost(host);
  if (!site) notFound();

  // Gate on plan status + publish state. Non-paying / unpublished tenants show
  // a holding page instead of the live site.
  const { plan_status, published } = site.tenant;
  if (!published || plan_status === "suspended" || plan_status === "canceled") {
    return <HoldingPage businessName={site.tenant.business_name} />;
  }

  // Live tenant site: multi-page, nav at the domain root (basePath "").
  return (
    <>
      <SiteFieldStyles />
      <JsonLd data={tenantJsonLd(site, canonicalBase(site.tenant))} />
      {createElement(getPresetComponent(site.tenant.preset), { site, page, basePath: "", multiPage: true })}
    </>
  );
}
