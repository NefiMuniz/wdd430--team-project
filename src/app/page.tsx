"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLinkClick() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
        <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <h1 className="text-2xl font-bold">Handcrafted Haven</h1>

          {/* Botão burger - aparece só em telas menores que md */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            type="button"
          >
            {menuOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                viewBox="0 0 24 24"
              >
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Menu desktop - aparece só a partir de md */}
          <nav className="hidden md:flex space-x-8 font-semibold text-gray-700">
            <Link href="/products" className="hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 rounded">
              Products
            </Link>
            <Link href="/artisans" className="hover:text-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 rounded">
              Artisans
            </Link>
            <Link href="/cart" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded">
              Cart
            </Link>
            <Link href="/manager" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded">
              Manager
            </Link>
            <Link href="/login" className="hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 rounded">
              Login
            </Link>
          </nav>
        </div>

        {/* Menu mobile - aparece só em telas menores que md */}
        {menuOpen && (
          <nav
            id="mobile-menu"
            className="md:hidden bg-white shadow-md p-4 space-y-4 font-semibold text-gray-700"
          >
            <Link href="/products" onClick={handleLinkClick} className="block hover:text-green-600">
              Products
            </Link>
            <Link href="/artisans" onClick={handleLinkClick} className="block hover:text-purple-600">
              Artisans
            </Link>
            <Link href="/cart" onClick={handleLinkClick} className="block hover:text-gray-900">
              Cart
            </Link>
            <Link href="/manager" onClick={handleLinkClick} className="block hover:text-gray-900">
              Manager
            </Link>
            <Link href="/login" onClick={handleLinkClick} className="block hover:text-gray-900">
              Login
            </Link>
          </nav>
        )}
      </header>

      {/* Espaço para o header fixo, para não ficar por baixo */}
      <main className="flex flex-col items-center justify-center min-h-screen pt-24 px-4 py-8 text-center max-w-4xl mx-auto">
        <div className="mb-8 w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src="/hero.jpg"
            alt="Handmade Crafts Hero"
            width={800}
            height={480}
            className="w-full h-auto"
            priority
          />
        </div>

        <p className="text-lg md:text-xl mb-6 px-2 leading-relaxed">
          Discover unique handcrafted items or share your own creations with the world.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center mb-12 px-2">
          <Link
            href="/login"
            className="px-8 py-3 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Join as a Buyer
          </Link>
          <Link
            href="/apply"
            className="px-8 py-3 bg-purple-600 text-white rounded-md shadow-md hover:bg-purple-700 transition focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            Apply as Artisan
          </Link>
        </div>

        <div className="text-sm text-gray-600">
          <p className="mb-2">Just want to browse?</p>
          <Link
            href="/products"
            className="px-5 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Enter as Visitor
          </Link>
        </div>
      </main>
    </>
  );
}
