"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { PLAN, gbp } from "@/lib/marketing";

// One plan, billed monthly or yearly (yearly takes 10% off). A small segmented
// toggle switches the headline price; the feature list is the same either way.
export function PricingPlan() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="mx-auto max-w-md">
      {/* Billing toggle */}
      <div className="mx-auto flex w-fit items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm">
        {([["monthly", "Monthly"], ["yearly", "Yearly"]] as const).map(([key, label]) => {
          const active = (key === "yearly") === yearly;
          return (
            <button
              key={key}
              type="button"
              onClick={() => setYearly(key === "yearly")}
              className={`relative rounded-full px-4 py-1.5 font-medium transition ${active ? "text-black" : "text-white/60 hover:text-white"}`}
            >
              {active && <motion.span layoutId="billing-pill" className="absolute inset-0 -z-10 rounded-full bg-white" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              {label}
              {key === "yearly" && (
                <span className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-semibold ${active ? "bg-emerald-500/15 text-emerald-700" : "bg-emerald-400/15 text-emerald-300"}`}>
                  −{PLAN.yearlyDiscountPct}%
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div className="mt-8 rounded-3xl border border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.07] to-transparent p-8 shadow-[0_40px_120px_-50px_rgba(16,185,129,0.6)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Everything included</h3>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-emerald-300">One simple plan</span>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight">{gbp(yearly ? PLAN.yearlyPerMonth : PLAN.monthly)}</span>
          <span className="pb-1.5 text-white/45">/month</span>
        </div>
        <p className="mt-2 h-5 text-sm text-white/45">
          {yearly ? `Billed ${gbp(PLAN.yearlyTotal)} a year — save ${gbp(PLAN.yearlySaving)}` : "Billed monthly · cancel anytime"}
        </p>

        <Link
          href="/get-started"
          className="mt-6 block rounded-xl bg-white py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90"
        >
          Get your site
        </Link>

        <ul className="mt-8 space-y-3 text-sm text-white/75">
          {PLAN.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-xs text-white/35">No setup fee · No contract · Cancel anytime</p>
    </div>
  );
}
