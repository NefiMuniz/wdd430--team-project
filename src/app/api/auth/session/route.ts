import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type MyJwtPayload = {
  user_id: number;
  email: string;
  role: 'admin' | 'artisan' | 'customer';
};

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
    return NextResponse.json({
      loggedIn: true,
      user_id: payload.user_id,
      email: payload.email,
      role: payload.role
    }, { status: 200 });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
