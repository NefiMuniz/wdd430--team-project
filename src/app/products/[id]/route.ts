// src/app/api/products/[id]/route.ts
import { getProductById, getReviewsByProductId } from '@/lib/data';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const product = await getProductById(Number(params.id));
  const reviews = await getReviewsByProductId(Number(params.id));
  
  return NextResponse.json({ product, reviews });
}