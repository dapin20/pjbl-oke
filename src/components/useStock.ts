"use client";

import { useEffect, useState } from "react";

export type StockItem = {
  id: string;
  slug: string;
  name: string;
  image: string;
  stock: number;
};

// Satu request untuk semua kartu; hasilnya di-cache di memory selama sesi tab.
let stockPromise: Promise<StockItem[]> | null = null;

function fetchStock(): Promise<StockItem[]> {
  if (!stockPromise) {
    stockPromise = fetch("/api/stock")
      .then((res) => res.json())
      .then((data) => (data.items ?? []) as StockItem[])
      .catch(() => {
        stockPromise = null;
        return [] as StockItem[];
      });
  }
  return stockPromise;
}

export function useStockMap(): Record<string, number> {
  const [stockMap, setStockMap] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    fetchStock().then((items) => {
      if (cancelled) return;
      const map: Record<string, number> = {};
      for (const item of items) map[item.slug] = item.stock;
      setStockMap(map);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return stockMap;
}
