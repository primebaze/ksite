import { redirect } from "next/navigation";
import { getMyTenantFull } from "@/lib/my-site";
import { getPresetComponent } from "@/presets";

export const dynamic = "force-dynamic";

// Owner-only live preview of their site — renders even while it's still a
// draft (the public subdomain only shows published sites). Used in the wizard's
// review step and the dashboard "Preview" link.
export default async function PreviewPage() {
  const site = await getMyTenantFull();
  if (!site) redirect("/login");
  const Preset = getPresetComponent(site.tenant.preset);
  return <Preset site={site} />;
}
