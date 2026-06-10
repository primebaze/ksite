"use client";

import { useState } from "react";

const NIGHT = "#20235C";
const AQUA = "#4FD1C5";

const fieldCls =
  "mt-1.5 w-full rounded-xl border border-white/15 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#4FD1C5] focus:bg-white/[0.1]";

// Booking widget for the Aurora IV-drip clinic. A glassy dark-indigo panel with
// an aurora-gradient glow. Posts to the shared /api/site-forms pipeline
// (kind "booking") which emails the owner; sample/preview sites no-op into a
// success state. Same field contract as every salon design (the "party" field
// carries the chosen drip / treatment).
export function AuroraBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        party: data.get("drip") ?? "",
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
      setError("Network error. Please try again.");
    }
  }

  return (
    <div
      className="relative overflow-hidden rounded-3xl p-7 sm:p-9"
      style={{
        background: NIGHT,
        border: `1px solid ${AQUA}33`,
        boxShadow: "0 30px 80px -30px rgba(15,17,50,0.7)",
      }}
    >
      {/* aurora glow */}
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full blur-3xl"
        style={{ background: `radial-gradient(circle, ${AQUA}55, transparent 65%)` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, #E7A2B055, transparent 65%)" }}
        aria-hidden
      />

      <div className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: AQUA }}>
          Book your session
        </p>
        <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="mt-2 text-2xl text-white">
          Reserve a drip at {name}
        </h3>
        <p className="mt-1.5 text-sm text-white/65">
          Pick a drip and a time that suits. Our nurses confirm every booking by phone or email.
        </p>

        {status === "sent" ? (
          <p className="mt-6 rounded-2xl border border-white/15 bg-white/[0.06] px-4 py-5 text-sm leading-relaxed text-white">
            You are on the list. We will be in touch shortly to confirm your infusion.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Your name
                <input name="cust_name" required className={fieldCls} placeholder="Full name" />
              </label>
              <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Phone or email
                <input name="contact" required className={fieldCls} placeholder="How to reach you" />
              </label>
            </div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
              Drip or treatment
              <input name="drip" className={fieldCls} placeholder="e.g. Energy boost, Glow infusion" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Preferred date
                <input name="date" type="date" className={`${fieldCls} [color-scheme:dark]`} />
              </label>
              <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
                Preferred time
                <input name="time" type="time" className={`${fieldCls} [color-scheme:dark]`} />
              </label>
            </div>
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/70">
              Anything else
              <textarea name="notes" rows={3} className={fieldCls} placeholder="Goals, allergies, questions" />
            </label>
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
            {status === "error" && <p className="text-sm text-[#E7A2B0]">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] transition hover:brightness-110 disabled:opacity-60"
              style={{ background: AQUA, color: NIGHT, boxShadow: `0 10px 30px ${AQUA}44` }}
            >
              {status === "sending" ? "Sending..." : "Request my drip"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
