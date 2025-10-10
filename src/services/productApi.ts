import { invoke } from "@tauri-apps/api/core";
import { APIResponse, ProductRequest, ProductResponse } from "@/types/product";

// *
// Define o tipo de dado da resposta da API
// Devido ao retorno de um objeto com wrapper
// *
export const ProductApi = {
  /**
   * GET ALL - Retorna todos os produtos
   */
  getAll: async (): Promise<ProductResponse[]> => {
    try {
      const products = await invoke<APIResponse<ProductResponse[]>>(
        "get_all_products"
      );
      return products.data;
    } catch (error) {
      console.error("Erro ao buscar produtos: ", error);
      throw new Error(
        error instanceof Error
          ? error.message
          : "Erro desconhecido ao buscar produtos"
      );
    }
  },

  /**
   * CREATE - Cria novo produto
   *
   * @param product - Dados do produto (sem ID)
   * @returns Produto criado com ID gerado pelo banco
   *
   * Como funciona:
   * 1. Envia objeto ProductRequest
   * 2. Rust cria no banco e retorna ProductResponse
   * 3. Promise resolve com produto completo (com ID)
   */
  create: async (product: ProductRequest): Promise<ProductResponse> => {
    try {
      const { id, ...productData } = product;
      const response = await invoke<ProductResponse>("create_product", {
        product: productData,
      });

      return response;
    } catch (error) {
      console.error("ERRO:", error);
      throw new Error(
        typeof error === "string" ? error : "Erro ao criar produto"
      );
    }
  },

  getProductBySku: async (sku: string): Promise<ProductResponse> => {
    try {
      const product = await invoke<APIResponse<ProductResponse>>(
        "get_product_by_sku",
        { sku: sku }
      );
      return product.data;
    } catch (error) {
      console.error("Erro ao buscar produto por SKU productApi.ts:", error);
      throw new Error(
        error instanceof Error ? error.message : "Produto não encontrado"
      );
    }
  },

  /**
   * DELETE - Remove produto
   *
   * IMPORTANTE: Verifique o que seu backend Rust retorna:
   * Retorna o produto deletado
   */
  delete: async (id: number): Promise<string> => {
    try {
      await invoke<APIResponse<null>>("delete_product", { productId: id });
      console.log("Produto removido com sucesso:", id);

      return `Produto deletado. Id: ${id}`;
    } catch (error) {
      console.error(`Erro ao remover produto ${id}`, error);
      throw new Error(`Erro ao remover produto ${id}`);
    }
  },
};
