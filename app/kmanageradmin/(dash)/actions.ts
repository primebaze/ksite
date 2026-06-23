"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createTenant, deleteTenantAccount, requireStaff, resolveOwnerId, sendOwnerWelcome } from "@/lib/admin";
import { isVertical } from "@/lib/verticals";
import { cleanBusinessName } from "@/lib/business-name";

// Bulk-delete selected accounts from the clients list. Irreversible.
export async function deleteTenantsAction(formData: FormData) {
  await requireStaff();
  const ids = formData.getAll("ids").map(String).filter(Boolean);
  for (const id of ids) {
    try {
      await deleteTenantAccount(id);
    } catch {
      // skip a failed row, keep deleting the rest
    }
  }
  revalidatePath("/kmanageradmin");
  redirect(`/kmanageradmin?deleted=${ids.length}`);
}

export async function createTenantAction(formData: FormData) {
  await requireStaff();
  const preset = String(formData.get("preset") ?? "");
  const ownerEmail = String(formData.get("owner_email") ?? "").trim();
  const subdomain = String(formData.get("subdomain") ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "");

  let business_name: string;
  try {
    business_name = cleanBusinessName(String(formData.get("business_name") ?? ""));
  } catch (e) {
    redirect(`/kmanageradmin/new?error=${encodeURIComponent(e instanceof Error ? e.message : "Enter a valid business name")}`);
  }

  if (!subdomain || !isVertical(preset)) {
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
