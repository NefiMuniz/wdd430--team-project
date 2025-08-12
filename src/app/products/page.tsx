import ProductCard from "../ui/ProductCard";
import { getAllProducts } from "@/lib/data";
import ProductFilter from "./ProductFilter";
import type { Product } from "@/lib/definitions";
//import { neon } from '@neondatabase/serverless';

export default async function ProductsPage() {
  const products = await getAllProducts();
  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
        Product Listings
      </h1>

      <ProductFilter products={products}/>
    </div>
  );
}

/*export default function Page() {
  async function create(formData: FormData) {
    'use server';
    // Connect to the Neon database
    const sql = neon(`${process.env.DATABASE_URL}`);
    const comment = formData.get('comment');
    // Insert the comment from the form into the Postgres database
    await sql`INSERT INTO comments (comment) VALUES (${comment})`;
  }

  return (
    <form action={create}>
      <input type="text" placeholder="write a comment" name="comment" />
      <button type="submit">Submit</button>
    </form>
  );
}*/