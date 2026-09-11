"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface OrderFilterProps {
  currentStatus: string;
}

export default function OrderFilter({ currentStatus }: OrderFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const tabs = [
    { id: "all", label: "Semua" },
    { id: "pending", label: "Pending" },
    { id: "processed", label: "Diproses" },
    { id: "completed", label: "Selesai" },
  ];

  const handleTabClick = (statusId: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (statusId === "all") {
      params.delete("status");
    } else {
      params.set("status", statusId);
    }

    router.push(`/pesanan?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`pb-3 px-2 text-sm font-medium transition-colors relative ${
              currentStatus === tab.id
                ? "text-red-900"
                : "text-gray-600 hover:text-gray-900"
            }`}>
            {tab.label}
            {currentStatus === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-900" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
