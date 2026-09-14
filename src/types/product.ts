export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'manis' | 'asin' | 'pedas' | 'all';
  stock: number;
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}