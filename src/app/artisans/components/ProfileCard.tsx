'use client';

export default function ArtisanProfileCard() {
    return (
        <div className="flex flex-col space-y-4 max-w-md mx-auto border p-4 rounded shadow">
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500">
            Image Placeholder
        </div>
        <div className="bg-gray-100 p-4 rounded text-gray-700">
            <p>
            This is a short bio about the artisan. It will include details about their background,
            craft, and interests.
            </p>
        </div>
        </div>
    );
}
