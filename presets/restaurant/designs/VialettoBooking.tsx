"use client";

import { useState } from "react";

// Vialetto booking widget — a refined Italian trattoria reservation form.
// Mirrors MeadowBooking's data contract exactly: POSTs to /api/site-forms with
// kind "booking", the same field keys (cust_name, contact, date, time, party,
// notes), the same honeypot ("company") and the same idle/sending/sent/error
// statuses. Visually it is its own thing: cream fields with a cypress-green
// underline-on-focus, antique-gold labels, lowercase-italic Fraunces accents.
//
// `inline` renders the compact hero row; the default is the stacked layout used
// on the reservations page.
const GREEN = "#2F4A36";
const CREAM = "#F4EFE3";
const TERRA = "#C56A3E";
const GOLD = "#B8893B";

export function VialettoBooking({
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
    "w-full border-0 border-b bg-transparent px-1 py-2.5 text-sm text-[color:#2F4A36] outline-none transition focus:border-[color:#2F4A36]";
  const fieldStyle = { borderBottomColor: `${GREEN}40` } as const;
  const labelCls = "mb-1 block text-[10px] font-semibold uppercase tracking-[0.22em]";
  const labelStyle = { color: GOLD } as const;
  const serif = { fontFamily: "var(--font-fraunces)" } as const;

  const partyOptions = ["1 persona", "2 persone", "3 persone", "4 persone", "5 persone", "6 persone", "7 o più"];
  const timeOptions = ["12:00", "12:30", "13:00", "13:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30"];

  if (status === "sent") {
    return (
      <div
        className="border px-7 py-9 text-center"
        style={{ background: CREAM, borderColor: GOLD }}
      >
        <p style={{ ...serif, color: GREEN }} className="text-3xl italic lowercase">grazie mille</p>
        <p className="mt-3 text-sm leading-relaxed text-[color:#2F4A36]/70">
          Your table request has arrived at our kitchen. We will write back shortly to confirm a place at the table.
        </p>
      </div>
    );
  }

  // INLINE: a slim single-row reservation strip, used on the hero beside the
  // portrait image. Cream card framed in gold.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border p-5 sm:p-6"
        style={{ background: CREAM, borderColor: GOLD }}
      >
        <p style={{ ...serif, color: GREEN }} className="mb-4 text-xl italic lowercase">prenota un tavolo</p>
        <div className="grid gap-x-5 gap-y-3 sm:grid-cols-2">
          <label className="block">
            <span className={labelCls} style={labelStyle}>Coperti</span>
            <select name="party" defaultValue="2 persone" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls} style={labelStyle}>Data</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls} style={labelStyle}>Ora</span>
            <select name="time" defaultValue="19:30" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls} style={labelStyle}>Il vostro nome</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Nome" />
          </label>
        </div>
        <label className="mt-3 block">
          <span className={labelCls} style={labelStyle}>Telefono o email</span>
          <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="Per confermare" />
        </label>
        {/* honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
        {status === "error" && <p className="mt-3 text-sm" style={{ color: TERRA }}>{error}</p>}
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-6 w-full px-8 py-3.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:#F4EFE3] transition hover:opacity-90 disabled:opacity-60"
          style={{ background: GREEN }}
        >
          {status === "sending" ? "Invio…" : "Prenota"}
        </button>
      </form>
    );
  }

  // STACKED: the full reservations-page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="border p-7 sm:p-10"
      style={{ background: "#FBF8F1", borderColor: GOLD }}
    >
      <label className="mb-6 block">
        <span className={labelCls} style={labelStyle}>Ristorante</span>
        <input className={`${fieldCls} cursor-default`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-x-7 gap-y-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls} style={labelStyle}>Coperti</span>
          <select name="party" defaultValue="2 persone" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls} style={labelStyle}>Ora</span>
          <select name="time" defaultValue="19:30" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls} style={labelStyle}>Data</span>
          <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls} style={labelStyle}>Il vostro nome</span>
          <input name="cust_name" required className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-5 block">
        <span className={labelCls} style={labelStyle}>Telefono o email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-5 block">
        <span className={labelCls} style={labelStyle}>Richieste particolari</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Allergie, un seggiolone, una ricorrenza da festeggiare" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {status === "error" && <p className="mt-4 text-sm" style={{ color: TERRA }}>{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-8 w-full px-8 py-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-[color:#F4EFE3] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: GREEN }}
      >
        {status === "sending" ? "Invio…" : "Prenota il tavolo"}
      </button>
    </form>
  );
}
