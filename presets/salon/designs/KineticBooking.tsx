"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const NAVY = "#122036";
const LIME = "#C6F24E";
const ORANGE = "#F2693C";

const fieldCls =
  "mt-2 w-full rounded-lg border border-white/15 bg-white/[0.06] px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/40 focus:border-[#C6F24E] focus:bg-white/10";

const labelCls =
  "block text-[11px] font-semibold uppercase tracking-[0.18em] text-white/55";

// Booking widget for the Kinetic sports-physio design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview sites no-op with a success state. The athletic navy card with
// a lime accent rail mirrors the rest of the design.
export function KineticBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div
      className="relative overflow-hidden rounded-2xl p-7 sm:p-9"
      style={{ background: NAVY }}
    >
      {/* lime accent rail */}
      <span className="absolute inset-y-0 left-0 w-1.5" style={{ background: LIME }} aria-hidden />
      {/* kinetic pulse motif */}
      <svg
        viewBox="0 0 200 40"
        className="absolute right-6 top-6 h-6 w-28 opacity-40"
        fill="none"
        stroke={LIME}
        strokeWidth="2.5"
        aria-hidden
      >
        <path d="M0 20h40l8-14 10 28 9-22 7 8h111" strokeLinecap="round" strokeLinejoin="round" />
      </svg>

      <p className="text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: LIME }}>
        Book a session
      </p>
      <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="mt-2 text-2xl font-bold text-white">
        Start your recovery
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-white/55">
        Tell us where it hurts and when works for you. Our team will confirm your assessment by phone or email.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded-lg border border-white/15 bg-white/[0.06] px-4 py-5 text-sm leading-relaxed text-white">
          You are booked in. We will be in touch shortly to confirm your first session.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className={labelCls}>
              Your name
              <input name="cust_name" required className={fieldCls} placeholder="Full name" />
            </label>
            <label className={labelCls}>
              Phone or email
              <input name="contact" required className={fieldCls} placeholder="How to reach you" />
            </label>
          </div>
          <label className={labelCls}>
            What we are treating
            <input name="treatment" className={fieldCls} placeholder="e.g. knee rehab, sports massage" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className={labelCls}>
              Preferred date
              <input name="date" type="date" className={`${fieldCls} [color-scheme:dark]`} />
            </label>
            <label className={labelCls}>
              Preferred time
              <input name="time" type="time" className={`${fieldCls} [color-scheme:dark]`} />
            </label>
          </div>
          <label className={labelCls}>
            Tell us more
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Your goals, injury history, sport..." />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm" style={{ color: ORANGE }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-lg py-3.5 text-center text-sm font-bold uppercase tracking-[0.16em] transition hover:brightness-95 disabled:opacity-60"
            style={{ background: LIME, color: NAVY }}
          >
            {status === "sending" ? "Sending..." : "Book my session"}
          </button>
        </form>
      )}
    </div>
  );
}
