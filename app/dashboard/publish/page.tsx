import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { PLAN_LABELS, type Plan } from "@/lib/stripe";
import { TIERS } from "@/lib/marketing";
import { SubmitButton } from "@/components/SubmitButton";
import { startCheckout } from "../actions";

export const dynamic = "force-dynamic";

const ORDER: Plan[] = ["basic", "standard", "premium"];

export default async function PublishPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; canceled?: string }>;
}) {
  const { error, canceled } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");
  // Already subscribed, don't let them pay again.
  if (tenant.published || tenant.plan_status === "active") redirect("/dashboard");

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Choose a plan to publish</h1>
        <Link href="/dashboard" className="text-sm text-white/55 hover:text-white">← Overview</Link>
      </div>
      <p className="max-w-2xl text-sm text-white/50">
        Your site goes live on <span className="text-white">{tenant.subdomain}.kovasite.com</span> as soon as your
        subscription is active. No setup fee, cancel anytime.
      </p>
      <p className="mt-3 max-w-2xl rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/55">
        Prefer your own domain (like <span className="text-white">yourbusiness.co.uk</span>)? You can connect it any
        time after you subscribe, and we&apos;ll guide you through it from your dashboard.
      </p>

      {canceled && <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">Checkout canceled. You can pick a plan whenever you&apos;re ready.</p>}
      {error && <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {ORDER.map((plan) => {
          const meta = PLAN_LABELS[plan];
          const tier = TIERS.find((t) => t.name.toLowerCase() === plan)!;
          const highlight = plan === "standard";
          return (
            <div
              key={plan}
              className={`relative rounded-2xl border p-8 ${highlight ? "border-emerald-400/40 bg-gradient-to-b from-emerald-400/[0.08] to-transparent" : "border-white/10 bg-white/[0.02]"}`}
            >
              {highlight && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black">Most popular</span>
              )}
              <h2 className="text-lg font-semibold">{meta.name}</h2>
              <p className="mt-1 text-sm text-white/50">{meta.tagline}</p>
              <p className="mt-5">
                <span className="text-4xl font-bold tracking-tight">{meta.price}</span>
                <span className="text-white/40">/month</span>
              </p>
              <form action={startCheckout} className="mt-6">
                <input type="hidden" name="plan" value={plan} />
                <SubmitButton
                  className={`w-full rounded-lg py-2.5 text-sm font-semibold transition ${highlight ? "bg-white text-black hover:bg-white/90" : "border border-white/15 text-white hover:bg-white/5"}`}
                  pendingText="Starting checkout…"
                >
                  Subscribe &amp; publish
                </SubmitButton>
              </form>
              <ul className="mt-7 space-y-3 text-sm text-white/65">
                {tier.features.map((f) => (
                  <li key={f} className="flex gap-2.5">
                    <span className="mt-0.5 text-emerald-400">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
