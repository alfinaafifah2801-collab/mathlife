// Daftar kurikulum MathLife (15 bab). Untuk menambah subbab yang sudah jadi:
// 1) ubah tersedia: true pada subbab itu, 2) tambahkan file js/konten/<id-subbab>.js.
// gratis: true = subbab bisa dibuka siswa yang belum punya paket (pratinjau).
window.KURIKULUM = [
  {
    kelas: 7,
    bab: [
      {
        id: 'k7-b1', no: 1, judul: 'Bilangan', cakupan: 'Bilangan bulat, pecahan, desimal, persen', game: 'Math Bank',
        subbab: [
          { id: 'k7-b1-s1', no: '1.1', judul: 'Bilangan Bulat', tersedia: true, gratis: true },
          { id: 'k7-b1-s2', no: '1.2', judul: 'Pecahan', tersedia: true },
          { id: 'k7-b1-s3', no: '1.3', judul: 'Desimal dan Pembulatan', tersedia: true },
          { id: 'k7-b1-s4', no: '1.4', judul: 'Persen', tersedia: true }
        ]
      },
      { id: 'k7-b2', no: 2, judul: 'Perbandingan & Aritmetika Sosial', cakupan: 'Rasio, skala, diskon, untung-rugi, pajak', game: 'Mall Simulator' },
      { id: 'k7-b3', no: 3, judul: 'Aljabar', cakupan: 'Bentuk aljabar, persamaan dan pertidaksamaan', game: 'Equation Puzzle' },
      { id: 'k7-b4', no: 4, judul: 'Geometri', cakupan: 'Garis, sudut, bangun datar, luas dan keliling', game: 'Build It!' },
      { id: 'k7-b5', no: 5, judul: 'Data & Peluang', cakupan: 'Tabel, diagram, mean, median, modus, peluang dasar', game: 'Data Detective' }
    ]
  },
  {
    kelas: 8,
    bab: [
      { id: 'k8-b1', no: 1, judul: 'Bilangan & Pola', cakupan: 'Perpangkatan, bentuk akar, pola bilangan' },
      {
        id: 'k8-b2', no: 2, judul: 'Relasi, Fungsi & Persamaan', cakupan: 'Fungsi, grafik, persamaan garis lurus, SPLDV', game: 'Mall Simulator',
        subbab: [
          { id: 'k8-b2-s1', no: '2.1', judul: 'Relasi dan Fungsi', tersedia: false },
          { id: 'k8-b2-s2', no: '2.2', judul: 'Grafik Fungsi', tersedia: false },
          { id: 'k8-b2-s3', no: '2.3', judul: 'Persamaan Garis Lurus', tersedia: false },
          { id: 'k8-b2-s4', no: '2.4', judul: 'Mengenal SPLDV', tersedia: true },
          { id: 'k8-b2-s5', no: '2.5', judul: 'SPLDV dengan Metode Grafik', tersedia: true },
          { id: 'k8-b2-s6', no: '2.6', judul: 'SPLDV dengan Metode Substitusi', tersedia: true },
          { id: 'k8-b2-s7', no: '2.7', judul: 'SPLDV dengan Metode Eliminasi', tersedia: true },
          { id: 'k8-b2-s8', no: '2.8', judul: 'SPLDV dengan Metode Campuran', tersedia: true },
          { id: 'k8-b2-s9', no: '2.9', judul: 'SPLDV dalam Kehidupan', tersedia: true }
        ]
      },
      { id: 'k8-b3', no: 3, judul: 'Geometri', cakupan: 'Pythagoras, lingkaran, bangun ruang', game: 'Build It!' },
      { id: 'k8-b4', no: 4, judul: 'Transformasi', cakupan: 'Translasi, refleksi, rotasi, dilatasi', game: 'Math Trip' },
      { id: 'k8-b5', no: 5, judul: 'Statistika & Peluang', cakupan: 'Analisis data dan peluang', game: 'Data Detective' }
    ]
  },
  {
    kelas: 9,
    bab: [
      { id: 'k9-b1', no: 1, judul: 'Aljabar Lanjutan', cakupan: 'Persamaan kuadrat dan fungsi kuadrat', game: 'Equation Puzzle' },
      { id: 'k9-b2', no: 2, judul: 'Barisan & Pola', cakupan: 'Barisan aritmetika dan geometri' },
      { id: 'k9-b3', no: 3, judul: 'Geometri Lanjutan', cakupan: 'Kesebangunan, kekongruenan, bangun ruang sisi lengkung', game: 'Build It!' },
      { id: 'k9-b4', no: 4, judul: 'Statistika & Peluang', cakupan: 'Analisis data dan peluang', game: 'Data Detective' },
      { id: 'k9-b5', no: 5, judul: 'Pemecahan Masalah', cakupan: 'Soal kontekstual dan latihan campuran' }
    ]
  }
];

// Sebuah bab dianggap tersedia jika punya minimal satu subbab yang sudah jadi.
window.babTersedia = (b) => Boolean(b.subbab && b.subbab.some((s) => s.tersedia));

window.cariBab = function (idBab) {
  for (const k of window.KURIKULUM) for (const b of k.bab) if (b.id === idBab) return { kelas: k.kelas, bab: b };
  return null;
};

window.cariSubbab = function (idSub) {
  for (const k of window.KURIKULUM) {
    for (const b of k.bab) {
      for (const s of b.subbab || []) if (s.id === idSub) return { kelas: k.kelas, bab: b, sub: s };
    }
  }
  return null;
};

// Daftar game besar (berdiri sendiri). tersedia: true berarti file js/games/<id>.js sudah ada.
window.DAFTAR_GAME = [
  { id: 'math-bank', nama: 'Math Bank', bab: 'Kelas 7 \u00B7 Bab 1', topik: 'Bilangan bulat, persen, pecahan, desimal, dan bunga tunggal', tersedia: true },
  { id: 'mall-simulator', nama: 'Mall Simulator', bab: 'Kelas 7 \u00B7 Bab 2 dan Kelas 8 \u00B7 Bab 2', topik: 'Diskon, pajak, untung-rugi, dan SPLDV', tersedia: true },
  { id: 'build-it', nama: 'Build It!', bab: 'Kelas 7 \u00B7 Bab 4, Kelas 8 \u00B7 Bab 3, Kelas 9 \u00B7 Bab 3', topik: 'Luas, keliling, dan volume', tersedia: false },
  { id: 'math-trip', nama: 'Math Trip', bab: 'Kelas 8 \u00B7 Bab 4', topik: 'Koordinat, garis lurus, dan transformasi', tersedia: false },
  { id: 'data-detective', nama: 'Data Detective', bab: 'Kelas 7 \u00B7 Bab 5 dan Kelas 9 \u00B7 Bab 4', topik: 'Statistika dan peluang', tersedia: false },
  { id: 'equation-puzzle', nama: 'Equation Puzzle', bab: 'Kelas 7 \u00B7 Bab 3 dan Kelas 9 \u00B7 Bab 1', topik: 'Aljabar dan persamaan', tersedia: false }
];
