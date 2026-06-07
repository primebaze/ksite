import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { SITE_BASE } from "@/lib/marketing";
import { dnsInstructions, isVercelConfigured } from "@/lib/vercel";
import { DomainSearch } from "@/components/DomainSearch";
import { checkStatus, connectExisting, disconnectDomain } from "./actions";

export const dynamic = "force-dynamic";

export default async function DomainsPage({
  searchParams,
}: {
  searchParams: Promise<{ claimed?: string; error?: string }>;
}) {
  const { claimed, error } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const subscribed = tenant.plan_status === "active" || tenant.published;
  const custom = tenant.custom_domain;
  const subUrl = `https://${tenant.subdomain}.${SITE_BASE}`;
  const dns = custom ? dnsInstructions(custom) : null;

  return (
    <div className="max-w-2xl space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Your domains</h1>
        <Link href="/dashboard" className="text-sm text-white/55 hover:text-white">← Overview</Link>
      </div>

      {claimed && <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-3 text-sm text-emerald-200">🎉 Your domain is live!</p>}
      {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
      {!isVercelConfigured() && (
        <p className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/55">Custom domains are being switched on — check back shortly.</p>
      )}

      {/* Free address */}
      <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
        <p className="text-xs uppercase tracking-widest text-white/40">Free address</p>
        <p className="mt-1 font-medium">{tenant.subdomain}.{SITE_BASE}</p>
        <a href={subUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-emerald-400/90 hover:text-emerald-300">Visit ↗</a>
      </section>

      {/* Custom domain */}
      {custom ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <div className="flex items-center justify-between">
            <p className="font-medium">{custom}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${tenant.domain_status === "active" ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>
              {tenant.domain_status === "active" ? "Live" : tenant.domain_status === "verifying" ? "Verifying…" : "Pending DNS"}
            </span>
          </div>

          {tenant.domain_status === "active" ? (
            <a href={`https://${custom}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-emerald-400/90 hover:text-emerald-300">Visit ↗</a>
          ) : (
            dns && (
              <div className="mt-4 rounded-lg border border-white/10 bg-white/[0.02] p-4 text-sm">
                <p className="text-white/55">Add this one record at your domain provider, then check again:</p>
                <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs text-white/80">
                  <span>Type<br /><span className="text-white">{dns.type}</span></span>
                  <span>Name<br /><span className="text-white">{dns.name}</span></span>
                  <span>Value<br /><span className="text-white">{dns.value}</span></span>
                </div>
              </div>
            )
          )}

          <div className="mt-4 flex gap-2">
            {tenant.domain_status !== "active" && (
              <form action={checkStatus}><button className="rounded-lg border border-white/15 px-4 py-2 text-sm hover:bg-white/5">Check status</button></form>
            )}
            <form action={disconnectDomain}><button className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10">Remove</button></form>
          </div>
        </section>
      ) : subscribed ? (
        <section className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h2 className="font-semibold">Get your own domain</h2>
          <p className="mt-1 text-sm text-white/45">Search a name and claim it — included in your plan, live in about a minute, no DNS setup.</p>
          <div className="mt-4"><DomainSearch /></div>

          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-white/55">Already own a domain elsewhere?</summary>
            <form action={connectExisting} className="mt-3 flex gap-2">
              <input name="domain" placeholder="yourbusiness.co.uk" className="w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30" />
              <button className="shrink-0 rounded-lg border border-white/15 px-5 py-3 text-sm font-medium hover:bg-white/5">Connect</button>
            </form>
            <p className="mt-2 text-xs text-white/35">You&apos;ll add one DNS record at your provider — we&apos;ll show you exactly which.</p>
          </details>
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-white/15 p-6 text-sm text-white/50">
          Publish your site first, then you can claim a domain.
          <div className="mt-3"><Link href="/dashboard/publish" className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black">Choose a plan</Link></div>
        </section>
      )}
    </div>
  );
}
