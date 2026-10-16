// Kelas 8 · Bab 2 Relasi, Fungsi & Persamaan · Subbab 2.7 Metode Eliminasi
// Diubah dari worksheet 5.4 (prototipe lama) ke format langkah per layar.
window.KONTEN = window.KONTEN || {};
window.KONTEN['k8-b2-s7'] = {
 "judul": "Metode Eliminasi",
 "badge": {
  "nama": "Penghilang Variabel",
  "syarat": "Tandai materi selesai, lalu benar minimal 70% di Latihan."
 },
 "konsep": [
  {
   "t": "h",
   "x": "Menghilangkan satu variabel"
  },
  {
   "t": "p",
   "x": "Kalau koefisien salah satu variabel sama besar, variabel itu bisa dihilangkan dengan menjumlah/mengurangkan."
  },
  {
   "t": "kotak",
   "warna": "mint",
   "x": "Sama tanda → kurangkan. Berlawanan tanda → jumlahkan."
  },
  {
   "t": "p",
   "x": "Kalau belum sama, kalikan salah satu persamaan dulu supaya koefisiennya sama."
  }
 ],
 "contoh": [
  {
   "t": "langkah",
   "judul": "SPLDV yang sama, cara ketiga",
   "soal": "2x+y=8 dan x−y=1.",
   "steps": [
    {
     "lab": "Langkah 1 · Periksa koefisien",
     "body": "Koefisien y: +1 dan −1, sudah berlawanan tanda."
    },
    {
     "lab": "Langkah 2 · Jumlahkan",
     "body": "(2x+y)+(x−y)=8+1 → 3x=9"
    },
    {
     "lab": "Langkah 3 · Selesaikan",
     "body": "3x=9 → x=3"
    },
    {
     "lab": "Langkah 4 · Cari variabel lain",
     "body": "2(3)+y=8 → y=2"
    },
    {
     "lab": "Langkah 5 · Periksa",
     "body": "2(3)+2=8 ✓, 3−2=1 ✓ — (3,2), sama seperti grafik dan substitusi."
    }
   ]
  }
 ],
 "mini": [
  {
   "id": "mini-1",
   "tipe": "pilgan",
   "soal": "Untuk eliminasi y dari 3x+2y=16 dan x+y=7, apa dulu?",
   "opsi": [
    "Kalikan pers.2 dengan 2",
    "Kalikan pers.1 dengan 2",
    "Langsung kurangkan",
    "Langsung jumlahkan"
   ],
   "jawab": 0,
   "bahas": "Kalikan x+y=7 dengan 2 → 2x+2y=14, koefisien y jadi sama.",
   "xp": 10
  },
  {
   "id": "mini-2",
   "tipe": "pilgan",
   "soal": "Setelah jadi 2x+2y=14, hasil (3x+2y)−(2x+2y)=16−14 adalah...",
   "opsi": [
    "x=2",
    "5x=30",
    "4y=2",
    "x=30"
   ],
   "jawab": 0,
   "bahas": "2y saling menghilangkan: x=2.",
   "xp": 10
  }
 ],
 "game": {
  "jenis": "misi",
  "cerita": "Misi di toko buah. Kerjakan langkahnya satu per satu.",
  "babak": [
   {
    "id": "game-1",
    "tipe": "pilgan",
    "soal": "Koefisien x sama-sama 2. Apa yang bisa dilakukan?",
    "opsi": [
     "Langsung dikurangkan",
     "Harus dikalikan dulu",
     "Harus dijumlahkan",
     "Tidak bisa dieliminasi"
    ],
    "jawab": 0,
    "bahas": "Koefisien sama tanda → kurangkan.",
    "xp": 10,
    "judul": "Toko buah · langkah 1",
    "narasi": [
     "2x+3y=98.000 dan 2x+y=62.000 (x=apel/kg, y=jeruk/kg)."
    ]
   },
   {
    "id": "game-2",
    "tipe": "pilgan",
    "soal": "(2x+3y)−(2x+y)=98.000−62.000 hasilnya?",
    "opsi": [
     "2y=36.000",
     "4y=36.000",
     "2y=160.000",
     "y=36.000"
    ],
    "jawab": 0,
    "bahas": "3y−y=2y, 98.000−62.000=36.000.",
    "xp": 10,
    "judul": "Toko buah · langkah 2",
    "narasi": [
     "2x+3y=98.000 dan 2x+y=62.000 (x=apel/kg, y=jeruk/kg)."
    ]
   },
   {
    "id": "game-3",
    "tipe": "pilgan",
    "soal": "y=18.000. Substitusikan, berapa harga apel & jeruk/kg?",
    "opsi": [
     "Apel Rp22.000, jeruk Rp18.000",
     "Apel Rp18.000, jeruk Rp22.000",
     "Rp20.000 keduanya",
     "Apel Rp16.000, jeruk Rp24.000"
    ],
    "jawab": 0,
    "bahas": "2x+18.000=62.000 → x=22.000.",
    "xp": 10,
    "judul": "Toko buah · langkah 3",
    "narasi": [
     "2x+3y=98.000 dan 2x+y=62.000 (x=apel/kg, y=jeruk/kg)."
    ]
   }
  ]
 },
 "latihan": [
  {
   "nama": "Latihan",
   "pengantar": "Soal-soal untuk menguji pemahamanmu.",
   "soal": [
    {
     "id": "l1-1",
     "tipe": "pilgan",
     "soal": "4x+y=19 dan 2x+y=11, variabel paling praktis dieliminasi?",
     "opsi": [
      "y, koefisien sudah sama",
      "x, angkanya besar",
      "Sama saja",
      "Tidak bisa dieliminasi"
     ],
     "jawab": 0,
     "bahas": "Koefisien y sudah sama (1), tidak perlu dikalikan.",
     "xp": 10
    },
    {
     "id": "l1-2",
     "tipe": "pilgan",
     "soal": "Hasil (4x+y)−(2x+y)=19−11 adalah...",
     "opsi": [
      "2x=8, x=4",
      "6x=30",
      "2y=8",
      "x=8"
     ],
     "jawab": 0,
     "bahas": "4x−2x=2x, 19−11=8.",
     "xp": 10
    },
    {
     "id": "l1-3",
     "tipe": "pilgan",
     "soal": "Kapan eliminasi lebih cepat dibanding substitusi?",
     "opsi": [
      "Koefisien salah satu variabel sudah sama/berlawanan tanda",
      "Selalu lebih cepat",
      "Hanya kalau konstanta sama",
      "Tidak pernah sama hasilnya dgn substitusi"
     ],
     "jawab": 0,
     "bahas": "Kalau koefisiennya sudah cocok, eliminasi bisa langsung dilakukan.",
     "xp": 10
    }
   ]
  }
 ]
};
