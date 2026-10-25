// Efek bersama untuk semua game MathLife: suara, animasi koin/bintang, Si Mathy, lencana, dan gaya tampilan game.
// Dimuat otomatis oleh js/game.js sebelum file game dijalankan.
(function () {
  'use strict';
  if (window.GameFX) return;

  const baca = (k) => { try { return window.localStorage.getItem(k); } catch (e) { return null; } };
  const tulis = (k, v) => { try { window.localStorage.setItem(k, v); } catch (e) { /* diabaikan */ } };
  const reduksi = () => Boolean(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const acak = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pilihAcak = (arr) => arr[acak(0, arr.length - 1)];
  const bisaAnimasi = () => !reduksi() && Boolean(document.body && document.body.animate);

  const BASE = (document.currentScript && document.currentScript.src) || location.href;
  const bisaWebGL = () => {
    try {
      const c = document.createElement('canvas');
      return Boolean(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
    } catch (e) { return false; }
  };
  // Tampilan 3D: nyala bila dipilih pemain; bila belum memilih, nyala hanya di perangkat yang mampu.
  const awal3D = () => {
    const s = baca('ml-3d');
    if (s === '1') return true;
    if (s === '0') return false;
    return bisaWebGL() && !reduksi() && (navigator.hardwareConcurrency || 4) >= 4;
  };
  const pengaturan = { suara: baca('ml-suara') !== '0', santai: baca('ml-santai') === '1', tiga: awal3D() };

  // ---------- Gaya ----------
  const CSS = `
.gx-kontrol{display:flex;gap:.4rem;flex-wrap:wrap;margin:.25rem 0 .6rem}
.gx-tombol-kecil{border:2px solid #C9D0F0;background:#fff;color:#1E1B4B;border-radius:999px;padding:.2rem .75rem;font:inherit;font-size:.85rem;font-weight:700;cursor:pointer}
.gx-tombol-kecil[aria-pressed="false"]{opacity:.65}
.gx-hud{display:flex;flex-wrap:wrap;gap:.45rem;align-items:center;margin:.4rem 0}
.gx-chip{background:#fff;color:#1E1B4B;border:2px solid #D5DCF5;border-radius:999px;padding:.18rem .75rem;font-weight:700;font-size:.92rem}
.gx-chip.koin{background:#FFF8DC;border-color:#F2B705}
.gx-chip.api{background:#FFE8D6;border-color:#E8590C;animation:gx-denyut .7s ease-in-out infinite}
.gx-chip.pangkat{background:#E8EAFB;border-color:#8E94E8}
.gx-chip.waktu{background:#EAF6FF;border-color:#5AA9E6}
.gx-chip.bahaya{background:#FFE3E3;border-color:#E03131;color:#8A1111}
.gx-chip.naik{animation:gx-lompat .6s}
.gx-garis{height:10px;background:#E4E7F7;border-radius:999px;overflow:hidden;margin:.3rem 0 .8rem}
.gx-garis span{display:block;height:100%;width:0;background:linear-gradient(90deg,#2FBF9B,#1F55A8);border-radius:999px;transition:width .4s}

.gx-panggung{position:relative;background:linear-gradient(#EAF0FF,#F8FAFF);border:2px solid #D5DCF5;border-radius:18px;padding:1rem;overflow:hidden;color:#1E1B4B}
.gx-baris-atas{display:flex;gap:1rem;align-items:flex-end;justify-content:space-between;flex-wrap:wrap}
.gx-antrean{display:flex;gap:.3rem;align-items:flex-end;font-size:2rem;min-height:2.6rem}
.gx-antrean small{font-size:.8rem;font-weight:700;margin-right:.3rem;align-self:center}
.gx-orang{opacity:.85;filter:saturate(.8)}
.gx-orang:nth-child(2){font-size:2.1rem}
.gx-depan{display:flex;gap:.8rem;align-items:flex-start;margin-top:.9rem}
.gx-avatar{font-size:3.2rem;line-height:1;background:#fff;border:3px solid #1F55A8;border-radius:50%;width:4.6rem;height:4.6rem;display:flex;align-items:center;justify-content:center;flex:none}
.gx-gelembung{position:relative;flex:1;min-width:0;background:#fff;color:#1E1B4B;border:3px solid #1F55A8;border-radius:16px;padding:.8rem 1rem}
.gx-gelembung::before{content:"";position:absolute;left:-12px;top:22px;width:18px;height:18px;background:#fff;border-left:3px solid #1F55A8;border-bottom:3px solid #1F55A8;transform:rotate(45deg)}
.gx-gelembung p{margin:.25rem 0}
.gx-gelembung svg{max-width:100%;height:auto;display:block;margin:.4rem auto}
.gx-gelembung.gx-benar{border-color:#1E9E78;background:#F0FBF7}
.gx-gelembung .tanya{font-weight:800}
.gx-sabar{display:flex;align-items:center;gap:.6rem;margin-top:.8rem}
.gx-sabar-wajah{font-size:1.6rem}
.gx-sabar-bar{flex:1;height:14px;background:#E4E7F7;border-radius:999px;overflow:hidden}
.gx-sabar-isi{display:block;height:100%;width:100%;background:#2FBF9B;border-radius:999px;transition:width .2s linear,background .3s}
.gx-sabar-isi[data-t="kuning"]{background:#F2B705}
.gx-sabar-isi[data-t="merah"]{background:#E03131}
.gx-sabar-cap{font-weight:700;min-width:6.5rem;text-align:right}

.gx-loket{display:flex;align-items:flex-end;gap:.8rem}
.gx-meja{background:linear-gradient(#B9843C,#8A5A1F);color:#fff;border-radius:12px 12px 0 0;padding:.5rem 1rem;min-width:9rem;text-align:center;box-shadow:0 4px 0 #6B4414}
.gx-meja small{display:block;opacity:.85}
.gx-tumpukan{display:block;font-size:1.5rem;min-height:1.9rem;letter-spacing:-.15em}
.gx-gedung-wadah{display:flex;align-items:flex-end;gap:.8rem}
.gx-gedung{display:flex;flex-direction:column-reverse;gap:2px;width:110px;padding-top:.2rem}
.gx-lantai{height:15px;border:2px dashed #AEB6DD;border-radius:3px;font-size:.7rem;line-height:11px;text-align:center;color:#fff}
.gx-lantai.jadi{border:2px solid #A33E0E;background:#E8590C;animation:gx-pop .4s}
.gx-lantai.retak{border:2px solid #7A1F1F;background:#9C6B6B;animation:gx-goyang .4s}
.gx-puncak{text-align:center;font-size:1.6rem;line-height:1}

.gx-mathy{display:flex;align-items:flex-end;gap:.4rem}
.gx-mathy-badan{position:relative;display:inline-block;min-width:3rem;min-height:3rem}
.gx-mathy-badan img{display:block;height:auto}
.gx-mood{position:absolute;right:-6px;top:-6px;font-size:1.5rem;background:#fff;border:2px solid #D5DCF5;border-radius:50%;width:2.1rem;height:2.1rem;display:flex;align-items:center;justify-content:center}
.gx-ucap{background:#fff;color:#1E1B4B;border:2px solid #D5DCF5;border-radius:12px;padding:.25rem .6rem;font-size:.85rem;font-weight:700;max-width:12rem}
.gx-ucap:empty{display:none}
.gx-mathy.gx-lompat .gx-mathy-badan{animation:gx-lompat .6s}
.gx-mathy.gx-goyang .gx-mathy-badan{animation:gx-goyang .5s}

.gx-masuk{animation:gx-masuk .4s ease-out}
.gx-keluar-ok{animation:gx-keluar-ok .38s ease-in forwards}
.gx-keluar-marah{animation:gx-keluar-marah .38s ease-in forwards}
.gx-goyang{animation:gx-goyang .45s}

.gx-bintang{display:flex;justify-content:center;gap:.4rem;font-size:3rem;margin:.4rem 0}
.gx-bintang .gx-b{color:#D5D8E8;transform:scale(.6);opacity:.4}
.gx-bintang .gx-b.on{color:#F2B705;text-shadow:0 2px 0 #B98200;animation:gx-bintang .5s forwards;opacity:0}
.gx-hasil{max-width:34rem;margin:0 auto;text-align:center}
.gx-hasil .ringkas-baris{text-align:left}
.gx-jabatan{display:flex;gap:.8rem;align-items:center;text-align:left;background:#FFF1CC;border:3px solid #F2B705;color:#4A3300;border-radius:16px;padding:.8rem 1rem;margin:.8rem 0;animation:gx-pop .6s}
.gx-jabatan-ikon{font-size:2.6rem}
.gx-jabatan p{margin:.1rem 0}
.gx-kalah{background:#FFECEC;border-color:#E03131;color:#5C1111}
.gx-baru-lencana{display:flex;flex-wrap:wrap;gap:.5rem;justify-content:center;margin:.6rem 0}

.gx-bagian-lencana{margin-top:1.5rem}
.gx-galeri{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:.6rem}
.gx-lencana{background:#fff;color:#1E1B4B;border:2px solid #D5DCF5;border-radius:14px;padding:.6rem;text-align:center;filter:grayscale(1);opacity:.55}
.gx-lencana.ada{filter:none;opacity:1;border-color:#F2B705;background:#FFF8DC}
.gx-lencana span{display:block;font-size:1.8rem}
.gx-lencana small{display:block;font-size:.78rem;line-height:1.25;margin-top:.2rem}
.gx-lencana.kecil{display:inline-flex;gap:.4rem;align-items:center;padding:.25rem .7rem;filter:none;opacity:1;border-color:#F2B705;background:#FFF8DC}
.gx-lencana.kecil span{display:inline;font-size:1.2rem}

.gx-peta{position:relative;aspect-ratio:16/9;min-height:250px;background:#F6F1E3;border:3px solid #CFC6A8;border-radius:16px;overflow:hidden;color:#1E1B4B}
.gx-koridor{position:absolute;left:0;right:0;top:38%;height:24%;background:repeating-linear-gradient(90deg,#E9E2CC 0 38px,#E2DAC1 38px 40px)}
.gx-pintu{position:absolute;left:0;top:41%;height:18%;width:6%;background:#9CC9F5;border-right:3px solid #5AA9E6;font-size:.65rem;font-weight:800;display:flex;align-items:center;justify-content:center;writing-mode:vertical-rl}
.gx-toko-peta{position:absolute;width:24%;height:32%;border:3px solid #1F55A8;border-radius:12px;background:#fff;color:#1E1B4B;font:inherit;font-weight:800;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;padding:.2rem}
.gx-toko-peta:hover,.gx-toko-peta:focus-visible{background:#E8EAFB;transform:translateY(-2px)}
.gx-toko-peta .ik{font-size:1.7rem;line-height:1}
.gx-toko-peta small{font-size:.72rem}
.gx-toko-peta.kasir{border-color:#1E9E78;background:#EAFBF4}
.gx-pemain{position:absolute;font-size:1.8rem;transform:translate(-50%,-50%);transition:left .7s ease,top .7s ease;z-index:2;pointer-events:none;filter:drop-shadow(0 2px 2px rgba(0,0,0,.3))}
.gx-toko-kepala{display:flex;gap:.6rem;align-items:center;margin:.4rem 0}
.gx-toko-kepala .ik{font-size:2.2rem}
.gx-daftar{list-style:none;padding:0;margin:.3rem 0}
.gx-daftar li{display:flex;justify-content:space-between;gap:.5rem;padding:.3rem .5rem;border-radius:8px;border:2px solid #E0E3F5;background:#fff;color:#1E1B4B;margin:.25rem 0}
.gx-daftar li.ok{border-color:#1E9E78;background:#EAFBF4}
.gx-daftar li.lebih{border-color:#E03131;background:#FFECEC}
.gx-daftar small{opacity:.8;display:block}
.gx-qty{display:inline-flex;align-items:center;gap:.3rem}
.gx-qty button{width:1.8rem;height:1.8rem;border-radius:50%;border:2px solid #1F55A8;background:#fff;color:#1F55A8;font-weight:800;cursor:pointer;line-height:1}
.gx-anggaran{margin:.5rem 0}
.gx-anggaran .gx-garis span{background:linear-gradient(90deg,#2FBF9B,#F2B705)}
.gx-anggaran.bahaya .gx-garis span{background:#E03131}
.gx-anggaran.bahaya small{color:#B01919;font-weight:700}
.gx-kasir-adegan{background:#fff;border:2px solid #D5DCF5;border-radius:14px;padding:.8rem;color:#1E1B4B}
.gx-antri{display:flex;gap:.4rem;align-items:flex-end;font-size:2rem;flex-wrap:wrap;margin:.4rem 0}
.gx-antri .kamu{background:#FFF1CC;border:2px solid #F2B705;border-radius:12px;padding:0 .4rem}
.gx-antri .pergi{animation:gx-keluar-ok .6s forwards}
.gx-notif{min-height:1.4rem;font-weight:700;margin:.3rem 0}
.gx-notif.salah{color:#B01919}
.gx-notif.benar{color:#0F7A59}

.gx-lapisan{position:fixed;inset:0;pointer-events:none;z-index:9998;overflow:hidden}
.gx-partikel{position:absolute;font-size:1.4rem;will-change:transform,opacity}
.gx-terbang{position:absolute;left:0;top:0;font-size:1.6rem;will-change:transform,opacity}
.gx-toast-wadah{position:fixed;top:.8rem;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:.4rem;align-items:center;pointer-events:none;width:max-content;max-width:92vw}
.gx-toast{background:#1E1B4B;color:#fff;padding:.5rem 1rem;border-radius:12px;font-weight:800;box-shadow:0 6px 18px rgba(0,0,0,.25);animation:gx-toast 3.2s forwards}
.gx-toast.lencana{background:#B35A00}
.gx-toast.naik{background:#1F55A8}

.gx-chat{max-height:21rem;overflow-y:auto;background:#F4F6FF;border:2px solid #D5DCF5;border-radius:16px;padding:.8rem;margin:.8rem 0;display:flex;flex-direction:column;gap:.55rem;scroll-behavior:smooth}
.gx-baris-chat{display:flex;gap:.5rem;align-items:flex-end;max-width:100%}
.gx-baris-chat.kanan{justify-content:flex-end}
.gx-bubble{max-width:82%;padding:.6rem .85rem;border-radius:18px;background:#fff;color:#1E1B4B;border:2px solid #C9D0F0;overflow-wrap:anywhere;animation:gx-bubble .25s ease-out}
.gx-baris-chat.kiri .gx-bubble{border-bottom-left-radius:4px}
.gx-baris-chat.kanan .gx-bubble{background:#1F55A8;color:#fff;border-color:#1F55A8;border-bottom-right-radius:4px;font-weight:800}
.gx-baris-chat.kanan .gx-bubble.s-benar{background:#1E9E78;border-color:#1E9E78}
.gx-baris-chat.kanan .gx-bubble.s-salah{background:#D6453D;border-color:#D6453D}
.gx-bubble p{margin:.2rem 0}
.gx-bubble .tanya{font-weight:800}
.gx-bubble svg{max-width:100%;height:auto;display:block;margin:.3rem auto}
.gx-bubble.s-info{background:#F1F2FF;border-color:#8E94E8}
.gx-ava{width:2.4rem;height:2.4rem;border-radius:50%;background:#fff;border:2px solid #C9D0F0;display:flex;align-items:center;justify-content:center;font-size:1.5rem;flex:none;overflow:hidden;font-weight:800;color:#1F55A8}
.gx-ava.mathy{background:#E8EAFB}
.gx-ava img{width:100%;height:100%;object-fit:cover}
.gx-pembatas{align-self:center;font-size:.78rem;font-weight:800;color:#4B53A8;background:#E8EAFB;border-radius:999px;padding:.1rem .8rem}
@keyframes gx-bubble{from{transform:translateY(8px) scale(.96);opacity:0}to{transform:none;opacity:1}}

.gx-panggung-3d{padding:0}
.gx-panggung-3d .gx-sabar{padding:.5rem .9rem .7rem;margin-top:0}
.gx-3d{position:relative;background:linear-gradient(#CFE0FF,#F3F6FF);color:#1E1B4B}
.gx-3d-kotak{height:390px;position:relative}
.gx-3d-kanvas{width:100%;height:100%;display:block}
.gx-b3{background:#fff;color:#1E1B4B;border:3px solid #1F55A8;border-radius:16px;padding:.55rem .8rem;font-size:.94rem;max-height:44%;overflow:auto;overflow-wrap:anywhere;box-shadow:0 4px 0 rgba(31,85,168,.22);animation:gx-bubble .25s ease-out}
.gx-b3 p{margin:.2rem 0}
.gx-b3 .tanya{font-weight:800}
.gx-b3.nasabah{position:absolute;left:2%;top:3%;width:55%;border-bottom-left-radius:4px}
.gx-b3-kanan{position:absolute;right:2%;top:3%;width:39%;display:flex;flex-direction:column;gap:.4rem;pointer-events:none}
.gx-b3-kanan .gx-b3{max-height:none;pointer-events:auto}
.gx-b3.pemain{background:#1F55A8;color:#fff;border-color:#1F55A8;font-weight:800;text-align:right;border-bottom-right-radius:4px}
.gx-b3.pemain.s-benar{background:#1E9E78;border-color:#1E9E78}
.gx-b3.pemain.s-salah{background:#D6453D;border-color:#D6453D}
.gx-b3.mathy{background:#F1F2FF;border-color:#8E94E8}
.gx-b3 hr{border:0;border-top:2px dashed #C9D0F0;margin:.4rem 0}
.gx-b3-mathy{position:absolute;right:2%;bottom:2%}
.gx-3d-mati .gx-3d-kotak{height:5rem;display:flex;align-items:center;justify-content:center;font-size:3rem}
.gx-3d-mati .gx-3d-kotak::after{content:"🏦"}
.gx-3d-mati .gx-b3.nasabah,.gx-3d-mati .gx-b3-kanan,.gx-3d-mati .gx-b3-mathy{position:static;width:auto;margin:.5rem}.gx-3d-mati .gx-b3-kanan{pointer-events:auto}.gx-3d-mati .gx-b3-mathy{display:flex;justify-content:flex-end}.gx-3d-mati .gx-b3{max-height:none}
@media (max-width:640px){.gx-3d-kotak{height:230px}.gx-b3.nasabah,.gx-b3-kanan,.gx-b3-mathy{position:static;width:auto;margin:.5rem}.gx-b3-kanan{pointer-events:auto}.gx-b3-mathy{display:flex;justify-content:flex-end}.gx-b3{max-height:none}.gx-bubble{max-width:92%}}

@keyframes gx-masuk{from{transform:translateX(50px);opacity:0}to{transform:none;opacity:1}}
@keyframes gx-keluar-ok{to{transform:translateX(70px) scale(.9);opacity:0}}
@keyframes gx-keluar-marah{to{transform:translateX(-70px) rotate(-8deg);opacity:0}}
@keyframes gx-goyang{0%,100%{transform:none}20%{transform:translateX(-7px)}40%{transform:translateX(7px)}60%{transform:translateX(-5px)}80%{transform:translateX(5px)}}
@keyframes gx-lompat{0%,100%{transform:none}40%{transform:translateY(-14px) scale(1.08)}}
@keyframes gx-denyut{0%,100%{transform:scale(1)}50%{transform:scale(1.07)}}
@keyframes gx-pop{0%{transform:scale(.6);opacity:0}70%{transform:scale(1.08)}100%{transform:scale(1);opacity:1}}
@keyframes gx-bintang{0%{transform:scale(.3) rotate(-40deg);opacity:0}70%{transform:scale(1.35) rotate(8deg);opacity:1}100%{transform:scale(1) rotate(0);opacity:1}}
@keyframes gx-toast{0%{opacity:0;transform:translateY(-12px)}10%,85%{opacity:1;transform:none}100%{opacity:0}}

@media (max-width:560px){.gx-avatar{width:3.4rem;height:3.4rem;font-size:2.4rem}.gx-gelembung::before{display:none}.gx-sabar-cap{min-width:4.5rem}.gx-toko-peta small{display:none}}
@media (prefers-reduced-motion:reduce){[class*="gx-"],.gx-pemain{animation:none!important;transition:none!important}.gx-bintang .gx-b.on{opacity:1;transform:none}}
`;
  function pasangGaya() {
    if (document.getElementById('gx-gaya')) return;
    const s = document.createElement('style');
    s.id = 'gx-gaya';
    s.textContent = CSS;
    document.head.append(s);
  }

  // ---------- Suara (dibuat dengan Web Audio, tanpa file) ----------
  let audio = null;
  function ac() {
    if (!audio) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      try { audio = new C(); } catch (e) { return null; }
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }
  // Format: [frekuensi, mulai(detik), durasi, jenis, volume]
  const NADA = {
    klik: [[600, 0, 0.05, 'square', 0.04]],
    benar: [[660, 0, 0.1, 'triangle', 0.14], [880, 0.1, 0.2, 'triangle', 0.14]],
    salah: [[200, 0, 0.18, 'sawtooth', 0.07], [150, 0.16, 0.28, 'sawtooth', 0.07]],
    koin: [[988, 0, 0.06, 'square', 0.05], [1319, 0.06, 0.22, 'square', 0.05]],
    combo: [[523, 0, 0.08], [659, 0.08, 0.08], [784, 0.16, 0.08], [1047, 0.24, 0.25]],
    naik: [[392, 0, 0.12], [523, 0.12, 0.12], [659, 0.24, 0.12], [784, 0.36, 0.12], [1047, 0.48, 0.4]],
    menang: [[523, 0, 0.14], [523, 0.15, 0.14], [523, 0.3, 0.14], [698, 0.45, 0.35], [659, 0.82, 0.12], [784, 0.94, 0.5]],
    kalah: [[330, 0, 0.25, 'sawtooth', 0.07], [262, 0.26, 0.25, 'sawtooth', 0.07], [196, 0.52, 0.5, 'sawtooth', 0.07]],
    bintang1: [[784, 0, 0.18]],
    bintang2: [[988, 0, 0.18]],
    bintang3: [[1319, 0, 0.3]],
    lencana: [[784, 0, 0.1], [988, 0.1, 0.1], [1319, 0.2, 0.35]],
    kasir: [[1500, 0, 0.05, 'square', 0.04], [1500, 0.09, 0.05, 'square', 0.04]]
  };
  function bunyi(nama) {
    if (!pengaturan.suara) return;
    const a = ac();
    const seri = NADA[nama];
    if (!a || !seri) return;
    const t0 = a.currentTime;
    seri.forEach((n) => {
      const mulai = n[1];
      const dur = n[2];
      const v = n[4] || 0.12;
      const o = a.createOscillator();
      const g = a.createGain();
      o.type = n[3] || 'triangle';
      o.frequency.value = n[0];
      g.gain.setValueAtTime(0.0001, t0 + mulai);
      g.gain.exponentialRampToValueAtTime(v, t0 + mulai + 0.015);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + mulai + dur);
      o.connect(g); g.connect(a.destination);
      o.start(t0 + mulai); o.stop(t0 + mulai + dur + 0.03);
    });
  }

  // ---------- Efek visual ----------
  function lapisan() {
    let l = document.getElementById('gx-lapisan');
    if (!l) {
      l = document.createElement('div');
      l.id = 'gx-lapisan'; l.className = 'gx-lapisan'; l.setAttribute('aria-hidden', 'true');
      document.body.append(l);
    }
    return l;
  }
  function meledak(x, y, emoji, jumlah) {
    if (!bisaAnimasi()) return;
    const l = lapisan();
    const daftar = Array.isArray(emoji) ? emoji : [emoji];
    for (let i = 0; i < (jumlah || 10); i += 1) {
      const p = document.createElement('span');
      p.className = 'gx-partikel';
      p.textContent = pilihAcak(daftar);
      p.style.left = x + 'px'; p.style.top = y + 'px';
      l.append(p);
      const sudut = Math.random() * Math.PI * 2;
      const jarak = 60 + Math.random() * 110;
      const dx = Math.cos(sudut) * jarak;
      const dy = Math.sin(sudut) * jarak - 40;
      const a = p.animate([
        { transform: 'translate(-50%,-50%) scale(.4)', opacity: 1 },
        { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + dy + 'px)) scale(1.1)', opacity: 1, offset: 0.6 },
        { transform: 'translate(calc(-50% + ' + dx + 'px), calc(-50% + ' + (dy + 70) + 'px)) scale(.8)', opacity: 0 }
      ], { duration: 900 + Math.random() * 400, easing: 'ease-out' });
      a.onfinish = () => p.remove();
    }
  }
  function meledakDi(el, emoji, jumlah) {
    if (!el || !el.getBoundingClientRect) return;
    const r = el.getBoundingClientRect();
    meledak(r.left + r.width / 2, r.top + r.height / 2, emoji, jumlah);
  }
  // Hujan konfeti dari atas layar (untuk menang dan naik jabatan).
  function hujan(emoji, jumlah) {
    if (!bisaAnimasi()) return;
    const l = lapisan();
    const daftar = Array.isArray(emoji) ? emoji : [emoji];
    for (let i = 0; i < (jumlah || 24); i += 1) {
      const p = document.createElement('span');
      p.className = 'gx-partikel';
      p.textContent = pilihAcak(daftar);
      p.style.left = Math.random() * 100 + 'vw'; p.style.top = '-30px';
      l.append(p);
      const a = p.animate([
        { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
        { transform: 'translateY(' + (window.innerHeight + 60) + 'px) rotate(' + (Math.random() * 720 - 360) + 'deg)', opacity: 1 }
      ], { duration: 1600 + Math.random() * 1400, delay: Math.random() * 600, easing: 'ease-in', fill: 'backwards' });
      a.onfinish = () => p.remove();
    }
  }
  // Satu emoji terbang melengkung dari satu elemen ke elemen lain (misalnya koin ke penghitung koin).
  function terbang(dari, ke, teks, selesai, tunda) {
    if (!dari || !ke || !dari.getBoundingClientRect || !ke.getBoundingClientRect || !bisaAnimasi()) { if (selesai) selesai(); return; }
    const a = dari.getBoundingClientRect();
    const b = ke.getBoundingClientRect();
    const x0 = a.left + a.width / 2; const y0 = a.top + a.height / 2;
    const x1 = b.left + b.width / 2; const y1 = b.top + b.height / 2;
    const xm = (x0 + x1) / 2; const ym = Math.min(y0, y1) - 80;
    const p = document.createElement('span');
    p.className = 'gx-terbang'; p.textContent = teks;
    lapisan().append(p);
    const f = (x, y, s) => 'translate(' + x + 'px,' + y + 'px) translate(-50%,-50%) scale(' + s + ')';
    const anim = p.animate([
      { transform: f(x0, y0, 0.7), opacity: 1 },
      { transform: f(xm, ym, 1.25), opacity: 1, offset: 0.45 },
      { transform: f(x1, y1, 0.6), opacity: 0.9 }
    ], { duration: 750, delay: tunda || 0, easing: 'ease-in-out', fill: 'backwards' });
    anim.onfinish = () => { p.remove(); if (selesai) selesai(); };
  }
  function toast(teks, jenis) {
    let w = document.getElementById('gx-toast-wadah');
    if (!w) {
      w = document.createElement('div');
      w.id = 'gx-toast-wadah'; w.className = 'gx-toast-wadah'; w.setAttribute('aria-live', 'polite');
      document.body.append(w);
    }
    const t = document.createElement('div');
    t.className = 'gx-toast' + (jenis ? ' ' + jenis : '');
    t.textContent = teks;
    w.append(t);
    setTimeout(() => t.remove(), 3300);
  }

  // ---------- Komponen ----------
  function kontrol(opsi) {
    const h = ML.h;
    const suara = h('button', { type: 'button', class: 'gx-tombol-kecil' });
    const santai = h('button', { type: 'button', class: 'gx-tombol-kecil', title: 'Mode santai: tidak ada batas waktu' });
    const tombol3d = opsi && opsi.tiga ? h('button', { type: 'button', class: 'gx-tombol-kecil', title: 'Tampilan 3D memakai lebih banyak baterai dan memori. Matikan bila terasa berat.' }) : null;
    function segarkan() {
      suara.textContent = pengaturan.suara ? '\uD83D\uDD0A Suara nyala' : '\uD83D\uDD07 Suara mati';
      suara.setAttribute('aria-pressed', String(pengaturan.suara));
      santai.textContent = '\uD83D\uDC22 Mode santai: ' + (pengaturan.santai ? 'nyala' : 'mati');
      santai.setAttribute('aria-pressed', String(pengaturan.santai));
      if (tombol3d) {
        tombol3d.textContent = '\uD83E\uDDCA Tampilan 3D: ' + (pengaturan.tiga ? 'nyala' : 'mati');
        tombol3d.setAttribute('aria-pressed', String(pengaturan.tiga));
      }
    }
    suara.addEventListener('click', () => { pengaturan.suara = !pengaturan.suara; tulis('ml-suara', pengaturan.suara ? '1' : '0'); segarkan(); bunyi('klik'); });
    santai.addEventListener('click', () => { pengaturan.santai = !pengaturan.santai; tulis('ml-santai', pengaturan.santai ? '1' : '0'); segarkan(); bunyi('klik'); });
    if (tombol3d) tombol3d.addEventListener('click', () => { pengaturan.tiga = !pengaturan.tiga; tulis('ml-3d', pengaturan.tiga ? '1' : '0'); segarkan(); bunyi('klik'); });
    segarkan();
    return h('div', { class: 'gx-kontrol' }, ...[suara, santai, tombol3d].filter(Boolean));
  }

  // ---------- Pemuat skrip dan three.js (hanya dipakai game 3D) ----------
  const skripDimuat = {};
  function muatSkrip(src) {
    if (!skripDimuat[src]) {
      skripDimuat[src] = new Promise((ok, gagal) => {
        const sk = document.createElement('script');
        sk.src = src + '?v=' + (window.GameFX && window.GameFX.versi ? window.GameFX.versi : '1');
        sk.onload = ok;
        sk.onerror = () => { delete skripDimuat[src]; gagal(new Error('tidak termuat: ' + src)); };
        document.head.append(sk);
      });
    }
    return skripDimuat[src];
  }
  let threeDimuat = null;
  // Mencoba CDN dulu, lalu salinan lokal js/vendor/three.module.min.js (untuk sekolah yang memblokir CDN).
  function muatThree() {
    if (!threeDimuat) {
      const sumber = [
        'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js',
        new URL('vendor/three.module.min.js', BASE).href
      ];
      threeDimuat = (async () => {
        for (const u of sumber) {
          try { return await import(u); } catch (e) { /* coba sumber berikutnya */ }
        }
        throw new Error('three.js tidak termuat');
      })();
      threeDimuat.catch(() => { threeDimuat = null; });
    }
    return threeDimuat;
  }

  function bintang(n, total) {
    const h = ML.h;
    const maks = total || 3;
    const el = h('p', { class: 'gx-bintang', role: 'img', 'aria-label': n + ' dari ' + maks + ' bintang' });
    for (let i = 0; i < maks; i += 1) {
      const s = h('span', { class: 'gx-b' + (i < n ? ' on' : ''), 'aria-hidden': 'true' }, '\u2605');
      if (i < n) {
        const tunda = 500 + i * 450;
        s.style.animationDelay = tunda + 'ms';
        setTimeout(() => bunyi('bintang' + (i + 1)), tunda + 150);
      }
      el.append(s);
    }
    return el;
  }

  const MOOD = { senang: '\uD83D\uDE0A', girang: '\uD83E\uDD29', hebat: '\uD83D\uDE0E', mikir: '\uD83E\uDD14', cemas: '\uD83D\uDE30', sedih: '\uD83D\uDE1F' };
  function mathy(ukuran) {
    const h = ML.h;
    const mood = h('span', { class: 'gx-mood', 'aria-hidden': 'true' }, MOOD.senang);
    const ucap = h('span', { class: 'gx-ucap', 'aria-live': 'polite' });
    const gambar = h('img', { src: 'assets/mathy-game.png', alt: '', width: String(ukuran || 84) });
    gambar.addEventListener('error', () => { gambar.style.display = 'none'; });
    const el = h('div', { class: 'gx-mathy' }, h('div', { class: 'gx-mathy-badan' }, gambar, mood), ucap);
    function set(nama, teks) {
      mood.textContent = MOOD[nama] || MOOD.senang;
      ucap.textContent = teks || '';
      el.classList.remove('gx-lompat', 'gx-goyang');
      void el.offsetWidth; // mulai ulang animasi
      if (nama === 'girang' || nama === 'hebat') el.classList.add('gx-lompat');
      else if (nama === 'sedih' || nama === 'cemas') el.classList.add('gx-goyang');
    }
    return { el, set };
  }

  // Lencana disimpan lewat tabel progress yang sama dengan skor (kunci "lencana-<id>"), jadi ikut tersimpan di semua perangkat.
  function lencana(daftar, ctx) {
    const h = ML.h;
    const punya = new Set();
    ctx.terbaik.forEach((v, k) => { if (String(k).indexOf('lencana-') === 0) punya.add(String(k).slice(8)); });
    function info(id) { return daftar.find((d) => d.id === id); }
    function beri(id, diam) {
      const d = info(id);
      if (!d || punya.has(id)) return false;
      punya.add(id);
      ctx.simpanSkor('lencana-' + id, 1);
      if (!diam) { toast('\uD83C\uDFC5 Lencana baru: ' + d.nama, 'lencana'); bunyi('lencana'); }
      return true;
    }
    function galeri() {
      return h('div', { class: 'gx-galeri' }, daftar.map((d) => h('div', { class: 'gx-lencana' + (punya.has(d.id) ? ' ada' : ''), title: d.syarat },
        h('span', { 'aria-hidden': 'true' }, d.ikon), h('strong', null, d.nama),
        h('small', null, punya.has(d.id) ? d.syarat : 'Terkunci: ' + d.syarat))));
    }
    function kecil(id) {
      const d = info(id);
      return d ? h('span', { class: 'gx-lencana kecil' }, h('span', { 'aria-hidden': 'true' }, d.ikon), h('strong', null, d.nama)) : null;
    }
    return { beri, punya: (id) => punya.has(id), galeri, kecil };
  }

  pasangGaya();
  window.GameFX = {
    acak, pilihAcak, reduksi, bunyi, meledak, meledakDi, hujan, terbang, toast, kontrol, bintang, mathy, lencana, muatSkrip, muatThree,
    versi: '1',
    tiga: { aktif: () => pengaturan.tiga, matikan: () => { pengaturan.tiga = false; tulis('ml-3d', '0'); } },
    suara: { aktif: () => pengaturan.suara },
    santai: { aktif: () => pengaturan.santai }
  };
})();
