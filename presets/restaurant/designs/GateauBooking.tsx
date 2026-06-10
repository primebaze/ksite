"use client";

import { useState } from "react";

// Couture-patisserie palette for the order/reservation widget.
const COCOA = "#3B2C28";
const GOLD = "#C9A24A";
const IVORY = "#FBF7F1";

// Order / reservation widget for the Gateau design. For a patisserie the
// "booking" reads as "order a cake or reserve a table" — the mechanics are
// identical to MeadowBooking (POST /api/site-forms, kind "booking", same fields,
// honeypot "company", same statuses), only the copy is relabelled. Rendered as a
// delicate ivory card with hairline gold rules.
//
// `inline` packs the controls into one elegant row (used on the home hero);
// the default stacked layout is used on the dedicated reservations page.
export function GateauBooking({
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
    "w-full rounded-lg border bg-white/70 px-3.5 py-2.5 text-sm text-[color:#3B2C28] outline-none transition focus:border-[color:#C9A24A]";
  const fieldStyle = { borderColor: "#e6dccb" } as const;
  const labelCls = "mb-1.5 block text-[10px] font-medium uppercase tracking-[0.24em] text-[color:#3B2C28]/55";

  // For a patisserie the "party" reads as a request type / cake size.
  const requestOptions = [
    "Cake order — small (6\")",
    "Cake order — large (8\")",
    "Box of pâtisserie",
    "Table for 2",
    "Table for 4",
    "Private event",
  ];
  const timeOptions = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:30 PM", "5:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="rounded-2xl border px-7 py-8 text-center"
        style={{ background: IVORY, borderColor: GOLD }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: COCOA }} className="text-2xl font-normal italic lowercase">
          merci, with pleasure
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#3B2C28]/65">
          Your request is in the box. We will be in touch shortly to confirm the details.
        </p>
      </div>
    );
  }

  // INLINE: a single elegant hero row — request, date, name + a "Reserve" button.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="rounded-2xl border bg-[color:#FBF7F1]/95 p-4 shadow-[0_24px_60px_-32px_rgba(59,44,40,0.45)] backdrop-blur sm:p-5"
        style={{ borderColor: `${GOLD}55` }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Request</span>
            <select name="party" defaultValue="Box of pâtisserie" className={fieldCls} style={fieldStyle}>
              {requestOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Date</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Collection</span>
            <select name="time" defaultValue="11:00 AM" className={fieldCls} style={fieldStyle}>
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
            className="h-[46px] rounded-full px-10 text-[11px] font-medium uppercase tracking-[0.24em] text-[color:#FBF7F1] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: COCOA }}
          >
            {status === "sending" ? "Sending" : "Reserve"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </form>
    );
  }

  // STACKED: the dedicated order / reservations page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl border bg-[color:#FBF7F1] p-6 shadow-[0_30px_70px_-40px_rgba(59,44,40,0.5)] sm:p-8"
      style={{ borderColor: `${GOLD}66` }}
    >
      <div className="mb-6 flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: `${GOLD}80` }} aria-hidden />
        <span style={{ fontFamily: "var(--font-fraunces)", color: COCOA }} className="text-sm italic lowercase tracking-[0.04em]">la maison</span>
        <span className="h-px flex-1" style={{ background: `${GOLD}80` }} aria-hidden />
      </div>
      <label className="mb-5 block">
        <span className={labelCls}>At</span>
        <input className={`${fieldCls} bg-white/40`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Request</span>
          <select name="party" defaultValue="Box of pâtisserie" className={fieldCls} style={fieldStyle}>
            {requestOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Collection time</span>
          <select name="time" defaultValue="11:00 AM" className={fieldCls} style={fieldStyle}>
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
        <span className={labelCls}>Occasion or special requests</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="A birthday, an inscription, dietary notes…" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full rounded-full py-4 text-[11px] font-medium uppercase tracking-[0.26em] text-[color:#FBF7F1] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: COCOA }}
      >
        {status === "sending" ? "Sending" : "Send request"}
      </button>
      <p className="mt-3 text-center text-[10px] uppercase tracking-[0.2em]" style={{ color: `${COCOA}99` }}>Cake orders, kindly, 48 hours ahead</p>
    </form>
  );
}
