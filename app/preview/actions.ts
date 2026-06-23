"use server";

import { revalidatePath } from "next/cache";
import {
  deleteMyCatalogItem,
  getMyTenantFull,
  patchMyCatalogItem,
  updateMyContent,
  updateMyTenant,
  updateMyTheme,
  upsertMyCatalogItem,
} from "@/lib/my-site";
import type { SiteContent, Theme } from "@/lib/types";
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
  booking_enabled?: boolean;
  contact_form_enabled?: boolean;
}): Promise<{ ok: boolean }> {
  const site = await getMyTenantFull();
  if (!site) return { ok: false };

  const contentPatch: Partial<SiteContent> = {};
  if (input.style && STYLES.includes(input.style)) contentPatch.style = input.style as SiteContent["style"];
  if (input.footer_variant === "detailed" || input.footer_variant === "minimal") contentPatch.footer_variant = input.footer_variant;
  if (input.body_variant === "list" || input.body_variant === "cards") contentPatch.body_variant = input.body_variant;
  if (typeof input.booking_enabled === "boolean") contentPatch.booking_enabled = input.booking_enabled;
  if (typeof input.contact_form_enabled === "boolean") contentPatch.contact_form_enabled = input.contact_form_enabled;
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
    } else if (key.startsWith("hours:")) {
      // "hours:<index>:<day|open>" — edit one cell of the opening-hours list.
      const [, idxRaw, field] = key.split(":");
      const i = Number(idxRaw);
      const hours = [...((content.hours as SiteContent["hours"]) ?? [])];
      if (Number.isInteger(i) && hours[i] && (field === "day" || field === "open")) {
        hours[i] = { ...hours[i], [field]: val };
        content.hours = hours;
        contentDirty = true;
      }
    } else if (key.startsWith("item:")) {
      const [, id, field] = key.split(":");
      if (id && (field === "name" || field === "description" || field === "price")) {
        // Patch ONLY the edited field — upserting a partial would null out the
        // item's other columns (price, description, section).
        await patchMyCatalogItem(id, { [field]: val });
      }
    }
  }

  if (tenantDirty) await updateMyTenant(tenant as Parameters<typeof updateMyTenant>[0]);
  if (contentDirty) await updateMyContent(content as SiteContent);
  revalidatePath("/preview");
  return { ok: true };
}

// Add a blank catalog item from the in-page editor. It inherits the first
// item's section/category so it lands in the same list, then the owner edits
// it inline. Returns ok; the editor reloads to show the new row.
export async function addInlineItem(): Promise<{ ok: boolean }> {
  const site = await getMyTenantFull();
  if (!site) return { ok: false };
  const first = site.catalog[0];
  const maxSort = site.catalog.reduce((m, c) => Math.max(m, c.sort_order ?? 0), 0);
  await upsertMyCatalogItem({
    name: "New item",
    description: "Add a short description",
    // A non-empty placeholder so the price element renders and is editable
    // inline — designs only show the price when there is one.
    price: "£0",
    section: first?.section ?? null,
    category: first?.category ?? null,
    sort_order: maxSort + 1,
  });
  revalidatePath("/preview");
  return { ok: true };
}

// Delete a catalog item from the in-page editor. RLS scopes the delete to the
// owner's own tenant, so a stray id can't touch another site.
export async function deleteInlineItem(id: string): Promise<{ ok: boolean }> {
  if (!id) return { ok: false };
  await deleteMyCatalogItem(id);
  revalidatePath("/preview");
  return { ok: true };
}
