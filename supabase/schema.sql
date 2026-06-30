-- DATABASE SCHEMA FOR ARTEFACT.co SAAS MARKETPLACE
-- Run these queries in your Supabase SQL Editor to set up the database tables.

-- =========================================================================
-- 1. Profiles Table (syncs automatically with Supabase Auth users)
-- =========================================================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  updated_at timestamp with time zone,
  username text unique,
  avatar_url text,
  balance numeric default 100.00 check (balance >= 0) -- starts with 100 free tokens/credits
);

-- Enable RLS (Row Level Security)
alter table public.profiles enable row level security;

-- Policies for Profiles
create policy "Allow public read access to profiles" on public.profiles
  for select using (true);

create policy "Allow users to update their own profiles" on public.profiles
  for update using (auth.uid() = id);

-- =========================================================================
-- 2. Products Table (workflows and prompts details)
-- =========================================================================
create table public.products (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  price numeric not null check (price >= 0),
  category text check (category in ('n8n_workflow', 'prompt')),
  file_url text, -- holds prompt text or workflow JSON file URL
  author_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.products enable row level security;

-- Policies for Products
create policy "Allow public read access to products" on public.products
  for select using (true);

create policy "Allow authenticated users to insert products" on public.products
  for insert with check (auth.uid() = author_id);

create policy "Allow authors to update/delete their own products" on public.products
  for all using (auth.uid() = author_id);

-- =========================================================================
-- 3. Purchases Table (transaction records)
-- =========================================================================
create table public.purchases (
  id uuid default gen_random_uuid() primary key,
  buyer_id uuid references public.profiles(id) on delete cascade not null,
  product_id uuid references public.products(id) on delete cascade not null,
  price_paid numeric not null check (price_paid >= 0),
  purchased_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.purchases enable row level security;

-- Policies for Purchases
create policy "Allow users to view their own purchases" on public.purchases
  for select using (auth.uid() = buyer_id);

create policy "Allow users to view sales of their products" on public.purchases
  for select using (
    auth.uid() in (
      select author_id from public.products where id = product_id
    )
  );

create policy "Allow authenticated users to insert purchases" on public.purchases
  for insert with check (auth.uid() = buyer_id);

-- =========================================================================
-- 4. Forum Posts Table (product comments/forum threads)
-- =========================================================================
create table public.forum_posts (
  id uuid default gen_random_uuid() primary key,
  product_id uuid references public.products(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table public.forum_posts enable row level security;

-- Policies for Forum Posts
create policy "Allow public read access to forum posts" on public.forum_posts
  for select using (true);

create policy "Allow authenticated users to create posts" on public.forum_posts
  for insert with check (auth.uid() = author_id);

create policy "Allow authors to edit/delete their own posts" on public.forum_posts
  for all using (auth.uid() = author_id);

-- =========================================================================
-- 5. Automations (Triggers for sync with Auth)
-- =========================================================================

-- Trigger to automatically create a profile when a new user registers
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, avatar_url, balance)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    100.00 -- Initial signup credits
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
