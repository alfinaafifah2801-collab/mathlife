// Game Build It!: kamu kontraktor. Tiap proyek membawa satu gambar bangun dan satu soal luas, keliling, atau volume.
// Soal dibuat acak. Gambar tidak sesuai skala, jadi pakai angka yang tertulis.
window.GAMES = window.GAMES || {};
(function () {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pilih = (arr) => arr[rnd(0, arr.length - 1)];
  const fmt = (n) => Number(n).toLocaleString('id-ID', { maximumFractionDigits: 2 });
  const PI = 22 / 7;

  // ---------- Pembantu gambar SVG ----------
  const NS = 'http://www.w3.org/2000/svg';
  function el(nama, atribut, ...anak) {
    const e = document.createElementNS(NS, nama);
    Object.keys(atribut || {}).forEach((k) => e.setAttribute(k, atribut[k]));
    anak.forEach((c) => e.append(typeof c === 'string' ? document.createTextNode(c) : c));
    return e;
  }
  const GAYA = { fill: '#E8EAFB', stroke: '#1F55A8', 'stroke-width': 3, 'stroke-linejoin': 'round' };
  const GARIS = { stroke: '#B35A00', 'stroke-width': 2, 'stroke-dasharray': '5 4' };
  const teks = (x, y, t, anchor) => el('text', { x, y, 'text-anchor': anchor || 'middle', 'font-size': 15, 'font-weight': 700, fill: '#1E1B4B', 'font-family': 'Nunito, sans-serif' }, t);
  const kanvas = (w, h, ...anak) => el('svg', { viewBox: '0 0 ' + w + ' ' + h, width: w, height: h, role: 'img', 'aria-label': 'Gambar bangun (tidak sesuai skala)', class: 'gambar-bangun' }, ...anak);

  function gbPersegiPanjang(p, l) {
    return kanvas(300, 160, el('rect', Object.assign({ x: 60, y: 20, width: 200, height: 100 }, GAYA)), teks(160, 145, p + ' cm'), teks(50, 75, l + ' cm', 'end'));
  }
  function gbSegitiga(a, t) {
    return kanvas(300, 170, el('polygon', Object.assign({ points: '40,130 260,130 190,25' }, GAYA)), el('line', Object.assign({ x1: 190, y1: 25, x2: 190, y2: 130 }, GARIS)),
      teks(150, 155, 'alas ' + a + ' cm'), teks(198, 85, 'tinggi ' + t + ' cm', 'start'));
  }
  function gbLingkaran(r) {
    return kanvas(300, 170, el('circle', Object.assign({ cx: 150, cy: 85, r: 65 }, GAYA)), el('line', Object.assign({ x1: 150, y1: 85, x2: 215, y2: 85 }, GARIS)), teks(182, 77, 'r = ' + r + ' cm'));
  }
  function gbTrapesium(a, b, t) {
    return kanvas(320, 170, el('polygon', Object.assign({ points: '90,130 280,130 230,35 140,35' }, GAYA)), el('line', Object.assign({ x1: 140, y1: 35, x2: 140, y2: 130 }, GARIS)),
      teks(185, 28, 'sisi atas ' + a + ' cm'), teks(185, 152, 'sisi bawah ' + b + ' cm'), teks(132, 88, 'tinggi ' + t + ' cm', 'end'));
  }
  function gbL(A, B, a, b) {
    return kanvas(320, 190, el('polygon', Object.assign({ points: '60,20 250,20 250,100 170,100 170,160 60,160' }, GAYA)),
      teks(155, 12, A + ' cm'), teks(52, 95, B + ' cm', 'end'), teks(290, 62, a + ' cm', 'middle'), teks(112, 182, b + ' cm'));
  }
  function gbBalok(p, l, t) {
    return kanvas(320, 190, el('polygon', Object.assign({ points: '60,80 220,80 220,160 60,160' }, GAYA)), el('polygon', Object.assign({ points: '60,80 100,40 260,40 220,80' }, GAYA, { fill: '#D8F3EC' })),
      el('polygon', Object.assign({ points: '220,80 260,40 260,120 220,160' }, GAYA, { fill: '#FFF1CC' })),
      teks(140, 180, 'panjang ' + p + ' cm'), teks(262, 150, 'lebar ' + l + ' cm', 'start'), teks(52, 125, 'tinggi ' + t + ' cm', 'end'));
  }
  function gbTabung(r, t) {
    return kanvas(300, 190, el('path', Object.assign({ d: 'M90,40 L90,140 A60,20 0 0 0 210,140 L210,40' }, GAYA)), el('ellipse', Object.assign({ cx: 150, cy: 40, rx: 60, ry: 20 }, GAYA, { fill: '#D8F3EC' })),
      el('line', Object.assign({ x1: 150, y1: 40, x2: 210, y2: 40 }, GARIS)), teks(216, 45, 'r = ' + r + ' cm', 'start'), teks(80, 95, 'tinggi ' + t + ' cm', 'end'));
  }
  function gbKerucut(r, t) {
    return kanvas(300, 190, el('path', Object.assign({ d: 'M150,20 L90,140 A60,20 0 0 0 210,140 Z' }, GAYA)), el('line', Object.assign({ x1: 150, y1: 20, x2: 150, y2: 140 }, GARIS)),
      el('line', Object.assign({ x1: 150, y1: 140, x2: 210, y2: 140 }, GARIS)), teks(158, 85, 'tinggi ' + t + ' cm', 'start'), teks(182, 160, 'r = ' + r + ' cm'));
  }

  // ---------- Level 1: bangun datar sederhana ----------
  function luasPP() {
    const p = rnd(6, 20); const l = rnd(3, p - 1);
    return { gambar: gbPersegiPanjang(p, l), narasi: ['Lantai sebuah ruangan berbentuk persegi panjang.'], tanya: 'Berapa cm² luas lantai itu?', jawab: p * l, satuan: 'cm²',
      petunjuk: 'Luas persegi panjang = panjang × lebar.', bahas: ['Luas = ' + p + ' × ' + l + ' = ' + p * l + ' cm².'], p: { jenis: 'luasPP', p, l } };
  }
  function kelilingPP() {
    const p = rnd(6, 20); const l = rnd(3, p - 1);
    return { gambar: gbPersegiPanjang(p, l), narasi: ['Sebidang taman berbentuk persegi panjang akan dipagari.'], tanya: 'Berapa cm panjang pagar yang dibutuhkan (keliling)?', jawab: 2 * (p + l), satuan: 'cm',
      petunjuk: 'Keliling persegi panjang = 2 × (panjang + lebar).', bahas: ['Keliling = 2 × (' + p + ' + ' + l + ') = ' + 2 * (p + l) + ' cm.'], p: { jenis: 'kelilingPP', p, l } };
  }
  function luasSegitiga() {
    const a = pilih([6, 8, 10, 12, 14, 16, 18, 20]); const t = rnd(4, 16);
    return { gambar: gbSegitiga(a, t), narasi: ['Atap sebuah pos ronda berbentuk segitiga.'], tanya: 'Berapa cm² luas atap itu?', jawab: (a * t) / 2, satuan: 'cm²',
      petunjuk: 'Luas segitiga = ½ × alas × tinggi.', bahas: ['Luas = ½ × ' + a + ' × ' + t + ' = ' + (a * t) / 2 + ' cm².'], p: { jenis: 'luasSegitiga', a, t } };
  }

  // ---------- Level 2: lingkaran, trapesium, bangun gabungan ----------
  function luasLingkaran() {
    const r = pilih([7, 14, 21]); const j = Math.round(PI * r * r);
    return { gambar: gbLingkaran(r), narasi: ['Sebuah kolam ikan berbentuk lingkaran. Gunakan π = 22/7.'], tanya: 'Berapa cm² luas kolam itu?', jawab: j, satuan: 'cm²',
      petunjuk: 'Luas lingkaran = π × r × r.', bahas: ['Luas = 22/7 × ' + r + ' × ' + r + ' = ' + j + ' cm².'], p: { jenis: 'luasLingkaran', r } };
  }
  function kelilingLingkaran() {
    const r = pilih([7, 14, 21]); const k = Math.round(2 * PI * r);
    return { gambar: gbLingkaran(r), narasi: ['Sebuah meja bundar akan dililit pita di tepinya. Gunakan π = 22/7.'], tanya: 'Berapa cm panjang pita yang dibutuhkan (keliling)?', jawab: k, satuan: 'cm',
      petunjuk: 'Keliling lingkaran = 2 × π × r.', bahas: ['Keliling = 2 × 22/7 × ' + r + ' = ' + k + ' cm.'], p: { jenis: 'kelilingLingkaran', r } };
  }
  function luasTrapesium() {
    const a = rnd(4, 12); const b = a + 2 * rnd(1, 5); const t = rnd(2, 10) * 2;
    return { gambar: gbTrapesium(a, b, t), narasi: ['Penampang sebuah saluran air berbentuk trapesium.'], tanya: 'Berapa cm² luas penampang itu?', jawab: ((a + b) * t) / 2, satuan: 'cm²',
      petunjuk: 'Luas trapesium = ½ × (jumlah sisi sejajar) × tinggi.', bahas: ['Luas = ½ × (' + a + ' + ' + b + ') × ' + t + ' = ' + ((a + b) * t) / 2 + ' cm².'], p: { jenis: 'luasTrapesium', a, b, t } };
  }
  function luasL() {
    const A = rnd(10, 20); const B = rnd(8, 16); const a = rnd(3, A - 4); const b = rnd(3, B - 3);
    return { gambar: gbL(A, B, a, b), narasi: ['Denah sebuah ruangan berbentuk huruf L. Hitung dengan mengurangi persegi panjang besar dengan bagian yang kosong (sudut kanan bawah).',
      'Persegi panjang besar: ' + A + ' cm × ' + B + ' cm. Bagian kosong: ' + a + ' cm × ' + b + ' cm.'], tanya: 'Berapa cm² luas denah itu?', jawab: A * B - a * b, satuan: 'cm²',
      petunjuk: 'Luas L = luas persegi panjang besar − luas bagian kosong.', bahas: ['Luas = ' + A + ' × ' + B + ' − ' + a + ' × ' + b + ' = ' + A * B + ' − ' + a * b + ' = ' + (A * B - a * b) + ' cm².'], p: { jenis: 'luasL', A, B, a, b } };
  }

  // ---------- Level 3: bangun ruang ----------
  function volumeBalok() {
    const p = rnd(4, 15); const l = rnd(3, 10); const t = rnd(2, 9);
    return { gambar: gbBalok(p, l, t), narasi: ['Sebuah bak penampungan berbentuk balok.'], tanya: 'Berapa cm³ volume bak itu?', jawab: p * l * t, satuan: 'cm³',
      petunjuk: 'Volume balok = panjang × lebar × tinggi.', bahas: ['Volume = ' + p + ' × ' + l + ' × ' + t + ' = ' + p * l * t + ' cm³.'], p: { jenis: 'volumeBalok', p, l, t } };
  }
  function luasPermukaanBalok() {
    const p = rnd(4, 12); const l = rnd(3, 9); const t = rnd(2, 8);
    const L = 2 * (p * l + p * t + l * t);
    return { gambar: gbBalok(p, l, t), narasi: ['Sebuah kotak kayu berbentuk balok akan dicat seluruh permukaannya.'], tanya: 'Berapa cm² luas permukaan yang dicat?', jawab: L, satuan: 'cm²',
      petunjuk: 'Luas permukaan balok = 2 × (pl + pt + lt).', bahas: ['Luas = 2 × (' + p * l + ' + ' + p * t + ' + ' + l * t + ') = ' + L + ' cm².'], p: { jenis: 'luasPermukaanBalok', p, l, t } };
  }
  function volumeTabung() {
    const r = pilih([7, 14]); const t = rnd(3, 12); const v = Math.round(PI * r * r * t);
    return { gambar: gbTabung(r, t), narasi: ['Sebuah tangki berbentuk tabung. Gunakan π = 22/7.'], tanya: 'Berapa cm³ volume tangki itu?', jawab: v, satuan: 'cm³',
      petunjuk: 'Volume tabung = π × r × r × tinggi.', bahas: ['Volume = 22/7 × ' + r + ' × ' + r + ' × ' + t + ' = ' + v + ' cm³.'], p: { jenis: 'volumeTabung', r, t } };
  }
  function volumeKerucut() {
    const t = pilih([3, 6, 9, 12, 15]); const v = Math.round((PI * 49 * t) / 3);
    return { gambar: gbKerucut(7, t), narasi: ['Sebuah corong berbentuk kerucut. Gunakan π = 22/7.'], tanya: 'Berapa cm³ volume corong itu?', jawab: v, satuan: 'cm³',
      petunjuk: 'Volume kerucut = ⅓ × π × r × r × tinggi.', bahas: ['Volume = ⅓ × 22/7 × 7 × 7 × ' + t + ' = ' + v + ' cm³.'], p: { jenis: 'volumeKerucut', t } };
  }


  // ---------- Tampilan game: tema proyek bangunan ----------
  const AVATAR = ['👷', '👷‍♀️', '🧑‍🔧', '👩‍🔧', '🧑‍🏭', '👨‍💼', '👩‍💼', '🧑‍🌾'];
  const UCAP_BENAR = ['Pondasi kuat!', 'Hitunganmu presisi!', 'Satu lantai jadi!', 'Klien senang!'];
  function adeganBangun(S) {
    const FX = window.GameFX;
    const h = ML.h;
    const mathy = FX.mathy(84);
    const puncak = h('div', { class: 'gx-puncak', 'aria-hidden': 'true' }, '🏗️');
    const lantai = Array.from({ length: 10 }, () => h('div', { class: 'gx-lantai' }));
    const gedung = h('div', { class: 'gx-gedung', role: 'img', 'aria-label': 'Progres bangunan' }, lantai);
    const el = h('div', { class: 'gx-gedung-wadah' }, mathy.el, h('div', null, puncak, gedung, h('small', null, 'Progres bangunan')));
    return {
      el,
      perbarui(st, aksi) {
        lantai.forEach((l, i) => {
          const r = st.riwayat[i];
          const kelas = 'gx-lantai' + (r === 'ok' ? ' jadi' : r === 'gagal' ? ' retak' : '');
          if (l.className !== kelas) { l.className = kelas; l.textContent = r === 'ok' ? '🧱' : r === 'gagal' ? '💥' : ''; }
        });
        const jadi = st.riwayat.filter((x) => x === 'ok').length;
        puncak.textContent = st.riwayat.length >= lantai.length ? (jadi >= 7 ? '🏢' : '🏚️') : '🏗️';
        if (aksi === 'mulai') mathy.set('senang', st.i === 0 ? 'Ayo mulai membangun!' : 'Proyek baru datang!');
        else if (aksi === 'benar') mathy.set(st.beruntun >= 3 ? 'hebat' : 'girang', FX.pilihAcak(UCAP_BENAR));
        else if (aksi === 'salah1') mathy.set('mikir', 'Cek lagi angka di gambar.');
        else if (aksi === 'gagal') mathy.set('sedih', 'Lantai ini retak. Pelajari pembahasannya.');
        else if (aksi === 'pangkat') mathy.set('hebat', 'Pangkatmu naik!');
      }
    };
  }
  const TEMA = {
    id: 'bangun',
    avatar: AVATAR,
    hadiah: '🧱',
    nyawa: 0,
    sabar: null,
    jabatan: ['Pekerja Baru', 'Tukang Andal', 'Mandor Muda', 'Kepala Proyek'],
    kata: {
      pelanggan: 'Proyek', berkata: 'meminta bantuan:', lanjut: 'Proyek berikutnya', lihatHasil: 'Lihat hasil shift',
      antrean: 'Proyek menunggu', terakhir: 'Proyek terakhir!', pergi: '',
      selesaiJudul: 'Shift selesai!', gugurJudul: 'Shift berakhir', gugurIsi: ''
    },
    adegan: adeganBangun
  };
  const LENCANA = [
    { id: 'pertama', ikon: '🧰', nama: 'Proyek Perdana', syarat: 'Selesaikan 1 shift' },
    { id: 'beruntun5', ikon: '🔥', nama: 'Tukang Beruntun', syarat: '5 proyek benar berturut-turut di percobaan pertama' },
    { id: 'kilat', ikon: '⚡', nama: 'Tukang Kilat', syarat: 'Jawab benar dalam 8 detik, 3 kali dalam satu shift' },
    { id: 'sempurna', ikon: '💎', nama: 'Bangunan Sempurna', syarat: '10 proyek benar semua di percobaan pertama' },
    { id: 'tigabintang', ikon: '🌟', nama: 'Bintang Tiga', syarat: 'Raih 3 bintang dalam satu shift' },
    { id: 'naikjabatan', ikon: '🎖️', nama: 'Naik Jabatan', syarat: 'Lulus satu level dan buka level berikutnya' },
    { id: 'tamat', ikon: '🏛️', nama: 'Arsitek Handal', syarat: 'Lulus level terakhir' }
  ];

  window.GAMES['build-it'] = {
    nama: 'Build It!',
    pengantar: 'Kamu kontraktor. Setiap shift ada 10 proyek, masing-masing dengan gambar bangun dan satu soal luas, keliling, atau volume. Gambar tidak sesuai skala, jadi pakai angka yang tertulis.',
    aturan: 'Jawaban benar di percobaan pertama: 10 koin. Percobaan kedua: 5 koin. Tiga jawaban benar berturut-turut menambah bonus 5 koin. Setiap proyek yang benar menambah satu lantai pada bangunanmu. Tulis jawaban dalam angka saja (satuan sudah tertulis di kotak jawaban).',
    jumlah: 10,
    istilah: { pelanggan: 'Proyek', berikutnya: 'Proyek berikutnya', selesai: 'Shift selesai!', pembuka: 'meminta bantuan:' },
    levels: [
      { id: 'level-1', nama: 'Tukang Bangunan', deskripsi: 'Luas dan keliling persegi panjang, serta luas segitiga.', gratis: true, jenis: [luasPP, kelilingPP, luasSegitiga] },
      { id: 'level-2', nama: 'Mandor', deskripsi: 'Lingkaran, trapesium, dan bangun gabungan berbentuk L.', gratis: false, jenis: [luasLingkaran, kelilingLingkaran, luasTrapesium, luasL] },
      { id: 'level-3', nama: 'Arsitek', deskripsi: 'Volume dan luas permukaan balok, tabung, dan kerucut.', gratis: false, jenis: [volumeBalok, luasPermukaanBalok, volumeTabung, volumeKerucut] }
    ],
    daftarLencana: LENCANA,
    // Dipanggil oleh js/game.js saat level dimulai. Tampilan dan alur ada di js/game-shift.js.
    mainkan(ctx, lv, indeks) { window.GameFX.shift({ ctx, game: window.GAMES['build-it'], lv, indeks, tema: TEMA }); },
    buat(level) { return pilih(level.jenis)(); },
    namaNasabah() { return pilih(['Pak Mandor', 'Bu Arsitek', 'Pak Joko', 'Bu Ratna', 'Mas Dani', 'Mbak Lia', 'Pak Hendra', 'Bu Wati']); }
  };
})();
