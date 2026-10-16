// Kelas 8 · Bab 2 Relasi, Fungsi & Persamaan · Subbab 2.9 SPLDV dalam Kehidupan
// Diubah dari worksheet 5.6 (prototipe lama) ke format langkah per layar.
window.KONTEN = window.KONTEN || {};
window.KONTEN['k8-b2-s9'] = {
 "judul": "SPLDV dalam Kehidupan",
 "badge": {
  "nama": "Detektif Struk",
  "syarat": "Tandai materi selesai, lalu benar minimal 70% di Latihan dan di Evaluasi."
 },
 "kenalan": [
  {
   "t": "h",
   "x": "Bukan cara baru — tapi kemampuan memilih"
  },
  {
   "t": "p",
   "x": "Kamu sudah punya empat cara: grafik, substitusi, eliminasi, campuran. Di sini dilatih mengenali SPLDV dari cerita sehari-hari dan memilih metode paling praktis — pemanasan sebelum Mall Simulator besar."
  }
 ],
 "nyata": {
  "blok": [
   {
    "t": "h",
    "x": "Kak Rani lupa mencatat harga"
   },
   {
    "t": "kotak",
    "warna": "krem",
    "x": "Hari 1: 2 kue coklat+3 kue keju=Rp54.000. Hari 2: 4 kue coklat+1 kue keju=Rp58.000."
   },
   {
    "t": "p",
    "x": "Kak Rani ingin tahu harga tiap kue untuk menghitung untung. Ini yang akan kamu latih: mengubah cerita jadi SPLDV, lalu memilih cara tercepat."
   }
  ],
  "soal": []
 },
 "konsep": [
  {
   "t": "h",
   "x": "Memilih metode dari bentuk angkanya"
  },
  {
   "t": "tabel",
   "kepala": [
    "Ciri-ciri",
    "Metode disarankan"
   ],
   "baris": [
    [
     "Koefisien salah satu variabel = 1",
     "Substitusi"
    ],
    [
     "Koefisien sudah sama/berlawanan tanda",
     "Eliminasi"
    ],
    [
     "Belum sama, tidak ada yang 1",
     "Campuran"
    ],
    [
     "Angka kecil, ingin visual",
     "Grafik (tetap dicek ulang)"
    ]
   ]
  }
 ],
 "contoh": [
  {
   "t": "langkah",
   "judul": "Dari cerita rombongan wisata sampai jawaban akhir",
   "soal": "Rombongan A: 3 tiket dewasa+2 tiket anak=Rp190.000. Rombongan B: 2 tiket dewasa+4 tiket anak=Rp180.000.",
   "steps": [
    {
     "lab": "Langkah 1 · Diketahui & ditanya",
     "body": "Cari harga satu tiket dewasa dan satu tiket anak."
    },
    {
     "lab": "Langkah 2 · Misalkan & susun",
     "body": "x=dewasa,y=anak. 3x+2y=190.000 dan 2x+4y=180.000."
    },
    {
     "lab": "Langkah 3 · Sederhanakan & pilih metode",
     "body": "Pers.2 dibagi 2: x+2y=90.000. Koefisien y sama → eliminasi."
    },
    {
     "lab": "Langkah 4 · Selesaikan",
     "body": "(3x+2y)−(x+2y)=190.000−90.000 → 2x=100.000 → x=50.000. Substitusi: y=20.000."
    },
    {
     "lab": "Langkah 5 · Periksa & simpulkan",
     "body": "3(50.000)+2(20.000)=190.000 ✓. Tiket dewasa Rp50.000, tiket anak Rp20.000."
    }
   ]
  }
 ],
 "mini": [
  {
   "id": "mini-1",
   "tipe": "pilgan",
   "soal": "2 nasi+1 es teh=Rp23.000. Kalau es teh Rp5.000, berapa harga nasi tanpa SPLDV penuh?",
   "opsi": [
    "Rp18.000",
    "Rp9.000",
    "Rp14.000",
    "Rp23.000"
   ],
   "jawab": 1,
   "bahas": "2 nasi=23.000−5.000=18.000, satu nasi=Rp9.000.",
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
     "soal": "Kios fotokopi: 5x+2y=13.000, 3x+y=7.000 (x=fotokopi,y=jilid) — SPLDV ini dari kalimat...",
     "opsi": [
      "5 lembar+2 jilid=13.000, dan 3 lembar+1 jilid=7.000",
      "Sudah benar seperti tertulis",
      "Terbalik antara x dan y",
      "Salah satu persamaan salah"
     ],
     "jawab": 0,
     "bahas": "Terjemahan langsung sesuai kalimat aslinya.",
     "xp": 5
    },
    {
     "id": "l1-2",
     "tipe": "pilgan",
     "soal": "Variabel x,y dalam soal cerita SPLDV biasanya mewakili...",
     "opsi": [
      "Nama barang",
      "Nilai belum diketahui yang ditanyakan",
      "Jumlah persamaan",
      "Hasil akhir yang pasti"
     ],
     "jawab": 1,
     "bahas": "x,y mewakili nilai yang dicari, biasanya harga satuan.",
     "xp": 5
    },
    {
     "id": "l1-3",
     "tipe": "pilgan",
     "soal": "\"4 kali harga buku ditambah harga pulpen = Rp45.000\" diterjemahkan...",
     "opsi": [
      "4x+y=45.000",
      "x+4y=45.000",
      "4x−y=45.000",
      "4(x+y)=45.000"
     ],
     "jawab": 0,
     "bahas": "4 kali harga buku (4x) ditambah harga pulpen (y).",
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
     "soal": "5x+3y=40 dan 5x−2y=15 — metode tercepat?",
     "opsi": [
      "Eliminasi, koefisien x sudah sama",
      "Substitusi",
      "Grafik",
      "Tidak bisa"
     ],
     "jawab": 0,
     "bahas": "Koefisien x sama-sama 5.",
     "xp": 10
    },
    {
     "id": "l2-2",
     "tipe": "pilgan",
     "soal": "x+4y=22 dan 3x−y=11 — metode tercepat?",
     "opsi": [
      "Grafik",
      "Substitusi, koefisien x sudah 1",
      "Eliminasi langsung",
      "Tidak ada bedanya"
     ],
     "jawab": 1,
     "bahas": "Koefisien x pada pers.1 sudah 1.",
     "xp": 10
    },
    {
     "id": "l2-3",
     "tipe": "pilgan",
     "soal": "4x+3y=29 dan 2x+5y=19, tidak ada yang sama/1 — metode paling cocok?",
     "opsi": [
      "Campuran",
      "Tidak bisa diselesaikan",
      "Menebak-nebak",
      "Hanya grafik"
     ],
     "jawab": 0,
     "bahas": "Kalikan salah satu persamaan dulu, gabungkan eliminasi & substitusi.",
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
     "soal": "2 nasi+1 es teh=Rp23.000, 1 nasi+2 es teh=Rp19.000. Harga masing-masing?",
     "opsi": [
      "Nasi Rp9.000, es teh Rp5.000",
      "Nasi Rp5.000, es teh Rp9.000",
      "Rp7.000 keduanya",
      "Nasi Rp11.000, es teh Rp3.000"
     ],
     "jawab": 0,
     "bahas": "Eliminasi & substitusi: y=5.000, x=9.000.",
     "xp": 15
    },
    {
     "id": "l3-2",
     "tipe": "pilgan",
     "soal": "Kak Rani: 2x+3y=54.000, 4x+y=58.000. Harga kue coklat & keju?",
     "opsi": [
      "Coklat Rp12.000, keju Rp10.000",
      "Coklat Rp10.000, keju Rp12.000",
      "Coklat Rp14.000, keju Rp8.000",
      "Coklat Rp9.000, keju Rp12.000"
     ],
     "jawab": 0,
     "bahas": "y=58.000−4x, substitusi: x=12.000, y=10.000.",
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
     "soal": "Modal: 3x+2y=82.000, x+4y=84.000 (x=tepung,y=gula/kg). 1 porsi=2kg tepung+1kg gula, dijual Rp45.000. Untung/rugi per porsi?",
     "opsi": [
      "Untung Rp4.000",
      "Rugi Rp4.000",
      "Untung Rp13.000",
      "Impas"
     ],
     "jawab": 1,
     "bahas": "y=17.000, x=16.000. Modal/porsi=2(16.000)+17.000=49.000. Dijual 45.000 → rugi Rp4.000.",
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
     "soal": "Untuk 3x + 2y = 16 dan 5x + 2y = 24, cara yang paling cepat adalah …",
     "opsi": [
      "Eliminasi, karena koefisien y sama",
      "Substitusi, karena ada koefisien 1",
      "Grafik dengan titik acak",
      "Tidak bisa diselesaikan"
     ],
     "jawab": 0,
     "bahas": "Koefisien y sama-sama 2, jadi kurangkan langsung: 2x = 8 sehingga x = 4, lalu y = 2."
    },
    {
     "id": "ev-pg-2",
     "tipe": "pilgan",
     "soal": "Untuk x + 3y = 10 dan 2x − y = 6, langkah awal yang paling praktis adalah …",
     "opsi": [
      "Mengubah x + 3y = 10 menjadi x = 10 − 3y",
      "Mengalikan persamaan pertama dengan 5",
      "Menebak nilai y",
      "Menggambar grafik tanpa titik bantu"
     ],
     "jawab": 0,
     "bahas": "Koefisien x pada persamaan pertama sudah 1, jadi substitusi paling ringkas: 2(10 − 3y) − y = 6 sehingga y = 2 dan x = 4."
    },
    {
     "id": "ev-pg-3",
     "tipe": "pilgan",
     "soal": "Harga 2 nasi dan 1 es teh Rp23.000. Harga 1 nasi dan 2 es teh Rp19.000. Harga satu nasi adalah …",
     "opsi": [
      "Rp9.000",
      "Rp5.000",
      "Rp7.000",
      "Rp11.000"
     ],
     "jawab": 0,
     "bahas": "2x + y = 23.000 dan x + 2y = 19.000. Dari persamaan pertama y = 23.000 − 2x. Substitusi: x + 46.000 − 4x = 19.000 sehingga x = 9.000."
    }
   ]
  },
  {
   "judul": "Benar atau salah",
   "soal": [
    {
     "id": "ev-bs-1",
     "tipe": "bs",
     "soal": "Jika penyelesaian SPLDV berujung pada pernyataan 0 = 5, maka SPLDV itu tidak punya penyelesaian.",
     "jawab": true,
     "bahas": "Pernyataan yang tidak pernah benar berarti kedua garis sejajar, jadi tidak ada titik potong."
    },
    {
     "id": "ev-bs-2",
     "tipe": "bs",
     "soal": "Metode grafik selalu memberi jawaban yang tepat walaupun titik potongnya pecahan.",
     "jawab": false,
     "bahas": "Titik potong pecahan sulit dibaca tepat dari gambar. Substitusi dan eliminasi tetap presisi."
    }
   ]
  },
  {
   "judul": "Isian singkat",
   "soal": [
    {
     "id": "ev-is-1",
     "tipe": "isian",
     "soal": "Selesaikan x + y = 12 dan x − y = 4. Berapa nilai x?",
     "jawab": 8,
     "bahas": "Jumlahkan kedua persamaan: 2x = 16 sehingga x = 8. Lalu y = 4."
    },
    {
     "id": "ev-is-2",
     "tipe": "isian",
     "soal": "Tiket dewasa x dan tiket anak y: 2x + y = 140.000 dan x + 2y = 130.000. Berapa rupiah harga satu tiket anak?",
     "jawab": 40000,
     "bahas": "Dari persamaan pertama y = 140.000 − 2x. Substitusi: x + 280.000 − 4x = 130.000 sehingga x = 50.000 dan y = 40.000.",
     "satuan": "Rp"
    }
   ]
  },
  {
   "judul": "Uraian",
   "soal": [
    {
     "id": "ev-ur-1",
     "tipe": "uraian",
     "soal": "Untuk 4x + y = 19 dan 2x + y = 11, metode apa yang kamu pilih dan mengapa? Selesaikan juga soalnya.",
     "kunci": "Koefisien y sama-sama 1, jadi pilih eliminasi dengan mengurangkan: 2x = 8 sehingga x = 4. Substitusi ke 2x + y = 11 menghasilkan y = 3."
    }
   ]
  },
  {
   "judul": "Masalah kontekstual",
   "soal": [
    {
     "id": "ev-is-3",
     "tipe": "isian",
     "soal": "Pelanggan A membayar Rp39.000 untuk 2 bakso dan 3 es teh. Pelanggan B membayar Rp22.000 untuk 1 bakso dan 2 es teh. Berapa rupiah harga satu bakso?",
     "jawab": 12000,
     "bahas": "x + 2y = 22.000 sehingga x = 22.000 − 2y. Substitusi ke 2x + 3y = 39.000: 44.000 − 4y + 3y = 39.000 sehingga y = 5.000 dan x = 12.000.",
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
