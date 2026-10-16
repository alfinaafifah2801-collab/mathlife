// Kelas 8 · Bab 2 Relasi, Fungsi & Persamaan · Subbab 2.4 Mengenal SPLDV
// Diubah dari worksheet 5.1 (prototipe lama) ke format langkah per layar.
window.KONTEN = window.KONTEN || {};
window.KONTEN['k8-b2-s4'] = {
 "judul": "Mengenal SPLDV",
 "badge": {
  "nama": "Pemula SPLDV",
  "syarat": "Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi."
 },
 "kenalan": [
  {
   "t": "h",
   "x": "SPLDV itu apa, sih?"
  },
  {
   "t": "p",
   "x": "SPLDV singkatan dari Sistem Persamaan Linear Dua Variabel. Ada dua hal yang belum kamu tahu nilainya, dan kamu punya dua informasi tentang keduanya sekaligus — dua persamaan yang harus benar bersama-sama."
  },
  {
   "t": "kotak",
   "warna": "biru",
   "x": "Kata kunci: dua variabel belum diketahui, dua persamaan yang harus dipenuhi sekaligus."
  }
 ],
 "nyata": {
  "blok": [
   {
    "t": "h",
    "x": "Patungan jajan yang bikin bingung"
   },
   {
    "t": "p",
    "x": "Reno beli 2 pensil dan 1 penghapus, totalnya Rp13.000. Sinta beli 1 pensil dan 3 penghapus, totalnya Rp14.000. Berapa harga masing-masing?"
   },
   {
    "t": "kotak",
    "warna": "krem",
    "x": "Kalau cuma tahu transaksi Reno saja, ada banyak kemungkinan harga yang cocok. Baru setelah tahu transaksi Sinta juga, kemungkinannya menyempit jadi satu jawaban — itulah kenapa dibutuhkan dua persamaan."
   }
  ],
  "soal": []
 },
 "konsep": [
  {
   "t": "h",
   "x": "Bentuk umum SPLDV"
  },
  {
   "t": "p",
   "x": "Kasus Reno & Sinta: 2x + y = 13.000 dan x + 3y = 14.000 (x = harga pensil, y = harga penghapus). Bentuk umumnya:"
  },
  {
   "t": "kotak",
   "warna": "biru",
   "judul": "Bentuk umum",
   "x": [
    "ax + by = c",
    "dx + ey = f"
   ]
  },
  {
   "t": "tabel",
   "kepala": [
    "Istilah",
    "Arti"
   ],
   "baris": [
    [
     "Variabel",
     "Huruf mewakili nilai yang dicari, misalnya x dan y."
    ],
    [
     "Koefisien",
     "Angka di depan variabel."
    ],
    [
     "Konstanta",
     "Angka yang berdiri sendiri di ruas kanan."
    ]
   ]
  },
  {
   "t": "kotak",
   "warna": "biru",
   "x": "Ciri-ciri: dua variabel berbeda, pangkat semua variabel 1, dua persamaan berlaku sekaligus."
  }
 ],
 "contoh": [
  {
   "t": "langkah",
   "judul": "Mengubah cerita jadi bentuk SPLDV",
   "soal": "Fira membeli 3 buku + 2 pulpen = Rp23.000. Devi membeli 1 buku + 4 pulpen = Rp21.000. Tulis sebagai SPLDV.",
   "steps": [
    {
     "lab": "Langkah 1 · Apa yang diketahui?",
     "body": "Fira: 3 buku + 2 pulpen = Rp23.000. Devi: 1 buku + 4 pulpen = Rp21.000."
    },
    {
     "lab": "Langkah 2 · Apa yang ditanyakan?",
     "body": "Harga satu buku dan satu pulpen."
    },
    {
     "lab": "Langkah 3 · Memisalkan variabel",
     "body": "Misalkan harga buku = x, harga pulpen = y."
    },
    {
     "lab": "Langkah 4 · Menyusun persamaan",
     "body": "Fira → 3x + 2y = 23.000 ; Devi → x + 4y = 21.000"
    },
    {
     "lab": "Langkah 5 · Memeriksa bentuk SPLDV",
     "body": "Dua variabel ✓, pangkat 1 ✓, dua persamaan sekaligus ✓ — SPLDV-nya benar, siap dicari solusinya di 5.2–5.4."
    }
   ]
  }
 ],
 "mini": [
  {
   "id": "mini-1",
   "tipe": "pilgan",
   "soal": "Toko alat tulis: 2 buku + 3 pensil = Rp26.000, dan 4 buku + 1 pensil = Rp32.000. Manakah SPLDV yang benar (x=harga buku, y=harga pensil)?",
   "opsi": [
    "2x+3y=26.000 dan 4x+y=32.000",
    "2x+3y=26.000 dan x+4y=32.000",
    "3x+2y=26.000 dan y+4x=32.000",
    "2x+3y=32.000 dan 4x+y=26.000"
   ],
   "jawab": 0,
   "bahas": "Terjemahkan langsung tiap kalimat: 2x+3y=26.000 dan 4x+y=32.000.",
   "xp": 10
  }
 ],
 "latihan": [
  {
   "nama": "Level 1: Pemanasan",
   "soal": [
    {
     "id": "l1-1",
     "tipe": "pilgan",
     "soal": "Pada 5x+3y=20.000, koefisien y adalah...",
     "opsi": [
      "5",
      "3",
      "20.000",
      "y"
     ],
     "jawab": 1,
     "bahas": "Koefisien adalah angka di depan variabel, yaitu 3.",
     "xp": 5
    },
    {
     "id": "l1-2",
     "tipe": "pilgan",
     "soal": "Pada 7x+2y=18.500, konstantanya adalah...",
     "opsi": [
      "7",
      "2",
      "18.500",
      "x dan y"
     ],
     "jawab": 2,
     "bahas": "Konstanta berdiri sendiri tanpa variabel: 18.500.",
     "xp": 5
    },
    {
     "id": "l1-3",
     "tipe": "pilgan",
     "soal": "Ciri persamaan linear dua variabel adalah...",
     "opsi": [
      "Ada variabel berpangkat 2",
      "Hanya satu variabel",
      "Semua variabel berpangkat 1",
      "Tidak boleh ada angka"
     ],
     "jawab": 2,
     "bahas": "Ciri utama bentuk linear: setiap variabel berpangkat 1.",
     "xp": 5
    }
   ]
  },
  {
   "nama": "Level 2: Tantangan",
   "soal": [
    {
     "id": "l2-1",
     "tipe": "pilgan",
     "soal": "Andi beli 2 roti+1 susu=Rp17.000. Bagas beli 1 roti+2 susu=Rp16.000. Persamaan pertama (x=roti,y=susu)?",
     "opsi": [
      "x+2y=17.000",
      "2x+y=17.000",
      "2x+y=16.000",
      "x+y=17.000"
     ],
     "jawab": 1,
     "bahas": "\"2 roti+1 susu=17.000\" → 2x+y=17.000.",
     "xp": 10
    },
    {
     "id": "l2-2",
     "tipe": "pilgan",
     "soal": "Persamaan kedua yang tepat?",
     "opsi": [
      "x+2y=16.000",
      "2x+y=16.000",
      "x+2y=17.000",
      "2x+2y=16.000"
     ],
     "jawab": 0,
     "bahas": "\"1 roti+2 susu=16.000\" → x+2y=16.000.",
     "xp": 10
    },
    {
     "id": "l2-3",
     "tipe": "pilgan",
     "soal": "SPLDV 3p−q=10.000 itu sah karena...",
     "opsi": [
      "Koefisien p tidak boleh 3",
      "Variabel boleh dikurangkan, dan nama variabel bebas",
      "Konstanta tidak boleh 10.000",
      "Harus x dan y"
     ],
     "jawab": 1,
     "bahas": "Pengurangan antarsuku tetap sah, dan nama variabel bebas selama pangkatnya 1.",
     "xp": 10
    }
   ]
  },
  {
   "nama": "Level 3: Problem Solving",
   "soal": [
    {
     "id": "l3-1",
     "tipe": "pilgan",
     "soal": "2 tiket dewasa+3 tiket anak=Rp310.000, 1 tiket dewasa+2 tiket anak=Rp180.000 (a=dewasa,k=anak). SPLDV yang tepat?",
     "opsi": [
      "2a+3k=310.000 dan a+2k=180.000",
      "3a+2k=310.000 dan 2a+k=180.000",
      "2a+3k=180.000 dan a+2k=310.000",
      "a+k=310.000 dan a+k=180.000"
     ],
     "jawab": 0,
     "bahas": "Terjemahkan langsung: 2a+3k=310.000 dan a+2k=180.000.",
     "xp": 15
    },
    {
     "id": "l3-2",
     "tipe": "pilgan",
     "soal": "\"4 pensil+4 penghapus=Rp32.000\" dan \"harga pensil=harga penghapus\" — bisa dipastikan solusinya?",
     "opsi": [
      "Bisa, dua informasi berbeda tentang x dan y",
      "Tidak bisa, dua persamaan itu sama",
      "Bisa, tapi hanya kalau warnanya sama",
      "Tidak bisa karena satuannya rupiah"
     ],
     "jawab": 0,
     "bahas": "\"x=y\" dan \"4x+4y=32.000\" adalah dua informasi berbeda yang saling melengkapi — tetap SPLDV yang sah.",
     "xp": 15
    }
   ]
  },
  {
   "nama": "Level 4: MathLife Challenge",
   "soal": [
    {
     "id": "l4-1",
     "tipe": "pilgan",
     "soal": "Dua nota \"2 item A+1 item B=Rp24.000\" ternyata identik (nota kedua salinan). Apa akibatnya?",
     "opsi": [
      "Tetap bisa dipastikan harga A dan B",
      "Tidak bisa dipastikan — dua persamaan identik cuma satu informasi",
      "Harga A pasti dua kali harga B",
      "Sistem otomatis tidak valid"
     ],
     "jawab": 1,
     "bahas": "Dua persamaan yang identik hanya memberi satu informasi berbeda — sama seperti kasus Reno sendirian di awal.",
     "xp": 25
    }
   ]
  }
 ],
 "evaluasi": [
  {
   "judul": "Pilihan ganda",
   "soal": [
    {
     "id": "ev-pg-1",
     "tipe": "pilgan",
     "soal": "Yang termasuk SPLDV adalah …",
     "opsi": [
      "2x + y = 7 dan x − y = 2",
      "x² + y = 7 dan x − y = 2",
      "2x + 3 = 7 dan x = 2",
      "xy = 6 dan x + y = 5"
     ],
     "jawab": 0,
     "bahas": "SPLDV punya dua variabel berpangkat 1 dan dua persamaan. x² berpangkat 2 dan xy adalah perkalian variabel, jadi keduanya bukan linear. Pilihan ketiga hanya memuat satu variabel."
    },
    {
     "id": "ev-pg-2",
     "tipe": "pilgan",
     "soal": "Pada persamaan 4x − 3y = 12, koefisien y dan konstantanya berturut-turut adalah …",
     "opsi": [
      "−3 dan 12",
      "3 dan 12",
      "4 dan 12",
      "−3 dan 4"
     ],
     "jawab": 0,
     "bahas": "Koefisien adalah angka di depan variabel (termasuk tandanya), yaitu −3. Konstanta berdiri sendiri di ruas kanan, yaitu 12."
    },
    {
     "id": "ev-pg-3",
     "tipe": "pilgan",
     "soal": "Ani membeli 3 buku dan 1 pulpen seharga Rp17.000. Bimo membeli 1 buku dan 2 pulpen seharga Rp9.000. Dengan x = harga buku dan y = harga pulpen, SPLDV-nya adalah …",
     "opsi": [
      "3x + y = 17.000 dan x + 2y = 9.000",
      "3x + y = 9.000 dan x + 2y = 17.000",
      "x + 3y = 17.000 dan 2x + y = 9.000",
      "3x + 2y = 17.000 dan x + y = 9.000"
     ],
     "jawab": 0,
     "bahas": "Terjemahkan tiap kalimat: 3 buku + 1 pulpen = 17.000 menjadi 3x + y = 17.000, dan 1 buku + 2 pulpen = 9.000 menjadi x + 2y = 9.000."
    }
   ]
  },
  {
   "judul": "Benar atau salah",
   "soal": [
    {
     "id": "ev-bs-1",
     "tipe": "bs",
     "soal": "Persamaan x + y = 10 dan 2x + 2y = 20 memberi dua informasi yang berbeda.",
     "jawab": false,
     "bahas": "Persamaan kedua adalah persamaan pertama dikali 2, jadi keduanya identik dan hanya memberi satu informasi."
    },
    {
     "id": "ev-bs-2",
     "tipe": "bs",
     "soal": "Dalam SPLDV, nama variabel harus selalu x dan y.",
     "jawab": false,
     "bahas": "Nama variabel bebas (misalnya p dan q). Yang penting dua variabel berpangkat 1."
    }
   ]
  },
  {
   "judul": "Isian singkat",
   "soal": [
    {
     "id": "ev-is-1",
     "tipe": "isian",
     "soal": "Jika x = 4 dan y = 3, berapa nilai 2x + 5y?",
     "jawab": 23,
     "bahas": "2(4) + 5(3) = 8 + 15 = 23."
    },
    {
     "id": "ev-is-2",
     "tipe": "isian",
     "soal": "Diketahui 2x + y = 11 dan x + y = 7. Berapa nilai x? (Petunjuk: kurangkan kedua persamaan.)",
     "jawab": 4,
     "bahas": "(2x + y) − (x + y) = 11 − 7 sehingga x = 4. Lalu y = 7 − 4 = 3."
    }
   ]
  },
  {
   "judul": "Uraian",
   "soal": [
    {
     "id": "ev-ur-1",
     "tipe": "uraian",
     "soal": "Jelaskan mengapa satu persamaan saja tidak cukup untuk menentukan harga pensil dan harga penghapus.",
     "kunci": "Satu persamaan dengan dua variabel dipenuhi banyak pasangan nilai, misalnya 2x + y = 13.000. Diperlukan persamaan kedua yang berbeda supaya pasangan nilainya menyempit menjadi satu."
    }
   ]
  },
  {
   "judul": "Masalah kontekstual",
   "soal": [
    {
     "id": "ev-is-3",
     "tipe": "isian",
     "soal": "Nota 1: 2 jus + 1 roti = Rp28.000. Nota 2: 1 jus + 1 roti = Rp18.000. Berapa rupiah harga satu jus?",
     "jawab": 10000,
     "bahas": "Kurangkan nota 1 dengan nota 2: (2 jus + 1 roti) − (1 jus + 1 roti) = 28.000 − 18.000, jadi 1 jus = Rp10.000. Roti = Rp8.000.",
     "satuan": "Rp"
    }
   ]
  }
 ],
 "game": {
  "jenis": "tautan",
  "tautan": {
   "t": "tautan",
   "judul": "MathLife Game: Mall Simulator",
   "x": "Latih SPLDV lewat transaksi belanja di mall. Cari harga barang dari dua struk, lalu belanja dan bayar di kasir.",
   "href": "game.html?id=mall-simulator",
   "label": "Buka Mall Simulator"
  }
 }
};
