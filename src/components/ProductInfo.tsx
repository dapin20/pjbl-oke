"use client";
import { useState } from "react";
import { Product } from "@/types/product";
import {
  Calendar,
  Clock,
  Truck,
  Minus,
  Plus,
  ArrowRight,
  Info,
} from "lucide-react"; // Pastikan install lucide-react

interface Props {
  product: Product;
}

export default function ProductInfo({ product }: Props) {
  const [qty, setQty] = useState(1);

  const formatRupiah = (num: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(num);

  const subtotal = product.price * qty;
  const progressPercent =
    (product.batchInfo.slotsFilled / product.batchInfo.totalSlots) * 100;

  return (
    <div className="flex flex-col h-full">
      {/* Header Info */}
      <span className="text-xs font-bold tracking-wider text-red-900 uppercase mb-2">
        {product.category}
      </span>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4">
        {product.name}
      </h1>

      <div className="flex items-end gap-3 mb-6">
        <span className="text-3xl font-bold text-red-900">
          {formatRupiah(product.price)}
        </span>
        {product.originalPrice && (
          <>
            <span className="text-lg text-gray-400 line-through mb-1">
              {formatRupiah(product.originalPrice)}
            </span>
            <span className="mb-2 px-2 py-0.5 bg-red-50 text-red-700 text-xs font-semibold rounded border border-red-100">
              {product.discount}
            </span>
          </>
        )}
      </div>

      {/* Batch Schedule Box */}
      <div className="bg-white border border-red-100 rounded-xl p-5 mb-6 shadow-sm">
        <div className="mb-4 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2 text-red-900 font-semibold">
            <Calendar size={18} />
            <span>Jadwal Pre-Order Batch #{product.batchInfo.batchNumber}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            <p className="text-gray-500 text-xs mb-1">Buka Batch</p>
            <p className="font-medium text-gray-900">
              {product.batchInfo.openDate}
            </p>
          </div>
          <div>
            <p className="text-gray-500 text-xs mb-1">Batas Order</p>
            <p className="font-medium text-gray-900">
              {product.batchInfo.closeDate}
            </p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-2">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-gray-600">Slot Terisi</span>
            <span className="font-bold text-red-900">
              {product.batchInfo.slotsFilled} / {product.batchInfo.totalSlots}{" "}
              Slot
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-red-900 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {/* Quantity & Subtotal */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Jumlah:</span>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setQty(Math.max(1, qty - 1))}
              className="px-3 py-2 hover:bg-gray-50 text-gray-600">
              <Minus size={16} />
            </button>
            <span className="w-10 text-center font-semibold text-gray-900">
              {qty}
            </span>
            <button
              onClick={() => setQty(qty + 1)}
              className="px-3 py-2 hover:bg-gray-50 text-gray-600">
              <Plus size={16} />
            </button>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 mb-1">Subtotal</p>
          <p className="text-xl font-bold text-red-900">
            {formatRupiah(subtotal)}
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button className="w-full bg-red-900 hover:bg-red-800 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-red-900/20 mb-4">
        Pesan Pre-Order Sekarang <ArrowRight size={20} />
      </button>

      <div className="flex items-start gap-2 text-xs text-gray-500 mt-2">
        <Info size={14} className="mt-0.5 flex-shrink-0" />
        <p>
          Pembayaran dilakukan di muka. Pesanan diproses serentak setelah batch
          ditutup.
        </p>
      </div>
    </div>
  );
}
