import bcrypt from 'bcryptjs';
import postgres from 'postgres';
import { products, artisans } from './data';


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

async function seedProducts() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      price TEXT NOT NULL,
      artisan TEXT NOT NULL
    );
  `;
    const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        //INSERT INTO products (...)`
    ),
  );

  return insertedProducts;
}

async function seedArtisans() {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
  await sql`
    CREATE TABLE IF NOT EXISTS artisans (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      yearsExperience TEXT NOT NULL,
      phoneNumber TEXT NOT NULL
    );
  `;
    const insertedArtisans = await Promise.all(
    artisans.map(
      (artisan) => sql`
        //INSERT INTO artisans (...)`
    ),
  );

  return insertedArtisans;
}

export async function GET() {
  try {
    const result = await sql.begin((sql) => [
    seedArtisans(),
    seedProducts(),
    ]);
    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}