import ProductCard from "@/components/ProductCard";
import CategoryFilter from "@/components/CategoryFilter";
import { products } from "@/data/products";

interface KatalogPageProps {
  searchParams: {
    category?: string;
  };
}

export default function KatalogPage({ searchParams }: KatalogPageProps) {
  const category = searchParams.category || "all";

  const filteredProducts =
    category === "all"
      ? products
      : products.filter((product) => product.category === category);

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Katalog Snack
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Temukan camilan favoritmu dan pesan lebih awal. Kualitas terbaik,
              dikirim langsung ke pintumu.
            </p>
          </div>

          <div className="flex justify-end">
            <CategoryFilter defaultCategory={category} />
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                Tidak ada produk dalam kategori ini.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
