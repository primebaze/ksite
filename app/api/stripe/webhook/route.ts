import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getServiceClient } from "@/lib/supabase";
import { revalidateSiteHost, revalidateTenant } from "@/lib/tenant";
import { addProjectDomain, isVercelConfigured } from "@/lib/vercel";

const APP_DOMAIN = process.env.NEXT_PUBLIC_APP_DOMAIN ?? "localhost";

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
      const tenantId = (s.metadata?.tenant_id ?? s.client_reference_id) || null;
      const plan = s.metadata?.plan ?? null;
      if (tenantId) {
        await svc.from("tenants").update({ plan_status: "active", published: true, plan }).eq("id", tenantId);
        await svc.from("tenant_billing").upsert({
          tenant_id: tenantId,
          stripe_customer_id: typeof s.customer === "string" ? s.customer : null,
          stripe_subscription_id: typeof s.subscription === "string" ? s.subscription : null,
        });
        await bust(tenantId);

        // Attach this tenant's subdomain to Vercel so it routes + gets SSL.
        if (isVercelConfigured() && APP_DOMAIN !== "localhost") {
          const { data: t } = await svc.from("tenants").select("subdomain").eq("id", tenantId).maybeSingle();
          if (t?.subdomain) await addProjectDomain(`${t.subdomain}.${APP_DOMAIN}`).catch(() => {});
        }
      }
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
        const status = sub.status === "active" || sub.status === "trialing" ? "active" : "past_due";
        await svc.from("tenants").update({ plan_status: status }).eq("id", tenantId);
        await bust(tenantId);
      }
      break;
    }
  }

  return new Response("ok", { status: 200 });
}
