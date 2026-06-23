import type { TenantSite } from "@/lib/types";
import { catalogLabelFor } from "@/lib/verticals";
import { ListEditor } from "./ListEditor";

// Dark, client-facing editor. Reused on the self-serve dashboard AND the staff
// console. Each form posts to a server action passed in via `actions`, so the
// same UI works for any data layer (client RLS session, or admin service role).
export interface EditorActions {
  saveBasics: (formData: FormData) => Promise<void>;
  saveContent: (formData: FormData) => Promise<void>;
  saveHours: (formData: FormData) => Promise<void>;
  saveSocials: (formData: FormData) => Promise<void>;
  saveReviews: (formData: FormData) => Promise<void>;
  saveOrderingLinks: (formData: FormData) => Promise<void>;
  catalogSave: (formData: FormData) => Promise<void>;
  catalogDelete: (formData: FormData) => Promise<void>;
  gallerySave: (formData: FormData) => Promise<void>;
  galleryDelete: (formData: FormData) => Promise<void>;
  teamSave: (formData: FormData) => Promise<void>;
  teamDelete: (formData: FormData) => Promise<void>;
}

const card = "rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 sm:p-7";
const input =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 text-sm text-white placeholder-white/25 outline-none transition focus:border-white/25 focus:bg-white/[0.05]";
const fieldLabel = "mb-1.5 block text-[13px] font-medium text-white/55";
const primaryBtn = "rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-white/90";
const ghostBtn = "rounded-xl border border-white/[0.12] px-3.5 py-2 text-sm font-medium text-white/75 transition hover:bg-white/[0.06]";
const delBtn = "rounded-xl border border-red-400/25 px-3.5 py-2 text-sm font-medium text-red-300 transition hover:bg-red-400/10";

function Card({ id, title, desc, children }: { id?: string; title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section id={id} className={`${card} scroll-mt-24`}>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {desc && <p className="mt-1 text-sm text-white/40">{desc}</p>}
      </div>
      {children}
    </section>
  );
}

function Field({ label, span, children }: { label: string; span?: boolean; children: React.ReactNode }) {
  return (
    <div className={span ? "sm:col-span-2" : undefined}>
      <label className={fieldLabel}>{label}</label>
      {children}
    </div>
  );
}

function Chevron() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="size-4 shrink-0 text-white/30 transition group-open:rotate-90" aria-hidden>
      <path d="M7.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// A collapsible item cell: scannable summary row that expands to the edit form.
function Disclosure({ summary, defaultOpen, children }: { summary: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }) {
  return (
    <details
      open={defaultOpen}
      className="group overflow-hidden rounded-xl border border-white/[0.08] bg-white/[0.02] transition open:border-white/15 open:bg-white/[0.035]"
    >
      <summary className="flex cursor-pointer list-none select-none items-center gap-3 px-4 py-3.5 [&::-webkit-details-marker]:hidden">
        {summary}
        <Chevron />
      </summary>
      <div className="border-t border-white/[0.08] p-4 sm:p-5">{children}</div>
    </details>
  );
}

function Dot({ on }: { on: boolean }) {
  return <span className={`size-2 shrink-0 rounded-full ${on ? "bg-emerald-400" : "bg-white/20"}`} aria-hidden />;
}

export function SiteEditor({ site, actions }: { site: TenantSite; actions: EditorActions }) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const id = tenant.id;
  const catalogLabel = catalogLabelFor(tenant.preset);

  return (
    <div className="space-y-6">
      {/* Branding */}
      <Card id="branding" title="Branding" desc="Your name, colours and overall look.">
        <form action={actions.saveBasics} className="space-y-5">
          <input type="hidden" name="id" value={id} />
          <Field label="Business name">
            <input name="business_name" defaultValue={tenant.business_name} className={input} />
          </Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Primary colour">
              <input name="primary_color" type="color" defaultValue={theme.primary_color} className="h-11 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent" />
            </Field>
            <Field label="Accent colour">
              <input name="accent_color" type="color" defaultValue={theme.accent_color} className="h-11 w-full cursor-pointer rounded-xl border border-white/10 bg-transparent" />
            </Field>
            <Field label="Font">
              <select name="font" defaultValue={theme.font ?? "sans-serif"} className={`${input} [&>option]:bg-neutral-900`}>
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
              </select>
            </Field>
          </div>
          <Field label="Design style">
            <select name="style" defaultValue={content.style ?? "classic"} className={`${input} [&>option]:bg-neutral-900`}>
              <option value="classic">Classic — balanced &amp; timeless</option>
              <option value="editorial">Editorial — elegant, magazine</option>
              <option value="bold">Bold — big &amp; high-energy</option>
              <option value="minimal">Minimal — clean &amp; calm</option>
              <option value="warm">Warm — soft &amp; welcoming</option>
              <option value="luxe">Luxe — dark &amp; premium</option>
            </select>
            <p className="mt-1.5 text-xs text-white/35">Changes the whole layout &amp; hero. Preview it with “Edit site”.</p>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="SEO title"><input name="meta_title" defaultValue={tenant.meta_title ?? ""} className={input} /></Field>
            <Field label="SEO description"><input name="meta_description" defaultValue={tenant.meta_description ?? ""} className={input} /></Field>
          </div>
          <div className="flex justify-end pt-1"><button className={primaryBtn}>Save branding</button></div>
        </form>
      </Card>

      {/* Content */}
      <Card id="content" title="Content" desc="The main copy and contact details shown on your site.">
        <form action={actions.saveContent} className="space-y-5">
          <input type="hidden" name="id" value={id} />
          <Field label="Tagline"><input name="tagline" defaultValue={content.tagline ?? ""} className={input} /></Field>
          <Field label="About"><textarea name="about" defaultValue={content.about ?? ""} rows={3} className={input} /></Field>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Phone"><input name="phone" defaultValue={content.phone ?? ""} className={input} /></Field>
            <Field label="Email"><input name="email" defaultValue={content.email ?? ""} className={input} /></Field>
            <Field label="Address"><input name="address" defaultValue={content.address ?? ""} className={input} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Reservation URL"><input name="reservation_url" defaultValue={content.reservation_url ?? ""} className={input} /></Field>
            <Field label="Booking URL"><input name="booking_url" defaultValue={content.booking_url ?? ""} className={input} /></Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Button label"><input name="cta_label" defaultValue={content.cta_label ?? ""} className={input} /></Field>
            <Field label="Button URL"><input name="cta_url" defaultValue={content.cta_url ?? ""} className={input} /></Field>
          </div>
          <div className="flex justify-end pt-1"><button className={primaryBtn}>Save content</button></div>
        </form>
      </Card>

      {/* Hours & links */}
      <Card id="hours" title="Hours &amp; links" desc="Opening hours, social profiles and ordering links. Clear a row and save to remove it.">
        <div className="space-y-7">
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/70">Opening hours</h3>
            <ListEditor tenantId={id} action={actions.saveHours} addLabel="+ Add hours row"
              columns={[{ name: "day", label: "Day (e.g. Mon–Fri)" }, { name: "open", label: "Hours (e.g. 12:00–22:00)" }]}
              initial={(content.hours ?? []).map((h) => ({ day: h.day ?? "", open: h.open ?? "" }))} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/70">Social links</h3>
            <ListEditor tenantId={id} action={actions.saveSocials} addLabel="+ Add social link"
              columns={[{ name: "label", label: "Label (e.g. Instagram)" }, { name: "url", label: "URL (https://…)" }]}
              initial={(content.socials ?? []).map((s) => ({ label: s.label ?? "", url: s.url ?? "" }))} />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-medium text-white/70">Ordering &amp; delivery links</h3>
            <ListEditor tenantId={id} action={actions.saveOrderingLinks} addLabel="+ Add link"
              columns={[{ name: "label", label: "Label (e.g. Order on Deliveroo)" }, { name: "url", label: "URL (https://…)" }]}
              initial={(content.ordering_links ?? []).map((o) => ({ label: o.label ?? "", url: o.url ?? "" }))} />
          </div>
          <div>
            <h3 className="mb-1 text-sm font-medium text-white/70">Reviews</h3>
            <p className="mb-3 text-xs text-white/40">Real customer reviews. Leave empty to hide the reviews section on your site.</p>
            <ListEditor tenantId={id} action={actions.saveReviews} addLabel="+ Add review"
              columns={[{ name: "quote", label: "What they said" }, { name: "name", label: "Name" }, { name: "meta", label: "e.g. Passed first time" }]}
              initial={(content.reviews ?? []).map((r) => ({ quote: r.quote ?? "", name: r.name ?? "", meta: r.meta ?? "" }))} />
          </div>
        </div>
      </Card>

      {/* Catalog */}
      <Card id="catalog" title={catalogLabel} desc={`Add, edit and remove your ${catalogLabel.toLowerCase()}. Tap an item to edit it.`}>
        <div className="space-y-2.5">
          {catalog.map((it) => (
            <Disclosure
              key={it.id}
              summary={
                <>
                  <Dot on={it.is_available} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-white">{it.name || "Untitled item"}</span>
                    <span className="block truncate text-xs text-white/40">{[it.section, it.category].filter(Boolean).join(" · ") || "No section"}</span>
                  </span>
                  {it.price && <span className="shrink-0 text-sm text-white/55">{it.price}</span>}
                </>
              }
            >
              <form action={actions.catalogSave} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="item_id" value={it.id} />
                <Field label="Name"><input name="name" defaultValue={it.name} className={input} /></Field>
                <Field label="Price"><input name="price" defaultValue={it.price ?? ""} placeholder="e.g. £12 or from £45" className={input} /></Field>
                <Field label="Section"><input name="section" defaultValue={it.section ?? ""} placeholder="e.g. Dinner" className={input} /></Field>
                <Field label="Category"><input name="category" defaultValue={it.category ?? ""} placeholder="e.g. Starters" className={input} /></Field>
                <Field label="Description" span><textarea name="description" defaultValue={it.description ?? ""} rows={2} className={input} /></Field>
                <Field label="Sort order"><input name="sort_order" type="number" defaultValue={it.sort_order} className={input} /></Field>
                <div className="flex items-center sm:pt-7">
                  <label className="inline-flex items-center gap-2 text-sm text-white/70"><input type="checkbox" name="is_available" defaultChecked={it.is_available} className="size-4 accent-emerald-400" /> Available</label>
                </div>
                <div className="flex items-center justify-between gap-2 sm:col-span-2">
                  <button formAction={actions.catalogDelete} className={delBtn}>Delete</button>
                  <button className={primaryBtn}>Save</button>
                </div>
              </form>
            </Disclosure>
          ))}

          <Disclosure
            summary={<span className="flex-1 text-sm font-medium text-emerald-300/90">+ Add {catalogLabel.toLowerCase().replace(/s$/, "")}</span>}
          >
            <form action={actions.catalogSave} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={id} />
              <Field label="Name"><input name="name" required className={input} /></Field>
              <Field label="Price"><input name="price" placeholder="e.g. £12" className={input} /></Field>
              <Field label="Section"><input name="section" className={input} /></Field>
              <Field label="Category"><input name="category" className={input} /></Field>
              <Field label="Description" span><textarea name="description" rows={2} className={input} /></Field>
              <Field label="Sort order"><input name="sort_order" type="number" defaultValue={catalog.length + 1} className={input} /></Field>
              <div className="flex items-center sm:pt-7">
                <label className="inline-flex items-center gap-2 text-sm text-white/70"><input type="checkbox" name="is_available" defaultChecked className="size-4 accent-emerald-400" /> Available</label>
              </div>
              <div className="flex justify-end sm:col-span-2"><button className={primaryBtn}>Add item</button></div>
            </form>
          </Disclosure>
        </div>
      </Card>

      {/* Gallery */}
      <Card id="gallery" title="Gallery" desc="Photos shown on your site. Tap an image to edit it.">
        <div className="space-y-2.5">
          {gallery.map((g) => (
            <Disclosure
              key={g.id}
              summary={
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.image_url} alt="" className="size-10 shrink-0 rounded-lg border border-white/10 object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-medium text-white">{g.caption || "Untitled photo"}</span>
                    <span className="block truncate text-xs text-white/35">{g.image_url}</span>
                  </span>
                </>
              }
            >
              <form action={actions.gallerySave} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="item_id" value={g.id} />
                <Field label="Image URL" span><input name="image_url" defaultValue={g.image_url} className={input} /></Field>
                <Field label="Caption"><input name="caption" defaultValue={g.caption ?? ""} className={input} /></Field>
                <Field label="Sort order"><input name="sort_order" type="number" defaultValue={g.sort_order} className={input} /></Field>
                <div className="flex items-center justify-between gap-2 sm:col-span-2">
                  <button formAction={actions.galleryDelete} className={delBtn}>Delete</button>
                  <button className={primaryBtn}>Save</button>
                </div>
              </form>
            </Disclosure>
          ))}
          <Disclosure summary={<span className="flex-1 text-sm font-medium text-emerald-300/90">+ Add photo</span>}>
            <form action={actions.gallerySave} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={id} />
              <Field label="Image URL" span><input name="image_url" required className={input} /></Field>
              <Field label="Caption"><input name="caption" className={input} /></Field>
              <Field label="Sort order"><input name="sort_order" type="number" defaultValue={gallery.length + 1} className={input} /></Field>
              <div className="flex justify-end sm:col-span-2"><button className={primaryBtn}>Add photo</button></div>
            </form>
          </Disclosure>
        </div>
      </Card>

      {/* Team */}
      <Card id="team" title="Team" desc="Most useful for salons and clinics; optional otherwise.">
        <div className="space-y-2.5">
          {team.map((m) => (
            <Disclosure
              key={m.id}
              summary={
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-medium text-white">{m.name || "Unnamed"}</span>
                  <span className="block truncate text-xs text-white/40">{[m.role, m.credentials].filter(Boolean).join(" · ") || "No role"}</span>
                </span>
              }
            >
              <form action={actions.teamSave} className="grid gap-4 sm:grid-cols-2">
                <input type="hidden" name="id" value={id} />
                <input type="hidden" name="item_id" value={m.id} />
                <Field label="Name"><input name="name" defaultValue={m.name} className={input} /></Field>
                <Field label="Role"><input name="role" defaultValue={m.role ?? ""} className={input} /></Field>
                <Field label="Credentials"><input name="credentials" defaultValue={m.credentials ?? ""} className={input} /></Field>
                <Field label="Photo URL"><input name="photo_url" defaultValue={m.photo_url ?? ""} className={input} /></Field>
                <Field label="Sort order"><input name="sort_order" type="number" defaultValue={m.sort_order} className={input} /></Field>
                <div className="flex items-center justify-between gap-2 sm:col-span-2">
                  <button formAction={actions.teamDelete} className={delBtn}>Delete</button>
                  <button className={primaryBtn}>Save</button>
                </div>
              </form>
            </Disclosure>
          ))}
          <Disclosure summary={<span className="flex-1 text-sm font-medium text-emerald-300/90">+ Add team member</span>}>
            <form action={actions.teamSave} className="grid gap-4 sm:grid-cols-2">
              <input type="hidden" name="id" value={id} />
              <Field label="Name"><input name="name" required className={input} /></Field>
              <Field label="Role"><input name="role" className={input} /></Field>
              <Field label="Credentials"><input name="credentials" className={input} /></Field>
              <Field label="Photo URL"><input name="photo_url" className={input} /></Field>
              <Field label="Sort order"><input name="sort_order" type="number" defaultValue={team.length + 1} className={input} /></Field>
              <div className="flex justify-end sm:col-span-2"><button className={primaryBtn}>Add member</button></div>
            </form>
          </Disclosure>
        </div>
      </Card>
    </div>
  );
}
