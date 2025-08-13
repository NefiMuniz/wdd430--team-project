import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";

export type JwtPayload = {
    user_id: number;
    role: 'customer' | 'admin' | 'artisan';
};

export async function getCurrentUser(): Promise<JwtPayload> {
    const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  
  console.log("Token: ", token);

    if (!token) {
        redirect('/login');
    }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
      console.log("Decoded: ", decoded)
    return decoded
    } catch {
        redirect('/login');
    }
}