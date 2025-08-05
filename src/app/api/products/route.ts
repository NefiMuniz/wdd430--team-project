import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function getAllProducts() {
    const products = await sql`SELECT * FROM products`;

    return products;
}

export async function getProductsByArtisan(artisan_id: number) {
    const products = await sql`SELECT * FROM products WHERE artisan_id = ${artisan_id}`;

    return products;
}

export async function getProductsByCategory(category_id: number) {
    const products = await sql`SELECT * FROM products WHERE category_id = ${category_id}`;

    return products;
}