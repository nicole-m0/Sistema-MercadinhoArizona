-- Preparação apenas: executar futuramente em ambiente de teste, após aprovação.
begin;
create table public.admin_users (
  user_id uuid primary key references auth.users(id),
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create table public.categories (
  id text primary key,
  name text not null unique check (length(trim(name)) between 1 and 120),
  sort_order integer not null
);
create table public.products (
  id text primary key check (id ~ '^[A-Za-z0-9_-]{1,80}$'),
  name text not null check (length(trim(name)) between 2 and 160),
  category_id text not null references public.categories(id),
  price_cents integer not null check (price_cents > 0),
  promo_cents integer check (promo_cents > 0 and promo_cents < price_cents),
  unit text not null check (unit in ('unidade', 'pacote', 'kg')),
  available boolean not null default true,
  featured boolean not null default false,
  archived_at timestamptz,
  legacy_image_path text check (legacy_image_path ~ '^/images/products/[a-z0-9-]+\.jpg$'),
  image_secure_url text,
  image_public_id text unique,
  icon text not null,
  color text not null check (color ~ '^#[a-fA-F0-9]{6}$'),
  sort_order integer not null,
  revision integer not null default 1 check (revision > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((image_secure_url is null) = (image_public_id is null)),
  check (legacy_image_path is not null or image_secure_url is not null),
  check (image_secure_url is null or image_secure_url like 'https://res.cloudinary.com/%'),
  check (image_public_id is null or image_public_id like 'mercadinho-arizona/products/%')
);
create index products_category_idx on public.products(category_id);
create table public.catalog_audit (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id),
  product_id text not null,
  operation text not null,
  previous_data jsonb,
  current_data jsonb,
  created_at timestamptz not null default now()
);
create function public.is_catalog_admin() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.admin_users where user_id = auth.uid() and active);
$$;
revoke all on function public.is_catalog_admin() from public;
grant execute on function public.is_catalog_admin() to authenticated;
alter table public.admin_users enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.catalog_audit enable row level security;
revoke all on public.admin_users, public.categories, public.products, public.catalog_audit from anon, authenticated;
grant select on public.categories, public.products to anon, authenticated;
grant select on public.admin_users, public.catalog_audit to authenticated;
-- Escritas permanecem fechadas até a implementação de validação/auditoria na API.
create policy admin_own_role on public.admin_users for select to authenticated using (user_id = auth.uid());
create policy public_categories on public.categories for select to anon, authenticated using (true);
create policy public_catalog on public.products for select to anon, authenticated using (archived_at is null);
create policy admin_catalog on public.products for select to authenticated using (public.is_catalog_admin());
create policy admin_audit on public.catalog_audit for select to authenticated using (public.is_catalog_admin());
commit;
