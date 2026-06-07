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
      <Link href="/admin" className="text-sm text-stone-500 hover:underline">
        ← Clients
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">New client</h1>
      <p className="mt-1 text-sm text-stone-500">Creates an empty draft site you can fill in next.</p>

      <form action={createTenantAction} className="mt-6 space-y-4 rounded-xl border border-stone-200 bg-white p-6">
        <div>
          <label className="block text-sm font-medium">Business name</label>
          <input name="business_name" required className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm" />
        </div>

        <div>
          <label className="block text-sm font-medium">Preset</label>
          <select name="preset" className="mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm">
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
              className="w-full rounded-l-md border border-stone-300 px-3 py-2 text-sm lowercase"
            />
            <span className="rounded-r-md border border-l-0 border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-500">
              .yourapp.com
            </span>
          </div>
          <p className="mt-1 text-xs text-stone-400">Lowercase letters, numbers and hyphens only.</p>
        </div>

        {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

        <button className="rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white">Create client</button>
      </form>
    </div>
  );
}
