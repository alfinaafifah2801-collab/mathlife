// Kelas 7 · Bab 1 Bilangan · Subbab 1.4 Persen
window.KONTEN = window.KONTEN || {};
window.KONTEN['k7-b1-s4'] = {
  judul: 'Persen',
  badge: { nama: 'Raja Persen', syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi.' },

  kenalan: [
    { t: 'p', x: 'Diskon 30% di toko sepatu. Baterai ponsel tinggal 20%. Nilai ujian 85%. Persen ada di mana-mana.' },
    { t: 'p', x: 'Persen berarti "per seratus". Jadi 1% = 1/100, dan 25% = 25/100 = 1/4 = 0,25.' },
    { t: 'kotak', warna: 'mint', judul: 'Di subbab ini kamu akan belajar', x: [
      'mengubah persen, pecahan, dan desimal,',
      'menghitung p% dari suatu bilangan,',
      'mencari berapa persen sebuah bagian dari keseluruhan,',
      'menghitung kenaikan, penurunan, dan bunga tunggal.'
    ] }
  ],

  nyata: {
    blok: [
      { t: 'p', x: 'Kamu menabung Rp1.000.000 di bank dengan bunga 5% per tahun. Setahun kemudian, bunganya Rp50.000, karena 5% dari 1.000.000 adalah 50.000.' },
      { t: 'p', x: 'Pemanasan dulu: baterai ponselmu menunjukkan 20%.' }
    ],
    soal: [
      { id: 'nyata-1', tipe: 'pilgan', soal: 'Baterai 20% berarti terisi berapa bagian dari penuh?', opsi: ['1/5', '1/2', '2/5', '1/20'], jawab: 0, xp: 5,
        bahas: '20% = 20/100. Bagi pembilang dan penyebut dengan 20 sehingga menjadi 1/5.' }
    ]
  },

  konsep: [
    { t: 'kotak', warna: 'biru', judul: 'Persen', x: 'p% = p/100. Contoh: 25% = 25/100 = 1/4 = 0,25.' },
    { t: 'h', x: 'Mengubah bentuk' },
    { t: 'daftar', x: [
      'Persen menjadi pecahan: tulis di atas 100, lalu sederhanakan. 40% = 40/100 = 2/5.',
      'Persen menjadi desimal: geser koma dua tempat ke kiri. 8% = 0,08.',
      'Desimal atau pecahan menjadi persen: kalikan dengan 100%. 0,6 = 60% dan 3/5 = 3/5 × 100% = 60%.'
    ] },
    { t: 'h', x: 'p% dari suatu bilangan' },
    { t: 'p', x: 'Kalikan bilangan itu dengan p/100. Contoh 20% dari 150 = 20/100 × 150 = 30.' },
    { t: 'h', x: 'Mencari persentase' },
    { t: 'p', x: 'Persentase = (bagian ÷ keseluruhan) × 100%. Contoh 18 dari 72: 18/72 × 100% = 25%.' },
    { t: 'h', x: 'Mencari keseluruhan' },
    { t: 'p', x: 'Jika p% dari suatu bilangan adalah B, maka bilangan itu = B ÷ (p/100). Contoh jika 15% dari N adalah 45, maka N = 45 ÷ 0,15 = 300.' },
    { t: 'h', x: 'Kenaikan, penurunan, dan bunga tunggal' },
    { t: 'daftar', x: [
      'Naik p%: nilai baru = nilai awal × (100 + p)/100. Turun p%: nilai awal × (100 − p)/100.',
      'Bunga tunggal = tabungan awal × persen bunga per tahun × lama menabung (tahun).'
    ] },
    { t: 'kotak', warna: 'krem', judul: 'Hati-hati', x: 'Persen kedua selalu dihitung dari nilai yang sudah berubah, bukan dari nilai awal.' }
  ],

  contoh: [
    { t: 'contoh', judul: 'Contoh 1: 35% dari 240',
      diketahui: 'Persen 35% dan bilangan 240.', ditanya: 'Berapa 35% dari 240.',
      strategi: 'Ubah 35% menjadi 0,35, lalu kalikan.',
      hitung: '0,35 × 240 = 84.',
      periksa: '10% dari 240 adalah 24. 30% adalah 72 dan 5% adalah 12, jadi 72 + 12 = 84. Cocok.' },
    { t: 'contoh', judul: 'Contoh 2: 18 dari 72 berapa persen?',
      diketahui: 'Bagian 18 dan keseluruhan 72.', ditanya: 'Persentasenya.',
      strategi: 'Bagi bagian dengan keseluruhan, lalu kalikan 100%.',
      hitung: '18/72 × 100% = 1/4 × 100% = 25%.',
      periksa: '25% dari 72 adalah 18. Cocok.' },
    { t: 'contoh', judul: 'Contoh 3: Mencari keseluruhan',
      diketahui: '15% dari suatu bilangan adalah 45.', ditanya: 'Bilangan itu.',
      strategi: 'Bagi 45 dengan 15/100.',
      hitung: '45 ÷ 0,15 = 300.',
      periksa: '15% dari 300 = 0,15 × 300 = 45. Cocok.' },
    { t: 'contoh', judul: 'Contoh 4: Bunga tunggal',
      diketahui: 'Tabungan Rp2.000.000, bunga 6% per tahun, selama 3 tahun.', ditanya: 'Besar bunga dan saldo akhir.',
      strategi: 'Bunga = tabungan × persen × waktu.',
      hitung: 'Bunga = 2.000.000 × 0,06 × 3 = 360.000. Saldo akhir = 2.000.000 + 360.000 = 2.360.000.',
      periksa: 'Bunga per tahun 120.000. Tiga tahun jadi 360.000. Cocok.' }
  ],

  mini: [
    { id: 'mini-1', tipe: 'isian', soal: 'Ubah 0,35 menjadi persen. (Tulis angkanya saja.)', jawab: 35, bahas: '0,35 × 100% = 35%.' },
    { id: 'mini-2', tipe: 'isian', soal: '20% dari 350 adalah …', jawab: 70, bahas: '0,2 × 350 = 70.' },
    { id: 'mini-3', tipe: 'bs', soal: 'Harga naik 10% lalu turun 10% akan kembali ke harga awal.', jawab: false, bahas: 'Misalkan 100. Naik 10% jadi 110. Turun 10% dari 110 adalah 11, jadi 99, bukan 100.' },
    { id: 'mini-4', tipe: 'pilgan', soal: 'Nilai yang paling besar adalah …', opsi: ['3/5', '0,58', '59%', '57%'], jawab: 0, bahas: '3/5 = 60%, 0,58 = 58%, 59%, 57%. Yang terbesar 3/5.' },
    { id: 'mini-5', tipe: 'isian', soal: 'Dari 40 soal, Dina menjawab benar 34 soal. Berapa persen jawaban benarnya? (Tulis angkanya saja.)', jawab: 85, bahas: '34/40 × 100% = 85%.' }
  ],

  game: {
    jenis: 'misi',
    cerita: 'Selamat datang di Math Bank. Kamu petugas yang menghitung bunga tunggal tabungan nasabah.',
    babak: [
      { id: 'game-1', judul: 'Bunga satu tahun', narasi: ['Rafi menabung Rp1.000.000. Bunga 5% per tahun.'],
        tipe: 'isian', satuan: 'Rp', soal: 'Berapa rupiah bunga setelah 1 tahun?', jawab: 50000, bahas: '1.000.000 × 0,05 = 50.000.' },
      { id: 'game-2', judul: 'Saldo dua tahun', narasi: ['Sinta menabung Rp2.500.000. Bunga 4% per tahun (bunga tunggal).'],
        tipe: 'isian', satuan: 'Rp', soal: 'Berapa rupiah saldo (tabungan ditambah bunga) setelah 2 tahun?', jawab: 2700000,
        bahas: 'Bunga = 2.500.000 × 0,04 × 2 = 200.000. Saldo = 2.500.000 + 200.000 = 2.700.000.' },
      { id: 'game-3', judul: 'Mencari tabungan awal', narasi: ['Pak Budi mendapat bunga Rp72.000 setelah 1 tahun. Bunga bank 6% per tahun.'],
        tipe: 'isian', satuan: 'Rp', soal: 'Berapa rupiah tabungan awal Pak Budi?', jawab: 1200000, bahas: '72.000 ÷ 0,06 = 1.200.000.' },
      { id: 'game-4', judul: 'Mencari persen bunga', narasi: ['Dina menabung Rp800.000. Setelah 1 tahun saldonya menjadi Rp836.000.'],
        tipe: 'isian', soal: 'Berapa persen bunga per tahun? (Tulis angkanya saja.)', jawab: 4.5, xp: 15,
        bahas: 'Bunga = 836.000 − 800.000 = 36.000. Persentase = 36.000/800.000 × 100% = 4,5%.' }
    ]
  },

  simulator: {
    jenis: 'persen',
    cerita: 'Geser penggeser untuk mengatur persen. Petak kuning menunjukkan berapa dari 100 petak yang terisi. Selesaikan setiap misi dengan memilih persen yang tepat.',
    misi: [
      { id: 'sim-1', dasar: 200000, target: 60000, satuan: 'Rp', teks: 'Harga sepatu Rp200.000. Atur persen sampai potongannya tepat Rp60.000.' },
      { id: 'sim-2', dasar: 500, target: 125, teks: 'Dari 500 siswa, 125 siswa ikut ekskul. Atur persen yang tepat.' },
      { id: 'sim-3', dasar: 60, target: 45, teks: 'Sebuah kelas punya 60 kursi dan 45 kursi terisi. Atur persen yang tepat.' },
      { id: 'sim-4', dasar: 1500000, target: 90000, satuan: 'Rp', teks: 'Tabungan Rp1.500.000 menghasilkan bunga Rp90.000 setahun. Atur persen bunganya.' }
    ]
  },

  latihan: [
    { nama: 'Level 1: Pemanasan', pengantar: 'Soal dasar tentang mengubah bentuk dan menghitung persen.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: '25% dari 80 adalah …', jawab: 20, xp: 5, bahas: '0,25 × 80 = 20.' },
      { id: 'l1-2', tipe: 'isian', soal: 'Ubah 3/4 menjadi persen. (Tulis angkanya saja.)', jawab: 75, xp: 5, bahas: '3/4 × 100% = 75%.' },
      { id: 'l1-3', tipe: 'isian', soal: 'Ubah 8% menjadi desimal.', jawab: 0.08, xp: 5, bahas: '8% = 8/100 = 0,08.' },
      { id: 'l1-4', tipe: 'pilgan', soal: 'Yang paling kecil di antara 1/2, 45%, dan 0,48 adalah …', opsi: ['1/2', '45%', '0,48'], jawab: 1, xp: 5, bahas: '1/2 = 50%, 45%, 0,48 = 48%. Yang terkecil 45%.' },
      { id: 'l1-5', tipe: 'isian', soal: '10% dari 1.250 adalah …', jawab: 125, xp: 5, bahas: '10% berarti dibagi 10: 1.250 ÷ 10 = 125.' }
    ] },
    { nama: 'Level 2: Tantangan', pengantar: 'Mencari persentase, keseluruhan, dan perubahan.', soal: [
      { id: 'l2-1', tipe: 'isian', soal: '12 dari 48 adalah berapa persen? (Tulis angkanya saja.)', jawab: 25, xp: 10, bahas: '12/48 = 1/4 = 25%.' },
      { id: 'l2-2', tipe: 'isian', soal: '60% dari suatu bilangan adalah 36. Berapa bilangan itu?', jawab: 60, xp: 10, bahas: '36 ÷ 0,6 = 60.' },
      { id: 'l2-3', tipe: 'isian', soal: 'Harga Rp80.000 naik 15%. Berapa rupiah harga barunya?', jawab: 92000, xp: 10, satuan: 'Rp', bahas: 'Kenaikan 0,15 × 80.000 = 12.000. Harga baru 80.000 + 12.000 = 92.000.' },
      { id: 'l2-4', tipe: 'isian', soal: '8 dari 20 adalah berapa persen? (Tulis angkanya saja.)', jawab: 40, xp: 10, bahas: '8/20 = 0,4 = 40%.' }
    ] },
    { nama: 'Level 3: Problem Solving', pengantar: 'Soal cerita.', soal: [
      { id: 'l3-1', tipe: 'isian', soal: 'Toko memberi diskon 20% pada tas seharga Rp150.000. Berapa rupiah yang harus dibayar?', jawab: 120000, xp: 15, satuan: 'Rp', bahas: 'Diskon 0,2 × 150.000 = 30.000. Harga bayar 150.000 − 30.000 = 120.000.' },
      { id: 'l3-2', tipe: 'isian', soal: 'Dari 250 siswa, 60% ikut ekskul. Dari yang ikut ekskul, 40% memilih pramuka. Berapa siswa yang memilih pramuka?', jawab: 60, xp: 15, bahas: 'Ikut ekskul: 0,6 × 250 = 150. Pramuka: 0,4 × 150 = 60.' },
      { id: 'l3-3', tipe: 'isian', soal: 'Setelah diskon 25%, harga sebuah laptop menjadi Rp6.000.000. Berapa rupiah harga sebelum diskon?', jawab: 8000000, xp: 15, satuan: 'Rp', bahas: 'Harga bayar adalah 75% dari harga awal. Harga awal = 6.000.000 ÷ 0,75 = 8.000.000.' }
    ] },
    { nama: 'Level 4: MathLife Challenge', pengantar: 'Soal paling menantang.', soal: [
      { id: 'l4-1', tipe: 'isian', soal: 'Harga naik 20% lalu turun 20%. Harga akhir adalah berapa persen dari harga awal? (Tulis angkanya saja.)', jawab: 96, xp: 25,
        bahas: 'Misalkan harga awal 100. Naik 20% menjadi 120. Turun 20% dari 120 adalah 24, jadi 96. Harga akhir 96% dari harga awal.' },
      { id: 'l4-2', tipe: 'isian', soal: 'Tabungan Rp5.000.000 berbunga tunggal 6% per tahun. Setelah berapa tahun bunganya mencapai Rp900.000?', jawab: 3, xp: 25,
        bahas: 'Bunga per tahun = 5.000.000 × 0,06 = 300.000. Lama menabung = 900.000 ÷ 300.000 = 3 tahun.' }
    ] }
  ],

  evaluasi: [
    { judul: 'Pilihan ganda', soal: [
      { id: 'ev-pg-1', tipe: 'pilgan', soal: '0,075 sama dengan … persen.', opsi: ['75%', '7,5%', '0,75%', '0,075%'], jawab: 1, bahas: '0,075 × 100% = 7,5%.' },
      { id: 'ev-pg-2', tipe: 'pilgan', soal: '35% dari 480 adalah …', opsi: ['148', '158', '168', '178'], jawab: 2, bahas: '0,35 × 480 = 168.' },
      { id: 'ev-pg-3', tipe: 'pilgan', soal: 'Dari 80 siswa, 28 siswa menyukai basket. Persentasenya adalah …', opsi: ['28%', '35%', '40%', '45%'], jawab: 1, bahas: '28/80 × 100% = 35%.' },
      { id: 'ev-pg-4', tipe: 'pilgan', soal: 'Setelah diskon 30%, harga sebuah baju Rp140.000. Harga sebelum diskon adalah …', opsi: ['Rp182.000', 'Rp196.000', 'Rp200.000', 'Rp210.000'], jawab: 2,
        bahas: 'Harga bayar adalah 70% dari harga awal. Harga awal = 140.000 ÷ 0,7 = 200.000.' }
    ] },
    { judul: 'Benar atau salah', soal: [
      { id: 'ev-bs-1', tipe: 'bs', soal: '0,5% sama dengan 1/2.', jawab: false, bahas: '0,5% = 0,5/100 = 0,005. Sedangkan 1/2 = 50%.' },
      { id: 'ev-bs-2', tipe: 'bs', soal: 'Naik 50% lalu turun 50% mengembalikan ke nilai awal.', jawab: false, bahas: '100 naik 50% jadi 150, lalu turun 50% jadi 75.' },
      { id: 'ev-bs-3', tipe: 'bs', soal: '100% dari suatu bilangan adalah bilangan itu sendiri.', jawab: true, bahas: '100% = 100/100 = 1, dan 1 kali bilangan adalah bilangan itu sendiri.' }
    ] },
    { judul: 'Isian singkat', soal: [
      { id: 'ev-is-1', tipe: 'isian', soal: '(15% dari 200) + (40% dari 50) = …', jawab: 50, bahas: '15% dari 200 = 30 dan 40% dari 50 = 20. Jumlahnya 50.' },
      { id: 'ev-is-2', tipe: 'isian', satuan: 'Rp', soal: 'Bunga tunggal 8% per tahun dari Rp1.500.000 selama 2 tahun adalah berapa rupiah?', jawab: 240000, bahas: '1.500.000 × 0,08 × 2 = 240.000.' }
    ] },
    { judul: 'Uraian', soal: [
      { id: 'ev-ur-1', tipe: 'uraian', soal: 'Jelaskan mengapa harga naik 20% lalu turun 20% tidak kembali ke harga awal.',
        kunci: 'Persen kedua dihitung dari harga yang sudah berubah. Misalkan 100, naik 20% menjadi 120. Turun 20% dari 120 adalah 24, jadi harganya 96, bukan 100.' }
    ] },
    { judul: 'Masalah kontekstual', soal: [
      { id: 'ev-ko-1', tipe: 'isian', satuan: 'Rp', soal: 'Sebuah ponsel berharga Rp3.000.000. Toko memberi diskon 10%, lalu ada kupon potongan 5% dari harga setelah diskon. Berapa rupiah yang harus dibayar?', jawab: 2565000,
        bahas: 'Setelah diskon 10%: 3.000.000 × 0,9 = 2.700.000. Setelah kupon 5%: 2.700.000 × 0,95 = 2.565.000.' }
    ] }
  ]
};
