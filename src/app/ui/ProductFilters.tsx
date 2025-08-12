'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function ProductFilters({ categories, artisans }: { categories: {id: number; name: string}[], artisans: {id: number; name: string}[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [artisan, setArtisan] = useState(searchParams.get('artisan') || '');
  const [priceRange, setPriceRange] = useState([0, 1000]); // valores padrão

  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (artisan) params.set('artisan', artisan);
    if (priceRange) {
      params.set('minPrice', priceRange[0].toString());
      params.set('maxPrice', priceRange[1].toString());
    }
    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push('/products');
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-4">
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Todas as Categorias</option>
        {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
      </select>

      <select value={artisan} onChange={(e) => setArtisan(e.target.value)}>
        <option value="">Todos os Artesãos</option>
        {artisans.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
      </select>

      {/* Slider duplo para preço */}
      <input
        type="range"
        min={0}
        max={2000}
        value={priceRange[0]}
        onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
      />
      <input
        type="range"
        min={0}
        max={2000}
        value={priceRange[1]}
        onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
      />
      <p>Preço: ${priceRange[0]} - ${priceRange[1]}</p>

      <div className="flex gap-2">
        <button onClick={applyFilters} className="bg-blue-500 text-white px-4 py-2 rounded">Aplicar</button>
        <button onClick={resetFilters} className="bg-gray-300 px-4 py-2 rounded">Remover Filtros</button>
      </div>
    </div>
  );
}
