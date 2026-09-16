"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Link
      href={`/produk/${product.slug}`}
      className="group block bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-6">{product.name}</h3>
        <p className="text-red-900 font-bold text-lg mb-4">
          {formatPrice(product.price)}
        </p>
        <span className="block w-full bg-red-900 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors duration-300 shadow-md hover:shadow-lg text-center">
          Pre-Order
        </span>
      </div>
    </Link>
  );
}
