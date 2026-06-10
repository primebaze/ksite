import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant, getMyFormSubmissions, type FormSubmission } from "@/lib/my-site";
import { markSubmission } from "./actions";

export const dynamic = "force-dynamic";

function replyHref(reply?: string | null): string | null {
  if (!reply) return null;
  if (reply.includes("@")) return `mailto:${reply}`;
  if (/\d{5,}/.test(reply)) return `tel:${reply.replace(/[^+\d]/g, "")}`;
  return null;
}

function timeAgo(iso: string): string {
  const d = new Date(iso);
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  if (s < 604800) return `${Math.floor(s / 86400)}d ago`;
  return d.toLocaleDateString(undefined, { day: "numeric", month: "short" });
}

export default async function InboxPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const { view } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const all = await getMyFormSubmissions();
  const tab = view === "archived" ? "archived" : view === "all" ? "all" : "new";
  const items = all.filter((s) =>
    tab === "archived" ? s.status === "archived" : tab === "all" ? s.status !== "archived" : s.status === "new",
  );
  const newCount = all.filter((s) => s.status === "new").length;

  const tabs: { key: string; label: string }[] = [
    { key: "new", label: `New${newCount ? ` (${newCount})` : ""}` },
    { key: "all", label: "All" },
    { key: "archived", label: "Archived" },
  ];

  return (
    <div className="max-w-3xl">
      <div className="mb-2 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400/80">Enquiries</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">Bookings &amp; messages</h1>
        </div>
        <Link href="/dashboard" className="text-sm text-white/55 hover:text-white">← Overview</Link>
      </div>
      <p className="max-w-xl text-sm leading-6 text-white/50">
        Every booking request and contact message from your site lands here (and is emailed to you). Reply, mark as
        read, or archive.
      </p>

      <div className="mt-6 flex gap-2">
        {tabs.map((t) => (
          <Link
            key={t.key}
            href={`/dashboard/inbox?view=${t.key}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              tab === t.key ? "bg-emerald-400 text-black" : "border border-white/10 text-white/60 hover:border-white/25"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      {items.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-white/12 bg-white/[0.02] px-6 py-12 text-center text-sm text-white/45">
          {tab === "new" ? "No new enquiries yet." : tab === "archived" ? "Nothing archived." : "No enquiries yet."}
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {items.map((s) => (
            <SubmissionCard key={s.id} s={s} />
          ))}
        </div>
      )}
    </div>
  );
}

function SubmissionCard({ s }: { s: FormSubmission }) {
  const lines = s.payload?.lines ?? [];
  const href = replyHref(s.reply_to);
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="flex items-center gap-2">
          <span
            className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide ${
              s.kind === "booking" ? "bg-emerald-400/15 text-emerald-300" : "bg-sky-400/15 text-sky-300"
            }`}
          >
            {s.kind === "booking" ? "Booking" : "Message"}
          </span>
          {s.status === "new" && <span className="h-2 w-2 rounded-full bg-emerald-400" title="New" />}
        </span>
        <span className="text-xs text-white/35">{timeAgo(s.created_at)}</span>
      </div>

      <dl className="mt-4 space-y-1.5 text-sm">
        {lines.map((l, i) => (
          <div key={i} className="flex gap-3">
            <dt className="w-28 shrink-0 text-white/40">{l.label}</dt>
            <dd className="text-white/85">{l.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        {href && (
          <a href={href} className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90">
            Reply
          </a>
        )}
        {s.status !== "read" && s.status !== "archived" && (
          <form action={markSubmission}>
            <input type="hidden" name="id" value={s.id} />
            <input type="hidden" name="status" value="read" />
            <button className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/80 transition hover:bg-white/5">Mark read</button>
          </form>
        )}
        {s.status !== "archived" ? (
          <form action={markSubmission}>
            <input type="hidden" name="id" value={s.id} />
            <input type="hidden" name="status" value="archived" />
            <button className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/55 transition hover:bg-white/5">Archive</button>
          </form>
        ) : (
          <form action={markSubmission}>
            <input type="hidden" name="id" value={s.id} />
            <input type="hidden" name="status" value="read" />
            <button className="rounded-lg border border-white/15 px-4 py-2 text-sm text-white/55 transition hover:bg-white/5">Restore</button>
          </form>
        )}
      </div>
    </div>
  );
}
