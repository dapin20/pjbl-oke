export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'kripik' | 'kacang' | 'roti' | 'basreng';
  description?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}