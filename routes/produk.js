const express = require("express");
const router = express.Router();
const db = require('../db');

// GET semua produk
router.get('/', (req, res) => {
  db.query('SELECT * FROM produk', (err, results) => {
    if (err) return res.status(500).send(err);
    res.render('produk', { produk: results });
  });
});

// POST tambah produk baru
router.post('/tambah', (req, res) => {
  const { nama, harga } = req.body;
  db.query('INSERT INTO produk (nama, harga) VALUES (?, ?)', [nama, harga], (err) => {
    if (err) return res.status(500).send(err);
    res.redirect('/produk');
  });
});

module.exports = router;
