"use client";

import { useState } from "react";

// Fern — warm-neutral plant-based palette for the booking widget. Charcoal ink
// on oat, with a single deep forest-green accent used sparingly.
const INK = "#26241F";
const GREEN = "#2C4A3A";
const OAT = "#E9E0D0";
const CLAY = "#C2AE96";

// Reservation widget for the Fern design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` packs the controls into a single tactile strip used on the home hero;
// the default stacked layout is used on the reservations page. Visually distinct
// from siblings: hairline charcoal rules, square corners, oat/clay tones, a thin
// deep-green submit bar — no rounded coral cards, no sage.
export function FernBooking({
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

  // Square fields, hairline charcoal underline-style borders on off-white.
  const fieldCls =
    "w-full border bg-[#F7F2E9] px-3.5 py-3 text-sm text-[color:#26241F] outline-none transition focus:border-[color:#2C4A3A]";
  const fieldStyle = { borderColor: `${INK}33` } as const;
  const labelCls = "mb-2 block text-[10px] font-medium uppercase tracking-[0.24em] text-[color:#26241F]/55";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["12:00", "12:30", "1:00", "1:30", "6:00", "6:30", "7:00", "7:30", "8:00", "8:30"];

  if (status === "sent") {
    return (
      <div className="border px-7 py-9 text-center" style={{ background: OAT, borderColor: `${INK}33` }}>
        <span aria-hidden className="mx-auto mb-4 block h-7 w-px" style={{ background: GREEN }} />
        <p style={{ fontFamily: "var(--font-fraunces)", color: INK }} className="text-2xl font-normal">
          Your table is requested
        </p>
        <p className="mt-3 text-sm leading-relaxed text-[color:#26241F]/65">
          Thank you. We will be in touch shortly to confirm the details.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking strip — guests, date, time, name on one tactile
  // oat panel with a thin deep-green "Request" bar.
  if (inline) {
    return (
      <form onSubmit={onSubmit} className="border p-4 sm:p-5" style={{ background: OAT, borderColor: `${INK}33` }}>
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
            <select name="time" defaultValue="7:00" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Your name" />
          </label>
        </div>
        <div className="mt-4 grid items-end gap-4 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[48px] px-10 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F7F2E9] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: GREEN }}
          >
            {status === "sending" ? "Sending" : "Request"}
          </button>
        </div>
        {status === "error" && <p className="mt-3 text-sm" style={{ color: "#9a3535" }}>{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form onSubmit={onSubmit} className="border p-7 sm:p-9" style={{ background: OAT, borderColor: `${INK}33` }}>
      <label className="mb-6 block">
        <span className={labelCls}>Venue</span>
        <input className={fieldCls} style={{ ...fieldStyle, background: "#EFE7D9" }} value={name} readOnly />
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
          <select name="time" defaultValue="7:00" className={fieldCls} style={fieldStyle}>
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
        <span className={labelCls}>Dietary notes or requests</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Allergies, a celebration, anything we should know" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-4 text-sm" style={{ color: "#9a3535" }}>{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F7F2E9] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: status === "sending" ? CLAY : GREEN }}
      >
        {status === "sending" ? "Sending" : "Request a table"}
      </button>
    </form>
  );
}
