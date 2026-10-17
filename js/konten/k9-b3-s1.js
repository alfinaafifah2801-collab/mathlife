// Kelas 9 · Bab 3 Geometri Lanjutan · Subbab 3.1 Kesebangunan
window.KONTEN = window.KONTEN || {};
window.KONTEN['k9-b3-s1'] = {
  judul: 'Kesebangunan',
  badge: { nama: 'Pengukur Skala', syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi.' },

  kenalan: [
    { t: 'p', x: 'Foto di ponselmu bisa diperbesar atau diperkecil tanpa mengubah bentuknya. Peta, denah, dan maket juga begitu: bentuknya sama, hanya ukurannya berbeda. Bangun-bangun seperti itu disebut sebangun.' },
    { t: 'p', x: 'Dua bangun datar sebangun jika sudut-sudut yang bersesuaian sama besar dan sisi-sisi yang bersesuaian mempunyai perbandingan yang sama.' },
    { t: 'kotak', warna: 'mint', judul: 'Di subbab ini kamu akan belajar', x: [
      'mengenali dua bangun yang sebangun,',
      'menghitung panjang sisi memakai perbandingan (faktor skala),',
      'menentukan syarat dua segitiga sebangun,',
      'memakai kesebangunan untuk mengukur tinggi benda dan membaca skala,',
      'menghitung perbandingan luas dua bangun sebangun.'
    ] }
  ],

  nyata: {
    blok: [
      { t: 'p', x: 'Sore hari, bayangan tiang bendera sekolahmu 6 m. Di sebelahnya kamu menegakkan tongkat setinggi 1,5 m, dan bayangan tongkat itu 1 m. Sinar matahari membentuk dua segitiga yang sebangun, jadi tinggi tiang bendera bisa dihitung tanpa memanjatnya.' }
    ],
    soal: [
      { id: 'nyata-1', tipe: 'pilgan', soal: 'Berapa tinggi tiang bendera?', opsi: ['9 m', '7,5 m', '4 m', '10 m'], jawab: 0, xp: 5,
        bahas: 'Perbandingan tinggi dan bayangan sama: t/6 = 1,5/1. Jadi t = 1,5 × 6 = 9 m.' }
    ]
  },

  konsep: [
    { t: 'kotak', warna: 'biru', judul: 'Sebangun', x: 'Dua bangun sebangun jika (1) sudut-sudut yang bersesuaian sama besar, dan (2) sisi-sisi yang bersesuaian berbanding sama.' },
    { t: 'p', x: 'Perbandingan sisi yang bersesuaian disebut faktor skala, ditulis k. Contoh: k = panjang sisi bangun kedua ÷ panjang sisi bangun pertama.' },
    { t: 'h', x: 'Persegi panjang' },
    { t: 'p', x: 'Persegi panjang 4 cm × 3 cm sebangun dengan 12 cm × 9 cm, karena 12/4 = 9/3 = 3 dan semua sudutnya siku-siku. Persegi panjang 4 cm × 3 cm tidak sebangun dengan 8 cm × 4 cm, karena 8/4 = 2 tetapi 4/3 tidak sama dengan 2.' },
    { t: 'h', x: 'Segitiga sebangun' },
    { t: 'p', x: 'Dua segitiga sebangun jika salah satu syarat berikut terpenuhi:' },
    { t: 'daftar', x: [
      'Dua pasang sudut bersesuaian sama besar (sudut ketiga otomatis sama).',
      'Tiga pasang sisi bersesuaian berbanding sama.',
      'Dua pasang sisi berbanding sama dan sudut yang diapit kedua sisi itu sama besar.'
    ] },
    { t: 'h', x: 'Mencari sisi yang belum diketahui' },
    { t: 'p', x: 'Tulis perbandingan sisi-sisi yang bersesuaian, lalu kalikan silang. Jika a/b = c/d, maka a × d = b × c.' },
    { t: 'h', x: 'Perbandingan luas' },
    { t: 'p', x: 'Jika perbandingan sisi k, maka perbandingan luasnya k². Misalnya sisi diperbesar 3 kali, luasnya menjadi 9 kali.' },
    { t: 'kotak', warna: 'krem', judul: 'Cara mengingat', x: 'Panjang dikali k, luas dikali k².' }
  ],

  contoh: [
    { t: 'contoh', judul: 'Contoh 1: Persegi panjang sebangun',
      diketahui: 'Persegi panjang ABCD berukuran 8 cm × 5 cm sebangun dengan PQRS. Sisi PQ = 12 cm bersesuaian dengan sisi AB = 8 cm.',
      ditanya: 'Lebar PQRS.',
      strategi: 'Cari faktor skala dari sisi yang bersesuaian, lalu kalikan ke lebar.',
      hitung: 'k = 12/8 = 1,5. Lebar PQRS = 5 × 1,5 = 7,5 cm.',
      periksa: '12/8 = 7,5/5 = 1,5. Cocok.' },
    { t: 'contoh', judul: 'Contoh 2: Apakah dua segitiga sebangun?',
      diketahui: 'Segitiga ABC dengan sisi 6, 8, 10 dan segitiga PQR dengan sisi 9, 12, 15.',
      ditanya: 'Sebangun atau tidak.',
      strategi: 'Urutkan sisi dari yang terpendek, lalu bandingkan ketiga perbandingannya.',
      hitung: '9/6 = 1,5; 12/8 = 1,5; 15/10 = 1,5. Ketiganya sama, jadi kedua segitiga sebangun.',
      periksa: 'Tiga pasang sisi berbanding sama, memenuhi syarat sisi-sisi-sisi. Cocok.' },
    { t: 'contoh', judul: 'Contoh 3: Tinggi pohon dari bayangan',
      diketahui: 'Anto tingginya 160 cm dengan bayangan 120 cm. Pada saat yang sama, bayangan sebuah pohon 6 m.',
      ditanya: 'Tinggi pohon.',
      strategi: 'Samakan satuan dulu: 6 m = 600 cm. Lalu tinggi/bayangan sama untuk keduanya.',
      hitung: '160/120 = t/600. Maka t = 160 × 600 ÷ 120 = 800 cm = 8 m.',
      periksa: 'Perbandingan 160/120 = 4/3 dan 800/600 = 4/3. Cocok.' },
    { t: 'contoh', judul: 'Contoh 4: Perbandingan luas',
      diketahui: 'Poster 20 cm × 30 cm diperbesar sebangun dengan faktor skala 2,5.',
      ditanya: 'Luas poster yang baru.',
      strategi: 'Cari ukuran baru, atau pakai luas awal × k².',
      hitung: 'Ukuran baru 50 cm × 75 cm, luas 3.750 cm². Dengan rumus: 600 × 2,5² = 600 × 6,25 = 3.750 cm².',
      periksa: 'Kedua cara menghasilkan 3.750 cm². Cocok.' }
  ],

  mini: [
    { id: 'mini-1', tipe: 'isian', soal: 'Segitiga ABC sebangun dengan PQR. AB = 4 cm bersesuaian dengan PQ = 10 cm. Jika BC = 6 cm, berapa cm panjang QR?', jawab: 15,
      bahas: 'k = 10/4 = 2,5. QR = 6 × 2,5 = 15 cm.' },
    { id: 'mini-2', tipe: 'bs', soal: 'Dua persegi panjang selalu sebangun karena semua sudutnya siku-siku.', jawab: false,
      bahas: 'Sudutnya memang sama, tetapi perbandingan sisinya juga harus sama. Contoh 4 × 3 dan 8 × 4 tidak sebangun.' },
    { id: 'mini-3', tipe: 'pilgan', soal: 'Persegi panjang 6 cm × 4 cm sebangun dengan persegi panjang …', opsi: ['9 cm × 6 cm', '9 cm × 5 cm', '8 cm × 5 cm', '12 cm × 10 cm'], jawab: 0,
      bahas: '9/6 = 1,5 dan 6/4 = 1,5, jadi sebangun. Pilihan lain perbandingan sisinya berbeda.' },
    { id: 'mini-4', tipe: 'isian', soal: 'Foto berukuran lebar 10 cm dan tinggi 15 cm dicetak ulang secara sebangun dengan lebar 40 cm. Berapa cm tingginya?', jawab: 60,
      bahas: 'k = 40/10 = 4. Tinggi baru = 15 × 4 = 60 cm.' },
    { id: 'mini-5', tipe: 'isian', soal: 'Segitiga pertama punya sudut 50° dan 60°. Segitiga kedua punya sudut 50° dan 70°. Berapa derajat sudut ketiga segitiga pertama?', jawab: 70,
      bahas: '180° − 50° − 60° = 70°. Segitiga kedua sudutnya 50°, 70°, 60°. Dua sudut sama, jadi keduanya sebangun.' }
  ],

  game: {
    jenis: 'misi',
    cerita: 'Kamu tukang maket di studio arsitek. Hitung ukuran sebenarnya dan ukuran pada denah. Jawaban boleh ditulis dengan koma desimal.',
    babak: [
      { id: 'game-1', judul: 'Maket gedung', narasi: ['Maket sebuah gedung berskala 1 : 200. Tinggi maket 15 cm.'],
        tipe: 'isian', satuan: 'm', soal: 'Berapa meter tinggi gedung sebenarnya?', jawab: 30,
        bahas: '15 × 200 = 3.000 cm = 30 m.' },
      { id: 'game-2', judul: 'Denah jembatan', narasi: ['Panjang sebuah jembatan sebenarnya 120 m. Denahnya berskala 1 : 2.000.'],
        tipe: 'isian', satuan: 'cm', soal: 'Berapa cm panjang jembatan pada denah?', jawab: 6,
        bahas: '120 m = 12.000 cm. 12.000 ÷ 2.000 = 6 cm.' },
      { id: 'game-3', judul: 'Dua kolam renang', narasi: ['Kolam kecil berukuran 8 m × 5 m. Kolam besar sebangun dengan kolam kecil dan panjangnya 20 m.'],
        tipe: 'isian', satuan: 'm', soal: 'Berapa meter lebar kolam besar?', jawab: 12.5,
        bahas: 'k = 20/8 = 2,5. Lebar = 5 × 2,5 = 12,5 m.' },
      { id: 'game-4', judul: 'Lapangan diperbesar', narasi: ['Lapangan kecil berukuran 20 m × 12 m diperbesar secara sebangun dengan faktor skala 1,5.'],
        tipe: 'isian', satuan: 'm²', soal: 'Berapa m² luas lapangan yang baru?', jawab: 540, xp: 15,
        bahas: 'Ukuran baru 30 m × 18 m, luas 540 m². Dengan rumus: 240 × 1,5² = 240 × 2,25 = 540 m².' }
    ]
  },

  simulator: {
    jenis: 'skala',
    cerita: 'Geser faktor skala untuk memperbesar atau memperkecil persegi panjang berukuran 4 × 3. Perhatikan panjang, lebar, dan luasnya. Selesaikan setiap misi.',
    p: 4, l: 3, satuan: 'cm',
    misi: [
      { id: 'sim-1', target: 'p', nilai: 12, teks: 'Atur faktor skala sampai panjangnya tepat 12 cm.' },
      { id: 'sim-2', target: 'l', nilai: 4.5, teks: 'Atur faktor skala sampai lebarnya tepat 4,5 cm.' },
      { id: 'sim-3', target: 'luas', nilai: 108, teks: 'Atur faktor skala sampai luasnya tepat 108 cm².' },
      { id: 'sim-4', target: 'luas', nilai: 3, teks: 'Perkecil sampai luasnya tepat 3 cm².' }
    ]
  },

  latihan: [
    { nama: 'Level 1: Pemanasan', pengantar: 'Soal dasar tentang faktor skala.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: 'Persegi panjang 6 cm × 4 cm sebangun dengan persegi panjang lain yang panjangnya 18 cm. Berapa cm lebar yang kedua?', jawab: 12, xp: 5, bahas: 'k = 18/6 = 3. Lebar = 4 × 3 = 12 cm.' },
      { id: 'l1-2', tipe: 'isian', soal: 'Persegi dengan sisi 5 cm diperbesar menjadi persegi dengan sisi 20 cm. Berapa faktor skalanya?', jawab: 4, xp: 5, bahas: 'k = 20 ÷ 5 = 4.' },
      { id: 'l1-3', tipe: 'pilgan', soal: 'Dua bangun datar sebangun jika …', opsi: ['sudut bersesuaian sama besar dan sisi bersesuaian berbanding sama', 'sisi bersesuaian sama panjang', 'luasnya sama', 'kelilingnya sama'], jawab: 0, xp: 5,
        bahas: 'Sebangun membutuhkan dua syarat sekaligus: sudut bersesuaian sama besar dan sisi bersesuaian berbanding sama.' },
      { id: 'l1-4', tipe: 'isian', soal: 'Segitiga ABC sebangun dengan DEF. AB = 3 cm bersesuaian dengan DE = 9 cm. Jika BC = 5 cm, berapa cm panjang EF?', jawab: 15, xp: 5, bahas: 'k = 9/3 = 3. EF = 5 × 3 = 15 cm.' }
    ] },
    { nama: 'Level 2: Tantangan', pengantar: 'Segitiga sebangun dan skala.', soal: [
      { id: 'l2-1', tipe: 'isian', soal: 'Segitiga ABC bersisi 5, 12, 13 sebangun dengan segitiga PQR bersisi 15, 36, x. Berapa nilai x?', jawab: 39, xp: 10, bahas: 'k = 15/5 = 3. x = 13 × 3 = 39.' },
      { id: 'l2-2', tipe: 'pilgan', soal: 'Pasangan segitiga yang sebangun adalah …',
        opsi: ['Sisi 3, 4, 5 dan sisi 6, 8, 10', 'Sisi 3, 4, 5 dan sisi 6, 8, 11', 'Sisi 2, 3, 4 dan sisi 4, 6, 9', 'Sisi 5, 6, 7 dan sisi 10, 12, 15'], jawab: 0, xp: 10,
        bahas: '6/3 = 8/4 = 10/5 = 2, jadi sebangun. Pada pilihan lain, perbandingan ketiga sisinya tidak sama.' },
      { id: 'l2-3', tipe: 'isian', soal: 'Peta berskala 1 : 500.000. Jarak dua kota pada peta 7 cm. Berapa km jarak sebenarnya?', jawab: 35, xp: 10, satuan: 'km',
        bahas: '7 × 500.000 = 3.500.000 cm = 35.000 m = 35 km.' },
      { id: 'l2-4', tipe: 'isian', soal: 'Foto dengan lebar 12 cm dan tinggi 18 cm diperkecil secara sebangun sehingga tingginya 6 cm. Berapa cm lebarnya?', jawab: 4, xp: 10,
        bahas: 'k = 6/18 = 1/3. Lebar = 12 × 1/3 = 4 cm.' }
    ] },
    { nama: 'Level 3: Problem Solving', pengantar: 'Soal cerita dengan bayangan dan denah.', soal: [
      { id: 'l3-1', tipe: 'isian', soal: 'Bayangan sebuah pohon 9 m. Pada saat yang sama, tongkat setinggi 2 m mempunyai bayangan 1,5 m. Berapa meter tinggi pohon?', jawab: 12, xp: 15, satuan: 'm',
        bahas: 't/9 = 2/1,5. Maka t = 2 × 9 ÷ 1,5 = 12 m.' },
      { id: 'l3-2', tipe: 'isian', soal: 'Sebuah gedung setinggi 45 m mempunyai bayangan 30 m. Pada saat yang sama, seorang anak setinggi 1,5 m berdiri di dekatnya. Berapa meter panjang bayangan anak itu?', jawab: 1, xp: 15, satuan: 'm',
        bahas: '45/30 = 1,5/s. Maka s = 1,5 × 30 ÷ 45 = 1 m.' },
      { id: 'l3-3', tipe: 'isian', soal: 'Sebuah taman berukuran 12 m × 8 m. Pada denah, panjang taman 6 cm. Berapa cm² luas taman pada denah?', jawab: 24, xp: 15, satuan: 'cm²',
        bahas: '12 m = 1.200 cm menjadi 6 cm, jadi skalanya 1 : 200. Lebar 800 cm menjadi 4 cm. Luas pada denah 6 × 4 = 24 cm².' }
    ] },
    { nama: 'Level 4: MathLife Challenge', pengantar: 'Soal paling menantang.', soal: [
      { id: 'l4-1', tipe: 'isian', soal: 'Dua persegi panjang sebangun. Luas yang kecil 48 cm² dan luas yang besar 192 cm². Berapa faktor skala sisi persegi panjang besar terhadap yang kecil?', jawab: 2, xp: 25,
        bahas: 'Perbandingan luas = 192/48 = 4 = k². Jadi k = 2.' },
      { id: 'l4-2', tipe: 'isian', soal: 'Segitiga dengan alas 6 cm dan tinggi 8 cm diperbesar secara sebangun hingga alasnya 15 cm. Berapa cm² luas segitiga yang baru?', jawab: 150, xp: 25,
        bahas: 'k = 15/6 = 2,5. Tinggi baru = 8 × 2,5 = 20 cm. Luas = ½ × 15 × 20 = 150 cm².' }
    ] }
  ],

  evaluasi: [
    { judul: 'Pilihan ganda', soal: [
      { id: 'ev-pg-1', tipe: 'pilgan', soal: 'Persegi panjang 5 cm × 3 cm sebangun dengan persegi panjang …', opsi: ['15 cm × 9 cm', '15 cm × 8 cm', '10 cm × 5 cm', '8 cm × 5 cm'], jawab: 0, bahas: '15/5 = 9/3 = 3, jadi sebangun.' },
      { id: 'ev-pg-2', tipe: 'pilgan', soal: 'Dua segitiga mempunyai dua pasang sudut bersesuaian yang sama besar. Kesimpulannya …', opsi: ['keduanya sebangun', 'keduanya kongruen', 'keduanya sama luas', 'tidak dapat disimpulkan'], jawab: 0,
        bahas: 'Dua sudut sama membuat sudut ketiga juga sama, sehingga kedua segitiga sebangun.' },
      { id: 'ev-pg-3', tipe: 'pilgan', soal: 'Skala sebuah denah 1 : 250. Panjang ruangan pada denah 8 cm. Panjang sebenarnya adalah …', opsi: ['20 m', '2 m', '200 m', '32 m'], jawab: 0, bahas: '8 × 250 = 2.000 cm = 20 m.' },
      { id: 'ev-pg-4', tipe: 'pilgan', soal: 'Sisi sebuah bangun diperbesar 4 kali. Luasnya menjadi … kali.', opsi: ['16', '4', '8', '2'], jawab: 0, bahas: 'Luas dikali k², yaitu 4² = 16.' }
    ] },
    { judul: 'Benar atau salah', soal: [
      { id: 'ev-bs-1', tipe: 'bs', soal: 'Dua persegi selalu sebangun.', jawab: true, bahas: 'Semua sudut persegi 90° dan semua sisinya berbanding sama, jadi dua persegi selalu sebangun.' },
      { id: 'ev-bs-2', tipe: 'bs', soal: 'Dua belah ketupat selalu sebangun.', jawab: false, bahas: 'Sisinya berbanding sama, tetapi besar sudutnya bisa berbeda, jadi belum tentu sebangun.' },
      { id: 'ev-bs-3', tipe: 'bs', soal: 'Jika faktor skala 2, maka keliling menjadi 2 kali dan luas menjadi 4 kali.', jawab: true, bahas: 'Keliling dikali k = 2, luas dikali k² = 4.' }
    ] },
    { judul: 'Isian singkat', soal: [
      { id: 'ev-is-1', tipe: 'isian', soal: 'Segitiga ABC sebangun dengan PQR. AB = 8 cm bersesuaian dengan PQ = 12 cm. Jika AC = 10 cm, berapa cm panjang PR?', jawab: 15, bahas: 'k = 12/8 = 1,5. PR = 10 × 1,5 = 15 cm.' },
      { id: 'ev-is-2', tipe: 'isian', soal: 'Lapangan berukuran 40 m × 25 m digambar sebangun dengan panjang 10 cm. Berapa cm lebar lapangan pada gambar?', jawab: 6.25,
        bahas: '40 m = 4.000 cm menjadi 10 cm, jadi skala 1 : 400. Lebar 2.500 cm ÷ 400 = 6,25 cm.' }
    ] },
    { judul: 'Uraian', soal: [
      { id: 'ev-ur-1', tipe: 'uraian', soal: 'Jelaskan mengapa dua persegi panjang belum tentu sebangun, padahal semua sudutnya siku-siku.',
        kunci: 'Sebangun membutuhkan dua syarat: sudut bersesuaian sama dan sisi bersesuaian berbanding sama. Persegi panjang selalu memenuhi syarat sudut, tetapi perbandingan sisinya bisa berbeda, misalnya 4 × 3 dan 8 × 4.' }
    ] },
    { judul: 'Masalah kontekstual', soal: [
      { id: 'ev-ko-1', tipe: 'isian', satuan: 'm²', soal: 'Sebuah maket rumah berskala 1 : 50. Luas lantai maket 600 cm². Berapa m² luas lantai rumah sebenarnya?', jawab: 150,
        bahas: 'Skala luas = 50² = 2.500. Luas sebenarnya = 600 × 2.500 = 1.500.000 cm² = 150 m².' }
    ] }
  ]
};
