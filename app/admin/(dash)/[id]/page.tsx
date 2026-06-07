import Link from "next/link";
import { notFound } from "next/navigation";
import { getTenantFull } from "@/lib/admin";
import { catalogLabelFor } from "@/lib/verticals";
import {
  catalogDelete,
  catalogSave,
  galleryDelete,
  gallerySave,
  saveBasics,
  saveContentFields,
  saveContentRaw,
  teamDelete,
  teamSave,
  togglePublish,
} from "./actions";

export const dynamic = "force-dynamic";

const input = "mt-1 w-full rounded-md border border-stone-300 px-3 py-2 text-sm";
const card = "rounded-xl border border-stone-200 bg-white p-6";
const btn = "rounded-md bg-stone-900 px-4 py-2 text-sm font-medium text-white";

function Card({ title, desc, children }: { title: string; desc?: string; children: React.ReactNode }) {
  return (
    <section className={`${card} mt-6`}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {desc && <p className="mt-0.5 text-sm text-stone-500">{desc}</p>}
      <div className="mt-4">{children}</div>
    </section>
  );
}

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
  const { tenant, theme, content, catalog, gallery, team } = site;
  const catalogLabel = catalogLabelFor(tenant.preset);

  return (
    <div>
      <Link href="/admin" className="text-sm text-stone-500 hover:underline">← Clients</Link>

      {/* Header */}
      <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">{tenant.business_name}</h1>
          <p className="text-sm text-stone-500">
            <span className="uppercase tracking-wide">{tenant.preset}</span> ·{" "}
            <a href={`http://${tenant.subdomain}.localhost:3000`} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
              {tenant.subdomain}.localhost:3000 ↗
            </a>
          </p>
        </div>
        <form action={togglePublish}>
          <input type="hidden" name="id" value={id} />
          <input type="hidden" name="publish" value={(!tenant.published).toString()} />
          <button className={tenant.published ? "rounded-md border border-stone-300 px-4 py-2 text-sm" : btn}>
            {tenant.published ? "Unpublish" : "Publish"}
          </button>
        </form>
      </div>

      {error && <p className="mt-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}

      {/* Basics & branding */}
      <Card title="Basics & branding">
        <form action={saveBasics} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <div>
            <label className="text-sm font-medium">Business name</label>
            <input name="business_name" defaultValue={tenant.business_name} className={input} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Primary colour</label>
              <input name="primary_color" type="color" defaultValue={theme.primary_color} className="mt-1 h-10 w-full rounded-md border border-stone-300" />
            </div>
            <div>
              <label className="text-sm font-medium">Accent colour</label>
              <input name="accent_color" type="color" defaultValue={theme.accent_color} className="mt-1 h-10 w-full rounded-md border border-stone-300" />
            </div>
            <div>
              <label className="text-sm font-medium">Font</label>
              <select name="font" defaultValue={theme.font ?? "sans-serif"} className={input}>
                <option value="sans-serif">Sans-serif</option>
                <option value="serif">Serif</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Custom domain</label>
            <input name="custom_domain" defaultValue={tenant.custom_domain ?? ""} placeholder="example.com" className={input} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">SEO title</label>
              <input name="meta_title" defaultValue={tenant.meta_title ?? ""} className={input} />
            </div>
            <div>
              <label className="text-sm font-medium">OG image URL</label>
              <input name="og_image_url" defaultValue={tenant.og_image_url ?? ""} className={input} />
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">SEO description</label>
            <input name="meta_description" defaultValue={tenant.meta_description ?? ""} className={input} />
          </div>
          <button className={btn}>Save</button>
        </form>
      </Card>

      {/* Content */}
      <Card title="Content" desc="The main copy and contact details shown on the site.">
        <form action={saveContentFields} className="space-y-4">
          <input type="hidden" name="id" value={id} />
          <div>
            <label className="text-sm font-medium">Tagline</label>
            <input name="tagline" defaultValue={content.tagline ?? ""} className={input} />
          </div>
          <div>
            <label className="text-sm font-medium">About</label>
            <textarea name="about" defaultValue={content.about ?? ""} rows={3} className={input} />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div><label className="text-sm font-medium">Phone</label><input name="phone" defaultValue={content.phone ?? ""} className={input} /></div>
            <div><label className="text-sm font-medium">Email</label><input name="email" defaultValue={content.email ?? ""} className={input} /></div>
            <div><label className="text-sm font-medium">Address</label><input name="address" defaultValue={content.address ?? ""} className={input} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium">Reservation URL</label><input name="reservation_url" defaultValue={content.reservation_url ?? ""} className={input} /></div>
            <div><label className="text-sm font-medium">Booking URL</label><input name="booking_url" defaultValue={content.booking_url ?? ""} className={input} /></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium">CTA label</label><input name="cta_label" defaultValue={content.cta_label ?? ""} className={input} /></div>
            <div><label className="text-sm font-medium">CTA URL</label><input name="cta_url" defaultValue={content.cta_url ?? ""} className={input} /></div>
          </div>
          <button className={btn}>Save content</button>
        </form>
      </Card>

      {/* Catalog (menu / services / treatments) */}
      <Card title={catalogLabel} desc={`The ${catalogLabel.toLowerCase()} items shown on the site. Edit price/availability inline.`}>
        <div className="space-y-3">
          {catalog.map((it) => (
            <form key={it.id} action={catalogSave} className="grid grid-cols-12 items-end gap-2 rounded-lg border border-stone-200 p-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="item_id" value={it.id} />
              <div className="col-span-2"><label className="text-xs text-stone-500">Section</label><input name="section" defaultValue={it.section ?? ""} className={input} /></div>
              <div className="col-span-2"><label className="text-xs text-stone-500">Category</label><input name="category" defaultValue={it.category ?? ""} className={input} /></div>
              <div className="col-span-2"><label className="text-xs text-stone-500">Name</label><input name="name" defaultValue={it.name} className={input} /></div>
              <div className="col-span-3"><label className="text-xs text-stone-500">Description</label><input name="description" defaultValue={it.description ?? ""} className={input} /></div>
              <div className="col-span-1"><label className="text-xs text-stone-500">Price</label><input name="price" defaultValue={it.price ?? ""} className={input} /></div>
              <div className="col-span-1"><label className="text-xs text-stone-500">Order</label><input name="sort_order" type="number" defaultValue={it.sort_order} className={input} /></div>
              <label className="col-span-1 flex items-center gap-1 text-xs"><input type="checkbox" name="is_available" defaultChecked={it.is_available} /> Avail.</label>
              <div className="col-span-12 flex gap-2">
                <button className="rounded-md border border-stone-300 px-3 py-1.5 text-sm">Save</button>
                <button formAction={catalogDelete} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600">Delete</button>
              </div>
            </form>
          ))}

          <form action={catalogSave} className="grid grid-cols-12 items-end gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3">
            <input type="hidden" name="id" value={id} />
            <div className="col-span-2"><label className="text-xs text-stone-500">Section</label><input name="section" className={input} /></div>
            <div className="col-span-2"><label className="text-xs text-stone-500">Category</label><input name="category" className={input} /></div>
            <div className="col-span-2"><label className="text-xs text-stone-500">Name</label><input name="name" required className={input} /></div>
            <div className="col-span-3"><label className="text-xs text-stone-500">Description</label><input name="description" className={input} /></div>
            <div className="col-span-1"><label className="text-xs text-stone-500">Price</label><input name="price" className={input} /></div>
            <div className="col-span-1"><label className="text-xs text-stone-500">Order</label><input name="sort_order" type="number" defaultValue={catalog.length + 1} className={input} /></div>
            <label className="col-span-1 flex items-center gap-1 text-xs"><input type="checkbox" name="is_available" defaultChecked /> Avail.</label>
            <div className="col-span-12"><button className={btn}>+ Add item</button></div>
          </form>
        </div>
      </Card>

      {/* Gallery */}
      <Card title="Gallery">
        <div className="space-y-3">
          {gallery.map((g) => (
            <form key={g.id} action={gallerySave} className="grid grid-cols-12 items-end gap-2 rounded-lg border border-stone-200 p-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="item_id" value={g.id} />
              <div className="col-span-6"><label className="text-xs text-stone-500">Image URL</label><input name="image_url" defaultValue={g.image_url} className={input} /></div>
              <div className="col-span-4"><label className="text-xs text-stone-500">Caption</label><input name="caption" defaultValue={g.caption ?? ""} className={input} /></div>
              <div className="col-span-1"><label className="text-xs text-stone-500">Order</label><input name="sort_order" type="number" defaultValue={g.sort_order} className={input} /></div>
              <div className="col-span-12 flex gap-2">
                <button className="rounded-md border border-stone-300 px-3 py-1.5 text-sm">Save</button>
                <button formAction={galleryDelete} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600">Delete</button>
              </div>
            </form>
          ))}
          <form action={gallerySave} className="grid grid-cols-12 items-end gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3">
            <input type="hidden" name="id" value={id} />
            <div className="col-span-6"><label className="text-xs text-stone-500">Image URL</label><input name="image_url" required className={input} /></div>
            <div className="col-span-4"><label className="text-xs text-stone-500">Caption</label><input name="caption" className={input} /></div>
            <div className="col-span-1"><label className="text-xs text-stone-500">Order</label><input name="sort_order" type="number" defaultValue={gallery.length + 1} className={input} /></div>
            <div className="col-span-12"><button className={btn}>+ Add image</button></div>
          </form>
        </div>
      </Card>

      {/* Team */}
      <Card title="Team" desc="Most relevant for salons; optional for others.">
        <div className="space-y-3">
          {team.map((m) => (
            <form key={m.id} action={teamSave} className="grid grid-cols-12 items-end gap-2 rounded-lg border border-stone-200 p-3">
              <input type="hidden" name="id" value={id} />
              <input type="hidden" name="item_id" value={m.id} />
              <div className="col-span-3"><label className="text-xs text-stone-500">Name</label><input name="name" defaultValue={m.name} className={input} /></div>
              <div className="col-span-3"><label className="text-xs text-stone-500">Role</label><input name="role" defaultValue={m.role ?? ""} className={input} /></div>
              <div className="col-span-3"><label className="text-xs text-stone-500">Credentials</label><input name="credentials" defaultValue={m.credentials ?? ""} className={input} /></div>
              <div className="col-span-2"><label className="text-xs text-stone-500">Photo URL</label><input name="photo_url" defaultValue={m.photo_url ?? ""} className={input} /></div>
              <div className="col-span-1"><label className="text-xs text-stone-500">Order</label><input name="sort_order" type="number" defaultValue={m.sort_order} className={input} /></div>
              <div className="col-span-12 flex gap-2">
                <button className="rounded-md border border-stone-300 px-3 py-1.5 text-sm">Save</button>
                <button formAction={teamDelete} className="rounded-md border border-red-300 px-3 py-1.5 text-sm text-red-600">Delete</button>
              </div>
            </form>
          ))}
          <form action={teamSave} className="grid grid-cols-12 items-end gap-2 rounded-lg border border-dashed border-stone-300 bg-stone-50 p-3">
            <input type="hidden" name="id" value={id} />
            <div className="col-span-3"><label className="text-xs text-stone-500">Name</label><input name="name" required className={input} /></div>
            <div className="col-span-3"><label className="text-xs text-stone-500">Role</label><input name="role" className={input} /></div>
            <div className="col-span-3"><label className="text-xs text-stone-500">Credentials</label><input name="credentials" className={input} /></div>
            <div className="col-span-2"><label className="text-xs text-stone-500">Photo URL</label><input name="photo_url" className={input} /></div>
            <div className="col-span-1"><label className="text-xs text-stone-500">Order</label><input name="sort_order" type="number" defaultValue={team.length + 1} className={input} /></div>
            <div className="col-span-12"><button className={btn}>+ Add member</button></div>
          </form>
        </div>
      </Card>

      {/* Advanced raw JSON */}
      <Card title="Advanced: full content JSON" desc="For fields not covered above (hours, ordering links, service areas, accreditations, socials). Replaces the entire content blob.">
        <form action={saveContentRaw}>
          <input type="hidden" name="id" value={id} />
          <textarea name="content_json" rows={10} defaultValue={JSON.stringify(content, null, 2)} className={`${input} font-mono text-xs`} />
          <button className={`${btn} mt-3`}>Save JSON</button>
        </form>
      </Card>
    </div>
  );
}
