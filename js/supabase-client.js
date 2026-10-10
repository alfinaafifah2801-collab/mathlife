// Membuat klien Supabase (window.db). window.dbSiap bernilai false kalau config.js belum diisi.
(function () {
  const c = window.MATHLIFE || {};
  const terisi =
    c.SUPABASE_URL && c.SUPABASE_ANON_KEY &&
    !c.SUPABASE_URL.includes('GANTI') && !c.SUPABASE_ANON_KEY.includes('GANTI');

  window.dbSiap = Boolean(terisi && window.supabase);
  window.db = window.dbSiap ? window.supabase.createClient(c.SUPABASE_URL, c.SUPABASE_ANON_KEY) : null;
})();
