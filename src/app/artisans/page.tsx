import ArtisanCard from "../ui/ArtisanCard";
import { getAllArtisans } from "@/lib/data";

export default async function ArtisansPage() {
  const artisans = await getAllArtisans();
  return (
    <div className="px-4 py-8">
      <h1 className="text-center text-2xl sm:text-3xl font-bold mb-8">Artisans Directory</h1>

      <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
        {artisans.map((artisan, index) => (
          <ArtisanCard
            key={index}
            id={artisan.id}
            user_id={artisan.user_id}
            name={artisan.name}
            bio={artisan.bio}
            profile_image_url={artisan.profile_image_url}
            is_deleted={artisan.is_deleted}
          />
        ))}
      </div>
    </div>
  );
}