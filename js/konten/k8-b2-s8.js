// Kelas 8 · Bab 2 Relasi, Fungsi & Persamaan · Subbab 2.8 Metode Campuran
// Diubah dari worksheet 5.5 (prototipe lama) ke format langkah per layar.
window.KONTEN = window.KONTEN || {};
window.KONTEN['k8-b2-s8'] = {
 "judul": "Metode Campuran",
 "badge": {
  "nama": "Jago Campuran",
  "syarat": "Tandai materi selesai, lalu benar minimal 70% di Latihan."
 },
 "konsep": [
  {
   "t": "h",
   "x": "Sebenarnya, kamu sudah pernah memakainya"
  },
  {
   "t": "p",
   "x": "Langkah terakhir di 5.4 (mencari variabel kedua dengan substitusi) itu sudah metode campuran."
  },
  {
   "t": "kotak",
   "warna": "mint",
   "x": "Campuran = eliminasi untuk variabel pertama, substitusi untuk variabel kedua."
  }
 ],
 "contoh": [
  {
   "t": "langkah",
   "judul": "Soal dengan koefisien belum rapi",
   "soal": "2x+3y=16 dan 3x−y=2.",
   "steps": [
    {
     "lab": "Langkah 1 · Pilih variabel dieliminasi (Eliminasi)",
     "body": "Kalikan pers.2 dengan 3: 9x−3y=6."
    },
    {
     "lab": "Langkah 2 · Jumlahkan (Eliminasi)",
     "body": "(2x+3y)+(9x−3y)=16+6 → 11x=22"
    },
    {
     "lab": "Langkah 3 · Selesaikan (Eliminasi)",
     "body": "x=2"
    },
    {
     "lab": "Langkah 4 · Cari variabel kedua (Substitusi)",
     "body": "3(2)−y=2 → y=4"
    },
    {
     "lab": "Langkah 5 · Periksa",
     "body": "2(2)+3(4)=16 ✓, 3(2)−4=2 ✓ — (2,4), lebih cepat tanpa eliminasi dua kali."
    }
   ]
  }
 ],
 "mini": [
  {
   "id": "mini-1",
   "tipe": "pilgan",
   "soal": "Kenapa langkah terakhir pakai substitusi, bukan eliminasi lagi?",
   "opsi": [
    "Substitusi lebih cepat setelah satu variabel diketahui",
    "Eliminasi hanya boleh sekali",
    "Substitusi wajib di akhir semua soal",
    "y tidak bisa dieliminasi"
   ],
   "jawab": 0,
   "bahas": "Begitu satu variabel diketahui, substitusi lebih ringkas daripada eliminasi ulang.",
   "xp": 10
  },
  {
   "id": "mini-2",
   "tipe": "pilgan",
   "soal": "5x+2y=27 dan 3x+2y=19 — kenapa tidak perlu dikalikan dulu?",
   "opsi": [
    "Koefisien y sudah sama",
    "Koefisien x sudah sama",
    "Konstanta sudah sama",
    "Tidak bisa dieliminasi"
   ],
   "jawab": 0,
   "bahas": "Koefisien y sama-sama 2, langsung dikurangkan.",
   "xp": 10
  }
 ],
 "game": {
  "jenis": "misi",
  "cerita": "Misi di kios pulsa & paket data. Kerjakan langkahnya satu per satu.",
  "babak": [
   {
    "id": "game-1",
    "tipe": "pilgan",
    "soal": "Untuk eliminasi y, apa yang dilakukan pada persamaan kedua?",
    "opsi": [
     "Kalikan 3, koefisien y jadi −3",
     "Kalikan 2",
     "Tidak perlu dikalikan",
     "Kalikan persamaan pertama"
    ],
    "jawab": 0,
    "bahas": "−1 dikali 3 = −3, berlawanan dengan +3.",
    "xp": 10,
    "judul": "Kios pulsa & paket data · langkah 1",
    "narasi": [
     "2x+3y=160.000 dan 3x−y=20.000 (x=data, y=telepon)."
    ]
   },
   {
    "id": "game-2",
    "tipe": "pilgan",
    "soal": "Setelah jadi 9x−3y=60.000, hasil jumlah dengan 2x+3y=160.000?",
    "opsi": [
     "11x=220.000",
     "11x=100.000",
     "7x=220.000",
     "11y=220.000"
    ],
    "jawab": 0,
    "bahas": "2x+9x=11x, 160.000+60.000=220.000.",
    "xp": 10,
    "judul": "Kios pulsa & paket data · langkah 2",
    "narasi": [
     "2x+3y=160.000 dan 3x−y=20.000 (x=data, y=telepon)."
    ]
   },
   {
    "id": "game-3",
    "tipe": "pilgan",
    "soal": "x=20.000. Berapa harga paket data & telepon?",
    "opsi": [
     "Data Rp20.000, telepon Rp40.000",
     "Data Rp40.000, telepon Rp20.000",
     "Rp30.000 keduanya",
     "Data Rp25.000, telepon Rp35.000"
    ],
    "jawab": 0,
    "bahas": "3(20.000)−y=20.000 → y=40.000.",
    "xp": 10,
    "judul": "Kios pulsa & paket data · langkah 3",
    "narasi": [
     "2x+3y=160.000 dan 3x−y=20.000 (x=data, y=telepon)."
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
     "soal": "4x+3y=26 dan x+3y=14 — eliminasi pertama paling praktis?",
     "opsi": [
      "Langsung kurangkan, koefisien y sama",
      "Kalikan pers.2 dengan 4",
      "Kalikan pers.1 dengan 3",
      "Tidak bisa tanpa mengalikan"
     ],
     "jawab": 0,
     "bahas": "Koefisien y sama-sama 3.",
     "xp": 10
    },
    {
     "id": "l1-2",
     "tipe": "pilgan",
     "soal": "Didapat 3x=12, x=4. Langkah mencari y?",
     "opsi": [
      "Substitusikan x=4 ke salah satu persamaan awal",
      "Eliminasi lagi",
      "Menebak y",
      "Anggap y=4 juga"
     ],
     "jawab": 0,
     "bahas": "Substitusi ke persamaan awal, bukan eliminasi ulang.",
     "xp": 10
    },
    {
     "id": "l1-3",
     "tipe": "pilgan",
     "soal": "Keuntungan utama metode campuran dibanding eliminasi dua kali?",
     "opsi": [
      "Menghindari pengali kedua yang bikin angka makin rumit",
      "Selalu bulat",
      "Eliminasi dua kali tidak pernah bisa",
      "Tidak perlu diperiksa"
     ],
     "jawab": 0,
     "bahas": "Substitusi langsung memakai nilai yang sudah diketahui, tanpa pengali baru.",
     "xp": 10
    }
   ]
  }
 ]
};
