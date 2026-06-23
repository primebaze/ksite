"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const TOMATO = "#d2402e";
const GREEN = "#3f6b3a";

const fieldCls =
  "mt-1.5 w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-[15px] text-neutral-800 outline-none transition focus:border-[#d2402e] focus:ring-2 focus:ring-[#d2402e]/15";

// Cheerful reservation widget for the Daybreak design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the business owner;
// sample/preview sites no-op with a success state. Modeled on EmberBooking.
export function DaybreakBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
      setError("Network error, please try again.");
    }
  }

  return (
    <div id="book" className="h-fit rounded-[1.75rem] border-2 bg-white p-7 shadow-[0_20px_50px_-24px_rgba(0,0,0,0.25)] sm:p-8" style={{ borderColor: TOMATO }}>
      <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl font-semibold">Book a table</p>
      <p className="mt-1 text-sm text-neutral-500">Pop in your details and we&apos;ll save you a seat.</p>

      {status === "sent" ? (
        <p className="mt-6 rounded-xl border border-emerald-300/60 bg-emerald-50 px-4 py-5 text-sm font-medium leading-relaxed text-emerald-700">
          Lovely, your table request is in. We&apos;ll be in touch to confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Where</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Number of guests</span>
            <select name="party" className={fieldCls} defaultValue="2 guests">
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Time</span>
              <select name="time" className={fieldCls} defaultValue="9:00 AM">
                {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "6:00 PM", "7:00 PM", "8:00 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Phone or email</span>
            <input name="contact" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Anything else?</span>
            <textarea name="notes" rows={2} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full rounded-full py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: GREEN }}
          >
            {status === "sending" ? "Sending…" : "Request a table"}
          </button>
        </form>
      )}
    </div>
  );
}
