-- Jalankan sekali di Supabase SQL Editor (untuk database yang sudah dibuat dengan schema.sql lama).
-- Satu baris progres per pengguna per soal, dan batas XP per soal.
create unique index if not exists progress_unik_item
  on public.progress (user_id, item_type, item_key);

alter table public.progress drop constraint if exists progress_xp_batas;
alter table public.progress add constraint progress_xp_batas check (xp between 0 and 50);
