import type { TicketMessage } from "@/lib/types";

const fmt = (iso: string) =>
  new Date(iso).toLocaleString("en-GB", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });

// Renders a ticket conversation. `mineRole` is the role of the viewer, so their
// own messages align right and read as "sent".
export function TicketThread({ messages, mineRole }: { messages: TicketMessage[]; mineRole: "client" | "staff" }) {
  if (messages.length === 0) return <p className="text-sm text-white/40">No messages yet.</p>;
  return (
    <div className="space-y-4">
      {messages.map((m) => {
        const mine = m.author_role === mineRole;
        return (
          <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
            <div className="max-w-[80%]">
              <div
                className={`whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                  mine ? "bg-white text-black" : "border border-white/10 bg-white/[0.04] text-white/90"
                }`}
              >
                {m.body}
              </div>
              <p className={`mt-1 text-[11px] text-white/35 ${mine ? "text-right" : "text-left"}`}>
                {mine ? "You" : m.author_role === "staff" ? "Kovasite support" : "Client"} · {fmt(m.created_at)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
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
