import { createElement } from "react";
import { redirect } from "next/navigation";
import { getMyTenantFull } from "@/lib/my-site";
import { getPresetComponent } from "@/presets";
import { InlineEditor } from "@/components/InlineEditor";
import { DesignPanel } from "@/components/DesignPanel";
import { saveInline } from "./actions";

export const dynamic = "force-dynamic";

// Owner-only live preview of their site, renders even while it's still a
// draft (the public subdomain only shows published sites). With ?edit=1 the
// text becomes editable directly on the page.
export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ edit?: string }> }) {
  const { edit } = await searchParams;
  const site = await getMyTenantFull();
  if (!site) redirect("/login");
  const preset = createElement(getPresetComponent(site.tenant.preset), { site });

  if (edit) {
    return (
      <InlineEditor save={saveInline}>
        {preset}
        <DesignPanel
          style={site.content.style}
          primary={site.theme.primary_color || "#141414"}
          accent={site.theme.accent_color || "#c8a24a"}
          footerVariant={site.content.footer_variant}
          bodyVariant={site.content.body_variant}
        />
      </InlineEditor>
    );
  }
  return preset;
}
