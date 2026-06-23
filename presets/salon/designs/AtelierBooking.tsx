"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const WINE = "#7a2a38";
const BLUSH = "#f7eef0";

const fieldCls =
  "mt-1.5 w-full rounded-md border border-neutral-300 bg-white px-3.5 py-2.5 text-[15px] text-neutral-800 outline-none transition focus:border-[#7a2a38]";
const labelCls = "block text-xs font-semibold uppercase tracking-[0.14em] text-neutral-600";

// Booking widget for the Atelier salon design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the salon owner;
// sample/preview sites (id starting "sample-") no-op with the success state.
export function AtelierBooking({ tenantId, name }: { tenantId: string; name: string }) {
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
    <div id="book" className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div style={{ background: BLUSH }} className="px-7 py-6">
        <p style={{ fontFamily: "var(--font-fraunces)" }} className="text-2xl text-neutral-900">Request an appointment</p>
        <p className="mt-1 text-sm text-neutral-600">Pick a treatment and time. We will confirm by phone or email.</p>
      </div>

      {status === "sent" ? (
        <p className="m-7 rounded-md border border-emerald-300/60 bg-emerald-50 px-4 py-5 text-sm leading-relaxed text-emerald-700">
          Thank you, your appointment request is in. We will be in touch shortly to confirm.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="space-y-5 p-7">
          <label className="block">
            <span className={labelCls}>Treatment or service</span>
            <select name="party" className={fieldCls} defaultValue="Hair cutting">
              {["Hair cutting", "Hair colour", "Hair treatments", "Facials", "Waxing", "Threading", "Nails", "Other"].map((s) => (
                <option key={s}>{s}</option>
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
              <select name="time" className={fieldCls} defaultValue="10:00 AM">
                {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((t) => (
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
            <span className={labelCls}>Phone or email</span>
            <input name="contact" required className={fieldCls} />
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
            style={{ background: WINE }}
            className="mt-1 block w-full rounded-md py-4 text-center text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:opacity-90 disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : `Book at ${name}`}
          </button>
        </form>
      )}
    </div>
  );
}
