import Link from "next/link";
import { listTenants, getAdminStats, type TenantListRow } from "@/lib/admin";
import { SITE_BASE } from "@/lib/marketing";

export const dynamic = "force-dynamic";

function StatusBadge({ published, planStatus }: { published: boolean; planStatus: string }) {
  if (!published) return <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-600">Draft</span>;
  const live = planStatus === "active" || planStatus === "trialing";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${live ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
      {live ? "Live" : planStatus}
    </span>
  );
}

function DomainBadge({ t }: { t: TenantListRow }) {
  if (!t.custom_domain) return <span className="text-stone-400">{t.subdomain}.{SITE_BASE}</span>;
  const live = t.domain_status === "active";
  return (
    <span className={live ? "text-stone-600" : "text-amber-600"}>
      {t.custom_domain}{!live && <span className="text-xs"> · {t.domain_status}</span>}
    </span>
  );
}

function Stat({ label, value, accent }: { label: string; value: number; accent?: boolean }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white px-5 py-4">
      <p className={`text-2xl font-semibold ${accent ? "text-emerald-600" : "text-stone-900"}`}>{value}</p>
      <p className="mt-0.5 text-xs uppercase tracking-wide text-stone-500">{label}</p>
    </div>
  );
}

function liveUrl(t: TenantListRow) {
  if (t.custom_domain) return `https://${t.custom_domain}`;
  const proto = SITE_BASE.includes("localhost") ? "http" : "https";
  return `${proto}://${t.subdomain}.${SITE_BASE}`;
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default async function AdminHome() {
  const [tenants, stats] = await Promise.all([listTenants(), getAdminStats()]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Link href="/admin/new" className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white">
          + New client
        </Link>
      </div>

      {/* Overview */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <Stat label="Clients" value={stats.total} />
        <Stat label="Live" value={stats.live} accent />
        <Stat label="Drafts" value={stats.drafts} />
        <Stat label="Custom domains" value={stats.domainsLive} />
        <Link href="/admin/enquiries" className="rounded-xl border border-stone-200 bg-white px-5 py-4 transition hover:border-stone-400">
          <p className="text-2xl font-semibold text-stone-900">{stats.enquiries}</p>
          <p className="mt-0.5 text-xs uppercase tracking-wide text-stone-500">
            Enquiries{stats.newEnquiries > 0 && <span className="ml-1 text-emerald-600">· {stats.newEnquiries} new</span>}
          </p>
        </Link>
      </div>

      {tenants.length === 0 ? (
        <p className="mt-8 text-stone-500">No clients yet. Create your first one.</p>
      ) : (
        <ul className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
          {tenants.map((t) => (
            <li key={t.id} className="flex items-center justify-between gap-4 px-5 py-4">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <Link href={`/admin/${t.id}`} className="font-medium hover:underline">{t.business_name}</Link>
                  <StatusBadge published={t.published} planStatus={t.plan_status} />
                  {t.plan && <span className="rounded-full bg-stone-100 px-2 py-0.5 text-xs capitalize text-stone-500">{t.plan}</span>}
                </div>
                <p className="mt-0.5 truncate text-sm text-stone-500">
                  <span className="uppercase tracking-wide">{t.preset}</span> · <DomainBadge t={t} /> · joined {fmtDate(t.created_at)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-4 text-sm">
                <a href={liveUrl(t)} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">View ↗</a>
                <Link href={`/admin/${t.id}`} className="rounded-md border border-stone-300 px-3 py-1.5">Edit</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
