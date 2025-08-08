'use client';
import { ProductField } from '@/lib/definitions';
import Link from 'next/link';
import { createReview, State } from '@/lib/actions';
import { useState, useActionState } from 'react';
import { Button } from './button';

export default function Form({ products }: { products: ProductField[] }) {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useActionState(createReview, initialState);
  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Product */}
        <div className="mb-4">
          <label htmlFor="product" className="mb-2 block text-sm font-medium">
            Choose product
          </label>
          <div className="relative">
            <select
              id="product"
              name="productId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="product-error"
            >
              <option value="" disabled>
                Select a product
              </option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
                <div id="product-error" aria-live="polite" aria-atomic="true">
        {state.errors?.productId &&
          state.errors.productId.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

            {/* Rating */}
      <div className="flex flex-col">
        <label htmlFor="rating" className="mb-1 text-sm font-medium text-gray-700">Rating</label>
        <div className="flex space-x-1 cursor-pointer text-2xl">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className={`h-8 w-8 ${ (hoverRating || rating) >= star ? 'text-yellow-400' : 'text-gray-300' }`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.958a1 1 0 00.95.69h4.213c.969 0 1.371 1.24.588 1.81l-3.414 2.48a1 1 0 00-.364 1.118l1.286 3.958c.3.921-.755 1.688-1.54 1.118l-3.414-2.48a1 1 0 00-1.175 0l-3.414 2.48c-.784.57-1.839-.197-1.54-1.118l1.286-3.958a1 1 0 00-.364-1.118L2.44 9.385c-.783-.57-.38-1.81.588-1.81h4.213a1 1 0 00.95-.69l1.286-3.958z" />
            </svg>
          ))}
        </div>
      </div>
      
          <div id="product-error" aria-live="polite" aria-atomic="true">
        {state.errors?.rating &&
          state.errors.rating.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>

            {/* Comment*/}
      <div className="flex flex-col">
        <label htmlFor="comment" className="mb-1 text-sm font-medium text-gray-700">
          Comment
        </label>
        <textarea
          id="comment"
          rows={4}
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />
      </div>

      <div id="product-error" aria-live="polite" aria-atomic="true">
        {state.errors?.comment &&
          state.errors.comment.map((error: string) => (
            <p className="mt-2 text-sm text-red-500" key={error}>
              {error}
            </p>
          ))}
      </div>
      
        </div>
        <Link
          href="/products"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Review</Button>
      </div>
    </form>
  );
}