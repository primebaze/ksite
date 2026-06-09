import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenant } from "@/lib/my-site";
import { SITE_BASE } from "@/lib/marketing";
import { verticalFor } from "@/lib/verticals";
import { TemplateThumb } from "@/components/TemplateThumb";

export const dynamic = "force-dynamic";

export default async function DashboardHome({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>;
}) {
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
  const completed = checklist.filter((item) => item.done).length;

  return (
    <div className="mx-auto max-w-7xl">
      {welcome === "1" && live && (
        <div className="mb-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-4 text-emerald-100">
          <p className="font-semibold">Your site is live.</p>
          <p className="mt-1 text-sm text-emerald-100/70">
            It&apos;s online at{" "}
            <a href={url} target="_blank" rel="noreferrer" className="font-medium underline">{tenant.subdomain}.{SITE_BASE}</a>. Share it anywhere.
          </p>
        </div>
      )}

      <div className="flex flex-wrap items-start justify-between gap-5">
        <div>
          <p className="text-sm font-medium text-white/45">Welcome back</p>
          <h1 className="mt-1 text-4xl font-semibold tracking-tight">{tenant.business_name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-white/45">
            <span>{typeLabel} · {tenant.subdomain}.{SITE_BASE}</span>
            {planLabel && <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs font-semibold text-white/55">{planLabel} plan</span>}
          </div>
        </div>
        <div className="flex flex-wrap gap-3">
          <a href="/preview?edit=1" className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Edit site
          </a>
          <a href={live ? url : "/preview"} target={live ? "_blank" : undefined} rel={live ? "noreferrer" : undefined} className="rounded-xl border border-white/15 bg-white/[0.03] px-5 py-3 text-sm font-semibold text-white/85 transition hover:bg-white/[0.06]">
            {live ? "View live site" : "Preview site"}
          </a>
        </div>
      </div>

      <section className="mt-10 grid gap-6 xl:grid-cols-[1fr_0.72fr]">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_30px_100px_-60px_rgba(0,0,0,0.9)]">
          <div className="flex flex-wrap items-center justify-between gap-4 px-1 pb-4">
            <div>
              <h2 className="text-xl font-semibold">Launch checklist</h2>
              <p className="mt-1 text-sm text-white/45">{completed} of {checklist.length} complete</p>
            </div>
            <div className="h-2 w-36 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-emerald-400" style={{ width: `${(completed / checklist.length) * 100}%` }} />
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-white/10">
            {checklist.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center justify-between gap-4 border-b border-white/10 px-5 py-5 last:border-b-0 transition hover:bg-white/[0.04]"
              >
                <span className="flex items-center gap-4">
                  <span className={`grid h-7 w-7 place-items-center rounded-full border text-xs ${item.done ? "border-emerald-400 bg-emerald-400 text-black" : "border-white/20 text-white/25"}`}>
                    {item.done ? "✓" : ""}
                  </span>
                  <span className="font-medium text-white/85">{item.label}</span>
                </span>
                <span className="text-sm text-white/35">Open</span>
              </Link>
            ))}
          </div>
        </div>

        <aside className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_100px_-60px_rgba(0,0,0,0.9)]">
          <TemplateThumb src="/preview" aspect={0.56} />
          <div className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-semibold">{tenant.business_name}</h2>
                <a href={live ? url : "/preview"} target={live ? "_blank" : undefined} rel={live ? "noreferrer" : undefined} className="mt-1 block text-sm text-white/45 underline">
                  {tenant.subdomain}.{SITE_BASE}
                </a>
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-semibold ${live ? "bg-emerald-400/15 text-emerald-300" : "bg-white/10 text-white/50"}`}>
            {live ? "Live" : "Draft"}
          </span>
            </div>
            <div className="mt-5 grid gap-3">
              <Link href="/dashboard/domains" className="rounded-xl border border-white/15 px-4 py-3 text-center text-sm font-semibold text-white/85 transition hover:bg-white/[0.05]">
                Manage domain
              </Link>
              <a href="/preview?edit=1" className="rounded-xl bg-white px-4 py-3 text-center text-sm font-semibold text-black transition hover:bg-white/90">
                Edit live page
              </a>
            </div>
          </div>
        </aside>
      </section>

      <section className="mt-6 grid gap-4 lg:grid-cols-3">
        <Link href="/preview?edit=1" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-white/20">
          <p className="text-sm font-semibold text-white/35">Edit</p>
          <h2 className="mt-2 text-lg font-semibold">Edit your site, live</h2>
          <p className="mt-2 text-sm leading-6 text-white/45">Tap any text or photo right on the page and make it yours.</p>
        </Link>

        <Link href="/dashboard/edit" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-white/20">
          <p className="text-sm font-semibold text-white/35">Content</p>
          <h2 className="mt-2 text-lg font-semibold">Services, prices and details</h2>
          <p className="mt-2 text-sm leading-6 text-white/45">Keep contact details, menu items and copy up to date.</p>
        </Link>

        <Link href="/dashboard/domains" className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-0.5 hover:border-white/20">
          <p className="text-sm font-semibold text-white/35">Domains</p>
          <h2 className="mt-2 text-lg font-semibold">{tenant.custom_domain ?? "Claim your custom domain"}</h2>
          <p className="mt-2 text-sm leading-6 text-white/45">
            {tenant.custom_domain
              ? tenant.domain_status === "active"
                ? "Your custom domain is live."
                : "Your custom domain is finishing setup."
              : "Included with your plan, or connect one you already own."}
          </p>
        </Link>
      </section>

      {/* Publish (only before live) */}
      {!live && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="font-semibold">Publish your site</h2>
          <p className="mt-1 text-sm text-white/45">
            Subscribe to take it live on your subdomain. No setup fee, cancel anytime.
          </p>
          <Link href="/dashboard/publish" className="mt-4 inline-block rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
            Publish: choose a plan
          </Link>
        </div>
      )}

      {/* Next steps */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
        <h2 className="font-semibold">Recommended next steps</h2>
        <ul className="mt-3 grid gap-2 text-sm text-white/50 sm:grid-cols-3">
          <li>Add a strong hero photo.</li>
          <li>Keep your {verticalFor(tenant.preset)?.catalogLabel.toLowerCase() ?? "services"} and prices current.</li>
          <li>Share your link on Google, Instagram and WhatsApp.</li>
        </ul>
      </div>
    </div>
  );
}
