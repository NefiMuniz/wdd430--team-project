import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken';

const mockUser = {
    email: 'mateus@example.com',
    passwordHash: bcrypt.hashSync('123456', 10),
};

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { email, password } = body;

    if (email !== mockUser.email) {
        return NextResponse.json({ message: 'User not found' }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compareSync(password, mockUser.passwordHash);
    if (!isPasswordValid) {
        return NextResponse.json({ message: 'Invalid password' }, { status: 401 });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

    const response = NextResponse.json({ message: 'login successful' });

    response.cookies.set('token', token, {
        httpOnly: true,
        path: '/',
        maxAge: 3600,
    });

    return response;
}