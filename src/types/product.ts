// ============================================
// CATEGORY TYPES
// ============================================
export interface CategoryResponse {
  id: number;
  name: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}

// ============================================
// PRODUCT TYPES
// ============================================
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

// ============================================
// CART TYPES
// ============================================
export interface CartItem extends ProductResponse {
  quantity: number;
  subtotal: number;
}

export type Cart = CartItem[];

// ============================================
// PAYMENT TYPES
// ============================================
export interface Payment {
  id: number;
  value: string; // Nota: Vem como string, converter para number ao somar
  method: PaymentMethod;
}

export type PaymentMethod = "Dinheiro" | "Pix" | "Débito" | "Crédito";

// ============================================
// SALE TYPES
// ============================================
export interface Sale {
  id: string;
  date: string;
  time: string;
  products: CartItem[];
  payments: Payment[];
  total: number;
}

export interface SalesSummaryData {
  totalSales: number;
  totalTransactions: number;
  averageTicket: number;
}

// ============================================
// STORAGE TYPES
// ============================================
export const STORAGE_KEYS = {
  SALES: "sales",
  SUSPENDED_SALES: "suspended_sales",
} as const;