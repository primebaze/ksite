# Handoff notes

_Last updated: 2026-06-11 · branch `claude/homepage-reloading-bug-jysul3` (fast-forward merged into `main`)._

A running note so another chat can carry the work on. This is the **kovasite**
multi-tenant website builder (Next.js 16 App Router). See `AGENTS.md` /
`CLAUDE.md` for the house rules (read the bundled Next.js docs before writing
framework code; this is not stock Next.js).

## Workflow
- Develop on `claude/homepage-reloading-bug-jysul3`, commit (author Bazeflix).
- The user pushes to `origin/main` concurrently, so **always**
  `git fetch origin` + `git rebase origin/main` before pushing.
- Then: push branch → `git checkout main` → `git merge --ff-only <branch>` →
  `git push origin main` → `git checkout <branch>`.
- Verify before every push: `npx tsc --noEmit` and `npm run build` (both must be
  clean). For visual checks: `PORT=<n> npm run start` in the background +
  playwright-core/@sparticuz/chromium screenshots. Use host `localhost` (not
  `127.0.0.1`) because of proxy host routing. Unsplash is blocked in the sandbox,
  so remote images render blank — use local `/hero/*.mp4` and check structure.

## ✅ Recently shipped (pricing + marketing pass)
- **One plan only.** Removed Basic/Standard/Premium tiers. Single plan: **£99/mo**
  or **2 months free yearly** (£990/yr ≈ £82.50/mo, save £198). Lives in
  `lib/marketing.ts` (`PLAN`, `gbp()`), `components/PricingPlan.tsx` (monthly/yearly
  toggle), pricing page, homepage `LiveExamples` panel.
- **Free domain included** copy added across hero, features, pricing, publish flow.
- **In-app checkout** (`app/dashboard/publish/page.tsx` + `app/dashboard/actions.ts`
  + `lib/stripe.ts`) now offers the single plan billed monthly/yearly via a
  `period` field. Stored `plan` stays `"basic"` so existing subscribers and the
  webhook/enum are untouched.
- Marketing copy: "live in ~5 minutes" (was "in a day"); reframed "no dashboard"
  → there IS an easy tap-any-text-to-edit dashboard.
- New **Support** page; redesigned **Features** & **How it works** pages.
- Homepage mobile **features scroll** rewritten to be scroll-linked (continuous
  crossfade, no stale steps, no gap) — `components/FeatureBento.tsx`.
- Hero: "Website / For Businesses: …" rotator (incl. Restaurants); faded reel
  text; boxing videos swapped for restaurant footage; required **Terms &
  Conditions** checkbox on get-started signup.

## ⏳ What's left to do
1. **Stripe — create the yearly price (action required, user's Stripe account).**
   - Create a recurring **£990/year** price in Stripe and set env
     `STRIPE_PRICE_YEARLY`.
   - Confirm the monthly £99 price env is set: code reads `STRIPE_PRICE_MONTHLY`
     and falls back to `STRIPE_PRICE_BASIC` (`lib/stripe.ts → priceForBilling`).
   - Until `STRIPE_PRICE_YEARLY` is set, the yearly button works but checkout
     redirects with `?error=Yearly+billing+is+not+configured+yet` (graceful).
2. **Run the Supabase migration for the Enquiries inbox.**
   - `supabase/migrations/0004_form_submissions.sql` (creates `form_submissions`).
   - Not yet applied; the contact-form/Enquiries feature needs it.
3. **Optional / nice-to-have**
   - More restaurant clips for the hero reel — external video hosts (Pexels/Mixkit/
     Coverr) are blocked in this sandbox, so they couldn't be downloaded/verified
     here. If wanted, download into `public/hero/` (verify on the live Vercel
     deploy) rather than hot-linking.
   - `priceForPlan()` in `lib/stripe.ts` is now unused (kept for safety); can be
     removed once confirmed nothing else references it.

## Note on the "build failed" screenshot (not us)
A Vercel build failure the user saw (`/admin/admin/leaderboard`,
`/admin/admin/progress`, Postgres `57014`) is from a **different project** — those
routes/tables don't exist in this repo. kovasite's builds are clean.
