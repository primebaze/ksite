"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { STEPS, stepIndex } from "./steps";
import {
  deleteMyCatalogItem,
  getMyTenantFull,
  updateMyContent,
  updateMyTenant,
  updateMyTheme,
  upsertMyCatalogItem,
} from "@/lib/my-site";
import type { SiteContent } from "@/lib/types";

// Save a "fields" step, then move to the next screen.
export async function saveStep(formData: FormData) {
  const key = String(formData.get("__step"));
  const idx = stepIndex(key);
  const step = STEPS[idx];

  if (step?.kind === "fields") {
    const tenant: Record<string, string> = {};
    const theme: Record<string, string> = {};
    const content: Record<string, string | undefined> = {};
    for (const f of step.fields ?? []) {
      const v = String(formData.get(f.name) ?? "").trim();
      if (f.source === "tenant") tenant[f.name] = v;
      else if (f.source === "theme") theme[f.name] = v || (f.name === "font" ? "sans-serif" : "#111111");
      else content[f.name] = v || undefined;
    }
    if (Object.keys(tenant).length) await updateMyTenant(tenant as never);
    if (Object.keys(theme).length) await updateMyTheme(theme as never);
    if (Object.keys(content).length) {
      const site = await getMyTenantFull();
      await updateMyContent({ ...(site?.content ?? {}), ...content } as SiteContent);
    }
  }

  const next = STEPS[idx + 1];
  redirect(next ? `/dashboard/setup/${next.key}` : "/dashboard");
}

// Menu step — add / remove an item, stay on the menu step.
export async function addMenuItem(formData: FormData) {
  await upsertMyCatalogItem({
    section: null,
    category: null,
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    price: String(formData.get("price") ?? "").trim() || null,
    is_available: true,
    sort_order: Number(formData.get("sort_order") ?? 0),
  });
  revalidatePath("/dashboard/setup/menu");
}

export async function removeMenuItem(formData: FormData) {
  await deleteMyCatalogItem(String(formData.get("item_id")));
  revalidatePath("/dashboard/setup/menu");
}
