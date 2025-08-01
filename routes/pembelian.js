const express = require('express');
const router = express.Router();
const db = require('../db'); // pastikan ini sudah koneksi ke Supabase/pg-pool

// GET semua pembelian
router.get('/', async (req, res) => {
  try {
    const [pembelianData, produkData] = await Promise.all([
      db.query(`
        SELECT pembelian.*, produk.nama AS nama_produk 
        FROM pembelian 
        JOIN produk ON pembelian.produk_id = produk.id
        ORDER BY pembelian.id DESC
      `),
      db.query('SELECT * FROM produk')
    ]);

    res.render('pembelian', {
      pembelian: pembelianData.rows,
      produk: produkData.rows
    });
  } catch (err) {
    console.error('Gagal mengambil data:', err);
    res.status(500).send("Gagal mengambil data pembelian.");
  }
});
