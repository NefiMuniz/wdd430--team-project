"use client";

import { useEffect, useState } from "react";
import ProductCard from "../ui/ProductCard";
import type { Product } from "@/lib/definitions";

export default function ProductFilter({ products }: { products: Product[] }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    useEffect(() => {
        const filtered = products.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchTerm, products]);

    return (
        <>
            <div className="max-w-md mx-auto mb-6">
                <input type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                />
            </div>

            <div className="flex flex-col space-y-8 md:grid md:grid-cols-3 md:gap-8 md:space-y-0">
                {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product}/>
                ))}
            </div>
        </>
    )
}