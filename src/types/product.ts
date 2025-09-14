export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ProductResponse {
  id: number;
  name: string;
  description: string | null;
  price: number;
  sku: string;
  created_at: string | null;
  updated_at: string | null;
  category: CategoryResponse | null;
}

export interface ProductRequest {
  id?: number;
  name: string;
  description: string | null;
  category_id: number | null;
  price: number;
  sku: string;
  created_at: string | null;
  updated_at: string | null;
}

export interface DataResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface CartItem extends ProductResponse {
  quantity: number;
  subtotal: number;
}

export type ProductList = ProductResponse[];
export type CartItemList = CartItem[];