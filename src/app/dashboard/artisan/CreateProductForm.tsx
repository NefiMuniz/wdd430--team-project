'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateProductForm({ categories }: { categories: { id: number; name: string; }[] }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || '');
  const [message, setMessage] = useState('');

  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        description,
        price: parseFloat(price),
        category_id: categoryId,
      }),
    });

    if (res.ok) {
      setMessage('✅ Product added successfully');
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId(categories[0]?.id || '');
      router.refresh();
    } else {
      const data = await res.json();
      setMessage(`❌ Error: ${data.message || 'Unknown'}`);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-xl font-bold text-gray-700">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="w-full border p-2 rounded text-gray-700"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="w-full border p-2 rounded text-gray-700"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        step="0.01"
        className="w-full border p-2 rounded text-gray-700"
      />

      <select
        value={categoryId}
        onChange={(e) => setCategoryId(Number(e.target.value))}
        className="w-full border p-2 rounded text-gray-700"
      >
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.name}
          </option>
        ))}
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white p-2 rounded hover:bg-green-700"
      >
        Add Product
      </button>

      {message && <p className="mt-2">{message}</p>}
    </form>
  );
}
