export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  description: string;
  image: string;
  images: string[];
  batchInfo: {
    batchNumber: number;
    openDate: string;
    closeDate: string;
    estShip: string;
    slotsFilled: number;
    totalSlots: number;
  };
  features: {
    title: string;
    desc: string;
    icon: 'leaf' | 'can' | 'truck';
  }[];
}