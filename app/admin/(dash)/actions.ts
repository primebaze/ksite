"use server";

import { redirect } from "next/navigation";
import { createTenant } from "@/lib/admin";
import { isVertical } from "@/lib/verticals";

export async function createTenantAction(formData: FormData) {
  const business_name = String(formData.get("business_name") ?? "").trim();
  const preset = String(formData.get("preset") ?? "");
  const subdomain = String(formData.get("subdomain") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

  if (!business_name || !subdomain || !isVertical(preset)) {
    redirect("/admin/new?error=Please+fill+in+all+fields");
  }

  let id: string;
  try {
    id = await createTenant({ business_name, preset, subdomain });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not create client";
    redirect(`/admin/new?error=${encodeURIComponent(msg)}`);
  }
  redirect(`/admin/${id}`);
}
