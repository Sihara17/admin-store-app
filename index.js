const express = require("express");
const db = require("./db");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// endpoint root
app.get("/", (req, res) => {
  res.json({ message: "Server aktif" });
});

// endpoint untuk produk
app.get("/produk", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM produk");
    res.json(result.rows);
  } catch (error) {
    console.error("Gagal mengambil produk:", error);
    res.status(500).json({ error: "Gagal mengambil produk" });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
