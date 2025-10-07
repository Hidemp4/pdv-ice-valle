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
  const [products, setProducts] = useState<ProductResponse[]>([]);

  /**
   * ESTADO: loading
   * - Indica se há uma operação em andamento
   * - true: mostra spinner/loading
   * - false: mostra conteúdo
   */
  const [loading, setLoading] = useState(false);

  /**
   * ESTADO: error
   * - Armazena mensagem de erro (se houver)
   * - null: sem erros
   * - string: mensagem do erro para mostrar ao usuário
   */
  const [error, setError] = useState<string | null>(null);

  /**
   * FUNÇÃO: loadProducts
   * Carrega todos os produtos do banco
   *
   * useCallback: Memoriza a função para evitar recriações desnecessárias
   */
  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await ProductApi.getAll();
      setProducts(data);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro ao carregar produtos";
      setError(message);
      console.error("Erro no loadProducts: ", error);
    } finally {
      setLoading(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  /**
   * FUNÇÃO: updateProduct
   * Atualiza um produto existente
   */
  // const updateProduct = async (
  //   id: number,
  //   productData: ProductRequest
  // )
  

  return {
    // estados
    products,
    loading,
    error,

    // funções
    loadProducts,
    createProduct,
  };
};
