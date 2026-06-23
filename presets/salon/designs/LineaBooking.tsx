"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const SAGE = "#8ba29c";
const TAUPE = "#5c5048";

const serif = { fontFamily: "var(--font-fraunces)" } as const;

const fieldCls =
  "mt-1.5 w-full border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] text-neutral-800 outline-none transition focus:border-neutral-600";
const labelCls = "block text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500";

// Consultation request widget for the Linea aesthetics-clinic design. Posts to
// the shared /api/site-forms pipeline (kind "booking"), which emails the owner;
// sample/preview sites no-op with the success state. Soft sage-accented card to
// match the clinic palette, distinct from the dark Ember / monochrome Lumiere
// widgets.
export function LineaBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        email: data.get("email") ?? "",
        phone: data.get("phone") ?? "",
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
    <div className="border border-neutral-200 bg-white p-8 shadow-[0_2px_30px_rgba(0,0,0,0.05)]" style={{ borderTop: `3px solid ${SAGE}` }}>
      <p style={{ ...serif, color: TAUPE }} className="text-2xl">Request a consultation</p>
      <p className="mt-1 text-sm text-neutral-500">Tell us what you are interested in and we will confirm your appointment.</p>

      {status === "sent" ? (
        <p className="mt-6 border border-neutral-200 bg-[#f4f6f5] px-4 py-5 text-sm leading-relaxed text-neutral-700">
          Thank you, your consultation request is in. We will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block">
            <span className={labelCls}>Clinic</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <label className="block">
            <span className={labelCls}>Treatment of interest</span>
            <select name="party" className={fieldCls} defaultValue="Skin consultation">
              {["Skin consultation", "Injectables", "Dermal fillers", "Skin peel", "Microneedling", "Other treatment"].map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block">
              <span className={labelCls}>Preferred date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className={labelCls}>Preferred time</span>
              <select name="time" className={fieldCls} defaultValue="Morning">
                {["Morning", "Afternoon", "Evening", "No preference"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Email</span>
            <input name="email" type="email" required autoComplete="email" className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
          </label>
          <label className="block">
            <span className={labelCls}>Anything else?</span>
            <textarea name="notes" rows={3} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-4 text-center text-[12px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: SAGE }}
          >
            {status === "sending" ? "Sending..." : "Request consultation"}
          </button>
        </form>
      )}
    </div>
  );
}
