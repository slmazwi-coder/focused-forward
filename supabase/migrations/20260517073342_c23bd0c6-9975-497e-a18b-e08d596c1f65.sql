create table public.site_content (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);
alter table public.site_content enable row level security;
create policy "Public can read site content"
  on public.site_content for select
  using (true);
-- No insert/update/delete policies for anon or authenticated.
-- Writes are performed only via server-side admin client after password check.