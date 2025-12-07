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
  description?: string;
  price: number;
  sku: string;
  created_at?: string;
  updated_at?: string;
  category?: CategoryResponse;
}

export interface CartItem extends ProductResponse {
  quantity: number;
  subtotal: number;
}

/**
 * Tipo para criar/atualizar produtos
 * Espelha o ProductRequest do Rust
 */
export interface ProductRequest {
  id?: number;
  name: string;
  description?: string;
  category_id?: number;
  price: number;
  sku: string;
  created_at?: string;
  updated_at?: string;
}

export interface DataResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
}

export type ProductList = ProductResponse[];
export type Cart = CartItem[];