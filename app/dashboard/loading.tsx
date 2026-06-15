// Instant feedback on navigation. Every dashboard page reads live data
// (force-dynamic), so without a loading boundary a click sits on the old page
// until the server responds and feels broken. This prefetched skeleton shows
// immediately while the real page streams in. Sidebar + tab bar (in the layout)
// stay interactive.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl animate-pulse" aria-busy="true" aria-label="Loading">
      {/* Hero block */}
      <div className="rounded-[2rem] border border-ink/10 bg-ink/[0.03] p-7 sm:p-9">
        <div className="h-6 w-24 rounded-full bg-ink/10" />
        <div className="mt-6 h-4 w-28 rounded bg-ink/[0.07]" />
        <div className="mt-3 h-10 w-72 max-w-[80%] rounded-lg bg-ink/10" />
        <div className="mt-3 h-4 w-56 max-w-[60%] rounded bg-ink/[0.07]" />
        <div className="mt-7 flex gap-3">
          <div className="h-11 w-28 rounded-xl bg-ink/10" />
          <div className="h-11 w-32 rounded-xl bg-ink/[0.07]" />
        </div>
      </div>

      {/* Two-column section */}
      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-[1.75rem] border border-ink/[0.08] bg-ink/[0.02] p-6">
          <div className="h-5 w-40 rounded bg-ink/10" />
          <div className="mt-5 space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 rounded-2xl border border-ink/[0.06] bg-ink/[0.02]" />
            ))}
          </div>
        </div>
        <div className="h-72 rounded-[1.75rem] border border-ink/[0.08] bg-ink/[0.02]" />
      </div>

      {/* Card grid */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-5">
            <div className="h-10 w-10 rounded-xl bg-ink/10" />
            <div className="mt-4 h-4 w-28 rounded bg-ink/10" />
            <div className="mt-2 h-3 w-36 max-w-full rounded bg-ink/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}
