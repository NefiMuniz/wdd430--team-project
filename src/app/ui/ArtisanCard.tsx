import Image from 'next/image';
import Link from 'next/link';
import { Artisan } from '@/lib/definitions';

export default function ArtisanCard({ id, name, bio, profile_image_url }: Artisan) {
    return (
        <Link href={`/artisans/${id}`} className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Image
                src={`/images/${profile_image_url}.webp` || '/images/no_image.jpg'}
                alt={name ? `${name}'s portrait` : 'Artisan portrait'}
                width={128}
                height={128}
                sizes="(max-width: 768px) 100vw, 128px"
                className="rounded-full object-cover mb-4 bg-gray-100"
                priority
            />
            <h2 className="text-gray-600 text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600">{bio}</p>
        </Link>
    );
}
