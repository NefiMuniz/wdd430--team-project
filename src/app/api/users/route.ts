import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sql } from '@/lib/db';

export async function GET(req: Request) {
    try {
        const token = req.headers.get('authorization')?.split(' ')[1];
        if (!token) {
            return NextResponse.json({ message: 'Token não encontrado' }, { status: 401 });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
        if (decoded.role !== 'admin') {
            return NextResponse.json({ message: 'Acesso negado. Apenas admins.' }, { status: 403 });
        }

        const users = await sql`
      SELECT id, username, email, role
      FROM users
      ORDER BY username
    `;

        return NextResponse.json(users);
    } catch (error) {
        return NextResponse.json({ message: 'Erro ao buscar usuários', error }, { status: 500 });
    }
}
