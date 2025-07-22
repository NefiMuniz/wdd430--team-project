'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
    const [open, setOpen] = useState(false);
    return (
        <header className="fixed w-full bg-white dark:bg-black z-50 shadow-sm">
            <div className="max-w-6x1 mx-auto flex items-center justify-between px-6 py-4">
                <Link href="/" className="flex items-center space-x-2">
                    <Image src="/logo.svg" alt="Logo" width={40} height={40} />
                    <span className="text-xl font-bold">Handcraft Haven</span>
                </Link>

                <nav className="hidden md:flex space-x-8 text-sm font-medium">
                    {["Products", "Artisans", "Cart", "Manager", "Login"].map((l) => (
                        <Link key={l} href={`/${l.toLowerCase()}`} className="hover:text-blue-600 transition">
                            {l}
                        </Link>
                    ))}
                </nav>
                <button className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
                    onClick={() => setOpen((o) => !o)}
                    aria-label="Toggle navigation"
                >
                    {/* Simple burger icon */}
                    <div className="space-y-1">
                        <span className="block w-6 h-0.5 bg-gray-800 dark:bg-grau-200"></span>
                        <span className="block w-6 h-0.5 bg-gray-800 dark:bg-grau-200"></span>
                        <span className="block w-6 h-0.5 bg-gray-800 dark:bg-grau-200"></span>
                    </div>
                </button>
            </div>

            {open && (
                <nav className="md:hidden bg-white dark:bg-black border-t border-gray-200 dark:border-gray-800">
                    <ul className="flex flex-col items-center space-y-4 py-4 text-gray-900 dark:text-white">
                        {["Products", "Artisans", "Cart", "Manager", "Login"].map((l) => (
                            <li key={l}>
                                <Link href={`/${l.toLowerCase()}`} className="text-lg font-medium hover:text-blue-600 transition" onClick={() => setOpen(false)}>
                                {l}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            )}
        </header>
    );
}