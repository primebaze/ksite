"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { TemplateThumb } from "./TemplateThumb";
import { SubmitButton } from "./SubmitButton";
import { Turnstile } from "./Turnstile";
import { BUSINESS_NAME_PATTERN, BUSINESS_NAME_HINT } from "@/lib/business-name";

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
  "mt-2 w-full rounded-xl border border-ink/10 bg-ink/[0.03] px-4 py-3 text-sm text-ink placeholder-ink/30 outline-none transition focus:border-ink/30";

// One consolidated card per sector: a primary title with the sub-types listed
// as the description, so the picker has no duplicate-feeling type buttons. Each
// maps to its group + a representative build whose designs the next step shows.
const CATEGORIES: { group: string; title: string; preset: string; desc: string }[] = [
  { group: "Food & drink", title: "Restaurants", preset: "restaurant", desc: "Cafés, bakeries, bars, bistros, pizzerias and more" },
  { group: "Hair & beauty", title: "Beauty salon", preset: "beauty_salon", desc: "Hair salons, barbers, nails, lashes, makeup and more" },
  { group: "Health & wellness", title: "Clinics", preset: "aesthetics_clinic", desc: "Aesthetics, skin, dental, physio, massage and more" },
  { group: "Fitness", title: "Gyms & studios", preset: "gym", desc: "Yoga, pilates, boxing, personal training and more" },
  { group: "Contractors & home", title: "Trades & home", preset: "electrician", desc: "Plumbers, electricians, builders, cleaners and more" },
  { group: "Automotive", title: "Automotive", preset: "garage", desc: "Garages, MOT, detailing, valeting and more" },
  { group: "Professional services", title: "Professional services", preset: "accountant", desc: "Consultants, legal, finance, agencies and more" },
  { group: "Retail & shops", title: "Shops", preset: "boutique", desc: "Boutiques, florists, gift shops, jewellers and more" },
  { group: "Pets", title: "Pet services", preset: "dog_groomer", desc: "Groomers, vets, walkers, trainers and more" },
  { group: "Events & creative", title: "Events & creative", preset: "photographer", desc: "Photographers, venues, planners, DJs and more" },
  { group: "Education", title: "Education", preset: "private_tutor", desc: "Tutors, nurseries, music and language schools and more" },
  { group: "Education", title: "Driving school", preset: "driving_school", desc: "Driving lessons, intensive courses, theory and Pass Plus" },
];

// Presets reached from a consolidated category card (Restaurants, Gyms…). These
// are deliberately broad, so their design step shows a spread of the sector's
// designs (recommended first, "View more" for the rest) rather than a single
// type-locked look.
const CATEGORY_PRESETS = new Set(CATEGORIES.map((c) => c.preset));

export function GetStartedFlow({
  groups,
  builds,
  buildDesigns = {},
  groupDesigns = {},
  groupPhotos = {},
  typePhotos = {},
  typeDesigns = {},
  turnstileKey,
  error,
  action,
  preselect,
}: {
  groups: Group[];
  builds: BuildOption[];
  /** Default bespoke design per build key (e.g. cafe -> "meadow"). */
  buildDesigns?: Record<string, string>;
  /** All bespoke designs available per group, for the design step. */
  groupDesigns?: Record<string, string[]>;
  /** On-theme photo ids per group so each design card shows a different photo. */
  groupPhotos?: Record<string, string[]>;
  /** Per-type photo ids that override the group pool (e.g. driving_school -> cars). */
  typePhotos?: Record<string, string[]>;
  /** Per-type design sets (e.g. driving_school -> 5 driving designs). */
  typeDesigns?: Record<string, string[]>;
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
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [preset, setPreset] = useState(pre ? pre.key : "beauty_salon");
  const [selectedStyle, setSelectedStyle] = useState(preStyle);
  const [selectedDesign, setSelectedDesign] = useState(pre ? pre.key : "beauty_salon");
  // The bespoke full-page design key (e.g. "meadow"); "" = generic style mode.
  const [designKey, setDesignKey] = useState(buildDesigns[pre ? pre.key : "beauty_salon"] ?? "");
  // Photo id shown on the chosen design card (seeds the new site's hero).
  const [photoId, setPhotoId] = useState("");
  // Live pop-out preview of a design before choosing it.
  const [preview, setPreview] = useState<{ design: string; img: string } | null>(null);
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  // Design step: show the top 5, reveal the rest under "View more".
  const [showAllDesigns, setShowAllDesigns] = useState(false);
  const DESIGNS_SHOWN = 5;

  const selected = byKey.get(preset);

  // Consolidated categories: one card per sector (a primary title + the sub-types
  // as the description) so there are no duplicate-feeling type buttons. Picking a
  // card jumps straight to the design step using a representative build for the
  // sector. "Search for a specific type" stays for anyone who wants the exact one.
  const availableGroups = useMemo(() => new Set(groups.map((g) => g.group)), [groups]);
  const categories = CATEGORIES.filter((c) => availableGroups.has(c.group) && byKey.has(c.preset));

  const searchResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return builds.filter((build) => build.label.toLowerCase().includes(q)).slice(0, 8);
  }, [query, builds]);

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
    setDesignKey(buildDesigns[key] ?? "");
    setPhotoId("");
    setShowAllDesigns(false);
    goToStep(1);
  }

  function chooseDesign(style: string) {
    setSelectedDesign(preset);
    setSelectedStyle(style);
    setDesignKey("");
    setPhotoId("");
    goToStep(2);
  }

  function chooseDesignKey(design: string, img: string) {
    setSelectedDesign(preset);
    setDesignKey(design);
    setPhotoId(img);
    goToStep(2);
  }

  // What the design step offers:
  //  • A hand-picked set (typeDesigns) wins — e.g. driving school's 5 designs.
  //  • A consolidated category card (Restaurants, Gyms…) shows a spread of the
  //    sector's designs, recommended first, capped so each gets its own photo
  //    (the rest sit behind "View more").
  //  • A specific searched type shows ONLY its own bespoke design, so it is
  //    never offered an off-type look (a bar must not see a sushi design).
  // Each preview uses a different on-theme photo.
  const designOptions = useMemo(() => {
    if (!selected) return [];
    const all = groupDesigns[selected.group] ?? [];
    if (all.length === 0) return [];
    // A per-type photo pool (e.g. driving school -> cars) overrides the group's
    // pool so these cards never show off-theme imagery (classrooms for a car).
    const photos = (typePhotos[preset]?.length ? typePhotos[preset] : groupPhotos[selected.group]) ?? [];
    const recommended = buildDesigns[preset] ?? all[0];

    let list: string[];
    if (typeDesigns[preset]?.length) {
      list = typeDesigns[preset];
    } else if (CATEGORY_PRESETS.has(preset)) {
      const cap = Math.min(12, photos.length || 12);
      list = [recommended, ...all.filter((d) => d !== recommended)].slice(0, cap);
    } else {
      list = [recommended];
    }
    return list.map((design, i) => ({ design, img: photos[i % Math.max(photos.length, 1)] ?? "" }));
  }, [selected, preset, groupDesigns, buildDesigns, groupPhotos, typePhotos, typeDesigns]);

  return (
    <form ref={formRef} action={action} className="flex min-h-[calc(100vh-6rem)] flex-col overflow-hidden rounded-3xl border border-ink/10 bg-ink/[0.02] shadow-[0_40px_140px_-80px_rgba(16,185,129,0.9)]">
      <input type="hidden" name="preset" value={preset} />
      <input type="hidden" name="selected_design" value={selectedDesign} />
      <input type="hidden" name="selected_style" value={selectedStyle} />
      <input type="hidden" name="design" value={designKey} />
      <input type="hidden" name="hero_img" value={photoId} />

      <div className="border-b border-ink/10 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-ink/35">
          {["Type", "Design", "Account"].map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => i <= step && goToStep(i)}
              className={`rounded-full px-3 py-1.5 transition ${i === step ? "bg-emerald-400 text-neutral-950" : i < step ? "bg-ink/10 text-ink" : "bg-transparent text-ink/25"}`}
            >
              {i + 1}. {label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 sm:p-8">
        {step === 0 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">Step 1</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">What kind of website do you want?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
              Pick the closest category and we&apos;ll show designs that match. You can change every word and photo afterwards.
            </p>

            {!query && !showSearch && (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {categories.map((c) => (
                    <button
                      key={c.preset}
                      type="button"
                      onClick={() => chooseType(c.preset)}
                      className="rounded-2xl border border-ink/10 bg-paper/30 p-5 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/[0.04]"
                    >
                      <p className="font-semibold">{c.title}</p>
                      <p className="mt-2 text-sm leading-5 text-ink/40">{c.desc}</p>
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setShowSearch(true)}
                  className="mt-5 rounded-xl border border-dashed border-ink/15 px-4 py-3 text-sm text-ink/55 transition hover:border-ink/30 hover:text-ink"
                >
                  Search for a specific type
                </button>
              </>
            )}

            {(showSearch || query) && (
              <div className="mt-6">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-sm font-medium">Search business types</label>
                  <button type="button" onClick={() => { setShowSearch(false); setQuery(""); }} className="text-sm text-ink/45 transition hover:text-ink">
                    Back to categories
                  </button>
                </div>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search salon, restaurant, plumber..."
                  className={input}
                  autoFocus
                />
                {query && (
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {searchResults.map((build) => (
                      <button
                        key={build.key}
                        type="button"
                        onClick={() => chooseType(build.key)}
                        className="rounded-2xl border border-ink/10 bg-paper/30 p-4 text-left transition hover:-translate-y-0.5 hover:border-emerald-400/50 hover:bg-emerald-400/[0.04]"
                      >
                        <p className="font-semibold">{build.label}</p>
                        <p className="mt-1 text-xs text-ink/40">{build.group}</p>
                      </button>
                    ))}
                    {searchResults.length === 0 && <p className="text-sm text-ink/40">No matches. Try another word.</p>}
                  </div>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setPreset("other");
                setSelectedDesign("scratch");
                setSelectedStyle("classic");
                setDesignKey("");
                goToStep(2);
              }}
              className="mt-5 block rounded-xl border border-dashed border-ink/15 px-4 py-3 text-sm text-ink/55 transition hover:border-ink/30 hover:text-ink"
            >
              My business type is not listed
            </button>
          </div>
        )}

        {step === 1 && selected && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">Step 2</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Choose a {selected.label.toLowerCase()} design.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
              These samples are all for {selected.label.toLowerCase()}{" "}
              websites. Pick one and we&apos;ll load the next step.
            </p>

            {/* General reassurance — applies to every type, not just this one:
                the sample wording/photos are placeholders the owner edits. */}
            <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.05] px-4 py-3 text-sm leading-6 text-accent/90">
              <svg className="mt-0.5 h-4 w-4 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
              </svg>
              <span>
                The business name, wording, photos, prices and colours in every sample are just a
                starting point — you can change all of them to match your business after you pick a design.
              </span>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {designOptions.length > 0
                ? // Bespoke designs exist for this sector: every card is a genuinely
                  // different full-page design with its own photo (never repeated).
                  (showAllDesigns ? designOptions : designOptions.slice(0, DESIGNS_SHOWN)).map(({ design, img }, idx) => (
                    <button
                      key={design}
                      type="button"
                      onClick={() => { setPreviewDevice("desktop"); setPreview({ design, img }); }}
                      className="group relative overflow-hidden rounded-2xl border border-ink/10 bg-paper text-left transition hover:-translate-y-1 hover:border-emerald-400/50"
                    >
                      <TemplateThumb src={`/samples/${preset}?embed=1&design=${design}${img ? `&img=${img}` : ""}`} aspect={0.55} />
                      {/* Hover overlay: clear "preview" affordance */}
                      <span className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center" style={{ height: "calc(100% - 73px)" }}>
                        <span className="flex items-center gap-2 rounded-full bg-paper/70 px-4 py-2 text-sm font-medium text-ink opacity-0 backdrop-blur transition group-hover:opacity-100">
                          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                          Preview design
                        </span>
                      </span>
                      <div className="border-t border-ink/10 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">{titleCase(design)}</p>
                            <p className="mt-1 text-xs text-ink/40">{selected.label} sample</p>
                          </div>
                          <span className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/50 group-hover:border-emerald-400/40 group-hover:text-accent">
                            Preview
                          </span>
                        </div>
                        {idx === 0 && <p className="mt-3 text-xs font-medium text-accent">Recommended</p>}
                      </div>
                    </button>
                  ))
                : designStyles.map((style, idx) => (
                    <button
                      key={style.value}
                      type="button"
                      onClick={() => chooseDesign(style.value)}
                      className="group overflow-hidden rounded-2xl border border-ink/10 bg-paper text-left transition hover:-translate-y-1 hover:border-emerald-400/50"
                    >
                      <TemplateThumb src={`/samples/${preset}?embed=1&style=${style.value}`} aspect={0.55} />
                      <div className="border-t border-ink/10 p-4">
                        <div className="flex items-center justify-between gap-3">
                          <div>
                            <p className="font-semibold">{style.label} design</p>
                            <p className="mt-1 text-xs text-ink/40">{selected.label} sample</p>
                          </div>
                          <span className="rounded-full border border-ink/10 px-3 py-1 text-xs text-ink/50 group-hover:border-emerald-400/40 group-hover:text-accent">
                            Choose this design
                          </span>
                        </div>
                        {idx === 0 && <p className="mt-3 text-xs font-medium text-accent">Recommended</p>}
                      </div>
                    </button>
                  ))}
              <button
                type="button"
                onClick={() => {
                  setSelectedDesign("scratch");
                  setSelectedStyle("classic");
                  setDesignKey("");
                  goToStep(2);
                }}
                className="flex min-h-[280px] flex-col justify-between rounded-2xl border border-dashed border-ink/15 bg-ink/[0.02] p-5 text-left transition hover:border-ink/30"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-ink/35">Blank start</p>
                  <h3 className="mt-3 text-xl font-semibold">Start from scratch</h3>
                  <p className="mt-2 text-sm leading-6 text-ink/45">Start with a simple {selected.label.toLowerCase()} layout and edit everything yourself.</p>
                </div>
                <span className="mt-6 rounded-full border border-ink/10 px-3 py-2 text-center text-xs text-ink/50">Start from scratch</span>
              </button>
            </div>
            {designOptions.length > DESIGNS_SHOWN && !showAllDesigns && (
              <button
                type="button"
                onClick={() => setShowAllDesigns(true)}
                className="mx-auto mt-6 block rounded-full border border-ink/15 px-6 py-2.5 text-sm font-medium text-ink/70 transition hover:border-ink/30 hover:text-ink"
              >
                View more designs ({designOptions.length - DESIGNS_SHOWN})
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80">Step 3</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">Create your account.</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-ink/50">
              We&apos;ll build this exact design for you and open it in the on-screen editor after email confirmation, so you can make it yours.
            </p>

            {selected && selectedDesign !== "scratch" && (
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-emerald-400/20 bg-emerald-400/[0.04] p-3 sm:p-4">
                <div className="w-24 shrink-0 overflow-hidden rounded-lg border border-ink/10 sm:w-32">
                  <TemplateThumb
                    src={
                      designKey
                        ? `/samples/${preset}?embed=1&design=${designKey}${photoId ? `&img=${photoId}` : ""}`
                        : `/samples/${preset}?embed=1&style=${selectedStyle}`
                    }
                    aspect={0.62}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-accent/70">You&apos;re building</p>
                  <p className="mt-1 font-semibold leading-tight">{selected.label}</p>
                  <p className="text-sm text-ink/45">{designKey ? `${titleCase(designKey)} design` : `${titleCase(selectedStyle)} design`}</p>
                  <button
                    type="button"
                    onClick={() => goToStep(0)}
                    className="mt-1.5 text-sm text-ink/50 underline-offset-4 transition hover:text-ink hover:underline"
                  >
                    Change
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              <div>
                <label className="text-sm font-medium">Business name</label>
                <input name="business_name" required pattern={BUSINESS_NAME_PATTERN} title={BUSINESS_NAME_HINT} className={input} placeholder="Tamara Cosmetics" />
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

            {/* Terms acceptance — required before the account can be created. */}
            <label className="mt-6 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-ink/60">
              <input
                type="checkbox"
                name="terms"
                required
                className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded border-ink/25 bg-ink/[0.03] text-accent accent-emerald-500 focus:ring-emerald-400/40"
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" target="_blank" className="text-ink/80 underline underline-offset-2 hover:text-ink">
                  Terms &amp; Conditions
                </Link>{" "}
                and{" "}
                <Link href="/privacy" target="_blank" className="text-ink/80 underline underline-offset-2 hover:text-ink">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
              <button type="button" onClick={() => setStep(preset === "other" ? 0 : 1)} className="text-sm text-ink/45 transition hover:text-ink">
                Back
              </button>
              <SubmitButton className="rounded-xl bg-ink px-7 py-3 text-sm font-semibold text-paper transition hover:bg-ink/90" pendingText="Creating your site...">
                Create my site
              </SubmitButton>
            </div>

            {/* Trust strip — reassurance at the commitment point. */}
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-ink/45">
              {["No setup fee", "Cancel anytime", "Live in 5 minutes", "150+ designs"].map((t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <svg className="h-3.5 w-3.5 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <path d="M5 12.5l4.5 4.5L19 7" />
                  </svg>
                  {t}
                </li>
              ))}
            </ul>

            <p className="mt-5 text-center text-xs text-ink/30">
              Already have an account? <Link href="/login" className="text-ink/60 hover:text-ink">Sign in</Link>
            </p>
          </div>
        )}
      </div>

      {/* Live pop-out preview — a faux browser window (not full screen) so you can
          look around the real site before choosing. */}
      {preview && selected && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-paper/75 p-4 backdrop-blur-sm sm:p-8"
          onClick={() => setPreview(null)}
        >
          <div
            className="flex max-h-[88vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-ink/15 bg-panel shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-ink/10 bg-ink/[0.03] px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              </div>
              <div className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-2 truncate rounded-md bg-paper/40 px-3 py-1.5 text-xs text-ink/50">
                <svg className="h-3 w-3 shrink-0 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M5 11V7a5 5 0 0 1 10 0v4" transform="translate(2)" /><rect x="4" y="11" width="16" height="9" rx="2" /></svg>
                yourname.kovasite.com
              </div>
              {/* device toggle */}
              <div className="hidden items-center gap-1 rounded-md bg-paper/40 p-0.5 sm:flex">
                {(["desktop", "mobile"] as const).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setPreviewDevice(d)}
                    className={`rounded px-2.5 py-1 text-xs capitalize transition ${previewDevice === d ? "bg-ink/15 text-ink" : "text-ink/45 hover:text-ink"}`}
                  >
                    {d}
                  </button>
                ))}
              </div>
              <button type="button" onClick={() => setPreview(null)} aria-label="Close preview" className="rounded-md p-1 text-ink/50 transition hover:bg-ink/10 hover:text-ink">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden><path d="M6 6l12 12M18 6L6 18" /></svg>
              </button>
            </div>

            {/* Live site — edge to edge on desktop; phone frame only on mobile */}
            <div className={`flex-1 overflow-auto ${previewDevice === "mobile" ? "bg-panel p-4 sm:p-6" : "bg-ink"}`}>
              <div className={`mx-auto h-full overflow-hidden transition-all ${previewDevice === "mobile" ? "w-[390px] rounded-[2.2rem] border-[8px] border-neutral-900 bg-ink shadow-2xl" : "w-full"}`}>
                <iframe
                  key={`${preview.design}-${previewDevice}`}
                  src={`/samples/${preset}?embed=1&design=${preview.design}${preview.img ? `&img=${preview.img}` : ""}`}
                  title={`${titleCase(preview.design)} preview`}
                  className="block h-full w-full border-0"
                  style={{ minHeight: previewDevice === "mobile" ? 680 : 560 }}
                />
              </div>
            </div>

            {/* Footer: choose */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-ink/10 bg-ink/[0.03] px-4 py-3">
              <div className="min-w-0">
                <p className="truncate font-semibold text-ink">{titleCase(preview.design)}</p>
                <p className="truncate text-xs text-ink/45">Scroll and click around — this is the live {selected.label.toLowerCase()} site</p>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPreview(null)} className="rounded-xl border border-ink/15 px-4 py-2.5 text-sm text-ink/70 transition hover:text-ink">
                  Keep looking
                </button>
                <button
                  type="button"
                  onClick={() => { chooseDesignKey(preview.design, preview.img); setPreview(null); }}
                  className="rounded-xl bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-neutral-950 transition hover:bg-emerald-300"
                >
                  Choose this design
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
