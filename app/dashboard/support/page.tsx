import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { listMyTickets } from "@/lib/support";
import { TicketStatusBadge } from "@/components/TicketThread";
import { openTicket } from "./actions";

export const dynamic = "force-dynamic";

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
const input =
  "w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder-ink/25 outline-none transition focus:border-ink/25 focus:bg-ink/[0.05]";

export default async function SupportPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const { error } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");
  const tickets = await listMyTickets();

  return (
    <div className="mx-auto max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Support</h1>
          <p className="mt-1 text-sm text-ink/45">Message the Kovasite team about a question, a change to your site, or anything not working. This is for help from us, not your customers.</p>
        </div>
        <Link href="/dashboard" className="text-sm text-ink/50 hover:text-ink">← Home</Link>
      </div>

      {error && <p className="mt-5 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

      {/* New request */}
      <details className="group mt-6 overflow-hidden rounded-2xl border border-ink/[0.08] bg-ink/[0.02] open:border-ink/15">
        <summary className="flex cursor-pointer list-none items-center justify-between px-5 py-4 [&::-webkit-details-marker]:hidden">
          <span className="font-medium text-ink">New request</span>
          <span className="rounded-lg bg-ink px-3.5 py-1.5 text-sm font-semibold text-paper transition group-open:bg-ink/10 group-open:text-ink">
            <span className="group-open:hidden">Start</span><span className="hidden group-open:inline">Close</span>
          </span>
        </summary>
        <form action={openTicket} className="space-y-4 border-t border-ink/[0.08] p-5">
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink/55">Subject</label>
            <input name="subject" required placeholder="e.g. Can you change my opening hours?" className={input} />
          </div>
          <div>
            <label className="mb-1.5 block text-[13px] font-medium text-ink/55">Message</label>
            <textarea name="body" required rows={4} placeholder="Tell us what you need…" className={input} />
          </div>
          <div className="flex justify-end">
            <button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">Send request</button>
          </div>
        </form>
      </details>

      {/* Tickets */}
      <div className="mt-6 space-y-2.5">
        {tickets.length === 0 ? (
          <p className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] px-5 py-8 text-center text-sm text-ink/40">
            No requests yet. Open one above and we&apos;ll get back to you.
          </p>
        ) : (
          tickets.map((t) => (
            <Link
              key={t.id}
              href={`/dashboard/support/${t.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] px-5 py-4 transition hover:border-ink/20 hover:bg-ink/[0.04]"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-ink">{t.subject}</p>
                <p className="mt-0.5 text-xs text-ink/40">Updated {fmt(t.last_message_at)}</p>
              </div>
              <TicketStatusBadge status={t.status} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
