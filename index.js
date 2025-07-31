const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const produkRoutes = require("./routes/produk");
const pembelianRoutes = require("./routes/pembelian");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", produkRoutes);
app.use("/pembelian", pembelianRoutes);
const app = express();
const path = require("path");
require("dotenv").config();
const produkRoutes = require("./routes/produk");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Tambahkan untuk parsing form input
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/produk", produkRoutes);

app.get("/", (req, res) => {
  res.send("Homepage aktif ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
