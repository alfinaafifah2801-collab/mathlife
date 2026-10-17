// Mesin "shift" bersama: antrean pelanggan, bar kesabaran, combo, koin terbang, pangkat, lencana, dan layar hasil.
// Dipakai oleh Math Bank dan Build It lewat GameFX.shift({ ctx, game, lv, indeks, tema }).
(function () {
  'use strict';
  const FX = window.GameFX;
  const BATAS_PANGKAT = [0, 30, 60, 90];
  const JEDA_KELUAR = 380;
  const BUANG_SATUAN = /\s*(cm|m)\s*[²³23]?\s*$/i;

  function shift(o) {
    const { ctx, game, lv, indeks, tema } = o;
    const { app, parseAngka, simpanSkor, terbaik, AMBANG } = ctx;
    const h = ML.h;
    const lencana = ctx.lencana;
    const JUMLAH = game.jumlah;
    const NYAWA = tema.nyawa || 0;
    const rp = (n) => (n < 0 ? '\u2212' : '') + 'Rp' + Math.abs(n).toLocaleString('id-ID');
    const tampilJawab = (n, satuan) => (satuan === 'Rp' ? rp(n) : satuan === '%' ? n + '%' : satuan ? n + ' ' + satuan : String(n));

    const S = {
      i: 0, koin: 0, benar: 0, pertama: 0, beruntun: 0, maksBeruntun: 0, percobaan: 0, soal: null, terakhir: '',
      nyawa: NYAWA, riwayat: [], kilat: 0, pangkat: 0, total: 0, sisa: 0, mulaiAt: 0, tikAt: performance.now(),
      selesaiSoal: false, selesai: false, gugur: false, cemas: false, baruLencana: [],
      avatars: Array.from({ length: JUMLAH }, () => FX.pilihAcak(tema.avatar))
    };

    // ---------- Elemen ----------
    const chipKoin = h('span', { class: 'gx-chip koin' });
    const hud = h('div', { class: 'gx-hud', 'aria-live': 'off' });
    const isiGaris = h('span');
    const garis = h('div', { class: 'gx-garis' }, isiGaris);
    const adegan = tema.adegan(S);
    const antrean = h('div', { class: 'gx-antrean', 'aria-hidden': 'true' });
    const depan = h('div', { class: 'gx-depan' });
    const sabarIsi = h('span', { class: 'gx-sabar-isi' });
    const sabarWajah = h('span', { class: 'gx-sabar-wajah', 'aria-hidden': 'true' }, '\uD83D\uDE0A');
    const sabarCap = h('small', { class: 'gx-sabar-cap' });
    const sabar = tema.sabar ? h('div', { class: 'gx-sabar' }, sabarWajah, h('div', { class: 'gx-sabar-bar', 'aria-hidden': 'true' }, sabarIsi), sabarCap) : null;
    const panggung = h('div', { class: 'gx-panggung' }, h('div', { class: 'gx-baris-atas' }, adegan.el, antrean), depan, sabar);
    const umpan = h('div', { class: 'umpan', 'aria-live': 'polite' });
    const bahas = h('div', { class: 'bahas', hidden: true });
    const awalan = h('span', { class: 'satuan' });
    const akhiran = h('span', { class: 'satuan' });
    const masuk = h('input', {
      type: 'text', autocomplete: 'off', 'aria-label': 'Jawabanmu', placeholder: 'Tulis jawabanmu',
      onkeydown: (e) => { if (e.key === 'Enter') { e.preventDefault(); if (!jawabBtn.hidden) periksa(); else if (!lanjutBtn.hidden) lanjut(); } }
    });
    const jawabBtn = h('button', { type: 'button', class: 'btn', onclick: () => periksa() }, 'Jawab');
    const lanjutBtn = h('button', { type: 'button', class: 'btn', hidden: true, onclick: () => lanjut() }, tema.kata.lanjut);
    const baris = h('div', { class: 'baris-form isian' }, awalan, masuk, akhiran, jawabBtn, lanjutBtn);
    let avatar = null;
    let gelembung = null;

    function pangkatDari(koin) {
      let p = 0;
      BATAS_PANGKAT.forEach((b, k) => { if (koin >= b) p = k; });
      return p;
    }
    function beri(id, diam) { if (lencana && lencana.beri(id, diam)) S.baruLencana.push(id); }

    function perbaruiHud() {
      chipKoin.replaceChildren('\uD83E\uDE99 Koin ', h('strong', null, S.koin));
      hud.replaceChildren(...[
        h('span', { class: 'gx-chip' }, lv.nama),
        h('span', { class: 'gx-chip' }, tema.kata.pelanggan + ' ', h('strong', null, Math.min(S.i + 1, JUMLAH) + '/' + JUMLAH)),
        chipKoin,
        S.beruntun >= 2 ? h('span', { class: 'gx-chip api' }, '\uD83D\uDD25 Combo \u00D7' + S.beruntun) : null,
        NYAWA ? h('span', { class: 'gx-chip', 'aria-label': 'Kepuasan ' + S.nyawa + ' dari ' + NYAWA }, '\u2764\uFE0F'.repeat(S.nyawa) + '\uD83D\uDDA4'.repeat(NYAWA - S.nyawa)) : null,
        h('span', { class: 'gx-chip pangkat' }, '\uD83C\uDF96\uFE0F ' + tema.jabatan[S.pangkat])
      ].filter(Boolean));
      isiGaris.style.width = Math.round((S.i / JUMLAH) * 100) + '%';
    }

    function perbaruiAntrean() {
      const tunggu = S.avatars.slice(S.i + 1, S.i + 5);
      const lebih = JUMLAH - S.i - 1 - tunggu.length;
      antrean.replaceChildren(...[
        h('small', null, tunggu.length ? tema.kata.antrean : tema.kata.terakhir),
        ...tunggu.map((e) => h('span', { class: 'gx-orang' }, e)),
        lebih > 0 ? h('small', null, '+' + lebih) : null
      ].filter(Boolean));
    }

    // ---------- Bar kesabaran ----------
    function gambarSabar(f, santai) {
      if (!sabar) return;
      const w = santai ? 1 : Math.max(0, Math.min(1, f));
      sabarIsi.style.width = Math.round(w * 100) + '%';
      sabarIsi.dataset.t = w > 0.6 ? 'hijau' : w > 0.3 ? 'kuning' : 'merah';
      sabarWajah.textContent = w > 0.6 ? '\uD83D\uDE0A' : w > 0.3 ? '\uD83D\uDE10' : w > 0.12 ? '\uD83D\uDE1F' : '\uD83D\uDE20';
      sabarCap.textContent = santai ? 'Mode santai' : Math.max(0, Math.ceil(S.sisa / 1000)) + ' detik';
    }
    const timer = setInterval(() => {
      if (!panggung.isConnected) { clearInterval(timer); return; }
      const now = performance.now();
      const dt = Math.min(now - S.tikAt, 500);
      S.tikAt = now;
      if (!sabar || !S.total || S.selesaiSoal || S.selesai) return;
      if (FX.santai.aktif()) { gambarSabar(1, true); return; }
      S.sisa -= dt;
      gambarSabar(S.sisa / S.total, false);
      if (!S.cemas && S.sisa / S.total < 0.3) { S.cemas = true; adegan.perbarui(S, 'cemas'); }
      if (S.sisa <= 0) habis();
    }, 200);

    // ---------- Alur soal ----------
    function baru() {
      let s = game.buat(lv);
      if (S.terakhir && s.narasi[0] === S.terakhir) s = game.buat(lv);
      S.soal = s; S.terakhir = s.narasi[0]; S.percobaan = 0; S.selesaiSoal = false; S.cemas = false;
      const nama = game.namaNasabah();
      avatar = h('div', { class: 'gx-avatar gx-masuk', 'aria-hidden': 'true' }, S.avatars[S.i]);
      gelembung = h('div', { class: 'gx-gelembung gx-masuk' }, h('strong', null, nama + ' ' + tema.kata.berkata), ...s.narasi.map((t) => h('p', null, t)));
      if (s.gambar) gelembung.append(h('div', { class: 'gambar-wadah' }, s.gambar));
      gelembung.append(h('p', { class: 'tanya' }, s.tanya));
      depan.replaceChildren(avatar, gelembung);
      awalan.textContent = s.satuan === 'Rp' ? 'Rp' : '';
      akhiran.textContent = s.satuan && s.satuan !== 'Rp' ? s.satuan : '';
      masuk.value = ''; masuk.disabled = false;
      umpan.replaceChildren(); bahas.hidden = true; bahas.replaceChildren();
      jawabBtn.hidden = false; lanjutBtn.hidden = true;
      S.total = tema.sabar ? tema.sabar(lv, indeks) * 1000 : 0;
      S.sisa = S.total; S.mulaiAt = performance.now(); S.tikAt = S.mulaiAt;
      gambarSabar(1, FX.santai.aktif());
      perbaruiHud(); perbaruiAntrean();
      adegan.perbarui(S, 'mulai');
      masuk.focus({ preventScroll: true });
    }

    function tampilBahas() {
      bahas.replaceChildren(...S.soal.bahas.map((t) => h('p', null, t)));
      bahas.hidden = false;
    }

    function selesaiSoal() {
      S.selesaiSoal = true;
      masuk.disabled = true; jawabBtn.hidden = true; lanjutBtn.hidden = false;
      if (NYAWA && S.nyawa <= 0) S.gugur = true;
      lanjutBtn.textContent = (S.i + 1 >= JUMLAH || S.gugur) ? tema.kata.lihatHasil : tema.kata.lanjut;
      lanjutBtn.focus({ preventScroll: true });
      perbaruiHud();
    }

    function kurangiNyawa() { if (NYAWA) S.nyawa = Math.max(0, S.nyawa - 1); }

    function cekPangkat() {
      const p = pangkatDari(S.koin);
      if (p <= S.pangkat) return;
      S.pangkat = p;
      setTimeout(() => {
        FX.toast('\uD83C\uDF96\uFE0F Naik pangkat: ' + tema.jabatan[p] + '!', 'naik');
        FX.bunyi('naik'); FX.hujan(['\uD83C\uDF89', '\u2B50', '\uD83E\uDE99'], 18);
      }, 350);
      adegan.perbarui(S, 'pangkat');
    }

    function benar() {
      let poin = S.percobaan === 1 ? 10 : 5;
      if (S.percobaan === 1) { S.beruntun += 1; S.pertama += 1; if (S.beruntun >= 3) poin += 5; } else { S.beruntun = 0; }
      S.maksBeruntun = Math.max(S.maksBeruntun, S.beruntun);
      S.koin += poin; S.benar += 1; S.riwayat.push('ok');
      FX.bunyi('benar'); setTimeout(() => FX.bunyi('koin'), 170);
      const bonus = S.beruntun >= 3 && S.percobaan === 1;
      umpan.replaceChildren(h('span', { class: 'benar-teks' }, 'Benar! +' + poin + ' koin' + (bonus ? ' (termasuk bonus beruntun)' : '')));
      avatar.textContent = '\uD83D\uDE04';
      gelembung.classList.add('gx-benar');
      const n = Math.min(4, Math.ceil(poin / 5));
      for (let k = 0; k < n; k += 1) {
        FX.terbang(avatar, chipKoin, k % 2 ? '\uD83E\uDE99' : tema.hadiah, k === n - 1 ? () => {
          chipKoin.classList.remove('naik'); void chipKoin.offsetWidth; chipKoin.classList.add('naik');
        } : null, k * 90);
      }
      FX.meledakDi(avatar, ['\u2728', '\u2B50'], 8);
      if (bonus) {
        FX.toast('\uD83D\uDD25 Combo \u00D7' + S.beruntun + '! +5 koin bonus');
        setTimeout(() => FX.bunyi('combo'), 300);
        if (S.beruntun % 3 === 0 && NYAWA && S.nyawa < NYAWA) { S.nyawa += 1; FX.toast('\u2764\uFE0F Kepuasan pulih +1'); }
      }
      if (S.percobaan === 1 && performance.now() - S.mulaiAt < 8000) { S.kilat += 1; if (S.kilat >= 3) beri('kilat'); }
      if (S.beruntun >= 5) beri('beruntun5');
      adegan.perbarui(S, 'benar');
      cekPangkat();
      tampilBahas(); selesaiSoal();
    }

    function salahPertama() {
      S.beruntun = 0;
      FX.bunyi('salah');
      gelembung.classList.remove('gx-goyang'); void gelembung.offsetWidth; gelembung.classList.add('gx-goyang');
      umpan.replaceChildren(h('span', { class: 'salah' }, 'Belum tepat. Coba sekali lagi. Petunjuk: ' + S.soal.petunjuk));
      masuk.select(); perbaruiHud();
      adegan.perbarui(S, 'salah1');
    }

    function gagalSoal(pesan) {
      S.beruntun = 0; kurangiNyawa(); S.riwayat.push('gagal');
      FX.bunyi('salah');
      avatar.textContent = '\uD83D\uDE20';
      umpan.replaceChildren(h('span', { class: 'salah' }, pesan + ' Jawaban yang benar: ' + tampilJawab(S.soal.jawab, S.soal.satuan) + '.'));
      adegan.perbarui(S, 'gagal');
      tampilBahas(); selesaiSoal();
    }
    function salahKedua() { gagalSoal(''); }
    function habis() { if (!S.selesaiSoal) gagalSoal(tema.kata.pergi); }

    function periksa() {
      if (S.selesaiSoal) return;
      const v = parseAngka(String(masuk.value).replace(BUANG_SATUAN, ''));
      if (Number.isNaN(v)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Tulis jawabanmu dalam angka.')); return; }
      S.percobaan += 1;
      if (Math.abs(v - S.soal.jawab) < 1e-9) benar();
      else if (S.percobaan === 1) salahPertama();
      else salahKedua();
    }

    function lanjut() {
      if (lanjutBtn.disabled) return;
      lanjutBtn.disabled = true;
      const marah = S.riwayat[S.riwayat.length - 1] === 'gagal';
      if (avatar) avatar.className = 'gx-avatar ' + (marah ? 'gx-keluar-marah' : 'gx-keluar-ok');
      setTimeout(() => {
        lanjutBtn.disabled = false;
        S.i += 1;
        if (S.i >= JUMLAH || S.gugur) hasil(); else baru();
      }, FX.reduksi() ? 0 : JEDA_KELUAR);
    }

    // ---------- Layar hasil ----------
    async function hasil() {
      S.selesai = true; clearInterval(timer);
      const bintang = S.koin >= 90 ? 3 : S.koin >= 70 ? 2 : S.koin >= 40 ? 1 : 0;
      const lulus = S.koin >= AMBANG;
      const berikut = game.levels[indeks + 1];
      if (!S.gugur) beri('pertama', true);
      if (!S.gugur && S.benar === JUMLAH && S.pertama === JUMLAH) beri('sempurna', true);
      if (bintang === 3) beri('tigabintang', true);
      if (lulus && berikut) beri('naikjabatan', true);
      if (lulus && !berikut) beri('tamat', true);
      const simpan = await simpanSkor(lv.id, S.koin);
      const bukaBerikut = berikut && lulus && (berikut.gratis || ctx.punyaPaket);
      const mathy = FX.mathy(96);
      mathy.set(lulus ? 'girang' : S.gugur ? 'sedih' : 'senang', lulus ? 'Kerja bagus!' : 'Ayo coba lagi!');
      const judul = S.gugur ? tema.kata.gugurJudul : tema.kata.selesaiJudul;
      const kartuJabatan = lulus ? h('div', { class: 'gx-jabatan' }, h('span', { class: 'gx-jabatan-ikon', 'aria-hidden': 'true' }, '\uD83C\uDF96\uFE0F'),
        h('div', null, h('strong', null, berikut ? 'Naik jabatan!' : 'Jabatan tertinggi tercapai!'),
          h('p', null, berikut ? 'Kamu naik ke ' + berikut.nama + '.' : 'Kamu sekarang ' + lv.nama + '.'))) : null;
      const kartuGugur = S.gugur ? h('div', { class: 'gx-jabatan gx-kalah' }, h('span', { class: 'gx-jabatan-ikon', 'aria-hidden': 'true' }, '\uD83D\uDE22'),
        h('div', null, h('strong', null, tema.kata.gugurJudul), h('p', null, tema.kata.gugurIsi))) : null;
      app.replaceChildren(h('div', { class: 'gx-hasil hasil-shift' },
        mathy.el,
        h('h1', null, judul),
        FX.bintang(bintang),
        kartuGugur,
        kartuJabatan,
        h('div', { class: 'ringkas-baris' }, h('span', null, 'Koin'), h('strong', null, S.koin)),
        h('div', { class: 'ringkas-baris' }, h('span', null, 'Jawaban benar'), h('strong', null, S.benar + '/' + JUMLAH)),
        h('div', { class: 'ringkas-baris' }, h('span', null, 'Combo terbaik'), h('strong', null, '\u00D7' + S.maksBeruntun)),
        h('div', { class: 'ringkas-baris' }, h('span', null, 'Pangkat shift ini'), h('strong', null, tema.jabatan[S.pangkat])),
        h('div', { class: 'ringkas-baris' }, h('span', null, 'Skor terbaikmu di level ini'), h('strong', null, terbaik.get(lv.id) || 0)),
        S.baruLencana.length ? h('div', null, h('p', { class: 'redup' }, 'Lencana baru:'), h('div', { class: 'gx-baru-lencana' }, S.baruLencana.map((id) => lencana.kecil(id)))) : null,
        simpan.rekor ? h('p', { class: 'benar-teks' }, 'Rekor baru! +' + Math.min(50, Math.round(S.koin / 2)) + ' XP tersimpan.') : null,
        simpan.galat ? h('p', { class: 'salah' }, 'Skor belum tersimpan: ' + simpan.galat) : null,
        !lulus && berikut ? h('p', { class: 'redup' }, 'Raih minimal ' + AMBANG + ' koin untuk membuka level berikutnya.') : null,
        lulus && berikut && !bukaBerikut ? h('p', null, 'Level berikutnya terbuka dengan paket. ', h('a', { href: 'dashboard.html' }, 'Lihat paket')) : null,
        h('div', { class: 'baris-form', style: 'margin-top:1rem;justify-content:center' },
          h('button', { type: 'button', class: 'btn', onclick: () => ctx.mulai(lv, indeks) }, 'Main lagi'),
          bukaBerikut ? h('button', { type: 'button', class: 'btn', onclick: () => ctx.mulai(berikut, indeks + 1) }, 'Level berikutnya') : null,
          h('button', { type: 'button', class: 'btn btn-sekunder', onclick: () => ctx.menuLevel() }, 'Menu level'))));
      if (lulus) {
        FX.bunyi(berikut ? 'naik' : 'menang'); FX.hujan(['\uD83C\uDF89', '\u2B50', '\uD83E\uDE99', '\u2728'], 30);
      } else FX.bunyi(S.gugur ? 'kalah' : 'koin');
    }

    app.replaceChildren(
      h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: () => ctx.menuLevel() }, '\u2039 Menu level')),
      FX.kontrol(), hud, garis, panggung, baris, umpan, bahas);
    baru();
  }

  FX.shift = shift;
})();
