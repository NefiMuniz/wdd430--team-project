'use client'

import { useState } from 'react';

export default function LoginForm() {
    const [ email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        console.log({email, password});
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4 max-w-md mx-auto">
        <label>
            Email:
            <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2 w-full"
            />
        </label>
        <label>
            Password:
            <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2 w-full"
            />
        </label>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Sign In
        </button>
        </form>
    );


}