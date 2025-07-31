import Image from 'next/image';
import ProductCard from '@/app/ui/ProductCard';

export default function ArtisanPage() {
  const artisan = [{
    name: "María López",
    bio: "Ceramic artist from Oaxaca, blending tradition with modern design.",
    imageUrl: "/images/maria.jpg",
  }];
  return (
    <>
      <h1 className="text-center mt-20 text-3xl">{artisan[0].name}</h1>
      <Image
        src={artisan[0].imageUrl || '/images/default-avatar.png'}
        alt={artisan[0].name ? `${artisan[0].name}'s portrait` : 'Artisan portrait'}
        width={128}
        height={128}
        sizes="(max-width: 768px) 100vw, 128px"
        className="rounded-full object-cover mb-4"
        priority
      />
      <p>{artisan[0].bio}</p>
    </>
  );
}