import type { TenantSite } from "@/lib/types";
import { fontClass, groupCatalog, themeStyle } from "../shared";

export default function SalonSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const treatments = groupCatalog(catalog);
  const bookUrl = content.booking_url ?? content.cta_url;

  return (
    <div style={themeStyle(theme)} className={`${fontClass(theme)} min-h-screen bg-stone-50 text-stone-900`}>
      {/* Hero */}
      <header className="bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center">
          <h1 className="text-5xl font-semibold tracking-tight sm:text-6xl">{tenant.business_name}</h1>
          {content.tagline && <p className="mx-auto mt-4 max-w-lg text-lg opacity-90">{content.tagline}</p>}
          {bookUrl && (
            <a href={bookUrl} className="mt-8 inline-block rounded-full bg-[var(--accent)] px-8 py-3 font-medium text-stone-900">
              {content.cta_label ?? "Book online"}
            </a>
          )}
        </div>
      </header>

      {/* Treatments */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-semibold">Treatments &amp; Prices</h2>
        {treatments.map((section) => (
          <div key={section.section} className="mb-10">
            {section.section && (
              <h3 className="mb-5 text-xl font-semibold text-[var(--primary)]">{section.section}</h3>
            )}
            {section.categories.map((cat) => (
              <div key={cat.category ?? "_"} className="mb-6">
                {cat.category && (
                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-widest text-stone-400">{cat.category}</h4>
                )}
                <ul className="divide-y divide-stone-200">
                  {cat.items.map((item) => (
                    <li key={item.id} className="flex items-baseline justify-between gap-4 py-3">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        {item.description && <p className="text-sm text-stone-500">{item.description}</p>}
                      </div>
                      {item.price && <span className="whitespace-nowrap font-medium text-[var(--accent)]">{item.price}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* Team — salons live on their stylists */}
      {team.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-5xl px-6">
            <h2 className="mb-10 text-center text-3xl font-semibold">Meet the team</h2>
            <div className="grid gap-8 sm:grid-cols-3">
              {team.map((m) => (
                <div key={m.id} className="text-center">
                  <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-[var(--accent)]/30">
                    {m.photo_url && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                    )}
                  </div>
                  <p className="font-semibold">{m.name}</p>
                  {m.role && <p className="text-sm text-stone-500">{m.role}</p>}
                  {m.credentials && <p className="text-xs text-stone-400">{m.credentials}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-5xl px-6 py-16">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-square w-full rounded-lg object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
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
            <h3 className="mb-3 text-lg font-semibold">Visit us</h3>
            {content.address && <p className="text-sm opacity-90">{content.address}</p>}
            {content.phone && <p className="mt-2 text-sm opacity-90">{content.phone}</p>}
            {bookUrl && (
              <a href={bookUrl} className="mt-4 inline-block rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-stone-900">
                {content.cta_label ?? "Book online"}
              </a>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
}
