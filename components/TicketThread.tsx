import type { TicketMessage } from "@/lib/types";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });

function PersonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="size-4" aria-hidden>
      <path d="M4 20a8 8 0 0116 0M12 11a4 4 0 100-8 4 4 0 000 8z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Renders a ticket as an attributed conversation thread (like a help-desk
// ticket, not a chat). Each entry shows who wrote it, when, and the body in a
// full-width block. `mineRole` only affects the "You" label.
export function TicketThread({ messages, mineRole }: { messages: TicketMessage[]; mineRole: "client" | "staff" }) {
  if (messages.length === 0) return <p className="text-sm text-white/40">No messages yet.</p>;
  return (
    <ol className="divide-y divide-white/[0.07]">
      {messages.map((m) => {
        const staff = m.author_role === "staff";
        const name = m.author_role === mineRole ? "You" : staff ? "Kovasite Support" : "Client";
        return (
          <li key={m.id} className="flex gap-3.5 py-5 first:pt-0 last:pb-0">
            <div className={`grid size-9 shrink-0 place-items-center rounded-full text-xs font-bold ${staff ? "bg-emerald-500 text-black" : "bg-white/10 text-white/70"}`}>
              {staff ? "K" : <PersonIcon />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <span className="text-sm font-semibold text-white">{name}</span>
                {staff && <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-300">Support</span>}
                <span className="text-xs text-white/35">{fmt(m.created_at)}</span>
              </div>
              <div className="mt-1.5 whitespace-pre-wrap text-sm leading-relaxed text-white/80">{m.body}</div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export function TicketStatusBadge({ status }: { status: string }) {
  const tone =
    status === "open"
      ? "bg-emerald-400/15 text-emerald-300"
      : status === "pending"
        ? "bg-amber-400/15 text-amber-300"
        : "bg-white/10 text-white/50";
  const label = status === "pending" ? "Awaiting reply" : status === "open" ? "Open" : "Closed";
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tone}`}>{label}</span>;
}
