# Kovasite

My take on "websites as a service" for local businesses. It's self-serve: a
client signs up, fills in their details, and gets a site they can publish on
their own subdomain by subscribing. One Next.js app serves every client site,
and everything on a site comes out of the database instead of hardcoded markup.

It ships with three looks: restaurants, trades and salons. Each is a template
reading the same shared data, so adding another kind of business is mostly a
design job rather than a rebuild. I can still jump into any client from an
operator admin when someone needs a hand.

## Running it locally

```
npm install
npm run dev
```

Then open:

- http://localhost:3000 — the Kovasite marketing site
- http://nonna.localhost:3000 — a demo restaurant
- http://swift.localhost:3000 — a demo plumber
- http://lumiere.localhost:3000 — a demo salon

Browsers send `*.localhost` to 127.0.0.1 on their own, so the subdomains just
work with no hosts-file fiddling. With no Supabase env set it falls back to the
sample data in `lib/mock-data.ts`, so it runs with zero setup.

## Pointing it at Supabase

Copy the env file and fill it in:

```
cp .env.example .env.local
```

The public site uses the publishable (anon) key. The secret key is for the
operator admin and the Stripe webhook. Then, in the Supabase SQL editor, run the
migrations in order:

- `supabase/migrations/0001_init.sql` — core schema + RLS
- `supabase/migrations/0002_signups.sql` — marketing signups table
- `supabase/migrations/0003_self_serve.sql` — client ownership + RLS
- `supabase/seed.sql` — the three demo sites (optional)

Two Supabase settings for the self-serve flow: turn **off** "Confirm email"
under Auth so signup is one step, and add my email to `STAFF_EMAILS` so I get
the admin instead of a client dashboard.

## How it works

A request comes in, `proxy.ts` reads the hostname and figures out which tenant
it belongs to (a subdomain like `nonna`, or a client's own domain). It rewrites
to `app/sites/[host]`, which loads that tenant's data and renders the matching
template. The public site only touches the publishable key, and RLS keeps it to
published tenants and their public content.

Each tenant has an owner. A signed-in client manages only their own site, with
their own session — RLS enforces it, so the dashboard never uses the operator
key. Publishing goes through Stripe: the client picks a plan, pays, and the
webhook flips their site live and stores the Stripe IDs in a table the anon key
can't read.

Where things live, for when I forget:

- `proxy.ts` — hostname to tenant
- `lib/tenant.ts` — loading a public site's data (cached, with the demo fallback)
- `lib/my-site.ts` — a client's own data + edits (their RLS-scoped session)
- `lib/supabase.ts` — the two clients, public (anon) vs admin (secret)
- `lib/stripe.ts` — Stripe client + plan/price lookup
- `app/(marketing)` — the Kovasite site + signup (`/get-started`) and login
- `app/dashboard` — where a client edits and publishes their own site
- `app/admin` — operator override (staff only) to edit any client
- `app/api/stripe/webhook` — payment succeeded → publish the site
- `app/sites/[host]` — the actual client sites
- `presets/` — the restaurant, trades and salon templates
- `supabase/` — schema, RLS, migrations and seed

## Still to do

- Custom domains through Cloudflare so clients can use their own
- Image uploads (currently photo fields take URLs)
- Tidy-ups: session refresh in middleware, multiple sites per account

Longer plan is in `docs/vertical-website-saas-build-plan.md`.
