// The "Edit site" link and post-onboarding landing both hit this route, which
// renders the full site (force-dynamic) — easily the heaviest click in the
// dashboard. Without a boundary the click sits on the old page and feels dead.
// A light branded state shows instantly while the site streams in.
export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-paper text-ink">
      <div className="flex flex-col items-center gap-4" aria-busy="true" aria-label="Loading your site">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-ink text-base font-bold text-paper">K</span>
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-ink/20 border-t-ink/70" />
        <p className="text-sm text-ink/45">Loading your site…</p>
      </div>
    </div>
  );
}
