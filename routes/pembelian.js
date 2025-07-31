const express = require('express');
const router = express.Router();
const db = require('../db');

// GET semua pembelian
router.get('/', (req, res) => {
  db.query(
    'SELECT pembelian.*, produk.nama FROM pembelian JOIN produk ON pembelian.produk_id = produk.id',
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.render('pembelian', { pembelian: results });
    }
  );
});

// POST tambah pembelian
router.post('/tambah', (req, res) => {
  const { produk_id, jumlah } = req.body;
  db.query(
    'INSERT INTO pembelian (produk_id, jumlah, status) VALUES (?, ?, ?)',
    [produk_id, jumlah, 'berhasil'],
    (err) => {
      if (err) return res.status(500).send(err);
      res.redirect('/pembelian');
    }
  );
});

// POST batalkan pembelian
router.post('/batal/:id', (req, res) => {
  const id = req.params.id;
  db.query(
    "UPDATE pembelian SET status = 'batal' WHERE id = ?",
    [id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.redirect('/pembelian');
    }
  );
});

module.exports = router;
