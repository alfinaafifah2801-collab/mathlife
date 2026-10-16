(async function () {
  const { $, h, tampilPesan, tanggal, PERAN } = ML;
  const app = $('#app');

  const galat = (e) => h('div', { class: 'pesan pesan-galat', role: 'alert' },
    'Gagal memuat data: ' + (e && e.message ? e.message : e) + '. Pastikan supabase/schema.sql sudah dijalankan.');

  if (!window.dbSiap) {
    app.replaceChildren(h('div', { class: 'pesan pesan-galat', role: 'alert' },
      'Konfigurasi Supabase belum diisi. Buka js/config.js, lalu isi alamat proyek dan kunci publik.'));
    return;
  }

  const { data: { session } } = await db.auth.getSession();
  if (!session) { location.replace('masuk.html'); return; }
  const user = session.user;

  const { data: profil, error: errProfil } = await db.from('profiles').select('*').eq('id', user.id).single();
  if (errProfil || !profil) {
    app.replaceChildren(galat(errProfil || 'Profil belum ditemukan'));
    return;
  }

  $('#nama-pengguna').textContent = profil.full_name || user.email;
  $('#peran-pengguna').textContent = PERAN[profil.role] || profil.role;
  $('#keluar').addEventListener('click', async () => {
    await db.auth.signOut();
    location.href = 'masuk.html';
  });

  // ---------- Pembantu ----------
  function panel(judul) {
    const isi = h('div', { class: 'isi' }, h('p', { class: 'redup' }, 'Memuat...'));
    const el = h('section', { class: 'panel' }, h('h2', null, judul), isi);
    return { el, isi };
  }

  function tabel(kolom, baris) {
    return h('div', { class: 'tabel-bungkus' }, h('table', null,
      h('thead', null, h('tr', null, kolom.map((k) => h('th', { scope: 'col' }, k)))),
      h('tbody', null, baris.map((r) => h('tr', null, r.map((c) => h('td', null, c)))))));
  }

  const BIMBEL = { paket_4_sesi: 'Paket 4 sesi', paket_8_sesi: 'Paket 8 sesi', kelompok: 'Kelas kelompok' };
  const STATUS_BIMBEL = { menunggu: 'Menunggu', terjadwal: 'Terjadwal', aktif: 'Aktif', selesai: 'Selesai', dibatalkan: 'Dibatalkan' };

  // ---------- Panel untuk siswa, guru, dan admin sekolah ----------
  function panelPaket(uid) {
    const p = panel('Paket aktif');
    async function muat() {
      const { data, error } = await db.from('user_packages')
        .select('expires_at, packages(name)')
        .eq('user_id', uid)
        .order('expires_at', { ascending: false });
      if (error) return p.isi.replaceChildren(galat(error));
      const aktif = (data || []).filter((x) => new Date(x.expires_at) > new Date());
      if (!aktif.length) {
        return p.isi.replaceChildren(h('p', null, 'Belum ada paket aktif. Tukar kode aktivasi untuk membuka materi dan game.'));
      }
      p.isi.replaceChildren(h('ul', { class: 'daftar' }, aktif.map((x) =>
        h('li', null,
          h('strong', null, (x.packages && x.packages.name) || 'Paket'),
          h('span', { class: 'redup' }, ' sampai ' + tanggal(x.expires_at))))));
    }
    muat();
    return { el: p.el, muat };
  }

  function panelTukarKode(setelahBerhasil) {
    const pesan = h('div');
    const input = h('input', {
      type: 'text', name: 'kode', placeholder: 'ML-XXXX-XXXX-XXXX',
      autocomplete: 'off', required: true, 'aria-label': 'Kode aktivasi'
    });
    const tombol = h('button', { type: 'submit', class: 'btn' }, 'Tukar kode');
    const form = h('form', {
      class: 'baris-form',
      onsubmit: async (e) => {
        e.preventDefault();
        tombol.disabled = true;
        tampilPesan(pesan, '');
        const { data, error } = await db.rpc('redeem_code', { p_code: input.value });
        tombol.disabled = false;
        if (error) return tampilPesan(pesan, error.message, 'galat');
        tampilPesan(pesan, 'Berhasil. ' + data + ' sudah aktif.', 'sukses');
        input.value = '';
        if (setelahBerhasil) setelahBerhasil();
      }
    }, input, tombol);
    const el = h('section', { class: 'panel' },
      h('h2', null, 'Tukar kode aktivasi'),
      h('p', { class: 'redup' }, 'Punya kode dari toko atau sekolah? Masukkan di sini.'),
      form, h('div', { style: 'margin-top: .8rem' }, pesan));
    return { el };
  }

  function panelProgres(uid) {
    const p = panel('Progres belajar');
    (async () => {
      const { data, error } = await db.from('progress').select('xp').eq('user_id', uid);
      if (error) return p.isi.replaceChildren(galat(error));
      const baris = data || [];
      const xp = baris.reduce((n, r) => n + (r.xp || 0), 0);
      const isi = [
        h('div', { class: 'angka' }, String(xp)),
        h('p', { class: 'redup' }, 'total XP dari ' + baris.length + ' aktivitas selesai')
      ];
      if (baris.length === 0) isi.push(h('p', null, 'Belum ada aktivitas. Hasil worksheet dan game akan tercatat di sini.'));
      p.isi.replaceChildren(...isi);
    })();
    return p;
  }

  function panelGame() {
    const p = panel('Game MathLife');
    const game = [
      ['Mall Simulator', 'Diskon, pajak, dan SPLDV', 'mall-simulator'],
      ['Math Bank', 'Bilangan, persen, dan bunga', 'math-bank'],
      ['Build It!', 'Luas, keliling, dan volume'],
      ['Math Trip', 'Koordinat dan garis lurus'],
      ['Data Detective', 'Statistika dan peluang'],
      ['Equation Puzzle', 'Aljabar dan persamaan']
    ];
    p.isi.replaceChildren(h('ul', { class: 'daftar' }, game.map(([nama, topik, ada]) =>
      h('li', null, h('strong', null, nama), ' ', h('span', { class: 'redup' }, topik), ' ',
        ada ? h('a', { class: 'btn btn-kecil', href: 'game.html?id=' + ada }, 'Main') : h('span', { class: 'lencana' }, 'Segera')))),
      h('p', { style: 'margin-top:.8rem' }, h('a', { href: 'game.html' }, 'Lihat semua game')));
    return p;
  }

  function panelBimbel(uid) {
    const p = panel('Daftar bimbel');
    const pesan = h('div');
    const daftar = h('div');
    const pilih = h('select', { name: 'pilihan', 'aria-label': 'Pilihan bimbel' },
      Object.entries(BIMBEL).map(([v, t]) => h('option', { value: v }, t)));
    const catatan = h('textarea', {
      name: 'catatan', maxlength: '300',
      placeholder: 'Jadwal yang kamu inginkan atau topik yang ingin dipelajari'
    });
    const tombol = h('button', { type: 'submit', class: 'btn' }, 'Kirim pendaftaran');

    async function muat() {
      const { data, error } = await db.from('bimbel_registrations')
        .select('choice, status, created_at')
        .eq('user_id', uid).order('created_at', { ascending: false }).limit(5);
      if (error) return daftar.replaceChildren(galat(error));
      if (!data.length) return daftar.replaceChildren();
      daftar.replaceChildren(h('h3', { style: 'margin-top: 1rem' }, 'Pendaftaranmu'), h('ul', { class: 'daftar' }, data.map((r) =>
        h('li', null, BIMBEL[r.choice] || r.choice, ' ',
          h('span', { class: 'lencana' }, STATUS_BIMBEL[r.status] || r.status), ' ',
          h('span', { class: 'redup' }, tanggal(r.created_at))))));
    }

    const form = h('form', {
      onsubmit: async (e) => {
        e.preventDefault();
        tombol.disabled = true;
        tampilPesan(pesan, '');
        const { error } = await db.from('bimbel_registrations')
          .insert({ user_id: uid, choice: pilih.value, note: catatan.value.trim() || null });
        tombol.disabled = false;
        if (error) return tampilPesan(pesan, 'Pendaftaran gagal: ' + error.message, 'galat');
        tampilPesan(pesan, 'Pendaftaran terkirim. Kami akan menghubungimu untuk mengatur jadwal.', 'sukses');
        catatan.value = '';
        muat();
      }
    },
      h('label', { class: 'field' }, h('span', null, 'Pilihan'), pilih),
      h('label', { class: 'field' }, h('span', null, 'Catatan (boleh dikosongkan)'), catatan),
      tombol);

    p.isi.replaceChildren(
      h('p', { class: 'redup' }, 'Belajar bersama tutor secara online. Kami menghubungimu setelah pendaftaran masuk.'),
      form, h('div', { style: 'margin-top: .8rem' }, pesan), daftar);
    muat();
    return p;
  }

  function panelSegera() {
    const p = panel('Kelas dan rekap progres');
    p.isi.replaceChildren(h('p', null, 'Fitur kelas, daftar siswa, dan rekap progres untuk guru dan sekolah sedang disiapkan.'));
    return p;
  }

  // ---------- Panel untuk admin platform ----------
  function adminKode() {
    const p = panel('Kode aktivasi');
    p.el.classList.add('lebar');
    const pesan = h('div');
    const pilihPaket = h('select', { name: 'paket', 'aria-label': 'Paket' });
    const jumlah = h('input', { type: 'number', name: 'jumlah', min: '1', max: '200', value: '10', 'aria-label': 'Jumlah kode' });
    const hasil = h('textarea', { class: 'kode-hasil', readonly: true, 'aria-label': 'Kode yang baru dibuat', placeholder: 'Kode yang baru dibuat muncul di sini, satu baris per kode.' });
    const salin = h('button', {
      type: 'button', class: 'btn btn-sekunder btn-kecil',
      onclick: async () => {
        if (!hasil.value) return;
        try { await navigator.clipboard.writeText(hasil.value); tampilPesan(pesan, 'Kode disalin.', 'sukses'); }
        catch { hasil.select(); tampilPesan(pesan, 'Salin manual dengan Ctrl+C.', 'info'); }
      }
    }, 'Salin semua');
    const tombol = h('button', { type: 'submit', class: 'btn' }, 'Buat kode');
    const riwayat = h('div');

    async function muatPaket() {
      const { data, error } = await db.from('packages').select('id, name').order('name');
      if (error) return pilihPaket.replaceChildren(h('option', { value: '' }, 'Gagal memuat paket'));
      pilihPaket.replaceChildren(...data.map((x) => h('option', { value: x.id }, x.name)));
    }

    async function muatRiwayat() {
      const { data, error } = await db.from('activation_codes')
        .select('code, used_by, created_at, packages(name)')
        .order('created_at', { ascending: false }).limit(30);
      if (error) return riwayat.replaceChildren(galat(error));
      riwayat.replaceChildren(h('h3', { style: 'margin-top: 1.25rem' }, '30 kode terbaru'),
        tabel(['Kode', 'Paket', 'Status', 'Dibuat'], data.map((r) => [
          h('code', null, r.code),
          (r.packages && r.packages.name) || '-',
          h('span', { class: 'lencana' + (r.used_by ? '' : ' lencana-hijau') }, r.used_by ? 'Dipakai' : 'Belum dipakai'),
          tanggal(r.created_at)
        ])));
    }

    const form = h('form', {
      onsubmit: async (e) => {
        e.preventDefault();
        tombol.disabled = true;
        tampilPesan(pesan, '');
        const { data, error } = await db.rpc('generate_codes', { p_package_id: pilihPaket.value, p_count: Number(jumlah.value) });
        tombol.disabled = false;
        if (error) return tampilPesan(pesan, error.message, 'galat');
        hasil.value = data.join('\n');
        tampilPesan(pesan, data.length + ' kode dibuat. Simpan atau salin sekarang, lalu kirim ke pembeli.', 'sukses');
        muatRiwayat();
      }
    },
      h('div', { class: 'baris-form' }, pilihPaket, jumlah, tombol));

    p.isi.replaceChildren(
      h('p', { class: 'redup' }, 'Buat kode untuk dijual lewat toko online atau diberikan ke sekolah. Satu kode hanya bisa dipakai sekali.'),
      form, h('div', { style: 'margin: .8rem 0' }, pesan), hasil, h('div', { style: 'margin-top: .5rem' }, salin), riwayat);
    muatPaket();
    muatRiwayat();
    return p;
  }

  function adminPengguna(uidSaya) {
    const p = panel('Pengguna dan peran');
    p.el.classList.add('lebar');
    const pesan = h('div');
    const wadah = h('div');

    function pilihPeran(u) {
      if (u.id === uidSaya) return PERAN[u.role] + ' (kamu)';
      return h('select', {
        'aria-label': 'Peran ' + (u.full_name || 'pengguna'),
        onchange: async (e) => {
          tampilPesan(pesan, '');
          const { error } = await db.from('profiles').update({ role: e.target.value }).eq('id', u.id);
          if (error) return tampilPesan(pesan, 'Gagal mengubah peran: ' + error.message, 'galat');
          tampilPesan(pesan, 'Peran ' + (u.full_name || 'pengguna') + ' diubah menjadi ' + PERAN[e.target.value] + '.', 'sukses');
        }
      }, Object.entries(PERAN).map(([v, t]) => h('option', { value: v, selected: v === u.role }, t)));
    }

    (async () => {
      const { data, error } = await db.from('profiles')
        .select('id, full_name, role, grade, created_at')
        .order('created_at', { ascending: false }).limit(100);
      if (error) return wadah.replaceChildren(galat(error));
      wadah.replaceChildren(tabel(['Nama', 'Kelas', 'Peran', 'Terdaftar'], data.map((u) => [
        u.full_name || '(tanpa nama)', u.grade ? 'Kelas ' + u.grade : '-', pilihPeran(u), tanggal(u.created_at)
      ])));
    })();

    p.isi.replaceChildren(
      h('p', { class: 'redup' }, 'Akun baru otomatis menjadi Siswa. Ubah peran guru dan admin sekolah di sini.'),
      pesan, wadah);
    return p;
  }

  function adminBimbel() {
    const p = panel('Pendaftar bimbel');
    p.el.classList.add('lebar');
    const pesan = h('div');
    const wadah = h('div');

    (async () => {
      const { data, error } = await db.from('bimbel_registrations')
        .select('id, choice, note, status, created_at, profiles(full_name)')
        .order('created_at', { ascending: false }).limit(50);
      if (error) return wadah.replaceChildren(galat(error));
      if (!data.length) return wadah.replaceChildren(h('p', null, 'Belum ada pendaftar.'));
      wadah.replaceChildren(tabel(['Nama', 'Pilihan', 'Catatan', 'Status', 'Masuk'], data.map((r) => [
        (r.profiles && r.profiles.full_name) || '-',
        BIMBEL[r.choice] || r.choice,
        r.note || '-',
        h('select', {
          'aria-label': 'Status pendaftaran',
          onchange: async (e) => {
            tampilPesan(pesan, '');
            const { error: err } = await db.from('bimbel_registrations').update({ status: e.target.value }).eq('id', r.id);
            if (err) return tampilPesan(pesan, 'Gagal mengubah status: ' + err.message, 'galat');
            tampilPesan(pesan, 'Status diperbarui.', 'sukses');
          }
        }, Object.entries(STATUS_BIMBEL).map(([v, t]) => h('option', { value: v, selected: v === r.status }, t))),
        tanggal(r.created_at)
      ])));
    })();

    p.isi.replaceChildren(pesan, wadah);
    return p;
  }

  // ---------- Susun halaman sesuai peran ----------
  const namaDepan = (profil.full_name || '').split(' ')[0] || 'teman';
  const keterangan = {
    siswa: 'Tukar kode untuk membuka paket, lalu mulai belajar.',
    guru: 'Tukar kode Paket Guru untuk membuka materi.',
    admin_sekolah: 'Kelola paket sekolahmu di sini.',
    admin_platform: 'Kelola kode aktivasi, pengguna, dan pendaftar bimbel.'
  }[profil.role] || '';

  const sapaan = h('div', { class: 'sapaan' },
    h('img', { src: 'assets/mathy-siap.png', alt: '', width: '84' }),
    h('div', null, h('h1', null, 'Halo, ' + namaDepan + '!'), h('p', { class: 'redup' }, keterangan),
      h('a', { class: 'btn btn-kecil', href: 'materi.html' }, 'Buka materi')));

  const grid = h('div', { class: 'grid-panel' });
  if (profil.role === 'admin_platform') {
    grid.append(adminKode().el, adminPengguna(user.id).el, adminBimbel().el);
  } else {
    const paket = panelPaket(user.id);
    grid.append(paket.el, panelTukarKode(() => paket.muat()).el);
    if (profil.role === 'siswa') {
      grid.append(panelProgres(user.id).el, panelBimbel(user.id).el, panelGame().el);
    } else {
      grid.append(panelSegera().el);
    }
  }
  app.replaceChildren(sapaan, grid);
})();
