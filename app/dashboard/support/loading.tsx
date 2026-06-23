// Support — new-request panel + ticket list.
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-9 w-40 rounded-lg bg-ink/10" />
      <div className="mt-2 h-4 w-80 max-w-full rounded bg-ink/[0.07]" />
      <div className="mt-6 h-14 rounded-2xl border border-ink/[0.08] bg-ink/[0.02]" />
      <div className="mt-6 space-y-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] px-5 py-4">
            <div className="min-w-0 flex-1">
              <div className="h-4 w-48 max-w-[60%] rounded bg-ink/10" />
              <div className="mt-2 h-3 w-28 rounded bg-ink/[0.07]" />
            </div>
            <div className="h-6 w-16 shrink-0 rounded-full bg-ink/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}
