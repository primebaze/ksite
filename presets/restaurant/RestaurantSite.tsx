import type { TenantSite } from "@/lib/types";
import { fontClass, groupCatalog, Tag, themeStyle } from "../shared";

export default function RestaurantSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const menu = groupCatalog(catalog);

  return (
    <div style={themeStyle(theme)} className={`${fontClass(theme)} min-h-screen bg-stone-50 text-stone-900`}>
      {/* Hero */}
      <header className="relative isolate overflow-hidden bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          {theme.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logo_url} alt={tenant.business_name} className="mx-auto mb-6 h-16" />
          )}
          {content.cuisine_type && (
            <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[var(--accent)]">
              {content.cuisine_type}
            </p>
          )}
          <h1 className="text-5xl font-semibold sm:text-6xl">{tenant.business_name}</h1>
          {content.tagline && <p className="mx-auto mt-4 max-w-xl text-lg opacity-90">{content.tagline}</p>}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {content.reservation_url && (
              <a href={content.reservation_url} className="rounded-full bg-[var(--accent)] px-6 py-3 font-medium text-stone-900">
                Book a table
              </a>
            )}
            {content.phone && (
              <a href={`tel:${content.phone}`} className="rounded-full border border-white/40 px-6 py-3 font-medium">
                {content.phone}
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Order direct — commission-free hook */}
      {content.ordering_links && content.ordering_links.length > 0 && (
        <section className="bg-[var(--accent)]/15">
          <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-3 px-6 py-5 text-sm">
            <span className="font-medium">Order takeaway:</span>
            {content.ordering_links.map((o) => (
              <a
                key={o.label}
                href={o.url}
                className={`rounded-full px-4 py-2 ${
                  o.commission_free
                    ? "bg-[var(--primary)] font-semibold text-white"
                    : "border border-stone-300 bg-white"
                }`}
              >
                {o.label}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Menu */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-semibold">Menu</h2>
        {menu.map((section) => (
          <div key={section.section} className="mb-12">
            {section.section && (
              <h3 className="mb-6 border-b border-stone-300 pb-2 text-xl font-semibold text-[var(--primary)]">
                {section.section}
              </h3>
            )}
            {section.categories.map((cat) => (
              <div key={cat.category ?? "_"} className="mb-8">
                {cat.category && (
                  <h4 className="mb-3 text-sm font-semibold uppercase tracking-widest text-stone-500">
                    {cat.category}
                  </h4>
                )}
                <ul className="space-y-4">
                  {cat.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {item.name}{" "}
                          {item.tags.map((t) => (
                            <span key={t} className="ml-1 align-middle">
                              <Tag>{t}</Tag>
                            </span>
                          ))}
                        </p>
                        {item.description && <p className="text-sm text-stone-500">{item.description}</p>}
                      </div>
                      {item.price && <span className="whitespace-nowrap font-medium text-[var(--primary)]">{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
        <p className="mt-6 text-center text-xs text-stone-400">Allergen &amp; dietary information available on request.</p>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 px-6 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* About + hours + contact */}
      <footer className="bg-[var(--primary)] text-white">
        <div className="mx-auto grid max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
          <div>
            <h3 className="mb-3 text-lg font-semibold">{tenant.business_name}</h3>
            {content.about && <p className="text-sm opacity-90">{content.about}</p>}
          </div>
          {content.hours && (
            <div>
              <h3 className="mb-3 text-lg font-semibold">Opening hours</h3>
              <ul className="space-y-1 text-sm opacity-90">
                {content.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-6">
                    <span>{h.day}</span>
                    <span>{h.open}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Find us</h3>
            {content.address && <p className="text-sm opacity-90">{content.address}</p>}
            {content.phone && <p className="mt-2 text-sm opacity-90">{content.phone}</p>}
          </div>
        </div>
      </footer>
    </div>
  );
}
