-- =====================================================================
-- MathLife: skema database dasar untuk Supabase
-- Cara pakai: Supabase > SQL Editor > New query > tempel seluruh isi file ini > Run.
-- Aman dijalankan ulang (memakai "if not exists" dan "or replace" jika memungkinkan).
-- =====================================================================

-- ---------- Tabel ----------

create table if not exists public.schools (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'siswa'
    check (role in ('siswa', 'guru', 'admin_sekolah', 'admin_platform')),
  school_id uuid references public.schools(id) on delete set null,
  grade smallint check (grade between 7 and 9),
  created_at timestamptz not null default now()
);

create table if not exists public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  duration_days integer not null default 30 check (duration_days > 0),
  created_at timestamptz not null default now()
);

create table if not exists public.activation_codes (
  id uuid primary key default gen_random_uuid(),
  code text unique not null,
  package_id uuid not null references public.packages(id),
  created_at timestamptz not null default now(),
  used_by uuid references public.profiles(id),
  used_at timestamptz
);

create table if not exists public.user_packages (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  package_id uuid not null references public.packages(id),
  started_at timestamptz not null default now(),
  expires_at timestamptz not null
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  item_type text not null check (item_type in ('worksheet', 'game')),
  item_key text not null,            -- contoh: 'kelas8-bab5-5.1' atau 'mall-simulator'
  score integer,
  xp integer not null default 0 check (xp >= 0),
  completed_at timestamptz not null default now()
);

create table if not exists public.bimbel_registrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  choice text not null check (choice in ('paket_4_sesi', 'paket_8_sesi', 'kelompok')),
  note text check (char_length(note) <= 300),
  status text not null default 'menunggu'
    check (status in ('menunggu', 'terjadwal', 'aktif', 'selesai', 'dibatalkan')),
  created_at timestamptz not null default now()
);

create index if not exists progress_user_idx on public.progress (user_id);
create index if not exists user_packages_user_idx on public.user_packages (user_id);
create index if not exists bimbel_user_idx on public.bimbel_registrations (user_id);

-- ---------- Fungsi pembantu ----------

-- Apakah pengguna yang sedang masuk adalah admin platform?
create or replace function public.is_admin_platform()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin_platform'
  );
$$;

-- Setiap akun baru otomatis dibuatkan profil dengan peran 'siswa'.
-- Peran SENGAJA tidak dibaca dari data pendaftaran supaya tidak bisa dipalsukan.
create or replace function public.handle_new_user()
returns trigger
language plpgsql security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, grade)
  values (
    new.id,
    coalesce(nullif(trim(new.raw_user_meta_data->>'full_name'), ''), split_part(new.email, '@', 1)),
    case when (new.raw_user_meta_data->>'grade') in ('7', '8', '9')
         then (new.raw_user_meta_data->>'grade')::smallint end
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Pengguna biasa tidak boleh mengubah peran atau sekolahnya sendiri.
-- (Saat dijalankan dari SQL Editor, auth.uid() kosong, jadi admin pertama bisa dibuat di sana.)
create or replace function public.protect_profile_columns()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null and not public.is_admin_platform() then
    if new.role is distinct from old.role or new.school_id is distinct from old.school_id then
      raise exception 'Hanya admin platform yang boleh mengubah peran atau sekolah.';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists protect_profile_columns on public.profiles;
create trigger protect_profile_columns
  before update on public.profiles
  for each row execute function public.protect_profile_columns();

-- Menukar kode aktivasi menjadi paket aktif. Kode hanya bisa dipakai sekali.
create or replace function public.redeem_code(p_code text)
returns text
language plpgsql security definer
set search_path = public
as $$
declare
  v_package uuid;
  v_days integer;
  v_name text;
begin
  if auth.uid() is null then
    raise exception 'Silakan masuk terlebih dahulu.';
  end if;

  update public.activation_codes
     set used_by = auth.uid(), used_at = now()
   where code = upper(trim(p_code)) and used_by is null
  returning package_id into v_package;

  if v_package is null then
    raise exception 'Kode tidak ditemukan atau sudah dipakai.';
  end if;

  select name, duration_days into v_name, v_days from public.packages where id = v_package;

  insert into public.user_packages (user_id, package_id, expires_at)
  values (auth.uid(), v_package, now() + make_interval(days => v_days));

  return v_name;
end;
$$;

-- Membuat kode aktivasi dalam jumlah banyak. Hanya untuk admin platform.
create or replace function public.generate_codes(p_package_id uuid, p_count integer)
returns setof text
language plpgsql security definer
set search_path = public
as $$
declare
  i integer;
  h text;
  v_code text;
begin
  if not public.is_admin_platform() then
    raise exception 'Hanya admin platform yang boleh membuat kode.';
  end if;
  if p_count < 1 or p_count > 200 then
    raise exception 'Jumlah kode harus 1 sampai 200.';
  end if;

  for i in 1..p_count loop
    h := upper(replace(gen_random_uuid()::text, '-', ''));
    v_code := 'ML-' || substr(h, 1, 4) || '-' || substr(h, 5, 4) || '-' || substr(h, 9, 4);
    insert into public.activation_codes (code, package_id)
    values (v_code, p_package_id)
    on conflict (code) do nothing;
    if found then
      return next v_code;
    end if;
  end loop;
end;
$$;

-- ---------- Aturan akses (Row Level Security) ----------

alter table public.schools enable row level security;
alter table public.profiles enable row level security;
alter table public.packages enable row level security;
alter table public.activation_codes enable row level security;
alter table public.user_packages enable row level security;
alter table public.progress enable row level security;
alter table public.bimbel_registrations enable row level security;

-- profiles: lihat dan ubah diri sendiri; admin platform bisa semuanya
drop policy if exists "profil: baca sendiri atau admin" on public.profiles;
create policy "profil: baca sendiri atau admin" on public.profiles
  for select to authenticated
  using (id = auth.uid() or public.is_admin_platform());

drop policy if exists "profil: ubah sendiri atau admin" on public.profiles;
create policy "profil: ubah sendiri atau admin" on public.profiles
  for update to authenticated
  using (id = auth.uid() or public.is_admin_platform())
  with check (id = auth.uid() or public.is_admin_platform());

-- schools: semua pengguna yang masuk boleh membaca; admin platform mengelola
drop policy if exists "sekolah: baca" on public.schools;
create policy "sekolah: baca" on public.schools
  for select to authenticated using (true);

drop policy if exists "sekolah: admin kelola" on public.schools;
create policy "sekolah: admin kelola" on public.schools
  for all to authenticated
  using (public.is_admin_platform()) with check (public.is_admin_platform());

-- packages: daftar paket boleh dibaca siapa saja; admin platform mengelola
drop policy if exists "paket: baca" on public.packages;
create policy "paket: baca" on public.packages
  for select to anon, authenticated using (true);

drop policy if exists "paket: admin kelola" on public.packages;
create policy "paket: admin kelola" on public.packages
  for all to authenticated
  using (public.is_admin_platform()) with check (public.is_admin_platform());

-- activation_codes: hanya admin platform. Pengguna menukar kode lewat fungsi redeem_code().
drop policy if exists "kode: admin kelola" on public.activation_codes;
create policy "kode: admin kelola" on public.activation_codes
  for all to authenticated
  using (public.is_admin_platform()) with check (public.is_admin_platform());

-- user_packages: baca milik sendiri; isi hanya lewat redeem_code() atau admin
drop policy if exists "paket pengguna: baca sendiri atau admin" on public.user_packages;
create policy "paket pengguna: baca sendiri atau admin" on public.user_packages
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin_platform());

drop policy if exists "paket pengguna: admin kelola" on public.user_packages;
create policy "paket pengguna: admin kelola" on public.user_packages
  for all to authenticated
  using (public.is_admin_platform()) with check (public.is_admin_platform());

-- progress: baca, tambah, dan ubah milik sendiri; admin platform bisa membaca semuanya
drop policy if exists "progres: baca sendiri atau admin" on public.progress;
create policy "progres: baca sendiri atau admin" on public.progress
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin_platform());

drop policy if exists "progres: tambah sendiri" on public.progress;
create policy "progres: tambah sendiri" on public.progress
  for insert to authenticated with check (user_id = auth.uid());

drop policy if exists "progres: ubah sendiri" on public.progress;
create policy "progres: ubah sendiri" on public.progress
  for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- bimbel_registrations: pengguna mendaftar (status selalu 'menunggu'); admin mengatur status
drop policy if exists "bimbel: baca sendiri atau admin" on public.bimbel_registrations;
create policy "bimbel: baca sendiri atau admin" on public.bimbel_registrations
  for select to authenticated
  using (user_id = auth.uid() or public.is_admin_platform());

drop policy if exists "bimbel: daftar sendiri" on public.bimbel_registrations;
create policy "bimbel: daftar sendiri" on public.bimbel_registrations
  for insert to authenticated
  with check (user_id = auth.uid() and status = 'menunggu');

drop policy if exists "bimbel: admin kelola" on public.bimbel_registrations;
create policy "bimbel: admin kelola" on public.bimbel_registrations
  for all to authenticated
  using (public.is_admin_platform()) with check (public.is_admin_platform());

-- Fungsi yang boleh dipanggil dari browser
revoke execute on function public.redeem_code(text) from public, anon;
grant execute on function public.redeem_code(text) to authenticated;
revoke execute on function public.generate_codes(uuid, integer) from public, anon;
grant execute on function public.generate_codes(uuid, integer) to authenticated;

-- ---------- Data awal: paket ----------
-- Ubah nama, deskripsi, dan durasi (hari) sesuai kebijakan MathLife.
insert into public.packages (slug, name, description, duration_days) values
  ('basic', 'Paket Basic', 'Akses worksheet interaktif kelas VII sampai IX.', 30),
  ('worksheet-game', 'Paket Worksheet + Game', 'Worksheet interaktif dan seluruh game edukatif.', 30),
  ('guru', 'Paket Guru', 'Materi dan alat bantu untuk guru yang mengajar mandiri.', 30),
  ('sekolah', 'Paket Sekolah', 'Akses untuk sekolah mitra, lengkap dengan rekap progres per kelas.', 365)
on conflict (slug) do nothing;

-- ---------- Tambahan: progres belajar (satu baris per soal) ----------
create unique index if not exists progress_unik_item
  on public.progress (user_id, item_type, item_key);
alter table public.progress drop constraint if exists progress_xp_batas;
alter table public.progress add constraint progress_xp_batas check (xp between 0 and 50);
