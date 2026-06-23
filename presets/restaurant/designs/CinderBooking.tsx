"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const GOLD = "#b08d57";
const PANEL = "#1b1613";

const fieldCls =
  "w-full border-0 border-b bg-transparent pb-2 pt-1 text-[15px] text-white/90 outline-none transition focus:border-white";

// Warm-dark reservation widget for the Cinder design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the business owner;
// sample/preview sites no-op with a success state. Honeypot field "company".
export function CinderBooking({ tenantId, name }: { tenantId: string; name: string }) {
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

  const fieldStyle = { borderColor: "#ffffff33" } as const;

  return (
    <div id="book" className="relative h-fit px-7 py-10 sm:px-10" style={{ background: PANEL, border: `1px solid ${GOLD}55` }}>
      {/* gold corner brackets, echoing the reference panel framing */}
      <span className="pointer-events-none absolute left-3 top-3 h-5 w-5 border-l border-t" style={{ borderColor: GOLD }} />
      <span className="pointer-events-none absolute bottom-3 right-3 h-5 w-5 border-b border-r" style={{ borderColor: GOLD }} />

      <p style={{ fontFamily: "var(--font-fraunces)", color: "#f4efe7" }} className="text-center text-2xl">Reserve a Table</p>
      <p className="mt-2 text-center text-sm text-white/55">Tell us when suits and we will confirm by phone or email.</p>

      {status === "sent" ? (
        <p className="mt-8 px-4 py-5 text-center text-sm leading-relaxed text-white/80" style={{ border: `1px solid ${GOLD}55` }}>
          Thank you, your reservation request is in. We will confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-7">
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Restaurant</span>
            <input className={fieldCls} style={fieldStyle} value={name} readOnly />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Number of guests</span>
            <select name="party" className={`${fieldCls} [&>option]:text-neutral-900`} style={fieldStyle} defaultValue="2 guests">
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more guests"].map((g) => (
                <option key={g}>{g}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Date</span>
              <input name="date" type="date" required className={`${fieldCls} [color-scheme:dark]`} style={fieldStyle} />
            </label>
            <label className="block">
              <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Time</span>
              <select name="time" className={`${fieldCls} [&>option]:text-neutral-900`} style={fieldStyle} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className="text-[11px] uppercase tracking-[0.2em] text-white/45">Anything else?</span>
            <input name="notes" className={fieldCls} style={fieldStyle} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.25em] text-neutral-900 transition hover:opacity-90 disabled:opacity-60"
            style={{ background: GOLD }}
          >
            {status === "sending" ? "Sending..." : "Book a table"}
          </button>
        </form>
      )}
    </div>
  );
}
