"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const SKY = "#2e7cb8";
const NAVY = "#15293a";
const MINT = "#cde9dd";

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-[#dbe6ee] bg-white px-3.5 py-2.5 text-sm text-[#15293a] outline-none transition placeholder:text-[#9fb2c0] focus:border-[#2e7cb8] focus:ring-2 focus:ring-[#2e7cb8]/20";

// Booking widget for the Enamel dental-practice design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview sites no-op with a success state. A bright, clinical-but-warm
// card on a white field — the opposite register to Seren's rose-on-rose panel.
export function EnamelBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div className="rounded-3xl border border-[#e2ebf1] bg-white p-7 shadow-[0_24px_60px_-30px_rgba(21,41,58,0.35)] sm:p-9">
      <div className="flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: MINT, color: NAVY }} aria-hidden>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7"><path d="M8 3c-2.2 0-3.5 1.7-3.5 4 0 1.3.3 2.4.5 4 .3 2 .4 6 1.6 8 .8 1.3 1.8.7 2.1-.6.3-1.4.5-3.4 1.3-3.4s1 2 1.3 3.4c.3 1.3 1.3 1.9 2.1.6 1.2-2 1.3-6 1.6-8 .2-1.6.5-2.7.5-4 0-2.3-1.3-4-3.5-4-1.3 0-1.9.6-3 .6S9.3 3 8 3Z" /></svg>
        </span>
        <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl font-medium" >
          Book a check-up
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#5b6f7d]">
        Tell us what you need and a time that suits. We will confirm your appointment by phone or email.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded-xl border px-4 py-5 text-sm leading-relaxed" style={{ background: "#f2f9f5", borderColor: MINT, color: NAVY }}>
          Thank you, your request is in. Our reception team will be in touch very soon to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6f7d]">
              Your name
              <input name="cust_name" required className={fieldCls} placeholder="Full name" />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6f7d]">
              Phone or email
              <input name="contact" required className={fieldCls} placeholder="How to reach you" />
            </label>
          </div>
          <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6f7d]">
            Treatment of interest
            <input name="treatment" className={fieldCls} placeholder="e.g. check-up, whitening, implant consultation" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6f7d]">
              Preferred date
              <input name="date" type="date" className={fieldCls} />
            </label>
            <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6f7d]">
              Preferred time
              <input name="time" type="time" className={fieldCls} />
            </label>
          </div>
          <label className="block text-xs font-semibold uppercase tracking-[0.1em] text-[#5b6f7d]">
            Anything else
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Nervous patient? Tell us how we can help." />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-[#c0392b]">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: SKY }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
          <p className="text-center text-xs text-[#9fb2c0]">No obligation. We will never share your details.</p>
        </form>
      )}
    </div>
  );
}
