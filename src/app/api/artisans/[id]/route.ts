import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sql } from '@/lib/db';
import { cookies } from 'next/headers';

interface Params {
  id: string;
}

async function checkAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) throw new Error('Token not found');

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
  if (decoded.role !== 'admin') throw new Error('Denied Access');
}

export async function PUT(req: Request, context: { params: Promise<Params> }) {
  try {
    await checkAdmin();

    const { id } = await context.params;
    const artisanId = Number(id);
    if (isNaN(artisanId)) return NextResponse.json({ message: 'Invalid ID' }, { status: 400 });

    const data = await req.json();

    await sql`
      UPDATE artisans SET
        name = COALESCE(${data.name}, name),
        bio = COALESCE(${data.bio}, bio)
      WHERE id = ${artisanId}
    `;

    return NextResponse.json({ message: 'Artisan Updated Successfully' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error Updating Artisan';
    return NextResponse.json({ message }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: Promise<Params> }) {
  try {
    await checkAdmin();

    const { id } = await context.params;
    const artisanId = Number(id);
    if (isNaN(artisanId)) return NextResponse.json({ message: 'ID inválido' }, { status: 400 });

    const artisan = await sql`SELECT user_id FROM artisans WHERE id = ${artisanId}`;
    if (artisan.length === 0) return NextResponse.json({ message: 'Artisan Not Found' }, { status: 404 });

    const userId = artisan[0].user_id;

    await sql`DELETE FROM artisans WHERE id = ${artisanId}`;
    await sql`DELETE FROM users WHERE id = ${userId}`;

    return NextResponse.json({ message: 'Artisan deleted' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error!';
    return NextResponse.json({ message }, { status: 500 });
  }
}
