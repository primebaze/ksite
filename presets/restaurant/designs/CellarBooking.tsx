"use client";

import { useState } from "react";

// Cellar palette — nocturnal natural-wine-bar identity for the booking widget.
const PLUM = "#2A1B2E";
const CHARCOAL = "#1A1720";
const ROSE = "#C98F86";
const GOLD = "#B79653";
const OAT = "#E7DECF";

// Reservation widget for the Cellar design. POSTs to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview tenants
// (id "sample-...") no-op with the success state. Honeypot field is "company".
//
// `inline` packs the controls into a compact glassy row for the nocturnal hero;
// the default stacked layout is used on the reservations page. Both render dark,
// candle-lit on plum/charcoal with thin gold rules — quiet and understated.
export function CellarBooking({
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

  // Dark fields on a near-black field, hairline edges, gold focus.
  const fieldCls =
    "w-full border-0 border-b bg-transparent px-0 py-2.5 text-sm text-[#E7DECF] outline-none transition placeholder:text-[#E7DECF]/35 focus:border-[#B79653]";
  const fieldStyle = { borderColor: "rgba(231,222,207,0.22)" } as const;
  const selectCls =
    "w-full border-0 border-b bg-transparent px-0 py-2.5 text-sm text-[#E7DECF] outline-none transition focus:border-[#B79653] [&>option]:bg-[#1A1720] [&>option]:text-[#E7DECF]";
  const labelCls = "mb-1 block text-[10px] font-medium uppercase tracking-[0.28em] text-[#C98F86]";

  const partyOptions = ["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7 or more"];
  const timeOptions = ["5:00 PM", "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM", "10:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="border px-7 py-9 text-center"
        style={{ background: CHARCOAL, borderColor: `${GOLD}55` }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: OAT }} className="text-2xl font-normal tracking-tight">
          A table awaits.
        </p>
        <p className="mt-3 text-sm leading-relaxed" style={{ color: `${OAT}b3` }}>
          Your request is in. We will be in touch shortly to confirm the evening.
        </p>
      </div>
    );
  }

  // INLINE: the candle-lit hero booking row — glassy plum panel with a thin gold
  // top rule, guests / date / time + a "Reserve" button, name + contact below.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border p-5 backdrop-blur-md sm:p-6"
        style={{ background: "rgba(26,23,32,0.72)", borderColor: `${GOLD}3d`, boxShadow: `0 30px 80px -30px ${CHARCOAL}` }}
      >
        <div className="mb-5 h-px w-full" style={{ background: `linear-gradient(90deg, transparent, ${GOLD}80, transparent)` }} />
        <div className="grid gap-x-7 gap-y-4 sm:grid-cols-3">
          <label className="block">
            <span className={labelCls}>Guests</span>
            <select name="party" defaultValue="2 guests" className={selectCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Date</span>
            <input name="date" type="date" required className={`${fieldCls} [color-scheme:dark]`} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Time</span>
            <select name="time" defaultValue="7:30 PM" className={selectCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
        </div>
        <div className="mt-4 grid gap-x-7 gap-y-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Name" />
          </label>
          <label className="block">
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can confirm" />
          </label>
        </div>
        {/* honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-7 w-full py-3.5 text-[11px] font-medium uppercase tracking-[0.32em] transition hover:opacity-90 disabled:opacity-60"
          style={{ background: GOLD, color: CHARCOAL }}
        >
          {status === "sending" ? "Sending" : "Reserve"}
        </button>
        {status === "error" && <p className="mt-3 text-sm" style={{ color: ROSE }}>{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget — dark panel, hairline-divided rows.
  return (
    <form
      onSubmit={onSubmit}
      className="border p-7 sm:p-10"
      style={{ background: CHARCOAL, borderColor: `${GOLD}40`, boxShadow: `0 40px 100px -40px ${CHARCOAL}` }}
    >
      <div className="mb-7 h-px w-full" style={{ background: `linear-gradient(90deg, ${GOLD}80, transparent)` }} />
      <label className="mb-6 block">
        <span className={labelCls}>Venue</span>
        <input className={`${fieldCls} text-[#E7DECF]/70`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Guests</span>
          <select name="party" defaultValue="2 guests" className={selectCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select name="time" defaultValue="7:30 PM" className={selectCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Date</span>
          <input name="date" type="date" required className={`${fieldCls} [color-scheme:dark]`} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls}>Your name</span>
          <input name="cust_name" required className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-6 block">
        <span className={labelCls}>Phone or email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-6 block">
        <span className={labelCls}>A note for us</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Occasion, allergies, a bottle you'd love to open" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-4 text-sm" style={{ color: ROSE }}>{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-9 w-full py-4 text-[11px] font-medium uppercase tracking-[0.32em] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: GOLD, color: CHARCOAL }}
      >
        {status === "sending" ? "Sending" : "Request a table"}
      </button>
    </form>
  );
}
