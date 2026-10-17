// Kelas 9 · Bab 3 Geometri Lanjutan · Subbab 3.3 Bangun Ruang Sisi Lengkung (versi ringkas)
window.KONTEN = window.KONTEN || {};
window.KONTEN['k9-b3-s3'] = {
  judul: 'Bangun Ruang Sisi Lengkung',
  badge: { nama: 'Penakluk Bangun Lengkung', syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan.' },

  konsep: [
    { t: 'h', x: 'Tiga bangun ruang sisi lengkung' },
    { t: 'p', x: 'Tabung (seperti kaleng), kerucut (seperti topi ulang tahun), dan bola (seperti bola basket) mempunyai sisi yang melengkung. Pada soal, gunakan π = 22/7 jika jari-jari kelipatan 7, dan π = 3,14 untuk jari-jari lainnya.' },
    { t: 'tabel', kepala: ['Bangun', 'Volume', 'Luas permukaan'], baris: [
      ['Tabung (jari-jari r, tinggi t)', 'V = π × r² × t', 'L = 2 × π × r × (r + t)'],
      ['Kerucut (jari-jari r, tinggi t, garis pelukis s)', 'V = ⅓ × π × r² × t', 'L = π × r × (r + s)'],
      ['Bola (jari-jari r)', 'V = ⁴⁄₃ × π × r³', 'L = 4 × π × r²']
    ] },
    { t: 'kotak', warna: 'biru', judul: 'Garis pelukis kerucut', x: 's = √(r² + t²). Contoh r = 3 dan t = 4 menghasilkan s = 5.' },
    { t: 'kotak', warna: 'krem', judul: 'Cara mengingat', x: 'Volume kerucut sepertiga volume tabung yang jari-jari dan tingginya sama. Satuan volume adalah pangkat tiga (cm³), satuan luas pangkat dua (cm²).' }
  ],

  contoh: [
    { t: 'langkah', judul: 'Contoh 1: Tabung',
      soal: 'Sebuah tabung berjari-jari 7 cm dan tinggi 10 cm. Hitung volume dan luas permukaannya (π = 22/7).',
      steps: [
        { lab: 'Langkah 1 · Tulis yang diketahui', body: 'r = 7 cm, t = 10 cm, π = 22/7.' },
        { lab: 'Langkah 2 · Volume', body: 'V = π × r² × t = 22/7 × 7 × 7 × 10 = 22 × 7 × 10 = 1.540 cm³.' },
        { lab: 'Langkah 3 · Luas permukaan', body: 'L = 2 × π × r × (r + t) = 2 × 22/7 × 7 × 17 = 44 × 17 = 748 cm².' }
      ] },
    { t: 'langkah', judul: 'Contoh 2: Kerucut',
      soal: 'Sebuah kerucut berjari-jari 3 cm dan tinggi 4 cm. Hitung volume dan luas permukaannya (π = 3,14).',
      steps: [
        { lab: 'Langkah 1 · Garis pelukis', body: 's = √(3² + 4²) = √25 = 5 cm.' },
        { lab: 'Langkah 2 · Volume', body: 'V = ⅓ × 3,14 × 3 × 3 × 4 = 3,14 × 12 = 37,68 cm³.' },
        { lab: 'Langkah 3 · Luas permukaan', body: 'L = π × r × (r + s) = 3,14 × 3 × (3 + 5) = 3,14 × 24 = 75,36 cm².' }
      ] },
    { t: 'langkah', judul: 'Contoh 3: Bola',
      soal: 'Sebuah bola berjari-jari 21 cm. Hitung volume dan luas permukaannya (π = 22/7).',
      steps: [
        { lab: 'Langkah 1 · Volume', body: 'V = ⁴⁄₃ × 22/7 × 21 × 21 × 21 = 4 × 22 × 441 = 38.808 cm³.' },
        { lab: 'Langkah 2 · Luas permukaan', body: 'L = 4 × 22/7 × 21 × 21 = 4 × 22 × 63 = 5.544 cm².' }
      ] }
  ],

  mini: [
    { id: 'mini-1', tipe: 'pilgan', soal: 'Rumus volume kerucut adalah …', opsi: ['⅓ × π × r² × t', 'π × r² × t', '⁴⁄₃ × π × r³', '2 × π × r × t'], jawab: 0, bahas: 'Volume kerucut sepertiga dari π × r² × t.' },
    { id: 'mini-2', tipe: 'bs', soal: 'Volume kerucut sama dengan volume tabung yang jari-jari dan tingginya sama.', jawab: false, bahas: 'Volume kerucut hanya sepertiga volume tabung tersebut.' },
    { id: 'mini-3', tipe: 'isian', soal: 'Tabung berjari-jari 7 cm dan tinggi 5 cm. Berapa cm³ volumenya? (π = 22/7)', jawab: 770, bahas: '22/7 × 7 × 7 × 5 = 22 × 7 × 5 = 770 cm³.' }
  ],

  game: {
    jenis: 'misi',
    cerita: 'Kamu bekerja di pabrik kaleng dan perajin tumpeng. Hitung ukuran yang dibutuhkan (π = 22/7).',
    babak: [
      { id: 'game-1', judul: 'Kaleng susu', narasi: ['Kaleng berbentuk tabung dengan jari-jari 7 cm dan tinggi 12 cm.'],
        tipe: 'isian', satuan: 'cm³', soal: 'Berapa cm³ volume kaleng?', jawab: 1848, bahas: 'V = 22/7 × 7 × 7 × 12 = 22 × 7 × 12 = 1.848 cm³.' },
      { id: 'game-2', judul: 'Cetakan tumpeng', narasi: ['Cetakan tumpeng berbentuk kerucut dengan jari-jari 7 cm, tinggi 24 cm, dan garis pelukis 25 cm.'],
        tipe: 'isian', satuan: 'cm²', soal: 'Berapa cm² luas selimut cetakan? (Luas selimut kerucut = π × r × s.)', jawab: 550, bahas: '22/7 × 7 × 25 = 22 × 25 = 550 cm².' },
      { id: 'game-3', judul: 'Bola pelampung', narasi: ['Pelampung berbentuk bola dengan jari-jari 7 cm.'],
        tipe: 'isian', satuan: 'cm²', soal: 'Berapa cm² luas permukaan pelampung?', jawab: 616, bahas: 'L = 4 × 22/7 × 7 × 7 = 4 × 22 × 7 = 616 cm².' }
    ]
  },

  latihan: [
    { nama: 'Latihan', pengantar: 'Gunakan π = 22/7 kecuali disebutkan lain. Tulis angkanya saja.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: 'Tabung berjari-jari 14 cm dan tinggi 5 cm. Berapa cm³ volumenya?', jawab: 3080, xp: 5, bahas: '22/7 × 14 × 14 × 5 = 22 × 28 × 5 = 3.080 cm³.' },
      { id: 'l1-2', tipe: 'isian', soal: 'Bola berjari-jari 14 cm. Berapa cm² luas permukaannya?', jawab: 2464, xp: 5, bahas: '4 × 22/7 × 14 × 14 = 4 × 22 × 28 = 2.464 cm².' },
      { id: 'l1-3', tipe: 'pilgan', soal: 'Rumus volume bola adalah …', opsi: ['⁴⁄₃ × π × r³', '4 × π × r²', 'π × r² × t', '⅓ × π × r² × t'], jawab: 0, xp: 10, bahas: 'Volume bola = ⁴⁄₃ × π × r³. Rumus 4πr² adalah luas permukaannya.' },
      { id: 'l1-4', tipe: 'isian', soal: 'Kerucut berjari-jari 7 cm dan tinggi 24 cm. Berapa cm panjang garis pelukisnya?', jawab: 25, xp: 10, bahas: 's = √(7² + 24²) = √(49 + 576) = √625 = 25 cm.' },
      { id: 'l1-5', tipe: 'isian', soal: 'Kerucut berjari-jari 3 cm dan tinggi 4 cm. Berapa cm³ volumenya? (π = 3,14)', jawab: 37.68, xp: 15, bahas: '⅓ × 3,14 × 9 × 4 = 3,14 × 12 = 37,68 cm³.' },
      { id: 'l1-6', tipe: 'isian', soal: 'Sebuah tangki berbentuk tabung berjari-jari 7 dm dan tinggi 10 dm diisi penuh air. Berapa liter air di dalamnya? (1 dm³ = 1 liter)', jawab: 1540, xp: 15,
        bahas: 'V = 22/7 × 7 × 7 × 10 = 1.540 dm³ = 1.540 liter.' }
    ] }
  ]
};
