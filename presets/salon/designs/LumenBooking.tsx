"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const INK = "#181A1B";
const AMBER = "#B07A36";

const fieldCls =
  "mt-1.5 w-full border border-[#181A1B]/15 bg-white px-3.5 py-2.5 text-sm text-[#181A1B] outline-none transition placeholder:text-[#181A1B]/35 focus:border-[#3C6E91]";

// Booking widget for the Lumen optician design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview sites no-op with a success state. Crisp, clinical-optical
// register: ink labels on optical white, lens-blue focus, amber submit.
export function LumenBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        party: data.get("service") ?? "",
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
    <div className="border border-[#181A1B]/12 bg-[#FBFBF9] p-7 sm:p-9">
      <div className="flex items-center gap-3">
        <span
          className="grid h-9 w-9 shrink-0 place-items-center rounded-full border-2"
          style={{ borderColor: AMBER, color: INK }}
          aria-hidden
        >
          <span className="h-2 w-2 rounded-full" style={{ background: AMBER }} />
        </span>
        <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl" >
          Book an appointment
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-[#181A1B]/60">
        Tell us which service you need and a time that suits. We confirm every booking by phone or email.
      </p>

      {status === "sent" ? (
        <p className="mt-6 border border-[#3C6E91]/30 bg-white px-4 py-5 text-sm leading-relaxed text-[#181A1B]">
          Thank you — your appointment request is in. We will be in touch shortly to confirm your slot at {name}.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#181A1B]/55">
              Your name
              <input name="cust_name" required className={fieldCls} placeholder="Full name" />
            </label>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#181A1B]/55">
              Phone or email
              <input name="contact" required className={fieldCls} placeholder="How to reach you" />
            </label>
          </div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#181A1B]/55">
            Service
            <input name="service" className={fieldCls} placeholder="e.g. Eye test, contact lens fitting, frames styling" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#181A1B]/55">
              Preferred date
              <input name="date" type="date" className={fieldCls} />
            </label>
            <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#181A1B]/55">
              Preferred time
              <input name="time" type="time" className={fieldCls} />
            </label>
          </div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.16em] text-[#181A1B]/55">
            Anything else
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Existing prescription, concerns, accessibility needs…" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm" style={{ color: AMBER }}>{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full py-3.5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: INK }}
          >
            {status === "sending" ? "Sending…" : "Request appointment"}
          </button>
        </form>
      )}
    </div>
  );
}
