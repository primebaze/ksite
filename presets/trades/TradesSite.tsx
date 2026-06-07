import type { TenantSite } from "@/lib/types";
import { fontClass, themeStyle } from "../shared";

// Premium "services" archetype — trades & local services (plumber, electrician,
// moving, and the generic "other").
export default function TradesSite({ site }: { site: TenantSite }) {
  const { tenant, theme, content, catalog, gallery } = site;
  const services = catalog.filter((i) => i.is_available);
  const cta = content.cta_label ?? "Get a quote";
  const ctaUrl = content.cta_url ?? (content.phone ? `tel:${content.phone}` : "#contact");
  const hero = content.hero_image_url;
  const phone = content.emergency_phone || content.phone;

  return (
    <div style={themeStyle(theme)} className={`${fontClass(theme)} min-h-screen bg-white text-neutral-900`}>
      <header className="fixed inset-x-0 top-0 z-50">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <span className="text-lg font-semibold tracking-tight text-white [text-shadow:0_1px_8px_rgba(0,0,0,0.45)]">{tenant.business_name}</span>
          {phone && <a href={`tel:${phone}`} className="rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-semibold text-neutral-900">Call {phone}</a>}
        </div>
      </header>

      {/* Hero */}
      <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden bg-gradient-to-br from-[var(--primary)] via-neutral-900 to-black">
        {hero && (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          </>
        )}
        <div className="relative mx-auto w-full max-w-6xl px-6 text-white">
          {theme.logo_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={theme.logo_url} alt="" className="mb-8 h-14 w-auto object-contain" />
          )}
          <h1 className="max-w-2xl text-5xl font-bold leading-[1.05] sm:text-6xl">{content.tagline ?? tenant.business_name}</h1>
          {content.tagline && <p className="mt-3 text-lg text-white/70">{tenant.business_name}</p>}
          <div className="mt-9 flex flex-wrap gap-3">
            <a href={ctaUrl} className="rounded-lg bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-neutral-900">{cta}</a>
            {content.phone && <a href={`tel:${content.phone}`} className="rounded-lg border border-white/40 px-7 py-3.5 text-sm font-medium text-white">Call {content.phone}</a>}
          </div>
          {content.accreditations && content.accreditations.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-2">
              {content.accreditations.map((a) => (
                <span key={a} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wide backdrop-blur">✓ {a}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {content.about && (
        <section className="mx-auto max-w-3xl px-6 py-20 text-center">
          <p className="text-2xl font-light leading-relaxed text-neutral-700">{content.about}</p>
        </section>
      )}

      {/* Services */}
      {services.length > 0 && (
        <section className="border-y border-neutral-200 bg-neutral-50">
          <div className="mx-auto max-w-6xl px-6 py-24">
            <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--primary)]">What we do</h2>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map((s) => (
                <div key={s.id} className="rounded-2xl border border-neutral-200 bg-white p-7 transition hover:shadow-lg">
                  <h3 className="text-lg font-semibold text-[var(--primary)]">{s.name}</h3>
                  {s.description && <p className="mt-2 text-sm text-neutral-600">{s.description}</p>}
                  {s.price && <p className="mt-4 font-semibold">{s.price}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Areas */}
      {content.service_areas && content.service_areas.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="text-xs font-medium uppercase tracking-[0.3em] text-[var(--primary)]">Areas we cover</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {content.service_areas.map((a) => (
              <span key={a} className="rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1.5 text-sm">{a}</span>
            ))}
          </div>
        </section>
      )}

      {gallery.length > 0 && (
        <section className="border-t border-neutral-200">
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-2 py-2 sm:grid-cols-3">
            {gallery.map((g) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={g.id} src={g.image_url} alt={g.caption ?? ""} className="aspect-[4/3] w-full object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* Quote */}
      <footer id="contact" className="bg-[var(--primary)] text-white">
        <div className="mx-auto max-w-2xl px-6 py-24 text-center">
          <h2 className="text-4xl font-bold tracking-tight">{cta}</h2>
          <p className="mt-3 text-white/70">No call-out fee. Upfront pricing. Friendly local team.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {content.phone && <a href={`tel:${content.phone}`} className="rounded-lg bg-[var(--accent)] px-7 py-3.5 text-sm font-semibold text-neutral-900">Call {content.phone}</a>}
            {content.email && <a href={`mailto:${content.email}`} className="rounded-lg border border-white/40 px-7 py-3.5 text-sm font-medium text-white">Email us</a>}
          </div>
          {content.address && <p className="mt-10 text-sm text-white/50">{tenant.business_name} · {content.address}</p>}
        </div>
      </footer>
    </div>
  );
}
