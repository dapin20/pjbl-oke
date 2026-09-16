"use client";
import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
}

export default function ProductGallery({ images }: Props) {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative">
        <Image
          src={images[activeImage]}
          alt="Product Detail"
          fill
          className="object-contain p-4"
        />
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-4 gap-3">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
              activeImage === idx
                ? "border-red-900 ring-2 ring-red-100"
                : "border-transparent hover:border-gray-300"
            }`}>
            <Image
              src={img}
              alt={`Thumbnail ${idx}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
