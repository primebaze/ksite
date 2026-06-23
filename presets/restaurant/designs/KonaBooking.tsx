"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Coastal poke-bar palette for the ordering / booking widget.
const TEAL = "#0E7C86";
const NAVY = "#123A52";
const CORAL = "#F2755C";
const SAND = "#F4E9D6";
const INK = "#14242E";

// Order-ahead / reservation widget for the Kona design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview tenants (id "sample-...") no-op with the success state.
// Honeypot field is "company". Copy reads "Order ahead / Book a table" to match
// the laid-back island bowl-bar voice.
//
// `inline` packs the controls into one breezy horizontal row on a translucent
// card (used on the home hero); the default stacked layout is used on the
// reservations page.
export function KonaBooking({
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
    "w-full rounded-full border-2 bg-white px-4 py-2.5 text-sm text-[color:#14242E] outline-none transition focus:border-[color:#0E7C86]";
  const fieldStyle = { borderColor: "#e3d8c2" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[color:#123A52]/70";

  const partyOptions = ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 or more"];
  const timeOptions = ["11:00 AM", "11:30 AM", "12:00 PM", "12:30 PM", "1:00 PM", "5:00 PM", "5:30 PM", "6:00 PM", "7:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-[2rem] border-2 px-6 py-8 text-center"
        style={{ background: SAND, borderColor: TEAL }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: NAVY }} className="text-2xl font-semibold">
          Aloha — you&apos;re all set!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#14242E]/70">
          Your request is in. We&apos;ll be in touch shortly to confirm. Catch you by the water.
        </p>
      </div>
    );
  }

  // INLINE: the hero ordering row — party, date, time, name + a Go button, with
  // a contact line below, floating on a translucent sand card over the ocean.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-[2rem] border border-white/60 bg-[color:#F4E9D6]/95 p-3.5 shadow-2xl backdrop-blur sm:p-4"
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
            <select name="time" defaultValue="12:00 PM" className={fieldCls} style={fieldStyle}>
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
            className="h-[46px] rounded-full px-10 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: CORAL }}
          >
            {status === "sending" ? "Sending" : "Let's go"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget — order ahead or book a table.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border-2 bg-white p-6 shadow-sm sm:p-8"
      style={{ borderColor: TEAL }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Where</span>
        <input className={`${fieldCls} bg-[color:#F4E9D6]/40`} style={fieldStyle} value={name} readOnly />
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
          <select name="time" defaultValue="12:00 PM" className={fieldCls} style={fieldStyle}>
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
        <textarea name="notes" rows={3} className={`${fieldCls} rounded-2xl`} style={fieldStyle} placeholder="Allergies, a big group, a sunset celebration" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
        style={{ background: CORAL }}
      >
        {status === "sending" ? "Sending" : "Reserve my spot"}
      </button>
      <p className="mt-3 text-center text-xs text-[color:#14242E]/50" style={{ color: INK }}>
        Order ahead or book a table — we&apos;ll confirm the rest.
      </p>
    </form>
  );
}
