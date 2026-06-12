import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { SITE_BASE } from "@/lib/marketing";
import { dnsInstructions, isVercelConfigured } from "@/lib/vercel";
import { DomainSearch } from "@/components/DomainSearch";
import { DomainStatusPoller } from "@/components/DomainStatusPoller";
import { checkStatus, connectExisting, disconnectDomain } from "./actions";

export const dynamic = "force-dynamic";

export default async function DomainsPage({
  searchParams,
}: {
  searchParams: Promise<{ claimed?: string; error?: string; launch?: string }>;
}) {
  const { claimed, error, launch } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const subscribed = tenant.plan_status === "active" || tenant.published;
  const custom = tenant.custom_domain;
  const subUrl = `https://${tenant.subdomain}.${SITE_BASE}`;
  const dns = custom ? dnsInstructions(custom) : null;
  const baseName = tenant.business_name
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "")
    .slice(0, 28) || tenant.subdomain;

  return (
    <div className="max-w-3xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">{launch ? "Final step" : "Domains"}</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">{launch ? "Choose your custom domain." : "Your domains"}</h1>
          {launch && (
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink/50">
              We launch all websites directly into your own custom domain. Your plan already includes the domain cost.
              Pick a unique name and we&apos;ll attach hosting, SSL and routing for you.
            </p>
          )}
        </div>
        <Link href="/dashboard" className="text-sm text-ink/55 hover:text-ink">← Overview</Link>
      </div>

      {claimed && <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/5 px-4 py-3 text-sm text-accent">🎉 Your domain is live!</p>}
      {error && <p className="rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
      {!isVercelConfigured() && (
        <p className="rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink/55">Custom domains are being switched on. Check back shortly.</p>
      )}

      {/* Free address */}
      <section className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
        <p className="text-xs uppercase tracking-widest text-ink/40">Free address</p>
        <p className="mt-1 font-medium">{tenant.subdomain}.{SITE_BASE}</p>
        <a href={subUrl} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent/90 hover:text-accent">Visit ↗</a>
      </section>

      {/* Custom domain */}
      {custom ? (
        <section className="rounded-2xl border border-ink/10 bg-ink/[0.02] p-6">
          {tenant.domain_status !== "active" && <DomainStatusPoller active={false} />}
          <div className="flex items-center justify-between">
            <p className="font-medium">{custom}</p>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${tenant.domain_status === "active" ? "bg-emerald-400/15 text-accent" : "bg-ink/10 text-ink/60"}`}>
              {tenant.domain_status === "active"
                ? "Live"
                : tenant.domain_status === "registering"
                  ? "Setting up…"
                  : tenant.domain_status === "verifying"
                    ? "Verifying…"
                    : "Pending DNS"}
            </span>
          </div>

          {tenant.domain_status === "active" ? (
            <a href={`https://${custom}`} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent/90 hover:text-accent">Visit ↗</a>
          ) : tenant.domain_status === "registering" ? (
            <p className="mt-3 text-sm text-ink/55">Setting up your domain. This usually takes a minute or two. Use “Check status” to refresh.</p>
          ) : (
            dns && (
              <div className="mt-4 rounded-lg border border-ink/10 bg-ink/[0.02] p-4 text-sm">
                <p className="text-ink/55">Add this one record at your domain provider, then check again:</p>
                <div className="mt-3 grid grid-cols-3 gap-2 font-mono text-xs text-ink/80">
                  <span>Type<br /><span className="text-ink">{dns.type}</span></span>
                  <span>Name<br /><span className="text-ink">{dns.name}</span></span>
                  <span>Value<br /><span className="text-ink">{dns.value}</span></span>
                </div>
              </div>
            )
          )}

          <div className="mt-4 flex gap-2">
            {tenant.domain_status !== "active" && (
              <form action={checkStatus}><button className="rounded-lg border border-ink/15 px-4 py-2 text-sm hover:bg-ink/5">Check status</button></form>
            )}
            <form action={disconnectDomain}><button className="rounded-lg border border-red-400/30 px-4 py-2 text-sm text-red-300 hover:bg-red-400/10">Remove</button></form>
          </div>
        </section>
      ) : subscribed ? (
        <section className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.04] p-6">
          <h2 className="font-semibold">Find a unique name</h2>
          <p className="mt-1 text-sm text-ink/50">
            Domain names are global, so the name must be available. Try your business name, location, or a short brand variation.
          </p>
          <div className="mt-4"><DomainSearch base={baseName} /></div>

          <details className="mt-6">
            <summary className="cursor-pointer text-sm text-ink/55">Already own a domain elsewhere?</summary>
            <form action={connectExisting} className="mt-3 flex gap-2">
              <input name="domain" placeholder="yourbusiness.com" className="w-full rounded-lg border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30" />
              <button className="shrink-0 rounded-lg border border-ink/15 px-5 py-3 text-sm font-medium hover:bg-ink/5">Connect</button>
            </form>
            <p className="mt-2 text-xs text-ink/35">You&apos;ll add one DNS record at your provider, and we&apos;ll show you exactly which.</p>
          </details>
        </section>
      ) : (
        <section className="rounded-2xl border border-dashed border-ink/15 p-6 text-sm text-ink/50">
          Publish your site first, then you can claim a domain.
          <div className="mt-3"><Link href="/dashboard/publish" className="rounded-lg bg-ink px-4 py-2 text-sm font-semibold text-paper">Choose a plan</Link></div>
        </section>
      )}
    </div>
  );
}
