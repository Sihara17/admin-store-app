const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const produkRoutes = require('./routes/produk');
const pembelianRoutes = require('./routes/pembelian');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', produkRoutes);
app.use('/pembelian', pembelianRoutes);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
