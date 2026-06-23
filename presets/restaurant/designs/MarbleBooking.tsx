"use client";

import { useState } from "react";
import { Turnstile } from "@/components/Turnstile";

const TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const GOLD = "#c9a227";
const EMBER = "#8a2b22";
const CHARCOAL_TEXT = "#1c1a17";

const fieldCls =
  "w-full border-0 border-b border-white/25 bg-transparent pb-2 pt-1 text-[15px] text-[#efe8db] placeholder:text-white/40 outline-none transition focus:border-[#c9a227]";

const PARTY_SIZES = ["1", "2", "3", "4", "5", "6", "7", "8+"];

// Functional reservation widget for the Marble design. Posts to the shared
// /api/site-forms pipeline (kind "booking"), which emails the business owner;
// sample/preview sites (id starts "sample-") no-op with a success state.
// Honeypot field "company"; sending / sent / error states. Distinct layout:
// party size is the hero of the form, chosen from a large row of tap targets.
export function MarbleBooking({ tenantId, name }: { tenantId: string; name: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const [party, setParty] = useState("2");

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
        setParty("2");
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
    <div id="book" className="h-fit p-8 sm:p-10" style={{ border: `1px solid ${GOLD}`, background: "rgba(0,0,0,0.25)" }}>
      <p style={{ fontFamily: "var(--font-fraunces)", color: GOLD }} className="text-2xl">Reserve a table</p>

      {status === "sent" ? (
        <p className="mt-6 border border-white/20 px-4 py-5 text-sm leading-relaxed text-[#efe8db]/80">
          Thank you, your reservation request is in. We&apos;ll confirm shortly.
        </p>
      ) : (
        <form onSubmit={onSubmit} className="mt-8 space-y-8">
          {/* PARTY SIZE — the emphasised choice */}
          <fieldset>
            <legend className="text-xs font-semibold uppercase tracking-[0.22em] text-[#efe8db]/70">How many in your party?</legend>
            <input type="hidden" name="party" value={party === "8+" ? "8+ guests" : `${party} guests`} />
            <div className="mt-4 flex flex-wrap gap-2.5">
              {PARTY_SIZES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setParty(p)}
                  aria-pressed={party === p}
                  className="flex h-12 w-12 items-center justify-center text-lg font-medium transition sm:h-14 sm:w-14"
                  style={
                    party === p
                      ? { background: GOLD, color: CHARCOAL_TEXT, fontFamily: "var(--font-fraunces)" }
                      : { border: "1px solid rgba(255,255,255,0.22)", color: "rgba(239,232,219,0.85)", fontFamily: "var(--font-fraunces)" }
                  }
                >
                  {p}
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#efe8db]/45">Parties of 9 or more, please call us directly.</p>
          </fieldset>

          <div className="grid grid-cols-2 gap-5">
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-white/50">Date</span>
              <input name="date" type="date" required className={fieldCls} />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-wider text-white/50">Time</span>
              <select name="time" className={fieldCls} defaultValue="7:00 PM">
                {["12:00 PM", "1:00 PM", "2:00 PM", "5:30 PM", "6:30 PM", "7:00 PM", "8:00 PM", "9:00 PM"].map((t) => (
                  <option key={t} className="text-neutral-900">{t}</option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Restaurant</span>
            <input className={fieldCls} value={name} readOnly />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Your name</span>
            <input name="cust_name" required className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Email</span>
            <input name="email" type="email" required autoComplete="email" className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Phone</span>
            <input name="phone" type="tel" autoComplete="tel" className={fieldCls} />
          </label>
          <label className="block">
            <span className="text-xs uppercase tracking-wider text-white/50">Anything else?</span>
            <input name="notes" className={fieldCls} />
          </label>
          {/* honeypot */}
          <input type="text" name="company" tabIndex={-1} autoComplete="off" className="absolute left-[-9999px] h-0 w-0 opacity-0" aria-hidden />
          {TURNSTILE_SITE_KEY && <Turnstile siteKey={TURNSTILE_SITE_KEY} />}
          {status === "error" && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={status === "sending"}
            className="mt-2 block w-full py-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-[#efe8db] transition hover:opacity-90 disabled:opacity-60"
            style={{ background: EMBER }}
          >
            {status === "sending" ? "Sending…" : "Reserve a table"}
          </button>
        </form>
      )}
    </div>
  );
}
