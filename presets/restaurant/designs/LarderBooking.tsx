"use client";

import { useState } from "react";

// Larder — modern seasonal gastropub. Muted, light, understated palette.
const SAGE = "#7C8567";
const INK = "#2A2A26";
const STONE = "#E7E1D4";

// Reservation widget for the Larder design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` is the airy single-row hero variant (a quiet hairline-ruled strip on
// stone); the default stacked layout is used on the reservations page. Styling
// is deliberately understated — hairline rules, generous whitespace, no shadows
// or rounded cards — to keep the gallery-like, contemporary register.
export function LarderBooking({
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

  // Understated underline fields — no boxes, just a hairline rule beneath.
  const fieldCls =
    "w-full border-0 border-b bg-transparent px-0 py-2.5 text-sm text-[color:#2A2A26] outline-none transition placeholder:text-[color:#2A2A26]/35 focus:border-[color:#7C8567]";
  const fieldStyle = { borderColor: `${INK}26` } as const;
  const labelCls =
    "mb-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[color:#7C8567]";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["12:00", "12:30", "13:00", "13:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

  if (status === "sent") {
    return (
      <div className="border-t border-b py-12 text-center" style={{ borderColor: `${INK}26` }}>
        <p style={{ fontFamily: "var(--font-fraunces)", color: INK }} className="text-2xl font-normal">
          A table is held.
        </p>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-[color:#2A2A26]/65">
          Thank you. We will confirm your reservation by phone or email shortly.
        </p>
      </div>
    );
  }

  // INLINE: a calm, single-row booking strip for the home hero. Sits on stone
  // with hairline dividers between fields — no card, no shadow.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border-y px-1 py-2"
        style={{ borderColor: `${INK}26`, background: STONE }}
      >
        <div className="grid items-end gap-x-6 gap-y-4 px-4 py-4 sm:px-6 md:grid-cols-[1fr_1fr_1fr_1.4fr_auto]">
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
            <select name="time" defaultValue="19:00" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Name &amp; contact</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[42px] whitespace-nowrap px-8 text-[11px] font-medium uppercase tracking-[0.22em] text-[#F6F3EC] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: INK }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        <div className="px-4 pb-4 sm:px-6">
          <label className="block">
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
        </div>
        {status === "error" && <p className="px-4 pb-3 text-sm text-red-700 sm:px-6">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget — quiet underline fields on off-white.
  return (
    <form onSubmit={onSubmit} className="border-t pt-10" style={{ borderColor: `${INK}26` }}>
      <label className="mb-7 block">
        <span className={labelCls}>Venue</span>
        <input className={`${fieldCls} text-[color:#2A2A26]/60`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-x-10 gap-y-7 sm:grid-cols-2">
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
      <label className="mt-7 block">
        <span className={labelCls}>Phone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-7 block">
        <span className={labelCls}>Anything we should know?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Dietary needs, a celebration, access" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-4 text-sm text-red-700">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-10 w-full px-8 py-4 text-[11px] font-medium uppercase tracking-[0.24em] text-[#F6F3EC] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: SAGE }}
      >
        {status === "sending" ? "Sending" : "Request reservation"}
      </button>
    </form>
  );
}
