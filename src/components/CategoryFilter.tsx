"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/products";

interface CategoryFilterProps {
  defaultCategory?: string;
  onCategoryChange?: (category: string) => void;
}

export default function CategoryFilter({
  defaultCategory = "all",
  onCategoryChange,
}: CategoryFilterProps) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(defaultCategory);

  const handleCategoryClick = (slug: string) => {
    setActiveCategory(slug);
    onCategoryChange?.(slug);
    const params = new URLSearchParams(window.location.search);
    if (slug === "all") {
      params.delete("category");
    } else {
      params.set("category", slug);
    }
    router.push(`/katalog?${params.toString()}`);
  };

  return (
    <div className="inline-flex space-x-2 rounded-full bg-gray-100 p-1">
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.slug)}
          className={`px-6 py-2 rounded-full transition-all duration-300 ${
            activeCategory === category.slug
              ? "bg-red-900 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-200"
          }`}>
          {category.name}
        </button>
      ))}
    </div>
  );
}
