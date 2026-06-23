"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const GOLD = "#c89b3c";
const INK = "#0c0b0a";

// Dark booking widget for the Lacquer design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the business owner;
// sample/preview sites no-op with a success state. Honeypot field "company".
const fieldCls =
  "mt-1.5 w-full border bg-[#161311] px-3.5 py-3 text-[15px] text-white outline-none transition placeholder:text-white/40 focus:border-[#c89b3c]";
const fieldStyle = { borderColor: "#3a342c" } as const;

export function LacquerBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div id="book" className="h-fit border p-7 sm:p-8" style={{ borderColor: `${GOLD}55`, background: "#100d0c" }}>
      <p style={{ fontFamily: "var(--font-fraunces)", color: GOLD }} className="text-xl">Book a table</p>
      <p className="mt-1 text-sm text-white/55">We will confirm your table by phone or email.</p>

      {status === "sent" ? (
        <p className="mt-6 border px-4 py-5 text-sm leading-relaxed text-white/80" style={{ borderColor: `${GOLD}55` }}>
          Thanks, your table request is in. We will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Number of guests</span>
            <select name="party" className={fieldCls} style={fieldStyle} defaultValue="2 guests">
              {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 guests", "8 or more"].map((g) => (
                <option key={g} className="bg-[#161311]">{g}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Date</span>
              <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Time</span>
              <select name="time" className={fieldCls} style={fieldStyle} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map((t) => (
                  <option key={t} className="bg-[#161311]">{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">Anything else?</span>
            <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] transition hover:brightness-110 disabled:opacity-60"
            style={{ background: GOLD, color: INK }}
          >
            {status === "sending" ? "Sending..." : "Request a table"}
          </button>
        </form>
      )}
    </div>
  );
}
