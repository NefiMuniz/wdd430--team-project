import postgres from 'postgres';
import CreateArtisanForm from './CreateArtisanForm';
import { getAllUsers } from '@/lib/data';
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });

type User = {
    id: number;
    username: string;
    email: string;
    role: string;
};

export default async function AdminDashboard() {
    const users = await getAllUsers();

    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="flex flex-col md:flex-row gap-10">
                {/* Lista de usuários - ocupa 2/3 da largura em telas médias */}
                <section className="md:w-2/3">
                    <h2 className="text-xl mb-4">Lista de Usuários</h2>
                    <table className="w-full table-auto border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Username</th>
                                <th className="border border-gray-300 p-2">Email</th>
                                <th className="border border-gray-300 p-2">Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="border border-gray-300 p-2">{user.id}</td>
                                    <td className="border border-gray-300 p-2">{user.username}</td>
                                    <td className="border border-gray-300 p-2">{user.email}</td>
                                    <td className="border border-gray-300 p-2">{user.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                {/* Formulário - ocupa 1/3 da largura em telas médias */}
                <section className="md:w-1/3">
                    <CreateArtisanForm />
                </section>
            </div>
        </main>
    );
}