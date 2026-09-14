import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Roti Manis Sobek',
    price: 25000,
    image: '/images/roti-manis.jpg',
    category: 'manis',
    stock: 25,
  },
  // Tambahkan produk lainnya
];

export const categories = [
  { id: '1', name: 'Semua', slug: 'all' },
  { id: '2', name: 'Manis', slug: 'manis' },
  { id: '3', name: 'Asin', slug: 'asin' },
  { id: '4', name: 'Pedas', slug: 'pedas' },
];