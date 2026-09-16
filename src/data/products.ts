import { Product } from '@/types/product';

export const products: Product[] = [
  {
    id: '1',
    slug: 'roti-manis-sobek',
    name: 'Roti Manis Sobek',
    category: 'manis',
    price: 25000,
    description: 'Roti lembut dengan gula dan butter yang lembut dan menggoda.',
    image: '/images/roti-manis.jpg',
    images: ['/images/roti-manis.jpg', '/images/roti-manis.jpg', '/images/roti-manis.jpg', '/images/roti-manis.jpg'],
    batchInfo: {
      batchNumber: 12,
      openDate: '12 Mei 2025',
      closeDate: '17 Mei 2025',
      estShip: '20 - 22 Mei',
      slotsFilled: 45,
      totalSlots: 100,
    },
    features: [
      { title: 'Lembut', desc: 'Tekstur lembut dan empuk.', icon: 'leaf' },
      { title: 'Fresh', desc: 'Diproses dengan bahan berkualitas.', icon: 'can' },
      { title: 'Cepat', desc: 'Pengiriman sesuai jadwal.', icon: 'truck' },
    ],
  },
  {
    id: 'basreng-001',
    slug: 'basreng-pedas-daun-jeruk',
    name: 'Basreng Pedas',
    category: 'pedas',
    price: 25000,
    originalPrice: 32000,
    discount: '-22% Batch Promo',
    description: 'Basreng dengan irisan daun jeruk dan cabai asli Jawa Timur yang gurih, renyah, dan menggigit.',
    image: '/images/basreng-main.jpg',
    images: [
      '/images/basreng-main.jpg',
      '/images/basreng-thumb1.jpg',
      '/images/basreng-thumb2.jpg',
      '/images/basreng-thumb3.jpg',
    ],
    batchInfo: {
      batchNumber: 14,
      openDate: '10 Mei 2025',
      closeDate: '15 Mei 2025',
      estShip: '18 - 20 Mei',
      slotsFilled: 78,
      totalSlots: 100,
    },
    features: [
      {
        title: 'Komposisi Alami Pilihan',
        desc: 'Ikan tenggiri segar 65%, cabai rawit merah, daun jeruk purut, tanpa pengawet sintetis.',
        icon: 'leaf',
      },
      {
        title: 'Kaleng Can Kedap Udara',
        desc: 'Tutup rapat kedap udara menjaga kerenyahan gurih optimal hingga 3 bulan di suhu ruang.',
        icon: 'can',
      },
      {
        title: 'Fresh Batch Pre-Order',
        desc: 'Digoreng dan dikemas fresh H-1 sebelum jadwal estimasi pengiriman langsung ke rumah Anda.',
        icon: 'truck',
      },
    ],
  },
  {
    id: '3',
    slug: 'keripik-tempe-crispy',
    name: 'Keripik Tempe Crispy',
    category: 'asin',
    price: 18000,
    description: 'Keripik tempe renyah dengan bumbu gurih khas rumahan.',
    image: '/images/tempe.jpg',
    images: ['/images/tempe.jpg', '/images/tempe.jpg', '/images/tempe.jpg', '/images/tempe.jpg'],
    batchInfo: {
      batchNumber: 9,
      openDate: '14 Mei 2025',
      closeDate: '18 Mei 2025',
      estShip: '22 - 24 Mei',
      slotsFilled: 60,
      totalSlots: 100,
    },
    features: [
      { title: 'Renyah', desc: 'Tekstur kriuk yang tahan lama.', icon: 'leaf' },
      { title: 'Gurih', desc: 'Bumbu rumahan dengan rasa yang pas.', icon: 'can' },
      { title: 'Fresh', desc: 'Diproses setiap batch baru.', icon: 'truck' },
    ],
  },
  {
    id: '4',
    slug: 'usus-crispy-daun-jeruk',
    name: 'Usus Crispy Daun Jeruk',
    category: 'pedas',
    price: 24000,
    description: 'Camilan gurih dan pedas dengan aroma daun jeruk yang khas.',
    image: '/images/usus.jpg',
    images: ['/images/usus.jpg', '/images/usus.jpg', '/images/usus.jpg', '/images/usus.jpg'],
    batchInfo: {
      batchNumber: 8,
      openDate: '11 Mei 2025',
      closeDate: '16 Mei 2025',
      estShip: '18 - 21 Mei',
      slotsFilled: 52,
      totalSlots: 100,
    },
    features: [
      { title: 'Pedas', desc: 'Cocok untuk pecinta rasa pedas.', icon: 'leaf' },
      { title: 'Kriuk', desc: 'Tekstur renyah yang pas.', icon: 'can' },
      { title: 'Fresh', desc: 'Dibuat segar setiap batch.', icon: 'truck' },
    ],
  },
];

export const categories = [
  { id: '1', name: 'Semua', slug: 'all' },
  { id: '2', name: 'Manis', slug: 'manis' },
  { id: '3', name: 'Asin', slug: 'asin' },
  { id: '4', name: 'Pedas', slug: 'pedas' },
];

export const productData: Product = products.find((product) => product.slug === 'basreng-pedas-daun-jeruk') ?? products[0];

export const relatedProducts: Product[] = [
  products[1],
  products[2],
  products[3],
  products[0],
];