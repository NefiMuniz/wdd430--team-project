import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4 py-8 text-center">
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Handcrafted Haven</h1>

      {/* Hero Section */}
      <div className="mb-8 w-full max-w-4xl">
        <Image
          src="/artisans.webp"
          alt="Handmade Crafts Hero"
          width={200}
          height={100}
          className="w-auto h-auto rounded shadow-md"
        />
      </div>
      <div className="mb-8 w-full max-w-4xl">
        <Image
          src="/artisans2.webp"
          alt="Handmade Crafts Hero"
          width={200}
          height={100}
          className="w-auto h-auto rounded shadow-md"
        />
      </div>
      <div className="mb-8 w-full max-w-4xl">
        <Image
          src="/artisan3.webp"
          alt="Handmade Crafts Hero"
          width={200}
          height={100}
          className="w-auto h-auto rounded shadow-md"
        />
      </div>
      <div className="mb-8 w-full max-w-4xl">
        <Image
          src="/artisan4.webp"
          alt="Handmade Crafts Hero"
          width={200}
          height={100}
          className="w-auto h-auto rounded shadow-md"
        />
      </div>

      {/* Call to Action */}
      <p className="text-lg md:text-xl mb-4">
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

      {/* Access as Visitor */}
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