import type { Metadata } from "next";
import Link from "next/link";
import { VISIBLE_BUILDS, GROUP_PHOTOS, buildGroups, buildFor } from "@/lib/builds";
import { BUILD_DESIGN, GROUP_DESIGNS, TYPE_DESIGNS } from "@/lib/sample-site";
import { GetStartedFlow } from "@/components/GetStartedFlow";
import { startOnboarding } from "./actions";

const GROUPS = buildGroups();
const TURNSTILE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const BUILD_OPTIONS = VISIBLE_BUILDS.map((build) => ({
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
    <div className="mx-auto min-h-screen max-w-2xl px-5 pb-16 pt-7">
      <div className="mb-7 flex justify-center">
        <Link href="/" className="flex items-center gap-2" aria-label="Kovasite home">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white text-sm font-bold text-black">K</span>
          <span className="text-sm font-semibold tracking-tight">Kovasite</span>
        </Link>
      </div>
      <GetStartedFlow
        groups={GROUPS}
        builds={BUILD_OPTIONS}
        buildDesigns={BUILD_DESIGN}
        groupDesigns={GROUP_DESIGNS}
        groupPhotos={GROUP_PHOTOS}
        typeDesigns={TYPE_DESIGNS}
        turnstileKey={TURNSTILE_KEY}
        error={error}
        action={startOnboarding}
        preselect={preselect}
      />
    </div>
  );
}
