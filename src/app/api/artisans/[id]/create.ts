import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sql } from '@/lib/db';

export async function POST(req: Request) {
    try {
        const token = req.headers.get('authorization')?.split(' ')[1];
        if (!token) return NextResponse.json({ message: 'Token não encontrado' }, { status: 401 });

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
        if (decoded.role !== 'admin') return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });

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
        return NextResponse.json({ message: 'Erro ao criar artesão', error }, { status: 500 });
    }
}
