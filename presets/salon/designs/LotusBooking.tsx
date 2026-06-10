"use client";

import { useState } from "react";

const CLAY = "#B5623E";
const INK = "#23211C";
const JADE = "#5E7C6B";
const CREAM = "#F3ECDD";

const fieldCls =
  "mt-1.5 w-full rounded-md border bg-white/70 px-3.5 py-2.5 text-sm text-[#23211C] outline-none transition placeholder:text-[#23211C]/40 focus:border-[#B5623E]";

// Booking widget for the Lotus acupuncture clinic. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner; sample /
// preview sites no-op with a success state. Visually it is a warm card on
// rice-paper cream with an ink heading and a jade hairline frame — distinct
// from the rose-on-rose Seren panel.
export function LotusBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        party: data.get("treatment") ?? "",
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

  const borderStyle = { borderColor: "rgba(94,124,107,0.35)" } as const;

  return (
    <div
      className="rounded-2xl p-7 sm:p-9"
      style={{ background: CREAM, border: `1px solid rgba(94,124,107,0.4)`, boxShadow: "0 24px 60px rgba(35,33,28,0.10)" }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: JADE }}>
        Begin your treatment
      </p>
      <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="mt-2 text-2xl" >
        Request a consultation
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed text-[#23211C]/65">
        Tell us a little about how you are feeling and a time that suits. We will confirm your first visit by phone or email.
      </p>

      {status === "sent" ? (
        <p
          className="mt-6 rounded-md px-4 py-5 text-sm leading-relaxed text-[#23211C]"
          style={{ background: "rgba(94,124,107,0.12)", border: "1px solid rgba(94,124,107,0.4)" }}
        >
          Thank you. Your request has reached us, and we will be in touch very soon to arrange your first appointment.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#23211C]/60">
              Your name
              <input name="cust_name" required className={fieldCls} style={borderStyle} placeholder="Full name" />
            </label>
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#23211C]/60">
              Phone or email
              <input name="contact" required className={fieldCls} style={borderStyle} placeholder="How to reach you" />
            </label>
          </div>
          <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#23211C]/60">
            Treatment of interest
            <input name="treatment" className={fieldCls} style={borderStyle} placeholder="e.g. acupuncture, herbal consultation, cupping" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#23211C]/60">
              Preferred date
              <input name="date" type="date" className={fieldCls} style={borderStyle} />
            </label>
            <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#23211C]/60">
              Preferred time
              <input name="time" type="time" className={fieldCls} style={borderStyle} />
            </label>
          </div>
          <label className="block text-[11px] font-medium uppercase tracking-[0.14em] text-[#23211C]/60">
            What brings you in
            <textarea name="notes" rows={3} className={fieldCls} style={borderStyle} placeholder="Concerns, symptoms, or anything you would like us to know" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm" style={{ color: CLAY }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: CLAY }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
