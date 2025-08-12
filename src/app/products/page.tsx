import ProductCard from "../ui/ProductCard";
import ProductFilters from "../ui/ProductFilters";
import { getAllProducts, getAllCategories, getAllArtisans, getPriceRange } from "@/lib/data";

<<<<<<< HEAD
interface ProductsPageProps {
  searchParams: Promise<{
=======
export default async function ProductsPage({
  searchParams
}: {
  searchParams: {
>>>>>>> f500a974cc4ed7872d552fbd1f907736fa0ed146
    category?: string;
    artisan?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  // Fetch all necessary data in parallel
  const [categories, artisans, priceRange, allProducts] = await Promise.all([
    getAllCategories(),
    getAllArtisans(),
    getPriceRange(),
    getAllProducts()
  ]);

  // Apply filters
  let filteredProducts = allProducts;
  
  if (params.category) {
    filteredProducts = filteredProducts.filter(p => p.category_id === Number(params.category));
  }
  
  if (params.artisan) {
    filteredProducts = filteredProducts.filter(p => p.artisan_id === Number(params.artisan));
  }
  
  const minPrice = params.minPrice ? Number(params.minPrice) : priceRange.min;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : priceRange.max;
  
  filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);


  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
        Product Listings
      </h1>

      <ProductFilters 
        categories={categories} 
        artisans={artisans}
        priceRange={priceRange}
        currentMinPrice={minPrice}
        currentMaxPrice={maxPrice}
      />

      <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {filteredProducts.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            No products found matching your filters.

          </p>
        )}
      </div>
    </div>
  );
}

