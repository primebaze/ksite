import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getServiceClient } from "@/lib/supabase";
import { revalidateSiteHost, revalidateTenant } from "@/lib/tenant";
import { activateTenantFromCheckoutSession, activateTenantSubscription } from "@/lib/billing";

// Stripe webhook. Runs on the Node runtime (needs the raw body + crypto).
export const runtime = "nodejs";

export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const svc = getServiceClient();
  if (!stripe || !secret || !svc) {
    return new Response("Billing not configured", { status: 500 });
  }

  const sig = req.headers.get("stripe-signature") ?? "";
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  async function bust(tenantId: string) {
    const { data } = await svc!
      .from("tenants")
      .select("subdomain,custom_domain")
      .eq("id", tenantId)
      .maybeSingle();
    await revalidateTenant(tenantId);
    if (data?.subdomain) await revalidateSiteHost("subdomain", data.subdomain);
    if (data?.custom_domain) await revalidateSiteHost("custom", data.custom_domain);
  }

  switch (event.type) {
    // Payment succeeded → activate + publish.
    case "checkout.session.completed": {
      const s = event.data.object as Stripe.Checkout.Session;
      await activateTenantFromCheckoutSession(s);
      break;
    }

    // Subscription canceled or unpaid → take the site offline.
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const tenantId = sub.metadata?.tenant_id ?? null;
      if (tenantId) {
        await svc.from("tenants").update({ plan_status: "canceled", published: false }).eq("id", tenantId);
        await bust(tenantId);
      }
      break;
    }

    case "customer.subscription.updated": {
      const sub = event.data.object as Stripe.Subscription;
      const tenantId = sub.metadata?.tenant_id ?? null;
      if (tenantId) {
        if (sub.status === "active" || sub.status === "trialing") {
          await activateTenantSubscription({
            tenantId,
            plan: sub.metadata?.plan,
            stripeCustomerId: typeof sub.customer === "string" ? sub.customer : sub.customer.id,
            stripeSubscriptionId: sub.id,
          });
        } else {
          await svc.from("tenants").update({ plan_status: "past_due" }).eq("id", tenantId);
          await bust(tenantId);
        }
      }
      break;
    }
  }

  return new Response("ok", { status: 200 });
}
