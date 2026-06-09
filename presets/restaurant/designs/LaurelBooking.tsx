"use client";

import { useState } from "react";

const GREEN = "#163d2b";
const GOLD = "#b8975a";

const fieldCls =
  "w-full border-0 border-b bg-transparent pb-2 pt-1 text-[15px] outline-none transition";

// Signature persistent reservation widget for the Laurel design. Posts to the
// shared /api/site-forms pipeline (kind "booking"), which emails the business
// owner; sample/preview sites no-op with a success state.
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
    <div id="book" className="w-full">
      {status === "sent" ? (
        <p className="border px-5 py-6 text-center text-sm leading-relaxed" style={{ borderColor: `${GOLD}66`, color: GREEN }}>
          Thank you. Your reservation request is with us and we will confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit}>
          <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-end">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Guests</span>
              <select name="party" defaultValue="2 guests" className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }}>
                {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
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
            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full px-6 py-3 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: GREEN }}
            >
              {status === "sending" ? "Sending" : "Find a table"}
            </button>
          </div>

          <div className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Your name</span>
              <input name="cust_name" required className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Phone or email</span>
              <input name="contact" required className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: GOLD }}>Anything else?</span>
            <input name="notes" placeholder={`A note for ${name}`} className={fieldCls} style={{ borderColor: `${GREEN}33`, color: GREEN }} />
          </label>

          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="mt-4 text-sm text-red-700">{error}</p>}
        </form>
      )}
    </div>
  );
}
