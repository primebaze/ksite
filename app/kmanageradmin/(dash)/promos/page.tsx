import Link from "next/link";
import { listPromotions } from "@/lib/promos";
import { getStripe } from "@/lib/stripe";
import { createPromoAction, togglePromoAction } from "./actions";

export const dynamic = "force-dynamic";

const card = "rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-6";
const input =
  "mt-1 w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-3 py-2 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30 [&>option]:bg-panel";
const label = "text-xs text-ink/45";
const btn = "rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400";

const fmtDate = (unix: number) => new Date(unix * 1000).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default async function PromosPage({ searchParams }: { searchParams: Promise<{ error?: string; notice?: string }> }) {
  const { error, notice } = await searchParams;
  const configured = Boolean(getStripe());
  // A Stripe API error (bad/restricted key, network) must not 500 the admin —
  // load defensively and surface the reason instead.
  let promos: Awaited<ReturnType<typeof listPromotions>> = [];
  let loadError: string | null = null;
  if (configured) {
    try {
      promos = await listPromotions();
    } catch (e) {
      loadError = e instanceof Error ? e.message : "Couldn't load promo codes from Stripe.";
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Promo codes</h1>
          <p className="mt-1 text-sm text-ink/45">Create discount codes customers enter at checkout. Managed in Stripe.</p>
        </div>
        <Link href="/kmanageradmin" className="text-sm text-ink/50 hover:text-ink">← Overview</Link>
      </div>

      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-400">{error}</p>}
      {notice && <p className="rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-accent">{notice}</p>}

      {!configured && (
        <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
          Stripe isn&apos;t configured (no STRIPE_SECRET_KEY), so codes can&apos;t be created yet.
        </p>
      )}

      {loadError && (
        <p className="rounded-lg border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-200">
          Couldn&apos;t load codes from Stripe: {loadError}
        </p>
      )}

      {/* Create */}
      <section className={card}>
        <h2 className="text-lg font-semibold">New code</h2>
        <form action={createPromoAction} className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={label}>Code</label>
            <input name="code" required placeholder="LAUNCH50" className={`${input} uppercase`} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Type</label>
              <select name="kind" className={input} defaultValue="percent">
                <option value="percent">% off</option>
                <option value="amount">£ off</option>
              </select>
            </div>
            <div>
              <label className={label}>Amount</label>
              <input name="value" type="number" min="1" step="1" required placeholder="50" className={input} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className={label}>Applies</label>
              <select name="duration" className={input} defaultValue="once">
                <option value="once">Once</option>
                <option value="repeating">For N months</option>
                <option value="forever">Forever</option>
              </select>
            </div>
            <div>
              <label className={label}>Months (if repeating)</label>
              <input name="months" type="number" min="1" step="1" placeholder="3" className={input} />
            </div>
          </div>
          <div>
            <label className={label}>Max redemptions (optional)</label>
            <input name="max" type="number" min="1" step="1" placeholder="Unlimited" className={input} />
          </div>
          <div className="flex items-end sm:col-span-2">
            <button className={btn}>Create code</button>
          </div>
        </form>
      </section>

      {/* List */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Existing codes</h2>
        {promos.length === 0 ? (
          <p className="mt-3 text-sm text-ink/45">No promo codes yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-ink/[0.08]">
            {promos.map((p) => (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-semibold tracking-wide text-ink">{p.code}</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${p.active ? "bg-emerald-400/15 text-accent" : "bg-ink/10 text-ink/50"}`}>
                      {p.active ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-ink/50">
                    {p.discount} · {p.redemptions}{p.maxRedemptions ? `/${p.maxRedemptions}` : ""} used
                    {p.expiresAt ? ` · expires ${fmtDate(p.expiresAt)}` : ""}
                  </p>
                </div>
                <form action={togglePromoAction}>
                  <input type="hidden" name="id" value={p.id} />
                  <input type="hidden" name="active" value={(!p.active).toString()} />
                  <button className="rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink/80 transition hover:bg-ink/[0.06]">
                    {p.active ? "Disable" : "Enable"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
