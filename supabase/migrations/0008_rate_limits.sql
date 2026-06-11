-- ============================================================================
-- Global rate limiting backed by Postgres (no external infra). A single atomic
-- upsert keeps a fixed-window counter per key; the API routes call
-- rate_limit_check() via the service role before doing expensive work
-- (sending email, image processing, Vercel API calls). Only the service role
-- touches this table, so no RLS policies are needed.
-- ============================================================================

create table if not exists rate_limits (
  key          text primary key,
  count        integer not null default 0,
  window_start timestamptz not null default now()
);

alter table rate_limits enable row level security;  -- deny all non-service access

-- Returns true if the request is allowed, false if the window's limit is hit.
create or replace function rate_limit_check(p_key text, p_max int, p_window int)
returns boolean
language plpgsql
as $$
declare
  new_count integer;
begin
  insert into rate_limits (key, count, window_start)
  values (p_key, 1, now())
  on conflict (key) do update
    set count = case
          when now() - rate_limits.window_start > make_interval(secs => p_window) then 1
          else rate_limits.count + 1
        end,
        window_start = case
          when now() - rate_limits.window_start > make_interval(secs => p_window) then now()
          else rate_limits.window_start
        end
  returning count into new_count;
  return new_count <= p_max;
end;
$$;
