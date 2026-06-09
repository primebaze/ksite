import { redirect } from "next/navigation";
import { Assembling } from "@/components/Assembling";
import { activateTenantFromCheckoutSession } from "@/lib/billing";
import { getMyTenant } from "@/lib/my-site";
import { getStripe } from "@/lib/stripe";
import type { Tenant } from "@/lib/types";

export const dynamic = "force-dynamic";

// Stripe redirects here right after payment. This page must NEVER show a server
// error: the webhook (/api/stripe/webhook) is the source of truth for
// activation. Here we only attempt an optimistic fast-path; on any failure we
// hand off to <Assembling/>, which polls /api/me/status and redirects once the
// site is live (with its own 35s fallback). A thrown error here would instead
// greet the customer with "This page couldn't load" immediately after paying.
export default async function FinishingPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;

  let tenant: Tenant | null = null;
  try {
    tenant = await getMyTenant();
  } catch (error) {
    // Transient auth/DB hiccup right after payment — show the launching screen
    // and let polling recover rather than 500 the customer.
    console.error("Finishing: tenant lookup failed", error);
    return <FinishingScreen />;
  }

  if (!tenant) redirect("/get-started");

  if (tenant.published || tenant.plan_status === "active") {
    redirect("/dashboard/domains?launch=1");
  }

  // Optimistic activation. Kept entirely inside try/catch (no redirect within)
  // so a Stripe/Supabase error can never bubble up as a server error.
  let activated = false;
  if (session_id) {
    try {
      const stripe = getStripe();
      if (stripe) {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        activated = await activateTenantFromCheckoutSession(session, tenant.id);
      }
    } catch (error) {
      console.error("Finishing: optimistic activation failed; webhook will finish it", error);
    }
  }

  if (activated) redirect("/dashboard/domains?launch=1");

  return <FinishingScreen />;
}

function FinishingScreen() {
  return (
    <div className="flex min-h-[78vh] items-center justify-center">
      <Assembling />
    </div>
  );
}
