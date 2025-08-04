import Image from 'next/image';
import { Product } from '@/lib/definitions';
import { formatCurrency } from '@/lib/utils';

export default function ProductCard({
    id,
    name,
    description,
    price,
    artisan_id,
    category_id,
}: Product) {
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
            <Image
                src={'/images/default-avatar.png'}
                alt={name ? `${name}` : 'unknown product'}
                width={128}
                height={128}
                sizes="(max-width: 768px) 100vw, 128px"
                className="rounded-full object-cover mb-4"
                priority
            />
            <h2 className="text-gray-600 text-xl font-semibold mb-2">{name}</h2>
            <p className="text-gray-600">{formatCurrency(price)}</p>
            <p className="text-gray-600">{description}</p>
        </div>
    );
}