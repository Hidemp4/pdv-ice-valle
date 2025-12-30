import type {
  ProductResponse,
  ProductRequest,
  DataResponse,
} from './product';

// ============================================
// GLOBAL DECLARATIONS
// ============================================
declare global {
  interface Window {
    __TAURI_INTERNALS__: {
      invoke: <TRequest = unknown, TResponse = unknown>(
        command: string,
        args?: TRequest
      ) => Promise<TResponse>;
    };
  }
}

// ============================================
// TAURI COMMAND TYPES
// ============================================
export interface TauriCommand<TRequest = unknown, TResponse = unknown> {
  command: string;
  invoke: (args?: TRequest) => Promise<TResponse>;
}

// ============================================
// COMMAND FACTORY
// ============================================
export function createTauriCommand<TRequest = unknown, TResponse = unknown>(
  command: string
): TauriCommand<TRequest, TResponse> {
  return {
    command,
    invoke: (args?: TRequest) =>
      window.__TAURI_INTERNALS__.invoke<TRequest, TResponse>(command, args),
  };
}

// ============================================
// PRODUCT COMMAND TYPES
// ============================================
export interface GetAllProductsRequest {}
export type GetAllProductsResponse = DataResponse<ProductResponse[]>;

export interface GetProductByIdRequest {
  product_id: number;
}
export type GetProductByIdResponse = DataResponse<ProductResponse>;

export interface GetProductBySkuRequest {
  sku: string;
}
export type GetProductBySkuResponse = DataResponse<ProductResponse>;

export interface CreateProductRequest {
  product: ProductRequest;
}
export type CreateProductResponse = DataResponse<ProductResponse>;

export interface UpdateProductRequest {
  product_id: number;
  data: ProductRequest;
}
export type UpdateProductResponse = DataResponse<ProductResponse>;

export interface DeleteProductRequest {
  product_id: number;
}
export type DeleteProductResponse = DataResponse<null>;

export interface SearchProductsRequest {
  query: string;
}
export type SearchProductsResponse = DataResponse<ProductResponse[]>;

export interface GetProductsByCategoryRequest {
  category_id: number;
}
export type GetProductsByCategoryResponse = DataResponse<ProductResponse[]>;

// ============================================
// PRODUCT COMMANDS
// ============================================
export const ProductCommands = {
  getAllProducts: createTauriCommand<
    GetAllProductsRequest,
    GetAllProductsResponse
  >('get_all_products'),

  getProductById: createTauriCommand<
    GetProductByIdRequest,
    GetProductByIdResponse
  >('get_product_by_id'),

  getProductBySku: createTauriCommand<
    GetProductBySkuRequest,
    GetProductBySkuResponse
  >('get_product_by_sku'),

  createProduct: createTauriCommand<
    CreateProductRequest,
    CreateProductResponse
  >('create_product'),

  updateProduct: createTauriCommand<
    UpdateProductRequest,
    UpdateProductResponse
  >('update_product'),

  deleteProduct: createTauriCommand<
    DeleteProductRequest,
    DeleteProductResponse
  >('delete_product'),

  searchProducts: createTauriCommand<
    SearchProductsRequest,
    SearchProductsResponse
  >('search_products'),

  getProductsByCategory: createTauriCommand<
    GetProductsByCategoryRequest,
    GetProductsByCategoryResponse
  >('get_products_by_category'),
} as const;

export default {};