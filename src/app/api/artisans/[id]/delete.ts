import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { sql } from '@/lib/db';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;

    const token = req.headers.get('authorization')?.split(' ')[1];
    if (!token) return NextResponse.json({ message: 'Token não encontrado' }, { status: 401 });

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { role: string };
    if (decoded.role !== 'admin') return NextResponse.json({ message: 'Acesso negado' }, { status: 403 });

    await sql.query('DELETE FROM artisans WHERE id = $1', [id]);

    return NextResponse.json({ message: 'Artesão deletado com sucesso' });
}
