import ArtisanCard from "./ArtisanCard";
import { Artisan } from '../../lib/definitions';

const artisans: Artisan[] = [
  {
    name: "María López",
    bio: "Ceramic artist from Oaxaca, blending tradition with modern design.",
    imageUrl: "/images/maria.jpg",
  },
  {
    name: "José Martínez",
    bio: "Textile weaver using backstrap looms and natural dyes.",
    imageUrl: "/images/jose.jpg",
  },
];

export default function ArtisansPage() {
  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">Artisans Directory</h1>

    
      <div className="flex flex-col space-y-8 md:grid md:grid-cols-2 md:gap-8 md:space-y-0">
        {artisans.map((artisan, index) => (
          <ArtisanCard
            key={index}
            name={artisan.name}
            bio={artisan.bio}
            imageUrl={artisan.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}
