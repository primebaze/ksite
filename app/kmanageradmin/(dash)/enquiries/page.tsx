import Link from "next/link";
import { listRecentSubmissions } from "@/lib/admin";
import { markAllEnquiriesRead, markEnquiry } from "./actions";

export const dynamic = "force-dynamic";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const smBtn = "rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink/70 transition hover:bg-ink/[0.06]";

export default async function AdminEnquiries() {
  const items = await listRecentSubmissions(150);
  const newCount = items.filter((s) => s.status === "new").length;

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Enquiries</h1>
        <Link href="/kmanageradmin" className="text-sm text-ink/50 hover:text-ink">← Clients</Link>
      </div>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink/50">Booking and contact submissions from every client site, newest first.</p>
        {newCount > 0 && (
          <form action={markAllEnquiriesRead}>
            <button className={smBtn}>Mark all as read ({newCount})</button>
          </form>
        )}
      </div>

      {items.length === 0 ? (
        <p className="mt-8 text-ink/50">No enquiries yet.</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {items.map((s) => (
            <li key={s.id} className="rounded-xl border border-ink/10 bg-ink/[0.03] p-5">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${s.kind === "booking" ? "bg-emerald-400/15 text-accent" : "bg-sky-400/15 text-sky-300"}`}>
                  {s.kind === "booking" ? "Booking" : "Message"}
                </span>
                <span className="font-medium">{s.business_name}</span>
                {s.status === "new" && <span className="rounded-full bg-amber-400/15 px-2 py-0.5 text-xs text-amber-300">New</span>}
                <span className="ml-auto text-xs text-ink/40">{fmt(s.created_at)}</span>
              </div>

              <dl className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
                {s.lines.map((l, i) => (
                  <div key={i} className="flex gap-2">
                    <dt className="shrink-0 text-ink/40">{l.label}:</dt>
                    <dd className="text-ink/80">{l.value}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                {s.reply_to && (
                  <a
                    href={s.reply_to.includes("@") ? `mailto:${s.reply_to}` : `tel:${s.reply_to}`}
                    className="text-accent hover:underline"
                  >
                    Reply to {s.reply_to}
                  </a>
                )}
                <Link href={`/kmanageradmin/${s.tenant_id}`} className="text-ink/50 hover:text-ink">Open client</Link>
                <span className="ml-auto flex items-center gap-2">
                  {s.status === "new" && (
                    <form action={markEnquiry}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="status" value="read" />
                      <button className="rounded-lg border border-ink/15 px-3 py-1.5 text-xs font-medium text-ink/70 transition hover:bg-ink/[0.06]">Mark as read</button>
                    </form>
                  )}
                  {s.status !== "archived" && (
                    <form action={markEnquiry}>
                      <input type="hidden" name="id" value={s.id} />
                      <input type="hidden" name="status" value="archived" />
                      <button className="rounded-lg px-3 py-1.5 text-xs font-medium text-ink/45 transition hover:text-ink/70">Archive</button>
                    </form>
                  )}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
