import { ProductApi } from "@/services/productApi";
import { Cart, CartItem, ProductResponse } from "@/types/product";
import { useState } from "react";

export const useCart = () => {
  // Estado do carrinho
  const [cart, setCart] = useState<Cart>([]);
  /**
   * ESTADO: error
   * - Armazena mensagem de erro (se houver)
   * - null: sem erros
   * - string: mensagem do erro para mostrar ao usuário
   */
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function mergeCartItem( cart: Cart, newItem: ProductResponse): Cart {
    const existingIndex = cart.findIndex(
      item = item.product.sku === newItem.sku
    );
  }

  const addProduct = async (sku: string, qtd: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const product = await ProductApi.getProductBySku(sku);

      setCart((prevCart) => 
        mergeCartItem(prevCart, {product, quantity: qtd})
      )

    } catch (err) {

    }
  };

  return { addProduct };
};
