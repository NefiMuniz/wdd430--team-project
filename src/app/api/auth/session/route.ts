import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

type MyJwtPayload = {
  id: number;
  email: string;
  role: 'admin' | 'artisan' | 'customer';
};

function createToken(user: { id: number, email: string, role: string }) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET!,
    {expiresIn: "1h"}
  );
  return token;
}


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
      id: payload.id,
      email: payload.email,
      role: payload.role
    }, { status: 200 });
  } catch {
    return NextResponse.json({ loggedIn: false }, { status: 200 });
  }
}
