"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Sobremesa palette for the reservation widget — rioja oxblood, ochre, parchment.
const RIOJA = "#6E1F26";
const OCHRE = "#C77B33";
const INK = "#241813";
const PARCHMENT = "#F2E7D2";

// Reservation widget for the Sobremesa design. POSTs to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview tenants (id "sample-...") no-op with the success state.
// Honeypot field is "company".
//
// `inline` packs the controls into a compact horizontal row used on the warm
// hero; the default stacked layout is used on the reservations page. Styling is
// rustic-refined: parchment fields, oxblood accents, a confident serif voice.
export function SobremesaBooking({
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
        setError(json.error ?? "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  const fieldCls =
    "w-full border-b bg-transparent px-1 py-2.5 text-sm text-[color:#241813] outline-none transition focus:border-[color:#6E1F26]";
  const fieldStyle = { borderColor: "rgba(36,24,19,0.28)" } as const;
  const labelCls = "mb-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-[color:#6E1F26]";

  const partyOptions = ["1 persona", "2 personas", "3 personas", "4 personas", "5 personas", "6 personas", "7 o más"];
  const timeOptions = ["1:00 PM", "2:00 PM", "3:00 PM", "7:00 PM", "8:00 PM", "9:00 PM", "10:00 PM", "11:00 PM"];

  if (status === "sent") {
    return (
      <div
        className="border px-7 py-8 text-center"
        style={{ background: PARCHMENT, borderColor: RIOJA }}
      >
        <p style={{ fontFamily: "var(--font-fraunces)", color: RIOJA }} className="text-3xl">
          ¡Hasta pronto!
        </p>
        <p className="mt-2 text-sm leading-relaxed text-[color:#5b4a3f]">
          Your table request is in. We will be in touch shortly to confirm — and to begin a long, lazy sobremesa.
        </p>
      </div>
    );
  }

  // INLINE: the hero booking row — party, date, time + a reserve button.
  if (inline) {
    return (
      <form
        onSubmit={onSubmit}
        className="border p-4 shadow-[0_24px_60px_-30px_rgba(36,24,19,0.7)] sm:p-5"
        style={{ background: PARCHMENT, borderColor: "rgba(110,31,38,0.35)" }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <label className="block">
            <span className={labelCls}>Mesa para</span>
            <select name="party" defaultValue="2 personas" className={fieldCls} style={fieldStyle}>
              {partyOptions.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Fecha</span>
            <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
          </label>
          <label className="block">
            <span className={labelCls}>Hora</span>
            <select name="time" defaultValue="8:00 PM" className={fieldCls} style={fieldStyle}>
              {timeOptions.map((t) => <option key={t}>{t}</option>)}
            </select>
          </label>
          <label className="block">
            <span className={labelCls}>Su nombre</span>
            <input name="cust_name" required className={fieldCls} style={fieldStyle} placeholder="Nombre" />
          </label>
        </div>
        <div className="mt-4 grid items-end gap-4 sm:grid-cols-[1fr_auto]">
          <label className="block">
            <span className={labelCls}>Teléfono o correo</span>
            <input name="contact" required className={fieldCls} style={fieldStyle} placeholder="Para confirmar" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          <button
            type="submit"
            disabled={status === "sending"}
            className="h-[46px] px-10 text-[11px] font-semibold uppercase tracking-[0.2em] text-[color:#F2E7D2] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: RIOJA }}
          >
            {status === "sending" ? "Enviando" : "Reservar"}
          </button>
        </div>
        {status === "error" && <p className="mt-2 text-sm text-[color:#6E1F26]">{error}</p>}
      </form>
    );
  }

  // STACKED: the reservations page widget.
  return (
    <form
      onSubmit={onSubmit}
      className="border p-7 shadow-[0_24px_60px_-34px_rgba(36,24,19,0.6)] sm:p-9"
      style={{ background: PARCHMENT, borderColor: RIOJA }}
    >
      <label className="mb-6 block">
        <span className={labelCls}>Dónde</span>
        <input className={fieldCls} style={fieldStyle} value={name} readOnly />
      </label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block">
          <span className={labelCls}>Mesa para</span>
          <select name="party" defaultValue="2 personas" className={fieldCls} style={fieldStyle}>
            {partyOptions.map((p) => <option key={p}>{p}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Hora</span>
          <select name="time" defaultValue="8:00 PM" className={fieldCls} style={fieldStyle}>
            {timeOptions.map((t) => <option key={t}>{t}</option>)}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Fecha</span>
          <input name="date" type="date" required className={fieldCls} style={fieldStyle} />
        </label>
        <label className="block">
          <span className={labelCls}>Su nombre</span>
          <input name="cust_name" required className={fieldCls} style={fieldStyle} />
        </label>
      </div>
      <label className="mt-5 block">
        <span className={labelCls}>Teléfono o correo</span>
        <input name="contact" required className={fieldCls} style={fieldStyle} />
      </label>
      <label className="mt-5 block">
        <span className={labelCls}>¿Algo más?</span>
        <textarea name="notes" rows={3} className={fieldCls} style={fieldStyle} placeholder="Alergias, una celebración, una mesa junto a la ventana" />
      </label>
      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
      {status === "error" && <p className="mt-3 text-sm text-[color:#6E1F26]">{error}</p>}
      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-7 w-full py-4 text-[11px] font-semibold uppercase tracking-[0.22em] text-[color:#F2E7D2] transition hover:opacity-90 disabled:opacity-60"
        style={{ background: RIOJA, boxShadow: `inset 0 -3px 0 ${OCHRE}` }}
      >
        {status === "sending" ? "Enviando" : "Reservar mesa"}
      </button>
    </form>
  );
}
