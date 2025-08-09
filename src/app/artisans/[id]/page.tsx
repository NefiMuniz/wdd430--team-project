import Image from 'next/image';
import { getArtisanById, getProductsByArtisan } from "@/lib/data";
import ProductCard from '@/app/ui/ProductCard';
import { notFound } from 'next/navigation';

export default async function ArtisanPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = parseInt(params.id);
  const [artisan, products] = await Promise.all([
    getArtisanById(id),
    getProductsByArtisan(id),
  ]);
  if (!artisan) {
    notFound();
  }
  return (
    <>
      <h1 className="text-center mt-20 text-3xl mb-4">{artisan[0].name}</h1>
      <Image
        src={artisan[0].imageUrl || '/images/default-avatar.png'}
        alt={artisan[0].name ? `${artisan[0].name}'s portrait` : 'Artisan portrait'}
        width={128}
        height={128}
        sizes="(max-width: 768px) 100vw, 128px"
        className="rounded-full object-cover block bg-gray-100 m-auto"
        priority
      />
      <p className="text-center text-lg mt-4 mb-4">{artisan[0].bio}</p>
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
    </>
  );
}