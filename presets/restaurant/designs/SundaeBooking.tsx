"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Joyful gelato-parlour palette for the booking widget.
const COCOA = "#4A352C";
const PINK = "#F4A3C0";
const CHERRY = "#E0533B";
const PISTACHIO = "#BFE0A8";

// Booking / party-reservation widget for the Sundae design. Parlours host
// birthday parties and group scoop sessions, so the copy reads "book a party".
// POSTs to the shared /api/site-forms pipeline (kind "booking"), which emails
// the owner; sample/preview tenants (id "sample-...") no-op with the success
// state. Honeypot field is "company".
//
// `inline` packs the controls into one rounded card row (used on the home hero);
// the default stacked layout is used on the reservations page.
export function SundaeBooking({
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
    "w-full rounded-2xl border-2 bg-white px-4 py-2.5 text-sm text-[color:#4A352C] outline-none transition focus:border-[color:#E0533B]";
  const fieldStyle = { borderColor: "#e7d8c9" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-extrabold lowercase tracking-wide text-[color:#4A352C]/60";

  const partyOptions = ["Just me", "2 scoops", "3 people", "4 people", "5 people", "6 people", "Big party (8+)"];
  const timeOptions = ["11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-[2rem] border-2 px-7 py-8 text-center"
        style={{ background: "#fff", borderColor: COCOA }}
      >
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full" style={{ background: PISTACHIO }}>
          <span className="text-2xl" aria-hidden>🍦</span>
        </div>
        <p style={{ fontFamily: "var(--font-fraunces)", color: COCOA }} className="text-2xl font-bold">
          Sweet — you&apos;re in!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#4A352C]/70">
          Your party request is in the freezer. We&apos;ll be in touch shortly to confirm the scoops.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking row (single venue): party, date, time + a name and
  // contact line, all inside one cheerful rounded cream card.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-[2rem] border-2 p-4 shadow-[0_22px_50px_-26px_rgba(74,53,44,0.6)] sm:p-5"
        style={{ background: "#fff", borderColor: COCOA }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>how many?</span>
            <select name="party" defaultValue="2 scoops" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>day</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>time</span>
            <select name="time" defaultValue="2:00 PM" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
        </div>
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={labelCls}>phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[48px] rounded-full border-2 px-10 text-sm font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5 disabled:opacity-60"
            style={{ background: CHERRY, borderColor: COCOA, color: "#fff" }}
          >
            {status === "sending" ? "sending…" : "let's go!"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border-2 bg-white p-6 shadow-[0_22px_50px_-30px_rgba(74,53,44,0.55)] sm:p-8"
      style={{ borderColor: COCOA }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>where</span>
        <input className={`${fieldCls} bg-[#FCF6EA]`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>how many?</span>
          <select name="party" defaultValue="2 scoops" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>time</span>
          <select name="time" defaultValue="2:00 PM" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>day</span>
          <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls}>your name</span>
          <input name="cust_name" required className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelCls}>phone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>anything to add?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Birthday candles, allergies, a flavour to pre-order…" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full border-2 py-4 text-sm font-extrabold lowercase tracking-wide transition hover:-translate-y-0.5 disabled:opacity-60"
        style={{ background: CHERRY, borderColor: COCOA, color: "#fff" }}
      >
        {status === "sending" ? "sending…" : "book our party"}
      </button>
    </form>
  );
}
