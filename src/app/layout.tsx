import "./globals.css";
import { ReactNode } from "react";
import TopNav from "./topNav";

export const metadata = {
  title: "Handcrafted Haven",
  description: "A place for artisans and lovers of handmade treasures.",
};

function TopNav() {
  return (
    <nav className="p-4 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-center items-center flex-wrap md:justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">
          Handcrafted Haven
        </Link>
        <div className="flex gap-4">
          <Link href="/products" className="hover:text-blue-600">Products</Link>
          <Link href="/artisans" className="hover:text-blue-600">Artisans</Link>
          <Link href="/cart" className="hover:text-blue-600">Cart</Link>
          <Link href="/manager" className="hover:text-blue-600">Manager</Link>
          <Link href="/login" className="hover:text-blue-600">Login</Link>
        </div>
      </div>
      
    </nav>
  );
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 font-sans">
        <TopNav />
        {children}
      </body>
    </html>
  );
}
