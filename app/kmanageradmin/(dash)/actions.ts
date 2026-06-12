"use server";

import { redirect } from "next/navigation";
import { createTenant, requireStaff, resolveOwnerId } from "@/lib/admin";
import { isVertical } from "@/lib/verticals";

export async function createTenantAction(formData: FormData) {
  await requireStaff();
  const business_name = String(formData.get("business_name") ?? "").trim();
  const preset = String(formData.get("preset") ?? "");
  const ownerEmail = String(formData.get("owner_email") ?? "").trim();
  const subdomain = String(formData.get("subdomain") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

  if (!business_name || !subdomain || !isVertical(preset)) {
    redirect("/kmanageradmin/new?error=Please+fill+in+all+fields");
  }

  let ownerId: string | null = null;
  if (ownerEmail) {
    try {
      ownerId = await resolveOwnerId(ownerEmail);
    } catch (e) {
      redirect(`/kmanageradmin/new?error=${encodeURIComponent(e instanceof Error ? e.message : "Couldn't link that owner email")}`);
    }
  }

  let id: string;
  try {
    id = await createTenant({ business_name, preset, subdomain, ownerId });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Could not create client";
    redirect(`/kmanageradmin/new?error=${encodeURIComponent(msg)}`);
  }
  redirect(`/kmanageradmin/${id}`);
}
