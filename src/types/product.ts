export interface ProductResponse {
  id: number;
  name: string;
  description?: string;
  price: number;
  sku: string;
  created_at?: string;
  updated_at?: string;
  category?: {
    id: number;
    name: string;
    description?: string;
  };
}

export interface DataResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Product {
  id: number;
  name_prod: string;
  unit_price: number;
  sku: string;
}
