"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Warm artisan-bakery palette for the booking widget.
const INK = "#43342A";
const CRUST = "#C98A3C";
const CREAM = "#F3E9D8";
const BERRY = "#9B3B54";

// Reservation widget for the Crumb design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` packs the controls into one soft cream card (used on the home hero);
// the default stacked layout is used on the reservations page. Both share the
// same fields and statuses as MeadowBooking, dressed in Crumb's thin-weight,
// rounded, hand-drawn aesthetic instead of the diner look.
export function CrumbBooking({
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
    "w-full rounded-2xl border bg-white px-4 py-3 text-sm font-light text-[color:#43342A] outline-none transition focus:border-[color:#C98A3C]";
  const fieldStyle = { borderColor: "#e2d3ba" } as const;
  const labelCls = "mb-2 block text-[11px] font-medium uppercase tracking-[0.22em] text-[color:#43342A]/55";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["7:30 AM", "8:30 AM", "9:30 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "2:30 PM", "3:30 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-[2rem] border px-8 py-10 text-center"
        style={{ background: "#fff", borderColor: "#e2d3ba" }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: INK }} className="text-3xl font-light tracking-tight">
          A table is set.
        </p>
        <div className="mx-auto mt-3 h-[2px] w-12 rounded-full" style={{ background: CRUST }} />
        <p className="mt-4 text-sm font-light leading-relaxed text-[color:#43342A]/70">
          Your request has reached the bakers. We&apos;ll be in touch shortly to confirm your visit.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking card on the cream home page — soft and unhurried.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-[2rem] border bg-white/80 p-5 shadow-[0_30px_70px_-50px_rgba(67,52,42,0.55)] backdrop-blur sm:p-6"
        style={{ borderColor: "#e2d3ba" }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: INK }} className="mb-4 text-lg font-light tracking-tight">
          Reserve a morning table
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
            <select name="time" defaultValue="9:30 AM" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
        </div>
        <div className="mt-4 grid items-end gap-4 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[50px] rounded-full px-10 text-xs font-medium uppercase tracking-[0.24em] text-[color:#F3E9D8] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: INK }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-3 text-sm font-light" style={{ color: BERRY }}>{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border bg-white p-7 shadow-[0_30px_70px_-55px_rgba(67,52,42,0.5)] sm:p-9"
      style={{ borderColor: "#e2d3ba" }}
    >
      <label className="mb-6 block">
        <span className={labelCls}>Bakery</span>
        <input className={`${fieldCls}`} style={{ ...fieldStyle, background: CREAM }} value={name} readOnly />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Guests</span>
          <select name="party" defaultValue="2 guests" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select name="time" defaultValue="9:30 AM" className={fieldCls} style={fieldStyle}>
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
      <label className="mt-5 block">
        <span className={labelCls}>Phone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-5 block">
        <span className={labelCls}>Anything else?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="A celebration, a special loaf, dietary notes" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-4 text-sm font-light" style={{ color: BERRY }}>{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full rounded-full py-4 text-xs font-medium uppercase tracking-[0.24em] text-[color:#F3E9D8] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: INK }}
      >
        {status === "sending" ? "Sending" : "Reserve a table"}
      </button>
    </form>
  );
}
