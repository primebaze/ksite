import type { Metadata } from "next";
import { createElement } from "react";
import { notFound } from "next/navigation";
import { getSiteByHost } from "@/lib/tenant";
import { getPresetComponent } from "@/presets";
import HoldingPage from "./HoldingPage";

interface Props {
  params: Promise<{ host: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { host } = await params;
  const site = await getSiteByHost(host);
  if (!site) return { title: "Site not found" };
  const { tenant } = site;
  return {
    title: tenant.meta_title ?? tenant.business_name,
    description: tenant.meta_description ?? site.content.tagline ?? undefined,
    icons: tenant.favicon_url ? { icon: tenant.favicon_url } : undefined,
    openGraph: {
      title: tenant.meta_title ?? tenant.business_name,
      description: tenant.meta_description ?? undefined,
      images: tenant.og_image_url ? [tenant.og_image_url] : undefined,
    },
  };
}

export default async function SitePage({ params }: Props) {
  const { host } = await params;
  const site = await getSiteByHost(host);

  if (!site) notFound();

  // Gate on plan status + publish state (Phase 5). Non-paying / unpublished
  // tenants show a holding page instead of the live site.
  const { plan_status, published } = site.tenant;
  if (!published || plan_status === "suspended" || plan_status === "canceled") {
    return <HoldingPage businessName={site.tenant.business_name} />;
  }

  return createElement(getPresetComponent(site.tenant.preset), { site });
}
