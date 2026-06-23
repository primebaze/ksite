"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Lemongrass palette for the booking widget — fresh, herbaceous Thai.
const EMERALD = "#14532D";
const CHILLI = "#D1462F";
const CHARTREUSE = "#A3C847";
const CREAM = "#F7F3E6";

// Reservation widget for the Lemongrass design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview tenants (id "sample-...") no-op with the success state.
// Honeypot field is "company".
//
// `inline` packs the controls into one rounded herb-green bar (used on the home
// hero); the default stacked layout is used on the reservations page.
export function LemongrassBooking({
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

  const fieldCls =
    "w-full rounded-full border bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[color:#14532D] focus:ring-2 focus:ring-[color:#A3C847]";
  const fieldStyle = { borderColor: "#d8d2bd" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[color:#14532D]/70";

  const partyOptions = ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 or more"];
  const timeOptions = ["11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "5:30 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-[2rem] border-2 px-6 py-8 text-center"
        style={{ background: CREAM, borderColor: CHARTREUSE }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: EMERALD }} className="text-2xl font-semibold">
          Khob khun kha!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Your table request is in. We will be in touch shortly to confirm your spot.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking bar — a single rounded herb-green pill of controls.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-[2rem] p-3 shadow-2xl sm:p-4"
        style={{ background: CREAM }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>People</span>
            <select name="party" defaultValue="2 people" className={fieldCls} style={fieldStyle}>
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
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_1fr_auto]">
          <label className="block">
            <span className={labelCls}>Email</span>
            <input name="email" type="email" required autoComplete="email" className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          <label className="block">
            <span className={labelCls}>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldCls} style={fieldStyle} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] rounded-full px-10 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: CHILLI }}
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
      className="rounded-[2rem] border-2 bg-white p-6 shadow-sm sm:p-8"
      style={{ borderColor: CHARTREUSE }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Where</span>
        <input className={`${fieldCls} bg-[color:#F7F3E6]`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>People</span>
          <select name="party" defaultValue="2 people" className={fieldCls} style={fieldStyle}>
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
        <span className={labelCls}>Anything else?</span>
        <textarea name="notes" rows={3} className={`${fieldCls} rounded-[1.5rem]`} style={fieldStyle} placeholder="Spice level, allergies, a celebration to mark" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
        style={{ background: CHILLI }}
      >
        {status === "sending" ? "Sending" : "Reserve my table"}
      </button>
    </form>
  );
}
