// Enquiries — a list of booking/message rows.
export default function Loading() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse" aria-busy="true" aria-label="Loading">
      <div className="h-4 w-24 rounded bg-ink/[0.07]" />
      <div className="mt-2 h-9 w-64 max-w-[80%] rounded-lg bg-ink/10" />
      <div className="mt-8 space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/[0.08] bg-ink/[0.02] px-5 py-5">
            <div className="min-w-0 flex-1">
              <div className="h-4 w-40 max-w-[60%] rounded bg-ink/10" />
              <div className="mt-2 h-3 w-64 max-w-[85%] rounded bg-ink/[0.07]" />
            </div>
            <div className="h-6 w-16 shrink-0 rounded-full bg-ink/[0.07]" />
          </div>
        ))}
      </div>
    </div>
  );
}
