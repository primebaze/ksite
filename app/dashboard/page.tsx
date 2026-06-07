import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { SITE_BASE } from "@/lib/marketing";
import { verticalFor } from "@/lib/verticals";

export const dynamic = "force-dynamic";

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
  const { welcome } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const live = tenant.published || tenant.plan_status === "active";
  const url = `https://${tenant.subdomain}.${SITE_BASE}`;
  const typeLabel = verticalFor(tenant.preset)?.label ?? tenant.preset;
  const planLabel = tenant.plan ? tenant.plan[0].toUpperCase() + tenant.plan.slice(1) : null;

  return (
    <div className="space-y-8">
      {welcome === "1" && live && (
        <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 px-5 py-4">
          <p className="font-medium text-emerald-200">🎉 Your site is live!</p>
          <p className="mt-1 text-sm text-white/55">
            It&apos;s online at{" "}
            <a href={url} target="_blank" rel="noreferrer" className="text-emerald-300 underline">{tenant.subdomain}.{SITE_BASE}</a>. Share it anywhere.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{tenant.business_name}</h1>
          <p className="mt-1 text-sm text-white/45">{typeLabel} · {tenant.subdomain}.{SITE_BASE}</p>
        </div>
        <div className="flex items-center gap-2">
          {planLabel && <span className="rounded-full border border-white/15 px-3 py-1 text-xs text-white/60">{planLabel} plan</span>}
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${live ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>
            {live ? "Live" : "Draft"}
          </span>
        </div>
      </div>

      {/* Live site spotlight */}
      {live && (
        <a href={url} target="_blank" rel="noreferrer" className="block rounded-2xl border border-emerald-400/25 bg-gradient-to-b from-emerald-400/[0.06] to-transparent p-6 transition hover:border-emerald-400/40">
          <p className="text-xs uppercase tracking-widest text-emerald-300/80">Your live site</p>
          <p className="mt-1 text-lg font-medium">{tenant.subdomain}.{SITE_BASE}</p>
          <p className="mt-3 text-sm text-emerald-400/90">Visit your site ↗</p>
        </a>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/setup/look" className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25">
          <h2 className="font-semibold">Build &amp; edit your site</h2>
          <p className="mt-1 text-sm text-white/45">Step-by-step — look, story, photos, contact, menu and more.</p>
          <p className="mt-4 text-sm text-emerald-400/90">Open setup →</p>
        </Link>

        <a href="/preview" target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25">
          <h2 className="font-semibold">Preview your site</h2>
          <p className="mt-1 text-sm text-white/45">See exactly what visitors will see, even before publishing.</p>
          <p className="mt-4 text-sm text-emerald-400/90">Open preview →</p>
        </a>
      </div>

      {/* Publish (only before live) */}
      {!live && (
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-semibold">Publish your site</h2>
          <p className="mt-1 text-sm text-white/45">
            Subscribe to take it live on your subdomain. No setup fee, cancel anytime.
          </p>
          <Link href="/dashboard/publish" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90">
            Publish — choose a plan
          </Link>
        </div>
      )}

      {/* Custom domain */}
      <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/40">
        <h2 className="font-medium text-white/70">Connect your own domain</h2>
        <p className="mt-1">Coming soon — point your own domain (like yourbusiness.co.uk) at your site.</p>
      </div>

      {/* Next steps */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="font-semibold">Tips to get the most from your site</h2>
        <ul className="mt-3 space-y-2 text-sm text-white/55">
          <li>• Add a great hero photo — it makes the biggest difference.</li>
          <li>• Keep your {verticalFor(tenant.preset)?.catalogLabel.toLowerCase() ?? "services"} and prices up to date.</li>
          <li>• Share your link on Google, Instagram and WhatsApp.</li>
        </ul>
      </div>
    </div>
  );
}
