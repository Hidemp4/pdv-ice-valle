import { ProductApi } from "@/services/productApi";
import { useState } from "react";

export const useCart = () => {
  // Estado do carrinho
  const [cart, setCart] = useState([]);

  /**
   * ESTADO: error
   * - Armazena mensagem de erro (se houver)
   * - null: sem erros
   * - string: mensagem do erro para mostrar ao usuário
   */
  const [error, setError] = useState<string | null>(null);

  // const [loading, setLoading] = useState(false);

  const addProduct = async (sku: string, qtd: number): Promise<string> => {
    setError(null);

    try {
        const product = ProductApi.getProductBySku(sku);
        // Apenas para debug no desenvolvimento
        console.log("Produto encontrado:", product);
        console.log("Tipo do produto:", typeof product);
        console.log("Quantidade:", qtd);
        
        return "Deu certo";
    } catch (error) {
        console.error('Não foi possível adicionar o produto ao carrinho useCart.ts: ', error)
        error instanceof Error ? error.message : 'Impossível adicionar este produto ao carrinho.'
    }

    return "Fim addProduct useCart.ts"
  };

  return { addProduct };
};
