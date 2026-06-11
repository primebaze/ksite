import Link from "next/link";
import { listTickets } from "@/lib/admin";
import { TicketStatusBadge } from "@/components/TicketThread";
import type { TicketStatus } from "@/lib/types";

export const dynamic = "force-dynamic";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

const FILTERS: { key: string; label: string; status?: TicketStatus }[] = [
  { key: "open", label: "Open", status: "open" },
  { key: "pending", label: "Awaiting reply", status: "pending" },
  { key: "closed", label: "Closed", status: "closed" },
  { key: "all", label: "All" },
];

export default async function AdminSupport({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const active = FILTERS.find((f) => f.key === status) ?? FILTERS[0];
  const tickets = await listTickets(active.status);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Support</h1>
        <Link href="/admin" className="text-sm text-white/50 hover:text-white">← Clients</Link>
      </div>
      <p className="mt-1 text-sm text-white/45">Tickets from every client, newest activity first.</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <Link
            key={f.key}
            href={`/admin/support?status=${f.key}`}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition ${
              f.key === active.key ? "bg-white text-black" : "border border-white/12 text-white/70 hover:bg-white/[0.06]"
            }`}
          >
            {f.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 space-y-2.5">
        {tickets.length === 0 ? (
          <p className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-8 text-center text-sm text-white/40">
            No {active.label.toLowerCase()} tickets.
          </p>
        ) : (
          tickets.map((t) => (
            <Link
              key={t.id}
              href={`/admin/support/${t.id}`}
              className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-white">{t.subject}</p>
                <p className="mt-0.5 text-xs text-white/40">{t.business_name} · {fmt(t.last_message_at)}</p>
              </div>
              <TicketStatusBadge status={t.status} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
