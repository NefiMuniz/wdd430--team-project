import { addReviewToProduct, getReviewsByProductId } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { productId, userId, rating, comment } = await request.json();

    if (
      typeof productId !== "number" ||
      typeof userId !== "number" ||
      typeof rating !== "number" ||
      typeof comment !== "string"
    ) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    await addReviewToProduct(productId, userId, rating, comment);

    return NextResponse.json({ message: "Review added successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error adding review:", error);
    return NextResponse.json(
      { error: "Failed to add review" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const productIdParam = url.searchParams.get("productId");

    if (!productIdParam) {
      return NextResponse.json({ error: "Missing productId parameter" }, { status: 400 });
    }

    const productId = Number(productIdParam);
    if (isNaN(productId)) {
      return NextResponse.json({ error: "Invalid productId" }, { status: 400 });
    }

    const reviews = await getReviewsByProductId(productId);

    return NextResponse.json({ reviews }, { status: 200 });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}
