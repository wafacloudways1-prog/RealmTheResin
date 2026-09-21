create extension if not exists pgcrypto;

create table if not exists public.profiles(
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  phone text,
  phone_country_code text,
  address text,
  city text,
  state text,
  pin text,
  country_code text,
  role text not null default 'customer' check(role in ('customer','admin')),
  created_at timestamptz default now()
);

alter table public.profiles add column if not exists phone_country_code text;

create table if not exists public.products(
  id text primary key,
  name text not null,
  price numeric(10,2) not null default 149,
  image_url text,
  active boolean not null default true,
  discount numeric(10,2) not null default 0,
  created_at timestamptz default now()
);

create table if not exists public.orders(
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  customer_name text not null,
  phone text not null,
  address text not null,
  city text not null,
  state text,
  pin text not null,
  country_code text,
  items jsonb not null,
  total numeric(10,2) not null,
  payment_method text default 'upi_qr',
  upi_id text,
  utr text,
  payment_status text not null default 'pending_payment',
  status text not null default 'awaiting_payment',
  delivery_date date,
  created_at timestamptz default now()
);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path=public
as $$
  select exists(select 1 from public.profiles p where p.id=auth.uid() and p.role='admin');
$$;

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  if old.role is distinct from new.role and auth.uid() is not null and not public.is_admin() then
    raise exception 'Only an admin can change account roles';
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_role on public.profiles;
create trigger protect_profile_role before update on public.profiles
for each row execute function public.prevent_role_escalation();

drop policy if exists "profile self" on public.profiles;
create policy "profile self" on public.profiles for select using(id=auth.uid() or public.is_admin());

drop policy if exists "profile insert self" on public.profiles;
create policy "profile insert self" on public.profiles for insert with check(id=auth.uid() and role='customer');

drop policy if exists "profile upsert self" on public.profiles;

drop policy if exists "profile update self" on public.profiles;
create policy "profile update self" on public.profiles for update using(id=auth.uid() or public.is_admin()) with check(id=auth.uid() or public.is_admin());

drop policy if exists "products public read" on public.products;
create policy "products public read" on public.products for select using(active=true or public.is_admin());

drop policy if exists "admin products insert" on public.products;
create policy "admin products insert" on public.products for insert with check(public.is_admin());

drop policy if exists "admin products update" on public.products;
create policy "admin products update" on public.products for update using(public.is_admin()) with check(public.is_admin());

drop policy if exists "admin products delete" on public.products;
create policy "admin products delete" on public.products for delete using(public.is_admin());

drop policy if exists "orders own read" on public.orders;
create policy "orders own read" on public.orders for select using(user_id=auth.uid() or public.is_admin());

drop policy if exists "orders own insert" on public.orders;
create policy "orders own insert" on public.orders for insert with check(user_id=auth.uid());

drop policy if exists "orders own payment submit" on public.orders;
create policy "orders own payment submit" on public.orders for update
using(user_id=auth.uid() and payment_status='pending_payment')
with check(user_id=auth.uid() and payment_status in ('pending_payment','pending_verification'));

drop policy if exists "admin order update" on public.orders;
create policy "admin order update" on public.orders for update using(public.is_admin()) with check(public.is_admin());

insert into public.products(id,name,price,image_url) values
('A','Resin Letter A',149,'images/A.jpg'),('B','Resin Letter B',149,'images/B.jpg'),('C','Resin Letter C',149,'images/C.jpg'),('D','Resin Letter D',149,'images/D.jpg'),('E','Resin Letter E',149,'images/E.jpg'),('F','Resin Letter F',149,'images/F.jpg'),('G','Resin Letter G',149,'images/G.jpg'),('H','Resin Letter H',149,'images/H.jpg'),('I','Resin Letter I',149,'images/I.jpg'),('J','Resin Letter J',149,'images/J.jpg'),('K','Resin Letter K',149,'images/K.jpg'),('L','Resin Letter L',149,'images/L.jpg'),('M','Resin Letter M',149,'images/M.jpg'),('N','Resin Letter N',149,'images/N.jpg'),('O','Resin Letter O',149,'images/O.jpg'),('P','Resin Letter P',149,'images/P.jpg'),('Q','Resin Letter Q',149,'images/Q.jpg'),('R','Resin Letter R',149,'images/R.jpg'),('S','Resin Letter S',149,'images/S.jpg'),('T','Resin Letter T',149,'images/T.jpg'),('U','Resin Letter U',149,'images/U.jpg'),('V','Resin Letter V',149,'images/V.jpg'),('W','Resin Letter W',149,'images/W.jpg'),('X','Resin Letter X',149,'images/X.jpg'),('Y','Resin Letter Y',149,'images/Y.jpg'),('Z','Resin Letter Z',149,'images/Z.jpg')
on conflict(id) do update set name=excluded.name, image_url=excluded.image_url;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path=public
as $$
begin
  insert into public.profiles(id,full_name,email)
  values(new.id,coalesce(new.raw_user_meta_data->>'full_name',new.raw_user_meta_data->>'name'),new.email)
  on conflict(id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
for each row execute procedure public.handle_new_user();

-- Customers create orders through this function so totals come from the database,
-- not from editable browser JavaScript.
create or replace function public.create_upi_order(p_items jsonb)
returns public.orders
language plpgsql
security definer
set search_path=public
as $$
declare
  v_profile public.profiles%rowtype;
  v_item jsonb;
  v_product public.products%rowtype;
  v_qty integer;
  v_total numeric(10,2) := 0;
  v_snapshot jsonb := '[]'::jsonb;
  v_order public.orders%rowtype;
begin
  if auth.uid() is null then raise exception 'Sign in required'; end if;
  select * into v_profile from public.profiles where id=auth.uid();
  if v_profile.id is null or v_profile.full_name is null or v_profile.phone is null or v_profile.address is null or v_profile.city is null or v_profile.pin is null then
    raise exception 'Complete delivery profile first';
  end if;
  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items)=0 then
    raise exception 'Cart is empty';
  end if;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_qty := greatest(1, least(25, coalesce((v_item->>'qty')::integer,1)));
    select * into v_product from public.products where id=v_item->>'product_id' and active=true;
    if v_product.id is null then raise exception 'Invalid product'; end if;
    v_total := v_total + greatest(0, v_product.price - coalesce(v_product.discount,0)) * v_qty;
    v_snapshot := v_snapshot || jsonb_build_array(jsonb_build_object(
      'product_id',v_product.id,
      'name',v_product.name,
      'qty',v_qty,
      'price',greatest(0, v_product.price - coalesce(v_product.discount,0))
    ));
  end loop;

  insert into public.orders(user_id,customer_name,phone,address,city,state,pin,country_code,items,total,payment_status,payment_method,upi_id,status)
  values(auth.uid(),v_profile.full_name,v_profile.phone,v_profile.address,v_profile.city,v_profile.state,v_profile.pin,v_profile.country_code,v_snapshot,v_total,'pending_payment','upi_qr','abbaswafa@fam','awaiting_payment')
  returning * into v_order;
  return v_order;
end;
$$;

grant execute on function public.create_upi_order(jsonb) to authenticated;

create or replace function public.submit_payment_reference(p_order_id uuid,p_utr text)
returns void
language plpgsql
security definer
set search_path=public
as $$
begin
  if auth.uid() is null then raise exception 'Sign in required'; end if;
  if p_utr is null or length(trim(p_utr)) < 6 or length(trim(p_utr)) > 40 then raise exception 'Invalid transaction reference'; end if;
  update public.orders
    set utr=trim(p_utr), payment_status='pending_verification', status='payment_submitted'
    where id=p_order_id and user_id=auth.uid() and payment_status='pending_payment';
  if not found then raise exception 'Order not found or payment already submitted'; end if;
end;
$$;

grant execute on function public.submit_payment_reference(uuid,text) to authenticated;

-- Browser clients cannot directly edit orders; payment submission uses the RPC above.
drop policy if exists "orders own payment submit" on public.orders;
