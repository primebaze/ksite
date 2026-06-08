import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { BUILDS, buildGroups, buildFor } from "@/lib/builds";
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

export const metadata: Metadata = { title: "Get started · Kovasite" };

export default async function GetStartedPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; build?: string; style?: string }>;
}) {
  const { error, build, style } = await searchParams;
  // Came from a sample's "Build mine": the design is already chosen, so skip
  // straight to the account step with it pre-selected.
  const preselect = build && buildFor(build) ? { key: build, style } : undefined;

  return (
    <>
      <PageHero kicker="Get started" title={preselect ? "You're almost there." : "Create your site in minutes."}>
        {preselect
          ? "Your design is picked. Create your account and we'll open it in the on-screen editor so you can make it yours."
          : "Choose the kind of website you want first, then pick a matching design. You'll edit it on-screen, revise until it feels right, then publish it to your own domain."}
      </PageHero>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <GetStartedFlow
            groups={GROUPS}
            builds={BUILD_OPTIONS}
            turnstileKey={TURNSTILE_KEY}
            error={error}
            action={startOnboarding}
            preselect={preselect}
          />
        </Reveal>
      </section>
    </>
  );
}
