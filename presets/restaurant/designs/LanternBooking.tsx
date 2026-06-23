"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const RED = "#c1272d";

const fieldCls =
  "w-full rounded-sm border border-white/15 bg-black/30 px-3.5 py-3 text-[15px] text-[#f3ede1] outline-none transition focus:border-[#c8a24a]";
const labelCls = "mb-1.5 block text-xs uppercase tracking-wider text-[#f3ede1]/55";

// Booking widget for the Lantern design: a dark inline form on a dark lacquer
// panel, red CTA. Posts to the shared /api/site-forms pipeline (kind "booking"),
// which emails the business owner; sample/preview sites (id starts "sample-")
// no-op with a success state. Honeypot field "company".
export function LanternBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
      setError("Network error, please try again.");
    }
  }

  return (
    <div className="border border-white/12 bg-[#1b1714] p-8 sm:p-10">
      {status === "sent" ? (
        <p className="border border-white/15 px-4 py-5 text-sm leading-relaxed text-[#f3ede1]/85">
          Thanks, your table request is in. We&apos;ll confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Your name</span>
              <input name="cust_name" required className={fieldCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Email</span>
              <input name="email" type="email" required autoComplete="email" className={fieldCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
            </label>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <label className="block">
              <span className={labelCls}>Date</span>
              <input name="date" type="date" required className={`${fieldCls} [color-scheme:dark]`} />
            </label>
            <label className="block">
              <span className={labelCls}>Time</span>
              <select name="time" className={fieldCls} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"].map((t) => (
                  <option key={t} className="text-neutral-900">{t}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls}>Guests</span>
              <select name="party" className={fieldCls} defaultValue="2 guests">
                {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                  <option key={g} className="text-neutral-900">{g}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Anything else?</span>
            <textarea name="notes" rows={2} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: RED }}
          >
            {status === "sending" ? "Sending…" : "Book now"}
          </button>
        </form>
      )}
    </div>
  );
}
