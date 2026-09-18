import { getDb } from "./db";
import { products } from "@/data/products";

export type StockRow = {
  id: string;
  slug: string;
  name: string;
  image: string;
  stock: number;
};

let seeded = false;

function ensureStockTable() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS product_stock (
      id TEXT PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      image TEXT NOT NULL,
      stock INTEGER NOT NULL DEFAULT 0
    );
  `);

  if (seeded) return db;
  const { c } = db
    .prepare("SELECT COUNT(*) AS c FROM product_stock")
    .get() as { c: number };
  if (!c) {
    const insert = db.prepare(
      "INSERT INTO product_stock (id, slug, name, image, stock) VALUES (?, ?, ?, ?, ?)",
    );
    for (const p of products) {
      insert.run(
        p.id,
        p.slug,
        p.name,
        p.image,
        Math.max(p.batchInfo.totalSlots - p.batchInfo.slotsFilled, 0),
      );
    }
  }
  seeded = true;
  return db;
}

export function getStockList(): StockRow[] {
  const db = ensureStockTable();
  return db
    .prepare("SELECT id, slug, name, image, stock FROM product_stock ORDER BY id")
    .all() as unknown as StockRow[];
}

export function decreaseStock(slug: string, qty = 1) {
  const db = ensureStockTable();
  db.prepare(
    "UPDATE product_stock SET stock = MAX(stock - ?, 0) WHERE slug = ?",
  ).run(qty, slug);
}
