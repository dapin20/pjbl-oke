import { NextResponse } from "next/server";
import { getStockList } from "@/lib/stock";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ items: getStockList() });
}
