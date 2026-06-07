import type { TenantSite } from "@/lib/types";
import { fontClass, themeStyle } from "../shared";

export default function TradesSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const services = catalog.filter((i) => i.is_available);

  return (
    <div style={themeStyle(theme)} className={`${fontClass(theme)} min-h-screen bg-white text-slate-900`}>
      {/* Top call bar — trades sell on the phone */}
      <div className="bg-[var(--accent)] text-center text-sm font-semibold text-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-2">
          {content.emergency_phone ? (
            <span>24/7 emergencies: <a href={`tel:${content.emergency_phone}`} className="underline">{content.emergency_phone}</a></span>
          ) : content.phone ? (
            <span>Call now: <a href={`tel:${content.phone}`} className="underline">{content.phone}</a></span>
          ) : null}
        </div>
      </div>

      {/* Hero */}
      <header className="bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h1 className="max-w-2xl text-4xl font-bold sm:text-5xl">{tenant.business_name}</h1>
          {content.tagline && <p className="mt-4 max-w-xl text-lg opacity-90">{content.tagline}</p>}
          <div className="mt-8 flex flex-wrap gap-3">
            {content.phone && (
              <a href={`tel:${content.phone}`} className="rounded-md bg-[var(--accent)] px-6 py-3 font-semibold text-slate-900">
                Call {content.phone}
              </a>
            )}
            <a href={content.cta_url ?? "#contact"} className="rounded-md border border-white/40 px-6 py-3 font-semibold">
              {content.cta_label ?? "Get a free quote"}
            </a>
          </div>
          {content.accreditations && (
            <div className="mt-10 flex flex-wrap gap-3">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                  ✓ {a}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-3xl font-bold">What we do</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.id} className="rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-[var(--primary)]">{s.name}</h3>
              {s.description && <p className="mt-2 text-sm text-slate-600">{s.description}</p>}
              {s.price && <p className="mt-4 font-semibold">{s.price}</p>}
            </div>
          ))}
        </div>
      </section>

      {/* Service areas */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="bg-slate-50 py-12">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-4 text-xl font-bold">Areas we cover</h2>
            <div className="flex flex-wrap gap-2">
              {content.service_areas.map((a) => (
                <span key={a} className="rounded-full bg-white px-4 py-1.5 text-sm shadow-sm">{a}</span>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <h2 className="mb-8 text-2xl font-bold">Recent work</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full rounded-lg object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* Quote / contact */}
      <section id="contact" className="bg-[var(--primary)] py-16 text-white">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold">{content.cta_label ?? "Get a free quote"}</h2>
          <p className="mt-3 opacity-90">No call-out fee. Upfront pricing. Friendly local team.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {content.phone && (
              <a href={`tel:${content.phone}`} className="rounded-md bg-[var(--accent)] px-6 py-3 font-semibold text-slate-900">
                Call {content.phone}
              </a>
            )}
            {content.email && (
              <a href={`mailto:${content.email}`} className="rounded-md border border-white/40 px-6 py-3 font-semibold">
                Email us
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 py-8 text-center text-sm text-slate-400">
        <p>{tenant.business_name}{content.address ? ` · ${content.address}` : ""}</p>
      </footer>
    </div>
  );
}
