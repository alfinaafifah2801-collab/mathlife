(async function () {
  const { $, h } = ML;
  const app = $('#app');

  if (!window.dbSiap) {
    app.replaceChildren(h('div', { class: 'pesan pesan-galat', role: 'alert' },
      'Konfigurasi Supabase belum diisi. Buka js/config.js, lalu isi alamat proyek dan kunci publik.'));
    return;
  }
  const { data: { session } } = await db.auth.getSession();
  if (!session) { location.replace('masuk.html'); return; }
  const uid = session.user.id;

  const params = new URLSearchParams(location.search);
  const idBab = params.get('bab');
  const kelasDipilih = [7, 8, 9].includes(Number(params.get('kelas'))) ? Number(params.get('kelas')) : 7;

  // ---------- Tampilan satu bab: daftar subbab ----------
  if (idBab) {
    const ketemu = window.cariBab(idBab);
    if (!ketemu) {
      app.replaceChildren(h('p', null, 'Bab tidak ditemukan. '), h('a', { href: 'materi.html' }, 'Kembali ke daftar materi'));
      return;
    }
    const { kelas, bab } = ketemu;
    document.title = bab.judul + ' | MathLife';

    // Subbab yang sudah ditandai selesai oleh siswa ini.
    const selesai = new Set();
    const { data: baris } = await db.from('progress').select('item_key').eq('user_id', uid)
      .like('item_key', idBab + '-s%|selesai');
    (baris || []).forEach((r) => selesai.add(r.item_key.split('|')[0]));

    const daftar = (bab.subbab || []).map((s) => {
      const isi = h('div', null,
        h('strong', null, s.no + '  ' + s.judul),
        s.gratis && s.tersedia ? h('span', { class: 'lencana lencana-hijau', style: 'margin-left:.5rem' }, 'Pratinjau gratis') : null);
      if (!s.tersedia) {
        return h('div', { class: 'baris-sub' }, isi, h('span', { class: 'lencana' }, 'Segera'));
      }
      return h('div', { class: 'baris-sub' }, isi,
        h('a', { class: 'btn btn-kecil' + (selesai.has(s.id) ? ' btn-sekunder' : ''), href: 'subbab.html?id=' + s.id },
          selesai.has(s.id) ? 'Ulangi' : 'Mulai'));
    });

    app.replaceChildren(
      h('p', null, h('a', { href: 'materi.html?kelas=' + kelas }, '‹ Kelas ' + kelas)),
      h('h1', null, 'Bab ' + bab.no + ': ' + bab.judul),
      h('p', { class: 'redup' }, bab.cakupan),
      h('section', { class: 'panel', style: 'margin-top:1.25rem' }, h('h2', null, 'Subbab'), ...daftar),
      bab.game ? h('section', { class: 'panel', style: 'margin-top:1.25rem' },
        h('h2', null, 'Game dan Final Challenge'),
        h('p', null, 'Game bab ini: ' + bab.game + '. Final Challenge bab dibuka setelah semua subbab selesai.'),
        h('span', { class: 'lencana' }, 'Segera')) : null);
    return;
  }

  // ---------- Tampilan satu kelas: daftar bab ----------
  const dataKelas = window.KURIKULUM.find((k) => k.kelas === kelasDipilih);
  document.title = 'Materi Kelas ' + kelasDipilih + ' | MathLife';

  const tab = h('nav', { class: 'tab-kelas', 'aria-label': 'Pilih kelas' }, [7, 8, 9].map((k) =>
    h('a', { href: 'materi.html?kelas=' + k, 'aria-current': k === kelasDipilih ? 'page' : null }, 'Kelas ' + k)));

  const kartu = dataKelas.bab.map((b) => {
    const ada = window.babTersedia(b);
    const isi = [
      h('span', { class: 'no-bab' }, 'Bab ' + b.no),
      h('h3', null, b.judul),
      h('p', null, b.cakupan),
      b.game ? h('p', { class: 'redup', style: 'font-size:.9rem' }, 'Game: ' + b.game) : null,
      ada ? h('span', { class: 'lencana lencana-hijau' }, 'Tersedia') : h('span', { class: 'lencana' }, 'Segera')
    ];
    return ada
      ? h('a', { class: 'kartu-bab', href: 'materi.html?bab=' + b.id }, isi)
      : h('div', { class: 'kartu-bab segera', 'aria-disabled': 'true' }, isi);
  });

  app.replaceChildren(
    h('h1', null, 'Materi matematika SMP'),
    h('p', { class: 'redup' }, 'Pilih kelas, lalu pilih bab. Bab yang belum siap ditandai Segera.'),
    tab,
    h('div', { class: 'grid-bab' }, kartu));
})();
