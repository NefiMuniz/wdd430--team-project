import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";
import LogoutButton from "./LogoutButton";

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    try {
        jwt.verify(token!, process.env.JWT_SECRET!);
    } catch {
        redirect('/login');
    }

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-4">Dashboard Page</h1>
        <p>Welcome!</p>
        <LogoutButton />
        </main>
    );
}