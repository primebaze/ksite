"use client";

import { useState } from "react";

// Curbside palette for the catering/event-booking widget. A food truck doesn't
// take "table reservations" — it gets booked for events, festivals, markets and
// private catering. Same /api/site-forms pipeline (kind "booking"), same fields,
// same honeypot ("company"); only the copy/labels are reframed for "book us".
const TANGERINE = "#F5631E";
const ASPHALT = "#1B1B1D";
const TEAL = "#18A39B";
const HAZARD = "#FFD23F";

export function CurbsideBooking({
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
    "w-full border-[2.5px] bg-white px-3.5 py-2.5 text-sm font-semibold text-[color:#1B1B1D] outline-none transition focus:border-[color:#F5631E]";
  const fieldStyle = { borderColor: ASPHALT, borderRadius: "0.35rem" } as const;
  const labelCls = "mb-1.5 block text-[11px] font-black uppercase tracking-[0.14em] text-[color:#1B1B1D]/60";

  // A food truck books gigs: pick the kind of event, a date, a rough headcount.
  const eventOptions = ["Festival / market", "Private party", "Corporate / office", "Wedding", "Street pitch", "Something else"];
  const partyOptions = ["Up to 25", "25–50", "50–100", "100–250", "250+"];

  if (status === "sent") {
    return (
      <div
        className="border-[3px] px-6 py-7 text-center shadow-[6px_6px_0_0_#18A39B]"
        style={{ background: HAZARD, borderColor: ASPHALT, borderRadius: "0.5rem" }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: ASPHALT }} className="text-2xl font-black uppercase tracking-tight">
          Loud and clear!
        </p>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-[color:#1B1B1D]/80">
          Your enquiry just hit our inbox. We&apos;ll roll back to you with dates, menus and a quote.
        </p>
      </div>
    );
  }

  // INLINE: the hero "book us" strip — event type, date, headcount + a button.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border-[3px] bg-white p-3 shadow-[8px_8px_0_0_#1B1B1D] sm:p-4"
        style={{ borderColor: ASPHALT, borderRadius: "0.6rem" }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Event type</span>
            <select name="party" defaultValue="Festival / market" className={fieldCls} style={fieldStyle}>
              {eventOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Date</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Headcount</span>
            <select name="time" defaultValue="25–50" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((t) => <option key={t}>{t}</option>)}
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
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="So we can roll back to you" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[48px] border-[3px] px-10 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1B1B1D] disabled:opacity-60"
            style={{ background: TANGERINE, borderColor: ASPHALT, borderRadius: "0.4rem", boxShadow: "4px 4px 0 0 #1B1B1D" }}
          >
            {status === "sending" ? "Sending" : "Book us"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the full catering / event enquiry form (reservations page).
  return (
    <form
      onSubmit={onSubmit}
      className="border-[3px] bg-white p-6 shadow-[10px_10px_0_0_#18A39B] sm:p-8"
      style={{ borderColor: ASPHALT, borderRadius: "0.6rem" }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>The truck</span>
        <input className={fieldCls} style={{ ...fieldStyle, background: "#F4F1EB" }} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Type of gig</span>
          <select name="party" defaultValue="Festival / market" className={fieldCls} style={fieldStyle}>
            {eventOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Rough headcount</span>
          <select name="time" defaultValue="25–50" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((t) => <option key={t}>{t}</option>)}
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
        <span className={labelCls}>Tell us about the event</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Location, vibe, dietary needs, power on site, anything goes" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-3 text-sm font-semibold text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full border-[3px] py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#1B1B1D] disabled:opacity-60"
        style={{ background: TANGERINE, borderColor: ASPHALT, borderRadius: "0.45rem", boxShadow: "6px 6px 0 0 #1B1B1D" }}
      >
        {status === "sending" ? "Sending" : "Send catering enquiry"}
      </button>
    </form>
  );
}
