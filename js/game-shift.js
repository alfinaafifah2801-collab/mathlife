// Mesin "shift" bersama: antrean pelanggan, bar kesabaran, combo, koin terbang, pangkat, lencana, dan layar hasil.
// Soal dan jawaban tampil sebagai gelembung percakapan. Dipakai oleh Math Bank dan Build It lewat
// GameFX.shift({ ctx, game, lv, indeks, tema }).
//
// Adegan (tema.adegan) boleh menyediakan "sink" sendiri (mis. adegan 3D) untuk menampilkan gelembung:
//   sink.nasabah({ nama, avatar, berkata, narasi, gambar, tanya, label })
//   sink.jawaban(teks, status)            status: 'benar' | 'salah'
//   sink.balasan(dari, node, jenis)       dari: 'nasabah' | 'mathy'
//   sink.bahas(nodes)                     (opsional) pembahasan; bila tidak ada, panel pembahasan bawaan dipakai
//   sink.asal()                           (opsional) elemen asal koin terbang dan ledakan
//   sink.reaksi(emoji)                    (opsional)
(function () {
  'use strict';
  const FX = window.GameFX;
  const BATAS_PANGKAT = [0, 30, 60, 90];
  const JEDA_BAWAAN = 120;
  const BUANG_SATUAN = /\s*(cm|m)\s*[²³23]?\s*$/i;

  // ---------- Gelembung percakapan bawaan ----------
  function buatThread() {
    const h = ML.h;
    const el = h('div', { class: 'gx-chat', role: 'log', 'aria-live': 'polite', 'aria-label': 'Percakapan' });
    let avatarNasabah = null;
    let emojiNasabah = '\uD83D\uDE42';
    const turun = () => { el.scrollTop = el.scrollHeight; };
    function avatarMathy() {
      const a = h('div', { class: 'gx-ava mathy', 'aria-hidden': 'true' });
      const img = h('img', { src: 'assets/mathy-game.png', alt: '' });
      img.addEventListener('error', () => { img.remove(); a.textContent = 'M'; });
      a.append(img);
      return a;
    }
    function baris(sisi, ava, isi, kelas) {
      const b = h('div', { class: 'gx-bubble' + (kelas ? ' ' + kelas : '') }, isi);
      el.append(h('div', { class: 'gx-baris-chat ' + sisi }, ava, b));
      turun();
      return b;
    }
    return {
      el,
      nasabah(i) {
        emojiNasabah = i.avatar;
        avatarNasabah = h('div', { class: 'gx-ava', 'aria-hidden': 'true' }, i.avatar);
        el.append(h('div', { class: 'gx-pembatas' }, i.label));
        baris('kiri', avatarNasabah, [
          h('strong', null, i.nama + ' ' + i.berkata),
          ...i.narasi.map((t) => h('p', null, t)),
          i.gambar ? h('div', { class: 'gambar-wadah' }, i.gambar) : null,
          h('p', { class: 'tanya' }, i.tanya)
        ].filter(Boolean));
      },
      jawaban(teks, status) { baris('kanan', null, h('p', null, teks), 's-' + status); },
      balasan(dari, node, jenis) {
        const ava = dari === 'mathy' ? avatarMathy() : h('div', { class: 'gx-ava', 'aria-hidden': 'true' }, emojiNasabah);
        baris('kiri', ava, node, jenis === 'info' ? 's-info' : '');
      },
      bahas(nodes) { baris('kiri', avatarMathy(), [h('strong', null, 'Pembahasan'), ...nodes], 's-info'); },
      asal() { return avatarNasabah || el; },
      reaksi(e) { emojiNasabah = e; if (avatarNasabah) avatarNasabah.textContent = e; }
    };
  }

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
      selesaiSoal: false, selesai: false, gugur: false, cemas: false, baruLencana: [], namaNasabah: '',
      avatars: Array.from({ length: JUMLAH }, () => FX.pilihAcak(tema.avatar))
    };

    // ---------- Elemen ----------
    const chipKoin = h('span', { class: 'gx-chip koin' });
    const hud = h('div', { class: 'gx-hud', 'aria-live': 'off' });
    const isiGaris = h('span');
    const garis = h('div', { class: 'gx-garis' }, isiGaris);
    const adegan = tema.adegan(S);
    const sink = adegan.sink || buatThread();
    const pakaiThread = !adegan.sink;
    const antrean = h('div', { class: 'gx-antrean', 'aria-hidden': 'true' });
    const sabarIsi = h('span', { class: 'gx-sabar-isi' });
    const sabarWajah = h('span', { class: 'gx-sabar-wajah', 'aria-hidden': 'true' }, '\uD83D\uDE0A');
    const sabarCap = h('small', { class: 'gx-sabar-cap' });
    const sabar = tema.sabar ? h('div', { class: 'gx-sabar' }, sabarWajah, h('div', { class: 'gx-sabar-bar', 'aria-hidden': 'true' }, sabarIsi), sabarCap) : null;
    const atas = adegan.tanpaAntrean ? adegan.el : h('div', { class: 'gx-baris-atas' }, adegan.el, antrean);
    const panggung = h('div', { class: 'gx-panggung' + (adegan.tanpaAntrean ? ' gx-panggung-3d' : '') }, atas, sabar);
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

    function pangkatDari(koin) {
      let p = 0;
      BATAS_PANGKAT.forEach((b, k) => { if (koin >= b) p = k; });
      return p;
    }
    function beri(id, diam) { if (lencana && lencana.beri(id, diam)) S.baruLencana.push(id); }
    const asal = () => (sink.asal ? sink.asal() : panggung);
    const bersihkan = () => { if (adegan.bersih) adegan.bersih(); };

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
      if (!panggung.isConnected) { clearInterval(timer); bersihkan(); return; }
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
      S.namaNasabah = game.namaNasabah();
      sink.nasabah({
        nama: S.namaNasabah, avatar: S.avatars[S.i], berkata: tema.kata.berkata, narasi: s.narasi, gambar: s.gambar, tanya: s.tanya,
        label: tema.kata.pelanggan + ' ' + (S.i + 1) + ' dari ' + JUMLAH
      });
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
      const nodes = S.soal.bahas.map((t) => h('p', null, t));
      if (sink.bahas) { sink.bahas(nodes); return; }
      bahas.replaceChildren(...nodes);
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

    function benar(teksJawab) {
      let poin = S.percobaan === 1 ? 10 : 5;
      if (S.percobaan === 1) { S.beruntun += 1; S.pertama += 1; if (S.beruntun >= 3) poin += 5; } else { S.beruntun = 0; }
      S.maksBeruntun = Math.max(S.maksBeruntun, S.beruntun);
      S.koin += poin; S.benar += 1; S.riwayat.push('ok');
      FX.bunyi('benar'); setTimeout(() => FX.bunyi('koin'), 170);
      const bonus = S.beruntun >= 3 && S.percobaan === 1;
      sink.jawaban(teksJawab, 'benar');
      sink.balasan('nasabah', h('div', null,
        h('p', null, FX.pilihAcak(tema.kata.balasBenar)),
        h('p', null, h('span', { class: 'benar-teks' }, 'Benar! +' + poin + ' koin' + (bonus ? ' (termasuk bonus beruntun)' : '')))), 'benar');
      if (sink.reaksi) sink.reaksi('\uD83D\uDE04');
      const n = Math.min(4, Math.ceil(poin / 5));
      const dari = asal();
      for (let k = 0; k < n; k += 1) {
        FX.terbang(dari, chipKoin, k % 2 ? '\uD83E\uDE99' : tema.hadiah, k === n - 1 ? () => {
          chipKoin.classList.remove('naik'); void chipKoin.offsetWidth; chipKoin.classList.add('naik');
        } : null, k * 90);
      }
      FX.meledakDi(dari, ['\u2728', '\u2B50'], 8);
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

    function salahPertama(teksJawab) {
      S.beruntun = 0;
      FX.bunyi('salah');
      sink.jawaban(teksJawab, 'salah');
      sink.balasan('mathy', h('p', null, h('span', { class: 'salah' }, 'Belum tepat. Coba sekali lagi. Petunjuk: ' + S.soal.petunjuk)), 'salah');
      masuk.value = ''; masuk.focus({ preventScroll: true }); perbaruiHud();
      adegan.perbarui(S, 'salah1');
    }

    function gagalSoal(pesan, teksJawab) {
      S.beruntun = 0; kurangiNyawa(); S.riwayat.push('gagal');
      FX.bunyi('salah');
      if (teksJawab) sink.jawaban(teksJawab, 'salah');
      if (sink.reaksi) sink.reaksi('\uD83D\uDE20');
      sink.balasan('nasabah', h('p', null, h('span', { class: 'salah' }, (pesan ? pesan + ' ' : '') + 'Jawaban yang benar: ' + tampilJawab(S.soal.jawab, S.soal.satuan) + '.')), 'salah');
      adegan.perbarui(S, 'gagal');
      tampilBahas(); selesaiSoal();
    }
    function habis() { if (!S.selesaiSoal) gagalSoal(tema.kata.pergi, ''); }

    function periksa() {
      if (S.selesaiSoal) return;
      const mentah = String(masuk.value).replace(BUANG_SATUAN, '');
      const v = parseAngka(mentah);
      if (Number.isNaN(v)) { umpan.replaceChildren(h('span', { class: 'salah' }, 'Tulis jawabanmu dalam angka.')); return; }
      umpan.replaceChildren();
      S.percobaan += 1;
      const teksJawab = awalan.textContent + mentah.trim().replace(/^rp\s*/i, '') + (akhiran.textContent ? (akhiran.textContent === '%' ? '' : ' ') + akhiran.textContent : '');
      if (Math.abs(v - S.soal.jawab) < 1e-9) benar(teksJawab);
      else if (S.percobaan === 1) salahPertama(teksJawab);
      else gagalSoal('', teksJawab);
    }

    function lanjut() {
      if (lanjutBtn.disabled) return;
      lanjutBtn.disabled = true;
      adegan.perbarui(S, 'keluar');
      const jeda = FX.reduksi() ? 0 : (adegan.jedaKeluar != null ? adegan.jedaKeluar : JEDA_BAWAAN);
      setTimeout(() => {
        lanjutBtn.disabled = false;
        S.i += 1;
        if (S.i >= JUMLAH || S.gugur) hasil(); else baru();
      }, jeda);
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
      bersihkan();
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

    app.replaceChildren(...[
      h('p', null, h('button', { type: 'button', class: 'btn-teks', onclick: () => ctx.menuLevel() }, '\u2039 Menu level')),
      FX.kontrol({ tiga: Boolean(game.tiga) }), hud, garis, panggung,
      pakaiThread ? sink.el : null,
      baris, umpan, bahas
    ].filter(Boolean));
    baru();
  }

  FX.shift = shift;
})();
