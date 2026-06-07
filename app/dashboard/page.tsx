import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { SITE_BASE } from "@/lib/marketing";

export const dynamic = "force-dynamic";

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: Promise<{ checkout?: string }>;
}) {
  const { checkout } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const live = tenant.published;
  const url = `http://${tenant.subdomain}.${SITE_BASE}`;

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{tenant.business_name}</h1>
          <p className="mt-1 text-sm text-white/45">
            <span className="uppercase tracking-wide">{tenant.preset}</span> · {tenant.subdomain}.kovasite.com
          </p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${live ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>
          {live ? "Live" : "Draft"}
        </span>
      </div>

      {checkout === "success" && !live && (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/60">
          Payment received — finishing setup. Your site will flip to Live in a moment; refresh shortly.
        </p>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/edit" className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25">
          <h2 className="font-semibold">Edit your site</h2>
          <p className="mt-1 text-sm text-white/45">Content, menu, photos, colours and contact details.</p>
          <p className="mt-4 text-sm text-emerald-400/90">Open editor →</p>
        </Link>

        <a href={url} target="_blank" rel="noreferrer" className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition hover:border-white/25">
          <h2 className="font-semibold">Preview your site</h2>
          <p className="mt-1 text-sm text-white/45">See exactly what visitors will see.</p>
          <p className="mt-4 text-sm text-emerald-400/90">{tenant.subdomain}.kovasite.com →</p>
        </a>
      </div>

      {/* Publish / billing */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <h2 className="font-semibold">{live ? "Your site is live" : "Publish your site"}</h2>
        <p className="mt-1 text-sm text-white/45">
          {live
            ? "Your subscription is active and your site is online."
            : "Subscribe to publish your site and keep it live, hosted on your subdomain. Connect your own domain anytime after."}
        </p>
        {!live && (
          <Link href="/dashboard/publish" className="mt-4 inline-block rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90">
            Publish — choose a plan
          </Link>
        )}
      </div>

      {/* Custom domain (next phase) */}
      <div className="rounded-2xl border border-dashed border-white/10 p-6 text-sm text-white/40">
        <h2 className="font-medium text-white/70">Connect your own domain</h2>
        <p className="mt-1">Coming soon — you&apos;ll be able to point your own domain (like yourbusiness.co.uk) at your site.</p>
      </div>
    </div>
  );
}
