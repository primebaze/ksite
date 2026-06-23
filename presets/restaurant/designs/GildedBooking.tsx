"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Gilded palette for the reservation widget — art-deco cocktail lounge:
// midnight black, champagne gold, ivory. Sharp-cornered deco fields with thin
// gold rules; nothing rounded, everything geometric.
const BLACK = "#0E0E10";
const GOLD = "#CBA14B";
const IVORY = "#EFE7D6";

// Reservation widget for the Gilded design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` packs the controls into one horizontal row (used on the home hero);
// the default stacked layout is used on the reservations page. Copy reads
// "Reserve a table / Book".
export function GildedBooking({
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

  // Deco fields: ivory glass on black, thin gold border, square corners.
  const fieldCls =
    "w-full border bg-[#16161A] px-3.5 py-2.5 text-sm text-[#EFE7D6] outline-none transition placeholder:text-[#EFE7D6]/35 focus:border-[#CBA14B]";
  const fieldStyle = { borderColor: `${GOLD}55` } as const;
  const labelCls = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#CBA14B]";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM", "Midnight"];

  // A small deco chevron motif to set the confirmation apart.
  const chevron = (
    <svg width="38" height="14" viewBox="0 0 38 14" fill="none" aria-hidden className="mx-auto">
      <path d="M2 12 L19 2 L36 12" stroke={GOLD} strokeWidth="1.4" />
      <path d="M8 12 L19 6 L30 12" stroke={GOLD} strokeWidth="1" opacity="0.55" />
    </svg>
  );

  if (status === "sent") {
    return (
      <div className="border px-6 py-9 text-center" style={{ background: BLACK, borderColor: GOLD }}>
        {chevron}
        <p style={{ fontFamily: "var(--font-fraunces)", color: IVORY }} className="mt-5 text-2xl font-normal tracking-[0.04em]">
          Your table awaits
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#EFE7D6]/65">
          Your reservation request is in. We will be in touch shortly to confirm the evening.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking row (single venue): guests, date, time, name + a
  // "Reserve" button, with the contact line below.
  if (inline) {
    return (
      <form onSubmit={onSubmit} className="border p-4 shadow-2xl sm:p-5" style={{ background: `${BLACK}f2`, borderColor: `${GOLD}66`, backdropFilter: "blur(6px)" }}>
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
            <select name="time" defaultValue="8:00 PM" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
        </div>
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block">
              <span className={labelCls}>Email</span>
              <input name="email" type="email" required autoComplete="email" className={fieldCls} style={fieldStyle} placeholder="So we may confirm" />
            </label>
            <label className="block">
              <span className={labelCls}>Phone</span>
              <input name="phone" type="tel" autoComplete="tel" className={fieldCls} style={fieldStyle} placeholder="Optional" />
            </label>
          </div>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] px-10 text-[11px] font-semibold uppercase tracking-[0.26em] transition hover:brightness-110 disabled:opacity-60"
            style={{ background: GOLD, color: BLACK }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-[#D9A9A0]">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form onSubmit={onSubmit} className="border p-6 shadow-2xl sm:p-8" style={{ background: BLACK, borderColor: `${GOLD}66` }}>
      <label className="mb-5 block">
        <span className={labelCls}>Venue</span>
        <input className={`${fieldCls} text-[#EFE7D6]/70`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Guests</span>
          <select name="party" defaultValue="2 guests" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select name="time" defaultValue="8:00 PM" className={fieldCls} style={fieldStyle}>
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
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={fieldCls} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls}>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelCls}>A note for us</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="An occasion, a preferred booth, anything we should know" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-[#D9A9A0]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full py-4 text-[11px] font-semibold uppercase tracking-[0.28em] transition hover:brightness-110 disabled:opacity-60"
        style={{ background: GOLD, color: BLACK }}
      >
        {status === "sending" ? "Sending" : "Book"}
      </button>
      <p className="mt-4 text-center text-[10px] uppercase tracking-[0.24em]" style={{ color: `${GOLD}99` }}>Reserve a table</p>
    </form>
  );
}
