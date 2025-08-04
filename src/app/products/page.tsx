import ProductCard from "../ui/ProductCard";
//import { neon } from '@neondatabase/serverless';

const products = [
  {
    id: 1,
    name: "product",
    description: "product description",
    price: 2200,
    artisan_id: 1,
    category_id: 1,
  },
  {
    id: 2,
    name: "product",
    description: "product description",
    price: 2400,
    artisan_id: 1,
    category_id: 1,
  },
  {
    id: 3,
    name: "product",
    description: "product description",
    price: 2400,
    artisan_id: 1,
    category_id: 1,
  },
  {
    id: 4,
    name: "product",
    description: "product description",
    price: 2400,
    artisan_id: 1,
    category_id: 1,
  },
];

export default function ProductsPage() {
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
          />
        ))}
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