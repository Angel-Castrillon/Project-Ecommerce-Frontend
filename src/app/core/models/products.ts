export interface Product {
  id: number;
  sku?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  price: string; // Laravel devuelve decimal como string
  stock: number;
  is_active: boolean;
  category_id?: number | null;
  created_at: string;
  updated_at: string;
  image?: string;
  category?: {
    id: number;
    name: string;
    slug: string;
  };
}