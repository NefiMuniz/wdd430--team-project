'use client';

import { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });

        if (res.ok) {
            const data = await res.json();

            const token = data.token;
            if (!token) {
                alert('Token não recebido');
                return;
            }

            const payload = jwtDecode<{ role: string }>(token);

            if (payload.role === 'admin') {
                window.location.href = '/dashboard/admin';
            } else if (payload.role === 'artisan') {
                window.location.href = '/dashboard/artisan';
            } else {
                window.location.href = '/dashboard';
            }
        } else {
            const error = await res.json();
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6 max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md"
        >
            <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 text-sm font-medium text-gray-700">
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 text-sm font-medium text-gray-700">
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
            >
                Sign In
            </button>
        </form>
    );
}
