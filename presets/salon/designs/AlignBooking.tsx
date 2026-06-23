"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const TEAL = "#0E6E6E";
const CORAL = "#F2856B";
const INK = "#1E2A2A";

const fieldCls =
  "mt-1.5 w-full rounded-xl border border-white/35 bg-white/10 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-white focus:bg-white/15";

// Booking widget for the Align orthodontics design. A confident teal panel with
// a coral submit, posting to the shared /api/site-forms pipeline (kind
// "booking"), which emails the owner; sample/preview sites no-op into a success
// state. Field names mirror SerenBooking exactly (party === treatment).
export function AlignBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
      className="relative overflow-hidden rounded-3xl p-7 sm:p-9"
      style={{ background: `linear-gradient(155deg, ${TEAL} 0%, #0a5757 100%)` }}
    >
      {/* faint alignment-grid motif */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        aria-hidden
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="relative">
        <span className="inline-flex items-center gap-2 rounded-full bg-white/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/90">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: CORAL }} />
          Free consultation
        </span>
        <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="mt-4 text-[1.7rem] leading-tight text-white">
          Start your smile assessment
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-white/80">
          Tell us what you are interested in and a time that suits. We will confirm your appointment by phone or email.
        </p>

        {status === "sent" ? (
          <p className="mt-6 rounded-2xl border border-white/40 bg-white/12 px-5 py-6 text-sm leading-relaxed text-white">
            Thank you — your assessment request is in. Our team at {name} will be in touch very soon to confirm.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                Your name
                <input name="cust_name" required className={fieldCls} placeholder="Full name" />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                Phone or email
                <input name="contact" required className={fieldCls} placeholder="How to reach you" />
              </label>
            </div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
              Treatment of interest
              <input name="treatment" className={fieldCls} placeholder="e.g. clear aligners, braces, retainer" />
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                Preferred date
                <input name="date" type="date" className={`${fieldCls} [color-scheme:dark]`} />
              </label>
              <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
                Preferred time
                <input name="time" type="time" className={`${fieldCls} [color-scheme:dark]`} />
              </label>
            </div>
            <label className="block text-xs font-semibold uppercase tracking-[0.12em] text-white/85">
              Anything else
              <textarea name="notes" rows={3} className={fieldCls} placeholder="Your message" />
            </label>
            {/* honeypot */}
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
            {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
            {status === "error" && <p className="text-sm text-white">{error}</p>}
            <button
              type="submit"
              disabled={status === "sending"}
              className="mt-1 w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] transition hover:opacity-90 disabled:opacity-60"
              style={{ background: CORAL, color: INK }}
            >
              {status === "sending" ? "Sending..." : "Book my assessment"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
