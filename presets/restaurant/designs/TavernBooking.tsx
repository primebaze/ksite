"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Heritage British-pub palette for the table-booking widget.
const FOREST = "#1E2B22";
const BURGUNDY = "#5A2230";
const BRASS = "#B08D2E";
const CREAM = "#EFE7D3";

// Table-booking widget for the Tavern design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the landlord;
// sample/preview tenants (id "sample-...") no-op into the success state.
// Honeypot field is "company".
//
// `inline` packs the controls into a compact brass-framed row used on the
// heritage hero; the default stacked layout is used on the reservations page.
export function TavernBooking({
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
    "w-full border bg-[#FBF8EF] px-3.5 py-2.5 text-sm text-[#2E2419] outline-none transition focus:border-[#5A2230]";
  const fieldStyle = { borderColor: "rgba(58,42,28,0.28)", borderRadius: "2px" } as const;
  const labelCls =
    "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3A2A1C]/70";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  // Success card — a small brass-ruled panel, on cream for the page, on a
  // translucent card for the hero.
  if (status === "sent") {
    return (
      <div
        className="border px-6 py-7 text-center"
        style={{ background: CREAM, borderColor: BRASS, borderRadius: "2px" }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: FOREST }} className="text-2xl font-semibold italic">
          Your table&apos;s reserved
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[#3A2A1C]/80">
          We&apos;ve received your request and will confirm by phone or email. Mine&apos;s a pint.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking row — guests, date, time + a "Reserve" button,
  // with the name and contact line beneath. Brass-framed on a dark glass card.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border p-3 backdrop-blur sm:p-4"
        style={{ background: "rgba(30,43,34,0.78)", borderColor: BRASS, borderRadius: "2px" }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3]/70">Guests</span>
            <select name="party" defaultValue="2 guests" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3]/70">Date</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3]/70">Time</span>
            <select name="time" defaultValue="19:00" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3]/70">Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
        </div>
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3]/70">Email</span>
            <input name="email" type="email" required autoComplete="email" className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#EFE7D3]/70">Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldCls} style={fieldStyle} placeholder="Optional" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] px-10 text-xs font-semibold uppercase tracking-[0.22em] text-[#EFE7D3] transition hover:brightness-110 disabled:opacity-60"
            style={{ background: BURGUNDY, borderRadius: "2px", border: `1px solid ${BRASS}` }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-[#F0C4B0]">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget — a cream form with brass hairlines.
  return (
    <form
      onSubmit={onSubmit}
      className="border p-6 sm:p-8"
      style={{ background: CREAM, borderColor: BRASS, borderRadius: "2px" }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>The house</span>
        <input className={`${fieldCls}`} style={fieldStyle} value={name} readOnly />
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
          <select name="time" defaultValue="19:00" className={fieldCls} style={fieldStyle}>
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
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="A Sunday roast, allergies, a dog by the fire" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-[#9b2d3a]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full py-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#EFE7D3] transition hover:brightness-110 disabled:opacity-60"
        style={{ background: BURGUNDY, borderRadius: "2px", border: `1px solid ${BRASS}` }}
      >
        {status === "sending" ? "Sending" : "Book a table"}
      </button>
    </form>
  );
}
