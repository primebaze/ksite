"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const CLAY = "#C07A52";
const OLIVE = "#3F4A33";
const OAT = "#F5EFE4";

const fieldCls =
  "mt-1.5 w-full rounded-full border px-4 py-2.5 text-sm outline-none transition placeholder:text-[#8a7f6c] focus:border-[#3F4A33]";
const fieldStyle = { background: "#fff", borderColor: "rgba(63,74,51,0.22)", color: OLIVE } as const;

// Booking widget for the Pivot osteopathy-clinic design. Lives inside the oat
// "your treatment journey" panel. Posts to the shared /api/site-forms pipeline
// (kind "booking"), which emails the owner; sample/preview sites no-op with a
// success state. Field shape matches Seren exactly (party = treatment).
export function PivotBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
      token: String(data.get("cf-turnstile-response") ?? ""),
      fields: {
        name: data.get("cust_name") ?? "",
        email: data.get("email") ?? "",
        phone: data.get("phone") ?? "",
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
    <div className="rounded-[2rem] border p-7 sm:p-9" style={{ background: OAT, borderColor: "rgba(63,74,51,0.14)" }}>
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full text-white" style={{ background: CLAY }} aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 3a9 9 0 1 0 9 9" /><path d="M12 7v5l3 2" /></svg>
        </span>
        <h3 style={{ fontFamily: "var(--font-fraunces)", color: OLIVE }} className="text-2xl">
          Book an appointment
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b6451" }}>
        Tell us what is bothering you and a time that suits. We will confirm your visit by phone or email.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded-2xl border px-4 py-5 text-sm leading-relaxed" style={{ borderColor: "rgba(63,74,51,0.2)", background: "#fff", color: OLIVE }}>
          Thank you, your request is in. {name} will be in touch very soon to confirm your appointment.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
              Your name
              <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Full name" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
              Email
              <input name="email" type="email" required autoComplete="email" className={fieldCls} style={fieldStyle} placeholder="you@example.com" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
              Phone
              <input name="phone" type="tel" autoComplete="tel" className={fieldCls} style={fieldStyle} placeholder="Optional" />
            </label>
          </div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
            Treatment of interest
            <input name="treatment" className={fieldCls} style={fieldStyle} placeholder="e.g. osteopathy, cranial, sports" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
              Preferred date
              <input name="date" type="date" className={fieldCls} style={fieldStyle} />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
              Preferred time
              <input name="time" type="time" className={fieldCls} style={fieldStyle} />
            </label>
          </div>
          <label className="block text-xs font-semibold uppercase tracking-[0.12em]" style={{ color: OLIVE }}>
            Anything else
            <textarea name="notes" rows={3} className={`${fieldCls} rounded-2xl`} style={fieldStyle} placeholder="Symptoms, history or questions" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm font-medium" style={{ color: CLAY }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: OLIVE }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
