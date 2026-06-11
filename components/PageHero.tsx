import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";

// Consistent hero for every marketing subpage.
export function PageHero({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-ink/5">
      <div className="mx-auto max-w-5xl px-6 pb-12 pt-24 sm:pt-28">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent/80">{kicker}</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
        </Reveal>
        {children && (
          <Reveal delay={0.12}>
            <p className="mt-5 max-w-2xl text-lg text-ink/55">{children}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
