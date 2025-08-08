import Form from '@/app/ui/CreateReviewForm';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProduct } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create reviews',
};
 
export default async function Page() {
  const products = await fetchProduct();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'reviews', href: '/products/review' },
          {
            label: 'Create review',
            href: '/products/review/page',
            active: true,
          },
        ]}
      />
      <Form products={products} />
    </main>
  );
}