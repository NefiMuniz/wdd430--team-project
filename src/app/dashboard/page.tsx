import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';
import { redirect } from "next/navigation";

type JwtPayload = {
    role: 'customer' | 'admin' | 'artisan';
    // você pode incluir outros campos do token aqui, ex: userId, email...
};

export default async function DashboardPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
        redirect('/login');
    }

    let payload: JwtPayload;

    try {
        // Decodifica e verifica o token JWT usando a secret
        payload = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    } catch (error) {
        console.log(error)
        // Se inválido, redireciona para login
        redirect('/login');
    }

    // Renderiza conteúdo baseado no role
    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-4">Dashboard Page</h1>

            {payload.role === 'admin' && (
                <div>
                    <h2 className="text-xl font-semibold">Admin Panel</h2>
                    <p>Aqui você vê dados e controles administrativos.</p>
                </div>
            )}

            {payload.role === 'artisan' && (
                <div>
                    <h2 className="text-xl font-semibold">Artisan Dashboard</h2>
                    <p>Conteúdo e ferramentas específicas para artesãos.</p>
                </div>
            )}

            {payload.role === 'customer' && (
                redirect('/')
            )}
        </main>
    );
}
