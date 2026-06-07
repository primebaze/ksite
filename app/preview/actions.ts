"use server";

import { revalidatePath } from "next/cache";
import {
  getMyTenantFull,
  updateMyContent,
  updateMyTenant,
  upsertMyCatalogItem,
} from "@/lib/my-site";
import type { CatalogItem, SiteContent } from "@/lib/types";

// Persist an on-screen text edit. Keys are "tenant.business_name",
// "content.<field>" or "item:<id>:<field>".
export async function saveInline(changes: Record<string, string>): Promise<{ ok: boolean }> {
  const site = await getMyTenantFull();
  if (!site) return { ok: false };

  const content: Record<string, unknown> = { ...site.content };
  const tenant: Record<string, string> = {};
  let contentDirty = false;
  let tenantDirty = false;

  for (const [key, raw] of Object.entries(changes)) {
    const val = raw.trim();
    if (!val) continue;
    if (key === "tenant.business_name") {
      tenant.business_name = val;
      tenantDirty = true;
    } else if (key.startsWith("content.")) {
      content[key.slice("content.".length)] = val;
      contentDirty = true;
    } else if (key.startsWith("item:")) {
      const [, id, field] = key.split(":");
      if (id && ["name", "description", "price"].includes(field)) {
        await upsertMyCatalogItem({ id, [field]: val } as Partial<CatalogItem> & { id: string });
      }
    }
  }

  if (tenantDirty) await updateMyTenant(tenant as Parameters<typeof updateMyTenant>[0]);
  if (contentDirty) await updateMyContent(content as SiteContent);
  revalidatePath("/preview");
  return { ok: true };
}
