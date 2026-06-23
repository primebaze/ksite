"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Agave — vibrant Mexican cantina palette for the booking widget.
const TERRACOTTA = "#C9542A";
const TEAL = "#1F7A6D";
const SUNFLOWER = "#F2A93B";

// Reservation widget for the Agave design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` packs the controls into a sun-soaked card for the hero; the default
// stacked layout is used on the reservations page.
export function AgaveBooking({
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
    "w-full rounded-2xl border-2 bg-white px-3.5 py-2.5 text-sm text-[color:#221A14] outline-none transition focus:border-[color:#1F7A6D]";
  const fieldStyle = { borderColor: "#e7d6bb" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[color:#221A14]/55";

  const partyOptions = ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 or more"];
  const timeOptions = ["12:00 PM", "1:00 PM", "2:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-[1.75rem] border-2 px-6 py-8 text-center"
        style={{ background: "#fff", borderColor: SUNFLOWER }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: TERRACOTTA }} className="text-3xl font-semibold">
          ¡Órale!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#221A14]/70">
          Your table request is in. We will be in touch shortly to confirm — get ready to fiesta.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking card — party, date, time + a Go button, with a name
  // and contact line below.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-[1.75rem] border-2 bg-white/95 p-3.5 shadow-2xl backdrop-blur sm:p-5"
        style={{ borderColor: SUNFLOWER }}
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
            className="h-[46px] rounded-2xl px-10 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: TERRACOTTA }}
          >
            {status === "sending" ? "Sending" : "Vamos"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[1.75rem] border-2 bg-white p-6 shadow-sm sm:p-8"
      style={{ borderColor: TEAL }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Where</span>
        <input className={`${fieldCls} bg-[color:#FBF1E2]`} style={fieldStyle} value={name} readOnly />
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
      <label className="mt-4 block">
        <span className={labelCls}>Phone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>Anything else?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Allergies, a big group, a birthday to celebrate" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-2xl py-4 text-sm font-bold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
        style={{ background: TERRACOTTA }}
      >
        {status === "sending" ? "Sending" : "Reserve my table"}
      </button>
      <p className="mt-3 text-center text-[11px] uppercase tracking-[0.14em] text-[color:#221A14]/45">
        We will confirm by phone or email
      </p>
    </form>
  );
}
