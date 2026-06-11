-- ============================================================================
-- Support tickets: a two-way conversation between a client (tenant owner) and
-- staff. Clients open tickets + reply from their dashboard (RLS-scoped to their
-- own tenant). Staff read/reply/triage everything via the service key (bypasses
-- RLS) in the /admin console.
-- ============================================================================

create table support_tickets (
  id              uuid primary key default gen_random_uuid(),
  tenant_id       uuid not null references tenants(id) on delete cascade,
  subject         text not null,
  status          text not null default 'open' check (status in ('open', 'pending', 'closed')),
  created_by      uuid references auth.users(id) on delete set null,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create index support_tickets_tenant_idx on support_tickets (tenant_id, last_message_at desc);
create index support_tickets_status_idx on support_tickets (status, last_message_at desc);

create table ticket_messages (
  id           uuid primary key default gen_random_uuid(),
  ticket_id    uuid not null references support_tickets(id) on delete cascade,
  author_role  text not null check (author_role in ('client', 'staff')),
  author_id    uuid references auth.users(id) on delete set null,
  body         text not null,
  created_at   timestamptz not null default now()
);

create index ticket_messages_ticket_idx on ticket_messages (ticket_id, created_at);

alter table support_tickets enable row level security;
alter table ticket_messages enable row level security;

-- Owners read / open / update (reopen) their own tickets. Staff use the service
-- key (bypasses RLS), so there is no separate staff policy.
create policy "owner reads own tickets" on support_tickets
  for select to authenticated using (owns_tenant(tenant_id));
create policy "owner opens own tickets" on support_tickets
  for insert to authenticated with check (owns_tenant(tenant_id));
create policy "owner updates own tickets" on support_tickets
  for update to authenticated using (owns_tenant(tenant_id)) with check (owns_tenant(tenant_id));

-- Messages: readable when you own the parent ticket's tenant; clients may only
-- post messages authored as 'client' on their own tickets. Staff replies are
-- inserted via the service key.
create policy "owner reads own ticket messages" on ticket_messages
  for select to authenticated using (
    exists (select 1 from support_tickets t where t.id = ticket_id and owns_tenant(t.tenant_id))
  );
create policy "owner posts on own tickets" on ticket_messages
  for insert to authenticated with check (
    author_role = 'client'
    and exists (select 1 from support_tickets t where t.id = ticket_id and owns_tenant(t.tenant_id))
  );

grant select, insert, update on support_tickets to authenticated;
grant select, insert on ticket_messages to authenticated;
