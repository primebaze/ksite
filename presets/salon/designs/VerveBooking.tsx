"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const INK = "#141210";
const GOLD = "#c9a96a";

const fieldCls =
  "w-full border-0 border-b border-white/20 bg-transparent pb-2 pt-1 text-[15px] text-white outline-none transition focus:border-[var(--verve-gold)] [color-scheme:dark]";

// Booking widget for the Verve salon design. Dark ink card with gold accents to
// match the bold contemporary look. Posts to the shared /api/site-forms pipeline
// (kind "booking"), which emails the salon owner; sample/preview sites no-op with
// a success state. Honeypot field "company".
export function VerveBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        party: data.get("party") ?? "",
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
      id="book"
      className="h-fit p-8 sm:p-10"
      style={{ background: INK, ["--verve-gold" as string]: GOLD }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.3em]" style={{ color: GOLD }}>Appointments</p>
      <p style={{ fontFamily: "var(--font-fraunces)" }} className="mt-2 text-2xl text-white">Request your visit</p>

      {status === "sent" ? (
        <p className="mt-6 border border-white/20 px-4 py-5 text-sm leading-relaxed text-white/80">
          Thanks, your request is in. We will confirm your appointment by phone or email shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-7 space-y-6">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Salon</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Service</span>
            <input name="party" className={fieldCls} placeholder="e.g. Cut and colour" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Time</span>
              <input name="time" type="time" className={fieldCls} />
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Phone or email</span>
            <input name="contact" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/50">Anything else?</span>
            <textarea name="notes" rows={2} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: GOLD, color: INK }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
