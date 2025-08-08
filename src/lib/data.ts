import postgres from 'postgres';
import { Artisan, Product, Review, ProductField } from './definitions';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getAllProducts() {
    try {
        console.log('Fetching product data...');
        const products = await sql<Product[]>`SELECT * FROM products`;
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

export async function getAllArtisans() {
    try {
        console.log('Fetching artisan data...');
        const artisans = await sql<Artisan[]>`SELECT * FROM artisans`;
        return artisans;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch artisan data.');
    }
}

export async function getAllReviews() {
    try {
        console.log('Fetching review data...');
        const reviews = await sql<Review[]>`SELECT * FROM reviews`;
        return reviews;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch review data.');
    }
}

export async function getProductsByArtisan(artisan_id: number) {
    try {
        console.log('Fetching product data...');
        const products = await sql<Product[]>`SELECT * 
            FROM products
            WHERE artisan_id = ${artisan_id}`;
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

export async function getProductsByCategory(category_id: number) {
    try {
        console.log('Fetching product data...');
        const products = await sql<Product[]>`SELECT *
            FROM products
            WHERE category_id = ${category_id}`;
        return products;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch product data.');
    }
}

export async function fetchProduct() {
  try {
    const products = await sql<ProductField[]>`
      SELECT
        id,
        name
      FROM products
      ORDER BY name ASC
    `;

    return products;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all products.');
  }
}