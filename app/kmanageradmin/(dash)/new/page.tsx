import Link from "next/link";
import { VERTICALS } from "@/lib/verticals";
import { SITE_BASE } from "@/lib/marketing";
import { createTenantAction } from "../actions";

export default async function NewClientPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <div className="max-w-lg">
      <Link href="/kmanageradmin" className="text-sm text-ink/50 hover:underline">
        ← Clients
      </Link>
      <h1 className="mt-2 text-2xl font-semibold">New client</h1>
      <p className="mt-1 text-sm text-ink/50">Creates an empty draft site you can fill in next.</p>

      <form action={createTenantAction} className="mt-6 space-y-4 rounded-xl border border-ink/10 bg-ink/[0.03] p-6">
        <div>
          <label className="block text-sm font-medium">Business name</label>
          <input name="business_name" required className="mt-1 w-full rounded-md border border-ink/10 bg-ink/5 px-3 py-2 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30" />
        </div>

        <div>
          <label className="block text-sm font-medium">Preset</label>
          <select name="preset" className="mt-1 w-full rounded-md border border-ink/10 bg-ink/5 px-3 py-2 text-sm text-ink outline-none focus:border-ink/30 [&>option]:bg-panel-2">
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
              className="w-full rounded-l-md border border-ink/10 bg-ink/5 px-3 py-2 text-sm lowercase text-ink placeholder-ink/30 outline-none focus:border-ink/30"
            />
            <span className="rounded-r-md border border-l-0 border-ink/10 bg-ink/[0.06] px-3 py-2 text-sm text-ink/50">
              .{SITE_BASE}
            </span>
          </div>
          <p className="mt-1 text-xs text-ink/40">Lowercase letters, numbers and hyphens only.</p>
        </div>

        <div>
          <label className="block text-sm font-medium">Owner email <span className="font-normal text-ink/40">(optional)</span></label>
          <input name="owner_email" type="email" placeholder="client@example.com" className="mt-1 w-full rounded-md border border-ink/10 bg-ink/5 px-3 py-2 text-sm text-ink placeholder-ink/30 outline-none focus:border-ink/30" />
          <p className="mt-1 text-xs text-ink/40">Links a client account so they can log in and manage this site. We&apos;ll create the account if it doesn&apos;t exist — set their password afterwards from the client&apos;s &ldquo;Client login&rdquo; card.</p>
        </div>

        {error && <p className="rounded-md bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

        <button className="rounded-md bg-emerald-500 px-4 py-2 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-400">Create client</button>
      </form>
    </div>
  );
}
