// routes/produk.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET semua produk
router.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM produk");
    res.render("produk", { produk: result.rows }); // penting: .rows
  } catch (err) {
    console.error("Gagal mengambil produk:", err);
    res.status(500).send("Gagal mengambil data produk.");
  }
});

// POST tambah produk
router.post("/tambah", async (req, res) => {
  const { nama, harga, stock } = req.body;
  try {
    await db.query("INSERT INTO produk (nama, harga, stock) VALUES ($1, $2, $3)", [nama, harga, stock]);
    res.redirect("/produk");
  } catch (err) {
    console.error("Gagal tambah produk:", err);
    res.status(500).send("Gagal menambah produk.");
  }
});

module.exports = router;
