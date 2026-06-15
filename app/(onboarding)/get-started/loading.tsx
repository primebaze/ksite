// "Get your site" / "Get started" is the homepage's primary CTA. The page does
// no DB work, but it ships a large interactive flow (GetStartedFlow), so the
// click can sit on the old page while that bundle loads. This prefetched
// skeleton — mirroring the page's logo + step card — shows instantly.
export default function Loading() {
  return (
    <div className="mx-auto min-h-screen max-w-2xl px-5 pb-16 pt-7">
      <div className="mb-7 flex justify-center">
        <span className="flex items-center gap-2">
          <span className="grid h-7 w-7 place-items-center rounded-md bg-white text-sm font-bold text-black">K</span>
          <span className="text-sm font-semibold tracking-tight">Kovasite</span>
        </span>
      </div>

      <div className="animate-pulse" aria-busy="true" aria-label="Loading">
        {/* Step pills */}
        <div className="mx-auto mb-8 flex max-w-sm justify-center gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-8 w-24 rounded-full bg-ink/10" />
          ))}
        </div>
        {/* Card */}
        <div className="rounded-3xl border border-ink/10 bg-ink/[0.02] p-7">
          <div className="h-6 w-56 max-w-[70%] rounded bg-ink/10" />
          <div className="mt-3 h-4 w-72 max-w-[85%] rounded bg-ink/[0.07]" />
          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl border border-ink/10 bg-ink/[0.02]" />
            ))}
          </div>
          <div className="mt-7 h-11 w-40 rounded-xl bg-ink/10" />
        </div>
      </div>
    </div>
  );
}
