// Game Math Bank: kamu teller bank. Tiap nasabah membawa satu soal. Soal dibuat acak, jadi bisa dimainkan berulang.
window.GAMES = window.GAMES || {};
(function () {
  const rnd = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
  const pilih = (arr) => arr[rnd(0, arr.length - 1)];
  const kel = (a, b, langkah) => a + langkah * rnd(0, Math.round((b - a) / langkah));
  const rp = (n) => (n < 0 ? '\u2212' : '') + 'Rp' + Math.abs(n).toLocaleString('id-ID');
  const NAMA = ['Bu Sari', 'Pak Joko', 'Dina', 'Rafi', 'Bu Wati', 'Pak Anto', 'Sinta', 'Budi', 'Mbak Lia', 'Mas Dani', 'Bu Ratna', 'Pak Hendra'];

  // ---------- Level 1: bilangan bulat (saldo bisa negatif) ----------
  function saldoAkhir() {
    const awal = kel(-20000, 100000, 5000);
    const n = rnd(2, 3);
    const trx = [];
    for (let i = 0; i < n; i += 1) {
      const jml = kel(5000, 60000, 5000);
      trx.push(Math.random() < 0.5 ? jml : -jml);
    }
    let saldo = awal;
    const langkah = [];
    trx.forEach((t) => {
      const baru = saldo + t;
      langkah.push(rp(saldo) + (t < 0 ? ' \u2212 ' : ' + ') + rp(Math.abs(t)) + ' = ' + rp(baru));
      saldo = baru;
    });
    return {
      narasi: ['Saldo awal: ' + rp(awal), ...trx.map((t) => (t < 0 ? 'Tarik tunai: \u2212' : 'Setor tunai: +') + rp(Math.abs(t)))],
      tanya: 'Berapa saldo akhir nasabah?', jawab: saldo, satuan: 'Rp',
      petunjuk: 'Kerjakan transaksi satu per satu dari atas. Setor menambah, tarik mengurangi.',
      bahas: ['Hitung berurutan: ' + langkah.join(', lalu ') + '.']
    };
  }
  function selisihSaldo() {
    const a = kel(10000, 100000, 5000);
    const b = -kel(5000, 50000, 5000);
    const n1 = pilih(NAMA);
    const n2 = pilih(NAMA.filter((x) => x !== n1));
    return {
      narasi: ['Saldo ' + n1 + ': ' + rp(a), 'Saldo ' + n2 + ': ' + rp(b)],
      tanya: 'Berapa selisih saldo keduanya? (yang lebih besar dikurangi yang lebih kecil)', jawab: a - b, satuan: 'Rp',
      petunjuk: 'Mengurangi bilangan negatif sama dengan menambah lawannya.',
      bahas: ['Selisih = ' + rp(a) + ' \u2212 (' + rp(b) + ') = ' + rp(a) + ' + ' + rp(-b) + ' = ' + rp(a - b) + '.']
    };
  }
  function lunasi() {
    const s = -kel(10000, 90000, 5000);
    return {
      narasi: ['Saldo nasabah: ' + rp(s) + ' (nasabah berutang).'],
      tanya: 'Berapa rupiah yang harus disetor agar saldonya menjadi Rp0?', jawab: -s, satuan: 'Rp',
      petunjuk: 'Bilangan ditambah lawannya hasilnya 0.',
      bahas: ['Lawan dari ' + rp(s) + ' adalah ' + rp(-s) + '. Jadi nasabah harus menyetor ' + rp(-s) + '.']
    };
  }

  // ---------- Level 2: persen dan bunga tunggal ----------
  function bunga() {
    const T = kel(500000, 5000000, 100000);
    const p = rnd(2, 10);
    const t = rnd(1, 3);
    const b = (T / 100) * p * t;
    return {
      narasi: ['Tabungan: ' + rp(T), 'Bunga tunggal: ' + p + '% per tahun', 'Lama menabung: ' + t + ' tahun'],
      tanya: 'Berapa rupiah bunga yang diperoleh?', jawab: b, satuan: 'Rp',
      petunjuk: 'Bunga = tabungan \u00D7 persen \u00D7 lama (tahun).',
      bahas: ['Bunga = ' + rp(T) + ' \u00D7 ' + p + '% \u00D7 ' + t + ' = ' + rp(b) + '.']
    };
  }
  function saldoDenganBunga() {
    const T = kel(500000, 5000000, 100000);
    const p = rnd(2, 8);
    const t = rnd(1, 3);
    const b = (T / 100) * p * t;
    return {
      narasi: ['Tabungan: ' + rp(T), 'Bunga tunggal: ' + p + '% per tahun', 'Lama menabung: ' + t + ' tahun'],
      tanya: 'Berapa rupiah saldo akhir (tabungan ditambah bunga)?', jawab: T + b, satuan: 'Rp',
      petunjuk: 'Hitung bunganya dulu, lalu tambahkan ke tabungan.',
      bahas: ['Bunga = ' + rp(T) + ' \u00D7 ' + p + '% \u00D7 ' + t + ' = ' + rp(b) + '. Saldo akhir = ' + rp(T) + ' + ' + rp(b) + ' = ' + rp(T + b) + '.']
    };
  }
  function biayaAdmin() {
    const S = kel(1000000, 5000000, 500000);
    const q = rnd(1, 5);
    return {
      narasi: ['Saldo nasabah: ' + rp(S), 'Biaya administrasi: ' + q + '% dari saldo'],
      tanya: 'Berapa rupiah biaya administrasinya?', jawab: (S / 100) * q, satuan: 'Rp',
      petunjuk: 'p% dari N = p/100 \u00D7 N.',
      bahas: [q + '% \u00D7 ' + rp(S) + ' = ' + rp((S / 100) * q) + '.']
    };
  }
  function cariPersen() {
    const T = kel(1000000, 4000000, 500000);
    const p = rnd(2, 9);
    const b = (T / 100) * p;
    return {
      narasi: ['Tabungan: ' + rp(T), 'Bunga setelah 1 tahun: ' + rp(b)],
      tanya: 'Berapa persen bunga per tahun? (tulis angkanya saja)', jawab: p, satuan: '%',
      petunjuk: 'Persentase = bunga \u00F7 tabungan \u00D7 100%.',
      bahas: [rp(b) + ' \u00F7 ' + rp(T) + ' \u00D7 100% = ' + p + '%.']
    };
  }
  function cariTabungan() {
    const T = kel(1000000, 5000000, 500000);
    const p = pilih([2, 4, 5, 6, 8, 10]);
    const b = (T / 100) * p;
    return {
      narasi: ['Bunga setelah 1 tahun: ' + rp(b), 'Bunga bank: ' + p + '% per tahun'],
      tanya: 'Berapa rupiah tabungan awal nasabah?', jawab: T, satuan: 'Rp',
      petunjuk: 'Tabungan awal = bunga \u00F7 persen bunga.',
      bahas: [rp(b) + ' \u00F7 ' + p + '% = ' + rp(b) + ' \u00F7 ' + (p / 100) + ' = ' + rp(T) + '.']
    };
  }

  // ---------- Level 3: campuran pecahan, desimal, dan persen ----------
  function pecahanSaldo() {
    const d = pilih([2, 4, 5, 8, 10]);
    const n = rnd(1, d - 1);
    const S = 40000 * rnd(10, 50);
    return {
      narasi: ['Saldo nasabah: ' + rp(S), 'Nasabah menarik ' + n + '/' + d + ' dari saldonya.'],
      tanya: 'Berapa rupiah yang ditarik?', jawab: (S / d) * n, satuan: 'Rp',
      petunjuk: 'Bagi saldo dengan penyebut, lalu kalikan dengan pembilang.',
      bahas: [rp(S) + ' \u00F7 ' + d + ' = ' + rp(S / d) + ', lalu \u00D7 ' + n + ' = ' + rp((S / d) * n) + '.']
    };
  }
  function pecahanGabungan() {
    const S = 20000 * rnd(25, 100);
    return {
      narasi: ['Saldo nasabah: ' + rp(S), 'Pagi hari ia menarik 1/4 dari saldo, lalu sore hari menarik 2/5 dari saldo awal itu.'],
      tanya: 'Berapa rupiah total yang ditarik?', jawab: S / 4 + (S * 2) / 5, satuan: 'Rp',
      petunjuk: 'Jumlahkan kedua pecahan dulu: 1/4 + 2/5 = 13/20.',
      bahas: ['1/4 + 2/5 = 5/20 + 8/20 = 13/20. Total = 13/20 \u00D7 ' + rp(S) + ' = ' + rp(S / 4 + (S * 2) / 5) + '.']
    };
  }
  function desimalBunga() {
    const T = kel(1000000, 4000000, 500000);
    const r = pilih([0.02, 0.03, 0.04, 0.05, 0.06, 0.08]);
    const t = rnd(1, 2);
    const b = Math.round(T * r * t);
    return {
      narasi: ['Tabungan: ' + rp(T), 'Bunga tunggal ' + String(r).replace('.', ',') + ' per tahun (bentuk desimal)', 'Lama menabung: ' + t + ' tahun'],
      tanya: 'Berapa rupiah bunga yang diperoleh?', jawab: b, satuan: 'Rp',
      petunjuk: 'Desimal 0,05 sama dengan 5%.',
      bahas: [String(r).replace('.', ',') + ' = ' + Math.round(r * 100) + '%. Bunga = ' + rp(T) + ' \u00D7 ' + String(r).replace('.', ',') + ' \u00D7 ' + t + ' = ' + rp(b) + '.']
    };
  }
  function naikTurun() {
    const S = kel(500000, 2000000, 100000);
    const a = pilih([10, 20, 30]);
    const b = pilih([10, 20, 30]);
    const tengah = (S / 100) * (100 + a);
    const akhir = (tengah / 100) * (100 - b);
    return {
      narasi: ['Saldo nasabah: ' + rp(S), 'Saldo naik ' + a + '% karena promo, lalu dipotong biaya ' + b + '% dari saldo yang baru.'],
      tanya: 'Berapa rupiah saldo akhirnya?', jawab: akhir, satuan: 'Rp',
      petunjuk: 'Persen kedua dihitung dari saldo setelah naik, bukan dari saldo awal.',
      bahas: ['Setelah naik ' + a + '%: ' + rp(S) + ' \u00D7 ' + ((100 + a) / 100).toString().replace('.', ',') + ' = ' + rp(tengah) + '. Setelah dipotong ' + b + '%: ' + rp(tengah) + ' \u00D7 ' + ((100 - b) / 100).toString().replace('.', ',') + ' = ' + rp(akhir) + '.']
    };
  }

  window.GAMES['math-bank'] = {
    nama: 'Math Bank',
    pengantar: 'Kamu teller di Math Bank. Setiap shift ada 10 nasabah dengan satu soal masing-masing. Jawab dengan tepat, kumpulkan koin, dan naikkan jabatanmu.',
    aturan: 'Jawaban benar di percobaan pertama: 10 koin. Percobaan kedua: 5 koin. Tiga jawaban benar berturut-turut menambah bonus 5 koin. Tulis jawaban dalam angka, boleh memakai tanda minus.',
    jumlah: 10,
    levels: [
      { id: 'level-1', nama: 'Teller Magang', deskripsi: 'Saldo, setor, dan tarik. Bilangan bulat positif dan negatif.', gratis: true,
        jenis: [saldoAkhir, saldoAkhir, selisihSaldo, lunasi] },
      { id: 'level-2', nama: 'Teller Junior', deskripsi: 'Persen, bunga tunggal, dan biaya administrasi.', gratis: false,
        jenis: [bunga, saldoDenganBunga, biayaAdmin, cariPersen, cariTabungan] },
      { id: 'level-3', nama: 'Kepala Cabang', deskripsi: 'Campuran pecahan, desimal, dan persen bertingkat.', gratis: false,
        jenis: [pecahanSaldo, pecahanGabungan, desimalBunga, naikTurun, saldoDenganBunga, cariTabungan] }
    ],
    // Membuat satu soal baru. Jenis soal diacak.
    buat(level) { return pilih(level.jenis)(); },
    namaNasabah() { return pilih(NAMA); }
  };
})();
