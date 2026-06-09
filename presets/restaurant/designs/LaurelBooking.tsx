"use client";

import { useState } from "react";

const GREEN = "#163d2b";
const GOLD = "#b8975a";
const CREAM = "#f6f1e7";

const serif = { fontFamily: "var(--font-fraunces)" } as const;

const fieldCls =
  "mt-1 w-full border-0 border-b bg-transparent pb-2 pt-1 text-[15px] outline-none transition";

// Refined, boutique reservation widget for the Laurel design: a centred,
// gold-bordered card on its own reservations page (vertically stacked, unlike a
// horizontal booking bar). Posts to the shared /api/site-forms pipeline (kind
// "booking"), which emails the business owner; sample/preview sites (id starting
// "sample-") no-op with a success state.
export function LaurelBooking({ tenantId, name }: { tenantId: string; name: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "")) return; // honeypot
    const payload = {
      tenantId,
      kind: "booking",
      fields: {
        name: data.get("cust_name") ?? "",
        contact: data.get("contact") ?? "",
        date: data.get("date") ?? "",
        time: data.get("time") ?? "",
        party: data.get("party") ?? "",
        notes: data.get("notes") ?? "",
      },
    };
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/site-forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as { ok?: boolean; error?: string };
      if (json.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
        setError(json.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error, please try again.");
    }
  }

  return (
    <div
      className="relative mx-auto w-full max-w-lg p-9 sm:p-11"
      style={{ background: CREAM, border: `1px solid ${GOLD}`, boxShadow: `inset 0 0 0 5px ${CREAM}, inset 0 0 0 6px ${GOLD}44` }}
    >
      <p className="text-center text-[11px] uppercase tracking-[0.32em]" style={{ color: GOLD }}>Reservations</p>
      <p style={serif} className="mt-2 text-center text-2xl">Reserve at {name}</p>

      {status === "sent" ? (
        <p className="mt-8 border px-5 py-7 text-center text-sm leading-relaxed" style={{ borderColor: `${GOLD}66`, color: GREEN }}>
          Thank you. Your reservation request is with us and we will confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Number of guests</span>
            <select name="party" defaultValue="2 guests" className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }}>
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>

          <div className="mt-6 grid grid-cols-2 gap-6">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Date</span>
              <input name="date" type="date" required className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Time</span>
              <select name="time" defaultValue="7:00 PM" className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }}>
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="mt-6 block">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Your name</span>
            <input name="cust_name" required className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
          </label>

          <label className="mt-6 block">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
          </label>

          <label className="mt-6 block">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Anything else?</span>
            <input name="notes" placeholder={`A note for ${name}`} className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
          </label>

          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="mt-5 text-center text-sm text-red-700">{error}</p>}

          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-9 w-full px-6 py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: GREEN }}
          >
            {status === "sending" ? "Sending" : "Request reservation"}
          </button>
        </form>
      )}
    </div>
  );
}
