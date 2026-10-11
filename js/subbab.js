(async function () {
  const { $, h } = ML;
  const app = $('#app');
  const bilah = $('#bilah');

  const galat = (teks) => h('div', { class: 'pesan pesan-galat', role: 'alert' }, teks);
  const kembali = (href, teks) => h('p', null, h('a', { href }, teks));

  // ---------- Validasi alamat dan sesi ----------
  const id = new URLSearchParams(location.search).get('id') || '';
  if (!/^k[789]-b[1-5]-s[1-9]$/.test(id)) {
    app.replaceChildren(galat('Subbab tidak ditemukan.'), kembali('materi.html', 'Kembali ke daftar materi'));
    return;
  }
  if (!window.dbSiap) {
    app.replaceChildren(galat('Konfigurasi Supabase belum diisi. Buka js/config.js, lalu isi alamat proyek dan kunci publik.'));
    return;
  }
  const { data: { session } } = await db.auth.getSession();
  if (!session) { location.replace('masuk.html'); return; }
  const uid = session.user.id;

  const meta = window.cariSubbab(id);
  if (!meta || !meta.sub.tersedia) {
    app.replaceChildren(h('div', { class: 'pesan pesan-info' }, 'Subbab ini sedang disiapkan. Segera hadir.'),
      kembali('materi.html', 'Kembali ke daftar materi'));
    return;
  }
  document.title = meta.sub.judul + ' | MathLife';

  // ---------- Akses: pratinjau gratis, atau paket aktif, atau peran pengajar ----------
  const { data: profil } = await db.from('profiles').select('role').eq('id', uid).single();
  let boleh = Boolean(meta.sub.gratis) || ['admin_platform', 'guru', 'admin_sekolah'].includes(profil && profil.role);
  if (!boleh) {
    const { data } = await db.from('user_packages').select('id').eq('user_id', uid)
      .gt('expires_at', new Date().toISOString()).limit(1);
    boleh = Boolean(data && data.length);
  }
  if (!boleh) {
    app.replaceChildren(
      h('h1', null, meta.sub.judul),
      h('div', { class: 'pesan pesan-info' }, 'Subbab ini dibuka dengan paket belajar. Tukar kode aktivasi di dashboard untuk membukanya.'),
      h('a', { class: 'btn', href: 'dashboard.html' }, 'Ke dashboard'));
    return;
  }

  // ---------- Muat konten dan progres tersimpan ----------
  try {
    await new Promise((ok, gagal) => {
      const s = document.createElement('script');
      s.src = 'js/konten/' + id + '.js';
      s.onload = ok;
      s.onerror = () => gagal(new Error('konten tidak ditemukan'));
      document.head.append(s);
    });
  } catch (e) {
    app.replaceChildren(galat('Konten subbab ini belum bisa dimuat.'), kembali('materi.html?bab=' + meta.bab.id, 'Kembali ke bab'));
    return;
  }
  const K = window.KONTEN && window.KONTEN[id];
  if (!K) { app.replaceChildren(galat('Konten subbab ini belum tersedia.')); return; }

  const hasil = new Map(); // idSoal -> { score, xp }
  const { data: tersimpan } = await db.from('progress').select('item_key, score, xp')
    .eq('user_id', uid).like('item_key', id + '|%');
  (tersimpan || []).forEach((r) => hasil.set(r.item_key.split('|')[1], { score: r.score || 0, xp: r.xp || 0 }));

  // ---------- Pembantu ----------
  const minus = (n) => (n < 0 ? '\u2212' + Math.abs(n) : String(n));
  const rupiah = (n) => (n < 0 ? '\u2212' : '') + 'Rp' + Math.abs(n).toLocaleString('id-ID');

  function parseAngka(teks) {
    let s = String(teks).replace(/[\u2212\u2013\u2014]/g, '-').replace(/rp/ig, '').replace(/\s/g, '');
    if (s === '' || s === '-') return NaN;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
  }

  function cocok(item, v) {
    const sama = (a, b) => Math.abs(a - b) < 1e-9;
    switch (item.tipe) {
      case 'pilgan':
      case 'bs': return v === item.jawab;
      case 'isian': return [].concat(item.jawab).some((j) => sama(v, j));
      case 'daftar': return v.length === item.jawab.length && v.every((x, i) => sama(x, item.jawab[i]));
      default: return false;
    }
  }

  const toastWadah = h('div', { class: 'toast', role: 'status', 'aria-live': 'polite' });
  document.body.append(toastWadah);
  let toastWaktu;
  function toast(teks) {
    toastWadah.textContent = teks;
    toastWadah.classList.add('tampil');
    clearTimeout(toastWaktu);
    toastWaktu = setTimeout(() => toastWadah.classList.remove('tampil'), 3500);
  }

  async function simpan(idSoal, skor, xp) {
    const lama = hasil.get(idSoal);
    if (lama && lama.score >= skor && lama.xp >= xp) return;
    const baru = { score: Math.max(skor, lama ? lama.score : 0), xp: Math.max(xp, lama ? lama.xp : 0) };
    hasil.set(idSoal, baru);
    perbarui();
    const { error } = await db.from('progress').upsert({
      user_id: uid, item_type: 'worksheet', item_key: id + '|' + idSoal,
      score: baru.score, xp: baru.xp, completed_at: new Date().toISOString()
    }, { onConflict: 'user_id,item_type,item_key' });
    if (error) toast('Progres belum tersimpan: ' + error.message);
  }

  // ---------- Soal ----------
  function soal(item, nomor) {
    const lama = hasil.get(item.id);
    let nilai = null;
    let percobaan = 0;
    const umpan = h('div', { class: 'umpan', 'aria-live': 'polite' });
    const bahas = h('div', { class: 'bahas', hidden: true }, [].concat(item.bahas || []).map((t) => h('p', null, t)));
    const lihat = h('button', { type: 'button', class: 'btn-teks', hidden: true, onclick: () => { bahas.hidden = false; lihat.hidden = true; } }, 'Lihat pembahasan');
    const tombol = h('button', { type: 'button', class: 'btn btn-kecil' }, 'Periksa');
    const kotak = h('div', { class: 'soal' });
    let kontrol;

    const maks = item.xp || 10;
    const ucapan = (xp) => 'Benar! +' + xp + ' XP';

    if (item.tipe === 'uraian') {
      const jawabanku = h('textarea', { 'aria-label': 'Jawabanmu', placeholder: 'Tulis jawabanmu di sini' });
      const kunci = h('div', { class: 'bahas', hidden: true },
        h('p', null, h('strong', null, 'Contoh jawaban: '), item.kunci),
        h('p', { class: 'redup' }, 'Bandingkan dengan jawabanmu. Kalau intinya sudah sama, pilih "Sudah cocok".'),
        h('div', { class: 'baris-form' },
          h('button', { type: 'button', class: 'btn btn-kecil', onclick: () => { simpan(item.id, 1, maks); umpan.textContent = ucapan(maks); } }, 'Sudah cocok'),
          h('button', { type: 'button', class: 'btn btn-kecil btn-sekunder', onclick: () => { umpan.textContent = 'Tidak apa-apa. Baca lagi bagian Pahami Konsep, lalu coba tulis ulang.'; } }, 'Belum cocok')));
      const buka = h('button', { type: 'button', class: 'btn btn-kecil', onclick: () => { kunci.hidden = false; buka.hidden = true; } }, 'Lihat contoh jawaban');
      kotak.append(h('p', { class: 'soal-teks' }, (nomor ? nomor + '. ' : '') + item.soal), jawabanku, h('div', { class: 'baris-form' }, buka), kunci, umpan);
    } else {
      if (item.tipe === 'pilgan' || item.tipe === 'bs') {
        const daftarOpsi = item.tipe === 'bs'
          ? [{ t: 'Benar', v: true }, { t: 'Salah', v: false }]
          : item.opsi.map((t, i) => ({ t: String.fromCharCode(65 + i) + '. ' + t, v: i }));
        const tombolOpsi = daftarOpsi.map((o) => h('button', {
          type: 'button', class: 'opsi', 'aria-pressed': 'false',
          onclick: () => { nilai = o.v; tombolOpsi.forEach((b, j) => b.setAttribute('aria-pressed', String(daftarOpsi[j].v === o.v))); }
        }, o.t));
        kontrol = h('div', { class: 'opsi-wadah' }, tombolOpsi);
      } else {
        const masuk = h('input', {
          type: 'text', autocomplete: 'off', 'aria-label': 'Jawabanmu',
          placeholder: item.tipe === 'daftar' ? 'Pisahkan dengan koma' : 'Tulis jawabanmu',
          onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); periksa(); } },
          oninput: () => {
            if (item.tipe === 'daftar') {
              const bagian = masuk.value.split(/[,;]+|\s+/).filter(Boolean).map(parseAngka);
              nilai = bagian.length && bagian.every((x) => !Number.isNaN(x)) ? bagian : null;
            } else {
              const x = parseAngka(masuk.value);
              nilai = Number.isNaN(x) ? null : x;
            }
          }
        });
        kontrol = h('div', { class: 'baris-form isian' }, item.satuan === 'Rp' ? h('span', { class: 'satuan' }, 'Rp') : null, masuk,
          item.satuan && item.satuan !== 'Rp' ? h('span', { class: 'satuan' }, item.satuan) : null);
      }

      function periksa() {
        if (nilai === null) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Isi atau pilih jawabanmu dulu.')); return; }
        percobaan += 1;
        if (cocok(item, nilai)) {
          const xp = percobaan === 1 ? maks : Math.ceil(maks / 2);
          simpan(item.id, 1, xp);
          kotak.classList.add('benar');
          umpan.replaceChildren(h('span', { class: 'benar-teks' }, ucapan(xp)));
          bahas.hidden = false;
          lihat.hidden = true;
        } else {
          umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Coba lagi.'));
          lihat.hidden = false;
        }
      }
      tombol.addEventListener('click', periksa);

      kotak.append(...[
        item.kepala,
        h('p', { class: 'soal-teks' }, (nomor ? nomor + '. ' : '') + item.soal),
        kontrol, h('div', { class: 'baris-form' }, tombol, lihat), umpan, bahas
      ].filter(Boolean));
    }
    if (lama && lama.score === 1) {
      kotak.classList.add('benar');
      kotak.append(h('p', { class: 'redup catatan-kecil' }, 'Sudah kamu jawab benar sebelumnya. Boleh dicoba lagi.'));
    }
    return kotak;
  }

  const daftarSoal = (arr, mulai = 1) => arr.map((s, i) => soal(s, mulai + i));

  // ---------- Blok konten ----------
  function blok(b) {
    switch (b.t) {
      case 'p': return h('p', null, b.x);
      case 'h': return h('h3', null, b.x);
      case 'daftar': return h('ul', { class: 'daftar-isi' }, b.x.map((t) => h('li', null, t)));
      case 'kotak': return h('div', { class: 'kotak kotak-' + (b.warna || 'biru') },
        b.judul ? h('strong', null, b.judul) : null, ...[].concat(b.x).map((t) => h('p', null, t)));
      case 'tabel': return h('div', { class: 'tabel-bungkus' }, h('table', { class: 'tabel-konsep' },
        h('thead', null, h('tr', null, b.kepala.map((k) => h('th', { scope: 'col' }, k)))),
        h('tbody', null, b.baris.map((r) => h('tr', null, r.map((c) => h('td', null, c)))))));
      case 'contoh': return h('div', { class: 'contoh' },
        h('h3', null, b.judul),
        h('dl', null, [['Diketahui', b.diketahui], ['Ditanya', b.ditanya], ['Strategi', b.strategi], ['Hitung', b.hitung], ['Periksa', b.periksa]]
          .flatMap(([k, v]) => [h('dt', null, k), h('dd', null, v)])));
      default: return null;
    }
  }
  const blokSemua = (arr) => arr.map(blok);

  // ---------- MathLife Game (Math Bank) ----------
  function gameBank(cfg) {
    const babak = cfg.babak.map((b, i) => {
      const resi = h('div', { class: 'resi' },
        h('div', { class: 'resi-baris' }, h('span', null, 'Saldo awal'), h('strong', null, rupiah(b.awal))),
        b.trx.map((t) => h('div', { class: 'resi-baris' }, h('span', null, t.ket),
          h('strong', { class: t.jml < 0 ? 'min' : 'plus' }, (t.jml < 0 ? '\u2212' : '+') + 'Rp' + Math.abs(t.jml).toLocaleString('id-ID')))));
      return h('div', { class: 'babak' }, h('h3', null, 'Babak ' + (i + 1) + ': ' + b.judul),
        soal({ id: b.id, tipe: 'isian', soal: 'Berapa saldo akhir nasabah? Tulis angkanya saja, tanda minus boleh dipakai.', jawab: b.jawab, satuan: 'Rp', bahas: b.bahas, kepala: resi, xp: 10 }, null));
    });
    return [h('p', null, cfg.cerita), ...babak];
  }

  // ---------- MathLife Simulator (Lift Mall) ----------
  function simulatorLift(cfg) {
    let indeks = 0;
    let posisi = cfg.misi[0].dari;
    const label = (n) => (n < 0 ? 'B' + (-n) : n === 0 ? 'G' : String(n));
    const kurung = (n) => (n < 0 ? '(' + minus(n) + ')' : minus(n));
    const gedung = h('div', { class: 'gedung', role: 'img', 'aria-label': 'Gedung mall dengan lift' });
    const rumus = h('p', { class: 'rumus' }, 'Tekan Naik atau Turun.');
    const pesan = h('div', { 'aria-live': 'polite' });
    const langkah = h('select', { 'aria-label': 'Jumlah lantai' }, [1, 2, 3, 4, 5].map((n) => h('option', { value: n }, n + ' lantai')));
    const misiInfo = h('p', { class: 'misi-info' });
    const lanjut = h('button', { type: 'button', class: 'btn btn-kecil', hidden: true, onclick: () => { indeks = (indeks + 1) % cfg.misi.length; mulai(); } }, 'Misi berikutnya');

    function gambar() {
      const m = cfg.misi[indeks];
      const baris = [];
      for (let n = cfg.max; n >= cfg.min; n -= 1) {
        baris.push(h('div', { class: 'lantai' + (n === posisi ? ' aktif' : '') + (n === m.ke ? ' tujuan' : '') },
          h('span', { class: 'nama' }, label(n)),
          h('span', { class: 'nilai' }, '(' + minus(n) + ')'),
          n === posisi ? h('span', { class: 'lift' }, 'Lift') : null,
          n === m.ke ? h('span', { class: 'tanda' }, 'Tujuan') : null));
      }
      gedung.replaceChildren(...baris);
    }

    function mulai() {
      const m = cfg.misi[indeks];
      posisi = m.dari;
      misiInfo.textContent = 'Misi ' + (indeks + 1) + ': antar pengunjung dari lantai ' + label(m.dari) + ' (' + minus(m.dari) + ') ke lantai ' + label(m.ke) + ' (' + minus(m.ke) + ').';
      rumus.textContent = 'Tekan Naik atau Turun.';
      pesan.replaceChildren();
      lanjut.hidden = true;
      gambar();
    }

    function gerak(arah) {
      const m = cfg.misi[indeks];
      if (posisi === m.ke) return;
      const s = Number(langkah.value) * arah;
      const baru = posisi + s;
      if (baru < cfg.min || baru > cfg.max) { pesan.replaceChildren(h('span', { class: 'salah' }, 'Lift tidak bisa melewati lantai itu.')); return; }
      rumus.textContent = minus(posisi) + ' + ' + kurung(s) + ' = ' + minus(baru);
      posisi = baru;
      gambar();
      if (posisi === m.ke) {
        const selisih = m.ke - m.dari;
        pesan.replaceChildren(h('span', { class: 'benar-teks' },
          'Sampai! Perpindahan = tujuan \u2212 awal = ' + minus(m.ke) + ' \u2212 ' + kurung(m.dari) + ' = ' + minus(selisih) +
          (selisih >= 0 ? ' (naik ' + selisih + ' lantai).' : ' (turun ' + Math.abs(selisih) + ' lantai).') + ' +10 XP'));
        simpan(m.id, 1, 10);
        lanjut.hidden = false;
      } else {
        pesan.replaceChildren();
      }
    }

    mulai();
    return [
      h('p', null, cfg.cerita),
      misiInfo,
      h('div', { class: 'sim' }, gedung,
        h('div', { class: 'sim-kontrol' },
          h('label', { class: 'field' }, h('span', null, 'Berapa lantai?'), langkah),
          h('div', { class: 'baris-form' },
            h('button', { type: 'button', class: 'btn', onclick: () => gerak(1) }, 'Naik'),
            h('button', { type: 'button', class: 'btn btn-sekunder', onclick: () => gerak(-1) }, 'Turun')),
          rumus, pesan, lanjut))
    ];
  }

  // ---------- Daftar id untuk ringkasan ----------
  const idLatihan = K.latihan.map((l) => l.soal.map((s) => s.id));
  const idMini = K.mini.map((s) => s.id);
  const idEval = K.evaluasi.flatMap((g) => g.soal.map((s) => s.id));
  const idGame = K.game.babak.map((b) => b.id);
  const idSim = K.simulator.misi.map((m) => m.id);
  const idNyata = (K.nyata.soal || []).map((s) => s.id);
  const semuaId = [...idNyata, ...idMini, ...idGame, ...idSim, ...idLatihan.flat(), ...idEval];

  const benarDari = (ids) => ids.filter((i) => (hasil.get(i) || {}).score === 1).length;
  const persen = (ids) => (ids.length ? Math.round((100 * benarDari(ids)) / ids.length) : 0);
  const totalXp = () => [...hasil.values()].reduce((n, r) => n + (r.xp || 0), 0);

  // ---------- Bagian Progress ----------
  const wadahProgres = h('div');
  function perbarui() {
    bilah.hidden = false;
    bilah.replaceChildren(h('div', { class: 'wrap bilah-isi' },
      h('span', null, h('strong', null, totalXp()), ' XP'),
      h('span', null, 'Soal benar: ', h('strong', null, benarDari(semuaId) + '/' + semuaId.length)),
      h('span', { class: 'redup' }, meta.sub.no + ' ' + meta.sub.judul)));

    const selesai = (hasil.get('selesai') || {}).score === 1;
    const lat = persen(idLatihan.flat());
    const ev = persen(idEval);
    const tantangan = idLatihan[idLatihan.length - 1];
    const lencana = selesai && lat >= 70 && ev >= 70;
    const baris = (nama, nilai) => h('div', { class: 'ringkas-baris' }, h('span', null, nama), h('strong', null, nilai));

    wadahProgres.replaceChildren(
      baris('Materi selesai', selesai ? 'Ya' : 'Belum'),
      baris('Latihan benar', benarDari(idLatihan.flat()) + '/' + idLatihan.flat().length + ' (' + lat + '%)'),
      baris('MathLife Challenge', benarDari(tantangan) + '/' + tantangan.length),
      baris('Mini Challenge', benarDari(idMini) + '/' + idMini.length),
      baris('Game dan Simulator', benarDari([...idGame, ...idSim]) + '/' + (idGame.length + idSim.length)),
      baris('Evaluasi benar', benarDari(idEval) + '/' + idEval.length + ' (' + ev + '%)'),
      baris('Total XP', String(totalXp())),
      h('div', { class: 'lencana-kotak' + (lencana ? ' terbuka' : '') },
        h('strong', null, K.badge.nama),
        h('p', null, lencana ? 'Lencana terbuka. Hebat!' : K.badge.syarat)),
      selesai ? null : h('button', { type: 'button', class: 'btn', onclick: () => simpan('selesai', 1, 20) }, 'Tandai materi selesai (+20 XP)'),
      h('p', null, h('a', { href: 'materi.html?bab=' + meta.bab.id }, 'Kembali ke bab')));
  }

  // ---------- Susun halaman: satu langkah per layar ----------
  const NAMA = [
    ['kenalan', 'Kenalan dengan Materi'], ['nyata', 'Math in Life'], ['konsep', 'Pahami Konsep'],
    ['contoh', 'Contoh Bertahap'], ['mini', 'Mini Challenge'], ['game', 'MathLife Game'],
    ['simulator', 'MathLife Simulator'], ['latihan', 'Latihan Berjenjang'], ['evaluasi', 'Evaluasi'], ['progres', 'Progress']
  ];
  const nama = Object.fromEntries(NAMA);

  // Setiap langkah dibuat sekali lalu disembunyikan/ditampilkan, jadi jawaban dan posisi lift tidak hilang saat pindah layar.
  const halaman = [];
  function tambah(kunci, fase, subjudul, ...isi) {
    const n = halaman.length;
    const judul = h('h2', { id: 'jdl-' + n, tabindex: '-1' }, nama[kunci]);
    const el = h('section', { class: 'belajar', hidden: true, 'aria-labelledby': 'jdl-' + n },
      judul, subjudul ? h('h3', { class: 'sub-halaman' }, subjudul) : null, ...isi);
    halaman.push({ kunci, fase, el, judul, subjudul });
  }

  // Tahap Materi
  tambah('kenalan', 'materi', null, ...blokSemua(K.kenalan));
  tambah('nyata', 'materi', null, ...blokSemua(K.nyata.blok), ...daftarSoal(K.nyata.soal || [], 1));
  tambah('konsep', 'materi', null, ...blokSemua(K.konsep));
  tambah('contoh', 'materi', null, ...blokSemua(K.contoh));
  // Tahap Pengerjaan
  tambah('mini', 'kerja', null, h('p', { class: 'redup' }, 'Soal-soal yang sedikit beda dari biasanya. Santai saja, boleh dicoba berkali-kali.'), ...daftarSoal(K.mini, 1));
  tambah('game', 'kerja', null, ...gameBank(K.game));
  tambah('simulator', 'kerja', null, ...simulatorLift(K.simulator));
  K.latihan.forEach((lv) => tambah('latihan', 'kerja', lv.nama, lv.pengantar ? h('p', { class: 'redup' }, lv.pengantar) : null, ...daftarSoal(lv.soal, 1)));
  K.evaluasi.forEach((g) => tambah('evaluasi', 'kerja', g.judul, ...daftarSoal(g.soal, 1)));
  tambah('progres', 'kerja', null, wadahProgres);

  const jumlah = halaman.length;
  const pertama = (fase) => halaman.findIndex((p) => p.fase === fase);
  const pergi = (i) => { location.hash = 'langkah-' + (Math.min(Math.max(i, 0), jumlah - 1) + 1); };
  let sekarang = 0;

  const tombolFase = {
    materi: h('button', { type: 'button', onclick: () => pergi(pertama('materi')) }, 'Materi'),
    kerja: h('button', { type: 'button', onclick: () => pergi(pertama('kerja')) }, 'Pengerjaan')
  };
  const barFase = h('div', { class: 'fase-tab', role: 'group', 'aria-label': 'Tahap belajar' }, tombolFase.materi, tombolFase.kerja);
  const info = h('p', { class: 'langkah-info', 'aria-live': 'polite' });
  const isiGaris = h('span');
  const garis = h('div', { class: 'langkah-garis' }, isiGaris);
  const chip = NAMA.map(([k, t]) => h('a', { href: '#langkah-' + (halaman.findIndex((p) => p.kunci === k) + 1), 'data-k': k }, t));
  const navBagian = h('nav', { class: 'nav-bagian', 'aria-label': 'Bagian subbab' }, chip);
  const tombolKembali = h('button', { type: 'button', class: 'btn btn-sekunder', onclick: () => pergi(sekarang - 1) }, '\u2039 Kembali');
  const tombolLanjut = h('button', { type: 'button', class: 'btn', onclick: () => pergi(sekarang + 1) }, 'Lanjut \u203A');
  const pindah = h('div', { class: 'pindah' }, tombolKembali, tombolLanjut);

  function tampil(i) {
    sekarang = Math.min(Math.max(i, 0), jumlah - 1);
    const p = halaman[sekarang];
    halaman.forEach((x, j) => { x.el.hidden = j !== sekarang; });
    tombolFase.materi.setAttribute('aria-pressed', String(p.fase === 'materi'));
    tombolFase.kerja.setAttribute('aria-pressed', String(p.fase === 'kerja'));
    info.textContent = 'Langkah ' + (sekarang + 1) + ' dari ' + jumlah + ' \u00B7 ' + nama[p.kunci] + (p.subjudul ? ': ' + p.subjudul : '');
    isiGaris.style.width = Math.round(((sekarang + 1) / jumlah) * 100) + '%';
    chip.forEach((a) => { if (a.dataset.k === p.kunci) a.setAttribute('aria-current', 'step'); else a.removeAttribute('aria-current'); });
    tombolKembali.hidden = sekarang === 0;
    tombolLanjut.hidden = sekarang === jumlah - 1;
    const berikut = halaman[sekarang + 1];
    tombolLanjut.textContent = berikut && berikut.fase !== p.fase ? 'Mulai mengerjakan \u203A' : 'Lanjut \u203A';
    window.scrollTo({ top: 0 });
    p.judul.focus({ preventScroll: true });
  }
  function dariHash() {
    const m = location.hash.match(/^#langkah-(\d+)$/);
    tampil(m ? Number(m[1]) - 1 : 0);
  }

  app.replaceChildren(
    kembali('materi.html?bab=' + meta.bab.id, '\u2039 Bab ' + meta.bab.no + ': ' + meta.bab.judul),
    h('h1', null, meta.sub.no + ' ' + K.judul),
    barFase, info, garis, navBagian,
    ...halaman.map((p) => p.el),
    pindah);

  window.addEventListener('hashchange', dariHash);
  perbarui();
  dariHash();
})();
