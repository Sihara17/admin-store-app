import 'dotenv/config';
import postgres from 'postgres';

const sql = postgres(process.env.DATABASE_URL, {
  ssl: 'require',
});

async function testConnection() {
  try {
    const result = await sql`SELECT NOW()`;
    console.log("✅ Connected to Supabase DB:", result[0].now);
    process.exit(0);
  } catch (error) {
    console.error("❌ Connection failed:", error);
    process.exit(1);
  }
}

testConnection();
