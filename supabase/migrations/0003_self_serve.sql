-- ============================================================================
-- Self-serve: a tenant belongs to the auth user who created it. Clients sign
-- in and manage ONLY their own site, with their own session (RLS-enforced) —
-- no operator key involved. The operator's service key still bypasses RLS for
-- the /admin override.
-- ============================================================================

alter table tenants add column owner_id uuid references auth.users(id) on delete set null;
create index tenants_owner_idx on tenants (owner_id);

-- Does the current signed-in user own this tenant? SECURITY DEFINER so child
-- policies can check ownership without tripping over the tenants RLS.
create or replace function owns_tenant(tid uuid)
  returns boolean
  language sql
  security definer
  stable
  set search_path = public
as $$
  select exists (select 1 from tenants where id = tid and owner_id = auth.uid());
$$;

-- tenants: an owner can read, create and update their own.
create policy "owner reads own tenant" on tenants
  for select to authenticated using (owner_id = auth.uid());
create policy "owner inserts own tenant" on tenants
  for insert to authenticated with check (owner_id = auth.uid());
create policy "owner updates own tenant" on tenants
  for update to authenticated using (owner_id = auth.uid()) with check (owner_id = auth.uid());

-- child content: full access when you own the parent tenant.
create policy "owner manages themes" on themes
  for all to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));
create policy "owner manages content" on site_content
  for all to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));
create policy "owner manages catalog" on catalog_items
  for all to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));
create policy "owner manages gallery" on gallery
  for all to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));
create policy "owner manages team" on team
  for all to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));

-- owner can read their own leads + billing status (not write — webhook does that).
create policy "owner reads own leads" on leads
  for select to authenticated using (owns_tenant(tenant_id));
create policy "owner reads own billing" on tenant_billing
  for select to authenticated using (owns_tenant(tenant_id));

-- Table privileges for the authenticated role (RLS still gates the rows).
grant select, insert, update on tenants to authenticated;
grant select, insert, update, delete on themes, site_content, catalog_items, gallery, team to authenticated;
grant select on leads, tenant_billing to authenticated;
