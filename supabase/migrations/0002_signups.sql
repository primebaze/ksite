-- Marketing-site signups / "get started" enquiries. Not tied to a tenant, so
-- it's its own table (the leads table is for a tenant's own contact forms).
-- Anon may submit (with check true) but never read back — same posture as leads.

create table signups (
  id            uuid primary key default gen_random_uuid(),
  name          text,
  email         text,
  business_name text,
  business_type text,
  message       text,
  created_at    timestamptz not null default now()
);

alter table signups enable row level security;

create policy "anon submits signups" on signups
  for insert to anon with check (true);

grant insert on signups to anon;
