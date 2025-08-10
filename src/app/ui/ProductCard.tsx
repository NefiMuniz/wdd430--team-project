import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/lib/definitions';

export default function ProductCard({
    id,
    name,
    description,
    price,
    artisan_id,
    category_id,
    created_by,
    image_url
}: Product) {
    return (
        <Link
            href={`/products/${id}`}
            className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center hover:shadow-lg transition-shadow"
            >
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
                <Image
                    src={`/images/${image_url}.webp` || '/images/no_image.jpg'}
                    alt={name ? `${name}` : 'unknown product'}
                    width={256}
                    height={256}
                    sizes="(max-width: 768px) 100vw, 128px"
                    className="rounded-md object-cover mb-4 bg-gray-100"
                    priority
                    />
                <h2 className="text-gray-600 text-xl font-semibold mb-2">{name}</h2>
                <p className="text-gray-600">{`$${price}`}</p>
                <p className="text-gray-600">{description}</p>
        </div>
            </Link>
    );
}