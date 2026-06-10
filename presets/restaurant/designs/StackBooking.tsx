"use client";

import { useState } from "react";

// Loud retro smash-burger palette for the order/booth widget.
const MUSTARD = "#F2B705";
const CHARCOAL = "#161616";
const KETCHUP = "#D62828";
const CREAM = "#F7F3E8";

// "Order ahead / Reserve a booth" widget for the Stack design. Same mechanics as
// MeadowBooking — POSTs to the shared /api/site-forms pipeline (kind "booking"),
// honeypot field "company", same fields (name/contact/date/time/party/notes),
// same idle/sending/sent/error statuses — but relabeled for a burger joint.
//
// `inline` packs the controls into a compact row used on the home hero; the
// default stacked layout is used on the reservations ("grab a booth") page.
export function StackBooking({
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

  // Thick-bordered, hard-shadowed fields to match the retro-graphic look.
  const fieldCls =
    "w-full border-[3px] bg-white px-3.5 py-2.5 text-sm font-semibold text-[color:#161616] outline-none transition focus:-translate-y-px";
  const fieldStyle = { borderColor: CHARCOAL } as const;
  const labelCls = "mb-1.5 block text-[11px] font-black uppercase tracking-[0.16em] text-[color:#161616]";

  const partyOptions = ["1 person", "2 people", "3 people", "4 people", "5 people", "6 people", "7 or more"];
  const timeOptions = ["11:30 AM", "12:00 PM", "1:00 PM", "5:00 PM", "6:00 PM", "7:00 PM", "8:00 PM", "9:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="border-[4px] px-6 py-7 text-center shadow-[8px_8px_0_0_#161616]"
        style={{ background: MUSTARD, borderColor: CHARCOAL }}
      >
        <p
          style={{ fontFamily: "var(--font-fraunces)", color: CHARCOAL }}
          className="text-3xl font-black uppercase leading-none tracking-tight"
        >
          You&apos;re in!
        </p>
        <p className="mt-2 text-sm font-semibold leading-relaxed text-[color:#161616]">
          Order&apos;s on the rail. We&apos;ll ping you to lock it in.
        </p>
      </div>
    );
  }

  // INLINE: the hero order row — party, date, time, name + a "FIRE IT UP" button.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border-[4px] p-3 shadow-[10px_10px_0_0_#161616] sm:p-4"
        style={{ background: CREAM, borderColor: CHARCOAL }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>How many</span>
            <select name="party" defaultValue="2 people" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Day</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Time</span>
            <select name="time" defaultValue="6:00 PM" className={fieldCls} style={fieldStyle}>
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
            className="h-[50px] border-[3px] px-10 text-sm font-black uppercase tracking-[0.16em] text-white shadow-[5px_5px_0_0_#161616] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#161616] disabled:opacity-60"
            style={{ background: KETCHUP, borderColor: CHARCOAL }}
          >
            {status === "sending" ? "Firing" : "Fire it up"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm font-bold text-[color:#D62828]">{error}</p>}
      </form>
    );
  }

  // STACKED: the "grab a booth / order ahead" page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="border-[4px] bg-white p-6 shadow-[10px_10px_0_0_#161616] sm:p-8"
      style={{ borderColor: CHARCOAL }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Joint</span>
        <input className={`${fieldCls} bg-[#F7F3E8]`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>How many</span>
          <select name="party" defaultValue="2 people" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select name="time" defaultValue="6:00 PM" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Day</span>
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
        <span className={labelCls}>Extra toppings?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Allergies, big group, a birthday to celebrate" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-3 text-sm font-bold text-[color:#D62828]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full border-[3px] py-4 text-sm font-black uppercase tracking-[0.18em] text-white shadow-[6px_6px_0_0_#161616] transition hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0_0_#161616] disabled:opacity-60"
        style={{ background: KETCHUP, borderColor: CHARCOAL }}
      >
        {status === "sending" ? "Sending" : "Lock in my order"}
      </button>
    </form>
  );
}
