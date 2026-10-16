// Game Mall Simulator. Dua mode:
// 1) Belanja Pintar: diskon, pajak 10%, total, dan kembalian di kasir.
// 2) Detektif Struk: dua nota belanja, cari harga satuan barang (SPLDV). Tiga tingkat kesulitan.
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
  const MISI = [
    { id: 'm1', t: 'Kunjungi 2 toko berbeda' },
    { id: 'm2', t: 'Selesaikan 1 transaksi di kasir' },
    { id: 'm3', t: 'Masukkan barang berdiskon ke keranjang' }
  ];
  const hargaDiskon = (it) => it.h - (it.h * it.d) / 100;
  const ok = (arr) => arr.filter(Boolean);

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

  window.GAMES['mall-simulator'] = {
    nama: 'Mall Simulator',
    custom(ctx) {
      const { app, h, parseAngka, simpanSkor, terbaik, punyaPaket } = ctx;

      // ---------- Menu ----------
      function menu() {
        const mode = [
          { id: 'belanja', no: 'Mode 1', nama: 'Belanja Pintar', desk: 'Jelajahi mall, cari barang berdiskon, lalu hitung total dengan pajak 10% dan kembalian di kasir.', gratis: true, aksi: belanja },
          { id: 'detektif-1', no: 'Mode 2 · Mudah', nama: 'Detektif Struk', desk: 'Dua nota belanja, cari harga satu barang. Ada barang yang jumlahnya sama di kedua nota (eliminasi).', gratis: true, aksi: () => detektif(1) },
          { id: 'detektif-2', no: 'Mode 2 · Sedang', nama: 'Detektif Struk', desk: 'Ada barang yang jumlahnya 1, cocok untuk substitusi.', gratis: false, aksi: () => detektif(2) },
          { id: 'detektif-3', no: 'Mode 2 · Sulit', nama: 'Detektif Struk', desk: 'Angka lebih beragam. Pakai metode campuran.', gratis: false, aksi: () => detektif(3) }
        ];
        app.replaceChildren(
          h('p', null, h('a', { href: 'game.html' }, '\u2039 Semua game')),
          h('div', { class: 'game-kepala' },
            h('img', { src: 'assets/mathy-game.png', alt: '', width: '110' }),
            h('div', null, h('h1', null, 'Mall Simulator'), h('p', null, 'Belanja dan hitung di mall. Mode Detektif Struk melatih SPLDV dari nota belanja.'))),
          h('div', { class: 'grid-bab' }, mode.map((m) => {
            const kunci = !m.gratis && !punyaPaket;
            const skor = terbaik.get(m.id);
            return h('div', { class: 'kartu-bab' + (kunci ? ' segera' : '') },
              h('span', { class: 'no-bab' }, m.no), h('h3', null, m.nama), h('p', null, m.desk),
              h('p', { class: 'redup', style: 'font-size:.9rem' }, skor ? 'Skor terbaik: ' + skor : 'Belum dimainkan'),
              kunci ? h('a', { class: 'btn btn-kecil btn-sekunder', href: 'dashboard.html' }, 'Buka dengan paket')
                : h('button', { type: 'button', class: 'btn btn-kecil', onclick: m.aksi }, skor ? 'Main lagi' : 'Mulai'));
          })));
      }

      // ---------- Mode 1: Belanja Pintar ----------
      function belanja() {
        const S = { uang: 300000, cart: [], misi: {}, skor: 0, dikunjungi: new Set() };
        const hud = h('div', { class: 'game-info', 'aria-live': 'polite' });
        const area = h('div');
        const keranjang = h('section', { class: 'panel keranjang' });

        function simpan() { simpanSkor('belanja', S.skor); }
        function cekMisi(id) { if (!S.misi[id]) { S.misi[id] = true; S.skor += 20; simpan(); perbaruiHud(); } }
        function perbaruiHud() {
          hud.replaceChildren(
            h('span', null, 'Uangmu ', h('strong', null, rp(S.uang))),
            h('span', null, 'Skor ', h('strong', null, S.skor)),
            ...MISI.map((m) => h('span', { class: 'misi-chip' + (S.misi[m.id] ? ' ok' : '') }, (S.misi[m.id] ? '\u2713 ' : '') + m.t)));
        }

        function renderKeranjang() {
          const subtotal = S.cart.reduce((a, b) => a + b.hd, 0);
          keranjang.replaceChildren(...ok([
            h('h2', null, 'Keranjang (' + S.cart.length + ')'),
            S.cart.length ? h('ul', { class: 'daftar' }, S.cart.map((it, i) => h('li', null, it.e + ' ' + it.n + ' ', h('strong', null, rp(it.hd)), ' ',
              h('button', { type: 'button', class: 'btn-teks', 'aria-label': 'Hapus ' + it.n, onclick: () => { S.cart.splice(i, 1); renderKeranjang(); } }, 'hapus'))))
              : h('p', { class: 'redup' }, 'Keranjang masih kosong.'),
            S.cart.length ? h('p', null, 'Subtotal: ', h('strong', null, rp(subtotal))) : null,
            h('button', { type: 'button', class: 'btn btn-kecil', disabled: S.cart.length === 0, onclick: ke_kasir }, 'Bawa ke kasir')]));
        }

        function tampilMall() {
          area.replaceChildren(
            h('p', { class: 'redup' }, 'Pilih toko yang ingin kamu kunjungi.'),
            h('div', { class: 'grid-bab' }, Object.entries(TOKO).map(([kunci, t]) =>
              h('button', { type: 'button', class: 'kartu-bab toko-kartu', onclick: () => bukaToko(kunci) },
                h('span', { class: 'toko-ikon', 'aria-hidden': 'true' }, t.ikon), h('h3', null, t.nama),
                h('p', { class: 'redup' }, t.items.length + ' barang')))));
        }

        function bukaToko(kunci) {
          const t = TOKO[kunci];
          S.dikunjungi.add(kunci);
          if (S.dikunjungi.size >= 2) cekMisi('m1');
          area.replaceChildren(
            h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: tampilMall }, '\u2039 Kembali ke mall')),
            h('h2', null, t.nama),
            h('div', { class: 'grid-bab' }, t.items.map((it) =>
              h('div', { class: 'produk' },
                h('div', { class: 'toko-ikon', 'aria-hidden': 'true' }, it.e),
                h('strong', null, it.n),
                it.d ? h('p', { class: 'harga' }, h('span', { class: 'coret' }, rp(it.h)), ' ', h('span', { class: 'lencana lencana-hijau' }, '\u2212' + it.d + '%'), h('br'), rp(hargaDiskon(it)))
                  : h('p', { class: 'harga' }, rp(it.h)),
                h('button', { type: 'button', class: 'btn btn-kecil', onclick: () => {
                  S.cart.push(Object.assign({}, it, { hd: hargaDiskon(it) }));
                  if (it.d > 0) cekMisi('m3');
                  renderKeranjang();
                } }, '+ Keranjang')))));
        }

        function ke_kasir() {
          if (!S.cart.length) return;
          const subtotal = S.cart.reduce((a, b) => a + b.hd, 0);
          const pajak = Math.round(subtotal * 0.1);
          const total = subtotal + pajak;
          const bayar = Math.ceil(total / 50000) * 50000;
          if (bayar > S.uang) {
            area.replaceChildren(h('div', { class: 'pesan pesan-galat', role: 'alert' }, 'Uangmu tidak cukup untuk belanjaan ini (perlu ' + rp(bayar) + '). Kembali ke mall dan keluarkan beberapa barang.'),
              h('button', { type: 'button', class: 'btn btn-kecil', onclick: tampilMall }, 'Kembali ke mall'));
            return;
          }
          kasir({ subtotal, pajak, total, bayar, tahap: 'total' });
        }

        function kasir(k) {
          const umpan = h('div', { class: 'umpan', 'aria-live': 'polite' });
          const masuk = h('input', { type: 'text', autocomplete: 'off', 'aria-label': 'Jawabanmu', placeholder: 'Tulis angkanya',
            onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); cek.click(); } } });
          const cek = h('button', { type: 'button', class: 'btn', onclick: () => {
            const v = parseAngka(masuk.value);
            if (Number.isNaN(v)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Tulis jawabanmu dalam angka.')); return; }
            if (k.tahap === 'total') {
              if (v === k.total) { k.tahap = 'kembali'; kasir(k); }
              else umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Jumlahkan subtotal dan pajak 10%: ' + rp(k.subtotal) + ' + ' + rp(k.pajak) + '.'));
            } else if (v === k.bayar - k.total) {
              S.uang -= k.total; S.skor += 40; S.cart = []; cekMisi('m2'); simpan(); perbaruiHud(); renderKeranjang();
              area.replaceChildren(h('div', { class: 'kotak kotak-mint' }, h('strong', null, 'Transaksi berhasil! +40 skor'), h('p', null, 'Kembalian ' + rp(k.bayar - k.total) + ' kamu terima.')),
                h('button', { type: 'button', class: 'btn', onclick: tampilMall }, 'Belanja lagi'),
                h('button', { type: 'button', class: 'btn btn-sekunder', style: 'margin-left:.5rem', onclick: menu }, 'Menu Mall Simulator'));
            } else umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Kembalian = ' + rp(k.bayar) + ' \u2212 ' + rp(k.total) + '.'));
          } }, 'Cek jawaban');
          area.replaceChildren(...ok([
            h('h2', null, 'Kasir'),
            h('div', { class: 'resi' }, ...S.cart.map((it) => h('div', { class: 'resi-baris' }, h('span', null, it.e + ' ' + it.n), h('strong', null, rp(it.hd)))),
              h('div', { class: 'resi-baris' }, h('span', null, 'Subtotal'), h('strong', null, rp(k.subtotal))),
              h('div', { class: 'resi-baris' }, h('span', null, 'Pajak 10%'), h('strong', null, rp(k.pajak)))),
            k.tahap === 'total'
              ? h('p', { class: 'soal-teks' }, 'Berapa total yang harus dibayar?')
              : h('p', { class: 'soal-teks' }, 'Total ' + rp(k.total) + ', kamu membayar ' + rp(k.bayar) + '. Berapa kembaliannya?'),
            h('div', { class: 'baris-form isian' }, h('span', { class: 'satuan' }, 'Rp'), masuk, cek), umpan,
            h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: tampilMall }, '\u2039 Batalkan dan kembali ke mall'))]));
          masuk.focus({ preventScroll: true });
        }

        app.replaceChildren(
          h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: menu }, '\u2039 Menu Mall Simulator')),
          h('h1', null, 'Belanja Pintar'),
          hud,
          h('div', { class: 'belanja-tata' }, area, keranjang));
        perbaruiHud(); renderKeranjang(); tampilMall();
      }

      // ---------- Mode 2: Detektif Struk ----------
      function detektif(tingkat) {
        const JUMLAH = 5;
        const nama = ['', 'Mudah', 'Sedang', 'Sulit'][tingkat];
        const S = { i: 0, koin: 0, benar: 0, percobaan: 0, soal: null };
        const atas = h('div', { class: 'game-info', 'aria-live': 'polite' });
        const isiGaris = h('span');
        const garis = h('div', { class: 'langkah-garis' }, isiGaris);
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
          atas.replaceChildren(h('span', null, 'Detektif Struk: ' + nama), h('span', null, 'Nota ', h('strong', null, Math.min(S.i + 1, JUMLAH) + '/' + JUMLAH)), h('span', null, 'Skor ', h('strong', null, S.koin)));
          isiGaris.style.width = Math.round((S.i / JUMLAH) * 100) + '%';
        }
        function baru() {
          const s = buatSoal(tingkat);
          S.soal = s; S.percobaan = 0;
          notaWadah.replaceChildren(...s.nota.map((n, i) => h('div', { class: 'resi' },
            h('strong', null, 'Nota ' + (i + 1)),
            h('div', { class: 'resi-baris' }, h('span', null, n.qa + ' ' + s.a), h('span', null, '')),
            h('div', { class: 'resi-baris' }, h('span', null, n.qb + ' ' + s.b), h('span', null, '')),
            h('div', { class: 'resi-baris' }, h('span', null, 'Total dibayar'), h('strong', null, rp(n.total))))));
          labelA.textContent = 'Harga 1 ' + s.a + ' (Rp)'; labelB.textContent = 'Harga 1 ' + s.b + ' (Rp)';
          inA.value = ''; inB.value = ''; inA.disabled = false; inB.disabled = false;
          umpan.replaceChildren(); bahas.hidden = true; bahas.replaceChildren();
          jawabBtn.hidden = false; lanjutBtn.hidden = true;
          perbaruiAtas(); inA.focus({ preventScroll: true });
        }
        function selesaiSoal() {
          inA.disabled = true; inB.disabled = true; jawabBtn.hidden = true; lanjutBtn.hidden = false;
          lanjutBtn.textContent = S.i + 1 >= JUMLAH ? 'Lihat hasil' : 'Nota berikutnya';
          bahas.replaceChildren(...S.soal.bahas.map((t) => h('p', null, t))); bahas.hidden = false; perbaruiAtas();
        }
        function periksa() {
          const a = parseAngka(inA.value); const b = parseAngka(inB.value);
          if (Number.isNaN(a) || Number.isNaN(b)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Isi kedua harga dalam angka.')); return; }
          S.percobaan += 1;
          if (a === S.soal.x && b === S.soal.y) {
            const poin = S.percobaan === 1 ? 20 : 10; S.koin += poin; S.benar += 1;
            umpan.replaceChildren(h('span', { class: 'benar-teks' }, 'Tepat! +' + poin + ' skor')); selesaiSoal();
          } else if (S.percobaan === 1) {
            umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Coba sekali lagi. Petunjuk: ' + S.soal.petunjuk));
          } else {
            umpan.replaceChildren(h('span', { class: 'salah' }, 'Jawaban yang benar: 1 ' + S.soal.a + ' = ' + rp(S.soal.x) + ' dan 1 ' + S.soal.b + ' = ' + rp(S.soal.y) + '.')); selesaiSoal();
          }
        }
        async function hasil() {
          const bintang = S.koin >= 80 ? 3 : S.koin >= 60 ? 2 : S.koin >= 30 ? 1 : 0;
          const simpan = await simpanSkor('detektif-' + tingkat, S.koin);
          app.replaceChildren(h('div', { class: 'hasil-shift' },
            h('h1', null, 'Kasus selesai!'),
            h('p', { class: 'bintang', 'aria-label': bintang + ' dari 3 bintang' }, '\u2605'.repeat(bintang) + '\u2606'.repeat(3 - bintang)),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor'), h('strong', null, S.koin)),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Nota terpecahkan'), h('strong', null, S.benar + '/' + JUMLAH)),
            h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor terbaikmu'), h('strong', null, terbaik.get('detektif-' + tingkat) || 0)),
            simpan.rekor ? h('p', { class: 'benar-teks' }, 'Rekor baru! +' + Math.min(50, Math.round(S.koin / 2)) + ' XP tersimpan.') : null,
            simpan.galat ? h('p', { class: 'salah' }, 'Skor belum tersimpan: ' + simpan.galat) : null,
            h('div', { class: 'baris-form', style: 'margin-top:1rem' },
              h('button', { type: 'button', class: 'btn', onclick: () => detektif(tingkat) }, 'Main lagi'),
              h('button', { type: 'button', class: 'btn btn-sekunder', onclick: menu }, 'Menu Mall Simulator'))));
        }
        function lanjut() { S.i += 1; if (S.i >= JUMLAH) hasil(); else baru(); }

        app.replaceChildren(
          h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: menu }, '\u2039 Menu Mall Simulator')),
          atas, garis,
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
