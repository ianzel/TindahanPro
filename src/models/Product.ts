export interface Product {
  id: number;
  name: string;
  category: string;
  buyingPrice: number;
  sellingPrice: number;
  stock: number;
  minStock: number;
  created_at?: string;
}