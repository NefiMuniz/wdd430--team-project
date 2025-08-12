"use client";

import { useState } from "react";
import type { Review, Product, Artisan } from "@/lib/definitions";

interface Props {
  product: Product;
  artisan: Artisan | null;
  reviews: Review[];
  productId: number;
  userId: number | null;
}

export default function ReviewListAndForm({ product, artisan, reviews, productId, userId }: Props) {
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (userId === null) {
      alert("You must be logged in to submit a review.");
      return;
    }

    if (!rating) {
      alert("Please select a rating.");
      return;
    }

    alert(`Submitted review! Rating: ${rating}, Comment: "${comment}"`);
  };

  return (
    <div>
      <section className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>

        {userId === null ? (
          <p>You must be logged in to leave a review.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
            <div>
              <label htmlFor="rating" className="block font-medium mb-1">
                Rating:
              </label>
              <select
                id="rating"
                value={rating ?? ""}
                onChange={(e) => setRating(Number(e.target.value))}
                required
                className="border rounded px-2 py-1 w-full"
              >
                <option value="" disabled>
                  Select rating
                </option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>
                    {num} Star{num > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="comment" className="block font-medium mb-1">
                Comment:
              </label>
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={4}
                placeholder="Write your review here..."
                className="border rounded px-2 py-1 w-full"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </form>
        )}

        <section className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Existing Reviews</h3>
          {reviews.length === 0 ? (
            <p>No reviews yet.</p>
          ) : (
            <ul className="space-y-4">
              {reviews.map((review) => (
                <li key={review.id} className="border p-4 rounded shadow-sm">
                  <p>
                    <strong>Rating:</strong> {review.rating ?? "N/A"} Star
                    {review.rating && review.rating > 1 ? "s" : ""}
                  </p>
                  <p>{review.comment ?? "(No comment)"}</p>
                  <p className="text-sm text-gray-500">
                    Reviewed on {new Date(review.created_at).toLocaleDateString()}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </section>
    </div>
  );
}
