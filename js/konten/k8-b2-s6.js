// Kelas 8 · Bab 2 Relasi, Fungsi & Persamaan · Subbab 2.6 Metode Substitusi
// Diubah dari worksheet 5.3 (prototipe lama) ke format langkah per layar.
window.KONTEN = window.KONTEN || {};
window.KONTEN['k8-b2-s6'] = {
 "judul": "Metode Substitusi",
 "badge": {
  "nama": "Penukar Variabel",
  "syarat": "Tandai materi selesai, lalu benar minimal 70% di Latihan."
 },
 "konsep": [
  {
   "t": "h",
   "x": "Mengganti satu variabel dengan \"kembarannya\""
  },
  {
   "t": "p",
   "x": "Nyatakan satu variabel dalam bentuk variabel lain (misalnya x=...), lalu substitusikan ke persamaan kedua sampai tersisa satu variabel."
  },
  {
   "t": "kotak",
   "warna": "mint",
   "x": "Substitusi = \"meminjam\" bentuk x dari satu persamaan, ditaruh di persamaan lain."
  }
 ],
 "contoh": [
  {
   "t": "langkah",
   "judul": "SPLDV yang sama, cara baru",
   "soal": "2x+y=8 dan x−y=1 (sama seperti 5.2).",
   "steps": [
    {
     "lab": "Langkah 1 · Pilih persamaan termudah",
     "body": "x−y=1 → x=y+1 (koefisien x sudah 1)."
    },
    {
     "lab": "Langkah 2 · Substitusikan",
     "body": "2(y+1)+y=8"
    },
    {
     "lab": "Langkah 3 · Selesaikan",
     "body": "2y+2+y=8 → 3y=6 → y=2"
    },
    {
     "lab": "Langkah 4 · Cari variabel lain",
     "body": "x=y+1=3"
    },
    {
     "lab": "Langkah 5 · Periksa",
     "body": "2(3)+2=8 ✓, 3−2=1 ✓ — (3,2), sama seperti grafik."
    }
   ]
  }
 ],
 "mini": [
  {
   "id": "mini-1",
   "tipe": "pilgan",
   "soal": "Letak kesalahannya?",
   "opsi": [
    "Salah pindah −2 (seharusnya 5x=10, x=2)",
    "Salah substitusi y",
    "Persamaan awal salah",
    "Tidak ada yang salah"
   ],
   "jawab": 0,
   "bahas": "−2 dipindah jadi +2 di ruas kanan: 5x=10, x=2. Kesalahan umum: lupa ubah tanda saat memindahkan suku.",
   "xp": 10,
   "kerjaan": [
    "y=3x−2 dan 2x+y=8",
    "2x+3x−2=8",
    "5x=8",
    "x=1,6"
   ]
  },
  {
   "id": "mini-2",
   "tipe": "pilgan",
   "soal": "Letak kesalahannya?",
   "opsi": [
    "Persamaan pertama salah",
    "Seharusnya 2(10−y)−y=5, bukan cuma angka 10",
    "Tanda minus salah",
    "y=15 sudah benar"
   ],
   "jawab": 1,
   "bahas": "Kesalahan umum: hanya mengganti sebagian bentuk \"(10−y)\", padahal seharusnya seluruh bentuk itu menggantikan x.",
   "xp": 10,
   "kerjaan": [
    "x+y=10, 2x−y=5",
    "x=10−y",
    "2(10)−y=5",
    "y=15"
   ]
  },
  {
   "id": "mini-3",
   "tipe": "pilgan",
   "soal": "4x+3y=26 dan x+5y=21 — persamaan mana lebih baik diubah \"x=...\" dulu?",
   "opsi": [
    "4x+3y=26",
    "x+5y=21, koefisien x sudah 1",
    "Sama saja",
    "Tidak bisa disubstitusi"
   ],
   "jawab": 1,
   "bahas": "Koefisien 1 membuat langkah lebih ringkas tanpa membagi.",
   "xp": 10
  },
  {
   "id": "mini-4",
   "tipe": "pilgan",
   "soal": "Hasil substitusi berujung 0=4. Artinya?",
   "opsi": [
    "x=4",
    "Tidak ada penyelesaian",
    "Solusi tak terhingga",
    "Ulangi, jawabannya pasti ada"
   ],
   "jawab": 1,
   "bahas": "Pernyataan yang tidak pernah benar menandakan dua garis sejajar — tidak ada penyelesaian.",
   "xp": 10
  }
 ],
 "game": {
  "jenis": "misi",
  "cerita": "Misi di toko kaos kaki & topi. Kerjakan langkahnya satu per satu.",
  "babak": [
   {
    "id": "game-1",
    "tipe": "pilgan",
    "soal": "Persamaan mana paling praktis diubah \"x=...\" dulu?",
    "opsi": [
     "3x+y=38.000",
     "x+2y=31.000, koefisien x sudah 1",
     "Sama saja",
     "Tidak bisa ditentukan"
    ],
    "jawab": 1,
    "bahas": "Koefisien x sudah 1 pada x+2y=31.000.",
    "xp": 10,
    "judul": "Toko kaos kaki & topi · langkah 1",
    "narasi": [
     "3x+y=38.000 dan x+2y=31.000 (x=kaos kaki, y=topi)."
    ]
   },
   {
    "id": "game-2",
    "tipe": "pilgan",
    "soal": "Ubah x+2y=31.000 jadi \"x=...\". Hasilnya?",
    "opsi": [
     "x=31.000+2y",
     "x=31.000−2y",
     "x=2y−31.000",
     "x=31.000/2y"
    ],
    "jawab": 1,
    "bahas": "Pindahkan 2y dengan mengubah tanda: x=31.000−2y.",
    "xp": 10,
    "judul": "Toko kaos kaki & topi · langkah 2",
    "narasi": [
     "3x+y=38.000 dan x+2y=31.000 (x=kaos kaki, y=topi)."
    ]
   },
   {
    "id": "game-3",
    "tipe": "pilgan",
    "soal": "Substitusikan ke 3x+y=38.000 dan selesaikan. Harga kaos kaki & topi?",
    "opsi": [
     "Kaos kaki Rp9.000, topi Rp11.000",
     "Kaos kaki Rp11.000, topi Rp9.000",
     "Rp10.000 keduanya",
     "Kaos kaki Rp12.000, topi Rp7.000"
    ],
    "jawab": 0,
    "bahas": "3(31.000−2y)+y=38.000 → −5y=−55.000 → y=11.000, x=9.000.",
    "xp": 10,
    "judul": "Toko kaos kaki & topi · langkah 3",
    "narasi": [
     "3x+y=38.000 dan x+2y=31.000 (x=kaos kaki, y=topi)."
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
     "soal": "y=2x+1 dan 3x+y=16. Langkah substitusi yang benar?",
     "opsi": [
      "3x+2x+1=16",
      "3x+y+1=16",
      "3x+2x=16",
      "y+2x+1=16"
     ],
     "jawab": 0,
     "bahas": "Ganti y dengan (2x+1): 3x+2x+1=16.",
     "xp": 10
    },
    {
     "id": "l1-2",
     "tipe": "pilgan",
     "soal": "x=5−y dan 2x+3y=13. Nilai x dan y?",
     "opsi": [
      "x=2,y=3",
      "x=3,y=2",
      "x=5,y=0",
      "x=1,y=4"
     ],
     "jawab": 0,
     "bahas": "2(5−y)+3y=13 → 10+y=13 → y=3, x=2.",
     "xp": 10
    },
    {
     "id": "l1-3",
     "tipe": "pilgan",
     "soal": "Kenapa substitusi presisi dibanding grafik?",
     "opsi": [
      "Dihitung aljabar, tidak bergantung ketelitian gambar",
      "Selalu bulat",
      "Grafik tidak pernah akurat",
      "Tidak perlu diperiksa"
     ],
     "jawab": 0,
     "bahas": "Substitusi murni perhitungan aljabar, presisi walau pecahan.",
     "xp": 10
    }
   ]
  }
 ]
};
