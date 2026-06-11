import type { ReactNode } from "react";
import { PageHero } from "@/components/PageHero";
import { LEGAL } from "@/lib/legal";

// Shared shell + typography for legal pages, so Privacy / Terms / Cookies /
// Acceptable Use all read consistently on the dark marketing theme.
export function LegalLayout({ title, intro, children }: { title: string; intro?: string; children: ReactNode }) {
  return (
    <>
      <PageHero kicker="Legal" title={title}>
        {intro}
      </PageHero>
      <div className="mx-auto max-w-3xl px-6 py-16">
        <p className="mb-10 text-sm text-white/40">Last updated: {LEGAL.lastUpdated}</p>
        <div className="space-y-10">{children}</div>
      </div>
    </>
  );
}

export function LSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-semibold tracking-tight text-white">{heading}</h2>
      <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-white/65">{children}</div>
    </section>
  );
}

export function LP({ children }: { children: ReactNode }) {
  return <p>{children}</p>;
}

export function LUL({ children }: { children: ReactNode }) {
  return <ul className="ml-5 list-disc space-y-2 marker:text-white/30">{children}</ul>;
}
