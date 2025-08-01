const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const produkRouter = require("./routes/produk");
const pembelianRouter = require("./routes/pembelian");

// View engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
  res.redirect("/produk");
});
app.use("/produk", produkRouter);
app.use("/pembelian", pembelianRouter);

// Jangan listen di Vercel
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
}

module.exports = app;
