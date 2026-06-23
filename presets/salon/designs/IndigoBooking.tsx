"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

// Indigo booking widget. Posts to the shared /api/site-forms pipeline
// (kind "booking"), which emails the salon owner; sample/preview sites no-op
// with a success state. Styled to the creative-salon palette: rounded fields on
// a soft card, a green pill submit. Fields: name, contact, date, time, party
// (stylist/people), notes. Honeypot field "company".
const INK = "#15130f";
const MINT = "#9fe7c6";

const fieldCls =
  "mt-1.5 w-full rounded-xl border border-black/15 bg-white px-4 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-neutral-900";

export function IndigoBooking({ tenantId, name }: { tenantId: string; name: string }) {
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

  return (
    <div id="book" className="rounded-3xl border border-black/10 bg-white p-7 shadow-sm sm:p-9">
      <h3 className="text-2xl font-extrabold tracking-tight" style={{ color: INK }}>
        Request an appointment
      </h3>
      <p className="mt-1.5 text-sm text-neutral-500">
        Tell us what you are after and when. We will confirm by phone or email.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded-2xl border border-emerald-300/60 bg-emerald-50 px-5 py-5 text-sm font-medium leading-relaxed text-emerald-700">
          Thanks, your request is in. We will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Salon</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Your name</span>
              <input name="cust_name" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Phone or email</span>
              <input name="contact" required className={fieldCls} />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Preferred date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Preferred time</span>
              <select name="time" className={fieldCls} defaultValue="11:00">
                {["9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Service or stylist</span>
            <input name="party" placeholder="e.g. cut and colour, or a stylist name" className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">Anything else?</span>
            <textarea name="notes" rows={3} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full rounded-full py-4 text-center text-sm font-bold transition hover:opacity-85 disabled:opacity-60"
            style={{ background: MINT, color: INK, border: `1.5px solid ${INK}` }}
          >
            {status === "sending" ? "Sending..." : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
