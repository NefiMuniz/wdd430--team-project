import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { getCurrentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await getCurrentUser(); // from token
    const { name, description, price, image_url } = await req.json();

    if (!name || !price) {
      return NextResponse.json({ message: 'Name and price are required' }, { status: 400 });
    }

    // Find artisan_id linked to this user
    const artisanResult = await sql`
      SELECT id FROM artisans WHERE user_id = ${user.user_id} LIMIT 1
    `;

    if (artisanResult.rows.length === 0) {
      return NextResponse.json({ message: 'Artisan not found for this user' }, { status: 404 });
    }

    const artisan_id = artisanResult.rows[0].id;

    // Insert product
    const insertResult = await sql`
      INSERT INTO products (artisan_id, name, description, price, image_url)
      VALUES (${artisan_id}, ${name}, ${description}, ${price}, ${image_url})
      RETURNING *
    `;

    return NextResponse.json(insertResult.rows[0], { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ message: 'Failed to create product' }, { status: 500 });
  }
}
