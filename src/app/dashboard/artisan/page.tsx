// app/dashboard/artisan/page.tsx
import ProductCard from "@/app/ui/ProductCard";
import CreateProductForm from "./CreateProductForm";
import { getAllCategories, getArtisanByUserId, getArtisanProducts } from "@/lib/data";
import { getCurrentUser } from "@/lib/auth";

export default async function ArtisanDashboard() {
  // Get the current user from JWT
  const currentUser = await getCurrentUser();
  
  // Verify the user is an artisan
  if (currentUser.role !== 'artisan') {
    return (
      <div className="px-4 py-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
          Access Denied
        </h1>
        <p className="text-center text-gray-500">
          Only artisans can access this dashboard.
        </p>
      </div>
    );
  }
  
    const categories = await getAllCategories();

  // Get the artisan profile using the user ID from JWT
  const artisan = await getArtisanByUserId(currentUser.user_id);
  
  if (!artisan) {
    return (
      <div className="px-4 py-8">
        <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
          Artisan Dashboard
        </h1>
        <p className="text-center text-gray-500">
          No artisan profile found for your account.
        </p>
      </div>
    );
  }

  // Get the artisan's products
  const products = await getArtisanProducts(artisan.id);

  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">
        {artisan.name}s Dashboard
      </h1>
      
      <div className="mb-8 p-6 bg-white rounded-lg shadow text-gray-700">
        <h2 className="text-xl font-semibold mb-4">Your Artisan Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="font-medium">Name:</p>
            <p>{artisan.name}</p>
          </div>
          <div>
            <p className="font-medium">Total Products:</p>
            <p>{products.length}</p>
          </div>
          {artisan.bio && (
            <div className="md:col-span-1">
              <p className="font-medium">Bio:</p>
              <p>{artisan.bio}</p>
            </div>
          )}
        </div>
        </div>
          
          <div className="mb-8 text-gray-700">
      <CreateProductForm categories={categories} />
    </div>

      <h2 className="text-xl font-semibold mb-4">Your Products</h2>
      <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
        {products.length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500 mb-4">
              You havent added any products yet.
            </p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add Your First Product
            </button>
          </div>
        )}
      </div>
    </div>
  );
}