import Form from '@/app/ui/CreateReviewForm';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchProduct } from '@/lib/data';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create invoices',
};
 
export default async function Page() {
  const products = await fetchProduct();
 
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Create Invoice',
            href: '/dashboard/invoices/create',
            active: true,
          },
        ]}
      />
      <Form products={products} />
    </main>
  );
}