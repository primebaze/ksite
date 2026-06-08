import "server-only";
import type Stripe from "stripe";
import { revalidateSiteHost, revalidateTenant } from "./tenant";
import { getServiceClient } from "./supabase";
import { addProjectDomain, isVercelConfigured } from "./vercel";
import type { Plan } from "./stripe";
import { sendAdminPaymentNotification, sendPaymentLiveEmail } from "./email";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost";
const PLANS = new Set<Plan>(["basic", "standard", "premium"]);

function planFrom(value: string | null | undefined): Plan | null {
  return value && PLANS.has(value as Plan) ? (value as Plan) : null;
}

function idFrom(value: unknown): string | null {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && "id" in value && typeof value.id === "string") {
    return value.id;
  }
  return null;
}

export async function activateTenantSubscription(input: {
  tenantId: string;
  plan: string | null | undefined;
  stripeCustomerId?: string | null;
  stripeSubscriptionId?: string | null;
  customerEmail?: string | null;
}) {
  const svc = getServiceClient();
  if (!svc) return false;

  const { data: before } = await svc
    .from("tenants")
    .select("business_name,subdomain,custom_domain,plan_status,published,owner_id")
    .eq("id", input.tenantId)
    .maybeSingle();
  const wasLive = Boolean(before?.published || before?.plan_status === "active");

  const plan = planFrom(input.plan);
  const tenantUpdate: { plan_status: "active"; published: true; plan?: Plan } = {
    plan_status: "active",
    published: true,
  };
  if (plan) tenantUpdate.plan = plan;

  await svc.from("tenants").update(tenantUpdate).eq("id", input.tenantId);

  await svc.from("tenant_billing").upsert({
    tenant_id: input.tenantId,
    stripe_customer_id: input.stripeCustomerId ?? null,
    stripe_subscription_id: input.stripeSubscriptionId ?? null,
  });

  const { data } = await svc
    .from("tenants")
    .select("business_name,subdomain,custom_domain,owner_id")
    .eq("id", input.tenantId)
    .maybeSingle();

  await revalidateTenant(input.tenantId);
  if (data?.subdomain) await revalidateSiteHost("subdomain", data.subdomain);
  if (data?.custom_domain) await revalidateSiteHost("custom", data.custom_domain);

  if (isVercelConfigured() && APP_DOMAIN !== "localhost") {
    const domains = [
      data?.subdomain ? `${data.subdomain}.${APP_DOMAIN}` : null,
      data?.custom_domain ?? null,
    ].filter(Boolean) as string[];
    await Promise.all(domains.map((domain) => addProjectDomain(domain).catch(() => null)));
  }

  if (!wasLive && data?.subdomain) {
    await sendPaymentNotifications({
      tenantId: input.tenantId,
      businessName: data.business_name ?? before?.business_name ?? "New site",
      subdomain: data.subdomain,
      ownerId: data.owner_id ?? before?.owner_id ?? null,
      plan,
      customerEmail: input.customerEmail,
    }).catch((error) => {
      console.error("Payment notification failed", error);
    });
  }

  return true;
}

export async function activateTenantFromCheckoutSession(
  session: Stripe.Checkout.Session,
  expectedTenantId?: string,
) {
  if (session.status !== "complete") return false;
  if (session.payment_status && session.payment_status !== "paid" && session.payment_status !== "no_payment_required") {
    return false;
  }

  const tenantId = (session.metadata?.tenant_id ?? session.client_reference_id) || null;
  if (!tenantId || (expectedTenantId && tenantId !== expectedTenantId)) return false;

  return activateTenantSubscription({
    tenantId,
    plan: session.metadata?.plan,
    stripeCustomerId: idFrom(session.customer),
    stripeSubscriptionId: idFrom(session.subscription),
    customerEmail: session.customer_details?.email ?? session.customer_email,
  });
}

async function sendPaymentNotifications({
  tenantId,
  businessName,
  subdomain,
  ownerId,
  plan,
  customerEmail,
}: {
  tenantId: string;
  businessName: string;
  subdomain: string;
  ownerId?: string | null;
  plan?: Plan | null;
  customerEmail?: string | null;
}) {
  const svc = getServiceClient();
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://kovasite.com").replace(/\/$/, "");
  const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN || "kovasite.com";
  const siteUrl = appDomain === "localhost"
    ? `${base}/sites/${subdomain}`
    : `https://${subdomain}.${appDomain}`;
  const dashboardUrl = `${base}/admin/${tenantId}`;

  let ownerEmail = customerEmail ?? null;
  if (!ownerEmail && svc && ownerId) {
    const { data } = await svc.auth.admin.getUserById(ownerId);
    ownerEmail = data.user?.email ?? null;
  }

  await Promise.all([
    ownerEmail
      ? sendPaymentLiveEmail({ to: ownerEmail, businessName, siteUrl, plan })
      : Promise.resolve(),
    sendAdminPaymentNotification({
      businessName,
      siteUrl,
      dashboardUrl,
      plan,
      customerEmail: ownerEmail ?? customerEmail,
    }),
  ]);
}
