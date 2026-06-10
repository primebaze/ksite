"use client";

import { useState } from "react";

const CHARCOAL = "#25282B";
const AMBER = "#D69A3C";
const BONE = "#EFEAE1";

const fieldCls =
  "mt-1.5 w-full border border-white/20 bg-white/[0.06] px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#D69A3C]";

// Booking widget for the Axis chiropractic-clinic design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner; sample /
// preview sites no-op with a success state. The panel sits on warm charcoal
// with an amber spine-line accent so it reads as structural and reassuring.
export function AxisBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div className="relative overflow-hidden p-7 sm:p-9" style={{ background: CHARCOAL }}>
      {/* vertical "axis" / spine line motif */}
      <span aria-hidden className="absolute left-0 top-0 h-full w-[3px]" style={{ background: AMBER }} />
      <p className="text-[11px] font-semibold uppercase tracking-[0.32em]" style={{ color: AMBER }}>
        Book an assessment
      </p>
      <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="mt-2 text-2xl text-white">
        Request your appointment
      </h3>
      <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "rgba(239,234,225,0.7)" }}>
        Tell us where it hurts and a time that suits. We will confirm by phone or email.
      </p>

      {status === "sent" ? (
        <p
          className="mt-6 border-l-2 px-4 py-5 text-sm leading-relaxed text-white"
          style={{ borderColor: AMBER, background: "rgba(255,255,255,0.05)" }}
        >
          Thank you — your appointment request is in. Our team will be in touch very soon to confirm your time.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(239,234,225,0.7)" }}>
              Your name
              <input name="cust_name" required className={fieldCls} placeholder="Full name" />
            </label>
            <label className="block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(239,234,225,0.7)" }}>
              Phone or email
              <input name="contact" required className={fieldCls} placeholder="How to reach you" />
            </label>
          </div>
          <label className="block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(239,234,225,0.7)" }}>
            Treatment of interest
            <input name="treatment" className={fieldCls} placeholder="e.g. spinal adjustment, posture review" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(239,234,225,0.7)" }}>
              Preferred date
              <input name="date" type="date" className={`${fieldCls} [color-scheme:dark]`} />
            </label>
            <label className="block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(239,234,225,0.7)" }}>
              Preferred time
              <input name="time" type="time" className={`${fieldCls} [color-scheme:dark]`} />
            </label>
          </div>
          <label className="block text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "rgba(239,234,225,0.7)" }}>
            What brings you in
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Describe your pain, posture concern or goals" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm" style={{ color: BONE }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: AMBER, color: CHARCOAL }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
