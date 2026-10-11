# MathLife: dasar situs

Situs statis (HTML, CSS, JavaScript) dengan login dan database di Supabase, dihosting di Netlify, dan kodenya disimpan di GitHub. Tidak ada proses build.

## Isi proyek

```
index.html          Beranda
masuk.html          Masuk, daftar, lupa kata sandi
dashboard.html      Dashboard (isinya berubah sesuai peran)
css/style.css       Gaya visual (warna dan font sesuai Panduan Merek)
js/config.js        Alamat dan kunci publik Supabase (WAJIB diisi)
js/supabase-client.js, ui.js, masuk.js, dashboard.js
supabase/schema.sql Tabel, aturan akses, dan fungsi database
assets/             Logo, ikon, dan gambar Si Mathy
netlify.toml        Pengaturan Netlify
```

Yang sudah jalan: daftar, masuk, keluar, atur ulang kata sandi, peran (Siswa, Guru, Admin Sekolah, Admin Platform), tukar kode aktivasi, pembuatan kode oleh admin platform, pengaturan peran pengguna, pendaftaran bimbel, dan ringkasan progres.

Yang belum ada: isi worksheet dan game, dashboard kelas untuk guru dan admin sekolah, serta pembayaran langsung di situs.

## Langkah pemasangan

### 1. Buat proyek Supabase
1. Masuk ke supabase.com, buat proyek baru, dan simpan kata sandi database.
2. Buka **SQL Editor > New query**, tempel seluruh isi `supabase/schema.sql`, lalu klik **Run**. Pastikan tidak ada pesan galat.
3. Buka **Authentication > URL Configuration**. Isi **Site URL** dengan alamat situs Netlify (diisi setelah langkah 4) dan tambahkan alamat yang sama di **Redirect URLs**.
4. Untuk uji coba, kamu bisa mematikan konfirmasi email di **Authentication > Providers > Email**. Aktifkan lagi sebelum situs dipakai umum.

### 2. Isi konfigurasi
Buka **Project Settings > API**, lalu salin ke `js/config.js`:
- **Project URL** ke `SUPABASE_URL`
- Kunci **anon** (atau **publishable**) ke `SUPABASE_ANON_KEY`

Jangan pernah memakai atau mengunggah kunci **service_role**. Kunci anon aman terlihat di browser selama aturan akses di `schema.sql` sudah dijalankan.

### 3. Unggah ke GitHub
Cara paling mudah: buat repositori baru bernama `mathlife` di github.com, klik **Add file > Upload files**, lalu seret seluruh isi folder ini (bukan folder induknya) dan klik **Commit changes**.

Atau lewat terminal:
```
cd mathlife
git init
git add .
git commit -m "Dasar situs MathLife"
git branch -M main
git remote add origin https://github.com/NAMA-KAMU/mathlife.git
git push -u origin main
```

### 4. Hubungkan Netlify
1. Di netlify.com pilih **Add new site > Import an existing project > GitHub**, lalu pilih repositori `mathlife`.
2. Biarkan kolom build command kosong dan publish directory `.` (sudah diatur di `netlify.toml`), lalu klik **Deploy**.
3. Setelah tayang, salin alamat situsnya ke **Site URL** di Supabase (langkah 1.3).
Setiap kali kamu mengubah file di GitHub, Netlify memperbarui situs otomatis.

### 5. Jadikan dirimu admin platform
1. Buka situsmu, daftar dengan emailmu, dan konfirmasi emailnya jika diminta.
2. Di Supabase **SQL Editor**, jalankan (ganti emailnya):
```sql
update public.profiles
set role = 'admin_platform'
where id = (select id from auth.users where email = 'emailkamu@contoh.com');
```
3. Muat ulang dashboard. Panel Kode aktivasi, Pengguna dan peran, serta Pendaftar bimbel akan muncul.

### 6. Uji alur utama
1. Sebagai admin, buat 1 kode untuk Paket Basic.
2. Daftar akun kedua (siswa) di jendela penyamaran, lalu tukar kodenya.
3. Pastikan paket aktif muncul dan kode yang sama tidak bisa dipakai lagi.

## Catatan keamanan
- Akun baru selalu menjadi **Siswa**. Hanya admin platform yang bisa mengubah peran (dijaga di database, bukan di browser).
- Kode aktivasi ditukar lewat fungsi `redeem_code()` di database. Tabel kode tidak bisa dibaca pengguna biasa.
- Jangan menaruh data rahasia di file mana pun di folder ini. Semua isinya bisa dilihat siapa saja yang membuka situs.
- Ganti `62XXXXXXXXXX` di `index.html` dengan nomor WhatsApp MathLife.
- Sesuaikan nama paket dan durasinya (kolom `duration_days`) di tabel `packages` lewat Supabase **Table Editor**.

## Langkah berikutnya yang disarankan
1. Worksheet Bab 5 SPLDV dan Mall Simulator, dengan hasilnya disimpan ke tabel `progress`.
2. Game kedua dan ketiga (permintaan dosen).
3. Dashboard guru dan admin sekolah (kelas, daftar siswa, rekap).
4. Pembayaran: QRIS manual dengan konfirmasi admin, atau payment gateway.

## Materi dan worksheet (tambahan)

- `materi.html` menampilkan 15 bab (kelas 7 sampai 9). Bab tanpa subbab jadi tampil sebagai "Segera".
- `subbab.html?id=k7-b1-s1` adalah mesin worksheet sepuluh bagian. Isi tiap subbab ada di `js/konten/<id>.js`.
- Daftar bab dan status subbab ada di `js/kurikulum.js`. Untuk membuka subbab baru: ubah `tersedia: true` dan tambahkan file kontennya.
- `gratis: true` pada subbab berarti bisa dibuka tanpa paket (pratinjau). Subbab lain butuh paket aktif.
- Progres per soal tersimpan di tabel `progress`. Jalankan `supabase/migrasi-02-progres.sql` sekali di SQL Editor sebelum memakainya.

Catatan: konten ada di file statis, jadi pembatasan paket hanya menjaga tampilan, bukan melindungi isi dari orang yang membuka file langsung. Kalau konten berbayar perlu benar-benar tertutup, pindahkan konten ke tabel Supabase di tahap berikutnya.
