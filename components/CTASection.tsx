import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";

export function CTASection() {
  return (
    <section className="border-t border-ink/5">
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <Reveal>
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ready to get online?</h2>
          <p className="mt-4 text-ink/55">Tell us about your business and we&apos;ll get you live on your own custom domain in about 5 minutes.</p>
          <Link href="/get-started" className="mt-8 inline-block rounded-lg bg-ink px-6 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90">
            Get your site
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
