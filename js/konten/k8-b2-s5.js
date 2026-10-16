// Kelas 8 · Bab 2 Relasi, Fungsi & Persamaan · Subbab 2.5 Metode Grafik
// Diubah dari worksheet 5.2 (prototipe lama) ke format langkah per layar.
window.KONTEN = window.KONTEN || {};
window.KONTEN['k8-b2-s5'] = {
 "judul": "Metode Grafik",
 "badge": {
  "nama": "Pelukis Titik Potong",
  "syarat": "Tandai materi selesai, lalu benar minimal 70% di Latihan."
 },
 "konsep": [
  {
   "t": "h",
   "x": "Menyelesaikan SPLDV dengan menggambar"
  },
  {
   "t": "p",
   "x": "Tiap persamaan linear dua variabel, kalau digambar, bentuknya garis lurus. Solusi SPLDV adalah titik potong kedua garis."
  },
  {
   "t": "kotak",
   "warna": "mint",
   "x": "Titik potong dua garis = solusi SPLDV."
  },
  {
   "t": "p",
   "x": "Batasannya: kalau solusinya pecahan atau besar, titik potongnya susah dibaca tepat — makanya ada substitusi dan eliminasi yang selalu presisi."
  }
 ],
 "contoh": [
  {
   "t": "langkah",
   "judul": "Menggambar dan membaca titik potong",
   "soal": "Selesaikan dengan grafik: 2x+y=8 dan x−y=1.",
   "steps": [
    {
     "lab": "Langkah 1 · Cari titik bantu",
     "body": "2x+y=8: (0,8) dan (4,0). x−y=1: (1,0) dan (9,8)."
    },
    {
     "lab": "Langkah 2 · Gambar kedua garis",
     "body": "Hubungkan titik-titik tiap persamaan jadi satu garis lurus."
    },
    {
     "lab": "Langkah 3 · Baca titik potong",
     "body": "Kedua garis bertemu di (3, 2)."
    },
    {
     "lab": "Langkah 4 · Periksa",
     "body": "2(3)+2=8 ✓, 3−2=1 ✓ — (3,2) memang solusinya."
    }
   ]
  }
 ],
 "mini": [
  {
   "id": "mini-1",
   "tipe": "pilgan",
   "soal": "Dua garis SPLDV ternyata sejajar. Artinya?",
   "opsi": [
    "Solusinya (0,0)",
    "Tidak ada penyelesaian",
    "Solusi tak terhingga",
    "Grafik tidak bisa dipakai"
   ],
   "jawab": 1,
   "bahas": "Garis sejajar tidak pernah berpotongan, jadi tidak ada (x,y) yang memenuhi keduanya.",
   "xp": 10
  },
  {
   "id": "mini-2",
   "tipe": "pilgan",
   "soal": "Dua persamaan membentuk garis yang sama persis (berimpit). Artinya?",
   "opsi": [
    "Tidak ada penyelesaian",
    "Hanya (0,0)",
    "Tak terhingga banyak penyelesaian",
    "Otomatis salah"
   ],
   "jawab": 2,
   "bahas": "Setiap titik pada garis itu memenuhi kedua persamaan — tak terhingga solusi.",
   "xp": 10
  }
 ],
 "game": {
  "jenis": "misi",
  "cerita": "Misi di kios jus buah. Gunakan hasil yang sudah ada untuk menjawab.",
  "babak": [
   {
    "id": "game-1",
    "tipe": "pilgan",
    "soal": "Titik potongnya (6,4). Berapa harga satu jus dan satu roti?",
    "opsi": [
     "Jus Rp6.000, roti Rp4.000",
     "Jus Rp4.000, roti Rp6.000",
     "Jus Rp8.000, roti Rp2.000",
     "Jus Rp5.000, roti Rp5.000"
    ],
    "jawab": 0,
    "bahas": "x=6 → jus Rp6.000, y=4 → roti Rp4.000. Periksa: 2(6)+4=16 ✓ dan 6+2(4)=14 ✓.",
    "xp": 10,
    "judul": "Kios jus buah",
    "narasi": [
     "2x+y=16 dan x+2y=14 (x=jus, y=roti, ribuan). Grafiknya sudah digambar kasir, titik potongnya (6,4)."
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
     "soal": "SPLDV 3x+y=10 dan x−y=2 berpotongan di (3,1). Artinya?",
     "opsi": [
      "(3,1) solusi karena memenuhi keduanya",
      "Cuma memenuhi satu persamaan",
      "Tidak ada hubungannya",
      "Titik potong bukan solusi"
     ],
     "jawab": 0,
     "bahas": "3(3)+1=10 ✓ dan 3−1=2 ✓ — (3,1) memang solusi.",
     "xp": 10
    },
    {
     "id": "l1-2",
     "tipe": "pilgan",
     "soal": "Titik bantu paling praktis untuk menggambar 4x+2y=20 adalah...",
     "opsi": [
      "Titik potong sumbu x dan y",
      "(100,100) dan (200,200)",
      "(5,5) saja",
      "Tidak perlu titik bantu"
     ],
     "jawab": 0,
     "bahas": "Titik potong sumbu paling mudah dihitung.",
     "xp": 10
    },
    {
     "id": "l1-3",
     "tipe": "pilgan",
     "soal": "Kalau titik potongnya pecahan, apa tantangan metode grafik?",
     "opsi": [
      "Tidak bisa dipakai sama sekali",
      "Sulit dibaca tepat dari gambar",
      "Persamaannya jadi tidak linear",
      "Pasti tidak ada solusi"
     ],
     "jawab": 1,
     "bahas": "Ini alasan substitusi/eliminasi penting — tetap presisi walau solusinya pecahan.",
     "xp": 10
    }
   ]
  }
 ]
};
