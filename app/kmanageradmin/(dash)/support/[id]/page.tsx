import Link from "next/link";
import { notFound } from "next/navigation";
import { getTicketFull } from "@/lib/admin";
import { TicketThread, TicketStatusBadge } from "@/components/TicketThread";
import { replyTicket, updateStatus } from "../actions";

export const dynamic = "force-dynamic";

const input =
  "w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder-ink/25 outline-none transition focus:border-ink/25 focus:bg-ink/[0.05]";
const ghostBtn = "rounded-lg border border-ink/15 px-3 py-1.5 text-sm font-medium text-ink/75 transition hover:bg-ink/[0.06]";

export default async function AdminTicket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getTicketFull(id);
  if (!data) notFound();
  const { ticket, messages, clientEmail } = data;
  const ref = `#${ticket.id.slice(0, 8).toUpperCase()}`;
  const opened = new Date(ticket.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/kmanageradmin/support" className="text-sm text-ink/50 hover:text-ink">← Support</Link>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold">{ticket.subject}</h1>
          <p className="mt-1 text-sm text-ink/45">
            Ticket {ref} ·{" "}
            <Link href={`/kmanageradmin/${ticket.tenant_id}`} className="text-accent hover:underline">{ticket.business_name}</Link>
            {clientEmail && <> · {clientEmail}</>} · opened {opened}
          </p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      {/* Status controls */}
      <div className="mt-4 flex flex-wrap gap-2">
        {(["open", "pending", "closed"] as const).map((s) => (
          <form key={s} action={updateStatus}>
            <input type="hidden" name="id" value={id} />
            <input type="hidden" name="status" value={s} />
            <button
              className={`${ghostBtn} ${ticket.status === s ? "border-ink/40 text-ink" : ""}`}
              disabled={ticket.status === s}
            >
              {s === "pending" ? "Mark awaiting reply" : s === "open" ? "Mark open" : "Close"}
            </button>
          </form>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-5 sm:p-6">
        <TicketThread messages={messages} mineRole="staff" />
      </div>

      <form action={replyTicket} className="mt-4 space-y-3">
        <input type="hidden" name="id" value={id} />
        <textarea name="body" required rows={3} placeholder="Reply to the client…" className={input} />
        <div className="flex justify-end">
          <button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">Send reply</button>
        </div>
      </form>
    </div>
  );
}
