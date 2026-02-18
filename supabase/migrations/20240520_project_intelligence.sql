-- Migration for AI Project Metadata Management System

-- 1. Screenshots Table
create table public.screenshots (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  storage_path text not null,
  public_url text not null,
  screenshot_type text check (screenshot_type in ('order_confirmation', 'revision_request', 'payment_proof', 'deadline_discussion', 'reference_sharing', 'final_delivery', 'other')),
  extracted_data jsonb default '{}'::jsonb,
  ocr_text text,
  created_at timestamptz default now()
);

-- 2. Extracted Events (Timeline)
create table public.extracted_events (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  screenshot_id uuid references public.screenshots(id) on delete set null,
  event_type text not null,
  event_date timestamptz not null,
  summary text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- 3. Payments Monitoring
create table public.payments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  amount numeric not null,
  currency text default 'USD',
  platform text, -- PayPal, UPI, Bank, etc.
  transaction_id text,
  payment_date timestamptz default now(),
  status text default 'completed' check (status in ('pending', 'completed', 'failed')),
  screenshot_id uuid references public.screenshots(id) on delete set null,
  created_at timestamptz default now()
);

-- 4. Revision Circles
create table public.revisions (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  round_number integer not null,
  requested_at timestamptz not null,
  completed_at timestamptz,
  feedback text,
  screenshot_id uuid references public.screenshots(id) on delete set null,
  created_at timestamptz default now()
);

-- 5. Auto-generated Tasks
create table public.tasks (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  title text not null,
  description text,
  status text default 'pending' check (status in ('pending', 'done', 'overdue')),
  due_date timestamptz,
  screenshot_id uuid references public.screenshots(id) on delete set null,
  created_at timestamptz default now()
);

-- 6. Aryavrat HQ Sync Logs
create table public.sync_logs (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  sync_type text default 'hq_push',
  status text default 'pending' check (status in ('pending', 'synced', 'failed')),
  last_synced_at timestamptz,
  error_message text,
  standardized_json jsonb,
  created_at timestamptz default now()
);

-- Enable RLS for all new tables
alter table public.screenshots enable row level security;
alter table public.extracted_events enable row level security;
alter table public.payments enable row level security;
alter table public.revisions enable row level security;
alter table public.tasks enable row level security;
alter table public.sync_logs enable row level security;

-- Policies (Admin only for management, Project owner for viewing where applicable)
-- For simplicity in this admin-focused system, we'll allow admins full access and users view access to their own.

create policy "Admins can manage screenshots" on public.screenshots using (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'));
create policy "Admins can manage events" on public.extracted_events using (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'));
create policy "Admins can manage payments" on public.payments using (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'));
create policy "Admins can manage revisions" on public.revisions using (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'));
create policy "Admins can manage tasks" on public.tasks using (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'));
create policy "Admins can manage sync_logs" on public.sync_logs using (exists (select 1 from public.profiles where profiles.id = auth.uid() and profiles.role = 'admin'));
