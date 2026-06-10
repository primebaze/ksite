"use client";

import { useState } from "react";

// Vintage NYC deli palette for the order/booking widget.
const DELI = "#2F5D50";   // deli green
const MUSTARD = "#E0A526"; // mustard
const CREAM = "#F3ECDC";  // cream paper
const INK = "#2A211A";    // ink

// Order/reservation widget for the Reuben deli design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview tenants (id "sample-...") no-op with the success state.
// Honeypot field is "company". Copy reads as a deli counter: "order ahead /
// reserve a table". `inline` packs the controls into a compact "order ticket"
// row for the home hero; the default stacked layout is used on the
// reservations page.
export function ReubenBooking({
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

  // Form fields styled like an enamel/order-ticket: cream fields, ink labels,
  // deli-green focus.
  const fieldCls =
    "w-full border-2 bg-white px-3.5 py-2.5 text-sm text-[color:#2A211A] outline-none transition focus:border-[color:#2F5D50]";
  const fieldStyle = { borderColor: "#cdbf9e", borderRadius: "2px" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-[color:#6F7A3A]";

  const partyOptions = ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 or more"];
  const timeOptions = ["8:00 AM", "9:00 AM", "10:30 AM", "11:30 AM", "12:30 PM", "1:30 PM", "5:00 PM", "6:00 PM", "7:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="border-[3px] px-6 py-7 text-center"
        style={{ background: CREAM, borderColor: DELI, borderRadius: "4px" }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: DELI }} className="text-2xl font-bold">
          Order&apos;s in!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#2A211A]/75">
          We&apos;ve got your ticket. We&apos;ll be in touch shortly to confirm — see you at the counter.
        </p>
      </div>
    );
  }

  // INLINE: the hero "order ticket" row — party, date, time + a name and contact
  // line below, on a cream paper ticket with a perforated top edge.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="relative border-[3px] p-3 shadow-[6px_6px_0_0_rgba(42,33,26,0.85)] sm:p-4"
        style={{ background: CREAM, borderColor: INK, borderRadius: "4px" }}
      >
        {/* enamel ticket header */}
        <div className="mb-3 flex items-center justify-between gap-3 border-b-2 border-dashed pb-2.5" style={{ borderColor: "#cdbf9e" }}>
          <span style={{ fontFamily: "var(--font-fraunces)", color: DELI }} className="text-base font-bold uppercase tracking-[0.08em]">Order ahead</span>
          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[color:#6F7A3A]">No. ___</span>
        </div>
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
            <select name="time" defaultValue="12:30 PM" className={fieldCls} style={fieldStyle}>
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
            className="h-[46px] border-2 px-10 text-sm font-bold uppercase tracking-[0.16em] text-[color:#2A211A] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: MUSTARD, borderColor: INK, borderRadius: "2px" }}
          >
            {status === "sending" ? "Sending" : "Place it"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-[color:#B23A2E]">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations / order-ahead page widget — a full cream order
  // ticket.
  return (
    <form
      onSubmit={onSubmit}
      className="border-[3px] p-6 shadow-[8px_8px_0_0_rgba(42,33,26,0.85)] sm:p-8"
      style={{ background: CREAM, borderColor: INK, borderRadius: "4px" }}
    >
      <div className="mb-5 flex items-center justify-between gap-3 border-b-2 border-dashed pb-4" style={{ borderColor: "#cdbf9e" }}>
        <span style={{ fontFamily: "var(--font-fraunces)", color: DELI }} className="text-xl font-bold uppercase tracking-[0.06em]">Order ticket</span>
        <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[color:#6F7A3A]">No. ___</span>
      </div>
      <label className="mb-5 block">
        <span className={labelCls}>Counter</span>
        <input className={`${fieldCls} bg-[color:#fbf7ec]`} style={fieldStyle} value={name} readOnly />
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
          <select name="time" defaultValue="12:30 PM" className={fieldCls} style={fieldStyle}>
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
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Extra pickles, rye not white, a celebration to mark" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-3 text-sm text-[color:#B23A2E]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full border-2 py-4 text-sm font-bold uppercase tracking-[0.16em] text-[color:#2A211A] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: MUSTARD, borderColor: INK, borderRadius: "2px" }}
      >
        {status === "sending" ? "Sending" : "Reserve a table"}
      </button>
    </form>
  );
}
