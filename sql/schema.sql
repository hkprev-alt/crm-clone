-- Schema and policies for Supabase (run in SQL editor)

create schema if not exists crm;

create extension if not exists pgcrypto;

create table if not exists crm.organizations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamptz default now()
);

create table if not exists crm.profiles (
  id uuid references auth.users (id) on delete cascade,
  organization_id uuid references crm.organizations(id),
  full_name text,
  role text default 'user',
  created_at timestamptz default now(),
  primary key (id)
);

create table if not exists crm.leads (
  id uuid default gen_random_uuid() primary key,
  organization_id uuid references crm.organizations(id),
  owner_id uuid references auth.users(id),
  full_name text,
  email text,
  phone text,
  mobile text,
  status text default 'Nouveau',
  source text,
  priority text default 'Moyen',
  last_contact_at timestamptz,
  notes text,
  meta jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create function crm.trigger_set_timestamp() returns trigger
language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_timestamp before update on crm.leads
for each row execute function crm.trigger_set_timestamp();

-- Enable RLS and example policies (modify to your auth/profiles flow)
alter table crm.leads enable row level security;

create policy "read_leads_by_org" on crm.leads
for select using (
  organization_id = (select organization_id from crm.profiles where id = auth.uid())
);

create policy "insert_leads_by_org" on crm.leads
for insert with check (
  organization_id = (select organization_id from crm.profiles where id = auth.uid())
);

create policy "update_leads_owner_or_admin" on crm.leads
for update using (
  owner_id = auth.uid() OR
  (select role from crm.profiles where id = auth.uid()) = 'admin'
);

create policy "delete_leads_owner_or_admin" on crm.leads
for delete using (
  owner_id = auth.uid() OR
  (select role from crm.profiles where id = auth.uid()) = 'admin'
);
