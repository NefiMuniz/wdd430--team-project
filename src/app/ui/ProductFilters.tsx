'use client';

import * as Slider from '@radix-ui/react-slider';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import './slider-styles.css';

export default function ProductFilters({
  categories,
  artisans,
  priceRange,
  currentMinPrice,
  currentMaxPrice
}: {
  categories: { id: number; name: string }[];
  artisans: { id: number; name: string }[];
  priceRange: { min: number; max: number };
  currentMinPrice: number;
  currentMaxPrice: number;
}) {

  const router = useRouter();
  const searchParams = useSearchParams();

  const [category, setCategory] = useState(searchParams.get('category') || '');
  const [artisan, setArtisan] = useState(searchParams.get('artisan') || '');
  const [priceValues, setPriceValues] = useState([currentMinPrice, currentMaxPrice]);

  // Update values when params change
  useEffect(() => {
    setPriceValues([currentMinPrice, currentMaxPrice]);
  }, [currentMinPrice, currentMaxPrice]);


  const applyFilters = () => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (artisan) params.set('artisan', artisan);

    params.set('minPrice', priceValues[0].toString());
    params.set('maxPrice', priceValues[1].toString());

    router.push(`/products?${params.toString()}`);
  };

  const resetFilters = () => {
    setCategory('');
    setArtisan('');
    setPriceValues([priceRange.min, priceRange.max]);

    router.push('/products');
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Artisan</label>
        <select
          value={artisan}
          onChange={(e) => setArtisan(e.target.value)}
          className="w-full p-2 border rounded text-gray-700"
        >
          <option value="">All Artisans</option>
          {artisans.map(a => (
            <option key={a.id} value={a.id}>{a.name}</option>
          ))}
        </select>
      </div>
      

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Price Range: ${priceValues[0]} - ${priceValues[1]}
        </label>
        <Slider.Root
          className="relative flex items-center select-none touch-none h-5 w-full"
          min={priceRange.min}
          max={priceRange.max}
          step={1}
          value={priceValues}
          onValueChange={setPriceValues}
          minStepsBetweenThumbs={1}
        >
          <Slider.Track className="SliderTrack">
            <Slider.Range className="SliderRange" />
          </Slider.Track>
          <Slider.Thumb className="SliderThumb" />
          <Slider.Thumb className="SliderThumb" />
        </Slider.Root>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>${priceRange.min}</span>
          <span>${priceRange.max}</span>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          onClick={applyFilters}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition-colors text-gray-700"
        >
          Apply Filters
        </button>
        <button
          onClick={resetFilters}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded transition-colors text-gray-700"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
