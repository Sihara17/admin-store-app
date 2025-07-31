require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Untuk Supabase atau RDS yang pakai SSL
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
