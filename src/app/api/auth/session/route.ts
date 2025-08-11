import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type MyJwtPayload = {
  id: number,
  email: string;
  role: 'admin' | 'artisan' | 'customer';
};

export async function GET(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as MyJwtPayload;
    return NextResponse.json({ loggedIn: true, id:payload.id, email: payload.email, role:payload.role }, { status: 200 });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
