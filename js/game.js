(async function () {
  const { $, h } = ML;
  const app = $('#app');
  const galat = (t) => h('div', { class: 'pesan pesan-galat', role: 'alert' }, t);

  if (!window.dbSiap) {
    app.replaceChildren(galat('Konfigurasi Supabase belum diisi. Buka js/config.js, lalu isi alamat proyek dan kunci publik.'));
    return;
  }
  const { data: { session } } = await db.auth.getSession();
  if (!session) { location.replace('masuk.html'); return; }
  const uid = session.user.id;

  const id = new URLSearchParams(location.search).get('id');

  // ---------- Menu semua game ----------
  if (!id) {
    document.title = 'Game | MathLife';
    app.replaceChildren(
      h('h1', null, 'Game MathLife'),
      h('p', { class: 'redup' }, 'Belajar sambil bermain. Game yang belum siap ditandai Segera.'),
      h('div', { class: 'grid-bab', style: 'margin-top:1.25rem' }, window.DAFTAR_GAME.map((g) => {
        const isi = [
          h('span', { class: 'no-bab' }, g.bab),
          h('h3', null, g.nama),
          h('p', null, g.topik),
          g.tersedia ? h('span', { class: 'lencana lencana-hijau' }, 'Bisa dimainkan') : h('span', { class: 'lencana' }, 'Segera')
        ];
        return g.tersedia
          ? h('a', { class: 'kartu-bab', href: 'game.html?id=' + g.id }, isi)
          : h('div', { class: 'kartu-bab segera', 'aria-disabled': 'true' }, isi);
      })));
    return;
  }

  // ---------- Muat satu game ----------
  const info = (window.DAFTAR_GAME || []).find((g) => g.id === id && g.tersedia);
  if (!info || !/^[a-z0-9-]+$/.test(id)) {
    app.replaceChildren(galat('Game tidak ditemukan atau belum tersedia.'), h('p', null, h('a', { href: 'game.html' }, 'Kembali ke daftar game')));
    return;
  }
  // Naikkan angka VERSI setiap kali file game diubah, agar browser tidak memakai salinan lama.
  const VERSI = '4';
  const muat = (src) => new Promise((ok, gagal) => {
    const sk = document.createElement('script');
    sk.src = src + '?v=' + VERSI;
    sk.onload = ok;
    sk.onerror = () => gagal(new Error('tidak termuat'));
    document.head.append(sk);
  });
  try {
    await muat('js/game-fx.js');
    window.GameFX.versi = VERSI;
    await muat('js/game-shift.js');
    await muat('js/games/' + id + '.js');
  } catch (e) {
    app.replaceChildren(galat('Game ini belum bisa dimuat.'));
    return;
  }
  const game = window.GAMES && window.GAMES[id];
  if (!game) { app.replaceChildren(galat('Game ini belum tersedia.')); return; }
  document.title = game.nama + ' | MathLife';

  // ---------- Akses dan skor tersimpan ----------
  const { data: profil } = await db.from('profiles').select('role').eq('id', uid).single();
  const pengajar = ['admin_platform', 'guru', 'admin_sekolah'].includes(profil && profil.role);
  // Game besar (level 2 dan 3 dan seterusnya) hanya untuk paket yang memuat game. Level 1 selalu gratis sebagai pratinjau.
  // Paket Basic hanya berisi worksheet, jadi tidak membuka level game berikutnya.
  const PAKET_DENGAN_GAME = ['worksheet-game', 'guru', 'sekolah'];
  let punyaPaket = pengajar;
  if (!punyaPaket) {
    const { data } = await db.from('user_packages').select('packages(slug)').eq('user_id', uid).gt('expires_at', new Date().toISOString());
    punyaPaket = (data || []).some((r) => r.packages && PAKET_DENGAN_GAME.includes(r.packages.slug));
  }
  const terbaik = new Map(); // idLevel -> skor terbaik
  const { data: tersimpan } = await db.from('progress').select('item_key, score').eq('user_id', uid).like('item_key', id + '|%');
  (tersimpan || []).forEach((r) => terbaik.set(r.item_key.split('|')[1], r.score || 0));

  const AMBANG = 70;
  const rp = (n) => (n < 0 ? '\u2212' : '') + 'Rp' + Math.abs(n).toLocaleString('id-ID');
  const tampilJawab = (n, satuan) => (satuan === 'Rp' ? rp(n) : satuan === '%' ? n + '%' : String(n));

  function parseAngka(teks) {
    const t = String(teks).trim().replace(/[\u2212\u2013\u2014]/g, '-');
    let m = t.match(/^(-?\d+)\/(\d+)$/);
    if (m) return Number(m[2]) === 0 ? NaN : Number(m[1]) / Number(m[2]);
    let s = t.replace(/rp/ig, '').replace(/%/g, '').replace(/\s/g, '');
    if (s === '' || s === '-') return NaN;
    if (s.includes(',')) s = s.replace(/\./g, '').replace(',', '.');
    else if (/^-?\d{1,3}(\.\d{3})+$/.test(s)) s = s.replace(/\./g, '');
    return /^-?\d+(\.\d+)?$/.test(s) ? Number(s) : NaN;
  }

  async function simpanSkor(levelId, koin) {
    const lama = terbaik.get(levelId) || 0;
    const rekor = koin > lama;
    if (rekor) terbaik.set(levelId, koin);
    if (rekor || !tersimpan || !tersimpan.some((r) => r.item_key === id + '|' + levelId)) {
      const { error } = await db.from('progress').upsert({
        user_id: uid, item_type: 'game', item_key: id + '|' + levelId,
        score: Math.max(koin, lama), xp: Math.min(50, Math.round(Math.max(koin, lama) / 2)), completed_at: new Date().toISOString()
      }, { onConflict: 'user_id,item_type,item_key' });
      if (error) return { rekor, galat: error.message };
    }
    return { rekor };
  }

  // Konteks yang dibagikan ke game dengan tampilan sendiri (mainkan/custom).
  const ctx = {
    app, h, parseAngka, simpanSkor, terbaik, punyaPaket, pengajar, AMBANG,
    menuLevel: () => menuLevel(), mulai: (lv, i) => main(lv, i)
  };
  ctx.lencana = game.daftarLencana ? window.GameFX.lencana(game.daftarLencana, ctx) : null;

  // ---------- Menu level ----------
  function menuLevel() {
    const kartu = game.levels.map((lv, i) => {
      const prev = i > 0 ? game.levels[i - 1] : null;
      const butuhPaket = !lv.gratis && !punyaPaket;
      const terkunciLevel = prev && !pengajar && (terbaik.get(prev.id) || 0) < AMBANG;
      const skor = terbaik.get(lv.id);
      let aksi;
      if (butuhPaket) aksi = h('a', { class: 'btn btn-kecil btn-sekunder', href: 'dashboard.html' }, 'Buka dengan Paket Worksheet + Game');
      else if (terkunciLevel) aksi = h('span', { class: 'lencana' }, 'Raih ' + AMBANG + ' koin di level sebelumnya');
      else aksi = h('button', { type: 'button', class: 'btn btn-kecil', onclick: () => main(lv, i) }, skor ? 'Main lagi' : 'Mulai shift');
      return h('div', { class: 'kartu-bab' + (butuhPaket || terkunciLevel ? ' segera' : '') },
        h('span', { class: 'no-bab' }, 'Level ' + (i + 1)), h('h3', null, lv.nama), h('p', null, lv.deskripsi),
        h('p', { class: 'redup', style: 'font-size:.9rem' }, skor ? 'Skor terbaik: ' + skor + ' koin' : 'Belum dimainkan'), aksi);
    });
    app.replaceChildren(
      h('p', null, h('a', { href: 'game.html' }, '\u2039 Semua game')),
      h('div', { class: 'game-kepala' },
        h('img', { src: 'assets/mathy-game.png', alt: '', width: '110' }),
        h('div', null, h('h1', null, game.nama), h('p', null, game.pengantar))),
      h('div', { class: 'kotak kotak-krem' }, h('p', null, h('strong', null, 'Cara main: '), game.aturan)),
      window.GameFX.kontrol({ tiga: Boolean(game.tiga) }),
      h('div', { class: 'grid-bab' }, kartu),
      ctx.lencana ? h('section', { class: 'gx-bagian-lencana' }, h('h2', null, 'Lencana'), ctx.lencana.galeri()) : null);
  }

  // ---------- Satu shift permainan ----------
  function main(lv, indeksLevel) {
    if (typeof game.mainkan === 'function') { game.mainkan(ctx, lv, indeksLevel); return; }
    const I = Object.assign({ pelanggan: 'Nasabah', berikutnya: 'Nasabah berikutnya', selesai: 'Shift selesai!', pembuka: 'berkata:' }, game.istilah || {});
    const S = { i: 0, koin: 0, benar: 0, beruntun: 0, percobaan: 0, soal: null, nasabah: '', terakhir: '' };
    const atas = h('div', { class: 'game-info', 'aria-live': 'polite' });
    const isiGaris = h('span');
    const garis = h('div', { class: 'langkah-garis' }, isiGaris);
    const kartu = h('div', { class: 'nasabah' });
    const umpan = h('div', { class: 'umpan', 'aria-live': 'polite' });
    const bahas = h('div', { class: 'bahas', hidden: true });
    const masuk = h('input', {
      type: 'text', autocomplete: 'off', 'aria-label': 'Jawabanmu', placeholder: 'Tulis jawabanmu',
      onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!jawabBtn.hidden) periksa(); else if (!lanjutBtn.hidden) lanjutBtn.click(); } }
    });
    const awalan = h('span', { class: 'satuan' });
    const akhiran = h('span', { class: 'satuan' });
    const jawabBtn = h('button', { type: 'button', class: 'btn', onclick: () => periksa() }, 'Jawab');
    const lanjutBtn = h('button', { type: 'button', class: 'btn', hidden: true, onclick: () => lanjut() }, I.berikutnya);
    const baris = h('div', { class: 'baris-form isian' }, awalan, masuk, akhiran, jawabBtn, lanjutBtn);

    function perbaruiAtas() {
      atas.replaceChildren(...[
        h('span', null, lv.nama), h('span', null, I.pelanggan + ' ', h('strong', null, Math.min(S.i + 1, game.jumlah) + '/' + game.jumlah)),
        h('span', null, 'Koin ', h('strong', null, S.koin)),
        S.beruntun >= 2 ? h('span', { class: 'api' }, 'Beruntun ' + S.beruntun) : null
      ].filter(Boolean));
      isiGaris.style.width = Math.round((S.i / game.jumlah) * 100) + '%';
    }

    function baru() {
      let s = game.buat(lv);
      if (S.terakhir && s.narasi[0] === S.terakhir) s = game.buat(lv);
      S.soal = s; S.terakhir = s.narasi[0]; S.percobaan = 0; S.nasabah = game.namaNasabah();
      kartu.replaceChildren(
        h('div', { class: 'avatar', 'aria-hidden': 'true' }, S.nasabah.slice(-1) === ' ' ? '?' : S.nasabah.split(' ').pop().charAt(0)),
        h('div', { class: 'gelembung' },
          h('strong', null, S.nasabah + ' ' + I.pembuka),
          ...s.narasi.map((t) => h('p', null, t)),
          ...(s.gambar ? [h('div', { class: 'gambar-wadah' }, s.gambar)] : []),
          h('p', { class: 'tanya' }, s.tanya)));
      awalan.textContent = s.satuan === 'Rp' ? 'Rp' : '';
      akhiran.textContent = s.satuan === '%' ? '%' : '';
      masuk.value = ''; masuk.disabled = false;
      umpan.replaceChildren(); bahas.hidden = true; bahas.replaceChildren();
      jawabBtn.hidden = false; lanjutBtn.hidden = true;
      perbaruiAtas();
      masuk.focus({ preventScroll: true });
    }

    function tampilBahas() {
      bahas.replaceChildren(...S.soal.bahas.map((t) => h('p', null, t)));
      bahas.hidden = false;
    }

    function selesaiSoal() {
      masuk.disabled = true; jawabBtn.hidden = true; lanjutBtn.hidden = false;
      lanjutBtn.textContent = S.i + 1 >= game.jumlah ? 'Lihat hasil shift' : I.berikutnya;
      lanjutBtn.focus({ preventScroll: true });
      perbaruiAtas();
    }

    function periksa() {
      const v = parseAngka(masuk.value);
      if (Number.isNaN(v)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Tulis jawabanmu dalam angka.')); return; }
      S.percobaan += 1;
      if (Math.abs(v - S.soal.jawab) < 1e-9) {
        let poin = S.percobaan === 1 ? 10 : 5;
        if (S.percobaan === 1) { S.beruntun += 1; if (S.beruntun >= 3) poin += 5; } else { S.beruntun = 0; }
        S.koin += poin; S.benar += 1;
        umpan.replaceChildren(h('span', { class: 'benar-teks' }, 'Benar! +' + poin + ' koin' + (S.beruntun >= 3 && S.percobaan === 1 ? ' (termasuk bonus beruntun)' : '')));
        tampilBahas(); selesaiSoal();
      } else if (S.percobaan === 1) {
        S.beruntun = 0;
        umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Coba sekali lagi. Petunjuk: ' + S.soal.petunjuk));
        masuk.select(); perbaruiAtas();
      } else {
        umpan.replaceChildren(h('span', { class: 'salah' }, 'Jawaban yang benar: ' + tampilJawab(S.soal.jawab, S.soal.satuan) + '.'));
        tampilBahas(); selesaiSoal();
      }
    }

    function lanjut() {
      S.i += 1;
      if (S.i >= game.jumlah) { hasil(); return; }
      baru();
    }

    async function hasil() {
      const bintang = S.koin >= 90 ? 3 : S.koin >= 70 ? 2 : S.koin >= 40 ? 1 : 0;
      const simpan = await simpanSkor(lv.id, S.koin);
      const berikut = game.levels[indeksLevel + 1];
      const bukaBerikut = berikut && S.koin >= AMBANG && (berikut.gratis || punyaPaket);
      app.replaceChildren(
        h('div', { class: 'hasil-shift' },
          h('h1', null, I.selesai),
          h('p', { class: 'bintang', 'aria-label': bintang + ' dari 3 bintang' }, '\u2605'.repeat(bintang) + '\u2606'.repeat(3 - bintang)),
          h('div', { class: 'ringkas-baris' }, h('span', null, 'Koin'), h('strong', null, S.koin)),
          h('div', { class: 'ringkas-baris' }, h('span', null, 'Jawaban benar'), h('strong', null, S.benar + '/' + game.jumlah)),
          h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor terbaikmu di level ini'), h('strong', null, terbaik.get(lv.id) || 0)),
          simpan.rekor ? h('p', { class: 'benar-teks' }, 'Rekor baru! +' + Math.min(50, Math.round(S.koin / 2)) + ' XP tersimpan.') : null,
          simpan.galat ? h('p', { class: 'salah' }, 'Skor belum tersimpan: ' + simpan.galat) : null,
          S.koin < AMBANG && berikut ? h('p', { class: 'redup' }, 'Raih minimal ' + AMBANG + ' koin untuk membuka level berikutnya.') : null,
          h('div', { class: 'baris-form', style: 'margin-top:1rem' },
            h('button', { type: 'button', class: 'btn', onclick: () => main(lv, indeksLevel) }, 'Main lagi'),
            bukaBerikut ? h('button', { type: 'button', class: 'btn', onclick: () => main(berikut, indeksLevel + 1) }, 'Level berikutnya') : null,
            h('button', { type: 'button', class: 'btn btn-sekunder', onclick: menuLevel }, 'Menu level'))));
    }

    app.replaceChildren(
      h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: menuLevel }, '\u2039 Menu level')),
      atas, garis, kartu, baris, umpan, bahas);
    baru();
  }

  // Game dengan tampilan sendiri (misalnya Mall Simulator) menjalankan menunya sendiri.
  if (typeof game.custom === 'function') {
    game.custom(ctx);
  } else {
    menuLevel();
  }
})();
