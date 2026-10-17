// Kelas 9 · Bab 3 Geometri Lanjutan · Subbab 3.2 Kekongruenan (versi ringkas)
window.KONTEN = window.KONTEN || {};
window.KONTEN['k9-b3-s2'] = {
  judul: 'Kekongruenan',
  badge: { nama: 'Pemasang Ubin', syarat: 'Tandai materi selesai, lalu benar minimal 70% di Latihan.' },

  konsep: [
    { t: 'h', x: 'Kongruen' },
    { t: 'p', x: 'Dua bangun kongruen jika bentuk dan ukurannya sama persis: sudut-sudut yang bersesuaian sama besar dan sisi-sisi yang bersesuaian sama panjang. Kongruen adalah kasus khusus sebangun dengan faktor skala k = 1. Lambangnya ≅.' },
    { t: 'kotak', warna: 'biru', judul: 'Urutan huruf menunjukkan pasangannya',
      x: 'Segitiga ABC ≅ segitiga PQR berarti A↔P, B↔Q, C↔R. Jadi AB = PQ, BC = QR, AC = PR, dan ∠A = ∠P, ∠B = ∠Q, ∠C = ∠R.' },
    { t: 'h', x: 'Syarat dua segitiga kongruen' },
    { t: 'tabel', kepala: ['Syarat', 'Artinya'], baris: [
      ['Sisi-Sisi-Sisi (SSS)', 'Tiga pasang sisi bersesuaian sama panjang.'],
      ['Sisi-Sudut-Sisi (SAS)', 'Dua pasang sisi dan sudut yang diapit kedua sisi itu sama besar.'],
      ['Sudut-Sisi-Sudut (ASA)', 'Dua pasang sudut dan sisi di antara kedua sudut itu sama.'],
      ['Sudut-Sudut-Sisi (AAS)', 'Dua pasang sudut dan sisi yang bukan di antara kedua sudut itu sama.']
    ] },
    { t: 'kotak', warna: 'krem', judul: 'Hati-hati',
      x: 'Tiga sudut yang sama (AAA) hanya menjamin sebangun, bukan kongruen. Dua sisi dan satu sudut yang tidak diapit kedua sisi itu juga belum cukup.' }
  ],

  contoh: [
    { t: 'langkah', judul: 'Contoh 1: Menentukan syarat kongruen',
      soal: 'Segitiga ABC: AB = 5 cm, BC = 7 cm, ∠B = 60°. Segitiga PQR: PQ = 5 cm, QR = 7 cm, ∠Q = 60°. Apakah keduanya kongruen?',
      steps: [
        { lab: 'Langkah 1 · Pasangkan titik sudut', body: 'Sudut 60° berada di B dan di Q, jadi B bersesuaian dengan Q.' },
        { lab: 'Langkah 2 · Periksa sisi dan sudut', body: 'AB = PQ = 5 cm dan BC = QR = 7 cm. Sudut yang diapit kedua sisi itu sama, yaitu ∠B = ∠Q = 60°.' },
        { lab: 'Langkah 3 · Tentukan syarat', body: 'Dua sisi dan sudut yang diapitnya sama, jadi syaratnya SAS.' },
        { lab: 'Langkah 4 · Simpulkan', body: 'Segitiga ABC ≅ segitiga PQR. Akibatnya AC = PR dan sudut-sudut lainnya juga bersesuaian sama.' }
      ] },
    { t: 'langkah', judul: 'Contoh 2: Memakai hasil kongruen',
      soal: 'Segitiga KLM ≅ segitiga XYZ dengan KL = 9 cm, ∠L = 75°, dan YZ = 12 cm. Tentukan XY, ∠Y, dan LM.',
      steps: [
        { lab: 'Langkah 1 · Pasangkan titik', body: 'K↔X, L↔Y, M↔Z.' },
        { lab: 'Langkah 2 · Sisi', body: 'XY bersesuaian dengan KL, jadi XY = 9 cm. LM bersesuaian dengan YZ, jadi LM = 12 cm.' },
        { lab: 'Langkah 3 · Sudut', body: '∠Y bersesuaian dengan ∠L, jadi ∠Y = 75°.' }
      ] }
  ],

  mini: [
    { id: 'mini-1', tipe: 'pilgan', soal: 'Dua segitiga mempunyai tiga pasang sisi bersesuaian yang sama panjang. Syarat kongruennya adalah …', opsi: ['SSS', 'SAS', 'ASA', 'AAS'], jawab: 0, bahas: 'Tiga sisi yang sama panjang adalah syarat sisi-sisi-sisi (SSS).' },
    { id: 'mini-2', tipe: 'bs', soal: 'Dua segitiga yang ketiga sudutnya sama pasti kongruen.', jawab: false, bahas: 'Sudut yang sama hanya menjamin sebangun. Ukurannya bisa berbeda, jadi belum tentu kongruen.' },
    { id: 'mini-3', tipe: 'isian', soal: 'Segitiga ABC ≅ segitiga PQR. Jika AB = 7 cm dan QR = 9 cm, berapa cm panjang BC?', jawab: 9, bahas: 'BC bersesuaian dengan QR, jadi BC = QR = 9 cm.' }
  ],

  game: {
    jenis: 'misi',
    cerita: 'Kamu tukang ubin. Pakai sifat kongruen untuk memesan ubin pengganti yang tepat.',
    babak: [
      { id: 'game-1', judul: 'Ubin pengganti', narasi: ['Ubin segitiga ABC punya sisi AB = 30 cm, BC = 40 cm, AC = 50 cm. Ubin pengganti PQR kongruen dengan ABC (A↔P, B↔Q, C↔R).'],
        tipe: 'isian', satuan: 'cm', soal: 'Berapa cm panjang sisi QR?', jawab: 40, bahas: 'QR bersesuaian dengan BC, jadi QR = 40 cm.' },
      { id: 'game-2', judul: 'Keping logam', narasi: ['Dua keping logam berbentuk segitiga siku-siku kongruen. Keping pertama punya sudut lancip 35°.'],
        tipe: 'isian', satuan: '°', soal: 'Berapa derajat sudut lancip lainnya pada keping kedua?', jawab: 55, bahas: 'Jumlah sudut segitiga 180°, sudut siku-siku 90°. Sudut lancip lainnya 180° − 90° − 35° = 55°. Pada keping kedua juga 55° karena kongruen.' },
      { id: 'game-3', judul: 'Sisi yang hilang', narasi: ['Dua ubin segitiga kongruen. Ubin pertama berkeliling 36 cm dengan dua sisi 10 cm dan 12 cm.'],
        tipe: 'isian', satuan: 'cm', soal: 'Berapa cm panjang sisi ketiga ubin kedua?', jawab: 14, bahas: 'Sisi ketiga ubin pertama = 36 − 10 − 12 = 14 cm. Ubin kedua kongruen, jadi sisi ketiganya juga 14 cm.' }
    ]
  },

  latihan: [
    { nama: 'Latihan', pengantar: 'Soal-soal untuk menguji pemahamanmu.', soal: [
      { id: 'l1-1', tipe: 'isian', soal: 'Segitiga ABC ≅ segitiga PQR. Jika ∠A = 48°, berapa derajat ∠P?', jawab: 48, xp: 5, bahas: 'A bersesuaian dengan P, jadi ∠P = ∠A = 48°.' },
      { id: 'l1-2', tipe: 'pilgan', soal: 'Jika segitiga ABC ≅ segitiga DEF, sisi yang sama panjang dengan AC adalah …', opsi: ['DF', 'DE', 'EF', 'AB'], jawab: 0, xp: 5, bahas: 'A↔D dan C↔F, jadi AC bersesuaian dengan DF.' },
      { id: 'l1-3', tipe: 'pilgan', soal: 'Dua segitiga mempunyai sudut 40° dan 60°, serta sisi di antara kedua sudut itu sama-sama 8 cm. Syarat kongruennya adalah …', opsi: ['ASA', 'SSS', 'SAS', 'AAS'], jawab: 0, xp: 10, bahas: 'Dua sudut dan sisi di antara keduanya sama, yaitu syarat sudut-sisi-sudut (ASA).' },
      { id: 'l1-4', tipe: 'isian', soal: 'Dua persegi kongruen. Sisi persegi pertama 9 cm. Berapa cm keliling persegi kedua?', jawab: 36, xp: 10, bahas: 'Kongruen berarti ukurannya sama, jadi sisi persegi kedua juga 9 cm. Keliling = 4 × 9 = 36 cm.' },
      { id: 'l1-5', tipe: 'isian', soal: 'Segitiga KLM ≅ segitiga XYZ. Jika ∠K = 50° dan ∠L = 70°, berapa derajat ∠Z?', jawab: 60, xp: 15, bahas: '∠M = 180° − 50° − 70° = 60°. Z bersesuaian dengan M, jadi ∠Z = 60°.' },
      { id: 'l1-6', tipe: 'bs', soal: 'Setiap dua bangun yang kongruen pasti sebangun.', jawab: true, xp: 15, bahas: 'Kongruen adalah kasus khusus sebangun dengan faktor skala 1, jadi pasti sebangun.' }
    ] }
  ]
};
