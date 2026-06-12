// Instant feedback on navigation. Every admin page is dynamic (live DB reads),
// so without a loading boundary a click sits on the old page until the server
// responds and feels dead. This skeleton is prefetched and shown immediately.
export default function Loading() {
  return (
    <div className="animate-pulse" aria-busy="true" aria-label="Loading">
      {/* Heading */}
      <div className="h-8 w-56 rounded-lg bg-ink/10" />
      <div className="mt-3 h-4 w-80 max-w-full rounded bg-ink/[0.07]" />

      {/* Stat cards */}
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-ink/10 bg-ink/[0.03] p-5">
            <div className="h-7 w-10 rounded bg-ink/10" />
            <div className="mt-3 h-3 w-16 rounded bg-ink/[0.07]" />
          </div>
        ))}
      </div>

      {/* List rows */}
      <div className="mt-9 h-5 w-32 rounded bg-ink/10" />
      <div className="mt-4 space-y-px overflow-hidden rounded-2xl border border-ink/10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 bg-ink/[0.02] px-5 py-5">
            <div className="h-10 w-10 shrink-0 rounded-full bg-ink/10" />
            <div className="min-w-0 flex-1">
              <div className="h-4 w-40 max-w-[60%] rounded bg-ink/10" />
              <div className="mt-2 h-3 w-64 max-w-[80%] rounded bg-ink/[0.07]" />
            </div>
            <div className="h-8 w-20 shrink-0 rounded-lg bg-ink/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}
