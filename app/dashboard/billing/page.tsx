import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyBilling, getMyTenant } from "@/lib/my-site";
import { cancelSubscriptionAction, resumeSubscriptionAction } from "../actions";

export const dynamic = "force-dynamic";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ canceled?: string; resumed?: string }> }) {
  const { canceled, resumed } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");
  const billing = await getMyBilling();
  const subscribed = tenant.plan_status === "active" || tenant.plan_status === "trialing" || tenant.published;
  const planLabel = tenant.plan ? tenant.plan[0].toUpperCase() + tenant.plan.slice(1) : "Subscription";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
        <Link href="/dashboard" className="text-sm text-ink/50 hover:text-ink">← Home</Link>
      </div>

      {canceled && (
        <p className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
          Your subscription is set to cancel{billing.cancelAt ? ` on ${fmt(billing.cancelAt)}` : " at the end of your billing period"}. Your site stays live until then.
        </p>
      )}
      {resumed && (
        <p className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-200">
          Welcome back — your subscription will continue as normal.
        </p>
      )}

      <div className="mt-6 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
        {!subscribed ? (
          <>
            <h2 className="text-lg font-semibold">No active subscription</h2>
            <p className="mt-1 text-sm text-ink/50">Publish your site to take it live on your subdomain.</p>
            <Link href="/dashboard/publish" className="mt-4 inline-block rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">
              Choose a plan
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{planLabel} plan</h2>
                <p className="mt-0.5 text-sm text-ink/50">
                  {billing.cancelAt
                    ? `Cancels on ${fmt(billing.cancelAt)} — live until then.`
                    : "Active · renews automatically."}
                </p>
              </div>
              <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${billing.cancelAt ? "bg-amber-400/15 text-amber-300" : "bg-emerald-400/15 text-accent"}`}>
                {billing.cancelAt ? "Cancelling" : "Active"}
              </span>
            </div>

            <div className="mt-6 border-t border-ink/[0.08] pt-5">
              {billing.cancelAt ? (
                <form action={resumeSubscriptionAction}>
                  <p className="mb-3 text-sm text-ink/50">Changed your mind? Keep your site online.</p>
                  <button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">Resume subscription</button>
                </form>
              ) : (
                <form action={cancelSubscriptionAction}>
                  <p className="mb-3 text-sm text-ink/50">
                    Cancelling stops future billing. Your site stays live until the end of the current period, then reverts to a draft.
                  </p>
                  <button className="rounded-xl border border-red-400/25 px-4 py-2.5 text-sm font-medium text-red-300 transition hover:bg-red-400/10">
                    Cancel subscription
                  </button>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
