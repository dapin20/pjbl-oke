import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import ProductDescription from "@/components/ProductDescription";
import RelatedProducts from "@/components/RelatedProducts";
import { products } from "@/data/products";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = products.find((item) => item.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[]} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16">
          <div className="lg:col-span-5">
            <ProductGallery images={product.images} />
          </div>

          <div className="lg:col-span-7">
            <ProductInfo product={product} />
          </div>
        </div>

        <div className="mb-16">
          <ProductDescription
            features={product.features}
            description={product.description}
          />
        </div>

        <RelatedProducts />
      </div>
    </div>
  );
}
