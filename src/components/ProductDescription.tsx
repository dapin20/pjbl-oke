import { Leaf, PackageCheck, Truck } from "lucide-react";

interface Feature {
  title: string;
  desc: string;
  icon: "leaf" | "can" | "truck";
}

interface Props {
  description: string;
  features: Feature[];
}

const IconMap = {
  leaf: <Leaf className="w-6 h-6 text-red-900" />,
  can: <PackageCheck className="w-6 h-6 text-red-900" />,
  truck: <Truck className="w-6 h-6 text-red-900" />,
};

export default function ProductDescription({ description, features }: Props) {
  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Tentang Produk Ini
      </h2>
      <p className="text-gray-600 leading-relaxed mb-8 text-justify">
        {description}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-t border-gray-100">
        {features.map((feat, idx) => (
          <div key={idx} className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-red-50 rounded-lg">
                {IconMap[feat.icon]}
              </div>
              <h3 className="font-bold text-gray-900">{feat.title}</h3>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
