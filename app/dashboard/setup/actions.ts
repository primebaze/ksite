"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { archetypeFor, catalogLabelFor, stepsFor, stepIndexIn } from "@/lib/verticals";
import {
  deleteMyCatalogItem,
  getMyTenant,
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
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const steps = stepsFor(archetypeFor(tenant.preset), catalogLabelFor(tenant.preset));
  const idx = stepIndexIn(steps, key);
  const step = steps[idx];

  if (step?.kind === "fields") {
    const tenantFields: Record<string, string> = {};
    const themeFields: Record<string, string> = {};
    const content: Record<string, unknown> = {};
    for (const f of step.fields ?? []) {
      const raw = String(formData.get(f.name) ?? "").trim();
      if (f.source === "tenant") tenantFields[f.name] = raw;
      else if (f.source === "theme") themeFields[f.name] = raw || (f.name === "font" ? "sans-serif" : "#111111");
      else if (f.list) content[f.name] = raw ? raw.split(",").map((s) => s.trim()).filter(Boolean) : [];
      else content[f.name] = raw || undefined;
    }
    if (Object.keys(tenantFields).length) await updateMyTenant(tenantFields as never);
    if (Object.keys(themeFields).length) await updateMyTheme(themeFields as never);
    if (Object.keys(content).length) {
      const site = await getMyTenantFull();
      await updateMyContent({ ...(site?.content ?? {}), ...content } as SiteContent);
    }
  }

  const next = steps[idx + 1];
  redirect(next ? `/dashboard/setup/${next.key}` : "/dashboard");
}

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
