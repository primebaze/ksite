import type { TenantSite } from "@/lib/types";
import { fontClass, groupCatalog, themeStyle } from "../shared";

// Premium "bookings" archetype — salon, stylist, beauty, clinic.
export default function SalonSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery, team } = site;
  const treatments = groupCatalog(catalog);
  const book = content.booking_url || content.cta_url;
  const cta = content.cta_label ?? "Book now";
  const hero = content.hero_image_url;

  return (
    <div style={themeStyle(theme)} className={`${fontClass(theme)} min-h-screen bg-white text-neutral-900`}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.4)]">{tenant.business_name}</span>
          {book && (
            <a href={book} className="rounded-full bg-white/95 px-5 py-2 text-sm font-medium text-neutral-900 shadow-sm backdrop-blur">{cta}</a>
          )}
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-end overflow-hidden">
        {hero ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[var(--primary)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/40" />
        <div className="relative mx-auto w-full max-w-6xl px-6 pb-20 text-white">
          {content.tagline && <p className="text-xs uppercase tracking-[0.3em] text-white/70">{content.tagline}</p>}
          <h1 className="mt-4 max-w-3xl text-5xl font-semibold leading-[1.02] sm:text-7xl">{tenant.business_name}</h1>
          <div className="mt-9 flex flex-wrap gap-3">
            {book && <a href={book} className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition hover:bg-white/90">{cta}</a>}
            {content.phone && <a href={`tel:${content.phone}`} className="rounded-full border border-white/40 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10">Call {content.phone}</a>}
          </div>
        </div>
      </section>

      {/* About */}
      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-2xl font-light leading-relaxed text-neutral-700 sm:text-[2rem] sm:leading-[1.4]">{content.about}</p>
        </section>
      )}

      {/* Treatments */}
      {treatments.length > 0 && (
        <section className="border-y border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-3xl px-6 py-24">
            <h2 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[var(--primary)]">Treatments &amp; Prices</h2>
            {treatments.map((section) => (
              <div key={section.section} className="mt-14 first:mt-12">
                {section.section && <h3 className="text-2xl font-semibold">{section.section}</h3>}
                {section.categories.map((cat) => (
                  <div key={cat.category ?? "_"} className="mt-6">
                    {cat.category && <h4 className="mb-1 text-xs uppercase tracking-widest text-neutral-400">{cat.category}</h4>}
                    <ul className="divide-y divide-neutral-200">
                      {cat.items.map((item) => (
                        <li key={item.id} className="flex items-baseline justify-between gap-6 py-4">
                          <div>
                            <p className="font-medium">{item.name}</p>
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
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-center text-xs font-medium uppercase tracking-[0.3em] text-[var(--primary)]">The team</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-3">
            {team.map((m) => (
              <div key={m.id} className="text-center">
                <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-neutral-100">
                  {m.photo_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={m.photo_url} alt={m.name} className="h-full w-full object-cover" />
                  )}
                </div>
                <p className="mt-5 text-lg font-medium">{m.name}</p>
                {m.role && <p className="text-sm text-neutral-500">{m.role}</p>}
                {m.credentials && <p className="text-xs text-neutral-400">{m.credentials}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="bg-neutral-50">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-2 py-2 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/5] w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* Visit / book */}
      <footer className="bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <h2 className="text-4xl font-semibold tracking-tight">{tenant.business_name}</h2>
          <div className="mt-10 grid gap-10 sm:grid-cols-3">
            {content.address && <div><p className="text-xs uppercase tracking-widest text-white/50">Visit</p><p className="mt-2 text-white/90">{content.address}</p></div>}
            {content.hours && (
              <div>
                <p className="text-xs uppercase tracking-widest text-white/50">Hours</p>
                <ul className="mt-2 space-y-1 text-white/90">
                  {content.hours.map((h) => (<li key={h.day} className="flex justify-between gap-6"><span>{h.day}</span><span>{h.open}</span></li>))}
                </ul>
              </div>
            )}
            <div>
              <p className="text-xs uppercase tracking-widest text-white/50">Get in touch</p>
              {content.phone && <p className="mt-2 text-white/90">{content.phone}</p>}
              {content.email && <p className="text-white/90">{content.email}</p>}
              {book && <a href={book} className="mt-4 inline-block rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-neutral-900">{cta}</a>}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
