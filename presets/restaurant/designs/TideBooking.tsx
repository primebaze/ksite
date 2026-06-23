"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const CHARCOAL = "#2b2926";
const RED = "#d83b2e";

const fieldCls =
  "w-full rounded-none border border-neutral-300 bg-white px-3.5 py-3 text-[15px] text-neutral-800 outline-none transition focus:border-neutral-800";

// Booking widget for the Tide design (sushi house). Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the business owner;
// sample/preview sites no-op with a success state. Honeypot field "company".
export function TideBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div id="book" className="h-fit bg-white p-7 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-9" style={{ border: `1px solid ${CHARCOAL}22` }}>
      <p className="text-lg font-extrabold uppercase tracking-[0.14em]" style={{ color: CHARCOAL }}>Reserve your table</p>

      {status === "sent" ? (
        <p className="mt-6 border border-neutral-200 bg-neutral-50 px-4 py-5 text-sm leading-relaxed text-neutral-700">
          Thanks, your table request is in. We will confirm by phone or email shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Restaurant</span>
            <input className={`${fieldCls} mt-1.5 bg-neutral-50`} value={name} readOnly />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Date</span>
              <input name="date" type="date" required className={`${fieldCls} mt-1.5`} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Time</span>
              <select name="time" className={`${fieldCls} mt-1.5`} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Number of guests</span>
            <select name="party" className={`${fieldCls} mt-1.5`} defaultValue="2 guests">
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Your name</span>
            <input name="cust_name" required className={`${fieldCls} mt-1.5`} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Phone or email</span>
            <input name="contact" required className={`${fieldCls} mt-1.5`} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Anything else?</span>
            <textarea name="notes" rows={3} className={`${fieldCls} mt-1.5`} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: RED }}
          >
            {status === "sending" ? "Sending..." : "Request a table"}
          </button>
        </form>
      )}
    </div>
  );
}
