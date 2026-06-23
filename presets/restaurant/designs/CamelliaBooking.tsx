"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Genteel tearoom palette for the booking widget.
const ROSE = "#C56B7A";
const INK = "#4A3F3A";
const SAGE = "#9FB08A";
const GOLD = "#C2A24C";
const DUCK = "#AFCBD0";

// Reservation widget for the Camellia design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` renders a compact, pretty horizontal "reserve" row for the cream hero;
// the default stacked layout is the full booking card on the reservations page.
export function CamelliaBooking({
  tenantId,
  name,
  inline = false,
}: {
  tenantId: string;
  name: string;
  inline?: boolean;
}) {
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

  const fieldCls =
    "w-full rounded-lg border bg-white/90 px-3.5 py-2.5 text-sm text-[color:#4A3F3A] outline-none transition focus:border-[color:#C56B7A] focus:ring-2 focus:ring-[color:#C56B7A]/20";
  const fieldStyle = { borderColor: `${GOLD}66` } as const;
  const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[color:#4A3F3A]/55";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "A party of 7+"];
  const timeOptions = ["11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "2:00 PM", "3:00 PM", "3:30 PM", "4:00 PM", "5:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-2xl border px-7 py-9 text-center"
        style={{ background: "#fff", borderColor: `${GOLD}66`, boxShadow: `0 18px 50px -32px ${ROSE}` }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" aria-hidden className="mx-auto mb-3">
          <circle cx="12" cy="12" r="2.6" fill={ROSE} />
          <ellipse cx="12" cy="6.4" rx="2.1" ry="3.2" fill={ROSE} opacity="0.85" />
          <ellipse cx="17.6" cy="12" rx="3.2" ry="2.1" fill={ROSE} opacity="0.7" />
          <ellipse cx="12" cy="17.6" rx="2.1" ry="3.2" fill={ROSE} opacity="0.85" />
          <ellipse cx="6.4" cy="12" rx="3.2" ry="2.1" fill={ROSE} opacity="0.7" />
          <circle cx="12" cy="12" r="1.2" fill={GOLD} />
        </svg>
        <p style={{ fontFamily: "var(--font-fraunces)", color: INK, fontStyle: "italic" }} className="text-2xl font-medium">
          How lovely — see you soon
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#4A3F3A]/65">
          Your table request is in. We will be in touch shortly to confirm the kettle is on.
        </p>
      </div>
    );
  }

  // INLINE: a pretty single-row reserve strip for the cream hero.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border bg-white/80 p-3 backdrop-blur sm:p-4"
        style={{ borderColor: `${GOLD}66`, boxShadow: `0 22px 60px -38px ${INK}` }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Guests</span>
            <select name="party" defaultValue="2 guests" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Date</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Time</span>
            <select name="time" defaultValue="3:00 PM" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
        </div>
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={labelCls}>Telephone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] rounded-full px-9 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55` }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the full reservations-page card.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.5rem] border bg-white p-6 sm:p-8"
      style={{ borderColor: `${GOLD}66`, boxShadow: `0 26px 70px -44px ${INK}` }}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: `${GOLD}55` }} />
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <circle cx="12" cy="12" r="2.6" fill={SAGE} />
          <ellipse cx="12" cy="6.4" rx="2.1" ry="3.2" fill={SAGE} opacity="0.8" />
          <ellipse cx="17.6" cy="12" rx="3.2" ry="2.1" fill={SAGE} opacity="0.65" />
          <ellipse cx="12" cy="17.6" rx="2.1" ry="3.2" fill={SAGE} opacity="0.8" />
          <ellipse cx="6.4" cy="12" rx="3.2" ry="2.1" fill={SAGE} opacity="0.65" />
        </svg>
        <span className="h-px flex-1" style={{ background: `${GOLD}55` }} />
      </div>
      <label className="mb-5 block">
        <span className={labelCls}>Tearoom</span>
        <input className={`${fieldCls} bg-[color:#FBF4E9]`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Guests</span>
          <select name="party" defaultValue="2 guests" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Sitting</span>
          <select name="time" defaultValue="3:00 PM" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Date</span>
          <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls}>Your name</span>
          <input name="cust_name" required className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelCls}>Telephone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>Any requests?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Dietary needs, a birthday, a window seat for the garden" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full py-4 text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
        style={{ background: ROSE, boxShadow: `0 0 0 1px ${GOLD}55, 0 14px 32px -18px ${ROSE}` }}
      >
        {status === "sending" ? "Sending" : "Reserve our table"}
      </button>
      <p className="mt-4 text-center text-[11px] uppercase tracking-[0.18em] text-[color:#4A3F3A]/45" style={{ color: DUCK }}>
        Served daily · tiered stands · loose-leaf teas
      </p>
    </form>
  );
}
