import { createElement } from "react";
import { notFound, redirect } from "next/navigation";
import { getMyTenantFull } from "@/lib/my-site";
import { getPresetComponent } from "@/presets";
import { InlineEditor } from "@/components/InlineEditor";
import { pageFromPath } from "@/lib/site-pages";
import { saveInline } from "../actions";

export const dynamic = "force-dynamic";
export const metadata: import("next").Metadata = { robots: { index: false, follow: false } };

// Owner-only multi-page preview of their site. Renders even while the site is a
// draft (the public domain only shows published sites). With ?edit=1 the page
// becomes editable; the editor keeps ?edit across nav (see InlineEditor).
export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ path?: string[] }>;
  searchParams: Promise<{ edit?: string }>;
}) {
  const { path } = await params;
  const { edit } = await searchParams;
  const page = pageFromPath(path);
  if (!page) notFound();

  const site = await getMyTenantFull();
  if (!site) redirect("/login");

  const preset = createElement(getPresetComponent(site.tenant.preset), {
    site,
    page,
    basePath: "/preview",
    multiPage: true,
  });

  if (!edit) return preset;

  return (
    <InlineEditor
      save={saveInline}
      design={{
        style: site.content.style,
        primary: site.theme.primary_color || "#141414",
        accent: site.theme.accent_color || "#c8a24a",
        footerVariant: site.content.footer_variant,
        bodyVariant: site.content.body_variant,
        bookingEnabled: site.content.booking_enabled !== false,
        contactEnabled: site.content.contact_form_enabled !== false,
      }}
    >
      {preset}
    </InlineEditor>
  );
}
