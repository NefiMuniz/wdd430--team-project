import "./globals.css";
import { ReactNode } from "react";
import TopNav from "./ui/topNav";

export const metadata = {
  title: "Handcrafted Haven",
  description: "A place for artisans and lovers of handmade treasures.",
};

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

