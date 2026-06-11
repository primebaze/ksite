import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { PLAN, gbp } from "@/lib/marketing";
import { SubmitButton } from "@/components/SubmitButton";
import { startCheckout } from "../actions";

export const dynamic = "force-dynamic";

const OPTIONS = [
  { period: "monthly", label: "Monthly", price: gbp(PLAN.monthly), unit: "/month", note: "Billed monthly · cancel anytime", highlight: false },
  { period: "yearly", label: "Yearly", price: gbp(PLAN.yearlyPerMonth), unit: "/month", note: `Billed ${gbp(PLAN.yearlyTotal)} a year — save ${gbp(PLAN.yearlySaving)}`, highlight: true },
] as const;

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
        <h1 className="text-2xl font-semibold">Publish your site</h1>
        <Link href="/dashboard" className="text-sm text-white/55 hover:text-white">← Overview</Link>
      </div>
      <p className="max-w-2xl text-sm text-white/50">
        One simple plan, everything included. Your site goes live on{" "}
        <span className="text-white">{tenant.subdomain}.kovasite.com</span> as soon as your subscription is active.
        No setup fee, cancel anytime.
      </p>
      <p className="mt-3 max-w-2xl rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/55">
        A <span className="text-white">free custom domain</span> (like{" "}
        <span className="text-white">yourbusiness.co.uk</span>) is included — you can connect it any time after you
        subscribe, and we&apos;ll guide you through it from your dashboard.
      </p>

      {canceled && <p className="mt-4 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">Checkout canceled. You can subscribe whenever you&apos;re ready.</p>}
      {error && <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      <div className="mt-8 grid max-w-3xl gap-6 sm:grid-cols-2">
        {OPTIONS.map((o) => (
          <div
            key={o.period}
            className={`relative rounded-2xl border p-8 ${o.highlight ? "border-emerald-400/40 bg-gradient-to-b from-emerald-400/[0.08] to-transparent" : "border-white/10 bg-white/[0.02]"}`}
          >
            {o.highlight && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black">{PLAN.yearlyHook}</span>
            )}
            <h2 className="text-lg font-semibold">{o.label}</h2>
            <p className="mt-1 text-sm text-white/50">{o.note}</p>
            <p className="mt-5">
              <span className="text-4xl font-bold tracking-tight">{o.price}</span>
              <span className="text-white/40">{o.unit}</span>
            </p>
            <form action={startCheckout} className="mt-6">
              <input type="hidden" name="period" value={o.period} />
              <SubmitButton
                className={`w-full rounded-lg py-2.5 text-sm font-semibold transition ${o.highlight ? "bg-white text-black hover:bg-white/90" : "border border-white/15 text-white hover:bg-white/5"}`}
                pendingText="Starting checkout…"
              >
                Subscribe &amp; publish
              </SubmitButton>
            </form>
          </div>
        ))}
      </div>

      <ul className="mt-8 grid max-w-3xl gap-x-6 gap-y-3 text-sm text-white/65 sm:grid-cols-2">
        {PLAN.features.map((f) => (
          <li key={f} className="flex gap-2.5">
            <span className="mt-0.5 text-emerald-400">✓</span>
            {f}
          </li>
        ))}
      </ul>
    </div>
  );
}
