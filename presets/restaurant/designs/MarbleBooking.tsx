"use client";

import { useState } from "react";

const GOLD = "#c9a227";
const EMBER = "#8a2b22";

const fieldCls =
  "w-full border-0 border-b border-white/25 bg-transparent pb-2 pt-1 text-[15px] text-[#efe8db] placeholder:text-white/40 outline-none transition focus:border-[#c9a227]";

// Functional reservation widget for the Marble design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the business owner;
// sample/preview sites (id starts "sample-") no-op with a success state.
// Honeypot field "company"; sending / sent / error states.
export function MarbleBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div id="book" className="h-fit p-8" style={{ border: `1px solid ${GOLD}`, background: "rgba(0,0,0,0.25)" }}>
      <p style={{ fontFamily: "var(--font-fraunces)", color: GOLD }} className="text-xl">Reserve a table</p>

      {status === "sent" ? (
        <p className="mt-6 border border-white/20 px-4 py-5 text-sm leading-relaxed text-[#efe8db]/80">
          Thank you, your reservation request is in. We&apos;ll confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-6">
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Venue</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Number of guests</span>
            <select name="party" className={fieldCls} defaultValue="2 guests">
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                <option key={g} className="text-neutral-900">{g}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-white/50">Date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-white/50">Time</span>
              <select name="time" className={fieldCls} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map((t) => (
                  <option key={t} className="text-neutral-900">{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Phone or email</span>
            <input name="contact" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Anything else?</span>
            <input name="notes" className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#efe8db] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: EMBER }}
          >
            {status === "sending" ? "Sending…" : "Reserve a table"}
          </button>
        </form>
      )}
    </div>
  );
}
