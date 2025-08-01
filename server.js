// server.js
const express = require("express");
const path = require("path");
const produkRouter = require("./routes/produk");
const pembelianRouter = require("./routes/pembelian");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// routing
app.get("/", (req, res) => res.send("Homepage aktif ✅"));
app.use("/produk", produkRouter);
app.use("/pembelian", pembelianRouter);

// listen
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
