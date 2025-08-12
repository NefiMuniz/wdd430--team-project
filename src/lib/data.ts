import postgres from 'postgres';
import { Artisan, Product } from './definitions';

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getAllUsers() {
    try {
        console.log('Fetching user data...');
        const users = await sql<{ id: number; username: string; email: string; role: string }[]>`
      SELECT id, username, email, role FROM users ORDER BY id;
    `;
        return users;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch user data.');
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

export async function getArtisanById(id: number) {
    try {
        console.log('Fetching artisan data...');
        const artisans = await sql<Artisan[]>`SELECT *
            FROM artisans
            WHERE id = ${id}`;
        return artisans;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch artisan data.');
    }
}

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

export async function getProductById(id: number) {
    try {
        const product = await sql<Product[]>`SELECT * FROM products WHERE id = ${id}`;
        return product[0];
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch product.");
    }
}

export async function getReviewsByProductId(productId: number) {
    try {
        const reviews = await sql<{
            id: number;
            product_id: number;
            user_id: number;
            user_name: string;
            rating: number | null;
            comment: string | null;
            created_at: string;
            updated_at: string;
            is_deleted: boolean;
        }[]>`
        SELECT
            r.id,
            r.product_id,
            r.user_id,
            u.username AS user_name,
            r.rating,
            r.comment,
            r.created_at,
            r.updated_at,
            r.is_deleted
        FROM reviews r
        JOIN users u ON r.user_id = u.id
        WHERE r.product_id = ${productId} AND r.is_deleted = false
        ORDER BY r.created_at DESC
        `;
        return reviews;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch reviews.");
    }
}

export async function addReviewToProduct(
    productId: number,
    userId: number,
    rating: number | null,
    comment: string | null
) {
    try {
        await sql`
        INSERT INTO reviews (product_id, user_id, rating, comment)
        VALUES (${productId},
        ${userId},
        ${rating === null ? null : rating}, 
        ${comment === null ? null : rating})
        `;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to add review.");
    }
}