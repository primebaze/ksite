import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { SITE_BASE } from "@/lib/marketing";
import { verticalFor } from "@/lib/verticals";
import { TemplateThumb } from "@/components/TemplateThumb";

export const dynamic = "force-dynamic";

type IconKey = "edit" | "content" | "inbox" | "domains" | "billing" | "support";
const ICONS: Record<IconKey, React.ReactNode> = {
  edit: <path d="M4 20h4l10-10a2.83 2.83 0 10-4-4L4 16v4z" />,
  content: <path d="M4 6h16M4 12h16M4 18h10" />,
  inbox: <path d="M4 5h16v12H7l-3 3V5z" />,
  domains: <path d="M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" />,
  billing: <path d="M3 7h18v10H3zM3 11h18" />,
  support: <path d="M12 19a7 7 0 100-14 7 7 0 000 14zM9.5 9.5a2.5 2.5 0 113.5 2.3c-.8.4-1 .8-1 1.7M12 16.5h.01" />,
};
function Icon({ name }: { name: IconKey }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className="size-5">
      {ICONS[name]}
    </svg>
  );
}

export default async function DashboardHome({ searchParams }: { searchParams: Promise<{ welcome?: string }> }) {
  const { welcome } = await searchParams;
  const tenant = await getMyTenant();
  if (!tenant) redirect("/get-started");

  const live = tenant.published || tenant.plan_status === "active";
  const url = `https://${tenant.subdomain}.${SITE_BASE}`;
  const typeLabel = verticalFor(tenant.preset)?.label ?? tenant.preset;
  const checklist = [
    { label: "Site published", done: live, href: live ? url : "/dashboard/publish" },
    { label: "Personalise your design", done: true, href: "/preview?edit=1" },
    { label: "Add content and photos", done: true, href: "/dashboard/edit" },
    { label: "Connect your own domain", done: tenant.domain_status === "active", href: "/dashboard/domains" },
  ];
  const completed = checklist.filter((i) => i.done).length;
  const pct = Math.round((completed / checklist.length) * 100);

  const actions: { href: string; icon: IconKey; title: string; desc: string }[] = [
    { href: "/preview?edit=1", icon: "edit", title: "Edit site", desc: "Tap any text or photo on the page." },
    { href: "/dashboard/edit", icon: "content", title: "Content & menu", desc: "Services, prices and details." },
    { href: "/dashboard/inbox", icon: "inbox", title: "Enquiries", desc: "Bookings and messages." },
    { href: "/dashboard/domains", icon: "domains", title: "Domains", desc: tenant.custom_domain ?? "Claim a custom domain." },
    { href: "/dashboard/billing", icon: "billing", title: "Billing", desc: live ? "Manage your subscription." : "Plans & invoices." },
    { href: "/dashboard/support", icon: "support", title: "Support", desc: "We're here to help." },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {(tenant.kyc_status === "requested" || tenant.kyc_status === "rejected") && (
        <Link href="/dashboard/verify" className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-700 dark:text-amber-100 transition hover:bg-amber-400/15">
          <span>
            <span className="font-semibold">Verification needed</span>
            <span className="mt-0.5 block text-sm text-amber-700/80 dark:text-amber-100/70">
              {tenant.kyc_status === "rejected" ? "Your details need a small change — please resubmit." : "Confirm your business details to keep your account active."}
            </span>
          </span>
          <span className="shrink-0 rounded-lg bg-amber-300 px-3 py-1.5 text-sm font-semibold text-neutral-950">Verify →</span>
        </Link>
      )}
      {welcome === "1" && live && (
        <div className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-accent">
          <p className="font-semibold">Your site is live.</p>
          <p className="mt-1 text-sm text-accent/70">
            Online at <a href={url} target="_blank" rel="noreferrer" className="font-medium underline">{tenant.subdomain}.{SITE_BASE}</a>. Share it anywhere.
          </p>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-ink/[0.03] p-7 shadow-[0_24px_70px_-44px_rgba(0,0,0,0.95)] sm:p-9">
        {/* Even top sheen + a single, contained emerald glow kept out of the text */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/25 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-24 size-56 rounded-full bg-emerald-500/20 blur-[90px]" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${live ? "bg-emerald-400/15 text-accent ring-emerald-400/25" : "bg-ink/10 text-ink/60 ring-ink/10"}`}>
                <span className={`size-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-ink/40"}`} />
                {live ? "Live" : "Draft"}
              </span>
              {live && <span className="rounded-full bg-ink/[0.06] px-2.5 py-1 text-xs font-medium text-ink/55 ring-1 ring-inset ring-ink/10">Subscription active</span>}
            </div>
            <p className="mt-4 text-sm font-medium text-ink/45">Welcome back</p>
            <h1 className="mt-1 truncate text-4xl font-semibold tracking-tight sm:text-5xl">{tenant.business_name}</h1>
            <p className="mt-2 text-sm text-ink/45">{typeLabel} · {tenant.subdomain}.{SITE_BASE}</p>
          </div>
        </div>
        <div className="relative mt-7 flex flex-wrap gap-3">
          <a href="/preview?edit=1" className="rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90">Edit site</a>
          <a href={live ? url : "/preview"} target={live ? "_blank" : undefined} rel={live ? "noreferrer" : undefined} className="rounded-xl border border-ink/15 bg-ink/[0.03] px-5 py-3 text-sm font-semibold text-ink/85 transition hover:bg-ink/[0.06]">
            {live ? "View live site" : "Preview site"}
          </a>
        </div>
      </section>

      {/* Checklist + preview */}
      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-[1.75rem] border border-ink/[0.08] bg-ink/[0.02] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Launch checklist</h2>
              <p className="mt-0.5 text-sm text-ink/45">{completed} of {checklist.length} complete</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-28 overflow-hidden rounded-full bg-ink/10">
                <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-semibold text-ink/60">{pct}%</span>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {checklist.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between gap-4 rounded-2xl border border-ink/[0.06] bg-ink/[0.02] px-4 py-3.5 transition hover:border-ink/15 hover:bg-ink/[0.04]">
                <span className="flex items-center gap-3.5">
                  <span className={`grid size-6 place-items-center rounded-full border text-[11px] ${item.done ? "border-emerald-400 bg-emerald-400 text-neutral-950" : "border-ink/20 text-ink/25"}`}>{item.done ? "✓" : ""}</span>
                  <span className="text-sm font-medium text-ink/85">{item.label}</span>
                </span>
                <span className="text-ink/25">›</span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="overflow-hidden rounded-[1.75rem] border border-ink/[0.08] bg-ink/[0.02]">
          <div className="relative">
            <TemplateThumb src="/preview" aspect={0.62} />
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${live ? "bg-emerald-400/20 text-accent" : "bg-paper/40 text-ink/70"}`}>
              {live ? "Live" : "Draft"}
            </span>
          </div>
          <div className="p-5">
            <h2 className="truncate text-base font-semibold">{tenant.business_name}</h2>
            <a href={live ? url : "/preview"} target={live ? "_blank" : undefined} rel={live ? "noreferrer" : undefined} className="mt-0.5 block truncate text-sm text-ink/45 hover:text-ink/70">
              {tenant.subdomain}.{SITE_BASE}
            </a>
            <a href="/preview?edit=1" className="mt-4 block rounded-xl bg-ink px-4 py-2.5 text-center text-sm font-semibold text-paper transition hover:bg-ink/90">Open editor</a>
          </div>
        </aside>
      </section>

      {/* Quick actions */}
      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="group rounded-2xl border border-ink/[0.08] bg-ink/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-ink/20 hover:bg-ink/[0.04]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-ink/[0.06] text-ink/80 transition group-hover:bg-emerald-400/15 group-hover:text-accent">
              <Icon name={a.icon} />
            </div>
            <h3 className="mt-4 font-semibold">{a.title}</h3>
            <p className="mt-1 truncate text-sm text-ink/45">{a.desc}</p>
          </Link>
        ))}
      </section>

      {!live && (
        <section className="mt-5 overflow-hidden rounded-[1.75rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-7">
          <h2 className="text-lg font-semibold">Take your site live</h2>
          <p className="mt-1 max-w-md text-sm text-ink/55">Subscribe to publish on your subdomain. No setup fee, cancel anytime.</p>
          <Link href="/dashboard/publish" className="mt-4 inline-block rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90">Choose a plan</Link>
        </section>
      )}
    </div>
  );
}
