"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const GREEN = "#0d3b2e";
const GOLD = "#c8a45c";

// Reservation widget for the Botanica design. A horizontal "find a table" bar
// feel on wider screens, posting to the shared /api/site-forms pipeline
// (kind "booking"), which emails the owner; sample/preview sites no-op with a
// success state. Honeypot field "company".
export function BotanicaBooking({ tenantId, name }: { tenantId: string; name: string }) {
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

  const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.18em]";
  const fieldCls =
    "mt-2 w-full border-0 border-b bg-transparent pb-2 text-[15px] outline-none transition focus:border-[#0d3b2e]";
  const fieldStyle = { borderColor: "rgba(13,59,46,0.25)", color: GREEN } as const;

  return (
    <div id="book" className="bg-white p-8 shadow-[0_18px_60px_-30px_rgba(13,59,46,0.5)] sm:p-10" style={{ border: `1px solid ${GOLD}` }}>
      <div className="text-center">
        <span className="mx-auto mb-3 block h-px w-8" style={{ background: GOLD }} />
        <p style={{ fontFamily: "var(--font-fraunces)", color: GREEN }} className="text-2xl">Find a table</p>
      </div>

      {status === "sent" ? (
        <p className="mt-7 px-4 py-5 text-center text-sm leading-relaxed" style={{ background: "#f3efe6", color: GREEN }}>
          Thank you, your reservation request is in. We will confirm by phone or email shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-7">
          <label className="block">
            <span className={labelCls} style={{ color: GREEN }}>Venue</span>
            <input className={fieldCls} style={fieldStyle} value={name} readOnly />
          </label>
          <div className="grid gap-7 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls} style={{ color: GREEN }}>Date</span>
              <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
            </label>
            <label className="block">
              <span className={labelCls} style={{ color: GREEN }}>Time</span>
              <select name="time" className={fieldCls} style={fieldStyle} defaultValue="7:00 PM">
                {["12:00 PM", "12:30 PM", "1:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <div className="grid gap-7 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls} style={{ color: GREEN }}>Guests</span>
              <select name="party" className={fieldCls} style={fieldStyle} defaultValue="2 guests">
                {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 guests", "8 or more"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className={labelCls} style={{ color: GREEN }}>Your name</span>
              <input name="cust_name" required className={fieldCls} style={fieldStyle} />
            </label>
          </div>
          <label className="block">
            <span className={labelCls} style={{ color: GREEN }}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls} style={{ color: GREEN }}>Anything we should know?</span>
            <textarea name="notes" rows={2} className={fieldCls} style={fieldStyle} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-xs font-semibold uppercase tracking-[0.24em] transition hover:brightness-110 disabled:opacity-60"
            style={{ background: GREEN, color: "#fff" }}
          >
            {status === "sending" ? "Sending..." : "Request a table"}
          </button>
        </form>
      )}
    </div>
  );
}
