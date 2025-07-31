DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS stock;
DROP TABLE IF EXISTS purchases;

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  price INTEGER
);

CREATE TABLE stock (
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE purchases (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER,
  quantity INTEGER,
  status TEXT DEFAULT 'completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, price) VALUES
('Produk A', 10000),
('Produk B', 12000),
('Produk C', 9000),
('Produk D', 15000),
('Produk E', 17000),
('Produk F', 11000),
('Produk G', 13000),
('Produk H', 14000),
('Produk I', 12500),
('Produk J', 16000);

-- Insert initial stock
INSERT INTO stock (product_id, quantity) SELECT id, 100 FROM products;
