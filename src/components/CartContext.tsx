import { createContext, useContext, useState, ReactNode } from 'react';
import { Cart } from '@/types/product';
import { ProductApi } from '@/services/productApi';

interface CartContextType {
  cart: Cart;
  addProduct: (sku: string, quantity: number) => Promise<void>;
  removeProduct: (sku: string) => void;
  clearCart: () => void;
  totalItems: number;
  totalValue: number;
}

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<Cart>([]);

  const addProduct = async (sku: string, quantity: number) => {
    try {
      console.log('🔍 Buscando produto:', sku);
      const existingProduct = await ProductApi.getProductBySku(sku);
      console.log('✅ Produto encontrado:', existingProduct);

      setCart((prev) => {
        console.log('📦 Cart antes:', prev);
        // Verifica se o produto já existe no carrinho
        const existingIndex = prev.findIndex((item) => item.sku === sku);

        if (existingIndex >= 0) {
          // Produto já existe: atualiza quantidade e subtotal
          const updated = [...prev];
          updated[existingIndex].quantity += quantity;
          updated[existingIndex].subtotal = updated[existingIndex].price * updated[existingIndex].quantity;
          return updated;
        }

        // Produto novo: adiciona ao carrinho
        const cartItem = {
          ...existingProduct,
          quantity,
          subtotal: existingProduct.price * quantity,
        };

        return [...prev, cartItem];
      });
    } catch (error) {
      console.error("Produto não encontrado", error);
      throw new Error("Produto não encontrado");
    }
  };

  const removeProduct = (sku: string) => {
    setCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
  const totalValue = cart.reduce((acc, item) => acc + item.subtotal, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        removeProduct,
        clearCart,
        totalItems,
        totalValue
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};