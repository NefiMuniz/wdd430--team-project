"use client";

import { useEffect, useState } from "react";
import ReviewListAndForm from "./ReviewListAndForm";
import type { Review, Product, Artisan } from "@/lib/definitions";

interface WrapperProps {
  reviews: Review[];
  productId: number;
  product: Product;
  artisan: Artisan | null;
}

interface SessionData {
  loggedIn: boolean;
  user_id?: number;
}

export default function ReviewListAndFormWrapper({ reviews, productId, product, artisan }: WrapperProps) {
  const [userId, setUserId] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data: SessionData = await res.json();
        
        if (data?.loggedIn && data?.user_id) {
          setUserId(data.user_id);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <p>Loading user info...</p>;

  return (
    <ReviewListAndForm
      reviews={reviews}
      productId={productId}
      userId={userId}
      product={product}
      artisan={artisan}
    />
  );
}