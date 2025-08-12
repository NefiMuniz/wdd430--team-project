import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';
import postgres from "postgres";

const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    const users = await sql`SELECT * FROM users WHERE email = ${email}`;

    if (users.length === 0) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const user = users[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }
    const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET!,
        { expiresIn: '1h' }
    );

    const response = NextResponse.json({ message: 'login successful', token });

    response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
    });

    return response;
}
