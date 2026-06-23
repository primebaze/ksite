"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const CORAL = "#e0483d";

const fieldCls =
  "w-full rounded-xl border border-neutral-200 bg-white px-3.5 py-3 text-[15px] text-neutral-900 outline-none transition focus:border-[#e0483d] focus:ring-2 focus:ring-[#e0483d]/15";
const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wider text-neutral-500";

// Reservation widget for the Drift design — a slim HORIZONTAL booking bar:
// guests / date / time / name / contact line up in a single row on desktop and
// stack on mobile, with a full-width coral "Book now" button. Posts to the
// shared /api/site-forms pipeline (kind "booking"), which emails the business
// owner; sample/preview sites (id starts "sample-") no-op with the success
// state. Honeypot field "company", with sending/sent/error states.
export function DriftBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
      setError("Network error, please try again.");
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-emerald-300/50 bg-emerald-50 px-6 py-8 text-center text-[15px] font-medium text-emerald-700">
        Thanks, your reservation request is in. We&apos;ll confirm shortly.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:p-6">
      {/* horizontal bar: each control in one row on desktop, stacked on mobile */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:items-end lg:gap-3">
        <label className="block">
          <span className={labelCls}>Guests</span>
          <select name="party" className={fieldCls} defaultValue="2 guests">
            {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Date</span>
          <input name="date" type="date" required className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Time</span>
          <select name="time" className={fieldCls} defaultValue="7:00 PM">
            {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={labelCls}>Your name</span>
          <input name="cust_name" required className={fieldCls} />
        </label>
        <label className="block">
          <span className={labelCls}>Phone or email</span>
          <input name="contact" required className={fieldCls} />
        </label>
      </div>

      <label className="mt-4 block">
        <span className={labelCls}>Anything else?</span>
        <input name="notes" className={fieldCls} placeholder="Allergies, occasion, high chair…" />
      </label>

      {/* honeypot */}
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
      {/* keep the readonly venue name in the payload context for the owner email */}
      <input type="hidden" name="venue" value={name} />
      {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}

      {status === "error" && <p className="mt-3 text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-5 block w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90 disabled:opacity-60 lg:w-auto lg:px-12"
        style={{ background: CORAL }}
      >
        {status === "sending" ? "Sending…" : "Book now"}
      </button>
    </form>
  );
}
