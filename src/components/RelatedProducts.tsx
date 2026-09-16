import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { relatedProducts } from "@/data/products";

export default function RelatedProducts() {
  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  return (
    <div className="mt-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Mungkin Kamu Suka</h2>
        <Link
          href="/katalog"
          className="text-red-900 font-semibold text-sm flex items-center gap-1 hover:underline">
          Lihat Semua <ArrowRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((prod) => (
          <Link
            key={prod.id}
            href={`/produk/${prod.slug}`}
            className="block bg-white rounded-xl border border-gray-100 p-4 hover:shadow-md transition-shadow group">
            <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
              <Image
                src={prod.image}
                alt={prod.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 min-h-[3rem]">
              {prod.name}
            </h3>
            <p className="text-red-900 font-bold mb-4">
              {formatRupiah(prod.price)}
            </p>
            <span className="block w-full bg-red-900 text-white py-2 rounded-lg text-sm font-medium group-hover:bg-red-800 transition-colors flex items-center justify-center gap-1">
              Pre-Order <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
