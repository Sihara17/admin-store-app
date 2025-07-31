const express = require('express');
const router = express.Router();
const db = require('../db');

// Tampilkan semua produk
router.get('/', async (req, res) => {
  try {
    const products = await db`SELECT * FROM products`;
    res.render('produk', { products });
  } catch (error) {
    console.error('❌ Error fetching products:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Form tambah produk
router.get('/tambah', (req, res) => {
  res.render('tambah-produk');
});

// Proses tambah produk
router.post('/tambah', async (req, res) => {
  const { name, price, stock } = req.body;

  try {
    await db`
      INSERT INTO products (name, price, stock)
      VALUES (${name}, ${price}, ${stock})
    `;
    res.redirect('/');
  } catch (error) {
    console.error('❌ Error adding product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

// Hapus produk
router.post('/hapus/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await db`
      DELETE FROM products
      WHERE id = ${id}
    `;
    res.redirect('/');
  } catch (error) {
    console.error('❌ Error deleting product:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
