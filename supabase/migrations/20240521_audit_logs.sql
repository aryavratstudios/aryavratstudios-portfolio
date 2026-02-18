-- Audit Logs for Security Activity Tracking
create table public.audit_logs (
  id uuid default uuid_generate_v4() primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null, -- e.g. "LOGIN", "VIEW_PROJECT", "EXPORT_DATA"
  resource_id text, -- Target ID (project_id, user_id, etc.)
  metadata jsonb default '{}'::jsonb,
  ip_address text,
  occurred_at timestamptz default now()
);

-- Enable RLS
alter table public.audit_logs enable row level security;

-- Only Admins can view logs
create policy "Admins can view audit logs" on public.audit_logs
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

-- System/Be can insert logs (or admins)
create policy "Anyone can insert logs" on public.audit_logs
  for insert with check (auth.uid() = actor_id);
