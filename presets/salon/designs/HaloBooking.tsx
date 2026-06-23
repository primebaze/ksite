"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Minimal booking widget for the Halo salon design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the salon owner;
// sample/preview sites no-op with a success state. Styled to match Salt's
// pared-back look: underlined fields, an outlined submit, lots of whitespace.
const fieldCls =
  "w-full border-0 border-b border-neutral-300 bg-transparent pb-2 pt-1 text-[15px] text-neutral-900 outline-none transition focus:border-neutral-900";

export function HaloBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div id="book" className="border border-neutral-200 p-8 sm:p-10">
      <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl tracking-wide">Request an appointment</p>
      <p className="mt-2 text-sm text-neutral-500">Tell us what you would like and when. We will confirm by phone or email.</p>

      {status === "sent" ? (
        <p className="mt-7 border border-neutral-300 px-4 py-5 text-sm leading-relaxed text-neutral-700">
          Thank you, your request is in. We will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-7 space-y-7">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Service</span>
            <input name="party" className={fieldCls} placeholder="e.g. Cut and finish" />
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Time</span>
              <select name="time" className={fieldCls} defaultValue="10:00">
                {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Phone or email</span>
            <input name="contact" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-neutral-500">Anything else?</span>
            <textarea name="notes" rows={2} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full border border-neutral-900 py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition hover:bg-neutral-900 hover:text-white disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
