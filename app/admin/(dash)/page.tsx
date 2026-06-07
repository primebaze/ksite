import Link from "next/link";
import { listTenants } from "@/lib/admin";

export const dynamic = "force-dynamic";

function StatusBadge({ published, planStatus }: { published: boolean; planStatus: string }) {
  if (!published)
    return <span className="rounded-full bg-stone-200 px-2 py-0.5 text-xs text-stone-600">Draft</span>;
  const live = planStatus === "active" || planStatus === "trialing";
  return (
    <span className={`rounded-full px-2 py-0.5 text-xs ${live ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"}`}>
      {live ? "Live" : planStatus}
    </span>
  );
}

export default async function AdminHome() {
  const tenants = await listTenants();

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Clients</h1>
        <Link href="/admin/new" className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white">
          + New client
        </Link>
      </div>

      {tenants.length === 0 ? (
        <p className="mt-8 text-stone-500">No clients yet. Create your first one.</p>
      ) : (
        <ul className="mt-6 divide-y divide-stone-200 rounded-xl border border-stone-200 bg-white">
          {tenants.map((t) => (
            <li key={t.id} className="flex items-center justify-between px-5 py-4">
              <div>
                <div className="flex items-center gap-3">
                  <Link href={`/admin/${t.id}`} className="font-medium hover:underline">
                    {t.business_name}
                  </Link>
                  <StatusBadge published={t.published} planStatus={t.plan_status} />
                </div>
                <p className="mt-0.5 text-sm text-stone-500">
                  <span className="uppercase tracking-wide">{t.preset}</span> ·{" "}
                  {t.custom_domain ?? `${t.subdomain}.localhost:3000`}
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <a
                  href={`http://${t.subdomain}.localhost:3000`}
                  className="text-blue-600 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  View ↗
                </a>
                <Link href={`/admin/${t.id}`} className="rounded-md border border-stone-300 px-3 py-1.5">
                  Edit
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
