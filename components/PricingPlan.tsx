"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { PLAN, gbp } from "@/lib/marketing";

// One plan, billed monthly or yearly (yearly gives 2 months free). A small
// segmented toggle switches the headline price; the features are the same.
//
// The active "pill" slides between the two buttons using a CSS transition over
// a position measured from the active button (the buttons differ in width), so
// the toggle needs no motion runtime.
export function PricingPlan() {
  const [yearly, setYearly] = useState(false);
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const yearlyRef = useRef<HTMLButtonElement>(null);
  const [pill, setPill] = useState<{ left: number; width: number }>({ left: 0, width: 0 });

  useEffect(() => {
    const measure = () => {
      const btn = (yearly ? yearlyRef : monthlyRef).current;
      if (btn) setPill({ left: btn.offsetLeft, width: btn.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [yearly]);

  return (
    <div className="mx-auto max-w-md">
      {/* Billing toggle */}
      <div className="relative mx-auto flex w-fit items-center gap-1 rounded-full border border-ink/10 bg-ink/[0.03] p-1 text-sm">
        {/* Sliding active pill (measured from the active button) */}
        <span
          aria-hidden
          className="absolute top-1 bottom-1 rounded-full bg-ink transition-all duration-300 ease-out"
          style={{ left: pill.left, width: pill.width, opacity: pill.width ? 1 : 0 }}
        />
        {([["monthly", "Monthly", monthlyRef], ["yearly", "Yearly", yearlyRef]] as const).map(([key, label, ref]) => {
          const active = (key === "yearly") === yearly;
          return (
            <button
              ref={ref}
              key={key}
              type="button"
              onClick={() => setYearly(key === "yearly")}
              className={`relative z-10 rounded-full px-4 py-1.5 font-medium transition-colors ${active ? "text-paper" : "text-ink/60 hover:text-ink"}`}
            >
              <span className="relative flex items-center">
                {label}
                {key === "yearly" && (
                  <span className="ml-1.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold text-neutral-950">2 months free</span>
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* Card */}
      <div className="mt-8 rounded-3xl border border-emerald-400/30 bg-gradient-to-b from-emerald-400/[0.07] to-transparent p-8 shadow-[0_40px_120px_-50px_rgba(16,185,129,0.6)]">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Everything included</h3>
          <span className="rounded-full bg-emerald-400/15 px-3 py-1 text-xs font-semibold text-accent">One simple plan</span>
        </div>

        <div className="mt-6 flex items-end gap-2">
          <span className="text-5xl font-bold tracking-tight">{gbp(yearly ? PLAN.yearlyPerMonth : PLAN.monthly)}</span>
          <span className="pb-1.5 text-ink/45">/month</span>
        </div>
        <p className="mt-2 h-5 text-sm text-ink/45">
          {yearly ? `Billed ${gbp(PLAN.yearlyTotal)} a year — save ${gbp(PLAN.yearlySaving)}` : "Billed monthly · cancel anytime"}
        </p>

        <Link
          href="/get-started"
          className="mt-6 block rounded-xl bg-ink py-3 text-center text-sm font-semibold text-paper transition hover:bg-ink/90"
        >
          Get your site
        </Link>

        <ul className="mt-8 space-y-3 text-sm text-ink/75">
          {PLAN.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12.5l4.5 4.5L19 7" />
              </svg>
              {f}
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-5 text-center text-xs text-ink/35">No setup fee · No contract · Cancel anytime</p>
    </div>
  );
}
