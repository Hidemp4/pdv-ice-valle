import { DataResponse, ProductResponse, ProductRequest } from "@/types/product";
import { ProductUtils } from "@/utils/productUtils";

/**
 * Serviço para interagir com a API de produtos do Tauri
 */
export class ProductService {
  /**
   * Buscar todos os produtos
   */
  static async getAllProducts(): Promise<ProductResponse[]> {
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('get_all_products') as DataResponse<ProductResponse[]>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erro ao buscar produtos');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }

  /**
   * Buscar produto por ID
   */
  static async getProductById(id: number): Promise<ProductResponse> {
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('get_product_by_id', { id }) as DataResponse<ProductResponse>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  }

  /**
   * Buscar produto por SKU
   */
  static async getProductBySku(sku: string): Promise<ProductResponse> {
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('get_product_by_sku', { sku }) as DataResponse<ProductResponse>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Produto não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar produto por SKU:', error);
      throw error;
    }
  }

  /**
   * Criar novo produto
   */
  static async createProduct(productData: Omit<ProductRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ProductResponse> {
    try {
      const request = ProductUtils.prepareProductRequest({
        ...productData,
        created_at: null,
        updated_at: null,
      });

      const result = await (window as any).__TAURI_INTERNALS__.invoke('create_product', { product: request }) as DataResponse<ProductResponse>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erro ao criar produto');
      }
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw error;
    }
  }

  /**
   * Atualizar produto existente
   */
  static async updateProduct(id: number, productData: Partial<ProductRequest>): Promise<ProductResponse> {
    try {
      const request = ProductUtils.prepareProductRequest({
        ...productData,
        id,
        updated_at: new Date().toISOString(),
      });

      const result = await (window as any).__TAURI_INTERNALS__.invoke('update_product', { product: request }) as DataResponse<ProductResponse>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erro ao atualizar produto');
      }
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  }

  /**
   * Deletar produto
   */
  static async deleteProduct(id: number): Promise<boolean> {
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('delete_product', { id }) as DataResponse<boolean>;
      
      if (result.success) {
        return true;
      } else {
        throw new Error(result.error || 'Erro ao deletar produto');
      }
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  }

  /**
   * Buscar produtos por categoria
   */
  static async getProductsByCategory(categoryId: number): Promise<ProductResponse[]> {
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('get_products_by_category', { categoryId }) as DataResponse<ProductResponse[]>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erro ao buscar produtos da categoria');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos por categoria:', error);
      throw error;
    }
  }

  /**
   * Buscar produtos com filtros
   */
  static async searchProducts(query: string): Promise<ProductResponse[]> {
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('search_products', { query }) as DataResponse<ProductResponse[]>;
      
      if (result.success && result.data) {
        return result.data;
      } else {
        throw new Error(result.error || 'Erro ao buscar produtos');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw error;
    }
  }
}