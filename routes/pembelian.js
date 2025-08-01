const express = require('express');
const router = express.Router();
const { supabase } = require('../lib/supabaseClient');

// GET riwayat pembelian
router.get('/', async (req, res) => {
  try {
    const { data: pembelian, error } = await supabase
      .from('pembelian')
      .select(`
        id,
        jumlah,
        tanggal,
        status,
        produk (
          id,
          nama
        )
      `)
      .order('tanggal', { ascending: false });

    if (error) throw error;

    // Ambil semua produk juga untuk <select> form tambah pembelian
    const { data: produk, error: errorProduk } = await supabase
      .from('produk')
      .select('*');

    if (errorProduk) throw errorProduk;

    // Render halaman
    res.render('pembelian', {
      pembelian: pembelian.map(p => ({
        ...p,
        nama_produk: p.produk.nama // untuk tampilan tabel
      })),
      produk
    });
  } catch (err) {
    console.error('Gagal load pembelian:', err.message);
    res.status(500).send('Gagal load pembelian');
  }
});
