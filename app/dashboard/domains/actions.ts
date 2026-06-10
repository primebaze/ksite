"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { getMyTenant, refreshMyDomainStatus, updateMyCustomDomain } from "@/lib/my-site";
import {
  addProjectDomain,
  buyDomain,
  checkAvailability,
  createApexDnsRecord,
  getDomainPrice,
  getRegistrarOrder,
  isRegistrantConfigured,
  isVercelConfigured,
  registrarErrorMessage,
  registrarOrderFailed,
  removeProjectDomain,
} from "@/lib/vercel";
import { sendAdminDomainOrderEmail } from "@/lib/email";

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
  // Log Vercel's exact answer so we can see why a buy didn't register (e.g.
  // missing payment method / registrar not enabled) instead of guessing.
  console.log("[domain buy]", domain, "status=", purchase.status, "body=", JSON.stringify(purchase.data));
  // Treat HTTP-ok-but-error-body as failure too: Vercel can return 2xx with an
  // error object, which previously slipped through and left the domain merely
  // "attached" (asking for DNS) instead of actually registered.
  const buyFailed = !purchase.ok || Boolean(purchase.data?.error) || Boolean(purchase.data?.message && !purchase.data?.orderId);
  if (buyFailed) {
    back(`?error=${encodeURIComponent(registrarErrorMessage(purchase) ?? "Could not register that domain. Check that the Vercel account has a payment method and the Domains registrar enabled.")}`);
  }

  // The buy is async: Vercel returns an orderId, then the order succeeds/fails
  // out of band (it fails when the account has no payment method). Read the
  // order once, log its real shape, and always email the operator so a stuck /
  // no-card order is caught immediately. A clearly-failed order stops here with
  // a real error instead of leaving the client on "registering" forever.
  const orderId = typeof purchase.data?.orderId === "string" ? purchase.data.orderId : undefined;
  let orderStatus: string | undefined;
  let orderFailed = false;
  if (orderId) {
    const order = await getRegistrarOrder(orderId).catch(() => null);
    if (order) {
      orderStatus = String(order.data?.status ?? order.data?.state ?? "") || undefined;
      console.log("[domain order]", domain, orderId, "http=", order.status, "body=", JSON.stringify(order.data));
      orderFailed = order.ok && registrarOrderFailed(order.data);
    }
  }
  await sendAdminDomainOrderEmail({
    businessName: tenant!.business_name,
    domain,
    orderId: orderId ?? "(none returned)",
    orderStatus,
    failed: orderFailed,
  }).catch(() => {});
  if (orderFailed) {
    await updateMyCustomDomain(null, "error");
    back(`?error=${encodeURIComponent("Your domain order didn’t go through. This is usually a billing issue on our side — please try again shortly or contact support.")}`);
  }

  // Registration is an async order; mark registering and attach (best effort).
  await updateMyCustomDomain(domain, "registering");
  await createApexDnsRecord(domain).catch(() => {});
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
