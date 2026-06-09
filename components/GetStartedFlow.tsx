"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { TemplateThumb } from "./TemplateThumb";
import { SubmitButton } from "./SubmitButton";
import { Turnstile } from "./Turnstile";

interface BuildOption {
  key: string;
  label: string;
  group: string;
  style: string;
}

interface Group {
  group: string;
  builds: { key: string; label: string }[];
}

const STYLES = [
  { value: "editorial", label: "Editorial" },
  { value: "warm", label: "Warm" },
  { value: "bold", label: "Bold" },
  { value: "minimal", label: "Minimal" },
] as const;

const VALID_STYLES = ["editorial", "warm", "bold", "minimal", "luxe", "classic"];
const titleCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const input =
  "mt-2 w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-white/30 outline-none transition focus:border-white/30";

const FEATURED_GROUPS = ["Food & drink", "Hair & beauty", "Health & wellness", "Fitness", "Contractors & home", "Professional services"];

const GROUP_COPY: Record<string, string> = {
  "Food & drink": "Restaurants, cafés, bars and bakeries",
  "Hair & beauty": "Salons, spas, nails, lashes and makeup",
  "Health & wellness": "Clinics, dentists, therapy and wellbeing",
  Fitness: "Gyms, trainers, yoga and coaching",
  "Contractors & home": "Plumbers, electricians and home services",
  Automotive: "Garages, valeting and vehicle services",
  "Professional services": "Consultants, legal, finance and agencies",
  "Retail & shops": "Boutiques, florists and product shops",
  Pets: "Groomers, vets and pet services",
  "Events & creative": "Photographers, venues and creatives",
  Education: "Tutors, nurseries and training providers",
};

const FEATURED_TYPES: Record<string, string[]> = {
  "Food & drink": ["restaurant", "cafe", "coffee_shop", "bakery", "bar", "bistro"],
  "Hair & beauty": ["beauty_salon", "hair_salon", "barber", "nail_salon", "lash_brow", "makeup_artist"],
  "Health & wellness": ["dentist", "dental", "aesthetics_clinic", "skin_clinic", "physio", "massage"],
  Fitness: ["personal_trainer", "gym", "yoga_studio", "pilates", "boxing_gym", "bootcamp"],
  "Contractors & home": ["plumber", "electrician", "builder", "cleaner", "handyman", "painter_decorator"],
  Automotive: ["garage", "car_detailing", "car_wash", "mot_centre", "bodyshop", "tyre_shop"],
  "Professional services": ["accountant", "business_consultant", "solicitor", "marketing_agency", "financial_advisor", "architect"],
  "Retail & shops": ["boutique", "florist", "gift_shop", "bookshop", "homeware", "jeweller"],
  Pets: ["dog_groomer", "vet", "dog_walker", "pet_shop", "dog_trainer", "cattery_kennels"],
  "Events & creative": ["photographer", "wedding_planner", "event_venue", "dj", "videographer", "party_hire"],
  Education: ["private_tutor", "nursery", "driving_school", "dance_school", "music_teacher", "language_school"],
};

export function GetStartedFlow({
  groups,
  builds,
  turnstileKey,
  error,
  action,
  preselect,
}: {
  groups: Group[];
  builds: BuildOption[];
  turnstileKey?: string;
  error?: string;
  action: (formData: FormData) => void | Promise<void>;
  preselect?: { key: string; style?: string };
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const byKey = useMemo(() => new Map(builds.map((build) => [build.key, build])), [builds]);

  // Came from "Build mine": the design is already chosen, so start on the
  // account step with that build (and the style they were viewing) locked in.
  const pre = preselect && byKey.get(preselect.key) ? preselect : null;
  const preStyle = pre
    ? pre.style && VALID_STYLES.includes(pre.style)
      ? pre.style
      : byKey.get(pre.key)!.style
    : byKey.get("beauty_salon")?.style ?? "warm";

  const [step, setStep] = useState(pre ? 2 : 0);
  const [group, setGroup] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [showMoreGroups, setShowMoreGroups] = useState(false);
  const [showMoreTypes, setShowMoreTypes] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [preset, setPreset] = useState(pre ? pre.key : "beauty_salon");
  const [selectedStyle, setSelectedStyle] = useState(preStyle);
  const [selectedDesign, setSelectedDesign] = useState(pre ? pre.key : "beauty_salon");

  const selected = byKey.get(preset);
  const visibleGroups = showMoreGroups ? groups : groups.filter((item) => FEATURED_GROUPS.includes(item.group));
  const visibleTypes = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q) return builds.filter((build) => build.label.toLowerCase().includes(q)).slice(0, 8);
    if (!group) return [];
    const current = groups.find((item) => item.group === group)?.builds ?? [];
    const priority = FEATURED_TYPES[group] ?? [];
    const ordered = [...current].sort((a, b) => {
      const ai = priority.indexOf(a.key);
      const bi = priority.indexOf(b.key);
      return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
    });
    return ordered.map((item) => byKey.get(item.key)).filter(Boolean).slice(0, showMoreTypes ? 12 : 6) as BuildOption[];
  }, [query, group, groups, builds, byKey, showMoreTypes]);
  const selectedGroupCount = group ? groups.find((item) => item.group === group)?.builds.length ?? 0 : 0;

  const recommendedStyle = "bold";
  const designStyles = [
    { value: recommendedStyle, label: "Recommended" },
    ...STYLES.filter((style) => style.value !== recommendedStyle).slice(0, 3),
  ];

  function goToStep(nextStep: number) {
    setStep(nextStep);
    // Onboarding: each step is its own screen, so jump back to the very top.
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  function chooseType(key: string) {
    const build = byKey.get(key);
    setPreset(key);
    setSelectedDesign(key);
    setSelectedStyle(build?.style ?? "classic");
    goToStep(1);
  }

  function chooseDesign(style: string) {
    setSelectedDesign(preset);
    setSelectedStyle(style);
    goToStep(2);
  }

  return (
    <form ref={formRef} action={action} className="flex min-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] shadow-[0_40px_140px_-80px_rgba(16,185,129,0.9)]">
      <input type="hidden" name="preset" value={preset} />
      <input type="hidden" name="selected_design" value={selectedDesign} />
      <input type="hidden" name="selected_style" value={selectedStyle} />

      <div className="border-b border-white/10 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-white/35">
          {["Type", "Design", "Account"].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => i <= step && goToStep(i)}
              className={`rounded-full px-3 py-1.5 transition ${i === step ? "bg-emerald-400 text-black" : i < step ? "bg-white/10 text-white" : "bg-transparent text-white/25"}`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400/80">Step 1</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">What kind of website do you want?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              Choose a category first, then pick the closest website type. We&apos;ll only show designs that match it.
            </p>

            {!group && !query && !showSearch && (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleGroups.map((item) => (
                    <button
                      key={item.group}
                      type="button"
                      onClick={() => {
                        setGroup(item.group);
                        setShowMoreTypes(false);
                      }}
                      className="rounded-2xl border border-white/10 bg-black/30 p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/[0.04]"
                    >
                      <p className="font-semibold">{item.group}</p>
                      <p className="mt-2 text-sm leading-5 text-white/40">{GROUP_COPY[item.group] ?? `${item.builds.length} website types`}</p>
                    </button>
                  ))}
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  {!showMoreGroups && groups.length > visibleGroups.length && (
                    <button
                      type="button"
                      onClick={() => setShowMoreGroups(true)}
                      className="rounded-xl border border-white/10 px-4 py-3 text-sm text-white/55 transition hover:border-white/30 hover:text-white"
                    >
                      Show more categories
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowSearch(true)}
                    className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-white/55 transition hover:border-white/30 hover:text-white"
                  >
                    Search for a specific type
                  </button>
                </div>
              </>
            )}

            {(showSearch || query) && (
              <div className="mt-6">
                <label className="text-sm font-medium">Search business types</label>
                <input
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setGroup(null);
                  }}
                  placeholder="Search salon, restaurant, plumber..."
                  className={input}
                />
              </div>
            )}

            {(group || query) && (
              <div className="mt-6">
                {group && !query && (
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] px-4 py-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/70">Selected category</p>
                      <p className="mt-1 font-semibold">{group}</p>
                    </div>
                    <button type="button" onClick={() => setGroup(null)} className="text-sm text-white/45 transition hover:text-white">
                      Change
                    </button>
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {visibleTypes.map((build) => (
                    <button
                      key={build.key}
                      type="button"
                      onClick={() => chooseType(build.key)}
                      className="rounded-2xl border border-white/10 bg-black/30 p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/[0.04]"
                    >
                      <p className="font-semibold">{build.label}</p>
                      <p className="mt-1 text-xs text-white/40">{build.group}</p>
                    </button>
                  ))}
                </div>

                {group && selectedGroupCount > visibleTypes.length && !query && (
                  <button
                    type="button"
                    onClick={() => setShowMoreTypes(true)}
                    className="mt-4 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/55 transition hover:border-white/30 hover:text-white"
                  >
                    Show more {group.toLowerCase()} types
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setPreset("other");
                setSelectedDesign("scratch");
                setSelectedStyle("classic");
                goToStep(2);
              }}
              className="mt-5 rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-white/55 transition hover:border-white/30 hover:text-white"
            >
              My business type is not listed
            </button>
          </div>
        )}

        {step === 1 && selected && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400/80">Step 2</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Choose a {selected.label.toLowerCase()} design.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              These samples are all for {selected.label.toLowerCase()}{" "}
              websites. Pick one and we&apos;ll load the next step.
            </p>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {designStyles.map((style, idx) => (
                <button
                  key={style.value}
                  type="button"
                  onClick={() => chooseDesign(style.value)}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-black text-left transition hover:-translate-y-1 hover:border-emerald-400/50"
                >
                  <TemplateThumb src={`/samples/${preset}?embed=1&style=${style.value}`} aspect={0.55} />
                  <div className="border-t border-white/10 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold">{style.label} design</p>
                        <p className="mt-1 text-xs text-white/40">{selected.label} sample</p>
                      </div>
                      <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50 group-hover:border-emerald-400/40 group-hover:text-emerald-300">
                        Choose this design
                      </span>
                    </div>
                    {idx === 0 && <p className="mt-3 text-xs font-medium text-emerald-300">Recommended</p>}
                  </div>
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setSelectedDesign("scratch");
                  setSelectedStyle("classic");
                  goToStep(2);
                }}
                className="flex min-h-[280px] flex-col justify-between rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-5 text-left transition hover:border-white/30"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/35">Blank start</p>
                  <h3 className="mt-3 text-xl font-semibold">Start from scratch</h3>
                  <p className="mt-2 text-sm leading-6 text-white/45">Start with a simple {selected.label.toLowerCase()} layout and edit everything yourself.</p>
                </div>
                <span className="mt-6 rounded-full border border-white/10 px-3 py-2 text-center text-xs text-white/50">Start from scratch</span>
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-400/80">Step 3</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Create your account.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">
              We&apos;ll build this exact design for you and open it in the on-screen editor after email confirmation, so you can make it yours.
            </p>

            {selected && selectedDesign !== "scratch" && (
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-3 sm:p-4">
                <div className="w-24 shrink-0 overflow-hidden rounded-lg border border-white/10 sm:w-32">
                  <TemplateThumb src={`/samples/${preset}?embed=1&style=${selectedStyle}`} aspect={0.62} />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-300/70">You&apos;re building</p>
                  <p className="mt-1 font-semibold leading-tight">{selected.label}</p>
                  <p className="text-sm text-white/45">{titleCase(selectedStyle)} design</p>
                  <button
                    type="button"
                    onClick={() => goToStep(0)}
                    className="mt-1.5 text-sm text-white/50 underline-offset-4 transition hover:text-white hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Business name</label>
                <input name="business_name" required className={input} placeholder="Tamara Cosmetics" />
              </div>
              {preset === "other" && (
                <div>
                  <label className="text-sm font-medium">What kind of business?</label>
                  <input name="preset_other" required className={input} placeholder="e.g. Photography studio" />
                </div>
              )}
            </div>
            <div className="mt-4 grid gap-4 lg:grid-cols-3">
              <div>
                <label className="text-sm font-medium">Email</label>
                <input name="email" type="email" required className={input} />
              </div>
              <div>
                <label className="text-sm font-medium">Phone number</label>
                <input name="phone" type="tel" required className={input} placeholder="07123 456789" />
              </div>
              <div>
                <label className="text-sm font-medium">Password</label>
                <input name="password" type="password" required minLength={8} className={input} />
              </div>
            </div>

            <div className="mt-6">
              <Turnstile siteKey={turnstileKey} />
            </div>

            {error && <p className="mt-4 rounded-lg bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={() => setStep(preset === "other" ? 0 : 1)} className="text-sm text-white/45 transition hover:text-white">
                Back
              </button>
              <SubmitButton className="rounded-xl bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-white/90" pendingText="Creating your site...">
                Create my site
              </SubmitButton>
            </div>

            {/* Trust strip — reassurance at the commitment point. */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-white/45">
              {["No setup fee", "Cancel anytime", "Online in under a day", "150+ designs"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-center text-xs text-white/30">
              Already have an account? <Link href="/login" className="text-white/60 hover:text-white">Sign in</Link>
            </p>
          </div>
        )}
      </div>
    </form>
  );
}
