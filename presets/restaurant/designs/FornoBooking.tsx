"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Wood-fired pizzeria palette for the booking widget.
const TOMATO = "#C1432E";
const CHARCOAL = "#1C1A17";
const CREAM = "#F6EDE0";

// Reservation widget for the Forno design. Same shared booking pipeline as
// MeadowBooking — POSTs to /api/site-forms (kind "booking"), which emails the
// owner; sample/preview tenants (id "sample-...") no-op with the success state.
// Honeypot field is "company". Re-skinned to the charred, rustic Forno identity.
//
// `inline` packs the controls into one horizontal row (used on the home hero);
// the default stacked layout is used on the reservations page.
export function FornoBooking({
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
    "w-full rounded-md border bg-white px-3.5 py-2.5 text-sm text-[color:#1C1A17] outline-none transition focus:border-[color:#C1432E]";
  const fieldStyle = { borderColor: "#e3d4bf" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.16em] text-[color:#1C1A17]/55";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["12:00 PM", "12:30 PM", "1:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-lg border-2 px-6 py-7 text-center"
        style={{ background: CREAM, borderColor: TOMATO }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: TOMATO }} className="text-2xl font-black uppercase tracking-tight">
          The oven&apos;s ready!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#1C1A17]/75">
          Your table request is in. We&apos;ll be in touch shortly to confirm — buon appetito.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking row (single venue): party, date, time + a button.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-xl border-2 p-3 shadow-2xl sm:p-4"
        style={{ background: "rgba(251,247,239,0.97)", borderColor: TOMATO, backdropFilter: "blur(6px)" }}
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
            <select name="time" defaultValue="7:00 PM" className={fieldCls} style={fieldStyle}>
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
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] rounded-md px-10 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: TOMATO }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-red-700">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-xl border-2 p-6 shadow-sm sm:p-8"
      style={{ background: CREAM, borderColor: TOMATO }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Where</span>
        <input className={`${fieldCls} bg-white/70`} style={fieldStyle} value={name} readOnly />
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
        <span className={labelCls}>Phone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>Anything else?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Allergies, a birthday, a big group to seat" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-md py-4 text-sm font-black uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-60"
        style={{ background: CHARCOAL }}
      >
        {status === "sending" ? "Sending" : "Reserve a table"}
      </button>
    </form>
  );
}
