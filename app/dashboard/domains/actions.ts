"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getMyTenant, updateMyCustomDomain } from "@/lib/my-site";
import {
  addProjectDomain,
  buyDomain,
  checkAvailability,
  getDomainPrice,
  isDomainLive,
  isVercelConfigured,
  removeProjectDomain,
} from "@/lib/vercel";

function clean(v: FormDataEntryValue | null): string {
  return String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "");
}
const back = (q = "") => redirect(`/dashboard/domains${q}`);

// Buy a new domain in-app and put the site live on it. Subscribers only.
export async function claimDomain(formData: FormData) {
  const domain = clean(formData.get("domain"));
  const tenant = await getMyTenant();
  if (!tenant) redirect("/login");
  const subscribed = tenant!.plan_status === "active" || tenant!.published;
  if (!subscribed) redirect("/dashboard/publish");
  if (!isVercelConfigured()) back("?error=Domains+aren%27t+switched+on+yet");
  if (!domain) back("?error=Enter+a+domain");

  const avail = await checkAvailability(domain);
  if (!avail.ok || !avail.data.available) back("?error=That+domain+isn%27t+available");

  const price = await getDomainPrice(domain);
  const purchase = await buyDomain(domain, price.data.price);
  if (!purchase.ok) back(`?error=${encodeURIComponent(purchase.data.error?.message ?? "Could not register that domain")}`);

  await addProjectDomain(domain);
  await updateMyCustomDomain(domain, "active");
  revalidatePath("/dashboard/domains");
  back("?claimed=1");
}

// Connect a domain the client already owns (needs one DNS record).
export async function connectExisting(formData: FormData) {
  const domain = clean(formData.get("domain"));
  const tenant = await getMyTenant();
  if (!tenant) redirect("/login");
  if (!isVercelConfigured()) back("?error=Domains+aren%27t+switched+on+yet");
  if (!domain) back("?error=Enter+a+domain");

  const res = await addProjectDomain(domain);
  if (!res.ok && res.status !== 409) back(`?error=${encodeURIComponent("Could not add that domain")}`);
  await updateMyCustomDomain(domain, "pending");
  revalidatePath("/dashboard/domains");
  back();
}

export async function checkStatus() {
  const tenant = await getMyTenant();
  if (!tenant?.custom_domain) back();
  const live = await isDomainLive(tenant!.custom_domain!);
  await updateMyCustomDomain(tenant!.custom_domain!, live ? "active" : "verifying");
  revalidatePath("/dashboard/domains");
  back();
}

export async function disconnectDomain() {
  const tenant = await getMyTenant();
  if (tenant?.custom_domain && isVercelConfigured()) await removeProjectDomain(tenant.custom_domain);
  await updateMyCustomDomain(null, "pending");
  revalidatePath("/dashboard/domains");
  back();
}
