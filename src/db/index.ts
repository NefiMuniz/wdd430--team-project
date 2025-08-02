import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';
import 'dotenv/config';

const sql = neon(process.env.DATABASE_URL!);

async function setupDB() {
  try {
    const schema = readFileSync('./src/db/schema.sql', 'utf-8');
    const statements = schema
      .split(';')
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0);

    for (const statement of statements) {
      await sql.unsafe(statement);
    }

    console.log('✅ Database setup completed using Neon!');
  } catch (err) {
    console.error('❌ Error setting up DB with Neon:', err);
  }
}

setupDB();
