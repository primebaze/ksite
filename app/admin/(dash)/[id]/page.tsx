import Link from "next/link";
import { notFound } from "next/navigation";
import { getTenantFull } from "@/lib/admin";
import { SITE_BASE } from "@/lib/marketing";
import { VERTICALS, verticalFor } from "@/lib/verticals";
import { SiteEditor, type EditorActions } from "@/components/SiteEditor";
import {
  catalogDelete,
  catalogSave,
  galleryDelete,
  gallerySave,
  saveBasics,
  saveContent,
  saveContentRaw,
  saveHours,
  saveOrderingLinks,
  saveSettings,
  saveSocials,
  teamDelete,
  teamSave,
  togglePublish,
} from "./actions";

export const dynamic = "force-dynamic";

const card = "rounded-2xl border border-white/10 bg-white/[0.03] p-6";
const input =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 [&>option]:bg-neutral-900";
const label = "text-xs text-white/40";
const btn = "rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-black transition hover:bg-emerald-400";

// Shared editor uses the staff (service-role) actions so any tenant is editable.
const editorActions: EditorActions = {
  saveBasics,
  saveContent,
  saveHours,
  saveSocials,
  saveOrderingLinks,
  catalogSave,
  catalogDelete,
  gallerySave,
  galleryDelete,
  teamSave,
  teamDelete,
};

// Group verticals for the preset picker (150+ entries).
const PRESET_GROUPS = VERTICALS.reduce<Record<string, { key: string; label: string }[]>>((acc, v) => {
  (acc[v.group] ??= []).push({ key: v.key, label: v.label });
  return acc;
}, {});

function Badge({ tone, children }: { tone: "green" | "amber" | "red" | "neutral"; children: React.ReactNode }) {
  const tones = {
    green: "bg-emerald-400/15 text-emerald-300",
    amber: "bg-amber-400/15 text-amber-300",
    red: "bg-red-400/15 text-red-300",
    neutral: "bg-white/10 text-white/60",
  };
  return <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>{children}</span>;
}

const PLAN_TONE: Record<string, "green" | "amber" | "red" | "neutral"> = {
  active: "green",
  trialing: "green",
  past_due: "amber",
  suspended: "red",
  canceled: "red",
};
const DOMAIN_TONE: Record<string, "green" | "amber" | "red" | "neutral"> = {
  active: "green",
  error: "red",
  pending: "amber",
  registering: "amber",
  verifying: "amber",
};

export default async function EditTenant({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { id } = await params;
  const { error } = await searchParams;
  const site = await getTenantFull(id);
  if (!site) notFound();
  const { tenant, content } = site;

  const proto = SITE_BASE.includes("localhost") ? "http" : "https";
  const liveHost = tenant.custom_domain ?? `${tenant.subdomain}.${SITE_BASE}`;
  const liveUrl = tenant.custom_domain ? `https://${tenant.custom_domain}` : `${proto}://${tenant.subdomain}.${SITE_BASE}`;
  const verticalLabel = verticalFor(tenant.preset)?.label ?? tenant.preset;

  return (
    <div className="space-y-6">
      <Link href="/admin" className="text-sm text-white/45 hover:text-white">← Clients</Link>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-semibold">{tenant.business_name}</h1>
          <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white/45">
            <span className="uppercase tracking-wide">{verticalLabel}</span>
            <span>·</span>
            <a href={liveUrl} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">{liveHost} ↗</a>
          </p>
        </div>
        <form action={togglePublish}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="publish" value={(!tenant.published).toString()} />
          <button className={tenant.published ? "rounded-lg border border-white/15 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/5" : btn}>
            {tenant.published ? "Unpublish" : "Publish"}
          </button>
        </form>
      </div>

      {/* Status */}
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={tenant.published ? "green" : "neutral"}>{tenant.published ? "Published" : "Draft"}</Badge>
        <Badge tone={PLAN_TONE[tenant.plan_status] ?? "neutral"}>
          {tenant.plan ? `${tenant.plan} · ` : ""}{tenant.plan_status}
        </Badge>
        <Badge tone={DOMAIN_TONE[tenant.domain_status] ?? "neutral"}>
          domain: {tenant.domain_status}
        </Badge>
      </div>

      {error && <p className="rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">{error}</p>}

      {/* Staff-only settings */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Settings &amp; status <span className="ml-1 align-middle text-xs font-normal text-white/35">staff only</span></h2>
        <p className="mt-0.5 text-sm text-white/45">Plan, vertical, domain and the bespoke design override. Clients can&apos;t change these.</p>
        <form action={saveSettings} className="mt-5 space-y-4">
          <input type="hidden" name="id" value={id} />
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Business type (preset)</label>
              <select name="preset" defaultValue={tenant.preset} className={input}>
                {Object.entries(PRESET_GROUPS).map(([group, items]) => (
                  <optgroup key={group} label={group}>
                    {items.map((it) => (
                      <option key={it.key} value={it.key}>{it.label}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Plan</label>
              <select name="plan" defaultValue={tenant.plan ?? ""} className={input}>
                <option value="">None</option>
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
              </select>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>Custom domain</label>
              <input name="custom_domain" defaultValue={tenant.custom_domain ?? ""} placeholder="example.com" className={input} />
            </div>
            <div>
              <label className={label}>Design override (bespoke key)</label>
              <input name="design" defaultValue={content.design ?? ""} placeholder="e.g. ember (overrides style)" className={input} />
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={label}>OG image URL</label>
              <input name="og_image_url" defaultValue={tenant.og_image_url ?? ""} className={input} />
            </div>
            <div>
              <label className={label}>Analytics ID</label>
              <input name="analytics_id" defaultValue={tenant.analytics_id ?? ""} className={input} />
            </div>
          </div>
          <div className="flex flex-wrap gap-5">
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" name="booking_enabled" defaultChecked={content.booking_enabled !== false} /> Booking form enabled
            </label>
            <label className="flex items-center gap-2 text-sm text-white/70">
              <input type="checkbox" name="contact_form_enabled" defaultChecked={content.contact_form_enabled !== false} /> Contact form enabled
            </label>
          </div>
          <button className={btn}>Save settings</button>
        </form>
      </section>

      {/* Full content editor — same component the client dashboard uses */}
      <SiteEditor site={site} actions={editorActions} />

      {/* Advanced raw JSON */}
      <section className={card}>
        <h2 className="text-lg font-semibold">Advanced: full content JSON</h2>
        <p className="mt-0.5 text-sm text-white/45">Direct edit of the whole content blob (hours, links, variants, anything not above). Replaces it entirely.</p>
        <form action={saveContentRaw} className="mt-4">
          <input type="hidden" name="id" value={id} />
          <textarea name="content_json" rows={12} defaultValue={JSON.stringify(content, null, 2)} className={`${input} font-mono text-xs`} />
          <button className={`${btn} mt-3`}>Save JSON</button>
        </form>
      </section>
    </div>
  );
}
