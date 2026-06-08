import Link from "next/link";
import { Reveal } from "./motion/Reveal";
import { TemplateThumb } from "./TemplateThumb";

interface Ex {
  key: string;
  video: string;
  name: string;
  cat: string;
}

const FEATURE: Ex = { key: "restaurant", video: "/hero/restaurant.mp4", name: "Nonna's Kitchen", cat: "Restaurant" };
const REST: Ex[] = [
  { key: "cafe", video: "/hero/cafe.mp4", name: "Maple & Bean", cat: "Café" },
  { key: "hair_salon", video: "/hero/hair.mp4", name: "The Chair Co.", cat: "Hair salon" },
  { key: "gym", video: "/hero/gym.mp4", name: "Ironworks Gym", cat: "Gym" },
];

function src(e: Ex) {
  return `/samples/${e.key}?embed=1&style=bold&video=${encodeURIComponent(e.video)}&name=${encodeURIComponent(e.name)}`;
}

function Tile({ e, aspect, big }: { e: Ex; aspect: number; big?: boolean }) {
  return (
    <Link
      href={`/samples/${e.key}`}
      target="_blank"
      rel="noreferrer"
      className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]"
    >
      <TemplateThumb src={src(e)} aspect={aspect} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/85 via-black/15 to-transparent px-5 pb-4 pt-16">
        <span className={`font-semibold uppercase tracking-[0.2em] text-white/70 ${big ? "text-xs" : "text-[10px]"}`}>{e.cat}</span>
        <span className="rounded-full bg-emerald-400 px-3 py-1 text-xs font-semibold text-black opacity-0 transition group-hover:opacity-100">View live →</span>
      </div>
    </Link>
  );
}

export function LiveExamples() {
  return (
    <section className="border-t border-white/5 bg-white/[0.015]">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-[1fr_360px] lg:items-end">
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-emerald-400/80">Live examples</p>
              <h2 className="mt-3 max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
                Premium sample sites, ready to edit.
              </h2>
            </div>
            <div className="max-w-sm lg:justify-self-end">
              <p className="text-sm leading-6 text-white/45">
                Every example opens as a real editable site, with a cinematic hero and matching content already in place.
              </p>
              <Link href="/samples" className="mt-4 inline-flex rounded-full border border-white/10 px-4 py-2 text-sm text-emerald-300 transition hover:border-emerald-400/40 hover:bg-emerald-400/10">
                Browse all samples →
              </Link>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 space-y-5">
            <Tile e={FEATURE} aspect={0.42} big />
            <div className="grid gap-5 sm:grid-cols-3">
              {REST.map((e) => (
                <Tile key={e.key} e={e} aspect={0.66} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
