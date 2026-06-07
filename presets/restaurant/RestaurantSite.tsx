import type { TenantSite } from "@/lib/types";
import { fontClass, groupCatalog, Tag, themeStyle } from "../shared";

// Premium "menu" archetype — restaurants & cafés.
export default function RestaurantSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const menu = groupCatalog(catalog);
  const book = content.reservation_url || content.cta_url;
  const cta = content.cta_label ?? "Book a table";
  const hero = content.hero_image_url;

  return (
    <div style={themeStyle(theme)} className={`${fontClass(theme)} min-h-screen bg-[#faf8f5] text-neutral-900`}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">{tenant.business_name}</span>
          {book && <a href={book} className="rounded-full bg-white/95 px-5 py-2 text-sm font-medium text-neutral-900 backdrop-blur">{cta}</a>}
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-br from-[var(--primary)] via-neutral-900 to-black">
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
          </>
        )}
        <div className="relative mx-auto w-full max-w-6xl px-6 py-24 text-white">
          {theme.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logo_url} alt="" className="mb-8 h-16 w-auto object-contain" />
          )}
          {content.cuisine_type && <p className="text-xs uppercase tracking-[0.3em] text-[var(--accent)]">{content.cuisine_type}</p>}
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-7xl">{tenant.business_name}</h1>
          {content.tagline && <p className="mt-4 max-w-xl text-lg text-white/80">{content.tagline}</p>}
          <div className="mt-9 flex flex-wrap gap-3">
            {book && <a href={book} className="rounded-full bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-neutral-900">{cta}</a>}
            {content.phone && <a href={`tel:${content.phone}`} className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white">{content.phone}</a>}
          </div>
        </div>
      </section>

      {/* Order direct */}
      {content.ordering_links && content.ordering_links.length > 0 && (
        <section className="bg-[var(--primary)] text-white">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-6 py-4 text-sm">
            <span className="font-medium">Order in:</span>
            {content.ordering_links.map((o) => (
              <a key={o.label} href={o.url} className={`rounded-full px-4 py-1.5 ${o.commission_free ? "bg-[var(--accent)] font-semibold text-neutral-900" : "border border-white/30"}`}>{o.label}</a>
            ))}
          </div>
        </section>
      )}

      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-2xl font-light leading-relaxed text-neutral-700 sm:text-[2rem] sm:leading-[1.4]">{content.about}</p>
        </section>
      )}

      {/* Menu */}
      {menu.length > 0 && (
        <section className="border-y border-neutral-200 bg-white">
          <div className="mx-auto max-w-3xl px-6 py-24">
            <h2 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[var(--primary)]">Menu</h2>
            {menu.map((section) => (
              <div key={section.section} className="mt-14 first:mt-12">
                {section.section && <h3 className="text-center text-2xl font-semibold">{section.section}</h3>}
                {section.categories.map((cat) => (
                  <div key={cat.category ?? "_"} className="mt-8">
                    {cat.category && <h4 className="mb-3 text-center text-xs uppercase tracking-widest text-neutral-400">{cat.category}</h4>}
                    <ul className="space-y-5">
                      {cat.items.map((item) => (
                        <li key={item.id} className="flex items-baseline justify-between gap-6">
                          <div>
                            <p className="font-medium">
                              {item.name}{" "}
                              {item.tags.map((t) => (<span key={t} className="ml-1 align-middle"><Tag>{t}</Tag></span>))}
                            </p>
                            {item.description && <p className="mt-0.5 text-sm text-neutral-500">{item.description}</p>}
                          </div>
                          {item.price && <span className="whitespace-nowrap font-medium text-[var(--primary)]">{item.price}</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
            <p className="mt-12 text-center text-xs text-neutral-400">Allergen &amp; dietary information available on request.</p>
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="bg-[#faf8f5]">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-2 py-2 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      <footer className="bg-[var(--primary)] text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-24 sm:grid-cols-3">
          <div><h3 className="text-2xl font-semibold">{tenant.business_name}</h3>{content.about && <p className="mt-3 text-sm text-white/80">{content.about}</p>}</div>
          {content.hours && (
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Hours</p>
              <ul className="mt-2 space-y-1 text-sm text-white/90">
                {content.hours.map((h) => (<li key={h.day} className="flex justify-between gap-6"><span>{h.day}</span><span>{h.open}</span></li>))}
              </ul>
            </div>
          )}
          <div>
            <p className="text-xs uppercase tracking-widest text-white/50">Find us</p>
            {content.address && <p className="mt-2 text-sm text-white/90">{content.address}</p>}
            {content.phone && <p className="mt-1 text-sm text-white/90">{content.phone}</p>}
            {book && <a href={book} className="mt-4 inline-block rounded-full bg-[var(--accent)] px-6 py-2.5 text-sm font-semibold text-neutral-900">{cta}</a>}
          </div>
        </div>
      </footer>
    </div>
  );
}
