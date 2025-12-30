import React, { useEffect } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/useCart";
import { ProductForm } from "@/components/home/ProductForm";
import { CartTable } from "@/components/home/CartTable";
import PaymentArea from "@/components/PaymentArea";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  // Hooks de Lógica de Negócio
  const { cart, addProduct, removeProduct, getCartTotal, clearCart } = useCart();
  const { loadProducts } = useProducts();

  // Carregar catálogo de produtos ao montar
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // Log para debug (pode remover em produção)
  useEffect(() => {
    if (cart.length > 0) {
      console.log('Cart atualizado:', cart);
    }
  }, [cart]);

  const total = getCartTotal();

  return (
    <div className={`layout-container flex overflow-hidden h-screen max-w-screen bg-gray-50 ${className ?? ""}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 flex-1 overflow-hidden gap-4 p-4">
        
        {/* Lado Esquerdo: Operação de Caixa */}
        <div className="flex flex-col h-full overflow-hidden rounded-lg shadow-sm">
          {/* Formulário de Input */}
          <ProductForm onAddProduct={addProduct} />

          {/* Tabela de Produtos */}
          <main className="flex-1 overflow-hidden bg-white">
            <CartTable 
              cart={cart} 
              onRemoveItem={removeProduct} 
            />
          </main>
        </div>

        {/* Lado Direito: Pagamento */}
        <div className="h-full overflow-hidden rounded-lg border bg-white shadow-sm">
          <PaymentArea 
            total={total} 
            cart={cart}
            onClearCart={clearCart}
          />
        </div>

      </div>
    </div>
  );
};

export default Home;