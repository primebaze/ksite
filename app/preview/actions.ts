"use server";

import { revalidatePath } from "next/cache";
import {
  getMyTenantFull,
  updateMyContent,
  updateMyTenant,
  updateMyTheme,
  upsertMyCatalogItem,
} from "@/lib/my-site";
import type { CatalogItem, SiteContent, Theme } from "@/lib/types";
import { isHexColor } from "@/lib/palettes";

const STYLES = ["editorial", "bold", "minimal", "warm", "luxe", "classic"];

// Apply a design change from the on-screen Design panel: switch the overall
// look (style) and/or the brand colours. Client-scoped via RLS.
export async function saveDesign(input: {
  style?: string;
  primary?: string;
  accent?: string;
  footer_variant?: SiteContent["footer_variant"];
  body_variant?: SiteContent["body_variant"];
}): Promise<{ ok: boolean }> {
  const site = await getMyTenantFull();
  if (!site) return { ok: false };

  const contentPatch: Partial<SiteContent> = {};
  if (input.style && STYLES.includes(input.style)) contentPatch.style = input.style as SiteContent["style"];
  if (input.footer_variant === "detailed" || input.footer_variant === "minimal") contentPatch.footer_variant = input.footer_variant;
  if (input.body_variant === "list" || input.body_variant === "cards") contentPatch.body_variant = input.body_variant;
  if (Object.keys(contentPatch).length) {
    await updateMyContent({ ...site.content, ...contentPatch });
  }

  const theme: Partial<Theme> = {};
  if (input.primary && isHexColor(input.primary)) theme.primary_color = input.primary;
  if (input.accent && isHexColor(input.accent)) theme.accent_color = input.accent;
  if (Object.keys(theme).length) await updateMyTheme(theme);

  revalidatePath("/preview");
  return { ok: true };
}

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
