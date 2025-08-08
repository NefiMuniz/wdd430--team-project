import { Review } from '@/lib/definitions';

export default function ReviewCard({
    id,
    product_id,
    user_id,
    rating,
    comment,
    created_at,
}: Review) {
    return (
        <div className="w-full max-w-md mx-auto bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-cenert">
            <h2 className="text-gray-600 text-xl font-semibold mb-2">{product_id}</h2>
            <p className="text-gray-600">{user_id}</p>
            <p className="text-gray-600">{rating}</p>
            <p className="text-gray-600">{comment}</p>
        </div>
    );
}