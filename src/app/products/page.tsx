import ProductCard from "../ui/ProductCard";
import ProductFilters from "../ui/ProductFilters";
import { getAllProducts, getAllCategories, getAllArtisans } from "@/lib/data";

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string;
    artisan?: string;
    minPrice?: string;
    maxPrice?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;

  const categoryId = params.category || null;
  const artisanId = params.artisan || null;
  const minPrice = params.minPrice ? Number(params.minPrice) : null;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : null;

  // Buscar dados para preencher os filtros
  const [categories, artisans] = await Promise.all([
    getAllCategories(),
    getAllArtisans(),
  ]);

  // Buscar produtos
  let products = await getAllProducts();

  // Aplicar filtros em memória
  if (categoryId) {
    products = products.filter((p) => p.category_id === Number(categoryId));
  }
  if (artisanId) {
    products = products.filter((p) => p.artisan_id === Number(artisanId));
  }
  if (minPrice !== null && maxPrice !== null) {
    products = products.filter(
      (p) => p.price >= minPrice && p.price <= maxPrice
    );
  }

  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
        Product Listings
      </h1>

      {/* Filtros */}
      <ProductFilters categories={categories} artisans={artisans} />

      {/* Lista de produtos */}
      <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {products.length === 0 && (
          <p className="text-center col-span-full text-gray-500">
            Nenhum produto encontrado para os filtros aplicados.
          </p>
        )}
      </div>
    </div>
  );
}
