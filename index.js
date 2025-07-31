const express = require("express");
const app = express();
const db = require("./db");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/produk", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM produk");
    res.render("produk", { produk: result.rows });
  } catch (error) {
    res.status(500).send("Gagal mengambil produk: " + error.toString());
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server jalan di port ${PORT}`));
