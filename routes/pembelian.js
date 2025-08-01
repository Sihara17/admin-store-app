const express = require("express");
const router = express.Router();
const db = require("../db");

// GET: Tampilkan riwayat pembelian dan form tambah
router.get("/", async (req, res) => {
  try {
    const pembelianResult = await db.query(`
      SELECT pembelian.*, produk.nama AS nama_produk
      FROM pembelian
      JOIN produk ON pembelian.produk_id = produk.id
      ORDER BY pembelian.tanggal DESC
    `);

    const produkResult = await db.query("SELECT * FROM produk");

    res.render("pembelian", {
      pembelian: pembelianResult.rows,
      produk: produkResult.rows,
    });
  } catch (err) {
    console.error("Gagal mengambil riwayat pembelian:", err);
    res.status(500).send("Gagal mengambil data pembelian.");
  }
});

// POST: Tambah pembelian
router.post("/", async (req, res) => {
  const { produk_id, jumlah } = req.body;
  try {
    if (!produk_id || !jumlah || isNaN(jumlah)) {
      return res.status(400).send("Data tidak valid.");
    }

    await db.query(
      `INSERT INTO pembelian (produk_id, jumlah, tanggal, status)
       VALUES ($1, $2, NOW(), 'selesai')`,
      [produk_id, jumlah]
    );

    res.redirect("/pembelian");
  } catch (err) {
    console.error("Gagal menambah pembelian:", err);
    res.status(500).send("Gagal menambah pembelian.");
  }
});

// POST: Batalkan pembelian
router.post("/:id/cancel", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query(
      `UPDATE pembelian
       SET status = 'dibatalkan'
       WHERE id = $1`,
      [id]
    );
    res.redirect("/pembelian");
  } catch (err) {
    console.error("Gagal membatalkan pembelian:", err);
    res.status(500).send("Gagal membatalkan pembelian.");
  }
});

module.exports = router;
