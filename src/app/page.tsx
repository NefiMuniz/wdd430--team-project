'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { poppins } from "./ui/fonts";
import { merriweather } from "./ui/fonts";


const images = [
  "/artisans.webp",
  "/artisans2.webp",
  "/artisan3.webp",
  "/artisan4.webp",
];

export default function HomePage() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const prevImage = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const nextImage = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
      <h1 className={`${poppins.className} text-4xl md:text-6xl font-bold mb-8`}>
        Handcrafted Haven
      </h1>

      {/* Contenedor del slider - centrado y con ancho máximo */}
      <div className="w-full max-w-4xl mx-auto mb-8">
        {/* `group` para control de visibilidad al hover si quieres */}
        <div className="relative group">
          {/* Flecha izquierda */}
          <button
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 shadow-lg opacity-100 group-hover:opacity-100 transition"
            aria-label="Anterior"
          >
            <span className="text-2xl select-none">‹</span>
          </button>

          {/* Imagen - ocupa todo el ancho del contenedor */}
          <Image
            src={images[currentImageIndex]}
            alt={`Craft Image ${currentImageIndex + 1}`}
            width={1200}
            height={700}
            className="w-full h-auto max-h-[500] max-auto rounded-lg object-contain"
            priority
          />

          {/* Flecha derecha */}
          <button
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 bg-black/50 text-white rounded-full p-3 hover:bg-black/70 shadow-lg opacity-100 group-hover:opacity-100 transition"
            aria-label="Siguiente"
          >
            <span className="text-2xl select-none">›</span>
          </button>
        </div>
      </div>

      <p className={`${merriweather.className} text-lg md:text-xl mb-4`}>
        Discover unique handcrafted items or share your own creations with the world.
      </p>

      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <Link
          href="/login"
          className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Join as a Buyer
        </Link>
        <Link
          href="/apply"
          className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
        >
          Apply as Artisan
        </Link>
      </div>

      <div className="text-sm text-gray-600">
        <p className="mb-2">Just want to browse?</p>
        <Link
          href="/products"
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
        >
          Enter as Visitor
        </Link>
      </div>
    </main>
  );
}