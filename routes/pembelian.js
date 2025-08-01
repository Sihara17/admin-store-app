const express = require('express');
const router = express.Router();
const db = require('../db');

// Tampilkan semua pembelian
router.get('/', async (req, res) => {
  try {
    const { rows: pembelian } = await db.query(`
      SELECT p.id, pr.nama AS nama_produk, p.jumlah, p.tanggal, p.status
      FROM pembelian p
      JOIN products pr ON p.produk_id = pr.id
      ORDER BY p.tanggal DESC
    `);
    
    const { rows: produk } = await db.query("SELECT * FROM products");
    
    res.render('pembelian', { pembelian, produk });
  } catch (err) {
    console.error('Gagal mengambil data pembelian:', err);
    res.status(500).send("Gagal mengambil data pembelian");
  }
});

// Tambah pembelian baru
router.post('/', async (req, res) => {
  const { produk_id, jumlah } = req.body;

  try {
    await db.query(
      "INSERT INTO pembelian (produk_id, jumlah, tanggal, status) VALUES ($1, $2, NOW(), 'selesai')",
      [produk_id, jumlah]
    );

    res.redirect('/pembelian');
  } catch (err) {
    console.error('Gagal menambah pembelian:', err);
    res.status(500).send("Gagal menambah pembelian");
  }
});

// Batalkan pembelian
router.post('/:id/cancel', async (req, res) => {
  const { id } = req.params;

  try {
    await db.query("UPDATE pembelian SET status = 'batal' WHERE id = $1", [id]);
    res.redirect('/pembelian');
  } catch (err) {
    console.error('Gagal membatalkan pembelian:', err);
    res.status(500).send("Gagal membatalkan pembelian");
  }
});

module.exports = router;
