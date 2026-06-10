"use client";

import { useState } from "react";

const EUCALYPTUS = "#6E8B7A";
const SLATE = "#2E3A3A";
const CREAM = "#F4F0E8";
const STONE = "#D8CFC2";
const COPPER = "#B07F5A";

const fieldCls =
  "mt-2 w-full rounded-2xl border bg-white/70 px-4 py-3 text-sm text-[#2E3A3A] outline-none transition placeholder:text-[#2E3A3A]/40 focus:bg-white focus:border-[#6E8B7A]";

// Reservation widget for the Thermae day spa. It sits inside a calm cream panel
// and posts to the shared /api/site-forms pipeline (kind "booking"), exactly
// like SerenBooking — name / contact / date / time / party(=treatment) / notes
// plus the "company" honeypot, and the same idle/sending/sent/error states.
export function ThermaeBooking({ tenantId, name }: { tenantId: string; name: string }) {
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

  const fieldBorder = { borderColor: "rgba(110,139,122,0.28)" } as const;
  const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#2E3A3A]/70";

  return (
    <div
      className="relative overflow-hidden rounded-[2rem] p-7 sm:p-9"
      style={{ background: CREAM, border: "1px solid rgba(110,139,122,0.22)" }}
    >
      {/* soft ripple motif */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(176,127,90,0.16), transparent 70%)" }}
      />
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: COPPER }}>
        Reserve
      </p>
      <h3 style={{ fontFamily: "var(--font-fraunces)", color: SLATE }} className="mt-2 text-2xl sm:text-3xl">
        Begin your ritual
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-[#2E3A3A]/70">
        Share the experience you long for and a time that suits. We will confirm your reservation at {name} by phone or email.
      </p>

      {status === "sent" ? (
        <p
          className="mt-6 rounded-2xl px-5 py-6 text-sm leading-relaxed"
          style={{ background: "rgba(110,139,122,0.12)", color: SLATE }}
        >
          Thank you. Your reservation request has drifted in, and we will be in touch very soon to confirm your moment of calm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelCls}>
              Your name
              <input name="cust_name" required className={fieldCls} style={fieldBorder} placeholder="Full name" />
            </label>
            <label className={labelCls}>
              Phone or email
              <input name="contact" required className={fieldCls} style={fieldBorder} placeholder="How to reach you" />
            </label>
          </div>
          <label className={labelCls}>
            Treatment or journey
            <input name="treatment" className={fieldCls} style={fieldBorder} placeholder="e.g. thermal journey, deep-tissue massage" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={labelCls}>
              Preferred date
              <input name="date" type="date" className={fieldCls} style={fieldBorder} />
            </label>
            <label className={labelCls}>
              Preferred time
              <input name="time" type="time" className={fieldCls} style={fieldBorder} />
            </label>
          </div>
          <label className={labelCls}>
            Anything we should know
            <textarea name="notes" rows={3} className={fieldCls} style={fieldBorder} placeholder="Preferences, occasions or questions" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm" style={{ color: COPPER }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-full py-4 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: status === "sending" ? STONE : EUCALYPTUS }}
          >
            {status === "sending" ? "Sending..." : "Request reservation"}
          </button>
        </form>
      )}
    </div>
  );
}
