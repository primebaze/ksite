"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Parisian bistro palette for the réservation widget.
const RED = "#9E2B25";
const ZINC = "#2B2B2E";
const CREAM = "#F2ECDD";
const BRASS = "#B89150";

// Réservation widget for the Comptoir design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview tenants (id "sample-...") no-op with the success state.
// Honeypot field is "company".
//
// `inline` packs the controls into a compact zinc-bar row used on the hero
// (an elegant "comptoir" strip); the default stacked layout is used on the
// réservations page as a cream card with brass hairlines.
export function ComptoirBooking({
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
        setError(json.error ?? "Une erreur est survenue.");
      }
    } catch {
      setStatus("error");
      setError("Erreur réseau. Merci de réessayer.");
    }
  }

  const fieldCls =
    "w-full border bg-white px-3.5 py-2.5 text-sm text-[color:#2B2B2E] outline-none transition focus:border-[color:#9E2B25]";
  const fieldStyle = { borderColor: "#d8cdb0", borderRadius: "2px" } as const;
  const labelCls =
    "mb-1.5 block text-[10px] font-semibold uppercase tracking-[0.22em] text-[color:#2B2B2E]/55";

  const partyOptions = ["1 couvert", "2 couverts", "3 couverts", "4 couverts", "5 couverts", "6 couverts", "7 et plus"];
  const timeOptions = ["12h00", "12h30", "13h00", "13h30", "19h00", "19h30", "20h00", "20h30", "21h00"];

  if (status === "sent") {
    return (
      <div
        className="border px-6 py-7 text-center"
        style={{ background: CREAM, borderColor: BRASS, borderRadius: "2px", boxShadow: `inset 0 0 0 4px #fff, inset 0 0 0 5px ${BRASS}33` }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: RED }} className="text-2xl">
          À très bientôt !
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#2B2B2E]/70">
          Votre demande de table est enregistrée. Nous vous confirmerons par téléphone ou par email.
        </p>
      </div>
    );
  }

  // INLINE: the hero "comptoir" strip — a dark zinc bar with brass-trimmed
  // fields and a red réserver button.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="p-3 shadow-2xl sm:p-4"
        style={{ background: ZINC, borderRadius: "3px", border: `1px solid ${BRASS}66` }}
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={`${labelCls} !text-[color:#F2ECDD]/55`}>Couverts</span>
            <select name="party" defaultValue="2 couverts" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={`${labelCls} !text-[color:#F2ECDD]/55`}>Date</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={`${labelCls} !text-[color:#F2ECDD]/55`}>Heure</span>
            <select name="time" defaultValue="19h30" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={`${labelCls} !text-[color:#F2ECDD]/55`}>Votre nom</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Nom" />
          </label>
        </div>
        <div className="mt-3 grid items-end gap-3 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={`${labelCls} !text-[color:#F2ECDD]/55`}>Téléphone ou email</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="Pour confirmer votre table" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] px-10 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F2ECDD] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: RED, borderRadius: "2px" }}
          >
            {status === "sending" ? "Envoi…" : "Réserver"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-[color:#F2ECDD]">{error}</p>}
      </form>
    );
  }

  // STACKED: the réservations page widget — a cream card framed in brass.
  return (
    <form
      onSubmit={onSubmit}
      className="border bg-white p-6 sm:p-8"
      style={{ borderColor: BRASS, borderRadius: "2px", boxShadow: `inset 0 0 0 5px ${CREAM}, inset 0 0 0 6px ${BRASS}33` }}
    >
      <label className="mb-5 block">
        <span className={labelCls}>Le restaurant</span>
        <input className={`${fieldCls} bg-[color:#F2ECDD]/40`} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Couverts</span>
          <select name="party" defaultValue="2 couverts" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Heure</span>
          <select name="time" defaultValue="19h30" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Date</span>
          <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls}>Votre nom</span>
          <input name="cust_name" required className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-4 block">
        <span className={labelCls}>Téléphone ou email</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-4 block">
        <span className={labelCls}>Une occasion particulière ?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Allergies, anniversaire, terrasse…" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-[color:#9E2B25]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-6 w-full py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F2ECDD] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: RED, borderRadius: "2px" }}
      >
        {status === "sending" ? "Envoi…" : "Réserver ma table"}
      </button>
    </form>
  );
}
