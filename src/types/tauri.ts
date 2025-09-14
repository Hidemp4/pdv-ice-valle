// Declarações globais para o Tauri
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

// Tipos específicos para os comandos Tauri
export interface TauriCommand<TRequest = unknown, TResponse = unknown> {
  command: string;
  invoke: (args?: TRequest) => Promise<TResponse>;
}

// Factory para criar comandos tipados
export function createTauriCommand<TRequest = unknown, TResponse = unknown>(
  command: string
): TauriCommand<TRequest, TResponse> {
  return {
    command,
    invoke: (args?: TRequest) => window.__TAURI_INTERNALS__.invoke<TRequest, TResponse>(command, args),
  };
}

// Comandos disponíveis da API de produtos
export const ProductCommands = {
  getAllProducts: createTauriCommand<void, import('./product').DataResponse<import('./product').ProductResponse[]>>('get_all_products'),
  
  getProductById: createTauriCommand<
    { id: number }, 
    import('./product').DataResponse<import('./product').ProductResponse>
  >('get_product_by_id'),
  
  getProductBySku: createTauriCommand<
    { sku: string }, 
    import('./product').DataResponse<import('./product').ProductResponse>
  >('get_product_by_sku'),
  
  createProduct: createTauriCommand<
    { product: import('./product').ProductRequest }, 
    import('./product').DataResponse<import('./product').ProductResponse>
  >('create_product'),
  
  updateProduct: createTauriCommand<
    { product: import('./product').ProductRequest }, 
    import('./product').DataResponse<import('./product').ProductResponse>
  >('update_product'),
  
  deleteProduct: createTauriCommand<
    { id: number }, 
    import('./product').DataResponse<boolean>
  >('delete_product'),
  
  searchProducts: createTauriCommand<
    { query: string }, 
    import('./product').DataResponse<import('./product').ProductResponse[]>
  >('search_products'),
  
  getProductsByCategory: createTauriCommand<
    { categoryId: number }, 
    import('./product').DataResponse<import('./product').ProductResponse[]>
  >('get_products_by_category'),
} as const;

export default {};