const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/", async (req, res) => {
  try {
    const result = await db`
      SELECT * FROM products ORDER BY id ASC
    `;
    res.render("produk", { products: result });
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/tambah", async (req, res) => {
  const { name, price, stock } = req.body;
  try {
    await db`
      INSERT INTO products (name, price, stock)
      VALUES (${name}, ${price}, ${stock})
    `;
    res.redirect("/");
  } catch (err) {
    console.error("Insert error:", err);
    res.status(500).send("Error adding product");
  }
});

module.exports = router;
