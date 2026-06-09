"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getMyTenant, refreshMyDomainStatus, updateMyCustomDomain } from "@/lib/my-site";
import {
  addProjectDomain,
  buyDomain,
  checkAvailability,
  getDomainPrice,
  isRegistrantConfigured,
  isVercelConfigured,
  registrarErrorMessage,
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
  if (!isVercelConfigured() || !isRegistrantConfigured()) back("?error=Domains+aren%27t+switched+on+yet");
  if (!domain) back("?error=Enter+a+domain");

  const avail = await checkAvailability(domain);
  if (!avail.ok || avail.data.available !== true) back("?error=That+domain+isn%27t+available");

  // Vercel only sells a subset of TLDs (e.g. not .co.uk / .uk). For anything it
  // can't register, steer the client to the "connect a domain you own" path.
  const price = await getDomainPrice(domain);
  if (!price.supported) {
    back(
      `?error=${encodeURIComponent(
        "We can’t auto-register that ending (e.g. .co.uk). Register it with any provider, then use “Already own a domain elsewhere?” below to connect it.",
      )}`,
    );
  }
  if (price.price == null) back("?error=Couldn%27t+price+that+domain+right+now.+Please+try+again.");

  // expectedPrice is required by Vercel; the charge goes to your Vercel account.
  const purchase = await buyDomain(domain, price.price!);
  if (!purchase.ok) back(`?error=${encodeURIComponent(registrarErrorMessage(purchase) ?? "Could not register that domain")}`);

  // Registration is an async order; mark registering and attach (best effort).
  await updateMyCustomDomain(domain, "registering");
  await addProjectDomain(domain).catch(() => {});
  revalidatePath("/dashboard/domains");
  redirect("/dashboard?welcome=1");
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
  // Re-check against Vercel, persist status, and email the client + staff on
  // the pending→live edge.
  const { justWentLive } = await refreshMyDomainStatus();
  revalidatePath("/dashboard/domains");
  back(justWentLive ? "?claimed=1" : "");
}

export async function disconnectDomain() {
  const tenant = await getMyTenant();
  if (tenant?.custom_domain && isVercelConfigured()) await removeProjectDomain(tenant.custom_domain);
  await updateMyCustomDomain(null, "pending");
  revalidatePath("/dashboard/domains");
  back();
}
