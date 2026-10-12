// Kelas 7 · Bab 1 Bilangan · Subbab 1.3 Desimal dan Pembulatan
window.KONTEN = window.KONTEN || {};
window.KONTEN['k7-b1-s3'] = {
  judul: 'Desimal dan Pembulatan',
  badge: { nama: 'Pakar Desimal', syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi.' },

  kenalan: [
    { t: 'p', x: 'Timbangan di pasar menunjukkan 1,25 kg. Tanda koma memisahkan bagian bulat dan bagian pecahan. Bilangan seperti ini disebut bilangan desimal.' },
    { t: 'p', x: 'Bilangan desimal adalah pecahan dengan penyebut 10, 100, 1.000, dan seterusnya. Misalnya 0,7 = 7/10 dan 0,25 = 25/100.' },
    { t: 'kotak', warna: 'mint', judul: 'Di subbab ini kamu akan belajar', x: [
      'membaca nilai tempat bilangan desimal,',
      'membandingkan dan mengoperasikan bilangan desimal,',
      'mengubah pecahan menjadi desimal dan sebaliknya,',
      'membulatkan bilangan desimal.'
    ] }
  ],

  nyata: {
    blok: [
      { t: 'p', x: 'Di pasar, ayam ditimbang dan hasilnya 1,25 kg. Penjual berkata, "Itu satu kilo lebih seperempat."' }
    ],
    soal: [
      { id: 'nyata-1', tipe: 'pilgan', soal: '0,25 sama dengan pecahan …', opsi: ['1/4', '1/2', '1/25', '2/5'], jawab: 0, xp: 5,
        bahas: '0,25 = 25/100. Bagi pembilang dan penyebut dengan 25 sehingga menjadi 1/4.' }
    ]
  },

  konsep: [
    { t: 'h', x: 'Nilai tempat' },
    { t: 'p', x: 'Angka pertama setelah koma bernilai persepuluhan, angka kedua perseratusan, dan angka ketiga perseribuan. Pada 3,472: angka 4 bernilai 4/10, angka 7 bernilai 7/100, dan angka 2 bernilai 2/1.000.' },
    { t: 'h', x: 'Membandingkan' },
    { t: 'p', x: 'Samakan banyak angka di belakang koma dengan menambah nol, lalu bandingkan. Contoh 0,5 dan 0,45: tulis 0,50 dan 0,45, jadi 0,5 > 0,45.' },
    { t: 'h', x: 'Operasi' },
    { t: 'daftar', x: [
      'Tambah dan kurang: sejajarkan tanda koma, lalu hitung seperti bilangan bulat.',
      'Kali: hitung tanpa koma, lalu letakkan koma sehingga banyak angka di belakang koma sama dengan jumlah angka di belakang koma kedua bilangan.',
      'Bagi: kalikan pembagi dan yang dibagi dengan 10, 100, dan seterusnya sampai pembaginya bilangan bulat.'
    ] },
    { t: 'h', x: 'Pecahan dan desimal' },
    { t: 'p', x: 'Pecahan menjadi desimal dengan membagi pembilang oleh penyebut: 3/4 = 3 ÷ 4 = 0,75. Desimal menjadi pecahan dengan menulisnya sebagai penyebut 10, 100, dan seterusnya: 0,6 = 6/10 = 3/5.' },
    { t: 'h', x: 'Pembulatan' },
    { t: 'p', x: 'Lihat angka tepat setelah tempat yang dibulatkan. Jika angkanya 5 atau lebih, angka di tempat itu naik satu. Jika kurang dari 5, angka di tempat itu tetap, dan angka sesudahnya dibuang.' },
    { t: 'kotak', warna: 'krem', judul: 'Contoh pembulatan 3,476', x: 'Ke satu angka desimal: 3,5. Ke dua angka desimal: 3,48. Ke satuan: 3.' }
  ],

  contoh: [
    { t: 'contoh', judul: 'Contoh 1: Menjumlah 2,35 + 1,8',
      diketahui: 'Dua bilangan desimal dengan banyak angka di belakang koma berbeda.', ditanya: 'Hasil 2,35 + 1,8.',
      strategi: 'Tulis 1,8 sebagai 1,80, lalu sejajarkan koma.',
      hitung: '2,35 + 1,80 = 4,15.',
      periksa: 'Perkiraan: 2 + 2 = 4, hasilnya dekat 4. Cocok.' },
    { t: 'contoh', judul: 'Contoh 2: Mengalikan 3,4 × 0,25',
      diketahui: '3,4 punya 1 angka di belakang koma dan 0,25 punya 2 angka.', ditanya: 'Hasil 3,4 × 0,25.',
      strategi: 'Hitung 34 × 25 dulu, lalu beri koma 1 + 2 = 3 angka dari belakang.',
      hitung: '34 × 25 = 850, jadi 0,850 = 0,85.',
      periksa: '0,25 adalah seperempat. Seperempat dari 3,4 adalah 0,85. Cocok.' },
    { t: 'contoh', judul: 'Contoh 3: Mengubah 7/8 menjadi desimal',
      diketahui: 'Pecahan 7/8.', ditanya: 'Bentuk desimalnya.',
      strategi: 'Bagi pembilang oleh penyebut: 7 ÷ 8.',
      hitung: '7 ÷ 8 = 0,875.',
      periksa: '0,875 × 8 = 7. Cocok.' },
    { t: 'contoh', judul: 'Contoh 4: Membulatkan 12,846',
      diketahui: 'Bilangan 12,846.', ditanya: 'Hasil dibulatkan ke dua angka desimal.',
      strategi: 'Angka tepat setelah tempat perseratus adalah 6.',
      hitung: 'Karena 6 lebih dari 5, angka 4 naik menjadi 5, jadi 12,85.',
      periksa: '12,85 lebih dekat ke 12,846 daripada 12,84. Cocok.' }
  ],

  mini: [
    { id: 'mini-1', tipe: 'isian', soal: '0,6 + 0,75 = …', jawab: 1.35, bahas: '0,60 + 0,75 = 1,35.' },
    { id: 'mini-2', tipe: 'pilgan', soal: 'Bilangan terbesar adalah …', opsi: ['0,5', '0,45', '0,405', '0,54'], jawab: 3, bahas: 'Samakan jadi tiga angka: 0,500; 0,450; 0,405; 0,540. Yang terbesar 0,54.' },
    { id: 'mini-3', tipe: 'bs', soal: '0,3 × 0,3 = 0,9.', jawab: false, bahas: '3 × 3 = 9, lalu koma diberi 1 + 1 = 2 angka dari belakang, jadi 0,09.' },
    { id: 'mini-4', tipe: 'isian', soal: 'Bulatkan 5,649 ke satu angka desimal.', jawab: 5.6, bahas: 'Angka tepat setelah tempat persepuluhan adalah 4 (kurang dari 5), jadi tetap 5,6.' }
  ],

  game: {
    jenis: 'misi',
    cerita: 'Kamu penjaga timbangan di Pasar MathLife. Hitung berat dan harga belanjaan pelanggan.',
    babak: [
      { id: 'game-1', judul: 'Jeruk segar', narasi: ['Seorang pembeli membeli 2,5 kg jeruk dengan harga Rp18.000 per kg.'],
        tipe: 'isian', satuan: 'Rp', soal: 'Berapa rupiah yang harus dibayar?', jawab: 45000, bahas: '2,5 × 18.000 = 45.000.' },
      { id: 'game-2', judul: 'Beras dibagi rata', narasi: ['Beras 5 kg dibagi rata ke 4 kantong.'],
        tipe: 'isian', satuan: 'kg', soal: 'Berapa kg isi tiap kantong?', jawab: 1.25, bahas: '5 ÷ 4 = 1,25 kg.' },
      { id: 'game-3', judul: 'Daging sapi', narasi: ['Harga daging sapi Rp135.000 per kg. Ibu membeli 0,75 kg.'],
        tipe: 'isian', satuan: 'Rp', soal: 'Berapa rupiah yang harus dibayar?', jawab: 101250, bahas: '0,75 × 135.000 = 101.250.' }
    ]
  },

  latihan: [
    { nama: 'Level 1: Pemanasan', pengantar: 'Soal dasar. Koma desimal boleh ditulis dengan koma atau titik.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: '2,4 + 3,75 = …', jawab: 6.15, xp: 5, bahas: '2,40 + 3,75 = 6,15.' },
      { id: 'l1-2', tipe: 'isian', soal: '5 − 1,8 = …', jawab: 3.2, xp: 5, bahas: '5,0 − 1,8 = 3,2.' },
      { id: 'l1-3', tipe: 'isian', soal: 'Ubah 3/4 menjadi desimal.', jawab: 0.75, xp: 5, bahas: '3 ÷ 4 = 0,75.' },
      { id: 'l1-4', tipe: 'pilgan', soal: 'Bulatkan 7,38 ke satu angka desimal.', opsi: ['7,3', '7,4', '7,38', '8'], jawab: 1, xp: 5, bahas: 'Angka setelah persepuluhan adalah 8 (lebih dari 5), jadi 3 naik menjadi 4: 7,4.' }
    ] },
    { nama: 'Level 2: Tantangan', pengantar: 'Perkalian, pembagian, dan perbandingan.', soal: [
      { id: 'l2-1', tipe: 'isian', soal: '1,2 × 0,5 = …', jawab: 0.6, xp: 10, bahas: '12 × 5 = 60, koma diberi 2 angka dari belakang: 0,60 = 0,6.' },
      { id: 'l2-2', tipe: 'isian', soal: '4,5 ÷ 0,5 = …', jawab: 9, xp: 10, bahas: 'Kalikan keduanya dengan 10: 45 ÷ 5 = 9.' },
      { id: 'l2-3', tipe: 'pilgan', soal: 'Urutan dari yang terkecil: 0,3; 1/5; 0,25 adalah …',
        opsi: ['1/5; 0,25; 0,3', '0,25; 1/5; 0,3', '0,3; 0,25; 1/5', '1/5; 0,3; 0,25'], jawab: 0, xp: 10,
        bahas: '1/5 = 0,2. Urutan terkecil: 0,2; 0,25; 0,3, yaitu 1/5; 0,25; 0,3.' }
    ] },
    { nama: 'Level 3: Problem Solving', pengantar: 'Soal cerita.', soal: [
      { id: 'l3-1', tipe: 'isian', soal: 'Jarak rumah ke sekolah 1,6 km. Doni berjalan pergi-pulang selama 5 hari sekolah. Berapa km total jarak yang ia tempuh?', jawab: 16, xp: 15, bahas: 'Pergi-pulang 1,6 × 2 = 3,2 km per hari. Selama 5 hari: 3,2 × 5 = 16 km.' },
      { id: 'l3-2', tipe: 'isian', soal: 'Tinggi tanaman 12,5 cm. Tiap minggu bertambah 2,75 cm. Berapa cm tingginya setelah 4 minggu?', jawab: 23.5, xp: 15, bahas: 'Pertambahan 4 × 2,75 = 11 cm. Tinggi akhir 12,5 + 11 = 23,5 cm.' }
    ] },
    { nama: 'Level 4: MathLife Challenge', pengantar: 'Soal paling menantang.', soal: [
      { id: 'l4-1', tipe: 'isian', soal: 'Total belanja Rp47.835 dibulatkan kasir ke ratusan rupiah terdekat. Berapa hasil pembulatannya (dalam rupiah)?', jawab: 47800, xp: 25,
        bahas: 'Angka puluhan dan satuan adalah 35 (kurang dari 50), jadi ratusannya tetap: Rp47.800.' }
    ] }
  ],

  evaluasi: [
    { judul: 'Pilihan ganda', soal: [
      { id: 'ev-pg-1', tipe: 'pilgan', soal: '0,125 sama dengan pecahan …', opsi: ['1/8', '1/4', '1/5', '12/5'], jawab: 0, bahas: '0,125 = 125/1.000 = 1/8.' },
      { id: 'ev-pg-2', tipe: 'pilgan', soal: '3,6 + 2,45 = …', opsi: ['6,05', '5,05', '6,15', '5,95'], jawab: 0, bahas: '3,60 + 2,45 = 6,05.' },
      { id: 'ev-pg-3', tipe: 'pilgan', soal: '12,356 dibulatkan ke dua angka desimal menjadi …', opsi: ['12,35', '12,36', '12,4', '12,3'], jawab: 1, bahas: 'Angka setelah perseratus adalah 6 (lebih dari 5), jadi 5 naik menjadi 6: 12,36.' }
    ] },
    { judul: 'Benar atau salah', soal: [
      { id: 'ev-bs-1', tipe: 'bs', soal: '0,7 < 0,65.', jawab: false, bahas: '0,70 lebih besar dari 0,65.' },
      { id: 'ev-bs-2', tipe: 'bs', soal: '2/5 = 0,4.', jawab: true, bahas: '2 ÷ 5 = 0,4.' }
    ] },
    { judul: 'Isian singkat', soal: [
      { id: 'ev-is-1', tipe: 'isian', soal: '0,8 × 0,07 = …', jawab: 0.056, bahas: '8 × 7 = 56, koma diberi 1 + 2 = 3 angka dari belakang: 0,056.' },
      { id: 'ev-is-2', tipe: 'isian', soal: '7,2 ÷ 0,09 = …', jawab: 80, bahas: 'Kalikan keduanya dengan 100: 720 ÷ 9 = 80.' }
    ] },
    { judul: 'Uraian', soal: [
      { id: 'ev-ur-1', tipe: 'uraian', soal: 'Jelaskan mengapa 0,5 × 0,5 hasilnya 0,25, bukan 2,5.',
        kunci: 'Hitung 5 × 5 = 25. Kedua bilangan masing-masing punya satu angka di belakang koma, jadi hasilnya punya dua angka di belakang koma: 0,25. Setengah dari setengah adalah seperempat, yaitu 0,25.' }
    ] },
    { judul: 'Masalah kontekstual', soal: [
      { id: 'ev-ko-1', tipe: 'isian', satuan: 'Rp', soal: 'Rani membeli 2,4 meter kain seharga Rp35.000 per meter. Berapa rupiah total yang ia bayar?', jawab: 84000, bahas: '2,4 × 35.000 = 84.000.' }
    ] }
  ]
};
