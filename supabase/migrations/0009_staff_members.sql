-- ============================================================================
-- Staff allowlist in the database, so admins can be added/removed from the
-- console without editing STAFF_EMAILS + redeploying. The env var stays as a
-- bootstrap superadmin list (always staff, can't be removed via the UI) so you
-- can never lock yourself out. Service-role only — no client access.
-- ============================================================================

create table if not exists staff_members (
  email      text primary key,
  added_by   text,
  created_at timestamptz not null default now()
);

alter table staff_members enable row level security;  -- deny all non-service access
