"use client";

import { useState } from "react";

// Citrus juice-bar palette for the booking widget.
const ORANGE = "#F47A20";
const PINK = "#F0567A";
const INK = "#3A1F2B";

// "Order ahead / Book a cleanse" widget for the Pulp design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner; sample /
// preview tenants (id "sample-...") no-op with the success state. Honeypot field
// is "company".
//
// `inline` packs the controls into a juicy single row used on the home hero;
// the default stacked layout is used on the reservations page.
export function PulpBooking({
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

  const fieldCls =
    "w-full rounded-full border-2 bg-white px-4 py-2.5 text-sm text-neutral-800 outline-none transition focus:border-[color:#F47A20]";
  const fieldStyle = { borderColor: "#F7E0CC" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.14em] text-[color:#3A1F2B]/55";

  const partyOptions = ["Just me", "2 cups", "3 cups", "4 cups", "5 cups", "6 cups", "7 or more"];
  const timeOptions = ["7:30 AM", "8:30 AM", "9:30 AM", "11:00 AM", "12:30 PM", "2:00 PM", "4:00 PM", "5:30 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-[2rem] border-2 px-6 py-7 text-center"
        style={{ background: "#fff", borderColor: PINK }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: INK }} className="text-2xl font-bold">
          Freshly squeezed!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-neutral-600">
          Your order is in. We will ping you to confirm pickup and have it cold and ready.
        </p>
      </div>
    );
  }

  // INLINE: the hero pickup row (single bar): cups, date, time + a Go button,
  // with a name and contact line below.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-[2rem] bg-white/95 p-4 shadow-[0_18px_50px_-12px_rgba(58,31,43,0.4)] backdrop-blur sm:p-5"
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Cups</span>
            <select name="party" defaultValue="2 cups" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Pickup day</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Time</span>
            <select name="time" defaultValue="8:30 AM" className={fieldCls} style={fieldStyle}>
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
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[48px] rounded-full px-12 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105 disabled:opacity-60"
            style={{ background: `linear-gradient(120deg, ${ORANGE}, ${PINK})` }}
          >
            {status === "sending" ? "Sending" : "Go"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations / order-ahead page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2.25rem] border-2 bg-white p-6 shadow-sm sm:p-8"
      style={{ borderColor: PINK }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Pickup spot</span>
        <input className={`${fieldCls} bg-[#FFFBF2]`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Cups</span>
          <select name="party" defaultValue="2 cups" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select name="time" defaultValue="8:30 AM" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Pickup day</span>
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
        <textarea name="notes" rows={3} className={`${fieldCls} rounded-3xl`} style={fieldStyle} placeholder="Booster shots, allergies, a 3-day cleanse" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full py-4 text-sm font-extrabold uppercase tracking-[0.16em] text-white transition hover:brightness-105 disabled:opacity-60"
        style={{ background: `linear-gradient(120deg, ${ORANGE}, ${PINK})` }}
      >
        {status === "sending" ? "Sending" : "Order ahead"}
      </button>
    </form>
  );
}
