export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'tissu' | 'sac';
  subCategory?: string;
  stock: number;
  featured: boolean;
  createdAt: Date;
}

export interface User {
  id: number;
  email: string;
  isAdmin: boolean;
}