// Fungsi bantu tampilan. Semua teks dimasukkan lewat textContent, jadi aman dari injeksi HTML.
(function () {
  const $ = (sel, root = document) => root.querySelector(sel);

  // h('div', { class: 'x', onclick: fn }, 'teks', elemenLain)
  function h(tag, attrs, ...anak) {
    const node = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (v === null || v === undefined || v === false) continue;
        if (k === 'class') node.className = v;
        else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2), v);
        else node.setAttribute(k, v === true ? '' : v);
      }
    }
    for (const c of anak.flat()) {
      if (c === null || c === undefined || c === false) continue;
      node.append(c.nodeType ? c : document.createTextNode(String(c)));
    }
    return node;
  }

  // Menampilkan pesan di sebuah wadah. jenis: 'info' | 'sukses' | 'galat'. Teks kosong = hapus pesan.
  function tampilPesan(wadah, teks, jenis = 'info') {
    wadah.replaceChildren();
    if (!teks) return;
    wadah.append(h('div', { class: 'pesan pesan-' + jenis, role: jenis === 'galat' ? 'alert' : 'status' }, teks));
  }

  function tanggal(iso) {
    return new Date(iso).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  const PERAN = {
    siswa: 'Siswa',
    guru: 'Guru',
    admin_sekolah: 'Admin Sekolah',
    admin_platform: 'Admin Platform'
  };

  window.ML = { $, h, tampilPesan, tanggal, PERAN };
})();
