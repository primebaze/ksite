"use client";

import { useState } from "react";

const TEAL = "#3A5159";
const OAT = "#F2EDE3";
const SAGE = "#8FA391";
const INK = "#232A2C";

const fieldCls =
  "mt-1.5 w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition placeholder:text-[#232A2C]/35 focus:border-[#3A5159]";
const fieldStyle = { borderColor: "rgba(35,42,44,0.16)", background: "#fff", color: INK } as const;

// Booking widget for the Stillwater massage & bodywork design. Posts to the
// shared /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview sites no-op with a success state. Styled as a calm oat panel
// with a teal-grey submit — the form is restful, not loud. Field names match
// the Seren contract exactly (party carries the chosen treatment).
export function StillwaterBooking({ tenantId, name }: { tenantId: string; name: string }) {
  void name;
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

  return (
    <div className="rounded-2xl p-7 sm:p-9" style={{ background: OAT, border: "1px solid rgba(35,42,44,0.08)" }}>
      <div className="flex items-center gap-2.5">
        <span aria-hidden className="h-px w-8" style={{ background: SAGE }} />
        <span className="text-[11px] font-semibold uppercase tracking-[0.26em]" style={{ color: SAGE }}>
          Book a session
        </span>
      </div>
      <h3 style={{ fontFamily: "var(--font-fraunces)", color: TEAL }} className="mt-3 text-2xl">
        Request your appointment
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(35,42,44,0.65)" }}>
        Choose a treatment and a time that suits you. We will confirm by phone or email — no rush, no pressure.
      </p>

      {status === "sent" ? (
        <p
          className="mt-6 rounded-lg px-4 py-5 text-sm leading-relaxed"
          style={{ background: "#fff", color: INK, border: "1px solid rgba(35,42,44,0.1)" }}
        >
          Thank you. Your request is in — we will be in touch shortly to confirm your session.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.6)" }}>
              Your name
              <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Full name" />
            </label>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.6)" }}>
              Phone or email
              <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="How to reach you" />
            </label>
          </div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.6)" }}>
            Treatment
            <input name="treatment" className={fieldCls} style={fieldStyle} placeholder="e.g. deep tissue, sports, Swedish" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.6)" }}>
              Preferred date
              <input name="date" type="date" className={fieldCls} style={fieldStyle} />
            </label>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.6)" }}>
              Preferred time
              <input name="time" type="time" className={fieldCls} style={fieldStyle} />
            </label>
          </div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em]" style={{ color: "rgba(35,42,44,0.6)" }}>
            Where you hold tension
            <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Tell us about any areas of focus or injuries" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm" style={{ color: "#a23a32" }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-full py-3.5 text-center text-[11px] font-semibold uppercase tracking-[0.2em] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: TEAL, color: OAT }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
