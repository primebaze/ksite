-- ============================================================================
-- Website-as-a-Service — initial schema
-- Generic, preset-driven engine. One set of tables serves restaurant, trades,
-- salon (and any future preset). RLS on from day one.
-- ============================================================================

create extension if not exists "pgcrypto";

-- updated_at trigger ---------------------------------------------------------
create or replace function set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- tenants --------------------------------------------------------------------
create table tenants (
  id                     uuid primary key default gen_random_uuid(),
  business_name          text not null,
  preset                 text not null default 'restaurant',
  subdomain              text not null unique,
  custom_domain          text unique,
  domain_status          text not null default 'pending',
  published              boolean not null default false,
  plan                   text,
  plan_status            text not null default 'trialing',
  -- NOTE: Stripe identifiers live in tenant_billing (below), NOT here, so the
  -- public/anon key (which can read published tenants) can never see them.
  meta_title             text,
  meta_description       text,
  og_image_url           text,
  favicon_url            text,
  analytics_id           text,
  created_at             timestamptz not null default now(),
  updated_at             timestamptz not null default now()
);
create index tenants_subdomain_idx on tenants (subdomain);
create index tenants_custom_domain_idx on tenants (custom_domain);
create trigger tenants_updated_at before update on tenants
  for each row execute function set_updated_at();

-- themes (one row per tenant) ------------------------------------------------
create table themes (
  tenant_id     uuid primary key references tenants(id) on delete cascade,
  logo_url      text,
  primary_color text not null default '#111111',
  accent_color  text not null default '#c8a24a',
  font          text,
  updated_at    timestamptz not null default now()
);
create trigger themes_updated_at before update on themes
  for each row execute function set_updated_at();

-- site_content (one JSONB blob per tenant) -----------------------------------
create table site_content (
  tenant_id  uuid primary key references tenants(id) on delete cascade,
  content    jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);
create trigger site_content_updated_at before update on site_content
  for each row execute function set_updated_at();

-- catalog_items (generic repeating item: menu dish / service / treatment) ----
create table catalog_items (
  id           uuid primary key default gen_random_uuid(),
  tenant_id    uuid not null references tenants(id) on delete cascade,
  section      text,
  category     text,
  name         text not null,
  description  text,
  price        text,
  tags         text[] not null default '{}',
  is_available boolean not null default true,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);
create index catalog_items_tenant_idx on catalog_items (tenant_id, sort_order);
create trigger catalog_items_updated_at before update on catalog_items
  for each row execute function set_updated_at();

-- gallery --------------------------------------------------------------------
create table gallery (
  id         uuid primary key default gen_random_uuid(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  image_url  text not null,
  caption    text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index gallery_tenant_idx on gallery (tenant_id, sort_order);
create trigger gallery_updated_at before update on gallery
  for each row execute function set_updated_at();

-- team (optional per preset; key for salon, lighter for others) --------------
create table team (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  name        text not null,
  role        text,
  credentials text,
  photo_url   text,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);
create index team_tenant_idx on team (tenant_id, sort_order);
create trigger team_updated_at before update on team
  for each row execute function set_updated_at();

-- leads (contact form / enquiries / quote requests) --------------------------
create table leads (
  id         uuid primary key default gen_random_uuid(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  name       text,
  email      text,
  phone      text,
  message    text,
  source     text,
  created_at timestamptz not null default now()
);
create index leads_tenant_idx on leads (tenant_id, created_at desc);

-- domain_events (audit trail for the high-risk custom-domain flow) -----------
create table domain_events (
  id         uuid primary key default gen_random_uuid(),
  tenant_id  uuid not null references tenants(id) on delete cascade,
  event      text not null,
  detail     jsonb,
  created_at timestamptz not null default now()
);
create index domain_events_tenant_idx on domain_events (tenant_id, created_at desc);

-- tenant_billing (sensitive) — kept OUT of the tenants table so the public
-- anon key can never read Stripe identifiers. Admin/webhooks only (no anon
-- policy → default deny).
create table tenant_billing (
  tenant_id              uuid primary key references tenants(id) on delete cascade,
  stripe_customer_id     text,
  stripe_subscription_id text,
  updated_at             timestamptz not null default now()
);
create trigger tenant_billing_updated_at before update on tenant_billing
  for each row execute function set_updated_at();

-- ============================================================================
-- Row Level Security — least privilege
-- The PUBLIC SITE renders with the PUBLISHABLE (anon) key, which is fully
-- RLS-enforced. The policies below expose ONLY published tenants and their
-- public content, and allow anonymous lead submissions — nothing else. Even
-- if the publishable key leaks, it can read only what's already public.
-- The SECRET (service_role) key bypasses RLS and is reserved for the admin
-- panel + Stripe webhooks (cross-tenant reads/writes); no policies needed.
-- ============================================================================
alter table tenants        enable row level security;
alter table themes         enable row level security;
alter table site_content   enable row level security;
alter table catalog_items  enable row level security;
alter table gallery        enable row level security;
alter table team           enable row level security;
alter table leads          enable row level security;
alter table domain_events  enable row level security;
alter table tenant_billing enable row level security;

-- Anon may read published tenants (business name, theme, content are public by
-- nature — they're shown on a public website). Drafts (published = false) stay
-- invisible until launch.
create policy "anon reads published tenants" on tenants
  for select to anon using (published = true);

-- Child content readable when the parent tenant is published. The subquery is
-- evaluated under the tenants policy above, so only published parents match.
create policy "anon reads published themes" on themes
  for select to anon using (exists (
    select 1 from tenants t where t.id = themes.tenant_id and t.published));
create policy "anon reads published content" on site_content
  for select to anon using (exists (
    select 1 from tenants t where t.id = site_content.tenant_id and t.published));
create policy "anon reads published catalog" on catalog_items
  for select to anon using (exists (
    select 1 from tenants t where t.id = catalog_items.tenant_id and t.published));
create policy "anon reads published gallery" on gallery
  for select to anon using (exists (
    select 1 from tenants t where t.id = gallery.tenant_id and t.published));
create policy "anon reads published team" on team
  for select to anon using (exists (
    select 1 from tenants t where t.id = team.tenant_id and t.published));

-- Contact forms: anon may submit a lead but never read them back.
create policy "anon submits leads" on leads
  for insert to anon with check (true);

-- Explicit grants (RLS still gates rows; grants gate table access).
grant select on tenants, themes, site_content, catalog_items, gallery, team to anon;
grant insert on leads to anon;
-- tenant_billing, domain_events, and leads SELECT: no anon grant/policy → denied.
