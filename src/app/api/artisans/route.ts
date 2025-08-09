import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';
import { cookies } from 'next/headers';

async function checkAdmin() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) throw new Error('Token não encontrado');

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    if (decoded.role !== 'admin') throw new Error('Acesso negado');
}

export async function GET() {
    try {
        const artisans = await sql`
      SELECT a.id, a.name, a.bio, a.imageUrl, u.username, u.email
      FROM artisans a
      JOIN users u ON a.user_id = u.id
      ORDER BY a.name
    `;
        return NextResponse.json(artisans);
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar artesãos' }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await checkAdmin();

        const { username, email, password, name, bio } = await req.json();

        if (!username || !email || !password || !name) {
            return NextResponse.json({ message: 'Campos obrigatórios faltando' }, { status: 400 });
        }

        const hashedPassword = bcrypt.hashSync(password, 10);

        const insertedUsers = await sql`
      INSERT INTO users (username, email, role, password)
      VALUES (${username}, ${email}, 'artisan', ${hashedPassword})
      RETURNING id
    `;

        const userId = insertedUsers[0].id;

        const insertedArtisans = await sql`
      INSERT INTO artisans (user_id, name, bio)
      VALUES (${userId}, ${name}, ${bio})
      RETURNING *
    `;

        return NextResponse.json(insertedArtisans[0], { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro ao criar artesão';
        return NextResponse.json({ message }, { status: 500 });
    }
}
