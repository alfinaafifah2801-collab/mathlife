// Kelas 7 · Bab 1 Bilangan · Subbab 1.1 Bilangan Bulat
window.KONTEN = window.KONTEN || {};
window.KONTEN['k7-b1-s1'] = {
  judul: 'Bilangan Bulat',
  badge: {
    nama: 'Penjelajah Garis Bilangan',
    syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi.'
  },

  // 1. Kenalan dengan Materi
  kenalan: [
    { t: 'p', x: 'Pernah melihat suhu freezer −18 °C? Atau tombol lift di mall yang bertuliskan B1 dan B2, yaitu lantai di bawah lantai dasar? Semua itu memakai bilangan bulat.' },
    { t: 'p', x: 'Bilangan bulat adalah bilangan tanpa bagian pecahan. Ada tiga kelompok: bilangan bulat negatif (di bawah nol), nol, dan bilangan bulat positif (di atas nol).' },
    { t: 'kotak', warna: 'mint', judul: 'Di subbab ini kamu akan belajar', x: [
      'mengenal bilangan negatif dan meletakkannya di garis bilangan,',
      'membandingkan dan mengurutkan bilangan bulat,',
      'menjumlah dan mengurangkan bilangan bulat,',
      'mengalikan dan membagi bilangan bulat.'
    ] }
  ],

  // 2. Math in Life
  nyata: {
    blok: [
      { t: 'p', x: 'Kamu parkir di basement 2 (B2) sebuah mall, lalu ingin ke toko di lantai 3. Kalau lantai dasar kita sebut 0, maka B2 sama dengan −2. Dari −2 ke 3, lift harus naik 5 lantai.' },
      { t: 'daftar', x: [
        'Suhu: kulkas −4 °C dan freezer −18 °C. Makin kecil angkanya, makin dingin.',
        'Uang: saldo −Rp20.000 berarti ada utang Rp20.000.',
        'Kedalaman: −10 m artinya 10 meter di bawah permukaan laut.'
      ] },
      { t: 'p', x: 'Pemanasan dulu. Menurutmu, mana yang lebih dingin?' }
    ],
    soal: [
      { id: 'nyata-1', tipe: 'pilgan', soal: 'Mana yang lebih dingin?', opsi: ['−4 °C', '−18 °C'], jawab: 1, xp: 5,
        bahas: '−18 lebih kecil dari −4 (letaknya lebih kiri di garis bilangan), jadi −18 °C lebih dingin.' }
    ]
  },

  // 3. Pahami Konsep
  konsep: [
    { t: 'kotak', warna: 'biru', judul: 'Bilangan bulat', x: '… , −3, −2, −1, 0, 1, 2, 3, …' },
    { t: 'h', x: 'Garis bilangan dan perbandingan' },
    { t: 'p', x: 'Di garis bilangan, makin ke kanan makin besar dan makin ke kiri makin kecil. Jadi −1 > −5 dan 2 > −7. Bilangan negatif selalu lebih kecil dari nol dan dari semua bilangan positif.' },
    { t: 'h', x: 'Lawan bilangan dan nilai mutlak' },
    { t: 'p', x: 'Lawan dari 5 adalah −5, dan lawan dari −3 adalah 3. Bilangan dijumlah dengan lawannya hasilnya 0. Nilai mutlak adalah jarak sebuah bilangan ke 0, ditulis |−4| = 4 dan |4| = 4.' },
    { t: 'h', x: 'Penjumlahan dan pengurangan' },
    { t: 'daftar', x: [
      'a + b: mulai dari a, geser ke kanan b langkah kalau b positif, geser ke kiri kalau b negatif.',
      'a − b sama dengan a + (lawan b). Jadi mengurangi bilangan negatif sama dengan menambah bilangan positifnya: 5 − (−3) = 5 + 3 = 8.'
    ] },
    { t: 'h', x: 'Perkalian dan pembagian' },
    { t: 'tabel', kepala: ['Tanda bilangan', 'Hasil'], baris: [
      ['(+) × (+) atau (+) ÷ (+)', 'positif'],
      ['(−) × (−) atau (−) ÷ (−)', 'positif'],
      ['(+) × (−) atau (+) ÷ (−)', 'negatif'],
      ['(−) × (+) atau (−) ÷ (+)', 'negatif']
    ] },
    { t: 'kotak', warna: 'krem', judul: 'Cara mengingat', x: 'Tanda sama menghasilkan positif. Tanda beda menghasilkan negatif.' }
  ],

  // 4. Contoh Bertahap
  contoh: [
    { t: 'contoh', judul: 'Contoh 1: Hitung −7 + 12',
      diketahui: 'Mulai dari −7, lalu bergerak 12 langkah ke kanan.',
      ditanya: 'Hasil −7 + 12.',
      strategi: '12 positif, jadi geser ke kanan.',
      hitung: '−7 + 12 = 5',
      periksa: 'Dari −7 ke 0 butuh 7 langkah, sisa 12 − 7 = 5 langkah lagi. Hasilnya 5. Cocok.' },
    { t: 'contoh', judul: 'Contoh 2: Hitung 5 − (−3)',
      diketahui: 'Bilangan 5 dikurangi −3.',
      ditanya: 'Hasil 5 − (−3).',
      strategi: 'Mengurangi bilangan negatif sama dengan menambah lawannya.',
      hitung: '5 − (−3) = 5 + 3 = 8',
      periksa: 'Jarak dari −3 ke 5 di garis bilangan adalah 8. Cocok.' },
    { t: 'contoh', judul: 'Contoh 3: Soal cerita suhu',
      diketahui: 'Suhu ruang pendingin −4 °C, lalu turun 6 °C.',
      ditanya: 'Suhu sekarang.',
      strategi: 'Turun berarti dikurangi: −4 − 6.',
      hitung: '−4 − 6 = −10, jadi suhunya −10 °C.',
      periksa: 'Turun berarti makin dingin, dan −10 memang lebih kecil dari −4. Cocok.' },
    { t: 'contoh', judul: 'Contoh 4: Perkalian dan pembagian',
      diketahui: '(−6) × 4 dan (−24) ÷ (−3).',
      ditanya: 'Kedua hasilnya.',
      strategi: 'Perhatikan tanda: beda tanda menghasilkan negatif, sama tanda menghasilkan positif.',
      hitung: '(−6) × 4 = −24 karena tandanya beda. (−24) ÷ (−3) = 8 karena tandanya sama.',
      periksa: 'Cek pembagian dengan perkalian: 8 × (−3) = −24. Cocok.' }
  ],

  // 5. Mini Challenge
  mini: [
    { id: 'mini-1', tipe: 'daftar', soal: 'Urutkan dari yang terkecil ke terbesar: 2, −8, 0, −3, 5. (Pisahkan dengan koma.)',
      jawab: [-8, -3, 0, 2, 5], bahas: 'Bilangan negatif lebih kecil dari nol. Di antara yang negatif, −8 lebih kecil dari −3. Urutannya: −8, −3, 0, 2, 5.' },
    { id: 'mini-2', tipe: 'isian', soal: 'Isi titik-titik: ? + (−5) = −9', jawab: -4,
      bahas: 'Dari −5 ke −9 turun 4, jadi bilangan yang dicari −4. Cek: −4 + (−5) = −9.' },
    { id: 'mini-3', tipe: 'isian', soal: 'Dua bilangan bulat berjumlah −2 dan hasil kalinya −15. Berapa bilangan yang lebih besar?', jawab: 3,
      bahas: 'Coba pasangan 3 dan −5: 3 + (−5) = −2 dan 3 × (−5) = −15. Yang lebih besar adalah 3.' },
    { id: 'mini-4', tipe: 'bs', soal: 'Hasil dari −(−4) adalah −4.', jawab: false,
      bahas: 'Lawan dari −4 adalah 4, jadi −(−4) = 4. Pernyataan itu salah.' },
    { id: 'mini-5', tipe: 'pilgan', soal: 'Suhu −3 °C naik 7 °C, lalu turun 10 °C. Berapa suhu akhirnya?', opsi: ['4 °C', '−6 °C', '0 °C', '−10 °C'], jawab: 1,
      bahas: '−3 + 7 = 4, lalu 4 − 10 = −6. Suhu akhirnya −6 °C.' }
  ],

  // 6. MathLife Game (Math Bank)
  game: {
    cerita: 'Kamu kasir di Math Bank. Catat setoran (+) dan penarikan (−), lalu hitung saldo akhir nasabah. Saldo negatif artinya nasabah berutang.',
    babak: [
      { id: 'game-1', judul: 'Nasabah pertama', awal: 50000, jawab: -20000,
        trx: [{ ket: 'Setor tunai', jml: 30000 }, { ket: 'Tarik tunai', jml: -100000 }],
        bahas: '50.000 + 30.000 = 80.000, lalu 80.000 − 100.000 = −20.000. Nasabah berutang Rp20.000.' },
      { id: 'game-2', judul: 'Nasabah yang berutang', awal: -15000, jawab: 15000,
        trx: [{ ket: 'Setor tunai', jml: 40000 }, { ket: 'Tarik tunai', jml: -10000 }],
        bahas: '−15.000 + 40.000 = 25.000, lalu 25.000 − 10.000 = 15.000.' },
      { id: 'game-3', judul: 'Rekening baru', awal: 0, jawab: -18000,
        trx: [{ ket: 'Tarik tunai', jml: -25000 }, { ket: 'Tarik tunai', jml: -5000 }, { ket: 'Setor tunai', jml: 12000 }],
        bahas: '0 − 25.000 − 5.000 = −30.000, lalu −30.000 + 12.000 = −18.000.' },
      { id: 'game-4', judul: 'Babak terakhir', awal: -8000, jawab: -17000,
        trx: [{ ket: 'Setor tunai', jml: 20000 }, { ket: 'Tarik tunai', jml: -35000 }, { ket: 'Setor tunai', jml: 6000 }],
        bahas: '−8.000 + 20.000 = 12.000. Lalu 12.000 − 35.000 = −23.000. Terakhir −23.000 + 6.000 = −17.000.' }
    ]
  },

  // 7. MathLife Simulator (Lift Mall)
  simulator: {
    cerita: 'Kamu operator lift di sebuah mall. Pilih jumlah lantai, lalu tekan Naik atau Turun. Perhatikan rumus yang muncul setiap kali lift bergerak.',
    min: -3,
    max: 5,
    misi: [
      { id: 'sim-1', dari: -2, ke: 3 },
      { id: 'sim-2', dari: 1, ke: -3 },
      { id: 'sim-3', dari: -1, ke: -3 },
      { id: 'sim-4', dari: 0, ke: 4 }
    ]
  },

  // 8. Latihan Berjenjang
  latihan: [
    { nama: 'Level 1: Pemanasan', pengantar: 'Soal dasar untuk membiasakan tanda positif dan negatif.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: '−9 + 4 = …', jawab: -5, xp: 5, bahas: 'Dari −9 geser 4 langkah ke kanan, sampai di −5.' },
      { id: 'l1-2', tipe: 'isian', soal: '6 − 11 = …', jawab: -5, xp: 5, bahas: '6 − 11 = −5, karena 11 lebih besar dari 6 dan selisihnya 5.' },
      { id: 'l1-3', tipe: 'pilgan', soal: 'Bilangan terbesar di antara −12, −3, −20, −7 adalah …', opsi: ['−12', '−3', '−20', '−7'], jawab: 1, xp: 5,
        bahas: 'Di antara bilangan negatif, yang paling dekat dengan nol paling besar, yaitu −3.' },
      { id: 'l1-4', tipe: 'isian', soal: 'Lawan dari −15 adalah …', jawab: 15, xp: 5, bahas: 'Lawan bilangan hanya mengganti tandanya: lawan −15 adalah 15.' },
      { id: 'l1-5', tipe: 'isian', soal: '(−3) × 7 = …', jawab: -21, xp: 5, bahas: 'Tandanya beda, jadi hasilnya negatif: 3 × 7 = 21, hasilnya −21.' }
    ] },
    { nama: 'Level 2: Tantangan', pengantar: 'Mulai ada dua operasi dan soal pengurutan.', soal: [
      { id: 'l2-1', tipe: 'isian', soal: '−8 − (−12) = …', jawab: 4, xp: 10, bahas: '−8 − (−12) = −8 + 12 = 4.' },
      { id: 'l2-2', tipe: 'isian', soal: '(−5) × (−6) ÷ 3 = …', jawab: 10, xp: 10, bahas: '(−5) × (−6) = 30 karena tandanya sama. Lalu 30 ÷ 3 = 10.' },
      { id: 'l2-3', tipe: 'daftar', soal: 'Urutkan dari yang terbesar ke terkecil: −1, −10, 3, −4. (Pisahkan dengan koma.)', jawab: [3, -1, -4, -10], xp: 10,
        bahas: '3 paling besar. Di antara bilangan negatif, −1 lebih besar dari −4, dan −4 lebih besar dari −10.' },
      { id: 'l2-4', tipe: 'pilgan', soal: 'Hasil dari 12 + (−5) × 2 adalah …', opsi: ['14', '2', '−14', '−2'], jawab: 1, xp: 10,
        bahas: 'Kerjakan perkalian dulu: (−5) × 2 = −10. Lalu 12 + (−10) = 2.' }
    ] },
    { nama: 'Level 3: Problem Solving', pengantar: 'Soal cerita. Ubah ceritanya menjadi operasi bilangan bulat.', soal: [
      { id: 'l3-1', tipe: 'isian', soal: 'Seorang penyelam berada di kedalaman −12 m, naik 5 m, lalu turun 9 m. Di kedalaman berapa (dalam meter) ia sekarang?', jawab: -16, xp: 15, satuan: 'm',
        bahas: '−12 + 5 = −7, lalu −7 − 9 = −16. Ia berada di −16 m.' },
      { id: 'l3-2', tipe: 'isian', soal: 'Suhu pagi hari −2 °C. Siang hari suhu naik 11 °C. Malam hari suhu turun 8 °C dari suhu siang. Berapa suhu malam hari?', jawab: 1, xp: 15, satuan: '°C',
        bahas: '−2 + 11 = 9 (suhu siang), lalu 9 − 8 = 1. Suhu malam hari 1 °C.' },
      { id: 'l3-3', tipe: 'isian', soal: 'Di sebuah kuis, jawaban benar bernilai +4, salah −2, dan tidak dijawab 0. Dina menjawab benar 7 soal, salah 5 soal, dan tidak menjawab 3 soal. Berapa skor Dina?', jawab: 18, xp: 15,
        bahas: 'Benar: 7 × 4 = 28. Salah: 5 × (−2) = −10. Kosong: 0. Skor: 28 − 10 = 18.' }
    ] },
    { nama: 'Level 4: MathLife Challenge', pengantar: 'Soal paling menantang. Pelan-pelan saja.', soal: [
      { id: 'l4-1', tipe: 'isian', soal: 'Bilangan bulat x memenuhi x + (−7) = (−3) × (−4). Berapa nilai x?', jawab: 19, xp: 25,
        bahas: '(−3) × (−4) = 12, jadi x − 7 = 12. Maka x = 12 + 7 = 19.' },
      { id: 'l4-2', tipe: 'isian', soal: 'Jumlah tiga bilangan bulat berurutan adalah −24. Berapa bilangan yang paling kecil?', jawab: -9, xp: 25,
        bahas: 'Tiga bilangan berurutan dengan tengah x berjumlah 3x. Jadi 3x = −24 dan x = −8. Bilangannya −9, −8, −7, jadi yang terkecil −9.' }
    ] }
  ],

  // 9. Evaluasi
  evaluasi: [
    { judul: 'Pilihan ganda', soal: [
      { id: 'ev-pg-1', tipe: 'pilgan', soal: 'Pernyataan yang benar adalah …', opsi: ['−9 > −2', '−5 < −1', '0 < −3', '−7 > 0'], jawab: 1,
        bahas: '−5 berada di kiri −1 pada garis bilangan, jadi −5 < −1.' },
      { id: 'ev-pg-2', tipe: 'pilgan', soal: 'Hasil dari −15 + 8 − (−4) adalah …', opsi: ['−11', '−3', '3', '11'], jawab: 1,
        bahas: '−15 + 8 = −7. Lalu −7 − (−4) = −7 + 4 = −3.' },
      { id: 'ev-pg-3', tipe: 'pilgan', soal: '(−4) × (−5) × (−2) = …', opsi: ['40', '−40', '20', '−20'], jawab: 1,
        bahas: '(−4) × (−5) = 20, lalu 20 × (−2) = −40.' },
      { id: 'ev-pg-4', tipe: 'pilgan', soal: 'Suhu −6 °C naik hingga 3 °C. Kenaikan suhunya adalah …', opsi: ['3 °C', '9 °C', '−3 °C', '−9 °C'], jawab: 1,
        bahas: 'Kenaikan = suhu akhir − suhu awal = 3 − (−6) = 9 °C.' }
    ] },
    { judul: 'Benar atau salah', soal: [
      { id: 'ev-bs-1', tipe: 'bs', soal: 'Lawan dari −8 adalah 8.', jawab: true, bahas: 'Lawan bilangan hanya mengganti tandanya.' },
      { id: 'ev-bs-2', tipe: 'bs', soal: 'Hasil dari (−9) ÷ 3 adalah 3.', jawab: false, bahas: 'Tandanya beda, jadi hasilnya negatif: (−9) ÷ 3 = −3.' },
      { id: 'ev-bs-3', tipe: 'bs', soal: 'Jumlah dua bilangan negatif selalu berupa bilangan negatif.', jawab: true, bahas: 'Dua bilangan negatif sama-sama menggeser ke kiri, jadi hasilnya makin negatif.' }
    ] },
    { judul: 'Isian singkat', soal: [
      { id: 'ev-is-1', tipe: 'isian', soal: '|−17| + (−9) = …', jawab: 8, bahas: '|−17| = 17, lalu 17 + (−9) = 8.' },
      { id: 'ev-is-2', tipe: 'isian', soal: '(−48) ÷ 6 + (−2) × (−5) = …', jawab: 2, bahas: '(−48) ÷ 6 = −8 dan (−2) × (−5) = 10. Jadi −8 + 10 = 2.' }
    ] },
    { judul: 'Uraian', soal: [
      { id: 'ev-ur-1', tipe: 'uraian', soal: 'Jelaskan dengan kata-katamu mengapa 5 − (−3) hasilnya 8, bukan 2.',
        kunci: 'Mengurangi bilangan negatif sama dengan menambah lawannya, jadi 5 − (−3) = 5 + 3 = 8. Di garis bilangan, jarak dari −3 ke 5 adalah 8 langkah.' }
    ] },
    { judul: 'Masalah kontekstual', soal: [
      { id: 'ev-ko-1', tipe: 'isian', satuan: 'Rp', soal: 'Saldo dompet digital Rafi Rp40.000. Ia membeli buku seharga Rp65.000 (saldo boleh minus), lalu menerima uang saku Rp30.000. Berapa saldo akhirnya? (Tulis angkanya saja.)',
        jawab: 5000, bahas: '40.000 − 65.000 = −25.000, lalu −25.000 + 30.000 = 5.000. Saldo akhirnya Rp5.000.' }
    ] }
  ]
};
