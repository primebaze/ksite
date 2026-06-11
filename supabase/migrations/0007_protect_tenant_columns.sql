-- ============================================================================
-- Harden the tenants table against privilege escalation. The owner UPDATE
-- policy (0003) intentionally lets a client edit their own row, but the
-- table-wide grant also exposed billing/lifecycle columns. Without this, a
-- signed-in owner using the publishable key directly (not our server actions)
-- could `update tenants set published=true, plan_status='active',
-- account_status='active', kyc_status='approved'` — bypassing payment, undoing
-- a suspension, and self-approving KYC.
--
-- This trigger neutralises any client (role = 'authenticated') attempt to
-- change those protected columns: their values are forced back to the prior
-- row. The service_role (admin console + Stripe webhook) and anon are
-- unaffected, so legitimate server-side writes still work.
-- ============================================================================

create or replace function protect_tenant_columns()
returns trigger
language plpgsql
as $$
declare
  jwt_role text := coalesce(current_setting('request.jwt.claims', true)::jsonb ->> 'role', '');
begin
  if jwt_role = 'authenticated' then
    new.published      := old.published;
    new.plan           := old.plan;
    new.plan_status    := old.plan_status;
    new.account_status := old.account_status;
    -- A client may submit KYC ('submitted') but never approve/reject itself.
    if new.kyc_status is distinct from old.kyc_status and new.kyc_status <> 'submitted' then
      new.kyc_status := old.kyc_status;
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_tenant_columns on tenants;
create trigger protect_tenant_columns
  before update on tenants
  for each row execute function protect_tenant_columns();
