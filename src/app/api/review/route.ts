import { addReviewToProduct } from "@/lib/data";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { productId, userId, rating, comment } = await request.json();

        if (typeof productId !== "number"
            || typeof userId !== "number" ||
            typeof rating !== "number" ||
            typeof comment !== "string") {
            return NextResponse.json({ error: "Invalid data" }, { status: 400 });
        }

        await addReviewToProduct(productId, userId, rating, comment);
    } catch (error) {
        console.error("Error adding review:", error);
        return NextResponse.json(
            { error: "Failed to add review" },
            { status: 500 }
        );
    }
}