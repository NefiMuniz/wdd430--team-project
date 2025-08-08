import  ProductCard from "../ui/ProductCard";
import  ReviewCard from "../ui/ReviewCard";
import { getAllProducts, getAllReviews } from "@/lib/data";
import Link from "next/link";
//import { neon } from '@neondatabase/serverless';

export default async function ProductsPage() {
  const products = await getAllProducts();
  const reviews = await getAllReviews();
  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">Product Listings</h1>

      <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {products.map((product, index) => (
          <ProductCard
            key={index}
            id={product.id}
            name={product.name}
            description={product.description}
            price={product.price}
            artisan_id={product.artisan_id}
            category_id={product.category_id}
            created_by={product.created_by}
          />
        ))}
      </div>

      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-8">Reviews</h2>

      <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            id={review.id}
            product_id={review.product_id}
            user_id ={review.user_id}
            rating={review.rating}
            comment={review.comment}
          />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="px-6 py-3">If you registered, you can opine about the products by clicking this button.</p>
        <Link
          href="/products/review"
          className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
          Review
        </Link>
        </div>
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