create extension if not exists pgcrypto;
create table if not exists public.profiles(
 id uuid primary key references auth.users(id) on delete cascade,
 full_name text,
 email text,
 role text not null default 'customer' check(role in ('customer','admin')),
 created_at timestamptz default now()
);
create table if not exists public.products(
 id text primary key, name text not null, price numeric(10,2) not null default 149,
 image_url text, active boolean not null default true, discount numeric(10,2) default 0,
 created_at timestamptz default now()
);
create table if not exists public.orders(
 id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id),
 customer_name text not null, phone text not null, address text not null, city text not null, pin text not null,
 items jsonb not null, total numeric(10,2) not null,
 razorpay_order_id text unique, razorpay_payment_id text, payment_status text not null default 'pending',
 status text not null default 'processing', delivery_date date, created_at timestamptz default now()
);
alter table public.profiles enable row level security; alter table public.products enable row level security; alter table public.orders enable row level security;
create or replace function public.is_admin() returns boolean language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin');
$$;
drop policy if exists "profile self" on public.profiles;
create policy "profile self" on public.profiles for select using(id=auth.uid() or public.is_admin());
drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products for select using(active=true or public.is_admin());
drop policy if exists "orders own read" on public.orders;
create policy "orders own read" on public.orders for select using(user_id=auth.uid() or public.is_admin());
drop policy if exists "orders own insert" on public.orders;
create policy "orders own insert" on public.orders for insert with check(user_id=auth.uid());
drop policy if exists "admin order update" on public.orders;
create policy "admin order update" on public.orders for update using(public.is_admin());
insert into public.products(id,name,price,image_url) values
('A','Resin Letter A',149,'images/A.jpg'),('B','Resin Letter B',149,'images/B.jpg'),('C','Resin Letter C',149,'images/C.jpg'),('D','Resin Letter D',149,'images/D.jpg'),('E','Resin Letter E',149,'images/E.jpg'),('F','Resin Letter F',149,'images/F.jpg'),('G','Resin Letter G',149,'images/G.jpg'),('H','Resin Letter H',149,'images/H.jpg'),('I','Resin Letter I',149,'images/I.jpg'),('J','Resin Letter J',149,'images/J.jpg'),('K','Resin Letter K',149,'images/K.jpg'),('L','Resin Letter L',149,'images/L.jpg'),('M','Resin Letter M',149,'images/M.jpg'),('N','Resin Letter N',149,'images/N.jpg'),('O','Resin Letter O',149,'images/O.jpg'),('P','Resin Letter P',149,'images/P.jpg'),('Q','Resin Letter Q',149,'images/Q.jpg'),('R','Resin Letter R',149,'images/R.jpg'),('S','Resin Letter S',149,'images/S.jpg'),('T','Resin Letter T',149,'images/T.jpg'),('U','Resin Letter U',149,'images/U.jpg'),('V','Resin Letter V',149,'images/V.jpg'),('W','Resin Letter W',149,'images/W.jpg'),('X','Resin Letter X',149,'images/X.jpg'),('Y','Resin Letter Y',149,'images/Y.jpg'),('Z','Resin Letter Z',149,'images/Z.jpg')
on conflict(id) do nothing;
-- After your first Google login, make yourself admin by running:
-- update public.profiles set role='admin' where email='YOUR_EMAIL';

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path=public as $$
begin insert into public.profiles(id,full_name,email) values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name'),new.email) on conflict(id) do nothing; return new; end; $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();
