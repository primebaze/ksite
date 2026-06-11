import Link from "next/link";
import { listTenants, getAdminStats, getOpenTicketCount, type TenantListRow } from "@/lib/admin";
import { SITE_BASE } from "@/lib/marketing";
import { verticalFor } from "@/lib/verticals";

export const dynamic = "force-dynamic";

function StatusBadge({ published, planStatus }: { published: boolean; planStatus: string }) {
  if (!published) return <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs text-ink/55">Draft</span>;
  const live = planStatus === "active" || planStatus === "trialing";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${live ? "bg-emerald-400/15 text-accent" : "bg-amber-400/15 text-amber-300"}`}>
      {live ? "Live" : planStatus}
    </span>
  );
}

function DomainBadge({ t }: { t: TenantListRow }) {
  if (!t.custom_domain) return <span className="text-ink/35">{t.subdomain}.{SITE_BASE}</span>;
  const live = t.domain_status === "active";
  return (
    <span className={live ? "text-ink/55" : "text-amber-300"}>
      {t.custom_domain}{!live && <span className="text-xs"> · {t.domain_status}</span>}
    </span>
  );
}

function Stat({ label, value, accent, href }: { label: string; value: number; accent?: "emerald" | "amber"; href?: string }) {
  const color = accent === "emerald" ? "text-accent" : accent === "amber" ? "text-amber-300" : "text-ink";
  const body = (
    <>
      <p className={`text-3xl font-semibold tracking-tight ${value > 0 ? color : "text-ink"}`}>{value}</p>
      <p className="mt-1 text-xs font-medium uppercase tracking-wide text-ink/40">{label}</p>
    </>
  );
  const cls = "rounded-2xl border border-ink/[0.08] bg-ink/[0.02] px-5 py-5";
  return href ? (
    <Link href={href} className={`${cls} transition hover:border-ink/20 hover:bg-ink/[0.04]`}>{body}</Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function liveUrl(t: TenantListRow) {
  if (t.custom_domain) return `https://${t.custom_domain}`;
  const proto = SITE_BASE.includes("localhost") ? "http" : "https";
  return `${proto}://${t.subdomain}.${SITE_BASE}`;
}

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const initialOf = (name: string) => (name.trim()[0] ?? "?").toUpperCase();

export default async function AdminHome() {
  const [tenants, stats, openTickets] = await Promise.all([listTenants(), getAdminStats(), getOpenTicketCount()]);

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Overview</h1>
          <p className="mt-1 text-sm text-ink/45">Every client site, billing and activity in one place.</p>
        </div>
        <Link href="/kmanageradmin/new" className="rounded-xl bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400">
          + New client
        </Link>
      </div>

      {/* Stats */}
      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Clients" value={stats.total} />
        <Stat label="Live" value={stats.live} accent="emerald" />
        <Stat label="Drafts" value={stats.drafts} />
        <Stat label="Domains" value={stats.domainsLive} />
        <Stat label="Enquiries" value={stats.newEnquiries} accent="emerald" href="/kmanageradmin/enquiries" />
        <Stat label="Open tickets" value={openTickets} accent="amber" href="/kmanageradmin/support?status=open" />
      </div>

      {/* Clients */}
      <div className="mt-10 flex items-center justify-between">
        <h2 className="text-lg font-semibold">Clients</h2>
        <span className="text-sm text-ink/40">{tenants.length} total</span>
      </div>

      {tenants.length === 0 ? (
        <p className="mt-4 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] px-5 py-10 text-center text-sm text-ink/40">
          No clients yet. Create your first one.
        </p>
      ) : (
        <ul className="mt-4 overflow-hidden rounded-2xl border border-ink/[0.08] bg-ink/[0.02]">
          {tenants.map((t) => (
            <li key={t.id} className="flex items-center gap-4 border-b border-ink/[0.06] px-4 py-4 transition last:border-b-0 hover:bg-ink/[0.03] sm:px-5">
              <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-ink/[0.06] text-sm font-semibold text-ink/80">
                {initialOf(t.business_name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Link href={`/kmanageradmin/${t.id}`} className="font-medium text-ink hover:underline">{t.business_name}</Link>
                  <StatusBadge published={t.published} planStatus={t.plan_status} />
                  {t.plan && <span className="rounded-full bg-ink/10 px-2 py-0.5 text-xs capitalize text-ink/50">{t.plan}</span>}
                </div>
                <p className="mt-0.5 truncate text-sm text-ink/40">
                  <span className="uppercase tracking-wide">{verticalFor(t.preset)?.label ?? t.preset}</span> · <DomainBadge t={t} /> · joined {fmtDate(t.created_at)}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a href={liveUrl(t)} target="_blank" rel="noreferrer" className="hidden rounded-lg px-3 py-1.5 text-sm text-accent transition hover:bg-ink/[0.06] sm:block">View ↗</a>
                <Link href={`/kmanageradmin/${t.id}`} className="rounded-lg border border-ink/12 px-3 py-1.5 text-sm font-medium text-ink/80 transition hover:bg-ink/[0.06]">Manage</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
