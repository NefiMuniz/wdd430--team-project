import Image from 'next/image';
import { Artisan } from '@/lib/definitions';

export default function ArtisanCard({ name, bio, imageUrl }: Artisan) {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Image
                src={imageUrl || '/images/default-avatar.png'}
                alt={name ? `${name}'s portrait` : 'Artisan portrait'}
                width={128}
                height={128}
                sizes="(max-width: 768px) 100vw, 128px"
                className="rounded-full object-cover mb-4"
                priority
            />
            <h2 className="text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600">{bio}</p>
        </div>
    );
}
