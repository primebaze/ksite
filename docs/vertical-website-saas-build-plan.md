# Build Plan: "Website as a Service" Platform

**Stack:** Next.js (App Router) · Supabase (Postgres + Auth + Storage) · Vercel (hosting) · **Cloudflare for SaaS** (customer domains + SSL) · Stripe (billing)
**The platform:** one codebase that serves many client sites, each on its own domain, all driven by data, **industry-agnostic by design.**
**Go-to-market:** generic engine, **three launch presets: restaurants & cafes, local trades (plumber/electrician/roofer), and salons & beauty.** Build the engine once; polish whichever vertical lands the first paying client. Add more presets (clinics, law firms…) later.
**v1 offer:** three tiers, Basic £99 / Standard £199 / Premium £349 per month. All-inclusive (site + hosting + domain), no setup fee, no contract.
**v1 editing model:** concierge. You edit via an admin panel; clients text you changes. (Menu editing is the first thing to make near-self-serve; see ops note.)

---

## The strategy: generic engine, focused launch

**Serve everyone, but not all at once.** The engine doesn't care what industry a tenant is in: a `preset` field + JSON content + generic repeating tables (`menu_items`, `team`, `gallery`) can model a restaurant, a clinic, a plumber, or a law firm. You build that engine **once.**

What you *don't* do is launch a do-anything template that's mediocre at everything. You go to market with **one vertical done brilliantly**, prove people pay, then clone the proven playbook into the next preset. Each new vertical is just: a template design + a section list + default copy + compliance notes. The platform underneath never changes.

**Three presets at launch: restaurants, trades, salons.** Each is a polished, bespoke-feeling template (not a generic builder) sharing one engine. Restaurants are the hardest to run profitably (see risks); trades and salons score higher on margin and clear ROI, so launching all three de-risks go-to-market. If one vertical is slow, the others are already live. Don't gold-plate all three before a paying client; finish polish on whichever sells first.

---

## What this MVP is, and isn't

**Is:** the platform engine + **one beautiful restaurant preset.** You onboard and edit clients yourself.

**Isn't (yet):** a drag-and-drop builder, multiple presets live at once, a full client-facing editor, or a marketing site with self-serve signup. All deferred until restaurants are proven.

**Guiding rule:** build a thin *vertical slice* first (one real-looking site, live on a custom domain, served from the database) before polishing admin or billing. That slice proves the whole architecture works and de-risks everything after it.

---

## Why restaurants, and the two risks, handled

Restaurants are high-volume and visibly need good sites, but they're the **hardest vertical to run profitably** on a managed model. Both risks have built-in fixes:

1. **Thin margins / price sensitivity.** Don't sell "a nice website." Sell **money saved and covers filled:** direct reservations and direct online orders that **dodge the 15–30% commission** Deliveroo / Just Eat / Uber Eats / OpenTable take. A handful of direct orders a month pays for the whole subscription. That's the ROI hook and the churn defence. Lead with **Basic £99**; let savings justify the step up.

2. **Menus change constantly = edit-burden eats your time.** This is the operational killer for a concierge model. Fixes baked into the plan: model the menu as **clean structured data** (so an update is fast, not a redesign), bound it in pricing ("monthly/seasonal menu refresh included"), and make the **menu editor the first piece of self-serve** you ship: give restaurants a locked-down screen that edits *only* the menu, nothing else. Everything else stays concierge.

---

## Architecture decisions (lock these before Phase 1)

1. **Domain strategy: Cloudflare for SaaS, not the Vercel Domains API.**
   You'll attach *many* customer-owned domains to *one* app, exactly what Cloudflare for SaaS (Custom Hostnames + SSL for SaaS) is built for: customer points a CNAME at your app, Cloudflare issues + auto-renews per-hostname SSL, scales to thousands cheaply. **Verify Vercel's current per-domain pricing/limits before relying on it.** Its per-project model gets costly at volume. Keep Vercel for *hosting the app*; put *customer domains* in front via Cloudflare. (Register/buy client domains via Cloudflare Registrar at cost.) This is the single most important decision; see Phase 2.

2. **Rendering: static/ISR with per-tenant cache tags.**
   Pages render statically; revalidate on-demand when *that tenant's* content changes (`revalidateTag('tenant:<id>')`). Fast sites, near-zero Supabase reads regardless of traffic. Tag every tenant fetch so one edit never rebuilds another's pages.

3. **Tenant resolution: middleware maps hostname → tenant.**
   Middleware reads the `Host` header, resolves it to a tenant (subdomain *or* custom domain), rewrites to the tenant-scoped route. Cache the hostname→tenant lookup (edge cache / KV) so it doesn't hit the DB per request.

4. **Data access: server reads via service role; RLS as defense-in-depth.**
   The public site renders server-side with a Supabase **service role** key, which *bypasses* RLS, so correct tenant-scoped queries are the real guard. Enable RLS on every table anyway so the **admin panel** (authenticated JWTs) and any future client-facing editor can never read across tenants.

5. **One repo, one Vercel project, environment-driven.** No per-client branches or deploys. Everything is data. Presets are template code selected by the tenant's `preset` field.

---

## Data model (generic engine, restaurant-mapped)

A `tenants` table + a flexible `site_content` JSONB column, relational tables only for repeating items. The tables are deliberately generic; the *restaurant meaning* is in brackets. Every table gets `created_at`/`updated_at` (trigger-maintained) and indexed `tenant_id`. **RLS on all of them from day one.**

```
tenants
  id                uuid pk
  business_name     text
  preset            text default 'restaurant'   -- the engine is preset-driven
  subdomain         text unique                 -- clientname.yourapp.com
  custom_domain     text unique null
  domain_status     text                        -- pending | verifying | active | error
  published         boolean default false       -- draft vs live
  plan              text                        -- basic | standard | premium
  plan_status       text default 'trialing'     -- trialing | active | past_due | suspended | canceled
  stripe_customer_id      text null
  stripe_subscription_id  text null
  meta_title        text null                   -- SEO
  meta_description  text null
  og_image_url      text null
  favicon_url       text null
  analytics_id      text null                   -- GA4 / Plausible
  created_at        timestamptz default now()
  updated_at        timestamptz default now()

themes
  tenant_id   uuid fk
  logo_url, primary_color, accent_color, font

site_content                  -- one JSONB row per tenant: the loose stuff
  tenant_id   uuid fk
  content     jsonb
    -- restaurant keys: hero, story/about, cuisine_type,
    --   hours (structured per-day), address, map, phone,
    --   reservation_url, ordering_links {deliveroo, ubereats, justeat, direct},
    --   socials (Instagram matters most), private_hire, gift_vouchers

menu_items                    -- THE core table for restaurants (was 'services')
  id, tenant_id
  menu_name      text          -- Lunch | Dinner | Drinks | Specials
  category       text          -- Starters | Mains | Desserts...
  name, description, price
  dietary        text[]        -- veg, vegan, gf...
  allergens      text[]        -- food-info / allergen norms (display, see compliance)
  is_available   boolean
  sort_order, updated_at

gallery                       -- food + interior shots; huge for restaurants
  id, tenant_id, image_url, caption, sort_order, updated_at

team                          -- optional for restaurants (chef/owner story); keep generic for other presets
  id, tenant_id, name, role, photo_url, sort_order, updated_at

leads                         -- contact form / email capture / enquiries
  id, tenant_id, name, email, phone, message, source, created_at

domain_events                 -- audit trail for the risky bit
  id, tenant_id, event, detail, created_at
```

The model stays generic so the *next* preset reuses it (`menu_items` becomes a clinic's `services`, `team` becomes its practitioners). Restaurant specifics live in `site_content` keys, `menu_items`, and the template, not in new tables.

---

## Cross-cutting concerns (don't bolt these on at the end)

**Security & tenant isolation.** RLS everywhere (decision #4). Service role key server-only, never in the browser. Admin reads through RLS-scoped policies.

**Food-info / allergen norms (restaurant compliance).** UK rules expect clear **allergen and dietary information** for food (FSA guidance; the Natasha's Law context for labelling). The template should make it easy to show allergen/dietary tags per dish, hence the `allergens`/`dietary` fields. Keep a default "allergen info available on request" line. Lighter legal weight than medical, but get it right: it's a trust and safety signal diners look for.

**GDPR / data protection.** Reservations, contact forms, and email capture process personal data.
- Ship a **privacy policy + cookie consent** (analytics fires only after consent).
- You're a **data processor** for clients, so keep a **DPA** template + sub-processor list (Vercel, Supabase, Cloudflare, Stripe, booking/ordering providers).
- Give `leads` data a retention story.

**Ops, backup & monitoring (lightweight, present before real clients).**
- **Uptime monitor** on live client domains. A down site at dinner rush = lost covers and an angry call.
- **Verify Supabase backups restore** (test a restore once).
- **Error tracking** (Sentry) + a basic status/incident note for clients.
- **Runbook:** domain stuck verifying, webhook missed, site down, client wants to leave.

**Capacity, and why the menu editor matters.** Concierge labour is your bottleneck, and **menus are the highest-frequency edit in any vertical.** Track minutes/edit and edits/client/month. The menu self-serve screen (Phase 4+) is what keeps restaurants profitable as you scale, so prioritise it over a general editor.

---

## Phase 0: Foundations (before any code)

**Goal:** decisions locked, accounts ready.

- Write the **restaurant preset's** sections in order: hero/ambiance → menu(s) → reservations → online ordering → gallery → hours & map → reviews → about/story → events/private hire → contact.
- Lock the five **architecture decisions** above (especially domains).
- Set pricing tiers (below).
- Create accounts: GitHub repo, Vercel project, Supabase project, **Cloudflare account**, Stripe account.
- Pick the **reservation** + **ordering** embeds to support first (e.g. ResDiary/OpenTable for booking; direct-order link + Deliveroo/Just Eat/Uber Eats links).
- Buy two domains: your app domain and a **throwaway test domain** for proving the custom-domain flow.
- Draft compliance + privacy boilerplate (allergen/dietary display, privacy policy, DPA).

**Done when:** you can list every section the restaurant site needs, the five decisions are written down, and all accounts exist.

---

## Phase 1: The rendering engine

**Goal:** one hardcoded tenant renders from the database.

- Scaffold Next.js (App Router), connect Supabase.
- Build **middleware** that resolves the incoming hostname → tenant (cached lookup).
- Create `tenants` + content tables; **enable RLS**; seed one fake restaurant by hand (a menu, hours, gallery).
- Render that restaurant's homepage entirely from its DB row, proving data → page end to end.
- Wire **static/ISR with per-tenant cache tags** + **on-demand revalidation**. **Spike this explicitly:** prove an edit to tenant A revalidates only A.

**Done when:** your dev URL shows a real restaurant page built entirely from DB data, and editing that tenant's row revalidates its page (and only its page).

---

## Phase 2: Custom domains (the fiddly bit, do it early)

**Goal:** connect *or* register a client's domain and have it go live with SSL automatically, by API, with the client never forced to touch DNS.

> The single highest-risk piece. If Phases 1–2 work as a slice, the rest is ordinary web-app work.

**Use Cloudflare for SaaS** (decision #1):

1. **Wildcard subdomains first:** `clientname.yourapp.com` resolves to the right tenant.
2. **Client owns a domain →** create a **Custom Hostname** via the Cloudflare for SaaS API, they add one **CNAME** (or hand you the nameservers for zero friction), Cloudflare issues + auto-renews SSL.
3. **Client needs a new domain →** register it for them (Cloudflare Registrar, at cost), attach the same way.
4. **Persist `domain_status`** through `pending → verifying → active`; log to `domain_events`.

**Hold client domains under your account** for the "domain managed" promise, but with **no contract**, design the **transfer-out runbook now** (EPP/auth code, registrar transfer, the 60-day ICANN transfer lock, clean hostname removal). A clean exit is a selling point.

Run the **whole flow on your throwaway domain** before any real client depends on it; write plain-English DNS instructions for bring-your-own-domain.

**Done when:** you can take a domain (yours or the client's) from nothing to "live with HTTPS" by API, no hand-edited config, done once for real, and documented how to hand back.

---

## Phase 3: The restaurant preset (your differentiator)

**Goal:** one genuinely beautiful, conversion-focused restaurant template.

- Build the full template against the Phase 0 section list. This is the design edge: the best-looking restaurant site in the niche, not a generic theme. Big, appetising imagery; menu that's a pleasure to read on mobile.
- Fully **theme-driven**: logo, colours, fonts from data.
- **Embed, don't build:** **reservations** (ResDiary / OpenTable / Cal.com), **online ordering** (direct link + the delivery platforms), **reviews** (Google / TripAdvisor), Instagram feed.
- **Menu UX is the centrepiece:** render `menu_items` grouped by `menu_name`/`category`, with dietary/allergen tags, "unavailable" handling, and multiple menus (lunch/dinner/drinks). Mobile-first; most diners are on a phone.
- Bake in **SEO** (schema.org `Restaurant`/`Menu`, hours, location, sitemap) and **performance** (image optimisation, green Core Web Vitals), what Standard/Premium sell.
- Drop in **privacy policy, cookie consent, allergen/dietary display.**

**Done when:** swapping a tenant's content + theme + menu produces a polished, fast, SEO-clean restaurant site you'd be proud to show, with the menu looking great on mobile.

---

## Phase 4: Admin panel + menu self-serve

**Goal:** you can create and fully edit any client without touching code, and the **menu** is near-frictionless.

- **Supabase Auth** for you/your team; RLS-scoped access.
- CRUD over `site_content`, `menu_items`, gallery, theme, **SEO fields**, **publish/unpublish**.
- A **"create new client"** flow: name → preset (restaurant) → subdomain → empty draft ready to fill.
- **Image uploads** to Supabase Storage (resized).
- Surface **`domain_status`** + a button to start/re-check the Phase 2 attach flow.
- Show recent **`leads`** per tenant.
- **Menu self-serve (priority):** a locked-down screen the *restaurant* can use to edit only their menu: add/remove dishes, change prices, mark sold-out, reorder. This is the one piece of client-facing editing worth building early, because menus are the edit treadmill. Everything else stays concierge.

**Done when:** you can stand up a restaurant, fill every part, attach a domain, publish (all from one dashboard) and a client can update their own menu without you.

---

## Phase 5: Billing + go-live (keep it minimal)

**Goal:** money in, plan status controls the site, without over-building for 1–3 clients.

- Stripe **subscriptions** via **Checkout**.
- **Webhook** updates `plan_status`/`stripe_subscription_id`. Verify signatures, make handlers **idempotent**, add a manual **"re-sync from Stripe"** button (don't assume every webhook arrives).
- Gate sites on status: `past_due`/`suspended` → **holding page**.
- **Pragmatic launch shortcut:** for the first 1–3 clients, suspend **manually** from admin and defer hard webhook gating. Reaching paying clients matters more than perfect billing automation.
- Simple **onboarding intake** (Typeform / shared doc) to collect menu, hours, photos, booking/ordering links.

**Done when:** a client can be charged monthly, and non-payment visibly affects their site (auto, or one-click manual suspend for now).

---

## Phase 6: First clients & validation

**Goal:** prove people pay and onboarding works.

- Land **1–3 restaurants** (start with one you can already get on the phone), cheap/free for a testimonial + case study.
- Onboard for real; time it (feeds capacity numbers). Fix the intake → live pipeline.
- Stand up **lightweight ops** (uptime, error tracking, tested backup) now real covers depend on the sites.
- Only after this: consider a **second preset** (clinics/trades/salons), expand the **self-serve editor** beyond menus, or **move hosting to Hetzner + Coolify + Cloudflare** to cut cost. Don't optimise hosting before you have margins to optimise.

**Done when:** at least one real restaurant site is live, paid, monitored, and you'd happily repeat it.

---

## Deliberately deferred (resist until Phase 6+)

- Second preset / multiple verticals live at once
- Full self-serve editor (beyond the menu screen)
- Public marketing site with automated signup
- Migrating off Vercel to your own infra
- Anything described as "and then it scales to thousands"

---

## Pricing: three tiers (restaurant framing)

Every plan includes a beautiful bespoke-feel site, hosting, **domain managed**, SSL, mobile-fast performance, menu, and embedded reservations. **No setup fee. No contract, cancel anytime.** What changes across tiers is how hard the site works to fill tables and drive direct orders.

### Basic: £99/month. *"Look the part, take bookings, own your orders."*
For independents getting online properly.
- Beautiful site + hosting + managed domain + SSL
- Full menu (mobile-perfect) + reservations embedded + Google reviews
- **Direct ordering link** so you keep more of every order instead of paying delivery commission
- Monthly menu/content refresh, just text us your changes
- **Why start:** a proper web presence for less than one busy table a month, and direct orders that dodge 15–30% delivery fees.

### Standard: £199/month. *"Get found and fill tables."* (most popular)
For places that want the site actively bringing diners in.
- Everything in Basic, plus:
- Priority edits (48-hour turnaround) + **self-serve menu editor**
- Local SEO + Google Business Profile optimisation
- Review-collection automation (turn happy diners into 5-star reviews)
- Email capture for offers, events, and bookings
- Events / private-hire / functions page
- **Why start:** a single recurring private booking or a steady trickle of direct orders more than covers it.

### Premium: £349/month. *"Your done-for-you marketing engine."*
For groups and growth-focused venues that want it hands-off.
- Everything in Standard, plus:
- Multiple locations
- Monthly social-ready content + seasonal campaign pages (Christmas menus, Valentine's, etc.)
- Gift vouchers + loyalty/email marketing
- Priority same-day support
- Analytics dashboard + monthly performance report
- Annual design refresh
- **Why start:** the output of a part-time marketing team for a fraction of an agency retainer.

**Steer most clients to Standard.** Basic gets them in the door; Premium anchors the top so Standard reads as the sensible middle.

**Two honest notes:**
- *No contract* means retention rests on the site doing real work: **direct orders, reservations, covers.** Make those visible and cancelling hurts them; that's your churn defence.
- Premium's extras (social, campaigns, reporting) are recurring *labour*. Templatise and batch them, and watch your **capacity numbers** so £349 stays worth your time.

---

## The critical path, in one line

**Phase 1 + 2 as a single slice first** (one DB-driven restaurant site live on a real domain via Cloudflare for SaaS) → then the beautiful, mobile-perfect restaurant preset → then admin + the self-serve **menu editor** → then minimal billing → then real restaurants. Everything hard is front-loaded into the slice; everything after it is execution. Prove restaurants, then add the next preset.
