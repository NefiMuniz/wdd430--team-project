'use client';

import { useState } from 'react';

export default function CreateArtisanForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [bio, setBio] = useState('');
    const [message, setMessage] = useState('');

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const res = await fetch('/api/artisans', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password, name, bio }),
        });

        if (res.ok) {
            setMessage('Artesão criado com sucesso!');
            setUsername('');
            setEmail('');
            setPassword('');
            setName('');
            setBio('');
        } else {
            const data = await res.json();
            setMessage(`Erro: ${data.message || 'Desconhecido'}`);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4">
            <h2 className="text-xl font-bold">Criar Novo Artesão</h2>

            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            <input
                type="text"
                placeholder="Nome completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full border p-2 rounded"
            />

            <textarea
                placeholder="Bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full border p-2 rounded"
            />

            <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
                Criar Artesão
            </button>

            {message && <p className="mt-2">{message}</p>}
        </form>
    );
}
