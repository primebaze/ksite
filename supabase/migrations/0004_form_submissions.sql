-- ============================================================================
-- Form submissions: bookings + contact enquiries from a tenant's built-in
-- forms, stored so the owner can manage them from their dashboard. The public
-- form API inserts via the service key (bypasses RLS); the signed-in owner can
-- read + update (mark read/archived) + delete only their own.
-- ============================================================================

create table form_submissions (
  id          uuid primary key default gen_random_uuid(),
  tenant_id   uuid not null references tenants(id) on delete cascade,
  kind        text not null check (kind in ('booking', 'contact')),
  payload     jsonb not null default '{}'::jsonb,   -- { lines: [{label, value}] }
  reply_to    text,                                  -- customer's phone/email, for one-tap reply
  status      text not null default 'new' check (status in ('new', 'read', 'archived')),
  created_at  timestamptz not null default now()
);

create index form_submissions_tenant_idx on form_submissions (tenant_id, created_at desc);

alter table form_submissions enable row level security;

-- Owners read / update / delete their own. Inserts come from the server
-- (service key, bypasses RLS), so there is no insert policy for authenticated.
create policy "owner reads own submissions" on form_submissions
  for select to authenticated using (owns_tenant(tenant_id));
create policy "owner updates own submissions" on form_submissions
  for update to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));
create policy "owner deletes own submissions" on form_submissions
  for delete to authenticated using (owns_tenant(tenant_id));

grant select, update, delete on form_submissions to authenticated;
