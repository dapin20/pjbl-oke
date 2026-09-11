"use client";

import Image from "next/image";

interface OrderTableProps {
  currentStatus: string;
}

// Mock data untuk orders
const orders = [
  {
    id: "#PO-1024",
    date: "12 Okt 2023",
    product: "Kripik Singkong",
    quantity: 2,
    total: 30000,
    status: "pending",
    statusLabel: "Pending",
    image: "/images/kripik-singkong.jpg",
  },
  {
    id: "#PO-1021",
    date: "10 Okt 2023",
    product: "Kacang Atom",
    quantity: 1,
    total: 15000,
    status: "processed",
    statusLabel: "Diproses",
    image: "/images/kacang-atom.jpg",
  },
  {
    id: "#PO-1018",
    date: "08 Okt 2023",
    product: "Manisan Mangga",
    quantity: 3,
    total: 75000,
    status: "completed",
    statusLabel: "Siap Diambil",
    image: "/images/manisan-mangga.jpg",
  },
];

export default function OrderTable({ currentStatus }: OrderTableProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const filterOrders = () => {
    if (currentStatus === "all") return orders;
    return orders.filter((order) => order.status === currentStatus);
  };

  const filteredOrders = filterOrders();

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-200 text-gray-700";
      case "processed":
        return "bg-blue-100 text-blue-700";
      case "completed":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Table Header */}
      <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-700">
        <div className="col-span-3">ORDER ID & TANGGAL</div>
        <div className="col-span-4">PRODUK</div>
        <div className="col-span-3">TOTAL</div>
        <div className="col-span-2">STATUS</div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {filteredOrders.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <p className="text-gray-500">Tidak ada pesanan dengan status ini</p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="px-6 py-4 hover:bg-gray-50 transition-colors">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                {/* Order ID & Date */}
                <div className="md:col-span-3">
                  <p className="font-bold text-gray-900">{order.id}</p>
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {order.date}
                  </div>
                </div>

                {/* Product */}
                <div className="md:col-span-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      <Image
                        src={order.image}
                        alt={order.product}
                        width={48}
                        height={48}
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {order.product}
                      </p>
                      <p className="text-sm text-gray-600">
                        Qty: {order.quantity}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Total */}
                <div className="md:col-span-3">
                  <p className="font-bold text-gray-900">
                    {formatPrice(order.total)}
                  </p>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                      order.status,
                    )}`}>
                    {order.status === "processed" && (
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    )}
                    {order.status === "completed" && (
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    {order.statusLabel}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
