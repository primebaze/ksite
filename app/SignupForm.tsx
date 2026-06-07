"use client";

import { useActionState } from "react";
import { submitSignup, type SignupState } from "./actions";

const initial: SignupState = { ok: false, error: null };
const field =
  "w-full rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";

export default function SignupForm() {
  const [state, action, pending] = useActionState(submitSignup, initial);

  if (state.ok) {
    return (
      <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-400/15 text-emerald-300">
          ✓
        </div>
        <h3 className="mt-4 text-lg font-semibold text-white">Thanks — we&apos;ll be in touch.</h3>
        <p className="mt-1 text-sm text-white/50">
          We&apos;ll email you within one working day to get your site started.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="grid gap-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="name" placeholder="Your name" className={field} required />
        <input name="email" type="email" placeholder="Email" className={field} required />
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <input name="business_name" placeholder="Business name" className={field} />
        <select name="business_type" className={field} defaultValue="">
          <option value="" disabled className="bg-zinc-900">
            Type of business
          </option>
          <option value="restaurant" className="bg-zinc-900">Restaurant / café</option>
          <option value="trades" className="bg-zinc-900">Trade (plumber, electrician…)</option>
          <option value="salon" className="bg-zinc-900">Salon / beauty</option>
          <option value="other" className="bg-zinc-900">Something else</option>
        </select>
      </div>
      <textarea name="message" rows={3} placeholder="Anything we should know? (optional)" className={field} />

      {state.error && <p className="text-sm text-red-400">{state.error}</p>}

      <button
        disabled={pending}
        className="mt-1 rounded-lg bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
      >
        {pending ? "Sending…" : "Get started"}
      </button>
      <p className="text-center text-xs text-white/30">No setup fee · No contract · Live in days</p>
    </form>
  );
}
