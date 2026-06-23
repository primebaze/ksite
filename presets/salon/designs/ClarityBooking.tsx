"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const NAVY = "#243B53";
const AMBER = "#E0A45E";
const CREAM = "#F6F1E7";

const fieldCls =
  "mt-2 w-full rounded-xl border-2 border-[#cdb89a] bg-white px-4 py-3.5 text-base text-[#243B53] outline-none transition placeholder:text-[#243B53]/45 focus:border-[#E0A45E] focus:ring-2 focus:ring-[#E0A45E]/30";

const labelCls = "block text-sm font-semibold text-[#243B53]";

// Booking widget for the Clarity audiology design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), exactly like SerenBooking:
// fields name / contact / date / time / party(=service) / notes, with a
// "company" honeypot and idle/sending/sent/error statuses. Sample/preview
// sites no-op with a success state. Styled warm + cream + large tap targets
// for accessibility (often older clientele).
export function ClarityBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        party: data.get("service") ?? "",
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
      className="rounded-3xl border-2 p-7 sm:p-9"
      style={{ background: CREAM, borderColor: "#e3d3b6" }}
    >
      <div className="flex items-center gap-3">
        {/* sound-wave glyph */}
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
          style={{ background: AMBER, color: NAVY }}
          aria-hidden
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 9v6M9 6v12M13 9v6M17 11v2M21 8v8" />
          </svg>
        </span>
        <h3 style={{ fontFamily: "var(--font-fraunces)", color: NAVY }} className="text-2xl">
          Book your appointment
        </h3>
      </div>
      <p className="mt-3 text-base leading-relaxed" style={{ color: "#4a5a6a" }}>
        Tell us what you need and a time that suits you. We&apos;ll confirm by phone or email — no pressure, no jargon.
      </p>

      {status === "sent" ? (
        <p
          className="mt-6 rounded-2xl border-2 px-5 py-6 text-base leading-relaxed"
          style={{ borderColor: AMBER, background: "#fff", color: NAVY }}
        >
          Thank you — your appointment request is in. We&apos;ll be in touch very soon to confirm a time that works for you.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <label className={labelCls}>
              Your name
              <input name="cust_name" required className={fieldCls} placeholder="Full name" />
            </label>
            <label className={labelCls}>
              Email
              <input name="email" type="email" required autoComplete="email" className={fieldCls} placeholder="you@example.com" />
            </label>
            <label className={labelCls}>
              Phone
              <input name="phone" type="tel" autoComplete="tel" className={fieldCls} placeholder="Optional" />
            </label>
          </div>
          <label className={labelCls}>
            What can we help with?
            <input name="service" className={fieldCls} placeholder="e.g. Hearing test, wax removal" />
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className={labelCls}>
              Preferred date
              <input name="date" type="date" className={fieldCls} />
            </label>
            <label className={labelCls}>
              Preferred time
              <input name="time" type="time" className={fieldCls} />
            </label>
          </div>
          <label className={labelCls}>
            Anything else we should know?
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Tell us a little more (optional)" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-base font-semibold text-red-700">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-full py-4 text-center text-base font-bold tracking-wide text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: NAVY }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
