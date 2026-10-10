(async function () {
  const { $, tampilPesan } = ML;
  const area = $('#pesan');
  const tampil = (teks, jenis) => tampilPesan(area, teks, jenis);

  // Cegah formulir terkirim secara bawaan (data bisa bocor ke alamat URL) bila skrip belum siap.
  document.querySelectorAll('form').forEach((f) => f.addEventListener('submit', (e) => e.preventDefault()));

  const PANEL = ['masuk', 'daftar', 'lupa', 'baru'];
  function bukaPanel(nama) {
    tampil('');
    for (const p of PANEL) $('#panel-' + p).hidden = p !== nama;
    $('#tab-masuk').setAttribute('aria-selected', String(nama === 'masuk'));
    $('#tab-daftar').setAttribute('aria-selected', String(nama === 'daftar'));
    $('.tab').hidden = nama === 'lupa' || nama === 'baru';
  }

  $('#tab-masuk').addEventListener('click', () => bukaPanel('masuk'));
  $('#tab-daftar').addEventListener('click', () => bukaPanel('daftar'));
  $('#ke-lupa').addEventListener('click', () => bukaPanel('lupa'));
  $('#ke-masuk').addEventListener('click', () => bukaPanel('masuk'));
  if (location.search.includes('daftar')) bukaPanel('daftar');

  if (!window.dbSiap) {
    tampil('Konfigurasi Supabase belum diisi. Buka js/config.js, lalu isi alamat proyek dan kunci publik.', 'galat');
    return;
  }

  function terjemah(error) {
    const m = (error && error.message) || '';
    if (m.includes('Invalid login credentials')) return 'Email atau kata sandi salah.';
    if (m.includes('Email not confirmed')) return 'Email belum dikonfirmasi. Buka tautan konfirmasi di kotak masuk emailmu.';
    if (m.includes('already registered')) return 'Email ini sudah terdaftar. Silakan masuk.';
    if (m.includes('at least')) return 'Kata sandi terlalu pendek. Gunakan minimal 8 karakter.';
    if (m.toLowerCase().includes('rate limit')) return 'Terlalu banyak percobaan. Coba lagi beberapa menit lagi.';
    return 'Terjadi masalah: ' + m;
  }

  // Tautan "atur ulang kata sandi" dari email membuka halaman ini dengan sesi pemulihan.
  db.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') bukaPanel('baru');
  });

  const { data: { session } } = await db.auth.getSession();
  const modePemulihan = location.hash.includes('type=recovery');
  if (session && !modePemulihan) {
    location.replace('dashboard.html');
    return;
  }

  // Pembungkus: matikan tombol selama proses berjalan.
  function kirim(idForm, aksi) {
    $(idForm).addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.target;
      const tombol = form.querySelector('button[type=submit]');
      tombol.disabled = true;
      tampil('');
      try {
        await aksi(form.elements);
      } finally {
        tombol.disabled = false;
      }
    });
  }

  kirim('#form-masuk', async (f) => {
    const { error } = await db.auth.signInWithPassword({
      email: f.email.value.trim(),
      password: f.password.value
    });
    if (error) return tampil(terjemah(error), 'galat');
    location.href = 'dashboard.html';
  });

  kirim('#form-daftar', async (f) => {
    const { data, error } = await db.auth.signUp({
      email: f.email.value.trim(),
      password: f.password.value,
      options: {
        data: { full_name: f.nama.value.trim(), grade: f.kelas.value },
        emailRedirectTo: location.origin + '/masuk.html'
      }
    });
    if (error) return tampil(terjemah(error), 'galat');
    // Supabase tidak memberi galat untuk email yang sudah terdaftar, tetapi daftar identitasnya kosong.
    if (data.user && data.user.identities && data.user.identities.length === 0) {
      return tampil('Email ini sudah terdaftar. Silakan masuk.', 'galat');
    }
    if (data.session) {
      location.href = 'dashboard.html';
    } else {
      tampil('Akun dibuat. Kami mengirim tautan konfirmasi ke emailmu. Buka tautan itu, lalu masuk.', 'sukses');
    }
  });

  kirim('#form-lupa', async (f) => {
    const { error } = await db.auth.resetPasswordForEmail(f.email.value.trim(), {
      redirectTo: location.origin + '/masuk.html'
    });
    if (error) return tampil(terjemah(error), 'galat');
    tampil('Jika email itu terdaftar, tautan untuk membuat kata sandi baru sudah dikirim.', 'sukses');
  });

  kirim('#form-baru', async (f) => {
    const { error } = await db.auth.updateUser({ password: f.password.value });
    if (error) return tampil(terjemah(error), 'galat');
    location.href = 'dashboard.html';
  });
})();
