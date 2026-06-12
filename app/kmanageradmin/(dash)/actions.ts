"use server";

import { redirect } from "next/navigation";
import { createTenant, requireStaff, resolveOwnerId, sendOwnerWelcome } from "@/lib/admin";
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
  let ownerCreated = false;
  if (ownerEmail) {
    try {
      const owner = await resolveOwnerId(ownerEmail);
      ownerId = owner.id;
      ownerCreated = owner.created;
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

  // Brand-new account: email them a one-time set-password link. Best-effort —
  // never block creation if mail fails (staff can still set a password from the
  // client's "Client login" card).
  if (ownerCreated && ownerEmail) {
    try {
      await sendOwnerWelcome(ownerEmail, business_name);
    } catch {
      // swallow — surfaced via the absence of a welcome email, not a hard error
    }
  }

  redirect(`/kmanageradmin/${id}`);
}
