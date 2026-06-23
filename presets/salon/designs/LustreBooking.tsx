"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const INK = "#3a3744";

const fieldCls =
  "w-full rounded-none border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] text-neutral-800 outline-none transition focus:border-neutral-800";
const labelCls = "block text-[11px] font-medium uppercase tracking-[0.18em] text-neutral-500";

// Booking widget for the Lustre aesthetics design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the practitioner;
// sample/preview sites no-op with a success state. Mirrors the reference's
// clean, boxed "Book Now" form, extended with date / time / treatment fields.
export function LustreBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div className="h-fit bg-white p-7 shadow-sm ring-1 ring-black/5 sm:p-8">
      <p style={{ fontFamily: "var(--font-fraunces)", color: INK }} className="text-xl tracking-[0.04em]">
        Request an appointment
      </p>
      <p className="mt-1 text-sm text-neutral-500">Lauren will confirm your slot by phone or email.</p>

      {status === "sent" ? (
        <p className="mt-6 border border-neutral-200 bg-neutral-50 px-4 py-5 text-sm leading-relaxed text-neutral-700">
          Thank you. Your request is in and we will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-5">
          <label className="block space-y-1.5">
            <span className={labelCls}>Treatment of interest</span>
            <input name="party" placeholder="e.g. consultation, skin booster" className={fieldCls} />
          </label>
          <div className="grid grid-cols-2 gap-4">
            <label className="block space-y-1.5">
              <span className={labelCls}>Preferred date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block space-y-1.5">
              <span className={labelCls}>Preferred time</span>
              <select name="time" className={fieldCls} defaultValue="Morning">
                {["Morning", "Afternoon", "Evening", "Flexible"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-1.5">
            <span className={labelCls}>Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block space-y-1.5">
            <span className={labelCls}>Email</span>
            <input name="email" type="email" required autoComplete="email" className={fieldCls} />
          </label>
          <label className="block space-y-1.5">
            <span className={labelCls}>Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
          </label>
          <label className="block space-y-1.5">
            <span className={labelCls}>Anything you would like me to know</span>
            <textarea name="notes" rows={3} className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-1 block w-full py-3.5 text-center text-xs font-semibold uppercase tracking-[0.22em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: INK }}
          >
            {status === "sending" ? "Sending..." : "Submit request"}
          </button>
        </form>
      )}
    </div>
  );
}
