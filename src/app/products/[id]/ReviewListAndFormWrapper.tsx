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

export default function ReviewListAndFormWrapper({ reviews, productId, product, artisan }: WrapperProps) {
  const [userId, setUserId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const res = await fetch("/api/auth/session", { credentials: "include" });
        const data = await res.json();
        console.log("Session data:", data);

        if (data?.loggedIn && data?.id) {
          setUserId(Number(data.id));
        } else {
          setUserId(null);
        }
      } catch (error) {
        console.error("Failed to fetch user session:", error);
        setUserId(null);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  if (loading) return <p>Loading user info...</p>;

  // Aqui removemos o if (userId === null) e sempre renderizamos o formulário,
  // passando o userId (que pode ser null) para o componente ReviewListAndForm.

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
