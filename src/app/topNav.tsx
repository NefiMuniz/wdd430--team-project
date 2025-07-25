"use client";

import { useState } from "react";
import Link from "next/link";

export default function TopNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <nav className="p-4 shadow-md sticky top-0 z-50 bg-black">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold text-white">
          Handcrafted Haven
        </Link>

        {/* Menu Desktop */}
        <div className="hidden md:flex gap-4">
          <Link href="/products" className="hover:text-gray-300 text-white">
            Products
          </Link>
          <Link href="/artisans" className="hover:text-gray-300 text-white">
            Artisans
          </Link>
          <Link href="/cart" className="hover:text-gray-300 text-white">
            Cart
          </Link>
          <Link href="/manager" className="hover:text-gray-300 text-white">
            Manager
          </Link>
          <Link href="/login" className="hover:text-gray-300 text-white">
            Login
          </Link>
        </div>

        {/* Botão burger Mobile */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col gap-1.5 p-2 focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Menu Mobile */}
      {menuOpen && (
        <div className="md:hidden flex flex-col mt-2 gap-2 px-2 pb-4 border-t border-gray-700">
          <Link href="/products" onClick={closeMenu} className="hover:text-gray-300 text-white">
            Products
          </Link>
          <Link href="/artisans" onClick={closeMenu} className="hover:text-gray-300 text-white">
            Artisans
          </Link>
          <Link href="/cart" onClick={closeMenu} className="hover:text-gray-300 text-white">
            Cart
          </Link>
          <Link href="/manager" onClick={closeMenu} className="hover:text-gray-300 text-white">
            Manager
          </Link>
          <Link href="/login" onClick={closeMenu} className="hover:text-gray-300 text-white">
            Login
          </Link>
        </div>
      )}
    </nav>
  );
}
