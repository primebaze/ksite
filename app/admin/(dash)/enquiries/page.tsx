import Link from "next/link";
import { listRecentSubmissions } from "@/lib/admin";

export const dynamic = "force-dynamic";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

export default async function AdminEnquiries() {
  const items = await listRecentSubmissions(150);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <Link href="/admin" className="text-sm text-white/50 hover:text-white">← Clients</Link>
      </div>
      <p className="mt-1 text-sm text-white/50">Booking and contact submissions from every client site, newest first.</p>

      {items.length === 0 ? (
        <p className="mt-8 text-white/50">No enquiries yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((s) => (
            <li key={s.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.kind === "booking" ? "bg-emerald-400/15 text-emerald-300" : "bg-sky-400/15 text-sky-300"}`}>
                  {s.kind === "booking" ? "Booking" : "Message"}
                </span>
                <span className="font-medium">{s.business_name}</span>
                {s.status === "new" && <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">New</span>}
                <span className="ml-auto text-xs text-white/40">{fmt(s.created_at)}</span>
              </div>

              <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {s.lines.map((l, i) => (
                  <div key={i} className="flex gap-2">
                    <dt className="shrink-0 text-white/40">{l.label}:</dt>
                    <dd className="text-white/80">{l.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3 flex items-center gap-4 text-sm">
                {s.reply_to && (
                  <a
                    href={s.reply_to.includes("@") ? `mailto:${s.reply_to}` : `tel:${s.reply_to}`}
                    className="text-emerald-400 hover:underline"
                  >
                    Reply to {s.reply_to}
                  </a>
                )}
                <Link href={`/admin/${s.tenant_id}`} className="text-white/50 hover:text-white">Open client</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
