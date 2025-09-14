import { ProductResponse, ProductRequest } from "@/types/product";
import { ProductUtils } from "@/utils/productUtils";
import { ProductCommands } from "@/types/tauri";

/**
 * Serviço para interagir com a API de produtos do Tauri
 * Todas as chamadas são tipadas e type-safe
 */
export class ProductService {
  /**
   * Buscar todos os produtos
   */
  static async getAllProducts(): Promise<ProductResponse[]> {
    try {
      const result = await ProductCommands.getAllProducts.invoke();
      
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
      const result = await ProductCommands.getProductById.invoke({ product_id: id });
      
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
      const result = await ProductCommands.getProductBySku.invoke({ sku });
      
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

      const result = await ProductCommands.createProduct.invoke({ product: request });
      
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

      const result = await ProductCommands.updateProduct.invoke({ product_id: id, data: request });
      
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
      const result = await ProductCommands.deleteProduct.invoke({ id });
      
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
      const result = await ProductCommands.getProductsByCategory.invoke({ category_id: categoryId });
      
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
      const result = await ProductCommands.searchProducts.invoke({ query });
      
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
   * Validações antes de criar/atualizar
   */
  static validateProductData(data: Partial<ProductRequest>): string[] {
    const errors: string[] = [];

    if (!data.name || data.name.trim().length === 0) {
      errors.push('Nome do produto é obrigatório');
    }

    if (!data.sku || data.sku.trim().length === 0) {
      errors.push('SKU é obrigatório');
    }

    if (data.price === undefined || data.price <= 0) {
      errors.push('Preço deve ser maior que zero');
    }

    return errors;
  }

  /**
   * Criar produto com validação
   */
  static async createProductWithValidation(productData: Omit<ProductRequest, 'id' | 'created_at' | 'updated_at'>): Promise<ProductResponse> {
    const errors = this.validateProductData(productData);
    
    if (errors.length > 0) {
      throw new Error(`Dados inválidos: ${errors.join(', ')}`);
    }

    return this.createProduct(productData);
  }

  /**
   * Atualizar produto com validação
   */
  static async updateProductWithValidation(id: number, productData: Partial<ProductRequest>): Promise<ProductResponse> {
    const errors = this.validateProductData(productData);
    
    if (errors.length > 0) {
      throw new Error(`Dados inválidos: ${errors.join(', ')}`);
    }

    return this.updateProduct(id, productData);
  }
}