'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import postgres from 'postgres';
 
const sql = postgres(process.env.DATABASE_URL!, { ssl: 'require' });
 

const FormSchema = z.object({
  id: z.string(),
  productId: z.string('Product is required'),
  comment: z.string('Comment is required'),
  rating: z.coerce
    .number()
    .gt(0, { message: 'Rating is required' }),
  date: z.string(),
});

export type State = {
  errors?: {
    productId?: string[];
    comment?: string[];
    rating?: string[];
  };
  message?: string | null;
};
 
const CreateReview = FormSchema.omit({ id: true, date: true });
export async function createReview(prevState: State, formData: FormData) {
  const validatedFields = CreateReview.safeParse({
    productId: formData.get('product_id'),
    comment: formData.get('comment'),
    rating: formData.get('rating'),
  });

    if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }
  // Prepare data for insertion into the database
  const { productId, comment, rating } = validatedFields.data;
  const userId = 1; // Replace with actual user ID from session or context
  if (!userId) { 
    return {
      message: 'User not authenticated. Failed to Create Invoice.',
    };
  }
  const date = new Date().toISOString(); // Get current date in ISO format

  try {
    await sql`
      INSERT INTO reviews (product_id, user_id, comment, rating, created_at)
      VALUES (${productId}, ${userId}, ${comment}, ${rating}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }
    revalidatePath('/products');
    redirect('/products');
  }

