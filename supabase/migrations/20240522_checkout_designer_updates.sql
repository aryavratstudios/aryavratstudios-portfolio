-- Migration for Checkout Contract and Designer Assignment

-- 1. Update Projects Table
alter table public.projects 
add column if not exists contract_accepted boolean default false,
add column if not exists contract_accepted_at timestamptz,
add column if not exists designer_id uuid references public.profiles(id) on delete set null;

-- 2. Create Messages Table for project-specific chat
create table if not exists public.messages (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  content text,
  attachment_url text,
  attachment_type text check (attachment_type in ('image', 'file', 'voice', 'video')),
  created_at timestamptz default now()
);

-- 3. Enable RLS and Policies for Messages
alter table public.messages enable row level security;

create policy "Users can view messages for their projects" on public.messages
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = messages.project_id
      and (projects.user_id = auth.uid() or projects.designer_id = auth.uid() or exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.role = 'admin'
      ))
    )
  );

create policy "Users can send messages for their projects" on public.messages
  for insert with check (
    exists (
      select 1 from public.projects
      where projects.id = messages.project_id
      and (projects.user_id = auth.uid() or projects.designer_id = auth.uid() or exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.role = 'admin'
      ))
    )
  );
