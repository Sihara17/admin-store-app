const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const produkRoutes = require('./routes/produk');
const pembelianRoutes = require('./routes/pembelian');
const pool = require('./db'); // import koneksi Supabase

// Tes koneksi database
pool.connect()
  .then(() => {
    console.log('✅ Connected to Supabase database');
  })
  .catch(err => {
    console.error('❌ Database connection error:', err.message);
  });

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', produkRoutes);
app.use('/pembelian', pembelianRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
