// Kelas 7 · Bab 1 Bilangan · Subbab 1.2 Pecahan
window.KONTEN = window.KONTEN || {};
window.KONTEN['k7-b1-s2'] = {
  judul: 'Pecahan',
  badge: { nama: 'Juru Pecahan', syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi.' },

  kenalan: [
    { t: 'p', x: 'Satu pizza dibagi menjadi 8 potong sama besar, lalu kamu makan 3 potong. Bagian yang kamu makan ditulis 3/8. Itulah pecahan.' },
    { t: 'p', x: 'Pada pecahan a/b, a disebut pembilang (banyak bagian yang diambil) dan b disebut penyebut (banyak bagian sama besar), dengan b tidak sama dengan 0.' },
    { t: 'kotak', warna: 'mint', judul: 'Di subbab ini kamu akan belajar', x: [
      'mengenal pecahan biasa dan pecahan campuran,',
      'membuat pecahan senilai dan membandingkan pecahan,',
      'menjumlah dan mengurangkan pecahan,',
      'mengalikan dan membagi pecahan.'
    ] }
  ],

  nyata: {
    blok: [
      { t: 'p', x: 'Ibu membuat satu loyang brownies yang dipotong menjadi 12 bagian sama besar. Adik makan 3 potong dan kakak makan 4 potong.' }
    ],
    soal: [
      { id: 'nyata-1', tipe: 'pilgan', soal: 'Berapa bagian loyang yang sudah dimakan?', opsi: ['7/12', '7/24', '1/3', '7/10'], jawab: 0, xp: 5,
        bahas: 'Penyebutnya sama (12), jadi cukup menjumlahkan pembilangnya: 3/12 + 4/12 = 7/12.' }
    ]
  },

  konsep: [
    { t: 'h', x: 'Pecahan senilai dan bentuk sederhana' },
    { t: 'p', x: 'Kalikan atau bagi pembilang dan penyebut dengan bilangan yang sama (bukan nol), nilainya tidak berubah: 1/2 = 2/4 = 3/6 = 4/8. Bentuk paling sederhana adalah ketika pembilang dan penyebut tidak punya faktor persekutuan selain 1.' },
    { t: 'h', x: 'Pecahan campuran' },
    { t: 'p', x: 'Pecahan campuran seperti 1 3/4 dapat diubah menjadi pecahan biasa: (1 × 4 + 3)/4 = 7/4. Sebaliknya, 7/4 = 1 3/4.' },
    { t: 'h', x: 'Membandingkan pecahan' },
    { t: 'p', x: 'Samakan penyebutnya, lalu bandingkan pembilangnya. Contoh 3/4 dan 5/8: karena 3/4 = 6/8, maka 6/8 > 5/8, jadi 3/4 > 5/8.' },
    { t: 'h', x: 'Menjumlah dan mengurangkan' },
    { t: 'p', x: 'Samakan penyebut (gunakan KPK), lalu jumlahkan atau kurangkan pembilangnya. Penyebutnya tetap.' },
    { t: 'h', x: 'Mengalikan dan membagi' },
    { t: 'p', x: 'Perkalian: pembilang × pembilang dan penyebut × penyebut. Pembagian: kalikan dengan kebalikan pecahan pembagi.' },
    { t: 'kotak', warna: 'krem', judul: 'Cara mengingat', x: 'Membagi pecahan sama dengan mengalikan dengan kebalikannya: a/b ÷ c/d = a/b × d/c.' }
  ],

  contoh: [
    { t: 'contoh', judul: 'Contoh 1: Menyederhanakan 18/24',
      diketahui: 'Pecahan 18/24.', ditanya: 'Bentuk paling sederhana.',
      strategi: 'Bagi pembilang dan penyebut dengan FPB-nya. FPB dari 18 dan 24 adalah 6.',
      hitung: '18/24 = (18 ÷ 6)/(24 ÷ 6) = 3/4.',
      periksa: '3 dan 4 tidak punya faktor persekutuan selain 1. Cocok.' },
    { t: 'contoh', judul: 'Contoh 2: Membandingkan 2/3 dan 3/5',
      diketahui: 'Dua pecahan: 2/3 dan 3/5.', ditanya: 'Mana yang lebih besar.',
      strategi: 'Samakan penyebut dengan KPK 3 dan 5, yaitu 15.',
      hitung: '2/3 = 10/15 dan 3/5 = 9/15. Karena 10/15 > 9/15, maka 2/3 > 3/5.',
      periksa: 'Dalam desimal, 2/3 ≈ 0,67 dan 3/5 = 0,6. Cocok.' },
    { t: 'contoh', judul: 'Contoh 3: Menjumlah 2/3 + 1/4',
      diketahui: 'Penyebutnya berbeda: 3 dan 4.', ditanya: 'Hasil 2/3 + 1/4.',
      strategi: 'Samakan penyebut dengan KPK 12.',
      hitung: '2/3 + 1/4 = 8/12 + 3/12 = 11/12.',
      periksa: 'Hasilnya kurang dari 1, sesuai dengan 2/3 + 1/4 yang kurang dari 1. Cocok.' },
    { t: 'contoh', judul: 'Contoh 4: Mengalikan dan membagi',
      diketahui: '3/5 × 10/9 dan 3/4 ÷ 1/2.', ditanya: 'Kedua hasilnya.',
      strategi: 'Kalikan lurus untuk perkalian. Untuk pembagian, kalikan dengan kebalikan.',
      hitung: '3/5 × 10/9 = 30/45 = 2/3. Lalu 3/4 ÷ 1/2 = 3/4 × 2/1 = 6/4 = 3/2 = 1 1/2.',
      periksa: 'Cek pembagian: 1 1/2 × 1/2 = 3/4. Cocok.' }
  ],

  mini: [
    { id: 'mini-1', tipe: 'isian', soal: 'Isi titik-titik: 3/5 = ?/20', jawab: 12, bahas: '5 dikali 4 menjadi 20, jadi pembilang 3 juga dikali 4: 3 × 4 = 12.' },
    { id: 'mini-2', tipe: 'pilgan', soal: 'Pecahan yang paling besar adalah …', opsi: ['3/4', '2/3', '5/8', '7/12'], jawab: 0,
      bahas: 'Samakan penyebut menjadi 24: 18/24, 16/24, 15/24, 14/24. Yang terbesar adalah 3/4.' },
    { id: 'mini-3', tipe: 'bs', soal: '1/3 + 1/4 = 2/7.', jawab: false, bahas: 'Penyebut tidak boleh dijumlahkan. 1/3 + 1/4 = 4/12 + 3/12 = 7/12.' },
    { id: 'mini-4', tipe: 'isian', soal: 'Ubah 2 1/3 menjadi pecahan biasa. (Tulis seperti 7/3.)', jawab: 7 / 3, bahas: '(2 × 3 + 1)/3 = 7/3.' }
  ],

  game: {
    jenis: 'misi',
    cerita: 'Kamu asisten koki di Dapur MathLife. Selesaikan tiga pesanan dengan hitungan pecahan. Jawaban boleh ditulis seperti 5/4 atau 1 1/4 atau 1,25.',
    babak: [
      { id: 'game-1', judul: 'Resep kue', narasi: ['Resep memakai 3/4 kg tepung dan 1/2 kg gula.'],
        tipe: 'isian', soal: 'Berapa kg berat tepung dan gula seluruhnya?', jawab: 5 / 4,
        bahas: '3/4 + 1/2 = 3/4 + 2/4 = 5/4 = 1 1/4 kg.' },
      { id: 'game-2', judul: 'Mengisi kantong', narasi: ['Ada 3 kg gula halus. Setiap kantong diisi 1/4 kg.'],
        tipe: 'isian', soal: 'Berapa kantong yang terisi penuh?', jawab: 12,
        bahas: '3 ÷ 1/4 = 3 × 4 = 12 kantong.' },
      { id: 'game-3', judul: 'Pakai mentega', narasi: ['Dina membeli 2/3 kg mentega, lalu memakai 3/4 bagian dari mentega itu.'],
        tipe: 'isian', soal: 'Berapa kg mentega yang terpakai?', jawab: 1 / 2,
        bahas: '2/3 × 3/4 = 6/12 = 1/2 kg.' }
    ]
  },

  latihan: [
    { nama: 'Level 1: Pemanasan', pengantar: 'Soal dasar. Jawaban pecahan boleh ditulis seperti 2/3.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: 'Bentuk paling sederhana dari 12/18 adalah a/b. Berapa nilai a + b?', jawab: 5, xp: 5, bahas: '12/18 = 2/3, jadi a = 2 dan b = 3. Maka a + b = 5.' },
      { id: 'l1-2', tipe: 'isian', soal: '1/2 + 1/6 = … (tulis seperti 2/3)', jawab: 2 / 3, xp: 5, bahas: '1/2 = 3/6, jadi 3/6 + 1/6 = 4/6 = 2/3.' },
      { id: 'l1-3', tipe: 'pilgan', soal: 'Pecahan yang senilai dengan 2/5 adalah …', opsi: ['4/10', '4/5', '2/10', '5/2'], jawab: 0, xp: 5, bahas: 'Kalikan pembilang dan penyebut dengan 2: 2/5 = 4/10.' },
      { id: 'l1-4', tipe: 'isian', soal: 'Ubah 3 1/2 menjadi pecahan biasa. (Tulis seperti 7/2.)', jawab: 7 / 2, xp: 5, bahas: '(3 × 2 + 1)/2 = 7/2.' }
    ] },
    { nama: 'Level 2: Tantangan', pengantar: 'Penyebut berbeda dan perkalian.', soal: [
      { id: 'l2-1', tipe: 'isian', soal: '5/6 − 1/4 = … (tulis seperti 7/12)', jawab: 7 / 12, xp: 10, bahas: 'KPK 6 dan 4 adalah 12: 10/12 − 3/12 = 7/12.' },
      { id: 'l2-2', tipe: 'isian', soal: '2/3 × 9/10 = … (tulis seperti 3/5)', jawab: 3 / 5, xp: 10, bahas: '2/3 × 9/10 = 18/30 = 3/5.' },
      { id: 'l2-3', tipe: 'pilgan', soal: 'Urutan dari yang terkecil: 1/2, 3/8, 2/3 adalah …',
        opsi: ['3/8, 1/2, 2/3', '1/2, 3/8, 2/3', '2/3, 1/2, 3/8', '3/8, 2/3, 1/2'], jawab: 0, xp: 10,
        bahas: 'Dengan penyebut 24: 12/24, 9/24, 16/24. Urutan terkecil: 9/24, 12/24, 16/24 yaitu 3/8, 1/2, 2/3.' }
    ] },
    { nama: 'Level 3: Problem Solving', pengantar: 'Soal cerita.', soal: [
      { id: 'l3-1', tipe: 'isian', soal: 'Tali sepanjang 3 1/2 m dipotong menjadi potongan sepanjang 1/4 m. Berapa potongan yang diperoleh?', jawab: 14, xp: 15,
        bahas: '3 1/2 = 7/2. Maka 7/2 ÷ 1/4 = 7/2 × 4 = 14 potongan.' },
      { id: 'l3-2', tipe: 'isian', soal: 'Rina membaca 2/5 bagian buku pada hari Senin dan 1/3 bagian pada hari Selasa. Berapa bagian buku yang belum dibaca? (Tulis seperti 4/15.)', jawab: 4 / 15, xp: 15,
        bahas: 'Sudah dibaca: 2/5 + 1/3 = 6/15 + 5/15 = 11/15. Belum dibaca: 1 − 11/15 = 4/15.' }
    ] },
    { nama: 'Level 4: MathLife Challenge', pengantar: 'Soal paling menantang.', soal: [
      { id: 'l4-1', tipe: 'isian', soal: 'Sebuah drum berisi air 3/5 bagian. Setelah ditambah 12 liter, drum itu terisi 4/5 bagian. Berapa liter kapasitas drum?', jawab: 60, xp: 25,
        bahas: 'Tambahan 12 liter sama dengan 4/5 − 3/5 = 1/5 bagian drum. Jadi kapasitasnya 12 × 5 = 60 liter.' }
    ] }
  ],

  evaluasi: [
    { judul: 'Pilihan ganda', soal: [
      { id: 'ev-pg-1', tipe: 'pilgan', soal: 'Hasil dari 3/8 + 1/4 adalah …', opsi: ['4/12', '5/8', '1/2', '3/32'], jawab: 1, bahas: '1/4 = 2/8, jadi 3/8 + 2/8 = 5/8.' },
      { id: 'ev-pg-2', tipe: 'pilgan', soal: 'Bentuk paling sederhana dari 24/36 adalah …', opsi: ['1/2', '2/3', '3/4', '6/9'], jawab: 1, bahas: 'FPB 24 dan 36 adalah 12, jadi 24/36 = 2/3.' },
      { id: 'ev-pg-3', tipe: 'pilgan', soal: 'Hasil dari 2/3 ÷ 4/9 adalah …', opsi: ['8/27', '3/2', '2/3', '1/6'], jawab: 1, bahas: '2/3 × 9/4 = 18/12 = 3/2.' }
    ] },
    { judul: 'Benar atau salah', soal: [
      { id: 'ev-bs-1', tipe: 'bs', soal: '2/3 lebih besar dari 3/4.', jawab: false, bahas: '2/3 = 8/12 dan 3/4 = 9/12, jadi 2/3 lebih kecil dari 3/4.' },
      { id: 'ev-bs-2', tipe: 'bs', soal: '1 1/2 sama dengan 3/2.', jawab: true, bahas: '(1 × 2 + 1)/2 = 3/2.' }
    ] },
    { judul: 'Isian singkat', soal: [
      { id: 'ev-is-1', tipe: 'isian', soal: '1 1/4 + 2 1/2 = … (tulis seperti 15/4 atau 3 3/4)', jawab: 15 / 4, bahas: '5/4 + 5/2 = 5/4 + 10/4 = 15/4 = 3 3/4.' },
      { id: 'ev-is-2', tipe: 'isian', soal: '(3/4 − 1/3) × 6 = … (tulis seperti 5/2 atau 2,5)', jawab: 5 / 2, bahas: '3/4 − 1/3 = 9/12 − 4/12 = 5/12. Lalu 5/12 × 6 = 30/12 = 5/2.' }
    ] },
    { judul: 'Uraian', soal: [
      { id: 'ev-ur-1', tipe: 'uraian', soal: 'Jelaskan mengapa 1/2 + 1/3 bukan 2/5.',
        kunci: 'Pecahan hanya bisa dijumlahkan jika penyebutnya sama. 1/2 = 3/6 dan 1/3 = 2/6, jadi hasilnya 5/6. Hasil 2/5 juga tidak masuk akal karena lebih kecil dari 1/2, padahal ditambah.' }
    ] },
    { judul: 'Masalah kontekstual', soal: [
      { id: 'ev-ko-1', tipe: 'isian', soal: 'Kebun Pak Dedi seluas 5/8 hektare. Sebanyak 2/5 bagian kebun itu ditanami cabai. Berapa hektare yang ditanami cabai? (Tulis seperti 1/4.)', jawab: 1 / 4,
        bahas: '5/8 × 2/5 = 10/40 = 1/4 hektare.' }
    ] }
  ]
};
