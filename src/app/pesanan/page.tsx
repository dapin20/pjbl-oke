"use client";

import OrderHistory from "@/components/OrderHistory";
import OrderStats from "@/components/OrderStats";
import OrderFilter from "@/components/OrderFilter";
import OrderTable from "@/components/OrderTable";
import PickupInfo from "@/components/PickupInfo";
import { useAuth } from "@/components/AuthProvider";

interface PesananPageProps {
  searchParams: {
    status?: string;
  };
}

export default function PesananPage({ searchParams }: PesananPageProps) {
  const { user } = useAuth();
  const status = searchParams.status || "all";

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <span className="text-sm text-gray-600 font-medium">
              HALO, {user?.fullName?.toUpperCase() ?? "PELANGGAN"}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Riwayat Pre-Order
              </h1>
              <p className="text-gray-600 max-w-xl">
                Lacak status pesanan snack Anda. Kami sedang menyiapkan pesanan
                terbaik khusus untuk Anda.
              </p>
            </div>

            <OrderStats />
          </div>
        </div>

        {/* Pickup Information */}
        <PickupInfo />

        {/* Order Filter Tabs */}
        <OrderFilter currentStatus={status} />

        {/* Order Table */}
        <OrderTable currentStatus={status} />
      </div>
    </div>
  );
}
