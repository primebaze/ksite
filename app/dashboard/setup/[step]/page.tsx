import Link from "next/link";
import { redirect } from "next/navigation";
import { getMyTenantFull } from "@/lib/my-site";
import { archetypeFor, catalogLabelFor, itemExamples, stepsFor, stepIndexIn, FIRST_STEP, type StepField } from "@/lib/verticals";
import { addMenuItem, clearCoverPhoto, removeMenuItem, saveStep, setSiteStyle } from "../actions";
import { SubmitButton } from "@/components/SubmitButton";
import { ImageUploader } from "@/components/ImageUploader";
import { StylePicker } from "@/components/StylePicker";
import type { TenantSite } from "@/lib/types";

export const dynamic = "force-dynamic";

const inputCls =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/25 outline-none focus:border-white/30";

function valueFor(f: StepField, site: TenantSite): string {
  const src =
    f.source === "tenant" ? site.tenant : f.source === "theme" ? site.theme : site.content;
  const v = (src as unknown as Record<string, unknown>)[f.name];
  if (Array.isArray(v)) return v.join(", ");
  return String(v ?? "");
}

export default async function SetupStep({ params }: { params: Promise<{ step: string }> }) {
  const { step: stepKey } = await params;

  const site = await getMyTenantFull();
  if (!site) redirect("/get-started");

  const catalogLabel = catalogLabelFor(site.tenant.preset);
  const steps = stepsFor(archetypeFor(site.tenant.preset), catalogLabel);
  const idx = stepIndexIn(steps, stepKey);
  if (idx === -1) redirect(`/dashboard/setup/${FIRST_STEP}`);
  const step = steps[idx];

  const prev = steps[idx - 1];
  const next = steps[idx + 1];
  const progress = Math.round(((idx + 1) / steps.length) * 100);

  return (
    <div className="mx-auto max-w-xl">
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>Step {idx + 1} of {steps.length}</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-emerald-400 transition-all" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <h1 className="text-3xl font-semibold tracking-tight">{step.title}</h1>
      <p className="mt-3 text-white/55">{step.intro}</p>

      {step.kind === "fields" && (
        <form action={saveStep} className="mt-8 space-y-6">
          <input type="hidden" name="__step" value={step.key} />
          {step.fields!.map((f) => {
            const v = valueFor(f, site);
            return (
              <div key={f.name}>
                <label className="text-sm font-medium">{f.label}</label>
                {f.help && <p className="mt-1 text-xs text-white/40">{f.help}</p>}
                {f.type === "color" ? (
                  <input name={f.name} type="color" defaultValue={v || "#111111"} className="mt-2 h-11 w-24 rounded-lg border border-white/10 bg-transparent" />
                ) : f.type === "select" ? (
                  <select name={f.name} defaultValue={v || f.options?.[0].value} className={inputCls}>
                    {f.options!.map((o) => (
                      <option key={o.value} value={o.value} className="bg-zinc-900">{o.label}</option>
                    ))}
                  </select>
                ) : f.multiline ? (
                  <textarea name={f.name} defaultValue={v} rows={4} placeholder={f.placeholder} className={inputCls} />
                ) : (
                  <input name={f.name} defaultValue={v} placeholder={f.placeholder} className={inputCls} />
                )}
              </div>
            );
          })}
          <NavButtons prevKey={prev?.key} nextLabel={next ? "Continue" : "Finish"} submit />
        </form>
      )}

      {step.kind === "design" && (
        <StylePicker presetKey={site.tenant.preset} current={site.content.style} action={setSiteStyle} />
      )}

      {step.kind === "menu" && (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-white/70">Your {catalogLabel.toLowerCase()}</h2>
          <div className="mt-3 space-y-2">
            {site.catalog.length === 0 && <p className="text-sm text-white/35">Nothing added yet — add your first item below.</p>}
            {site.catalog.map((it) => (
              <div key={it.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{it.name}{it.price ? ` · ${it.price}` : ""}</p>
                  {it.description && <p className="text-xs text-white/40">{it.description}</p>}
                </div>
                <form action={removeMenuItem}>
                  <input type="hidden" name="item_id" value={it.id} />
                  <button className="text-xs text-white/40 hover:text-red-300">Remove</button>
                </form>
              </div>
            ))}
          </div>

          <form action={addMenuItem} className="mt-4 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-4">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
              <input name="name" required placeholder={itemExamples(archetypeFor(site.tenant.preset)).name} className={`${inputCls} mt-0`} />
              <input name="price" placeholder={itemExamples(archetypeFor(site.tenant.preset)).price} className={`${inputCls} mt-0 sm:w-32`} />
            </div>
            <input name="description" placeholder="Short description (optional)" className={`${inputCls}`} />
            <input type="hidden" name="sort_order" value={site.catalog.length + 1} />
            <SubmitButton className="mt-3 rounded-lg border border-white/15 px-4 py-2 text-sm font-medium hover:bg-white/5" pendingText="Adding…">+ Add item</SubmitButton>
          </form>

          <NavButtons prevKey={prev?.key} nextKey={next?.key} nextLabel="Continue" />
        </div>
      )}

      {step.kind === "photos" && (
        <div className="mt-8 space-y-8">
          <div>
            <p className="text-sm font-medium">Cover photo</p>
            <p className="mt-1 text-xs text-white/40">A wide, real photo of your food, space or work — <span className="text-white/60">not your logo</span>. Leave blank for a clean branded cover.</p>
            <div className="mt-3">
              <ImageUploader field="hero" current={site.content.hero_image_url} label="Upload a cover photo" aspect="aspect-[16/9]" />
            </div>
            {site.content.hero_image_url && (
              <form action={clearCoverPhoto} className="mt-2">
                <button className="text-xs text-white/40 hover:text-red-300">Remove cover photo</button>
              </form>
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Logo (optional)</p>
            <p className="mt-1 text-xs text-white/40">Shown in the header. A square PNG with a transparent background works best.</p>
            <div className="mt-3 max-w-[160px]">
              <ImageUploader field="logo" current={site.theme.logo_url} label="Upload your logo" aspect="aspect-square" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Gallery (optional)</p>
            <p className="mt-1 text-xs text-white/40">A few photos of your work, space or team.</p>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {site.gallery.map((g) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={g.id} src={g.image_url} alt="" className="aspect-square w-full rounded-xl object-cover" />
              ))}
              <ImageUploader field="gallery" label="Add a photo" aspect="aspect-square" />
            </div>
          </div>
          <div>
            <p className="text-sm font-medium">Video hero</p>
            <p className="mt-1 text-xs text-white/40">A short looping video at the top — even more premium.</p>
            <div className="mt-3">
              <ImageUploader field="hero" locked label="Video hero" lockedNote="Available on the Premium plan." aspect="aspect-[16/9]" />
            </div>
          </div>
          <NavButtons prevKey={prev?.key} nextKey={next?.key} nextLabel="Continue" />
        </div>
      )}

      {step.kind === "review" && (
        <div className="mt-8">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-xs text-white/40">
              <span>Live preview</span>
              <a href="/preview" target="_blank" rel="noreferrer" className="text-emerald-400/90 hover:text-emerald-300">Open full screen ↗</a>
            </div>
            <iframe src="/preview" title="Site preview" className="h-[460px] w-full bg-white" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/dashboard/publish" className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">
              Looks good — publish
            </Link>
            <Link href={`/dashboard/setup/${FIRST_STEP}`} className="rounded-lg border border-white/15 px-5 py-3 text-sm text-white/80 hover:bg-white/5">
              Keep editing
            </Link>
          </div>
          {prev && (
            <div className="mt-6">
              <Link href={`/dashboard/setup/${prev.key}`} className="text-sm text-white/45 hover:text-white">← Back</Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function NavButtons({
  prevKey,
  nextKey,
  nextLabel,
  submit,
}: {
  prevKey?: string;
  nextKey?: string;
  nextLabel: string;
  submit?: boolean;
}) {
  return (
    <div className="flex items-center justify-between pt-2">
      {prevKey ? (
        <Link href={`/dashboard/setup/${prevKey}`} className="text-sm text-white/45 hover:text-white">← Back</Link>
      ) : (
        <Link href="/dashboard" className="text-sm text-white/45 hover:text-white">← Dashboard</Link>
      )}
      {submit ? (
        <SubmitButton className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90" pendingText="Saving…">{nextLabel} →</SubmitButton>
      ) : (
        <Link href={`/dashboard/setup/${nextKey}`} className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-white/90">{nextLabel} →</Link>
      )}
    </div>
  );
}
