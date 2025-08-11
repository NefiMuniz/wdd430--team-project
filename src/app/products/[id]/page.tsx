import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, getArtisanById, getReviewsByProductId } from "@/lib/data";
import ReviewListAndFormWrapper from "./ReviewListAndFormWrapper";

interface Props {
  params: { id: string };
}

export default async function ProductPage({ params }: Props) {
  const id = parseInt(params.id);

  const product = await getProductById(id);
  if (!product) notFound();

  const artisan = await getArtisanById(product.artisan_id);
  const reviews = await getReviewsByProductId(id);

  return (
    <div className="px-4 py-8 max-w-3xl mx-auto">
      <h1 className="text-center text-3xl font-bold mb-6">{product.name}</h1>

      <Image
        src={`/images/${product.image_url}.webp` || "/images/no_image.jpg"}
        alt={product.name || "Product image"}
        width={512}
        height={512}
        sizes="(max-width: 768px) 100vw, 512px"
        className="rounded-lg object-cover mx-auto mb-6 bg-gray-100"
        priority
      />

      <p className="text-gray-600 text-lg mb-4">{product.description}</p>
      <p className="text-gray-800 font-semibold text-xl mb-6">${product.price}</p>

      {artisan && artisan.length > 0 && (
        <div className="border-t pt-6 mt-6">
          <h2 className="text-xl font-semibold mb-4">Artisan Information</h2>
          <div className="flex items-center space-x-4">
            <Image
              src={`/images/${artisan[0].profile_image_url}.webp` || "/images/no_image.jpg"}
              alt={artisan[0].name || "Artisan portrait"}
              width={64}
              height={64}
              className="rounded-full object-cover bg-gray-100"
            />
            <div>
              <p className="font-medium">{artisan[0].name}</p>
              <p className="text-gray-600">{artisan[0].bio}</p>
            </div>
          </div>
        </div>
      )}

      <section className="mt-12">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {/* Aqui passamos reviews e productId para o componente client */}
        <ReviewListAndFormWrapper reviews={reviews} productId={id} userId={0} />
      </section>
    </div>
  );
}
