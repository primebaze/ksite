"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const ROSE = "#cf9583";
const INK = "#2c2622";

const fieldCls =
  "mt-1.5 w-full rounded-md border border-white/40 bg-white/15 px-3.5 py-2.5 text-sm text-white outline-none transition placeholder:text-white/55 focus:border-white";

// Booking widget for the Seren aesthetics-clinic design, set inside the rose
// contact panel from the reference. Posts to the shared /api/site-forms
// pipeline (kind "booking"), which emails the owner; sample/preview sites no-op
// with a success state.
export function SerenBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
        party: data.get("treatment") ?? "",
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
    <div className="p-7 sm:p-9" style={{ background: ROSE }}>
      <h3 style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl text-white">
        Request a consultation
      </h3>
      <p className="mt-1.5 text-sm text-white/85">
        Tell us what you are interested in and a time that suits. We will confirm by phone or email.
      </p>

      {status === "sent" ? (
        <p className="mt-6 rounded-md border border-white/50 bg-white/15 px-4 py-5 text-sm leading-relaxed text-white">
          Thank you, your consultation request is in. We will be in touch very soon.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <label className="block text-xs font-medium uppercase tracking-[0.12em] text-white/85">
              Your name
              <input name="cust_name" required className={fieldCls} placeholder="Full name" />
            </label>
            <label className="block text-xs font-medium uppercase tracking-[0.12em] text-white/85">
              Phone or email
              <input name="contact" required className={fieldCls} placeholder="How to reach you" />
            </label>
          </div>
          <label className="block text-xs font-medium uppercase tracking-[0.12em] text-white/85">
            Treatment of interest
            <input name="treatment" className={fieldCls} placeholder="e.g. facial, skin consultation" />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block text-xs font-medium uppercase tracking-[0.12em] text-white/85">
              Preferred date
              <input name="date" type="date" className={`${fieldCls} [color-scheme:dark]`} />
            </label>
            <label className="block text-xs font-medium uppercase tracking-[0.12em] text-white/85">
              Preferred time
              <input name="time" type="time" className={`${fieldCls} [color-scheme:dark]`} />
            </label>
          </div>
          <label className="block text-xs font-medium uppercase tracking-[0.12em] text-white/85">
            Anything else
            <textarea name="notes" rows={3} className={fieldCls} placeholder="Your message" />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-white">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 w-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: INK }}
          >
            {status === "sending" ? "Sending..." : "Submit"}
          </button>
        </form>
      )}
    </div>
  );
}
