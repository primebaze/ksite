import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BUILDS, buildGroups } from "@/lib/builds";
import { GetStartedFlow } from "@/components/GetStartedFlow";
import { startOnboarding } from "./actions";

const GROUPS = buildGroups();
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const BUILD_OPTIONS = BUILDS.map((build) => ({
  key: build.key,
  label: build.label,
  group: build.group,
  style: build.style,
}));

export const metadata: Metadata = { title: "Get started — Kovasite" };

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <>
      <PageHero kicker="Get started" title="Create your site in minutes.">
        Choose the kind of website you want first, then pick a matching design. You&apos;ll edit it on-screen, revise until it feels right,
        then publish it to your own domain.
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <GetStartedFlow
            groups={GROUPS}
            builds={BUILD_OPTIONS}
            turnstileKey={TURNSTILE_KEY}
            error={error}
            action={startOnboarding}
          />
        </Reveal>
      </section>
    </>
  );
}
