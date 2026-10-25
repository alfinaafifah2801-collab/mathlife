// Adegan 3D untuk Math Bank (three.js). Dimuat otomatis oleh js/games/math-bank.js hanya saat Tampilan 3D menyala.
// Semua model dibuat dari bentuk dasar (tanpa file model). Gelembung percakapan adalah HTML di atas kanvas, jadi tetap
// terbaca dan bisa dibaca pembaca layar. Bila 3D gagal (WebGL tidak ada, galat saat menggambar), tampilan 3D dimatikan
// dan gelembung tetap berjalan; pada shift berikutnya game memakai tampilan biasa.
(function () {
  'use strict';
  const FX = window.GameFX;

  const PALET_BAJU = [0xE8590C, 0x2FBF9B, 0x8E4EC6, 0xF2B705, 0xD6453D, 0x1E9E78, 0xB35A00, 0x5AA9E6, 0xC2255C, 0x37B24D];
  const PALET_KULIT = [0xF1C27D, 0xE0AC69, 0xC68642, 0x8D5524, 0xFFDBAC];
  const PALET_RAMBUT = [0x2B1B0E, 0x4A2C12, 0x111111, 0x7A7A7A, 0x6B3F1D];
  const hash = (t) => { let x = 7; for (let i = 0; i < t.length; i += 1) x = (x * 31 + t.charCodeAt(i)) >>> 0; return x; };

  // Posisi di dunia 3D (satuan kira-kira meter). Kamera menghadap ke arah -z.
  const LAYANAN = { x: -0.7, z: 1.4 };
  const ANTRI = [{ x: -2.4, z: 1.55 }, { x: -3.6, z: 1.7 }, { x: -4.8, z: 1.85 }];
  const TELLER = { x: 1.7, z: -0.9 };
  const MASUK_X = -9;
  const KELUAR = { x: 8, z: 2.0 };
  const MAKS_KOIN = 24;

  function buat(THREE, opsi) {
    const h = ML.h;
    const statis = FX.reduksi(); // gerakan dimatikan: adegan hanya digambar ulang saat ada kejadian
    let selesai = false;
    let berjalan = true;
    let raf = 0;
    let pengamat = null;

    // ---------- Elemen HTML ----------
    const kanvas = document.createElement('canvas');
    kanvas.className = 'gx-3d-kanvas';
    kanvas.setAttribute('aria-hidden', 'true');
    const kotak = h('div', { class: 'gx-3d-kotak' }, kanvas);
    const bNasabah = h('div', { class: 'gx-b3 nasabah', 'aria-live': 'polite' });
    bNasabah.hidden = true;
    const bJawab = h('div', { class: 'gx-b3 pemain', 'aria-live': 'polite' });
    bJawab.hidden = true;
    const bMathy = h('div', { class: 'gx-b3 mathy', 'aria-live': 'polite' });
    bMathy.hidden = true;
    const mathy = FX.mathy(64);
    const wadah = h('div', { class: 'gx-3d' }, kotak, bNasabah, h('div', { class: 'gx-b3-kanan' }, bJawab, bMathy), h('div', { class: 'gx-b3-mathy' }, mathy.el));
    let balasNasabah = null;

    // ---------- Adegan three.js ----------
    const renderer = new THREE.WebGLRenderer({ canvas: kanvas, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0xDCE8FF);
    const scene = new THREE.Scene();
    const kamera = new THREE.PerspectiveCamera(40, 16 / 9, 0.1, 60);
    kamera.position.set(0, 3.4, 9.5);
    kamera.lookAt(0, 2.1, 0);

    scene.add(new THREE.AmbientLight(0xFFFFFF, 1.0));
    const matahari = new THREE.DirectionalLight(0xFFFFFF, 1.3);
    matahari.position.set(4, 8, 6);
    scene.add(matahari);

    const mat = (warna) => new THREE.MeshLambertMaterial({ color: warna });
    const kotakMesh = (w, hh, d, warna, x, y, z) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(w, hh, d), mat(warna));
      m.position.set(x, y, z);
      scene.add(m);
      return m;
    };
    function tekstur(lebar, tinggi, gambar) {
      const c = document.createElement('canvas');
      c.width = lebar; c.height = tinggi;
      gambar(c.getContext('2d'), lebar, tinggi);
      const t = new THREE.CanvasTexture(c);
      if (THREE.SRGBColorSpace) t.colorSpace = THREE.SRGBColorSpace;
      return t;
    }

    // Lantai berpetak
    const texLantai = tekstur(64, 64, (g) => { g.fillStyle = '#EFE7D2'; g.fillRect(0, 0, 64, 64); g.fillStyle = '#E2D8BC'; g.fillRect(0, 0, 32, 32); g.fillRect(32, 32, 32, 32); });
    texLantai.wrapS = THREE.RepeatWrapping;
    texLantai.wrapT = THREE.RepeatWrapping;
    texLantai.repeat.set(10, 6);
    const lantai = new THREE.Mesh(new THREE.PlaneGeometry(30, 16), new THREE.MeshBasicMaterial({ map: texLantai }));
    lantai.rotation.x = -Math.PI / 2;
    lantai.position.set(0, 0, 2);
    scene.add(lantai);

    // Dinding belakang dan papan nama
    kotakMesh(30, 9, 0.2, 0xBFD4FA, 0, 4.5, -3.6);
    const texPapan = tekstur(512, 128, (g, w, hh) => {
      g.fillStyle = '#1F55A8'; g.fillRect(0, 0, w, hh);
      g.fillStyle = '#F2B705'; g.fillRect(0, hh - 14, w, 14);
      g.fillStyle = '#FFFFFF'; g.font = 'bold 70px Nunito, Arial, sans-serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
      g.fillText('MATH BANK', w / 2, hh / 2 - 6);
    });
    const papan = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 1.6), new THREE.MeshBasicMaterial({ map: texPapan }));
    papan.position.set(0, 5.6, -3.45);
    scene.add(papan);
    kotakMesh(0.5, 9, 0.5, 0x9FB7EA, -6.2, 4.5, -3.2);
    kotakMesh(0.5, 9, 0.5, 0x9FB7EA, 6.2, 4.5, -3.2);

    // Tanaman hias
    [-5.2, 5.4].forEach((x) => {
      const pot = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.28, 0.5, 14), mat(0xB35A00));
      pot.position.set(x, 0.25, -2.2);
      scene.add(pot);
      const daun = new THREE.Mesh(new THREE.SphereGeometry(0.55, 14, 10), mat(0x2F9E44));
      daun.position.set(x, 0.95, -2.2);
      scene.add(daun);
    });

    // Meja loket
    kotakMesh(7.2, 1.1, 1.2, 0xB9843C, 0.2, 0.55, 0);
    kotakMesh(7.6, 0.14, 1.6, 0xE0B36A, 0.2, 1.17, 0);

    // ---------- Karakter dari bentuk dasar ----------
    function karakter(baju, kulit, rambut, opsiK) {
      const g = new THREE.Group();
      const badan = new THREE.Mesh(new THREE.CapsuleGeometry(0.34, 0.7, 4, 10), mat(baju));
      badan.position.y = 0.85;
      g.add(badan);
      const kepala = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 12), mat(kulit));
      kepala.position.y = 1.7;
      g.add(kepala);
      const topi = new THREE.Mesh(new THREE.SphereGeometry(0.32, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2), mat(rambut));
      topi.position.y = 1.74;
      g.add(topi);
      [-0.1, 0.1].forEach((x) => {
        const mata = new THREE.Mesh(new THREE.SphereGeometry(0.04, 8, 8), mat(0x111111));
        mata.position.set(x, 1.72, 0.27);
        g.add(mata);
      });
      const mulut = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.03, 0.02), mat(0x7A2E2E));
      mulut.position.set(0, 1.6, 0.29);
      g.add(mulut);
      if (opsiK && opsiK.lencana) {
        const tex = tekstur(64, 64, (c) => {
          c.fillStyle = '#FFFFFF'; c.beginPath(); c.arc(32, 32, 30, 0, Math.PI * 2); c.fill();
          c.fillStyle = '#1F55A8'; c.font = 'bold 40px Nunito, Arial, sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('M', 32, 34);
        });
        const lencanaMesh = new THREE.Mesh(new THREE.PlaneGeometry(0.3, 0.3), new THREE.MeshBasicMaterial({ map: tex }));
        lencanaMesh.position.set(0, 1.0, 0.345);
        g.add(lencanaMesh);
      }
      const bayang = new THREE.Mesh(new THREE.CircleGeometry(0.5, 16), new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.22 }));
      bayang.rotation.x = -Math.PI / 2;
      bayang.position.y = 0.01;
      g.add(bayang);
      scene.add(g);
      return { g, badan, warnaAsli: baju };
    }

    const teller = karakter(0x2F6BD6, 0xFFDBAC, 0x2F6BD6, { lencana: true });
    teller.g.position.set(TELLER.x, 0, TELLER.z);
    teller.g.rotation.y = -0.45;

    let nasabahList = [];
    function buatNasabah(avatars) {
      nasabahList = avatars.map((e) => {
        const k = hash(e);
        const c = karakter(PALET_BAJU[k % PALET_BAJU.length], PALET_KULIT[(k >> 3) % PALET_KULIT.length], PALET_RAMBUT[(k >> 5) % PALET_RAMBUT.length]);
        c.g.visible = false;
        c.g.position.set(MASUK_X, 0, ANTRI[0].z);
        return c;
      });
    }

    // Tumpukan koin di meja
    const tumpukan = [];
    const geoKoin = new THREE.CylinderGeometry(0.16, 0.16, 0.04, 16);
    const matKoin = mat(0xF2B705);
    const slotKoin = (n) => ({ x: -2.3 + (n % 4) * 0.42, y: 1.27 + Math.floor(n / 4) * 0.045, z: 0.15 });

    // ---------- Animasi sederhana ----------
    const tweens = [];
    function tw(dur, fn, tamat, tunda) {
      if (statis) { fn(1); if (tamat) tamat(); return; }
      tweens.push({ mulai: performance.now() + (tunda || 0), dur, fn, tamat });
    }
    function jalankan(now) {
      tweens.slice().forEach((t) => {
        if (now < t.mulai) return;
        const p = Math.min(1, (now - t.mulai) / t.dur);
        t.fn(p);
        if (p >= 1) {
          const i = tweens.indexOf(t);
          if (i >= 0) tweens.splice(i, 1);
          if (t.tamat) t.tamat();
        }
      });
    }
    const lunak = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);
    function jalan(c, ke, dur, tunda) {
      let dari = null;
      tw(dur, (p) => {
        if (!dari) dari = { x: c.g.position.x, z: c.g.position.z };
        const e = lunak(p);
        c.g.position.x = dari.x + (ke.x - dari.x) * e;
        c.g.position.z = dari.z + (ke.z - dari.z) * e;
        c.g.position.y = p < 1 ? Math.abs(Math.sin(p * Math.PI * 6)) * 0.06 : 0;
      }, null, tunda);
    }
    function lompat(g) {
      let y0 = null;
      tw(560, (p) => { if (y0 === null) y0 = g.position.y; g.position.y = y0 + Math.abs(Math.sin(p * Math.PI * 2)) * 0.32; });
    }
    function goyang(g, kuat) {
      tw(520, (p) => { g.rotation.z = Math.sin(p * Math.PI * 8) * (kuat || 0.18) * (1 - p); });
    }
    function terbangKoin(dari, slot, tunda) {
      const m = new THREE.Mesh(geoKoin, matKoin);
      scene.add(m);
      const s = slotKoin(slot);
      const x0 = dari.x + 0.3; const y0 = 1.2; const z0 = dari.z + 0.2;
      m.position.set(x0, y0, z0);
      tw(650, (p) => {
        m.position.x = x0 + (s.x - x0) * p;
        m.position.z = z0 + (s.z - z0) * p;
        m.position.y = y0 + (s.y - y0) * p + Math.sin(p * Math.PI) * 0.9;
      }, null, tunda);
      tumpukan.push(m);
    }

    function susun(st) {
      nasabahList.forEach((c, j) => {
        const r = j - st.i;
        if (r < 0) { c.g.visible = false; return; }
        if (r > 3) { c.g.visible = false; c.g.position.set(MASUK_X, 0, ANTRI[0].z); return; }
        const ke = r === 0 ? LAYANAN : ANTRI[r - 1];
        if (!c.g.visible) { c.g.visible = true; c.g.position.set(MASUK_X, 0, ke.z); }
        c.g.rotation.y = r === 0 ? 0.5 : 0.9;
        jalan(c, ke, r === 0 ? 800 : 650);
      });
    }

    // ---------- Gelembung percakapan (sink) ----------
    const sink = {
      nasabah(i) {
        balasNasabah = null;
        bNasabah.hidden = false;
        // Catatan: replaceChildren bawaan browser mengubah null menjadi teks "null", jadi null disaring dulu.
        bNasabah.replaceChildren(...[
          h('strong', null, i.nama + ' ' + i.berkata),
          ...i.narasi.map((t) => h('p', null, t)),
          i.gambar ? h('div', { class: 'gambar-wadah' }, i.gambar) : null,
          h('p', { class: 'tanya' }, i.tanya)].filter(Boolean));
        bJawab.hidden = true; bJawab.replaceChildren();
        bMathy.hidden = true; bMathy.replaceChildren();
      },
      jawaban(teks, status) {
        bJawab.hidden = false;
        bJawab.className = 'gx-b3 pemain s-' + status;
        bJawab.replaceChildren(h('p', null, teks));
      },
      balasan(dari, node) {
        if (dari === 'mathy') {
          bMathy.hidden = false;
          bMathy.replaceChildren(h('strong', null, 'Si Mathy:'), node);
        } else {
          if (balasNasabah) balasNasabah.remove();
          balasNasabah = h('div', null, h('hr'), node);
          bNasabah.append(balasNasabah);
        }
      },
      asal() { return wadah; },
      reaksi() { /* ekspresi nasabah ditampilkan lewat animasi 3D */ }
    };

    // ---------- Menggambar ----------
    function ukur() {
      const w = kotak.clientWidth || 640;
      const t = kotak.clientHeight || 360;
      renderer.setSize(w, t, false);
      kamera.aspect = w / t;
      kamera.position.z = Math.min(16, Math.max(9.5, 9.5 * 1.7 / kamera.aspect));
      kamera.updateProjectionMatrix();
    }
    function gambar() { renderer.render(scene, kamera); }

    function bersih() {
      if (selesai) return;
      selesai = true; berjalan = false;
      cancelAnimationFrame(raf);
      if (pengamat) pengamat.disconnect();
      window.removeEventListener('resize', ukur);
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        const m = o.material;
        if (m) (Array.isArray(m) ? m : [m]).forEach((x) => { if (x.map) x.map.dispose(); x.dispose(); });
      });
      renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
    }

    // Bila menggambar gagal: matikan 3D, tapi game dan gelembung tetap lanjut.
    function gagal(e) {
      if (selesai) return;
      if (window.console) console.warn('Tampilan 3D dimatikan:', e);
      FX.tiga.matikan();
      kanvas.style.display = 'none';
      wadah.classList.add('gx-3d-mati');
      FX.toast('Animasi 3D dimatikan. Game tetap bisa dilanjutkan.');
      bersih();
    }

    function putar(t) {
      if (!berjalan) return;
      if (!wadah.isConnected) { bersih(); return; }
      raf = requestAnimationFrame(putar);
      if (document.hidden) return;
      try {
        jalankan(performance.now());
        kamera.position.x = Math.sin(t / 4200) * 0.3;
        kamera.lookAt(0, 2.1, 0);
        teller.g.rotation.y = -0.45 + Math.sin(t / 900) * 0.05;
        gambar();
      } catch (e) { gagal(e); }
    }

    renderer.setSize(640, 360, false);
    if (window.ResizeObserver) { pengamat = new window.ResizeObserver(() => { try { ukur(); if (statis) gambar(); } catch (e) { gagal(e); } }); pengamat.observe(kotak); }
    else window.addEventListener('resize', ukur);
    setTimeout(() => { if (!selesai) { try { ukur(); gambar(); } catch (e) { gagal(e); } } }, 0);
    if (!statis) raf = requestAnimationFrame(putar);

    return {
      el: wadah,
      tanpaAntrean: true,
      jedaKeluar: 620,
      sink,
      perbarui(st, aksi) {
        if (selesai) { if (opsi && opsi.suasana) opsi.suasana(mathy, st, aksi); return; }
        try {
          if (!nasabahList.length) buatNasabah(st.avatars);
          const c = nasabahList[st.i];
          if (aksi === 'mulai') susun(st);
          else if (aksi === 'benar' && c) {
            lompat(c.g); lompat(teller.g);
            const sasaran = Math.min(MAKS_KOIN, Math.floor(st.koin / 5));
            let k = 0;
            while (tumpukan.length < sasaran) { terbangKoin(c.g.position, tumpukan.length, k * 110); k += 1; }
          } else if (aksi === 'salah1') goyang(teller.g, 0.12);
          else if (aksi === 'gagal' && c) { c.badan.material.color.set(0xD6453D); goyang(c.g); goyang(teller.g, 0.12); }
          else if (aksi === 'cemas' && c) goyang(c.g, 0.1);
          else if (aksi === 'pangkat') lompat(teller.g);
          else if (aksi === 'keluar' && c) {
            const marah = st.riwayat[st.riwayat.length - 1] === 'gagal';
            jalan(c, KELUAR, marah ? 650 : 800);
            tw(900, () => {}, () => { c.g.visible = false; });
          }
          if (statis) gambar();
        } catch (e) { gagal(e); }
        if (opsi && opsi.suasana) opsi.suasana(mathy, st, aksi);
      },
      bersih
    };
  }

  FX.bank3D = { buat };
})();
