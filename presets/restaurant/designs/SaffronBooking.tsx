"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Saffron palette for the booking widget — warm maroon ink, saffron gold,
// cream fields. Opulent but restrained.
const MAROON = "#5B1F2A";
const GOLD = "#E0A02E";
const CREAM = "#F6ECD9";
const CHARCOAL = "#1A1413";

// Reservation widget for the Saffron design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` renders a single horizontal row used on the dark hero (gold-framed,
// translucent over the photograph); the default stacked layout is used on the
// reservations page.
export function SaffronBooking({
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

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["12:00 PM", "12:30 PM", "1:00 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "9:00 PM"];

  // ---- INLINE (hero): translucent dark card, gold hairline, cream fields ----
  if (inline) {
    const heroLabel = "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[#E0A02E]";
    const heroField =
      "w-full rounded-none border border-[#E0A02E]/45 bg-[#1A1413]/70 px-3.5 py-2.5 text-sm text-[#F6ECD9] outline-none transition focus:border-[#E0A02E] [color-scheme:dark]";

    if (status === "sent") {
      return (
        <div className="border border-[#E0A02E]/50 bg-[#1A1413]/80 px-7 py-8 text-center backdrop-blur">
          <p style={{ fontFamily: "var(--font-fraunces)", color: GOLD }} className="text-2xl tracking-[0.04em]">
            Your table awaits
          </p>
          <p className="mt-2 text-sm leading-relaxed text-[#F6ECD9]/75">
            We have received your request and will confirm shortly.
          </p>
        </div>
      );
    }

    return (
      <form
        onSubmit={onSubmit}
        className="relative border border-[#E0A02E]/40 bg-[#1A1413]/55 p-4 backdrop-blur-md sm:p-5"
      >
        {/* gold corner brackets */}
        <span aria-hidden className="pointer-events-none absolute left-2 top-2 h-4 w-4 border-l border-t border-[#E0A02E]/70" />
        <span aria-hidden className="pointer-events-none absolute right-2 top-2 h-4 w-4 border-r border-t border-[#E0A02E]/70" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 h-4 w-4 border-b border-l border-[#E0A02E]/70" />
        <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 h-4 w-4 border-b border-r border-[#E0A02E]/70" />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={heroLabel}>Guests</span>
            <select name="party" defaultValue="2 guests" className={heroField}>
              {partyOptions.map((p) => <option key={p} style={{ color: CHARCOAL }}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={heroLabel}>Date</span>
            <input name="date" type="date" required className={heroField} />
          </label>
          <label className="block">
            <span className={heroLabel}>Time</span>
            <select name="time" defaultValue="7:00 PM" className={heroField}>
              {timeOptions.map((t) => <option key={t} style={{ color: CHARCOAL }}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={heroLabel}>Name</span>
            <input name="cust_name" required className={heroField} placeholder="Your name" />
          </label>
        </div>
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={heroLabel}>Email</span>
            <input name="email" type="email" required autoComplete="email" className={heroField} placeholder="So we can confirm" />
          </label>
          <label className="block">
            <span className={heroLabel}>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={heroField} placeholder="Optional" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] px-9 text-xs font-semibold uppercase tracking-[0.22em] transition hover:brightness-110 disabled:opacity-60"
            style={{ background: GOLD, color: CHARCOAL }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-[#F0B4B4]">{error}</p>}
      </form>
    );
  }

  // ---- STACKED (reservations page): cream card, gold-framed, maroon button ----
  const labelCls = "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.18em] text-[#5B1F2A]/70";
  const fieldCls =
    "w-full rounded-none border bg-white px-3.5 py-2.5 text-sm text-[#1A1413] outline-none transition focus:border-[#5B1F2A]";
  const fieldStyle = { borderColor: "#d9c7a6" } as const;

  if (status === "sent") {
    return (
      <div className="border-2 px-7 py-9 text-center" style={{ background: CREAM, borderColor: GOLD }}>
        <p style={{ fontFamily: "var(--font-fraunces)", color: MAROON }} className="text-3xl tracking-[0.03em]">
          Your table awaits
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[#5B1F2A]/75">
          Thank you. Your reservation request is in — we will be in touch shortly to confirm.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="relative border-2 p-7 sm:p-9"
      style={{ background: CREAM, borderColor: `${GOLD}` }}
    >
      <div className="pointer-events-none absolute inset-2 border border-[#5B1F2A]/15" aria-hidden />
      <div className="relative">
        <label className="mb-5 block">
          <span className={labelCls}>Restaurant</span>
          <input className={`${fieldCls} bg-[#fbf5e8]`} style={fieldStyle} value={name} readOnly />
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
            <select name="time" defaultValue="7:00 PM" className={fieldCls} style={fieldStyle}>
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
          <span className={labelCls}>Email</span>
          <input name="email" type="email" required autoComplete="email" className={fieldCls} style={fieldStyle} />
        </label>
        <label className="mt-4 block">
          <span className={labelCls}>Phone</span>
          <input name="phone" type="tel" autoComplete="tel" className={fieldCls} style={fieldStyle} />
        </label>
        <label className="mt-4 block">
          <span className={labelCls}>Anything else?</span>
          <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Dietary needs, a celebration, seating preferences" />
        </label>
        {/* honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
        {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
        {status === "error" && <p className="mt-3 text-sm text-[#9b2c2c]">{error}</p>}
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-7 w-full py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:brightness-110 disabled:opacity-60"
          style={{ background: MAROON }}
        >
          {status === "sending" ? "Sending" : "Request reservation"}
        </button>
      </div>
    </form>
  );
}
