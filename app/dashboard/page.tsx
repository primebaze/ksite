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
  const planLabel = tenant.plan ? tenant.plan[0].toUpperCase() + tenant.plan.slice(1) : null;
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
    { href: "/dashboard/billing", icon: "billing", title: "Billing", desc: planLabel ? `${planLabel} plan` : "Manage subscription." },
    { href: "/dashboard/support", icon: "support", title: "Support", desc: "We're here to help." },
  ];

  return (
    <div className="mx-auto max-w-6xl">
      {(tenant.kyc_status === "requested" || tenant.kyc_status === "rejected") && (
        <Link href="/dashboard/verify" className="mb-5 flex items-center justify-between gap-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-5 py-4 text-amber-100 transition hover:bg-amber-400/15">
          <span>
            <span className="font-semibold">Verification needed</span>
            <span className="mt-0.5 block text-sm text-amber-100/70">
              {tenant.kyc_status === "rejected" ? "Your details need a small change — please resubmit." : "Confirm your business details to keep your account active."}
            </span>
          </span>
          <span className="shrink-0 rounded-lg bg-amber-300 px-3 py-1.5 text-sm font-semibold text-black">Verify →</span>
        </Link>
      )}
      {welcome === "1" && live && (
        <div className="mb-5 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-emerald-100">
          <p className="font-semibold">Your site is live.</p>
          <p className="mt-1 text-sm text-emerald-100/70">
            Online at <a href={url} target="_blank" rel="noreferrer" className="font-medium underline">{tenant.subdomain}.{SITE_BASE}</a>. Share it anywhere.
          </p>
        </div>
      )}

      {/* Hero */}
      <section className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-gradient-to-br from-white/[0.07] via-white/[0.03] to-transparent p-7 sm:p-9">
        <div className="pointer-events-none absolute -right-24 -top-24 size-64 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="relative flex flex-wrap items-start justify-between gap-6">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${live ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/60"}`}>
                <span className={`size-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-white/40"}`} />
                {live ? "Live" : "Draft"}
              </span>
              {planLabel && <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/55">{planLabel} plan</span>}
            </div>
            <p className="mt-4 text-sm font-medium text-white/45">Welcome back</p>
            <h1 className="mt-1 truncate text-4xl font-semibold tracking-tight sm:text-5xl">{tenant.business_name}</h1>
            <p className="mt-2 text-sm text-white/45">{typeLabel} · {tenant.subdomain}.{SITE_BASE}</p>
          </div>
        </div>
        <div className="relative mt-7 flex flex-wrap gap-3">
          <a href="/preview?edit=1" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">Edit site</a>
          <a href={live ? url : "/preview"} target={live ? "_blank" : undefined} rel={live ? "noreferrer" : undefined} className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/[0.06]">
            {live ? "View live site" : "Preview site"}
          </a>
        </div>
      </section>

      {/* Checklist + preview */}
      <section className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.7fr]">
        <div className="rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Launch checklist</h2>
              <p className="mt-0.5 text-sm text-white/45">{completed} of {checklist.length} complete</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-2 w-28 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-sm font-semibold text-white/60">{pct}%</span>
            </div>
          </div>
          <div className="mt-5 space-y-2">
            {checklist.map((item) => (
              <Link key={item.label} href={item.href} className="flex items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition hover:border-white/15 hover:bg-white/[0.04]">
                <span className="flex items-center gap-3.5">
                  <span className={`grid size-6 place-items-center rounded-full border text-[11px] ${item.done ? "border-emerald-400 bg-emerald-400 text-black" : "border-white/20 text-white/25"}`}>{item.done ? "✓" : ""}</span>
                  <span className="text-sm font-medium text-white/85">{item.label}</span>
                </span>
                <span className="text-white/25">›</span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.02]">
          <div className="relative">
            <TemplateThumb src="/preview" aspect={0.62} />
            <span className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur ${live ? "bg-emerald-400/20 text-emerald-200" : "bg-black/40 text-white/70"}`}>
              {live ? "Live" : "Draft"}
            </span>
          </div>
          <div className="p-5">
            <h2 className="truncate text-base font-semibold">{tenant.business_name}</h2>
            <a href={live ? url : "/preview"} target={live ? "_blank" : undefined} rel={live ? "noreferrer" : undefined} className="mt-0.5 block truncate text-sm text-white/45 hover:text-white/70">
              {tenant.subdomain}.{SITE_BASE}
            </a>
            <a href="/preview?edit=1" className="mt-4 block rounded-xl bg-white px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-white/90">Open editor</a>
          </div>
        </aside>
      </section>

      {/* Quick actions */}
      <section className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="group rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.04]">
            <div className="flex size-10 items-center justify-center rounded-xl bg-white/[0.06] text-white/80 transition group-hover:bg-emerald-400/15 group-hover:text-emerald-300">
              <Icon name={a.icon} />
            </div>
            <h3 className="mt-4 font-semibold">{a.title}</h3>
            <p className="mt-1 truncate text-sm text-white/45">{a.desc}</p>
          </Link>
        ))}
      </section>

      {!live && (
        <section className="mt-5 overflow-hidden rounded-[1.75rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-transparent p-7">
          <h2 className="text-lg font-semibold">Take your site live</h2>
          <p className="mt-1 max-w-md text-sm text-white/55">Subscribe to publish on your subdomain. No setup fee, cancel anytime.</p>
          <Link href="/dashboard/publish" className="mt-4 inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">Choose a plan</Link>
        </section>
      )}
    </div>
  );
}
