import postgres from 'postgres';
import { Artisan, Product } from './definitions';

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