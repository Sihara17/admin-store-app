const express = require("express");
const router = express.Router();
const db = require('../db');

// GET semua produk
router.get('/', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('produk', { produk: results.rows });
  });
});

// POST tambah produk baru
router.post('/tambah', (req, res) => {
  const { nama, harga, stok } = req.body;

  db.query(
    'INSERT INTO products (name, price, stock) VALUES ($1, $2, $3)',
    [nama, harga, stok],
    (err) => {
      if (err) return res.status(500).send(err);
      res.redirect('/produk');
    }
  );
});

module.exports = router;
