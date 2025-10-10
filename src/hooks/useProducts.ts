import { ProductApi } from "@/services/productApi";
import { ProductRequest, ProductResponse } from "@/types/product";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook customizado para gerenciar produtos
 *
 * - Função que encapsula lógica reutilizável
 * - Usa hooks do React (useState, useEffect, etc)
 * - Facilita compartilhar lógica entre componentes
 * - Centraliza toda lógica de produtos em um lugar
 * - Gerencia estados (loading, error, data)
 * - Reutilizável em múltiplos componentes
 */
export const useProducts = () => {
  /* *
   * ESTADO: products
   * - Armazena a lista de produtos carregados
   * - Inicia vazio []
   * - Atualizado após chamadas à API
   */
  const [products, setProducts] = useState<ProductResponse[]>([]);

  /**
   * ESTADO: error
   * - Armazena mensagem de erro (se houver)
   * - null: sem erros
   * - string: mensagem do erro para mostrar ao usuário
   */
  const [error, setError] = useState<string | null>(null);

  const [cart, setCart] = useState([]);

  /**
   * FUNÇÃO: loadProducts
   * Carrega todos os produtos do banco
   *
   * useCallback: Memoriza a função para evitar recriações desnecessárias
   */
  const loadProducts = useCallback(async () => {
    setError(null);

    try {
      const data = await ProductApi.getAll();
      setProducts(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao carregar produtos";
      setError(message);
      console.error("Erro no loadProducts: ", error);
    }
  }, []);

  /**
   * EFEITO: Carrega produtos quando o componente monta
   *
   * useEffect executa após o componente renderizar
   * [] como dependência = executa apenas uma vez (no mount)
   */
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  /**
   * FUNÇÃO: createProduct
   * Cria um novo produto
   *
   * @returns Produto criado ou null se falhar
   */
  const createProduct = async (
    productsData: ProductRequest
  ): Promise<ProductResponse | null> => {
    setError(null);

    try {
      const created = await ProductApi.create(productsData);

      // Adiciona o produto criado à lista local
      // Evita precisar recarregar tudo do banco
      setProducts((prevProducts) => [...prevProducts, created]);
      return created;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao criar produto";
      console.error("Erro no createProduct: ", message);
      return null;
    }
  };

  /**
   * FUNÇÃO: deleteProduct
   * Remove um produto do banco E da lista local
   *
   * @param id - ID do produto a remover
   * @returns boolean - true se removeu, false se deu erro
   */
  const deleteProduct = async (id: number): Promise<boolean> => {
    setError(null);

    try {
      await ProductApi.delete(id);

      // Remove o produto da lista local
      // filter: mantém todos exceto o deletado
      setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
      return true;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao remover produto";
      setError(message);
      return false;
    }
  };

  // const addProductToCart = async ( sku: string, qtd: number ): Promise<boolean> => {
  //   setError(null);

  //   try {
  //     const product = await ProductApi.getProductBySku(sku);

  //     // Apenas para debug no desenvolvimento
  //     console.log("Produto encontrado:", product);
  //     console.log("Tipo do produto:", typeof product);
  //     console.log("Quantidade:", qtd);

  //     setCart(product, qtd);   
  //   } catch (error) {
  //     const message =
  //       error instanceof Error
  //         ? error.message
  //         : "Erro ao adicionar produto ao carrinho";

  //     console.error("Erro:", message);
  //     setError(message);
  //     return false;
  //   }
  // };

  return {
    // estados
    products,
    error,

    // funções
    loadProducts,
    createProduct,
    deleteProduct,
    // addProductToCart,
  };
};
