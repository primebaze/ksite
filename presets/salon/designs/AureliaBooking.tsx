"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const INK = "#16140f";
const ACCENT = "#9c8466";

const fieldCls =
  "mt-1.5 w-full rounded-none border-0 border-b border-neutral-300 bg-transparent pb-2 pt-1 text-[15px] text-neutral-900 outline-none transition focus:border-neutral-900";

// Multi-step "Get in touch" booking widget for the Aurelia aesthetics design.
// Mirrors the reference's stepped consultation form. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the clinic owner;
// sample/preview sites no-op with the success state.
export function AureliaBooking({
  tenantId,
  services,
}: {
  tenantId: string;
  services: string[];
}) {
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [service, setService] = useState(services[0] ?? "General enquiry");

  const totalSteps = 3;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    if (String(data.get("company") ?? "")) return; // honeypot
    const notes = [
      service ? `Treatment of interest: ${service}` : "",
      String(data.get("notes") ?? ""),
    ]
      .filter(Boolean)
      .join(". ");
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
        party: service,
        notes,
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

  if (status === "sent") {
    return (
      <div className="border border-neutral-200 bg-white p-8 sm:p-10">
        <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl" >
          Thank you
        </p>
        <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">
          Your consultation request is in. A member of our team will be in touch shortly to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <div className="border border-neutral-200 bg-white p-8 sm:p-10">
      {/* step progress */}
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
          Step {step + 1} of {totalSteps}
        </p>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <span
              key={i}
              className="h-1 w-8 rounded-full"
              style={{ background: i <= step ? ACCENT : "#e5e1da" }}
            />
          ))}
        </div>
      </div>

      <form onSubmit={onSubmit} className="mt-7">
        {/* Step 1 — service */}
        <div className={step === 0 ? "block" : "hidden"}>
          <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-xl text-neutral-900">
            What treatment are you interested in?
          </p>
          <label className="mt-5 block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Treatment</span>
            <select
              value={service}
              onChange={(e) => setService(e.target.value)}
              className={fieldCls}
            >
              {(services.length ? services : ["General enquiry"]).map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Step 2 — preferred timing */}
        <div className={step === 1 ? "block" : "hidden"}>
          <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-xl text-neutral-900">
            When would suit you?
          </p>
          <p className="mt-2 text-sm text-neutral-500">We offer flexible scheduling and will confirm the closest available slot.</p>
          <div className="mt-5 grid grid-cols-2 gap-5">
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Preferred date</span>
              <input name="date" type="date" className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Preferred time</span>
              <select name="time" className={fieldCls} defaultValue="Morning">
                {["Morning", "Afternoon", "Early evening"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="mt-5 block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Anything we should know?</span>
            <textarea name="notes" rows={2} className={fieldCls} />
          </label>
        </div>

        {/* Step 3 — your details */}
        <div className={step === 2 ? "block" : "hidden"}>
          <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-xl text-neutral-900">
            How can we reach you?
          </p>
          <label className="mt-5 block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Your name</span>
            <input name="cust_name" required={step === 2} className={fieldCls} />
          </label>
          <label className="mt-5 block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Email</span>
            <input name="email" type="email" required={step === 2} autoComplete="email" className={fieldCls} />
          </label>
          <label className="mt-5 block">
            <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
          </label>
          <p className="mt-5 text-xs leading-relaxed text-neutral-400">
            By submitting this form you agree that we may contact you by email or phone to schedule your consultation.
          </p>
        </div>

        {/* honeypot */}
        <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
        {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}

        {status === "error" && <p className="mt-5 text-sm text-red-600">{error}</p>}

        {/* controls */}
        <div className="mt-8 flex items-center gap-3">
          {step > 0 && (
            <button
              type="button"
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              className="border border-neutral-300 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-700 transition hover:bg-neutral-100"
            >
              Back
            </button>
          )}
          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => Math.min(totalSteps - 1, s + 1))}
              className="flex-1 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90"
              style={{ background: INK }}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="flex-1 px-6 py-3.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white transition hover:opacity-90 disabled:opacity-60"
              style={{ background: INK }}
            >
              {status === "sending" ? "Sending..." : "Request consultation"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
