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

  // Optimistic activation — fire it, but DON'T redirect. We always show the
  // launch animation so the customer sees the "building your site" moment;
  // <Assembling/> polls /api/me/status and redirects once it's live (or after
  // its 35s fallback). Activation may already be done by the webhook — that's
  // fine, the poll just confirms it quickly.
  const alreadyLive = tenant.published || tenant.plan_status === "active";
  if (session_id && !alreadyLive) {
    try {
      const stripe = getStripe();
      if (stripe) {
        const session = await stripe.checkout.sessions.retrieve(session_id);
        await activateTenantFromCheckoutSession(session, tenant.id);
      }
    } catch (error) {
      console.error("Finishing: optimistic activation failed; webhook will finish it", error);
    }
  }

  return <FinishingScreen />;
}

function FinishingScreen() {
  return (
    <div className="flex min-h-[78vh] items-center justify-center">
      <Assembling />
    </div>
  );
}
