"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const CORAL = "#e8492e";
const INK = "#1c1a17";

const fieldCls =
  "mt-1.5 w-full rounded-none border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] text-neutral-800 outline-none transition focus:border-neutral-800";

// Appointment request widget for the Fade salon design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the salon owner;
// sample/preview sites no-op with a success state. Honeypot field "company".
export function FadeBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div id="book" className="h-fit border border-neutral-200 bg-white p-7 shadow-sm sm:p-9">
      <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl italic">Request an appointment</p>
      <p className="mt-2 text-sm text-neutral-500">Pick a day and time that suits you and we will confirm by phone or email.</p>

      {status === "sent" ? (
        <p className="mt-6 border border-neutral-200 bg-neutral-50 px-4 py-5 text-sm leading-relaxed text-neutral-700">
          Thanks, your request is in. We will be in touch shortly to confirm your appointment.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Salon</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Service</span>
            <select name="party" className={fieldCls} defaultValue="Cut and finish">
              {["Cut and finish", "Colour", "Blow dry", "Barbering", "Beauty treatment", "Not sure yet"].map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Time</span>
              <select name="time" className={fieldCls} defaultValue="11:00">
                {["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Email</span>
              <input name="email" type="email" required autoComplete="email" className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Phone</span>
              <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-medium uppercase tracking-wider text-neutral-500">Anything else?</span>
            <textarea name="notes" rows={3} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: CORAL }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
          <p className="text-center text-xs text-neutral-400" style={{ color: INK, opacity: 0.5 }}>
            We will never share your details.
          </p>
        </form>
      )}
    </div>
  );
}
