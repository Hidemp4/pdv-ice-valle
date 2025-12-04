import { ProductApi } from "@/services/productApi";
import { useState } from "react";

export const useCart = () => {
  // Estado do carrinho
  // const [cart, setCart] = useState([]);

  /**
   * ESTADO: error
   * - Armazena mensagem de erro (se houver)
   * - null: sem erros
   * - string: mensagem do erro para mostrar ao usuário
   */
  const [error, setError] = useState<string | null>(null);

  const addProduct = async (sku: string, qtd: number): Promise<string> => {
  setError(null);

  try {
    const product = await ProductApi.getProductBySku(sku);
    
    console.log("Produto encontrado:", product);
    console.log("Quantidade:", qtd);
    
    // TODO: Adicionar lógica para adicionar ao carrinho
    
    return "Produto adicionado com sucesso";
  } catch (err) {
    const errorMessage = err instanceof Error 
      ? err.message 
      : 'Impossível adicionar este produto ao carrinho.';
    
    console.error('Erro ao adicionar produto:', errorMessage);
    setError(errorMessage);
    
    throw error; // Re-lançar para o componente tratar
  }
};

  return { addProduct };
};
