"use client";

import { useState } from "react";

interface Review {
  id: number;
  user_id: number;
  rating: number | null;
  comment: string | null;
  created_at: string;
}

interface ReviewListAndFormProps {
  reviews: Review[];
  productId: number;
  userId: number;
}

export default function ReviewListAndForm({ reviews: initialReviews, productId, userId }: ReviewListAndFormProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rating) {
      alert("Please, give a rate");
      return;
    }

    setSubmitting(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, userId, rating, comment }),
    });

    if (res.ok) {
      
      const resReviews = await fetch(`/api/reviews?productId=${productId}`);
      if (resReviews.ok) {
        const data = await resReviews.json();
        setReviews(data.reviews);
      }

      setRating(null);
      setComment("");
      alert("Review sent successfully");
    } else {
      alert("Error sending review");
    }

    setSubmitting(false);
  }

  return (
    <>
      {reviews.length === 0 && <p>No review found</p>}
      {reviews.map((review) => (
        <div key={review.id} className="border p-4 rounded mb-4">
          <p className="font-semibold">Rate: {review.rating ?? "N/A"}</p>
          <p>{review.comment ?? "(Sem comentário)"}</p>
          <p className="text-sm text-gray-500">{new Date(review.created_at).toLocaleString()}</p>
        </div>
      ))}

      <form onSubmit={handleSubmit} className="space-y-4 mt-8 max-w-md">
        <div>
          <label className="block font-semibold mb-1">Rate:</label>
          <select
            value={rating ?? ""}
            onChange={(e) => setRating(Number(e.target.value))}
            required
            className="border rounded px-3 py-2 w-full"
          >
            <option value="" disabled>
              Select a Rate
            </option>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "star" : "stars"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-1">Comment:</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment"
            rows={4}
            className="border rounded px-3 py-2 w-full"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {submitting ? "Sending..." : "Send review"}
        </button>
      </form>
    </>
  );
}
