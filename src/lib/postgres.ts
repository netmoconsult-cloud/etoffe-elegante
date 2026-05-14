// Configuration PostgreSQL
// Pour une connexion locale ou distante

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: 'tissu' | 'sac';
  sub_category?: string;
  stock: number;
  featured: boolean;
  created_at: Date;
}

// Configuration de connexion
const DB_CONFIG = {
  host: import.meta.env.VITE_DB_HOST || 'localhost',
  port: parseInt(import.meta.env.VITE_DB_PORT || '5432'),
  database: import.meta.env.VITE_DB_NAME || 'etoffe_elegante',
  user: import.meta.env.VITE_DB_USER || 'postgres',
  password: import.meta.env.VITE_DB_PASSWORD || '',
};

// API PostgreSQL (simulation pour le moment)
// Pour une vraie connexion, il faut un backend Node.js
// Voici une version mock qui ressemble à l'API Supabase

export const postgres = {
  from: (table: string) => ({
    select: async () => {
      console.log(`📦 SELECT FROM ${table}`);
      return { data: [], error: null };
    },
    insert: async (data: any) => {
      console.log(`📦 INSERT INTO ${table}`, data);
      return { data: null, error: null };
    },
    update: async (data: any) => {
      console.log(`📦 UPDATE ${table}`, data);
      return { data: null, error: null };
    },
    delete: async () => {
      console.log(`📦 DELETE FROM ${table}`);
      return { data: null, error: null };
    },
    eq: (field: string, value: any) => ({
      single: async () => {
        console.log(`📦 SELECT FROM ${table} WHERE ${field} = ${value}`);
        return { data: null, error: null };
      }
    })
  })
};