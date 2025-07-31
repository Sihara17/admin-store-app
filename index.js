// index.js
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();

const produkRoutes = require("./routes/produk");
const pembelianRoutes = require("./routes/pembelian");

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Routing
app.use("/produk", produkRoutes);
app.use("/pembelian", pembelianRoutes);

app.get("/", (req, res) => {
  res.send("Homepage aktif ✅");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server berjalan di http://localhost:${PORT}`);
});
