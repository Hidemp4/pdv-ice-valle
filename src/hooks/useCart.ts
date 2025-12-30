import { useState } from "react";
import { ProductApi } from "@/services/productApi";
import type { Cart, CartItem } from "@/types/product";

export const useCart = () => {
  const [cart, setCart] = useState<Cart>([]);

  const addProduct = async (sku: string, quantity: number): Promise<void> => {
    try {
      const existingProduct = await ProductApi.getProductBySku(sku);
      const existingItemIndex = cart.findIndex(item => item.sku === sku);

      if (existingItemIndex !== -1) {
        // Produto já existe, atualiza quantidade
        setCart((prevCart) => {
          const updatedCart = [...prevCart];
          const newQuantity = updatedCart[existingItemIndex].quantity + quantity;
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: newQuantity,
            subtotal: updatedCart[existingItemIndex].price * newQuantity,
          };
          return updatedCart;
        });
      } else {
        // Produto novo, adiciona ao carrinho
        const cartItem: CartItem = {
          ...existingProduct,
          quantity,
          subtotal: existingProduct.price * quantity,
        };

        setCart((prevCart) => [...prevCart, cartItem]);
      }
    } catch (error: unknown) {
      console.error("Produto não encontrado no carrinho", error);
      throw new Error("Produto não encontrado no carrinho");
    }
  };

  const removeProduct = (sku: string): void => {
    setCart((prevCart) => prevCart.filter(item => item.sku !== sku));
  };

  const updateQuantity = (sku: string, quantity: number): void => {
    if (quantity <= 0) {
      removeProduct(sku);
      return;
    }

    setCart((prevCart) =>
      prevCart.map(item =>
        item.sku === sku
          ? {
              ...item,
              quantity,
              subtotal: item.price * quantity,
            }
          : item
      )
    );
  };

  const clearCart = (): void => {
    setCart([]);
  };

  const getCartTotal = (): number => {
    return cart.reduce((total, item) => total + item.subtotal, 0);
  };

  const getCartItemsCount = (): number => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return {
    cart,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemsCount,
  };
};