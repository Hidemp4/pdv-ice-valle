
import { invoke } from "@tauri-apps/api/core";
import { ProductRequest, ProductResponse } from "@/types/product";

// *
// Define o tipo de dado da resposta da API
// Devido ao retorno de um objeto com wrapper 
// *
interface APIResponse<T> {
  success: boolean;
  data: T;
}

export const ProductApi = {
  getAll: async (): Promise<ProductResponse[]> => {
    // *
    // Retorna todos os produtos como Object com seguinte estrutura:
    // category{ id: 1, name: 'Gelados', description: 'Produtos Gelados', create_at, update_at },
    // create_at,
    // description: '',
    // id: number,
    // name: '',
    // price: number,
    // sku: '',
    // update_at
    // *
    try{
      const products = await invoke<APIResponse<ProductResponse[]>>('get_all_products');
      return products.data;
    } catch (error) {
      console.error('Erro ao buscar produtos: ', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro desconhecido ao buscar produtos'
      );
    }
  },

  create: async (product: ProductRequest): Promise<ProductResponse> => {
    try {
      const { id, ...productData } = product;
      const created = await invoke<ProductResponse>('create_product', {
        product: productData
      })
      
      console.log('Produto criado com id: ', created.id);
      return created;
    } catch (error) {
      console.error("AQUIIIIIIIII", product)
      console.error('Erro ao criar produto: ', error);
      throw new Error(
        error instanceof Error ? error.message : 'Erro ao criar produto'
      );
    }
  }
}

