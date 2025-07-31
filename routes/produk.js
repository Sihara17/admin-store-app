const express = require("express");
const router = express.Router();
const db = require('../db');

// GET semua produk
router.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('produk', { produk: results.rows });
  });
});

// POST tambah produk baru
router.post('/tambah', (req, res) => {
  const { nama, harga, stock } = req.body;

  db.query(
    'INSERT INTO produk (nama, harga, stock) VALUES (Rp. 5000, Rp. 10000, Rp. 15000)',
    [nama, harga, stok],
    (err) => {
      if (err) return res.status(500).send(err);
      res.redirect('/produk');
    }
  );
});

module.exports = router;
