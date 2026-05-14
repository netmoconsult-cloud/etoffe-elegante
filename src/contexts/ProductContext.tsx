import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  featured: boolean;
}

interface ProductContextType {
  products: Product[];
  loading: boolean;
  addProduct: (product: Omit<Product, 'id'>) => Promise<void>;
  updateProduct: (id: number, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: number) => Promise<void>;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase.from('products').select('*').order('id', { ascending: false });
    if (error) {
      console.error('Erreur chargement:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const addProduct = async (product: Omit<Product, 'id'>) => {
  console.log('📦 Ajout produit:', product);
  const { data, error } = await supabase.from('products').insert([product]).select();
  if (error) {
    console.error('❌ Erreur détaillée:', JSON.stringify(error, null, 2));
    console.error('Message:', error.message);
    console.error('Détails:', error.details);
  } else if (data) {
    console.log('✅ Produit ajouté:', data[0]);
    const { data: allProducts } = await supabase.from('products').select('*').order('id', { ascending: false });
    setProducts(allProducts || []);
  }
};

  const updateProduct = async (id: number, updates: Partial<Product>) => {
    const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
    if (error) {
      console.error('Erreur modification:', error);
    } else if (data) {
      setProducts(products.map(p => p.id === id ? data[0] : p));
    }
  };

  const deleteProduct = async (id: number) => {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      console.error('Erreur suppression:', error);
    } else {
      setProducts(products.filter(p => p.id !== id));
    }
  };

  const refreshProducts = async () => {
    await fetchProducts();
  };

  return (
    <ProductContext.Provider value={{ products, loading, addProduct, updateProduct, deleteProduct, refreshProducts }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}