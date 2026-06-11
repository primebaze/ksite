import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getServiceClient } from "@/lib/supabase";
import { revalidateSiteHost, revalidateTenant } from "@/lib/tenant";
import { activateTenantFromCheckoutSession, activateTenantSubscription } from "@/lib/billing";
import { sendAdminLifecycleAlert, sendPastDueEmail, sendRefundEmail, sendSubscriptionEndedEmail } from "@/lib/email";

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

  // Business name + owner email for lifecycle notifications.
  async function contact(tenantId: string): Promise<{ name: string; email: string | null }> {
    const { data: t } = await svc!.from("tenants").select("business_name,owner_id").eq("id", tenantId).maybeSingle();
    const row = t as { business_name?: string; owner_id?: string } | null;
    let email: string | null = null;
    if (row?.owner_id) {
      const { data } = await svc!.auth.admin.getUserById(row.owner_id);
      email = data?.user?.email ?? null;
    }
    return { name: row?.business_name ?? "your business", email };
  }

  async function tenantByCustomer(customerId: string): Promise<string | null> {
    const { data } = await svc!.from("tenant_billing").select("tenant_id").eq("stripe_customer_id", customerId).maybeSingle();
    return (data as { tenant_id?: string } | null)?.tenant_id ?? null;
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
        await svc.from("tenant_billing").update({ cancel_at: null }).eq("tenant_id", tenantId);
        await bust(tenantId);
        const { name, email } = await contact(tenantId);
        if (email) sendSubscriptionEndedEmail({ to: email, businessName: name }).catch(() => {});
        sendAdminLifecycleAlert({ subject: "Subscription ended", businessName: name, detail: "Subscription deleted; site unpublished.", tenantId }).catch(() => {});
      }
      break;
    }

    // A charge was refunded → take the site offline + notify both sides.
    case "charge.refunded": {
      const charge = event.data.object as Stripe.Charge;
      const customerId = typeof charge.customer === "string" ? charge.customer : charge.customer?.id ?? null;
      const tenantId = customerId ? await tenantByCustomer(customerId) : null;
      if (tenantId) {
        await svc.from("tenants").update({ plan_status: "canceled", published: false }).eq("id", tenantId);
        await bust(tenantId);
        const { name, email } = await contact(tenantId);
        if (email) sendRefundEmail({ to: email, businessName: name }).catch(() => {});
        const amount = `${(charge.amount_refunded / 100).toFixed(2)} ${(charge.currency ?? "").toUpperCase()}`.trim();
        sendAdminLifecycleAlert({ subject: "Payment refunded", businessName: name, detail: `Refunded ${amount}; site unpublished.`, tenantId }).catch(() => {});
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
          // Reflect a pending end-of-period cancellation (or its reversal) so
          // the dashboard can show "cancels on <date>".
          await svc
            .from("tenant_billing")
            .update({ cancel_at: sub.cancel_at_period_end && sub.cancel_at ? new Date(sub.cancel_at * 1000).toISOString() : null })
            .eq("tenant_id", tenantId);
          await bust(tenantId);
        } else {
          await svc.from("tenants").update({ plan_status: "past_due" }).eq("id", tenantId);
          await bust(tenantId);
          if (sub.status === "past_due" || sub.status === "unpaid") {
            const { name, email } = await contact(tenantId);
            if (email) sendPastDueEmail({ to: email, businessName: name }).catch(() => {});
            sendAdminLifecycleAlert({ subject: "Payment past due", businessName: name, detail: `Subscription status: ${sub.status}.`, tenantId }).catch(() => {});
          }
        }
      }
      break;
    }
  }

  return new Response("ok", { status: 200 });
}
