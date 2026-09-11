'use client';

export default function OrderStats() {
  return (
    <div className="flex gap-4">
      <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">TOTAL PESANAN</p>
        <p className="text-3xl font-bold text-red-900">03</p>
      </div>
      <div className="bg-white rounded-xl px-6 py-4 shadow-sm border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">DIPROSES</p>
        <p className="text-3xl font-bold text-blue-900">01</p>
      </div>
    </div>
  );
}