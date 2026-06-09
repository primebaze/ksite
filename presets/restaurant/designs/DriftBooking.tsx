"use client";

import { useState } from "react";

const CORAL = "#e0483d";
const SOFT = "#f4f4f2";

const fieldCls =
  "mt-1.5 w-full rounded-lg border border-neutral-200 bg-white px-3.5 py-2.5 text-[15px] text-neutral-900 outline-none transition focus:border-[#e0483d] focus:ring-2 focus:ring-[#e0483d]/15";

// Reservation widget for the Drift design. Posts to the shared /api/site-forms
// pipeline (kind "booking"), which emails the business owner; sample/preview
// sites (id starts "sample-") no-op with the success state. Honeypot field
// "company", with sending/sent/error states.
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

  return (
    <div id="book" className="h-fit rounded-2xl p-7 sm:p-8" style={{ background: SOFT }}>
      <p className="text-xl font-semibold text-neutral-900">Book a table</p>
      <p className="mt-1 text-sm text-neutral-500">Reserve in a few seconds. We&apos;ll confirm by phone or email.</p>

      {status === "sent" ? (
        <p className="mt-6 rounded-lg border border-emerald-300/50 bg-emerald-50 px-4 py-5 text-sm font-medium text-emerald-700">
          Thanks, your reservation request is in. We&apos;ll confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Restaurant
            <input className={fieldCls} value={name} readOnly />
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
              Guests
              <select name="party" className={fieldCls} defaultValue="2 guests">
                {["1 guest", "2 guests", "3 guests", "4 guests", "5 guests", "6 guests", "7+ guests"].map((g) => (
                  <option key={g}>{g}</option>
                ))}
              </select>
            </label>
            <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
              Time
              <select name="time" className={fieldCls} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "8:30 PM"].map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Date
            <input name="date" type="date" required className={fieldCls} />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Your name
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block text-xs font-medium uppercase tracking-wider text-neutral-500">
            Phone or email
            <input name="contact" required className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {status === "error" && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full rounded-full py-3.5 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white transition hover:opacity-90 disabled:opacity-60"
            style={{ background: CORAL }}
          >
            {status === "sending" ? "Sending…" : "Request booking"}
          </button>
        </form>
      )}
    </div>
  );
}
