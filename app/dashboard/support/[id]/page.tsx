import Link from "next/link";
import { notFound } from "next/navigation";
import { getMyTicket } from "@/lib/support";
import { TicketThread, TicketStatusBadge } from "@/components/TicketThread";
import { replyTicket } from "../actions";

export const dynamic = "force-dynamic";

export default async function ClientTicket({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const data = await getMyTicket(id);
  if (!data) notFound();
  const { ticket, messages } = data;
  const closed = ticket.status === "closed";
  const ref = `#${ticket.id.slice(0, 8).toUpperCase()}`;
  const opened = new Date(ticket.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="mx-auto max-w-3xl">
      <Link href="/dashboard/support" className="text-sm text-ink/50 hover:text-ink">← All requests</Link>
      <div className="mt-3 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{ticket.subject}</h1>
          <p className="mt-1 text-sm text-ink/40">Ticket {ref} · opened {opened}</p>
        </div>
        <TicketStatusBadge status={ticket.status} />
      </div>

      <div className="mt-6 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-5 sm:p-6">
        <TicketThread messages={messages} mineRole="client" />
      </div>

      {closed ? (
        <form action={replyTicket} className="mt-4">
          <input type="hidden" name="id" value={id} />
          <p className="text-sm text-ink/45">
            This request is closed. <button name="body" value="Reopening this request." className="text-accent underline hover:text-accent">Reopen it</button> if you still need help.
          </p>
        </form>
      ) : (
        <form action={replyTicket} className="mt-4 space-y-3">
          <input type="hidden" name="id" value={id} />
          <textarea
            name="body"
            required
            rows={3}
            placeholder="Write a reply…"
            className="w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-3.5 py-2.5 text-sm text-ink placeholder-ink/25 outline-none transition focus:border-ink/25 focus:bg-ink/[0.05]"
          />
          <div className="flex justify-end">
            <button className="rounded-xl bg-ink px-4 py-2.5 text-sm font-semibold text-paper transition hover:bg-ink/90">Send reply</button>
          </div>
        </form>
      )}
    </div>
  );
}
