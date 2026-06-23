import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyBilling, getMyTenant } from "@/lib/my-site";
import { cancelSubscriptionAction, resumeSubscriptionAction } from "../actions";

export const dynamic = "force-dynamic";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function BillingPage({ searchParams }: { searchParams: Promise<{ canceled?: string; resumed?: string; error?: string }> }) {
  const { canceled, resumed, error } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");
  const billing = await getMyBilling();
  // Subscription status is driven purely by whether a Stripe subscription is on
  // file — Inactive until a plan is purchased, Active after. (A site can be live
  // without one, but billing reflects the subscription, not the publish state.)
  const hasSubscription = !!billing.subscriptionId;
  const planLabel = tenant.plan ? tenant.plan[0].toUpperCase() + tenant.plan.slice(1) : "Subscription";

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold tracking-tight">Billing</h1>
        <Link href="/dashboard" className="text-sm text-ink/50 hover:text-ink">← Home</Link>
      </div>

      {canceled && (
        <p className="mt-5 rounded-xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
          Your subscription is set to cancel{billing.cancelAt ? ` on ${fmt(billing.cancelAt)}` : " at the end of your billing period"}. Your site stays live until then.
        </p>
      )}
      {resumed && (
        <p className="mt-5 rounded-xl border border-emerald-400/25 bg-emerald-400/10 px-4 py-3 text-sm text-accent">
          Welcome back — your subscription will continue as normal.
        </p>
      )}
      {error && (
        <p className="mt-5 rounded-xl border border-red-400/25 bg-red-400/10 px-4 py-3 text-sm text-red-300">{error}</p>
      )}

      <div className="mt-6 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6">
        {!hasSubscription ? (
          // No paid subscription yet — Inactive, with a buy-a-plan CTA.
          <>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">Subscription</h2>
                <p className="mt-0.5 text-sm text-ink/50">You don’t have an active subscription yet.</p>
              </div>
              <span className="rounded-full bg-ink/10 px-2.5 py-0.5 text-xs font-medium text-ink/55">Inactive</span>
            </div>
            <div className="mt-6 border-t border-ink/[0.08] pt-5">
              <p className="mb-3 text-sm text-ink/50">
                Choose a plan to activate your subscription and keep your site live on your domain.
              </p>
              <Link href="/dashboard/publish" className="inline-block rounded-xl bg-ink px-5 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">
                Choose a plan
              </Link>
            </div>
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
