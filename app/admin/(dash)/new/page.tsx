import Link from "next/link";
import { VERTICALS } from "@/lib/verticals";
import { createTenantAction } from "../actions";

export default async function NewClientPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="max-w-lg">
      <Link href="/admin" className="text-sm text-white/50 hover:underline">
        ← Clients
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">New client</h1>
      <p className="mt-1 text-sm text-white/50">Creates an empty draft site you can fill in next.</p>

      <form action={createTenantAction} className="mt-6 space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-6">
        <div>
          <label className="block text-sm font-medium">Business name</label>
          <input name="business_name" required className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30" />
        </div>

        <div>
          <label className="block text-sm font-medium">Preset</label>
          <select name="preset" className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none focus:border-white/30 [&>option]:bg-neutral-900">
            {VERTICALS.map((v) => (
              <option key={v.key} value={v.key}>{v.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Subdomain</label>
          <div className="mt-1 flex items-center">
            <input
              name="subdomain"
              required
              pattern="[a-z0-9-]+"
              placeholder="acme"
              className="w-full rounded-l-md border border-white/10 bg-white/5 px-3 py-2 text-sm lowercase text-white placeholder-white/30 outline-none focus:border-white/30"
            />
            <span className="rounded-r-md border border-l-0 border-white/10 bg-white/[0.06] px-3 py-2 text-sm text-white/50">
              .yourapp.com
            </span>
          </div>
          <p className="mt-1 text-xs text-white/40">Lowercase letters, numbers and hyphens only.</p>
        </div>

        {error && <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

        <button className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400">Create client</button>
      </form>
    </div>
  );
}
