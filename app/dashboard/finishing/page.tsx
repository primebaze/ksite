import { redirect } from "next/navigation";
import { Assembling } from "@/components/Assembling";
import { activateTenantFromCheckoutSession } from "@/lib/billing";
import { getMyTenant } from "@/lib/my-site";
import { getStripe } from "@/lib/stripe";

export const dynamic = "force-dynamic";

export default async function FinishingPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  if (tenant.published || tenant.plan_status === "active") {
    redirect("/dashboard/domains?launch=1");
  }

  if (session_id) {
    const stripe = getStripe();
    if (stripe) {
      const session = await stripe.checkout.sessions.retrieve(session_id);
      const activated = await activateTenantFromCheckoutSession(session, tenant.id);
      if (activated) redirect("/dashboard/domains?launch=1");
    }
  }

  return (
    <div className="flex min-h-[78vh] items-center justify-center">
      <Assembling />
    </div>
  );
}
