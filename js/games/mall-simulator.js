// Game Mall Simulator. Dua mode:
// 1) Belanja Pintar (3 tingkat): peta mall, daftar belanja dengan anggaran, antrean kasir, hitung diskon, pajak 10%, dan kembalian.
// 2) Detektif Struk (3 tingkat): dua nota belanja, cari harga satuan barang (SPLDV).
window.GAMES = window.GAMES || {};
(function () {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pilih = (arr) => arr[rnd(0, arr.length - 1)];
  const rp = (n) => (n < 0 ? '\u2212' : '') + 'Rp' + Math.round(Math.abs(n)).toLocaleString('id-ID');

  const TOKO = {
    fashion: { nama: 'Fashion Store', ikon: '\uD83D\uDC55', items: [
      { n: 'Kaos polos', h: 75000, d: 20, e: '\uD83D\uDC55' }, { n: 'Topi', h: 45000, d: 10, e: '\uD83E\uDDE2' },
      { n: 'Sepatu kanvas', h: 250000, d: 30, e: '\uD83D\uDC5F' }, { n: 'Tas selempang', h: 120000, d: 0, e: '\uD83D\uDC5C' }] },
    food: { nama: 'Food Court', ikon: '\uD83C\uDF5B', items: [
      { n: 'Nasi ayam geprek', h: 25000, d: 0, e: '\uD83C\uDF5B' }, { n: 'Mie bakso', h: 20000, d: 15, e: '\uD83C\uDF5C' },
      { n: 'Es teh manis', h: 6000, d: 0, e: '\uD83E\uDDCB' }, { n: 'Donat', h: 12000, d: 10, e: '\uD83C\uDF69' }] },
    market: { nama: 'Supermarket', ikon: '\uD83D\uDED2', items: [
      { n: 'Beras 5 kg', h: 62000, d: 0, e: '\uD83C\uDF3E' }, { n: 'Minyak goreng', h: 34000, d: 5, e: '\uD83D\uDEE2\uFE0F' },
      { n: 'Susu kotak', h: 18000, d: 20, e: '\uD83E\uDD5B' }, { n: 'Sabun mandi', h: 12000, d: 20, e: '\uD83E\uDDFC' }] },
    jus: { nama: 'Kios Jus', ikon: '\uD83E\uDD64', items: [
      { n: 'Jus alpukat', h: 16000, d: 0, e: '\uD83E\uDD51' }, { n: 'Jus jeruk', h: 14000, d: 10, e: '\uD83C\uDF4A' },
      { n: 'Roti isi', h: 9000, d: 0, e: '\uD83E\uDD56' }, { n: 'Smoothie naga', h: 20000, d: 15, e: '\uD83C\uDF53' }] }
  };
  // Posisi toko di peta (persen). x = tempat si pemain berdiri di koridor.
  const PETA = {
    fashion: { kiri: '6%', atas: '4%', x: 18 },
    food: { kiri: '34%', atas: '4%', x: 46 },
    market: { kiri: '6%', atas: '64%', x: 18 },
    jus: { kiri: '34%', atas: '64%', x: 46 }
  };
  const hargaDiskon = (it) => it.h - (it.h * it.d) / 100;
  const ok = (arr) => arr.filter(Boolean);
  const SEMUA = [];
  Object.keys(TOKO).forEach((k) => TOKO[k].items.forEach((it) => SEMUA.push(Object.assign({ toko: k }, it))));

  const NYAWA_KASIR = 4;
  const WAKTU = [0, 150, 180, 210]; // detik per tingkat
  const NAMA_TINGKAT = ['', 'Mudah', 'Sedang', 'Sulit'];

  // ---------- Misi belanja ----------
  // Daftar barang dengan jumlah, anggaran yang cukup (termasuk pajak 10%), dan tahap hitungan di kasir.
  function buatMisi(tingkat) {
    const nJenis = [0, 2, 3, 4][tingkat];
    const maksQty = [0, 1, 2, 3][tingkat];
    for (let coba = 0; coba < 200; coba += 1) {
      const pilihan = SEMUA.slice().sort(() => Math.random() - 0.5).slice(0, nJenis);
      if (!pilihan.some((it) => it.d > 0)) continue;
      if (tingkat >= 2 && new Set(pilihan.map((it) => it.toko)).size < 2) continue;
      const daftar = pilihan.map((it) => ({ it, qty: tingkat === 1 ? 1 : rnd(1, maksQty) }));
      if (tingkat >= 2 && daftar.every((d) => d.qty === 1)) continue;
      const subtotal = daftar.reduce((a, d) => a + hargaDiskon(d.it) * d.qty, 0);
      const normal = daftar.reduce((a, d) => a + d.it.h * d.qty, 0);
      const pajak = Math.round(subtotal * 0.1);
      const total = subtotal + pajak;
      const anggaran = Math.ceil((total * 1.1) / 10000) * 10000;
      return {
        tingkat, daftar, subtotal, normal, hemat: normal - subtotal, pajak, total, anggaran, kembali: anggaran - total,
        waktu: WAKTU[tingkat], tahap: tingkat === 1 ? ['total', 'kembali'] : ['hemat', 'total', 'kembali']
      };
    }
    return buatMisi(tingkat);
  }
  window.GAMES.__buatMisi = buatMisi; // dipakai untuk pengujian

  // ---------- Soal Detektif Struk ----------
  // Pasangan barang untuk soal Detektif Struk (harga dalam kelipatan Rp500).
  const PASANGAN = [
    { a: 'kaos', b: 'topi', xs: [60000, 90000], ys: [30000, 55000] },
    { a: 'jus', b: 'roti', xs: [12000, 20000], ys: [7000, 12000] },
    { a: 'nasi', b: 'es teh', xs: [15000, 28000], ys: [4000, 9000] },
    { a: 'buku', b: 'pulpen', xs: [8000, 20000], ys: [2000, 8000] },
    { a: 'susu', b: 'roti', xs: [10000, 22000], ys: [6000, 12000] },
    { a: 'sabun', b: 'sikat gigi', xs: [8000, 16000], ys: [5000, 12000] }
  ];

  // Membuat satu soal: harga x dan y bulat, dua persamaan dengan penyelesaian tunggal.
  function buatSoal(tingkat) {
    const p = pilih(PASANGAN);
    const x = rnd(p.xs[0] / 500, p.xs[1] / 500) * 500;
    const y = rnd(p.ys[0] / 500, p.ys[1] / 500) * 500;
    for (let coba = 0; coba < 200; coba += 1) {
      let a1; let b1; let a2; let b2;
      if (tingkat === 1) { // koefisien salah satu barang sama: langsung eliminasi
        a1 = rnd(1, 4); b1 = rnd(1, 4);
        if (Math.random() < 0.5) { a2 = a1; b2 = rnd(1, 4); } else { b2 = b1; a2 = rnd(1, 4); }
      } else if (tingkat === 2) { // ada koefisien 1: mudah diubah menjadi x = ... (substitusi)
        a1 = 1; b1 = rnd(1, 3); a2 = rnd(2, 4); b2 = rnd(1, 4);
      } else { // campuran
        a1 = rnd(1, 5); b1 = rnd(1, 5); a2 = rnd(1, 5); b2 = rnd(1, 5);
      }
      const det = a1 * b2 - a2 * b1;
      if (det === 0 || (a1 === a2 && b1 === b2)) continue;
      if (tingkat === 3 && (a1 === a2 || b1 === b2 || a1 === 1 || a2 === 1 || b1 === 1 || b2 === 1)) continue;
      const c1 = a1 * x + b1 * y;
      const c2 = a2 * x + b2 * y;
      return {
        a: p.a, b: p.b, x, y,
        nota: [{ qa: a1, qb: b1, total: c1 }, { qa: a2, qb: b2, total: c2 }],
        petunjuk: tingkat === 1
          ? 'Ada barang yang jumlahnya sama di kedua nota. Kurangkan kedua nota untuk menghilangkan satu barang (eliminasi).'
          : tingkat === 2
            ? 'Ada barang yang jumlahnya 1. Ubah menjadi "harga = ...", lalu substitusikan ke nota lain.'
            : 'Samakan jumlah salah satu barang dengan mengalikan nota, lalu kurangkan atau jumlahkan (eliminasi), dan substitusi untuk barang kedua.',
        bahas: ['Nota 1: ' + a1 + 'x + ' + b1 + 'y = ' + rp(c1) + '. Nota 2: ' + a2 + 'x + ' + b2 + 'y = ' + rp(c2) + ' (x = harga ' + p.a + ', y = harga ' + p.b + ').',
          'Penyelesaian: x = ' + rp(x) + ' dan y = ' + rp(y) + '.',
          'Periksa: ' + a1 + '(' + rp(x) + ') + ' + b1 + '(' + rp(y) + ') = ' + rp(c1) + ' dan ' + a2 + '(' + rp(x) + ') + ' + b2 + '(' + rp(y) + ') = ' + rp(c2) + '.']
      };
    }
    return buatSoal(tingkat);
  }
  window.GAMES.__buatSoalSPLDV = buatSoal; // dipakai untuk pengujian

  const LENCANA = [
    { id: 'pertama', ikon: '🛍️', nama: 'Belanja Perdana', syarat: 'Menangkan 1 misi belanja' },
    { id: 'kilat', ikon: '⚡', nama: 'Belanja Kilat', syarat: 'Selesaikan misi dengan sisa waktu lebih dari separuh' },
    { id: 'sempurna', ikon: '💎', nama: 'Kasir Jago', syarat: 'Semua hitungan kasir benar di percobaan pertama' },
    { id: 'tigabintang', ikon: '🌟', nama: 'Bintang Mall', syarat: 'Raih 3 bintang di mode mana pun' },
    { id: 'detektif', ikon: '🕵️', nama: 'Detektif Handal', syarat: 'Pecahkan 5 dari 5 nota dalam satu kasus' },
    { id: 'sultan', ikon: '👑', nama: 'Sultan Mall', syarat: 'Menangkan misi belanja tingkat Sulit' }
  ];

  window.GAMES['mall-simulator'] = {
    nama: 'Mall Simulator',
    daftarLencana: LENCANA,
    custom(ctx) {
      const { app, h, parseAngka, simpanSkor, terbaik, punyaPaket } = ctx;
      const FX = window.GameFX;
      const lencana = ctx.lencana;

      // ---------- Menu ----------
      function menu() {
        const mode = [
          { id: 'belanja', no: 'Mode 1 \u00B7 Mudah', nama: 'Belanja Pintar', desk: 'Ikuti daftar belanja dengan anggaran terbatas. 2 barang, lalu hitung total dengan pajak 10% dan kembalian di kasir.', gratis: true, aksi: () => belanja(1) },
          { id: 'belanja-2', no: 'Mode 1 \u00B7 Sedang', nama: 'Belanja Pintar', desk: '3 barang dengan jumlah lebih dari satu. Hitung juga total hemat dari diskon.', gratis: false, aksi: () => belanja(2) },
          { id: 'belanja-3', no: 'Mode 1 \u00B7 Sulit', nama: 'Belanja Pintar', desk: '4 barang dari beberapa toko, waktu lebih ketat, dan lokasi barang tidak diberi tahu.', gratis: false, aksi: () => belanja(3) },
          { id: 'detektif-1', no: 'Mode 2 \u00B7 Mudah', nama: 'Detektif Struk', desk: 'Dua nota belanja, cari harga satu barang. Ada barang yang jumlahnya sama di kedua nota (eliminasi).', gratis: true, aksi: () => detektif(1) },
          { id: 'detektif-2', no: 'Mode 2 \u00B7 Sedang', nama: 'Detektif Struk', desk: 'Ada barang yang jumlahnya 1, cocok untuk substitusi.', gratis: false, aksi: () => detektif(2) },
          { id: 'detektif-3', no: 'Mode 2 \u00B7 Sulit', nama: 'Detektif Struk', desk: 'Angka lebih beragam. Pakai metode campuran.', gratis: false, aksi: () => detektif(3) }
        ];
        app.replaceChildren(
          h('p', null, h('a', { href: 'game.html' }, '\u2039 Semua game')),
          h('div', { class: 'game-kepala' },
            h('img', { src: 'assets/mathy-game.png', alt: '', width: '110' }),
            h('div', null, h('h1', null, 'Mall Simulator'), h('p', null, 'Jelajahi mall, belanja sesuai daftar dengan anggaran terbatas, lalu hitung di kasir. Mode Detektif Struk melatih SPLDV dari nota belanja.'))),
          FX.kontrol(),
          h('div', { class: 'grid-bab' }, mode.map((m) => {
            const kunci = !m.gratis && !punyaPaket;
            const skor = terbaik.get(m.id);
            return h('div', { class: 'kartu-bab' + (kunci ? ' segera' : '') },
              h('span', { class: 'no-bab' }, m.no), h('h3', null, m.nama), h('p', null, m.desk),
              h('p', { class: 'redup', style: 'font-size:.9rem' }, skor ? 'Skor terbaik: ' + skor : 'Belum dimainkan'),
              kunci ? h('a', { class: 'btn btn-kecil btn-sekunder', href: 'dashboard.html' }, 'Buka dengan Paket Worksheet + Game')
                : h('button', { type: 'button', class: 'btn btn-kecil', onclick: m.aksi }, skor ? 'Main lagi' : 'Mulai'));
          })),
          h('section', { class: 'gx-bagian-lencana' }, h('h2', null, 'Lencana'), lencana.galeri()));
      }

      // ---------- Mode 1: Belanja Pintar ----------
      function belanja(tingkat) {
        const misi = buatMisi(tingkat);
        window.GAMES.__misiTerakhir = misi; // dipakai untuk pengujian
        const kunciSkor = tingkat === 1 ? 'belanja' : 'belanja-' + tingkat;
        const S = {
          cart: {}, nyawa: NYAWA_KASIR, total: misi.waktu * 1000, sisa: misi.waktu * 1000, tikAt: performance.now(),
          jeda: false, dikasir: false, selesai: false, tahap: 0, poin: 0, pertama: 0, percobaan: 0, terbuka: { pajak: false, total: false }, baruLencana: []
        };
        const mathy = FX.mathy(78);
        const chipWaktu = h('span', { class: 'gx-chip waktu' });
        const chipNyawa = h('span', { class: 'gx-chip' });
        const hud = h('div', { class: 'gx-hud' });
        const notif = h('div', { class: 'gx-notif', 'aria-live': 'polite' });
        const area = h('div');
        const panelDaftar = h('section', { class: 'panel' });
        const panelKeranjang = h('section', { class: 'panel keranjang' });
        const pemain = h('div', { class: 'gx-pemain', 'aria-hidden': 'true', style: 'left:3%;top:50%' }, '\uD83E\uDDD1');
        let segarkanToko = null; // diisi saat sebuah toko dibuka, agar tulisan "Di keranjang" ikut berubah
        const jumlah = (nama) => (S.cart[nama] ? S.cart[nama].qty : 0);
        const isiKeranjang = () => Object.keys(S.cart).map((k) => S.cart[k]).filter((c) => c.qty > 0);
        const subtotalKeranjang = () => isiKeranjang().reduce((a, c) => a + hargaDiskon(c.it) * c.qty, 0);

        function notifikasi(teks, jenis) { notif.className = 'gx-notif' + (jenis ? ' ' + jenis : ''); notif.textContent = teks; }
        function perbaruiHud() {
          const menit = Math.floor(Math.max(0, S.sisa) / 60000);
          const detik = Math.floor((Math.max(0, S.sisa) % 60000) / 1000);
          chipWaktu.textContent = FX.santai.aktif() ? '\u23F1\uFE0F Mode santai' : '\u23F1\uFE0F ' + menit + ':' + String(detik).padStart(2, '0');
          chipWaktu.className = 'gx-chip waktu' + (!FX.santai.aktif() && S.sisa / S.total < 0.2 ? ' bahaya' : '');
          chipNyawa.replaceChildren('\u2764\uFE0F'.repeat(S.nyawa) + '\uD83D\uDDA4'.repeat(NYAWA_KASIR - S.nyawa));
          chipNyawa.setAttribute('aria-label', 'Kesabaran kasir ' + S.nyawa + ' dari ' + NYAWA_KASIR);
          hud.replaceChildren(
            h('span', { class: 'gx-chip' }, 'Belanja Pintar \u00B7 ' + NAMA_TINGKAT[tingkat]),
            h('span', { class: 'gx-chip koin' }, '\uD83D\uDCB0 Anggaran ', h('strong', null, rp(misi.anggaran))),
            chipWaktu, chipNyawa);
        }
        const timer = setInterval(() => {
          if (!hud.isConnected) { clearInterval(timer); return; }
          const now = performance.now();
          const dt = Math.min(now - S.tikAt, 500);
          S.tikAt = now;
          if (S.selesai || S.jeda) return;
          if (!FX.santai.aktif()) S.sisa -= dt;
          perbaruiHud();
          if (S.sisa <= 0 && !FX.santai.aktif()) akhir(false, 'waktu');
        }, 250);

        // Panel samping: daftar belanja, keranjang, dan meter anggaran
        function renderPanel() {
          const sub = subtotalKeranjang();
          const lewat = sub * 1.1 > misi.anggaran;
          panelDaftar.replaceChildren(
            h('div', { class: 'gx-toko-kepala' }, mathy.el),
            h('h2', null, 'Daftar belanja'),
            h('ul', { class: 'gx-daftar' }, misi.daftar.map((d) => {
              const punya = jumlah(d.it.n);
              const status = punya === d.qty ? 'ok' : punya > d.qty ? 'lebih' : '';
              return h('li', { class: status, 'data-nama': d.it.n, 'data-qty': String(d.qty) },
                h('span', null, d.it.e + ' ' + d.qty + '\u00D7 ' + d.it.n, tingkat < 3 ? h('small', null, TOKO[d.it.toko].nama) : null),
                h('strong', null, punya === d.qty ? '\u2713' : punya > d.qty ? '\u26A0 kelebihan' : punya + '/' + d.qty));
            })));
          const baris = isiKeranjang();
          panelKeranjang.replaceChildren(...ok([
            h('h2', null, 'Keranjang'),
            baris.length ? h('ul', { class: 'gx-daftar' }, baris.map((c) => h('li', null,
              h('span', null, c.it.e + ' ' + c.it.n, h('small', null, rp(hargaDiskon(c.it)) + ' per buah')),
              h('span', { class: 'gx-qty' },
                h('button', { type: 'button', disabled: S.dikasir, 'aria-label': 'Kurangi ' + c.it.n, onclick: () => ubah(c.it, -1) }, '\u2212'),
                h('strong', null, c.qty),
                h('button', { type: 'button', disabled: S.dikasir, 'aria-label': 'Tambah ' + c.it.n, onclick: (e) => ubah(c.it, 1, e.currentTarget) }, '+'))))) : h('p', { class: 'redup' }, 'Keranjang masih kosong.'),
            h('div', { class: 'gx-anggaran' + (lewat ? ' bahaya' : '') },
              h('div', { class: 'gx-garis' }, h('span', { style: 'width:' + Math.min(100, Math.round((sub / misi.anggaran) * 100)) + '%' })),
              h('small', null, 'Subtotal ' + rp(sub) + ' dari anggaran ' + rp(misi.anggaran) + (lewat ? '. Ingat, pajak 10% ikut dihitung di kasir!' : '. Pajak 10% dihitung di kasir.'))),
            h('button', { type: 'button', class: 'btn btn-kecil', disabled: baris.length === 0 || S.jeda || S.selesai, onclick: keKasir }, '\uD83D\uDED2 Bawa ke kasir')]));
        }
        function ubah(it, d, tombol) {
          if (S.jeda || S.selesai || S.dikasir) return;
          const fokus = document.activeElement && panelKeranjang.contains(document.activeElement) ? document.activeElement.getAttribute('aria-label') : null;
          if (!S.cart[it.n]) S.cart[it.n] = { it, qty: 0 };
          S.cart[it.n].qty = Math.max(0, S.cart[it.n].qty + d);
          if (d > 0) { FX.bunyi('koin'); FX.terbang(tombol, panelKeranjang, it.e); } else FX.bunyi('klik');
          notifikasi('');
          renderPanel();
          if (fokus) { const b = panelKeranjang.querySelector('[aria-label="' + fokus + '"]'); if (b) b.focus({ preventScroll: true }); }
          if (segarkanToko) segarkanToko();
        }

        // Peta mall
        function geser(x, selesai) {
          pemain.style.left = x + '%'; pemain.style.top = '50%';
          if (FX.reduksi()) { selesai(); return; }
          setTimeout(selesai, 720);
        }
        function tampilPeta() {
          if (S.jeda || S.selesai) return;
          segarkanToko = null;
          const peta = h('div', { class: 'gx-peta', role: 'group', 'aria-label': 'Peta mall' },
            h('div', { class: 'gx-koridor', 'aria-hidden': 'true' }),
            h('div', { class: 'gx-pintu', 'aria-hidden': 'true' }, 'MASUK'),
            Object.keys(TOKO).map((k) => h('button', {
              type: 'button', class: 'gx-toko-peta', style: 'left:' + PETA[k].kiri + ';top:' + PETA[k].atas,
              'aria-label': 'Masuk ke ' + TOKO[k].nama, onclick: () => masukToko(k)
            }, h('span', { class: 'ik', 'aria-hidden': 'true' }, TOKO[k].ikon), h('span', null, TOKO[k].nama), h('small', null, TOKO[k].items.length + ' barang'))),
            h('button', {
              type: 'button', class: 'gx-toko-peta kasir', style: 'left:70%;top:34%;height:32%;width:26%', 'aria-label': 'Pergi ke kasir', onclick: keKasir
            }, h('span', { class: 'ik', 'aria-hidden': 'true' }, '\uD83E\uDDFE'), h('span', null, 'Kasir'), h('small', null, 'bayar di sini')),
            pemain);
          area.replaceChildren(h('p', { class: 'redup' }, 'Klik toko untuk masuk. Si Mathy berjalan ke sana.'), peta);
        }
        function masukToko(k) {
          if (S.jeda || S.selesai) return;
          FX.bunyi('klik');
          geser(PETA[k].x, () => bukaToko(k));
        }
        function bukaToko(k) {
          const t = TOKO[k];
          mathy.set('senang', t.items.some((it) => it.d > 0) ? 'Ada barang diskon di sini!' : 'Cari barang di daftar!');
          const info = {};
          t.items.forEach((it) => { info[it.n] = h('p', { class: 'redup', style: 'font-size:.85rem;min-height:1.2rem' }); });
          segarkanToko = () => t.items.forEach((it) => { info[it.n].textContent = jumlah(it.n) ? 'Di keranjang: ' + jumlah(it.n) : ''; });
          area.replaceChildren(
            h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: tampilPeta }, '\u2039 Kembali ke peta mall')),
            h('div', { class: 'gx-toko-kepala' }, h('span', { class: 'ik', 'aria-hidden': 'true' }, t.ikon), h('h2', null, t.nama)),
            h('div', { class: 'grid-bab' }, t.items.map((it) => h('div', { class: 'produk' },
              h('div', { class: 'toko-ikon', 'aria-hidden': 'true' }, it.e),
              h('strong', null, it.n),
              it.d ? h('p', { class: 'harga' }, h('span', { class: 'coret' }, rp(it.h)), ' ', h('span', { class: 'lencana lencana-hijau' }, '\u2212' + it.d + '%'), h('br'), rp(hargaDiskon(it)))
                : h('p', { class: 'harga' }, rp(it.h)),
              info[it.n],
              h('button', { type: 'button', class: 'btn btn-kecil', 'aria-label': 'Tambah ' + it.n + ' dari ' + t.nama, onclick: (e) => ubah(it, 1, e.currentTarget) }, '+ Keranjang')))));
          segarkanToko();
        }

        // Kasir
        function cocokDenganDaftar() {
          const kurang = []; const lebih = [];
          misi.daftar.forEach((d) => {
            const p = jumlah(d.it.n);
            if (p < d.qty) kurang.push((d.qty - p) + '\u00D7 ' + d.it.n);
            else if (p > d.qty) lebih.push((p - d.qty) + '\u00D7 ' + d.it.n);
          });
          isiKeranjang().forEach((c) => { if (!misi.daftar.some((d) => d.it.n === c.it.n)) lebih.push(c.qty + '\u00D7 ' + c.it.n); });
          return { kurang, lebih, ok: !kurang.length && !lebih.length };
        }
        function keKasir() {
          if (S.jeda || S.selesai) return;
          if (!isiKeranjang().length) { FX.bunyi('salah'); notifikasi('Keranjangmu masih kosong. Masuk ke toko dulu.', 'salah'); return; }
          const c = cocokDenganDaftar();
          if (!c.ok) {
            FX.bunyi('salah'); mathy.set('mikir', 'Cek lagi daftarnya.');
            notifikasi('Belanjaanmu belum sesuai daftar.' + (c.kurang.length ? ' Kurang: ' + c.kurang.join(', ') + '.' : '') + (c.lebih.length ? ' Kelebihan: ' + c.lebih.join(', ') + '.' : ''), 'salah');
            return;
          }
          notifikasi('');
          antriKasir();
        }
        function antriKasir() {
          S.jeda = true; S.dikasir = true; renderPanel();
          let sisa = tingkat + 1;
          const antri = h('div', { class: 'gx-antri', 'aria-hidden': 'true' });
          const info = h('p', { class: 'soal-teks', 'aria-live': 'polite' });
          const gambar = () => {
            antri.replaceChildren(...Array.from({ length: sisa }, () => h('span', null, pilih(['\uD83E\uDDD1\u200D\uD83E\uDDB1', '\uD83D\uDC69\u200D\uD83E\uDDB0', '\uD83D\uDC68\u200D\uD83E\uDDB3', '\uD83D\uDC75', '\uD83E\uDDD4']))), h('span', { class: 'kamu' }, '\uD83E\uDDD1 kamu'));
            info.textContent = sisa ? 'Antrean kasir: ' + sisa + ' orang di depanmu\u2026' : 'Giliranmu!';
          };
          gambar();
          area.replaceChildren(h('div', { class: 'gx-kasir-adegan' }, h('h2', null, '\uD83E\uDDFE Antrean kasir'), antri, info));
          mathy.set('senang', 'Sabar ya, antre dulu.');
          const iv = setInterval(() => {
            if (!area.isConnected) { clearInterval(iv); return; }
            sisa -= 1; FX.bunyi('kasir'); gambar();
            if (sisa <= 0) {
              clearInterval(iv);
              setTimeout(() => { S.jeda = false; S.tikAt = performance.now(); mathy.set('mikir', 'Giliranmu, hitung dengan teliti!'); tahapKasir(); }, FX.reduksi() ? 0 : 500);
            }
          }, FX.reduksi() ? 50 : 800);
        }
        const SOAL = {
          hemat: { tanya: 'Berapa rupiah total potongan diskon yang kamu dapatkan? (harga normal dikurangi harga setelah diskon)', jawab: () => misi.hemat, petunjuk: 'Potongan tiap barang = harga normal \u2212 harga diskon, lalu kalikan dengan jumlahnya. Jumlahkan semuanya.' },
          total: { tanya: 'Pajak 10% dari subtotal. Berapa total yang harus dibayar?', jawab: () => misi.total, petunjuk: 'Total = subtotal + 10% \u00D7 subtotal = ' + rp(misi.subtotal) + ' \u00D7 1,1.' },
          kembali: { tanya: 'Kamu membayar dengan uang anggaranmu, ' + rp(misi.anggaran) + '. Berapa kembaliannya?', jawab: () => misi.kembali, petunjuk: 'Kembalian = ' + rp(misi.anggaran) + ' \u2212 total yang kamu bayar.' }
        };
        function tahapKasir() {
          if (S.selesai) return;
          const nama = misi.tahap[S.tahap];
          const soal = SOAL[nama];
          S.percobaan = 0;
          const umpan = h('div', { class: 'umpan', 'aria-live': 'polite' });
          const masuk = h('input', {
            type: 'text', autocomplete: 'off', 'aria-label': 'Jawabanmu', placeholder: 'Tulis angkanya',
            onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); cek.click(); } }
          });
          const cek = h('button', { type: 'button', class: 'btn', onclick: () => {
            if (S.selesai) return;
            const v = parseAngka(masuk.value);
            if (Number.isNaN(v)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Tulis jawabanmu dalam angka.')); return; }
            S.percobaan += 1;
            if (Math.abs(v - soal.jawab()) < 1e-9) {
              const poin = S.percobaan === 1 ? 20 : 10;
              S.poin += poin; if (S.percobaan === 1) S.pertama += 1;
              FX.bunyi('benar'); setTimeout(() => FX.bunyi('koin'), 170);
              FX.meledakDi(cek, ['\u2728', '\uD83E\uDE99', '\u2B50'], 10);
              mathy.set('girang', 'Tepat! +' + poin + ' poin');
              if (nama === 'total') { S.terbuka.pajak = true; S.terbuka.total = true; }
              S.tahap += 1;
              if (S.tahap >= misi.tahap.length) akhir(true); else tahapKasir();
            } else {
              S.nyawa -= 1; FX.bunyi('salah'); mathy.set('sedih', 'Hati kasir berkurang.');
              perbaruiHud();
              if (S.nyawa <= 0) { akhir(false, 'kasir'); return; }
              umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat (hati berkurang). Petunjuk: ' + soal.petunjuk));
              masuk.select();
            }
          } }, 'Cek jawaban');
          const resi = h('div', { class: 'resi' },
            ...misi.daftar.map((d) => h('div', { class: 'resi-baris' },
              h('span', null, d.it.e + ' ' + d.qty + '\u00D7 ' + d.it.n + (nama === 'hemat' && d.it.d ? ' (normal ' + rp(d.it.h) + ', diskon ' + d.it.d + '%)' : '')),
              h('strong', null, rp(hargaDiskon(d.it) * d.qty)))),
            nama !== 'hemat' || S.tahap > 0 ? h('div', { class: 'resi-baris' }, h('span', null, 'Subtotal'), h('strong', null, rp(misi.subtotal))) : null,
            nama === 'hemat' ? h('div', { class: 'resi-baris' }, h('span', null, 'Harga normal semua barang'), h('strong', null, rp(misi.normal))) : null,
            S.terbuka.pajak ? h('div', { class: 'resi-baris' }, h('span', null, 'Pajak 10%'), h('strong', null, rp(misi.pajak))) : null,
            S.terbuka.total ? h('div', { class: 'resi-baris' }, h('span', null, 'Total dibayar'), h('strong', null, rp(misi.total))) : null);
          area.replaceChildren(
            h('h2', null, '\uD83E\uDDFE Kasir (' + (S.tahap + 1) + '/' + misi.tahap.length + ')'), resi,
            h('p', { class: 'soal-teks' }, soal.tanya),
            h('div', { class: 'baris-form isian' }, h('span', { class: 'satuan' }, 'Rp'), masuk, cek), umpan);
          masuk.focus({ preventScroll: true });
        }

        // Layar menang atau kalah
        async function akhir(menang, alasan) {
          if (S.selesai) return;
          S.selesai = true; S.jeda = true; clearInterval(timer);
          const santai = FX.santai.aktif();
          const bonusWaktu = menang && !santai ? Math.round((Math.max(0, S.sisa) / S.total) * 20) : 0;
          const bonusHati = menang ? S.nyawa * 5 : 0;
          const skor = menang ? 40 + S.poin + bonusWaktu + bonusHati : 0;
          const maks = 40 + 20 * misi.tahap.length + 40;
          const bintang = !menang ? 0 : skor >= maks * 0.8 ? 3 : skor >= maks * 0.6 ? 2 : 1;
          let simpan = { rekor: false };
          if (menang) {
            if (lencana) {
              const beri = (id) => { if (lencana.beri(id, true)) S.baruLencana.push(id); };
              beri('pertama');
              if (!santai && S.sisa / S.total > 0.5) beri('kilat');
              if (S.pertama === misi.tahap.length && S.nyawa === NYAWA_KASIR) beri('sempurna');
              if (bintang === 3) beri('tigabintang');
              if (tingkat === 3) beri('sultan');
            }
            simpan = await simpanSkor(kunciSkor, skor);
          }
          const m = FX.mathy(96);
          m.set(menang ? 'girang' : 'sedih', menang ? 'Misi selesai!' : 'Jangan menyerah!');
          const alasanTeks = alasan === 'waktu' ? 'Waktu habis, toko hampir tutup! Coba lagi dan atur waktumu, atau nyalakan mode santai.'
            : 'Hati kesabaran kasir habis karena terlalu banyak jawaban yang salah.';
          const bahasan = h('div', { class: 'bahas' },
            h('p', null, 'Hemat dari diskon: ' + rp(misi.normal) + ' \u2212 ' + rp(misi.subtotal) + ' = ' + rp(misi.hemat) + '.'),
            h('p', null, 'Total: ' + rp(misi.subtotal) + ' + pajak 10% (' + rp(misi.pajak) + ') = ' + rp(misi.total) + '.'),
            h('p', null, 'Kembalian: ' + rp(misi.anggaran) + ' \u2212 ' + rp(misi.total) + ' = ' + rp(misi.kembali) + '.'));
          app.replaceChildren(h('div', { class: 'gx-hasil hasil-shift' },
            m.el,
            h('h1', null, menang ? 'Misi selesai!' : 'Misi gagal'),
            menang ? FX.bintang(bintang) : null,
            menang ? h('div', { class: 'gx-jabatan' }, h('span', { class: 'gx-jabatan-ikon', 'aria-hidden': 'true' }, '\uD83D\uDECD\uFE0F'),
              h('div', null, h('strong', null, 'Belanjaan sesuai daftar dan masuk anggaran!'), h('p', null, 'Kamu pulang membawa kembalian ' + rp(misi.kembali) + '.')))
              : h('div', { class: 'gx-jabatan gx-kalah' }, h('span', { class: 'gx-jabatan-ikon', 'aria-hidden': 'true' }, '\uD83D\uDE22'), h('div', null, h('strong', null, 'Belum berhasil kali ini'), h('p', null, alasanTeks))),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Anggaran'), h('strong', null, rp(misi.anggaran))),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Total belanja (dengan pajak)'), h('strong', null, rp(misi.total))),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Hemat dari diskon'), h('strong', null, rp(misi.hemat))),
            menang ? h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor (misi + hitungan + waktu + hati)'), h('strong', null, skor)) : null,
            menang ? h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor terbaikmu'), h('strong', null, terbaik.get(kunciSkor) || 0)) : null,
            S.baruLencana.length ? h('div', null, h('p', { class: 'redup' }, 'Lencana baru:'), h('div', { class: 'gx-baru-lencana' }, S.baruLencana.map((id) => lencana.kecil(id)))) : null,
            simpan.rekor ? h('p', { class: 'benar-teks' }, 'Rekor baru! +' + Math.min(50, Math.round(skor / 2)) + ' XP tersimpan.') : null,
            simpan.galat ? h('p', { class: 'salah' }, 'Skor belum tersimpan: ' + simpan.galat) : null,
            menang ? null : h('details', null, h('summary', null, 'Lihat pembahasan'), bahasan),
            h('div', { class: 'baris-form', style: 'margin-top:1rem;justify-content:center' },
              h('button', { type: 'button', class: 'btn', onclick: () => belanja(tingkat) }, menang ? 'Misi baru' : 'Coba lagi'),
              h('button', { type: 'button', class: 'btn btn-sekunder', onclick: menu }, 'Menu Mall Simulator'))));
          if (menang) { FX.bunyi('menang'); FX.hujan(['\uD83C\uDF89', '\uD83D\uDECD\uFE0F', '\uD83E\uDE99', '\u2B50'], 30); } else FX.bunyi('kalah');
        }

        app.replaceChildren(
          h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: menu }, '\u2039 Menu Mall Simulator')),
          h('h1', null, 'Belanja Pintar'),
          h('p', null, h('strong', null, 'Misi: '), 'belanja sesuai daftar dengan anggaran ' + rp(misi.anggaran) + '. Semua barang berdiskon sudah dihitung otomatis, tapi pajak 10% dan kembalian kamu hitung sendiri di kasir.'),
          FX.kontrol(), hud, notif,
          h('div', { class: 'belanja-tata' }, area, h('div', null, panelDaftar, panelKeranjang)));
        mathy.set('senang', 'Yuk belanja sesuai daftar!');
        perbaruiHud(); renderPanel(); tampilPeta();
      }

      // ---------- Mode 2: Detektif Struk ----------
      function detektif(tingkat) {
        const JUMLAH = 5;
        const nama = NAMA_TINGKAT[tingkat];
        const S = { i: 0, koin: 0, benar: 0, pertama: 0, beruntun: 0, percobaan: 0, soal: null, baruLencana: [] };
        const mathy = FX.mathy(78);
        const atas = h('div', { class: 'gx-hud', 'aria-live': 'polite' });
        const isiGaris = h('span');
        const garis = h('div', { class: 'gx-garis' }, isiGaris);
        const chipSkor = h('span', { class: 'gx-chip koin' });
        const notaWadah = h('div', { class: 'nota-wadah' });
        const umpan = h('div', { class: 'umpan', 'aria-live': 'polite' });
        const bahas = h('div', { class: 'bahas', hidden: true });
        const inA = h('input', { type: 'text', autocomplete: 'off', placeholder: 'Tulis harga' });
        const inB = h('input', { type: 'text', autocomplete: 'off', placeholder: 'Tulis harga' });
        const labelA = h('span', { class: 'satuan' });
        const labelB = h('span', { class: 'satuan' });
        const jawabBtn = h('button', { type: 'button', class: 'btn', onclick: () => periksa() }, 'Jawab');
        const lanjutBtn = h('button', { type: 'button', class: 'btn', hidden: true, onclick: () => lanjut() }, 'Nota berikutnya');

        function perbaruiAtas() {
          chipSkor.replaceChildren('\uD83E\uDE99 Skor ', h('strong', null, S.koin));
          atas.replaceChildren(...ok([
            h('span', { class: 'gx-chip' }, 'Detektif Struk: ' + nama),
            h('span', { class: 'gx-chip' }, 'Nota ', h('strong', null, Math.min(S.i + 1, JUMLAH) + '/' + JUMLAH)),
            chipSkor,
            S.beruntun >= 2 ? h('span', { class: 'gx-chip api' }, '\uD83D\uDD25 Combo \u00D7' + S.beruntun) : null]));
          isiGaris.style.width = Math.round((S.i / JUMLAH) * 100) + '%';
        }
        function baru() {
          const s = buatSoal(tingkat);
          S.soal = s; S.percobaan = 0;
          notaWadah.replaceChildren(...s.nota.map((n, i) => h('div', { class: 'resi gx-masuk' },
            h('strong', null, 'Nota ' + (i + 1)),
            h('div', { class: 'resi-baris' }, h('span', null, n.qa + ' ' + s.a), h('span', null, '')),
            h('div', { class: 'resi-baris' }, h('span', null, n.qb + ' ' + s.b), h('span', null, '')),
            h('div', { class: 'resi-baris' }, h('span', null, 'Total dibayar'), h('strong', null, rp(n.total))))));
          labelA.textContent = 'Harga 1 ' + s.a + ' (Rp)'; labelB.textContent = 'Harga 1 ' + s.b + ' (Rp)';
          inA.value = ''; inB.value = ''; inA.disabled = false; inB.disabled = false;
          umpan.replaceChildren(); bahas.hidden = true; bahas.replaceChildren();
          jawabBtn.hidden = false; lanjutBtn.hidden = true;
          mathy.set('mikir', S.i === 0 ? 'Bandingkan kedua nota!' : 'Kasus baru, ayo selidiki.');
          perbaruiAtas(); inA.focus({ preventScroll: true });
        }
        function selesaiSoal() {
          inA.disabled = true; inB.disabled = true; jawabBtn.hidden = true; lanjutBtn.hidden = false;
          lanjutBtn.textContent = S.i + 1 >= JUMLAH ? 'Lihat hasil' : 'Nota berikutnya';
          bahas.replaceChildren(...S.soal.bahas.map((t) => h('p', null, t))); bahas.hidden = false; perbaruiAtas();
          lanjutBtn.focus({ preventScroll: true });
        }
        function periksa() {
          if (jawabBtn.hidden) return;
          const a = parseAngka(inA.value); const b = parseAngka(inB.value);
          if (Number.isNaN(a) || Number.isNaN(b)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Isi kedua harga dalam angka.')); return; }
          S.percobaan += 1;
          if (a === S.soal.x && b === S.soal.y) {
            let poin = S.percobaan === 1 ? 20 : 10;
            if (S.percobaan === 1) { S.beruntun += 1; S.pertama += 1; if (S.beruntun >= 3) poin += 5; } else S.beruntun = 0;
            S.koin += poin; S.benar += 1;
            FX.bunyi('benar'); setTimeout(() => FX.bunyi('koin'), 170);
            FX.terbang(jawabBtn, chipSkor, '\uD83E\uDE99'); FX.meledakDi(jawabBtn, ['\u2728', '\u2B50'], 8);
            if (S.beruntun >= 3 && S.percobaan === 1) { FX.toast('\uD83D\uDD25 Combo \u00D7' + S.beruntun + '! +5 bonus'); setTimeout(() => FX.bunyi('combo'), 300); }
            mathy.set(S.beruntun >= 3 ? 'hebat' : 'girang', 'Kasus terpecahkan!');
            umpan.replaceChildren(h('span', { class: 'benar-teks' }, 'Tepat! +' + poin + ' skor')); selesaiSoal();
          } else if (S.percobaan === 1) {
            S.beruntun = 0; FX.bunyi('salah'); mathy.set('mikir', 'Coba bandingkan nota lagi.');
            umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Coba sekali lagi. Petunjuk: ' + S.soal.petunjuk)); perbaruiAtas();
          } else {
            S.beruntun = 0; FX.bunyi('salah'); mathy.set('sedih', 'Baca pembahasannya ya.');
            umpan.replaceChildren(h('span', { class: 'salah' }, 'Jawaban yang benar: 1 ' + S.soal.a + ' = ' + rp(S.soal.x) + ' dan 1 ' + S.soal.b + ' = ' + rp(S.soal.y) + '.')); selesaiSoal();
          }
        }
        async function hasil() {
          const bintang = S.koin >= 80 ? 3 : S.koin >= 60 ? 2 : S.koin >= 30 ? 1 : 0;
          const beri = (id) => { if (lencana.beri(id, true)) S.baruLencana.push(id); };
          if (S.benar === JUMLAH) beri('detektif');
          if (bintang === 3) beri('tigabintang');
          const simpan = await simpanSkor('detektif-' + tingkat, S.koin);
          const m = FX.mathy(96);
          m.set(bintang >= 2 ? 'girang' : 'senang', bintang >= 2 ? 'Detektif hebat!' : 'Latihan lagi, ya!');
          app.replaceChildren(h('div', { class: 'gx-hasil hasil-shift' },
            m.el,
            h('h1', null, 'Kasus selesai!'),
            FX.bintang(bintang),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor'), h('strong', null, S.koin)),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Nota terpecahkan'), h('strong', null, S.benar + '/' + JUMLAH)),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor terbaikmu'), h('strong', null, terbaik.get('detektif-' + tingkat) || 0)),
            S.baruLencana.length ? h('div', { class: 'gx-baru-lencana' }, S.baruLencana.map((id) => lencana.kecil(id))) : null,
            simpan.rekor ? h('p', { class: 'benar-teks' }, 'Rekor baru! +' + Math.min(50, Math.round(S.koin / 2)) + ' XP tersimpan.') : null,
            simpan.galat ? h('p', { class: 'salah' }, 'Skor belum tersimpan: ' + simpan.galat) : null,
            h('div', { class: 'baris-form', style: 'margin-top:1rem;justify-content:center' },
              h('button', { type: 'button', class: 'btn', onclick: () => detektif(tingkat) }, 'Main lagi'),
              h('button', { type: 'button', class: 'btn btn-sekunder', onclick: menu }, 'Menu Mall Simulator'))));
          FX.bunyi(bintang >= 2 ? 'menang' : 'koin'); if (bintang >= 2) FX.hujan(['\uD83E\uDDFE', '\u2B50', '\uD83E\uDE99'], 24);
        }
        function lanjut() { S.i += 1; if (S.i >= JUMLAH) hasil(); else baru(); }

        [inA, inB].forEach((el) => el.addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!jawabBtn.hidden) periksa(); else lanjutBtn.click(); } }));
        app.replaceChildren(
          h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: menu }, '\u2039 Menu Mall Simulator')),
          FX.kontrol(), atas, garis,
          h('div', { class: 'gx-toko-kepala' }, mathy.el),
          h('p', { class: 'redup' }, 'Dua nota belanja di toko yang sama, dengan harga satuan yang sama. Cari harga satu barang masing-masing.'),
          notaWadah,
          h('div', { class: 'baris-form isian' }, labelA, inA),
          h('div', { class: 'baris-form isian' }, labelB, inB),
          h('div', { class: 'baris-form' }, jawabBtn, lanjutBtn), umpan, bahas);
        baru();
      }

      menu();
    }
  };
})();
