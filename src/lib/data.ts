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

export async function getAllProducts(): Promise<Product[]> {
    try {
        console.log('Fetching product data...');
        const rows = await sql<Product[]>`SELECT * FROM products`;
        return rows as Product[];
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

export async function getAllCategories() {
  try {
    console.log('Fetching category data...');
    const categories = await sql<{ id: number; name: string }[]>`SELECT id, name FROM categories ORDER BY name`;
    return categories;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch categories.');
  }

}

export async function getPriceRange() {
  try {
    const result = await sql<{ min: number; max: number }[]>`
      SELECT MIN(price) as min, MAX(price) as max FROM products
    `;
    return result[0] || { min: 0, max: 1000 }; // Default values if table is empty
  } catch (error) {
    console.error('Database Error:', error);
    return { min: 0, max: 1000 }; // Fallback in case of error
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
        ${comment === null ? null : comment})
        `;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to add review.");
    }
}

export async function getArtisanByUserId(user_id: number): Promise<Artisan> {
  try {
    const artisans = await sql<Artisan[]>`
      SELECT * FROM artisans 
      WHERE user_id = ${user_id}
      LIMIT 1
    `;
    if (artisans.length === 0) throw new Error('Artisan not found');
    return artisans[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artisan by user ID.');
  }
}

export async function getArtisanProducts(artisanId: number) {
  try {
    const products = await sql<Product[]>`
      SELECT p.* 
      FROM products p
      WHERE p.artisan_id = ${artisanId}
      ORDER BY p.created_at DESC
    `;
    return products;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch artisan products.');
  }
}