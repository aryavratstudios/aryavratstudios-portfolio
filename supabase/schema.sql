-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Create profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  role text not null default 'client' check (role in ('client', 'admin')),
  full_name text,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies for profiles
create policy "Public profiles are viewable by everyone." on public.profiles
  for select using (true);

create policy "Users can insert their own profile." on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on public.profiles
  for update using (auth.uid() = id);

-- Create projects table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  service_type text not null,
  status text not null default 'pending_review' check (status in ('pending_review', 'in_progress', 'delivered', 'revision', 'approved', 'completed')),
  deadline timestamptz,
  deliverable_url text,
  show_in_portfolio boolean default false,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.projects enable row level security;

-- Policies for projects
create policy "Users can view own projects" on public.projects
  for select using (auth.uid() = user_id);

create policy "Admins can view all projects" on public.projects
  for select using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );

create policy "Users can create projects" on public.projects
  for insert with check (auth.uid() = user_id);

create policy "Users can update own projects" on public.projects
  for update using (
    auth.uid() = user_id or
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.role = 'admin'
    )
  );
  
-- Create comments table
create table public.comments (
  id uuid default uuid_generate_v4() primary key,
  project_id uuid references public.projects(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.comments enable row level security;

-- Policies for comments
create policy "Comments are viewable by project owner and admin" on public.comments
  for select using (
    exists (
      select 1 from public.projects
      where projects.id = comments.project_id
      and (projects.user_id = auth.uid() or exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.role = 'admin'
      ))
    )
  );

create policy "Users and Admins can create comments" on public.comments
  for insert with check (
    exists (
      select 1 from public.projects
      where projects.id = comments.project_id
      and (projects.user_id = auth.uid() or exists (
        select 1 from public.profiles
        where profiles.id = auth.uid() and profiles.role = 'admin'
      ))
    )
  );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', 'client'); -- Default to client
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

