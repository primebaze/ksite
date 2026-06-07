import type { TenantSite } from "@/lib/types";
import { catalogLabelFor } from "@/lib/verticals";

// Dark, client-facing editor. Reused on the self-serve dashboard. Each form
// posts to a server action passed in via `actions`, so the same UI works for
// any data layer (here: the client's RLS-scoped session).
export interface EditorActions {
  saveBasics: (formData: FormData) => Promise<void>;
  saveContent: (formData: FormData) => Promise<void>;
  saveContentRaw: (formData: FormData) => Promise<void>;
  catalogSave: (formData: FormData) => Promise<void>;
  catalogDelete: (formData: FormData) => Promise<void>;
  gallerySave: (formData: FormData) => Promise<void>;
  galleryDelete: (formData: FormData) => Promise<void>;
  teamSave: (formData: FormData) => Promise<void>;
  teamDelete: (formData: FormData) => Promise<void>;
}

const input =
  "mt-1 w-full rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30";
const label = "text-xs text-white/40";
const card = "rounded-2xl border border-white/10 bg-white/[0.02] p-6";
const btn = "rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90";
const smBtn = "rounded-lg border border-white/15 px-3 py-1.5 text-sm text-white/80 transition hover:bg-white/5";
const delBtn = "rounded-lg border border-red-400/30 px-3 py-1.5 text-sm text-red-300 transition hover:bg-red-400/10";

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className={card}>
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      {desc && <p className="mt-0.5 text-sm text-white/45">{desc}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export function SiteEditor({ site, actions }: { site: TenantSite; actions: EditorActions }) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const id = tenant.id;
  const catalogLabel = catalogLabelFor(tenant.preset);

  return (
    <div className="space-y-6">
      {/* Basics & branding */}
      <Card title="Basics & branding">
        <form action={actions.saveBasics} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <div>
            <label className={label}>Business name</label>
            <input name="business_name" defaultValue={tenant.business_name} className={input} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={label}>Primary colour</label>
              <input name="primary_color" type="color" defaultValue={theme.primary_color} className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-transparent" />
            </div>
            <div>
              <label className={label}>Accent colour</label>
              <input name="accent_color" type="color" defaultValue={theme.accent_color} className="mt-1 h-10 w-full rounded-lg border border-white/10 bg-transparent" />
            </div>
            <div>
              <label className={label}>Font</label>
              <select name="font" defaultValue={theme.font ?? "sans-serif"} className={input}>
                <option value="sans-serif" className="bg-zinc-900">Sans-serif</option>
                <option value="serif" className="bg-zinc-900">Serif</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={label}>SEO title</label><input name="meta_title" defaultValue={tenant.meta_title ?? ""} className={input} /></div>
            <div><label className={label}>SEO description</label><input name="meta_description" defaultValue={tenant.meta_description ?? ""} className={input} /></div>
          </div>
          <button className={btn}>Save</button>
        </form>
      </Card>

      {/* Content */}
      <Card title="Content" desc="The main copy and contact details on your site.">
        <form action={actions.saveContent} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <div><label className={label}>Tagline</label><input name="tagline" defaultValue={content.tagline ?? ""} className={input} /></div>
          <div><label className={label}>About</label><textarea name="about" defaultValue={content.about ?? ""} rows={3} className={input} /></div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className={label}>Phone</label><input name="phone" defaultValue={content.phone ?? ""} className={input} /></div>
            <div><label className={label}>Email</label><input name="email" defaultValue={content.email ?? ""} className={input} /></div>
            <div><label className={label}>Address</label><input name="address" defaultValue={content.address ?? ""} className={input} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={label}>Reservation URL</label><input name="reservation_url" defaultValue={content.reservation_url ?? ""} className={input} /></div>
            <div><label className={label}>Booking URL</label><input name="booking_url" defaultValue={content.booking_url ?? ""} className={input} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={label}>CTA label</label><input name="cta_label" defaultValue={content.cta_label ?? ""} className={input} /></div>
            <div><label className={label}>CTA URL</label><input name="cta_url" defaultValue={content.cta_url ?? ""} className={input} /></div>
          </div>
          <button className={btn}>Save content</button>
        </form>
      </Card>

      {/* Catalog */}
      <Card title={catalogLabel} desc={`Add, edit and remove your ${catalogLabel.toLowerCase()} items.`}>
        <div className="space-y-3">
          {catalog.map((it) => (
            <form key={it.id} action={actions.catalogSave} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-white/10 p-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="item_id" value={it.id} />
              <div className="col-span-2"><label className={label}>Section</label><input name="section" defaultValue={it.section ?? ""} className={input} /></div>
              <div className="col-span-2"><label className={label}>Category</label><input name="category" defaultValue={it.category ?? ""} className={input} /></div>
              <div className="col-span-2"><label className={label}>Name</label><input name="name" defaultValue={it.name} className={input} /></div>
              <div className="col-span-3"><label className={label}>Description</label><input name="description" defaultValue={it.description ?? ""} className={input} /></div>
              <div className="col-span-1"><label className={label}>Price</label><input name="price" defaultValue={it.price ?? ""} className={input} /></div>
              <div className="col-span-1"><label className={label}>Order</label><input name="sort_order" type="number" defaultValue={it.sort_order} className={input} /></div>
              <label className="col-span-1 flex items-center gap-1 text-xs text-white/60"><input type="checkbox" name="is_available" defaultChecked={it.is_available} /> On</label>
              <div className="col-span-12 flex gap-2">
                <button className={smBtn}>Save</button>
                <button formAction={actions.catalogDelete} className={delBtn}>Delete</button>
              </div>
            </form>
          ))}
          <form action={actions.catalogSave} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3">
            <input type="hidden" name="id" value={id} />
            <div className="col-span-2"><label className={label}>Section</label><input name="section" className={input} /></div>
            <div className="col-span-2"><label className={label}>Category</label><input name="category" className={input} /></div>
            <div className="col-span-2"><label className={label}>Name</label><input name="name" required className={input} /></div>
            <div className="col-span-3"><label className={label}>Description</label><input name="description" className={input} /></div>
            <div className="col-span-1"><label className={label}>Price</label><input name="price" className={input} /></div>
            <div className="col-span-1"><label className={label}>Order</label><input name="sort_order" type="number" defaultValue={catalog.length + 1} className={input} /></div>
            <label className="col-span-1 flex items-center gap-1 text-xs text-white/60"><input type="checkbox" name="is_available" defaultChecked /> On</label>
            <div className="col-span-12"><button className={btn}>+ Add</button></div>
          </form>
        </div>
      </Card>

      {/* Gallery */}
      <Card title="Gallery">
        <div className="space-y-3">
          {gallery.map((g) => (
            <form key={g.id} action={actions.gallerySave} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-white/10 p-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="item_id" value={g.id} />
              <div className="col-span-6"><label className={label}>Image URL</label><input name="image_url" defaultValue={g.image_url} className={input} /></div>
              <div className="col-span-4"><label className={label}>Caption</label><input name="caption" defaultValue={g.caption ?? ""} className={input} /></div>
              <div className="col-span-1"><label className={label}>Order</label><input name="sort_order" type="number" defaultValue={g.sort_order} className={input} /></div>
              <div className="col-span-12 flex gap-2">
                <button className={smBtn}>Save</button>
                <button formAction={actions.galleryDelete} className={delBtn}>Delete</button>
              </div>
            </form>
          ))}
          <form action={actions.gallerySave} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3">
            <input type="hidden" name="id" value={id} />
            <div className="col-span-6"><label className={label}>Image URL</label><input name="image_url" required className={input} /></div>
            <div className="col-span-4"><label className={label}>Caption</label><input name="caption" className={input} /></div>
            <div className="col-span-1"><label className={label}>Order</label><input name="sort_order" type="number" defaultValue={gallery.length + 1} className={input} /></div>
            <div className="col-span-12"><button className={btn}>+ Add</button></div>
          </form>
        </div>
      </Card>

      {/* Team */}
      <Card title="Team" desc="Most useful for salons; optional otherwise.">
        <div className="space-y-3">
          {team.map((m) => (
            <form key={m.id} action={actions.teamSave} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-white/10 p-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="item_id" value={m.id} />
              <div className="col-span-3"><label className={label}>Name</label><input name="name" defaultValue={m.name} className={input} /></div>
              <div className="col-span-3"><label className={label}>Role</label><input name="role" defaultValue={m.role ?? ""} className={input} /></div>
              <div className="col-span-3"><label className={label}>Credentials</label><input name="credentials" defaultValue={m.credentials ?? ""} className={input} /></div>
              <div className="col-span-2"><label className={label}>Photo URL</label><input name="photo_url" defaultValue={m.photo_url ?? ""} className={input} /></div>
              <div className="col-span-1"><label className={label}>Order</label><input name="sort_order" type="number" defaultValue={m.sort_order} className={input} /></div>
              <div className="col-span-12 flex gap-2">
                <button className={smBtn}>Save</button>
                <button formAction={actions.teamDelete} className={delBtn}>Delete</button>
              </div>
            </form>
          ))}
          <form action={actions.teamSave} className="grid grid-cols-12 items-end gap-2 rounded-xl border border-dashed border-white/15 bg-white/[0.02] p-3">
            <input type="hidden" name="id" value={id} />
            <div className="col-span-3"><label className={label}>Name</label><input name="name" required className={input} /></div>
            <div className="col-span-3"><label className={label}>Role</label><input name="role" className={input} /></div>
            <div className="col-span-3"><label className={label}>Credentials</label><input name="credentials" className={input} /></div>
            <div className="col-span-2"><label className={label}>Photo URL</label><input name="photo_url" className={input} /></div>
            <div className="col-span-1"><label className={label}>Order</label><input name="sort_order" type="number" defaultValue={team.length + 1} className={input} /></div>
            <div className="col-span-12"><button className={btn}>+ Add</button></div>
          </form>
        </div>
      </Card>

      {/* Advanced */}
      <Card title="Advanced: full content JSON" desc="For fields not above (hours, ordering links, service areas, socials). Replaces the whole content blob.">
        <form action={actions.saveContentRaw}>
          <input type="hidden" name="id" value={id} />
          <textarea name="content_json" rows={10} defaultValue={JSON.stringify(content, null, 2)} className={`${input} font-mono text-xs`} />
          <button className={`${btn} mt-3`}>Save JSON</button>
        </form>
      </Card>
    </div>
  );
}
