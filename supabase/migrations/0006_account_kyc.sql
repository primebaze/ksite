-- ============================================================================
-- Account controls + KYC. Staff can suspend an account (blocks the dashboard +
-- takes the site offline) and request KYC; clients submit KYC details from
-- their dashboard and staff approve/reject. Billing gains a cancel_at so the UI
-- can show "cancels on <date>" while a subscription winds down at period end.
-- ============================================================================

alter table tenants add column account_status text not null default 'active'
  check (account_status in ('active', 'suspended'));
alter table tenants add column kyc_status text not null default 'none'
  check (kyc_status in ('none', 'requested', 'submitted', 'approved', 'rejected'));

alter table tenant_billing add column cancel_at timestamptz;

create table kyc_submissions (
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null references tenants(id) on delete cascade,
  legal_name      text not null,
  business_type   text,
  registration_no text,
  address         text,
  contact_name    text,
  contact_phone   text,
  notes           text,
  status          text not null default 'submitted' check (status in ('submitted', 'approved', 'rejected')),
  review_note     text,
  submitted_at    timestamptz not null default now(),
  reviewed_at     timestamptz
);

create index kyc_submissions_tenant_idx on kyc_submissions (tenant_id, submitted_at desc);

alter table kyc_submissions enable row level security;

-- Owners read + submit their own KYC. Review (update) is staff-only via the
-- service key, so no update policy for authenticated.
create policy "owner reads own kyc" on kyc_submissions
  for select to authenticated using (owns_tenant(tenant_id));
create policy "owner submits own kyc" on kyc_submissions
  for insert to authenticated with check (owns_tenant(tenant_id));

grant select, insert on kyc_submissions to authenticated;
